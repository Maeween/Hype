/* hype-lingo-lex-elevage.js — Hype Linguae · l'élevage
   ==================================================================
   Écrit le 6 août 2026 pour Golegã (Portugal), sur délégation de
   Blandine : « Golegã c'est toi qui vois tu veux y mettre quoi ».

   POURQUOI L'ÉLEVAGE. C'est le plus gros trou du module : sur les 378
   mots d'origine, aucun ne parle de la naissance d'un cheval. On sait
   décrire sa robe, ses marques, son corps, mais pas d'où il vient. Le
   plan de production le prévoyait déjà pour cette ville
   (hype-linguae-production-suite.txt : « l'élevage : la poulinière, le
   poulain, le sevrage, la saillie, le stud-book, la lignée ») — ce
   fichier applique ce plan.

   ⚠️ NE PAS Y METTRE LA VENTE. `le marchand`, `l'essai`, `la visite
   d'achat`, `le prix`, `le contrat`, `la garantie` sont réservés à
   VÉRONE, et `le yearling`, `les ventes`, `le pedigree`, `la jument
   suitée` à LEXINGTON. Golegã fait naître, elle ne vend pas.

   ⚠️ TROIS ENTRÉES SONT DES RAPPELS : `poulain`, `etalon`, `jument`
   portent le même `ref` que dans hype-lingo-lex-cheval.js (et `poulain`
   aussi dans lex-poney.js). C'est voulu et documenté depuis le 5 août :
   la maîtrise est stockée par `ref`, donc un mot déjà croisé à Jerez ou
   à Lamotte arrive ici déjà acquis. Ne PAS les renommer.

   ⚠️ NEUF ENTRÉES SONT NEUVES et n'ont jamais été relues par un natif.
   Les plus à confirmer : `la saillie` (l'anglais distingue « covering »
   du service et « stud fee » du prix), `le stud-book` (mot anglais passé
   tel quel en français et en italien, mais l'allemand dit `Zuchtbuch`),
   et `le naisseur`, qui n'a pas d'équivalent exact en anglais — on dit
   simplement « the breeder ». À reporter dans hype-linguae-doutes.md.

   ⚠️ LE JAPONAIS DES PHRASES EST ÉCRIT AVEC DES ESPACES entre les
   groupes : `attendue.split(" ")` découpe la phrase en tuiles à remettre
   dans l'ordre, et sans espaces il n'y a rien à déplacer.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.elevage = {
  ref: "elevage",
  chapitre: 12,
  titre: { fr:"L'élevage", en:"Breeding", es:"La cría", it:"L'allevamento",
           de:"Die Zucht", ja:"繁殖" },
  lecons: 1,

  concepts: [

  /* ============ LEÇON 1 · L'ÉLEVAGE ============ */

  /* ---- rappels ---- */

  { ref:"poulain", lecon:1, coll:"elevage",
    mots:{ fr:{m:"le poulain"}, en:{m:"the foal", p:"fôle"},
           es:{m:"el potro"}, it:{m:"il puledro"},
           de:{m:"das Fohlen", p:"fô-leune"}, ja:{m:"子馬", p:"kouma"} },
    def:{ fr:"Le petit, jusqu'au sevrage puis jusqu'à un an. Déjà croisé à Jerez et à Lamotte : ici, tu le vois naître.",
          en:"The young one, until weaning and then its first year. Already met at Jerez and Lamotte: here you see it born." } },

  { ref:"etalon", lecon:1, coll:"elevage",
    mots:{ fr:{m:"l'étalon"}, en:{m:"the stallion", p:"sta-lieune"},
           es:{m:"el semental"}, it:{m:"lo stallone"},
           de:{m:"der Hengst", p:"hèngst"}, ja:{m:"種牡馬", p:"shubokuba"} },
    def:{ fr:"Le mâle reproducteur. ⚠️ Tous les mâles non castrés sont des entiers ; seuls ceux qu'on fait reproduire sont des étalons.",
          en:"The breeding male. Careful: every uncastrated male is a colt or an entire; only those used for breeding are stallions." } },

  { ref:"jument", lecon:1, coll:"elevage",
    mots:{ fr:{m:"la jument"}, en:{m:"the mare", p:"mèr"},
           es:{m:"la yegua"}, it:{m:"la cavalla", var:"la giumenta"},
           de:{m:"die Stute", p:"chtou-te"}, ja:{m:"牝馬", p:"hinba"} },
    def:{ fr:"La femelle. Elle porte onze mois environ, et on la fait souvent saillir peu après avoir mis bas.",
          en:"The female. She carries for about eleven months, and is often covered again soon after foaling." } },

  /* ---- entrées neuves, non relues par un natif ---- */

  { ref:"elevage", lecon:1, coll:"elevage",
    mots:{ fr:{m:"l'élevage"}, en:{m:"the stud", p:"steud", var:"the breeding operation"},
           es:{m:"la cría", var:"la yeguada"}, it:{m:"l'allevamento"},
           de:{m:"die Zucht", p:"tsoukht", var:"das Gestüt"},
           ja:{m:"繁殖", p:"hanshoku"} },
    def:{ fr:"Faire naître des chevaux, et le lieu où on le fait. ⚠️ « The stud » désigne l'endroit ; l'activité se dit « breeding ». Ne pas confondre avec le haras d'État, qui est « the state stud ».",
          en:"Breeding horses, and the place where it is done. « The stud » is the place; the activity is « breeding »." } },

  { ref:"naisseur", lecon:1, coll:"elevage",
    mots:{ fr:{m:"le naisseur", var:"l'éleveur"}, en:{m:"the breeder", p:"bri-deur"},
           es:{m:"el criador"}, it:{m:"l'allevatore"},
           de:{m:"der Züchter", p:"tsuchh-teur"}, ja:{m:"生産者", p:"seisansha"} },
    def:{ fr:"Celui qui décide des croisements et élève les poulains. ⚠️ Le français distingue le naisseur, qui fait naître, de l'éleveur, qui élève ensuite ; l'anglais n'a qu'un mot pour les deux.",
          en:"The one who chooses the matings and raises the foals. French separates the naisseur, who breeds, from the éleveur, who raises; English has one word for both." } },

  { ref:"poulinière", lecon:1, coll:"elevage",
    mots:{ fr:{m:"la poulinière"}, en:{m:"the broodmare", p:"broud-mèr"},
           es:{m:"la yegua de vientre"}, it:{m:"la fattrice"},
           de:{m:"die Zuchtstute", p:"tsoukht-chtou-te"},
           ja:{m:"繁殖牝馬", p:"hanshoku hinba"} },
    def:{ fr:"La jument gardée pour la reproduction. Beaucoup n'ont jamais été montées, et leur valeur se lit dans les performances de leurs produits.",
          en:"The mare kept for breeding. Many have never been ridden, and their worth is read in what their offspring achieve." } },

  { ref:"saillie", lecon:1, coll:"elevage",
    mots:{ fr:{m:"la saillie"}, en:{m:"the covering", p:"ka-ve-ring"},
           es:{m:"la cubrición"}, it:{m:"la monta"},
           de:{m:"der Deckakt", p:"dèk-akt"}, ja:{m:"交配", p:"kōhai"} },
    def:{ fr:"L'accouplement, en main ou en liberté, ou par insémination. ⚠️ Le prix demandé pour un étalon ne se dit pas « covering » mais « stud fee ».",
          en:"The mating, in hand or at liberty, or by insemination. The fee asked for a stallion is a « stud fee », not a « covering »." } },

  { ref:"poulinage", lecon:1, coll:"elevage",
    mots:{ fr:{m:"le poulinage", var:"mettre bas"}, en:{m:"foaling", p:"fô-ling"},
           es:{m:"el parto"}, it:{m:"il parto"},
           de:{m:"die Geburt", p:"gue-bourt", var:"das Abfohlen"},
           ja:{m:"分娩", p:"bunben"} },
    def:{ fr:"La mise au monde. Elle dure souvent moins de trente minutes et arrive presque toujours la nuit — c'est pour ça qu'on veille.",
          en:"The birth. It often takes under thirty minutes and almost always happens at night — which is why someone sits up." } },

  { ref:"sevrage", lecon:1, coll:"elevage",
    mots:{ fr:{m:"le sevrage"}, en:{m:"the weaning", p:"oui-ning"},
           es:{m:"el destete"}, it:{m:"lo svezzamento"},
           de:{m:"das Absetzen", p:"ap-zè-tseune"}, ja:{m:"離乳", p:"rinyū"} },
    def:{ fr:"La séparation du poulain et de sa mère, vers cinq ou six mois. On sépare progressivement, et rarement seul : un poulain sevré avec un compagnon crie moins.",
          en:"Separating foal from mother, at around five or six months. It is done gradually, and rarely alone: a foal weaned with a companion calls less." } },

  { ref:"lignee", lecon:1, coll:"elevage",
    mots:{ fr:{m:"la lignée"}, en:{m:"the bloodline", p:"bleud-laïne"},
           es:{m:"la línea de sangre"}, it:{m:"la linea di sangue"},
           de:{m:"die Blutlinie", p:"bloutt-li-nie"}, ja:{m:"血統", p:"kettō"} },
    def:{ fr:"La suite des ancêtres dont on attend un caractère ou un modèle. C'est la question qu'on pose en premier dans un élevage : « de quelle lignée vient-il ? »",
          en:"The line of ancestors from which a temperament or a type is expected. It is the first question asked at a stud: « what is he bred from ? »" } },

  { ref:"stud-book", lecon:1, coll:"elevage",
    mots:{ fr:{m:"le stud-book"}, en:{m:"the stud book"},
           es:{m:"el libro genealógico"}, it:{m:"il libro genealogico"},
           de:{m:"das Zuchtbuch", p:"tsoukht-boukh"},
           ja:{m:"血統登録簿", p:"kettō tōrokubo"} },
    def:{ fr:"Le registre officiel d'une race : qui y est inscrit en est, qui n'y est pas n'en est pas. ⚠️ Le français et l'italien gardent le mot anglais ; l'allemand et l'espagnol le traduisent.",
          en:"The official register of a breed: in it you belong, out of it you do not. French and Italian keep the English word; German and Spanish translate it." } },

  { ref:"lusitanien", lecon:1, coll:"elevage",
    mots:{ fr:{m:"le lusitanien"}, en:{m:"the Lusitano", p:"lou-zi-ta-no"},
           es:{m:"el lusitano"}, it:{m:"il lusitano"},
           de:{m:"der Lusitano"}, ja:{m:"ルシタノ", p:"rushitano"} },
    def:{ fr:"La race du Portugal : encolure ronde et haute, crins longs, très maniable. Cousine du pura raza española, dont elle a été séparée officiellement en 1967.",
          en:"Portugal's breed: a round, high-set neck, long mane, remarkably handy. Cousin to the pura raza española, from which it was officially separated in 1967." } }

  ],

  phrases: [

  { ref:"ph-elevage-lignee", lecon:1,
      fr:"De quelle lignée vient-il ?",
      en:"What is he bred from ?",
      es:"¿ De qué línea viene ?",
      it:"Da quale linea viene ?",
      de:"Aus welcher Blutlinie stammt er ?",
      ja:"どの 血統 から 来て い ます か ?" },

  { ref:"ph-elevage-pouline", lecon:1,
      fr:"Elle a pouliné cette année ?",
      en:"Has she foaled this year ?",
      es:"¿ Ha parido este año ?",
      it:"Ha figliato quest'anno ?",
      de:"Hat sie dieses Jahr abgefohlt ?",
      ja:"今年 は 出産 し まし た か ?" },

  { ref:"ph-elevage-sevre", lecon:1,
      fr:"Le poulain est déjà sevré ?",
      en:"Is the foal weaned yet ?",
      es:"¿ El potro ya está destetado ?",
      it:"Il puledro è già svezzato ?",
      de:"Ist das Fohlen schon abgesetzt ?",
      ja:"子馬 は もう 離乳 し まし た か ?" },

  { ref:"ph-elevage-inscrit", lecon:1,
      fr:"Il est inscrit au stud-book ?",
      en:"Is he in the stud book ?",
      es:"¿ Está inscrito en el libro genealógico ?",
      it:"È iscritto al libro genealogico ?",
      de:"Ist er im Zuchtbuch eingetragen ?",
      ja:"血統 登録簿 に 登録 さ れ て い ます か ?" }

  ]
};
