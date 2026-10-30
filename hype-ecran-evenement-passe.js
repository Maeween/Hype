/* HYPE ▸ 30/10/2026 — Page ÉVÉNEMENT PASSÉ (EcranEvenementPasse), DÉTACHÉ de index.html pour alléger le démarrage de l'appli (~79 Ko).
   Chargé seulement à l'ouverture de l'écran (voir hypeEcranDiffere dans index.html). Code d'origine déplacé SANS changement :
   il utilise les mêmes outils partagés que le reste de l'appli (useApp, useState, T, etc.), disponibles à l'exécution. */
(function () {
function EcranEvenementPasse() {
  var h = React.createElement;
  var ctx = (typeof useApp === "function") ? useApp() : {};
  var tr = ctx.tr || function (o) { return (o && (o.fr || "")) || ""; };
  var setEcran = ctx.setEcran || function () { };
  var retourEcran = ctx.retourEcran, peutReculer = ctx.peutReculer;
  function T(fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }   /* 27/09 (414) : arabe */
  var C = "'Cinzel',Georgia,serif", M = "'Montserrat',sans-serif";
  var OR = "#D9C7A3";

  var paq = null;
  try { paq = window.__evPasse || null; } catch (e1) { paq = null; }
  /* ════════ 21/09 (313) — LA PAGE SOUVENIR S OUVRE PAR UN LIEN ════════
     Jusqu ici elle ne faisait AUCUNE requete : l agenda lui passait tout (window.__evPasse).
     Arrivee par un lien #s=<id>, ce paquet est vide : elle lit alors ELLE-MEME, pour CE SEUL
     rendez-vous, exactement ce que lit l agenda pour tous :
       · le rendez-vous (chargerAgendaEvenement) ;
       · les publications de son mur (cible « agenda:<id> ») et celles rattachees apres coup
         (hypePostsAgenda) → leurs medias ; les publications PRIVEES ecartees sauf les siennes ;
       · le document « Le jour J » repere par le texte de sa publication (regle du 310) ;
       · les resultats des cavalieres du club par la DATE (meme reserve que l agenda : rien en
         base ne relie un resultat a un rendez-vous), et le nom de chaque cheval.
     DROITS RELEVES EN BASE LE 21/09 : club_agenda, commentaires et resultats sont lisibles
     par le role « public ». Si une lecture echoue, la section concernee reste vide : jamais
     de donnee inventee. Arrivee depuis l agenda : RIEN ne change, le paquet est utilise.
     ⚠️ Ces etats sont declares AVANT tout retour anticipe (regle des hooks). */
  var stPaqL = React.useState(null); var paqLu = stPaqL[0], setPaqLu = stPaqL[1];
  var stErrL = React.useState(""); var errLien = stErrL[0], setErrLien = stErrL[1];
  var stMsgP = React.useState(""); var msgPartage = stMsgP[0], setMsgPartage = stMsgP[1];
  /* 21/09 (333) : la STORY d un concours passe - le panneau de choix, l apercu (UNE seule image en
     memoire, son adresse locale liberee a chaque remplacement et a la fermeture), l etat. */
  var stChP = React.useState(false); var choixPart = stChP[0], setChoixPart = stChP[1];
  var stStU = React.useState(""); var storyUrl = stStU[0], setStoryUrl = stStU[1];
  var stStB = React.useState(false); var storyBusy = stStB[0], setStoryBusy = stStB[1];
  var stStM = React.useState(""); var storyMsg = stStM[0], setStoryMsg = stStM[1];
  var storyFichierRef = React.useRef(null);
  var stSF = React.useState("story"); var storyFmt = stSF[0], setStoryFmt = stSF[1]; /* (342) */
  var storyUrlRef = React.useRef("");
  React.useEffect(function () { return function () { try { if (storyUrlRef.current) URL.revokeObjectURL(storyUrlRef.current); } catch (eRv) { } }; }, []);
  var stCouv = React.useState(""); var couvLocale = stCouv[0], setCouvLocale = stCouv[1];
  var stCouvB = React.useState(""); var couvBusy = stCouvB[0], setCouvBusy = stCouvB[1];
  var stCouvE = React.useState(""); var couvErr = stCouvE[0], setCouvErr = stCouvE[1];
  var idLien = null;
  try { idLien = (!paq && window.__evPasseId) ? String(window.__evPasseId) : null; } catch (eIl) { idLien = null; }
  if (!paq && paqLu && paqLu.ev && idLien && String(paqLu.ev.id) === idLien) paq = paqLu;
  React.useEffect(function () {
    if (!idLien) return;
    var vifL = true;
    setErrLien("");
    (async function () {
      try {
        if (typeof chargerAgendaEvenement !== "function") { if (vifL) setErrLien("indisponible"); return; }
        var rE = await chargerAgendaEvenement(idLien);
        if (!vifL) return;
        if (!rE || rE.error || !rE.data) { setErrLien(rE && rE.error ? String((rE.error && rE.error.message) || rE.error) : "introuvable"); return; }
        var evL = rE.data;
        var moiL = null; try { moiL = await utilisateurActuel(); } catch (eMl) { moiL = null; }
        var medsL = [], docsL = [];
        var TITRES_JJ = ["le jour j", "race day", "el d\u00eda j", "il giorno", "\u5f53\u65e5", "der tag"];
        var ajouterPost = function (po, estDirect) {
          if (!po) return;
          if (po.prive && !(moiL && po.user_id === moiL.id)) return;
          if (po.photo_url && medsL.indexOf(po.photo_url) === -1) medsL.push(po.photo_url);
          (Array.isArray(po.medias) ? po.medias : []).forEach(function (u) { if (u && medsL.indexOf(u) === -1) medsL.push(u); });
          if (estDirect && po.photo_url) {
            var tx = (typeof po.texte === "string") ? po.texte.replace(/\s+/g, " ").trim().toLowerCase() : "";
            if (tx && TITRES_JJ.indexOf(tx) !== -1) docsL.push(po.photo_url);
          }
        };
        try {
          var rC = await supa.from("commentaires").select("*").eq("cible", "agenda:" + String(evL.id)).order("created_at", { ascending: true }).limit(400);
          ((rC && rC.data) || []).forEach(function (po) { ajouterPost(po, true); });
        } catch (eRc) { }
        try {
          if (typeof hypePostsAgenda === "function") {
            var rRa = await hypePostsAgenda(evL.id);
            ((rRa && rRa.data) || []).forEach(function (po) { ajouterPost(po, false); });
          }
        } catch (eRa) { }
        var resL = [];
        try {
          var clefL = String(evL.club_clef || "");
          if (clefL && typeof clefClubG === "function") {
            var ck = clefClubG(clefL);
            var rPf = await supa.from("profiles").select("id, ecurie, ecurie2").or("ecurie.not.is.null,ecurie2.not.is.null").limit(2000);
            var idsCav = ((rPf && rPf.data) || []).filter(function (pr) {
              var e1 = clefClubG(pr.ecurie || ""), e2 = clefClubG(pr.ecurie2 || "");
              return (!!e1 && hypeMemeClub(e1, ck)) || (!!e2 && hypeMemeClub(e2, ck));
            }).map(function (pr) { return pr.id; });
            var d1L = String(evL.date_jour || ""), d2L = String(evL.date_fin || evL.date_jour || "");
            if (idsCav.length && d1L) {
              var rRs = await supa.from("resultats").select("user_id, cheval_id, concours, epreuve, date_epreuve, place, partants, cavalier, visible")
                .in("user_id", idsCav.slice(0, 200)).gte("date_epreuve", d1L).lte("date_epreuve", d2L).limit(300);
              resL = ((rRs && !rRs.error && rRs.data) || []).filter(function (li) { return li && li.visible !== false; }); /* (344) la coche de l import gouverne */
              var idsChv = [];
              resL.forEach(function (li) { if (li && li.cheval_id && idsChv.indexOf(li.cheval_id) === -1) idsChv.push(li.cheval_id); });
              if (idsChv.length) {
                var rChv = await supa.from("chevaux").select("id, nom").in("id", idsChv.slice(0, 300));
                var nomPar = {};
                ((rChv && !rChv.error && rChv.data) || []).forEach(function (cv) { if (cv && cv.id) nomPar[String(cv.id)] = cv.nom || ""; });
                resL.forEach(function (li) { if (li && li.cheval_id) li.cheval_nom = nomPar[String(li.cheval_id)] || ""; });
              }
            }
          }
        } catch (eRs) { }
        if (!vifL) return;
        setPaqLu({ ev: evL, medias: medsL, resultats: resL, documents: docsL });
      } catch (eL) { if (vifL) setErrLien(String(eL)); }
    })();
    return function () { vifL = false; };
  }, [idLien]);
  var ev = (paq && paq.ev) || null;
  var meds = (paq && paq.medias) || [];
  var res = (paq && paq.resultats) || [];

  var stV = React.useState(null); var visu = stV[0], setVisu = stV[1];
  /* 21/09 (309) : le mur des souvenirs se deplie (6 photos puis toutes), et le choix de la
     couverture passe dans un mode a part (le bouton sur chaque photo gacherait le pele-mele). */
  var stMurT = React.useState(false); var voirToutMurEv = stMurT[0], setVoirToutMurEv = stMurT[1];
  var stModeC = React.useState(false); var modeCouv = stModeC[0], setModeCouv = stModeC[1];
  /* 21/09 (310) : la VRAIE proportion de chaque photo du mur, lue a son chargement (hauteur /
     largeur). Sert a equilibrer les deux colonnes sans jamais recadrer. */
  var stRatM = React.useState({}); var ratiosMur = stRatM[0], setRatiosMur = stRatM[1];
  /* 17/09 (227) : suppression du rendez-vous depuis sa page. Le droit est lu sur la CLEF du
     club portee par le rendez-vous, comparee au registre (qui vient de la base depuis le 225). */
  var stSupE = React.useState(""); var errSup = stSupE[0], setErrSup = stSupE[1];
  var stSupB = React.useState(false); var busySup = stSupB[0], setBusySup = stSupB[1];
  var stMoiE = React.useState(null); var moiEv = stMoiE[0], setMoiEv = stMoiE[1];
  React.useEffect(function () {
    var vifE = true;
    try { Promise.resolve(utilisateurActuel()).then(function (u) { if (vifE) setMoiEv(u || null); }).catch(function () { if (vifE) setMoiEv(null); }); } catch (eU) { }
    return function () { vifE = false; };
  }, []);
  var peutSupprimerRdv = !!(ev && ev.club_clef && moiEv && typeof clefClubRevendiqueePar === "function" && clefClubRevendiqueePar(ev.club_clef, moiEv));
  function supprimerCeRdv() {
    if (!ev || !ev.id || busySup) return;
    var okS = true;
    try {
      if (window.confirm) okS = window.confirm(T("Supprimer \u00ab " + (ev.titre || "") + " \u00bb ? Ses photos et commentaires seront effac\u00e9s aussi.", "Delete \u201c" + (ev.titre || "") + "\u201d? Its photos and comments will be deleted too.", "\u00bfEliminar \u00ab" + (ev.titre || "") + "\u00bb?", "Eliminare \u00ab" + (ev.titre || "") + "\u00bb?", "\u300c" + (ev.titre || "") + "\u300d\u3092\u524a\u9664\u3057\u307e\u3059\u304b\uff1f", "\u201e" + (ev.titre || "") + "\u201c l\u00f6schen?", "\u062d\u0630\u0641 \u00ab " + (ev.titre || "") + " \u00bb\u061f \u0633\u062a\u062d\u0630\u0641 \u0635\u0648\u0631\u0647 \u0648\u062a\u0639\u0644\u064a\u0642\u0627\u062a\u0647 \u0623\u064a\u0636\u0627.", "确定删除“" + (ev.titre || "") + "”吗？它的照片和评论也会被一并删除。", "Verwijder “" + (ev.titre || "") + "”? Ook de foto's en reacties worden verwijderd.", "Excluir “" + (ev.titre || "") + "”? As fotos e os comentários dele também serão excluídos.", ("Ta bort ”" + (ev.titre || "") + "”? Dess foton och kommentarer raderas också."), ("Удалить «" + (ev.titre || "") + "»? Его фото и комментарии тоже будут удалены."), ("Usunąć „" + (ev.titre || "") + "”? Jego zdjęcia i komentarze też zostaną usunięte."), ("“" + (ev.titre || "") + "”을(를) 삭제할까요? 사진과 댓글도 함께 삭제돼요.")));
    } catch (eC5) { }
    if (!okS) return;
    setErrSup(""); setBusySup(true);
    try {
      Promise.resolve(supprimerAgendaClub(ev.id)).then(function (r) {
        setBusySup(false);
        if (r && r.error) { setErrSup(T("La suppression a \u00e9t\u00e9 refus\u00e9e : ", "Deletion was refused: ", "Eliminaci\u00f3n rechazada: ", "Eliminazione rifiutata: ", "\u524a\u9664\u304c\u62d2\u5426\u3055\u308c\u307e\u3057\u305f\uff1a", "L\u00f6schen abgelehnt: ", "\u062a\u0645 \u0631\u0641\u0636 \u0627\u0644\u062d\u0630\u0641: ", "删除被拒绝：", "Het verwijderen is geweigerd: ", "A exclusão foi recusada: ", "Borttagningen nekades: ", "Удаление было отклонено: ", "Usunięcie zostało odrzucone: ", "삭제가 거부되었어요: ") + String((r.error && r.error.message) || r.error)); return; }
        try { window.__evPasse = null; } catch (eW) { }
        retour();
      }).catch(function (eD3) { setBusySup(false); setErrSup(String(eD3)); });
    } catch (eD4) { setBusySup(false); setErrSup(String(eD4)); }
  }

  function retour() { if (peutReculer && retourEcran) { retourEcran(); } else { setEcran("agenda-club"); } }

  var MOIS = [T("janvier", "January", "enero", "gennaio", "1\u6708", "Januar", "\u064a\u0646\u0627\u064a\u0631", "一月", "januari", "janeiro", "januari", "январь", "styczeń", "1월"), T("f\u00e9vrier", "February", "febrero", "febbraio", "2\u6708", "Februar", "\u0641\u0628\u0631\u0627\u064a\u0631", "二月", "februari", "fevereiro", "februari", "февраль", "luty", "2월"), T("mars", "March", "marzo", "marzo", "3\u6708", "M\u00e4rz", "\u0645\u0627\u0631\u0633", "3月", "mrt", "mar", "mars", "мар", "mar", "3월"), T("avril", "April", "abril", "aprile", "4\u6708", "April", "\u0623\u0628\u0631\u064a\u0644", "四月", "april", "abril", "april", "апрель", "kwiecień", "4월"), T("mai", "May", "mayo", "maggio", "5\u6708", "Mai", "\u0645\u0627\u064a\u0648", "5月", "mei", "mai", "maj", "мая", "maj", "5월"), T("juin", "June", "junio", "giugno", "6\u6708", "Juni", "\u064a\u0648\u0646\u064a\u0648", "6月", "jun", "jun", "juni", "июн", "cze", "6월"), T("juillet", "July", "julio", "luglio", "7\u6708", "Juli", "\u064a\u0648\u0644\u064a\u0648", "七月", "juli", "julho", "juli", "июль", "lipiec", "7월"), T("ao\u00fbt", "August", "agosto", "agosto", "8\u6708", "August", "\u0623\u063a\u0633\u0637\u0633", "8月", "aug", "ago", "aug", "авг", "sie", "8월"), T("septembre", "September", "septiembre", "settembre", "9\u6708", "September", "\u0633\u0628\u062a\u0645\u0628\u0631", "九月", "september", "setembro", "september", "сентябрь", "wrzesień", "9월"), T("octobre", "October", "octubre", "ottobre", "10\u6708", "Oktober", "\u0623\u0643\u062a\u0648\u0628\u0631", "十月", "oktober", "outubro", "oktober", "октябрь", "październik", "10월"), T("novembre", "November", "noviembre", "novembre", "11\u6708", "November", "\u0646\u0648\u0641\u0645\u0628\u0631", "十一月", "november", "novembro", "november", "ноябрь", "listopad", "11월"), T("d\u00e9cembre", "December", "diciembre", "dicembre", "12\u6708", "Dezember", "\u062f\u064a\u0633\u0645\u0628\u0631", "十二月", "december", "dezembro", "december", "декабрь", "grudzień", "12월")];
  function jourDe(s) { var m = String(s || "").match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null; }
  var quand = "";
  try {
    var d1 = ev ? jourDe(ev.date_jour) : null;
    var d2 = (ev && ev.date_fin) ? jourDe(ev.date_fin) : null;
    if (d1) {
      quand = d1.getDate() + " " + MOIS[d1.getMonth()] + " " + d1.getFullYear();
      if (d2 && ev.date_fin !== ev.date_jour) {
        var mm = (d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear());
        quand = T("du ", "from ", "del ", "dal ", "", "vom ", "\u0645\u0646 ", "从 ", "van ", "de ", "från ", "с ", "od ", " ") + (mm ? String(d1.getDate()) : (d1.getDate() + " " + MOIS[d1.getMonth()]))
          + T(" au ", " to ", " al ", " al ", " \u301c ", " bis ", " \u0625\u0644\u0649 ", " 至 ", " tot ", " a ", " till ", " по ", " do ", " ~ ") + d2.getDate() + " " + MOIS[d2.getMonth()] + " " + d2.getFullYear();
      }
    }
  } catch (eQ) { quand = (ev && ev.date_jour) || ""; }

  if (!ev && idLien && !errLien) {
    return h("div", { style: { minHeight: "100vh", background: "#060709", color: "#8A929C", padding: "calc(env(safe-area-inset-top) + 90px) 20px 40px", textAlign: "center", fontFamily: M, fontSize: 13 } },
      T("Ouverture du souvenir…", "Opening the memory…", "Abriendo el recuerdo…", "Apertura del ricordo…", "思い出を開いています…", "Erinnerung wird geöffnet…", "\u062c\u0627\u0631 \u0641\u062a\u062d \u0627\u0644\u0630\u0643\u0631\u0649\u2026", "正在打开回忆…", "Herinnering openen…", "Abrindo a lembrança…", "Öppnar minnet…", "Открываем воспоминание…", "Otwieranie wspomnienia…", "추억 여는 중…"));
  }
  if (!ev) {
    return h("div", { style: { minHeight: "100vh", background: "#060709", color: "#EDF2F5", padding: "calc(env(safe-area-inset-top) + 70px) 20px 40px", textAlign: "center" } },
      h("div", { style: { fontFamily: M, fontSize: 13, color: "#8A929C", lineHeight: 1.6 } },
        T("Ce rendez-vous n\u2019a pas pu \u00eatre ouvert. Reviens \u00e0 l\u2019agenda et retouche-le.", "This event could not be opened. Go back to the agenda and tap it again.", "No se pudo abrir esta cita. Vuelve a la agenda y t\u00f3cala de nuevo.", "Impossibile aprire questo evento. Torna all\u2019agenda e riprova.", "\u3053\u306e\u4e88\u5b9a\u3092\u958b\u3051\u307e\u305b\u3093\u3067\u3057\u305f\u3002", "Dieser Termin konnte nicht ge\u00f6ffnet werden.", "\u062a\u0639\u0630\u0631 \u0641\u062a\u062d \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0639\u062f. \u0639\u0648\u062f\u064a \u0625\u0644\u0649 \u0627\u0644\u0645\u0648\u0627\u0639\u064a\u062f \u0648\u0627\u0644\u0645\u0633\u064a\u0647 \u0645\u0646 \u062c\u062f\u064a\u062f.", "这个活动无法打开。请回到日程，再点一次。", "Deze afspraak kon niet worden geopend. Ga terug naar de agenda en tik er opnieuw op.", "Não foi possível abrir este compromisso. Volte para a agenda e toque nele de novo.", "Den här händelsen kunde inte öppnas. Gå tillbaka till kalendern och tryck på den igen.", "Не удалось открыть это событие. Вернись в календарь и нажми на него ещё раз.", "Nie udało się otworzyć tego wydarzenia. Wróć do kalendarza i dotknij go ponownie.", "이 일정을 열 수 없어요. 일정으로 돌아가서 다시 눌러 주세요.")),
      h("div", { role: "button", onClick: retour, style: { margin: "18px auto 0", width: "fit-content", padding: "11px 20px", borderRadius: 999, border: "1px solid rgba(217,199,163,0.35)", color: OR, fontFamily: M, fontSize: 12, fontWeight: 700, cursor: "pointer" } },
        T("Retour \u00e0 l\u2019agenda", "Back to the agenda", "Volver a la agenda", "Torna all\u2019agenda", "\u4e88\u5b9a\u306b\u623b\u308b", "Zur\u00fcck zum Kalender", "\u0627\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u0648\u0627\u0639\u064a\u062f", "返回日程", "Terug naar de agenda", "Voltar para a agenda", "Tillbaka till kalendern", "Назад в календарь", "Wróć do kalendarza", "일정으로 돌아가기")));
  }

  var meta = {};
  try { meta = (typeof HYPE_TYPES_AGENDA !== "undefined" && HYPE_TYPES_AGENDA[ev.type]) ? HYPE_TYPES_AGENDA[ev.type] : {}; } catch (eM) { meta = {}; }
  var libType = (ev.type === "concours") ? T("Concours", "Show", "Concurso", "Concorso", "\u5927\u4f1a", "Turnier", "\u0645\u0633\u0627\u0628\u0642\u0629", "比赛", "Wedstrijd", "Competição", "Tävling", "Соревнования", "Zawody", "대회")
    : (ev.type === "sortie") ? T("Sortie", "Outing", "Salida", "Uscita", "\u304a\u51fa\u304b\u3051", "Ausflug", "\u062e\u0631\u062c\u0629", "外出活动", "Uitje", "Passeio", "Utflykt", "Выезд", "Wyjazd", "나들이")
    : T("Stage", "Clinic", "Curso", "Stage", "\u8b1b\u7fd2\u4f1a", "Kurs", "\u062a\u062f\u0631\u064a\u0628", "训练营", "Clinic", "Estágio", "Kurs", "Сбор", "Warsztaty", "클리닉");
  /* 18/09 (231) - CHOISIR LA PHOTO DE COUVERTURE. Sa demande : « faudrait pouvoir choisir
     laquelle va apparaitre en couverture ». La colonne `image_url` de `club_agenda` EXISTE
     DEJA et c est elle qui sert de couverture : choisir = y ecrire l URL du media retenu.
     AUCUN SQL, aucune colonne nouvelle. Reserve au GESTIONNAIRE DU CLUB (meme droit que la
     suppression, `peutSupprimerRdv`) : une cavaliere ne voit pas le bouton.
     L ecriture passe par `modifierAgendaClub`, qui verifie deja qu une ligne est bien
     revenue - le piege du 208, une ecriture refusee ne renvoie pas d erreur mais zero ligne. */
  /* (313) : les trois etats de la couverture sont declares plus haut, avant le retour anticipe. */
  async function choisirCouverture(u) {
    if (couvBusy) return;
    setCouvErr(""); setCouvBusy(u);
    try {
      if (typeof modifierAgendaClub !== "function" || !ev || !ev.id) { setCouvErr("Indisponible."); setCouvBusy(""); return; }
      var r = await modifierAgendaClub(ev.id, { image_url: u });
      if (r && r.error) { setCouvErr(String((r.error && r.error.message) || r.error)); setCouvBusy(""); return; }
      /* L ecran ne change QU APRES la base. On garde le choix en local : `ev` vient d un
         paquet fige, il ne se rechargera qu au prochain passage par l agenda. */
      setCouvLocale(u);
      try { ev.image_url = u; } catch (eMc) { }
    } catch (eC) { setCouvErr(String(eC)); }
    setCouvBusy("");
  }

  var couv = couvLocale || ev.image_url || meds[0] || "";
  /* 21/09 (313) - PARTAGER LE SOUVENIR. Le message : le titre, la date, le lieu, le nombre de
     photos et de resultats, et un LIEN #s=<id> qui ouvre directement ce mur. On y joint UNE
     VRAIE PHOTO : la couverture choisie si c est une photo du mur, sinon la premiere photo -
     jamais le document « Le jour J ». Le telephone refuse les fichiers ? On partage le texte
     seul. Pas de partage du tout (ordinateur) ? Le texte est copie, et on le DIT. */
  /* ════════ 21/09 (333) — LA STORY D UN CONCOURS PASSE (premier test) ════════
     Brief de Blandine : une image verticale 1080 × 1920 a partir des VRAIES photos du concours,
     posees DERRIERE son fond fixe « hype-story-concours-images-journee.png » (racine du site),
     dont les trois cadres sont de vraies ouvertures transparentes. Le fond et ses textes ne sont
     JAMAIS redessines ; le code ajoute seulement les photos, le titre, la date, le lieu et les
     compteurs.
     ORDRE : noir -> grande photo -> petite photo (ou noir) -> photo portrait (ou noir) -> le PNG
     -> les textes. Les cadres secondaires sont TOUJOURS peints apres la grande photo, photo ou
     noir : la grande ne peut donc jamais transparaitre dans une autre fenetre.
     MESURES prises sur le vrai fichier (941 × 1672, composantes transparentes, rectangles
     tournes minimaux), ramenees au format 1080 × 1920 ; + 6 px de marge (le fond masque).
     PHOTOS : photosEv (videos, document « Le jour J » et doublons deja ecartes, regles de la
     page), la couverture choisie en grand si c en est une. Chargees par fetch -> Blob -> adresse
     locale : le Canvas n est jamais contamine (sinon toBlob echouerait). Une photo qui echoue
     laisse sa place a la suivante ; aucune photo lisible -> partage classique.
     LIEN : toujours https://2hype.fr/#s=<id> (jamais location.origin : une PWA installee peut
     encore tourner sur l ancienne adresse). Instagram ne rend pas un lien cliquable depuis une
     page web : 2HYPE.FR est dans l image, le lien part dans le texte ET « Copier le lien » existe. */
  /* (334) : le fond vit dans le dossier images/ du depot, comme les 95 autres images de l appli ;
     repli a la racine si le fichier y a ete pousse. */
  var STORY_FOND = "images/hype-story-concours-images-journee.png";
  var STORY_FOND_REPLI = "hype-story-concours-images-journee.png";
  var STORY_BASE = "https://2hype.fr/";
  var STORY_CADRES = [
    { cx: 462.6, cy: 643.1, w: 734, h: 453, rot: -4.28, fy: 0.28 },  /* grand paysage en haut */
    { cx: 390.0, cy: 1020.0, w: 500, h: 262, rot: 4.87, fy: 0.28 },  /* petit paysage en bas a gauche (336 : cadrage remonte) */
    { cx: 853.6, cy: 904.6, w: 292, h: 509, rot: 6.24, fy: 0.3 }     /* portrait a droite */
  ];
  var STORY_TEXTES = {
    titre: { x: 71, cy: 168, largeur: 700, hauteur: 96 },
    date: { x: 170, base: 257, largeur: 373 },
    lieu: { x: 170, base: 325, largeur: 373 },
    compteurs: { cx: 828.6, cy: 1290.9, largeur: 212, hauteur: 60 }
  };
  function lienStory() { return STORY_BASE + "#souvenir=" + String(ev.id); } /* (337) */
  /* 22/09 (342) - LE FORMAT « PUBLICATION » INSTAGRAM. Son fond fourni le 22/09 (le second des
     deux envoyés, « choisis le plus pratique »), rangé dans images/ sous
     « hype-publication-concours-images-journee.png ». Il fait 1092 × 1440 (≈ 3:4) : une
     publication Instagram accepte au plus du 4:5 -> l image fabriquée fait 1080 × 1350, le fond
     y est posé ROGNÉ de 37,5 px en haut et en bas (le fichier n est pas modifié ; les éléments
     écrits restent entiers, vérifié par simulation). Trois fenêtres mesurées sur le fichier
     (composantes transparentes, rectangles tournés), ramenées à 1080 × 1350, + 6 px.
     PAS DE LIGNE DE TITRE sur ce fond : sur sa décision (« choisis le plus pratique »), le NOM du
     concours va à côté de l épingle, suivi du lieu s il n y est pas déjà (« CSO Étrier de Paris »
     contient « Étrier de Paris » -> une seule fois). */
  var PUB_FORMAT = {
    W: 1080, H: 1350, nom: "publication",
    fond: "images/hype-publication-concours-images-journee.png", repli: "hype-publication-concours-images-journee.png",
    rognage: { sx: 0, sy: 37.5, sw: 1092, sh: 1365 },
    cadres: [
      { cx: 481.3, cy: 426.2, w: 743, h: 403, rot: -4.22, fy: 0.28 },
      { cx: 390.0, cy: 760.9, w: 481, h: 229, rot: 5.88, fy: 0.28 },
      { cx: 844.6, cy: 653.1, w: 290, h: 453, rot: 6.83, fy: 0.3 }
    ],
    textes: {
      titre: null,
      date: { x: 178, base: 111, largeur: 415 },
      lieu: { x: 178, base: 158, largeur: 415, avecTitre: true },
      compteurs: { cx: 827, cy: 963, largeur: 212, hauteur: 58 }
    }
  };
  function chargerImageLocale(url) {
    return (async function () {
      /* (335) : meme appel que le partage classique, qui fonctionne (photo jointe vue dans
         WhatsApp). « force-cache » pouvait resservir la copie chargee par une balise <img>
         SANS en-tetes CORS : Safari refuse alors la lecture. */
      var rp = await fetch(url);
      if (!rp || !rp.ok) throw new Error("HTTP " + (rp && rp.status));
      var bl = await rp.blob();
      if (!bl || !bl.size) throw new Error("vide");
      var adr = URL.createObjectURL(bl);
      var img = await new Promise(function (ok, ko) {
        var im = new Image();
        im.onload = function () { ok(im); };
        im.onerror = function () { ko(new Error("decodage")); };
        im.src = adr;
      });
      return { img: img, liberer: function () { try { URL.revokeObjectURL(adr); } catch (eL) { } } };
    })();
  }
  function peindreCadre(ctx, c, img) {
    ctx.save();
    ctx.translate(c.cx, c.cy);
    ctx.rotate(c.rot * Math.PI / 180);
    ctx.beginPath(); ctx.rect(-c.w / 2, -c.h / 2, c.w, c.h); ctx.clip();
    if (img) {
      var iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
      var k = Math.max(c.w / iw, c.h / ih), dw = iw * k, dh = ih * k;
      ctx.drawImage(img, -dw / 2, -c.h / 2 - (dh - c.h) * c.fy, dw, dh);
    } else {
      ctx.fillStyle = "#000000"; ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
    }
    ctx.restore();
  }
  function couperLignes(ctx, txt, largeur, maxLignes) {
    var mots = String(txt || "").split(/\s+/).filter(Boolean), lignes = [], cur = "";
    for (var i = 0; i < mots.length; i++) {
      var essai = cur ? cur + " " + mots[i] : mots[i];
      if (ctx.measureText(essai).width <= largeur || !cur) cur = essai;
      else { lignes.push(cur); cur = mots[i]; }
    }
    if (cur) lignes.push(cur);
    if (lignes.length > maxLignes) return null;
    for (var j = 0; j < lignes.length; j++) if (ctx.measureText(lignes[j]).width > largeur) return null;
    return lignes;
  }
  function ligneAjustee(ctx, txt, largeur, famille, poids, taille, tailleMin) {
    var t = taille;
    ctx.font = poids + " " + t + "px " + famille;
    while (t > tailleMin && ctx.measureText(txt).width > largeur) { t -= 1; ctx.font = poids + " " + t + "px " + famille; }
    var s = String(txt);
    if (ctx.measureText(s).width > largeur) {
      while (s.length > 1 && ctx.measureText(s + "\u2026").width > largeur) s = s.slice(0, -1);
      s = s + "\u2026";
    }
    return s;
  }
  async function fabriquerStory(fmt) {
    var FM = (fmt === "publication") ? PUB_FORMAT : { W: 1080, H: 1920, nom: "story", fond: STORY_FOND, repli: STORY_FOND_REPLI, rognage: null, cadres: STORY_CADRES, textes: STORY_TEXTES };
    var photos = (typeof photosEv !== "undefined" && photosEv) ? photosEv.slice() : [];
    var couvC = couvLocale || ev.image_url || "";
    if (couvC && photos.indexOf(couvC) > 0) { photos.splice(photos.indexOf(couvC), 1); photos.unshift(couvC); }
    if (!photos.length) return null;
    var libs = [];
    try {
      /* les photos : on remplit les cadres dans l ordre grand, portrait, petit ;
         une photo illisible cede sa place a la suivante */
      /* 21/09 (336) - CHAQUE PHOTO DANS LE CADRE QUI LUI VA. Sa capture de 18 h 05 : « un souci
         d adaptation des images » - une photo VERTICALE etait tombee dans le petit cadre paysage et
         y perdait la tete de la cavaliere. On charge desormais jusqu a 6 photos, puis : la
         couverture (ou la premiere) en grand ; la plus VERTICALE des autres dans le cadre portrait ;
         la plus HORIZONTALE restante dans le petit cadre paysage. Toujours trois photos
         differentes, jamais etirees. */
      var images = [null, null, null], dernierEchec = "", charges = [];
      for (var iP = 0; iP < photos.length && charges.length < 6; iP++) {
        try {
          var li = await chargerImageLocale(photos[iP]);
          libs.push(li);
          var iwC = li.img.naturalWidth || li.img.width || 1, ihC = li.img.naturalHeight || li.img.height || 1;
          charges.push({ img: li.img, ratio: ihC / iwC });
        } catch (eP) { dernierEchec = "photo : " + String((eP && eP.message) || eP); }
      }
      if (!charges.length) return { erreur: dernierEchec || "aucune photo lisible" };
      images[0] = charges[0].img;
      var reste = charges.slice(1);
      if (reste.length) {
        var iV = 0; reste.forEach(function (c, k) { if (c.ratio > reste[iV].ratio) iV = k; });
        images[2] = reste[iV].img; reste.splice(iV, 1);
      }
      if (reste.length) {
        var iH = 0; reste.forEach(function (c, k) { if (c.ratio < reste[iH].ratio) iH = k; });
        images[1] = reste[iH].img;
      }
      var fond = null;
      try { fond = await chargerImageLocale(FM.fond); }
      catch (eFd) { try { fond = await chargerImageLocale(FM.repli); } catch (eFd2) { return { erreur: "fond introuvable (" + FM.fond + ")" }; } }
      libs.push(fond);
      var cv = document.createElement("canvas"); cv.width = FM.W; cv.height = FM.H;
      var ctx = cv.getContext("2d");
      ctx.fillStyle = "#000000"; ctx.fillRect(0, 0, FM.W, FM.H);
      peindreCadre(ctx, FM.cadres[0], images[0]);
      peindreCadre(ctx, FM.cadres[1], images[1]);
      peindreCadre(ctx, FM.cadres[2], images[2]);
      if (FM.rognage) ctx.drawImage(fond.img, FM.rognage.sx, FM.rognage.sy, FM.rognage.sw, FM.rognage.sh, 0, 0, FM.W, FM.H);
      else ctx.drawImage(fond.img, 0, 0, FM.W, FM.H);
      try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (eFt) { }
      var SERIF = "'Cinzel', 'Cormorant Garamond', Georgia, serif", SANS = "'Montserrat', 'Helvetica Neue', Arial, sans-serif";
      ctx.textBaseline = "alphabetic";
      /* le titre : 2 lignes au plus, la taille descend jusqu a tenir */
      var T0 = FM.textes.titre, titre = String(ev.titre || "").trim(), lignesT = null, tT = 60;
      if (titre && T0) {
        for (tT = 60; tT >= 26; tT -= 2) {
          ctx.font = "600 " + tT + "px " + SERIF;
          var lg = couperLignes(ctx, titre, T0.largeur, 2);
          if (lg && lg.length * tT * 1.15 <= T0.hauteur + (lg.length === 1 ? 12 : 0)) { lignesT = lg; break; }
        }
        if (!lignesT) { ctx.font = "600 26px " + SERIF; tT = 26; lignesT = [ligneAjustee(ctx, titre, T0.largeur, SERIF, "600", 26, 26)]; }
        ctx.fillStyle = "#F4EFE4";
        var hT = lignesT.length * tT * 1.15, y0 = T0.cy - hT / 2 + tT * 0.95;
        lignesT.forEach(function (l, iL) { ctx.fillText(l, T0.x, y0 + iL * tT * 1.15); });
      }
      /* la date et le lieu, a cote des icones du fond */
      ctx.fillStyle = "#EDE6D6";
      var TX = FM.textes;
      if (quand) { var sD = ligneAjustee(ctx, quand, TX.date.largeur, SANS, "500", FM.H < 1500 ? 26 : 28, 18); ctx.fillText(sD, TX.date.x, TX.date.base); }
      var texteLieu = String(ev.lieu || "").trim();
      if (TX.lieu.avecTitre && titre) {
        var nT = function (x) { return String(x || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); };
        texteLieu = (texteLieu && nT(titre).indexOf(nT(texteLieu)) === -1) ? (titre + " \u2014 " + texteLieu) : titre;
      }
      if (texteLieu) { var sL = ligneAjustee(ctx, texteLieu, TX.lieu.largeur, SANS, TX.lieu.avecTitre ? "600" : "500", FM.H < 1500 ? 26 : 28, 16); ctx.fillText(sL, TX.lieu.x, TX.lieu.base); }
      /* les compteurs, dans le cartouche vide ; chaque partie a zero est masquee */
      var nbPh = photos.length, nbVi = (typeof videosEv !== "undefined" && videosEv) ? videosEv.length : 0, nbRe = res.length;
      var parts = [];
      if (nbPh) parts.push(nbPh + (nbPh === 1 ? " PHOTO" : " PHOTOS"));
      if (nbVi) parts.push(nbVi + (nbVi === 1 ? " VID\u00c9O" : " VID\u00c9OS"));
      if (nbRe) parts.push(nbRe + (nbRe === 1 ? " R\u00c9SULTAT" : " R\u00c9SULTATS"));
      if (parts.length) {
        var C0 = TX.compteurs;
        ctx.fillStyle = "#E9D3A2"; ctx.textAlign = "center";
        var une = parts.join(" \u00b7 "), tC = 24;
        ctx.font = "700 " + tC + "px " + SANS;
        while (tC > 17 && ctx.measureText(une).width > C0.largeur) { tC -= 1; ctx.font = "700 " + tC + "px " + SANS; }
        if (ctx.measureText(une).width <= C0.largeur) {
          ctx.fillText(une, C0.cx, C0.cy + tC * 0.36);
        } else {
          var l1 = parts.slice(0, parts.length - 1).join(" \u00b7 "), l2 = parts[parts.length - 1];
          tC = 18; ctx.font = "700 " + tC + "px " + SANS;
          while (tC > 12 && Math.max(ctx.measureText(l1).width, ctx.measureText(l2).width) > C0.largeur) { tC -= 1; ctx.font = "700 " + tC + "px " + SANS; }
          ctx.fillText(l1, C0.cx, C0.cy - tC * 0.25);
          ctx.fillText(l2, C0.cx, C0.cy + tC * 1.0);
        }
        ctx.textAlign = "left";
      }
      var blob = await new Promise(function (ok) { try { cv.toBlob(function (b) { ok(b || null); }, "image/jpeg", 0.92); } catch (eTb) { ok(null); } });
      if (!blob) return { erreur: "image non exportable (Canvas)" };
      var slug = String(ev.titre || "rdv").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "rdv";
      var fichier = null;
      try { fichier = new File([blob], "hype-" + slug + "-" + FM.nom + ".jpg", { type: "image/jpeg" }); } catch (eFi) { fichier = null; }
      return { blob: blob, fichier: fichier, format: FM.nom };
    } finally {
      libs.forEach(function (l) { try { l.liberer(); } catch (eLb) { } });
    }
  }
  async function creerStory(fmt) {
    setChoixPart(false); setStoryMsg(""); setStoryBusy(true); setStoryFmt(fmt === "publication" ? "publication" : "story");
    var r = null;
    try { r = await fabriquerStory(fmt); } catch (eFs) { r = { erreur: String((eFs && eFs.message) || eFs) }; }
    setStoryBusy(false);
    if (!r || !r.blob) { var raison = (r && r.erreur) ? (" (" + r.erreur + ")") : ""; setMsgPartage(T("La story n\u2019a pas pu \u00eatre cr\u00e9\u00e9e" + raison + " : partage classique.", "The story could not be created: classic sharing.", "No se pudo crear la story: env\u00edo cl\u00e1sico.", "Impossibile creare la story: condivisione classica.", "\u30b9\u30c8\u30fc\u30ea\u30fc\u3092\u4f5c\u6210\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002", "Story konnte nicht erstellt werden: normales Teilen.", "\u062a\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0635\u0629" + raison + ": \u0645\u0634\u0627\u0631\u0643\u0629 \u0639\u0627\u062f\u064a\u0629.", "快拍创建失败" + raison + "，已改用普通分享。", "De story kon niet worden gemaakt" + raison + " : gewoon delen.", "Não foi possível criar a story" + raison + " : compartilhamento normal.", ("Storyn kunde inte skapas" + raison + ": vanlig delning."), ("Не удалось создать story" + raison + ": обычный способ поделиться."), ("Nie udało się utworzyć story" + raison + " : zwykłe udostępnianie."), ("스토리를 만들지 못했어요" + raison + ": 일반 공유로 진행해요."))); partagerSouvenir(); return; }
    try { if (storyUrlRef.current) URL.revokeObjectURL(storyUrlRef.current); } catch (eRv2) { }
    var adr = ""; try { adr = URL.createObjectURL(r.blob); } catch (eAd) { adr = ""; }
    storyUrlRef.current = adr; storyFichierRef.current = r.fichier || null;
    setStoryUrl(adr);
  }
  function fermerStory() {
    try { if (storyUrlRef.current) URL.revokeObjectURL(storyUrlRef.current); } catch (eRv3) { }
    storyUrlRef.current = ""; storyFichierRef.current = null; setStoryUrl(""); setStoryMsg("");
  }
  /* 21/09 (338) - DEUX PARTAGES. Sa capture de 22 h 42 : dans la feuille d Instagram, le bouton
     « Story » etait a moitie RECOUVERT par « Envoyer un message » - Instagram ajoute cette option
     quand l image arrive AVEC du texte, et le toucher tombait dessus. « Pour Instagram » envoie
     l IMAGE SEULE (2HYPE.FR est ecrit dedans, « Copier le lien » reste a cote) ; « Pour
     WhatsApp, Messages… » envoie l image AVEC le lien, comme avant. */
  async function partagerStory(avecTexte) {
    var f = storyFichierRef.current, lien = lienStory();
    var texte = "Retrouvez toutes les photos et partagez les v\u00f4tres sur Hype \ud83e\ude75 " + lien;
    if (f && navigator.canShare && navigator.canShare({ files: [f] }) && navigator.share) {
      try {
        if (avecTexte === false) await navigator.share({ files: [f] });
        else await navigator.share({ files: [f], title: String(ev.titre || "Hype"), text: texte });
        return;
      }
      catch (eSh) { if (String(eSh && eSh.name) === "AbortError") return; }
    }
    fermerStory(); partagerSouvenir();
  }
  function copierLienStory() {
    var lien = lienStory();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(lien).then(function () { setStoryMsg(T("Lien copi\u00e9.", "Link copied.", "Enlace copiado.", "Link copiato.", "\u30ea\u30f3\u30af\u3092\u30b3\u30d4\u30fc\u3057\u307e\u3057\u305f\u3002", "Link kopiert.", "\u062a\u0645 \u0646\u0633\u062e \u0627\u0644\u0631\u0627\u0628\u0637.", "链接已复制。", "Link gekopieerd.", "Link copiado.", "Länken har kopierats.", "Ссылка скопирована.", "Link skopiowany.", "링크를 복사했어요.")); }, function () { setStoryMsg(lien); });
      } else setStoryMsg(lien);
    } catch (eCp) { setStoryMsg(lien); }
  }
  async function partagerSouvenir() {
    try {
      var photosS = (typeof photosEv !== "undefined" && photosEv) ? photosEv : [];
      var lignesS = [String(ev.titre || "")];
      if (quand) lignesS.push(quand);
      if (ev.lieu) lignesS.push("\uD83D\uDCCD " + ev.lieu);
      var cpt = [];
      if (photosS.length) cpt.push(photosS.length + " " + (photosS.length === 1 ? T("photo", "photo", "foto", "foto", "\u679a\u306e\u5199\u771f", "Foto", "\u0635\u0648\u0631\u0629", "张照片", "foto", "foto", "foto", "фото", "zdjęcie", "사진") : T("photos", "photos", "fotos", "foto", "\u679a\u306e\u5199\u771f", "Fotos", "\u0635\u0648\u0631", "张照片", "foto's", "fotos", "foton", "фото", "zdjęcia", "사진")));
      if (res.length) cpt.push(res.length + " " + (res.length === 1 ? T("r\u00e9sultat", "result", "resultado", "risultato", "\u4ef6\u306e\u7d50\u679c", "Ergebnis", "\u0646\u062a\u064a\u062c\u0629", "成绩", "resultaat", "resultado", "resultat", "результат", "wynik", "결과") : T("r\u00e9sultats", "results", "resultados", "risultati", "\u4ef6\u306e\u7d50\u679c", "Ergebnisse", "\u0646\u062a\u0627\u0626\u062c", "成绩", "resultaten", "resultados", "resultat", "результатов", "wyniki", "결과")));
      if (cpt.length) lignesS.push(cpt.join(" \u00b7 "));
      var lienS = "";
      lienS = "https://2hype.fr/#souvenir=" + String(ev.id); /* (333) adresse officielle ; (337) famille « souvenir », « s » etant celle des stories */
      if (lienS) lignesS.push(lienS);
      var texteS = lignesS.filter(Boolean).join("\n");
      var srcS = "";
      var couvChoisie = couvLocale || ev.image_url || "";
      if (couvChoisie && photosS.indexOf(couvChoisie) !== -1) srcS = couvChoisie;
      if (!srcS && photosS.length) srcS = photosS[0];
      var fichierS = null;
      if (srcS && typeof fetch === "function" && typeof File === "function") {
        try {
          var rpS = await fetch(srcS);
          var blS = await rpS.blob();
          if (blS && blS.size && blS.size < 9000000) {
            var extS = (blS.type && blS.type.indexOf("png") >= 0) ? "png" : "jpg";
            fichierS = new File([blS], "hype-souvenir-" + String(ev.titre || "rdv").replace(/[^a-z0-9]+/gi, "-").toLowerCase() + "." + extS, { type: blS.type || "image/jpeg" });
          }
        } catch (eFs) { fichierS = null; }
      }
      if (fichierS && navigator.canShare && navigator.canShare({ files: [fichierS] }) && navigator.share) {
        try { await navigator.share({ files: [fichierS], title: ev.titre || "", text: texteS }); return; }
        catch (eSh) { if (String(eSh && eSh.name) === "AbortError") return; }
      }
      if (navigator.share) { navigator.share({ title: ev.titre || "", text: texteS, url: lienS || undefined }).catch(function () { }); return; }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texteS).then(function () {
          setMsgPartage(T("Copi\u00e9 : tu peux le coller o\u00f9 tu veux.", "Copied: paste it anywhere.", "Copiado.", "Copiato.", "\u30b3\u30d4\u30fc\u3057\u307e\u3057\u305f\u3002", "Kopiert.", "\u062a\u0645 \u0627\u0644\u0646\u0633\u062e: \u064a\u0645\u0643\u0646\u0643 \u0644\u0635\u0642\u0647 \u0623\u064a\u0646\u0645\u0627 \u0634\u0626\u062a.", "已复制：你可以粘贴到任何地方。", "Gekopieerd: je kunt het plakken waar je wilt.", "Copiado: você pode colar onde quiser.", "Kopierat: du kan klistra in det var du vill.", "Скопировано: можешь вставить куда угодно.", "Skopiowano: możesz wkleić to, gdzie chcesz.", "복사했어요. 원하는 곳에 붙여넣으세요."));
        }).catch(function () { });
      }
    } catch (ePs) { setMsgPartage(String(ePs)); }
  }
  /* 21/09 (309) - LE MUR DES SOUVENIRS, LES VIDEOS, PUIS LES RESULTATS. Sa demande : « ya juste
     a copier le code de la page mur des souvenirs puis videos puis resultats et a readapter ».
     Le dessin est RECOPIE de la page communautaire d un cheval (EcranChevalCommun : pele-mele
     en deux colonnes equilibrees, angles, scotch, 6 puis « Voir tous les souvenirs », rail des
     videos, carte « En concours ») - avec ses propres classes (hyep-*), pour ne RIEN toucher a
     la page du cheval. Adaptations : pas d auteur « @… » sur les photos (le paquet de la fiche
     ne le porte pas), un toucher ouvre la photo en grand (visionneuse existante), les videos
     s ouvrent aussi en grand, et TOUS les resultats sont montres (c est ici qu on les consulte).
     Aucune requete, aucun SQL. */
  var HYEP_CSS = ".hyep-tit{margin:40px 18px 18px;display:flex;align-items:center;gap:12px;justify-content:center}.hyep-tit i{flex:0 0 34px;height:1px;background:linear-gradient(90deg,transparent,rgba(244,196,85,.75));display:block}.hyep-tit i.r{background:linear-gradient(90deg,rgba(244,196,85,.75),transparent)}.hyep-tit .t{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:19px;letter-spacing:.13em;color:#F4F7FA;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.hyep-tit .cr{color:#F4C455;font-size:14px;margin-left:2px}.hyep-mur{display:flex;gap:8px;padding:8px 10px 0;align-items:flex-start;overflow:hidden}.hyep-murcol{flex:1;min-width:0;display:flex;flex-direction:column}.hyep-ph{position:relative;border-radius:3px;overflow:hidden;background:#111417;box-shadow:0 8px 20px -10px rgba(0,0,0,.8);border:2px solid rgba(238,230,214,.9);cursor:pointer;box-sizing:border-box}.hyep-ph img{width:100%;display:block;object-fit:cover}.hyep-ph .scotch{position:absolute;top:-6px;left:50%;transform:translateX(-50%) rotate(-3deg);width:34px;height:12px;background:rgba(238,230,212,.55);box-shadow:0 1px 2px rgba(0,0,0,.3)}.hyep-voirtout{display:inline-flex;align-items:center;min-height:44px;padding:0 8px;font-family:'Montserrat',sans-serif;font-size:15px;color:#F4F7FA;cursor:pointer}.hyep-rail{display:flex;gap:10px;overflow-x:auto;padding:6px 16px 10px;scroll-snap-type:x proximity;scroll-padding-left:16px;-webkit-overflow-scrolling:touch}.hyep-vid{flex:0 0 52%;scroll-snap-align:start;min-width:0}.hyep-vid .cell{position:relative;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,.1);background:#111417;aspect-ratio:16/10;cursor:pointer}.hyep-chapT{font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:.26em;color:#14E2EF;text-transform:uppercase;font-weight:700;margin:34px 16px 8px}.hyep-chapF{display:flex;align-items:center;gap:10px;margin:0 16px 10px}.hyep-chapF::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(244,196,85,.5),transparent)}.hyep-carte{margin:10px 16px 0;border-radius:16px;border:1px solid rgba(255,255,255,.06);background:rgba(17,20,23,.62);padding:15px}.hyep-carteT{display:flex;align-items:center;gap:9px;font-family:'Cormorant Garamond',Georgia,serif;font-size:16px;letter-spacing:.1em;color:#F4F7FA;margin-bottom:6px;text-transform:uppercase}.hyep-rrow{display:flex;align-items:center;gap:10px;padding:12px 2px;position:relative}.hyep-rrow+.hyep-rrow::before{content:'';position:absolute;top:0;left:38px;right:2px;height:1px;background:rgba(255,255,255,.06)}.hyep-rond{flex:0 0 28px;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-family:'Cinzel',serif;font-size:12.5px;font-weight:700;color:#B9BDC2;border:1px solid rgba(255,255,255,.24)}.hyep-rond.or1{color:#F4C455;border:1.5px solid rgba(244,196,85,.85);background:radial-gradient(70% 70% at 50% 30%,rgba(232,161,64,.16),transparent 75%);box-shadow:0 0 11px -3px rgba(232,161,64,.75)}.hyep-rond.or23{color:#E8C888;border:1px solid rgba(244,196,85,.6)}.hyep-rrow .t{flex:1;min-width:0}.hyep-rrow .e{font-family:'Montserrat',sans-serif;font-size:12px;color:#F5F6F7;font-weight:600;letter-spacing:.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.hyep-rrow .d{font-family:'Montserrat',sans-serif;font-size:10.5px;color:#9FA3A8;margin-top:3px;line-height:1.4;overflow-wrap:anywhere}.hyep-rrow .ch{color:#CFE3E8;font-weight:700}.hyep-rrow .ch.lien{border-bottom:1px solid rgba(95,233,240,0.32);cursor:pointer}.hyep-rrow .cav{color:#F4F7FA;font-weight:700}.hyep-rrow .med{flex:0 0 auto;font-size:16px;line-height:1}";
  function estVidEv(u) { try { return (typeof estUrlVideo === "function") && !!estUrlVideo(u); } catch (eV) { return false; } }
  var medsUniques = [];
  (function () {
    var vusM = {};
    (Array.isArray(meds) ? meds : []).forEach(function (u) {
      if (typeof u !== "string" || !u.trim()) return;
      var k = u.trim().split("#")[0].split("?")[0];
      if (vusM[k]) return; vusM[k] = true; medsUniques.push(u.trim());
    });
  })();
  /* 21/09 (310) : le document « Le jour J » (repere par la carte de l agenda, champ
     `documents` du paquet) n entre pas dans le mur. */
  var clesDocsEv = {};
  ((paq && Array.isArray(paq.documents)) ? paq.documents : []).forEach(function (u) {
    if (typeof u === "string" && u.trim()) clesDocsEv[u.trim().split("#")[0].split("?")[0]] = true;
  });
  var photosEv = medsUniques.filter(function (u) { return !estVidEv(u) && !clesDocsEv[u.split("#")[0].split("?")[0]]; });
  var videosEv = medsUniques.filter(function (u) { return estVidEv(u); });
  function titreEv(txt, coeur) {
    return h("div", { className: "hyep-tit" }, h("i", null), h("span", { className: "t" }, txt, coeur ? h("span", { className: "cr" }, " \u2661") : null), h("i", { className: "r" }));
  }
  var FORMES_EV = ["f-p", "f-l", "f-c", "f-l", "f-p", "f-c", "f-l", "f-p", "f-c", "f-p", "f-l", "f-c", "f-p", "f-l"];
  var ANGLES_EV = [-2.4, 1.8, -1.2, 2.6, -1.8, 1.2, -2.8, 2.2, -1.4, 1.6, -2.2, 2.8, -1.6, 1.4];
  /* 21/09 (310) - AUCUNE TETE COUPEE. Sa demande : « s assurer qu aucune tete ne soit coupee
     dans les photos ». Chaque photo garde SA forme (hauteur automatique, aucun object-fit
     impose) : rien n est rogne, par construction. Sa proportion est notee au chargement pour
     equilibrer les colonnes. */
  function imgMur(u) {
    return h("img", { src: (typeof grandeImageHype === "function") ? grandeImageHype(u, 800) : u, alt: "", loading: "lazy", decoding: "async",
      onLoad: function (eL) {
        try {
          var im = eL.target, w = im.naturalWidth || 0, hh = im.naturalHeight || 0;
          if (w > 0 && hh > 0) {
            var rr = Math.round((hh / w) * 100) / 100;
            setRatiosMur(function (m) { if (m[u] === rr) return m; var n = Object.assign({}, m); n[u] = rr; return n; });
          }
        } catch (eRl) { }
      },
      onError: function (eI) { try { if (typeof replierVignette === "function") replierVignette(eI, u); } catch (eR) { } },
      style: { width: "100%", height: "auto", display: "block" } });
  }

  return h("div", { style: { minHeight: "100vh", background: "#060709", color: "#EDF2F5", paddingBottom: 120 } },
    /* Le bandeau : l affiche du rendez-vous si elle existe, sinon sa premiere photo. */
    /* 18/09 (229) : HERO plus compact (210 -> 176) et degrade qui finit franchement en noir,
       pour que les resultats montent dans l ecran. Le texte reste du VRAI TEXTE, jamais dans
       l image. ⚠️ IL Y A DEUX HEROS IDENTIQUES DANS LE FICHIER : l autre appartient a
       EcranEvenement (grands evenements nationaux). Seul celui-ci est touche. */
    h("div", { style: { position: "relative", minHeight: 176, overflow: "hidden" } },
      couv ? h("img", { src: (typeof grandeImageHype === "function") ? grandeImageHype(couv, 1400) : couv, alt: "", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" } }) : null,
      h("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,7,9,0.62) 0%, rgba(6,7,9,0.26) 34%, rgba(6,7,9,0.88) 76%, #060709 100%)" } }),
      h("button", { onClick: retour, "aria-label": T("Retour", "Back", "Volver", "Indietro", "\u623b\u308b", "Zur\u00fcck", "\u0631\u062c\u0648\u0639", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wróć", "뒤로"), style: { position: "absolute", top: "calc(env(safe-area-inset-top) + 14px)", left: 14, width: 38, height: 38, borderRadius: "50%", background: "rgba(6,7,9,0.55)", border: "1px solid rgba(255,255,255,0.14)", color: "#EDF2F5", fontSize: 17, cursor: "pointer", zIndex: 3 } }, "\u2039"),
      /* 21/09 (313) : partager le souvenir. */
      h("button", { onClick: function () { if (String(ev.type || "").toLowerCase() === "concours" && photosEv && photosEv.length) setChoixPart(true); else partagerSouvenir(); }, "aria-label": T("Partager", "Share", "Compartir", "Condividi", "\u5171\u6709", "Teilen", "\u0645\u0634\u0627\u0631\u0643\u0629", "分享", "Delen", "Compartilhar", "Dela", "Поделиться", "Udostępnij", "공유하기"),
        style: { position: "absolute", top: "calc(env(safe-area-inset-top) + 14px)", right: 14, zIndex: 3, width: 38, height: 38, borderRadius: "50%", background: "rgba(6,7,9,0.55)", border: "1px solid rgba(255,255,255,0.22)", color: "#EDF2F5", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, cursor: "pointer" } },
        h("svg", { viewBox: "0 0 24 24", width: 18, height: 18, "aria-hidden": true },
          h("path", { d: "M12 3 v12 M7.5 7.5 L12 3 L16.5 7.5 M5 12 v7 a2 2 0 0 0 2 2 h10 a2 2 0 0 0 2 -2 v-7", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" }))),
      h("div", { style: { position: "relative", zIndex: 2, padding: "calc(env(safe-area-inset-top) + 68px) 18px 14px" } },
        h("div", { style: { fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: OR, fontWeight: 700, marginBottom: 7, fontFamily: M, textShadow: "0 1px 8px rgba(0,0,0,0.9)" } }, libType),
        h("div", { style: { fontFamily: C, fontSize: 24, fontWeight: 600, color: "#F4F7FA", lineHeight: 1.18, textShadow: "0 2px 14px rgba(0,0,0,0.95)" } }, ev.titre || ""),
        ev.lieu ? h("div", { style: { margin: "7px 0 0", fontSize: 12.5, color: "rgba(244,247,250,0.85)", fontFamily: M, textShadow: "0 1px 10px rgba(0,0,0,0.95)" } }, "\ud83d\udccd " + ev.lieu) : null,
        quand ? h("div", { style: { fontFamily: M, fontSize: 11.5, color: "rgba(244,247,250,0.62)", marginTop: 6 } }, quand + (ev.heure ? (" \u00b7 " + ev.heure) : "")) : null)),


    /* 20/09 (276) : LA MEME LIGNE FINE D HORAIRES que sur la fiche a venir, pour que les deux
       pages se ressemblent. Une heure vide n apparait pas ; sans aucune heure, rien ne
       s affiche. Aucune donnee touchee. */
    (ev.heure_embarquement || ev.heure_depart || ev.heure_reco || ev.heure_epreuve) ? h("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "14px 18px 0" } },
      h("span", { style: { flex: 1, height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, " + OR + "55 100%)" } }),
      h("div", { style: { fontFamily: M, fontSize: 12, color: "rgba(244,247,250,0.8)", textAlign: "center", whiteSpace: "nowrap" } },
        [
          { v: ev.heure_embarquement, k: T("Embarquement", "Loading", "Embarque", "Carico", "\u7a4d\u8f09", "Verladen", "\u0627\u0644\u062a\u062d\u0645\u064a\u0644", "登程", "Inladen", "Embarque", "Lastning", "Посадка", "Pierwsze kroki", "탑승") },
          { v: ev.heure_depart, k: T("D\u00e9part", "Departure", "Salida", "Partenza", "\u51fa\u767a", "Abfahrt", "\u0627\u0644\u0627\u0646\u0637\u0644\u0627\u0642", "出发", "Start", "Largada", "Start", "Старт", "Start", "출발") },
          { v: ev.heure_reco, k: T("Reco", "Walk", "Recon.", "Ricogn.", "\u4e0b\u898b", "Besicht.", "\u0645\u0639\u0627\u064a\u0646\u0629", "看场", "Verkennen", "Reco", "Banan", "Осмотр", "Parkur", "답사") },
          { v: ev.heure_epreuve, k: T("\u00c9preuve", "Class", "Prueba", "Prova", "\u7af6\u6280", "Pr\u00fcfung", "\u0627\u0644\u0645\u0633\u0627\u0628\u0642\u0629", "比赛项目", "Proef", "Prova", "Klass", "Маршрут", "Konkurencja", "경기") }
        ].filter(function (o) { return String(o.v || "").trim(); }).map(function (o) { return o.k + " " + String(o.v).trim(); }).join("   \u2022   ")),
      h("span", { style: { flex: 1, height: 1, background: "linear-gradient(90deg, " + OR + "55 0%, rgba(255,255,255,0) 100%)" } })) : null,

    ev.description ? h("div", { style: { padding: "16px 18px 0", fontFamily: M, fontSize: 13, color: "rgba(220,227,232,0.78)", lineHeight: 1.6, whiteSpace: "pre-wrap" } }, ev.description) : null,

    /* 18/09 (229) - LES RESULTATS, REFAITS. Sa maquette et son brief : epreuve en petites
       capitales or, CHEVAL en turquoise (l information la plus visible), cavalier en gris,
       classement a droite. Fond noir continu, filets tres fins, petit point or a gauche pour
       l esprit chronologique. AUCUNE carte encadree.
       ⚠️ LA LIMITE DE 20 EST RETIREE : ses mots, « c est ici qu on consulte les resultats »,
       donc tous s affichent. La donnee est deja chargee par l agenda : aucun cout.
       ⚠️ PAS DE VIGNETTE PAR RESULTAT malgre la maquette : AUCUNE relation photo <-> resultat
       n existe dans les donnees, et son brief interdit d en inventer une.
       ⚠️ PAS DE « SANS-FAUTE » malgre la maquette : aucune colonne ne le porte, et son brief
       l interdit explicitement (« ne jamais inventer ou deduire un sans-faute »).
       ⚠️ LE NOMBRE DE PARTANTS N EST JAMAIS L INFORMATION PRINCIPALE, et il est MASQUE quand
       il vaut 1 (on n ecrit rien du tout, pas « 1 partant non affiche ») et pour une
       PREPARATOIRE. */
    /* 18/09 (236) : LE MEME FILET QUE LES DEUX AUTRES SECTIONS. Une seule des trois en
       portait un, d ou une cesure isolee au milieu de la page. Les trois titres s introduisent
       desormais pareil : filet de 1 px a 5,5 %, puis le titre en Cinzel. */
    h("style", { dangerouslySetInnerHTML: { __html: HYEP_CSS } }),
    msgPartage ? h("div", { style: { margin: "12px 18px 0", fontFamily: M, fontSize: 11.5, color: "#8A99A1" } }, msgPartage) : null,
    /* 21/09 (333) : le panneau de choix du partage. */
    choixPart ? hypePortailBody(h("div", { "data-noswipe": "1", onClick: function (eO) { if (eO && eO.target === eO.currentTarget) setChoixPart(false); },
        style: { position: "fixed", inset: 0, zIndex: 9990, background: "rgba(4,5,7,0.62)", display: "flex", alignItems: "flex-end", justifyContent: "center" } },
      h("div", { style: { width: "100%", maxWidth: 520, boxSizing: "border-box", background: "#12161C", borderTop: "1px solid rgba(255,255,255,0.12)", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: "16px 16px calc(env(safe-area-inset-bottom) + 18px)" } },
        [["story", T("Cr\u00e9er la story", "Create the story", "Crear la story", "Crea la story", "\u30b9\u30c8\u30fc\u30ea\u30fc\u3092\u4f5c\u6210", "Story erstellen", "\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0635\u0629", "创建快拍", "De story maken", "Criar a story", "Skapa storyn", "Создать story", "Utwórz story", "스토리 만들기"), function () { creerStory("story"); }, true],
         ["publication", T("Cr\u00e9er la publication (format Instagram)", "Create the post (Instagram format)", "Crear la publicaci\u00f3n (formato Instagram)", "Crea il post (formato Instagram)", "\u6295\u7a3f\u753b\u50cf\u3092\u4f5c\u6210\uff08Instagram\uff09", "Beitrag erstellen (Instagram-Format)", "\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0646\u0634\u0648\u0631 (\u0628\u062d\u062c\u0645 Instagram)", "创建动态（Instagram 格式）", "De post maken (Instagram-formaat)", "Criar a publicação (formato Instagram)", "Skapa inlägget (Instagram-format)", "Создать публикацию (формат Instagram)", "Utwórz post (format Instagram)", "게시물 만들기 (Instagram 형식)"), function () { creerStory("publication"); }, true],
         ["classique", T("Partage classique", "Classic sharing", "Envío clásico", "Condivisione classica", "通常の共有", "Normales Teilen", "\u0645\u0634\u0627\u0631\u0643\u0629 \u0639\u0627\u062f\u064a\u0629", "普通分享", "Klassiek delen", "Compartilhamento clássico", "Vanlig delning", "Обычный способ поделиться", "Zwykłe udostępnianie", "일반 공유"), function () { setChoixPart(false); partagerSouvenir(); }, false],
         ["annuler", T("Annuler", "Cancel", "Cancelar", "Annulla", "キャンセル", "Abbrechen", "\u0625\u0644\u063a\u0627\u0621", "取消", "Annuleren", "Cancelar", "Avbryt", "Отмена", "Anuluj", "취소"), function () { setChoixPart(false); }, false]].map(function (b) {
          return h("button", { key: b[0], onClick: b[2], style: { display: "block", width: "100%", minHeight: 48, marginTop: 8, borderRadius: 14, border: b[3] ? "none" : "1px solid rgba(255,255,255,0.16)", background: b[3] ? "#7FA3AD" : "transparent", color: b[3] ? "#04252A" : "#EDF2F5", fontFamily: M, fontSize: 14, fontWeight: 700, cursor: "pointer" } }, b[1]);
        })))) : null,
    storyBusy ? hypePortailBody(h("div", { "data-noswipe": "1", style: { position: "fixed", inset: 0, zIndex: 9991, background: "rgba(4,5,7,0.8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#EDF2F5", fontFamily: M, fontSize: 13 } },
      T("Création de la story…", "Creating the story…", "Creando la story…", "Creazione della story…", "ストーリーを作成中…", "Story wird erstellt…", "\u062c\u0627\u0631 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0642\u0635\u0629\u2026", "正在创建快拍…", "Story aanmaken…", "Criando a story…", "Skapar storyn…", "Создаём story…", "Tworzenie story…", "스토리 만드는 중…"))) : null,
    /* 21/09 (333) : l apercu de la story (9:16, tient dans l ecran, fond noir). */
    storyUrl ? hypePortailBody(h("div", { "data-noswipe": "1", "data-hscroll": "1",
        style: { position: "fixed", inset: 0, zIndex: 9992, background: "#000", display: "flex", flexDirection: "column", alignItems: "center", boxSizing: "border-box", padding: "calc(env(safe-area-inset-top) + 12px) 14px calc(env(safe-area-inset-bottom) + 14px)", overflow: "hidden" } },
      h("div", { style: { flex: "1 1 auto", minHeight: 0, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" } },
        h("img", { src: storyUrl, alt: "", style: { maxWidth: "100%", maxHeight: "100%", aspectRatio: storyFmt === "publication" ? "4 / 5" : "9 / 16", objectFit: "contain", borderRadius: 12, display: "block" } })),
      storyMsg ? h("div", { style: { flex: "0 0 auto", marginTop: 8, fontFamily: M, fontSize: 11.5, color: "#8A99A1", textAlign: "center", overflowWrap: "anywhere" } }, storyMsg) : null,
      h("div", { style: { flex: "0 0 auto", width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", gap: 8, marginTop: 10 } },
        h("button", { onClick: function () { partagerStory(false); }, style: { minHeight: 48, borderRadius: 14, border: "none", background: "#7FA3AD", color: "#04252A", fontFamily: M, fontSize: 14, fontWeight: 700, cursor: "pointer" } }, T("Pour Instagram (image seule)", "For Instagram (image only)", "Para Instagram (solo imagen)", "Per Instagram (solo immagine)", "Instagram\u7528\uff08\u753b\u50cf\u306e\u307f\uff09", "F\u00fcr Instagram (nur Bild)", "\u0644\u0640 Instagram (\u0635\u0648\u0631\u0629 \u0641\u0642\u0637)", "发到 Instagram（仅图片）", "Voor Instagram (alleen afbeelding)", "Para o Instagram (só a imagem)", "För Instagram (bara bilden)", "Для Instagram (только изображение)", "Na Instagram (tylko obraz)", "Instagram용 (이미지만)")),
        h("button", { onClick: function () { partagerStory(true); }, style: { minHeight: 46, borderRadius: 14, border: "1px solid rgba(127,163,173,0.55)", background: "transparent", color: "#7FA3AD", fontFamily: M, fontSize: 13.5, fontWeight: 700, cursor: "pointer" } }, T("Pour WhatsApp, Messages\u2026 (avec le lien)", "For WhatsApp, Messages\u2026 (with the link)", "Para WhatsApp, Mensajes\u2026 (con enlace)", "Per WhatsApp, Messaggi\u2026 (con link)", "WhatsApp\u30fb\u30e1\u30c3\u30bb\u30fc\u30b8\u7528\uff08\u30ea\u30f3\u30af\u4ed8\u304d\uff09", "F\u00fcr WhatsApp, Nachrichten\u2026 (mit Link)", "\u0644\u0640 WhatsApp \u0648\u0627\u0644\u0631\u0633\u0627\u0626\u0644\u2026 (\u0645\u0639 \u0627\u0644\u0631\u0627\u0628\u0637)", "发到 WhatsApp、信息等（附链接）", "Voor WhatsApp, Berichten… (met de link)", "Para WhatsApp, Mensagens… (com o link)", "För WhatsApp, Meddelanden… (med länken)", "Для WhatsApp, Сообщений… (со ссылкой)", "Na WhatsApp, do Wiadomości… (z linkiem)", "WhatsApp, 메시지 등 (링크 포함)")),
        h("div", { style: { display: "flex", gap: 8 } },
          h("button", { onClick: copierLienStory, style: { flex: 1, minHeight: 46, borderRadius: 14, border: "1px solid rgba(255,255,255,0.18)", background: "transparent", color: "#EDF2F5", fontFamily: M, fontSize: 13, fontWeight: 600, cursor: "pointer" } }, T("Copier le lien", "Copy link", "Copiar enlace", "Copia link", "リンクをコピー", "Link kopieren", "\u0646\u0633\u062e \u0627\u0644\u0631\u0627\u0628\u0637", "复制链接", "Link kopiëren", "Copiar o link", "Kopiera länken", "Скопировать ссылку", "Kopiuj link", "링크 복사")),
          h("button", { onClick: fermerStory, style: { flex: 1, minHeight: 46, borderRadius: 14, border: "1px solid rgba(255,255,255,0.18)", background: "transparent", color: "#EDF2F5", fontFamily: M, fontSize: 13, fontWeight: 600, cursor: "pointer" } }, T("Fermer", "Close", "Cerrar", "Chiudi", "閉じる", "Schließen", "\u0625\u063a\u0644\u0627\u0642", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기")))))) : null,

    /* — LE MUR DES SOUVENIRS (recopie de la page du cheval) — */
    photosEv.length ? titreEv(T("Le mur des souvenirs", "The memory wall", "El muro de recuerdos", "Il muro dei ricordi", "\u601d\u3044\u51fa\u306e\u58c1", "Die Erinnerungswand", "\u062c\u062f\u0627\u0631 \u0627\u0644\u0630\u0643\u0631\u064a\u0627\u062a", "回忆墙", "Het herinneringenprikbord", "O mural das lembranças", "Minnesväggen", "Стена воспоминаний", "Ściana wspomnień", "추억의 벽"), true) : null,
    (photosEv.length > 0 && photosEv.length < 3) ? h("div", { style: { padding: "8px 44px 0" } },
      photosEv.map(function (u, i) {
        return h("div", { key: "p" + i, className: "hyep-ph", role: "button", onClick: function () { setVisu(u); },
          style: { transform: "rotate(" + ANGLES_EV[i % ANGLES_EV.length] + "deg)", marginBottom: 8 } },
          imgMur(u),
          h("div", { className: "scotch" }));
      })) :
    (photosEv.length > 0) ? (function () {
      /* deux colonnes equilibrees a la HAUTEUR ; le dernier cliche de la colonne courte
         s etire pour finir a fleur (meme calcul que la page du cheval). */
      /* 21/09 (310) : les colonnes s equilibrent sur la VRAIE proportion de chaque photo (1 tant
         qu elle n est pas chargee). Plus d etirement du dernier cliche : il recadrait. */
      var LOTS = voirToutMurEv ? photosEv : photosEv.slice(0, 6);
      var cols = [[], []], haut = [0, 0];
      LOTS.forEach(function (u, i) {
        var r = (ratiosMur && ratiosMur[u]) || 1;
        var cI = haut[0] <= haut[1] ? 0 : 1;
        cols[cI].push({ u: u, i: i, r: r });
        haut[cI] += r + 0.02;
      });
      return h("div", { className: "hyep-mur" }, cols.map(function (col, ci) {
        return h("div", { key: "col" + ci, className: "hyep-murcol" }, col.map(function (x, k) {
          var i = x.i;
          return h("div", { key: "p" + i, className: "hyep-ph", role: "button", onClick: function () { setVisu(x.u); },
            style: { transform: "rotate(" + ANGLES_EV[i % ANGLES_EV.length] + "deg) translateX(" + (k % 2 ? (2.5 + (i % 2)) : -(2.5 + (i % 3))) + "%)", width: (i % 5 === 2 ? "104%" : "100%"), marginLeft: (i % 5 === 2 ? "-2%" : 0), marginTop: (k ? -(4 + (i % 3) * 2) : 0) + "px", zIndex: 1 + ((i * 2 + k) % 4) } },
            imgMur(x.u),
            i % 3 === 0 ? h("div", { className: "scotch" }) : null);
        }));
      }));
    })() : null,
    (photosEv.length > 6) ? h("div", { style: { textAlign: "center", marginTop: 10 } },
      h("span", { className: "hyep-voirtout", role: "button", onClick: function () { setVoirToutMurEv(!voirToutMurEv); } },
        voirToutMurEv
          ? T("Replier les souvenirs \u2191", "Fold the memories \u2191", "Plegar los recuerdos \u2191", "Richiudi i ricordi \u2191", "\u305f\u305f\u3080 \u2191", "Erinnerungen einklappen \u2191", "\u0637\u064a \u0627\u0644\u0630\u0643\u0631\u064a\u0627\u062a \u2191", "收起回忆 ↑", "Herinneringen inklappen ↑", "Recolher as lembranças ↑", "Fäll ihop minnena ↑", "Свернуть воспоминания ↑", "Zwiń wspomnienia ↑", "추억 접기 ↑")
          : T("Voir tous les souvenirs \u2192", "See all the memories \u2192", "Ver todos los recuerdos \u2192", "Vedi tutti i ricordi \u2192", "\u3059\u3079\u3066\u306e\u601d\u3044\u51fa\u3092\u898b\u308b \u2192", "Alle Erinnerungen ansehen \u2192", "\u0639\u0631\u0636 \u0643\u0644 \u0627\u0644\u0630\u0643\u0631\u064a\u0627\u062a \u2192", "查看全部回忆 →", "Bekijk alle herinneringen →", "Ver todas as lembranças →", "Se alla minnen →", "Смотреть все воспоминания →", "Zobacz wszystkie wspomnienia →", "추억 모두 보기 →"))) : null,
    /* La couverture : un petit lien sous le mur, pour la gestionnaire du club seulement ; il
       affiche la grille d avant avec ses boutons « Couverture ? ». */
    (peutSupprimerRdv && photosEv.length) ? h("div", { style: { textAlign: "center", marginTop: 4 } },
      h("span", { role: "button", onClick: function () { setModeCouv(!modeCouv); },
        style: { display: "inline-flex", alignItems: "center", minHeight: 40, padding: "0 10px", fontFamily: M, fontSize: 11.5, color: "#8A99A1", textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer" } },
        modeCouv
          ? T("Fermer le choix de la couverture", "Close cover choice", "Cerrar la elecci\u00f3n de portada", "Chiudi la scelta della copertina", "\u8868\u7d19\u306e\u9078\u629e\u3092\u9589\u3058\u308b", "Titelbild-Auswahl schlie\u00dfen", "\u0625\u063a\u0644\u0627\u0642 \u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u063a\u0644\u0627\u0641", "关闭封面选择", "Keuze van de omslag sluiten", "Fechar a escolha da capa", "Stäng val av omslag", "Закрыть выбор обложки", "Zamknij wybór okładki", "커버 선택 닫기")
          : T("Choisir la couverture", "Choose the cover", "Elegir la portada", "Scegli la copertina", "\u8868\u7d19\u3092\u9078\u3076", "Titelbild w\u00e4hlen", "\u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u063a\u0644\u0627\u0641", "选择封面", "De omslag kiezen", "Escolher a capa", "Välj omslag", "Выбрать обложку", "Wybierz okładkę", "커버 선택"))) : null,
    (peutSupprimerRdv && modeCouv && photosEv.length) ? h("div", { style: { padding: "12px 16px 0" } },
      h("div", { style: { display: "flex", alignItems: "baseline", gap: 10, margin: "0 2px 11px", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.055)" } },
        h("div", { style: { flex: 1, minWidth: 0, fontFamily: C, fontSize: 16, fontWeight: 600, letterSpacing: 1.2, color: "#F4F7FA" } },
          T("Choisir la couverture", "Choose the cover", "Elegir la portada", "Scegli la copertina", "\u8868\u7d19\u3092\u9078\u3076", "Titelbild w\u00e4hlen", "\u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u063a\u0644\u0627\u0641", "选择封面", "De omslag kiezen", "Escolher a capa", "Välj omslag", "Выбрать обложку", "Wybierz okładkę", "커버 선택")),
        h("div", { style: { flex: "0 0 auto", fontFamily: M, fontSize: 9.5, letterSpacing: 1.4, textTransform: "uppercase", color: "#8A929C", fontWeight: 700 } },
          photosEv.length + " " + (photosEv.length === 1
            ? T("m\u00e9dia", "media", "archivo", "media", "\u4ef6", "Medium", "\u0648\u0633\u064a\u0637", "媒体", "mediabestand", "mídia", "media", "медиафайл", "plik multimedialny", "미디어")
            : T("m\u00e9dias", "media", "archivos", "media", "\u4ef6", "Medien", "\u0648\u0633\u0627\u0626\u0637", "媒体", "mediabestanden", "mídias", "media", "медиафайлов", "pliki multimedialne", "미디어")))),
      h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 } },
        photosEv.map(function (u, iU) {
          var vid = (typeof estUrlVideo === "function") && estUrlVideo(u);
          return h("div", { key: "m" + iU, role: "button", onClick: function () { setVisu(u); },
            style: { position: "relative", borderRadius: 12, overflow: "hidden", background: "#0B1116", cursor: "pointer", aspectRatio: "1 / 1", minHeight: 150, display: "flex", alignItems: "center", justifyContent: "center" } },
            vid
              ? ((typeof hypeMiniatureVideo === "function") ? hypeMiniatureVideo(u, { largeur: 640, picto: 22 }) : null)
              : h("img", { src: (typeof grandeImageHype === "function") ? grandeImageHype(u, 900) : u, alt: "", loading: "lazy", decoding: "async",
                  onError: function (eI) { try { if (typeof replierVignette === "function") replierVignette(eI, u); } catch (eR) { } },
                  style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }),
            /* 18/09 (231) : le choix de la couverture, en bas a droite de la tuile. Seulement
               pour le gestionnaire du club, et JAMAIS sur une video (la couverture est une
               image). Le toucher ne doit pas ouvrir la visionneuse : stopPropagation. */
            (peutSupprimerRdv && !vid) ? h("div", { role: "button",
              onClick: function (eCv) { try { if (eCv) { eCv.stopPropagation(); eCv.preventDefault(); } } catch (eSp) { } choisirCouverture(u); },
              "aria-label": T("Mettre en couverture", "Set as cover", "Poner de portada", "Metti in copertina", "\u8868\u7d19\u306b\u3059\u308b", "Als Titelbild", "\u062c\u0639\u0644\u0647\u0627 \u063a\u0644\u0627\u0641\u0627", "设为封面", "Als omslag instellen", "Definir como capa", "Använd som omslag", "Сделать обложкой", "Ustaw jako okładkę", "커버로 설정"),
              style: { position: "absolute", right: 7, bottom: 7, minHeight: 30, padding: "0 10px", display: "flex", alignItems: "center", gap: 5, borderRadius: 999, border: "1px solid " + (String(couv) === String(u) ? "rgba(217,199,163,0.85)" : "rgba(255,255,255,0.28)"), background: String(couv) === String(u) ? "rgba(217,199,163,0.9)" : "rgba(6,7,9,0.62)", color: String(couv) === String(u) ? "#1A1206" : "#EDF2F5", fontFamily: M, fontSize: 10, fontWeight: 700, cursor: "pointer" } },
              couvBusy === u ? "\u2026" : (String(couv) === String(u)
                ? T("Couverture", "Cover", "Portada", "Copertina", "\u8868\u7d19", "Titelbild", "\u0627\u0644\u063a\u0644\u0627\u0641", "封面", "Omslag", "Capa", "Omslag", "Обложка", "Okładka", "커버")
                : T("Couverture\u00a0?", "Cover?", "\u00bfPortada?", "Copertina?", "\u8868\u7d19\uff1f", "Titelbild?", "\u063a\u0644\u0627\u0641\u061f", "封面？", "Omslag?", "Capa?", "Omslag?", "Обложка?", "Okładka?", "커버로 할까요?"))) : null);
        })),
      couvErr ? h("div", { style: { margin: "9px 2px 0", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,107,107,0.35)", background: "rgba(255,107,107,0.07)", color: "#FF9B9B", fontFamily: M, fontSize: 11.5, lineHeight: 1.5 } }, couvErr) : null) : null,

    /* — LES VIDEOS (le rail de la page du cheval) — */
    videosEv.length ? titreEv(T("Les vid\u00e9os", "The videos", "Los v\u00eddeos", "I video", "\u52d5\u753b", "Die Videos", "\u0627\u0644\u0641\u064a\u062f\u064a\u0648\u0647\u0627\u062a", "视频", "De video's", "Os vídeos", "Videorna", "Видео", "Filmy", "영상") + " (" + videosEv.length + ")") : null,
    videosEv.length ? h("div", { className: "hyep-rail", "data-hscroll": "1" },
      videosEv.map(function (u, iV) {
        return h("div", { key: "v" + iV, className: "hyep-vid" },
          h("div", { className: "cell", role: "button", onClick: function () { setVisu(u); } },
            (typeof hypeMiniatureVideo === "function") ? hypeMiniatureVideo(u, { largeur: 640, picto: 20 }) : null));
      })) : null,

    /* — LES RESULTATS, dans la carte « En concours » de la page du cheval. TOUS sont montres.
       Memes regles qu avant : partants masques s ils valent 1 ou pour une preparatoire, la
       recompense par hypeRecompense, le nom du cheval ramene a sa fiche (cheval_id seulement),
       le cavalier n est qu un nom (aucun lien). Rien en base ne relie un resultat au
       rendez-vous : c est la DATE qui le place ici. — */
    res.length ? h("div", { className: "hyep-chapT" }, T("R\u00e9sultats", "Results", "Resultados", "Risultati", "\u7d50\u679c", "Ergebnisse", "\u0627\u0644\u0646\u062a\u0627\u0626\u062c", "成绩", "Resultaten", "Resultados", "Resultat", "Результаты", "Wyniki", "결과")) : null,
    res.length ? h("div", { className: "hyep-chapF" }) : null,
    res.length ? h("div", { className: "hyep-carte" },
      h("div", { className: "hyep-carteT" },
        h("svg", { viewBox: "0 0 24 24", width: 16, height: 16, "aria-hidden": true },
          h("path", { d: "M6 3 h12 v3 a6 6 0 0 1 -12 0 Z M6 4 H3 a4 4 0 0 0 4 5 M18 4 h3 a4 4 0 0 1 -4 5 M12 12 v4 M8 20 h8 M9 16 h6 v4 h-6 Z", fill: "none", stroke: "#F4C455", strokeWidth: 1.5, strokeLinejoin: "round" })),
        T("R\u00e9sultats du concours", "Competition results", "Resultados", "Risultati", "\u7d50\u679c", "Ergebnisse", "\u0646\u062a\u0627\u0626\u062c \u0627\u0644\u0645\u0633\u0627\u0628\u0642\u0629", "比赛成绩", "Wedstrijdresultaten", "Resultados da competição", "Tävlingsresultat", "Результаты соревнований", "Wyniki zawodów", "대회 결과")),
      res.map(function (li, iR) {
        var lib = String(li.epreuve || li.concours || "").trim();
        var prepa = /pr[e\u00e9]paratoire/i.test(lib);
        var np = Number(li.partants || 0);
        var pl = Number(li.place || 0);
        var rangTx = pl ? (String(pl) + (pl === 1 ? T("er", "st", "\u00ba", "\u00ba", "\u4f4d", ".", "\u200f", "名", "e", "º", ":a", "-е", ".", "위") : T("e", "th", "\u00ba", "\u00ba", "\u4f4d", ".", "\u200f", "th", "th", "th", "th", "th", "th", "th"))) : "";
        var classement = rangTx ? (rangTx + ((np > 1 && !prepa) ? (" " + T("sur ", "of ", "de ", "su ", "\uff0f", "von ", "\u0645\u0646 ", " / ", "van ", "de ", "av ", "из ", "z ", "/ ") + np) : "")) : "";
        var rc = (typeof hypeRecompense === "function") ? hypeRecompense(pl, np) : "";
        var morceaux = [];
        if (li.cheval_nom) morceaux.push(h("span", { key: "ch", className: "ch" + (li.cheval_id ? " lien" : ""), role: li.cheval_id ? "button" : null,
          onClick: li.cheval_id ? function (eCh) {
            try { if (eCh) { eCh.stopPropagation(); eCh.preventDefault(); } } catch (eSc) { }
            try { window.__chevalOuvert = li.cheval_id; } catch (eOc) { }
            setEcran("cheval");
          } : null }, li.cheval_nom));
        if (classement) morceaux.push(h("span", { key: "cl" }, classement));
        if (li.cavalier) morceaux.push(h("span", { key: "cv", className: "cav" }, li.cavalier));
        return h("div", { key: "r" + iR, className: "hyep-rrow" },
          h("div", { className: "hyep-rond " + (pl === 1 ? "or1" : (pl > 1 && pl <= 3) ? "or23" : "") }, pl ? String(pl) : "\u2014"),
          h("div", { className: "t" },
            h("div", { className: "e" }, lib || T("\u00c9preuve", "Class", "Prueba", "Prova", "\u7af6\u6280", "Pr\u00fcfung", "\u0627\u0644\u0645\u0633\u0627\u0628\u0642\u0629", "比赛项目", "Proef", "Prova", "Klass", "Маршрут", "Konkurencja", "경기")),
            morceaux.length ? h("div", { className: "d" }, morceaux.map(function (m, iM) { return h(React.Fragment, { key: "m" + iM }, iM ? " \u2022 " : null, m); })) : null),
          rc ? h("div", { className: "med" }, rc) : null);
      })) : null,

    /* Le fil du rendez-vous : commentaires et publication, comme dans la carte. */
    h("div", { style: { padding: "26px 0 0" } },
      /* 18/09 (234) - « PUBLICATIONS & COMMENTAIRES ». Sa maquette prevoyait DEUX sections ;
         le releve a montre qu elles n existent pas separement dans le code : UN SEUL appel a
         MurHype affiche a la fois les publications rattachees au rendez-vous
         (chargerEnPlus -> hypePostsAgenda) et les messages postes sur son mur
         (listerCommentaires("agenda:<id>")). `fusionnerPosts` les concatene, dedoublonne par
         identifiant et trie par date : AUCUNE marque d origine n est conservee.
         ⚠️ LA DONNEE, ELLE, PERMETTRAIT DE LES DISTINGUER : les deux viennent de la table
         `commentaires` et chaque ligne porte sa colonne `cible` (« agenda:<id> » pour un
         message du mur, sa cible d origine pour une publication rattachee). Mais le tri se
         ferait AU RENDU, donc dans le composant PARTAGE par huit ecrans : il faudrait une
         nouvelle option ou un second appel - les deux interdits par son brief. Le jour ou
         elle voudra vraiment deux sections, ce sera un chantier sur le composant, pas un
         reglage. Ici on nomme honnetement ce qui est affiche.
         Meme titre que RESULTATS et PHOTOS & VIDEOS, plus un filet tres fin pour la
         transition depuis la galerie. Le composant dessous n est pas touche. */
      h("div", { style: { margin: "0 18px 11px", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.055)" } },
        h("div", { style: { fontFamily: C, fontSize: 16, fontWeight: 600, letterSpacing: 1.2, color: "#F4F7FA" } },
          T("Publications & commentaires", "Posts & comments", "Publicaciones y comentarios", "Pubblicazioni e commenti", "\u6295\u7a3f\u3068\u30b3\u30e1\u30f3\u30c8", "Beitr\u00e4ge & Kommentare", "\u0627\u0644\u0645\u0646\u0634\u0648\u0631\u0627\u062a \u0648\u0627\u0644\u062a\u0639\u0644\u064a\u0642\u0627\u062a", "动态与评论", "Posts & reacties", "Publicações & comentários", "Inlägg & kommentarer", "Публикации и комментарии", "Posty i komentarze", "게시물 & 댓글"))),
      h(MurHype, { cible: "agenda:" + String(ev.id), vignette: true, sansTitre: true, teinte: OR, composerEnBas: true, /* 20/09 (276) : meme regle que la fiche a venir — les photos et publications d abord, le champ d ecriture en dessous (sa demande du 19/09). */
        chargerEnPlus: function () { return hypePostsAgenda(ev.id); } })),

    /* 17/09 (227) : SUPPRIMER LE RENDEZ-VOUS, depuis sa propre page (sa demande : ne plus avoir
       a revenir en arriere pour le trouver). Gestionnaire du club seulement, confirmation
       obligatoire, refus de la base AFFICHE. La suppression emporte le mur du rendez-vous. */
    (peutSupprimerRdv ? h("div", { style: { padding: "30px 18px calc(24px + env(safe-area-inset-bottom))" } },
      errSup ? h("div", { style: { marginBottom: 10, padding: "11px 13px", borderRadius: 12, border: "1px solid rgba(255,107,107,0.35)", background: "rgba(255,107,107,0.07)", color: "#FF9B9B", fontFamily: M, fontSize: 12, lineHeight: 1.5 } }, errSup) : null,
      h("div", { role: "button", onClick: supprimerCeRdv,
        style: { margin: "0 auto", width: "fit-content", minHeight: 46, padding: "0 22px", borderRadius: 999, border: "1px solid rgba(240,92,116,0.45)", background: "rgba(240,92,116,0.08)", color: "#F0A0AE", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: M, fontSize: 12.5, fontWeight: 700, cursor: busySup ? "default" : "pointer", opacity: busySup ? 0.6 : 1 } },
        busySup ? "\u2026" : T("Supprimer ce rendez-vous", "Delete this event", "Eliminar esta cita", "Elimina questo evento", "\u3053\u306e\u4e88\u5b9a\u3092\u524a\u9664", "Diesen Termin l\u00f6schen", "\u062d\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0639\u062f", "删除这个日程", "Deze afspraak verwijderen", "Excluir este compromisso", "Ta bort den här händelsen", "Удалить это событие", "Usuń to wydarzenie", "이 일정 삭제"))) : null),

    hypeCalquePhoto(visu, function () { setVisu(null); }));
}
window.HypeEvtPasse = { EvtPasse: EcranEvenementPasse };
})();
