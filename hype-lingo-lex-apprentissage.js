/* hype-lingo-lex-apprentissage.js — Hype Linguae · Clonbinane · « L'apprentissage »
   ==================================================================
   16 CONCEPTS, UNE LEÇON, UN DIALOGUE DE 24 RÉPLIQUES.

   POURQUOI CE CHAPITRE, ET POURQUOI EN AUSTRALIE
   Clonbinane, Victoria, a accueilli d'importants travaux consacrés à la
   cognition, au comportement et aux mécanismes d'apprentissage du cheval.
   Ces recherches ont contribué au développement de l'équitation
   scientifique moderne.

   ⚠️ FORMULATION VOLONTAIREMENT MESURÉE (correction de Blandine, 21/08).
   La première écriture affirmait que « c'est de là que vient la théorie
   de l'apprentissage » et que « tout le discours éthologique repose sur
   ce travail ». Les deux étaient invérifiables, et la seconde fausse :
   l'équitation éthologique a plusieurs sources — dont l'école américaine
   que raconte déjà Santa Ynez. Ne pas réintroduire ces affirmations.

   ⚠️ ANGLE VOLONTAIREMENT DISTINCT DE SANTA YNEZ. Santa Ynez enseigne
   l'ÉCOLE américaine (hackamore, feel, timing, release). Clonbinane
   enseigne la SCIENCE (renforcement, signal, habituation, seuil).
   🟥 AUCUN `ref` ne doit être partagé entre les deux fichiers : c'est le
   piège des faux rappels documenté dans le SUIVI — deux lexiques qui
   emploient le même `ref` pour deux notions différentes se contaminent,
   et la maîtrise acquise d'un côté déteint sur l'autre.
   🟥 CROISEMENT NON EFFECTUÉ pour `signal`, `pause`, `calme`, `observer`
   et `repetition` : ce sont des mots courants qu'une autre ville peut
   porter. À vérifier contre l'ensemble des lexiques avant déploiement.

   ⚠️ `timing` ET `faconnement` ONT ÉTÉ ÉCARTÉS (décision du 21/08) : ils
   feraient doublon avec l'école américaine et créeraient un synonyme sous
   une `ref` nouvelle. La précision du relâchement est portée par la
   définition de `relachement` et par le dialogue ; la progression par
   approximations l'est par `progresser`.

   ⚠️ CE CHAPITRE NE CITE AUCUNE PERSONNE ET AUCUN ORGANISME PRIVÉ.
   Décision de Blandine du 8 août 2026, valable pour tout le module.

   PRUDENCE SCIENTIFIQUE — règle d'écriture de ce chapitre :
   on décrit un comportement, on interprète prudemment son origine, on
   n'affirme jamais ce que le cheval « pense » ou « veut ». Le cheval ne
   teste pas, ne fait pas exprès, ne décide pas moralement. Les
   formulations restent au conditionnel là où la science l'est.

   CHAMPS  m · p (EN/DE/JA) · var · def · v (verbe)

   🟡 CHAMP `ar` — ARABE DORMANT (21/08/2026).
   Ce fichier porte un champ `ar` sur chaque concept et chaque réplique.
   AUCUN ÉCRAN NE LE LIT : le sélecteur reste à six langues.
   C'est un dépôt, pas une septième langue.

   POURQUOI DORMANT. Activer l'arabe demanderait de retourner toute la
   mise en page en droite-à-gauche — lexique, rail alphabétique, flèches,
   collection, sellerie — et de rattraper les 37 autres villes. Une
   cavalière arabophone qui le choisirait aujourd'hui verrait un monde
   troué. Décision de Blandine : on accumule ville par ville, on avisera.

   🟥 NE PAS ACTIVER L'ARABE sans relecture native.

   ✅ PREMIÈRE RELECTURE CROISÉE, 21/08 au soir. Blandine a fait relire
   la page d'essai par une autre source. Corrections appliquées :
   · `signal` — la définition disait « la demande convenue » au lieu de
     « le signal convenu » ;
   · `renforcement` — المسح باليد veut dire « essuyer avec la main »,
     remplacé par المداعبة (caresser) ;
   · `seuil` — عتبة ردّ الفعل rendu par عتبة الاستجابة, plus naturel ;
   · `confusion` — الالتباس désigne une ambiguïté de sens ; pour ce que
     ressent le cheval, c'est الارتباك. Corrigé partout ;
   · `desensibilisation` — إزالة الحساسية évoquait un acte médical,
     remplacé par إزالة التحسّس التدريجي ;
   · la rampe — المنحدر désignait une pente quelconque : منحدر المقطورة ;
   · 🟥 la réplique sur la punition était FAUSSE — elle ne voulait pas
     dire ce qu'elle devait dire. Réécrite ;
   · « approche d'un pas » parlait d'intensité au lieu de distance.

   ⚠️ VOCALISATION : les signes vocaliques ont été retirés pour un rendu
   homogène et moderne. Ne pas en réintroduire au coup par coup.

   ✅ SECONDE PASSE DE RELECTURE, même soirée. Cinq répliques revues :
   · la longe — الرسن était le licol, remplacé par حبل القيادة ;
   · le relâchement — formulation artificielle, reprise autour du
     contrôle du حبل القيادة ;
   · la récompense — جواب rendu par استجابة, le mot de l'apprentissage ;
   · l'anticipation — استبق remplacé par توقّع المطلوب, plus précis ;
   · la fin de séance — réécrite en entier, plus naturelle.
   Les corrections sur la punition, la distance et la rampe étaient déjà
   appliquées à la passe précédente.

   🟡 CETTE RELECTURE N'EST PAS UNE VALIDATION NATIVE. Elle vient d'une
   seconde source automatique, pas d'un arabophone. Le contrôle humain
   reste à faire avant toute activation. Toutes les traductions EN/ES/IT/DE/JA
   de ce fichier sont à relire par des locuteurs natifs, en particulier
   les six définitions corrigées et les 24 répliques du dialogue.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.apprentissage = {
  ref: "apprentissage",
  chapitre: 1,
  titre: { fr:"L'apprentissage", en:"How horses learn", es:"El aprendizaje",
           it:"L'apprendimento", de:"Das Lernen", ja:"馬の学習" },
  lecons: 1,

  concepts: [

  { ref:"signal", lecon:1, coll:"science",
    mots:{ fr:{m:"le signal"}, en:{m:"the cue", p:"kiou"},
           es:{m:"la señal"}, it:{m:"il segnale"},
           de:{m:"das Signal", p:"zi-gnal"}, ja:{m:"合図", p:"aizu"},
           ar:{m:"الإشارة"} },
    def:{ fr:"La demande convenue, toujours la même : un cheval n'apprend pas un mot, il apprend un geste constant.",
          en:"The agreed ask, always identical: a horse does not learn a word, he learns a consistent gesture.",
          es:"La petición acordada, siempre igual: un caballo no aprende una palabra, aprende un gesto constante.",
          it:"La richiesta concordata, sempre la stessa: un cavallo non impara una parola, impara un gesto costante.",
          de:"Die verabredete Frage, immer dieselbe: ein Pferd lernt kein Wort, es lernt eine gleichbleibende Geste.",
          ja:"決められた合図。いつも同じであること。馬は言葉ではなく、一貫した動作を覚える。",
          ar:"الإشارة المتفق عليها، وهي دائما نفسها. لا يتعلم الحصان كلمة، بل يتعلم إشارة ثابتة." } },

  { ref:"renforcement", lecon:1, coll:"science",
    mots:{ fr:{m:"le renforcement"}, en:{m:"reinforcement", p:"ri-inn-force-meunt"},
           es:{m:"el refuerzo"}, it:{m:"il rinforzo"},
           de:{m:"die Verstärkung", p:"fèr-chtèr-koung"},
           ja:{m:"強化", p:"kyōka"},
           ar:{m:"التعزيز"} },
    def:{ fr:"Ce qui rend un comportement plus probable : la demande qui cesse, la voix, la caresse, la nourriture.",
          en:"Whatever makes a behaviour more likely: the ask stopping, the voice, a rub, food.",
          es:"Lo que hace más probable un comportamiento: la petición que cesa, la voz, una caricia, la comida.",
          it:"Ciò che rende un comportamento più probabile: la richiesta che cessa, la voce, una carezza, il cibo.",
          de:"Was ein Verhalten wahrscheinlicher macht: das Ende der Frage, die Stimme, ein Kraulen, Futter.",
          ja:"ある行動が起こりやすくなる要因。要求の終了、声、かいてやること、餌。",
          /* ar? terme technique — à faire relire */
          ar:"كل ما يجعل سلوكا ما أكثر احتمالا: توقف الطلب، أو الصوت، أو المداعبة، أو الطعام." } },

  { ref:"habituation", lecon:1, coll:"science",
    mots:{ fr:{m:"l'habituation"}, en:{m:"habituation", p:"ha-bi-tiou-é-cheune"},
           es:{m:"la habituación"}, it:{m:"l'assuefazione"},
           de:{m:"die Gewöhnung", p:"gue-veu-noung"},
           ja:{m:"慣れ", p:"nare"},
           ar:{m:"التعود"} },
    def:{ fr:"Cesser de réagir à ce qui ne représente aucun danger, à force de le rencontrer sans conséquence.",
          en:"Ceasing to react to something harmless, from meeting it again and again with no consequence.",
          es:"Dejar de reaccionar ante algo inofensivo, por encontrarlo una y otra vez sin consecuencia.",
          it:"Smettere di reagire a ciò che non è pericoloso, per averlo incontrato tante volte senza conseguenze.",
          de:"Aufhören, auf Harmloses zu reagieren, weil man es immer wieder ohne Folgen erlebt hat.",
          ja:"危険のないものに反応しなくなること。何度も出会い、何も起こらないことで生じる。",
          /* ar? terme technique — à faire relire */
          ar:"التوقف عن رد الفعل تجاه شيء لا خطر فيه، بعد لقائه مرة بعد مرة دون أن يحدث شيء." } },

  { ref:"seuil", lecon:1, coll:"science",
    mots:{ fr:{m:"le seuil de réaction"}, en:{m:"the threshold", p:"thresh-old"},
           es:{m:"el umbral de reacción"}, it:{m:"la soglia di reazione"},
           de:{m:"die Reizschwelle", p:"raïts-chvè-le"},
           ja:{m:"反応の閾値", p:"hannō no ikichi"},
           ar:{m:"عتبة الاستجابة"} },
    def:{ fr:"Le point au-delà duquel le cheval ne réfléchit plus et fuit. Un cheval au-dessus de son seuil n'apprend rien.",
          en:"The point beyond which the horse stops thinking and flees. Over threshold, he learns nothing.",
          es:"El punto más allá del cual el caballo deja de pensar y huye. Por encima del umbral, no aprende nada.",
          it:"Il punto oltre il quale il cavallo non ragiona più e fugge. Sopra soglia, non impara nulla.",
          de:"Der Punkt, ab dem das Pferd nicht mehr denkt und flieht. Über der Schwelle lernt es nichts.",
          ja:"これを超えると馬は考えるのをやめ、逃げ出す境目。閾値を超えた馬は何も学ばない。",
          /* ar? terme technique — à faire relire */
          ar:"الحد الذي يتوقف الحصان بعده عن التفكير فيهرب. فوق عتبته لا يتعلم شيئا." } },

  { ref:"fuite", lecon:1, coll:"nature",
    mots:{ fr:{m:"la fuite"}, en:{m:"flight", p:"flaït"},
           es:{m:"la huida"}, it:{m:"la fuga"},
           de:{m:"die Flucht", p:"flourht"}, ja:{m:"逃走", p:"tōsō"},
           ar:{m:"الهروب"} },
    def:{ fr:"La première réponse d'un herbivore devant l'inconnu. Elle n'est pas un défaut de caractère.",
          en:"A grazing animal's first answer to the unknown. It is not a character flaw.",
          es:"La primera respuesta de un herbívoro ante lo desconocido. No es un defecto de carácter.",
          it:"La prima risposta di un erbivoro davanti all'ignoto. Non è un difetto di carattere.",
          de:"Die erste Antwort eines Pflanzenfressers auf das Unbekannte. Kein Charakterfehler.",
          ja:"未知のものに対する草食動物の最初の答え。性格の欠点ではない。",
          ar:"أول جواب يعطيه حيوان عاشب أمام المجهول. وهي ليست عيبا في الطبع." } },

  { ref:"troupeau", lecon:1, coll:"nature",
    mots:{ fr:{m:"le troupeau"}, en:{m:"the herd", p:"heurd"},
           es:{m:"la manada"}, it:{m:"la mandria"},
           de:{m:"die Herde", p:"hèr-de"}, ja:{m:"群れ", p:"mure"},
           ar:{m:"القطيع"} },
    def:{ fr:"Le groupe où le cheval trouve sa sécurité. Seul, il est plus inquiet — et il apprend moins bien.",
          en:"The group where a horse finds safety. Alone, he is more anxious — and learns less well.",
          es:"El grupo donde el caballo encuentra seguridad. Solo, está más inquieto y aprende peor.",
          it:"Il gruppo dove il cavallo trova sicurezza. Da solo è più inquieto e impara peggio.",
          de:"Die Gruppe, in der ein Pferd Sicherheit findet. Allein ist es unruhiger — und lernt schlechter.",
          ja:"馬が安心を得る集団。ひとりでは不安が強く、学習も進みにくい。",
          ar:"المجموعة التي يجد فيها الحصان أمانه. وحده يكون أكثر قلقا، ويتعلم أقل." } },

  { ref:"repetition", lecon:1, coll:"science",
    mots:{ fr:{m:"la répétition"}, en:{m:"repetition", p:"ré-pé-ti-cheune"},
           es:{m:"la repetición"}, it:{m:"la ripetizione"},
           de:{m:"die Wiederholung", p:"vi-deur-hô-loung"},
           ja:{m:"反復", p:"hanpuku"},
           ar:{m:"التكرار"} },
    def:{ fr:"Refaire la même demande de la même façon. C'est la constance qui enseigne, pas la fermeté.",
          en:"Making the same ask the same way. Consistency teaches, not firmness.",
          es:"Repetir la misma petición de la misma forma. Enseña la constancia, no la firmeza.",
          it:"Ripetere la stessa richiesta nello stesso modo. Insegna la costanza, non la fermezza.",
          de:"Dieselbe Frage auf dieselbe Weise stellen. Beständigkeit lehrt, nicht Härte.",
          ja:"同じ要求を同じやり方で繰り返すこと。教えるのは厳しさではなく一貫性。",
          ar:"إعادة الطلب نفسه بالطريقة نفسها. الثبات هو ما يعلم، لا الشدة." } },

  { ref:"pause", lecon:1, coll:"science",
    mots:{ fr:{m:"la pause"}, en:{m:"the break", p:"brék"},
           es:{m:"la pausa"}, it:{m:"la pausa"},
           de:{m:"die Pause", p:"pao-ze"}, ja:{m:"休憩", p:"kyūkei"},
           ar:{m:"الاستراحة"} },
    def:{ fr:"L'arrêt qui laisse le cheval enregistrer. On apprend pendant la pause, pas pendant l'effort.",
          en:"The stop that lets the horse take it in. Learning happens in the break, not in the effort.",
          es:"La parada que deja al caballo asimilar. Se aprende en la pausa, no en el esfuerzo.",
          it:"La sosta che permette al cavallo di assimilare. Si impara nella pausa, non nello sforzo.",
          de:"Der Halt, der das Pferd verarbeiten lässt. Gelernt wird in der Pause, nicht in der Anstrengung.",
          ja:"馬が理解するための停止。学習は努力の最中ではなく、休憩の間に起こる。",
          ar:"التوقف الذي يتيح للحصان أن يستوعب. التعلم يحدث في الاستراحة، لا في الجهد." } },

  { ref:"confusion", lecon:1, coll:"science",
    mots:{ fr:{m:"la confusion"}, en:{m:"confusion", p:"keun-fiou-jeune"},
           es:{m:"la confusión"}, it:{m:"la confusione"},
           de:{m:"die Verwirrung", p:"fèr-vi-roung"},
           ja:{m:"混乱", p:"konran"},
           ar:{m:"الارتباك"} },
    def:{ fr:"Deux demandes contraires en même temps. Le cheval qui ne comprend pas n'est pas un cheval qui refuse.",
          en:"Two opposite asks at once. A horse that does not understand is not a horse that refuses.",
          es:"Dos peticiones contrarias a la vez. Un caballo que no entiende no es un caballo que se niega.",
          it:"Due richieste opposte insieme. Un cavallo che non capisce non è un cavallo che rifiuta.",
          de:"Zwei gegensätzliche Fragen gleichzeitig. Ein Pferd, das nicht versteht, verweigert nicht.",
          ja:"相反する二つの要求が同時に出ること。理解できない馬は、拒否している馬ではない。",
          ar:"طلبان متناقضان في وقت واحد. الحصان الذي لا يفهم ليس حصانا يرفض." } },

  { ref:"observer", lecon:1, coll:"nature", v:true,
    mots:{ fr:{m:"observer"}, en:{m:"to observe", p:"tou ob-zeurv"},
           es:{m:"observar"}, it:{m:"osservare"},
           de:{m:"beobachten", p:"bé-o-bakh-ten"},
           ja:{m:"観察する", p:"kansatsu suru"},
           ar:{m:"يراقب"} },
    def:{ fr:"Regarder longtemps avant de demander : l'oreille, l'œil, le poids sur les pieds disent tout.",
          en:"Watching a long while before asking: the ear, the eye, the weight on the feet say everything.",
          es:"Mirar largo rato antes de pedir: la oreja, el ojo, el peso sobre los pies lo dicen todo.",
          it:"Guardare a lungo prima di chiedere: l'orecchio, l'occhio, il peso sui piedi dicono tutto.",
          de:"Lange schauen, bevor man fragt: Ohr, Auge und das Gewicht auf den Hufen sagen alles.",
          ja:"求める前に、長く見ること。耳、目、脚にかかる重さがすべてを語る。",
          ar:"أن تنظر طويلا قبل أن تطلب: الأذن والعين وثقل الجسم على القوائم تقول كل شيء." } },

  /* ---- les six ajouts du 21/08, définitions mesurées ---- */

  { ref:"punition", lecon:1, coll:"science",
    mots:{ fr:{m:"la punition"}, en:{m:"punishment", p:"pe-niche-meunt"},
           es:{m:"el castigo"}, it:{m:"la punizione"},
           de:{m:"die Strafe", p:"chtra-fe"}, ja:{m:"罰", p:"batsu"},
           ar:{m:"العقاب"} },
    def:{ fr:"Une conséquence qui rend un comportement moins probable. Mal utilisée ou trop tardive, elle peut provoquer de la peur, de la confusion ou des comportements de défense.",
          en:"A consequence that makes a behaviour less likely. Poorly used or too late, it can cause fear, confusion or defensive behaviour.",
          es:"Una consecuencia que hace menos probable un comportamiento. Mal utilizada o demasiado tardía, puede provocar miedo, confusión o conductas de defensa.",
          it:"Una conseguenza che rende un comportamento meno probabile. Usata male o troppo tardi, può provocare paura, confusione o comportamenti di difesa.",
          de:"Eine Folge, die ein Verhalten unwahrscheinlicher macht. Falsch eingesetzt oder zu spät, kann sie Angst, Verwirrung oder Abwehrverhalten auslösen.",
          ja:"ある行動が起こりにくくなる結果。使い方を誤ったり遅すぎたりすると、恐れや混乱、防御的な行動を引き起こすことがある。",
          /* ar? terme technique — à faire relire */
          ar:"نتيجة تجعل سلوكا ما أقل احتمالا. إذا أسيء استعمالها أو جاءت متأخرة، قد تسبب الخوف أو الارتباك أو سلوكا دفاعيا." } },

  { ref:"desensibilisation", lecon:1, coll:"science",
    mots:{ fr:{m:"la désensibilisation"}, en:{m:"desensitisation", p:"di-senn-si-taï-zé-cheune"},
           es:{m:"la desensibilización"}, it:{m:"la desensibilizzazione"},
           de:{m:"die Desensibilisierung", p:"dé-zenn-zi-bi-li-zi-roung"},
           ja:{m:"脱感作", p:"dakkansa"},
           ar:{m:"إزالة التحسس التدريجي"} },
    def:{ fr:"Exposer progressivement le cheval à ce qui l'inquiète, à une intensité qu'il peut tolérer, sans provoquer une forte réaction de fuite, de lutte ou de sidération.",
          en:"Exposing the horse gradually to what worries him, at an intensity he can tolerate, without triggering a strong flight, fight or freeze reaction.",
          es:"Exponer progresivamente al caballo a lo que le inquieta, a una intensidad que pueda tolerar, sin provocar una fuerte reacción de huida, lucha o bloqueo.",
          it:"Esporre gradualmente il cavallo a ciò che lo inquieta, a un'intensità che può tollerare, senza provocare una forte reazione di fuga, lotta o blocco.",
          de:"Das Pferd schrittweise dem aussetzen, was es beunruhigt, in einer Intensität, die es aushalten kann, ohne eine starke Flucht-, Kampf- oder Erstarrungsreaktion auszulösen.",
          ja:"馬が不安に感じるものに、耐えられる強さで少しずつ触れさせること。強い逃走・闘争・フリーズ反応を引き起こさない範囲で行う。",
          /* ar? terme technique — à faire relire */
          ar:"تعريض الحصان تدريجيا لما يقلقه، إلى الحد الذي يستطيع تحمله، دون إثارة رد فعل قوي من هروب أو مقاومة أو تجمد." } },

  { ref:"relachement", lecon:1, coll:"science",
    mots:{ fr:{m:"le relâchement"}, en:{m:"the release", p:"ri-lisse"},
           es:{m:"la soltura"}, it:{m:"il rilascio"},
           de:{m:"das Nachgeben", p:"nakh-gué-benn"}, ja:{m:"解放", p:"kaihō"},
           ar:{m:"تخفيف الضغط"} },
    def:{ fr:"La diminution ou le retrait de la pression dès l'apparition de la réponse recherchée. La précision de ce moment aide le cheval à comprendre.",
          en:"Reducing or removing the pressure as soon as the sought response appears. The precision of that moment helps the horse understand.",
          es:"La disminución o retirada de la presión en cuanto aparece la respuesta buscada. La precisión de ese momento ayuda al caballo a comprender.",
          it:"La diminuzione o il ritiro della pressione appena compare la risposta cercata. La precisione di quel momento aiuta il cavallo a capire.",
          de:"Das Verringern oder Wegnehmen des Drucks, sobald die gesuchte Antwort erscheint. Die Genauigkeit dieses Augenblicks hilft dem Pferd zu verstehen.",
          ja:"求めていた反応が現れた瞬間に圧を弱める、あるいは取り除くこと。その瞬間の正確さが、馬の理解を助ける。",
          ar:"تخفيف الضغط أو رفعه فور ظهور الجواب المطلوب. دقة هذه اللحظة هي ما يساعد الحصان على الفهم." } },

  { ref:"anticipation", lecon:1, coll:"science",
    mots:{ fr:{m:"l'anticipation"}, en:{m:"anticipation", p:"ann-ti-si-pé-cheune"},
           es:{m:"la anticipación"}, it:{m:"l'anticipazione"},
           de:{m:"das Vorwegnehmen", p:"for-vèk-né-menn"}, ja:{m:"先取り", p:"sakidori"},
           ar:{m:"الاستباق"} },
    def:{ fr:"Le cheval répond avant que le signal soit complètement donné. Cela peut montrer qu'il a reconnu la situation, mais il faut vérifier qu'il reste attentif à une demande claire.",
          en:"The horse answers before the cue is fully given. It can show he has recognised the situation, but check that he stays attentive to a clear ask.",
          es:"El caballo responde antes de que la señal esté completa. Puede indicar que ha reconocido la situación, pero conviene comprobar que sigue atento a una petición clara.",
          it:"Il cavallo risponde prima che il segnale sia completo. Può indicare che ha riconosciuto la situazione, ma occorre verificare che resti attento a una richiesta chiara.",
          de:"Das Pferd antwortet, bevor das Signal ganz gegeben ist. Das kann zeigen, dass es die Situation erkannt hat — prüfe aber, ob es einer klaren Frage aufmerksam bleibt.",
          ja:"合図が出しきられる前に馬が答えること。状況を理解している証かもしれないが、明確な求めに注意を向け続けているかを確かめる必要がある。",
          /* ar? terme technique — à faire relire */
          ar:"أن يجيب الحصان قبل أن تكتمل الإشارة. قد يدل ذلك على أنه عرف الموقف، لكن يجب التأكد من أنه يبقى منتبها لطلب واضح." } },

  { ref:"calme", lecon:1, coll:"nature",
    mots:{ fr:{m:"le calme"}, en:{m:"calmness", p:"kâm-nesse"},
           es:{m:"la calma"}, it:{m:"la calma"},
           de:{m:"die Ruhe", p:"rou-e"}, ja:{m:"落ち着き", p:"ochitsuki"},
           ar:{m:"الهدوء"} },
    def:{ fr:"Un état dans lequel le cheval reste suffisamment disponible pour percevoir les signaux et répondre sans basculer dans une forte réaction de fuite, de lutte ou de sidération.",
          en:"A state in which the horse stays available enough to perceive cues and answer without tipping into a strong flight, fight or freeze reaction.",
          es:"Un estado en el que el caballo sigue lo bastante disponible para percibir las señales y responder sin caer en una fuerte reacción de huida, lucha o bloqueo.",
          it:"Uno stato in cui il cavallo resta abbastanza disponibile per percepire i segnali e rispondere senza scivolare in una forte reazione di fuga, lotta o blocco.",
          de:"Ein Zustand, in dem das Pferd aufnahmefähig genug bleibt, um Signale wahrzunehmen und zu antworten, ohne in eine starke Flucht-, Kampf- oder Erstarrungsreaktion zu kippen.",
          ja:"合図を受け取り、強い逃走・闘争・フリーズ反応に陥ることなく答えられるだけの余裕が、馬に残っている状態。",
          ar:"حالة يبقى فيها الحصان قادرا بما يكفي على تلقي الإشارات والاستجابة، دون أن ينزلق إلى رد فعل قوي من هروب أو مقاومة أو تجمد." } },

  { ref:"progresser", lecon:1, coll:"science", v:true,
    mots:{ fr:{m:"progresser"}, en:{m:"to progress", p:"tou pro-gresse"},
           es:{m:"progresar"}, it:{m:"progredire"},
           de:{m:"vorankommen", p:"for-ann-ko-menn"}, ja:{m:"進歩する", p:"shinpo suru"},
           ar:{m:"يتقدم خطوة بخطوة"} },
    def:{ fr:"Avancer par étapes lorsque le cheval a compris la précédente. Aller trop vite peut provoquer de la confusion.",
          en:"Moving on in steps once the horse has understood the previous one. Going too fast can cause confusion.",
          es:"Avanzar por etapas cuando el caballo ha comprendido la anterior. Ir demasiado rápido puede provocar confusión.",
          it:"Avanzare per tappe quando il cavallo ha capito la precedente. Andare troppo in fretta può creare confusione.",
          de:"Schritt für Schritt weitergehen, wenn das Pferd den vorigen verstanden hat. Zu schnell zu gehen kann Verwirrung stiften.",
          ja:"前の段階を馬が理解してから、次へ進むこと。急ぎすぎると混乱を招くことがある。",
          ar:"أن تتقدم خطوة بعد أن يكون الحصان قد فهم الخطوة السابقة. التسرع قد يسبب الارتباك." } }

  ],

  /* Les phrases isolées de la première écriture ont été remplacées par le
     dialogue ci-dessous (format Flyinge). Ne pas les réintroduire. */
  phrases: [],

  /* ==================================================================
     DIALOGUE — 24 répliques, 6 temps, `joueuse` ↔ `club`.

     LA SCÈNE : un cheval qui hésite devant le van. Ce n'est PAS une
     leçon de transport — Barcelone enseigne déjà l'embarquement et porte
     le `ref` `embarquer`. Ici la difficulté sert de cas pratique pour
     dérouler les mécanismes de l'apprentissage.
     🟥 NE PAS créer de `ref` `embarquer` dans ce fichier.

     Les seize concepts sont mobilisés au moins une fois.
     ================================================================== */
  dialogue: {
    ville: "clonbinane", lecon: 1, temps: 6,
    langues: ["fr","en","es","it","de","ja"],
    phrases: [

    /* ---- temps 1 · observer avant d'interpréter ---- */

    { ref:"d-clo-refuse", temps:1, dit:"joueuse", mots:["fuite"],
      fr:"Il ne veut pas monter dans le van.",
      en:"He will not go into the trailer.",
      es:"No quiere subir al remolque.",
      it:"Non vuole salire nel van.",
      de:"Er will nicht in den Hänger.",
      ja:"馬運車に乗ってくれません。",
      ar:"لا يريد أن يصعد إلى المقطورة." },

    { ref:"d-clo-peut-etre", temps:1, dit:"club", mots:["confusion"],
      fr:"Il ne cherche peut-être pas à refuser. Son comportement indique surtout qu'il est inquiet.",
      en:"He may not be trying to refuse. His behaviour mainly shows that he is worried.",
      es:"Puede que no esté intentando negarse. Su comportamiento indica sobre todo que está inquieto.",
      it:"Forse non sta cercando di rifiutare. Il suo comportamento indica soprattutto che è inquieto.",
      de:"Vielleicht will er sich gar nicht weigern. Sein Verhalten zeigt vor allem, dass er beunruhigt ist.",
      ja:"拒もうとしているとは限りません。その様子は、何よりも不安を表しています。",
      ar:"ربما لا يحاول أن يرفض. سلوكه يدل قبل كل شيء على أنه قلق." },

    { ref:"d-clo-tout-le-corps", temps:1, dit:"club", mots:["observer"],
      fr:"Avant de tirer, observe tout son corps : son regard, son encolure, ses pieds et sa respiration.",
      en:"Before you pull, watch his whole body: his eye, his neck, his feet and his breathing.",
      es:"Antes de tirar, observa todo su cuerpo: la mirada, el cuello, los pies y la respiración.",
      it:"Prima di tirare, osserva tutto il suo corpo: lo sguardo, l'incollatura, i piedi e il respiro.",
      de:"Bevor du ziehst, schau auf den ganzen Körper: Auge, Hals, Hufe und Atmung.",
      ja:"引く前に、体全体を見てください。目、首、脚、そして呼吸を。",
      ar:"قبل أن تشدي، راقبي جسده كله: نظرته، عنقه، قوائمه، وتنفسه." },

    { ref:"d-clo-tremble", temps:1, dit:"joueuse", mots:["seuil"],
      fr:"Il tremble et il recule dès qu'il voit la rampe.",
      en:"He shakes and backs off as soon as he sees the ramp.",
      es:"Tiembla y retrocede en cuanto ve la rampa.",
      it:"Trema e indietreggia appena vede la pedana.",
      de:"Er zittert und weicht zurück, sobald er die Rampe sieht.",
      ja:"スロープを見たとたん、震えて後ずさりします。",
      ar:"يرتجف ويتراجع بمجرد أن يرى منحدر المقطورة." },

    /* ---- temps 2 · reconnaître le seuil ---- */

    { ref:"d-clo-au-dessus", temps:2, dit:"club", mots:["seuil"],
      fr:"Au-dessus de son seuil, il devient beaucoup moins disponible pour comprendre ta demande.",
      en:"Over his threshold, he becomes far less available to understand what you are asking.",
      es:"Por encima de su umbral, queda mucho menos disponible para entender tu petición.",
      it:"Sopra la sua soglia, diventa molto meno disponibile a capire la tua richiesta.",
      de:"Über seiner Schwelle ist er viel weniger aufnahmefähig für deine Frage.",
      ja:"閾値を超えると、あなたの求めを理解する余裕がぐっと少なくなります。",
      ar:"فوق عتبته، يصبح أقل قدرة بكثير على فهم ما تطلبينه." },

    { ref:"d-clo-punir", temps:2, dit:"joueuse", mots:["punition"],
      fr:"Est-ce qu'il faut le punir pour qu'il avance ?",
      en:"Should I punish him to make him go forward?",
      es:"¿Hay que castigarlo para que avance?",
      it:"Bisogna punirlo perché avanzi?",
      de:"Muss ich ihn bestrafen, damit er vorwärtsgeht?",
      ja:"前に進ませるために、罰を与えるべきでしょうか。",
      ar:"هل يجب معاقبته كي يتقدم؟" },

    { ref:"d-clo-non-punir", temps:2, dit:"club", mots:["punition","confusion"],
      fr:"Ce n'est pas ce qui lui apprendra le van. Mal placée, une punition ajoute de la peur et de la confusion.",
      en:"That is not what will teach him the trailer. Badly placed, punishment adds fear and confusion.",
      es:"No es eso lo que le enseñará el remolque. Mal aplicado, el castigo añade miedo y confusión.",
      it:"Non è questo che gli insegnerà il van. Mal posta, una punizione aggiunge paura e confusione.",
      de:"Das bringt ihm den Hänger nicht bei. Falsch gesetzt, fügt eine Strafe Angst und Verwirrung hinzu.",
      ja:"それでは馬運車を教えられません。誤って与えられた罰は、恐れと混乱を増やすだけです。",
      ar:"ليس بهذه الطريقة سيتعلم دخول المقطورة. فالعقاب في غير موضعه يزيد الخوف والارتباك." },

    { ref:"d-clo-eloigne", temps:2, dit:"club", mots:["calme"],
      fr:"Éloigne-toi jusqu'à ce que son corps se détende.",
      en:"Move away until his body softens.",
      es:"Aléjate hasta que su cuerpo se relaje.",
      it:"Allontanati finché il suo corpo non si rilassa.",
      de:"Geh weg, bis sein Körper weicher wird.",
      ja:"体の緊張がゆるむところまで離れてください。",
      ar:"ابتعدي حتى يلين جسده." },

    /* ---- temps 3 · vérifier avant de se rapprocher ---- */

    { ref:"d-clo-il-souffle", temps:3, dit:"joueuse", mots:["calme"],
      fr:"Il souffle et baisse la tête. Son corps paraît moins tendu.",
      en:"He blows out and lowers his head. His body looks less tense.",
      es:"Resopla y baja la cabeza. Su cuerpo parece menos tenso.",
      it:"Soffia e abbassa la testa. Il suo corpo sembra meno teso.",
      de:"Er schnaubt ab und senkt den Kopf. Sein Körper wirkt weniger angespannt.",
      ja:"鼻を鳴らして頭を下げました。体の緊張も少し和らいで見えます。",
      ar:"ينفخ ويخفض رأسه. جسده يبدو أقل توترا." },

    { ref:"d-clo-continue-observer", temps:3, dit:"club", mots:["observer"],
      fr:"Oui, mais continue d'observer l'ensemble de son comportement avant de te rapprocher.",
      en:"Yes, but keep watching his behaviour as a whole before you move closer.",
      es:"Sí, pero sigue observando el conjunto de su comportamiento antes de acercarte.",
      it:"Sì, ma continua a osservare l'insieme del suo comportamento prima di avvicinarti.",
      de:"Ja, aber beobachte weiter sein gesamtes Verhalten, bevor du näher gehst.",
      ja:"はい。ただ、近づく前に、ふるまい全体を見つづけてください。",
      ar:"نعم، لكن واصلي مراقبة سلوكه كله قبل أن تقتربي." },

    { ref:"d-clo-un-pas", temps:3, dit:"club", mots:["desensibilisation","seuil"],
      fr:"Approche d'un pas, à une intensité qu'il peut tolérer, puis arrête-toi.",
      en:"Come one step closer, at an intensity he can tolerate, then stop.",
      es:"Acércate un paso, a una intensidad que pueda tolerar, y detente.",
      it:"Avvicinati di un passo, a un'intensità che può tollerare, poi fermati.",
      de:"Geh einen Schritt näher, in einer Intensität, die er aushält, und halt dann an.",
      ja:"耐えられる強さで一歩だけ近づき、そこで止まってください。",
      ar:"اقتربي خطوة واحدة فقط، إلى المسافة التي يستطيع تحملها، ثم توقفي." },

    /* ---- temps 4 · répéter sans saturer ---- */

    { ref:"d-clo-combien", temps:4, dit:"joueuse", mots:["repetition"],
      fr:"Combien de fois faut-il recommencer ?",
      en:"How many times do we start again?",
      es:"¿Cuántas veces hay que repetirlo?",
      it:"Quante volte bisogna ricominciare?",
      de:"Wie oft müssen wir das wiederholen?",
      ja:"何回くり返せばいいですか。",
      ar:"كم مرة يجب أن نعيد؟" },

    { ref:"d-clo-peu-qualite", temps:4, dit:"club", mots:["repetition","confusion"],
      fr:"Peu de répétitions de qualité. Arrête-toi avant qu'il se fatigue ou se mette en confusion.",
      en:"A few good repetitions. Stop before he tires or becomes confused.",
      es:"Pocas repeticiones de calidad. Para antes de que se canse o se confunda.",
      it:"Poche ripetizioni di qualità. Fermati prima che si stanchi o si confonda.",
      de:"Wenige gute Wiederholungen. Hör auf, bevor er müde oder verwirrt wird.",
      ja:"質のよいくり返しを少しだけ。疲れたり混乱したりする前にやめましょう。",
      ar:"تكرارات قليلة وجيدة. توقفي قبل أن يتعب أو يلتبس عليه الأمر." },

    { ref:"d-clo-ordinaire", temps:4, dit:"club", mots:["habituation"],
      fr:"À force de revoir la rampe sans que rien n'arrive, elle deviendra ordinaire.",
      en:"Seeing the ramp again and again with nothing happening, it will become ordinary.",
      es:"A fuerza de volver a ver la rampa sin que pase nada, se volverá algo corriente.",
      it:"A forza di rivedere la pedana senza che accada nulla, diventerà una cosa normale.",
      de:"Wenn er die Rampe immer wieder sieht und nichts passiert, wird sie gewöhnlich.",
      ja:"何も起こらないままスロープを見つづけるうちに、それは当たり前のものになります。",
      ar:"بتكرار رؤية منحدر المقطورة دون أن يحدث شيء، سيصير أمرا عاديا." },

    { ref:"d-clo-un-pied", temps:4, dit:"joueuse", mots:["signal"],
      fr:"Il a avancé un pied dès que j'ai fermé mes doigts sur la longe.",
      en:"He moved one foot forward as soon as I closed my fingers on the rope.",
      es:"Adelantó un pie en cuanto cerré los dedos sobre el ramal.",
      it:"Ha portato avanti un piede appena ho chiuso le dita sulla longhina.",
      de:"Er hat einen Huf vorgesetzt, sobald ich die Finger am Strick geschlossen habe.",
      ja:"リードに指をかけたとたん、前脚を一歩出しました。",
      ar:"قدم إحدى قوائمه إلى الأمام بمجرد أن أغلقت أصابعي على حبل القيادة." },

    /* ---- temps 5 · relâcher et laisser le temps ---- */

    { ref:"d-clo-relache", temps:5, dit:"club", mots:["relachement"],
      fr:"Relâche immédiatement la pression, tout en gardant une conduite sécurisée.",
      en:"Release the pressure straight away, while keeping him safely under control.",
      es:"Suelta la presión inmediatamente, manteniendo siempre una conducción segura.",
      it:"Rilascia subito la pressione, mantenendo una conduzione sicura.",
      de:"Gib den Druck sofort nach, führe ihn dabei weiter sicher.",
      ja:"すぐに圧を抜いてください。ただし、安全に扱える状態は保ったままで。",
      ar:"خففي الضغط فورا، مع الحفاظ على تحكم آمن بحبل القيادة." },

    { ref:"d-clo-renforce", temps:5, dit:"club", mots:["renforcement","relachement"],
      fr:"Ici, le relâchement renforce son pas en avant. Une récompense peut aussi renforcer une bonne réponse.",
      en:"Here the release reinforces his step forward. A reward can also reinforce a good answer.",
      es:"Aquí, la soltura refuerza su paso adelante. Una recompensa también puede reforzar una buena respuesta.",
      it:"Qui il rilascio rinforza il suo passo avanti. Anche una ricompensa può rinforzare una buona risposta.",
      de:"Hier verstärkt das Nachgeben seinen Schritt nach vorn. Auch eine Belohnung kann eine gute Antwort verstärken.",
      ja:"ここでは、圧を抜いたことが前への一歩を強化します。ごほうびもまた、良い反応を強化できます。",
      ar:"هنا، تخفيف الضغط يعزز خطوته إلى الأمام. ويمكن للمكافأة أيضا أن تعزز استجابة جيدة." },

    { ref:"d-clo-il-attend", temps:5, dit:"joueuse", mots:["pause"],
      fr:"Il est redescendu tout seul et il attend.",
      en:"He stepped back down on his own and he is waiting.",
      es:"Bajó solo y está esperando.",
      it:"È sceso da solo e aspetta.",
      de:"Er ist von allein wieder heruntergegangen und wartet.",
      ja:"自分から降りて、待っています。",
      ar:"نزل من تلقاء نفسه وهو ينتظر." },

    { ref:"d-clo-laisse", temps:5, dit:"club", mots:["pause"],
      fr:"Laisse-le. La pause lui laisse le temps de traiter ce qui vient de se passer.",
      en:"Leave him. The break gives him time to process what has just happened.",
      es:"Déjalo. La pausa le da tiempo para asimilar lo que acaba de pasar.",
      it:"Lascialo. La sosta gli dà il tempo di elaborare quel che è appena successo.",
      de:"Lass ihn. Die Pause gibt ihm Zeit, das eben Erlebte zu verarbeiten.",
      ja:"そのままに。休憩は、今起きたことを整理する時間になります。",
      ar:"اتركيه. الاستراحة تمنحه وقتا ليستوعب ما حدث للتو." },

    /* ---- temps 6 · anticipation et fin de séance ---- */

    { ref:"d-clo-copains", temps:6, dit:"joueuse", mots:["troupeau"],
      fr:"Les autres chevaux le regardent depuis le paddock.",
      en:"The other horses are watching him from the paddock.",
      es:"Los otros caballos lo miran desde el paddock.",
      it:"Gli altri cavalli lo guardano dal paddock.",
      de:"Die anderen Pferde schauen ihm von der Koppel aus zu.",
      ja:"ほかの馬たちが放牧地から見ています。",
      ar:"الخيول الأخرى تنظر إليه من المرعى." },

    { ref:"d-clo-presence", temps:6, dit:"club", mots:["troupeau"],
      fr:"Leur présence peut le rassurer, à condition qu'elle n'augmente pas son agitation.",
      en:"Their presence can reassure him, as long as it does not add to his agitation.",
      es:"Su presencia puede tranquilizarlo, siempre que no aumente su agitación.",
      it:"La loro presenza può rassicurarlo, purché non aumenti la sua agitazione.",
      de:"Ihre Anwesenheit kann ihn beruhigen, solange sie seine Unruhe nicht verstärkt.",
      ja:"仲間がいることは安心になり得ます。ただし、落ち着きを乱さない範囲で。",
      ar:"وجودها قد يطمئنه، شرط ألا يزيد من اضطرابه." },

    { ref:"d-clo-avant-demande", temps:6, dit:"joueuse", mots:["anticipation"],
      fr:"Il a avancé avant que je lui demande complètement.",
      en:"He moved forward before I had fully asked.",
      es:"Avanzó antes de que yo terminara de pedírselo.",
      it:"È avanzato prima che io glielo chiedessi del tutto.",
      de:"Er ist vorwärtsgegangen, bevor ich zu Ende gefragt hatte.",
      ja:"求めを出しきる前に、前に進みました。",
      ar:"تقدم قبل أن أكمل طلبي." },

    { ref:"d-clo-reconnu", temps:6, dit:"club", mots:["anticipation","signal"],
      fr:"Il a anticipé parce qu'il a reconnu la situation. Observe maintenant s'il reste attentif à ton signal.",
      en:"He anticipated because he recognised the situation. Now watch whether he stays attentive to your cue.",
      es:"Se anticipó porque reconoció la situación. Ahora observa si sigue atento a tu señal.",
      it:"Ha anticipato perché ha riconosciuto la situazione. Ora osserva se resta attento al tuo segnale.",
      de:"Er hat vorweggenommen, weil er die Situation erkannt hat. Beobachte jetzt, ob er deinem Signal aufmerksam bleibt.",
      ja:"状況を理解したから先取りしたのです。では、あなたの合図に注意を向け続けているか見てください。",
      ar:"توقع المطلوب لأنه تعرف إلى الموقف. راقبي الآن إن كان يبقى منتبها لإشارتك." },

    { ref:"d-clo-deux-pieds", temps:6, dit:"joueuse", mots:["progresser"],
      fr:"Il a posé deux pieds sur le pont sans reculer.",
      en:"He put two feet on the ramp without backing off.",
      es:"Puso dos pies en la rampa sin retroceder.",
      it:"Ha messo due piedi sulla pedana senza indietreggiare.",
      de:"Er hat zwei Hufe auf die Rampe gesetzt, ohne zurückzuweichen.",
      ja:"後ずさりせずに、二本の脚をスロープに乗せました。",
      ar:"وضع قائمتين على منحدر المقطورة دون أن يتراجع." },

    { ref:"d-clo-assimilee", temps:6, dit:"club", mots:["progresser","seuil"],
      fr:"C'est suffisant pour aujourd'hui. Cette étape est assimilée. Mieux vaut terminer sur une réponse calme que dépasser son seuil en voulant tout obtenir.",
      en:"That is enough for today. This step is assimilated. Better to finish on a calm answer than to push past his threshold trying to get everything.",
      es:"Es suficiente por hoy. Esta etapa está asimilada. Más vale terminar con una respuesta tranquila que superar su umbral queriendo obtenerlo todo.",
      it:"Per oggi basta così. Questa tappa è assimilata. Meglio finire su una risposta calma che superare la sua soglia volendo ottenere tutto.",
      de:"Für heute reicht das. Dieser Schritt ist verarbeitet. Besser mit einer ruhigen Antwort aufhören, als seine Schwelle zu überschreiten, um alles zu erreichen.",
      ja:"今日はこれで十分です。この段階は身につきました。すべてを得ようとして閾値を超えるより、落ち着いた反応で終えるほうがよいのです。",
      ar:"هذا يكفي لليوم. لقد فهم هذه المرحلة. إنهاء الجلسة باستجابة هادئة أفضل من تجاوز عتبته في محاولة للحصول على كل شيء دفعة واحدة." }

    ]
  }
};
