/* hype-lingo-lex-ecurie.js — Hype Lingo · Chapitre « L'écurie »
   ------------------------------------------------------------------
   UN CONCEPT = UN OBJET DU MONDE EQUESTRE, avec ses 6 langues cote a cote.
   Aucune notion de "langue source" : le moteur lit la langue de l'interface
   et propose les 5 autres comme destinations. Le japonais qui apprend le
   francais utilise exactement ce fichier, sans une ligne de plus.

   m   = le mot          p   = prononciation simplifiee (pas d'API phonetique,
   var = variante regionale     illisible pour une enfant de 10 ans)
   def = definition, sert au mode Lexique ET au verso de la carte

   ⚠️ RELECTURE NATIVE A FAIRE : le lexique technique n'est pas du vocabulaire
   courant. Les points a verifier par un cavalier natif sont marques // ?? */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.ecurie = {
  ref: "ecurie",
  titre: { fr: "L'écurie", en: "The yard", es: "La cuadra", it: "La scuderia", de: "Der Stall", ja: "厩舎" },
  concepts: [

    { ref: "seau", niveau: 1,
      mots: {
        fr: { m: "seau", p: "so" },
        en: { m: "bucket", p: "beu-kit", var: "pail (US)" },
        es: { m: "cubo", p: "kou-bo" },
        it: { m: "secchio", p: "sé-kio" },
        de: { m: "der Eimer", p: "aï-meur" },
        ja: { m: "バケツ", p: "baketsu" }
      },
      def: {
        fr: "Récipient pour l'eau ou la ration. On en compte souvent deux par box : un pour boire, un pour les granulés.",
        en: "Container for water or feed. Most boxes have two: one for water, one for hard feed."
      } },

    { ref: "foin", niveau: 1,
      mots: {
        fr: { m: "le foin", p: "fwin" },
        en: { m: "hay", p: "hé" },
        es: { m: "el heno", p: "é-no" },
        it: { m: "il fieno", p: "fié-no" },
        de: { m: "das Heu", p: "hoï" },
        ja: { m: "干し草", p: "hoshikusa" }
      },
      def: {
        fr: "Herbe fauchée puis séchée : la base de la ration. Un cheval en consomme chaque jour 1,5 à 2 % de son poids.",
        en: "Grass cut and dried. The foundation of the diet: a horse eats 1.5 to 2 % of its bodyweight daily."
      } },

    { ref: "paille", niveau: 1,
      mots: {
        fr: { m: "la paille", p: "païe" },
        en: { m: "straw", p: "stro" },
        es: { m: "la paja", p: "pa-ra" },
        it: { m: "la paglia", p: "pa-lia" },
        de: { m: "das Stroh", p: "chtro" },
        ja: { m: "藁", p: "wara" }
      },
      def: {
        fr: "Tige de céréale séchée qui sert de litière. Certains chevaux la mangent : on passe alors aux copeaux.",
        en: "Dried cereal stalks used as bedding. Some horses eat it, and are moved onto shavings instead."
      } },

    { ref: "licol", niveau: 1,
      mots: {
        fr: { m: "le licol", p: "li-kol" },
        en: { m: "headcollar", p: "hed-ko-leur", var: "halter (US)" },
        es: { m: "el cabestro", p: "ka-bés-tro", var: "ronzal" },
        it: { m: "la capezza", p: "ka-pét-sa" },
        de: { m: "das Halfter", p: "half-teur" },
        ja: { m: "ハルター", p: "harutā", var: "無口 (mukuchi)" } // ?? terme d'écurie japonais à confirmer
      },
      def: {
        fr: "Harnais de tête sans mors, pour tenir et mener le cheval à la main. Ne jamais laisser un cheval en liberté avec.",
        en: "Bitless head harness used to hold and lead a horse. Never leave one on a loose horse."
      } },

    { ref: "box", niveau: 1,
      mots: {
        fr: { m: "le box", p: "boks" },
        en: { m: "the stable", p: "sté-beul", var: "loose box (GB) · stall (US)" },
        es: { m: "el box", p: "boks", var: "la cuadra" },
        it: { m: "il box", p: "boks" },
        de: { m: "die Box", p: "boks" },
        ja: { m: "馬房", p: "babō" }
      },
      def: {
        fr: "Logement individuel fermé où le cheval dort et mange. Se cure une à deux fois par jour.",
        en: "Individual enclosed space where a horse sleeps and eats. Mucked out once or twice a day."
      } },

    { ref: "brouette", niveau: 1,
      mots: {
        fr: { m: "la brouette", p: "brou-ète" },
        en: { m: "wheelbarrow", p: "ouil-ba-ro" },
        es: { m: "la carretilla", p: "ka-ré-ti-ya" },
        it: { m: "la carriola", p: "ka-rio-la" },
        de: { m: "die Schubkarre", p: "choub-ka-re" },
        ja: { m: "一輪車", p: "ichirinsha" }
      },
      def: {
        fr: "Sert à sortir le crottin et à transporter la litière propre jusqu'au box.",
        en: "Used to carry droppings out and clean bedding in."
      } },

    /* --- les six suivantes ne sont pas dans la leçon 1 : elles peuplent la
           collection et se débloquent aux leçons suivantes --- */

    { ref: "fourche", niveau: 2,
      mots: {
        fr: { m: "la fourche", p: "fourch" },
        en: { m: "muck fork", p: "meuk-fork" },
        es: { m: "la horca", p: "or-ka" },
        it: { m: "la forca", p: "for-ka" },
        de: { m: "die Mistgabel", p: "mist-ga-beul" },
        ja: { m: "フォーク", p: "fōku" }
      },
      def: {
        fr: "Outil à dents courbes pour trier le crottin sans emporter toute la litière.",
        en: "Curved-tined tool for lifting droppings without throwing away good bedding."
      } },

    { ref: "abreuvoir", niveau: 2,
      mots: {
        fr: { m: "l'abreuvoir", p: "a-breu-vwar" },
        en: { m: "water trough", p: "oua-teur-trof", var: "automatic drinker" },
        es: { m: "el bebedero", p: "bé-bé-dé-ro" },
        it: { m: "l'abbeveratoio", p: "ab-bé-vé-ra-to-io" },
        de: { m: "die Tränke", p: "trèn-ke" },
        ja: { m: "水飲み場", p: "mizunomiba" }
      },
      def: {
        fr: "Point d'eau à volonté. À vérifier matin et soir, surtout l'hiver : une conduite gelée se voit vite.",
        en: "Constant water supply. Check morning and evening, especially in winter when pipes freeze."
      } },

    { ref: "longe", niveau: 2,
      mots: {
        fr: { m: "la longe", p: "lonj" },
        en: { m: "lead rope", p: "lid-rop" },
        es: { m: "el ramal", p: "ra-mal" },
        it: { m: "la longhina", p: "lon-gui-na" }, // ?? à confirmer : longhina / guinzaglio
        de: { m: "der Führstrick", p: "fur-chtrik" },
        ja: { m: "曳き手", p: "hikite" }
      },
      def: {
        fr: "Corde attachée au licol pour mener le cheval. Ne jamais l'enrouler autour de la main.",
        en: "Rope clipped to the headcollar for leading. Never wrap it around your hand."
      } },

    { ref: "fumier", niveau: 2,
      mots: {
        fr: { m: "le fumier", p: "fu-mié" },
        en: { m: "manure", p: "meu-nyour", var: "muck (GB)" },
        es: { m: "el estiércol", p: "és-tiér-kol" },
        it: { m: "il letame", p: "lé-ta-mé" },
        de: { m: "der Mist", p: "mist" },
        ja: { m: "堆肥", p: "taihi" }
      },
      def: {
        fr: "Mélange de crottin et de litière retiré du box, stocké sur le tas de fumier.",
        en: "Droppings and soiled bedding taken out of the box and stored on the muck heap."
      } },

    { ref: "sellerie", niveau: 2,
      mots: {
        fr: { m: "la sellerie", p: "sè-leu-ri" },
        en: { m: "tack room", p: "tak-roum" },
        es: { m: "el guadarnés", p: "goua-dar-nés", var: "cuarto de monturas" },
        it: { m: "la selleria", p: "sé-lé-ri-a" },
        de: { m: "die Sattelkammer", p: "za-teul-ka-meur" },
        ja: { m: "馬具庫", p: "bagukō" }
      },
      def: {
        fr: "Local où sont rangés selles, filets et matériel. Chaque cheval y a sa place attribuée.",
        en: "Room where saddles, bridles and kit are kept, each horse having its own spot."
      } },

    { ref: "copeaux", niveau: 2,
      mots: {
        fr: { m: "les copeaux", p: "ko-po" },
        en: { m: "shavings", p: "ché-vingz" },
        es: { m: "las virutas", p: "vi-rou-tas" },
        it: { m: "i trucioli", p: "trou-tcho-li" },
        de: { m: "die Sägespäne", p: "zé-gue-chpè-ne" },
        ja: { m: "おがくず", p: "ogakuzu" }
      },
      def: {
        fr: "Litière en bois, plus chère que la paille mais moins poussiéreuse : utile aux chevaux qui toussent.",
        en: "Wood bedding, dearer than straw but less dusty, useful for horses with a cough."
      } }
  ],

  /* Une phrase par chapitre pour l'exercice de remise en ordre.
     Le decoupage en tuiles est fait par le moteur, pas ici. */
  phrases: [
    { fr: "Tu peux remplir les seaux d'eau ?",
      en: "Can you fill the water buckets ?",
      es: "¿ Puedes llenar los cubos de agua ?",
      it: "Puoi riempire i secchi d'acqua ?",
      de: "Kannst du die Wassereimer füllen ?",
      ja: "水 の バケツ を いっぱい に して くれる ?" }
  ]
};
