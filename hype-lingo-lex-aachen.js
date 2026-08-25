/* hype-lingo-lex-aachen.js — Hype Lingo · Chapitre « L'obstacle »
   ==================================================================
   ISSU DU DÉCOUPAGE DU 18/08/2026 (session « un fichier par ville »).
   Contenu déplacé tel quel depuis hype-lingo-lex-obstacle.js, leçon 4
   — AUCUN ref, AUCUNE définition, AUCUNE phrase modifiée. Seul le nom
   de la clé de chapitre change : `obstacle` devient `aachen`.

   ⚠️ `titre` REPRIS TEL QUEL DE L'ANCIEN CHAPITRE. Blandine tranchera
   si elle veut un titre propre à Aachen (le Grand Prix), plutôt que
   d'en inventer un ici.

   UNE SEULE LEÇON, CONSERVÉE À L'IDENTIQUE (aucune renumérotation) :
     · leçon 4 — le grand concours (19 concepts)

   Le chapitre `hype-lingo-lex-obstacle.js` garde ses leçons 1, 2, 3
   (Wellington), déplacées séparément dans `hype-lingo-lex-wellington.js`.
   ================================================================== */

window.HYPE_LINGO_LEX = window.HYPE_LINGO_LEX || {};

window.HYPE_LINGO_LEX.aachen = {
  ref: "aachen",
  titre: { fr:"L'obstacle", en:"Show jumping", es:"El salto", it:"Il salto ostacoli", de:"Das Springen", ja:"障害飛越", ar:"قفز الحواجز" },
  lecons: 1,

  concepts: [

  { ref:"saut", lecon:4, coll:"saut",
    mots:{ fr:{m:"le saut"}, en:{m:"the jump", p:"djeump"},
           es:{m:"el salto"}, it:{m:"il salto"},
           de:{m:"der Sprung", p:"chproung"}, ja:{m:"飛越", p:"hietsu"},
           ar:{m:"القفزة"} },
    def:{ fr:"Cinq phases enchaînées : abord, battue, planer, réception, départ. Le cavalier n'agit vraiment que sur la première — le reste, il accompagne.",
          en:"Five linked phases: approach, take-off, flight, landing, getaway. The rider only really acts on the first.",
          es:"Cinco fases encadenadas: llegada, batida, plano, recepción, salida. El jinete solo actúa de verdad en la primera — el resto, acompaña.",
          it:"Cinque fasi concatenate: arrivo, stacco, planata, ricezione, ripartenza. Il cavaliere agisce davvero solo sulla prima — il resto, accompagna.",
          de:"Fünf verkettete Phasen: Anreiten, Absprung, Flug, Landung, Weiterreiten. Wirklich einwirken kann der Reiter nur auf die erste — den Rest begleitet er.",
          ja:"連なる五つの局面 — 進入、踏切、滞空、着地、再発進。騎手が本当に働きかけられるのは最初のひとつだけ。あとは、寄り添うだけです。",
          ar:"خمس مراحل متتابعة: الاقتراب، والارتقاء، والطيران، والهبوط، والانطلاق. يتدخل الفارس فعليا في مرحلة الاقتراب أساسا — أما بقية القفزة فيرافق فيها حركة الحصان." } },

  { ref:"sauter", lecon:4, coll:"saut", v:true,
    mots:{ fr:{m:"sauter"}, en:{m:"to jump", p:"djeumpe", var:"to pop over = sauter tranquillement"},
           es:{m:"saltar"}, it:{m:"saltare"},
           de:{m:"springen", p:"chprin-gueune"}, ja:{m:"飛越する", p:"hietsu suru"},
           ar:{m:"القفز"} },
    def:{ fr:"⚠️ Expression britannique très utile : **« pop over »** veut dire sauter sans en faire une affaire — « just pop him over a cross-pole » est une invitation détendue, pas un exercice.",
          en:"A useful British phrase: « pop over » means jump without making a fuss — « just pop him over a cross-pole ».",
          es:"⚠️ Expresión británica muy útil: **« pop over »** significa saltar sin darle importancia — « just pop him over a cross-pole » es una invitación relajada, no un ejercicio.",
          it:"⚠️ Espressione britannica molto utile: **« pop over »** vuol dire saltare senza farne un dramma — « just pop him over a cross-pole » è un invito rilassato, non un esercizio.",
          de:"⚠️ Sehr nützliche britische Wendung: **« pop over »** heißt springen, ohne ein Ding daraus zu machen — « just pop him over a cross-pole » ist eine entspannte Einladung, keine Übung.",
          ja:"⚠️ とても便利なイギリス表現：**« pop over »** は、気負わずひょいと跳ぶこと。« just pop him over a cross-pole » は肩の力の抜けた誘いであって、課題ではありません。",
          ar:"⚠️ تعبير بريطاني مفيد جدا: **«pop over»** يعني جعل الحصان يقفز حاجزا ببساطة ومن دون تعقيد الأمر — وعبارة «just pop him over a cross-pole» تقال بنبرة عفوية ومطمئنة، لا كأنها تمرين صعب." } },

  { ref:"foulee", lecon:4, coll:"saut",
    mots:{ fr:{m:"la foulée"}, en:{m:"the stride", p:"straïde"},
           es:{m:"el tranco"}, it:{m:"la falcata"},
           de:{m:"der Galoppsprung", p:"ga-lopp-chproung"}, ja:{m:"ストライド", p:"sutoraido"},
           ar:{m:"خطوة العدو"} }, // ??
    def:{ fr:"Un cycle complet de galop, environ 3,50 m chez un cheval de taille moyenne. L'allemand est très logique : *Galoppsprung*, « le bond de galop » — chaque foulée de galop est déjà un petit saut.",
          en:"One full canter cycle, about 3.50 m. German calls it a canter leap — every stride is already a small jump.",
          es:"Un ciclo completo de galope, unos 3,50 m en un caballo mediano. El alemán es muy lógico: *Galoppsprung*, « el brinco de galope » — cada zancada de galope ya es un pequeño salto.",
          it:"Un ciclo completo di galoppo, circa 3,50 m in un cavallo di taglia media. Il tedesco è molto logico: *Galoppsprung*, « il balzo di galoppo » — ogni falcata di galoppo è già un piccolo salto.",
          de:"Ein voller Galoppzyklus, etwa 3,50 m beim mittelgroßen Pferd. Das Deutsche ist ganz logisch: der Galoppsprung — jeder Galopptritt ist schon ein kleiner Sprung.",
          ja:"駈歩のひと巡り。中型の馬でおよそ3.5メートルです。ドイツ語はじつに論理的で *Galoppsprung*、「駈歩の跳躍」— 駈歩の一歩一歩が、すでに小さなジャンプなのです。",
          ar:"دورة كاملة من العدو، تبلغ نحو 3,50 م لدى حصان متوسط الحجم. والتعبير الألماني منطقي جدا: *Galoppsprung*، أي «وثبة العدو» — فكل خطوة عدو تشبه في حركتها قفزة صغيرة." } },

  { ref:"voir-foulee", lecon:4, coll:"saut", v:true,
    mots:{ fr:{m:"voir sa foulée"}, en:{m:"to see a stride", p:"si eu straïde", var:"a good eye"},
           es:{m:"ver la distancia"}, it:{m:"vedere la distanza"},
           de:{m:"den Absprung sehen", p:"ap-chproung zé-eune"}, ja:{m:"踏切を見る", p:"fumikiri o miru"},
           ar:{m:"رؤية نقطة الارتقاء"} }, // ??
    def:{ fr:"Percevoir d'assez loin où le cheval va décoller. ⚠️ L'anglais en a fait une qualité de la personne : **« she has a good eye »**, un compliment qu'on entend beaucoup au bord d'une piste britannique.",
          en:"Sensing from a distance where the horse will take off. English made it a personal quality: « she has a good eye ».",
          es:"Percibir desde bastante lejos dónde va a despegar el caballo. ⚠️ El inglés hizo de ello una cualidad de la persona: **« she has a good eye »**, un cumplido que se oye mucho al borde de una pista británica.",
          it:"Percepire da abbastanza lontano dove il cavallo staccherà. ⚠️ L'inglese ne ha fatto una qualità della persona: **« she has a good eye »**, un complimento che si sente molto a bordo campo britannico.",
          de:"Früh erkennen, wo das Pferd abspringen wird. ⚠️ Das Englische machte daraus eine Eigenschaft der Person: **« she has a good eye »** — ein Lob, das man am britischen Parcoursrand oft hört.",
          ja:"馬がどこで踏み切るかを、手前から感じ取る力。⚠️ 英語はこれを人の資質にしました — **« she has a good eye »**。イギリスの馬場の柵ぎわでよく聞こえてくる、賛辞の言葉です。",
          ar:"القدرة على تقدير نقطة ارتقاء الحصان من مسافة كافية. ⚠️ وتحولها الإنجليزية إلى صفة للفارس: **«she has a good eye»** — وهي عبارة مديح تسمع كثيرا على حافة ميادين قفز الحواجز البريطانية." } },

  { ref:"toucher", lecon:4, coll:"saut", v:true,
    mots:{ fr:{m:"toucher la barre"}, en:{m:"to rub", p:"reub", var:"to touch · to rattle"},
           es:{m:"tocar la barra"}, it:{m:"toccare la barriera"},
           de:{m:"touchieren", p:"tou-chi-reune"}, ja:{m:"触れる", p:"fureru"},
           ar:{m:"لمس العارضة"} },
    def:{ fr:"Frôler sans faire tomber : aucune pénalité, dans aucun règlement moderne. ⚠️ L'allemand emploie ici un verbe d'origine française, *touchieren*, que le français n'utilise pas sous cette forme.",
          en:"Brushing without dislodging: no penalty under any modern rules. German borrows a French-looking verb, touchieren.",
          es:"Rozar sin derribar: ninguna penalización, en ningún reglamento moderno. ⚠️ El alemán emplea aquí un verbo de origen francés, *touchieren*, que el francés no usa en esa forma.",
          it:"Sfiorare senza far cadere: nessuna penalità, in nessun regolamento moderno. ⚠️ Il tedesco usa qui un verbo d'origine francese, *touchieren*, che il francese non usa in quella forma.",
          de:"Berühren, ohne abzuwerfen: kein Abzug, in keinem modernen Reglement. ⚠️ Das Deutsche benutzt hier ein französischstämmiges Verb — *touchieren* —, das das Französische so nicht kennt.",
          ja:"落とさずにかすること。現代のどの規則でも減点はありません。⚠️ ドイツ語はここでフランス語由来の動詞 *touchieren* を使いますが、フランス語自身はその形を使わないのです。",
          ar:"ملامسة العارضة من دون إسقاطها: لا جزاء عليها في أي لائحة حديثة. ⚠️ تستعمل الألمانية هنا فعلا من أصل فرنسي، *touchieren*، لا تستعمله الفرنسية بهذه الصيغة." } },

  { ref:"cavaletti", lecon:4, coll:"saut",
    mots:{ fr:{m:"le cavaletti"}, en:{m:"cavaletti", p:"ka-va-lè-ti"},
           es:{m:"los cavaletti"}, it:{m:"i cavalletti"},
           de:{m:"die Cavaletti", p:"ka-va-lè-ti"}, ja:{m:"カバレッティ", p:"kabaretti"},
           ar:{m:"الكافاليتي"} },
    def:{ fr:"Les petites barres sur croisillons de bois, pour le travail du rythme et de la cadence. Cas unique dans tout le module : c'est **l'italien** qui a gagné dans les six langues — héritage de l'école de Pinerolo et du système Caprilli.",
          en:"Small poles on wooden crosses, for rhythm work. Unique in the module: the Italian word won in all six languages.",
          es:"Las barritas sobre cruces de madera, para el trabajo del ritmo y la cadencia. Caso único en todo el módulo: es **el italiano** el que ganó en las seis lenguas — herencia de la escuela de Pinerolo y del sistema Caprilli.",
          it:"Le barrette su crocette di legno, per il lavoro del ritmo e della cadenza. Caso unico in tutto il modulo: è **l'italiano** ad aver vinto nelle sei lingue — eredità della scuola di Pinerolo e del sistema Caprilli.",
          de:"Die kleinen Stangen auf Holzkreuzen, für Rhythmus- und Taktarbeit. Einmalig im ganzen Modul: **Das Italienische** hat in allen sechs Sprachen gewonnen — Erbe der Schule von Pinerolo und des Caprilli-Systems.",
          ja:"木の十字台に載せた低いバー。リズムと拍子の練習に使います。この教材全体で唯一のケース — 六言語すべてで勝ったのは**イタリア語**でした。ピネローロ校とカプリッリ式の遺産です。",
          ar:"عوارض صغيرة موضوعة على حوامل، تستخدم للعمل على الإيقاع وانتظام الخطوات. حالة فريدة في هذه الوحدة: **المصطلح الإيطالي** هو الذي انتشر في اللغات الست — إرث مدرسة بينيرولو ونظام كابريلي." } },

  { ref:"hauteur-obstacle", lecon:4, coll:"saut",
    mots:{ fr:{m:"la hauteur"}, en:{m:"the height", p:"haïte"},
           es:{m:"la altura"}, it:{m:"l'altezza"},
           de:{m:"die Höhe", p:"hö-e"}, ja:{m:"高さ", p:"takasa"},
           ar:{m:"الارتفاع"} },
    def:{ fr:"Les épreuves se nomment par elle : un « 1 m 10 », un « 90 ». ⚠️ Attention, *la altura* et *l'altezza* servent aussi à la taille du cheval au garrot (chapitre 3) — seul le contexte tranche.",
          en:"Classes are named by it: a « 1.10 », a « 90 ». Note that Spanish and Italian use the same word for a horse's height at the withers.",
          es:"Las pruebas se nombran por ella: un « 1,10 », un « 90 ». ⚠️ Ojo, *la altura* y *l'altezza* sirven también para la alzada del caballo (capítulo 3) — solo el contexto decide.",
          it:"Le prove si chiamano con lei: un « 1,10 », un « 90 ». ⚠️ Attenzione, *la altura* e *l'altezza* servono anche per la taglia del cavallo al garrese (capitolo 3) — solo il contesto decide.",
          de:"Die Prüfungen heißen nach ihr: ein « 1,10er », ein « 90er ». ⚠️ Achtung: *la altura* und *l'altezza* meinen auch das Stockmaß (Kapitel 3) — nur der Kontext entscheidet.",
          ja:"競技はこの数字で呼ばれます — 「110」、「90」。⚠️ 注意：スペイン語の *la altura* もイタリア語の *l'altezza* も、馬の体高（第3章）を指すことがあります。決めるのは文脈だけです。",
          ar:"تسمى الأشواط بحسب ارتفاع الحواجز: شوط «1,10 م»، أو شوط «90 سم». ⚠️ انتبهي: *la altura* و*l'altezza* تستعملان أيضا لارتفاع الحصان عند الحارك — والسياق وحده هو الذي يحدد المعنى." } },

  /* ================================================================
     LE GRAND CONCOURS — huit entrées ajoutées le 17/08/2026 pour
     AIX-LA-CHAPELLE, d'après le lexique de Blandine. La leçon 4 avait
     le barrage, le chrono, le tour d'honneur — mais RIEN SUR LA
     QUALIFICATION, qui est tout le sujet d'un très grand concours.

     🟥 LE SYSTÈME, tel qu'elle l'a posé :
     **QUALIFIER 1 + QUALIFIER 2 → POINTS → TOP 40 → GRAND PRIX**
     puis, dans le Grand Prix : quarante partants, dix-huit au maximum
     en deuxième manche, barrage si nécessaire.
     ⚠️ Les chiffres viennent d'elle et du format 2026. NE PAS les
     généraliser à tous les concours : chaque épreuve a le sien.

     🟥 ET L'EXPRESSION QU'ELLE A APPORTÉE : **we're on the bubble** —
     être pile autour de la dernière place qualificative, sans savoir
     encore si l'on passe. Magnifique, mais elle a préféré pour des
     jeunes la formulation claire *we're right on the qualification
     cut-off*. Les deux sont dans la `def` de `seuil-qualification`.
     ================================================================ */

  { ref:"grand-concours", lecon:4, coll:"grand",
    mots:{ fr:{m:"le grand concours international"}, en:{m:"a major international show", p:"méï-djeur"},
           es:{m:"el gran concurso internacional"}, it:{m:"il grande concorso internazionale"},
           de:{m:"das große internationale Turnier", p:"tour-nir"}, ja:{m:"国際 大会", p:"kokusai taikai"},
           ar:{m:"المسابقة الدولية الكبرى"} },
    def:{ fr:"⚠️ Ce qui change par rapport à un concours ordinaire n'est pas la hauteur mais LE STADE : vingt, trente, quarante mille personnes. Un cheval qui saute très bien chez lui peut découvrir qu'il ne saute plus là-dedans. 🟥 « Le parcours paraît beaucoup plus gros une fois dans le stade » — et c'est vrai pour tout le monde, à tous les niveaux.",
          en:"What changes from an ordinary show isn't the height but THE STADIUM: twenty, thirty, forty thousand people. A horse who jumps beautifully at home may find he doesn't jump in there. The course looks much bigger once you're inside.",
          es:"Lo que cambia no es la altura sino el ESTADIO: veinte, treinta, cuarenta mil personas. Un caballo que salta muy bien en casa puede descubrir que allí no salta.",
          it:"Ciò che cambia non è l'altezza ma LO STADIO: venti, trenta, quarantamila persone. Un cavallo che salta benissimo a casa può scoprire di non saltare là dentro.",
          de:"Was sich ändert, ist nicht die Höhe, sondern DAS STADION: zwanzig-, dreißig-, vierzigtausend Menschen. Ein Pferd, das zu Hause großartig springt, springt dort vielleicht nicht.",
          ja:"通常の大会と違うのは高さではなく「スタジアム」です。二万、三万、四万の観客。自宅では見事に飛ぶ馬が、その中では飛べなくなることがあります。",
          ar:"⚠️ ما يتغير مقارنة بمسابقة عادية ليس ارتفاع الحواجز فقط، بل حجم الملعب وأجواؤه: عشرون أو ثلاثون أو أربعون ألف متفرج. قد يقفز الحصان بصورة ممتازة في ظروفه المعتادة ثم يتأثر تماما بهذه الأجواء. 🟥 «يبدو المسار أكبر بكثير عندما تدخلين الملعب» — وهذا شعور يعرفه الفرسان في جميع المستويات." } },

  { ref:"grand-prix", lecon:4, coll:"grand",
    mots:{ fr:{m:"le Grand Prix"}, en:{m:"the Grand Prix", p:"grann prii"},
           es:{m:"el Gran Premio"}, it:{m:"il Gran Premio"},
           de:{m:"der Große Preis", p:"grô-sse praïss"}, ja:{m:"グランプリ", p:"guranpuri"},
           ar:{m:"الجائزة الكبرى"} },
    def:{ fr:"⚠️ L'ANGLAIS GARDE LE FRANÇAIS et la prononciation aussi : on dit « grann prii », le X reste muet. C'est l'épreuve reine d'un concours — la plus haute, la plus dotée, celle du dimanche. On ne s'y engage pas : **on s'y qualifie**.",
          en:"English keeps the French and the pronunciation with it — the X stays silent. It's the show's flagship class: the highest, the richest, the Sunday one. You don't enter it — you qualify for it.",
          es:"El inglés conserva el francés. Es la prueba reina del concurso: la más alta, la más dotada, la del domingo. No se inscribe uno: se clasifica.",
          it:"L'inglese conserva il francese. È la prova regina del concorso: la più alta, la più ricca, quella della domenica. Non ci si iscrive: ci si qualifica.",
          de:"Englisch behält das Französische. Die Königsprüfung des Turniers: die höchste, die bestdotierte, die des Sonntags. Man nennt nicht — man qualifiziert sich.",
          ja:"英語もフランス語のまま使い、発音も「グラン・プリ」で語末の X は読みません。大会の頂点となる競技で、最も高く、賞金も最も多い日曜の競技です。申し込むのではなく、資格を得るのです。",
          ar:"⚠️ تحتفظ الإنجليزية بالاسم الفرنسي وبنطقه أيضا: يقال «غران بري»، ولا ينطق حرف X. إنه الشوط الأهم في المسابقة — الأعلى مستوى، والأكبر من حيث الجوائز، وغالبا ما يقام يوم الأحد. لا يكون الاشتراك فيه مباشرا: **بل يتأهل إليه الفرسان**." } },

  { ref:"qualificative", lecon:4, coll:"grand",
    mots:{ fr:{m:"l'épreuve qualificative"}, en:{m:"the qualifier", p:"kwo-li-faï-eur", var:"the qualifying class"},
           es:{m:"la prueba clasificatoria"}, it:{m:"la prova di qualificazione"},
           de:{m:"die Qualifikationsprüfung", p:"kva-li-fi-ka-tsions-pru-foung"},
           ja:{m:"予選 競技", p:"yosen kyōgi"},
           ar:{m:"الشوط التأهيلي"} },
    def:{ fr:"🟥 ON NE S'ENGAGE PAS DANS UN GRAND PRIX, ON S'Y QUALIFIE. Deux épreuves qualificatives dans la semaine, et **les points des deux s'additionnent** : un mauvais parcours le mercredi se rattrape le vendredi, mais pas deux. ⚠️ En anglais **a qualifier** tout court suffit : *the first qualifier is on Wednesday*.",
          en:"You don't enter a Grand Prix, you qualify for it. Two qualifiers in the week, and the points from both are added: a bad round on Wednesday can be made up on Friday, but not two. English just says « a qualifier ».",
          es:"No se entra en un Gran Premio, se clasifica uno. Dos pruebas clasificatorias en la semana, y los puntos de ambas se suman.",
          it:"Non ci si iscrive a un Gran Premio, ci si qualifica. Due prove di qualificazione nella settimana, e i punti delle due si sommano.",
          de:"Man nennt nicht für einen Großen Preis, man qualifiziert sich. Zwei Qualifikationsprüfungen in der Woche, und die Punkte beider werden addiert.",
          ja:"グランプリには申し込むのではなく、予選を通過して出ます。週に二つの予選があり、両方の得点が合算されます。水曜の失敗は金曜で取り返せますが、二度は取り返せません。",
          ar:"🟥 لا يكون الاشتراك في الجائزة الكبرى مباشرا، بل يتم التأهل إليها. هناك شوطان تأهيليان خلال الأسبوع، **وتجمع نقاط الشوطين**: يمكن تعويض نتيجة سيئة يوم الأربعاء بنتيجة أفضل يوم الجمعة، لكن نتيجتين سيئتين يصعب تعويضهما. ⚠️ في الإنجليزية تكفي كلمة **a qualifier** وحدها: *the first qualifier is on Wednesday*." } },

  { ref:"se-qualifier", lecon:4, coll:"grand", v:true,
    mots:{ fr:{m:"se qualifier"}, en:{m:"to qualify", p:"kwo-li-faï"},
           es:{m:"clasificarse"}, it:{m:"qualificarsi"},
           de:{m:"sich qualifizieren", p:"kva-li-fi-tsii-ren"}, ja:{m:"予選を通過する", p:"yosen o tsūka suru"},
           ar:{m:"التأهل"} },
    def:{ fr:"⚠️ ATTENTION À LA FORME EN ANGLAIS : *we qualified* (nous nous sommes qualifiés) et *we're qualified* (nous sommes qualifiés) disent deux choses différentes — l'action et l'état. Et pour le Grand Prix on dit *to go through to*, littéralement « passer à travers ».",
          en:"Mind the form: « we qualified » is the act, « we're qualified » is the state. And for going into the Grand Prix you say « to go through to ».",
          es:"Cuidado con la forma en inglés: « we qualified » es la acción, « we're qualified » el estado.",
          it:"Attenzione alla forma inglese: « we qualified » è l'azione, « we're qualified » lo stato.",
          de:"Achtung auf die Form im Englischen: « we qualified » ist die Handlung, « we're qualified » der Zustand.",
          ja:"英語では形に注意します。we qualified は「通過した」という行為、we're qualified は「通過している」という状態です。",
          ar:"⚠️ انتبهي للصيغة في الإنجليزية: *we qualified* (تأهلنا) و*we're qualified* (نحن متأهلون) تقولان شيئين مختلفين — الفعل والحال. وللجائزة الكبرى يقال *to go through to*، حرفيا «العبور إلى»." } },

  { ref:"points-cumules", lecon:4, coll:"grand",
    mots:{ fr:{m:"les points cumulés"}, en:{m:"aggregate points", p:"a-gri-gueute", var:"combined points"},
           es:{m:"los puntos acumulados"}, it:{m:"i punti cumulati"},
           de:{m:"die Gesamtpunkte", p:"gue-zamt-pounk-te"}, ja:{m:"合計 得点", p:"gōkei tokuten"},
           ar:{m:"مجموع النقاط"} },
    def:{ fr:"⚠️ **AGGREGATE** est le mot officiel, et il surprend : il vient de l'anglais des statistiques, pas du sport. On dit *the aggregate standings*, le classement cumulé. Dans la conversation on entend plutôt *the combined score*. 🟥 Et le calcul se fait EN PÉNALITÉS, donc le plus bas gagne — comme au complet.",
          en:"« Aggregate » is the official word and it surprises: it comes from statistics, not from sport. « The aggregate standings ». In conversation you'll hear « the combined score » more often.",
          es:"« Aggregate » es la palabra oficial en inglés y sorprende: viene de la estadística, no del deporte.",
          it:"« Aggregate » è la parola ufficiale in inglese e sorprende: viene dalla statistica, non dallo sport.",
          de:"« Aggregate » ist im Englischen das amtliche Wort und überrascht: es kommt aus der Statistik, nicht aus dem Sport.",
          ja:"英語の aggregate は公式用語で、統計から来た語なので意外に響きます。会話では combined score のほうがよく使われます。計算は減点で行うため、低いほうが上位です。",
          ar:"⚠️ **aggregate** هو المصطلح الرسمي، وقد يبدو غريبا لأنه آت من لغة الإحصاء لا من الرياضة. يقال *the aggregate standings*، أي الترتيب التراكمي. وفي الحديث اليومي يسمع أكثر *the combined score*. 🟥 ويحسب الترتيب هنا على أساس الجزاءات، لذلك يكون المجموع الأقل هو الأفضل — كما في الفروسية الثلاثية." } },

  { ref:"seuil-qualification", lecon:4, coll:"grand",
    mots:{ fr:{m:"le seuil de qualification"}, en:{m:"the qualification cut-off", p:"keut-off"},
           es:{m:"el corte de clasificación"}, it:{m:"la soglia di qualificazione"},
           de:{m:"die Qualifikationsgrenze", p:"grènn-tse"}, ja:{m:"予選 通過 ライン", p:"yosen tsūka rain"},
           ar:{m:"حد التأهل"} },
    def:{ fr:"🟥 LA PLACE À NE PAS RATER : il faut terminer dans les quarante premiers pour entrer au Grand Prix. Être quarantième ou quarante-et-unième change une année entière. ⚠️ **L'EXPRESSION À CONNAÎTRE : *we're on the bubble*** — être pile autour de la dernière place qualificative, sans savoir encore si l'on passe. Très employée dans tout le sport anglophone. La formulation claire est *we're right on the qualification cut-off*.",
          en:"The place not to miss: finish in the top forty to make the Grand Prix. Fortieth or forty-first changes a whole year. The expression to know is « we're on the bubble » — right around the last qualifying place, not yet knowing. The plain version: « we're right on the qualification cut-off ».",
          es:"El puesto que no hay que fallar: terminar entre los cuarenta primeros. La expresión inglesa « on the bubble » significa estar justo en el corte, sin saber todavía.",
          it:"Il posto da non mancare: finire tra i primi quaranta. L'espressione inglese « on the bubble » significa essere proprio sulla soglia, senza sapere ancora.",
          de:"Der Platz, den man nicht verpassen darf: unter die ersten vierzig. Der englische Ausdruck « on the bubble » heißt: genau an der Grenze, noch ohne Gewissheit.",
          ja:"逃してはならない順位。グランプリに出るには上位四十位以内で終える必要があります。四十位か四十一位かで一年が変わります。英語の on the bubble は「通過ラインぎりぎりで、まだ分からない」という意味で、英語圏のスポーツ全般で使われます。",
          ar:"🟥 الحد الذي لا تريدين تجاوزه: يجب أن تكوني ضمن الأربعين الأوائل للتأهل إلى الجائزة الكبرى. والفرق بين المركز الأربعين والحادي والأربعين قد يغير موسما كاملا. ⚠️ **العبارة التي يجب معرفتها: *we're on the bubble*** — أي أنك عند حدود آخر مركز مؤهل، من دون أن تعرفي بعد إن كنت ستتأهلين. وهي عبارة شائعة في الرياضات الناطقة بالإنجليزية. والصياغة الأكثر وضوحا هي: *we're right on the qualification cut-off*." } },

  { ref:"premiere-manche-gp", lecon:4, coll:"grand",
    mots:{ fr:{m:"la première manche"}, en:{m:"the first round", p:"feurst raound"},
           es:{m:"la primera manga"}, it:{m:"la prima manche"},
           de:{m:"der erste Umlauf", p:"èrs-te oum-laouf"}, ja:{m:"第一 回 走行", p:"daiichi-kai sōkō"},
           ar:{m:"الجولة الأولى"} },
    def:{ fr:"Les quarante qualifiés y passent. ⚠️ ON N'Y PREND PAS DE RISQUES : le but est d'être en deuxième manche, pas de gagner tout de suite. « Ne prends pas de risques inutiles dans la première manche » est la consigne standard de tous les entraîneurs.",
          en:"All forty qualified go. You don't take risks here: the aim is to be in the second round, not to win outright. « Don't take unnecessary risks in the first round » is every coach's standard line.",
          es:"Pasan los cuarenta clasificados. Aquí no se corren riesgos: el objetivo es estar en la segunda manga, no ganar ya.",
          it:"Passano i quaranta qualificati. Qui non si corrono rischi: l'obiettivo è essere nella seconda manche, non vincere subito.",
          de:"Alle vierzig Qualifizierten gehen. Hier geht man kein Risiko ein: das Ziel ist der zweite Umlauf, nicht der sofortige Sieg.",
          ja:"通過した四十人が走ります。ここで無理はしません。目的は第二回走行に残ることで、いきなり勝つことではありません。",
          ar:"يشارك فيها المتأهلون الأربعون. ⚠️ لا داعي للمخاطرة فيها بلا ضرورة: فالهدف هو التأهل إلى الجولة الثانية، لا الفوز فورا. «لا تأخذي مخاطر غير ضرورية في الجولة الأولى» من التعليمات المعتادة للمدربين." } },

  { ref:"deuxieme-manche-gp", lecon:4, coll:"grand",
    mots:{ fr:{m:"la deuxième manche"}, en:{m:"the second round", p:"sè-keunde raound"},
           es:{m:"la segunda manga"}, it:{m:"la seconda manche"},
           de:{m:"der zweite Umlauf", p:"tsvaï-te oum-laouf"}, ja:{m:"第二 回 走行", p:"daini-kai sōkō"},
           ar:{m:"الجولة الثانية"} },
    def:{ fr:"🟥 DIX-HUIT AU MAXIMUM Y REVIENNENT, et **dans l'ordre inverse du classement** : le mieux placé passe en dernier. C'est ce qui rend la fin insoutenable — on sait exactement ce qu'il faut faire, et tout le stade le sait aussi. Si deux terminent à égalité, il y a barrage. ⚠️ Le nombre varie selon l'épreuve : ne pas le supposer, le lire au programme.",
          en:"Eighteen at most come back, and in reverse order of the standings: the leader goes last. That's what makes the end unbearable — you know exactly what you have to do, and so does the whole stadium. Level scores mean a jump-off.",
          es:"Vuelven dieciocho como máximo, y en orden inverso a la clasificación: el mejor pasa el último. Si dos empatan, hay desempate.",
          it:"Tornano al massimo diciotto, e in ordine inverso alla classifica: il migliore passa per ultimo. In caso di parità c'è barrage.",
          de:"Höchstens achtzehn kommen zurück, in umgekehrter Reihenfolge: der Führende reitet zuletzt. Bei Gleichstand gibt es ein Stechen.",
          ja:"戻れるのは最大十八人。順位の逆順で走るため、首位は最後です。だから終盤は耐えがたい。何をすべきか本人も、スタジアム全体も分かっています。同点なら決勝ジャンプオフです。",
          ar:"🟥 يعود إليها ثمانية عشر فارسا كحد أقصى، **وبترتيب عكسي للترتيب العام**: صاحب أفضل مركز ينطلق أخيرا. وهذا ما يجعل النهاية شديدة التوتر — فالفارس يعرف بالضبط ما يجب عليه فعله، والجمهور كله يعرف ذلك أيضا. وإذا تعادل فارسان في الصدارة، تقام جولة تمايز. ⚠️ قد يختلف العدد بحسب الشوط، لذلك لا تفترضيه مسبقا بل تحققي منه في البرنامج." } },

  { ref:"barrage", lecon:4, coll:"saut",
    mots:{ fr:{m:"le barrage"}, en:{m:"the jump-off", p:"djeump-off", var:"against the clock"},
           es:{m:"el desempate"}, it:{m:"il barrage"},
           de:{m:"das Stechen", p:"chtè-cheune"}, ja:{m:"ジャンプオフ", p:"janpu ofu"},
           ar:{m:"جولة التمايز"} }, // ??
    def:{ fr:"Le second parcours, raccourci et chronométré, entre les sans-faute. ⚠️ Chaque langue a fait un choix différent : l'italien garde le mot français, l'anglais décrit l'action (*jump-off*), l'espagnol le résultat (*desempate*, « le départage »), et l'allemand emploie une image d'escrime, *das Stechen*.",
          en:"The shortened, timed second round between the clears. Every language chose differently: Italian keeps the French word, German uses a fencing image.",
          es:"El segundo recorrido, acortado y cronometrado, entre los ceros. ⚠️ Cada lengua eligió distinto: el italiano guarda la palabra francesa, el inglés describe la acción (*jump-off*), el español el resultado (*desempate*), y el alemán usa una imagen de esgrima, *das Stechen*.",
          it:"Il secondo percorso, accorciato e cronometrato, tra i netti. ⚠️ Ogni lingua ha scelto diversamente: l'italiano tiene la parola francese, l'inglese descrive l'azione (*jump-off*), lo spagnolo il risultato (*desempate*, « lo spareggio »), e il tedesco usa un'immagine di scherma, *das Stechen*.",
          de:"Der zweite, verkürzte Parcours auf Zeit unter den Nullrunden. ⚠️ Jede Sprache wählte anders: Italienisch behielt das französische Wort, Englisch beschreibt die Handlung (*jump-off*), Spanisch das Ergebnis (*desempate*) — und Deutsch nahm ein Fechtbild: das Stechen.",
          ja:"クリアラウンド同士で争う、短縮されたタイム勝負の第二走行。⚠️ 言語ごとに選択が分かれました。イタリア語はフランス語をそのまま、英語は行為を（*jump-off*）、スペイン語は結果を（*desempate*、「決着」）、そしてドイツ語はフェンシングの比喩を — *das Stechen*、「突き合い」。",
          ar:"مسار ثان أقصر ويجرى ضد الساعة بين الفرسان أصحاب الجولات الخالية من الأخطاء. ⚠️ اختارت كل لغة خيارا مختلفا: الإيطالية تحتفظ بالكلمة الفرنسية، والإنجليزية تصف الفعل (*jump-off*)، والإسبانية النتيجة (*desempate*، «فض التعادل»)، والألمانية تستعير صورة من المبارزة، *das Stechen*." } },

  { ref:"chrono", lecon:4, coll:"saut",
    mots:{ fr:{m:"le chrono"}, en:{m:"the clock", p:"klok", var:"the time"},
           es:{m:"el crono"}, it:{m:"il cronometro"},
           de:{m:"die Zeit", p:"tsaïte"}, ja:{m:"タイム", p:"taimu"},
           ar:{m:"التوقيت"} },
    def:{ fr:"⚠️ L'anglais ne dit pas « the chrono » mais **the clock**, et surtout l'expression **« against the clock »** — contre la montre. C'est elle qu'on entend annoncer au micro avant un barrage.",
          en:"English says the clock, and above all « against the clock » — the phrase announced before a jump-off.",
          es:"⚠️ El inglés no dice « the chrono » sino **the clock**, y sobre todo la expresión **« against the clock »** — contra el reloj. Es la que se oye anunciar por megafonía antes de un desempate.",
          it:"⚠️ L'inglese non dice « the chrono » ma **the clock**, e soprattutto l'espressione **« against the clock »** — contro il tempo. È quella che si sente annunciare al microfono prima di un barrage.",
          de:"⚠️ Das Englische sagt nicht « the chrono », sondern **the clock** — und vor allem **« against the clock »**. Genau das hört man vor einem Stechen aus dem Lautsprecher.",
          ja:"⚠️ 英語では « the chrono » ではなく **the clock**。とりわけ **« against the clock »**（時計との勝負）という言い回しを、ジャンプオフの前に場内放送で耳にします。",
          ar:"⚠️ لا تقول الإنجليزية «the chrono»، بل **the clock**، والأهم هو التعبير **«against the clock»** — أي «ضد الساعة». وهذا هو التعبير الذي تسمعينه في الإعلان قبل جولة التمايز." } },

  { ref:"puissance", lecon:4, coll:"saut",
    mots:{ fr:{m:"l'épreuve de puissance"}, en:{m:"the puissance", p:"pu-i-sanss"},
           es:{m:"la potencia", var:"la Puissance"}, it:{m:"la potenza"}, // ??
           de:{m:"das Mächtigkeitsspringen", p:"mèrh-tirh-kaïts-chprin-gueune"}, ja:{m:"パワー競技", p:"pawā kyōgi"},
           ar:{m:"شوط القدرة (Puissance)"} }, // ??
    def:{ fr:"L'épreuve de hauteur pure, où le mur monte à chaque tour. ⚠️ Cas savoureux : **l'anglais emploie le mot français** *puissance*, prononcé à l'anglaise, et c'est le mur de Hickstead qui l'a rendu célèbre. L'allemand, fidèle à lui-même, a préféré forger *Mächtigkeitsspringen*.",
          en:"The pure height class, the wall rising each round. English uses the French word puissance — and it was the Hickstead wall that made it famous.",
          es:"La prueba de altura pura, donde el muro sube en cada ronda. ⚠️ Caso sabroso: **el inglés emplea la palabra francesa** *puissance*, pronunciada a la inglesa, y fue el muro de Hickstead quien la hizo célebre. El alemán, fiel a sí mismo, prefirió forjar *Mächtigkeitsspringen*.",
          it:"La prova di altezza pura, dove il muro sale a ogni giro. ⚠️ Caso gustoso: **l'inglese usa la parola francese** *puissance*, pronunciata all'inglese, e fu il muro di Hickstead a renderla celebre. Il tedesco, fedele a se stesso, ha preferito forgiare *Mächtigkeitsspringen*.",
          de:"Die reine Höhenprüfung, bei der die Mauer Runde für Runde steigt. ⚠️ Köstlich: **Das Englische benutzt das französische Wort** *puissance*, englisch ausgesprochen — berühmt gemacht von der Mauer von Hickstead. Das Deutsche blieb sich treu und baute *Mächtigkeitsspringen*.",
          ja:"純粋な高さの競技。壁は一巡ごとに高くなります。⚠️ 味わい深いことに、**英語はフランス語の** *puissance* **をそのまま使い**、英語ふうに発音します。有名にしたのはヒックステッドの壁。ドイツ語は自分に忠実に、*Mächtigkeitsspringen* という複合語を鍛え上げました。",
          ar:"شوط يقوم على الارتفاع، حيث يرتفع الجدار في كل جولة. ⚠️ والمفارقة أن **الإنجليزية تستعمل الكلمة الفرنسية** *puissance* بنطق إنجليزي، وقد ساهم جدار هيكستيد الشهير في انتشارها. أما الألمانية فقد اختارت مصطلح *Mächtigkeitsspringen*." } },

  { ref:"tour-honneur", lecon:4, coll:"saut",
    mots:{ fr:{m:"le tour d'honneur"}, en:{m:"the lap of honour", p:"lap of o-neur", var:"victory gallop"},
           es:{m:"la vuelta de honor"}, it:{m:"il giro d'onore"},
           de:{m:"die Ehrenrunde", p:"é-reune-roune-de"}, ja:{m:"表彰ラウンド", p:"hyōshō raundo"},
           ar:{m:"جولة الشرف"} }, // ??
    def:{ fr:"Le galop des vainqueurs, rosette au frontal, derrière le premier. Les Britanniques l'appellent aussi **victory gallop**, et il se fait au galop, pas au pas — un cheval fatigué peut être excusé.",
          en:"The winners' gallop behind the leader, rosettes on the browbands. The British also call it the victory gallop.",
          es:"El galope de los vencedores, escarapela en la frontalera, detrás del primero. Los británicos lo llaman también **victory gallop**, y se hace al galope, no al paso — un caballo cansado puede ser excusado.",
          it:"Il galoppo dei vincitori, coccarda al frontale, dietro il primo. I britannici lo chiamano anche **victory gallop**, e si fa al galoppo, non al passo — un cavallo stanco può essere dispensato.",
          de:"Der Galopp der Sieger, Schleife am Stirnband, hinter dem Ersten. Die Briten nennen ihn auch **victory gallop** — geritten wird er im Galopp, nicht im Schritt; ein müdes Pferd darf entschuldigt werden.",
          ja:"勝者たちの周回。額革にロゼットをつけ、優勝者の後ろに続きます。イギリスでは **victory gallop** とも呼ばれ、常歩ではなく駈歩で回ります — 疲れた馬は免除してもらえます。",
          ar:"جولة بالعدو يؤديها الفائزون خلف صاحب المركز الأول، مع شارة الفوز على رباط جبهة الحصان. ويسميها البريطانيون أيضا **victory gallop**، وتؤدى بالعدو لا بالمشي — ويمكن إعفاء الحصان المتعب منها." } }
  ],

  /* ---- phrases complètes ---- */
  phrases: [
    { ref:"sans-faute-barrage", lecon:4,
      fr:"Sans-faute ! Elle est au barrage.",
      en:"Clear round ! She's through to the jump-off.",
      es:"¡ Cero faltas ! Está en el desempate.",
      it:"Percorso netto ! È al barrage.",
      de:"Nullrunde ! Sie ist im Stechen.",
      ja:"減点 なし です ! ジャンプオフ に 進み ます 。",
        ar:"جولة من دون أخطاء! إنها في جولة التمايز." },
    { ref:"quelle-hauteur", lecon:4,
      fr:"L'épreuve est à quelle hauteur ?",
      en:"What height is the class ?",
      es:"¿ A qué altura es la prueba ?",
      it:"A che altezza è la prova ?",
      de:"Auf welcher Höhe ist die Prüfung ?",
      ja:"競技 の 高さ は どれ くらい です か ?",
        ar:"ما ارتفاع هذا الشوط؟" },
  ],

  dialogue: {
    ville: "aachen", lecon: 4, temps: 6, langues: ["fr","en","es","it","de","ja","ar"],   /* 20 phrases */

    phrases: [

      /* ---- temps 1 · arriver dans le stade ---- */
      { ref:"da-premiere-fois-stade", temps:1, dit:"joueuse", mots:["grand-concours"],
        fr:"C'est la première fois que je monte dans un stade aussi grand.",
        en:"It's the first time I've ridden in such a big stadium.",
        es:"Es la primera vez que monto en un estadio tan grande.",
        it:"È la prima volta che monto in uno stadio così grande.",
        de:"Es ist das erste Mal, dass ich in einem so großen Stadion reite.",
        ja:"こんな に 大きな スタジアム で 走る の は 初めて です。",
        ar:"هذه أول مرة أمتطي فيها حصاني داخل ملعب بهذا الحجم." },

      { ref:"da-parcours-plus-gros", temps:1, dit:"club", mots:["grand-concours","parcours"],
        fr:"Le parcours paraît beaucoup plus gros une fois dans le stade.",
        en:"The course looks much bigger once you're in the stadium.",
        es:"El recorrido parece mucho más grande una vez dentro del estadio.",
        it:"Il percorso sembra molto più grande una volta nello stadio.",
        de:"Der Parcours wirkt viel größer, sobald man im Stadion ist.",
        ja:"コース は、 スタジアム に 入る と ずっと 大きく 見え ます。",
        ar:"يبدو المسار أكبر بكثير داخل الملعب." },

      { ref:"da-reconnaissance-dix", temps:1, dit:"club", mots:["reconnaissance","parcours"],
        fr:"La reconnaissance du parcours commence dans dix minutes.",
        en:"The course walk starts in ten minutes.",
        es:"El reconocimiento del recorrido empieza en diez minutos.",
        it:"La ricognizione del percorso comincia tra dieci minuti.",
        de:"Der Parcoursbesichtigung beginnt in zehn Minuten.",
        ja:"コース の 下見 は 十 分 後 に 始まり ます。",
        ar:"تبدأ معاينة مسار الحواجز بعد عشر دقائق." },

      /* ---- temps 2 · les qualificatives ---- */
      { ref:"da-premiere-qualif", temps:2, dit:"club", mots:["qualificative","grand-prix"],
        fr:"Cette épreuve est la première qualificative pour le Grand Prix.",
        en:"This class is the first qualifier for the Grand Prix.",
        es:"Esta prueba es la primera clasificatoria para el Gran Premio.",
        it:"Questa prova è la prima qualificazione per il Gran Premio.",
        de:"Diese Prüfung ist die erste Qualifikation für den Großen Preis.",
        ja:"この 競技 が、 グランプリ へ の 一 つ 目 の 予選 です。",
        ar:"هذا الشوط هو الأول من الشوطين التأهيليين للجائزة الكبرى." },

      { ref:"da-deuxieme-qualif", temps:2, dit:"club", mots:["qualificative"],
        fr:"Il reste encore une deuxième épreuve qualificative demain.",
        en:"There's still a second qualifying class tomorrow.",
        es:"Todavía queda una segunda prueba clasificatoria mañana.",
        it:"Resta ancora una seconda prova di qualificazione domani.",
        de:"Morgen kommt noch eine zweite Qualifikationsprüfung.",
        ja:"明日 に もう 一 つ、 二 つ 目 の 予選 が 残っ て い ます。",
        ar:"ما زال هناك شوط تأهيلي ثان غدا." },

      { ref:"da-points-additionnes", temps:2, dit:"club", mots:["points-cumules","qualificative"],
        fr:"Les points des deux qualificatives sont additionnés.",
        en:"The points from both qualifiers are added together.",
        es:"Los puntos de las dos clasificatorias se suman.",
        it:"I punti delle due qualificazioni si sommano.",
        de:"Die Punkte beider Qualifikationen werden addiert.",
        ja:"二 つ の 予選 の 得点 は 合算 され ます。",
        ar:"تجمع نقاط الشوطين التأهيليين." },

      { ref:"da-temps-accorde-dur", temps:2, dit:"club", mots:["temps-accorde"],
        fr:"Le temps accordé risque d'être difficile à respecter.",
        en:"The time allowed could be difficult to make.",
        es:"El tiempo concedido puede ser difícil de respetar.",
        it:"Il tempo accordato rischia di essere difficile da rispettare.",
        de:"Die erlaubte Zeit dürfte schwer zu halten sein.",
        ja:"規定 タイム を 守る の は 難しい かも しれ ませ ん。",
        ar:"قد يكون من الصعب إنهاء المسار ضمن الزمن المسموح." },

      /* ---- temps 3 · compter ses points ---- */
      { ref:"da-quarante-premiers", temps:3, dit:"club", mots:["seuil-qualification","se-qualifier"],
        fr:"Il faut terminer dans les quarante premiers pour se qualifier.",
        en:"You need to finish in the top forty to qualify.",
        es:"Hay que terminar entre los cuarenta primeros para clasificarse.",
        it:"Bisogna finire tra i primi quaranta per qualificarsi.",
        de:"Man muss unter die ersten vierzig kommen, um sich zu qualifizieren.",
        ja:"予選 を 通過 する に は、 上位 四十 位 以内 で 終える 必要 が あり ます。",
        ar:"يجب أن ننهي المنافسة ضمن الأربعين الأوائل للتأهل." },

      { ref:"da-juste-a-la-limite", temps:3, dit:"joueuse", mots:["seuil-qualification"],
        fr:"Pour l'instant, nous sommes juste à la limite de la qualification.",
        en:"At the moment, we're right on the qualification cut-off.",
        es:"De momento estamos justo en el corte de clasificación.",
        it:"Per ora siamo proprio sulla soglia di qualificazione.",
        de:"Im Moment liegen wir genau an der Qualifikationsgrenze.",
        ja:"今 の ところ、 予選 通過 ライン の ちょうど 境目 に い ます。",
        ar:"حتى الآن، نحن تماما عند حد التأهل." },

      { ref:"da-officiellement-qualifies", temps:3, dit:"joueuse", mots:["se-qualifier","grand-prix"],
        fr:"Nous sommes officiellement qualifiés pour le Grand Prix de dimanche.",
        en:"We've officially qualified for Sunday's Grand Prix.",
        es:"Estamos oficialmente clasificados para el Gran Premio del domingo.",
        it:"Siamo ufficialmente qualificati per il Gran Premio di domenica.",
        de:"Wir haben uns offiziell für den Großen Preis am Sonntag qualifiziert.",
        ja:"日曜 の グランプリ へ の 出場 が 正式 に 決まり まし た。",
        ar:"لقد تأهلنا رسميا إلى الجائزة الكبرى يوم الأحد." },

      /* ---- temps 4 · la liste de départ ---- */
      { ref:"da-liste-publiee", temps:4, dit:"club", mots:[], motsAilleurs:["liste-depart"],
        fr:"La liste de départ vient d'être publiée.",
        en:"The start list has just been published.",
        es:"La lista de salida acaba de publicarse.",
        it:"La lista di partenza è appena stata pubblicata.",
        de:"Die Startliste ist gerade veröffentlicht worden.",
        ja:"出走 リスト が たった今 発表 され まし た。",
        ar:"نشرت قائمة الانطلاق للتو." },

      { ref:"da-trente-deuxieme", temps:4, dit:"joueuse", mots:[], motsAilleurs:["ordre-depart","liste-depart"],
        fr:"Je passe en trente-deuxième position.",
        en:"I'm thirty-second to go.",
        es:"Salgo en trigésimo segundo lugar.",
        it:"Parto trentaduesima.",
        de:"Ich bin als Zweiunddreißigste dran.",
        ja:"三十二 番目 の 出番 です。",
        ar:"سأنطلق في المركز الثاني والثلاثين." },

      /* ---- temps 5 · le Grand Prix, première manche ---- */
      { ref:"da-pas-de-risques", temps:5, dit:"club", mots:["premiere-manche-gp"],
        fr:"Ne prends pas de risques inutiles dans la première manche.",
        en:"Don't take unnecessary risks in the first round.",
        es:"No corras riesgos innecesarios en la primera manga.",
        it:"Non correre rischi inutili nella prima manche.",
        de:"Geh im ersten Umlauf kein unnötiges Risiko ein.",
        ja:"第一 回 走行 で 無用 な 危険 を 冒さ ない で ください。",
        ar:"لا تخاطري بلا داع في الجولة الأولى." },

      { ref:"da-meilleurs-deuxieme", temps:5, dit:"club", mots:["deuxieme-manche-gp"],
        fr:"Les meilleurs cavaliers accéderont à la deuxième manche.",
        en:"The best riders will go through to the second round.",
        es:"Los mejores jinetes pasarán a la segunda manga.",
        it:"I migliori cavalieri accederanno alla seconda manche.",
        de:"Die besten Reiter kommen in den zweiten Umlauf.",
        ja:"上位 の 騎手 が 第二 回 走行 に 進み ます。",
        ar:"سيبلغ أفضل الفرسان الجولة الثانية." },

      { ref:"da-ordre-inverse", temps:5, dit:"club", mots:["deuxieme-manche-gp"], motsAilleurs:["ordre-depart"],
        fr:"Nous repartons en ordre inverse du classement.",
        en:"We'll go again in reverse order of the standings.",
        es:"Volvemos a salir en orden inverso a la clasificación.",
        it:"Ripartiamo in ordine inverso alla classifica.",
        de:"Wir starten erneut in umgekehrter Reihenfolge.",
        ja:"順位 の 逆順 で 再 スタート し ます。",
        ar:"سننطلق في الجولة التالية بترتيب عكسي للترتيب العام." },

      /* ---- temps 6 · le barrage ---- */
      { ref:"da-sans-faute-barrage", temps:6, dit:"club", mots:["sans-faute","barrage"],
        fr:"Un sans-faute nous qualifierait pour le barrage.",
        en:"A clear round would qualify us for the jump-off.",
        es:"Un recorrido sin falta nos clasificaría para el desempate.",
        it:"Un percorso netto ci qualificherebbe per il barrage.",
        de:"Eine Nullrunde würde uns fürs Stechen qualifizieren.",
        ja:"クリア ラウンド なら、 ジャンプオフ に 進め ます。",
        ar:"جولة خالية من الأخطاء ستؤهلنا إلى جولة التمايز." },

      { ref:"da-plus-de-risques", temps:6, dit:"club", mots:["barrage","chrono"],
        fr:"Au barrage, il faudra prendre davantage de risques.",
        en:"In the jump-off, we'll need to take more risks.",
        es:"En el desempate habrá que arriesgar más.",
        it:"Al barrage bisognerà rischiare di più.",
        de:"Im Stechen müssen wir mehr riskieren.",
        ja:"ジャンプオフ で は、 もっと 攻める 必要 が あり ます。",
        ar:"في جولة التمايز، سنحتاج إلى المخاطرة أكثر." },

      { ref:"da-gagner-ici", temps:6, dit:"joueuse", mots:["grand-prix","grand-concours"],
        fr:"Gagner ici serait l'une des plus grandes victoires de ma carrière.",
        en:"Winning here would be one of the biggest victories of my career.",
        es:"Ganar aquí sería una de las mayores victorias de mi carrera.",
        it:"Vincere qui sarebbe una delle vittorie più grandi della mia carriera.",
        de:"Hier zu gewinnen wäre einer der größten Siege meiner Laufbahn.",
        ja:"ここ で 勝て たら、 私 の 競技 人生 で 最大 の 勝利 の 一 つ に なり ます。",
        ar:"الفوز هنا سيكون من أكبر انتصارات مسيرتي." },

      { ref:"da-je-verifie-classement", temps:6, dit:"joueuse", mots:["points-cumules","seuil-qualification"],
        fr:"Où puis-je voir le classement cumulé des deux qualificatives ?",
        en:"Where can I see the aggregate standings from both qualifiers?",
        es:"¿Dónde puedo ver la clasificación acumulada de las dos clasificatorias?",
        it:"Dove posso vedere la classifica cumulata delle due qualificazioni?",
        de:"Wo sehe ich die Gesamtwertung beider Qualifikationen?",
        ja:"二 つ の 予選 の 合計 順位 は どこ で 見 られ ます か ?",
        ar:"أين يمكنني رؤية الترتيب التراكمي للشوطين التأهيليين؟" },

      { ref:"da-tour-honneur-aachen", temps:6, dit:"club", mots:["tour-honneur","grand-prix"],
        fr:"Le tour d'honneur du Grand Prix se fait devant quarante mille personnes.",
        en:"The Grand Prix lap of honour is ridden in front of forty thousand people.",
        es:"La vuelta de honor del Gran Premio se hace ante cuarenta mil personas.",
        it:"Il giro d'onore del Gran Premio si fa davanti a quarantamila persone.",
        de:"Die Ehrenrunde des Großen Preises reitet man vor vierzigtausend Menschen.",
        ja:"グランプリ の ウィニング ラン は、 四 万 人 の 前 で 行い ます。",
        ar:"تجرى جولة الشرف في الجائزة الكبرى أمام أربعين ألف شخص." }
    ]
  }
};
