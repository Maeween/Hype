/* hype-lingo-lex-dressage.js — Hype Lingo · Chapitre 6 · « Le dressage »
   ==================================================================
   42 CONCEPTS, QUATRE LEÇONS. Ville : Windsor. Souvenir : la lettre A.

   CHAMPS : voir hype-lingo-lex-ecurie.js. Pas de champ `dit`
   (réservé aux chapitres Le cours et Les urgences).

   PAS DE DOUBLON avec le chapitre 5 · Le cours, qui possède déjà la
   piste, la diagonale, le cercle, la volte, la serpentine, le coin, la
   ligne du milieu, les mains gauche/droite, les allures, les
   transitions, allonger/raccourcir et la halte. Ce chapitre-ci ne prend
   que ce qui appartient en propre au dressage : le rectangle et ses
   lettres, les mouvements latéraux, les qualités de l'échelle de
   progression, et la notation.

   ⚠️ FAUX AMI INTERNE AU FRANÇAIS, traité dans le concept `reprise-test` :
   « la reprise » désigne le GROUPE d'élèves en manège (chapitre 5,
   `toute-reprise`) ET le TEST de dressage. L'anglais sépare les deux :
   the ride / the test. C'est l'un des pièges les plus utiles du module.

   CE QUE CE CHAPITRE ENSEIGNE EN PLUS DU VOCABULAIRE
     · l'échelle de progression allemande (Ausbildungsskala) est la
       référence mondiale, et ses six mots ne se traduisent
       qu'approximativement — les juges anglophones emploient parfois
       l'allemand tel quel (Durchlässigkeit, Losgelassenheit).
     · le moyen mnémotechnique britannique pour les lettres du rectangle.
     · l'espagnol ne dit pas « dressage » mais **la doma clásica**.
     · l'allemand appelle le trot allongé « starker Trab », le trot fort.
     · **die Kür** s'emploie tel quel dans le monde entier.

   ⚠️ RELECTURE NATIVE OBLIGATOIRE. Le japonais est de loin le plus
   incertain de tout le module sur ce chapitre : le dressage japonais
   emploie massivement des emprunts en katakana, et je ne sais jamais si
   le terme sino-japonais que je propose est celui qu'un cavalier
   emploie. Toutes les entrées // ?? sont au fichier de doutes.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.dressage = {
  ref: "dressage",
  chapitre: 6,
  titre: { fr:"Le dressage", en:"Dressage", es:"La doma clásica", it:"Il dressage", de:"Die Dressur", ja:"馬場馬術" },
  lecons: 4,

  concepts: [

  /* ============ LEÇON 1 · LE RECTANGLE ET LES LETTRES ============ */

  { ref:"dressage", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"le dressage"}, en:{m:"dressage", p:"drè-sadj"},
           es:{m:"la doma clásica", var:"la doma"}, it:{m:"il dressage"},
           de:{m:"die Dressur", p:"drè-sour"}, ja:{m:"馬場馬術", p:"bababajutsu"} },
    def:{ fr:"⚠️ Le mot français a voyagé partout — sauf en espagnol, qui dit **la doma clásica**, et au Japon, qui dit littéralement « l'art équestre du rectangle ». Et en anglais il se prononce à la française, sans accent.",
          en:"The French word travelled everywhere except Spanish, which says doma clásica, and Japanese, which says literally « the arena art »." } },

  { ref:"rectangle", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"le rectangle"}, en:{m:"the arena", p:"a-ri-na", var:"the school"},
           es:{m:"la pista de doma"}, it:{m:"il rettangolo"},
           de:{m:"das Dressurviereck", p:"drè-sour-fir-èk"}, ja:{m:"馬場", p:"baba"} },
    def:{ fr:"20 × 60 m en compétition, 20 × 40 m dans les épreuves de club. L'allemand le nomme par sa forme, Viereck, « le quadrilatère ».",
          en:"20 × 60 m in competition, 20 × 40 m at club level. German names it by its shape: Viereck, the quadrilateral." } },

  { ref:"lettre", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"la lettre"}, en:{m:"the letter", p:"lè-teur"},
           es:{m:"la letra"}, it:{m:"la lettera"},
           de:{m:"der Buchstabe", p:"boureh-chta-be"}, ja:{m:"文字", p:"moji"} },
    def:{ fr:"A K E H C M B F autour du rectangle, X au centre — les mêmes lettres dans tous les pays du monde, et personne ne sait vraiment pourquoi celles-là. Les Britanniques les retiennent avec une phrase : « All King Edward's Horses Can Manage Big Fences ».",
          en:"A K E H C M B F round the arena and X in the middle — the same letters worldwide, and nobody quite knows why. The British remember them as « All King Edward's Horses Can Manage Big Fences »." } },

  { ref:"entree", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"l'entrée"}, en:{m:"the entry", p:"èn-tri", var:"enter at A"},
           es:{m:"la entrada"}, it:{m:"l'ingresso"},
           de:{m:"die Einfahrt", p:"aïn-fart"}, ja:{m:"入場", p:"nyūjō"} },
    def:{ fr:"Toujours par A, dans l'axe, après la cloche du juge. C'est la première note du protocole et souvent celle qui donne le ton de toute la reprise.",
          en:"Always at A, on the centre line, after the judge's bell. It is the first mark on the sheet and often sets the tone." } },

  { ref:"salut", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"le salut"}, en:{m:"the salute", p:"sa-loute"},
           es:{m:"el saludo"}, it:{m:"il saluto"},
           de:{m:"der Gruß", p:"grouss"}, ja:{m:"敬礼", p:"keirei"} },
    def:{ fr:"À l'arrêt, face au juge, en début et en fin de reprise. Un salut oublié coûte des points partout, et un salut trop long fait bouger le cheval.",
          en:"At the halt, facing the judge, at the start and end of the test. A forgotten salute costs marks everywhere." } },

  { ref:"juge", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"le juge"}, en:{m:"the judge", p:"djeudj"},
           es:{m:"el juez"}, it:{m:"il giudice"},
           de:{m:"der Richter", p:"rirh-teur"}, ja:{m:"審判員", p:"shinpan'in"} }, // ??
    def:{ fr:"Assis en C, parfois entouré d'un jury de trois à sept juges en grand championnat. On le salue, on ne lui parle pas pendant la reprise.",
          en:"Sitting at C, sometimes one of a panel of three to seven at championship level. You salute, you do not talk to them." } },

  { ref:"lecteur", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"le lecteur"}, en:{m:"the commander", p:"ko-man-deur", var:"the reader"},
           es:{m:"el lector"}, it:{m:"il lettore"},
           de:{m:"der Ansager", p:"an-za-gueur", var:"der Kommandant"}, ja:{m:"読み上げ係", p:"yomiage-gakari"} }, /* precise (rapport 07/08) */
    def:{ fr:"La personne qui lit la reprise à voix haute, autorisée dans la plupart des épreuves de club. ⚠️ En anglais on dit **commander**, un mot qui n'a rien à voir avec commander quelque chose.",
          en:"The person reading the test aloud, allowed at most club levels. English calls them the commander, nothing to do with ordering." } },

  { ref:"bande", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"la lice"}, en:{m:"the boards", p:"bordz", var:"the arena fence"},
           es:{m:"la valla"}, it:{m:"la staccionata"},
           de:{m:"die Bande", p:"ban-de"}, ja:{m:"馬場柵", p:"babasaku"} }, // ??
    def:{ fr:"La bordure basse qui délimite le rectangle. Sortir un pied dehors, c'est l'élimination dans la plupart des règlements.",
          en:"The low border marking out the arena. A foot outside it means elimination under most rules." } },

  { ref:"grand-cote", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"le grand côté"}, en:{m:"the long side", p:"long saïd", var:"short side = le petit côté"},
           es:{m:"el lado largo"}, it:{m:"il lato lungo"},
           de:{m:"die lange Seite", p:"lan-gue zaï-te"}, ja:{m:"長蹄跡", p:"chōteiseki"} },
    def:{ fr:"Les 60 m entre deux coins. Le japonais est le plus logique des six : 長蹄跡, « la longue piste », et 短蹄跡 pour le petit côté.",
          en:"The 60 m between two corners. Japanese is the tidiest of the six: « long track » and « short track »." } },

  { ref:"reprise-test", lecon:1, coll:"rectangle",
    mots:{ fr:{m:"la reprise"}, en:{m:"the test", p:"tèst", var:"dressage test"},
           es:{m:"la prueba", var:"el ejercicio"}, it:{m:"la ripresa"},
           de:{m:"die Aufgabe", p:"aouf-ga-be"}, ja:{m:"課目", p:"kamoku"} }, // ??
    def:{ fr:"⚠️ Le faux ami le plus retors du français : « la reprise » désigne à la fois le **groupe d'élèves** en manège et le **test** de dressage. L'anglais sépare proprement : *the ride* pour le groupe, *the test* pour l'épreuve. L'allemand aussi : Abteilung / Aufgabe.",
          en:"French « reprise » means both the group of pupils and the dressage test. English keeps them apart: the ride, the test." } },

  /* ============ LEÇON 2 · LES MOUVEMENTS ============ */

  { ref:"cession-jambe", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"la cession à la jambe"}, en:{m:"leg-yield", p:"lègue-yild"},
           es:{m:"la cesión a la pierna"}, it:{m:"la cessione alla gamba"},
           de:{m:"das Schenkelweichen", p:"chèn-keul-vaï-cheune"}, ja:{m:"脚に譲る", p:"ashi ni yuzuru", var:"レッグ・イールド"} }, /* precise (rapport 07/08) */
    def:{ fr:"Le cheval se déplace de côté sans incurvation, presque droit. Le premier mouvement latéral appris, et celui qu'on confond le plus souvent avec l'appuyer.",
          en:"The horse moves sideways with no bend, almost straight. The first lateral work learned, and the one most often confused with half-pass." } },

  { ref:"epaule-dedans", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"l'épaule en dedans"}, en:{m:"shoulder-in", p:"chol-deur-inn"},
           es:{m:"la espalda adentro"}, it:{m:"la spalla in dentro"},
           de:{m:"das Schulterherein", p:"choul-teur-hè-raïn"}, ja:{m:"ショルダーイン", p:"shorudā in"} }, /* valide (rapport 07/08) */
    def:{ fr:"Les épaules rentrées vers l'intérieur, les hanches sur la piste, le cheval incurvé autour de la jambe intérieure. Les cinq langues latines et germaniques disent toutes littéralement « épaule dedans » — un cas rare d'accord total.",
          en:"Shoulders brought in, hips on the track, the horse bent round the inside leg. All five European languages say literally « shoulder in »." } },

  { ref:"appuyer", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"l'appuyer"}, en:{m:"half-pass", p:"haf-pass"},
           es:{m:"la apoyada"}, it:{m:"l'appoggiata"},
           de:{m:"die Traversale", p:"tra-vèr-za-le"}, ja:{m:"ハーフパス", p:"hāfu pasu"} },
    def:{ fr:"Déplacement latéral avec incurvation dans le sens de la marche. ⚠️ Aucun accord entre les langues : l'anglais dit « demi-passage », l'allemand emploie un mot d'origine française que le français n'utilise pas, et le japonais l'anglais.",
          en:"Sideways with the bend in the direction of travel. No two languages agree here: English says half-pass, German uses a French-looking word the French never use." } },

  { ref:"changement-pied", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le changement de pied"}, en:{m:"the flying change", p:"flaï-ing tchèndj"},
           es:{m:"el cambio de pie"}, it:{m:"il cambio di piede"},
           de:{m:"der Galoppwechsel", p:"ga-lopp-vèk-seul"}, ja:{m:"踏歩変換", p:"tōhohenkan"} }, // ??
    def:{ fr:"Changer de pied de galop en l'air, sans repasser au trot. ⚠️ L'anglais insiste sur le fait que c'est en suspension : **flying** change. On les compte : au temps, au deux temps, au trois temps.",
          en:"Changing the leading leg in the air, without trotting. English stresses the suspension: a flying change." } },

  { ref:"pirouette", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"la pirouette"}, en:{m:"the pirouette", p:"pi-rou-ètt"},
           es:{m:"la pirueta"}, it:{m:"la piroetta"},
           de:{m:"die Pirouette", p:"pi-rou-è-te"}, ja:{m:"ピルーエット", p:"pirūetto"} },
    def:{ fr:"Un tour complet au galop autour d'un postérieur qui reste en place. Le mot français a été adopté partout, danse comprise.",
          en:"A full turn in canter round a hind leg that stays in place. The French word was adopted everywhere, dance included." } },

  { ref:"piaffer", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le piaffer"}, en:{m:"piaffe", p:"pi-af"},
           es:{m:"el piaffe"}, it:{m:"il piaffe"},
           de:{m:"die Piaffe", p:"pi-a-fe"}, ja:{m:"ピアッフェ", p:"piaffe"} },
    def:{ fr:"Un trot sur place, cadencé et rassemblé. Curiosité : le mot est français, mais c'est la forme allemande *die Piaffe* qui a été reprise par l'anglais, l'espagnol et l'italien.",
          en:"A cadenced, collected trot on the spot. The word is French, but it is the German form that English, Spanish and Italian borrowed." } },

  { ref:"passage", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le passage"}, en:{m:"passage", p:"pa-sadj"},
           es:{m:"el passage"}, it:{m:"il passage"},
           de:{m:"die Passage", p:"pa-sa-je"}, ja:{m:"パッサージュ", p:"passāju"} },
    def:{ fr:"Un trot très rassemblé, avec un long temps de suspension. ⚠️ Se prononce à la française même en anglais : dire « pa-sidj » à l'anglaise ne sera pas compris.",
          en:"A very collected trot with a long moment of suspension. Pronounced the French way even in English." } },

  { ref:"reculer", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le reculer"}, en:{m:"the rein-back", p:"rèn-bak"},
           es:{m:"el paso atrás"}, it:{m:"l'indietreggiare"},
           de:{m:"das Rückwärtsrichten", p:"ruk-vèrts-rirh-teune"}, ja:{m:"後退", p:"kōtai"} },
    def:{ fr:"Reculer droit, par bipèdes diagonaux, le nombre de pas exact demandé par la reprise. ⚠️ L'anglais le nomme par la rêne, **rein-back**, alors que le mouvement vient d'abord du dos et des jambes.",
          en:"Straight back in diagonal pairs, the exact number of steps the test asks for. English names it after the rein." } },

  { ref:"contre-galop", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le contre-galop"}, en:{m:"counter-canter", p:"kaoune-teur kann-teur"},
           es:{m:"el galope a la contra"}, it:{m:"il galoppo rovesciato"}, // ??
           de:{m:"der Konter-Galopp", p:"kon-teur-ga-lopp", var:"Außengalopp"}, ja:{m:"反対駈歩", p:"hantai kakeho"} }, // ??
    def:{ fr:"Galoper à droite sur la main gauche, volontairement et en équilibre. C'est un test de rectitude et d'obéissance, pas une faute.",
          en:"Cantering right while going left, on purpose and in balance. A test of straightness and obedience, not a mistake." } },

  { ref:"trot-allonge", lecon:2, coll:"mouvements",
    mots:{ fr:{m:"le trot allongé"}, en:{m:"extended trot", p:"èks-tèn-dèd trot"},
           es:{m:"el trote largo"}, it:{m:"il trotto allungato"},
           de:{m:"der starke Trab", p:"chtar-ke trab"}, ja:{m:"伸長速歩", p:"shinchō hayaashi"} }, // ??
    def:{ fr:"L'amplitude maximale, sans précipiter. ⚠️ L'allemand ne dit pas « allongé » mais **starker Trab**, le trot *fort* — et l'échelle allemande complète va de Arbeitstrab (travail) à Mitteltrab (moyen) puis starker Trab.",
          en:"Maximum reach without hurrying. German does not say extended but starker Trab, the strong trot." } },

  /* ============ LEÇON 3 · LES QUALITÉS ============ */

  { ref:"cadence", lecon:3, coll:"qualites",
    mots:{ fr:{m:"le rythme"}, en:{m:"the rhythm", p:"ri-zeum"},
           es:{m:"el ritmo"}, it:{m:"il ritmo"},
           de:{m:"der Takt", p:"takt"}, ja:{m:"リズム", p:"rizumu"} },
    def:{ fr:"Le premier barreau de l'échelle de progression allemande, la référence mondiale du dressage : **Takt, Losgelassenheit, Anlehnung, Schwung, Geraderichtung, Versammlung**. Six mots allemands que les autres langues ne traduisent qu'approximativement — et que les juges anglophones citent parfois tels quels.",
          en:"The first rung of the German training scale, the world reference: Takt, Losgelassenheit, Anlehnung, Schwung, Geraderichtung, Versammlung — six words the other languages only approximate." } },

  { ref:"decontraction", lecon:3, coll:"qualites",
    mots:{ fr:{m:"la décontraction"}, en:{m:"suppleness", p:"seu-peul-neuss", var:"looseness"},
           es:{m:"la relajación"}, it:{m:"la decontrazione"},
           de:{m:"die Losgelassenheit", p:"lôss-gue-la-seune-haïte"}, ja:{m:"リラックス", p:"rirakkusu"} }, // ??
    def:{ fr:"Deuxième barreau de l'échelle. Le mot allemand dit exactement ce dont il s'agit : « l'état d'être lâché ». Aucune langue n'a trouvé mieux, et l'anglais hésite encore entre suppleness et looseness.",
          en:"The second rung. The German word says exactly what it is — « the state of being let go » — and English still hesitates between suppleness and looseness." } },

  { ref:"contact", lecon:3, coll:"qualites",
    mots:{ fr:{m:"le contact"}, en:{m:"the contact", p:"kon-takt"},
           es:{m:"el contacto"}, it:{m:"il contatto"},
           de:{m:"die Anlehnung", p:"an-lé-noung"}, ja:{m:"ハミ受け", p:"hami-uke"} },
    def:{ fr:"Troisième barreau. Le japonais est très parlant : ハミ受け, « l'acceptation du mors ». L'allemand aussi : Anlehnung, l'action de s'appuyer contre — jamais une traction du cavalier.",
          en:"The third rung. Japanese says « acceptance of the bit », German says « leaning against » — never a pull from the rider." } },

  { ref:"impulsion", lecon:3, coll:"qualites",
    mots:{ fr:{m:"l'impulsion"}, en:{m:"impulsion", p:"im-peul-cheune"},
           es:{m:"la impulsión"}, it:{m:"l'impulso"},
           de:{m:"der Schwung", p:"chvoung"}, ja:{m:"推進", p:"suishin"} }, // ??
    def:{ fr:"Quatrième barreau : l'énergie qui vient de derrière et traverse le dos. ⚠️ Ce n'est pas la vitesse. Le mot allemand Schwung, « l'élan », est plus juste que le mot français.",
          en:"The fourth rung: energy from behind, travelling through the back. It is not speed. German's Schwung, « swing », is closer than the French word." } },

  { ref:"rectitude", lecon:3, coll:"qualites",
    mots:{ fr:{m:"la rectitude"}, en:{m:"straightness", p:"stréïte-neuss"},
           es:{m:"la rectitud"}, it:{m:"la rettitudine"},
           de:{m:"die Geraderichtung", p:"gue-ra-de-rirh-toung"}, ja:{m:"直進性", p:"chokushinsei"} }, // ??
    def:{ fr:"Cinquième barreau. Tout cheval est naturellement de travers : le rendre droit est un travail de plusieurs années, pas une correction ponctuelle.",
          en:"The fifth rung. Every horse is naturally crooked; making one straight is years of work, not a quick correction." } },

  { ref:"rassembler", lecon:3, coll:"qualites",
    mots:{ fr:{m:"le rassembler"}, en:{m:"collection", p:"ko-lèk-cheune"},
           es:{m:"la reunión"}, it:{m:"la raccolta"},
           de:{m:"die Versammlung", p:"fèr-zam-loung"}, ja:{m:"収縮", p:"shūshuku"} }, // ??
    def:{ fr:"Sixième et dernier barreau : le cheval abaisse les hanches, raccourcit et s'allège de l'avant. Toutes les langues emploient l'image du rassemblement, sauf le japonais qui dit « contraction ».",
          en:"The sixth and last rung: the horse lowers its hindquarters, shortens and lightens in front." } },

  { ref:"incurvation", lecon:3, coll:"qualites",
    mots:{ fr:{m:"l'incurvation"}, en:{m:"the bend", p:"bènde"},
           es:{m:"la incurvación"}, it:{m:"l'incurvamento"},
           de:{m:"die Biegung", p:"bi-goung"}, ja:{m:"屈曲", p:"kukkyoku"} }, // ??
    def:{ fr:"La courbure du corps du bout du nez à la queue, de l'encolure au bassin. Un cheval « incurvé de l'encolure seulement » est un défaut, pas une incurvation.",
          en:"The curve of the whole body, nose to tail. A horse bent only in the neck is a fault, not a bend." } },

  { ref:"legerete", lecon:3, coll:"qualites",
    mots:{ fr:{m:"la légèreté"}, en:{m:"lightness", p:"laïte-neuss"},
           es:{m:"la ligereza"}, it:{m:"la leggerezza"},
           de:{m:"die Leichtigkeit", p:"laïrh-tirh-kaïte"}, ja:{m:"軽さ", p:"karusa"} }, // ??
    def:{ fr:"L'idéal de l'école française : obtenir sans peser. Le mot revient dans toutes les langues, mais c'est en français qu'il est devenu une doctrine, celle de Baucher et de l'École de Versailles.",
          en:"The French school's ideal: achieving without weight. Every language has the word, but only French made it a doctrine." } },

  { ref:"soumission", lecon:3, coll:"qualites",
    mots:{ fr:{m:"la soumission"}, en:{m:"submission", p:"seub-mi-cheune"},
           es:{m:"la sumisión"}, it:{m:"la sottomissione"},
           de:{m:"der Gehorsam", p:"gue-hor-zam"}, ja:{m:"従順", p:"jūjun"} },
    def:{ fr:"Une note à part sur le protocole. ⚠️ Le mot est trompeur dans toutes les langues : il ne désigne pas l'obéissance passive mais l'attention et la disponibilité — un cheval éteint est mal noté en soumission.",
          en:"A separate mark on the sheet, and a misleading word in every language: not passive obedience but attention and willingness." } },

  { ref:"permeabilite", lecon:3, coll:"qualites",
    mots:{ fr:{m:"la perméabilité aux aides"}, en:{m:"throughness", p:"srou-neuss", var:"Durchlässigkeit"},
           es:{m:"la permeabilidad"}, it:{m:"la permeabilità"},
           de:{m:"die Durchlässigkeit", p:"dourh-lè-sirh-kaïte"}, ja:{m:"透過性", p:"tōkasei"} }, // ??
    def:{ fr:"L'aide passe à travers le cheval sans être bloquée. ⚠️ Cas remarquable : l'anglais n'a jamais trouvé de traduction satisfaisante et les juges britanniques emploient souvent l'allemand **Durchlässigkeit** tel quel, dans une phrase anglaise.",
          en:"The aid passes through the horse without being blocked. English never found a good word, and British judges often just say Durchlässigkeit." } },

  /* ============ LEÇON 4 · LA REPRISE ET LA NOTE ============ */

  { ref:"protocole", lecon:4, coll:"notation",
    mots:{ fr:{m:"le protocole"}, en:{m:"the test sheet", p:"tèst chite", var:"score sheet"},
           es:{m:"la hoja de puntuación"}, it:{m:"il foglio di giudizio"},
           de:{m:"das Protokoll", p:"pro-to-kol"}, ja:{m:"採点表", p:"saitenhyō"} }, // ??
    def:{ fr:"La feuille où chaque mouvement reçoit sa note et sa remarque. On la récupère après l'épreuve, et c'est le vrai cours particulier de la journée.",
          en:"The sheet where every movement gets its mark and comment. Collected afterwards, it is the real lesson of the day." } },

  { ref:"note", lecon:4, coll:"notation",
    mots:{ fr:{m:"la note"}, en:{m:"the mark", p:"mark", var:"score (US)"},
           es:{m:"la nota"}, it:{m:"il voto"},
           de:{m:"die Note", p:"nô-te"}, ja:{m:"点数", p:"tensū"} },
    def:{ fr:"De 0 à 10 par mouvement : 10 excellent, 6 satisfaisant, 0 mouvement non exécuté. ⚠️ L'anglais britannique dit **mark**, l'américain **score** — et « note » en anglais veut dire une remarque écrite, pas une note.",
          en:"0 to 10 per movement. British English says mark, American score — and « note » in English means a written comment, not a mark." } },

  { ref:"coefficient", lecon:4, coll:"notation",
    mots:{ fr:{m:"le coefficient"}, en:{m:"the coefficient", p:"kô-i-fi-cheunt", var:"double marks"},
           es:{m:"el coeficiente"}, it:{m:"il coefficiente"},
           de:{m:"der Koeffizient", p:"ko-è-fi-tsi-ènt"}, ja:{m:"係数", p:"keisū"} }, // ??
    def:{ fr:"Certains mouvements comptent double. Les Britanniques disent souvent simplement **double marks** : savoir lesquels sont doublés change la façon de préparer une reprise.",
          en:"Some movements count twice. The British often just say « double marks »." } },

  { ref:"pourcentage", lecon:4, coll:"notation",
    mots:{ fr:{m:"le pourcentage"}, en:{m:"the percentage", p:"peur-sènn-tidj"},
           es:{m:"el porcentaje"}, it:{m:"la percentuale"},
           de:{m:"der Prozentsatz", p:"pro-tsènt-zats"}, ja:{m:"得点率", p:"tokutenritsu"} }, // ??
    def:{ fr:"Le total ramené sur 100. Repères valables partout : autour de 60 % la reprise est correcte, 65 % bonne, 70 % très bonne, au-delà on parle de niveau international.",
          en:"The total as a percentage. Around 60 % is correct, 65 % good, 70 % very good, beyond that international level." } },

  { ref:"remarques", lecon:4, coll:"notation",
    mots:{ fr:{m:"les remarques du juge"}, en:{m:"the comments", p:"ko-mèntss"},
           es:{m:"los comentarios"}, it:{m:"i commenti"},
           de:{m:"die Bemerkungen", p:"be-mèr-koun-gueune"}, ja:{m:"コメント", p:"komento"} },
    def:{ fr:"Écrites à la main, souvent en abrégé, et parfois plus utiles que la note elle-même. Quelques abréviations anglaises courantes : *needs more impulsion*, *croaked*, *bal.* pour balance, *tense*.",
          en:"Hand-written, often abbreviated, and often more useful than the mark itself." } },

  { ref:"note-ensemble", lecon:4, coll:"notation",
    mots:{ fr:{m:"les notes d'ensemble"}, en:{m:"the collective marks", p:"ko-lèk-tiv marks"},
           es:{m:"las notas de conjunto"}, it:{m:"le note d'insieme"},
           de:{m:"die Gesamtnoten", p:"gue-zamt-nô-teune"}, ja:{m:"総合点", p:"sōgōten"} }, // ??
    def:{ fr:"En bas du protocole : allures, impulsion, soumission, position du cavalier. Elles jugent la reprise entière, pas un mouvement — et elles pèsent lourd.",
          en:"At the foot of the sheet: paces, impulsion, submission, rider's position. They judge the whole test, and they weigh heavily." } },

  { ref:"erreur-parcours", lecon:4, coll:"notation",
    mots:{ fr:{m:"l'erreur de parcours"}, en:{m:"an error of course", p:"è-reur of korss"},
           es:{m:"un error de recorrido"}, it:{m:"un errore di percorso"},
           de:{m:"der Bahnfehler", p:"ban-fé-leur"}, ja:{m:"コース違い", p:"kōsu chigai"} }, // ??
    def:{ fr:"Se tromper de figure ou de lettre. Ce n'est pas éliminatoire tout de suite : la pénalité est forfaitaire, et c'est en général à la troisième erreur qu'on est éliminé — un détail qui évite d'abandonner pour rien.",
          en:"Going the wrong way. Not instant elimination: a fixed penalty, and usually only the third error sends you out." } },

  { ref:"cloche-juge", lecon:4, coll:"notation",
    mots:{ fr:{m:"la cloche du juge"}, en:{m:"the bell", p:"bèl", var:"the horn · the whistle"},
           es:{m:"la campana"}, it:{m:"la campana"},
           de:{m:"die Glocke", p:"glo-ke"}, ja:{m:"合図の鐘", p:"aizu no kane"} }, // ??
    def:{ fr:"Elle sonne pour te faire entrer — et elle sonne aussi pour signaler une erreur de parcours. Deux sens opposés pour un même son : la reconnaître évite la panique.",
          en:"It rings to send you in — and it also rings to flag an error of course. Two opposite meanings, one sound." } },

  { ref:"controle-embouchures", lecon:4, coll:"notation",
    mots:{ fr:{m:"le contrôle des embouchures"}, en:{m:"the tack check", p:"tak tchèk", var:"bit check"},
           es:{m:"el control de embocaduras"}, it:{m:"il controllo delle imboccature"},
           de:{m:"die Ausrüstungskontrolle", p:"aouss-rus-toungs-kon-tro-le"}, ja:{m:"馬具検査", p:"bagu kensa"} }, // ??
    def:{ fr:"À la sortie du rectangle, un commissaire vérifie mors, muserolle et éperons. Refuser, c'est l'élimination : on reste à cheval et on laisse faire.",
          en:"On leaving the arena a steward checks bit, noseband and spurs. Refusing means elimination: stay mounted and let them." } },

  { ref:"classement", lecon:4, coll:"notation",
    mots:{ fr:{m:"le classement"}, en:{m:"the placing", p:"plé-sing", var:"the results"},
           es:{m:"la clasificación"}, it:{m:"la classifica"},
           de:{m:"die Platzierung", p:"pla-tsi-roung"}, ja:{m:"順位", p:"jun'i"} },
    def:{ fr:"Affiché après le passage du dernier concurrent. En dressage, on se compare d'abord à son propre pourcentage précédent — le classement dépend de qui s'est inscrit ce jour-là.",
          en:"Posted after the last competitor. In dressage you compare yourself to your own previous percentage first." } },

  { ref:"queue-de-pie", lecon:4, coll:"notation",
    mots:{ fr:{m:"la queue-de-pie"}, en:{m:"the tailcoat", p:"téïl-kôte", var:"shadbelly (US)"},
           es:{m:"el frac"}, it:{m:"il frac"},
           de:{m:"der Frack", p:"frak"}, ja:{m:"燕尾服", p:"enbifuku"} },
    def:{ fr:"Réservée aux épreuves de haut niveau ; la veste courte partout ailleurs. ⚠️ Les Américains l'appellent **shadbelly**, littéralement « ventre d'alose » — un mot que personne ne devine.",
          en:"For upper levels only; a short jacket everywhere else. Americans call it a shadbelly, « shad belly », which nobody guesses." } },

  { ref:"kur", lecon:4, coll:"notation",
    mots:{ fr:{m:"la reprise libre en musique"}, en:{m:"the freestyle", p:"fri-staïl", var:"kür"},
           es:{m:"la Kür", var:"el ejercicio libre"}, it:{m:"il freestyle", var:"la Kür"},
           de:{m:"die Kür", p:"kur"}, ja:{m:"自由演技", p:"jiyū engi"} }, // ??
    def:{ fr:"Une reprise composée par le cavalier sur sa musique, avec des figures imposées à placer librement. ⚠️ Le mot allemand **die Kür** s'emploie tel quel dans le monde entier, y compris sur les protocoles internationaux.",
          en:"A test the rider builds to their own music, with required movements placed freely. The German word Kür is used worldwide." } }
  ],

  /* ---- phrases complètes ---- */
  phrases: [
    { ref:"quelle-reprise", lecon:1,
      fr:"Je passe quelle reprise, et à quelle heure ?",
      en:"Which test am I doing, and what time ?",
      es:"¿ Qué prueba hago y a qué hora ?",
      it:"Quale ripresa faccio e a che ora ?",
      de:"Welche Aufgabe reite ich, und um wie viel Uhr ?",
      ja:"どの 課目 を 何時 に 走行 し ます か ?" },
    { ref:"lecteur-possible", lecon:1,
      fr:"Un lecteur est autorisé sur cette épreuve ?",
      en:"Is a commander allowed in this class ?",
      es:"¿ Se permite lector en esta prueba ?",
      it:"È permesso il lettore in questa prova ?",
      de:"Ist ein Ansager in dieser Prüfung erlaubt ?",
      ja:"この 競技 で 読み上げ は 認め られ ます か ?" },
    { ref:"entree-a", lecon:1,
      fr:"J'entre à A au trot de travail, je salue à X.",
      en:"I enter at A in working trot and salute at X.",
      es:"Entro por A al trote de trabajo y saludo en X.",
      it:"Entro ad A al trotto di lavoro e saluto in X.",
      de:"Einfahrt bei A im Arbeitstrab, Gruß bei X.",
      ja:"A から 作業速歩 で 入場 し 、 X で 敬礼 し ます 。" },
    { ref:"mouvement-double", lecon:4,
      fr:"Ce mouvement est en coefficient deux ?",
      en:"Does this movement carry double marks ?",
      es:"¿ Este movimiento lleva coeficiente dos ?",
      it:"Questo movimento ha coefficiente due ?",
      de:"Hat diese Lektion einen Koeffizienten ?",
      ja:"この 課題 は 係数 二 です か ?" },
    { ref:"protocole-recuperer", lecon:4,
      fr:"Où est-ce que je récupère mon protocole ?",
      en:"Where do I pick up my test sheet ?",
      es:"¿ Dónde recojo mi hoja de puntuación ?",
      it:"Dove ritiro il foglio di giudizio ?",
      de:"Wo bekomme ich mein Protokoll ?",
      ja:"採点表 は どこ で 受け取れ ます か ?" },
    { ref:"soixante-cinq", lecon:4,
      fr:"Elle a fait 65 %, c'est son meilleur résultat.",
      en:"She scored 65 % — that's her best yet.",
      es:"Ha hecho un 65 %, es su mejor resultado.",
      it:"Ha fatto il 65 %, è il suo miglior risultato.",
      de:"Sie hat 65 % erreicht, ihr bestes Ergebnis.",
      ja:"65 パーセント で 、 自己 最高 です 。" },
    { ref:"cloche-erreur", lecon:4,
      fr:"La cloche a sonné, je me suis trompée de figure.",
      en:"The bell went — I went the wrong way.",
      es:"Ha sonado la campana, me he equivocado de figura.",
      it:"È suonata la campana, ho sbagliato figura.",
      de:"Die Glocke hat geläutet, ich hatte einen Bahnfehler.",
      ja:"鐘 が 鳴り ました 、 コース を 間違え ました 。" },
    { ref:"controle-sortie", lecon:4,
      fr:"Reste à cheval, il y a le contrôle des embouchures.",
      en:"Stay on — there's a tack check.",
      es:"Quédate montada, hay control de embocaduras.",
      it:"Resta in sella, c'è il controllo delle imboccature.",
      de:"Bleib oben, es gibt eine Ausrüstungskontrolle.",
      ja:"馬具検査 が ある ので 、 乗った まま で ください 。" }
  ]
};
