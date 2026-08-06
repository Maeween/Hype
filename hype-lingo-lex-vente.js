/* hype-lingo-lex-vente.js — Hype Linguae · acheter et vendre
   ==================================================================
   Écrit le 6 août 2026 pour Vérone (Italie), étape 21.
   Prévu depuis le début par hype-linguae-production-suite.txt :
   « Vérone — le commerce : le marchand, l'essai, la visite d'achat,
   le prix, le contrat, la garantie ». Ce fichier applique ce plan.

   POURQUOI CE CHAPITRE. C'est le seul moment de la vie d'un cavalier où
   se tromper coûte cher, et il n'existait nulle part dans les 378 mots
   d'origine. Fieracavalli, à Vérone, est le grand rendez-vous italien du
   cheval depuis 1898 : on y montre, on y essaie, on y vend.

   ⚠️ NE PAS Y METTRE L'ÉLEVAGE. `la poulinière`, `la saillie`, `le
   sevrage`, `la lignée`, `le stud-book` appartiennent à GOLEGÃ, et `le
   yearling`, `les ventes aux enchères`, `le pedigree`, `la jument
   suitée` à LEXINGTON. Vérone achète et vend ce qui est déjà né.

   ⚠️ NIVEAU 3. C'est le chapitre le plus parlé du voyage : on y négocie,
   on y pose des questions gênantes, on y dit non. Les exercices « dire »
   entrent donc dans le tirage (voir NIVEAU_VILLE et exercicePour).

   ⚠️ ONZE ENTRÉES SONT NEUVES et n'ont jamais été relues par un natif.
   Les plus à confirmer : `le vice caché` (notion juridique française, dont
   l'équivalent anglais « latent defect » n'a pas la même portée légale),
   `la visite d'achat` (l'anglais dit « the vetting », un nom d'action qui
   n'a pas de calque), et `la garantie` (l'italien distingue `garanzia` de
   `vizi occulti`). À reporter dans hype-linguae-doutes.md.

   ⚠️ LE JAPONAIS DES PHRASES EST ÉCRIT AVEC DES ESPACES entre les
   groupes : `attendue.split(" ")` en fait les tuiles à remettre dans
   l'ordre.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.vente = {
  ref: "vente",
  chapitre: 13,
  titre: { fr:"Acheter et vendre", en:"Buying and selling", es:"Comprar y vender",
           it:"Comprare e vendere", de:"Kaufen und verkaufen", ja:"売買" },
  lecons: 1,

  concepts: [

  /* ============ LEÇON 1 · ACHETER ET VENDRE ============ */

  /* ---- rappel ---- */

  { ref:"prix", lecon:1, coll:"vente",
    mots:{ fr:{m:"le prix"}, en:{m:"the price", p:"praïss"},
           es:{m:"el precio"}, it:{m:"il prezzo"},
           de:{m:"der Preis", p:"praïss"}, ja:{m:"値段", p:"nedan"} },
    def:{ fr:"Déjà croisé à La Baule pour un tarif de reprise. Ici il porte sur le cheval entier, et il se discute.",
          en:"Already met at La Baule for a lesson fee. Here it covers the whole horse, and it is open to discussion." } },

  /* ---- entrées neuves, non relues par un natif ---- */

  { ref:"marchand", lecon:1, coll:"vente",
    mots:{ fr:{m:"le marchand"}, en:{m:"the dealer", p:"di-leur"},
           es:{m:"el tratante", var:"el comerciante"}, it:{m:"il commerciante"},
           de:{m:"der Händler", p:"hènd-leur"}, ja:{m:"馬商", p:"bashō"} },
    def:{ fr:"Celui qui achète pour revendre. ⚠️ Ce n'est ni un défaut ni une garantie : un bon marchand vit de sa réputation, un mauvais du fait qu'on ne revient pas.",
          en:"Someone who buys to sell on. Neither a flaw nor a guarantee: a good dealer lives on reputation, a bad one on the fact that you never come back." } },

  { ref:"essai", lecon:1, coll:"vente",
    mots:{ fr:{m:"l'essai"}, en:{m:"the try-out", p:"traï-aoutt", var:"the viewing"},
           es:{m:"la prueba"}, it:{m:"la prova"},
           de:{m:"der Probereiten", p:"pro-be-raï-teune", var:"das Proberitt"},
           ja:{m:"試乗", p:"shijō"} },
    def:{ fr:"Monter le cheval avant d'acheter. On demande à le voir sortir du box, à le panser soi-même et à le monter seul — pas seulement à le regarder travailler.",
          en:"Riding the horse before buying. Ask to see it come out of the stable, to groom it yourself and to ride it alone — not just to watch it work." } },

  { ref:"visite-achat", lecon:1, coll:"vente",
    mots:{ fr:{m:"la visite d'achat"}, en:{m:"the vetting", p:"vè-ting"},
           es:{m:"la revisión veterinaria"}, it:{m:"la visita d'acquisto"},
           de:{m:"die Ankaufsuntersuchung", p:"ann-kaoufs-oun-ter-zou-khoung"},
           ja:{m:"購買前検査", p:"kōbaimae kensa"} },
    def:{ fr:"L'examen vétérinaire payé par l'acheteur, avant la vente. ⚠️ Elle est faite par TON vétérinaire, jamais par celui du vendeur — c'est la règle la plus importante de ce chapitre.",
          en:"The veterinary examination paid for by the buyer, before the sale. It is done by YOUR vet, never the seller's — the most important rule in this chapter." } },

  { ref:"radiographie", lecon:1, coll:"vente",
    mots:{ fr:{m:"la radiographie", var:"la radio"}, en:{m:"the x-ray", p:"èks-rèï"},
           es:{m:"la radiografía"}, it:{m:"la radiografia"},
           de:{m:"das Röntgenbild", p:"reunt-gueune-bilt"},
           ja:{m:"レントゲン", p:"rentogen"} },
    def:{ fr:"Les clichés des pieds, des jarrets, du dos. Elles ne disent pas si le cheval va bien : elles disent ce qui pourrait arriver.",
          en:"The images of feet, hocks, back. They do not say the horse is sound: they say what might happen later." } },

  { ref:"negocier", lecon:1, coll:"vente",
    mots:{ fr:{m:"négocier"}, en:{m:"to haggle", p:"ha-gueul", var:"to negotiate"},
           es:{m:"regatear"}, it:{m:"trattare"},
           de:{m:"verhandeln", p:"fèr-hann-deune"}, ja:{m:"値段交渉", p:"nedan kōshō"} },
    def:{ fr:"Discuter le prix. ⚠️ En anglais « to haggle » sonne marché aux puces ; entre professionnels on dit plutôt « to negotiate ». Dans les deux cas on annonce un budget, on ne demande pas une remise.",
          en:"Discussing the price. « To haggle » sounds like a flea market; between professionals say « to negotiate ». Either way you state a budget, you do not ask for a discount." } },

  { ref:"contrat", lecon:1, coll:"vente",
    mots:{ fr:{m:"le contrat de vente"}, en:{m:"the sale contract"},
           es:{m:"el contrato de venta"}, it:{m:"il contratto di vendita"},
           de:{m:"der Kaufvertrag", p:"kaouf-fèr-trak"},
           ja:{m:"売買契約書", p:"baibai keiyakusho"} },
    def:{ fr:"L'écrit qui dit qui vend, quoi, à quel prix et dans quel état. Sans lui, une vente de cheval reste juridiquement valable — mais impossible à contester.",
          en:"The document stating who sells, what, at what price and in what condition. Without it a horse sale is still legally valid — but impossible to challenge." } },

  { ref:"garantie", lecon:1, coll:"vente",
    mots:{ fr:{m:"la garantie"}, en:{m:"the warranty", p:"oua-reune-ti"},
           es:{m:"la garantía"}, it:{m:"la garanzia"},
           de:{m:"die Garantie", p:"ga-rann-ti"}, ja:{m:"保証", p:"hoshō"} },
    def:{ fr:"Ce que le vendeur s'engage à assumer après la vente. ⚠️ Entre particuliers, elle est souvent nulle : ce qui protège vraiment, c'est la visite d'achat, pas la promesse.",
          en:"What the seller undertakes to answer for after the sale. Between private individuals it is often nothing: what protects you is the vetting, not the promise." } },

  { ref:"vice-cache", lecon:1, coll:"vente",
    mots:{ fr:{m:"le vice caché"}, en:{m:"the latent defect", p:"lè-teunt"},
           es:{m:"el vicio oculto"}, it:{m:"il vizio occulto"},
           de:{m:"der versteckte Mangel", p:"fèr-chtèk-te mann-gueul"},
           ja:{m:"隠れた欠陥", p:"kakureta kekkan"} },
    def:{ fr:"Un défaut que le vendeur connaissait et n'a pas dit. ⚠️ Notion juridique française : « latent defect » existe en anglais mais n'ouvre pas les mêmes recours. Ne jamais supposer que la loi de chez toi s'applique.",
          en:"A fault the seller knew of and did not disclose. A French legal notion: « latent defect » exists in English but does not open the same remedies. Never assume your own law applies." } },

  { ref:"passeport", lecon:1, coll:"vente",
    mots:{ fr:{m:"le passeport"}, en:{m:"the passport", p:"pass-port"},
           es:{m:"el pasaporte"}, it:{m:"il passaporto"},
           de:{m:"der Equidenpass", p:"é-koui-deune-pass"},
           ja:{m:"馬パスポート", p:"uma pasupōto"} },
    def:{ fr:"Le document obligatoire qui suit le cheval toute sa vie : identité, signalement, vaccinations, propriétaire. Pas de passeport, pas de vente — et pas de déplacement légal.",
          en:"The compulsory document that follows the horse for life: identity, markings, vaccinations, owner. No passport, no sale — and no legal movement." } },

  { ref:"budget", lecon:1, coll:"vente",
    mots:{ fr:{m:"le budget"}, en:{m:"the budget", p:"beu-djètt"},
           es:{m:"el presupuesto"}, it:{m:"il budget", var:"la disponibilità"},
           de:{m:"das Budget", p:"bu-djé"}, ja:{m:"予算", p:"yosan"} },
    def:{ fr:"Ce que tu peux mettre, annoncé d'emblée. C'est la phrase qui fait gagner le plus de temps sur un champ de foire : on te montre alors les chevaux qui existent pour toi.",
          en:"What you can spend, said up front. It is the sentence that saves the most time at a fair: you are then shown the horses that exist for you." } },

  { ref:"foire", lecon:1, coll:"vente",
    mots:{ fr:{m:"la foire"}, en:{m:"the fair", p:"fèr"},
           es:{m:"la feria"}, it:{m:"la fiera"},
           de:{m:"die Messe", p:"mè-se"}, ja:{m:"見本市", p:"mihon'ichi"} },
    def:{ fr:"Le rendez-vous où l'on montre et où l'on vend, toutes races confondues. ⚠️ Ce n'est pas la feria andalouse de Séville, qui est une fête et ne classe personne : ici on conclut.",
          en:"The gathering where horses are shown and sold, all breeds together. Not the Andalusian feria of Seville, which is a celebration and places nobody: here, deals are done." } }

  ],

  phrases: [

  { ref:"ph-vente-essayer", lecon:1,
      fr:"Est-ce que je peux l'essayer seule ?",
      en:"May I try him on my own ?",
      es:"¿ Puedo probarlo yo sola ?",
      it:"Posso provarlo da sola ?",
      de:"Darf ich ihn allein probieren ?",
      ja:"一人 で 試乗 し て も いい です か ?" },

  { ref:"ph-vente-veto", lecon:1,
      fr:"La visite d'achat sera faite par mon vétérinaire.",
      en:"The vetting will be done by my own vet.",
      es:"La revisión veterinaria la hará mi veterinario.",
      it:"La visita d'acquisto la farà il mio veterinario.",
      de:"Die Ankaufsuntersuchung macht mein Tierarzt.",
      ja:"購買前 検査 は 私 の 獣医 が 行い ます。" },

  { ref:"ph-vente-budget", lecon:1,
      fr:"Mon budget s'arrête là. Vous avez autre chose ?",
      en:"That is the top of my budget. Do you have anything else ?",
      es:"Mi presupuesto llega hasta ahí. ¿ Tiene algo más ?",
      it:"Il mio budget si ferma qui. Ha qualcos'altro ?",
      de:"Da endet mein Budget. Haben Sie noch etwas anderes ?",
      ja:"予算 は そこ まで です。 ほか に あり ます か ?" },

  { ref:"ph-vente-papiers", lecon:1,
      fr:"Je peux voir son passeport et ses radios ?",
      en:"May I see his passport and his x-rays ?",
      es:"¿ Puedo ver su pasaporte y sus radiografías ?",
      it:"Posso vedere il passaporto e le radiografie ?",
      de:"Darf ich seinen Equidenpass und die Röntgenbilder sehen ?",
      ja:"パスポート と レントゲン を 見 て も いい です か ?" }

  ]
};
