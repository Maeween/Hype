/* hype-lingo-lex-poney.js — Hype Linguae · le poney
   ==================================================================
   Créé le 5 août 2026 pour Lamotte-Beuvron, sur remarque de Blandine :
   le lieu, c'est d'abord des milliers de poneys et de jeunes cavaliers,
   pas le tracé de manège qu'on y avait mis d'abord.

   ⚠️ SIX ENTRÉES SONT DES RAPPELS. Elles portent le même `ref` que
   dans hype-lingo-lex-cheval.js — c'est voulu, et c'est sans danger :
   la maîtrise est stockée par `ref`, donc un mot déjà croisé au
   Connemara ou à Jerez arrive ici déjà acquis. Un rappel n'est pas un
   doublon, c'est de la révision espacée gratuite (décision du 5 août).
   Ne PAS les renommer pour « éviter le conflit » : le conflit est la
   fonctionnalité.

   ⚠️ QUATRE ENTRÉES SONT NEUVES et n'ont jamais été relues par un
   natif : la toise, le poney-club, la catégorie de taille, le shetland.
   `das Stockmaß` et `測尺` sont les deux plus à confirmer.
   À reporter dans hype-linguae-doutes.md.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.poney = {
  ref: "poney",
  chapitre: 10,
  titre: { fr:"Le poney", en:"The pony", es:"El poni", it:"Il pony",
           de:"Das Pony", ja:"ポニー" },
  lecons: 1,

  concepts: [

  /* ============ LEÇON 1 · LE PONEY ============ */

  /* ---- rappels ---- */

  { ref:"poney", lecon:1, coll:"poney",
    mots:{ fr:{m:"le poney"}, en:{m:"the pony", p:"pau-ni"},
           es:{m:"el poni"}, it:{m:"il pony"},
           de:{m:"das Pony", p:"po-ni"}, ja:{m:"ポニー", p:"ponī"} },
    def:{ fr:"Un équidé dont la taille au garrot ne dépasse pas une limite fixée par les règlements. Ce n'est pas un jeune cheval : un poney adulte reste un poney.",
          en:"A horse whose height at the withers stays under a limit set by the rules. Not a young horse: an adult pony is still a pony.",
          es:"Un équido cuya alzada no supera un límite fijado por los reglamentos. No es un caballo joven: un poni adulto sigue siendo un poni.",
          it:"Un equide la cui altezza al garrese non supera un limite fissato dai regolamenti. Non è un cavallo giovane: un pony adulto resta un pony.",
          de:"Ein Pferd, dessen Stockmaß unter einer vom Reglement gesetzten Grenze bleibt. Kein junges Pferd: Ein erwachsenes Pony bleibt ein Pony.",
          ja:"規則で定められた体高の上限を超えない馬のこと。若い馬という意味ではありません。大人になったポニーも、ポニーのままです。" } },

  { ref:"taille-garrot", lecon:1, coll:"poney",
    mots:{ fr:{m:"la taille au garrot"}, en:{m:"the height at the withers", p:"haït"},
           es:{m:"la alzada"}, it:{m:"l'altezza al garrese"},
           de:{m:"das Stockmaß", p:"chtok-mass"}, ja:{m:"体高", p:"taikō"} },
    def:{ fr:"La hauteur mesurée du sol au sommet du garrot. C'est elle qui décide de la catégorie, jamais l'âge ni la corpulence.",
          en:"The height from the ground to the top of the withers. It decides the category, never the age or the build.",
          es:"La altura medida del suelo a la cima de la cruz. Es ella la que decide la categoría, jamás la edad ni la corpulencia.",
          it:"L'altezza misurata dal suolo alla sommità del garrese. È lei che decide la categoria, mai l'età né la corporatura.",
          de:"Die Höhe vom Boden bis zum höchsten Punkt des Widerrists. Sie entscheidet über die Kategorie — nie das Alter oder der Körperbau.",
          ja:"地面からき甲の頂点までを測った高さ。カテゴリーを決めるのはこれだけで、年齢や体格ではありません。" } },

  { ref:"poulain", lecon:1, coll:"poney",
    mots:{ fr:{m:"le poulain"}, en:{m:"the foal", p:"fôle"},
           es:{m:"el potro"}, it:{m:"il puledro"},
           de:{m:"das Fohlen", p:"fô-leune"}, ja:{m:"子馬", p:"kouma" } },
    def:{ fr:"Le petit, jusqu'au sevrage puis jusqu'à un an. Un poulain de race poney sera un poney ; un poulain de cheval sera un cheval.",
          en:"The young one, until weaning and then its first year. A pony foal becomes a pony; a horse foal becomes a horse.",
          es:"La cría, hasta el destete y luego hasta el año. Un potro de raza poni será un poni; un potro de caballo será un caballo.",
          it:"Il piccolo, fino allo svezzamento e poi fino a un anno. Un puledro di razza pony sarà un pony; un puledro di cavallo sarà un cavallo.",
          de:"Das Junge, bis zum Absetzen und dann bis zum ersten Jahr. Ein Ponyfohlen wird ein Pony; ein Pferdefohlen wird ein Pferd.",
          ja:"離乳まで、そして一歳までの仔のこと。ポニーの仔はポニーに、馬の仔は馬になります。" } },

  { ref:"cheval-ecole", lecon:1, coll:"poney",
    mots:{ fr:{m:"le cheval d'école"}, en:{m:"the school horse", p:"skoul"},
           es:{m:"el caballo de escuela"}, it:{m:"il cavallo da scuola"},
           de:{m:"das Schulpferd", p:"choul-pfert"}, ja:{m:"練習馬", p:"renshūba"} },
    def:{ fr:"Le cheval ou le poney du club, monté par beaucoup de cavaliers différents. Souvent le plus patient de l'écurie, et le plus mal reconnu.",
          en:"The club horse or pony, ridden by many different riders. Often the most patient in the yard, and the least credited.",
          es:"El caballo o el poni del club, montado por muchos jinetes distintos. A menudo el más paciente de la cuadra, y el menos reconocido.",
          it:"Il cavallo o il pony del club, montato da molti cavalieri diversi. Spesso il più paziente della scuderia, e il meno riconosciuto.",
          de:"Das Club-Pferd oder -Pony, von vielen verschiedenen Reitern geritten. Oft das geduldigste im Stall — und das am wenigsten gewürdigte.",
          ja:"たくさんの騎手を乗せる、クラブの馬やポニー。厩舎でいちばん辛抱強く、いちばん報われない存在であることも多いのです。" } },

  { ref:"caractere", lecon:1, coll:"poney",
    mots:{ fr:{m:"le caractère"}, en:{m:"the temperament", p:"tèm-pra-meunt"},
           es:{m:"el carácter"}, it:{m:"il carattere"},
           de:{m:"das Temperament"}, ja:{m:"気性", p:"kishō"} },
    def:{ fr:"Ce qui ne se lit pas sur la fiche : ce qu'un poney accepte, ce qui l'inquiète, ce qu'il pardonne.",
          en:"What the paperwork does not say: what a pony accepts, what worries it, what it forgives.",
          es:"Lo que no se lee en la ficha: lo que un poni acepta, lo que le inquieta, lo que perdona.",
          it:"Ciò che non si legge sulla scheda: ciò che un pony accetta, ciò che lo inquieta, ciò che perdona.",
          de:"Was auf keinem Papier steht: was ein Pony hinnimmt, was es beunruhigt, was es verzeiht.",
          ja:"書類には載っていないもの。そのポニーが何を受け入れ、何を不安がり、何を許してくれるか。" } },

  { ref:"calme", lecon:1, coll:"poney",
    mots:{ fr:{m:"calme"}, en:{m:"quiet", p:"kwaï-ette"},
           es:{m:"tranquilo"}, it:{m:"tranquillo"},
           de:{m:"brav", p:"braf"}, ja:{m:"おとなしい", p:"otonashii"} },
    def:{ fr:"Le mot qu'on cherche quand on demande un poney pour un débutant. En anglais on dit « quiet » plutôt que « calm », qui sonne médical.",
          en:"The word you want when asking for a beginner's pony. English riders say « quiet » rather than « calm », which sounds clinical.",
          es:"La palabra que se busca al pedir un poni para un principiante. En inglés se dice « quiet » más que « calm », que suena médico.",
          it:"La parola che si cerca quando si chiede un pony per un principiante. In inglese si dice « quiet » più che « calm », che suona medico.",
          de:"Das Wort, das man sucht, wenn man ein Anfängerpony erbittet. Auf Englisch sagt man « quiet » statt « calm », das klinisch klingt.",
          ja:"初心者用のポニーを頼むときに探す言葉。英語では « calm » ではなく « quiet » と言います — calm は医学的に響くのです。" } },

  /* ---- entrées neuves, non relues par un natif ---- */

  { ref:"toise", lecon:1, coll:"poney",
    mots:{ fr:{m:"la toise"}, en:{m:"the measuring stick", p:"mè-jeu-ring"},
           es:{m:"el hipómetro", var:"la vara de medir"}, it:{m:"l'ippometro"},
           de:{m:"das Stockmaß", p:"chtok-mass"}, ja:{m:"測尺", p:"sokushaku"} },
    def:{ fr:"L'instrument qui mesure la taille au garrot, avec son bras horizontal et son niveau. En concours, la toise fait autorité sur le papier.",
          en:"The instrument that measures height at the withers, with its horizontal arm and level. At a show, the stick outranks the paperwork.",
          es:"El instrumento que mide la alzada, con su brazo horizontal y su nivel. En concurso, el hipómetro tiene autoridad sobre el papel.",
          it:"Lo strumento che misura l'altezza al garrese, con il braccio orizzontale e la livella. In concorso, l'ippometro fa autorità sulla carta.",
          de:"Das Gerät, das das Stockmaß misst, mit waagerechtem Arm und Wasserwaage. Auf dem Turnier schlägt das Stockmaß das Papier.",
          ja:"体高を測る道具。水平の腕と水準器がついています。競技会では、書類よりこの測尺のほうが物を言います。" } },

  { ref:"poney-club", lecon:1, coll:"poney",
    mots:{ fr:{m:"le poney-club"}, en:{m:"the pony club"},
           es:{m:"el club de ponis"}, it:{m:"il pony club"},
           de:{m:"der Ponyhof", p:"po-ni-hof", var:"der Ponyclub"},
           ja:{m:"ポニークラブ", p:"ponī kurabu"} },
    def:{ fr:"L'écurie qui enseigne aux enfants. ⚠️ En Grande-Bretagne, « The Pony Club » désigne aussi une organisation nationale précise, pas seulement un lieu.",
          en:"The yard that teaches children. Careful: in Britain « The Pony Club » is also a specific national organisation, not just a place.",
          es:"La cuadra que enseña a los niños. ⚠️ En Gran Bretaña, « The Pony Club » designa también una organización nacional precisa, no solo un lugar.",
          it:"La scuderia che insegna ai bambini. ⚠️ In Gran Bretagna « The Pony Club » indica anche una precisa organizzazione nazionale, non solo un luogo.",
          de:"Der Stall, der Kinder unterrichtet. ⚠️ In Großbritannien meint « The Pony Club » auch eine ganz bestimmte nationale Organisation, nicht nur einen Ort.",
          ja:"子どもたちに教える厩舎のこと。⚠️ イギリスで « The Pony Club » と言えば、場所だけでなく特定の全国組織を指すこともあります。" } },

  { ref:"categorie-taille", lecon:1, coll:"poney",
    mots:{ fr:{m:"la catégorie de taille"}, en:{m:"the height category"},
           es:{m:"la categoría por altura"}, it:{m:"la categoria di altezza"},
           de:{m:"die Größenklasse", p:"grœu-sseune-klass"},
           ja:{m:"体高区分", p:"taikō kubun"} },
    def:{ fr:"Le groupe dans lequel un poney concourt, selon sa taille au garrot. ⚠️ Les lettres A à E sont une convention française : ailleurs on annonce la taille en centimètres ou en mains, sans lettre. Dis la taille, pas la lettre.",
          en:"The group a pony competes in, according to its height. The French letters A to E mean nothing abroad: give the height in centimetres or hands instead.",
          es:"El grupo en que compite un poni, según su alzada. ⚠️ Las letras A a E son una convención francesa: fuera se anuncia la alzada en centímetros o en manos, sin letra. Di la alzada, no la letra.",
          it:"Il gruppo in cui un pony gareggia, secondo l'altezza al garrese. ⚠️ Le lettere da A a E sono una convenzione francese: altrove si annuncia l'altezza in centimetri o in mani, senza lettera. Di' l'altezza, non la lettera.",
          de:"Die Gruppe, in der ein Pony startet, nach seinem Stockmaß. ⚠️ Die Buchstaben A bis E sind eine französische Konvention: Anderswo nennt man die Höhe in Zentimetern oder Hands, ohne Buchstaben. Sag die Höhe, nicht den Buchstaben.",
          ja:"体高によって決まる、ポニーの出場区分。⚠️ AからEの文字はフランスだけの決まりごとです。よそでは文字なしで、センチかハンドで体高をそのまま言います。文字ではなく、高さを言うこと。" } },

  { ref:"shetland", lecon:1, coll:"poney",
    mots:{ fr:{m:"le poney shetland"}, en:{m:"the Shetland pony", p:"chèt-leunde"},
           es:{m:"el poni Shetland"}, it:{m:"il pony Shetland"},
           de:{m:"das Shetlandpony"}, ja:{m:"シェットランドポニー", p:"shettorando ponī"} },
    def:{ fr:"La plus petite des races du programme, née des îles Shetland, au nord de l'Écosse. Rustique, très fort pour sa taille, et le premier poney de beaucoup de cavaliers.",
          en:"The smallest breed in the syllabus, from the Shetland Isles north of Scotland. Hardy, remarkably strong for its size, and many riders' first pony.",
          es:"La más pequeña de las razas del programa, nacida de las islas Shetland, al norte de Escocia. Rústica, fortísima para su talla, y el primer poni de muchos jinetes.",
          it:"La più piccola delle razze del programma, nata dalle isole Shetland, a nord della Scozia. Rustica, fortissima per la taglia, e il primo pony di molti cavalieri.",
          de:"Die kleinste Rasse des Programms, von den Shetlandinseln nördlich Schottlands. Robust, erstaunlich stark für ihre Größe — und das erste Pony vieler Reiter.",
          ja:"この課程でいちばん小さな馬種。スコットランド北方のシェットランド諸島の生まれです。丈夫で、体の割にとても力持ち。多くの騎手にとって、最初のポニーでもあります。" } },

  /* ---- ajouts du 8 août 2026, demande de Blandine : « épreuve par
     équipe, carrousel, pony games, equifun, etc. ça doit être dedans ».
     Lamotte est le pays des jeux — le chapitre devait les nommer. ---- */

  { ref:"jeux-poney", lecon:1, coll:"poney",
    mots:{ fr:{m:"les jeux à poney"}, en:{m:"the mounted games", p:"maoun-tide guèmz", var:"the pony games"},
           es:{m:"los juegos a poni"}, it:{m:"i pony games"},
           de:{m:"die Mounted Games", p:"maoun-tide guèmz"}, ja:{m:"ポニーゲームズ", p:"ponī gēmuzu"} },
    def:{ fr:"Les courses de relais à poney — slalom, bidons, passages de témoin — l'âme de Lamotte et de son Grand Tournoi. ⚠️ L'anglais officiel est « mounted games » ; « pony games » se dit, mais c'est la France qui en a fait le nom courant.",
          en:"Relay races on ponies — bending poles, litter, baton changes. The official English is « mounted games »; « pony games » is understood, but it is France that made it the everyday name.",
          es:"Las carreras de relevos a poni — slalom, bidones, testigos. El inglés oficial es « mounted games »; « pony games » se entiende, pero es Francia quien lo volvió el nombre corriente.",
          it:"Le corse a staffetta sui pony — slalom, bidoni, testimoni. L'inglese ufficiale è « mounted games »; « pony games » si capisce, ma è la Francia ad averne fatto il nome corrente.",
          de:"Staffelrennen auf Ponys — Slalom, Eimer, Stabwechsel. Das offizielle Englisch ist « mounted games »; « pony games » versteht man, aber erst Frankreich machte es zum Alltagsnamen.",
          ja:"ポニーで行うリレー競技 — スラローム、バケツ、バトンの受け渡し。正式な英語は « mounted games »。« pony games » も通じますが、それを日常の名前にしたのはフランスなのです。" } },

  { ref:"epreuve-equipe", lecon:1, coll:"poney",
    mots:{ fr:{m:"l'épreuve par équipe"}, en:{m:"the team competition", p:"time"},
           es:{m:"la prueba por equipos"}, it:{m:"la prova a squadre"},
           de:{m:"der Mannschaftswettbewerb", p:"mann-chafts-vètt-be-vèrp"}, ja:{m:"団体戦", p:"dantaisen"} },
    def:{ fr:"On gagne à quatre ou cinq, jamais seul : c'est la règle des jeux et du carrousel, et souvent la première compétition d'un enfant. Le score de l'équipe compte, pas le tien.",
          en:"You win as a team of four or five, never alone: the rule of the games and the quadrille, and often a child's first ever competition. The team's score counts, not yours.",
          es:"Se gana entre cuatro o cinco, nunca solo: la regla de los juegos y del carrusel, y a menudo la primera competición de un niño. Cuenta la puntuación del equipo, no la tuya.",
          it:"Si vince in quattro o cinque, mai da soli: la regola dei giochi e del carosello, e spesso la prima gara di un bambino. Conta il punteggio della squadra, non il tuo.",
          de:"Gewonnen wird zu viert oder fünft, nie allein: die Regel der Spiele und der Quadrille, und oft der allererste Wettkampf eines Kindes. Es zählt der Mannschaftswert, nicht deiner.",
          ja:"勝つのは四、五人のチームであって、ひとりでは決して勝てません。ゲームズとカルーセルの掟であり、多くの子にとって人生初の競技会でもあります。数えられるのはチームの得点 — きみ個人のではなく。" } },

  { ref:"carrousel", lecon:1, coll:"poney",
    mots:{ fr:{m:"le carrousel"}, en:{m:"the quadrille", p:"kwo-drile"},
           es:{m:"el carrusel"}, it:{m:"il carosello"},
           de:{m:"die Quadrille", p:"kwa-dri-le"}, ja:{m:"カドリール", p:"kadorīru"} },
    def:{ fr:"La reprise en musique dansée à plusieurs, costumes et figures synchronisées. ⚠️ Faux ami : l'anglais dit « the quadrille » — « carousel » désigne le manège forain à chevaux de bois.",
          en:"The ridden display to music, several riders, costumes and synchronised figures. Careful: « carousel » in English is the fairground ride — this is « the quadrille ».",
          es:"La reprise en música bailada entre varios, con trajes y figuras sincronizadas. ⚠️ Falso amigo: el inglés dice « the quadrille » — « carousel » es el tiovivo de la feria.",
          it:"La ripresa in musica danzata in gruppo, costumi e figure sincronizzate. ⚠️ Falso amico: l'inglese dice « the quadrille » — « carousel » è la giostra dei cavalli di legno.",
          de:"Die Schaunummer zur Musik, mehrere Reiter, Kostüme, synchrone Figuren. ⚠️ Falscher Freund: Auf Englisch heißt sie « the quadrille » — « carousel » ist das Jahrmarktkarussell.",
          ja:"音楽に合わせ、衣装をそろえ、数人で図形を描いて踊る演技。⚠️ 偽りの友：英語では « the quadrille » と言います。« carousel » は遊園地の回転木馬のことです。" } },

  { ref:"equifun", lecon:1, coll:"poney",
    mots:{ fr:{m:"l'Equifun"}, en:{m:"the Equifun", p:"é-ki-feune"},
           es:{m:"el Equifun"}, it:{m:"l'Equifun"},
           de:{m:"das Equifun"}, ja:{m:"エキファン", p:"ekifan"} },
    def:{ fr:"Le parcours d'adresse chronométré du club français : passerelle, slalom, portes, reculer. ⚠️ Le nom est une invention de la fédération française — à l'étranger, décris-le (« a fun obstacle course ») plutôt que de le traduire.",
          en:"The French club's timed handiness course: bridge, bending poles, gates, rein-back. The name is a French federation invention — abroad, describe it (« a fun obstacle course ») rather than translate it.",
          es:"El recorrido de manejo cronometrado del club francés: pasarela, slalom, puertas, pasos atrás. El nombre es un invento de la federación francesa — fuera, descríbelo (« a fun obstacle course ») en vez de traducirlo.",
          it:"Il percorso di destrezza a tempo del club francese: passerella, slalom, porte, indietreggiare. Il nome è un'invenzione della federazione francese — all'estero descrivilo (« a fun obstacle course ») invece di tradurlo.",
          de:"Der Geschicklichkeitsparcours auf Zeit des französischen Clubs: Brücke, Slalom, Tore, Rückwärtsrichten. Der Name ist eine Erfindung des französischen Verbands — im Ausland beschreibt man ihn (« a fun obstacle course »), statt ihn zu übersetzen.",
          ja:"フランスのクラブで行う、タイム制の器用さコース。橋、スラローム、ゲート、後退。⚠️ この名前はフランス連盟の造語です。外国では訳そうとせず、説明しましょう — « a fun obstacle course »。" } },

  { ref:"double-poney", lecon:1, coll:"poney",
    mots:{ fr:{m:"le double poney"}, en:{m:"the large pony", p:"lardj pau-ni"},
           es:{m:"el poni grande"}, it:{m:"il pony grande"},
           de:{m:"das Großpony", p:"grôss-po-ni"}, ja:{m:"大型ポニー", p:"ōgata ponī"} },
    def:{ fr:"⚠️ Le piège franco-français parfait : « double poney » ne se traduit NULLE PART — « double pony » ne veut rien dire en anglais. Dis « a large pony » ou, mieux, la taille en centimètres : c'est le réflexe qui marche dans tous les pays.",
          en:"The perfect French-only trap: « double poney » translates NOWHERE — « double pony » means nothing in English. Say « a large pony » or, better, the height in centimetres: the reflex that works in every country.",
          es:"⚠️ La trampa franco-francesa perfecta: « double poney » no se traduce EN NINGÚN SITIO. Di « a large pony » o, mejor, la alzada en centímetros: el reflejo que funciona en todos los países.",
          it:"⚠️ La trappola franco-francese perfetta: « double poney » non si traduce DA NESSUNA PARTE. Di' « a large pony » o, meglio, l'altezza in centimetri: il riflesso che funziona in tutti i paesi.",
          de:"⚠️ Die perfekte rein-französische Falle: « double poney » lässt sich NIRGENDS übersetzen — « double pony » sagt keinem Engländer etwas. Sag « a large pony » oder, besser, das Maß in Zentimetern: der Reflex, der in jedem Land funktioniert.",
          ja:"⚠️ 完璧なフランス限定の罠。« double poney » はどこの国にも訳せません — 英語で « double pony » と言っても通じないのです。« a large pony » と言うか、いっそ体高をセンチで。それが万国共通の正解です。" } },

  { ref:"age-limite-poney", lecon:1, coll:"poney",
    mots:{ fr:{m:"l'âge limite"}, en:{m:"the age limit", p:"èdje li-mite"},
           es:{m:"el límite de edad"}, it:{m:"il limite di età"},
           de:{m:"die Altersgrenze", p:"al-teurs-grèn-tse"}, ja:{m:"年齢制限", p:"nenrei seigen"} },
    def:{ fr:"En concours poney, c'est le CAVALIER qui a un âge maximum, pas le poney : 16 ans en international (jusqu'à la fin de l'année des 16 ans), et chaque pays règle ses propres divisions. Après, on passe à cheval — le poney, lui, peut concourir toute sa vie.",
          en:"In pony classes it is the RIDER who has a maximum age, not the pony: sixteen internationally (until the end of that year), each country setting its own divisions. After that you move on to horses — the pony itself can compete all its life.",
          es:"En concurso poni, es el JINETE quien tiene edad máxima, no el poni: 16 años en internacional (hasta el final de ese año), y cada país regula sus divisiones. Después se pasa a caballo — el poni puede competir toda su vida.",
          it:"In concorso pony, è il CAVALIERE ad avere un'età massima, non il pony: 16 anni in internazionale (fino alla fine di quell'anno), e ogni paese regola le sue divisioni. Dopo si passa a cavallo — il pony può gareggiare tutta la vita.",
          de:"In Ponyprüfungen hat der REITER ein Höchstalter, nicht das Pony: international 16 Jahre (bis Jahresende), die Länder regeln ihre Klassen selbst. Danach wechselt man aufs Pferd — das Pony darf sein Leben lang starten.",
          ja:"ポニー競技で年齢の上限があるのは騎手であって、ポニーではありません。国際規則では16歳（その年の年末まで）、国内区分は国ごとに定められます。その後は馬へ — ポニー自身は一生、競技に出られます。" } },

  { ref:"a-cru", lecon:1, coll:"poney",
    mots:{ fr:{m:"monter à cru"}, en:{m:"to ride bareback", p:"bèr-bak"},
           es:{m:"montar a pelo"}, it:{m:"montare a pelo"},
           de:{m:"ohne Sattel reiten", p:"ô-ne za-teul"}, ja:{m:"鞍なしで乗る", p:"kura nashi de noru"} },
    def:{ fr:"Sans selle, la jambe au contact du poil. C'est au poney qu'on l'apprend presque toujours — pour l'assiette qu'aucune selle ne donne. ⚠️ Trois langues disent « à même le poil » (à cru, a pelo ×2), l'anglais dit « le dos nu », l'allemand et le japonais « sans selle ».",
          en:"No saddle, your leg on the coat. Nearly everyone learns it on a pony — for the seat no saddle can teach. Three languages say « on the coat », English says « bare back », German and Japanese « without a saddle ».",
          es:"Sin silla, la pierna en contacto con el pelo. Se aprende casi siempre en poni — por la asiento que ninguna silla enseña. ⚠️ Tres lenguas dicen « al pelo », el inglés « a lomo desnudo », el alemán y el japonés « sin silla ».",
          it:"Senza sella, la gamba a contatto del pelo. Lo si impara quasi sempre sul pony — per l'assetto che nessuna sella insegna. ⚠️ Tre lingue dicono « a pelo », l'inglese « a dorso nudo », il tedesco e il giapponese « senza sella ».",
          de:"Ohne Sattel, das Bein am Fell. Fast jeder lernt es auf dem Pony — für den Sitz, den kein Sattel lehrt. ⚠️ Drei Sprachen sagen « auf dem Fell », das Englische « auf bloßem Rücken », Deutsch und Japanisch « ohne Sattel ».",
          ja:"鞍を着けず、脚が毛に直接触れる乗り方。ほとんど誰もがポニーで覚えます — どんな鞍も教えてくれない座りを身につけるために。⚠️ 三つの言語は「毛の上に」、英語は「裸の背に」、独語と日本語は「鞍なしで」と言います。" } },

  { ref:"monter-licol", lecon:1, coll:"poney",
    mots:{ fr:{m:"monter en licol"}, en:{m:"to ride in a halter", p:"hol-teur"},
           es:{m:"montar con cabezada de cuadra"}, it:{m:"montare con la capezza"},
           de:{m:"mit Halfter reiten", p:"half-teur"}, ja:{m:"無口で乗る", p:"mukuchi de noru"} },
    def:{ fr:"Sans mors, juste le licol d'écurie et deux rênes accrochées dessus. Un exercice de confiance réservé au manège fermé, sur un poney qui connaît la voix — jamais en extérieur, jamais imposé.",
          en:"No bit, just the stable halter with two reins clipped on. A trust exercise for the closed school, on a pony that knows the voice — never out hacking, never forced on anyone.",
          es:"Sin bocado, solo la cabezada de cuadra con dos riendas enganchadas. Un ejercicio de confianza reservado a la pista cerrada, en un poni que conoce la voz — jamás en exterior, jamás impuesto.",
          it:"Senza imboccatura, solo la capezza con due redini agganciate. Un esercizio di fiducia riservato al maneggio chiuso, su un pony che conosce la voce — mai in esterna, mai imposto.",
          de:"Ohne Gebiss, nur das Stallhalfter mit zwei eingeschnallten Zügeln. Eine Vertrauensübung für die geschlossene Halle, auf einem Pony, das die Stimme kennt — nie im Gelände, nie erzwungen.",
          ja:"ハミを使わず、無口に手綱を二本つけただけの乗り方。声をよく知るポニーと、閉じた馬場でだけ行う信頼の練習です — 外乗では決してせず、誰にも強いません。" } },

  { ref:"renes-couleur", lecon:1, coll:"poney",
    mots:{ fr:{m:"les rênes de couleur"}, en:{m:"the rainbow reins", p:"rèn-bau rènze"},
           es:{m:"las riendas de colores"}, it:{m:"le redini colorate"},
           de:{m:"die Regenbogenzügel", p:"ré-gueune-bo-gueune"}, ja:{m:"レインボーレインズ", p:"reinbō reinzu"} },
    def:{ fr:"Les rênes à sections de couleurs des petits cavaliers. L'enseignant ne dit plus « raccourcis de dix centimètres » mais « prends au bleu » : chaque couleur est un repère de main. ⚠️ L'anglais a un joli nom-image : « rainbow reins », les rênes arc-en-ciel.",
          en:"The colour-banded reins of small riders. The instructor stops saying « shorten ten centimetres » and says « hold on blue »: each colour is a hand-mark. English has the picture-name: rainbow reins.",
          es:"Las riendas por tramos de colores de los pequeños jinetes. El profesor ya no dice « acorta diez centímetros » sino « coge en el azul »: cada color es una referencia de mano. El inglés tiene el nombre-imagen: rainbow reins.",
          it:"Le redini a tratti colorati dei piccoli cavalieri. L'istruttore non dice più « accorcia di dieci centimetri » ma « prendi sul blu »: ogni colore è un riferimento di mano. L'inglese ha il nome-immagine: rainbow reins.",
          de:"Die farbig unterteilten Zügel der kleinen Reiter. Der Reitlehrer sagt nicht mehr « zehn Zentimeter kürzer », sondern « greif auf Blau »: Jede Farbe ist eine Handmarke. Das Englische hat den Bildnamen: rainbow reins.",
          ja:"小さな騎手のための、色分けされた手綱。先生は「十センチ詰めて」ではなく「青を持って」と言えばいい。色のひとつひとつが、手の位置の目印なのです。英語の名前が絵のようです — rainbow reins、虹の手綱。" } }

  ],

  phrases: [

  { ref:"ph-poney-taille", lecon:1,
      fr:"Quelle est sa taille au garrot ?",
      en:"How tall is he?",
      es:"¿Cuánto mide de alzada?",
      it:"Quanto misura al garrese?",
      de:"Wie groß ist er?",
      ja:"体高 は どれ くらい です か。" },

  { ref:"ph-poney-debutant", lecon:1,
      fr:"C'est un poney pour débuter ?",
      en:"Is he a beginner's pony?",
      es:"¿Es un poni para principiantes?",
      it:"È un pony per principianti?",
      de:"Ist es ein Pony für Anfänger?",
      ja:"初心者 向け の ポニー です か。" },

  { ref:"ph-poney-calme", lecon:1,
      fr:"Il est très calme.",
      en:"He is very quiet.",
      es:"Es muy tranquilo.",
      it:"È molto tranquillo.",
      de:"Es ist sehr brav.",
      ja:"とても おとなしい です。" },

  { ref:"ph-poney-jeux", lecon:1,
      fr:"On fait les jeux cet après-midi ?",
      en:"Are we doing the games this afternoon?",
      es:"¿Hacemos los juegos esta tarde?",
      it:"Facciamo i giochi questo pomeriggio?",
      de:"Machen wir heute Nachmittag die Spiele?",
      ja:"今日 の 午後 は ゲーム を し ます か ?" }
  ]
};
