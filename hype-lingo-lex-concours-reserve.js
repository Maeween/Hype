/* hype-lingo-lex-concours-reserve.js — Hype Lingo · en réserve
   ==================================================================
   ISSU DU DÉCOUPAGE DU 18/08/2026 (session « un fichier par ville »).
   Contenu déplacé tel quel depuis hype-lingo-lex-concours.js, leçon 3
   — AUCUNE définition modifiée.

   🟥 SANS VILLE POUR L'INSTANT, sur décision de Blandine (18/08) : ces
   4 concepts (le jour du concours, hors piste — le van, l'embarquement,
   le tableau d'affichage, le trac) attendent une ville future.
   ⚠️ `speaker`, `appel`, `resultat`, `remise-prix`, `groom` — les 5
   AUTRES concepts de cette même leçon 3 d'origine — ont rejoint
   `hype-lingo-lex-badminton.js`, avec les deux phrases qui les
   emploient. Ne pas les chercher ici.

   AUCUNE VILLE N'EST BRANCHÉE SUR CE FICHIER DANS `ETAPE_SRC` : tant
   qu'aucune ville ne le réclame, ce chapitre reste invisible dans
   l'app — c'est voulu, pas un oubli.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX["concours-reserve"] = {
  ref: "concours-reserve",
  titre: { fr:"Le jour J", en:"Show day", es:"El día del concurso", it:"Il giorno del concorso", de:"Der Turniertag", ja:"競技会当日" },
  lecons: 1,

  concepts: [


  /* ============ LEÇON 3 · LE JOUR J ============ */

  { ref:"van", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"le van"}, en:{m:"the trailer", p:"tré-leur", var:"horsebox = le camion (GB)"},
           es:{m:"el remolque", var:"el camión"}, it:{m:"il van", var:"il camion"},
           de:{m:"der Pferdeanhänger", p:"pfèr-de-an-hèn-gueur"}, ja:{m:"馬運車", p:"bāunsha"} }, // ??
    def:{ fr:"⚠️ Faux ami à double fond : le mot français « van » vient de l'anglais *caravan*, mais l'anglais dit **trailer** pour le van attelé et **horsebox** pour le camion. Un Américain, lui, dit *trailer* pour les deux.",
          en:"French « van » comes from caravan, but English says trailer for the towed one and horsebox for the lorry.",
          es:"⚠️ Falso amigo de doble fondo: la palabra francesa « van » viene del inglés *caravan*, pero el inglés dice **trailer** para el remolque y **horsebox** para el camión. Un americano dice *trailer* para los dos.",
          it:"⚠️ Falso amico a doppio fondo: la parola francese « van » viene dall'inglese *caravan*, ma l'inglese dice **trailer** per il rimorchio e **horsebox** per il camion. Un americano dice *trailer* per entrambi.",
          de:"⚠️ Falscher Freund mit doppeltem Boden: Das französische « van » kommt vom englischen *caravan* — aber Englisch sagt **trailer** für den Anhänger und **horsebox** für den LKW. Ein Amerikaner sagt für beides *trailer*.",
          ja:"⚠️ 二重底の偽りの友：フランス語の « van » は英語の *caravan* 由来なのに、当の英語は牽引式を **trailer**、トラック型を **horsebox** と言います。アメリカ人はどちらも *trailer* です。" } },

  { ref:"embarquer", lecon:3, coll:"jour-j", v:true,
    mots:{ fr:{m:"embarquer"}, en:{m:"to load", p:"lôde", var:"to box up"},
           es:{m:"embarcar", var:"cargar"}, it:{m:"caricare"},
           de:{m:"verladen", p:"fèr-la-deune"}, ja:{m:"積み込む", p:"tsumikomu"} }, // ??
    def:{ fr:"Faire monter le cheval dans le van. Le premier obstacle de la journée, et parfois le plus difficile : un cheval qui refuse d'embarquer fait manquer l'épreuve avant même d'être sellé.",
          en:"Getting the horse in. The first obstacle of the day, and sometimes the hardest one.",
          es:"Hacer subir al caballo al remolque. El primer obstáculo del día, y a veces el más difícil: un caballo que se niega a embarcar hace perder la prueba antes incluso de ensillar.",
          it:"Far salire il cavallo nel van. Il primo ostacolo della giornata, e a volte il più difficile: un cavallo che rifiuta di salire fa mancare la prova prima ancora di sellare.",
          de:"Das Pferd in den Hänger verladen. Das erste Hindernis des Tages — und manchmal das schwerste: Ein Pferd, das nicht verlädt, lässt die Prüfung platzen, bevor gesattelt ist.",
          ja:"馬をトレーラーに乗せること。その日最初の障害物であり、ときに最難関です。積み込みを拒む馬は、鞍を置く前から競技を台無しにしてしまいます。" } },

  { ref:"tableau", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"le tableau d'affichage"}, en:{m:"the noticeboard", p:"nô-tiss-bord", var:"the board"},
           es:{m:"el tablón de anuncios"}, it:{m:"la bacheca"},
           de:{m:"die Anschlagtafel", p:"an-chlak-ta-feul"}, ja:{m:"掲示板", p:"keijiban"} }, // ??
    def:{ fr:"Horaires, changements d'ordre, résultats, éliminations : tout est là, et rien n'est annoncé deux fois. Le réflexe qui sauve une journée de concours à l'étranger, c'est d'aller le lire toutes les heures.",
          en:"Times, order changes, results, eliminations: it is all there and nothing is announced twice. Read it every hour.",
          es:"Horarios, cambios de orden, resultados, eliminaciones: todo está ahí, y nada se anuncia dos veces. El reflejo que salva una jornada de concurso en el extranjero es ir a leerlo cada hora.",
          it:"Orari, cambi d'ordine, risultati, eliminazioni: tutto è lì, e niente viene annunciato due volte. Il riflesso che salva una giornata di concorso all'estero è andare a leggerlo ogni ora.",
          de:"Zeiten, Reihenfolgeänderungen, Ergebnisse, Ausschlüsse: Alles steht dort, und nichts wird zweimal durchgesagt. Der Reflex, der einen Auslandsturniertag rettet: jede Stunde nachlesen.",
          ja:"時間割、順番の変更、結果、失権 — すべてがここに貼り出され、二度は放送されません。海外での競技会の一日を救う習慣はひとつ：一時間ごとに見に行くことです。" } },

  { ref:"trac", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"le trac"}, en:{m:"the nerves", p:"neurvz", var:"butterflies"},
           es:{m:"los nervios"}, it:{m:"il nervosismo"},
           de:{m:"das Lampenfieber", p:"lam-peune-fi-beur"}, ja:{m:"緊張", p:"kinchō"} },
    def:{ fr:"Chaque langue a choisi son image : l'anglais a des papillons dans le ventre (*butterflies*), l'allemand « la fièvre des lampes » — celle du théâtre. Et un cheval sent le trac de son cavalier avant que lui-même l'admette.",
          en:"Each language picked an image: English has butterflies, German « lamp fever » from the theatre. And a horse feels it before the rider admits it.",
          es:"Cada lengua eligió su imagen: el inglés tiene mariposas en el estómago (*butterflies*), el alemán « la fiebre de las candilejas » — la del teatro. Y un caballo siente el nerviosismo de su jinete antes de que él mismo lo admita.",
          it:"Ogni lingua ha scelto la sua immagine: l'inglese ha farfalle nello stomaco (*butterflies*), il tedesco « la febbre delle luci » — quella del teatro. E un cavallo sente l'ansia del suo cavaliere prima che lui stesso l'ammetta.",
          de:"Jede Sprache wählte ihr Bild: Das Englische hat Schmetterlinge im Bauch (*butterflies*), das Deutsche das Lampenfieber — das des Theaters. Und ein Pferd spürt die Nervosität seines Reiters, bevor der sie sich eingesteht.",
          ja:"言語ごとにイメージが違います。英語はお腹の中の蝶（*butterflies*）、ドイツ語は「ランプの熱」— 舞台のあがり症です。そして馬は、騎手本人が認めるより先に、その緊張を感じ取っています。" } },

  ]
};
