/* ============================================================
   HYPE ▸ BIBLIOTHÈQUE VIDÉO  (fichier séparé, chargé par index.html)
   ------------------------------------------------------------
   Contient : le catalogue des vidéos, l'écran Bibliothèque
   (window.EcranVideos) et la page de lecture (window.EcranVideoLecture).

   POURQUOI UN FICHIER SÉPARÉ : index.html frôle le seuil de troncature
   iOS Safari. Tout ce qui peut vivre dehors vit dehors.

   DÉPENDANCES (globales de index.html, résolues à l'exécution) :
   React, useApp, COLORS, supa, utilisateurActuel.

   ÉTAT AU 31/07/2026 : 6 vidéos réelles, toutes sur YouTube, vérifiées.
   3 interventions IFCE sur le contact + 3 vidéos sur les aides.
   Une entrée sans source (yt vide) est automatiquement exclue de la
   bibliothèque : jamais de carte morte. Pour ajouter une vidéo, remplir
   yt dans HYPE_VIDEOS ; pour migrer vers Vimeo plus tard, le champ dérivé
   src devient { type:"vimeo", ref } sans autre changement de code.

   La RÉSERVE D'ANIMATIONS (22 entrées, fichiers locaux servis depuis
   images/) n'est visible que par les comptes de HYPE_MODERATEURS.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- THÈMES ---------------- */
  var THEMES = {
    position: { teinte: 198, sceau: "◉" },
    cheval:   { teinte: 172, sceau: "❋" },
    dressage: { teinte: 212, sceau: "❖" },
    obstacle: { teinte: 26,  sceau: "⌃" },
    pied:     { teinte: 150, sceau: "⟡" },
    soins:    { teinte: 38,  sceau: "✿" },
    securite: { teinte: 8,   sceau: "⛨" },
    baby:     { teinte: 190, sceau: "☾" }
  };

  /* ---------------- CATALOGUE ----------------
     SOURCE DE VÉRITÉ UNIQUE des vidéos. Un cours ne stocke jamais une URL :
     il stocke un identifiant de cette table (champ vidIds). Le jour où l'IFCE
     déplace une vidéo, on corrige ici et nulle part ailleurs.

     Table établie le 29/07/2026 (passation « Directeur Technique »).
     Tout ce qui s'affiche est en 6 langues. Les vidéos elles-mêmes sont
     en français : langueVideo sert à le dire honnêtement à un cavalier
     germanophone ou japonais.

     verifie : date de vérification du lien. Vide = jamais ouvert.
  ------------------------------------------------ */

  /* Les trois liens « aides » n'ont pas été vérifiés. Passer ce drapeau à
     false pour les retirer de la bibliothèque tant que Blandine ne les a
     pas ouverts une fois chacun (dix secondes par lien). */
  /* 06/08 : bascule a false. Les 12 entrees precedentes portent toutes une
     date de verification ; seuls les deux films « Objectif Galop® 2 » ajoutes
     ce jour sont sans date, faute d'avoir pu les ouvrir (YouTube a repondu 429
     a chaque tentative). Ils restent donc invisibles dans la bibliotheque
     jusqu'a ce que Blandine ouvre les deux liens et qu'on inscrive la date.
     Remettre a true n'a de sens que si l'on assume d'afficher des liens
     jamais ouverts. */
  var INCLURE_NON_VERIFIEES = false;

  /* Libellé du chapitre auquel une vidéo est reliée. */
  var CHAPITRES = {
    /* 06/08 : premieres cles du Galop 1. Jusqu'ici CHAPITRES ne connaissait
       que des chapitres de Galop 3 et 4 : rien ne pouvait se rattacher a un
       cours du Galop 1, faute de libelle. Les intitules reprennent exactement
       ceux des cours (regle : jamais d'identifiant technique a l'ecran). */
    "g1-c2":  { fr: "Le pansage, premier soin", en: "Grooming, the first form of care", es: "El acicalado, el primer cuidado", it: "La pulizia, la prima cura", ja: "手入れ：最初のケア", de: "Die Fellpflege, die erste Pflege" },
    "g1-c8":  { fr: "Le matériel de base", en: "Basic equipment", es: "El material básico", it: "L'attrezzatura di base", ja: "基本の道具", de: "Die Grundausrüstung" },
    "g1-c10": { fr: "Le nœud d'attache", en: "The quick-release knot", es: "El nudo de atar", it: "Il nodo d'attacco", ja: "つなぎ結び", de: "Der Anbindeknoten" },
    "g1-c15": { fr: "La sécurité avant tout", en: "Safety first", es: "La seguridad ante todo", it: "La sicurezza prima di tutto", ja: "安全が第一", de: "Sicherheit zuerst" },
    "g1-c18": { fr: "Conduire en main en sécurité", en: "Leading in hand safely", es: "Llevar de la mano con seguridad", it: "Condurre a mano in sicurezza", ja: "安全な手級での引き马", de: "Sicher an der Hand führen" },
    "g1-c19": { fr: "Monter et descendre en sécurité", en: "Mounting and dismounting safely", es: "Montar y desmontar con seguridad", it: "Salire e scendere in sicurezza", ja: "安全な乗降", de: "Sicher auf- und absteigen" },
    /* 06/08 : premieres cles du Galop 2, pour les deux films « Objectif Galop® 2 ». */
    "g2-c3": { fr: "Diriger sur un trac\u00e9", en: "Riding a line", es: "Trazar un recorrido", it: "Guidare su un tracciato", ja: "\u30e9\u30a4\u30f3\u3092\u63cf\u304f", de: "Auf einer Linie reiten" },
    "g2-c4": { fr: "La d\u00e9couverte du saut", en: "Discovering the jump", es: "El descubrimiento del salto", it: "La scoperta del salto", ja: "\u8df3\u8e8d\u306e\u767a\u898b", de: "Die Entdeckung des Springens" },
    "g4-contact": { fr: "Le contact", en: "Contact", es: "El contacto", it: "Il contatto", ja: "コンタクト", de: "Die Anlehnung" },
    "g4-aides":   { fr: "L'accord des aides", en: "Coordination of the aids", es: "El acuerdo de las ayudas", it: "L'accordo degli aiuti", ja: "扶助の連携", de: "Das Zusammenspiel der Hilfen" },
    "g4-incurvation": { fr: "L'incurvation", en: "Bend and flexion", es: "La incurvación", it: "L'incurvamento", ja: "内方姿勢", de: "Stellung und Biegung" },
    "g4-biomeca": { fr: "La biomécanique du cheval", en: "The horse's biomechanics", es: "La biomecánica del caballo", it: "La biomeccanica del cavallo", ja: "馬のバイオメカニクス", de: "Die Biomechanik des Pferdes" }
  };

  /* Thèmes de la passation -> univers de la bibliothèque. */
  var THEME_MAP = {
    "comprendre-le-cheval": "cheval",
    "position-du-cavalier": "position",
    "soins-et-materiel": "soins",
    "dressage": "dressage",
    "obstacle": "obstacle",
    "travail-a-pied": "pied",
    "securite": "securite"
  };

  var HYPE_VIDEOS = [
    {
      id: "v-contact-01", yt: "0mAl3ZptRpg",
      source: "IFCE", intervenant: "Bernard Maurel",
      intervenantRole: { fr: "Juge international de dressage", en: "International dressage judge", es: "Juez internacional de doma", it: "Giudice internazionale di dressage", ja: "国際馬場馬術審判員", de: "Internationaler Dressurrichter" },
      titreSource: "Le contact : élément physique et psychologique essentiel dans la relation cheval-cavalier",
      doc: "https://www.ifce.fr/dir-wbc-contact-1-1-b-maurel/",
      langueVideo: "fr", cours: ["g4-contact"], galop: 4, theme: "comprendre-le-cheval",
      rang: "principal", dureeTranche: "plus8", verifie: "2026-07-29",
      titre: {
        fr: "Comprendre le contact entre le cheval et son cavalier",
        en: "Understanding contact between horse and rider",
        es: "Comprender el contacto entre el caballo y su jinete",
        it: "Capire il contatto tra cavallo e cavaliere",
        ja: "馬と乗り手のコンタクトを理解する",
        de: "Die Anlehnung zwischen Pferd und Reiter verstehen"
      },
      resume: {
        fr: "Ce que la main touche par les rênes, ce n'est pas seulement la bouche : c'est tout le fonctionnement du dos, du garrot et de l'encolure.",
        en: "What the hand touches through the reins is not only the mouth: it is the whole working of the back, the withers and the neck.",
        es: "Lo que la mano toca por las riendas no es solo la boca: es todo el funcionamiento del dorso, la cruz y el cuello.",
        it: "Ciò che la mano tocca tramite le redini non è solo la bocca: è tutto il funzionamento del dorso, del garrese e dell'incollatura.",
        ja: "手綱を通して手が触れているのは口だけではありません。背中、き甲、首の働き全体です。",
        de: "Was die Hand über die Zügel berührt, ist nicht nur das Maul: es ist das ganze Zusammenspiel von Rücken, Widerrist und Hals."
      },
      observer: {
        fr: ["La main qui suit les mouvements de l'encolure", "Le lien entre le contact et le mouvement vers l'avant", "La relation entre les mains, l'assiette et les jambes", "Le confort et la confiance du cheval"],
        en: ["The hand following the movements of the neck", "The link between contact and forward movement", "The relationship between hands, seat and legs", "The horse's comfort and confidence"],
        es: ["La mano que sigue los movimientos del cuello", "El vínculo entre el contacto y el movimiento hacia delante", "La relación entre manos, asiento y piernas", "La comodidad y la confianza del caballo"],
        it: ["La mano che segue i movimenti dell'incollatura", "Il legame tra contatto e movimento in avanti", "La relazione tra mani, assetto e gambe", "Il comfort e la fiducia del cavallo"],
        ja: ["首の動きに従う手", "コンタクトと前進の動きのつながり", "手、騎座、脚の関係", "馬の快適さと信頼"],
        de: ["Die Hand, die den Bewegungen des Halses folgt", "Die Verbindung zwischen Anlehnung und Vorwärtsbewegung", "Das Verhältnis von Händen, Sitz und Beinen", "Der Komfort und das Vertrauen des Pferdes"]
      }
    },
    {
      id: "v-contact-02", yt: "_NDiPIGzdLk",
      source: "IFCE", intervenant: "Géraldine Vandevenne",
      intervenantRole: { fr: "Ergonome équin, spécialiste des mors", en: "Equine ergonomist, bitting specialist", es: "Ergónoma equina, especialista en bocados", it: "Ergonoma equina, specialista dei morsi", ja: "馬のエルゴノミスト、ハミの専門家", de: "Pferde-Ergonomin, Gebiss-Spezialistin" },
      titreSource: "Les mors : leurs actions dans la bouche du cheval, leurs effets et leurs conséquences",
      doc: "https://www.ifce.fr/dir-wbc-contact-1-2-g-vandevenne/",
      langueVideo: "fr", cours: ["g4-contact"], galop: 4, theme: "soins-et-materiel",
      rang: "approfondir", dureeTranche: "plus8", verifie: "2026-07-29",
      titre: {
        fr: "Les mors et leur action dans la bouche",
        en: "Bits and how they act in the mouth",
        es: "Los bocados y su acción en la boca",
        it: "I morsi e la loro azione nella bocca",
        ja: "ハミと、口の中でのその作用",
        de: "Gebisse und ihre Wirkung im Maul"
      },
      resume: {
        fr: "Sur quelles parties du corps le mors agit-il, et à partir de quand devient-il un instrument de douleur ?",
        en: "Which parts of the body does the bit act on, and when does it become an instrument of pain?",
        es: "¿Sobre qué partes del cuerpo actúa el bocado, y cuándo se convierte en un instrumento de dolor?",
        it: "Su quali parti del corpo agisce il morso, e da quando diventa uno strumento di dolore?",
        ja: "ハミは体のどの部分に作用し、どこから痛みの道具になるのか。",
        de: "Auf welche Körperteile wirkt das Gebiss, und ab wann wird es zu einem Instrument des Schmerzes?"
      }
    },
    {
      id: "v-contact-03", yt: "_-jWx21-oqk",
      source: "IFCE", intervenant: "Stéphane Montavon",
      intervenantRole: { fr: "Docteur vétérinaire, médecine équine sportive", en: "Veterinarian, equine sports medicine", es: "Doctor veterinario, medicina equina deportiva", it: "Dottore veterinario, medicina equina sportiva", ja: "獣医師、馬のスポーツ医学", de: "Tierarzt, Pferdesportmedizin" },
      titreSource: "Les aspects biomécaniques du contact, la relation avec l'engagement et avec l'équilibre",
      doc: "https://www.ifce.fr/dir-wbc-contact-1-3-s-montavon/",
      langueVideo: "fr", cours: ["g4-contact", "g4-biomeca"], galop: 4, theme: "comprendre-le-cheval",
      rang: "approfondir", dureeTranche: "plus8", verifie: "2026-07-29",
      titre: {
        fr: "Contact, engagement et équilibre",
        en: "Contact, engagement and balance",
        es: "Contacto, enganche y equilibrio",
        it: "Contatto, impegno ed equilibrio",
        ja: "コンタクト、踏み込み、バランス",
        de: "Anlehnung, Hinterhandaktivität und Gleichgewicht"
      },
      resume: {
        fr: "Comment un contact juste laisse passer la poussée des postérieurs vers l'avant-main, et permet au garrot de s'élever.",
        en: "How a correct contact lets the drive from the hindquarters travel to the forehand, allowing the withers to lift.",
        es: "Cómo un contacto justo deja pasar el impulso de los posteriores hacia la mano delantera y permite que la cruz se eleve.",
        it: "Come un contatto giusto lascia passare la spinta dei posteriori verso l'anteriore, permettendo al garrese di elevarsi.",
        ja: "正しいコンタクトが後肢の推進を前躯へ通し、き甲を持ち上げさせる仕組み。",
        de: "Wie eine korrekte Anlehnung den Schub der Hinterhand zur Vorhand durchlässt und den Widerrist anheben lässt."
      }
    },
    {
      id: "v-incurvation-01", yt: "yloDh58eMQk",
      source: "", intervenant: "",
      titreSource: "L'incurvation - Séance montée",
      langueVideo: "fr", cours: ["g4-incurvation"], galop: 4, theme: "position-du-cavalier",
      rang: "principal", dureeTranche: "", verifie: "2026-07-29",
      titre: {
        fr: "Comprendre l'incurvation en selle",
        en: "Understanding bend in the saddle",
        es: "Comprender la incurvación a caballo",
        it: "Capire l'incurvamento in sella",
        ja: "騎乗しての内方姿勢を理解する",
        de: "Stellung und Biegung im Sattel verstehen"
      },
      resume: {
        fr: "Une séance montée pour voir quand, pourquoi et comment demander l'incurvation : la vidéo la plus accessible sur ce sujet.",
        en: "A ridden session showing when, why and how to ask for bend: the most accessible video on this topic.",
        es: "Una sesión montada para ver cuándo, por qué y cómo pedir la incurvación: el vídeo más accesible sobre este tema.",
        it: "Una sessione montata per vedere quando, perché e come chiedere l'incurvamento: il video più accessibile su questo tema.",
        ja: "内方姿勢をいつ、なぜ、どのように求めるかを見る実技セッション。このテーマでもっとも分かりやすい映像。",
        de: "Eine gerittene Einheit, die zeigt, wann, warum und wie man Biegung verlangt: das zugänglichste Video zu diesem Thema."
      },
      observer: {
        fr: ["Le moment où le cavalier demande l'incurvation", "La coordination entre la jambe intérieure et la rêne extérieure", "La légèreté de la main intérieure", "La réaction du cheval sur la courbe"],
        en: ["The moment the rider asks for bend", "The coordination between the inside leg and the outside rein", "The lightness of the inside hand", "The horse's reaction on the curve"],
        es: ["El momento en que el jinete pide la incurvación", "La coordinación entre la pierna interior y la rienda exterior", "La ligereza de la mano interior", "La reacción del caballo en la curva"],
        it: ["Il momento in cui il cavaliere chiede l'incurvamento", "La coordinazione tra la gamba interna e la redine esterna", "La leggerezza della mano interna", "La reazione del cavallo sulla curva"],
        ja: ["乗り手が内方姿勢を求める瞬間", "内方の脚と外方の手綱の連係", "内方の手の軽さ", "曲線上での馬の反応"],
        de: ["Der Moment, in dem der Reiter Biegung verlangt", "Das Zusammenspiel von innerem Bein und äußerem Zügel", "Die Leichtigkeit der inneren Hand", "Die Reaktion des Pferdes auf der Kurve"]
      }
    },
    {
      id: "v-aides-01", yt: "do-xy3MlB08",
      source: "", intervenant: "",
      titreSource: "Galop 4, 5 l'incurvation et l'utilisation des aides",
      langueVideo: "fr", cours: ["g4-aides", "g4-incurvation"], galop: 4, theme: "position-du-cavalier",
      rang: "principal", dureeTranche: "", verifie: "2026-07-29",
      titre: {
        fr: "Comprendre comment coordonner ses aides",
        en: "Understanding how to coordinate your aids",
        es: "Comprender cómo coordinar las ayudas",
        it: "Capire come coordinare i propri aiuti",
        ja: "扶助をどう連係させるかを理解する",
        de: "Verstehen, wie man seine Hilfen abstimmt"
      },
      resume: {
        fr: "L'accord des aides sur une courbe : le pli, l'incurvation, et la différence entre plier l'encolure et faire tourner tout le cheval.",
        en: "Coordinating the aids on a curve: the flexion, the bend, and the difference between bending the neck and turning the whole horse.",
        es: "El acuerdo de las ayudas en una curva: el pliegue, la incurvación y la diferencia entre plegar el cuello y hacer girar a todo el caballo.",
        it: "L'accordo degli aiuti su una curva: la piega, l'incurvamento e la differenza tra flettere l'incollatura e far girare tutto il cavallo.",
        ja: "曲線上での扶助の一致。屈曲、内方姿勢、そして首を曲げることと馬全体を回すことの違い。",
        de: "Das Zusammenspiel der Hilfen im Bogen: die Stellung, die Biegung, und der Unterschied zwischen Halsbiegung und dem Wenden des ganzen Pferdes."
      },
      observer: {
        fr: ["Le rôle de la jambe intérieure", "Le rôle des aides extérieures", "La coordination entre les jambes et les mains", "La différence entre plier l'encolure et faire tourner tout le cheval", "Le maintien de l'impulsion pendant la demande"],
        en: ["The role of the inside leg", "The role of the outside aids", "The coordination between legs and hands", "The difference between bending the neck and turning the whole horse", "Keeping the impulsion during the request"],
        es: ["El papel de la pierna interior", "El papel de las ayudas exteriores", "La coordinación entre piernas y manos", "La diferencia entre plegar el cuello y hacer girar a todo el caballo", "El mantenimiento de la impulsión durante la demanda"],
        it: ["Il ruolo della gamba interna", "Il ruolo degli aiuti esterni", "La coordinazione tra gambe e mani", "La differenza tra flettere l'incollatura e far girare tutto il cavallo", "Il mantenimento dell'impulso durante la richiesta"],
        ja: ["内方の脚の役割", "外方の扶助の役割", "脚と手の連係", "首を曲げることと馬全体を回すことの違い", "要求のあいだ推進を保つこと"],
        de: ["Die Rolle des inneren Beins", "Die Rolle der äußeren Hilfen", "Das Zusammenspiel von Beinen und Händen", "Der Unterschied zwischen Halsbiegung und dem Wenden des ganzen Pferdes", "Den Schwung während der Hilfengebung erhalten"]
      }
    },
    {
      id: "v-aides-02", yt: "liF7Odcx6F8",
      source: "Horseman Club", intervenant: "",
      titreSource: "Les secrets de l'indépendance des aides",
      langueVideo: "fr", cours: ["g4-aides"], galop: 4, theme: "position-du-cavalier",
      rang: "approfondir", dureeTranche: "", verifie: "2026-07-29",
      titre: {
        fr: "L'indépendance des aides",
        en: "Independence of the aids",
        es: "La independencia de las ayudas",
        it: "L'indipendenza degli aiuti",
        ja: "扶助の独立",
        de: "Die Unabhängigkeit der Hilfen"
      },
      resume: {
        fr: "Agir d'une jambe sans tirer, fermer les doigts sans bloquer le reste du corps, tourner le regard sans se déséquilibrer.",
        en: "Using one leg without pulling, closing the fingers without locking the rest of the body, turning the eyes without losing balance.",
        es: "Actuar con una pierna sin tirar, cerrar los dedos sin bloquear el resto del cuerpo, girar la mirada sin desequilibrarse.",
        it: "Agire con una gamba senza tirare, chiudere le dita senza bloccare il resto del corpo, girare lo sguardo senza squilibrarsi.",
        ja: "引かずに片脚で作用する。体の残りを固めずに指を閉じる。バランスを崩さずに視線を向ける。",
        de: "Mit einem Bein wirken ohne zu ziehen, die Finger schließen ohne den übrigen Körper festzumachen, den Blick wenden ohne das Gleichgewicht zu verlieren."
      }
    },
    {
      id: "v-aides-03", yt: "M4t3qcqeDsY",
      source: "", intervenant: "",
      titreSource: "Le dosage des aides pour mieux se faire comprendre de son cheval",
      langueVideo: "fr", cours: ["g4-aides"], galop: 4, theme: "position-du-cavalier",
      rang: "approfondir", dureeTranche: "", verifie: "2026-07-29",
      note: "Aborde aussi la voix, le stick et la cravache — hors sujet du chapitre, à ne pas mettre en vidéo principale.",
      titre: {
        fr: "Le dosage des aides",
        en: "Getting the strength of the aids right",
        es: "La dosificación de las ayudas",
        it: "Il dosaggio degli aiuti",
        ja: "扶助の加減",
        de: "Die Dosierung der Hilfen"
      },
      resume: {
        fr: "Une demande claire, progressive, suivie d'un relâchement : l'illustration directe de « la plus petite aide efficace ».",
        en: "A clear, progressive request followed by a release: a direct illustration of \u201cthe smallest aid that works\u201d.",
        es: "Una demanda clara, progresiva, seguida de un relajamiento: la ilustración directa de «la ayuda más pequeña que funciona».",
        it: "Una richiesta chiara, progressiva, seguita da un rilascio: l'illustrazione diretta del «più piccolo aiuto efficace».",
        ja: "はっきりと、段階的に求め、そして解放する。「効く最小の扶助」をそのまま示す内容。",
        de: "Eine klare, abgestufte Hilfe mit anschließendem Nachgeben: die direkte Veranschaulichung der \u201ekleinsten Hilfe, die wirkt\u201c."
      }
    },
    /* ============================================================
       06/08/2026 · SERIE « OBJECTIF GALOP® » DE LA FFE
       Sept films par niveau, pour les Galops 1 a 4, tournes au Parc
       Equestre Federal de Lamotte et au Poney-Club d'Orleans, diffuses
       d'abord sur Equidia a l'automne 2015 puis mis en visionnage
       gratuit. C'est le registre qui manquait : les webconferences IFCE
       s'adressent a des professionnels, ce qui explique que les six
       premieres videos du catalogue soient toutes en Galop 4.
       Les cinq liens ci-dessous ont ete ouverts par Blandine le
       06/08/2026 : les cinq repondent, duree 3 min 30 a 3 min 45,
       d'ou dureeTranche "moyen" pour tous.
       Trois des sept films du Galop 1 restent a trouver.
       Des films de Galop 2 existent aussi : a ajouter ensuite.
       RESERVE : ce sont des films sous droits FFE. Hype est un produit
       payant qui recoupe les Guides Federaux ; un accord ecrit avec la
       FFE est a obtenir avant d'en faire un pilier de l'application.
       ============================================================ */
    {
      id: "v-g1-aborder", yt: "0IQaRtCxcFA",
      source: "FFE", titreSource: "Objectif Galop® 1 : Aborder son cheval",
      langueVideo: "fr", cours: ["g1-c15", "g1-c18"], galop: 1, theme: "securite",
      rang: "principal", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "Aborder son cheval",
        en: "Approaching your horse",
        es: "Abordar a su caballo",
        it: "Avvicinarsi al proprio cavallo",
        ja: "馬に近づく",
        de: "An das Pferd herantreten"
      },
      resume: {
        fr: "Se faire voir, se faire entendre, puis toucher : l'ordre des gestes qui font qu'un cheval ne sursaute pas.",
        en: "Be seen, be heard, then touch: the order of gestures that keeps a horse from startling.",
        es: "Hacerse ver, hacerse oír, y luego tocar: el orden de los gestos que evita que un caballo se sobresalte.",
        it: "Farsi vedere, farsi sentire, poi toccare: l'ordine dei gesti che evita che un cavallo si spaventi.",
        ja: "まず見てもらい、声をかけ、それから触れる。馬を驚かせないための順番。",
        de: "Gesehen werden, gehört werden, dann berühren: die Reihenfolge, die ein Pferd nicht erschrecken lässt."
      },
      observer: {
        fr: ["La position du cavalier par rapport a l'œil du cheval", "La voix avant la main", "Le premier point de contact sur l'encolure", "Le changement de cote"],
        en: ["Where the rider stands in relation to the horse's eye", "Voice before hand", "The first point of contact on the neck", "Changing sides"],
        es: ["La posición del jinete respecto al ojo del caballo", "La voz antes que la mano", "El primer punto de contacto en el cuello", "El cambio de lado"],
        it: ["La posizione del cavaliere rispetto all'occhio del cavallo", "La voce prima della mano", "Il primo punto di contatto sull'incollatura", "Il cambio di lato"],
        ja: ["馬の目に対する位置", "手より先に声", "首への最初の接触", "左右の入れ替わり"],
        de: ["Die Position des Reiters zum Auge des Pferdes", "Die Stimme vor der Hand", "Der erste Kontaktpunkt am Hals", "Der Seitenwechsel"]
      }
    },
    {
      id: "v-g1-licol", yt: "GyQiZIse010",
      source: "FFE", titreSource: "Objectif Galop® 1 : Mettre le licol",
      langueVideo: "fr", cours: ["g1-c10", "g1-c8"], galop: 1, theme: "soins-et-materiel",
      rang: "principal", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "Mettre le licol",
        en: "Putting on the halter",
        es: "Poner el cabestro",
        it: "Mettere la testiera",
        ja: "絵口をつける",
        de: "Das Halfter anlegen"
      },
      resume: {
        fr: "Chaque partie du licol a un nom et une place. Le film montre le geste complet, sans precipitation.",
        en: "Every part of the halter has a name and a place. The film shows the whole sequence, unhurried.",
        es: "Cada parte del cabestro tiene un nombre y un lugar. El vídeo muestra el gesto completo, sin prisa.",
        it: "Ogni parte della testiera ha un nome e un posto. Il film mostra il gesto completo, senza fretta.",
        ja: "絵口の各部には名前と位置がある。あわてずに、一連の動作を見せる。",
        de: "Jeder Teil des Halfters hat einen Namen und einen Platz. Der Film zeigt den ganzen Ablauf, ohne Eile."
      }
    },
    {
      id: "v-g1-mener", yt: "LhxKlloAFiQ",
      source: "FFE", titreSource: "Objectif Galop® 1 : Mener son cheval",
      langueVideo: "fr", cours: ["g1-c18"], galop: 1, theme: "travail-a-pied",
      rang: "principal", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "Mener son cheval en main",
        en: "Leading your horse in hand",
        es: "Llevar a su caballo de la mano",
        it: "Condurre il cavallo a mano",
        ja: "馬を引く",
        de: "Das Pferd an der Hand führen"
      },
      resume: {
        fr: "A la hauteur de l'épaule, jamais devant, jamais derriere. Ou se placer, comment tenir la longe, comment tourner.",
        en: "Level with the shoulder, never in front, never behind. Where to stand, how to hold the rope, how to turn.",
        es: "A la altura del hombro, nunca delante, nunca detrás. Dónde colocarse, cómo sujetar la cuerda, cómo girar.",
        it: "All'altezza della spalla, mai davanti, mai dietro. Dove mettersi, come tenere la longhina, come girare.",
        ja: "肩の位置で、前すぎず後ろすぎず。立ち位置、索の持ち方、曲がるときの動き。",
        de: "Auf Höhe der Schulter, nie davor, nie dahinter. Wo man geht, wie man den Strick hält, wie man wendet."
      },
      observer: {
        fr: ["La place du cavalier a hauteur d'epaule", "La main qui ne tire pas", "Le regard porte la ou l'on va", "Le tour effectue en poussant, pas en tirant"],
        en: ["The handler level with the shoulder", "The hand that does not pull", "Eyes on where you are going", "Turning by pushing, not pulling"],
        es: ["El sitio del jinete a la altura del hombro", "La mano que no tira", "La mirada puesta donde se va", "El giro empujando, no tirando"],
        it: ["Il posto del cavaliere all'altezza della spalla", "La mano che non tira", "Lo sguardo dove si va", "La girata spingendo, non tirando"],
        ja: ["肩の横に並ぶ位置", "引っ張らない手", "進む先を見る目線", "引かずに押して回る"],
        de: ["Der Platz auf Höhe der Schulter", "Die Hand, die nicht zieht", "Der Blick dorthin, wohin man geht", "Die Wendung durch Schieben, nicht Ziehen"]
      }
    },
    {
      id: "v-g1-montoir", yt: "X16vL91kFqM",
      source: "FFE", titreSource: "Objectif Galop® 1 : Monter et descendre",
      langueVideo: "fr", cours: ["g1-c19"], galop: 1, theme: "position-du-cavalier",
      rang: "principal", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "Monter et descendre",
        en: "Mounting and dismounting",
        es: "Montar y desmontar",
        it: "Salire e scendere",
        ja: "乗ると降りる",
        de: "Aufsteigen und Absteigen"
      },
      resume: {
        fr: "Le montoir, les renes tenues, le pied qui ne pousse pas dans le flanc, et une descente qui ne surprend personne.",
        en: "The mounting block, reins in hand, a foot that does not dig into the flank, and a dismount that surprises no one.",
        es: "El montador, las riendas en la mano, el pie que no empuja el flanco, y una bajada que no sorprende a nadie.",
        it: "Il montatoio, le redini in mano, il piede che non spinge nel fianco, e una discesa che non sorprende nessuno.",
        ja: "踏台、手継の持ち方、脅を押さない足、そして馬を驚かせない下馬。",
        de: "Die Aufstiegshilfe, die Zügel in der Hand, ein Fuß, der nicht in die Flanke drückt, und ein Absteigen, das niemanden überrascht."
      }
    },
    {
      id: "v-g1-pansage", yt: "UpUmD2Ht4fc",
      source: "FFE", titreSource: "Objectif Galop® 3 : Le pansage",
      langueVideo: "fr", cours: ["g1-c2"], galop: 1, theme: "soins-et-materiel",
      rang: "approfondir", dureeTranche: "moyen", verifie: "2026-08-06",
      titre: {
        fr: "Le pansage, geste par geste",
        en: "Grooming, step by step",
        es: "El acicalado, gesto a gesto",
        it: "La pulizia, gesto per gesto",
        ja: "手入れを一つずつ",
        de: "Die Fellpflege, Schritt für Schritt"
      },
      resume: {
        fr: "Film tourne pour le Galop 3, donc il va plus loin que le programme du Galop 1 : l'ordre des brosses y est montre en entier.",
        en: "Filmed for Level 3, so it goes beyond the Level 1 syllabus: the full order of the brushes is shown.",
        es: "Vídeo rodado para el Galop 3, por lo que va más allá del programa del Galop 1: se muestra el orden completo de los cepillos.",
        it: "Girato per il Galoppo 3, quindi va oltre il programma del Galoppo 1: l'ordine delle spazzole è mostrato per intero.",
        ja: "ガロー3向けに撮られたため、ガロー1の範囲を超える。ブラシの順番がすべて示される。",
        de: "Für Galopp 3 gedreht, geht also über das Programm von Galopp 1 hinaus: die Reihenfolge der Bürsten wird vollständig gezeigt."
      }
    },
    /* --- Galop 2, meme serie FFE. Deux films trouves sur les sept annonces.
       verifie VIDE : ces deux liens n'ont pas pu etre ouverts (429 YouTube).
       Ils sont donc ecartes de la bibliotheque par INCLURE_NON_VERIFIEES.
       Inscrire la date du jour ici quand Blandine aura confirme, et remplir
       dureeTranche a ce moment-la ("court", "moyen" ou "plus8"). --- */
    {
      id: "v-g2-premiers-sauts", yt: "MfzFo_IeSa8",
      source: "FFE", titreSource: "Objectif Galop\u00ae 2 : Premiers sauts",
      langueVideo: "fr", cours: ["g2-c4"], galop: 2, theme: "obstacle",
      rang: "principal", dureeTranche: "", verifie: "",
      titre: {
        fr: "Les premiers sauts",
        en: "First jumps",
        es: "Los primeros saltos",
        it: "I primi salti",
        ja: "\u306f\u3058\u3081\u306e\u8df3\u8e8d",
        de: "Die ersten Spr\u00fcnge"
      },
      resume: {
        fr: "Franchir un premier obstacle sans rien brusquer : l'abord, l'equilibre sur les etriers, et le regard qui passe par-dessus.",
        en: "Taking a first fence without rushing anything: the approach, balance on the stirrups, and eyes looking beyond.",
        es: "Franquear un primer obst\u00e1culo sin brusquedad: la aproximaci\u00f3n, el equilibrio sobre los estribos y la mirada m\u00e1s all\u00e1.",
        it: "Superare il primo ostacolo senza forzare nulla: l'avvicinamento, l'equilibrio sulle staffe e lo sguardo oltre.",
        ja: "\u7121\u7406\u306e\u306a\u3044\u521d\u3081\u3066\u306e\u8df3\u8e8d\u3002\u30a2\u30d7\u30ed\u30fc\u30c1\u3001\u9419\u306e\u4e0a\u3067\u306e\u30d0\u30e9\u30f3\u30b9\u3001\u305d\u3057\u3066\u5148\u3092\u898b\u308b\u76ee\u7dda\u3002",
        de: "Ein erstes Hindernis ohne Hast \u00fcberwinden: das Heranreiten, das Gleichgewicht in den B\u00fcgeln und der Blick dar\u00fcber hinaus."
      }
    },
    {
      id: "v-g2-parcours", yt: "fYEuHOQ-WE0",
      source: "FFE", titreSource: "Objectif Galop\u00ae 2 : Parcours type Galop\u00ae 2",
      langueVideo: "fr", cours: ["g2-c4", "g2-c3"], galop: 2, theme: "obstacle",
      rang: "approfondir", dureeTranche: "", verifie: "",
      titre: {
        fr: "Un parcours type",
        en: "A model course",
        es: "Un recorrido tipo",
        it: "Un percorso tipo",
        ja: "\u6a19\u6e96\u7684\u306a\u30b3\u30fc\u30b9",
        de: "Ein Musterparcours"
      },
      resume: {
        fr: "A quoi ressemble le parcours attendu au Galop 2, du premier tracé au dernier arrêt.",
        en: "What the Level 2 course actually looks like, from the first line to the final halt.",
        es: "C\u00f3mo es el recorrido esperado en el Galop 2, del primer trazado a la \u00faltima parada.",
        it: "Com'\u00e8 fatto il percorso richiesto al Galoppo 2, dal primo tracciato all'ultimo arresto.",
        ja: "\u30ac\u30ed\u30fc2\u3067\u6c42\u3081\u3089\u308c\u308b\u30b3\u30fc\u30b9\u306e\u5168\u4f53\u50cf\u3002\u6700\u521d\u306e\u30e9\u30a4\u30f3\u304b\u3089\u6700\u5f8c\u306e\u505c\u6b62\u307e\u3067\u3002",
        de: "Wie der beim Galopp 2 erwartete Parcours aussieht, von der ersten Linie bis zum letzten Halten."
      }
    }
  ];

  /* Forme interne utilisée par les écrans. On ne recopie pas les données :
     on les dérive, pour que HYPE_VIDEOS reste la seule source de vérité. */
  var VIDS = HYPE_VIDEOS
    .filter(function (v) { return INCLURE_NON_VERIFIEES || !!v.verifie; })
    .map(function (v) {
      return {
        id: v.id,
        src: v.yt ? { type: "youtube", ref: v.yt } : null,
        vignetteUrl: v.yt ? ("https://i.ytimg.com/vi/" + v.yt + "/hqdefault.jpg") : null,
        coursId: (v.cours && v.cours[0]) || "",
        coursTous: v.cours || [],
        galop: v.galop || 4,
        theme: THEME_MAP[v.theme] || "dressage",
        rang: v.rang || "approfondir",
        dureeTranche: v.dureeTranche || "",
        premium: false,
        langueVideo: v.langueVideo || "fr",
        source: v.source || "",
        intervenant: v.intervenant || "",
        intervenantRole: v.intervenantRole || null,
        doc: v.doc || "",
        titreSource: v.titreSource || "",
        verifie: v.verifie || "",
        i18nTitre: v.titre, i18nResume: v.resume, i18nObserver: v.observer || null
      };
    });

  /* ---------------- RÉSERVE D'ANIMATIONS (MODÉRATEURS UNIQUEMENT) ----------------
     Les animations produites pour Hype, rangées ici pour qu'on sache où elles
     sont et dans quel état elles sont. Cette section n'apparaît QUE pour les
     comptes de HYPE_MODERATEURS : ce n'est pas du contenu pédagogique.
     Fichiers servis par Netlify depuis images/ — pas de YouTube, pas de tiers.
     Toute animation livrée doit être ajoutée ici. */
  var ANIMS = [
    /* --- Déjà placées nulle part, destination pressentie : accueil --- */
    { id: "anim-cheval", fichier: "images/hype-anim-cheval", dossier: "Accueil", duree: "5,1 s", poids: "202 Ko",
      titre: "Tête de cheval sur ciel étoilé",
      resume: "Réencodée depuis le HEVC d'origine (1,88 Mo). ⚠️ Finit sur le logo HYPE suivi de « TON UNIVERS ÉQUESREE » — faute incrustée dans l'image. Fin à couper vers 3,8 s." },
    { id: "anim-rideaux", fichier: "images/hype-anim-rideaux", dossier: "Bibliothèque vidéo", duree: "5,1 s", poids: "388 Ko",
      titre: "Portes qui s'ouvrent sur la lumière",
      resume: "Réencodée depuis le HEVC d'origine (1,46 Mo). ⚠️ Finit sur « TON UNIVERS ÉQUESTIEE » — faute incrustée. Fin à couper vers 4,3 s." },

    /* --- Palmarès : quatre variantes de couleur, déjà encodées proprement --- */
    { id: "palmares-dore", fichier: "images/palmares-dore", dossier: "Palmarès", duree: "6,3 s", poids: "359 Ko",
      titre: "Palmarès — doré", resume: "H.264, sans audio, 644×480. Prête à l'emploi." },
    { id: "palmares-vert", fichier: "images/palmares-vert", dossier: "Palmarès", duree: "6,8 s", poids: "292 Ko",
      titre: "Palmarès — vert", resume: "H.264, sans audio, 644×480. Déjà en ligne. Lisible partout, y compris Android." },
    { id: "palmares-bordeaux", fichier: "images/palmares-bordeaux", dossier: "Palmarès", duree: "4,5 s", poids: "210 Ko",
      titre: "Palmarès — bordeaux", resume: "H.264, sans audio, 644×480. Prête à l'emploi." },
    { id: "palmares-crystal", fichier: "images/palmares-crystal", dossier: "Palmarès", duree: "5,7 s", poids: "345 Ko",
      titre: "Palmarès — crystal", resume: "H.264, sans audio, 644×480. Prête à l'emploi." },

    /* --- Mascotte --- */
    { id: "mascotte-dodo", fichier: "images/heybaby-dodo", dossier: "Mascotte", duree: "5,1 s", poids: "92 Ko",
      titre: "Mascotte — dodo", resume: "H.264, 560×240 : format bandeau large, pas interchangeable avec la messagerie." },
    { id: "mascotte-messagerie", fichier: "images/heybaby-messagerie", dossier: "Mascotte", duree: "5,1 s", poids: "214 Ko",
      titre: "Mascotte — messagerie", resume: "H.264, 560×416 : format presque carré." },

    /* --- Lot de 12 scènes, réencodées le 31/07, à trier (accueil ou saut) --- */
    { id: "accueil-01", fichier: "images/hype-accueil-01", dossier: "Accueil · à trier", duree: "3,3 s", poids: "" , titre: "Scène 01", resume: "À trier : accueil ou saut." },
    { id: "accueil-02", fichier: "images/hype-accueil-02", dossier: "Accueil · à trier", duree: "3,0 s", poids: "", titre: "Scène 02", resume: "À trier : accueil ou saut." },
    { id: "accueil-03", fichier: "images/hype-accueil-03", dossier: "Accueil · à trier", duree: "5,1 s", poids: "", titre: "Scène 03", resume: "À trier : accueil ou saut." },
    { id: "accueil-04", fichier: "images/hype-accueil-04", dossier: "Accueil · à trier", duree: "5,1 s", poids: "", titre: "Scène 04", resume: "À trier : accueil ou saut." },
    { id: "accueil-05", fichier: "images/hype-accueil-05", dossier: "Accueil · à trier", duree: "5,1 s", poids: "", titre: "Scène 05", resume: "À trier : accueil ou saut." },
    { id: "accueil-06", fichier: "images/hype-accueil-06", dossier: "Accueil · à trier", duree: "5,1 s", poids: "", titre: "Scène 06", resume: "À trier : accueil ou saut." },
    { id: "accueil-07", fichier: "images/hype-accueil-07", dossier: "Accueil · à trier", duree: "5,1 s", poids: "", titre: "Scène 07", resume: "À trier : accueil ou saut." },
    { id: "accueil-08", fichier: "images/hype-accueil-08", dossier: "Accueil · à trier", duree: "5,1 s", poids: "", titre: "Scène 08", resume: "À trier : accueil ou saut." },
    { id: "accueil-09", fichier: "images/hype-accueil-09", dossier: "Accueil · à trier", duree: "5,1 s", poids: "", titre: "Scène 09", resume: "À trier : accueil ou saut." },
    { id: "accueil-10", fichier: "images/hype-accueil-10", dossier: "Accueil · à trier", duree: "5,1 s", poids: "", titre: "Scène 10", resume: "À trier : accueil ou saut." },
    { id: "accueil-11", fichier: "images/hype-accueil-11", dossier: "Accueil · à trier", duree: "5,1 s", poids: "", titre: "Scène 11", resume: "À trier : accueil ou saut." },
    { id: "accueil-12", fichier: "images/hype-accueil-12", dossier: "Accueil · à trier", duree: "5,1 s", poids: "", titre: "Scène 12", resume: "À trier : accueil ou saut." }
  ].map(function (a2) {
    return {
      id: a2.id, estAnim: true,
      src: a2.fichier ? { type: "fichier", ref: a2.fichier } : null,
      vignetteUrl: a2.fichier ? (a2.fichier + "-poster.jpg") : null,
      coursId: "", coursTous: [], galop: null, theme: "cheval",
      rang: "approfondir", dureeTranche: "", premium: false, langueVideo: "fr",
      source: a2.dossier, intervenant: "", intervenantRole: null, doc: "",
      titreSource: a2.duree + (a2.poids ? (" · " + a2.poids) : ""), verifie: "2026-07-31",
      i18nTitre: { fr: a2.titre }, i18nResume: { fr: a2.resume }, i18nObserver: null
    };
  });

  /* ---------------- COLLECTIONS ÉDITORIALES ---------------- */
  var COLLS = [
    { id: "hvc-contact", sceau: "◉", format: "affiche",
      nom: { fr: "Le contact, du geste à la sensation", en: "Contact, from gesture to feel", es: "El contacto, del gesto a la sensación", it: "Il contatto, dal gesto alla sensazione", ja: "コンタクト — 動作から感覚へ", de: "Die Anlehnung, von der Hand zum Gefühl" },
      sous: { fr: "Le chapitre « Le contact » en vidéo", en: "The Contact chapter, in video", es: "El capítulo « El contacto » en vídeo", it: "Il capitolo « Il contatto » in video", ja: "「コンタクト」の章を動画で", de: "Das Kapitel Anlehnung als Video" },
      ids: ["v-contact-01", "v-contact-02", "v-contact-03"] },

    { id: "hvc-aides", sceau: "❖", format: "affiche",
      nom: { fr: "Mieux utiliser ses aides", en: "Using your aids better", es: "Usar mejor tus ayudas", it: "Usare meglio i propri aiuti", ja: "扶助をより上手に使う", de: "Die Hilfen besser einsetzen" },
      sous: { fr: "Le chapitre « L'accord des aides » en vidéo", en: "The Coordination of Aids chapter, in video", es: "El capítulo « El acuerdo de las ayudas » en vídeo", it: "Il capitolo « L'accordo degli aiuti » in video", ja: "「扶助の連携」の章を動画で", de: "Das Kapitel Hilfengebung als Video" },
      ids: ["v-aides-01", "v-aides-02", "v-aides-03"] },

    /* Angle « académie équestre » : on met en avant qui parle, pas seulement
       le sujet. C'est ce qui distingue d'une plateforme de streaming. */
    { id: "hvc-voix", sceau: "❋", format: "liste", parIntervenant: true,
      nom: { fr: "Paroles d'experts", en: "Expert voices", es: "Voces expertas", it: "Voci di esperti", ja: "専門家の声", de: "Stimmen der Fachleute" },
      sous: { fr: "Juges, vétérinaires et ergonomes, sur le contact", en: "Judges, vets and ergonomists on contact", es: "Jueces, veterinarios y ergónomos, sobre el contacto", it: "Giudici, veterinari ed ergonomi, sul contatto", ja: "審判員・獣医師・エルゴノミストが語るコンタクト", de: "Richter, Tierärzte und Ergonomen zur Anlehnung" },
      ids: ["v-contact-01", "v-contact-03", "v-contact-02"] }
  ];

  /* ---------------- UNIVERS ---------------- */
  var UNIVERS = [
    { k: "tous",     nom: { fr: "Tous", en: "All", es: "Todos", it: "Tutti", ja: "すべて", de: "Alle" } },
    { k: "position", nom: { fr: "Position du cavalier", en: "Rider position", es: "Posición del jinete", it: "Posizione del cavaliere", ja: "騎手の姿勢", de: "Sitz des Reiters" } },
    { k: "cheval",   nom: { fr: "Comprendre le cheval", en: "Understanding the horse", es: "Entender al caballo", it: "Capire il cavallo", ja: "馬を理解する", de: "Das Pferd verstehen" } },
    { k: "dressage", nom: { fr: "Dressage", en: "Dressage", es: "Doma", it: "Dressage", ja: "馬場馬術", de: "Dressur" } },
    { k: "obstacle", nom: { fr: "Obstacle", en: "Jumping", es: "Salto", it: "Salto ostacoli", ja: "障害飛越", de: "Springen" } },
    { k: "pied",     nom: { fr: "Travail à pied", en: "Groundwork", es: "Trabajo a pie", it: "Lavoro da terra", ja: "地上作業", de: "Bodenarbeit" } },
    { k: "soins",    nom: { fr: "Soins et préparation", en: "Care and preparation", es: "Cuidados y preparación", it: "Cura e preparazione", ja: "手入れと準備", de: "Pflege und Vorbereitung" } },
    { k: "securite", nom: { fr: "Sécurité", en: "Safety", es: "Seguridad", it: "Sicurezza", ja: "安全", de: "Sicherheit" } },
    { k: "baby",     nom: { fr: "Hey Baby", en: "Hey Baby", es: "Hey Baby", it: "Hey Baby", ja: "Hey Baby", de: "Hey Baby" } }
  ];

  var SUGGESTS = ["contact", "accord des aides", "position", "céder", "départ au galop", "coudes", "indépendance des aides", "équilibre"];

  /* ---------------- ÉTAT LOCAL (repli hors ligne / non connecté) ---------------- */
  var CLE_LOCALE = "hype_video_v1";
  function lireLocal() {
    try { return JSON.parse(localStorage.getItem(CLE_LOCALE) || "{}") || {}; } catch (e) { return {}; }
  }
  function ecrireLocal(o) {
    try { localStorage.setItem(CLE_LOCALE, JSON.stringify(o)); } catch (e) { }
  }

  /* Lecture Supabase (silencieuse : jamais bloquante) */
  function chargerDistant(cb) {
    if (typeof supa === "undefined" || typeof utilisateurActuel !== "function") { cb(null); return; }
    utilisateurActuel().then(function (u) {
      if (!u) { cb(null); return; }
      Promise.all([
        supa.from("video_progression").select("video_id,position_sec,terminee,vue_le,maj_le").eq("user_id", u.id),
        supa.from("video_favoris").select("video_id").eq("user_id", u.id)
      ]).then(function (r) {
        var etat = { prog: {}, fav: {} };
        var lp = (r[0] && r[0].data) || [];
        var lf = (r[1] && r[1].data) || [];
        lp.forEach(function (x) { etat.prog[x.video_id] = { ouverte: x.maj_le || null, vue: !!x.terminee, quand: x.vue_le || x.maj_le }; });
        lf.forEach(function (x) { etat.fav[x.video_id] = true; });
        cb(etat);
      }).catch(function () { cb(null); });
    }).catch(function () { cb(null); });
  }

  /* PAS DE POURCENTAGE DE LECTURE.
     Les vidéos sont jouées par un lecteur externe (YouTube) : l'app ne peut
     pas savoir où le cavalier s'est arrêté. On n'affiche donc jamais de barre
     ni de pourcentage — ce serait un chiffre inventé. On enregistre seulement
     deux faits vrais : la vidéo a été OUVERTE, et elle est marquée VUE.
     « Continuer à regarder » = la dernière ouverte qui n'est pas marquée vue.
     Si un jour Blandine tourne ses propres vidéos, on pourra brancher un vrai
     suivi de lecture : la colonne position_sec existe déjà en base. */
  function enregistrerEtat(id, ouverte, terminee, duree) {
    var l = lireLocal();
    l.prog = l.prog || {};
    var ex = l.prog[id] || {};
    l.prog[id] = {
      ouverte: ouverte ? new Date().toISOString() : (ex.ouverte || null),
      vue: !!terminee,
      quand: new Date().toISOString()
    };
    ecrireLocal(l);
    if (typeof supa === "undefined") return;
    try {
      supa.rpc("video_enregistrer_progression", {
        p_video_id: id, p_position_sec: 0,
        p_duree_sec: Math.round(duree || 0), p_terminee: !!terminee
      }).then(function () { }, function () { });
    } catch (e) { }
  }

  /* Animations écartées. Choix assumé : stockage LOCAL (localStorage), pas
     Supabase. C'est un outil de tri interne, réversible, et un bouton dans
     l'app ne peut de toute façon PAS supprimer un fichier du dépôt GitHub —
     seul un push le peut. « Écarter » masque donc la ligne pour que Blandine
     fasse son tri ; la suppression réelle des fichiers se fait au push
     suivant, sur la liste qu'elle aura constituée. */
  function ecartees() {
    var l = lireLocal(); return l.ecart || {};
  }
  function ecarter(id, actif) {
    var l = lireLocal(); l.ecart = l.ecart || {};
    if (actif) { l.ecart[id] = true; } else { delete l.ecart[id]; }
    ecrireLocal(l);
  }

  function enregistrerFavori(id, actif) {
    var l = lireLocal();
    l.fav = l.fav || {};
    if (actif) { l.fav[id] = true; } else { delete l.fav[id]; }
    ecrireLocal(l);
    if (typeof supa === "undefined" || typeof utilisateurActuel !== "function") return;
    utilisateurActuel().then(function (u) {
      if (!u) return;
      if (actif) {
        supa.from("video_favoris").upsert({ user_id: u.id, video_id: id }).then(function () { }, function () { });
      } else {
        supa.from("video_favoris").delete().eq("user_id", u.id).eq("video_id", id).then(function () { }, function () { });
      }
    }).catch(function () { });
  }

  /* Une vidéo n'entre dans la bibliothèque que si elle a une source réelle.
     Les autres restent dans le fichier comme feuille de route de production
     (titres, points à observer, erreurs, mot du coach déjà écrits) mais ne
     s'affichent nulle part : une page pleine de cartes qui ne mènent à rien
     serait une page vide déguisée.
     Passer MONTRER_A_VENIR à true pour les voir en relecture. */
  var MONTRER_A_VENIR = false;
  function disponible(v) { return !!(v && v.src) || MONTRER_A_VENIR; }
  function catalogue() { return VIDS.filter(disponible); }

  /* ---------------- OUTILS ---------------- */
  function vidDe(id) {
    for (var i = 0; i < VIDS.length; i++) { if (VIDS[i].id === id) return VIDS[i]; }
    for (var j = 0; j < ANIMS.length; j++) { if (ANIMS[j].id === id) return ANIMS[j]; }
    return null;
  }
  function L(obj, langue) { if (!obj) return ""; return obj[langue] || obj.fr || ""; }

  /* Couverture procédurale : tenir lieu d'image tant qu'aucun visuel
     dédié n'existe. Deux arcs lumineux, teinte par thème. */
  /* Miniature : YouTube sert les vignettes gratuitement et à distance.
     Aucune image à pousser sur GitHub, aucune bande passante Netlify
     consommée. Repli sur le dégradé procédural si la source n'en a pas. */
  function vignette(v) { return (v && v.vignetteUrl) || null; }

  /* Libellé de durée. La passation ne donne pas de durée exacte pour les
     webconférences IFCE : on affiche la tranche, ou rien du tout plutôt
     qu'un chiffre inventé. */
  var TRANCHES = {
    court: { fr: "moins de 3 min", en: "under 3 min", es: "menos de 3 min", it: "meno di 3 min", ja: "3分未満", de: "unter 3 Min" },
    moyen: { fr: "3 à 8 min", en: "3 to 8 min", es: "3 a 8 min", it: "da 3 a 8 min", ja: "3〜8分", de: "3 bis 8 Min" },
    plus8: { fr: "format long", en: "long format", es: "formato largo", it: "formato lungo", ja: "長編", de: "Langformat" }
  };

  function fondCouv(v) {
    var th = THEMES[v.theme] || { teinte: 198 };
    var h1 = th.teinte, h2 = (h1 + 26) % 360;
    return "radial-gradient(120% 100% at 78% 12%, hsla(" + h2 + ",85%,58%,.40) 0%, transparent 58%),"
         + "radial-gradient(90% 80% at 15% 85%, hsla(" + h1 + ",70%,32%,.55) 0%, transparent 62%),"
         + "linear-gradient(155deg,#0C1520 0%,#070A0F 70%)";
  }

  /* ---------------- CSS (injecté une seule fois) ---------------- */
  var CSS_ID = "hype-video-css";
  var CSS = [
    ".hv-wrap{padding-bottom:26px}",
    ".hv-hero{position:relative;overflow:hidden;padding:calc(env(safe-area-inset-top) + 34px) 18px 24px;",
    "background:radial-gradient(120% 90% at 78% 8%,rgba(32,217,245,.20) 0%,transparent 55%),",
    "radial-gradient(90% 70% at 12% 30%,rgba(20,80,140,.28) 0%,transparent 60%),",
    "linear-gradient(180deg,#07111F 0%,#080B10 62%,#12161C 100%)}",
    ".hv-hero-anim{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.60;pointer-events:none}",
    ".hv-hero-voile{position:absolute;inset:0;pointer-events:none;",
    "background:linear-gradient(180deg,rgba(7,17,31,.34) 0%,rgba(7,17,31,.64) 55%,rgba(18,22,28,.94) 100%)}",
    ".hv-hero-in{position:relative}",
    ".hv-hero h1{font-family:'Cinzel',Georgia,serif;font-weight:500;font-size:29px;line-height:1.12;margin:10px 0 0;letter-spacing:.05em;color:#F4F6F7}",
    ".hv-hero h1 span{display:block;color:#20D9F5;text-shadow:0 0 26px rgba(32,217,245,.45)}",
    ".hv-kick{font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:#20D9F5;font-weight:500}",
    ".hv-sub{margin:11px 0 0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#C3CBD5;opacity:.75}",
    ".hv-stats{display:flex;gap:20px;margin-top:20px}",
    ".hv-stats b{font-family:'Cinzel',serif;font-size:17px;font-weight:500;display:block;color:#F4F6F7}",
    ".hv-stats i{font-style:normal;font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:#8A95A1}",
    ".hv-rech{margin:18px 18px 0;display:flex;align-items:center;gap:10px;border:1px solid #2A323D;border-radius:14px;padding:12px 14px;",
    "background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.03))}",
    ".hv-rech input{flex:1;min-width:0;background:none;border:none;outline:none;color:#F4F6F7;font-family:inherit;font-size:16px;font-weight:300}",
    ".hv-rech input::placeholder{color:#5C6573}",
    ".hv-sugs{display:flex;gap:7px;overflow-x:auto;padding:12px 18px 2px}",
    ".hv-sug{flex:0 0 auto;font-size:10.5px;color:#C3CBD5;border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:6px 12px;background:rgba(255,255,255,.02)}",
    ".hv-chips{display:flex;gap:8px;overflow-x:auto;padding:14px 18px 4px}",
    ".hv-chip{flex:0 0 auto;font-size:11px;letter-spacing:.05em;color:#C3CBD5;padding:9px 15px;border-radius:999px;",
    "border:1px solid #2A323D;background:rgba(255,255,255,.025);white-space:nowrap;transition:all .25s}",
    ".hv-chip.on{color:#031015;font-weight:600;border-color:transparent;background:linear-gradient(135deg,#7DEBFF,#20D9F5);box-shadow:0 0 24px rgba(32,217,245,.42)}",
    ".hv-filtres{flex:0 0 auto;display:flex;align-items:center;gap:7px;font-size:11px;color:#20D9F5;",
    "border:1px solid rgba(32,217,245,.35);border-radius:999px;padding:9px 14px;background:rgba(32,217,245,.07);white-space:nowrap}",
    ".hv-sec{padding:0 18px;margin-top:32px}",
    ".hv-sec h2{font-family:'Cinzel',serif;font-size:16px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;margin:0;color:#F4F6F7}",
    ".hv-sec p{font-size:11.5px;color:#8A95A1;margin:4px 0 0;line-height:1.5}",
    ".hv-cov{position:relative;overflow:hidden;background:#1B212A}",
    ".hv-cov .hv-arc{position:absolute;inset:0;opacity:.75}",
    ".hv-cov .hv-voile{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 30%,rgba(4,6,9,.55) 72%,rgba(4,6,9,.92) 100%)}",
    ".hv-duree{position:absolute;bottom:8px;right:8px;font-size:9.5px;letter-spacing:.1em;font-family:'Cinzel',serif;",
    "background:rgba(4,6,9,.7);border:1px solid rgba(255,255,255,.1);padding:3px 7px;border-radius:6px;color:#F4F6F7}",
    ".hv-gal{position:absolute;top:8px;left:8px;font-family:'Cinzel',serif;font-size:9.5px;letter-spacing:.12em;color:#C3CBD5;",
    "background:rgba(4,6,9,.6);border:1px solid rgba(255,255,255,.12);padding:3px 8px;border-radius:6px}",
    ".hv-tag{position:absolute;top:8px;right:8px;font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;padding:3px 8px;border-radius:6px}",
    ".hv-tag-soon{background:rgba(4,6,9,.72);color:#C3CBD5;border:1px solid rgba(255,255,255,.16)}",
    ".hv-tag-vue{background:rgba(4,6,9,.68);color:#8A95A1;border:1px solid rgba(255,255,255,.14)}",
    ".hv-lock{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(4,6,9,.55);font-size:18px}",
    ".hv-prog{position:absolute;left:0;right:0;bottom:0;height:2.5px;background:rgba(255,255,255,.14)}",
    ".hv-prog i{display:block;height:100%;background:linear-gradient(90deg,#20D9F5,#7DEBFF);box-shadow:0 0 10px rgba(32,217,245,.8)}",
    ".hv-sous{font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:#6E7A87;margin:3px 0 0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-family:'Montserrat',sans-serif}",
    ".hv-rail{display:flex;gap:12px;overflow-x:auto;padding:2px 18px 6px}",
    ".hv-carte{flex:0 0 148px;text-align:left;background:none;border:none;padding:0;color:inherit}",
    ".hv-carte .hv-cov{aspect-ratio:2/3;border-radius:14px;border:1px solid #2A323D}",
    ".hv-carte h4{font-size:12px;font-weight:400;line-height:1.35;margin:9px 0 0;color:#F4F6F7;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}",
    ".hv-carte p{font-size:9.5px;color:#8A95A1;margin:4px 0 0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}",
    ".hv-large{flex:0 0 250px;text-align:left;background:none;border:none;padding:0;color:inherit}",
    ".hv-large .hv-cov{aspect-ratio:16/9;border-radius:14px;border:1px solid #2A323D}",
    ".hv-large h4{font-size:12.5px;font-weight:400;line-height:1.35;margin:9px 0 0;color:#F4F6F7}",
    ".hv-large p{font-size:9.5px;color:#8A95A1;margin:4px 0 0}",
    ".hv-ligne{display:flex;gap:12px;align-items:center;width:100%;text-align:left;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.05);background:none;border-left:none;border-right:none;border-top:none;color:inherit}",
    ".hv-ligne .hv-num{font-family:'Cinzel',serif;font-size:13px;color:#3E4B57;width:18px;flex:0 0 18px;text-align:center}",
    ".hv-ligne .hv-cov{width:78px;flex:0 0 78px;aspect-ratio:16/10;border-radius:10px;border:1px solid #2A323D}",
    ".hv-ligne h4{font-size:12.5px;font-weight:400;margin:0;line-height:1.35;color:#F4F6F7;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}",
    ".hv-ligne .hv-meta{font-size:9.5px;color:#8A95A1;margin:5px 0 0;letter-spacing:.05em}",
    ".hv-fav{flex:0 0 auto;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:14px;color:#5C6573;background:none;border:none}",
    ".hv-fav.on{color:#20D9F5}",
    ".hv-une{position:relative;margin:0 18px;border-radius:22px;overflow:hidden;border:1px solid #2A323D;box-shadow:0 24px 60px -22px rgba(0,0,0,.95)}",
    ".hv-une{background:linear-gradient(180deg,#0C1420,#080B10)}",
    ".hv-une .hv-cov{aspect-ratio:16/9}",
    ".hv-une-txt{position:relative;padding:16px 18px 18px}",
    ".hv-une-txt h3{font-family:'Cinzel',serif;font-weight:500;font-size:19px;line-height:1.22;margin:8px 0 0;color:#F4F6F7;",
    "overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}",
    ".hv-une-txt .hv-desc{font-size:11.5px;color:#AAB6C2;line-height:1.55;margin:9px 0 0;",
    "overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}",
    ".hv-minis{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-top:12px}",
    ".hv-mini{font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:#C3CBD5;border:1px solid rgba(255,255,255,.14);border-radius:6px;padding:3px 8px;background:rgba(255,255,255,.03)}",
    ".hv-act{display:flex;gap:10px;margin-top:16px}",
    ".hv-btn{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:13px 14px;border-radius:12px;",
    "font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;border:none;font-family:inherit}",
    ".hv-btn-p{background:linear-gradient(135deg,#7DEBFF,#20D9F5);color:#031015;box-shadow:0 8px 30px -8px rgba(32,217,245,.7)}",
    ".hv-btn-s{background:rgba(255,255,255,.05);border:1px solid #2A323D;color:#F4F6F7;flex:0 0 auto;width:54px}",
    ".hv-btn-s.on{color:#20D9F5;border-color:rgba(32,217,245,.35);background:rgba(32,217,245,.1)}",
    ".hv-repr{margin:0 18px;display:flex;gap:13px;align-items:stretch;border:1px solid rgba(32,217,245,.22);border-radius:18px;padding:11px;",
    "background:linear-gradient(120deg,rgba(32,217,245,.10),rgba(255,255,255,.03) 55%);width:calc(100% - 36px);text-align:left;color:inherit}",
    ".hv-repr .hv-cov{width:104px;flex:0 0 104px;aspect-ratio:1/1;border-radius:12px}",
    ".hv-repr h4{font-size:13px;font-weight:500;margin:0;line-height:1.3;color:#F4F6F7}",
    ".hv-repr .hv-lie{font-size:10px;color:#8A95A1;margin:5px 0 0}",
    ".hv-barre{height:3px;border-radius:2px;background:rgba(255,255,255,.13);margin-top:10px;overflow:hidden}",
    ".hv-barre i{display:block;height:100%;background:linear-gradient(90deg,#20D9F5,#7DEBFF)}",
    ".hv-coll{margin-top:30px}",
    ".hv-coll-tete{display:flex;align-items:center;gap:11px;padding:0 18px;margin-bottom:12px}",
    ".hv-sceau{width:34px;height:34px;flex:0 0 34px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:14px;",
    "border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);color:#20D9F5}",
    ".hv-coll-tete h3{font-family:'Cinzel',serif;font-size:14px;font-weight:500;letter-spacing:.07em;margin:0;line-height:1.25;color:#F4F6F7}",
    ".hv-coll-tete p{font-size:10px;color:#8A95A1;margin:3px 0 0}",
    ".hv-fil{height:1px;margin:0 18px 14px;background:linear-gradient(90deg,rgba(32,217,245,.35),transparent)}",
    ".hv-galops{padding:24px 0 6px;margin-top:30px;background:radial-gradient(80% 100% at 50% 100%,rgba(32,217,245,.09),transparent 70%)}",
    ".hv-gscroll{display:flex;overflow-x:auto;padding:0 18px;align-items:flex-start}",
    ".hv-gnode{flex:0 0 74px;position:relative;display:flex;flex-direction:column;align-items:center;padding-top:6px;background:none;border:none;color:inherit}",
    ".hv-gnode:before{content:'';position:absolute;top:36px;left:0;right:0;height:1px;background:linear-gradient(90deg,rgba(32,217,245,.12),rgba(32,217,245,.30),rgba(32,217,245,.12))}",
    ".hv-gnode:first-child:before{left:50%}.hv-gnode:last-child:before{right:50%}",
    ".hv-cristal{position:relative;z-index:2;width:52px;height:60px;display:flex;align-items:center;justify-content:center;",
    "-webkit-clip-path:polygon(50% 0,100% 26%,100% 74%,50% 100%,0 74%,0 26%);clip-path:polygon(50% 0,100% 26%,100% 74%,50% 100%,0 74%,0 26%);",
    "background:linear-gradient(160deg,rgba(255,255,255,.13),rgba(255,255,255,.03));transition:all .3s}",
    ".hv-cristal b{font-family:'Cinzel',serif;font-size:19px;font-weight:500;color:#C3CBD5}",
    ".hv-gnode.on .hv-cristal{background:linear-gradient(160deg,#8DEEFF,#20D9F5);transform:translateY(-3px) scale(1.06);box-shadow:0 0 34px rgba(32,217,245,.55)}",
    ".hv-gnode.on .hv-cristal b{color:#031015}",
    ".hv-gnode small{font-size:8.5px;letter-spacing:.14em;text-transform:uppercase;color:#8A95A1;margin-top:7px}",
    ".hv-gnode.on small{color:#20D9F5}",
    ".hv-gnode em{font-style:normal;font-size:8px;color:#4C5A66;margin-top:2px}",
    ".hv-ongl{display:flex;gap:6px;margin:0 18px 14px;background:rgba(255,255,255,.035);border:1px solid #2A323D;border-radius:12px;padding:4px}",
    ".hv-ongl button{flex:1;font-size:10.5px;letter-spacing:.09em;text-transform:uppercase;padding:9px 4px;border-radius:9px;color:#8A95A1;font-weight:500;background:none;border:none;font-family:inherit}",
    ".hv-ongl button.on{background:rgba(32,217,245,.13);color:#20D9F5;box-shadow:inset 0 0 0 1px rgba(32,217,245,.25)}",
    ".hv-vide{padding:24px 18px;text-align:center}",
    ".hv-vide p{font-size:12px;color:#8A95A1;line-height:1.6;margin:0}",
    ".hv-vide .hv-s2{font-size:10.5px;color:#5C6573;margin-top:7px}",
    ".hv-grille{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:0 18px}",
    ".hv-grille .hv-carte{flex:none;width:100%}",
    ".hv-compte{padding:0 18px;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:#8A95A1;margin-bottom:14px}",
    ".hv-compte b{color:#20D9F5}",
    ".hv-retourmenu{display:flex;align-items:center;gap:8px;margin:0 18px 14px;padding:11px 15px;border-radius:12px;",
    "border:1px solid rgba(32,217,245,.30);background:rgba(32,217,245,.08);color:#20D9F5;font-family:inherit;",
    "font-size:11px;letter-spacing:.13em;text-transform:uppercase;font-weight:600;width:calc(100% - 36px)}",
    ".hv-voile-m{position:fixed;inset:0;background:rgba(3,4,6,.72);z-index:80}",
    ".hv-feuille{position:fixed;left:0;right:0;bottom:0;z-index:90;max-width:520px;margin:0 auto;background:linear-gradient(180deg,#111720,#080B10);",
    "border-top:1px solid rgba(32,217,245,.35);border-radius:22px 22px 0 0;padding:8px 18px calc(24px + env(safe-area-inset-bottom));max-height:82vh;overflow-y:auto}",
    ".hv-poignee{width:38px;height:4px;border-radius:2px;background:rgba(255,255,255,.18);margin:6px auto 16px}",
    ".hv-fg{margin-bottom:18px}",
    ".hv-fg h5{font-size:9.5px;letter-spacing:.2em;text-transform:uppercase;color:#20D9F5;margin:0 0 10px;font-weight:500}",
    ".hv-fo{display:flex;flex-wrap:wrap;gap:7px}",
    ".hv-fo button{font-size:11px;color:#C3CBD5;border:1px solid #2A323D;border-radius:999px;padding:8px 13px;background:rgba(255,255,255,.025);font-family:inherit}",
    ".hv-fo button.on{background:rgba(32,217,245,.14);border-color:rgba(32,217,245,.35);color:#20D9F5;font-weight:500}",
    /* page de lecture */
    ".hv-lect{min-height:100vh;background:#12161C}",
    ".hv-lecteur{position:relative;aspect-ratio:16/9;background:#000;overflow:hidden}",
    ".hv-retour{position:absolute;top:calc(env(safe-area-inset-top) + 12px);left:12px;z-index:5;width:36px;height:36px;border-radius:50%;",
    "background:rgba(4,6,9,.6);border:1px solid #2A323D;display:flex;align-items:center;justify-content:center;font-size:15px;color:#F4F6F7}",
    ".hv-soon{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;text-align:center;padding:0 24px}",
    ".hv-soon b{font-family:'Cinzel',serif;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#20D9F5;font-weight:500}",
    ".hv-soon span{font-size:11.5px;color:#8A95A1;line-height:1.55}",
    ".hv-corps{padding:20px 18px calc(40px + env(safe-area-inset-bottom))}",
    ".hv-corps h2{font-family:'Cinzel',serif;font-size:21px;font-weight:500;line-height:1.22;margin:10px 0 0;color:#F4F6F7}",
    ".hv-corps .hv-d{font-size:12.5px;line-height:1.65;color:#B4C0CC;margin:15px 0 0;font-weight:300}",
    ".hv-lien{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:18px;padding:13px 15px;border-radius:14px;",
    "border:1px solid #2A323D;background:linear-gradient(120deg,rgba(32,217,245,.09),rgba(255,255,255,.02));width:100%;text-align:left;color:inherit;font-family:inherit}",
    ".hv-lien .hv-k{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#20D9F5;display:block}",
    ".hv-lien .hv-t{font-size:13px;font-weight:500;margin-top:4px;display:block;color:#F4F6F7}",
    ".hv-bloc{margin-top:24px;border:1px solid #2A323D;border-radius:16px;padding:16px 15px;background:linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.012))}",
    ".hv-bloc.obs{border-color:rgba(32,217,245,.24);background:linear-gradient(180deg,rgba(32,217,245,.075),rgba(255,255,255,.012))}",
    ".hv-bloc h5{font-family:'Cinzel',serif;font-size:12.5px;font-weight:500;letter-spacing:.08em;margin:0 0 12px;color:#F4F6F7}",
    ".hv-bloc.obs h5{color:#20D9F5}",
    ".hv-li{list-style:none;margin:0;padding:0}",
    ".hv-li li{font-size:12px;line-height:1.5;color:#C2CDD8;padding:8px 0 8px 26px;position:relative;border-bottom:1px solid rgba(255,255,255,.05)}",
    ".hv-li li:last-child{border-bottom:none}",
    ".hv-li li:before{content:'';position:absolute;left:6px;top:15px;width:6px;height:6px;border-radius:50%;background:#20D9F5;box-shadow:0 0 10px rgba(32,217,245,.8)}",
    ".hv-li.err li:before{background:#FF8B6B;box-shadow:0 0 10px rgba(255,139,107,.7)}",
    ".hv-coach{font-size:12.5px;line-height:1.65;color:#C2CDD8;margin:0;font-style:italic;font-weight:300;font-family:'Cormorant Garamond',Georgia,serif}",
    ".hv-vue{flex:1;padding:13px;border-radius:12px;border:1px solid #2A323D;background:rgba(255,255,255,.04);color:#F4F6F7;",
    "font-size:11px;letter-spacing:.13em;text-transform:uppercase;font-weight:600;font-family:inherit}",
    ".hv-vue.on{border-color:rgba(32,217,245,.35);background:rgba(32,217,245,.13);color:#20D9F5}"
  ].join("");

  function injecterCss() {
    if (typeof document === "undefined") return;
    if (document.getElementById(CSS_ID)) return;
    var st = document.createElement("style");
    st.id = CSS_ID; st.textContent = CSS;
    document.head.appendChild(st);
  }

  /* ============================================================
     ÉCRAN : BIBLIOTHÈQUE VIDÉO
     ============================================================ */
  window.EcranVideos = function EcranVideos() {
    var h = React.createElement;
    var app = useApp();
    var setEcran = app.setEcran, tr = app.tr, langue = app.langue, premium = app.premium;
    function T(fr, en, es, it, ja, de) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de }); }

    /* Le catalogue est multilingue : on lit la langue du cavalier ici. */
    function titreDe(v) { return L(v.i18nTitre, langue); }
    function resumeDe(v) { return L(v.i18nResume, langue); }
    function observerDe(v) { return v.i18nObserver ? (L(v.i18nObserver, langue) || []) : []; }
    function chapitreDe(v) { return L(CHAPITRES[v.coursId], langue) || v.coursId; }
    function dureeDe(v) { return v.dureeTranche ? L(TRANCHES[v.dureeTranche], langue) : ""; }

    injecterCss();
    var dispo = catalogue();

    var st = React.useState(lireLocal());
    var etat = st[0], setEtat = st[1];
    var q = React.useState("");
    var rq = q[0], setRq = q[1];
    var u = React.useState("tous"); var univ = u[0], setUniv = u[1];
    var g = React.useState(null); var galop = g[0], setGalop = g[1];
    var o = React.useState("fav"); var onglet = o[0], setOnglet = o[1];
    var f = React.useState({ duree: [], etat: [] }); var filtres = f[0], setFiltres = f[1];
    var fo = React.useState(false); var feuille = fo[0], setFeuille = fo[1];
    var mo = React.useState(false); var estModo = mo[0], setEstModo = mo[1];

    /* Réserve d'animations : réservée aux comptes de HYPE_MODERATEURS. */
    React.useEffect(function () {
      var vivant = true;
      try {
        if (typeof utilisateurActuel === "function" && typeof estModerateurHype === "function") {
          utilisateurActuel().then(function (u) {
            if (vivant) setEstModo(estModerateurHype(u));
          }).catch(function () { });
        }
      } catch (e) { }
      return function () { vivant = false; };
    }, []);

    /* fusion de l'état distant au montage */
    React.useEffect(function () {
      var vivant = true;
      chargerDistant(function (dist) {
        if (!vivant || !dist) return;
        var l = lireLocal();
        var fus = {
          prog: Object.assign({}, l.prog || {}, dist.prog || {}),
          fav: Object.assign({}, l.fav || {}, dist.fav || {})
        };
        ecrireLocal(fus);
        setEtat(fus);
      });
      return function () { vivant = false; };
    }, []);

    function prog(id) { return (etat.prog && etat.prog[id]) || null; }
    function estFav(id) { return !!(etat.fav && etat.fav[id]); }
    function verrou(v) { return !!v.premium && !premium; }

    function basculerFav(id) {
      var actif = !estFav(id);
      enregistrerFavori(id, actif);
      setEtat(lireLocal());
    }

    function ouvrir(v) {
      if (verrou(v)) { setEcran("premium"); return; }
      if (v.src) { enregistrerEtat(v.id, true, !!(prog(v.id) && prog(v.id).vue), 0); }
      try { window.__hypeVideoOuverte = v.id; } catch (e) { }
      setEcran("video-lecture");
    }

    var nbFiltres = filtres.duree.length + filtres.etat.length;
    var actif = !!(rq || univ !== "tous" || galop !== null || nbFiltres);

    function correspond(v) {
      if (!disponible(v)) return false;
      if (univ !== "tous" && v.theme !== univ) return false;
      if (galop !== null && v.galop !== galop) return false;
      if (filtres.duree.length) {
        var okD = filtres.duree.some(function (d) {
          return v.dureeTranche === d;
        });
        if (!okD) return false;
      }
      if (filtres.etat.length) {
        var p = prog(v.id);
        var okE = filtres.etat.some(function (s) {
          if (s === "nonvue") return !(p && p.vue);
          if (s === "vue") return !!(p && p.vue);
          if (s === "encours") return !!(p && p.ouverte && !p.vue);
          return estFav(v.id);
        });
        if (!okE) return false;
      }
      if (rq) {
        var champ = (titreDe(v) + " " + chapitreDe(v) + " " + resumeDe(v) + " "
          + (v.titreSource || "") + " " + (v.intervenant || "") + " " + observerDe(v).join(" ")).toLowerCase();
        if (champ.indexOf(rq.toLowerCase()) < 0) return false;
      }
      return true;
    }

    /* ---------- briques de rendu ---------- */
    function couv(v, opts) {
      opts = opts || {};
      var p = prog(v.id);
      var th = THEMES[v.theme] || { teinte: 198 };
      var h2 = (th.teinte + 26) % 360;
      var mini = vignette(v);
      var enfants = [
        h("div", { key: "f", style: { position: "absolute", inset: 0, background: fondCouv(v) } }),
        (mini && !opts.sansMini) ? h("img", {
          key: "m", src: mini, alt: "", loading: "lazy",
          style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }
        }) : null,
        h("svg", { key: "a", className: "hv-arc", viewBox: "0 0 200 200", preserveAspectRatio: "none" },
          h("path", { d: "M-20 150 C 60 150 70 40 210 55", fill: "none", stroke: "hsla(" + h2 + ",95%,72%,.5)", strokeWidth: 1 }),
          h("path", { d: "M-20 178 C 80 178 100 80 210 92", fill: "none", stroke: "hsla(" + h2 + ",95%,80%,.22)", strokeWidth: .7 })),
        opts.sansVoile ? null : h("div", { key: "v", className: "hv-voile" })
      ];
      /* 06/08 : PLUS AUCUN TEXTE INCRUSTE SUR LA MINIATURE (demande Blandine).
         Les vignettes des webconferences IFCE sont des diapos : elles portent
         deja leur propre titre cuit dans l'image, souvent sur plusieurs lignes.
         Poser « Galop 4 » et « format long » par-dessus rendait les deux
         illisibles, et cela contredisait la regle 18 de la Bible (jamais de
         texte incruste dans une image). Ces informations descendent sous
         l'image, dans le texte de la carte, ou elles se lisent vraiment.
         Seul le cadenas premium reste sur l'image : c'est un glyphe, pas un
         titre, et il doit se voir avant le clic. Les options opts.galop et
         opts.duree restent acceptees pour ne pas casser les appels existants,
         elles n'ont simplement plus d'effet. */
      if (verrou(v)) enfants.push(h("div", { key: "l", className: "hv-lock" }, "◈"));
      /* Aucune barre de progression : voir la note sur enregistrerEtat. */
      return h("div", { className: "hv-cov" }, enfants);
    }

    /* 06/08 : l'etat d'une video en un mot, pour la ligne de meta sous
       l'image. Rend "" quand il n'y a rien de notable a dire. */
    function etatDe(v) {
      var pv = prog(v.id);
      if (verrou(v)) return T("Premium", "Premium", "Premium", "Premium", "プレミアム", "Premium");
      if (!v.src) return T("Prochainement", "Coming soon", "Próximamente", "Prossimamente", "近日公開", "Demnächst");
      if (pv && pv.vue) return T("Vue", "Watched", "Vista", "Vista", "視聴済み", "Gesehen");
      if (pv && pv.ouverte) return T("À revoir", "To rewatch", "Por repasar", "Da rivedere", "見なおす", "Nochmal ansehen");
      return "";
    }
    /* Galop · duree · etat, sous l'image, separes par des points medians.
       Les elements vides sont ecartes : jamais de « · · » orphelin. */
    function metaDe(v) {
      return [
        T("Galop ", "Level ", "Galop ", "Galop ", "ガロー ", "Galopp ") + v.galop,
        dureeDe(v),
        etatDe(v)
      ].filter(function (x) { return !!x; }).join(" · ");
    }
    function carteAffiche(v) {
      return h("button", { key: v.id, className: "hv-carte", onClick: function () { ouvrir(v); } },
        couv(v), h("h4", null, titreDe(v)), h("p", null, chapitreDe(v)),
        h("p", { className: "hv-sous" }, metaDe(v)));
    }
    function carteLarge(v) {
      return h("button", { key: v.id, className: "hv-large", onClick: function () { ouvrir(v); } },
        couv(v), h("h4", null, titreDe(v)), h("p", null, chapitreDe(v)),
        h("p", { className: "hv-sous" }, metaDe(v)));
    }
    function carteLigne(v, n) {
      var p = prog(v.id);
      var etatTxt = !v.src ? T("Prochainement", "Coming soon", "Próximamente", "Prossimamente", "近日公開", "Demnächst")
        : (p && p.vue) ? T("Vue", "Watched", "Vista", "Vista", "視聴済み", "Gesehen")
        : (p && p.ouverte) ? T("À revoir", "To rewatch", "Por repasar", "Da rivedere", "見なおす", "Nochmal ansehen")
        : (v.intervenant || dureeDe(v) || "");
      return h("div", { key: v.id, style: { display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(255,255,255,.05)" } },
        h("button", { className: "hv-ligne", style: { borderBottom: "none", flex: 1, minWidth: 0 }, onClick: function () { ouvrir(v); } },
          n ? h("span", { className: "hv-num" }, n < 10 ? "0" + n : "" + n) : null,
          couv(v, { galop: false }),
          h("span", { style: { flex: 1, minWidth: 0 } },
            h("h4", null, titreDe(v)),
            h("span", { className: "hv-meta", style: { display: "block" } },
              v.estAnim ? (v.source + " · " + v.titreSource)
                        : (T("Galop ", "Level ", "Galop ", "Galop ", "ガロー ", "Galopp ") + v.galop + " · " + etatTxt)))),
        h("button", {
          className: "hv-fav" + (estFav(v.id) ? " on" : ""),
          "aria-label": T("Favori", "Favourite", "Favorito", "Preferito", "お気に入り", "Favorit"),
          onClick: function () { basculerFav(v.id); }
        }, estFav(v.id) ? "★" : "☆"));
    }

    /* ---------- en-tête ---------- */
    var coursSet = {}, expertSet = {};
    dispo.forEach(function (v) {
      (v.coursTous || []).forEach(function (c) { coursSet[c] = 1; });
      if (v.intervenant) expertSet[v.intervenant] = 1;
    });

    /* Animation des portes en fond d'en-tête (provisoire, à peaufiner).
       Lue UNE SEULE FOIS, sans boucle : les portes s'ouvrent à l'arrivée
       et restent ouvertes. Des portes qui claquent en boucle seraient
       agitées. Muette, sinon iOS refuse la lecture automatique.
       ⚠️ Cette animation finit sur le logo HYPE suivi d'un slogan fauté
       (« ÉQUESTIEE ») incrusté dans l'image : fin à couper vers 4,3 s,
       ou à réexporter sans texte.
       Replis en cascade : affiche JPG, puis dégradés. Rien ne casse si les
       fichiers ne sont pas encore poussés dans images/. */
    var animOk = true;
    try {
      animOk = !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    } catch (eAn) { }

    var hero = h("div", { className: "hv-hero" },
      animOk ? h("video", {
        key: "anim", className: "hv-hero-anim",
        autoPlay: true, muted: true, loop: false, playsInline: true,
        preload: "metadata", poster: "images/hype-anim-rideaux-poster.jpg",
        "aria-hidden": "true", tabIndex: -1,
        ref: function (el) { if (el) { el.muted = true; } }
      },
        h("source", { key: "w", src: "images/hype-anim-rideaux.webm", type: "video/webm" }),
        h("source", { key: "m", src: "images/hype-anim-rideaux.mp4", type: "video/mp4" })
      ) : h("div", {
        key: "anim", className: "hv-hero-anim",
        style: { backgroundImage: "url(images/hype-anim-rideaux-poster.jpg)", backgroundSize: "cover", backgroundPosition: "center" }
      }),
      h("div", { key: "voile", className: "hv-hero-voile" }),
      h("span", { className: "hv-kick" }, T("Hype · Académie", "Hype · Academy", "Hype · Academia", "Hype · Accademia", "Hype・アカデミー", "Hype · Akademie")),
      h("h1", null,
        T("Bibliothèque", "Video", "Biblioteca", "Videoteca", "動画", "Video"),
        h("span", null, T("vidéo", "library", "de vídeo", "", "ライブラリ", "Bibliothek"))),
      h("p", { className: "hv-sub" }, T("Observe, comprends, progresse", "Watch, understand, progress", "Observa, comprende, progresa", "Osserva, capisci, progredisci", "見て、理解して、上達する", "Beobachten, verstehen, vorankommen")),
      h("div", { className: "hv-stats" },
        h("div", null, h("b", null, dispo.length), h("i", null, T("vidéos", "videos", "vídeos", "video", "本", "Videos"))),
        h("div", null, h("b", null, Object.keys(expertSet).length), h("i", null, T("intervenants", "speakers", "ponentes", "relatori", "登壇者", "Referenten"))),
        h("div", null, h("b", null, Object.keys(coursSet).length), h("i", null, T("chapitres", "chapters", "capítulos", "capitoli", "章", "Kapitel")))));

    var recherche = h("div", { className: "hv-rech" },
      h("span", { style: { opacity: .5, fontSize: 14 } }, "⌕"),
      h("input", {
        type: "search", value: rq, autoComplete: "off",
        placeholder: T("Rechercher une vidéo, un exercice ou une notion", "Search a video, an exercise or a notion", "Buscar un vídeo, un ejercicio o una noción", "Cerca un video, un esercizio o una nozione", "動画・練習・用語を検索", "Video, Übung oder Begriff suchen"),
        onChange: function (e) { setRq(e.target.value); }
      }),
      rq ? h("button", { className: "hv-fav", onClick: function () { setRq(""); } }, "×") : null);

    var sugs = h("div", { className: "hv-sugs" }, SUGGESTS.map(function (s) {
      return h("button", { key: s, className: "hv-sug", onClick: function () { setRq(s); } }, s);
    }));

    var chips = h("div", { className: "hv-chips" },
      UNIVERS.map(function (x) {
        return h("button", {
          key: x.k, className: "hv-chip" + (univ === x.k ? " on" : ""),
          onClick: function () { setUniv(x.k); setGalop(null); }
        }, L(x.nom, langue));
      }).concat([
        h("button", { key: "__f", className: "hv-filtres", onClick: function () { setFeuille(true); } },
          "⚟ " + T("Filtres", "Filters", "Filtros", "Filtri", "絞り込み", "Filter") + (nbFiltres ? " · " + nbFiltres : ""))
      ]));

    /* ---------- bibliothèque encore vide ----------
       Aucune vidéo n'a de source réelle : on l'annonce franchement au lieu
       d'afficher une page de cartes qui ne mènent nulle part. */
    if (!dispo.length) {
      return h("div", { className: "hv-wrap" }, hero,
        h("div", { className: "hv-vide", style: { paddingTop: 34 } },
          h("p", null, T("Les premières vidéos arrivent.", "The first videos are on their way.", "Los primeros vídeos están en camino.", "I primi video stanno arrivando.", "最初の動画を準備しています。", "Die ersten Videos sind auf dem Weg.")),
          h("p", { className: "hv-s2" }, T("La bibliothèque s'ouvrira ici, chapitre par chapitre.", "The library will open here, chapter by chapter.", "La biblioteca se abrirá aquí, capítulo a capítulo.", "La videoteca si aprirà qui, capitolo per capitolo.", "章ごとに、ここに開いていきます。", "Die Bibliothek öffnet hier, Kapitel für Kapitel."))),
        h("div", { className: "hv-sec" },
          h("button", { className: "hv-btn hv-btn-p", style: { width: "100%" }, onClick: function () { setEcran("galops"); } },
            T("Retour aux Galops", "Back to levels", "Volver a los Galops", "Torna ai Galop", "ガロー一覧に戻る", "Zurück zu den Galopps"))));
    }

    /* ---------- continuer à regarder ---------- */
    var reprise = null;
    var meilleur = null;
    dispo.forEach(function (v) {
      var p = prog(v.id);
      if (p && p.ouverte && !p.vue) {
        if (!meilleur || (p.ouverte || "") > (meilleur.p.ouverte || "")) meilleur = { v: v, p: p };
      }
    });
    if (meilleur) {
      var mv = meilleur.v;
      reprise = h("button", { className: "hv-repr", onClick: function () { ouvrir(mv); } },
        couv(mv, { galop: false }),
        h("span", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" } },
          h("h4", null, titreDe(mv)),
          h("span", { className: "hv-lie", style: { display: "block" } }, T("Chapitre : ", "Chapter: ", "Capítulo: ", "Capitolo: ", "章：", "Kapitel: ") + chapitreDe(mv)),
          /* 06/08 : la duree quittait la miniature, elle se lit ici. */
          dureeDe(mv) ? h("span", { className: "hv-lie", style: { display: "block", marginTop: 2 } }, dureeDe(mv)) : null,
          h("span", { style: { display: "block", fontSize: 9.5, color: "#20D9F5", marginTop: 9, letterSpacing: ".1em", textTransform: "uppercase" } },
            T("Reprendre", "Resume", "Reanudar", "Riprendi", "つづける", "Fortsetzen"))));
    }

    /* ---------- à la une ---------- */
    var une = dispo[0];
    for (var iu = 0; iu < dispo.length; iu++) { var pu = prog(dispo[iu].id); if (!pu && !verrou(dispo[iu])) { une = dispo[iu]; break; } }
    var blocUne = h("div", { className: "hv-une" },
      /* 06/08 : la carte « A la une » n'affiche plus la vignette YouTube.
         En 16/9 pleine largeur, une diapo de webconference IFCE devient un
         mur de texte cuit dans l'image, juste sous le titre de la carte.
         Le fond procedural de fondCouv() tient le role : sobre, dans la
         palette, et il n'entre jamais en concurrence avec le texte. Les
         vignettes restent en place dans les petites cartes, ou elles sont
         decoratives et sans enjeu de lecture. */
      couv(une, { galop: false, sansVoile: true, sansMini: true }),
      h("div", { className: "hv-une-txt" },
        h("span", { className: "hv-kick" }, T("Recommandée pour toi", "Recommended for you", "Recomendada para ti", "Consigliata per te", "あなたへのおすすめ", "Für dich empfohlen")),
        h("h3", null, titreDe(une)),
        h("p", { className: "hv-desc" }, resumeDe(une)),
        h("div", { className: "hv-minis" },
          h("span", { className: "hv-mini" }, T("Galop ", "Level ", "Galop ", "Galop ", "ガロー ", "Galopp ") + une.galop),
          dureeDe(une) ? h("span", { className: "hv-mini" }, dureeDe(une)) : null,
          h("span", { className: "hv-mini" }, chapitreDe(une)),
          une.source ? h("span", { className: "hv-mini" }, une.source) : null,
          etatDe(une) ? h("span", { className: "hv-mini" }, etatDe(une)) : null),
        h("div", { className: "hv-act" },
          h("button", { className: "hv-btn hv-btn-p", onClick: function () { ouvrir(une); } },
            T("Regarder", "Watch", "Ver", "Guarda", "見る", "Ansehen")),
          h("button", {
            className: "hv-btn hv-btn-s" + (estFav(une.id) ? " on" : ""),
            "aria-label": T("Ajouter à mes favoris", "Add to favourites", "Añadir a favoritos", "Aggiungi ai preferiti", "お気に入りに追加", "Zu Favoriten"),
            onClick: function () { basculerFav(une.id); }
          }, estFav(une.id) ? "★" : "☆"))));

    /* ---------- explorer par galop ---------- */
    var niveaux = [1, 2, 3, 4, 5, 6, 7];
    var blocGalops = h("div", { className: "hv-galops" },
      h("div", { className: "hv-sec", style: { marginTop: 0 } },
        h("h2", null, T("Explorer par Galop", "Explore by level", "Explorar por Galop", "Esplora per Galop", "ガロー別に見る", "Nach Galopp entdecken")),
        h("p", null, T("Le fil de ta progression fédérale", "The thread of your federal progression", "El hilo de tu progresión federal", "Il filo della tua progressione federale", "連盟級位に沿った道すじ", "Der Faden deiner Ausbildung"))),
      h("div", { className: "hv-gscroll" }, niveaux.map(function (n) {
        var nb = dispo.filter(function (v) { return v.galop === n; }).length;
        return h("button", {
          key: n, className: "hv-gnode" + (galop === n ? " on" : ""),
          onClick: function () { setGalop(galop === n ? null : n); setUniv("tous"); }
        },
          h("span", { className: "hv-cristal" }, h("b", null, n)),
          h("small", null, T("Galop ", "Level ", "Galop ", "Galop ", "ガロー ", "Galopp ") + n),
          h("em", null, nb + " " + (nb > 1 ? T("vidéos", "videos", "vídeos", "video", "本", "Videos") : T("vidéo", "video", "vídeo", "video", "本", "Video"))));
      })));

    /* ---------- collections ---------- */
    var blocColls = COLLS.map(function (c) {
      var vs = c.ids.map(vidDe).filter(Boolean).filter(disponible);
      if (!vs.length) return null;
      var corps;
      if (c.format === "liste") {
        corps = h("div", { style: { padding: "0 18px" } }, vs.map(function (v, i) { return carteLigne(v, i + 1); }));
      } else {
        corps = h("div", { className: "hv-rail" }, vs.map(c.format === "large" ? carteLarge : carteAffiche));
      }
      return h("div", { key: c.id, className: "hv-coll" },
        h("div", { className: "hv-coll-tete" },
          h("span", { className: "hv-sceau" }, c.sceau),
          h("span", null,
            h("h3", null, L(c.nom, langue)),
            h("p", null, L(c.sous, langue) + " · " + vs.length))),
        h("div", { className: "hv-fil" }),
        corps);
    });

    /* ---------- mes vidéos ---------- */
    var mesVs = [];
    if (onglet === "fav") mesVs = dispo.filter(function (v) { return estFav(v.id); });
    if (onglet === "cours") mesVs = dispo.filter(function (v) { var p = prog(v.id); return p && p.ouverte && !p.vue; });
    if (onglet === "hist") mesVs = dispo.filter(function (v) { var p = prog(v.id); return p && p.vue; });

    var videTxt = {
      fav: [T("Aucun favori pour l'instant.", "No favourites yet.", "Aún no hay favoritos.", "Nessun preferito per ora.", "お気に入りはまだありません。", "Noch keine Favoriten."),
            T("Touche l'étoile sur une vidéo pour la retrouver ici.", "Tap the star on a video to find it here.", "Toca la estrella de un vídeo para encontrarlo aquí.", "Tocca la stella su un video per ritrovarlo qui.", "動画の星に触れると、ここに集まります。", "Tippe auf den Stern, um ein Video hier zu finden.")],
      cours: [T("Aucune vidéo en cours.", "No video in progress.", "Ningún vídeo en curso.", "Nessun video in corso.", "視聴中の動画はありません。", "Kein Video läuft."),
              T("Les vidéos commencées apparaîtront ici avec leur progression.", "Videos you start will appear here with their progress.", "Los vídeos empezados aparecerán aquí con su progreso.", "I video iniziati appariranno qui con il loro avanzamento.", "見はじめた動画が進捗つきで並びます。", "Begonnene Videos erscheinen hier mit ihrem Fortschritt.")],
      hist: [T("Ton historique est vide.", "Your history is empty.", "Tu historial está vacío.", "La tua cronologia è vuota.", "履歴はまだ空です。", "Dein Verlauf ist leer."),
             T("Les vidéos terminées viendront se ranger ici.", "Finished videos will be filed here.", "Los vídeos terminados se guardarán aquí.", "I video completati si raccoglieranno qui.", "見終わった動画がここに並びます。", "Fertige Videos werden hier abgelegt.")]
    }[onglet];

    var blocMes = h("div", null,
      h("div", { className: "hv-sec", style: { marginTop: 36 } },
        h("h2", null, T("Mes vidéos", "My videos", "Mis vídeos", "I miei video", "マイ動画", "Meine Videos")),
        h("p", null, T("Ce que tu as gardé, commencé ou terminé", "What you saved, started or finished", "Lo que has guardado, empezado o terminado", "Ciò che hai salvato, iniziato o finito", "保存・視聴中・視聴済みのもの", "Gespeichert, begonnen oder beendet"))),
      h("div", { className: "hv-ongl", style: { marginTop: 14 } },
        [["fav", T("Favoris", "Favourites", "Favoritos", "Preferiti", "お気に入り", "Favoriten")],
         ["cours", T("À revoir", "To rewatch", "Por repasar", "Da rivedere", "見なおす", "Nochmal ansehen")],
         ["hist", T("Historique", "History", "Historial", "Cronologia", "履歴", "Verlauf")]].map(function (x) {
          return h("button", { key: x[0], className: onglet === x[0] ? "on" : "", onClick: function () { setOnglet(x[0]); } }, x[1]);
        })),
      mesVs.length
        ? h("div", { style: { padding: "0 18px" } }, mesVs.map(function (v) { return carteLigne(v); }))
        : h("div", { className: "hv-vide" }, h("p", null, videTxt[0]), h("p", { className: "hv-s2" }, videTxt[1])));

    /* ---------- résultats ---------- */
    var blocResultats = null;
    if (actif) {
      var res = dispo.filter(correspond);
      var lib = [];
      if (rq) lib.push("« " + rq + " »");
      if (univ !== "tous") { for (var iv = 0; iv < UNIVERS.length; iv++) { if (UNIVERS[iv].k === univ) lib.push(L(UNIVERS[iv].nom, langue)); } }
      if (galop !== null) lib.push(T("Galop ", "Level ", "Galop ", "Galop ", "ガロー ", "Galopp ") + galop);
      if (nbFiltres) lib.push(nbFiltres + " " + T("filtres", "filters", "filtros", "filtri", "絞り込み", "Filter"));
      blocResultats = h("div", { style: { marginTop: 18 } },
        h("button", {
          className: "hv-retourmenu",
          onClick: function () { setRq(""); setUniv("tous"); setGalop(null); setFiltres({ duree: [], etat: [] }); }
        }, "\u2039 " + T("Retour au menu", "Back to menu", "Volver al menú", "Torna al menu", "メニューに戻る", "Zurück zum Menü")),
        h("div", { className: "hv-compte" }, h("b", null, res.length), " " + (res.length > 1 ? T("vidéos", "videos", "vídeos", "video", "本", "Videos") : T("vidéo", "video", "vídeo", "video", "本", "Video")) + " · " + lib.join(" · ")),
        res.length
          ? h("div", { className: "hv-grille" }, res.map(carteAffiche))
          : h("div", { className: "hv-vide" },
              h("p", null, T("Aucune vidéo ne correspond encore.", "No video matches yet.", "Ningún vídeo coincide todavía.", "Nessun video corrisponde ancora.", "該当する動画はまだありません。", "Noch kein Video passt.")),
              h("p", { className: "hv-s2" }, T("Essaie un autre mot, ou élargis le niveau et la durée.", "Try another word, or widen level and duration.", "Prueba otra palabra, o amplía nivel y duración.", "Prova un'altra parola, o allarga livello e durata.", "別の言葉を試すか、級位と長さを広げてみて。", "Versuche ein anderes Wort oder erweitere Galopp und Dauer."))));
    }

    /* ---------- feuille de filtres ---------- */
    var GROUPES = [
      { cle: "duree", nom: T("Durée", "Duration", "Duración", "Durata", "長さ", "Dauer"), opts: [
        ["court", T("Moins de 3 min", "Under 3 min", "Menos de 3 min", "Meno di 3 min", "3分未満", "Unter 3 Min")],
        ["moyen", T("3 à 8 min", "3 to 8 min", "3 a 8 min", "Da 3 a 8 min", "3〜8分", "3 bis 8 Min")],
        ["long", T("Plus de 8 min", "Over 8 min", "Más de 8 min", "Più di 8 min", "8分以上", "Über 8 Min")]] },
      { cle: "etat", nom: T("Où tu en es", "Where you are", "Dónde estás", "Dove sei arrivato", "進み具合", "Wo du stehst"), opts: [
        ["nonvue", T("Pas encore vues", "Not watched yet", "Aún sin ver", "Non ancora viste", "未視聴", "Noch nicht gesehen")],
        ["encours", T("À revoir", "To rewatch", "Por repasar", "Da rivedere", "見なおす", "Nochmal ansehen")],
        ["vue", T("Déjà vues", "Already watched", "Ya vistas", "Già viste", "視聴済み", "Schon gesehen")],
        ["fav", T("Mes favoris", "My favourites", "Mis favoritos", "I miei preferiti", "お気に入り", "Meine Favoriten")]] }
    ];
    var blocFeuille = feuille ? h(React.Fragment, null,
      h("div", { className: "hv-voile-m", onClick: function () { setFeuille(false); } }),
      h("div", { className: "hv-feuille" },
        h("div", { className: "hv-poignee" }),
        GROUPES.map(function (gr) {
          return h("div", { key: gr.cle, className: "hv-fg" },
            h("h5", null, gr.nom),
            h("div", { className: "hv-fo" }, gr.opts.map(function (op) {
              var on = filtres[gr.cle].indexOf(op[0]) >= 0;
              return h("button", {
                key: op[0], className: on ? "on" : "",
                onClick: function () {
                  var copie = { duree: filtres.duree.slice(), etat: filtres.etat.slice() };
                  var arr = copie[gr.cle], i = arr.indexOf(op[0]);
                  if (i >= 0) { arr.splice(i, 1); } else { arr.push(op[0]); }
                  setFiltres(copie);
                }
              }, op[1]);
            })));
        }),
        h("div", { style: { display: "flex", gap: 10, marginTop: 6 } },
          h("button", { className: "hv-btn hv-btn-s", style: { width: "auto", flex: 1 }, onClick: function () { setFiltres({ duree: [], etat: [] }); } },
            T("Tout effacer", "Clear all", "Borrar todo", "Cancella tutto", "すべて解除", "Alles löschen")),
          h("button", { className: "hv-btn hv-btn-p", style: { flex: 1.4 }, onClick: function () { setFeuille(false); } },
            T("Voir les vidéos", "Show videos", "Ver los vídeos", "Vedi i video", "動画を見る", "Videos anzeigen"))))) : null;

    return h("div", { className: "hv-wrap" },
      hero, recherche, sugs, chips,
      actif ? blocResultats : h("div", null,
        reprise ? h("div", null,
          h("div", { className: "hv-sec", style: { marginTop: 22 } },
            h("h2", null, T("Continuer à regarder", "Keep watching", "Seguir viendo", "Continua a guardare", "つづきを見る", "Weiterschauen"))),
          h("div", { style: { marginTop: 14 } }, reprise)) : null,
        h("div", { className: "hv-sec" },
          h("h2", null, T("À la une", "Featured", "Destacado", "In primo piano", "注目", "Im Fokus")),
          h("p", null, T("Choisie pour ton niveau et ton dernier chapitre", "Picked for your level and latest chapter", "Elegida para tu nivel y tu último capítulo", "Scelta per il tuo livello e il tuo ultimo capitolo", "あなたの級位と最新の章に合わせて", "Für dein Niveau und dein letztes Kapitel"))),
        h("div", { style: { marginTop: 14 } }, blocUne),
        blocGalops,
        blocColls,
        blocMes,
        /* Réserve d'animations — modérateurs uniquement. Sert à rassembler
           les animations produites et à savoir où elles en sont. */
        estModo ? h("div", { key: "reserve" },
          h("div", { className: "hv-sec", style: { marginTop: 42 } },
            h("h2", null, "Réserve d'animations"),
            h("p", null, (function () {
              var ec = 0; ANIMS.forEach(function (x) { if (ecartees()[x.id]) ec++; });
              return "Visible par toi seule. " + (ANIMS.length - ec) + " animations sur " + ANIMS.length
                + (ec ? (" · " + ec + " écartée" + (ec > 1 ? "s" : "")) : "") + ".";
            })()),
            (function () {
              var ec = 0; ANIMS.forEach(function (x) { if (ecartees()[x.id]) ec++; });
              return ec ? h("button", {
                onClick: function () { ANIMS.forEach(function (x) { ecarter(x.id, false); }); setEtat(lireLocal()); },
                style: { marginTop: 8, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#20D9F5", background: "none", border: "1px solid rgba(32,217,245,.35)", borderRadius: 8, padding: "7px 12px", fontFamily: "inherit" }
              }, "Réafficher tout") : null;
            })()),
          h("div", { className: "hv-fil", style: { margin: "12px 18px 4px" } }),
          h("div", { style: { padding: "0 18px" } }, ANIMS.filter(function (a4) { return !ecartees()[a4.id]; }).map(function (a3) {
            return h("div", { key: a3.id, style: { padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,.06)" } },
              h("button", {
                style: { display: "flex", gap: 12, alignItems: "center", width: "100%", textAlign: "left", background: "none", border: "none", padding: 0, color: "inherit" },
                onClick: function () { if (a3.src) { ouvrir(a3); } }
              },
                h("span", {
                  className: "hv-cov",
                  style: {
                    width: 86, flex: "0 0 86px", aspectRatio: "16/9", borderRadius: 10, border: "1px solid #2A323D",
                    backgroundImage: a3.vignetteUrl ? ("url(" + a3.vignetteUrl + ")") : "none",
                    backgroundSize: "cover", backgroundPosition: "center",
                    background: a3.vignetteUrl ? undefined : fondCouv(a3)
                  }
                }),
                h("span", { style: { flex: 1, minWidth: 0 } },
                  h("span", { style: { display: "block", fontSize: 12.5, fontWeight: 500, color: "#F4F6F7", lineHeight: 1.35 } }, L(a3.i18nTitre, "fr")),
                  h("span", { style: { display: "block", fontSize: 9.5, color: "#20D9F5", marginTop: 4, letterSpacing: ".08em", textTransform: "uppercase" } }, a3.source + " · " + a3.titreSource),
                  h("span", { style: { display: "block", fontSize: 11, color: "#8A95A1", marginTop: 6, lineHeight: 1.5 } }, L(a3.i18nResume, "fr")))),
              h("span", { style: { display: "flex", gap: 8, marginTop: 10 } },
                a3.src ? h("a", {
                  href: a3.src.ref + ".mp4", download: "",
                  style: { fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#20D9F5", textDecoration: "none", fontWeight: 600, border: "1px solid rgba(32,217,245,.35)", borderRadius: 8, padding: "7px 12px" }
                }, "Télécharger") : null,
                h("button", {
                  onClick: function () { ecarter(a3.id, true); setEtat(lireLocal()); },
                  style: { fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#8A95A1", fontWeight: 600, background: "none", border: "1px solid #2A323D", borderRadius: 8, padding: "7px 12px", fontFamily: "inherit" }
                }, "Écarter")));
          }))) : null),
      blocFeuille);
  };

  /* ============================================================
     ÉCRAN : PAGE DE LECTURE
     ============================================================ */
  window.EcranVideoLecture = function EcranVideoLecture() {
    var h = React.createElement;
    var app = useApp();
    var setEcran = app.setEcran, tr = app.tr, langue = app.langue;
    function T(fr, en, es, it, ja, de) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de }); }

    /* Le catalogue est multilingue : on lit la langue du cavalier ici. */
    function titreDe(v) { return L(v.i18nTitre, langue); }
    function resumeDe(v) { return L(v.i18nResume, langue); }
    function observerDe(v) { return v.i18nObserver ? (L(v.i18nObserver, langue) || []) : []; }
    function chapitreDe(v) { return L(CHAPITRES[v.coursId], langue) || v.coursId; }
    function dureeDe(v) { return v.dureeTranche ? L(TRANCHES[v.dureeTranche], langue) : ""; }
    injecterCss();

    var id = null;
    try { id = window.__hypeVideoOuverte || null; } catch (e) { }
    var v = vidDe(id);

    var st = React.useState(lireLocal());
    var etat = st[0], setEtat = st[1];

    if (!v) {
      return h("div", { className: "hv-lect" }, h("div", { className: "hv-corps" },
        h("p", { className: "hv-d" }, T("Cette vidéo n'est plus disponible.", "This video is no longer available.", "Este vídeo ya no está disponible.", "Questo video non è più disponibile.", "この動画は見つかりません。", "Dieses Video ist nicht mehr verfügbar.")),
        h("button", { className: "hv-btn hv-btn-p", style: { marginTop: 18 }, onClick: function () { setEcran("videos"); } },
          T("Retour à la bibliothèque", "Back to library", "Volver a la biblioteca", "Torna alla videoteca", "ライブラリに戻る", "Zurück zur Bibliothek"))));
    }

    var p = (etat.prog && etat.prog[v.id]) || null;
    var fav = !!(etat.fav && etat.fav[v.id]);
    var vue = !!(p && p.vue);

    function basculerVue() {
      enregistrerEtat(v.id, false, !vue, 0);
      setEtat(lireLocal());
    }
    function basculerFav() {
      enregistrerFavori(v.id, !fav);
      setEtat(lireLocal());
    }
    function versLeCours() {
      /* le niveau du chapitre se lit dans son identifiant : g4-contact -> 4 */
      var m = /^g(\d)-/.exec(v.coursId || "");
      var niveauChapitre = m ? parseInt(m[1], 10) : v.galop;
      if (app.setGalopOuvert) app.setGalopOuvert(niveauChapitre);
      if (app.setCoursOuvert) app.setCoursOuvert(v.coursId);
      setEcran("cours");
    }

    var lecteur = h("div", { className: "hv-lecteur" },
      h("div", { style: { position: "absolute", inset: 0, background: fondCouv(v) } }),
      h("button", { className: "hv-retour", onClick: function () { setEcran("videos"); } }, "‹"),
      (v.src && v.src.type === "fichier")
        ? h("video", {
            controls: true, playsInline: true, preload: "metadata",
            poster: v.vignetteUrl || undefined,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", background: "#000" }
          },
            h("source", { key: "w", src: v.src.ref + ".webm", type: "video/webm" }),
            h("source", { key: "m", src: v.src.ref + ".mp4", type: "video/mp4" }))
      : v.src
        ? h("iframe", {
            title: titreDe(v), src: (v.src.type === "vimeo" ? "https://player.vimeo.com/video/" : "https://www.youtube-nocookie.com/embed/") + v.src.ref,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" },
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen",
            allowFullScreen: true
          })
        : h("div", { className: "hv-soon" },
            h("b", null, T("Prochainement", "Coming soon", "Próximamente", "Prossimamente", "近日公開", "Demnächst")),
            h("span", null, T("Cette vidéo n'est pas encore tournée. Tout le reste de la fiche est déjà là : garde-la en favori, tu seras prévenue.",
              "This video has not been filmed yet. Everything else is already here: save it and you will be notified.",
              "Este vídeo aún no está grabado. Todo lo demás ya está aquí: guárdalo y te avisaremos.",
              "Questo video non è ancora girato. Tutto il resto è già qui: salvalo e ti avviseremo.",
              "この動画はまだ撮影されていません。ほかの内容はすでにあります。お気に入りに入れておいてください。",
              "Dieses Video ist noch nicht gedreht. Alles andere ist schon da: speichere es, du wirst informiert."))));

    return h("div", { className: "hv-lect" }, lecteur,
      h("div", { className: "hv-corps" },
        h("span", { className: "hv-kick" }, chapitreDe(v)),
        h("h2", null, titreDe(v)),
        h("div", { className: "hv-minis" },
          h("span", { className: "hv-mini" }, T("Galop ", "Level ", "Galop ", "Galop ", "ガロー ", "Galopp ") + v.galop),
          dureeDe(v) ? h("span", { className: "hv-mini" }, dureeDe(v)) : null,
          h("span", { className: "hv-mini" }, vue ? T("Vue", "Watched", "Vista", "Vista", "視聴済み", "Gesehen") : T("À regarder", "To watch", "Por ver", "Da guardare", "これから見る", "Anzusehen"))),
        h("p", { className: "hv-d" }, resumeDe(v)),

        h("button", { className: "hv-lien", onClick: versLeCours },
          h("span", { style: { minWidth: 0 } },
            h("span", { className: "hv-k" }, T("Liée au chapitre", "Linked to chapter", "Vinculada al capítulo", "Collegata al capitolo", "関連する章", "Zum Kapitel")),
            h("span", { className: "hv-t" }, chapitreDe(v))),
          h("span", { style: { color: "#20D9F5", fontSize: 14, flex: "0 0 auto" } },
            T("Voir le cours ›", "See the lesson ›", "Ver el curso ›", "Vedi il corso ›", "コースを見る ›", "Zum Kurs ›"))),

        /* Points à observer : seulement pour les vidéos principales, qui en ont. */
        observerDe(v).length ? h("div", { className: "hv-bloc obs" },
          h("h5", null, T("Pendant la vidéo, observe particulièrement…", "While watching, look especially at…", "Durante el vídeo, observa sobre todo…", "Durante il video, osserva soprattutto…", "動画では、とくにここを見て…", "Achte im Video besonders auf…")),
          h("ul", { className: "hv-li" }, observerDe(v).map(function (x, i) { return h("li", { key: i }, x); }))) : null,

        /* Qui parle. C'est l'angle « académie » : on nomme l'intervenant. */
        v.intervenant ? h("div", { className: "hv-bloc" },
          h("h5", null, T("L'intervenant", "The speaker", "El ponente", "Il relatore", "登壇者", "Der Referent")),
          h("p", { style: { margin: 0, fontSize: 13.5, fontWeight: 500, color: "#F4F6F7" } }, v.intervenant),
          v.intervenantRole ? h("p", { style: { margin: "4px 0 0", fontSize: 11.5, color: "#8A95A1" } }, L(v.intervenantRole, langue)) : null,
          v.titreSource ? h("p", { style: { margin: "12px 0 0", fontSize: 11.5, color: "#8A95A1", lineHeight: 1.55, fontStyle: "italic" } }, "« " + v.titreSource + " »") : null,
          v.doc ? h("a", {
            href: v.doc, target: "_blank", rel: "noopener",
            style: { display: "inline-block", marginTop: 12, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "#20D9F5", textDecoration: "none", fontWeight: 600 }
          }, T("Le document de l'intervention ›", "The talk's handout ›", "El documento de la intervención ›", "Il documento dell'intervento ›", "講演資料 ›", "Das Dokument zum Vortrag ›")) : null) : null,

        /* Avertissement honnête : les cartes sont traduites, la vidéo non. */
        (v.langueVideo && langue !== v.langueVideo) ? h("div", { className: "hv-bloc" },
          h("p", { style: { margin: 0, fontSize: 11.5, color: "#8A95A1", lineHeight: 1.55 } },
            T("Cette vidéo est en français.", "This video is in French.", "Este vídeo está en francés.", "Questo video è in francese.", "この動画はフランス語です。", "Dieses Video ist auf Französisch."))) : null,

        h("div", { className: "hv-act" },
          h("button", { className: "hv-vue" + (vue ? " on" : ""), onClick: basculerVue },
            vue ? "✓ " + T("Vue", "Watched", "Vista", "Vista", "視聴済み", "Gesehen")
                : T("Marquer comme vue", "Mark as watched", "Marcar como vista", "Segna come vista", "視聴済みにする", "Als gesehen markieren")),
          h("button", { className: "hv-btn hv-btn-s" + (fav ? " on" : ""), onClick: basculerFav, "aria-label": T("Favori", "Favourite", "Favorito", "Preferito", "お気に入り", "Favorit") },
            fav ? "★" : "☆")),

        (function () {
          var suiv = VIDS.filter(disponible).filter(function (x) { return x.id !== v.id && (x.coursId === v.coursId || x.theme === v.theme); }).slice(0, 5);
          if (!suiv.length) return null;
          return h("div", { style: { marginTop: 28 } },
            h("h5", { style: { fontFamily: "'Cinzel',serif", fontSize: 13, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", margin: 0, color: "#F4F6F7" } },
              T("À regarder ensuite", "Watch next", "Ver a continuación", "Da guardare dopo", "次に見る", "Als Nächstes")),
            h("div", { className: "hv-fil", style: { margin: "12px 0" } }),
            suiv.map(function (x) {
              return h("button", {
                key: x.id, className: "hv-ligne",
                onClick: function () { try { window.__hypeVideoOuverte = x.id; } catch (e) { } setEcran("videos"); setTimeout(function () { setEcran("video-lecture"); }, 0); }
              },
                h("span", { className: "hv-cov", style: { width: 78, flex: "0 0 78px", aspectRatio: "16/10", borderRadius: 10, border: "1px solid #2A323D", background: fondCouv(x) } }),
                h("span", { style: { flex: 1, minWidth: 0 } },
                  h("h4", null, titreDe(x)),
                  h("span", { className: "hv-meta", style: { display: "block" } }, chapitreDe(x))));
            }));
        })()));
  };

  /* expose le catalogue pour d'éventuels usages ailleurs (cours, Hey Baby) */
  window.HYPE_VIDEO = { videos: VIDS, collections: COLLS, themes: THEMES, parCours: function (coursId) {
      /* un chapitre secondaire peut partager une vidéo : on lit toute la
         liste cours[], pas seulement le premier (v-contact-03 sert aussi
         à g4-biomeca). L'ordre porte l'information : la 1re est la principale. */
      return VIDS.filter(function (v) { return (v.coursTous || []).indexOf(coursId) >= 0; });
    } };
})();
