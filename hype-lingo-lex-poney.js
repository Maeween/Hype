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

   ------------------------------------------------------------------
   ✔ FUSION DU 17 AOÛT 2026 — LOT BLANDINE (« Pareil mélangé avec ce
   qu'on avait déjà », « Fais comme tu sens »). Versé depuis le kit
   PREPARE-lamotte-poney.js une fois le fichier enfin reçu :
   · 3 concepts neufs : `classe-cm`, `dans-la-taille`, `hors-taille`
     (measure in / measure out — les mots du règlement FEI, vérifié :
     limite 148 cm sans fers / 149 ferré).
   · 22 phrases neuves `ph-poney-*` : ses n° 5–18, ses 6 phrases
     « catégories », et ses 2 phrases-pièges (le C de 1,40 m qui devient
     un 148 en Irlande ; le B qui n'est pas forcément un 128). fr/en =
     ses mots. Les n° 1–4 existaient déjà (ph-poney-taille, -debutant,
     -calme, -jeux) — non dupliquées.
   · Un champ `intro` (encart « un poney n'est pas classé pareil
     partout ») — INERTE tant que lingo.html ne lit pas ce champ, même
     statut que l'intro de Dubaï.
   Ses 15 termes étaient déjà tous là (le « poney d'école » vit ici
   sous `cheval-ecole` / the school horse — rappel probable, mots non
   touchés). RIEN RETIRÉ : `calme` reste, candidat au retrait évoqué
   par Blandine mais jamais tranché par elle.
   ⚠️ Bornes FFE des phrases-pièges (B jusqu'à 1,30 m, C jusqu'à
   1,40 m) : issues de sa recherche, cohérentes avec la FEI vérifiée,
   texte FFE non relu — à recontrôler avant relecture native.
   ⚠️ À faire relire : `estar en la talla` / `pasarse de talla` (es),
   `im Maß sein` / `über dem Maß sein` (de), `規定内` / `規定外` (ja).
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.poney = {
  ref: "poney",
  chapitre: 10,
  titre: { fr:"Le poney", en:"The pony", es:"El poni", it:"Il pony",
           de:"Das Pony", ja:"ポニー" },
  lecons: 1,

  /* ⚠️ champ pas encore lu par le moteur — cf. note de fusion. */
  intro: { fr:"Un poney n'est pas classé pareil partout : donne sa taille exacte, elle parle toutes les langues.",
           en:"A pony isn't classed the same way everywhere: give his exact height — it speaks every language.",
           es:"Un poni no se clasifica igual en todas partes: da su alzada exacta, habla todos los idiomas.",
           it:"Un pony non è classificato allo stesso modo ovunque: dai la sua altezza esatta, parla tutte le lingue.",
           de:"Ein Pony wird nicht überall gleich eingeteilt: Nenn sein genaues Stockmaß — das versteht jede Sprache.",
           ja:"ポニーの区分は国によって違います。正確な体高を言えば、どの言語でも通じます。" },

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
          ja:"小さな騎手のための、色分けされた手綱。先生は「十センチ詰めて」ではなく「青を持って」と言えばいい。色のひとつひとつが、手の位置の目印なのです。英語の名前が絵のようです — rainbow reins、虹の手綱。" } },

  /* ---- les trois entrées « mesure » du 17 août 2026 ---- */

  { ref:"classe-cm", lecon:1, coll:"poney",
    mots:{ fr:{m:"la catégorie 138 cm"}, en:{m:"the 138 cm pony class", p:"kla-ss"},
           es:{m:"la categoría de 138 cm"}, it:{m:"la categoria dei 138 cm"},
           de:{m:"die 138-cm-Klasse", p:"kla-sse"}, ja:{m:"138センチクラス", p:"hyaku-sanjū-hachi senchi kurasu"} },
    def:{ fr:"En Irlande et au Royaume-Uni, les catégories portent la taille en clair : 128 cm, 138 cm, 148 cm. ⚠️ Et les bornes ne recouvrent pas les lettres françaises : le B monte jusqu'à 1,30 m, donc un B de 1,29 m est déjà un 138 — et un C de 1,40 m, déjà un 148.",
          en:"In Ireland and the UK, the classes wear the height itself: 128 cm, 138 cm, 148 cm. And the limits do not line up with the French letters: B runs to 1.30 m, so a 1.29 m B is already a 138 — and a 1.40 m C is already a 148.",
          es:"En Irlanda y el Reino Unido, las categorías llevan la alzada en claro: 128 cm, 138 cm, 148 cm. ⚠️ Y los límites no coinciden con las letras francesas: la B llega a 1,30 m, así que un B de 1,29 m ya es un 138 — y un C de 1,40 m, ya un 148.",
          it:"In Irlanda e nel Regno Unito, le categorie portano la taglia in chiaro: 128 cm, 138 cm, 148 cm. ⚠️ E i limiti non coincidono con le lettere francesi: la B arriva a 1,30 m, quindi un B di 1,29 m è già un 138 — e un C di 1,40 m, già un 148.",
          de:"In Irland und Großbritannien tragen die Klassen das Maß im Namen: 128 cm, 138 cm, 148 cm. ⚠️ Und die Grenzen decken sich nicht mit den französischen Buchstaben: B geht bis 1,30 m — ein B von 1,29 m ist also schon ein 138er, ein C von 1,40 m schon ein 148er.",
          ja:"アイルランドとイギリスでは、区分の名前が体高そのもの。128センチ、138センチ、148センチ。⚠️ しかも境界はフランスの文字と一致しません。B は1.30メートルまでなので、1.29メートルの B はもう138クラス。1.40メートルの C は、もう148クラスです。" } },

  { ref:"dans-la-taille", lecon:1, coll:"poney", v:true,
    mots:{ fr:{m:"être dans la taille"}, en:{m:"to measure in", p:"mè-jeur ine"},
           es:{m:"estar en la talla"}, it:{m:"rientrare nella taglia"},
           de:{m:"im Maß sein", p:"ime mâss"}, ja:{m:"規定内に収まる", p:"kiteinai ni osamaru"} },
    def:{ fr:"Passer la toise et rester poney : c'est le mot du règlement international. La limite : 148 cm sans fers, 149 ferré — 14,2 mains chez les anglo-saxons. « The pony measured in » : il est dans la taille.",
          en:"To pass the measuring stick and stay a pony: the word of the international rulebook. The limit: 148 cm without shoes, 149 shod — 14.2 hands. « The pony measured in »: he is within the height.",
          es:"Pasar la medición y seguir siendo poni: es la palabra del reglamento internacional. El límite: 148 cm sin herraduras, 149 herrado — 14,2 manos. « The pony measured in »: está en la talla.",
          it:"Passare la misurazione e restare pony: è la parola del regolamento internazionale. Il limite: 148 cm senza ferri, 149 ferrato — 14,2 mani. « The pony measured in »: è nella taglia.",
          de:"Gemessen werden und Pony bleiben: das Wort des internationalen Reglements. Die Grenze: 148 cm ohne Eisen, 149 beschlagen — 14,2 Hands. « The pony measured in »: er ist im Maß.",
          ja:"測尺を受けてポニーのままでいること。国際規則の言葉です。上限は蹄鉄なしで148センチ、装蹄して149センチ — 英語圏では14.2ハンド。« The pony measured in » は「規定内だった」という意味です。" } },

  { ref:"hors-taille", lecon:1, coll:"poney", v:true,
    mots:{ fr:{m:"être hors taille"}, en:{m:"to measure out", p:"mè-jeur aoutte"},
           es:{m:"pasarse de talla"}, it:{m:"essere fuori taglia"},
           de:{m:"über dem Maß sein", p:"u-beur déme mâss"}, ja:{m:"規定外になる", p:"kiteigai ni naru"} },
    def:{ fr:"Dépasser la toise : « the pony measured out ». Il ne redescendra pas — il devient officiellement un cheval, et change de monde en un centimètre.",
          en:"To go over the stick: « the pony measured out ». He will not shrink back — he officially becomes a horse, and changes worlds by one centimetre.",
          es:"Superar la medición: « the pony measured out ». No volverá a bajar — se convierte oficialmente en caballo, y cambia de mundo por un centímetro.",
          it:"Superare la misurazione: « the pony measured out ». Non tornerà indietro — diventa ufficialmente un cavallo, e cambia mondo per un centimetro.",
          de:"Über das Maß gehen: « the pony measured out ». Er wird nicht wieder kleiner — er wird offiziell ein Pferd und wechselt die Welt um einen Zentimeter.",
          ja:"測尺で上限を超えること。« The pony measured out »。もう縮むことはなく、正式に「馬」となります。一センチで世界が変わるのです。" } }
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
      ja:"今日 の 午後 は ゲーム を し ます か ?" },

  /* ---- les 22 phrases du 17 août 2026 (Blandine, fr/en) ---- */

  { ref:"ph-poney-toise", lecon:1,
      fr:"Est-ce qu'il doit être toisé avant l'épreuve ?",
      en:"Does he need to be measured before the class?",
      es:"¿Hay que medirlo antes de la prueba?",
      it:"Deve essere misurato prima della prova?",
      de:"Muss er vor der Prüfung gemessen werden?",
      ja:"競技 の 前 に 測尺 が 必要 です か ?" },

  { ref:"ph-poney-quelle-categorie", lecon:1,
      fr:"Dans quelle catégorie de taille concourt-il ?",
      en:"Which height category does he compete in?",
      es:"¿En qué categoría de alzada compite?",
      it:"In quale categoria di taglia gareggia?",
      de:"In welcher Größenklasse startet er?",
      ja:"どの 体高 区分 で 出場 します か ?" },

  { ref:"ph-poney-146", lecon:1,
      fr:"Il mesure un mètre quarante-six au garrot.",
      en:"He is one metre forty-six at the withers.",
      es:"Mide un metro cuarenta y seis a la cruz.",
      it:"Misura un metro e quarantasei al garrese.",
      de:"Er misst eins sechsundvierzig am Widerrist.",
      ja:"体高 は 百四十六センチ です。" },

  { ref:"ph-poney-grand-facile", lecon:1,
      fr:"C'est un grand poney, mais il est très facile à monter.",
      en:"He's a large pony, but he's very easy to ride.",
      es:"Es un poni grande, pero es muy fácil de montar.",
      it:"È un pony grande, ma è molto facile da montare.",
      de:"Er ist ein Großpony, aber sehr leicht zu reiten.",
      ja:"大きな ポニー です が、 とても 乗りやすい です。" },

  { ref:"ph-poney-double-pony", lecon:1,
      fr:"Attention, « double poney » ne se dit pas en anglais.",
      en:"Be careful, \"double pony\" isn't used in English.",
      es:"Cuidado, « double pony » no se dice en inglés.",
      it:"Attenzione, « double pony » non si dice in inglese.",
      de:"Achtung, « double pony » sagt man im Englischen nicht.",
      ja:"注意 ! « double pony » は 英語 では 使いません。" },

  { ref:"ph-poney-poneys-ecole", lecon:1,
      fr:"Les enfants montent principalement des poneys d'école.",
      en:"The children mainly ride school ponies.",
      es:"Los niños montan sobre todo ponis de escuela.",
      it:"I bambini montano soprattutto pony di scuola.",
      de:"Die Kinder reiten vor allem Schulponys.",
      ja:"子ども たち は 主に レッスンポニー に 乗ります。" },

  { ref:"ph-poney-equipe-demain", lecon:1,
      fr:"On participe à l'épreuve par équipe demain matin.",
      en:"We're competing in the team competition tomorrow morning.",
      es:"Participamos en la prueba por equipos mañana por la mañana.",
      it:"Partecipiamo alla prova a squadre domani mattina.",
      de:"Wir starten morgen früh in der Mannschaftswertung.",
      ja:"明日 の 朝 団体戦 に 出ます。" },

  { ref:"ph-poney-quatre-cavaliers", lecon:1,
      fr:"Notre équipe est composée de quatre cavaliers.",
      en:"Our team is made up of four riders.",
      es:"Nuestro equipo está formado por cuatro jinetes.",
      it:"La nostra squadra è composta da quattro cavalieri.",
      de:"Unser Team besteht aus vier Reitern.",
      ja:"私たち の チーム は 四人 の 騎手 です。" },

  { ref:"ph-poney-games-ou-equifun", lecon:1,
      fr:"Tu participes aux Mounted Games ou à l'Equifun ?",
      en:"Are you competing in the Mounted Games or the Equifun?",
      es:"¿Participas en los Mounted Games o en el Equifun?",
      it:"Partecipi ai Mounted Games o all'Equifun?",
      de:"Startest du bei den Mounted Games oder beim Equifun?",
      ja:"マウンテッドゲームズ と エキファン、 どちら に 出ます か ?" },

  { ref:"ph-poney-carrousel-musique", lecon:1,
      fr:"Le carrousel se déroule en musique avec plusieurs cavaliers.",
      en:"The quadrille is performed to music with several riders.",
      es:"El carrusel se desarrolla con música y varios jinetes.",
      it:"Il carosello si svolge in musica con più cavalieri.",
      de:"Die Quadrille wird zur Musik mit mehreren Reitern geritten.",
      ja:"クアドリール は 音楽 に 合わせて 数人 で 演技 します。" },

  { ref:"ph-poney-synchronises", lecon:1,
      fr:"Il faut rester parfaitement synchronisés pendant toute la reprise.",
      en:"We need to stay perfectly synchronised throughout the display.",
      es:"Hay que mantenerse perfectamente sincronizados durante toda la reprise.",
      it:"Bisogna restare perfettamente sincronizzati per tutta la ripresa.",
      de:"Wir müssen die ganze Vorführung über perfekt synchron bleiben.",
      ja:"演技 の 間 ずっと 完璧に 揃って いなければ なりません。" },

  { ref:"ph-poney-cru-detente", lecon:1,
      fr:"Est-ce que je peux le monter à cru pour la détente ?",
      en:"Can I ride him bareback for the warm-up?",
      es:"¿Puedo montarlo a pelo para el calentamiento?",
      it:"Posso montarlo a pelo per il riscaldamento?",
      de:"Darf ich ihn zum Abreiten ohne Sattel reiten?",
      ja:"ウォーミングアップ で 裸馬 に 乗って も いい です か ?" },

  { ref:"ph-poney-partie-bleue", lecon:1,
      fr:"Prends les rênes au niveau de la partie bleue.",
      en:"Hold the reins on the blue section.",
      es:"Coge las riendas por la parte azul.",
      it:"Prendi le redini sulla parte blu.",
      de:"Nimm die Zügel am blauen Abschnitt.",
      ja:"手綱 の 青い ところ を 持って。" },

  { ref:"ph-poney-shetland", lecon:1,
      fr:"C'est un Shetland, il est petit mais très costaud.",
      en:"He's a Shetland pony; he's small but very strong.",
      es:"Es un shetland: es pequeño pero muy fuerte.",
      it:"È uno Shetland: è piccolo ma fortissimo.",
      de:"Er ist ein Shetlandpony: klein, aber sehr kräftig.",
      ja:"シェットランドポニー です。 小さい けれど とても 力持ち です。" },

  /* ---- les six phrases « un poney n'est pas classé pareil partout » ---- */

  { ref:"ph-poney-irlande-classe", lecon:1,
      fr:"En Irlande, dans quelle catégorie de taille concourt ce poney ?",
      en:"What height class does this pony compete in in Ireland?",
      es:"En Irlanda, ¿en qué categoría de alzada compite este poni?",
      it:"In Irlanda, in quale categoria di taglia gareggia questo pony?",
      de:"In welcher Größenklasse startet dieses Pony in Irland?",
      ja:"アイルランド では この ポニー は どの 区分 で 出場 します か ?" },

  { ref:"ph-poney-classe-138", lecon:1,
      fr:"Il concourt dans la catégorie des 138 cm.",
      en:"He competes in the 138 cm pony class.",
      es:"Compite en la categoría de 138 cm.",
      it:"Gareggia nella categoria dei 138 cm.",
      de:"Er startet in der 138-cm-Klasse.",
      ja:"百三十八センチ の クラス に 出場 して います。" },

  { ref:"ph-poney-autre-categorie", lecon:1,
      fr:"En France, ce poney serait classé dans une autre catégorie.",
      en:"In France, this pony would be in a different category.",
      es:"En Francia, este poni estaría en otra categoría.",
      it:"In Francia, questo pony sarebbe in un'altra categoria.",
      de:"In Frankreich wäre dieses Pony in einer anderen Kategorie.",
      ja:"フランス では この ポニー は 別 の 区分 に 入ります。" },

  { ref:"ph-poney-abcd", lecon:1,
      fr:"Les catégories françaises A, B, C et D ne sont pas utilisées partout.",
      en:"The French A, B, C and D pony categories are not used everywhere.",
      es:"Las categorías francesas A, B, C y D no se usan en todas partes.",
      it:"Le categorie francesi A, B, C e D non si usano dappertutto.",
      de:"Die französischen Kategorien A, B, C und D werden nicht überall verwendet.",
      ja:"フランス の A B C D の 区分 は どこ でも 使われる わけ では ありません。" },

  { ref:"ph-poney-taille-exacte", lecon:1,
      fr:"À l'étranger, donne plutôt la taille exacte du poney.",
      en:"Abroad, it's better to give the pony's exact height.",
      es:"En el extranjero, da mejor la alzada exacta del poni.",
      it:"All'estero, meglio dare l'altezza esatta del pony.",
      de:"Im Ausland nennst du besser das genaue Stockmaß.",
      ja:"外国 では ポニー の 正確な 体高 を 言う ほう が いい です。" },

  { ref:"ph-poney-piege-140", lecon:1,
      fr:"Mon poney mesure 1,40 m. En France, c'est un poney C. En Irlande, il concourrait dans la catégorie 148 cm.",
      en:"My pony is 1.40 metres tall. In France, he's a category C pony. In Ireland, he would compete in the 148 cm pony category.",
      es:"Mi poni mide 1,40 m. En Francia es un poni C. En Irlanda competiría en la categoría de 148 cm.",
      it:"Il mio pony misura 1,40 m. In Francia è un pony C. In Irlanda gareggerebbe nella categoria dei 148 cm.",
      de:"Mein Pony misst 1,40 m. In Frankreich ist er ein C-Pony. In Irland würde er in der 148-cm-Klasse starten.",
      ja:"私 の ポニー は 体高 1.40メートル。 フランス では C ポニー です が、 アイルランド では 148センチ の クラス に 出ます。" },

  { ref:"ph-poney-piege-b", lecon:1,
      fr:"Un poney B français n'est pas forcément un 128 cm pony en Irlande.",
      en:"A French category B pony isn't necessarily a 128 cm pony in Ireland.",
      es:"Un poni B francés no es necesariamente un poni de 128 cm en Irlanda.",
      it:"Un pony B francese non è per forza un pony da 128 cm in Irlanda.",
      de:"Ein französisches B-Pony ist in Irland nicht unbedingt ein 128-cm-Pony.",
      ja:"フランス の B ポニー が アイルランド で 必ず 128センチ の クラス と は 限りません。" },

  { ref:"ph-poney-limite-internationale", lecon:1,
      fr:"Il mesure 1,47 m, donc il reste dans la limite internationale poney.",
      en:"He measures 1.47 metres, so he is still within the international pony height limit.",
      es:"Mide 1,47 m, así que sigue dentro del límite internacional de poni.",
      it:"Misura 1,47 m, quindi resta nel limite internazionale dei pony.",
      de:"Er misst 1,47 m und bleibt damit unter der internationalen Ponygrenze.",
      ja:"体高 1.47メートル なので 国際 の ポニー 規定 内 に 収まって います。" }
  ],

  /* ==================================================================
     LE DIALOGUE DE LAMOTTE-BEUVRON — 17 août 2026, session 214.

     LA SCÈNE : les Generali Open de France, le plus grand rassemblement
     équestre du monde. 26 phrases, 6 temps.

     🟥 AUCUNE PHRASE N'A ÉTÉ ÉCRITE POUR CE DIALOGUE, comme pour Dubaï :
     les vingt-six existaient déjà dans ce fichier comme phrases
     d'exercice. Il n'y avait qu'à leur donner un temps et un locuteur.
     ⚠️ LES PHRASES D'EXERCICE RESTENT EN PLACE, inchangées.

     🟥 LE VRAI SUJET DU CHAPITRE EST AU TEMPS 4, et c'est ce qui le rend
     unique dans l'app : LES CATÉGORIES DE TAILLE NE SE TRADUISENT PAS.
     Un poney C français n'est pas un « C pony » ailleurs — les lettres
     A, B, C, D sont une invention française. En Irlande et en
     Grande-Bretagne on compte en centimètres : 128, 138, 148.
     ⚠️ D'où la consigne qui traverse le chapitre : À L'ÉTRANGER, DONNER
     LA TAILLE EXACTE, jamais la lettre. C'est la seule ville où la bonne
     réponse est de renoncer à son propre vocabulaire.

     🟥 ET « DOUBLE PONEY » NE SE DIT PAS EN ANGLAIS. C'est un faux ami
     complet : on dit **a large pony**. Une phrase entière du chapitre ne
     sert qu'à l'avertir. NE PAS la retirer.

     ⚠️ Le chapitre est celui des ENFANTS, mais les phrases sont celles
     d'un adulte qui accompagne — une monitrice, un parent, un cavalier
     de passage. C'est cohérent : Lamotte est aussi la ville de
     l'enseignement au poney (voir Saumur pour l'enseignement adulte).

     `dit` : "joueuse" = elle produit · "club" = un moniteur, un
     commissaire à la toise, un autre cavalier.
  ================================================================== */
  dialogue: {
    ville: "lamotte", lecon: 1, temps: 6, langues: ["fr","en","es","it","de","ja"],   /* 26 phrases */

    phrases: [

      /* ---- temps 1 · j'arrive au poney-club ---- */
      { ref:"dl-poneys-ecole", temps:1, dit:"club", mots:["poney-club","cheval-ecole","poney"],
        fr:"Les enfants montent principalement des poneys d'école.",
        en:"The children mainly ride school ponies.",
        es:"Los niños montan sobre todo ponis de escuela.",
        it:"I bambini montano soprattutto pony di scuola.",
        de:"Die Kinder reiten vor allem Schulponys.",
        ja:"子ども たち は 主に レッスンポニー に 乗ります。" },

      { ref:"dl-debutant", temps:1, dit:"joueuse", mots:["poney","caractere"],
        fr:"C'est un poney pour débuter ?",
        en:"Is he a beginner's pony?",
        es:"¿Es un poni para principiantes?",
        it:"È un pony per principianti?",
        de:"Ist es ein Pony für Anfänger?",
        ja:"初心者 向け の ポニー です か。" },

      { ref:"dl-calme", temps:1, dit:"club", mots:["calme","caractere"],
        fr:"Il est très calme.",
        en:"He is very quiet.",
        es:"Es muy tranquilo.",
        it:"È molto tranquillo.",
        de:"Es ist sehr brav.",
        ja:"とても おとなしい です。" },

      { ref:"dl-shetland", temps:1, dit:"club", mots:["shetland"],
        fr:"C'est un Shetland, il est petit mais très costaud.",
        en:"He's a Shetland pony; he's small but very strong.",
        es:"Es un shetland: es pequeño pero muy fuerte.",
        it:"È uno Shetland: è piccolo ma fortissimo.",
        de:"Er ist ein Shetlandpony: klein, aber sehr kräftig.",
        ja:"シェットランドポニー です。 小さい けれど とても 力持ち です。" },

      /* ---- temps 2 · la taille, et le piège des catégories ---- */
      { ref:"dl-taille", temps:2, dit:"joueuse", mots:["taille-garrot"],
        fr:"Quelle est sa taille au garrot ?",
        en:"How tall is he?",
        es:"¿Cuánto mide de alzada?",
        it:"Quanto misura al garrese?",
        de:"Wie groß ist er?",
        ja:"体高 は どれ くらい です か。" },

      { ref:"dl-146", temps:2, dit:"club", mots:["taille-garrot"],
        fr:"Il mesure un mètre quarante-six au garrot.",
        en:"He is one metre forty-six at the withers.",
        es:"Mide un metro cuarenta y seis a la cruz.",
        it:"Misura un metro e quarantasei al garrese.",
        de:"Er misst eins sechsundvierzig am Widerrist.",
        ja:"体高 は 百四十六センチ です。" },

      { ref:"dl-grand-facile", temps:2, dit:"club", mots:["double-poney","caractere"],
        fr:"C'est un grand poney, mais il est très facile à monter.",
        en:"He's a large pony, but he's very easy to ride.",
        es:"Es un poni grande, pero es muy fácil de montar.",
        it:"È un pony grande, ma è molto facile da montare.",
        de:"Er ist ein Großpony, aber sehr leicht zu reiten.",
        ja:"大きな ポニー です が、 とても 乗りやすい です。" },

      { ref:"dl-double-pony", temps:2, dit:"club", mots:["double-poney"],
        fr:"Attention, « double poney » ne se dit pas en anglais.",
        en:"Be careful, \"double pony\" isn't used in English.",
        es:"Cuidado, « double pony » no se dice en inglés.",
        it:"Attenzione, « double pony » non si dice in inglese.",
        de:"Achtung, « double pony » sagt man im Englischen nicht.",
        ja:"注意 ! « double pony » は 英語 では 使いません。" },

      { ref:"dl-limite-internationale", temps:2, dit:"club", mots:["taille-garrot","categorie-taille"],
        fr:"Il mesure 1,47 m, donc il reste dans la limite internationale poney.",
        en:"He measures 1.47 metres, so he is still within the international pony height limit.",
        es:"Mide 1,47 m, así que sigue dentro del límite internacional de poni.",
        it:"Misura 1,47 m, quindi resta nel limite internazionale dei pony.",
        de:"Er misst 1,47 m und bleibt damit unter der internationalen Ponygrenze.",
        ja:"体高 1.47メートル なので 国際 の ポニー 規定 内 に 収まって います。" },

      /* ---- temps 3 · toiser, et concourir dans sa catégorie ---- */
      { ref:"dl-toise", temps:3, dit:"joueuse", mots:["toise","dans-la-taille"],
        fr:"Est-ce qu'il doit être toisé avant l'épreuve ?",
        en:"Does he need to be measured before the class?",
        es:"¿Hay que medirlo antes de la prueba?",
        it:"Deve essere misurato prima della prova?",
        de:"Muss er vor der Prüfung gemessen werden?",
        ja:"競技 の 前 に 測尺 が 必要 です か ?" },

      { ref:"dl-quelle-categorie", temps:3, dit:"joueuse", mots:["categorie-taille"],
        fr:"Dans quelle catégorie de taille concourt-il ?",
        en:"Which height category does he compete in?",
        es:"¿En qué categoría de alzada compite?",
        it:"In quale categoria di taglia gareggia?",
        de:"In welcher Größenklasse startet er?",
        ja:"どの 体高 区分 で 出場 します か ?" },

      { ref:"dl-classe-138", temps:3, dit:"club", mots:["classe-cm"],
        fr:"Il concourt dans la catégorie des 138 cm.",
        en:"He competes in the 138 cm pony class.",
        es:"Compite en la categoría de 138 cm.",
        it:"Gareggia nella categoria dei 138 cm.",
        de:"Er startet in der 138-cm-Klasse.",
        ja:"百三十八センチ の クラス に 出場 して います。" },

      { ref:"dl-abcd", temps:3, dit:"club", mots:["categorie-taille"],
        fr:"Les catégories françaises A, B, C et D ne sont pas utilisées partout.",
        en:"The French A, B, C and D pony categories are not used everywhere.",
        es:"Las categorías francesas A, B, C y D no se usan en todas partes.",
        it:"Le categorie francesi A, B, C e D non si usano dappertutto.",
        de:"Die französischen Kategorien A, B, C und D werden nicht überall verwendet.",
        ja:"フランス の A B C D の 区分 は どこ でも 使われる わけ では ありません。" },

      /* ---- temps 4 · d'un pays à l'autre ---- */
      { ref:"dl-irlande-classe", temps:4, dit:"joueuse", mots:["categorie-taille"],
        fr:"En Irlande, dans quelle catégorie de taille concourt ce poney ?",
        en:"What height class does this pony compete in in Ireland?",
        es:"En Irlanda, ¿en qué categoría de alzada compite este poni?",
        it:"In Irlanda, in quale categoria di taglia gareggia questo pony?",
        de:"In welcher Größenklasse startet dieses Pony in Irland?",
        ja:"アイルランド では この ポニー は どの 区分 で 出場 します か ?" },

      { ref:"dl-autre-categorie", temps:4, dit:"club", mots:["categorie-taille"],
        fr:"En France, ce poney serait classé dans une autre catégorie.",
        en:"In France, this pony would be in a different category.",
        es:"En Francia, este poni estaría en otra categoría.",
        it:"In Francia, questo pony sarebbe in un'altra categoria.",
        de:"In Frankreich wäre dieses Pony in einer anderen Kategorie.",
        ja:"フランス では この ポニー は 別 の 区分 に 入ります。" },

      { ref:"dl-piege-140", temps:4, dit:"club", mots:["taille-garrot","categorie-taille"],
        fr:"Mon poney mesure 1,40 m. En France, c'est un poney C. En Irlande, il concourrait dans la catégorie 148 cm.",
        en:"My pony is 1.40 metres tall. In France, he's a category C pony. In Ireland, he would compete in the 148 cm pony category.",
        es:"Mi poni mide 1,40 m. En Francia es un poni C. En Irlanda competiría en la categoría de 148 cm.",
        it:"Il mio pony misura 1,40 m. In Francia è un pony C. In Irlanda gareggerebbe nella categoria dei 148 cm.",
        de:"Mein Pony misst 1,40 m. In Frankreich ist er ein C-Pony. In Irland würde er in der 148-cm-Klasse starten.",
        ja:"私 の ポニー は 体高 1.40メートル。 フランス では C ポニー です が、 アイルランド では 148センチ の クラス に 出ます。" },

      { ref:"dl-piege-b", temps:4, dit:"club", mots:["categorie-taille","classe-cm"],
        fr:"Un poney B français n'est pas forcément un 128 cm pony en Irlande.",
        en:"A French category B pony isn't necessarily a 128 cm pony in Ireland.",
        es:"Un poni B francés no es necesariamente un poni de 128 cm en Irlanda.",
        it:"Un pony B francese non è per forza un pony da 128 cm in Irlanda.",
        de:"Ein französisches B-Pony ist in Irland nicht unbedingt ein 128-cm-Pony.",
        ja:"フランス の B ポニー が アイルランド で 必ず 128センチ の クラス と は 限りません。" },

      { ref:"dl-taille-exacte", temps:4, dit:"club", mots:["taille-garrot"],
        fr:"À l'étranger, donne plutôt la taille exacte du poney.",
        en:"Abroad, it's better to give the pony's exact height.",
        es:"En el extranjero, da mejor la alzada exacta del poni.",
        it:"All'estero, meglio dare l'altezza esatta del pony.",
        de:"Im Ausland nennst du besser das genaue Stockmaß.",
        ja:"外国 では ポニー の 正確な 体高 を 言う ほう が いい です。" },

      /* ---- temps 5 · les épreuves ---- */
      { ref:"dl-jeux", temps:5, dit:"joueuse", mots:["jeux-poney"],
        fr:"On fait les jeux cet après-midi ?",
        en:"Are we doing the games this afternoon?",
        es:"¿Hacemos los juegos esta tarde?",
        it:"Facciamo i giochi questo pomeriggio?",
        de:"Machen wir heute Nachmittag die Spiele?",
        ja:"今日 の 午後 は ゲーム を し ます か ?" },

      { ref:"dl-games-ou-equifun", temps:5, dit:"club", mots:["jeux-poney","equifun"],
        fr:"Tu participes aux Mounted Games ou à l'Equifun ?",
        en:"Are you competing in the Mounted Games or the Equifun?",
        es:"¿Participas en los Mounted Games o en el Equifun?",
        it:"Partecipi ai Mounted Games o all'Equifun?",
        de:"Startest du bei den Mounted Games oder beim Equifun?",
        ja:"マウンテッドゲームズ と エキファン、 どちら に 出ます か ?" },

      { ref:"dl-equipe-demain", temps:5, dit:"joueuse", mots:["epreuve-equipe"],
        fr:"On participe à l'épreuve par équipe demain matin.",
        en:"We're competing in the team competition tomorrow morning.",
        es:"Participamos en la prueba por equipos mañana por la mañana.",
        it:"Partecipiamo alla prova a squadre domani mattina.",
        de:"Wir starten morgen früh in der Mannschaftswertung.",
        ja:"明日 の 朝 団体戦 に 出ます。" },

      { ref:"dl-quatre-cavaliers", temps:5, dit:"club", mots:["epreuve-equipe"],
        fr:"Notre équipe est composée de quatre cavaliers.",
        en:"Our team is made up of four riders.",
        es:"Nuestro equipo está formado por cuatro jinetes.",
        it:"La nostra squadra è composta da quattro cavalieri.",
        de:"Unser Team besteht aus vier Reitern.",
        ja:"私たち の チーム は 四人 の 騎手 です。" },

      { ref:"dl-carrousel-musique", temps:5, dit:"club", mots:["carrousel"],
        fr:"Le carrousel se déroule en musique avec plusieurs cavaliers.",
        en:"The quadrille is performed to music with several riders.",
        es:"El carrusel se desarrolla con música y varios jinetes.",
        it:"Il carosello si svolge in musica con più cavalieri.",
        de:"Die Quadrille wird zur Musik mit mehreren Reitern geritten.",
        ja:"クアドリール は 音楽 に 合わせて 数人 で 演技 します。" },

      { ref:"dl-synchronises", temps:5, dit:"club", mots:["carrousel","epreuve-equipe"],
        fr:"Il faut rester parfaitement synchronisés pendant toute la reprise.",
        en:"We need to stay perfectly synchronised throughout the display.",
        es:"Hay que mantenerse perfectamente sincronizados durante toda la reprise.",
        it:"Bisogna restare perfettamente sincronizzati per tutta la ripresa.",
        de:"Wir müssen die ganze Vorführung über perfekt synchron bleiben.",
        ja:"演技 の 間 ずっと 完璧に 揃って いなければ なりません。" },

      /* ---- temps 6 · monter autrement ---- */
      { ref:"dl-cru-detente", temps:6, dit:"joueuse", mots:["a-cru"],
        fr:"Est-ce que je peux le monter à cru pour la détente ?",
        en:"Can I ride him bareback for the warm-up?",
        es:"¿Puedo montarlo a pelo para el calentamiento?",
        it:"Posso montarlo a pelo per il riscaldamento?",
        de:"Darf ich ihn zum Abreiten ohne Sattel reiten?",
        ja:"ウォーミングアップ で 裸馬 に 乗って も いい です か ?" },

      { ref:"dl-partie-bleue", temps:6, dit:"club", mots:["renes-couleur"],
        fr:"Prends les rênes au niveau de la partie bleue.",
        en:"Hold the reins on the blue section.",
        es:"Coge las riendas por la parte azul.",
        it:"Prendi le redini sulla parte blu.",
        de:"Nimm die Zügel am blauen Abschnitt.",
        ja:"手綱 の 青い ところ を 持って。" },
    ]
  }
};
