/* hype-lingo-lex-cheval.js — Hype Lingo · Chapitre 3 · « Le cheval »
   ==================================================================
   42 CONCEPTS UNIVERSELS + UN BLOC `races` PROPRE AU VOYAGE.

   ⚠️ C'EST LE SEUL CHAPITRE DONT UNE PARTIE CHANGE SELON LE PAYS.
   La réponse retenue : on ne duplique pas le chapitre par pays.
     · `concepts` — les 42 concepts (robes, marques, morphologie, âge,
       sexe, caractère). Identiques partout, écrits une seule fois.
     · `races`    — la liste des races, indexée par voyage (`voyage`).
       Pour le Portugal on ajoutera une clé "pt" avec le lusitanien,
       pour les États-Unis une clé "us" avec le quarter horse. Le noyau
       ne bouge pas d'une ligne.
   Le moteur concatène `concepts` + `races[voyageCourant]`.

   CHAMPS : voir hype-lingo-lex-ecurie.js. Pas de champ `dit` ici
   (ce ne sont pas des ordres criés).

   PAS DE DOUBLON avec le chapitre 2 · Le pansage, qui possède déjà
   poil, crinière, toupet, queue, sabot, sole, fourchette, membres,
   dos et encolure. Ce chapitre-ci prend le reste de la morphologie.

   CE QUE CE CHAPITRE ENSEIGNE EN PLUS DU VOCABULAIRE
     · l'anglais mesure en HANDS, l'Europe en centimètres au garrot.
     · « the breed », jamais « the race » — race = la course en anglais.
     · l'anglais a trois mots pour un poulain : foal, colt, filly.
     · piebald ≠ skewbald : aucune autre langue ne fait cette différence.
     · l'allemand nomme les robes par des noms, pas des adjectifs :
       der Rappe, der Fuchs, der Brauner, der Schimmel.
     · le japonais appelle le noir « poil bleu » (青毛) et la liste
       « étoile filante » (流星).

   ⚠️ RELECTURE NATIVE OBLIGATOIRE. Les entrées marquées // ?? sont
   reportées dans hype-lingo-doutes-a-verifier.md. Les robes et les
   marques sont le vocabulaire le plus normé du module (passeports,
   stud-books) : un natif tranchera en cinq minutes.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.cheval = {
  ref: "cheval",
  chapitre: 3,
  titre: { fr:"Le cheval", en:"The horse", es:"El caballo", it:"Il cavallo", de:"Das Pferd", ja:"馬" },
  lecons: 4,

  concepts: [

  /* ============ LEÇON 1 · LES ROBES ============ */

  { ref:"robe", lecon:1, coll:"robes",
    mots:{ fr:{m:"la robe"}, en:{m:"the colour", p:"ko-leur", var:"coat colour"},
           es:{m:"la capa", var:"el pelo"}, it:{m:"il mantello"},
           de:{m:"die Fellfarbe", p:"fèll-far-be"}, ja:{m:"毛色", p:"keshoku"} },
    def:{ fr:"La couleur du cheval : le premier mot d'un passeport ou d'une annonce. ⚠️ En anglais on ne demande jamais « what robe » mais « what colour is he ? ».",
          en:"The horse's colour, the first line of any passport or advert. French says « robe », a word English simply does not use here." } },

  { ref:"bai", lecon:1, coll:"robes",
    mots:{ fr:{m:"le bai"}, en:{m:"bay", p:"béï"},
           es:{m:"castaño"}, it:{m:"baio"},
           de:{m:"der Brauner", p:"brao-neur"}, ja:{m:"鹿毛", p:"kage"} },
    def:{ fr:"Corps brun-rouge, crins et bas des membres noirs. La robe la plus répandue au monde. ⚠️ L'allemand la nomme par un nom, der Brauner, là où le français emploie un adjectif.",
          en:"Red-brown body with black mane, tail and legs — the commonest colour in the world. German uses a noun for it: der Brauner." } },

  { ref:"alezan", lecon:1, coll:"robes",
    mots:{ fr:{m:"l'alezan"}, en:{m:"chestnut", p:"tchèss-neut", var:"sorrel (US)"},
           es:{m:"alazán"}, it:{m:"sauro"},
           de:{m:"der Fuchs", p:"foukss"}, ja:{m:"栗毛", p:"kurige"} },
    def:{ fr:"Robe rousse uniforme, crins de la même teinte ou plus clairs. L'allemand dit « le renard », le japonais « poil de châtaigne ». Apy, la mascotte de Hype Baby, est alezan.",
          en:"A uniform red coat with mane and tail the same shade or lighter. German calls it « the fox », Japanese « chestnut hair »." } },

  { ref:"noir", lecon:1, coll:"robes",
    mots:{ fr:{m:"le noir"}, en:{m:"black", p:"blak"},
           es:{m:"negro"}, it:{m:"morello"},
           de:{m:"der Rappe", p:"ra-pe"}, ja:{m:"青毛", p:"aoge"} },
    def:{ fr:"Noir jusqu'aux extrémités, sans reflet roux. ⚠️ Le japonais l'appelle « poil bleu » (青毛), parce qu'un vrai noir a des reflets bleutés au soleil. L'italien ne dit pas « nero » mais morello.",
          en:"Black to the tips, with no red cast. Japanese calls it « blue hair », Italian uses morello rather than nero." } },

  { ref:"gris", lecon:1, coll:"robes",
    mots:{ fr:{m:"le gris"}, en:{m:"grey", p:"gréï", var:"gray (US)"},
           es:{m:"tordo", var:"gris"}, it:{m:"grigio"},
           de:{m:"der Schimmel", p:"chi-meul"}, ja:{m:"芦毛", p:"ashige"} },
    def:{ fr:"Un gris naît foncé et blanchit avec l'âge. ⚠️ On ne dit jamais « blanc » : le cheval blanc de conte de fées est un gris âgé. L'espagnol emploie tordo, pas gris, dans le langage technique.",
          en:"A grey is born dark and whitens with age. Never call it white: the fairy-tale white horse is an old grey." } },

  { ref:"pie", lecon:1, coll:"robes",
    mots:{ fr:{m:"le pie"}, en:{m:"piebald", p:"païe-bôld", var:"skewbald · coloured (GB) · pinto (US)"},
           es:{m:"pío", var:"pinto"}, it:{m:"pezzato"},
           de:{m:"die Schecke", p:"chè-ke"}, ja:{m:"雑色", p:"zasshoku", var:"駁毛"} }, /* ja corrige (rapport 07/08) : usage elevage/courses */
    def:{ fr:"Grandes plaques blanches sur une autre robe. ⚠️ L'anglais est la seule langue à couper la robe en deux : **piebald** = noir et blanc, **skewbald** = toute autre couleur et blanc. En Grande-Bretagne, on dit souvent simplement « a coloured ».",
          en:"Large white patches over another colour. English alone splits it: piebald is black and white, skewbald any other colour with white." } },

  { ref:"isabelle", lecon:1, coll:"robes",
    mots:{ fr:{m:"l'isabelle"}, en:{m:"dun", p:"deune"},
           es:{m:"bayo"}, it:{m:"falbo"},
           de:{m:"der Falbe", p:"fal-be"}, ja:{m:"河原毛", p:"kawarage"} }, /* valide (rapport 07/08) */
    def:{ fr:"Robe sable à dorée, crins foncés, souvent une raie de mulet sur le dos. Le japonais a un mot pour elle parce que ses poneys indigènes la portent.",
          en:"A sandy to golden coat with dark mane and often a dorsal stripe. Japanese has its own word, as its native ponies carry it." } },

  { ref:"palomino", lecon:1, coll:"robes",
    mots:{ fr:{m:"le palomino"}, en:{m:"palomino", p:"pa-lo-mi-nô"},
           es:{m:"palomino"}, it:{m:"palomino"},
           de:{m:"der Palomino", p:"pa-lo-mi-no"}, ja:{m:"月毛", p:"tsukige"} },
    def:{ fr:"Robe dorée à crinière et queue blanches. Le mot est espagnol et a voyagé tel quel dans presque toutes les langues — sauf en japonais, qui dit « poil de lune ».",
          en:"A golden coat with white mane and tail. The Spanish word travelled unchanged into nearly every language — except Japanese, which says « moon hair »." } },

  { ref:"rouan", lecon:1, coll:"robes",
    mots:{ fr:{m:"le rouan"}, en:{m:"roan", p:"rôn-e"},
           es:{m:"ruano"}, it:{m:"roano"},
           de:{m:"der Rotschimmel", p:"rôte-chi-meul"}, ja:{m:"粕毛", p:"kasuge"} },
    def:{ fr:"Des poils blancs mêlés à la robe de base, dès la naissance et sans jamais s'étendre. C'est ce qui le distingue du gris, qui blanchit toute sa vie.",
          en:"White hairs mixed through the base colour from birth, and never spreading — which is what separates a roan from a grey." } },

  { ref:"blanc", lecon:1, coll:"robes",
    mots:{ fr:{m:"le blanc"}, en:{m:"white", p:"ouaïte", var:"cremello"},
           es:{m:"blanco"}, it:{m:"bianco"},
           de:{m:"der Weißgeborene", p:"vaïss-gue-bo-re-ne", var:"der Schimmel = le gris courant"}, ja:{m:"白毛", p:"shiroge"} }, /* rapport 07/08 : Weißgeborenes = ne blanc (rarissime), Schimmel = usage courant ; ja lu shiroge */
    def:{ fr:"⚠️ Le piège classique. Un cheval « blanc » est presque toujours un gris blanchi. Le blanc véritable naît blanc et reste rarissime — l'allemand a un mot exprès pour lui : der Weißgeborene, « le né-blanc ».",
          en:"The classic trap: a « white » horse is nearly always a whitened grey. True white horses are born white and are very rare." } },

  /* ============ LEÇON 2 · LES MARQUES ET L'IDENTITÉ ============ */

  { ref:"liste", lecon:2, coll:"marques",
    mots:{ fr:{m:"la liste"}, en:{m:"the blaze", p:"bléïze", var:"stripe = fine"},
           es:{m:"la lista"}, it:{m:"la lista"}, /* es corrige (rapport 07/08) : el cordón retire */
           de:{m:"die Blesse", p:"blè-se"}, ja:{m:"流星", p:"ryūsei"} },
    def:{ fr:"La bande blanche qui descend du front vers le nez. Apy en a une très large, continue jusqu'au museau. Le japonais l'appelle « étoile filante » (流星).",
          en:"The white band running down the face. A narrow one is a stripe, a broad one a blaze. Japanese calls it « shooting star »." } },

  { ref:"etoile", lecon:2, coll:"marques",
    mots:{ fr:{m:"l'étoile"}, en:{m:"the star", p:"star"},
           es:{m:"el lucero"}, it:{m:"la stella"},
           de:{m:"der Stern", p:"chtèrn"}, ja:{m:"星", p:"hoshi"} },
    def:{ fr:"La petite marque blanche du front, isolée. Toutes les langues ont choisi la même image, ce qui en fait le mot le plus facile du chapitre.",
          en:"The isolated white mark on the forehead. Every language reached for the same image, which makes it the easiest word here." } },

  { ref:"balzane", lecon:2, coll:"marques",
    mots:{ fr:{m:"la balzane"}, en:{m:"the sock", p:"soque", var:"stocking = haute"},
           es:{m:"el calzado"}, it:{m:"il balzano"},
           de:{m:"das Beinabzeichen", p:"baïn-ap-tsaï-cheune", var:"weiße Fessel"}, ja:{m:"白斑", p:"hakuhan"} }, // ??
    def:{ fr:"Le blanc sur un membre. ⚠️ Chaque langue compte différemment : l'anglais oppose sock (basse) et stocking (haute), l'allemand nomme la hauteur exacte atteinte (Krone, Fessel, Röhre), et le japonais compte les membres (一白 = un membre blanc).",
          en:"White on a leg. English contrasts sock and stocking, German names the exact height reached, and Japanese counts the legs." } },

  { ref:"epi", lecon:2, coll:"marques",
    mots:{ fr:{m:"l'épi"}, en:{m:"the whorl", p:"ouorl"},
           es:{m:"el remolino"}, it:{m:"il vortice"}, // ??
           de:{m:"der Wirbel", p:"vir-beul"}, ja:{m:"旋毛", p:"tsumuji"} },
    def:{ fr:"Le tourbillon de poils, le plus souvent au milieu du front. Unique à chaque cheval : il figure sur le signalement du passeport, comme une empreinte digitale.",
          en:"The swirl of hair, usually in the middle of the forehead. Unique to each horse, it is drawn on the passport like a fingerprint." } },

  { ref:"puce", lecon:2, coll:"marques",
    mots:{ fr:{m:"la puce électronique"}, en:{m:"the microchip", p:"maï-krô-tchip"},
           es:{m:"el microchip"}, it:{m:"il microchip"},
           de:{m:"der Transponder", p:"trans-ponn-deur", var:"der Mikrochip"}, ja:{m:"マイクロチップ", p:"maikurochippu"} },
    def:{ fr:"Obligatoire en Europe, posée dans l'encolure gauche. C'est elle qui relie physiquement le cheval à son passeport.",
          en:"Compulsory across Europe, implanted in the left side of the neck. It is what physically links a horse to its passport." } },

  { ref:"passeport", lecon:2, coll:"marques",
    mots:{ fr:{m:"le passeport"}, en:{m:"the passport", p:"pass-port"},
           es:{m:"el pasaporte"}, it:{m:"il passaporto"},
           de:{m:"der Pferdepass", p:"pfèr-de-pass"}, ja:{m:"馬パスポート", p:"uma pasupōto"} }, // ??
    def:{ fr:"Le document qui suit le cheval partout : signalement dessiné, épis, balzanes, vaccins, numéro de puce. Contrôlé à l'entrée de tout concours et de tout transport.",
          en:"The document that follows the horse everywhere: drawn markings, whorls, socks, vaccinations, chip number. Checked at every show and every border." } },

  { ref:"taille", lecon:2, coll:"marques",
    mots:{ fr:{m:"la taille au garrot"}, en:{m:"the height", p:"haïte", var:"hands · hh"},
           es:{m:"la alzada", var:"la altura"}, it:{m:"l'altezza"},
           de:{m:"das Stockmaß", p:"chtok-mass"}, ja:{m:"体高", p:"taikō"} },
    def:{ fr:"⚠️ Le piège de voyage numéro un. La Grande-Bretagne et l'Irlande mesurent en **hands** : une hand vaut 10,16 cm, et « he's 16.2 » veut dire 16 hands et 2 pouces, soit 1,68 m. Le reste de l'Europe mesure en centimètres au garrot.",
          en:"Britain and Ireland measure in hands: one hand is 10.16 cm, and « he's 16.2 » means 16 hands 2 inches, or 1.68 m. The rest of Europe uses centimetres at the withers." } },

  { ref:"poney", lecon:2, coll:"marques",
    mots:{ fr:{m:"le poney"}, en:{m:"the pony", p:"pô-ni"},
           es:{m:"el poni", var:"el poney"}, it:{m:"il pony"},
           de:{m:"das Pony", p:"pô-ni"}, ja:{m:"ポニー", p:"ponī"} },
    def:{ fr:"Sous 1,48 m au garrot (1,49 m ferré), c'est un poney ; au-dessus, un cheval. Un Connemara tombe souvent pile sur la limite, ce qui décide de sa catégorie en concours.",
          en:"Under 1.48 m at the withers it is a pony, above it a horse. A Connemara often lands exactly on the line, which decides its competition class." } },

  { ref:"fer", lecon:2, coll:"marques",
    mots:{ fr:{m:"le fer"}, en:{m:"the horseshoe", p:"hors-chou"},
           es:{m:"la herradura"}, it:{m:"il ferro"},
           de:{m:"das Hufeisen", p:"houf-aï-zeune"}, ja:{m:"蹄鉄", p:"teitetsu"} },
    def:{ fr:"Cloué dans la paroi du sabot, qui n'est pas sensible. Un cheval peut aussi vivre pieds nus : on dit alors qu'il est déferré.",
          en:"Nailed into the hoof wall, which has no feeling. A horse may also go barefoot, without shoes at all." } },

  { ref:"marechal", lecon:2, coll:"marques",
    mots:{ fr:{m:"le maréchal-ferrant"}, en:{m:"the farrier", p:"fa-ri-eur"},
           es:{m:"el herrador"}, it:{m:"il maniscalco"},
           de:{m:"der Hufschmied", p:"houf-chmite"}, ja:{m:"装蹄師", p:"sōteishi"} },
    def:{ fr:"Il passe toutes les six à huit semaines. ⚠️ Ne pas dire « blacksmith » : le blacksmith travaille le fer, le farrier travaille le pied. Le mot anglais n'a aucune parenté avec le français.",
          en:"He comes every six to eight weeks. Do not say blacksmith: a blacksmith works iron, a farrier works feet." } },

  /* ============ LEÇON 3 · LE CORPS ============ */

  { ref:"tete", lecon:3, coll:"morpho",
    mots:{ fr:{m:"la tête"}, en:{m:"the head", p:"hèd"},
           es:{m:"la cabeza"}, it:{m:"la testa"},
           de:{m:"der Kopf", p:"kopf"}, ja:{m:"頭", p:"atama"} },
    def:{ fr:"On l'approche par l'épaule, jamais de face : le cheval voit mal juste devant son nez.",
          en:"Always approached from the shoulder, never head-on: a horse sees poorly straight in front of its nose." } },

  { ref:"garrot", lecon:3, coll:"morpho",
    mots:{ fr:{m:"le garrot"}, en:{m:"the withers", p:"oui-zeurz"},
           es:{m:"la cruz"}, it:{m:"il garrese"},
           de:{m:"der Widerrist", p:"vi-deur-rist"}, ja:{m:"鬐甲", p:"kikō"} },
    def:{ fr:"Le sommet de l'épaule, point fixe du corps : c'est là qu'on mesure le cheval et là que se pose l'avant de la selle. L'espagnol l'appelle « la croix ».",
          en:"The high point of the shoulder, the body's fixed point: where a horse is measured and where the front of the saddle sits. Spanish calls it « the cross »." } },

  { ref:"epaule", lecon:3, coll:"morpho",
    mots:{ fr:{m:"l'épaule"}, en:{m:"the shoulder", p:"chol-deur"},
           es:{m:"la espalda", var:"el hombro"}, it:{m:"la spalla"},
           de:{m:"die Schulter", p:"choul-teur"}, ja:{m:"肩", p:"kata"} },
    def:{ fr:"Son inclinaison décide de l'amplitude des allures. Une épaule droite donne un cheval qui trotte court.",
          en:"Its slope decides the length of the stride. An upright shoulder makes for a short-striding horse." } },

  { ref:"croupe", lecon:3, coll:"morpho",
    mots:{ fr:{m:"la croupe"}, en:{m:"the quarters", p:"kouor-teurz", var:"the croup · hindquarters"},
           es:{m:"la grupa"}, it:{m:"la groppa"},
           de:{m:"die Kruppe", p:"krou-pe"}, ja:{m:"尻", p:"shiri"} },
    def:{ fr:"Le moteur du cheval. On ne passe jamais derrière sans avoir parlé : c'est l'angle mort et la zone du coup de pied.",
          en:"The horse's engine. Never walk behind it without speaking first: it is the blind spot and the kicking zone." } },

  { ref:"jarret", lecon:3, coll:"morpho",
    mots:{ fr:{m:"le jarret"}, en:{m:"the hock", p:"hok"},
           es:{m:"el corvejón"}, it:{m:"il garretto"},
           de:{m:"das Sprunggelenk", p:"chproung-gue-lènk"}, ja:{m:"飛節", p:"hisetsu"} },
    def:{ fr:"La grande articulation coudée du postérieur, celle qui pousse. Chaque langue lui a donné un mot court et propre : hock, Sprunggelenk, corvejón, garretto, 飛節.",
          en:"The big angled joint of the hind leg, the one that pushes. Every language gave it its own short word." } },

  { ref:"boulet", lecon:3, coll:"morpho",
    mots:{ fr:{m:"le boulet"}, en:{m:"the fetlock", p:"fètt-lok"},
           es:{m:"el menudillo"}, it:{m:"il nodello"},
           de:{m:"das Fesselgelenk", p:"fè-seul-gue-lènk"}, ja:{m:"球節", p:"kyūsetsu"} },
    def:{ fr:"L'articulation en boule au-dessus du paturon. C'est là qu'on pose les guêtres et qu'on cherche une chaleur suspecte.",
          en:"The ball joint above the pastern. Where boots go on, and where you feel for suspicious heat." } },

  { ref:"paturon", lecon:3, coll:"morpho",
    mots:{ fr:{m:"le paturon"}, en:{m:"the pastern", p:"pass-teurn"},
           es:{m:"la cuartilla"}, it:{m:"il pastorale"},
           de:{m:"die Fessel", p:"fè-seul"}, ja:{m:"繋", p:"tsunagi"} },
    def:{ fr:"Entre le boulet et le sabot. Long et souple, il amortit ; court et droit, il tape. ⚠️ Attention en allemand : Fessel désigne le paturon, et Fesselgelenk le boulet.",
          en:"Between fetlock and hoof. Long and sloping it absorbs shock; short and upright it jars. In German, Fessel is the pastern and Fesselgelenk the joint above it." } },

  { ref:"ventre", lecon:3, coll:"morpho",
    mots:{ fr:{m:"le ventre"}, en:{m:"the belly", p:"bè-li"},
           es:{m:"el vientre", var:"la barriga"}, it:{m:"la pancia"},
           de:{m:"der Bauch", p:"baourh"}, ja:{m:"腹", p:"hara"} },
    def:{ fr:"À vérifier au pansage : c'est là que se cachent les tiques et que la sangle blesse.",
          en:"Always checked when grooming: where ticks hide and where the girth rubs." } },

  { ref:"naseaux", lecon:3, coll:"morpho",
    mots:{ fr:{m:"les naseaux"}, en:{m:"the nostrils", p:"noss-treulz"},
           es:{m:"los ollares"}, it:{m:"le narici"},
           de:{m:"die Nüstern", p:"nu-steurn"}, ja:{m:"鼻孔", p:"bikō"} },
    def:{ fr:"Le cheval ne respire que par le nez, jamais par la bouche. Des naseaux très dilatés après l'effort sont normaux ; au repos, ils inquiètent.",
          en:"A horse breathes only through its nose, never its mouth. Wide nostrils after work are normal; at rest they are a worry." } },

  { ref:"oreilles", lecon:3, coll:"morpho",
    mots:{ fr:{m:"les oreilles"}, en:{m:"the ears", p:"ieurz"},
           es:{m:"las orejas"}, it:{m:"le orecchie"},
           de:{m:"die Ohren", p:"ô-reune"}, ja:{m:"耳", p:"mimi"} },
    def:{ fr:"Le premier indicateur d'humeur, et le plus universel : couchées en arrière, on s'écarte, dans toutes les langues et tous les pays.",
          en:"The first and most universal sign of mood: flat back, you step away — in every language and every country." } },

  /* ============ LEÇON 4 · ÂGE, SEXE, CARACTÈRE ============ */

  { ref:"hongre", lecon:4, coll:"identite",
    mots:{ fr:{m:"le hongre"}, en:{m:"the gelding", p:"guel-ding"},
           es:{m:"el caballo castrado"}, it:{m:"il castrone"},
           de:{m:"der Wallach", p:"va-larh"}, ja:{m:"せん馬", p:"senba"} },
    def:{ fr:"Le mâle castré, monture la plus courante en club pour son égalité de caractère. Le mot français vient de la Hongrie, où la pratique était courante.",
          en:"The castrated male, the commonest riding-school mount for its even temper." } },

  { ref:"etalon", lecon:4, coll:"identite",
    mots:{ fr:{m:"l'étalon"}, en:{m:"the stallion", p:"sta-li-eune"},
           es:{m:"el semental"}, it:{m:"lo stallone"},
           de:{m:"der Hengst", p:"hèn-gst"}, ja:{m:"牡馬", p:"ouma", var:"種牡馬 = étalon reproducteur"} },
    def:{ fr:"Le mâle entier. Jamais confié à un débutant, et souvent séparé du reste de l'écurie. Le japonais distingue le mâle (牡馬) de l'étalon d'élevage (種牡馬).",
          en:"The entire male, never given to a beginner and often stabled apart. Japanese separates « male horse » from « breeding stallion »." } },

  { ref:"jument", lecon:4, coll:"identite",
    mots:{ fr:{m:"la jument"}, en:{m:"the mare", p:"mèr"},
           es:{m:"la yegua"}, it:{m:"la cavalla", var:"la giumenta"},
           de:{m:"die Stute", p:"chtou-te"}, ja:{m:"牝馬", p:"hinba"} },
    def:{ fr:"La femelle. Aucune langue ne se contente de dire « cheval femelle » : chacune a son mot, et c'est l'un des premiers à connaître à l'étranger.",
          en:"The female. No language settles for « female horse »: each has its own word, and it is one of the first to learn abroad." } },

  { ref:"poulain", lecon:4, coll:"identite",
    mots:{ fr:{m:"le poulain"}, en:{m:"the foal", p:"fôle", var:"colt = mâle · filly = femelle"},
           es:{m:"el potro"}, it:{m:"il puledro"},
           de:{m:"das Fohlen", p:"fô-leune"}, ja:{m:"子馬", p:"kouma"} },
    def:{ fr:"⚠️ L'anglais a trois mots là où le français en a un : **foal** (le poulain de l'année, des deux sexes), **colt** (jeune mâle), **filly** (jeune femelle). Sur les hippodromes britanniques, on n'entend que colt et filly.",
          en:"English has three words where French has one: foal for the youngster of either sex, colt for a young male, filly for a young female." } },

  { ref:"age", lecon:4, coll:"identite",
    mots:{ fr:{m:"l'âge"}, en:{m:"the age", p:"éïdj"},
           es:{m:"la edad"}, it:{m:"l'età"},
           de:{m:"das Alter", p:"al-teur"}, ja:{m:"馬齢", p:"barei", var:"年齢"} },
    def:{ fr:"Curiosité mondiale : dans les papiers, tous les chevaux prennent un an le 1er janvier, quelle que soit leur date de naissance réelle. Un poulain né en mai a « un an » en janvier suivant.",
          en:"A worldwide oddity: on paper every horse gains a year on 1 January, whatever its real birthday." } },

  { ref:"caractere", lecon:4, coll:"identite",
    mots:{ fr:{m:"le caractère"}, en:{m:"the temperament", p:"tèm-pra-meune"},
           es:{m:"el carácter"}, it:{m:"il carattere"},
           de:{m:"das Temperament", p:"tèm-pé-ra-mènt"}, ja:{m:"気性", p:"kishō"} },
    def:{ fr:"Ce qu'on demande avant de monter un cheval inconnu. La question qui marche partout : « comment est-il ? » plutôt que « est-il gentil ? ».",
          en:"What you ask before riding an unknown horse. The question that works everywhere is « what's he like ? », not « is he nice ? »." } },

  { ref:"calme", lecon:4, coll:"identite",
    mots:{ fr:{m:"calme"}, en:{m:"quiet", p:"kouaï-eutte", var:"steady · a schoolmaster"},
           es:{m:"tranquilo"}, it:{m:"tranquillo"},
           de:{m:"brav", p:"braf"}, ja:{m:"おとなしい", p:"otonashii"} },
    def:{ fr:"Le mot qu'on espère entendre pour un cheval de location. ⚠️ En Grande-Bretagne, « he's a real schoolmaster » est le plus grand compliment possible pour un cheval d'école : il enseigne au cavalier.",
          en:"The word you hope to hear about a hire horse. In Britain, « a real schoolmaster » is the highest praise for a school horse: it teaches the rider." } },

  { ref:"chaud", lecon:4, coll:"identite",
    mots:{ fr:{m:"chaud"}, en:{m:"hot", p:"hott", var:"sharp · fizzy"},
           es:{m:"nervioso", var:"caliente"}, it:{m:"caldo", var:"nervoso"},
           de:{m:"heiß", p:"haïss", var:"nervös"}, ja:{m:"気性難", p:"kishōnan", var:"神経質 = nerveux"} },
    def:{ fr:"Un cheval chaud n'est pas méchant : il réagit vite et fort. L'anglais a les images les plus parlantes — **sharp** (vif comme une lame), **fizzy** (pétillant).",
          en:"A hot horse is not a mean one: it reacts fast and strongly. English has the liveliest images: sharp, fizzy." } },

  { ref:"cheval-ecole", lecon:4, coll:"identite",
    mots:{ fr:{m:"le cheval d'école"}, en:{m:"the school horse", p:"skoul horss", var:"riding school horse"},
           es:{m:"el caballo de escuela", var:"el caballo de picadero"}, it:{m:"il cavallo da scuola"},
           de:{m:"das Schulpferd", p:"choul-pfèrt"}, ja:{m:"練習馬", p:"renshūba"} }, // ??
    def:{ fr:"Celui qu'on te confiera à l'étranger. Le demander par son nom exact, dans la langue du pays, change complètement l'accueil.",
          en:"The horse you will be given abroad. Asking for it by its proper local name changes the welcome entirely." } },

  { ref:"race", lecon:4, coll:"identite",
    mots:{ fr:{m:"la race"}, en:{m:"the breed", p:"bride"},
           es:{m:"la raza"}, it:{m:"la razza"},
           de:{m:"die Rasse", p:"ra-se"}, ja:{m:"品種", p:"hinshu", var:"馬種"} }, // ??
    def:{ fr:"⚠️ Faux ami redoutable : en anglais c'est **the breed**, jamais « the race » — race veut dire la course. « What race is he ? » fera comprendre « dans quelle course court-il ? ».",
          en:"A nasty false friend: it is the breed, never the race. « What race is he ? » will be heard as « which race does he run in ? »." } },

  { ref:"demi-sang", lecon:4, coll:"identite",
    mots:{ fr:{m:"le sang chaud", var:"le demi-sang"}, en:{m:"the warmblood", p:"ouorm-bleude"},
           es:{m:"el caballo de sangre caliente"}, it:{m:"il cavallo a sangue caldo"},
           de:{m:"das Warmblut", p:"varm-bloute"}, ja:{m:"温血種", p:"onketsushu"} },
    def:{ fr:"Les chevaux de sport européens, entre le pur-sang et le trait. L'allemand possède la série complète et parfaitement logique : Vollblut (pur-sang), Warmblut (sang chaud), Kaltblut (trait).",
          en:"The European sport horses, between the thoroughbred and the draught horse. German has the whole tidy series: Vollblut, Warmblut, Kaltblut." } },

  { ref:"trait", lecon:4, coll:"identite",
    mots:{ fr:{m:"le cheval de trait"}, en:{m:"the draught horse", p:"draft horss", var:"draft horse (US)"},
           es:{m:"el caballo de tiro"}, it:{m:"il cavallo da tiro"},
           de:{m:"das Kaltblut", p:"kalt-bloute"}, ja:{m:"重種", p:"jūshu"} }, // ??
    def:{ fr:"Les grands chevaux de force. ⚠️ Le mot anglais s'écrit draught en Grande-Bretagne et draft aux États-Unis, mais se prononce « draft » des deux côtés.",
          en:"The big strong horses. The word is spelt draught in Britain and draft in America, but pronounced « draft » on both sides." } }
  ],

  /* ==================================================================
     BLOC PROPRE AU VOYAGE — à ne pas confondre avec les 42 concepts.
     Le moteur ne charge que la clé du voyage en cours.
     Ajouter une clé par pays : "pt" (lusitanien), "us" (quarter horse)…
     ================================================================== */
  races: {
    "gb-irl": [

      { ref:"pur-sang", coll:"races", pays:"gb-irl",
        mots:{ fr:{m:"le pur-sang anglais"}, en:{m:"the Thoroughbred", p:"seu-rô-brède"},
               es:{m:"el pura sangre inglés"}, it:{m:"il purosangue inglese"},
               de:{m:"das Englische Vollblut", p:"vol-bloute"}, ja:{m:"サラブレッド", p:"sarabureddo"} },
        def:{ fr:"Né en Angleterre au XVIIIᵉ siècle de trois étalons orientaux. Le cheval de course par excellence — c'est lui qu'on voit s'entraîner à Newmarket et à Lambourn. ⚠️ Toujours avec une majuscule en anglais.",
              en:"Created in England in the 18th century from three eastern stallions. The racehorse above all others, and the one training at Newmarket and Lambourn." } },

      { ref:"connemara", coll:"races", pays:"gb-irl",
        mots:{ fr:{m:"le Connemara"}, en:{m:"the Connemara pony", p:"ko-ne-ma-ra pô-ni"},
               es:{m:"el poni Connemara"}, it:{m:"il pony Connemara"},
               de:{m:"das Connemara-Pony", p:"ko-ne-ma-ra pô-ni"}, ja:{m:"コネマラポニー", p:"konemara ponī"} },
        def:{ fr:"Le poney irlandais du comté de Galway, gris le plus souvent, sûr et sauteur. Souvent pile à la limite des 1,48 m, ce qui en fait autant un poney de club qu'un cheval de concours.",
              en:"Ireland's pony from County Galway, usually grey, sure-footed and a natural jumper — often right on the 1.48 m line." } },

      { ref:"welsh-cob", coll:"races", pays:"gb-irl",
        mots:{ fr:{m:"le Welsh cob"}, en:{m:"the Welsh cob", p:"ouèlch kob", var:"Section D"},
               es:{m:"el cob galés"}, it:{m:"il cob gallese"},
               de:{m:"der Welsh Cob", p:"ouèlch kob"}, ja:{m:"ウェルシュコブ", p:"werushu kobu"} },
        def:{ fr:"Le plus grand des quatre types gallois (section D), trapu, énergique, au trot très relevé. Le poney gallois se décline en sections A, B, C et D, de la plus petite à la plus grande.",
              en:"The largest of the four Welsh types (Section D), stocky and energetic with a high knee action. Welsh ponies run from Section A to D, smallest to largest." } },

      { ref:"irish-draught", coll:"races", pays:"gb-irl",
        mots:{ fr:{m:"l'Irish Draught"}, en:{m:"the Irish Draught", p:"aï-riche draft"},
               es:{m:"el caballo de tiro irlandés"}, it:{m:"il cavallo da tiro irlandese"},
               de:{m:"das Irish Draught", p:"aï-riche draft"}, ja:{m:"アイリッシュドラフト", p:"airisshu dorafuto"} },
        def:{ fr:"Le cheval de ferme irlandais, puissant mais pas lourd, à l'origine de tous les bons chevaux de concours du pays. ⚠️ Draught ne veut pas dire « trait » au sens du Percheron : il monte très bien.",
              en:"Ireland's farm horse, powerful without being heavy, and the foundation of the country's competition horses." } },

      { ref:"irish-sport-horse", coll:"races", pays:"gb-irl",
        mots:{ fr:{m:"l'Irish Sport Horse"}, en:{m:"the Irish Sport Horse", p:"aï-riche sport horss", var:"ISH"},
               es:{m:"el caballo de deporte irlandés"}, it:{m:"il cavallo sportivo irlandese"},
               de:{m:"das Irish Sport Horse", p:"aï-riche sport horss"}, ja:{m:"アイリッシュスポーツホース", p:"airisshu supōtsu hōsu"} },
        def:{ fr:"Le croisement Irish Draught × pur-sang : le meilleur cheval de concours complet du monde depuis des décennies. C'est le produit phare des haras de Kildare.",
              en:"Irish Draught crossed with Thoroughbred: for decades the world's best eventing horse, and the flagship product of the Kildare studs." } },

      { ref:"cob-irlandais", coll:"races", pays:"gb-irl",
        mots:{ fr:{m:"le cob irlandais"}, en:{m:"the Irish cob", p:"aï-riche kob", var:"gypsy cob · Traveller horse"},
               es:{m:"el cob irlandés"}, it:{m:"il cob irlandese"},
               de:{m:"der Tinker", p:"tin-keur"}, ja:{m:"アイリッシュコブ", p:"airisshu kobu"} },
        def:{ fr:"Le cheval pie à longs fanons des gens du voyage irlandais. ⚠️ Cas de faux ami à l'envers : les pays germanophones l'appellent **Tinker**, un mot que les Irlandais eux-mêmes considèrent comme insultant. Dire Irish cob.",
              en:"The feathered piebald horse of the Irish Travellers. German-speaking countries call it Tinker, a word the Irish themselves find offensive — say Irish cob." } },

      { ref:"shetland", coll:"races", pays:"gb-irl",
        mots:{ fr:{m:"le Shetland"}, en:{m:"the Shetland pony", p:"chètt-leunde pô-ni"},
               es:{m:"el poni Shetland"}, it:{m:"il pony Shetland"},
               de:{m:"das Shetlandpony", p:"chètt-lant-pô-ni"}, ja:{m:"シェットランドポニー", p:"shettorando ponī"} },
        def:{ fr:"Le plus petit et le plus fort au monde en proportion, né des îles au nord de l'Écosse. Le premier poney de beaucoup d'enfants britanniques, et une force de caractère à la mesure de sa taille.",
              en:"The world's smallest and, pound for pound, strongest pony, from the islands north of Scotland — and a character to match." } },

      { ref:"shire", coll:"races", pays:"gb-irl",
        mots:{ fr:{m:"le Shire"}, en:{m:"the Shire horse", p:"chaï-eur horss"},
               es:{m:"el caballo Shire"}, it:{m:"il cavallo Shire"},
               de:{m:"das Shire Horse", p:"chaï-eur horss"}, ja:{m:"シャイヤー", p:"shaiyā"} },
        def:{ fr:"Le géant anglais, jusqu'à 1,90 m au garrot et une tonne : la plus grande race de chevaux du monde. Autrefois attelé aux brasseries, aujourd'hui sauvé par les passionnés.",
              en:"The English giant, up to 1.90 m and a tonne in weight: the largest horse breed in the world, once the brewers' horse." } }
    ]
  },

  /* ---- phrases complètes ---- */
  phrases: [
    { ref:"quelle-robe", lecon:1,
      fr:"C'est quoi, sa robe ?",
      en:"What colour is he ?",
      es:"¿ De qué capa es ?",
      it:"Di che mantello è ?",
      de:"Welche Fellfarbe hat er ?",
      ja:"毛色 は 何 です か ?" },
    { ref:"jument-grise", lecon:1,
      fr:"C'est une jument grise avec une grande liste.",
      en:"She's a grey mare with a big blaze.",
      es:"Es una yegua torda con una gran lista.",
      it:"È una cavalla grigia con una grande lista.",
      de:"Sie ist eine Schimmelstute mit einer breiten Blesse.",
      ja:"大きな 流星 の ある 芦毛 の 牝馬 です 。" },
    { ref:"combien-mesure", lecon:2,
      fr:"Combien mesure-t-il au garrot ?",
      en:"How many hands is he ?",
      es:"¿ Cuánta alzada tiene ?",
      it:"Quanto è alto al garrese ?",
      de:"Welches Stockmaß hat er ?",
      ja:"体高 は どれ くらい です か ?" },
    { ref:"quel-age", lecon:4,
      fr:"Quel âge a-t-il ?",
      en:"How old is he ?",
      es:"¿ Cuántos años tiene ?",
      it:"Quanti anni ha ?",
      de:"Wie alt ist er ?",
      ja:"何歳 です か ?" },
    { ref:"comment-est-il", lecon:4,
      fr:"Il est calme ? C'est ma première fois ici.",
      en:"Is he quiet ? It's my first time here.",
      es:"¿ Es tranquilo ? Es mi primera vez aquí.",
      it:"È tranquillo ? È la mia prima volta qui.",
      de:"Ist er brav ? Ich bin zum ersten Mal hier.",
      ja:"おとなしい 馬 です か ? ここ は 初めて です 。" },
    { ref:"chaud-debutant", lecon:4,
      fr:"Il est un peu chaud, je préfère un cheval d'école.",
      en:"He's a bit sharp — I'd rather have a school horse.",
      es:"Es un poco nervioso, prefiero un caballo de escuela.",
      it:"È un po' caldo, preferisco un cavallo da scuola.",
      de:"Er ist etwas heiß, ich nehme lieber ein Schulpferd.",
      ja:"少し 気性難 な ので 、 練習馬 の 方 が いい です 。" },
    { ref:"quelle-race", lecon:4,
      fr:"C'est quelle race ?",
      en:"What breed is he ?",
      es:"¿ De qué raza es ?",
      it:"Di che razza è ?",
      de:"Welche Rasse ist er ?",
      ja:"品種 は 何 です か ?" },
    { ref:"pied-chaud", lecon:3,
      fr:"Son boulet est chaud, il faudrait appeler le maréchal.",
      en:"His fetlock feels warm — we should call the farrier.",
      es:"Tiene el menudillo caliente, habría que llamar al herrador.",
      it:"Ha il nodello caldo, bisognerebbe chiamare il maniscalco.",
      de:"Sein Fesselgelenk ist warm, wir sollten den Hufschmied rufen.",
      ja:"球節 が 熱い です 、 装蹄師 を 呼んだ 方 が いい です 。" }
  ]
};
