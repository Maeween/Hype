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

  /* ⚠️ CE N'EST PAS UN RAPPEL, et il a failli en devenir un par erreur.
     J'avais nomme cette entree `prix` en la presentant comme un rappel de
     La Baule. Deux fautes : le mot n'est pas a La Baule mais dans le
     chapitre CONCOURS, et surtout il n'y designe PAS la meme chose — la-bas
     `prix` est l'argent qu'on GAGNE (« the prize money »), ici c'est
     l'argent qu'on PAIE (« the price »). Aucune langue ne les confond.
     Partager le `ref` aurait fait passer « prize money », su a Badminton,
     pour « price » acquis a Verone, et l'exercice aurait teste la mauvaise
     traduction. Renomme `prix-achat`, et precise en meme temps.
     ⚠️ Trouve par le controle automatique des `ref` partages, pas a l'oeil. */

  { ref:"prix-achat", lecon:1, coll:"vente",
    mots:{ fr:{m:"le prix demandé"}, en:{m:"the asking price", p:"ass-king praïss"},
           es:{m:"el precio pedido"}, it:{m:"il prezzo richiesto"},
           de:{m:"der Kaufpreis", p:"kaouf-praïss"}, ja:{m:"売り値", p:"urine"} },
    def:{ fr:"Ce que le vendeur annonce, et qui n'est pas ce que tu paieras. ⚠️ À ne pas confondre avec le prix d'un concours, qui est l'argent qu'on gagne : l'anglais dit « the prize money » dans un cas et « the price » dans l'autre.",
          en:"What the seller asks, which is not what you will pay. Not to be confused with a prize at a show: that is prize money, this is a price.",
          es:"Lo que anuncia el vendedor, y que no es lo que pagarás. ⚠️ No confundir con el premio de un concurso, que es el dinero que se gana: el inglés dice « the prize money » en un caso y « the price » en el otro.",
          it:"Ciò che annuncia il venditore, e che non è ciò che pagherai. ⚠️ Da non confondere con il premio di un concorso, che è il denaro che si vince: l'inglese dice « the prize money » in un caso e « the price » nell'altro.",
          de:"Was der Verkäufer nennt — und was du nicht zahlen wirst. ⚠️ Nicht mit dem Preis eines Turniers verwechseln, dem Geld, das man GEWINNT: Englisch sagt dort « the prize money », hier « the price ».",
          ja:"売り手が口にする額 — そして、きみが実際に払う額ではありません。⚠️ 競技会の「賞金」と混同しないこと。英語は勝ち取るお金を « the prize money »、払うお金を « the price » と言い分けます。" } },

  /* ---- entrées neuves, non relues par un natif ---- */

  { ref:"marchand", lecon:1, coll:"vente",
    mots:{ fr:{m:"le marchand"}, en:{m:"the dealer", p:"di-leur"},
           es:{m:"el tratante", var:"el comerciante"}, it:{m:"il commerciante"},
           de:{m:"der Händler", p:"hènd-leur"}, ja:{m:"馬商", p:"bashō"} },
    def:{ fr:"Celui qui achète pour revendre. ⚠️ Ce n'est ni un défaut ni une garantie : un bon marchand vit de sa réputation, un mauvais du fait qu'on ne revient pas.",
          en:"Someone who buys to sell on. Neither a flaw nor a guarantee: a good dealer lives on reputation, a bad one on the fact that you never come back.",
          es:"El que compra para revender. ⚠️ No es ni un defecto ni una garantía: un buen tratante vive de su reputación, uno malo de que no vuelvas.",
          it:"Chi compra per rivendere. ⚠️ Non è né un difetto né una garanzia: un buon commerciante vive della sua reputazione, uno cattivo del fatto che non torni.",
          de:"Wer kauft, um weiterzuverkaufen. ⚠️ Weder Makel noch Garantie: Ein guter Händler lebt von seinem Ruf — ein schlechter davon, dass man nicht wiederkommt.",
          ja:"転売のために買う人。⚠️ それ自体は欠点でも保証でもありません。良い馬商は評判で生き、悪い馬商は客が二度と戻らないことで生きています。" } },

  { ref:"essai", lecon:1, coll:"vente",
    mots:{ fr:{m:"l'essai"}, en:{m:"the try-out", p:"traï-aoutt", var:"the viewing"},
           es:{m:"la prueba"}, it:{m:"la prova"},
           de:{m:"der Probereiten", p:"pro-be-raï-teune", var:"das Proberitt"},
           ja:{m:"試乗", p:"shijō"} },
    def:{ fr:"Monter le cheval avant d'acheter. On demande à le voir sortir du box, à le panser soi-même et à le monter seul — pas seulement à le regarder travailler.",
          en:"Riding the horse before buying. Ask to see it come out of the stable, to groom it yourself and to ride it alone — not just to watch it work.",
          es:"Montar el caballo antes de comprar. Se pide verlo salir del box, almohazarlo uno mismo y montarlo solo — no solo mirarlo trabajar.",
          it:"Montare il cavallo prima di comprare. Si chiede di vederlo uscire dal box, di pulirlo da sé e di montarlo da soli — non solo di guardarlo lavorare.",
          de:"Das Pferd vor dem Kauf reiten. Man bittet darum, es aus der Box kommen zu sehen, es selbst zu putzen und allein zu reiten — nicht nur zuzusehen.",
          ja:"買う前に馬に乗ってみること。馬房から出てくる姿を見せてもらい、自分の手で手入れをし、一人で乗せてもらうこと — 運動する姿を眺めるだけでは足りません。" } },

  { ref:"visite-achat", lecon:1, coll:"vente",
    mots:{ fr:{m:"la visite d'achat"}, en:{m:"the vetting", p:"vè-ting"},
           es:{m:"la revisión veterinaria"}, it:{m:"la visita d'acquisto"},
           de:{m:"die Ankaufsuntersuchung", p:"ann-kaoufs-oun-ter-zou-khoung"},
           ja:{m:"購買前検査", p:"kōbaimae kensa"} },
    def:{ fr:"L'examen vétérinaire payé par l'acheteur, avant la vente. ⚠️ Elle est faite par TON vétérinaire, jamais par celui du vendeur — c'est la règle la plus importante de ce chapitre.",
          en:"The veterinary examination paid for by the buyer, before the sale. It is done by YOUR vet, never the seller's — the most important rule in this chapter.",
          es:"El examen veterinario pagado por el comprador, antes de la venta. ⚠️ La hace TU veterinario, jamás el del vendedor — la regla más importante de este capítulo.",
          it:"L'esame veterinario pagato dal compratore, prima della vendita. ⚠️ La fa il TUO veterinario, mai quello del venditore — la regola più importante di questo capitolo.",
          de:"Die tierärztliche Untersuchung vor dem Kauf, vom Käufer bezahlt. ⚠️ DEIN Tierarzt macht sie, nie der des Verkäufers — die wichtigste Regel dieses Kapitels.",
          ja:"売買の前に、買い手の負担で行う獣医検査。⚠️ 検査するのはきみの獣医であって、売り手の獣医では決してありません — この章でいちばん大切な規則です。" } },

  { ref:"radiographie", lecon:1, coll:"vente",
    mots:{ fr:{m:"la radiographie", var:"la radio"}, en:{m:"the x-ray", p:"èks-rèï"},
           es:{m:"la radiografía"}, it:{m:"la radiografia"},
           de:{m:"das Röntgenbild", p:"reunt-gueune-bilt"},
           ja:{m:"レントゲン", p:"rentogen"} },
    def:{ fr:"Les clichés des pieds, des jarrets, du dos. Elles ne disent pas si le cheval va bien : elles disent ce qui pourrait arriver.",
          en:"The images of feet, hocks, back. They do not say the horse is sound: they say what might happen later.",
          es:"Las placas de los pies, los corvejones, el dorso. No dicen si el caballo está bien: dicen lo que podría pasar.",
          it:"Le lastre dei piedi, dei garretti, del dorso. Non dicono se il cavallo sta bene: dicono ciò che potrebbe accadere.",
          de:"Die Bilder von Hufen, Sprunggelenken, Rücken. Sie sagen nicht, dass das Pferd gesund ist — sie sagen, was später kommen könnte.",
          ja:"蹄、飛節、背中の撮影画像。馬が今健康かどうかを語るのではなく、この先に何が起こりうるかを語るものです。" } },

  { ref:"negocier", lecon:1, coll:"vente",
    mots:{ fr:{m:"négocier"}, en:{m:"to haggle", p:"ha-gueul", var:"to negotiate"},
           es:{m:"regatear"}, it:{m:"trattare"},
           de:{m:"verhandeln", p:"fèr-hann-deune"}, ja:{m:"値段交渉", p:"nedan kōshō"} },
    def:{ fr:"Discuter le prix. ⚠️ En anglais « to haggle » sonne marché aux puces ; entre professionnels on dit plutôt « to negotiate ». Dans les deux cas on annonce un budget, on ne demande pas une remise.",
          en:"Discussing the price. « To haggle » sounds like a flea market; between professionals say « to negotiate ». Either way you state a budget, you do not ask for a discount.",
          es:"Discutir el precio. ⚠️ En inglés « to haggle » suena a mercadillo; entre profesionales se dice « to negotiate ». En ambos casos se anuncia un presupuesto, no se pide una rebaja.",
          it:"Discutere il prezzo. ⚠️ In inglese « to haggle » sa di mercatino; tra professionisti si dice « to negotiate ». In entrambi i casi si annuncia un budget, non si chiede uno sconto.",
          de:"Über den Preis reden. ⚠️ « To haggle » klingt nach Flohmarkt; unter Profis sagt man « to negotiate ». In beiden Fällen nennt man ein Budget — man bittet nicht um Rabatt.",
          ja:"値段について話すこと。⚠️ 英語の « to haggle » は蚤の市の響き。プロ同士なら « to negotiate » と言います。どちらにせよ、口にするのは予算であって、値引きのお願いではありません。" } },

  { ref:"contrat", lecon:1, coll:"vente",
    mots:{ fr:{m:"le contrat de vente"}, en:{m:"the sale contract"},
           es:{m:"el contrato de venta"}, it:{m:"il contratto di vendita"},
           de:{m:"der Kaufvertrag", p:"kaouf-fèr-trak"},
           ja:{m:"売買契約書", p:"baibai keiyakusho"} },
    def:{ fr:"L'écrit qui dit qui vend, quoi, à quel prix et dans quel état. Sans lui, une vente de cheval reste juridiquement valable — mais impossible à contester.",
          en:"The document stating who sells, what, at what price and in what condition. Without it a horse sale is still legally valid — but impossible to challenge.",
          es:"El escrito que dice quién vende, qué, a qué precio y en qué estado. Sin él, una venta de caballo sigue siendo válida jurídicamente — pero imposible de impugnar.",
          it:"Lo scritto che dice chi vende, cosa, a che prezzo e in che stato. Senza, una vendita di cavallo resta giuridicamente valida — ma impossibile da contestare.",
          de:"Das Schriftstück, das sagt, wer was, zu welchem Preis und in welchem Zustand verkauft. Ohne es bleibt ein Pferdekauf rechtsgültig — aber unanfechtbar.",
          ja:"誰が、何を、いくらで、どんな状態で売るのかを記した書面。なくても売買は法的に成立します — ただし、あとから争うことはできなくなります。" } },

  { ref:"garantie", lecon:1, coll:"vente",
    mots:{ fr:{m:"la garantie"}, en:{m:"the warranty", p:"oua-reune-ti"},
           es:{m:"la garantía"}, it:{m:"la garanzia"},
           de:{m:"die Garantie", p:"ga-rann-ti"}, ja:{m:"保証", p:"hoshō"} },
    def:{ fr:"Ce que le vendeur s'engage à assumer après la vente. ⚠️ Entre particuliers, elle est souvent nulle : ce qui protège vraiment, c'est la visite d'achat, pas la promesse.",
          en:"What the seller undertakes to answer for after the sale. Between private individuals it is often nothing: what protects you is the vetting, not the promise.",
          es:"Lo que el vendedor se compromete a asumir tras la venta. ⚠️ Entre particulares suele ser nula: lo que protege de verdad es la revisión veterinaria, no la promesa.",
          it:"Ciò che il venditore si impegna ad assumersi dopo la vendita. ⚠️ Tra privati è spesso nulla: ciò che protegge davvero è la visita d'acquisto, non la promessa.",
          de:"Wofür der Verkäufer nach dem Kauf einstehen will. ⚠️ Zwischen Privatleuten ist sie oft nichts wert: Was wirklich schützt, ist die Ankaufsuntersuchung — nicht das Versprechen.",
          ja:"売ったあとについて売り手が引き受けると約束するもの。⚠️ 個人間ではしばしば無に等しい。本当にきみを守るのは約束ではなく、購買前検査です。" } },

  { ref:"vice-cache", lecon:1, coll:"vente",
    mots:{ fr:{m:"le vice caché"}, en:{m:"the latent defect", p:"lè-teunt"},
           es:{m:"el vicio oculto"}, it:{m:"il vizio occulto"},
           de:{m:"der versteckte Mangel", p:"fèr-chtèk-te mann-gueul"},
           ja:{m:"隠れた欠陥", p:"kakureta kekkan"} },
    def:{ fr:"Un défaut que le vendeur connaissait et n'a pas dit. ⚠️ Notion juridique française : « latent defect » existe en anglais mais n'ouvre pas les mêmes recours. Ne jamais supposer que la loi de chez toi s'applique.",
          en:"A fault the seller knew of and did not disclose. A French legal notion: « latent defect » exists in English but does not open the same remedies. Never assume your own law applies.",
          es:"Un defecto que el vendedor conocía y no dijo. ⚠️ Noción jurídica francesa: « latent defect » existe en inglés pero no abre los mismos recursos. Jamás supongas que la ley de tu país se aplica.",
          it:"Un difetto che il venditore conosceva e non ha detto. ⚠️ Nozione giuridica francese: « latent defect » esiste in inglese ma non apre gli stessi ricorsi. Mai supporre che la legge di casa tua si applichi.",
          de:"Ein Mangel, den der Verkäufer kannte und verschwieg. ⚠️ Ein französischer Rechtsbegriff: « latent defect » existiert im Englischen, eröffnet aber nicht dieselben Wege. Nie annehmen, dass dein Heimatrecht gilt.",
          ja:"売り手が知っていて黙っていた欠陥。⚠️ フランス法の概念です。英語の « latent defect » は存在しますが、同じ救済は開きません。自分の国の法律が通用すると思い込まないこと。" } },

  { ref:"passeport", lecon:1, coll:"vente",
    mots:{ fr:{m:"le passeport"}, en:{m:"the passport", p:"pass-port"},
           es:{m:"el pasaporte"}, it:{m:"il passaporto"},
           de:{m:"der Equidenpass", p:"é-koui-deune-pass"},
           ja:{m:"馬パスポート", p:"uma pasupōto"} },
    def:{ fr:"Le document obligatoire qui suit le cheval toute sa vie : identité, signalement, vaccinations, propriétaire. Pas de passeport, pas de vente — et pas de déplacement légal.",
          en:"The compulsory document that follows the horse for life: identity, markings, vaccinations, owner. No passport, no sale — and no legal movement.",
          es:"El documento obligatorio que sigue al caballo toda su vida: identidad, reseña, vacunas, propietario. Sin pasaporte no hay venta — ni desplazamiento legal.",
          it:"Il documento obbligatorio che segue il cavallo tutta la vita: identità, segnalamento, vaccini, proprietario. Niente passaporto, niente vendita — né spostamento legale.",
          de:"Das Pflichtdokument, das dem Pferd ein Leben lang folgt: Identität, Abzeichen, Impfungen, Besitzer. Kein Pass, kein Verkauf — und kein legaler Transport.",
          ja:"馬に一生ついて回る必須の書類。個体識別、特徴、ワクチン、所有者。パスポートがなければ売買もできず、合法的な移動すらできません。" } },

  { ref:"budget", lecon:1, coll:"vente",
    mots:{ fr:{m:"le budget"}, en:{m:"the budget", p:"beu-djètt"},
           es:{m:"el presupuesto"}, it:{m:"il budget", var:"la disponibilità"},
           de:{m:"das Budget", p:"bu-djé"}, ja:{m:"予算", p:"yosan"} },
    def:{ fr:"Ce que tu peux mettre, annoncé d'emblée. C'est la phrase qui fait gagner le plus de temps sur un champ de foire : on te montre alors les chevaux qui existent pour toi.",
          en:"What you can spend, said up front. It is the sentence that saves the most time at a fair: you are then shown the horses that exist for you.",
          es:"Lo que puedes gastar, anunciado de entrada. Es la frase que más tiempo ahorra en una feria: entonces te enseñan los caballos que existen para ti.",
          it:"Ciò che puoi spendere, annunciato subito. È la frase che fa risparmiare più tempo in fiera: allora ti mostrano i cavalli che esistono per te.",
          de:"Was du ausgeben kannst, gleich zu Beginn genannt. Der Satz, der auf einer Messe die meiste Zeit spart: Dann zeigt man dir die Pferde, die es für dich gibt.",
          ja:"出せる額を、最初に告げること。見本市でいちばん時間を節約してくれる一言です。そうすれば、きみのために存在する馬たちを見せてもらえます。" } },

  { ref:"foire", lecon:1, coll:"vente",
    mots:{ fr:{m:"la foire"}, en:{m:"the fair", p:"fèr"},
           es:{m:"la feria"}, it:{m:"la fiera"},
           de:{m:"die Messe", p:"mè-se"}, ja:{m:"見本市", p:"mihon'ichi"} },
    def:{ fr:"Le rendez-vous où l'on montre et où l'on vend, toutes races confondues. ⚠️ Ce n'est pas la feria andalouse de Séville, qui est une fête et ne classe personne : ici on conclut.",
          en:"The gathering where horses are shown and sold, all breeds together. Not the Andalusian feria of Seville, which is a celebration and places nobody: here, deals are done.",
          es:"La cita donde se muestra y se vende, todas las razas juntas. ⚠️ No es la feria andaluza de Sevilla, que es una fiesta y no clasifica a nadie: aquí se cierra el trato.",
          it:"L'appuntamento dove si mostra e si vende, tutte le razze insieme. ⚠️ Non è la feria andalusa di Siviglia, che è una festa e non classifica nessuno: qui si conclude.",
          de:"Das Treffen, wo gezeigt und verkauft wird, alle Rassen zusammen. ⚠️ Nicht die andalusische Feria von Sevilla, die ein Fest ist und niemanden platziert: Hier wird abgeschlossen.",
          ja:"あらゆる馬種が集まり、見せ、売られる催し。⚠️ セビリアのアンダルシアの feria とは別物です。あちらは祭りで、順位もつきません。ここでは、商談がまとまるのです。" } }

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
