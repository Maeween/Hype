/* hype-lingo-lex-concours-reserve.js — Hype Lingo · en réserve
   ==================================================================
   ISSU DU DÉCOUPAGE DU 18/08/2026 (session « un fichier par ville »).
   Contenu déplacé tel quel depuis hype-lingo-lex-concours.js, leçon 3
   — AUCUNE définition modifiée.

   🟥 19/08/2026 — `van` ET `embarquer` SONT PARTIS À BARCELONE.
   Ils attendaient ici « une ville future » depuis le 18/08 : c'est
   `hype-lingo-lex-barcelone.js`, « Voyager avec son cheval ». Les deux
   concepts y sont repris À L'IDENTIQUE — même `ref`, mêmes six langues,
   même définition, y compris le faux ami van/trailer/horsebox.
   ⚠️ NE PAS LES REMETTRE ICI : deux fichiers portant la même `ref`
   casseraient la règle UN CONCEPT = UN `ref` GLOBAL.
   ⚠️ CE FICHIER A ÉTÉ RECONSTRUIT À PARTIR DE LA COPIE COLLÉE DANS LA
   CONVERSATION du 19/08, le fichier du dépôt n'ayant pas été fourni.
   Le reste est repris caractère pour caractère. À vérifier au diff.

   🟥 IL RESTE DEUX CONCEPTS, TOUJOURS SANS VILLE : le tableau
   d'affichage et le trac. Ils ne relèvent pas du transport et n'ont pas
   suivi à Barcelone — ils attendent toujours.
   ⚠️ `speaker`, `appel`, `resultat`, `remise-prix`, `groom` — les 5
   AUTRES concepts de cette même leçon 3 d'origine — ont rejoint
   `hype-lingo-lex-badminton.js`, avec les deux phrases qui les
   emploient. Ne pas les chercher ici.

   AUCUNE VILLE N'EST BRANCHÉE SUR CE FICHIER DANS `ETAPE_SRC` : tant
   qu'aucune ville ne le réclame, ce chapitre reste invisible dans
   l'app — c'est voulu, pas un oubli.
   ================================================================== */

/* 🟡 ARABE DORMANT (24/08) : champ `ar` écrit d'avance, aucun écran ne le lit. */
window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX["concours-reserve"] = {
  ref: "concours-reserve",
  titre: { fr:"Le jour J", en:"Show day", es:"El día del concurso", it:"Il giorno del concorso", de:"Der Turniertag", ja:"競技会当日", ar:"يوم المسابقة" },
  lecons: 1,

  concepts: [


  /* ============ LEÇON 3 · LE JOUR J ============ */

  { ref:"tableau", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"le tableau d'affichage"}, en:{m:"the noticeboard", p:"nô-tiss-bord", var:"the board"},
           es:{m:"el tablón de anuncios"}, it:{m:"la bacheca"},
           de:{m:"die Anschlagtafel", p:"an-chlak-ta-feul"}, ja:{m:"掲示板", p:"keijiban"},
           ar:{m:"لوحة الإعلانات"} }, // ??
    def:{ fr:"Horaires, changements d'ordre, résultats, éliminations : tout est là, et rien n'est annoncé deux fois. Le réflexe qui sauve une journée de concours à l'étranger, c'est d'aller le lire toutes les heures.",
          en:"Times, order changes, results, eliminations: it is all there and nothing is announced twice. Read it every hour.",
          es:"Horarios, cambios de orden, resultados, eliminaciones: todo está ahí, y nada se anuncia dos veces. El reflejo que salva una jornada de concurso en el extranjero es ir a leerlo cada hora.",
          it:"Orari, cambi d'ordine, risultati, eliminazioni: tutto è lì, e niente viene annunciato due volte. Il riflesso che salva una giornata di concorso all'estero è andare a leggerlo ogni ora.",
          de:"Zeiten, Reihenfolgeänderungen, Ergebnisse, Ausschlüsse: Alles steht dort, und nichts wird zweimal durchgesagt. Der Reflex, der einen Auslandsturniertag rettet: jede Stunde nachlesen.",
          ja:"時間割、順番の変更、結果、失権 — すべてがここに貼り出され、二度は放送されません。海外での競技会の一日を救う習慣はひとつ：一時間ごとに見に行くことです。",
          ar:"المواعيد، وتغييرات ترتيب الانطلاق، والنتائج، والإقصاءات: كل شيء موجود هناك، ولا يعلن شيء مرتين. والعادة التي قد تنقذ يومك في مسابقة خارج بلدك هي تفقد اللوحة كل ساعة." } },

  { ref:"trac", lecon:3, coll:"jour-j",
    mots:{ fr:{m:"le trac"}, en:{m:"the nerves", p:"neurvz", var:"butterflies"},
           es:{m:"los nervios"}, it:{m:"il nervosismo"},
           de:{m:"das Lampenfieber", p:"lam-peune-fi-beur"}, ja:{m:"緊張", p:"kinchō"},
           ar:{m:"رهبة المنافسة"} },
    def:{ fr:"Chaque langue a choisi son image : l'anglais a des papillons dans le ventre (*butterflies*), l'allemand « la fièvre des lampes » — celle du théâtre. Et un cheval sent le trac de son cavalier avant que lui-même l'admette.",
          en:"Each language picked an image: English has butterflies, German « lamp fever » from the theatre. And a horse feels it before the rider admits it.",
          es:"Cada lengua eligió su imagen: el inglés tiene mariposas en el estómago (*butterflies*), el alemán « la fiebre de las candilejas » — la del teatro. Y un caballo siente el nerviosismo de su jinete antes de que él mismo lo admita.",
          it:"Ogni lingua ha scelto la sua immagine: l'inglese ha farfalle nello stomaco (*butterflies*), il tedesco « la febbre delle luci » — quella del teatro. E un cavallo sente l'ansia del suo cavaliere prima che lui stesso l'ammetta.",
          de:"Jede Sprache wählte ihr Bild: Das Englische hat Schmetterlinge im Bauch (*butterflies*), das Deutsche das Lampenfieber — das des Theaters. Und ein Pferd spürt die Nervosität seines Reiters, bevor der sie sich eingesteht.",
          ja:"言語ごとにイメージが違います。英語はお腹の中の蝶（*butterflies*）、ドイツ語は「ランプの熱」— 舞台のあがり症です。そして馬は、騎手本人が認めるより先に、その緊張を感じ取っています。",
          ar:"اختارت كل لغة صورتها الخاصة: ففي الإنجليزية هناك «فراشات في البطن» (*butterflies*)، وفي الألمانية «حمى الأضواء» — أي أضواء المسرح. والحصان يشعر برهبة فارسه قبل أن يعترف بها الفارس نفسه." } },

  ]
};
