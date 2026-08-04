/* hype-lingo-lex-urgences.js — Hype Lingo · Chapitre « Les urgences »
   ==================================================================
   42 CONCEPTS, QUATRE LEÇONS. GRATUIT DANS TOUS LES PAYS.

   CHAPITRE 9 du voyage — ville de Kildare. Numéro confirmé le 4 août
   sur le tableau ETAPES de lingo.html (j'avais mis 10 par défaut).

   CE CHAPITRE EST LE PLUS IMPORTANT DU MODULE, ET LE MOINS AMBITIEUX.
   On ne le lit pas pour apprendre : on le lit en panique, sur un
   téléphone, avec les mains qui tremblent. Conséquences d'écriture :
     · vocabulaire volontairement réduit et concret, aucun terme rare ;
     · les définitions donnent la CONDUITE À TENIR, pas de l'étymologie ;
     · les phrases sont faites pour être MONTRÉES sur un écran à
       quelqu'un qui ne parle pas ta langue.

   ⚠️ DEUXIÈME CHAPITRE À UTILISER LE CHAMP `dit`.
   Décision prise ici : `dit` n'était réservé qu'au chapitre « Le cours »,
   il s'applique désormais aussi aux urgences, pour la même raison — ce
   sont des choses qu'on CRIE ou qu'on DIT, pas des mots qu'on récite.
   Les deux seuls chapitres concernés. Documenté dans la passation.

   PAS DE DOUBLON avec les chapitres déjà écrits : le fer et le
   maréchal-ferrant sont dans Le cheval (3), la bombe et le gilet dans
   Le matériel (4), la sueur dans Le pansage (2), les allures dans
   Le cours (5). `calme` existe dans Le cheval comme qualité d'un
   cheval : ici c'est `rester-calme`, un ordre. Vérifié par script.

   ⚠️ RELECTURE NATIVE OBLIGATOIRE, ET PLUS SÉRIEUSEMENT QU'AILLEURS.
   Un mot de matériel approximatif fait sourire. Un numéro d'urgence ou
   un ordre médical approximatif est dangereux. Les numéros d'appel en
   particulier doivent être vérifiés pays par pays avant publication.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.urgences = {
  ref: "urgences",
  chapitre: 9, // Kildare, étape 9 du voyage — confirmé sur ETAPES dans lingo.html
  gratuit: true, // gratuit dans tous les pays, décision produit
  titre: { fr:"Les urgences", en:"Emergencies", es:"Urgencias", it:"Emergenze", de:"Notfälle", ja:"緊急時" },
  lecons: 4,

  concepts: [

  /* ============ LEÇON 1 · APPELER À L'AIDE ============ */

  { ref:"urgence", lecon:1, coll:"alerte",
    mots:{ fr:{m:"l'urgence", dit:"C'est une urgence !"},
           en:{m:"the emergency", p:"i-meur-djeun-si", dit:"It's an emergency !"},
           es:{m:"la urgencia", dit:"¡ Es una urgencia !"},
           it:{m:"l'emergenza", dit:"È un'emergenza !"},
           de:{m:"der Notfall", p:"nôte-fal", dit:"Es ist ein Notfall !"},
           ja:{m:"緊急", p:"kinkyū", dit:"緊急です !"} },
    def:{ fr:"Le premier mot à dire au téléphone, avant toute explication : il change la priorité de l'appel dans tous les pays.",
          en:"The first word to say on the phone, before any explanation: it changes the priority of the call everywhere." } },

  { ref:"secours", lecon:1, coll:"alerte",
    mots:{ fr:{m:"les secours", dit:"Appelez les secours !"},
           en:{m:"the emergency services", p:"seur-vi-siz", dit:"Call an ambulance !"},
           es:{m:"los servicios de emergencia", dit:"¡ Llamad a emergencias !"},
           it:{m:"i soccorsi", dit:"Chiamate i soccorsi !"},
           de:{m:"der Rettungsdienst", p:"rè-toungss-dinst", dit:"Ruft den Rettungsdienst !"},
           ja:{m:"救急", p:"kyūkyū", dit:"救急を呼んでください !"} },
    def:{ fr:"Les services d'urgence humains. Pour le cheval, c'est le vétérinaire qu'on appelle, jamais les secours.",
          en:"The human emergency services. For the horse it is the vet you call, never the ambulance." } },

  { ref:"numero-urgence", lecon:1, coll:"alerte",
    mots:{ fr:{m:"le numéro d'urgence", dit:"Quel est le numéro d'urgence ?"},
           en:{m:"the emergency number", p:"neum-beur", dit:"What's the emergency number ?", var:"112 · 999 (GB/IRL)"},
           es:{m:"el número de emergencia", dit:"¿ Cuál es el número de emergencia ?"},
           it:{m:"il numero di emergenza", dit:"Qual è il numero di emergenza ?"},
           de:{m:"die Notrufnummer", p:"nôte-rouf-nou-meur", dit:"Wie lautet die Notrufnummer ?"},
           ja:{m:"緊急番号", p:"kinkyū bangō", dit:"緊急番号は何番ですか ?"} },
    def:{ fr:"⚠️ À vérifier avant chaque voyage. Le **112** fonctionne dans toute l'Union européenne, au Royaume-Uni et en Irlande. Le **999** est le numéro historique britannique et irlandais, toujours actif. Au Japon, deux numéros distincts : **119** pour les pompiers et l'ambulance, **110** pour la police.",
          en:"Check before every trip. 112 works across the EU, the UK and Ireland. 999 is still live in Britain and Ireland. Japan splits it: 119 for fire and ambulance, 110 for police." } },

  { ref:"veterinaire", lecon:1, coll:"alerte",
    mots:{ fr:{m:"le vétérinaire", dit:"Appelez le vétérinaire !"},
           en:{m:"the vet", p:"vètt", dit:"Call the vet !", var:"veterinary surgeon"},
           es:{m:"el veterinario", dit:"¡ Llamad al veterinario !"},
           it:{m:"il veterinario", dit:"Chiamate il veterinario !"},
           de:{m:"der Tierarzt", p:"tir-artst", dit:"Ruft den Tierarzt !"},
           ja:{m:"獣医", p:"jūi", dit:"獣医を呼んでください !"} },
    def:{ fr:"Le mot le plus utile du chapitre. ⚠️ En anglais on dit toujours **the vet**, jamais le mot entier : « call the veterinary » sonne faux et fait perdre du temps.",
          en:"The most useful word here. English always shortens it to « the vet »." } },

  { ref:"ambulance", lecon:1, coll:"alerte",
    mots:{ fr:{m:"l'ambulance"}, en:{m:"the ambulance", p:"am-biou-leunce"},
           es:{m:"la ambulancia"}, it:{m:"l'ambulanza"},
           de:{m:"der Krankenwagen", p:"kran-keune-va-gueune"}, ja:{m:"救急車", p:"kyūkyūsha"} },
    def:{ fr:"Le mot allemand ne ressemble à rien des autres : Krankenwagen, « la voiture des malades ». À reconnaître à l'oral, c'est tout ce qu'on demande.",
          en:"The German word looks like none of the others: Krankenwagen, « the sick people's car »." } },

  { ref:"hopital", lecon:1, coll:"alerte",
    mots:{ fr:{m:"l'hôpital"}, en:{m:"the hospital", p:"hoss-pi-teul"},
           es:{m:"el hospital"}, it:{m:"l'ospedale"},
           de:{m:"das Krankenhaus", p:"kran-keune-haouss"}, ja:{m:"病院", p:"byōin"} },
    def:{ fr:"Utile surtout pour comprendre où l'on t'emmène. Cinq langues sur six se ressemblent ; l'allemand fait bande à part une fois de plus.",
          en:"Mostly useful for understanding where you are being taken. Five of six languages look alike; German again does not." } },

  { ref:"medecin", lecon:1, coll:"alerte",
    mots:{ fr:{m:"le médecin"}, en:{m:"the doctor", p:"dok-teur"},
           es:{m:"el médico"}, it:{m:"il medico"},
           de:{m:"der Arzt", p:"artst"}, ja:{m:"医者", p:"isha"} },
    def:{ fr:"⚠️ Piège allemand : Arzt est le médecin, Tierarzt le vétérinaire — littéralement « le médecin des animaux ». Un seul mot de différence entre les deux appels.",
          en:"A German trap: Arzt is the doctor, Tierarzt the vet — literally « the animal doctor »." } },

  { ref:"trousse-secours", lecon:1, coll:"alerte",
    mots:{ fr:{m:"la trousse de secours", dit:"Où est la trousse de secours ?"},
           en:{m:"the first aid kit", p:"feurst éïd kitt", dit:"Where's the first aid kit ?"},
           es:{m:"el botiquín", dit:"¿ Dónde está el botiquín ?"},
           it:{m:"la cassetta del pronto soccorso", dit:"Dov'è il pronto soccorso ?"},
           de:{m:"der Verbandskasten", p:"fèr-bants-kass-teune", dit:"Wo ist der Verbandskasten ?"},
           ja:{m:"救急箱", p:"kyūkyūbako", dit:"救急箱はどこですか ?"} },
    def:{ fr:"Chaque écurie en a une, et c'est la première chose à repérer en arrivant dans un club inconnu — avant de monter, pas après.",
          en:"Every yard has one, and it is the first thing to locate at an unfamiliar club — before riding, not after." } },

  { ref:"responsable", lecon:1, coll:"alerte",
    mots:{ fr:{m:"le responsable de l'écurie", dit:"Il faut prévenir le responsable."},
           en:{m:"the yard manager", p:"yard ma-ni-djeur", dit:"We need to tell the yard manager."},
           es:{m:"el responsable de la cuadra", dit:"Hay que avisar al responsable."},
           it:{m:"il responsabile della scuderia", dit:"Bisogna avvisare il responsabile."},
           de:{m:"die Stallleitung", p:"chtal-laï-toung", dit:"Wir müssen die Stallleitung informieren."}, // ??
           ja:{m:"厩舎の責任者", p:"kyūsha no sekininsha", dit:"責任者に知らせてください。"} },
    def:{ fr:"Toujours prévenu, même pour un incident sans gravité : c'est lui qui connaît le cheval, son propriétaire et l'assurance.",
          en:"Always told, even for a minor incident: he knows the horse, its owner and the insurance." } },

  { ref:"assurance", lecon:1, coll:"alerte",
    mots:{ fr:{m:"l'assurance"}, en:{m:"the insurance", p:"in-chou-reunce"},
           es:{m:"el seguro"}, it:{m:"l'assicurazione"},
           de:{m:"die Versicherung", p:"fèr-zi-che-roung"}, ja:{m:"保険", p:"hoken"} },
    def:{ fr:"À l'étranger, garder la carte européenne d'assurance maladie et l'attestation de licence : les deux sont réclamées après une chute.",
          en:"Abroad, keep your European health card and your licence certificate: both get asked for after a fall." } },

  /* ============ LEÇON 2 · LE CAVALIER ============ */

  { ref:"chute", lecon:2, coll:"cavalier",
    mots:{ fr:{m:"la chute", dit:"Il y a eu une chute."},
           en:{m:"the fall", p:"fôl", dit:"There's been a fall."},
           es:{m:"la caída", dit:"Ha habido una caída."},
           it:{m:"la caduta", dit:"C'è stata una caduta."},
           de:{m:"der Sturz", p:"chtourts", dit:"Es gab einen Sturz."},
           ja:{m:"落馬", p:"rakuba", dit:"落馬しました。"} },
    def:{ fr:"⚠️ Le japonais a un mot exprès pour la chute de cheval, 落馬, distinct de toute autre chute. C'est aussi le mot le plus fréquent de ce chapitre.",
          en:"Japanese has a dedicated word for falling off a horse, 落馬, separate from any other kind of fall." } },

  { ref:"tomber", lecon:2, coll:"cavalier", v:true,
    mots:{ fr:{m:"tomber", dit:"Je suis tombée."},
           en:{m:"to fall off", p:"fôl off", dit:"I've come off."},
           es:{m:"caerse", dit:"Me he caído."},
           it:{m:"cadere", dit:"Sono caduta."},
           de:{m:"stürzen", p:"chtur-tseune", dit:"Ich bin gestürzt."},
           ja:{m:"落馬する", p:"rakuba suru", dit:"落馬しました。"} },
    def:{ fr:"⚠️ En Grande-Bretagne, l'expression courante est **« I've come off »**, pas « I fell ». Et « he had me off » veut dire que le cheval t'a désarçonnée.",
          en:"In Britain the usual phrase is « I've come off », and « he had me off » means the horse got rid of you." } },

  { ref:"commotion", lecon:2, coll:"cavalier",
    mots:{ fr:{m:"la commotion cérébrale"}, en:{m:"concussion", p:"keune-keu-cheune"},
           es:{m:"la conmoción cerebral"}, it:{m:"la commozione cerebrale"},
           de:{m:"die Gehirnerschütterung", p:"gue-hirn-èr-chu-te-roung"}, ja:{m:"脳震盪", p:"nōshintō"} },
    def:{ fr:"Après un choc à la tête : nausée, confusion, trou de mémoire, mal de tête qui monte. Les signes peuvent apparaître une heure plus tard — on fait examiner, même si tout va bien sur le moment.",
          en:"After a blow to the head: nausea, confusion, memory gaps, a headache that builds. Signs can appear an hour later, so always get checked." } },

  { ref:"fracture", lecon:2, coll:"cavalier",
    mots:{ fr:{m:"la fracture"}, en:{m:"a broken bone", p:"brô-keune bône", var:"a fracture"},
           es:{m:"la fractura"}, it:{m:"la frattura"},
           de:{m:"der Bruch", p:"broureh"}, ja:{m:"骨折", p:"kossetsu"} },
    def:{ fr:"On ne bouge pas la personne, on ne retire pas la bombe, on couvre et on attend les secours. L'anglais courant dit « a broken arm », pas « a fracture ».",
          en:"Do not move the person, do not remove the hat, keep them warm and wait. Everyday English says « a broken arm »." } },

  { ref:"entorse", lecon:2, coll:"cavalier",
    mots:{ fr:{m:"l'entorse"}, en:{m:"a sprain", p:"spréïne"},
           es:{m:"el esguince"}, it:{m:"la distorsione"},
           de:{m:"die Verstauchung", p:"fèr-chtaou-roung"}, ja:{m:"捻挫", p:"nenza"} },
    def:{ fr:"La blessure de cavalier la plus banale, souvent à la cheville en descendant ou au poignet en tombant. Glace, surélévation, pas de remontée à cheval le jour même.",
          en:"The commonest rider injury: an ankle dismounting or a wrist in a fall. Ice, elevate, and no riding again that day." } },

  { ref:"douleur", lecon:2, coll:"cavalier",
    mots:{ fr:{m:"la douleur", dit:"J'ai mal ici."},
           en:{m:"the pain", p:"péïne", dit:"It hurts here."},
           es:{m:"el dolor", dit:"Me duele aquí."},
           it:{m:"il dolore", dit:"Mi fa male qui."},
           de:{m:"der Schmerz", p:"chmèrts", dit:"Hier tut es weh."},
           ja:{m:"痛み", p:"itami", dit:"ここが痛いです。"} },
    def:{ fr:"La phrase à connaître par cœur, avec le doigt sur l'endroit : elle suffit à se faire comprendre partout, sans un mot de plus.",
          en:"The phrase to know by heart, with a finger on the spot: it is enough anywhere, with nothing else added." } },

  { ref:"sang", lecon:2, coll:"cavalier",
    mots:{ fr:{m:"le sang", dit:"Il y a du sang."},
           en:{m:"the blood", p:"bleude", dit:"There's blood."},
           es:{m:"la sangre", dit:"Hay sangre."},
           it:{m:"il sangue", dit:"C'è del sangue."},
           de:{m:"das Blut", p:"bloute", dit:"Da ist Blut."},
           ja:{m:"血", p:"chi", dit:"血が出ています。"} },
    def:{ fr:"On comprime avec un tissu propre, sans jamais retirer le premier pansement même imbibé : on en ajoute un par-dessus.",
          en:"Press with a clean cloth, and never take off the first dressing even when soaked — add another on top." } },

  { ref:"evanouir", lecon:2, coll:"cavalier", v:true,
    mots:{ fr:{m:"s'évanouir", dit:"Elle a perdu connaissance."},
           en:{m:"to faint", p:"féïnnte", dit:"She's unconscious."},
           es:{m:"desmayarse", dit:"Ha perdido el conocimiento."},
           it:{m:"svenire", dit:"Ha perso conoscenza."},
           de:{m:"ohnmächtig werden", p:"ône-mèch-tirh vèr-deune", dit:"Sie ist ohne Bewusstsein."},
           ja:{m:"気を失う", p:"ki o ushinau", dit:"意識がありません。"} },
    def:{ fr:"⚠️ « Unconscious » est le mot qui déclenche la priorité maximale dans un appel en anglais. Le dire tout de suite, avant l'adresse.",
          en:"« Unconscious » is the word that triggers top priority on an English call. Say it first, before the address." } },

  { ref:"bouger-pas", lecon:2, coll:"cavalier",
    mots:{ fr:{m:"ne pas bouger", dit:"Ne bouge pas !"},
           en:{m:"not to move", p:"nott tou mouve", dit:"Don't move !"},
           es:{m:"no moverse", dit:"¡ No te muevas !"},
           it:{m:"non muoversi", dit:"Non ti muovere !"},
           de:{m:"sich nicht bewegen", p:"nirht be-vé-gueune", dit:"Nicht bewegen !"},
           ja:{m:"動かない", p:"ugokanai", dit:"動かないで !"} },
    def:{ fr:"À dire à quelqu'un qui vient de tomber, et à s'appliquer à soi-même : on se relève lentement, une fois seulement qu'on a fait l'inventaire.",
          en:"Say it to anyone who has just fallen, and to yourself: get up slowly, and only after checking yourself over." } },

  { ref:"respirer", lecon:2, coll:"cavalier", v:true,
    mots:{ fr:{m:"respirer", dit:"Elle respire ?"},
           en:{m:"to breathe", p:"bride", dit:"Is she breathing ?"},
           es:{m:"respirar", dit:"¿ Respira ?"},
           it:{m:"respirare", dit:"Respira ?"},
           de:{m:"atmen", p:"at-meune", dit:"Atmet sie ?"},
           ja:{m:"呼吸する", p:"kokyū suru", dit:"呼吸していますか ?"} },
    def:{ fr:"La première question posée par tous les services d'urgence du monde, dans cet ordre : consciente ? respire ? où êtes-vous ?",
          en:"The first question every emergency service in the world asks, in this order: conscious ? breathing ? where are you ?" } },

  /* ============ LEÇON 3 · LE CHEVAL ============ */

  { ref:"boiterie", lecon:3, coll:"cheval-urg",
    mots:{ fr:{m:"la boiterie"}, en:{m:"lameness", p:"léïm-neuss"},
           es:{m:"la cojera"}, it:{m:"la zoppia"},
           de:{m:"die Lahmheit", p:"lam-haïte"}, ja:{m:"跛行", p:"hakō"} },
    def:{ fr:"Le motif d'appel vétérinaire le plus fréquent. On la décrit toujours par le membre et le degré : « il boite du postérieur gauche, à froid ».",
          en:"The commonest reason to call a vet. Always described by leg and degree: « lame behind on the left, when cold »." } },

  { ref:"boiter", lecon:3, coll:"cheval-urg", v:true,
    mots:{ fr:{m:"boiter", dit:"Il boite."},
           en:{m:"to be lame", p:"bi léïme", dit:"He's lame."},
           es:{m:"cojear", dit:"Cojea."},
           it:{m:"zoppicare", dit:"Zoppica."},
           de:{m:"lahmen", p:"la-meune", dit:"Er ist lahm."},
           ja:{m:"跛行する", p:"hakō suru", dit:"跛行しています。"} },
    def:{ fr:"⚠️ L'anglais emploie un adjectif là où le français emploie un verbe : on dit **« he's lame »**, pas « he limps », qui se dit d'un humain.",
          en:"English uses an adjective where French uses a verb: « he's lame », not « he limps », which is said of people." } },

  { ref:"plaie", lecon:3, coll:"cheval-urg",
    mots:{ fr:{m:"la plaie"}, en:{m:"the wound", p:"ouounde"},
           es:{m:"la herida"}, it:{m:"la ferita"},
           de:{m:"die Wunde", p:"voune-de"}, ja:{m:"傷", p:"kizu"} },
    def:{ fr:"On rince à l'eau claire, on ne met rien dessus avant l'avis du vétérinaire, et on vérifie la date du vaccin antitétanique du cheval.",
          en:"Rinse with clean water, put nothing on it before the vet advises, and check the horse's tetanus cover." } },

  { ref:"coupure", lecon:3, coll:"cheval-urg",
    mots:{ fr:{m:"la coupure"}, en:{m:"the cut", p:"keutt"},
           es:{m:"el corte"}, it:{m:"il taglio"},
           de:{m:"der Schnitt", p:"chnitt"}, ja:{m:"切り傷", p:"kirikizu"} },
    def:{ fr:"Une coupure près d'une articulation est toujours une urgence, même minuscule : c'est la synoviale qu'on redoute, pas la taille de la plaie.",
          en:"A cut near a joint is always an emergency, however small: the worry is the joint capsule, not the size." } },

  { ref:"saignement", lecon:3, coll:"cheval-urg",
    mots:{ fr:{m:"le saignement", dit:"Il saigne beaucoup."},
           en:{m:"the bleeding", p:"bli-ding", dit:"He's bleeding badly."},
           es:{m:"la hemorragia", dit:"Sangra mucho."},
           it:{m:"il sanguinamento", dit:"Sanguina molto."},
           de:{m:"die Blutung", p:"blou-toung", dit:"Er blutet stark."},
           ja:{m:"出血", p:"shukketsu", dit:"出血がひどいです。"} },
    def:{ fr:"On comprime et on maintient, sans garrot. Un cheval supporte de perdre beaucoup plus de sang qu'un humain, mais un saignement qui gicle est une urgence absolue.",
          en:"Press and hold, no tourniquet. A horse tolerates far more blood loss than a person, but spurting blood is an absolute emergency." } },

  { ref:"colique", lecon:3, coll:"cheval-urg",
    mots:{ fr:{m:"la colique", dit:"Je crois qu'il a une colique."},
           en:{m:"colic", p:"ko-lik", dit:"I think he's got colic."},
           es:{m:"el cólico", dit:"Creo que tiene un cólico."},
           it:{m:"la colica", dit:"Penso che abbia una colica."},
           de:{m:"die Kolik", p:"kô-lik", dit:"Ich glaube, er hat eine Kolik."},
           ja:{m:"疝痛", p:"sentsū", dit:"疝痛かもしれません。"} },
    def:{ fr:"**La première urgence vétérinaire du cheval.** Il gratte, regarde son flanc, se couche et se relève, veut se rouler. On appelle immédiatement, on retire la nourriture, on le tient debout et au calme.",
          en:"The number one equine emergency. He paws, looks at his flank, gets up and down, wants to roll. Call at once, take food away, keep him up and quiet." } },

  { ref:"fourbure", lecon:3, coll:"cheval-urg",
    mots:{ fr:{m:"la fourbure"}, en:{m:"laminitis", p:"la-mi-naï-tiss", var:"founder (US)"},
           es:{m:"la laminitis", var:"la infosura"}, it:{m:"la laminite"},
           de:{m:"die Rehe", p:"ré-e"}, ja:{m:"蹄葉炎", p:"teiyōen"} },
    def:{ fr:"Le cheval campe, refuse d'avancer, reporte son poids en arrière. ⚠️ L'allemand a un mot très court et totalement opaque, **die Rehe** — impossible à deviner, et pourtant vital à reconnaître.",
          en:"The horse stands stretched out and refuses to walk, rocking its weight back. German's word for it, Rehe, is short and impossible to guess." } },

  { ref:"chaleur-membre", lecon:3, coll:"cheval-urg",
    mots:{ fr:{m:"la chaleur dans un membre"}, en:{m:"heat in a leg", p:"hite in eu lègue"},
           es:{m:"calor en un miembro"}, it:{m:"calore in un arto"},
           de:{m:"Wärme im Bein", p:"vèr-me im baïn"}, ja:{m:"脚の熱", p:"ashi no netsu"} },
    def:{ fr:"On compare toujours avec le membre opposé, à la main, à froid. Une chaleur d'un seul côté annonce presque toujours quelque chose.",
          en:"Always compared with the opposite leg, by hand, when cold. Heat on one side alone nearly always means something." } },

  { ref:"gonflement", lecon:3, coll:"cheval-urg",
    mots:{ fr:{m:"le gonflement"}, en:{m:"the swelling", p:"souè-ling"},
           es:{m:"la hinchazón"}, it:{m:"il gonfiore"},
           de:{m:"die Schwellung", p:"chvè-loung"}, ja:{m:"腫れ", p:"hare"} },
    def:{ fr:"Un engorgement des quatre membres au repos n'a pas le même sens qu'un gonflement chaud et douloureux sur un seul : le dire au vétérinaire.",
          en:"Filled legs on all four at rest do not mean the same as one hot, painful swelling: tell the vet which it is." } },

  { ref:"clou-de-rue", lecon:3, coll:"cheval-urg",
    mots:{ fr:{m:"le clou de rue"}, en:{m:"a nail in the foot", p:"néïl in ze foute", var:"a puncture wound"},
           es:{m:"un clavo en el casco"}, it:{m:"un chiodo nello zoccolo"}, // ??
           de:{m:"der Nageltritt", p:"na-gueul-tritt"}, ja:{m:"釘の踏み込み", p:"kugi no fumikomi"} }, // ??
    def:{ fr:"⚠️ On ne retire pas le clou avant que le vétérinaire ait vu le pied, ou au moins une photo : sa profondeur et son angle décident du traitement. L'allemand a un mot exact, der Nageltritt.",
          en:"Do not pull the nail before the vet has seen the foot, or at least a photo: depth and angle decide the treatment." } },

  { ref:"cheval-echappe", lecon:3, coll:"cheval-urg",
    mots:{ fr:{m:"le cheval échappé", dit:"Attention, cheval échappé !"},
           en:{m:"a loose horse", p:"louss horss", dit:"Loose horse !"},
           es:{m:"un caballo suelto", dit:"¡ Caballo suelto !"},
           it:{m:"un cavallo scappato", dit:"Cavallo libero !"},
           de:{m:"das freilaufende Pferd", p:"fraï-laou-feune-de pfèrt", dit:"Pferd ist los !"}, // ??
           ja:{m:"放馬", p:"hōba", dit:"放馬です !"} },
    def:{ fr:"⚠️ **« Loose horse ! »** est le cri exact d'un manège ou d'un terrain de concours britannique : deux mots qui font s'arrêter tout le monde et fermer les portes. Le japonais a aussi son mot dédié, 放馬.",
          en:"« Loose horse ! » is the exact shout on a British yard or showground: two words that stop everyone and shut the gates." } },

  { ref:"coup-chaleur", lecon:3, coll:"cheval-urg",
    mots:{ fr:{m:"le coup de chaleur"}, en:{m:"heat stroke", p:"hite strôke"},
           es:{m:"el golpe de calor"}, it:{m:"il colpo di calore"},
           de:{m:"der Hitzschlag", p:"hits-chlak"}, ja:{m:"熱中症", p:"netchūshō"} },
    def:{ fr:"Le cheval souffle, la peau reste chaude, la sueur s'arrête. On douche à l'eau froide sans attendre, en insistant sur l'encolure et l'intérieur des cuisses, et on appelle.",
          en:"He blows, his skin stays hot, the sweating stops. Hose with cold water at once, especially the neck and inner thighs, and call." } },

  /* ============ LEÇON 4 · LES MOTS QUI SAUVENT ============ */

  { ref:"aide", lecon:4, coll:"mots",
    mots:{ fr:{m:"à l'aide", dit:"À l'aide !"},
           en:{m:"help", p:"hèlp", dit:"Help !"},
           es:{m:"socorro", dit:"¡ Socorro !", var:"ayuda"},
           it:{m:"aiuto", dit:"Aiuto !"},
           de:{m:"Hilfe", p:"hil-fe", dit:"Hilfe !"},
           ja:{m:"助けて", p:"tasukete", dit:"助けて !"} },
    def:{ fr:"Un mot, une syllabe ou deux, dans les six langues. C'est celui qu'on apprend en premier et qu'on n'oublie jamais.",
          en:"One word, one or two syllables, in all six languages. The first one to learn and the last one you forget." } },

  { ref:"appeler", lecon:4, coll:"mots", v:true,
    mots:{ fr:{m:"appeler", dit:"Appelez quelqu'un !"},
           en:{m:"to call", p:"kôl", dit:"Someone call ! Get help !"},
           es:{m:"llamar", dit:"¡ Llamad a alguien !"},
           it:{m:"chiamare", dit:"Chiamate qualcuno !"},
           de:{m:"rufen", p:"rou-feune", dit:"Ruft jemanden !"},
           ja:{m:"呼ぶ", p:"yobu", dit:"誰か呼んでください !"} },
    def:{ fr:"Toujours désigner quelqu'un du doigt en le disant : un ordre lancé à la cantonade ne fait bouger personne, dans aucun pays.",
          en:"Always point at one person as you say it: an order to the crowd moves nobody, in any country." } },

  { ref:"se-reculer", lecon:4, coll:"mots", v:true,
    mots:{ fr:{m:"reculer", dit:"Reculez !"},
           en:{m:"to stand back", p:"stannd bak", dit:"Stand back !"},
           es:{m:"apartarse", dit:"¡ Apartaos !"},
           it:{m:"stare indietro", dit:"State indietro !"},
           de:{m:"zurücktreten", p:"tsou-ruk-tré-teune", dit:"Zurück !"},
           ja:{m:"下がる", p:"sagaru", dit:"下がってください !"} },
    def:{ fr:"Le premier réflexe autour d'un cheval au sol ou d'une chute : faire de la place. « Stand back » s'entend dix fois par concours en Grande-Bretagne.",
          en:"The first move around a down horse or a fallen rider: make space. « Stand back » is heard ten times a day at a British show." } },

  { ref:"tenir", lecon:4, coll:"mots", v:true,
    mots:{ fr:{m:"tenir le cheval", dit:"Tiens-le !"},
           en:{m:"to hold the horse", p:"hôlde ze horss", dit:"Hold him !"},
           es:{m:"sujetar el caballo", dit:"¡ Sujétalo !"},
           it:{m:"tenere il cavallo", dit:"Tienilo !"},
           de:{m:"das Pferd festhalten", p:"fèst-hal-teune", dit:"Halt ihn fest !"},
           ja:{m:"馬を押さえる", p:"uma o osaeru", dit:"馬を押さえて !"} },
    def:{ fr:"La tâche qu'on te confiera le plus souvent pendant une urgence, parce qu'elle est indispensable et qu'elle ne demande pas de parler la langue.",
          en:"The job you will most often be given during an emergency: essential, and it needs no language at all." } },

  { ref:"rester-calme", lecon:4, coll:"mots",
    mots:{ fr:{m:"rester calme", dit:"Reste calme, je suis là."},
           en:{m:"to keep calm", p:"kip kam", dit:"Stay calm, I'm here."},
           es:{m:"mantener la calma", dit:"Tranquilo, estoy aquí."},
           it:{m:"stare calmi", dit:"Stai calmo, sono qui."},
           de:{m:"ruhig bleiben", p:"rou-irh blaï-beune", dit:"Bleib ruhig, ich bin da."},
           ja:{m:"落ち着く", p:"ochitsuku", dit:"落ち着いて、ここにいます。"} },
    def:{ fr:"Se dit au cavalier au sol comme au cheval. Le ton compte plus que les mots — et c'est la seule phrase du chapitre que le cheval comprend aussi.",
          en:"Said to the fallen rider and to the horse alike. Tone matters more than words, and it is the one phrase here the horse understands too." } },

  { ref:"adresse", lecon:4, coll:"mots",
    mots:{ fr:{m:"l'adresse", dit:"Nous sommes à…"},
           en:{m:"the address", p:"a-drèss", dit:"We're at…"},
           es:{m:"la dirección", dit:"Estamos en…"},
           it:{m:"l'indirizzo", dit:"Siamo a…"},
           de:{m:"die Adresse", p:"a-drè-se", dit:"Wir sind in…"},
           ja:{m:"住所", p:"jūsho", dit:"場所は…です。"} },
    def:{ fr:"Le vrai point faible d'une urgence à l'étranger : on sait dire ce qui se passe, pas où l'on est. Photographier l'adresse du club en arrivant règle le problème pour de bon.",
          en:"The real weak point of an emergency abroad: you can say what happened, not where you are. Photograph the yard's address on arrival." } },

  { ref:"telephone", lecon:4, coll:"mots",
    mots:{ fr:{m:"le téléphone", dit:"Tu as ton téléphone ?"},
           en:{m:"the phone", p:"fône", dit:"Have you got your phone ?", var:"mobile (GB) · cell (US)"},
           es:{m:"el teléfono", dit:"¿ Tienes el móvil ?"},
           it:{m:"il telefono", dit:"Hai il cellulare ?"},
           de:{m:"das Handy", p:"hèn-di", dit:"Hast du dein Handy ?"},
           ja:{m:"携帯", p:"keitai", dit:"携帯を持っていますか ?"} },
    def:{ fr:"⚠️ Faux anglicisme célèbre : en allemand, le portable s'appelle **das Handy**, un mot qu'aucun anglophone ne comprend. Et le 112 passe même sans réseau de ton opérateur.",
          en:"A famous false anglicism: German calls a mobile « das Handy », which no English speaker understands. And 112 connects even without your own network." } },

  { ref:"ca-va", lecon:4, coll:"mots",
    mots:{ fr:{m:"ça va ?", dit:"Ça va ? Tu m'entends ?"},
           en:{m:"are you all right ?", p:"ar you ôl raïte", dit:"Are you all right ? Can you hear me ?"},
           es:{m:"¿ estás bien ?", dit:"¿ Estás bien ? ¿ Me oyes ?"},
           it:{m:"stai bene ?", dit:"Stai bene ? Mi senti ?"},
           de:{m:"alles in Ordnung ?", p:"a-leuss in ord-noung", dit:"Alles in Ordnung ? Hörst du mich ?"},
           ja:{m:"大丈夫ですか", p:"daijōbu desu ka", dit:"大丈夫ですか ? 聞こえますか ?"} },
    def:{ fr:"La toute première phrase, et un test en soi : une réponse cohérente élimine déjà beaucoup de choses. En Grande-Bretagne, « you all right ? » est aussi un simple bonjour — le ton fait la différence.",
          en:"The very first phrase, and a test in itself: a coherent answer rules a lot out. In Britain « you all right ? » is also just a greeting — tone tells them apart." } },

  { ref:"danger", lecon:4, coll:"mots",
    mots:{ fr:{m:"le danger", dit:"C'est dangereux, écartez-vous !"},
           en:{m:"the danger", p:"déïn-djeur", dit:"It's not safe — get back !"},
           es:{m:"el peligro", dit:"¡ Es peligroso, apartaos !"},
           it:{m:"il pericolo", dit:"È pericoloso, allontanatevi !"},
           de:{m:"die Gefahr", p:"gue-far", dit:"Das ist gefährlich, weg da !"},
           ja:{m:"危険", p:"kiken", dit:"危険です、離れてください !"} },
    def:{ fr:"⚠️ L'anglais dit rarement « danger » à l'oral : il dit **« it's not safe »**. Chercher le mot danger dans une phrase anglaise, c'est risquer de ne rien entendre venir.",
          en:"Spoken English rarely uses « danger »: it says « it's not safe ». Listening out for the word danger will make you miss the warning." } },

  { ref:"ne-pas-remonter", lecon:4, coll:"mots",
    mots:{ fr:{m:"ne pas remonter", dit:"Je ne remonte pas."},
           en:{m:"not to get back on", p:"guett bak onn", dit:"I'm not getting back on."},
           es:{m:"no volver a montar", dit:"No vuelvo a montar."},
           it:{m:"non risalire", dit:"Non risalgo."},
           de:{m:"nicht wieder aufsteigen", p:"vi-deur aouf-chtaï-gueune", dit:"Ich steige nicht wieder auf."},
           ja:{m:"再び乗らない", p:"futatabi noranai", dit:"今日はもう乗りません。"} },
    def:{ fr:"Contre la vieille phrase « remonte tout de suite » : après un choc à la tête, on ne remonte pas, et c'est la règle dans tous les pays. Savoir le dire dans la langue du club, c'est pouvoir tenir sa position.",
          en:"Against the old « get straight back on »: after a blow to the head you do not, and that is the rule everywhere. Being able to say it in the local language is being able to hold your ground." } }
  ],

  /* ---- phrases complètes : ce chapitre est fait pour être MONTRÉ ---- */
  phrases: [
    { ref:"chute-appeler", lecon:2,
      fr:"Il y a eu une chute, appelez les secours.",
      en:"Someone's come off — call an ambulance.",
      es:"Ha habido una caída, llamad a emergencias.",
      it:"C'è stata una caduta, chiamate i soccorsi.",
      de:"Es gab einen Sturz, ruft den Rettungsdienst.",
      ja:"落馬 が あり ました 。 救急 を 呼んで ください 。" },
    { ref:"tete-choc", lecon:2,
      fr:"Elle est tombée sur la tête, elle ne remonte pas.",
      en:"She's had a bang on the head — she's not getting back on.",
      es:"Se ha golpeado la cabeza, no vuelve a montar.",
      it:"Ha preso un colpo alla testa, non risale.",
      de:"Sie ist auf den Kopf gefallen, sie steigt nicht wieder auf.",
      ja:"頭 を 打ち ました 。 今日 は もう 乗り ませ ん 。" },
    { ref:"appeler-vet", lecon:3,
      fr:"Il faut appeler le vétérinaire, tout de suite.",
      en:"We need to call the vet, right now.",
      es:"Hay que llamar al veterinario, ahora mismo.",
      it:"Bisogna chiamare il veterinario, subito.",
      de:"Wir müssen sofort den Tierarzt rufen.",
      ja:"すぐ に 獣医 を 呼ぶ 必要 が あり ます 。" },
    { ref:"colique-signes", lecon:3,
      fr:"Il se roule et regarde son flanc, je crois que c'est une colique.",
      en:"He's rolling and looking at his flank — I think it's colic.",
      es:"Se revuelca y se mira el costado, creo que es un cólico.",
      it:"Si rotola e si guarda il fianco, penso sia una colica.",
      de:"Er wälzt sich und schaut zur Flanke, ich glaube, es ist eine Kolik.",
      ja:"転げ回って 腹 を 見て い ます 。 疝痛 だ と 思い ます 。" },
    { ref:"boite-posterieur", lecon:3,
      fr:"Il boite du postérieur gauche depuis ce matin.",
      en:"He's been lame behind on the left since this morning.",
      es:"Cojea de la pata izquierda desde esta mañana.",
      it:"Zoppica dal posteriore sinistro da questa mattina.",
      de:"Er ist seit heute Morgen hinten links lahm.",
      ja:"今朝 から 左 後肢 が 跛行 して い ます 。" },
    { ref:"loose-horse", lecon:3,
      fr:"Cheval échappé ! Fermez les portes !",
      en:"Loose horse ! Shut the gates !",
      es:"¡ Caballo suelto ! ¡ Cerrad las puertas !",
      it:"Cavallo libero ! Chiudete i cancelli !",
      de:"Pferd ist los ! Tore zu !",
      ja:"放馬 です ! 扉 を 閉めて ください !" },
    { ref:"ou-sommes-nous", lecon:4,
      fr:"Nous sommes au club équestre, je vous donne l'adresse.",
      en:"We're at the riding school — I'll give you the address.",
      es:"Estamos en el club de equitación, le doy la dirección.",
      it:"Siamo al club ippico, le do l'indirizzo.",
      de:"Wir sind auf dem Reiterhof, ich gebe Ihnen die Adresse.",
      ja:"乗馬 クラブ に い ます 。 住所 を お伝え し ます 。" },
    { ref:"saigne-comprime", lecon:3,
      fr:"Il saigne, j'appuie dessus avec un tissu propre.",
      en:"He's bleeding — I'm pressing on it with a clean cloth.",
      es:"Está sangrando, hago presión con un paño limpio.",
      it:"Sta sanguinando, faccio pressione con un panno pulito.",
      de:"Er blutet, ich drücke mit einem sauberen Tuch darauf.",
      ja:"出血 して い ます 。 清潔 な 布 で 押さえて い ます 。" },
    { ref:"parlez-francais", lecon:4,
      fr:"Vous parlez français ? C'est une urgence.",
      en:"Do you speak French ? This is an emergency.",
      es:"¿ Habla francés ? Es una urgencia.",
      it:"Parla francese ? È un'emergenza.",
      de:"Sprechen Sie Französisch ? Es ist ein Notfall.",
      ja:"フランス語 が 話せ ます か ? 緊急 です 。" },
    { ref:"ou-trousse", lecon:1,
      fr:"Où est la trousse de secours, et qui est le responsable ?",
      en:"Where's the first aid kit, and who's the yard manager ?",
      es:"¿ Dónde está el botiquín y quién es el responsable ?",
      it:"Dov'è il pronto soccorso e chi è il responsabile ?",
      de:"Wo ist der Verbandskasten, und wer ist die Stallleitung ?",
      ja:"救急箱 は どこ です か 。 責任者 は 誰 です か ?" }
  ]
};
