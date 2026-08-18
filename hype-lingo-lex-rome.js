/* hype-lingo-lex-rome.js — Hype Lingo · Chapitre « Le concours »
   ==================================================================
   ISSU DU DÉCOUPAGE DU 18/08/2026 (session « un fichier par ville »).
   Contenu déplacé tel quel depuis hype-lingo-lex-concours.js, leçon 4
   — AUCUN ref, AUCUNE définition, AUCUNE phrase modifiée. Le nom de la
   clé de chapitre change : `concours` devient `rome`. Le dialogue
   `dialogueRome` est renommé `dialogue` (un seul dialogue ici).

   ⚠️ `titre` REPRIS TEL QUEL DE L'ANCIEN CHAPITRE.

   UNE SEULE LEÇON, CONSERVÉE À L'IDENTIQUE :
     · leçon 4 — la Coupe des Nations et les gens du concours (21 concepts)

   Les leçons 1 (Oliva), 2 (Badminton) et 3 (réserve) sont déplacées
   séparément dans leurs propres fichiers.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.rome = {
  ref: "rome",
  titre: { fr:"Le concours", en:"The show", es:"El concurso", it:"Il concorso", de:"Das Turnier", ja:"競技会" },
  lecons: 1,

  concepts: [

  /* ================================================================
     LA COUPE DES NATIONS — dix entrées ajoutées le 17/08/2026, avec le
     lexique fourni par Blandine pour ROME.
     🟥 LA LEÇON 4 NE PARLAIT QUE DU CONCURRENT INDIVIDUEL : concurrent,
     propriétaire, entraîneur, jury, réclamation, règlement, minima,
     championnat, trophée, esprit sportif. AUCUN mot d'équipe, alors que
     Rome EST la Coupe des Nations. Le chapitre était à côté de son
     sujet.

     🟥 SA FORMULE, à garder telle quelle pour la première mini-leçon :
     **4 riders → 3 scores count → 2 rounds → 1 nation wins**
     Quatre cavaliers, trois scores comptent, deux manches, une nation
     gagne. Tout le système en une ligne. ⚠️ NE PAS la reformuler.

     ⚠️ ET LE MOT LE PLUS ÉTRANGE DU LEXIQUE : **le chef d'équipe** se
     dit « chef d'équipe » EN ANGLAIS AUSSI — les Britanniques ont gardé
     le français, comme pour « travers » et « appuyer ». On dit aussi
     *team manager*, mais sur un concours international c'est « the chef »
     tout court qu'on entend.
     ================================================================ */

  { ref:"coupe-nations", lecon:4, coll:"equipe",
    mots:{ fr:{m:"la Coupe des Nations"}, en:{m:"the Nations Cup", p:"néï-cheunz keup"},
           es:{m:"la Copa de las Naciones"}, it:{m:"la Coppa delle Nazioni"},
           de:{m:"der Nationenpreis", p:"na-tsio-neune-praïss"}, ja:{m:"ネーションズカップ", p:"nēshonzu kappu"} },
    def:{ fr:"🟥 QUATRE CAVALIERS, TROIS SCORES COMPTENT, DEUX MANCHES, UNE NATION GAGNE. C'est la seule épreuve d'équipe du saut d'obstacles, et elle change tout : on ne monte plus pour soi. Le plus mauvais score des quatre est écarté — ce qui veut dire qu'un cavalier peut sauver son équipe, et qu'un autre peut la porter. ⚠️ L'allemand dit *Nationenpreis*, « le prix des nations ».",
          en:"Four riders, three scores count, two rounds, one nation wins. It's the only team competition in showjumping, and it changes everything: you're no longer riding for yourself. The worst of the four scores is dropped.",
          es:"Cuatro jinetes, tres resultados cuentan, dos mangas, gana una nación. Es la única prueba por equipos del salto, y lo cambia todo: ya no se monta para uno mismo.",
          it:"Quattro cavalieri, tre punteggi contano, due manche, vince una nazione. È l'unica prova a squadre del salto ostacoli, e cambia tutto: non si monta più per sé.",
          de:"Vier Reiter, drei Ergebnisse zählen, zwei Umläufe, eine Nation gewinnt. Der einzige Teamwettbewerb im Springen — und er ändert alles: man reitet nicht mehr für sich.",
          ja:"四人の騎手、上位三つの成績が有効、二回の走行、勝つのは一つの国。障害馬術で唯一の団体戦であり、すべてが変わります。もはや自分のために乗るのではありません。四人のうち最も悪い成績は除外されます。" } },

  { ref:"equipe-nationale", lecon:4, coll:"equipe",
    mots:{ fr:{m:"l'équipe nationale"}, en:{m:"the national team", p:"na-cheu-neul tiime"},
           es:{m:"el equipo nacional"}, it:{m:"la squadra nazionale"},
           de:{m:"die Nationalmannschaft", p:"na-tsio-nal-mann-chaft"}, ja:{m:"代表チーム", p:"daihyō chīmu"} },
    def:{ fr:"Quatre couples cavalier-cheval, une veste aux couleurs du pays, et un ordre de passage décidé par le chef d'équipe. ⚠️ On ne choisit pas sa place : le premier à partir n'a pas le même travail que le dernier — voir `ordre-depart`.",
          en:"Four horse-and-rider combinations, a jacket in the national colours, and a running order decided by the chef d'équipe. You don't choose your slot: going first is not the same job as going last.",
          es:"Cuatro combinaciones jinete-caballo, una chaqueta con los colores del país y un orden de salida decidido por el jefe de equipo.",
          it:"Quattro binomi cavaliere-cavallo, una giacca coi colori del paese e un ordine di partenza deciso dal capo equipe.",
          de:"Vier Reiter-Pferd-Paare, ein Jackett in den Landesfarben und eine Startfolge, die der Chef d'équipe festlegt.",
          ja:"四つの人馬コンビ、国の色のジャケット、そして監督が決める出場順。順番は選べません。一番目と最後では役割が違います。" } },

  { ref:"chef-equipe", lecon:4, coll:"equipe",
    mots:{ fr:{m:"le chef d'équipe"}, en:{m:"the chef d'équipe", p:"chèf dé-kipe", var:"the team manager"},
           es:{m:"el jefe de equipo"}, it:{m:"il capo equipe"},
           de:{m:"der Equipechef", p:"é-kipe-chèf"}, ja:{m:"監督", p:"kantoku"} },
    def:{ fr:"🟥 L'ANGLAIS A GARDÉ LE FRANÇAIS : on dit **the chef d'équipe**, ou simplement « the chef » sur un concours international. Comme « travers » et « appuyer » en dressage, c'est un mot que l'équitation a exporté. ⚠️ C'est lui qui décide de l'ordre de passage, de la stratégie entre les deux manches, et qui désigne le cavalier du barrage.",
          en:"English kept the French: « the chef d'équipe », or just « the chef ». Like « travers » and « appuyer » in dressage, riding exported this word. He decides the running order, the strategy between rounds, and who jumps off.",
          es:"El inglés conservó el francés: « the chef d'équipe ». Él decide el orden de salida, la estrategia entre mangas y quién salta el desempate.",
          it:"L'inglese ha conservato il francese: « the chef d'équipe ». Decide l'ordine di partenza, la strategia tra le manche e chi va al barrage.",
          de:"Englisch hat das Französische behalten: « the chef d'équipe ». Er bestimmt die Startfolge, die Strategie zwischen den Umläufen und den Reiter fürs Stechen.",
          ja:"英語もフランス語をそのまま使い、the chef d'équipe と言います。馬場馬術の travers や appuyer と同じく、馬術が輸出した言葉です。出場順、二回目の戦略、そしてジャンプオフに出る騎手を決めます。" } },

  { ref:"coequipier", lecon:4, coll:"equipe",
    mots:{ fr:{m:"le coéquipier"}, en:{m:"the teammate", p:"tiime-méïte"},
           es:{m:"el compañero de equipo"}, it:{m:"il compagno di squadra"},
           de:{m:"der Teamkollege", p:"tiime-ko-lé-gue"}, ja:{m:"チームメイト", p:"chīmumeito"} },
    def:{ fr:"⚠️ UN MOT QUI N'EXISTE PRESQUE PAS AILLEURS EN ÉQUITATION. Le reste de l'année on est concurrent de tout le monde ; en Coupe des Nations, trois personnes ont besoin qu'on réussisse. C'est ce qui rend l'épreuve si particulière — et si dure.",
          en:"A word that barely exists elsewhere in riding. The rest of the year everyone is your rival; in a Nations Cup, three people need you to go well. That's what makes it so particular, and so hard.",
          es:"Una palabra que casi no existe en el resto de la equitación. El resto del año todos son rivales; en la Copa de las Naciones, tres personas necesitan que salga bien.",
          it:"Una parola che quasi non esiste altrove nell'equitazione. Il resto dell'anno tutti sono rivali; in Coppa delle Nazioni, tre persone hanno bisogno che tu vada bene.",
          de:"Ein Wort, das es im Reitsport sonst kaum gibt. Das ganze Jahr sind alle Konkurrenten; im Nationenpreis brauchen drei Menschen, dass du gut gehst.",
          ja:"馬術ではほとんど使われない言葉です。普段は誰もが競争相手ですが、ネーションズカップでは三人があなたの成功を必要としています。それがこの競技の特別さであり、厳しさです。" } },

  { ref:"couple", lecon:4, coll:"equipe",
    mots:{ fr:{m:"le couple cavalier-cheval"}, en:{m:"the horse-and-rider combination", p:"kom-bi-néï-cheune"},
           es:{m:"la combinación jinete-caballo"}, it:{m:"il binomio cavaliere-cavallo"},
           de:{m:"das Reiter-Pferd-Paar", p:"raï-teur-pfèrt-pare"}, ja:{m:"人馬のコンビ", p:"jinba no konbi"} },
    def:{ fr:"⚠️ EN ANGLAIS ON DIT **a combination**, mot à mot « une combinaison » — le même mot qu'une combinaison d'obstacles, ce qui prête à confusion. L'italien a le plus beau terme : *un binomio*, « un binôme ». Ce qui compte, c'est que le classement note le couple, jamais le cavalier seul.",
          en:"English says « a combination » — the same word as a combination of fences, which can confuse. Italian has the finest term: un binomio. What matters is that the score belongs to the pair, never the rider alone.",
          es:"En inglés se dice « a combination », la misma palabra que una combinación de obstáculos. El italiano tiene el término más bello: un binomio.",
          it:"In inglese si dice « a combination », la stessa parola di una combinazione di ostacoli. L'italiano ha il termine più bello: un binomio.",
          de:"Englisch sagt « a combination » — dasselbe Wort wie eine Hindernis-Kombination, was verwirren kann. Italienisch hat den schönsten Ausdruck: un binomio.",
          ja:"英語では a combination と言い、障害の組み合わせと同じ語なので混乱しやすいです。イタリア語の un binomio（二人組）が最も美しい表現です。順位は騎手個人ではなく、常に人馬のコンビに与えられます。" } },

  { ref:"premiere-manche", lecon:4, coll:"equipe",
    mots:{ fr:{m:"la première manche"}, en:{m:"the first round", p:"feurst raound"},
           es:{m:"la primera manga"}, it:{m:"la prima manche"},
           de:{m:"der erste Umlauf", p:"èrs-te oum-laouf"}, ja:{m:"第一回走行", p:"daiichi-kai sōkō"} },
    def:{ fr:"Les quatre cavaliers passent une première fois, dans l'ordre décidé par le chef d'équipe. ⚠️ Le premier à partir a un rôle particulier : il donne un « parcours de référence » — les autres sauront ce que vaut le tracé. En anglais on dit *a good opening round*.",
          en:"All four go once, in the order the chef d'équipe decides. The first to go has a particular job: a good opening round tells the others what the course is worth.",
          es:"Los cuatro pasan una primera vez, en el orden decidido por el jefe de equipo. El primero da un recorrido de referencia.",
          it:"I quattro passano una prima volta, nell'ordine deciso dal capo equipe. Il primo dà un percorso di riferimento.",
          de:"Alle vier gehen einmal, in der Reihenfolge, die der Chef d'équipe festlegt. Der Erste hat eine besondere Aufgabe: er zeigt, was der Parcours wert ist.",
          ja:"四人が監督の決めた順で一度ずつ走ります。一番目には特別な役割があります。基準となる走行を見せ、他の三人にコースの難易度を伝えるのです。" } },

  { ref:"deuxieme-manche", lecon:4, coll:"equipe",
    mots:{ fr:{m:"la deuxième manche"}, en:{m:"the second round", p:"sè-keunde raound"},
           es:{m:"la segunda manga"}, it:{m:"la seconda manche"},
           de:{m:"der zweite Umlauf", p:"tsvaï-te oum-laouf"}, ja:{m:"第二回走行", p:"daini-kai sōkō"} },
    def:{ fr:"🟥 SEULES LES MEILLEURES ÉQUIPES Y REVIENNENT, et **dans l'ordre inverse du classement** : la nation en tête passe en dernier. C'est ce qui rend la fin insoutenable — on sait exactement ce qu'il faut faire, et tout le monde le sait aussi. ⚠️ Le nombre d'équipes qualifiées varie selon l'épreuve : ne pas l'inventer, le demander.",
          en:"Only the best teams come back, and in reverse order of the standings: the leading nation goes last. That's what makes the end unbearable — you know exactly what you have to do, and so does everyone else.",
          es:"Solo vuelven los mejores equipos, y en orden inverso a la clasificación: la nación líder pasa última.",
          it:"Solo le squadre migliori tornano, e in ordine inverso alla classifica: la nazione in testa passa per ultima.",
          de:"Nur die besten Teams kommen zurück, und in umgekehrter Reihenfolge der Wertung: die führende Nation reitet zuletzt.",
          ja:"上位のチームだけが戻り、順位の逆順で走ります。首位の国が最後です。だから終盤は耐えがたい。何をすべきか正確にわかっていて、周りもみな知っているからです。" } },

  { ref:"score-ecarte", lecon:4, coll:"equipe",
    mots:{ fr:{m:"le score écarté"}, en:{m:"the drop score", p:"drop skor"},
           es:{m:"el resultado descartado"}, it:{m:"il punteggio scartato"},
           de:{m:"das Streichergebnis", p:"chtraï-che-èr-guèb-niss"}, ja:{m:"除外される成績", p:"jogai sareru seiseki"} },
    def:{ fr:"🟥 LE MÉCANISME QUI FAIT TOUT LE SEL DE L'ÉPREUVE. Sur quatre scores, le plus mauvais est écarté : trois seulement comptent. Un cavalier peut donc rater complètement son parcours sans faire perdre son équipe — une fois. La deuxième erreur coûte la victoire. ⚠️ C'est ce qui explique les stratégies : « ne prends pas de risques, le temps n'est pas notre priorité ».",
          en:"The mechanism that makes the whole thing. Of four scores the worst is dropped: only three count. A rider can have a disaster without costing the team — once. The second mistake costs the win.",
          es:"El mecanismo que da todo su sabor a la prueba. De cuatro resultados se descarta el peor: solo cuentan tres. Un jinete puede fallar del todo sin hacer perder al equipo, una vez.",
          it:"Il meccanismo che dà tutto il sale alla prova. Di quattro punteggi il peggiore è scartato: solo tre contano. Un cavaliere può sbagliare tutto senza far perdere la squadra, una volta sola.",
          de:"Der Mechanismus, der alles ausmacht. Von vier Ergebnissen fällt das schlechteste weg: nur drei zählen. Ein Reiter darf einmal scheitern, ohne das Team zu kosten.",
          ja:"この競技の面白さを生む仕組み。四つの成績のうち最悪の一つが除外され、三つだけが有効です。一人が完全に失敗してもチームは負けません。ただし一度だけ。二つ目の失敗は勝利を失わせます。" } },

  { ref:"barre-tombee", lecon:4, coll:"equipe",
    mots:{ fr:{m:"une barre"}, en:{m:"a rail down", p:"réïl daoune", var:"a fence down"},
           es:{m:"una barra"}, it:{m:"una barriera"},
           de:{m:"ein Abwurf", p:"app-vourf"}, ja:{m:"バー一本の落下", p:"bā ippon no rakka"} },
    def:{ fr:"⚠️ EN ANGLAIS ON NE DIT PAS « a bar » MAIS **a rail** — et « une barre » se dit *a rail down*, avec le « down » qui porte tout le sens. La formule des chefs d'équipe : *we can still afford one rail, but no more*. En allemand un abattage se dit *ein Abwurf*, littéralement « un jet ».",
          en:"Not « a bar » but « a rail », and you say « a rail down » — the « down » carries the meaning. The chef d'équipe's phrase: we can still afford one rail, but no more.",
          es:"En inglés no se dice « a bar » sino « a rail », y se dice « a rail down ».",
          it:"In inglese non si dice « a bar » ma « a rail », e si dice « a rail down ».",
          de:"Englisch sagt nicht « a bar », sondern « a rail down ». Deutsch: ein Abwurf, wörtlich « ein Wurf ».",
          ja:"英語では a bar ではなく a rail と言い、落下は a rail down と表します。down が意味の中心です。ドイツ語の Abwurf は「投げ落とすこと」という意味です。" } },

  { ref:"ordre-depart", lecon:4, coll:"equipe",
    mots:{ fr:{m:"l'ordre de départ"}, en:{m:"the starting order", p:"star-tinng or-deur"},
           es:{m:"el orden de salida"}, it:{m:"l'ordine di partenza"},
           de:{m:"die Startfolge", p:"chtart-fol-gue"}, ja:{m:"出場順", p:"shutsujō jun"} },
    def:{ fr:"⚠️ CE N'EST PAS UN TIRAGE AU SORT, C'EST UNE DÉCISION. Le chef d'équipe place son cavalier le plus régulier en premier — il ouvre et rassure — et son meilleur en dernier, parce que c'est lui qui devra faire le score sous pression. En deuxième manche, l'ordre s'inverse selon le classement.",
          en:"It isn't a draw, it's a decision. The chef d'équipe puts the most reliable rider first — to open and to reassure — and the best one last, because that's the score made under pressure.",
          es:"No es un sorteo, es una decisión. El jefe de equipo pone al jinete más regular primero y al mejor al final, porque es el resultado bajo presión.",
          it:"Non è un sorteggio, è una decisione. Il capo equipe mette il cavaliere più regolare per primo e il migliore per ultimo, perché è il punteggio sotto pressione.",
          de:"Es ist keine Auslosung, sondern eine Entscheidung. Der Chef d'équipe setzt den zuverlässigsten Reiter zuerst und den besten zuletzt.",
          ja:"抽選ではなく判断です。監督は最も安定した騎手を先頭に置き、最も強い騎手を最後に置きます。重圧の中で成績を出すのは最後の走行だからです。" } },

  { ref:"representer-pays", lecon:4, coll:"equipe",
    mots:{ fr:{m:"représenter son pays"}, en:{m:"to represent your country", p:"rè-pri-zènte"},
           es:{m:"representar a su país"}, it:{m:"rappresentare il proprio paese"},
           de:{m:"sein Land vertreten", p:"feur-tré-teune"}, ja:{m:"国を代表する", p:"kuni o daihyō suru"} },
    def:{ fr:"🟥 CE QUI CHANGE TOUT, et la première phrase du chapitre : « aujourd'hui, tu ne montes pas seulement pour toi, tu montes pour ton pays ». On porte la veste nationale, l'hymne joue si l'on gagne, et une faute ne coûte plus seulement un classement. ⚠️ C'est aussi la seule fois de l'année où un cavalier n'a pas le droit de choisir sa stratégie seul.",
          en:"What changes everything, and the chapter's first sentence: today you're not just riding for yourself, you're riding for your country. You wear the national jacket, the anthem plays if you win, and a mistake no longer costs only a placing.",
          es:"Lo que lo cambia todo: hoy no montas solo para ti, montas para tu país. Se lleva la chaqueta nacional y suena el himno si se gana.",
          it:"Ciò che cambia tutto: oggi non monti solo per te, monti per il tuo paese. Si indossa la giacca nazionale e suona l'inno se si vince.",
          de:"Was alles ändert: heute reitest du nicht nur für dich, sondern für dein Land. Man trägt das Nationaljackett, und die Hymne spielt, wenn man gewinnt.",
          ja:"すべてを変えるもの。この章の最初の一文です。「今日は自分のためだけに乗るのではなく、国のために乗る」。国の色のジャケットを着て、勝てば国歌が流れます。ミスはもう順位だけの問題ではありません。" } },

  { ref:"concurrent", lecon:4, coll:"gens",
    mots:{ fr:{m:"le concurrent"}, en:{m:"the competitor", p:"kom-pè-ti-teur"},
           es:{m:"el participante"}, it:{m:"il concorrente"},
           de:{m:"der Teilnehmer", p:"taïl-né-meur"}, ja:{m:"出場者", p:"shutsujōsha"} }, // ??
    def:{ fr:"Toi, le temps d'une journée. L'allemand est le plus doux des six : *Teilnehmer*, « celui qui prend part » — pas celui qui concourt.",
          en:"You, for a day. German is the gentlest of the six: Teilnehmer, « the one who takes part ».",
          es:"Tú, por un día. El alemán es el más suave de los seis: *Teilnehmer*, « el que toma parte » — no el que compite.",
          it:"Tu, per una giornata. Il tedesco è il più dolce dei sei: *Teilnehmer*, « colui che prende parte » — non colui che gareggia.",
          de:"Du, für einen Tag. Das Deutsche ist das sanfteste der sechs: der Teilnehmer — der teilnimmt, nicht der kämpft.",
          ja:"一日だけの、きみ自身のこと。六言語でいちばん柔らかいのはドイツ語です — *Teilnehmer*、「参加する者」。競う者、ではなく。" } },

  { ref:"proprietaire", lecon:4, coll:"gens",
    mots:{ fr:{m:"le propriétaire"}, en:{m:"the owner", p:"ô-neur"},
           es:{m:"el propietario"}, it:{m:"il proprietario"},
           de:{m:"der Besitzer", p:"be-zit-seur"}, ja:{m:"馬主", p:"banushi"} },
    def:{ fr:"Souvent absent du terrain, toujours présent sur les papiers. En Grande-Bretagne, on remercie publiquement les owners après une victoire : c'est un usage, pas une politesse.",
          en:"Often absent from the ground, always on the paperwork. In Britain, owners are publicly thanked after a win.",
          es:"A menudo ausente del terreno, siempre presente en los papeles. En Gran Bretaña se agradece públicamente a los owners tras una victoria: es un uso, no una cortesía.",
          it:"Spesso assente dal campo, sempre presente sui documenti. In Gran Bretagna si ringraziano pubblicamente gli owners dopo una vittoria: è un uso, non una cortesia.",
          de:"Oft nicht am Platz, immer in den Papieren. In Großbritannien dankt man den Owners nach einem Sieg öffentlich: Das ist Brauch, nicht Höflichkeit.",
          ja:"会場にいないことは多くても、書類には必ずいる人。イギリスでは勝利のあと、オーナーへ公に感謝を述べます。礼儀ではなく、しきたりです。" } },

  { ref:"entraineur", lecon:4, coll:"gens",
    mots:{ fr:{m:"l'entraîneur"}, en:{m:"the trainer", p:"tré-neur", var:"the coach"},
           es:{m:"el entrenador"}, it:{m:"l'allenatore"},
           de:{m:"der Trainer", p:"tré-neur"}, ja:{m:"コーチ", p:"kōchi"} },
    def:{ fr:"⚠️ Nuance britannique utile : **trainer** entraîne les chevaux, **coach** entraîne les cavaliers. Demander « who's your coach ? » et « who trains your horse ? » n'appelle pas la même réponse.",
          en:"A useful British nuance: a trainer trains horses, a coach trains riders.",
          es:"⚠️ Matiz británico útil: **trainer** entrena a los caballos, **coach** a los jinetes. Preguntar « who's your coach ? » y « who trains your horse ? » no llama a la misma respuesta.",
          it:"⚠️ Sfumatura britannica utile: **trainer** allena i cavalli, **coach** i cavalieri. Chiedere « who's your coach ? » e « who trains your horse ? » non chiama la stessa risposta.",
          de:"⚠️ Nützliche britische Nuance: Der **trainer** trainiert Pferde, der **coach** Reiter. « Who's your coach ? » und « Who trains your horse ? » verlangen verschiedene Antworten.",
          ja:"⚠️ 役に立つイギリスの使い分け：**trainer** は馬を鍛える人、**coach** は騎手を教える人。« who's your coach ? » と « who trains your horse ? » では、返ってくる答えが違います。" } },

  { ref:"jury", lecon:4, coll:"gens",
    mots:{ fr:{m:"le jury"}, en:{m:"the ground jury", p:"graounde djou-ri", var:"the panel"},
           es:{m:"el jurado"}, it:{m:"la giuria"},
           de:{m:"die Jury", p:"jou-ri", var:"das Richterkollegium"}, ja:{m:"審判団", p:"shinpandan"} }, // ??
    def:{ fr:"L'ensemble des officiels qui décident, distinct du juge unique du dressage. En anglais on précise **ground jury** — le jury « au sol », par opposition aux commissaires en piste.",
          en:"The officials who decide, as opposed to the single dressage judge. English specifies the ground jury.",
          es:"El conjunto de oficiales que deciden, distinto del juez único de la doma. En inglés se precisa **ground jury** — el jurado « de tierra », por oposición a los comisarios en pista.",
          it:"L'insieme degli ufficiali che decidono, distinto dal giudice unico del dressage. In inglese si precisa **ground jury** — la giuria « a terra », in opposizione ai commissari in campo.",
          de:"Die Gesamtheit der entscheidenden Offiziellen, verschieden vom Einzelrichter der Dressur. Auf Englisch präzisiert man **ground jury** — die Jury « am Boden », im Gegensatz zu den Stewards auf dem Platz.",
          ja:"裁定を下す役員の全体。馬場馬術のひとりの審判とは別物です。英語では **ground jury** と限定します — 馬場上の係員たちと区別した、「地上の」審判団という意味で。" } },

  { ref:"reclamation", lecon:4, coll:"gens",
    mots:{ fr:{m:"la réclamation"}, en:{m:"an objection", p:"ob-djèk-cheune", var:"to lodge a complaint"},
           es:{m:"la reclamación"}, it:{m:"il reclamo"},
           de:{m:"der Einspruch", p:"aïn-chprourh"}, ja:{m:"異議申立", p:"igi mōshitate"} }, // ??
    def:{ fr:"Contester une décision, dans un délai court et souvent contre une caution. À l'étranger, la première question à poser n'est pas « comment réclamer » mais « à qui » : c'est presque toujours au secrétariat, pas au juge.",
          en:"Challenging a decision, within a short deadline and often against a deposit. Ask who to go to — usually the secretary, not the judge.",
          es:"Impugnar una decisión, en un plazo corto y a menudo con fianza. En el extranjero, la primera pregunta no es « cómo reclamar » sino « a quién »: casi siempre al secretariado, no al juez.",
          it:"Contestare una decisione, in un termine breve e spesso contro cauzione. All'estero, la prima domanda da fare non è « come reclamare » ma « a chi »: quasi sempre alla segreteria, non al giudice.",
          de:"Eine Entscheidung anfechten, in kurzer Frist und oft gegen Kaution. Im Ausland lautet die erste Frage nicht « wie », sondern « bei wem »: fast immer beim Turnierbüro, nicht beim Richter.",
          ja:"短い期限内に、しばしば保証金を添えて、裁定に異議を申し立てること。海外でまず尋ねるべきは「どうやって」ではなく「誰に」— ほぼ必ず事務局であって、審判ではありません。" } },

  { ref:"reglement", lecon:4, coll:"gens",
    mots:{ fr:{m:"le règlement"}, en:{m:"the rules", p:"roulz", var:"the rule book"},
           es:{m:"el reglamento"}, it:{m:"il regolamento"},
           de:{m:"die Turnierordnung", p:"tour-nir-ord-noung"}, ja:{m:"規定", p:"kitei"} },
    def:{ fr:"Chaque pays a le sien, en plus du règlement international. C'est là que se cachent les différences qui surprennent : muserolles autorisées, âge minimum, obligation du gilet, tenue exigée.",
          en:"Every country has its own on top of the international rules — where the surprising differences hide.",
          es:"Cada país tiene el suyo, además del reglamento internacional. Ahí se esconden las diferencias que sorprenden: muserolas autorizadas, edad mínima, obligación del chaleco, vestimenta exigida.",
          it:"Ogni paese ha il suo, oltre al regolamento internazionale. È lì che si nascondono le differenze che sorprendono: capezzine autorizzate, età minima, obbligo del gilet, tenuta richiesta.",
          de:"Jedes Land hat sein eigenes, zusätzlich zum internationalen. Dort verstecken sich die Überraschungen: erlaubte Nasenriemen, Mindestalter, Westenpflicht, verlangte Kleidung.",
          ja:"国際規則に加えて、国ごとの規則があります。驚かされる違いが潜むのはそこです — 許可される鼻革、最低年齢、ベスト着用義務、服装規定。" } },

  { ref:"minima", lecon:4, coll:"gens",
    mots:{ fr:{m:"la note minimale"}, en:{m:"the qualifying score", p:"kva-li-faï-ing skor", var:"an MER (FEI)"},
           es:{m:"la nota mínima"}, it:{m:"il punteggio minimo"},
           de:{m:"die Qualifikation", p:"kva-li-fi-ka-tsi-ône"}, ja:{m:"資格得点", p:"shikaku tokuten"} }, // ??
    def:{ fr:"Le résultat qu'il faut atteindre pour accéder au niveau suivant. En complet international, l'acronyme à connaître est **MER** — *minimum eligibility requirement*, la performance minimale exigée.",
          en:"The result needed to move up a level. In international eventing the acronym is MER: minimum eligibility requirement.",
          es:"El resultado que hay que alcanzar para acceder al nivel siguiente. En completo internacional, el acrónimo a conocer es **MER** — *minimum eligibility requirement*, el rendimiento mínimo exigido.",
          it:"Il risultato da raggiungere per accedere al livello successivo. Nel completo internazionale, l'acronimo da conoscere è **MER** — *minimum eligibility requirement*, la prestazione minima richiesta.",
          de:"Das Ergebnis, das man für die nächste Stufe braucht. Im internationalen Complet heißt das Kürzel **MER** — *minimum eligibility requirement*, die geforderte Mindestleistung.",
          ja:"次のレベルへ進むために出さなければならない成績。国際総合馬術で知っておくべき略語は **MER** — *minimum eligibility requirement*、要求される最低限の成績です。" } },

  { ref:"championnat", lecon:4, coll:"gens",
    mots:{ fr:{m:"le championnat"}, en:{m:"the championship", p:"tcham-pieune-chip"},
           es:{m:"el campeonato"}, it:{m:"il campionato"},
           de:{m:"die Meisterschaft", p:"maïss-teur-chaft"}, ja:{m:"選手権", p:"senshuken"} },
    def:{ fr:"Le titre annuel, par catégorie et par pays. Badminton n'en est pas un : c'est un concours privé, plus prestigieux que bien des championnats — la géographie du prestige équestre ne suit pas les titres.",
          en:"The annual title, by category and country. Badminton is not one: it is a private event, more prestigious than many championships.",
          es:"El título anual, por categoría y país. Badminton no lo es: es un concurso privado, más prestigioso que muchos campeonatos — la geografía del prestigio ecuestre no sigue los títulos.",
          it:"Il titolo annuale, per categoria e paese. Badminton non lo è: è un concorso privato, più prestigioso di molti campionati — la geografia del prestigio equestre non segue i titoli.",
          de:"Der Jahrestitel, nach Kategorie und Land. Badminton ist keiner: ein privates Turnier, prestigeträchtiger als viele Championate — die Geographie des Reitsport-Prestiges folgt nicht den Titeln.",
          ja:"カテゴリーごと、国ごとの年間タイトル。バドミントンは選手権ではありません。私設の大会でありながら、多くの選手権より格上 — 馬術の威信の地図は、タイトルの地図とは重なりません。" } },

  { ref:"trophee", lecon:4, coll:"gens",
    mots:{ fr:{m:"le trophée"}, en:{m:"the trophy", p:"trô-fi", var:"the cup"},
           es:{m:"el trofeo"}, it:{m:"il trofeo"},
           de:{m:"der Pokal", p:"po-kal"}, ja:{m:"トロフィー", p:"torofī"} },
    def:{ fr:"Souvent un challenge : on le gagne pour un an et on le rend l'année suivante, avec son nom gravé dessus. Les grands trophées britanniques sont plus vieux que la plupart des fédérations.",
          en:"Often a perpetual trophy: won for a year, returned the next with your name engraved on it.",
          es:"A menudo un challenge: se gana por un año y se devuelve al siguiente, con el nombre grabado. Los grandes trofeos británicos son más viejos que la mayoría de las federaciones.",
          it:"Spesso un challenge: si vince per un anno e si restituisce l'anno dopo, col nome inciso sopra. I grandi trofei britannici sono più vecchi della maggior parte delle federazioni.",
          de:"Oft ein Wanderpokal: Man gewinnt ihn für ein Jahr und gibt ihn zurück, den eigenen Namen eingraviert. Die großen britischen Trophäen sind älter als die meisten Verbände.",
          ja:"持ち回りのことが多い賞杯。一年間だけ手元に置き、名前を刻んで翌年返します。イギリスの大トロフィーの多くは、たいていの連盟より年上です。" } },

  { ref:"esprit-sportif", lecon:4, coll:"gens",
    mots:{ fr:{m:"l'esprit sportif"}, en:{m:"sportsmanship", p:"sportss-meun-chip", var:"well ridden !"},
           es:{m:"la deportividad"}, it:{m:"la sportività"},
           de:{m:"die Sportlichkeit", p:"chport-lirh-kaïte", var:"Fairplay"}, ja:{m:"スポーツマンシップ", p:"supōtsumanshippu"} },
    def:{ fr:"La phrase la plus utile de tout le chapitre, dans les six langues : **bravo, joli parcours**. La dire à quelqu'un qui vient de sortir de piste ouvre plus de portes dans une écurie étrangère que n'importe quel classement. En Grande-Bretagne on dit simplement **« well ridden ! »**.",
          en:"The most useful sentence in the chapter: « well ridden ! ». Saying it to someone leaving the arena opens more doors abroad than any placing.",
          es:"La frase más útil de todo el capítulo, en las seis lenguas: **bravo, bonito recorrido**. Decírsela a alguien que acaba de salir de pista abre más puertas en una cuadra extranjera que cualquier clasificación. En Gran Bretaña se dice simplemente **« well ridden ! »**.",
          it:"La frase più utile di tutto il capitolo, nelle sei lingue: **bravo, bel percorso**. Dirla a qualcuno appena uscito dal campo apre più porte in una scuderia straniera di qualsiasi classifica. In Gran Bretagna si dice semplicemente **« well ridden ! »**.",
          de:"Der nützlichste Satz des ganzen Kapitels, in allen sechs Sprachen: **Bravo, schöne Runde**. Ihn jemandem zu sagen, der gerade vom Platz kommt, öffnet in einem fremden Stall mehr Türen als jede Platzierung. In Großbritannien sagt man schlicht **« well ridden ! »**.",
          ja:"この章でいちばん役に立つひと言。六言語すべてで — **お見事、いい走行でしたね**。馬場から出てきたばかりの人にかけるその言葉は、どんな成績よりも、外国の厩舎の扉を開いてくれます。イギリスならただ **« well ridden ! »** と。" } },

  ],

  /* ---- phrases complètes ---- */
  phrases: [
    { ref:"bravo", lecon:4,
      fr:"Bravo, joli parcours !",
      en:"Well ridden — lovely round !",
      es:"¡ Enhorabuena, bonito recorrido !",
      it:"Bravissima, bel percorso !",
      de:"Toll geritten, schöne Runde !",
      ja:"お見事 でした 、 いい 走行 でした !" }
  ],

  dialogue: {
    ville: "rome", lecon: 4, temps: 6, langues: ["fr","en","es","it","de","ja"],   /* 21 phrases */

    phrases: [

      /* ---- temps 1 · on monte pour son pays ---- */
      /* 🟥 Phrase de Blandine : la première du chapitre. */
      { ref:"dr-pour-ton-pays", temps:1, dit:"club", mots:["representer-pays","coupe-nations"],
        fr:"Aujourd'hui, tu ne montes pas seulement pour toi, tu montes pour ton pays.",
        en:"Today, you're not just riding for yourself, you're riding for your country.",
        es:"Hoy no montas solo para ti: montas para tu país.",
        it:"Oggi non monti solo per te: monti per il tuo paese.",
        de:"Heute reitest du nicht nur für dich, sondern für dein Land.",
        ja:"今日 は 自分 の ため だけ で は なく、 国 の ため に 乗り ます。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-plusieurs-couples", temps:1, dit:"club", mots:["equipe-nationale","couple"],
        fr:"Chaque équipe est composée de plusieurs couples cavalier-cheval.",
        en:"Each team is made up of several horse-and-rider combinations.",
        es:"Cada equipo está formado por varias combinaciones jinete-caballo.",
        it:"Ogni squadra è composta da più binomi cavaliere-cavallo.",
        de:"Jede Mannschaft besteht aus mehreren Reiter-Pferd-Paaren.",
        ja:"各 チーム は 複数 の 人馬 コンビ で 構成 され ます。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-trois-meilleurs", temps:1, dit:"club", mots:["coupe-nations"],
        fr:"Les trois meilleurs scores de l'équipe sont pris en compte.",
        en:"The three best scores of the team count.",
        es:"Se tienen en cuenta los tres mejores resultados del equipo.",
        it:"Contano i tre migliori punteggi della squadra.",
        de:"Die drei besten Ergebnisse der Mannschaft zählen.",
        ja:"チーム の 上位 三 つ の 成績 が 有効 に なり ます。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-score-ecarte", temps:1, dit:"club", mots:["score-ecarte"],
        fr:"Notre moins bon score pourra être écarté.",
        en:"Our worst score can be dropped.",
        es:"Nuestro peor resultado podrá descartarse.",
        it:"Il nostro punteggio peggiore potrà essere scartato.",
        de:"Unser schlechtestes Ergebnis kann gestrichen werden.",
        ja:"最も 悪い 成績 は 除外 でき ます。" },

      /* ---- temps 2 · mon rôle dans l'équipe ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-premier-reference", temps:2, dit:"club", mots:["ordre-depart","premiere-manche"],
        fr:"Tu passes en premier pour l'équipe, alors donne-nous un parcours de référence.",
        en:"You're first to go for the team, so give us a good opening round.",
        es:"Sales primera por el equipo, así que danos un recorrido de referencia.",
        it:"Parti prima per la squadra, quindi dacci un percorso di riferimento.",
        de:"Du gehst als Erste für die Mannschaft — gib uns eine gute Eröffnungsrunde.",
        ja:"チーム の 一番手 です。 基準 に なる 走行 を 見せ て ください。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-sans-faute-tete", temps:2, dit:"club", mots:[], motsAilleurs:["sans-faute"],
        fr:"Nous avons besoin d'un sans-faute pour rester en tête.",
        en:"We need a clear round to stay in the lead.",
        es:"Necesitamos un recorrido sin falta para seguir en cabeza.",
        it:"Ci serve un percorso netto per restare in testa.",
        de:"Wir brauchen eine Nullrunde, um in Führung zu bleiben.",
        ja:"首位 を 守る に は クリア ラウンド が 必要 です。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-une-barre-pas-plus", temps:2, dit:"club", mots:["barre-tombee"],
        fr:"Nous pouvons encore nous permettre une barre, mais pas davantage.",
        en:"We can still afford one rail, but no more.",
        es:"Todavía podemos permitirnos una barra, pero no más.",
        it:"Possiamo ancora permetterci una barriera, ma non di più.",
        de:"Einen Abwurf können wir uns noch erlauben, aber nicht mehr.",
        ja:"バー 一本 まで は 許容 でき ます が、 それ 以上 は 無理 です。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-apres-troisieme", temps:2, dit:"club", mots:["coequipier","ordre-depart"],
        fr:"Après le parcours du troisième cavalier, nous saurons exactement ce dont tu as besoin.",
        en:"After our third rider, we'll know exactly what you need to do.",
        es:"Después del recorrido del tercer jinete sabremos exactamente lo que necesitas.",
        it:"Dopo il percorso del terzo cavaliere sapremo esattamente cosa ti serve.",
        de:"Nach unserem dritten Reiter wissen wir genau, was du brauchst.",
        ja:"三 番手 の 走行 が 終われ ば、 あなた に 必要 な こと が 正確 に わかり ます。" },

      /* ---- temps 3 · le classement ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-italie-egalite", temps:3, dit:"club", mots:["equipe-nationale"], motsAilleurs:["classement-provisoire"],
        fr:"L'équipe italienne est actuellement à égalité avec la France.",
        en:"The Italian team is currently tied with France.",
        es:"El equipo italiano está actualmente empatado con Francia.",
        it:"La squadra italiana è attualmente a pari merito con la Francia.",
        de:"Die italienische Mannschaft liegt derzeit gleichauf mit Frankreich.",
        ja:"イタリア チーム は 現在 フランス と 同点 です。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-quatre-points-avance", temps:3, dit:"club", mots:[], motsAilleurs:["classement-provisoire","penalites"],
        fr:"Nous avons quatre points de pénalité d'avance sur l'équipe suivante.",
        en:"We're four penalties ahead of the next team.",
        es:"Llevamos cuatro puntos de penalización de ventaja sobre el equipo siguiente.",
        it:"Abbiamo quattro penalità di vantaggio sulla squadra successiva.",
        de:"Wir haben vier Strafpunkte Vorsprung auf die nächste Mannschaft.",
        ja:"次 の チーム に 減点 四 の 差 で リード し て い ます。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-huit-qualifiees", temps:3, dit:"club", mots:["deuxieme-manche","equipe-nationale"],
        fr:"Les huit meilleures équipes se qualifieront pour la deuxième manche.",
        en:"The top eight teams will qualify for the second round.",
        es:"Los ocho mejores equipos se clasificarán para la segunda manga.",
        it:"Le prime otto squadre si qualificheranno per la seconda manche.",
        de:"Die besten acht Mannschaften qualifizieren sich für den zweiten Umlauf.",
        ja:"上位 八 チーム が 第二 回 走行 に 進み ます。" },

      /* ---- temps 4 · la deuxième manche ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-ordre-inverse", temps:4, dit:"club", mots:["deuxieme-manche","ordre-depart"],
        fr:"Nous repartirons dans l'ordre inverse du classement.",
        en:"We'll start again in reverse order of the standings.",
        es:"Volveremos a salir en orden inverso a la clasificación.",
        it:"Ripartiremo in ordine inverso alla classifica.",
        de:"Wir starten erneut in umgekehrter Reihenfolge der Wertung.",
        ja:"順位 の 逆順 で 再 スタート し ます。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-chaque-faute-compte", temps:4, dit:"club", mots:["barre-tombee"],
        fr:"Chaque faute compte maintenant, nous n'avons plus de marge d'erreur.",
        en:"Every fault counts now; we have no room for error.",
        es:"Ahora cada falta cuenta: ya no tenemos margen de error.",
        it:"Adesso ogni penalità conta: non abbiamo più margine d'errore.",
        de:"Jetzt zählt jeder Fehler — wir haben keinen Spielraum mehr.",
        ja:"もう 一つ の ミス も 許され ませ ん。 余裕 は あり ませ ん。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-chef-strategie", temps:4, dit:"club", mots:["chef-equipe","deuxieme-manche"],
        fr:"Le chef d'équipe a décidé de modifier notre stratégie pour la deuxième manche.",
        en:"The chef d'équipe has decided to change our strategy for the second round.",
        es:"El jefe de equipo ha decidido cambiar nuestra estrategia para la segunda manga.",
        it:"Il capo equipe ha deciso di cambiare la nostra strategia per la seconda manche.",
        de:"Der Equipechef hat entschieden, unsere Strategie für den zweiten Umlauf zu ändern.",
        ja:"監督 が 第二 回 走行 の 戦略 を 変える と 決め まし た。" },

      /* ---- temps 5 · le barrage ---- */
      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-egalite-barrage", temps:5, dit:"club", mots:["equipe-nationale"], motsAilleurs:["barrage","penalites"],
        fr:"Si les deux nations terminent avec le même nombre de points, il y aura un barrage.",
        en:"If both nations finish on the same number of penalties, there will be a jump-off.",
        es:"Si las dos naciones terminan con el mismo número de puntos, habrá desempate.",
        it:"Se le due nazioni finiscono con lo stesso numero di penalità, ci sarà un barrage.",
        de:"Wenn beide Nationen mit gleicher Fehlerzahl abschließen, gibt es ein Stechen.",
        ja:"両国 が 同じ 減点 で 終わっ た 場合、 ジャンプオフ に なり ます。" },

      /* 🟥 Phrase de Blandine. */
      { ref:"dr-r-un-seul-barrage", temps:5, dit:"club", mots:["equipe-nationale","chef-equipe"], motsAilleurs:["barrage"],
        fr:"Un seul cavalier représentera l'équipe au barrage.",
        en:"Only one rider will represent the team in the jump-off.",
        es:"Un solo jinete representará al equipo en el desempate.",
        it:"Un solo cavaliere rappresenterà la squadra al barrage.",
        de:"Nur ein Reiter vertritt die Mannschaft im Stechen.",
        ja:"ジャンプオフ で は 一 人 だけ が チーム を 代表 し ます。" },

      /* 🟥 Phrase de Blandine. Elle a fait RETIRER « ne prends pas de
         risques inutiles, le temps n'est pas notre priorité » — voir
         le commentaire d'en-tête. */
      { ref:"dr-r-sans-faute-victoire", temps:5, dit:"club", mots:["coupe-nations"], motsAilleurs:["sans-faute"],
        fr:"Un sans-faute nous offrirait la victoire dans la Coupe des Nations de Rome.",
        en:"A clear round would give us victory in the Nations Cup in Rome.",
        es:"Un recorrido sin falta nos daría la victoria en la Copa de las Naciones de Roma.",
        it:"Un percorso netto ci darebbe la vittoria nella Coppa delle Nazioni di Roma.",
        de:"Eine Nullrunde würde uns den Sieg im Nationenpreis von Rom bringen.",
        ja:"クリア ラウンド なら、 ローマ の ネーションズ カップ で 優勝 でき ます。" },

      /* ---- temps 6 · ce que je peux dire, moi ---- */
      { ref:"dr-je-passe-quand", temps:6, dit:"joueuse", mots:["ordre-depart","premiere-manche"],
        fr:"Je passe à quel rang dans la première manche ?",
        en:"Where am I in the running order for the first round?",
        es:"¿En qué puesto salgo en la primera manga?",
        it:"In che ordine parto nella prima manche?",
        de:"An welcher Stelle starte ich im ersten Umlauf?",
        ja:"第一 回 走行 で は 何 番目 に 出 ます か ?" },

      { ref:"dr-combien-il-faut", temps:6, dit:"joueuse", mots:["score-ecarte"], motsAilleurs:["sans-faute"],
        fr:"Il me faut un sans-faute, ou est-ce qu'on peut écarter mon score ?",
        en:"Do I need a clear round, or can my score be dropped?",
        es:"¿Necesito un sin falta, o se puede descartar mi resultado?",
        it:"Mi serve un percorso netto, o il mio punteggio può essere scartato?",
        de:"Brauche ich eine Nullrunde, oder kann mein Ergebnis gestrichen werden?",
        ja:"クリア ラウンド が 必要 です か、 それとも 私 の 成績 は 除外 でき ます か ?" },

      { ref:"dr-desole-equipe", temps:6, dit:"joueuse", mots:["coequipier","barre-tombee"],
        fr:"Je suis désolée pour l'équipe, j'ai fait tomber une barre.",
        en:"I'm sorry for the team — I had a rail down.",
        es:"Lo siento por el equipo, he tirado una barra.",
        it:"Mi dispiace per la squadra, ho fatto cadere una barriera.",
        de:"Es tut mir leid für die Mannschaft, ich hatte einen Abwurf.",
        ja:"チーム に 申し訳 あり ませ ん。 バー を 一本 落とし まし た。" },

      { ref:"dr-fiere-de-monter", temps:6, dit:"joueuse", mots:["representer-pays","equipe-nationale"],
        fr:"C'est la première fois que je monte pour mon pays.",
        en:"It's the first time I've ridden for my country.",
        es:"Es la primera vez que monto para mi país.",
        it:"È la prima volta che monto per il mio paese.",
        de:"Es ist das erste Mal, dass ich für mein Land reite.",
        ja:"国 を 代表 し て 乗る の は 今日 が 初めて です。" }
    ]
  }
};
