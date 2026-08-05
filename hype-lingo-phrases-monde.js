/* hype-lingo-phrases-monde.js — Hype Linguae · les phrases manquantes
   ==================================================================
   Écrit le 5 août 2026 pour combler un trou repéré au test.

   ⚠️ LE PROBLÈME. Les phrases sont rangées par leçon dans leur fichier
   d'origine, et la répartition v2 ne donne pas les mêmes leçons aux
   mêmes villes. Résultat mesuré :
     · dressage n'a de phrases qu'en leçons 1 et 4 — or SAUMUR prend les
       leçons 2 et 3, donc Saumur avait ZÉRO phrase. C'est la ville de
       niveau 3, celle du palier « dire » : son niveau était creux.
     · ecurie n'en a qu'une par leçon 2 et 3 — VEJER n'en avait que deux.

   ⚠️ CE FICHIER N'ÉCRASE RIEN. Il se charge après les lexiques et pousse
   ses phrases dans `phrases` du chapitre concerné, en refusant tout `ref`
   déjà présent. Aucun fichier de lexique n'est modifié.

   ⚠️ STYLE À RESPECTER, repris des phrases existantes :
     · espace avant le point d'interrogation, comme dans tout le module ;
     · le japonais est écrit AVEC DES ESPACES entre les groupes — ce n'est
       pas une coquille : l'exercice de phrase se joue en remettant des
       morceaux dans l'ordre, et sans espaces il n'y a rien à déplacer.

   ⚠️ NON RELU PAR UN NATIF. À ajouter à hype-linguae-doutes.md.
   L'allemand et le japonais en priorité.
   ================================================================== */

(function(){
  var LEX = window.HYPE_LINGO_LEX;
  if(!LEX) return;

  var AJOUTS = {

  /* ============ DRESSAGE · leçons 2 et 3 → SAUMUR ============ */
  dressage: [

    /* leçon 2 · les mouvements */
    { ref:"ceder-jambe", lecon:2,
      fr:"Je fais une cession à la jambe de B vers E ?",
      en:"Shall I leg-yield from B to E ?",
      es:"¿ Hago una cesión a la pierna de B a E ?",
      it:"Faccio una cessione alla gamba da B a E ?",
      de:"Soll ich Schenkelweichen von B nach E reiten ?",
      ja:"B から E へ 脚譲り を し ます か ?" },

    { ref:"epaule-combien", lecon:2,
      fr:"Sur quelle longueur je garde l'épaule en dedans ?",
      en:"How far do I hold the shoulder-in ?",
      es:"¿ Cuánto mantengo la espalda adentro ?",
      it:"Per quanto tratto tengo la spalla in dentro ?",
      de:"Wie lange halte ich das Schulterherein ?",
      ja:"ショルダーイン は どこ まで 続け ます か ?" },

    { ref:"trop-vite-passage", lecon:2,
      fr:"Il précipite au passage, je ralentis la cadence ?",
      en:"He rushes in the passage — should I slow the rhythm ?",
      es:"Se precipita en el paso español, ¿ bajo el ritmo ?",
      it:"Affretta nel passage, rallento la cadenza ?",
      de:"Er eilt in der Passage — soll ich den Takt verlangsamen ?",
      ja:"パッサージュ で 急ぎ ます。 リズム を 落とし ます か ?" },

    /* leçon 3 · les qualités */
    { ref:"pas-decontracte", lecon:3,
      fr:"Il n'est pas décontracté, je le laisse s'étirer ?",
      en:"He is not relaxed — shall I let him stretch ?",
      es:"No está relajado, ¿ le dejo estirarse ?",
      it:"Non è decontratto, lo lascio allungarsi ?",
      de:"Er ist nicht losgelassen — soll ich ihn dehnen lassen ?",
      ja:"リラックス し て い ませ ん。 伸ばさ せ ます か ?" },

    { ref:"rassembler-trop", lecon:3,
      fr:"Je demande trop de rassembler pour son âge ?",
      en:"Am I asking too much collection for his age ?",
      es:"¿ Le pido demasiada reunión para su edad ?",
      it:"Chiedo troppa riunione per la sua età ?",
      de:"Verlange ich zu viel Versammlung für sein Alter ?",
      ja:"年齢 に 対して 収縮 を 求め すぎ です か ?" },

    { ref:"main-lourde", lecon:3,
      fr:"Ma main est trop lourde, il perd sa légèreté.",
      en:"My hand is too heavy and he loses his lightness.",
      es:"Mi mano es demasiado dura y pierde su ligereza.",
      it:"La mia mano è troppo pesante e perde la leggerezza.",
      de:"Meine Hand ist zu schwer, er verliert seine Leichtigkeit.",
      ja:"手 が 重 すぎ て 軽 さ が 失わ れ ます。" }

  ],

  /* ============ ÉCURIE · leçons 2 et 3 → VEJER ============ */
  ecurie: [

    { ref:"litiere-combien", lecon:2,
      fr:"Combien de balles de paille par box et par semaine ?",
      en:"How many bales of straw per stable each week ?",
      es:"¿ Cuántas pacas de paja por box a la semana ?",
      it:"Quante balle di paglia per box alla settimana ?",
      de:"Wie viele Ballen Stroh pro Box und Woche ?",
      ja:"一 週間 に 馬房 ごと 藁 は 何 個 です か ?" },

    { ref:"ou-brouette", lecon:2,
      fr:"Où je vide la brouette et où sont les fourches ?",
      en:"Where do I empty the barrow, and where are the forks ?",
      es:"¿ Dónde vacío la carretilla y dónde están las horcas ?",
      it:"Dove svuoto la carriola e dove sono i forconi ?",
      de:"Wo entleere ich die Schubkarre und wo sind die Gabeln ?",
      ja:"一輪車 は どこ に 空け ます か。 フォーク は どこ です か ?" },

    { ref:"ration-ecrite", lecon:3,
      fr:"Sa ration est écrite sur la porte, je peux la voir ?",
      en:"His feed is written on the door — may I see it ?",
      es:"Su ración está escrita en la puerta, ¿ puedo verla ?",
      it:"La sua razione è scritta sulla porta, posso vederla ?",
      de:"Seine Ration steht an der Tür — darf ich sie sehen ?",
      ja:"飼料 の 量 は 扉 に 書い て あり ます。 見 て も いい です か ?" },

    { ref:"foin-avant-grain", lecon:3,
      fr:"Je donne le foin avant les granulés, c'est bien ça ?",
      en:"I give the hay before the hard feed, is that right ?",
      es:"Doy el heno antes del pienso, ¿ es correcto ?",
      it:"Do il fieno prima dei mangimi, è giusto ?",
      de:"Ich gebe das Heu vor dem Kraftfutter, stimmt das ?",
      ja:"濃厚 飼料 の 前 に 乾草 を 与え ます。 それ で 合っ て い ます か ?" }

  ]

  };

  /* fusion : on refuse tout ref déjà présent, on ne remplace jamais */
  var ajoutees = 0, refuses = 0;
  Object.keys(AJOUTS).forEach(function(cle){
    var chap = LEX[cle];
    if(!chap) return;
    if(!chap.phrases) chap.phrases = [];
    var vus = {};
    chap.phrases.forEach(function(p){ vus[p.ref] = true; });
    AJOUTS[cle].forEach(function(p){
      if(vus[p.ref]){ refuses++; return; }
      chap.phrases.push(p); ajoutees++;
    });
  });
  if(window.console && console.log){
    console.log("[Linguae] phrases ajoutées : " + ajoutees +
                (refuses ? " · refusées (déjà présentes) : " + refuses : ""));
  }
})();
