/* HYPE ▸ 07/11/2026 — Écran SANTÉ DE L'ÉCURIE (EcranSanteClub), REFAIT au design de la Vidéothèque et DÉTACHÉ de index.html
   (chargé seulement à l'ouverture de l'écran, voir hypeEcranDiffere dans index.html).
   Décisions de Blandine du 07/11 (maquettes « Santé de l'écurie ») :
   - plus de « échéances d'abord » : TOUS les chevaux dans l'ordre ALPHABÉTIQUE (Cirrus « disparu » le 07/11 : il était remonté en tête) ;
   - l'alerte se voit sur le cheval lui-même, de façon DÉLICATE (« ça pique les yeux ») : vieux rose en retard, doré à 15 jours, sans pastille pleine ;
   - haut de page Vidéothèque (photo, courbes dorées, « Santé » + phrase) ; ligne de l'écurie ; À surveiller ; Les chevaux ;
   - « Les soins de l'écurie » : UNE ligne par soin (pas une alerte par cheval) ; en l'ouvrant, les chevaux faits ; la liste des chevaux
     NON faits seulement quand presque toute l'écurie est faite (80 % ou plus — « si 2 chevaux ont un vaccin, ne cite pas les 58 autres ») ;
   - L'équipe de soins, Demander à Hey Baby et Le magazine santé repris de la page Santé du cheval ; Le registre d'élevage en bas.
   Rien de l'ancienne page n'est perdu : chargement des chevaux du club, voile Premium, import de soins pour plusieurs chevaux, erreurs lisibles.
   Outils partagés de l'appli utilisés à l'exécution : useApp, supa, hypeChevauxDuClub, HypeVoileSantePremium, ImportSoinsClub,
   vignetteHype, useHypeLargeur, hypeRolesSoins, HYPE_ROLES_ORDRE, SelecteurLangue. */
(function () {
/* 07/11 — « + Noter pour plusieurs chevaux » (accord de Blandine 19h46) : UN soin, UNE date, plusieurs chevaux cochés -> une ligne
   soins_cheval par cheval (même écriture que l'import : details.import = "plusieurs"). Prochaine échéance proposée par hypeImportProchaine,
   modifiable. Rien n'est écrit avant « Enregistrer ». Boutons à contour champagne, jamais pleins. */
function NoterPlusieurs(props) {
  var h = React.createElement, T = props.T, chevaux = props.chevaux || [];
  function auj() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function proch(ty, d) { return (typeof hypeImportProchaine === "function") ? (hypeImportProchaine(ty, d) || "") : ""; }
  var s1 = React.useState("vaccin"); var type = s1[0], setType = s1[1];
  var s2 = React.useState({ grippe: true }); var vacs = s2[0], setVacs = s2[1];
  var s3 = React.useState(""); var produit = s3[0], setProduit = s3[1];
  var s4 = React.useState(auj()); var date = s4[0], setDate = s4[1];
  var s5 = React.useState(proch("vaccin", auj())); var prochaine = s5[0], setProchaine = s5[1];
  var s6 = React.useState(false); var prochMain = s6[0], setProchMain = s6[1];
  var s7 = React.useState({}); var coches = s7[0], setCoches = s7[1];
  var s8 = React.useState(false); var occupe = s8[0], setOccupe = s8[1];
  var s9 = React.useState(null); var bilan = s9[0], setBilan = s9[1];
  function changer(ty, d) { if (!prochMain) setProchaine(proch(ty, d)); }
  var TYS = [
    ["vaccin", T("Vaccin", "Vaccine", "Vacuna", "Vaccino", "ワクチン", "Impfung", "لقاح", "疫苗", "Vaccin", "Vacina", "Vaccin", "Прививка", "Szczepionka", "백신")],
    ["vermifuge", T("Vermifuge", "Deworming", "Vermífugo", "Vermifugo", "駆虫", "Wurmkur", "مضاد الديدان", "驱虫", "Ontwormen", "Vermífugo", "Avmaskning", "Глистогонное", "Odrobaczanie", "구충제")],
    ["ferrure", T("Ferrure", "Shoeing", "Herraje", "Ferratura", "装蹄", "Beschlag", "تركيب الحدوة", "钉蹄", "Beslag", "Ferrageamento", "Skoning", "Ковка", "Kucie", "장제")],
    ["parage", T("Parage", "Trimming", "Recorte de cascos", "Pareggio", "削蹄", "Hufbearbeitung", "تقليم الحوافر", "修蹄", "Bekappen", "Casqueamento", "Verkning", "Расчистка", "Werkowanie", "삭제")],
    ["dentiste", T("Dentiste", "Dentist", "Dentista", "Dentista", "歯科", "Zahnarzt", "طبيب الأسنان", "牙医", "Tandarts", "Dentista", "Tandläkare", "Зубной врач", "Dentysta", "치과")],
    ["osteopathe", T("Ostéopathe", "Osteopath", "Osteópata", "Osteopata", "整骨", "Osteopath", "أخصائي العظام", "整骨", "Osteopaat", "Osteopata", "Osteopat", "Остеопат", "Osteopata", "오스테오파시")],
    ["veterinaire", T("Vétérinaire", "Vet", "Veterinario", "Veterinario", "獣医", "Tierarzt", "طبيب بيطري", "兽医", "Dierenarts", "Veterinário", "Veterinär", "Ветеринар", "Weterynarz", "수의사")]
  ];
  var VACS = [
    ["grippe", T("Grippe", "Flu", "Gripe", "Influenza", "インフルエンザ", "Influenza", "الإنفلونزا", "流感", "Griep", "Gripe", "Influensa", "Грипп", "Grypa", "인플루엔자")],
    ["rhino", T("Rhinopneumonie", "Rhinopneumonitis", "Rinoneumonitis", "Rinopolmonite", "鼻肺炎", "Rhinopneumonitis", "التهاب الأنف والرئة", "鼻肺炎", "Rhinopneumonie", "Rinopneumonite", "Rhinopneumonit", "Ринопневмония", "Rhinopneumonia", "비폐렴")],
    ["tetanos", T("Tétanos", "Tetanus", "Tétanos", "Tetano", "破傷風", "Tetanus", "الكزاز", "破伤风", "Tetanus", "Tétano", "Stelkramp", "Столбняк", "Tężec", "파상풍")],
    ["westnile", "West Nile"]
  ];
  /* le titre reste en français (comme ceux de l'import) : c'est lui que la page relit pour ranger le vaccin dans sa ligne */
  var NOMS_FR = { grippe: "Grippe", rhino: "Rhinopneumonie", tetanos: "Tétanos", westnile: "West Nile" };
  var vacList = ["grippe", "rhino", "tetanos", "westnile"].filter(function (k) { return vacs[k]; });
  var titre = type === "vaccin" ? (vacList.map(function (k) { return NOMS_FR[k]; }).join(" + ") + (produit.trim() ? " (" + produit.trim() + ")" : "")) : produit.trim();
  var ids = chevaux.filter(function (c) { return coches[String(c.id)]; }).map(function (c) { return c.id; });
  var pret = ids.length && /^\d{4}-\d{2}-\d{2}$/.test(date) && (type !== "vaccin" || vacList.length) && !occupe;
  async function enregistrer() {
    if (!pret) return;
    setOccupe(true); setBilan(null);
    var ok = 0, ko = [], restants = Object.assign({}, coches);
    for (var i = 0; i < ids.length; i++) {
      try {
        var ligne = Object.assign({ cheval_id: ids[i], type: type, date_intervention: date, details: { import: "plusieurs", ligne: titre } }, titre ? { titre: titre } : {}, /^\d{4}-\d{2}-\d{2}$/.test(prochaine) ? { date_prochaine: prochaine } : {});
        var r = await supa.from("soins_cheval").insert(ligne).select("id");
        if (r && r.error) ko.push(String(r.error.message || r.error)); else { ok++; delete restants[String(ids[i])]; }
      } catch (e) { ko.push(String(e)); }
    }
    setCoches(restants); setOccupe(false); setBilan({ ok: ok, ko: ko });
    if (ok && props.onEnregistre) props.onEnregistre();
  }
  var ICO = {
    vaccin: "M18 2l4 4M20 4l-9.5 9.5M14 4l6 6M15.5 8.5l-9 9-3 1 1-3 9-9M7 13l4 4M3 21l2.5-2.5",
    vermifuge: "M10.5 20.5l10-10a4.95 4.95 0 0 0-7-7l-10 10a4.95 4.95 0 0 0 7 7zM8.5 8.5l7 7",
    ferrure: "M6 20H4.5C3.5 15 3 12 3.5 9 4.5 4.5 8 2.5 12 2.5S19.5 4.5 20.5 9c.5 3 0 6-1 11H18c.6-4 1-6.8.5-9C17.8 7.5 15.5 6 12 6S6.2 7.5 5.5 11C5 13.2 5.4 16 6 20z",
    parage: "M5 21h14M7 21c0-6 1.5-11 5-15 3.5 4 5 9 5 15M9.5 14h5",
    dentiste: "M12 5.5C10.5 4 8.8 3.5 7 3.5 4.5 3.5 3 5.5 3 8c0 2.5 1 4 1.6 6 .6 2.2.9 6.5 2.6 6.5 1.6 0 1.8-3.5 2.4-5.2.4-1 .9-1.3 1.4-1.3h2c.5 0 1 .3 1.4 1.3.6 1.7.8 5.2 2.4 5.2 1.7 0 2-4.3 2.6-6.5C20 12 21 10.5 21 8c0-2.5-1.5-4.5-4-4.5-1.8 0-3.5.5-5 2z",
    osteopathe: "M12 3v18M8 6h8M7 10h10M8 14h8M9 18h6",
    veterinaire: "M6 3v6a4 4 0 0 0 8 0V3M10 13v3a5 5 0 0 0 10 0v-2M20 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
  };
  function svg(d, cls) { return h("svg", { className: cls, viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: d })); }
  function moisCourt(d) { var m = String(d || "").match(/^(\d{4})-(\d{2})-(\d{2})$/); if (!m) return ""; try { return new Date(+m[1], +m[2] - 1, +m[3]).toLocaleDateString((document.documentElement && document.documentElement.lang) || undefined, { day: "numeric", month: "long", year: "numeric" }); } catch (eD) { return m[3] + "/" + m[2] + "/" + m[1]; } }
  var METIERS = [
    { k: "veterinaire", img: "images/sante-pro-veterinaire.webp", t: T("Vétérinaire", "Vet", "Veterinario", "Veterinario", "獣医", "Tierarzt", "طبيب بيطري", "兽医", "Dierenarts", "Veterinário", "Veterinär", "Ветеринар", "Weterynarz", "수의사"), types: ["vaccin", "vermifuge", "veterinaire"] },
    { k: "marechal", img: "images/sante-pro-marechal.webp", t: T("Maréchal", "Farrier", "Herrador", "Maniscalco", "装蹄師", "Hufschmied", "البيطار", "蹄铁匠", "Hoefsmid", "Ferrador", "Hovslagare", "Коваль", "Kowal", "장제사"), types: ["ferrure", "parage"] },
    { k: "dentiste", img: "images/sante-pro-dentiste.webp", t: T("Dentiste", "Dentist", "Dentista", "Dentista", "歯科", "Zahnarzt", "طبيب الأسنان", "牙医", "Tandarts", "Dentista", "Tandläkare", "Зубной врач", "Dentysta", "치과"), types: ["dentiste"], desc: T("Contrôle, râpage", "Check-up, rasping", "Revisión, limado", "Controllo, limatura", "検査・歯削り", "Kontrolle, Raspeln", "فحص وبرد", "检查、锉牙", "Controle, raspen", "Revisão, grosagem", "Kontroll, raspning", "Осмотр, рашпилевание", "Kontrola, tarnikowanie", "검진, 치아 연마") },
    { k: "osteopathe", img: "images/sante-pro-osteopathe.webp", t: T("Ostéopathe", "Osteopath", "Osteópata", "Osteopata", "整骨", "Osteopath", "أخصائي العظام", "整骨师", "Osteopaat", "Osteopata", "Osteopat", "Остеопат", "Osteopata", "오스테오파시"), types: ["osteopathe"], desc: T("Séance", "Session", "Sesión", "Seduta", "施術", "Behandlung", "جلسة", "治疗", "Behandeling", "Sessão", "Behandling", "Сеанс", "Sesja", "세션") }
  ];
  var VISITE = T("Visite", "Visit", "Visita", "Visita", "診察", "Besuch", "زيارة", "出诊", "Bezoek", "Visita", "Besök", "Осмотр", "Wizyta", "진료");
  function libT(ty) { if (ty === "veterinaire") return VISITE; return (TYS.filter(function (t) { return t[0] === ty; })[0] || ["", ""])[1]; }
  var metier = (METIERS.filter(function (m) { return m.types.indexOf(type) >= 0; })[0] || METIERS[0]).k;
  function sousTitre(m) {
    if (m.desc) return m.desc;
    if (m.k !== metier) return m.types.map(libT).join(", ");
    if (type === "vaccin") return libT("vaccin") + (vacList.length ? " · " + VACS.filter(function (v) { return vacs[v[0]]; }).map(function (v) { return v[1]; }).join(" + ") : "");
    return libT(type);
  }
  function choisir(ty) { setType(ty); changer(ty, date); }
  var tousCoches = chevaux.length && ids.length === chevaux.length;
  var mCour = METIERS.filter(function (m) { return m.k === metier; })[0];
  var feuille = h("div", { className: "nf", role: "dialog", "aria-modal": "true" },
    /* 08/11 : haut de page EXACTEMENT comme la Vidéothèque (photo fondue, courbe dorée au-dessus et en dessous, titre à droite + phrase), demandé par Blandine */
    h("div", { className: "sc-hero nf-hero" },
      h("svg", { className: "sc-courbe c1", viewBox: "0 0 400 100", preserveAspectRatio: "none", "aria-hidden": "true" }, h("defs", null, h("linearGradient", { id: "nfc1", x1: "0", x2: "1", y1: "0", y2: "0" }, h("stop", { offset: "0", stopColor: "#C9A66B", stopOpacity: "0" }), h("stop", { offset: ".45", stopColor: "#C9A66B", stopOpacity: ".95" }), h("stop", { offset: "1", stopColor: "#C9A66B", stopOpacity: ".15" }))), h("path", { d: "M250 4 C 330 8, 385 40, 400 96", fill: "none", stroke: "url(#nfc1)", strokeWidth: 1.1, vectorEffect: "non-scaling-stroke" })),
      h("div", { className: "sc-photo" }, h("img", { src: "images/galop7-tmp-19-ecurie-couchant.webp", alt: "", decoding: "async", style: { objectPosition: "58% 50%" } })),
      h("svg", { className: "sc-courbe c2", viewBox: "0 0 400 100", preserveAspectRatio: "none", "aria-hidden": "true" }, h("defs", null, h("linearGradient", { id: "nfc2", x1: "0", x2: "1", y1: "0", y2: "0" }, h("stop", { offset: "0", stopColor: "#C9A66B", stopOpacity: "0" }), h("stop", { offset: ".45", stopColor: "#C9A66B", stopOpacity: ".95" }), h("stop", { offset: "1", stopColor: "#C9A66B", stopOpacity: ".15" }))), h("path", { d: "M0 92 C 130 90, 240 62, 400 8 L400 100 L0 100 Z", fill: "#070A08", stroke: "none" }), h("path", { d: "M0 92 C 130 90, 240 62, 400 8", fill: "none", stroke: "url(#nfc2)", strokeWidth: 1.1, vectorEffect: "non-scaling-stroke" })),
      h("div", { className: "sc-in" }, h("div", { className: "sc-titre" }, h("h1", null, T("Noter un soin", "Record a care", "Registrar un cuidado", "Registra una cura", "ケアを記録", "Pflege eintragen", "تسجيل عناية", "记录护理", "Verzorging noteren", "Registrar um cuidado", "Registrera vård", "Записать уход", "Zapisz zabieg", "관리 기록")), h("p", null, T("Un soin, une date, tous les chevaux concernés.", "One care, one date, all the horses concerned.", "Un cuidado, una fecha, todos los caballos.", "Una cura, una data, tutti i cavalli interessati.", "ひとつのケア、ひとつの日付、対象の馬すべてに。", "Eine Pflege, ein Datum, alle betroffenen Pferde.", "عناية واحدة، تاريخ واحد، كل الخيول المعنية.", "一项护理，一个日期，所有相关马匹。", "Eén verzorging, één datum, alle betrokken paarden.", "Um cuidado, uma data, todos os cavalos.", "En vård, ett datum, alla berörda hästar.", "Один уход, одна дата, все нужные лошади.", "Jeden zabieg, jedna data, wszystkie konie.", "하나의 관리, 하나의 날짜, 해당 말 모두.")))),
      h("button", { type: "button", className: "nf-x", onClick: props.onFermer, "aria-label": T("Fermer", "Close", "Cerrar", "Chiudi", "閉じる", "Schließen", "إغلاق", "关闭", "Sluiten", "Fechar", "Stäng", "Закрыть", "Zamknij", "닫기") }, svg("M6 6l12 12M18 6L6 18"))),
    h("div", { className: "nf-in" },
      h("div", { className: "nf-metiers" }, METIERS.map(function (m) {
        var on = m.k === metier;
        return h("button", { key: "m" + m.k, type: "button", className: "nf-me" + (on ? " on" : ""), "aria-pressed": on ? "true" : "false", onClick: function () { if (!on) choisir(m.types[0]); } },
          h("img", { src: m.img, alt: "", loading: "lazy", decoding: "async" }),
          h("span", { className: "nf-me-t" }, h("b", null, m.t), h("small", null, sousTitre(m))));
      })),
      mCour.types.length > 1 ? h("div", { className: "nf-puces" }, mCour.types.map(function (ty) {
        var on = type === ty;
        return h("button", { key: "s" + ty, type: "button", className: "nf-puce" + (on ? " on" : ""), "aria-pressed": on ? "true" : "false", onClick: function () { choisir(ty); } }, svg(ICO[ty] || ICO.veterinaire, "nf-ico"), libT(ty));
      })) : null,
      type === "vaccin" ? h("div", { className: "nf-bloc" },
        h("p", { className: "nf-lab" }, T("Contre", "Against", "Contra", "Contro", "対象", "Gegen", "ضد", "预防", "Tegen", "Contra", "Mot", "Против", "Przeciw", "대상")),
        h("div", { className: "nf-puces", style: { marginTop: 0 } }, VACS.map(function (v) {
          var on = !!vacs[v[0]];
          return h("button", { key: "v" + v[0], type: "button", className: "nf-puce nf-vac" + (on ? " on" : ""), "aria-pressed": on ? "true" : "false", onClick: function () { var n = Object.assign({}, vacs); n[v[0]] = !n[v[0]]; setVacs(n); } }, v[1]);
        }))) : null,
      h("label", { className: "nf-bloc nf-champ" },
        h("span", { className: "nf-lab" }, type === "vaccin" ? T("Nom du vaccin (facultatif)", "Vaccine name (optional)", "Nombre de la vacuna (opcional)", "Nome del vaccino (facoltativo)", "ワクチン名（任意）", "Name des Impfstoffs (optional)", "اسم اللقاح (اختياري)", "疫苗名称（选填）", "Naam van het vaccin (optioneel)", "Nome da vacina (opcional)", "Vaccinets namn (valfritt)", "Название вакцины (необязательно)", "Nazwa szczepionki (opcjonalnie)", "백신 이름 (선택)") : T("Précision (facultatif)", "Details (optional)", "Detalle (opcional)", "Dettaglio (facoltativo)", "詳細（任意）", "Angabe (optional)", "تفاصيل (اختياري)", "说明（选填）", "Toelichting (optioneel)", "Detalhe (opcional)", "Detalj (valfritt)", "Уточнение (необязательно)", "Szczegóły (opcjonalnie)", "세부 사항 (선택)")),
        h("input", { type: "text", value: produit, onChange: function (e) { setProduit(e.target.value); }, placeholder: type === "vaccin" ? "Equip F, ProteqFlu-Te…" : "", maxLength: 120 })),
      h("div", { className: "nf-dates" },
        h("label", { className: "nf-d1" }, h("span", { className: "nf-lab" }, T("Date", "Date", "Fecha", "Data", "日付", "Datum", "التاريخ", "日期", "Datum", "Data", "Datum", "Дата", "Data", "날짜")),
          h("input", { type: "date", value: date, onChange: function (e) { setDate(e.target.value); changer(type, e.target.value); } })),
        h("label", { className: "nf-d2" }, h("span", { className: "nf-lab" }, T("Prochaine échéance", "Next due date", "Próximo vencimiento", "Prossima scadenza", "次回予定", "Nächste Fälligkeit", "الموعد القادم", "下次到期", "Volgende vervaldatum", "Próximo vencimento", "Nästa förfallodatum", "Следующий срок", "Następny termin", "다음 예정일")),
          h("input", { type: "date", value: prochaine, onChange: function (e) { setProchaine(e.target.value); setProchMain(true); } }))),
      h("div", { className: "nf-chx-t" },
        h("span", { className: "nf-lab", style: { margin: 0 } }, T("Les chevaux", "The horses", "Los caballos", "I cavalli", "馬", "Die Pferde", "الخيول", "马匹", "De paarden", "Os cavalos", "Hästarna", "Лошади", "Konie", "말") + " · " + ids.length + " / " + chevaux.length),
        h("button", { type: "button", className: "nf-tout", onClick: function () { var n = {}; if (!tousCoches) chevaux.forEach(function (c) { n[String(c.id)] = 1; }); setCoches(n); } }, tousCoches ? T("Tout décocher", "Uncheck all", "Desmarcar todo", "Deseleziona tutto", "すべて解除", "Alle abwählen", "إلغاء الكل", "全部取消", "Alles uitvinken", "Desmarcar tudo", "Avmarkera alla", "Снять все", "Odznacz wszystkie", "모두 해제") : T("Tout cocher", "Check all", "Marcar todo", "Seleziona tutto", "すべて選択", "Alle auswählen", "تحديد الكل", "全选", "Alles aanvinken", "Marcar tudo", "Markera alla", "Отметить все", "Zaznacz wszystkie", "모두 선택"))),
      h("div", { className: "nf-chx" }, chevaux.map(function (c) {
        var k = String(c.id), on = !!coches[k], ph = c.photo_url || "";
        return h("button", { key: "n" + k, type: "button", className: "nf-c" + (on ? " on" : ""), "aria-pressed": on ? "true" : "false", onClick: function () { var n = Object.assign({}, coches); if (n[k]) delete n[k]; else n[k] = 1; setCoches(n); } },
          h("span", { className: "nf-v" }, ph ? h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(ph, 160, 160) : ph, alt: "", loading: "lazy", decoding: "async" }) : String(c.nom || "?").trim().charAt(0).toUpperCase()),
          h("span", { className: "nf-n" }, c.nom || ""));
      })),
      bilan ? h("div", { className: bilan.ko.length ? "sc-err" : "nf-bilan" },
        bilan.ok ? T(bilan.ok + " soin(s) enregistré(s).", bilan.ok + " record(s) saved.", bilan.ok + " cuidado(s) guardado(s).", bilan.ok + " cura/e salvata/e.", bilan.ok + " 件保存しました。", bilan.ok + " Eintrag/Einträge gespeichert.", "تم حفظ " + bilan.ok + ".", bilan.ok + " 条记录已保存。", bilan.ok + " behandeling(en) opgeslagen.", bilan.ok + " cuidado(s) salvo(s).", bilan.ok + " post(er) sparade.", "Сохранено: " + bilan.ok + ".", "Zapisano: " + bilan.ok + ".", bilan.ok + "건 저장됨.") + " " : "",
        bilan.ko.length ? T("Refusé pour " + bilan.ko.length + " cheval(aux) (restés cochés) : ", "Refused for " + bilan.ko.length + " horse(s) (still checked): ", "Rechazado para " + bilan.ko.length + " caballo(s) (siguen marcados): ", "Rifiutato per " + bilan.ko.length + " cavallo/i (ancora selezionati): ", bilan.ko.length + " 頭で拒否（選択のまま）：", "Abgelehnt für " + bilan.ko.length + " Pferd(e) (noch ausgewählt): ", "رُفض لـ " + bilan.ko.length + " (ما زالت محددة): ", bilan.ko.length + " 匹被拒绝（仍勾选）：", "Geweigerd voor " + bilan.ko.length + " paard(en) (nog aangevinkt): ", "Recusado para " + bilan.ko.length + " cavalo(s) (ainda marcados): ", "Nekad för " + bilan.ko.length + " häst(ar) (fortfarande markerade): ", "Отклонено для " + bilan.ko.length + " (остались отмечены): ", "Odrzucono dla " + bilan.ko.length + " (nadal zaznaczone): ", bilan.ko.length + "마리 거부됨 (선택 유지): ") + bilan.ko[0] : null) : null),
    h("div", { className: "nf-bas" },
      h("div", { className: "nf-bas-in" },
        h("button", { type: "button", className: "nf-go", disabled: !pret, onClick: enregistrer }, occupe ? "…" : T("Enregistrer pour " + ids.length + (ids.length > 1 ? " chevaux" : " cheval"), "Save for " + ids.length + (ids.length > 1 ? " horses" : " horse"), "Guardar para " + ids.length + " caballo(s)", "Salva per " + ids.length + " cavallo/i", ids.length + " 頭に保存", "Für " + ids.length + " Pferd(e) speichern", "حفظ لـ " + ids.length + " حصان", "为 " + ids.length + " 匹马保存", "Opslaan voor " + ids.length + " paard(en)", "Salvar para " + ids.length + " cavalo(s)", "Spara för " + ids.length + " häst(ar)", "Сохранить для " + ids.length, "Zapisz dla " + ids.length, ids.length + "마리에 저장")))));
  return (typeof ReactDOM !== "undefined" && ReactDOM.createPortal) ? ReactDOM.createPortal(feuille, document.body) : feuille;
}
function EcranSanteClub() {
  var h = React.createElement;
  var ctx = (typeof useApp === "function") ? useApp() : {};
  var tr = ctx.tr || function (o) { return (o && (o.fr || "")) || ""; };
  var setEcran = ctx.setEcran || function () { };
  var retourEcran = ctx.retourEcran, peutReculer = ctx.peutReculer;
  function T(fr, en, es, it, ja, de, ar, zh, nl, pt, sv, ru, pl, ko) { return tr({ fr: fr, en: en, es: es, it: it, ja: ja, de: de, ar: ar, zh: zh, nl: nl, pt: pt, sv: sv, ru: ru, pl: pl, ko: ko }); }
  var VR = "#D9939E", AMB = "#E8C887", PET = "#5C8792", TQ = "#C9A66B";
  var tablette = (typeof useHypeLargeur === "function") ? useHypeLargeur(768) : false;
  var ordi = (typeof useHypeLargeur === "function") ? useHypeLargeur(1180) : false;

  var clubS = "";
  try { clubS = String((window.__santeClub && window.__santeClub.nom) || "").trim(); } catch (e1) { }

  var stL = React.useState(null); var chevaux = stL[0], setChevaux = stL[1];
  var stS = React.useState([]); var soins = stS[0], setSoins = stS[1];
  var stP = React.useState([]); var pros = stP[0], setPros = stP[1];
  var stE = React.useState(""); var err = stE[0], setErr = stE[1];
  var stI = React.useState(false); var importOuvert = stI[0], setImportOuvert = stI[1];
  var stR = React.useState(0); var recharge = stR[0], setRecharge = stR[1];
  var stT = React.useState(false); var tous = stT[0], setTous = stT[1];          /* « Voir les N » : tous les chevaux en grille */
  var stO = React.useState(""); var soinOuvert = stO[0], setSoinOuvert = stO[1]; /* ligne de soin ouverte */
  var stVo = React.useState(false); var vacOuvert = stVo[0], setVacOuvert = stVo[1]; /* 08/11 : ligne « Vaccins » déroulée */
  var stN = React.useState(false); var noterOuvert = stN[0], setNoterOuvert = stN[1]; /* « + Noter pour plusieurs chevaux » */

  React.useEffect(function () {   /* 08/11 : styles « page Santé du cheval » */
    if (typeof document === "undefined" || document.getElementById("hype-sx2-css")) return;
    var st = document.createElement("style"); st.id = "hype-sx2-css";
    st.textContent = [
      ".sc{position:relative;background:#060709}",
      ".sx-fond{position:fixed;inset:0;z-index:0;pointer-events:none;background:linear-gradient(180deg,rgba(6,7,9,.82) 0%,rgba(6,7,9,.45) 30%,rgba(6,7,9,.75) 65%,rgba(6,7,9,.96) 100%),linear-gradient(90deg,rgba(6,7,9,.85) 0%,rgba(6,7,9,.5) 50%,rgba(6,7,9,.3) 100%),url('images/galop7-tmp-19-ecurie-couchant.webp') center/cover no-repeat}",
      "[dir=rtl] .sx-fond{transform:scaleX(-1)}",
      ".sx-hero,.sc>.sc-in{position:relative;z-index:1}",
      ".sx-hero{position:relative;max-width:1240px;margin:0 auto;height:calc(env(safe-area-inset-top) + 360px)}",
      ".sx-hero .ph{position:absolute;top:calc(env(safe-area-inset-top) + 58px);bottom:0;inset-inline-end:0;width:100%;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 15%,#000 60%,transparent 100%),linear-gradient(90deg,transparent 0,#000 30%);-webkit-mask-composite:source-in;mask-image:linear-gradient(180deg,transparent 0,#000 15%,#000 60%,transparent 100%),linear-gradient(90deg,transparent 0,#000 30%);mask-composite:intersect}",
      "[dir=rtl] .sx-hero .ph{-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 15%,#000 60%,transparent 100%),linear-gradient(270deg,transparent 0,#000 30%);mask-image:linear-gradient(180deg,transparent 0,#000 15%,#000 60%,transparent 100%),linear-gradient(270deg,transparent 0,#000 30%)}",
      ".sx-hero .ph img{width:100%;height:100%;object-fit:cover;object-position:70% 40%;display:block}",
      ".sx-rond{position:absolute;z-index:6;top:calc(env(safe-area-inset-top) + 12px);inset-inline-start:18px;width:52px;height:52px;border-radius:50%;border:1px solid rgba(201,166,107,.7);background:rgba(6,7,9,.35);display:flex;align-items:center;justify-content:center;cursor:pointer}",
      ".sx-rond svg{width:20px;height:20px;stroke:#C9A66B;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}",
      "[dir=rtl] .sx-rond svg{transform:scaleX(-1)}",
      ".sx-hero .nom{position:absolute;z-index:2;inset-inline-start:20px;inset-inline-end:20px;bottom:18px}",
      ".sx-hero .k{font-size:11px;letter-spacing:.32em;text-transform:uppercase;color:#C9A66B;font-weight:600}",
      ".sx-hero h1{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:44px;line-height:1;margin:8px 0 2px;color:#F3EEE4;text-shadow:0 2px 14px rgba(0,0,0,.6)}",
      ".sx-hero .s{font-family:'Cormorant Garamond',Georgia,serif;font-size:17px;color:#C9A66B}",
      ".sx-phrase{text-align:end;font-family:'Cormorant Garamond',Georgia,serif;font-weight:700;font-size:21px;color:#C9A66B;margin:26px 0 20px;text-shadow:0 0 18px rgba(201,166,107,.25)}",
      ".sx-cases{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:28px}",
      ".sx-case{text-align:start;border:1px dashed rgba(201,166,107,.45);border-radius:14px;padding:11px 12px;background:rgba(6,7,9,.35);color:#F3EEE4;font-family:inherit;cursor:pointer}",
      ".sx-case b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:17px}",
      ".sx-case b i{font-style:normal;color:#C9A66B;margin-inline-end:6px}",
      ".sx-case span{display:block;font-size:11px;color:rgba(243,238,228,.62);margin-top:3px;line-height:1.35}",
      ".sx-tete{display:flex;align-items:center;gap:10px;margin:0 0 12px}",
      ".sx-tete svg{width:20px;height:20px;flex:0 0 auto;fill:none;stroke:#C9A66B;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}",
      ".sx-tete .t{flex:1;font-family:'Cormorant Garamond',Georgia,serif;font-size:18px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#F3EEE4}",
      ".sx-tete .sc-voir{font-size:12.5px;color:rgba(243,238,228,.8)}",
      ".sx-boite{border-radius:16px;border:1px solid rgba(201,166,107,.28);background:linear-gradient(165deg,rgba(17,27,31,.6) 0%,rgba(11,18,21,.5) 100%);overflow:hidden}",
      ".sx-l{display:flex;align-items:center;gap:12px;padding:12px 14px;cursor:pointer}",
      ".sx-l+.sx-l{border-top:1px solid rgba(255,255,255,.06)}",
      ".sx-l .r{width:44px;height:44px;flex:0 0 auto;border-radius:50%;border:1px solid rgba(201,166,107,.45);overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:20px;background:#0D1518}",
      ".sx-l .r img{width:100%;height:100%;object-fit:cover;display:block}",
      ".sx-l .n{flex:1;min-width:0}",
      ".sx-l .n b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-size:17px;font-weight:600;line-height:1.2}",
      ".sx-l .n span{display:block;font-size:12px;margin-top:2px}",
      ".sx-l .c,.sx-ch .c{color:#C9A66B;font-size:18px}",
      "[dir=rtl] .sx-l .c,[dir=rtl] .sx-ch .c{transform:scaleX(-1)}",
      ".sx-ch{position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;min-height:132px;padding:14px;border-radius:16px;border:1px solid rgba(201,166,107,.28);background:linear-gradient(165deg,#111B1F 0%,#0B1215 100%);color:#F3EEE4;font-family:inherit;text-align:start;cursor:pointer;min-width:0}",
      ".sx-ch.vr{border-color:rgba(217,147,158,.55)}",
      ".sx-ch.amb{border-color:rgba(232,200,135,.5)}",
      ".sx-ch .ph{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:right center}",
      ".sx-ch .ph.vide{display:flex;align-items:center;justify-content:flex-end;padding-inline-end:22px;font-size:34px;opacity:.35}",
      ".sx-ch:after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,rgba(8,11,13,.85) 0%,rgba(8,11,13,.45) 50%,rgba(8,11,13,0) 80%),linear-gradient(0deg,rgba(8,11,13,.55) 0%,rgba(8,11,13,0) 55%)}",
      "[dir=rtl] .sx-ch:after{background:linear-gradient(270deg,rgba(8,11,13,.85) 0%,rgba(8,11,13,.45) 50%,rgba(8,11,13,0) 80%),linear-gradient(0deg,rgba(8,11,13,.55) 0%,rgba(8,11,13,0) 55%)}",
      ".sx-ch>b,.sx-ch>.g,.sx-ch>.c{position:relative;z-index:1}",
      ".sx-ch>.c{position:absolute;inset-inline-end:12px;bottom:12px}",
      ".sx-ch b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-size:19px;font-weight:600;line-height:1.15;text-shadow:0 1px 8px rgba(0,0,0,.7);overflow-wrap:anywhere;padding-inline-end:10px}",
      ".sx-ch .g{display:flex;flex-wrap:wrap;gap:2px 6px;margin-top:6px;padding-inline-end:16px;font-size:11.5px}",
      ".sx-ch .g>span{color:rgba(243,238,228,.62)}",
      ".sx-ch .g em{font-style:normal;font-weight:600;font-size:12px}",
      ".sc-rangee .sx-ch{flex:0 0 auto;width:clamp(150px,44vw,230px);scroll-snap-align:start}",
      ".sx-soins .sx-s+.sx-s{border-top:1px solid rgba(255,255,255,.06)}",
      ".sx-soins{margin-bottom:30px}",
      ".sx-soins .sx-s.sous{background:rgba(255,255,255,.025)}",
      ".sx-soins .sx-s.sous .sc-s-t{padding-inline-start:34px}",
      ".sx-soins .sx-s.sous .sc-s-t .p{flex-basis:36px;width:36px;height:36px}",
      ".sx-soins .sx-s.sous .sc-s-t .p svg{width:18px;height:18px}",
      ".sx-soins .sx-s.sous .sc-s-c{padding-inline-start:84px}",
      ".sx-soins .sc-s-t .p{flex:0 0 44px;width:44px;height:44px;border-radius:50%;border:1px solid rgba(201,166,107,.45);align-items:center}",
      ".sx-soins .sc-s-t .p svg{width:22px;height:22px}",
      ".sc-eq{border-color:rgba(201,166,107,.28)}",
      ".sc-eq-l .r.vide{border:1px dashed rgba(201,166,107,.6)}",
      ".sc-eq-l .r.vide img{opacity:.75}",
      ".sx-tel{width:40px;height:40px;flex:0 0 auto;border-radius:50%;border:1px solid rgba(201,166,107,.7);display:flex;align-items:center;justify-content:center}",
      ".sx-tel svg{width:18px;height:18px;fill:none;stroke:#C9A66B;stroke-width:1.5;stroke-linejoin:round}",
      ".sx-bands{display:grid;gap:14px;margin-top:30px}",
      ".sx-band{position:relative;overflow:hidden;height:104px;border-radius:16px;border:1px solid rgba(201,166,107,.32);display:flex;align-items:center;gap:14px;padding:0 16px;background:#0B1215;color:#F3EEE4;font-family:inherit;text-align:start;cursor:pointer;width:100%}",
      ".sx-band>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:85% 38%}",
      "[dir=rtl] .sx-band>img{transform:scaleX(-1)}",
      ".sx-band:after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,rgba(8,11,13,.9) 0%,rgba(8,11,13,.55) 45%,rgba(8,11,13,.05) 75%)}",
      ".sx-band.reg:after{background:linear-gradient(90deg,rgba(8,11,13,.92) 0%,rgba(8,11,13,.7) 50%,rgba(8,11,13,.35) 100%)}",
      "[dir=rtl] .sx-band:after{transform:scaleX(-1)}",
      ".sx-band .r,.sx-band .x{position:relative;z-index:1}",
      ".sx-band .r{width:46px;height:46px;flex:0 0 auto;border-radius:50%;border:1px solid rgba(201,166,107,.6);display:flex;align-items:center;justify-content:center}",
      ".sx-band .r svg{width:22px;height:22px;fill:none;stroke:#C9A66B;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}",
      ".sx-band b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-size:20px;font-weight:600}",
      ".sx-band .x span{display:block;font-size:12.5px;color:rgba(243,238,228,.75);margin-top:2px}",
      "@media (min-width:1024px){.sc .sc-in{box-sizing:border-box;max-width:1240px;padding:0 32px!important}.sx-hero .ph{width:68%}.sx-hero .nom{inset-inline-start:32px}.sx-rond{inset-inline-start:32px}.sx-deux{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:24px}.sx-bands{grid-template-columns:1fr 1fr;gap:20px}.sx-band.reg{grid-column:1/-1}}"
    ].join("\n");
    document.head.appendChild(st);
  }, []);
  React.useEffect(function () {
    if (typeof document === "undefined" || document.getElementById("hype-sc-css")) return;
    var st = document.createElement("style"); st.id = "hype-sc-css";
    st.textContent = [
      ".sc{min-height:100vh;background:#070A08;color:#F3EEE4;font-family:'Montserrat',sans-serif;padding-bottom:calc(env(safe-area-inset-bottom) + 120px)}",
      ".sc-in{max-width:1040px;margin:0 auto;padding:0 18px}",
      ".sc-hero{position:relative;padding-top:calc(env(safe-area-inset-top) + 14px)}",
      ".sc-photo{position:relative;height:clamp(300px,92vw,430px);margin-top:-30px;overflow:hidden;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 14%,#000 50%,transparent 90%),linear-gradient(90deg,transparent 0,#000 12%,#000 100%);-webkit-mask-composite:source-in;mask-image:linear-gradient(180deg,transparent 0,#000 14%,#000 50%,transparent 90%),linear-gradient(90deg,transparent 0,#000 12%,#000 100%);mask-composite:intersect}",
      ".sc-photo img{display:block;width:100%;height:100%;object-fit:cover;object-position:62% 40%;filter:saturate(.92) contrast(1.05) brightness(.95) sepia(.07)}",
      ".sc-courbe{position:absolute;left:0;right:0;width:100%;pointer-events:none;z-index:2}",
      ".sc-courbe.c1{top:calc(env(safe-area-inset-top) + 2px);height:110px}",
      ".sc-courbe.c2{position:relative;display:block;height:64px;margin-top:-64px}",
      ".sc-rond{position:absolute;z-index:6;top:calc(env(safe-area-inset-top) + 12px);inset-inline-start:16px;width:46px;height:46px;border-radius:50%;border:1px solid rgba(243,238,228,.28);background:rgba(7,10,8,.45);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:0;cursor:pointer}",
      ".sc-rond svg{width:22px;height:22px;stroke:#F3EEE4;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}",
      "[dir=rtl] .sc-rond svg{transform:scaleX(-1)}",
      ".sc-langue{position:absolute;z-index:6;top:calc(env(safe-area-inset-top) + 12px);inset-inline-end:14px}",
      ".sc-titre{text-align:end;margin-top:-12px;position:relative;z-index:3}",
      ".sc-titre h1{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(44px,12vw,64px);line-height:1;margin:0;color:#F3EEE4}",
      ".sc-titre p{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:500;font-size:clamp(17px,4.6vw,21px);margin:8px 0 0;color:#F3EEE4;opacity:.88}",
      ".sc-ligne{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:18px;padding:4px 0 10px;position:relative}",
      ".sc-ligne:after{content:'';position:absolute;left:0;right:0;bottom:0;height:1px;background:linear-gradient(90deg,rgba(201,166,107,.15),#C9A66B 55%,rgba(201,166,107,.15))}",
      ".sc-mes{display:flex;align-items:center;gap:14px;padding:10px 6px;min-height:44px;font-size:15px;letter-spacing:.03em;color:#F3EEE4;min-width:0}",
      ".sc-mes span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
      ".sc-mes svg{width:22px;height:22px;flex:0 0 auto;stroke:#C9A66B;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}",
      ".sc-imp{flex:0 0 auto;min-height:40px;padding:0 14px;border-radius:999px;border:1px solid rgba(201,166,107,.7);background:transparent;color:#E9D9B8;font-family:inherit;font-size:12.5px;cursor:pointer}",
      ".sc-h2{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin:34px 0 14px}",
      ".sc-h2 h2{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(28px,7.4vw,36px);margin:0;color:#F3EEE4;line-height:1.1}",
      ".sc-voir{background:none;border:none;color:#F3EEE4;font-family:inherit;font-size:14px;cursor:pointer;white-space:nowrap;padding:8px 0}",
      ".sc-verre{border-radius:16px;border:1px solid rgba(201,166,107,.22);background:linear-gradient(165deg,rgba(28,44,50,.52) 0%,rgba(10,16,19,.32) 100%);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:0 18px 30px -18px rgba(0,0,0,.95),0 6px 14px -10px rgba(201,166,107,.18),inset 0 1px 0 rgba(255,255,255,.06)}",
      ".sc-alerte{display:flex;align-items:center;gap:14px;padding:12px;margin-bottom:10px;cursor:pointer;border-color:rgba(217,147,158,.38)}",
      ".sc-alerte.amb{border-color:rgba(232,200,135,.4)}",
      ".sc-alerte .v{width:64px;height:64px;border-radius:12px;overflow:hidden;flex:0 0 auto;background:#0D1518;display:flex;align-items:center;justify-content:center;font-size:24px}",
      ".sc-alerte .v img{width:100%;height:100%;object-fit:cover;display:block}",
      ".sc-alerte .t{flex:1;min-width:0}",
      ".sc-alerte .t b{display:block;font-family:'Cinzel',Georgia,serif;font-weight:500;font-size:16px;line-height:1.2}",
      ".sc-alerte .t span{display:block;font-size:12px;margin-top:3px}",
      ".sc-alerte .t i{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-size:15px;margin-top:1px}",
      ".sc-rangee{display:flex;gap:12px;overflow-x:auto;margin:0 -18px;padding:2px 18px 6px;scroll-snap-type:x mandatory;scroll-padding-inline:18px;scrollbar-width:none;-webkit-overflow-scrolling:touch}",
      ".sc-rangee::-webkit-scrollbar{display:none}",
      ".sc-grille{display:grid;gap:12px}",
      ".sc-ch{background:none;border:none;padding:0;text-align:start;color:#F3EEE4;font-family:inherit;cursor:pointer;min-width:0}",
      ".sc-rangee .sc-ch{flex:0 0 auto;width:clamp(128px,36vw,180px);scroll-snap-align:start}",
      ".sc-ch .im{position:relative;aspect-ratio:1/1;border-radius:14px;overflow:hidden;background:#0D1518;border:1px solid rgba(243,238,228,.09);display:flex;align-items:center;justify-content:center;font-size:30px}",
      ".sc-ch.vr .im{border-color:rgba(217,147,158,.55)}",
      ".sc-ch.amb .im{border-color:rgba(232,200,135,.55)}",
      ".sc-ch .im img{width:100%;height:100%;object-fit:cover;display:block}",
      ".sc-ch b{display:block;font-size:14.5px;font-weight:500;line-height:1.25;margin-top:9px;overflow-wrap:anywhere}",
      ".sc-ch small{display:block;font-size:12px;color:rgba(243,238,228,.6);margin-top:2px}",
      ".sc-ch small.vr{color:#D9939E;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:14px}",
      ".sc-ch small.amb{color:#E8C887;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:14px}",
      ".sc-ch small.pe{color:#5C8792;font-weight:600}",
      ".sc-intro{margin:-6px 0 14px;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:15.5px;color:rgba(243,238,228,.62)}",
      ".sc-soins{display:flex;flex-direction:column;gap:10px}",
      ".sc-s{overflow:hidden}",
      ".sc-s-t{display:flex;align-items:center;gap:12px;width:100%;padding:13px 14px;background:none;border:0;color:#F3EEE4;text-align:start;font-family:inherit;cursor:pointer}",
      ".sc-s-t:focus-visible,.sc-ch:focus-visible,.sc-voir:focus-visible,.sc-imp:focus-visible{outline:2px solid #C9A66B;outline-offset:2px}",
      ".sc-s-t .p{flex:0 0 28px;display:flex;justify-content:center}",
      ".sc-s-t .p svg{width:26px;height:26px;fill:none;stroke:#C9A66B;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}",
      ".sc-s-t .x{flex:1;min-width:0}",
      ".sc-s-t .x b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:18px;line-height:1.2}",
      ".sc-s-t .x small{display:block;font-size:11.5px;color:rgba(243,238,228,.6);margin-top:2px}",
      ".sc-s-t .d{flex:0 0 auto;font-size:12px;color:rgba(243,238,228,.75);font-variant-numeric:tabular-nums}",
      ".sc-s-t .d.vide{color:rgba(243,238,228,.3)}",
      ".sc-s-t .c{flex:0 0 auto;color:#C9A66B;font-size:18px;line-height:1;transition:transform .2s}",
      ".sc-s.ouv .sc-s-t .c{transform:rotate(90deg)}",
      "[dir=rtl] .sc-s-t .c{transform:scaleX(-1)}",
      ".sc-s-c{padding:0 14px 16px 54px}",
      ".sc-lab{margin:0 0 8px;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:rgba(243,238,228,.6)}",
      ".sc-chips{display:flex;flex-wrap:wrap;gap:6px}",
      ".sc-chip{font-size:12px;padding:5px 11px;border-radius:999px;border:1px solid rgba(243,238,228,.14);color:#F3EEE4;background:none;font-family:inherit;cursor:pointer}",
      ".sc-chip.ok{border-color:rgba(92,135,146,.55);color:#8FB5BF}",
      ".sc-eq-t{display:flex;align-items:center;gap:10px;margin:34px 0 12px}",
      ".sc-eq-t svg{width:21px;height:21px;flex:0 0 auto}",
      ".sc-eq-t div{font-family:'Cormorant Garamond',Georgia,serif;font-size:18px;font-weight:600;letter-spacing:.18em;text-transform:uppercase}",
      ".sc-eq{border-radius:16px;border:1px solid rgba(201,166,107,.28);background:linear-gradient(165deg,rgba(17,27,31,.55) 0%,rgba(11,18,21,.45) 100%);overflow:hidden}",
      ".sc-eq-l{display:flex;align-items:center;gap:12px;padding:12px 14px}",
      ".sc-eq-l+.sc-eq-l{border-top:1px solid rgba(255,255,255,.06)}",
      ".sc-eq-l .r{width:46px;height:46px;flex:0 0 auto;border-radius:50%;border:1px dashed rgba(201,166,107,.45);display:flex;align-items:center;justify-content:center;color:#C9A66B;font-size:18px;overflow:hidden}",
      ".sc-eq-l .r img{width:100%;height:100%;object-fit:cover}",
      ".sc-eq-l.plein .r{border:1px solid rgba(201,166,107,.6)}",
      ".sc-eq-l .n{flex:1;min-width:0}",
      ".sc-eq-l .n b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-size:17px;font-weight:600;line-height:1.2}",
      ".sc-eq-l .n span{display:block;font-size:12px;color:rgba(243,238,228,.6);margin-top:2px}",
      ".sc-eq-l .n span.or{color:rgba(201,166,107,.85)}",
      ".sc-cartes{display:grid;gap:16px;margin-top:30px}",
      ".sc-carte{position:relative;display:flex;flex-direction:column;border-radius:18px;border:1px solid rgba(243,238,228,.09);background:#070A08;box-shadow:0 14px 30px -18px rgba(0,0,0,.95);overflow:hidden;cursor:pointer;text-align:start;color:#F3EEE4;font-family:inherit;padding:0}",
      ".sc-carte .ph{position:relative;height:150px;overflow:hidden}",
      ".sc-carte .ph img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.92) contrast(1.05) brightness(.95) sepia(.07);-webkit-mask-image:linear-gradient(180deg,#000 55%,transparent 100%);mask-image:linear-gradient(180deg,#000 55%,transparent 100%)}",
      ".sc-carte .pan{padding:4px 14px 16px}",
      ".sc-carte .pan b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:21px;line-height:1.15}",
      ".sc-carte .pan span{display:block;font-size:12px;line-height:1.45;color:rgba(243,238,228,.62);margin-top:4px}",
      ".sc-err{margin:14px 0;padding:11px 13px;border-radius:12px;border:1px solid rgba(217,147,158,.4);background:rgba(217,147,158,.07);color:#E6B3BB;font-size:12.5px;line-height:1.5}",
      ".sc-vide{padding:34px 8px;text-align:center;font-size:13px;line-height:1.6;color:rgba(243,238,228,.8)}",
      ".sc-note{font-size:10.5px;line-height:1.5;color:rgba(243,238,228,.42);margin-top:28px}",
      ".nf{position:fixed;inset:0;z-index:10000;background:#070A08;color:#F3EEE4;font-family:'Montserrat',sans-serif;overflow-y:auto;-webkit-overflow-scrolling:touch}",
      ".nf-x{position:absolute;z-index:4;top:calc(env(safe-area-inset-top) + 12px);inset-inline-end:16px;width:44px;height:44px;border-radius:50%;border:1px solid rgba(243,238,228,.3);background:rgba(7,10,8,.45);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0}",
      ".nf-x svg{width:18px;height:18px;stroke:#F3EEE4;fill:none;stroke-width:1.6;stroke-linecap:round}",
      ".nf-in{max-width:680px;margin:0 auto;padding:44px 20px 150px}",
      ".nf-hero .sc-titre h1{font-size:clamp(40px,11vw,58px)}",
      ".nf-metiers{display:grid;grid-template-columns:1fr 1fr;gap:10px}",
      ".nf-me{position:relative;height:96px;border-radius:16px;overflow:hidden;border:1px solid rgba(243,238,228,.08);background:#0D1518;padding:0;cursor:pointer;color:#F3EEE4;text-align:start;font-family:inherit;transition:border-color .2s,box-shadow .2s}",
      ".nf-me img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.85) brightness(.9)}",
      ".nf-me:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(7,10,8,.95) 30%,rgba(7,10,8,.2))}",
      "[dir=rtl] .nf-me:after{background:linear-gradient(270deg,rgba(7,10,8,.95) 30%,rgba(7,10,8,.2))}",
      ".nf-me-t{position:absolute;z-index:2;inset-inline-start:14px;inset-inline-end:10px;top:50%;transform:translateY(-50%)}",
      ".nf-me-t b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-size:20px;font-weight:600;line-height:1.15}",
      ".nf-me-t small{display:block;font-size:11px;color:rgba(243,238,228,.55);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
      ".nf-me.on{border-color:#C9A66B;box-shadow:0 0 0 1px rgba(201,166,107,.35),0 14px 26px -14px rgba(201,166,107,.45)}",
      ".nf-me.on small{color:#E9D9B8}",
      ".nf-puces{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}",
      ".nf-puce{display:inline-flex;align-items:center;gap:7px;min-height:40px;padding:0 14px;border-radius:999px;border:1px solid rgba(243,238,228,.12);background:transparent;color:rgba(243,238,228,.75);font-family:inherit;font-size:12.5px;cursor:pointer}",
      ".nf-puce.on{border-color:#C9A66B;color:#F3EEE4;background:rgba(201,166,107,.07)}",
      ".nf-vac{font-family:'Cormorant Garamond',Georgia,serif;font-size:16.5px;font-weight:600}",
      ".nf-ico{width:17px;height:17px;fill:none;stroke:#C9A66B;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}",
      ".nf-bloc{display:block;margin-top:16px}",
      ".nf-lab{display:block;margin:0 0 8px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:rgba(243,238,228,.5)}",
      ".nf-champ input,.nf-dates input{display:block;width:100%;box-sizing:border-box;border:0;border-bottom:1px solid rgba(201,166,107,.3);background:transparent;color:#F3EEE4;font-family:'Cormorant Garamond',Georgia,serif;font-size:19px;font-weight:600;padding:2px 0 6px;min-height:40px;color-scheme:dark;border-radius:0;-webkit-appearance:none;appearance:none}",
      ".nf-champ input::placeholder{color:rgba(243,238,228,.3);font-style:italic;font-weight:500}",
      ".nf-champ input:focus,.nf-dates input:focus{outline:none;border-bottom-color:#C9A66B}",
      ".nf-dates{display:flex;gap:18px;margin-top:20px}",
      ".nf-d1,.nf-d2{display:block;flex:1;min-width:0}",
      ".nf-d2 input{font-size:16px;color:rgba(243,238,228,.75)}",
      ".nf-chx-t{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:24px}",
      ".nf-tout{background:none;border:none;color:#E9D9B8;font-family:inherit;font-size:13px;cursor:pointer;padding:8px 0;white-space:nowrap}",
      ".nf-chx{display:grid;grid-template-columns:repeat(auto-fill,minmax(60px,1fr));gap:14px 6px;margin-top:8px}",
      ".nf-c{display:flex;flex-direction:column;align-items:center;gap:5px;background:none;border:0;padding:0;color:rgba(243,238,228,.6);font-family:inherit;cursor:pointer;min-width:0}",
      ".nf-v{width:54px;height:54px;border-radius:16px;overflow:hidden;border:1px solid rgba(243,238,228,.1);display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 30% 25%,rgba(201,166,107,.2),#101518 70%);font-family:'Cormorant Garamond',Georgia,serif;font-size:22px;color:#E9D9B8;transition:box-shadow .2s,border-color .2s}",
      ".nf-v img{width:100%;height:100%;object-fit:cover;display:block}",
      ".nf-n{max-width:100%;font-size:10.5px;line-height:1.2;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
      ".nf-c.on .nf-v{border-color:#C9A66B;box-shadow:0 0 0 2px #070A08,0 0 0 3px #C9A66B}",
      ".nf-c.on .nf-n{color:#F3EEE4}",
      ".nf-bilan{margin:20px 0 0;padding:12px 14px;border-radius:14px;border:1px solid rgba(92,135,146,.5);color:#A9CBD3;font-size:13px}",
      ".nf-bas{position:fixed;left:0;right:0;bottom:0;padding:28px 20px calc(env(safe-area-inset-bottom) + 14px);background:linear-gradient(180deg,rgba(7,10,8,0) 0%,rgba(7,10,8,.92) 40%,#070A08 100%)}",
      ".nf-bas-in{max-width:640px;margin:0 auto}",
      ".nf-go{width:100%;min-height:52px;border-radius:999px;border:1px solid #C9A66B;background:rgba(201,166,107,.07);color:#E9D9B8;font-family:inherit;font-size:14.5px;letter-spacing:.04em;cursor:pointer}",
      ".nf-go:disabled{opacity:.4;cursor:default}",
      ".nf-me:focus-visible,.nf-puce:focus-visible,.nf-c:focus-visible,.nf-go:focus-visible,.nf-x:focus-visible,.nf-tout:focus-visible{outline:2px solid #C9A66B;outline-offset:2px}",
      "@media (min-width:700px){.nf-metiers{grid-template-columns:repeat(4,1fr)}.nf-me{height:120px}.nf-in{padding-top:56px}}",
      "@media (prefers-reduced-motion:reduce){.nf-me,.nf-v{transition:none}}",
      "@media (prefers-reduced-motion:reduce){.sc-s-t .c{transition:none}}"
    ].join("\n");
    document.head.appendChild(st);
  }, []);

  React.useEffect(function () {
    var vif = true;
    (async function () {
      try {
        if (typeof supa === "undefined" || !supa || !clubS) { if (vif) setChevaux([]); return; }
        /* select explicite : photo_url (et non photo) - une colonne absente fait echouer TOUTE la requete (16/09, 183) */
        var rc = await supa.from("chevaux").select("id, nom, photo_url, club, user_id").is("supprime_le", null).limit(500);
        if (rc && rc.error) { if (vif) { setErr(String((rc.error && rc.error.message) || rc.error)); setChevaux([]); } return; }
        var gardes = (typeof hypeChevauxDuClub === "function") ? hypeChevauxDuClub((rc && rc.data) || [], clubS) : [];
        gardes.sort(function (a, b) { return String(a.nom || "").trim().localeCompare(String(b.nom || "").trim(), "fr", { sensitivity: "base" }); });
        if (!vif) return;
        setErr(""); setChevaux(gardes);
        var ids = gardes.map(function (c) { return c.id; }).filter(Boolean).slice(0, 300);
        if (!ids.length) { setSoins([]); setPros([]); return; }
        /* UNE requete pour tous les soins de l ecurie (pas une par cheval) */
        var rs = await supa.from("soins_cheval").select("cheval_id, type, titre, date_intervention, date_prochaine, details").in("cheval_id", ids).limit(4000);
        if (!vif) return;
        if (rs && rs.error) setErr(String((rs.error && rs.error.message) || rs.error));
        setSoins((rs && rs.data) || []);
        var rl = await supa.from("cheval_professionnels").select("cheval_id, professionnel_id").in("cheval_id", ids).limit(2000);
        if (!vif) return;
        var liens = (rl && !rl.error && rl.data) || [];
        var pIds = liens.map(function (x) { return x.professionnel_id; }).filter(Boolean).filter(function (v, i, a) { return a.indexOf(v) === i; });
        if (!pIds.length) { setPros([]); return; }
        var rp = await supa.from("professionnels").select("*").in("id", pIds);
        if (!vif) return;
        var parPro = {}; liens.forEach(function (x) { var k = String(x.professionnel_id); (parPro[k] = parPro[k] || {})[String(x.cheval_id)] = 1; });
        setPros(((rp && !rp.error && rp.data) || []).map(function (p) { return Object.assign({}, p, { nCh: Object.keys(parPro[String(p.id)] || {}).length }); }));
      } catch (eS) { if (vif) { setErr(String(eS)); setChevaux(function (v) { return v || []; }); } }
    })();
    return function () { vif = false; };
  }, [clubS, recharge]);

  function retour() { if (peutReculer && retourEcran) { retourEcran(); } else { setEcran("guilde"); } }
  function ouvrir(c) { try { window.__santeCheval = { id: c.id, nom: c.nom || "" }; } catch (eO) { } setEcran("sante-cheval"); }

  var MOIS = [T("janv.", "Jan", "ene.", "genn.", "1月", "Jan.", "يناير", "1月", "jan.", "jan.", "jan.", "янв.", "sty", "1월"), T("févr.", "Feb", "feb.", "febbr.", "2月", "Feb.", "فبراير", "2月", "feb.", "fev.", "feb.", "февр.", "lut", "2월"), T("mars", "Mar", "mar.", "mar.", "3月", "März", "مارس", "3月", "mrt.", "mar.", "mars", "март", "mar", "3월"), T("avr.", "Apr", "abr.", "apr.", "4月", "Apr.", "أبريل", "4月", "apr.", "abr.", "apr.", "апр.", "kwi", "4월"), T("mai", "May", "may.", "mag.", "5月", "Mai", "مايو", "5月", "mei", "mai.", "maj", "май", "maj", "5월"), T("juin", "Jun", "jun.", "giu.", "6月", "Juni", "يونيو", "6月", "jun.", "jun.", "juni", "июнь", "cze", "6월"), T("juil.", "Jul", "jul.", "lug.", "7月", "Juli", "يوليو", "7月", "jul.", "jul.", "juli", "июль", "lip", "7월"), T("août", "Aug", "ago.", "ago.", "8月", "Aug.", "أغسطس", "8月", "aug.", "ago.", "aug.", "авг.", "sie", "8월"), T("sept.", "Sep", "sep.", "set.", "9月", "Sept.", "سبتمبر", "9月", "sep.", "set.", "sep.", "сент.", "wrz", "9월"), T("oct.", "Oct", "oct.", "ott.", "10月", "Okt.", "أكتوبر", "10月", "okt.", "out.", "okt.", "окт.", "paź", "10월"), T("nov.", "Nov", "nov.", "nov.", "11月", "Nov.", "نوفمبر", "11月", "nov.", "nov.", "nov.", "нояб.", "lis", "11월"), T("déc.", "Dec", "dic.", "dic.", "12月", "Dez.", "ديسمبر", "12月", "dec.", "dez.", "dec.", "дек.", "gru", "12월")];
  function jourDe(s) { var m = String(s || "").match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null; }
  function enClair(s) { var d = jourDe(s); return d ? (d.getDate() + " " + MOIS[d.getMonth()] + " " + d.getFullYear()) : ""; }
  function joursAvant(s) { var d = jourDe(s); if (!d) return null; var auj = new Date(); auj.setHours(0, 0, 0, 0); return Math.round((d.getTime() - auj.getTime()) / 86400000); }
  var LIB = {
    vaccin: T("Vaccin", "Vaccine", "Vacuna", "Vaccino", "ワクチン", "Impfung", "لقاح", "疫苗", "Vaccin", "Vacina", "Vaccin", "Прививка", "Szczepionka", "백신"),
    vermifuge: T("Vermifuge", "Deworming", "Vermífugo", "Vermifugo", "駆虫", "Wurmkur", "مضاد الديدان", "驱虫", "Ontwormen", "Vermífugo", "Avmaskning", "Глистогонное", "Odrobaczanie", "구충제"),
    ferrure: T("Ferrure", "Shoeing", "Herraje", "Ferratura", "装蹄", "Beschlag", "تركيب الحدوة", "钉蹄", "Beslag", "Ferrageamento", "Skoning", "Ковка", "Kucie", "장제"),
    parage: T("Parage", "Trimming", "Recorte de cascos", "Pareggio", "削蹄", "Hufbearbeitung", "تقليم الحوافر", "修蹄", "Bekappen", "Casqueamento", "Verkning", "Расчистка", "Werkowanie", "삭제"),
    dentiste: T("Dentiste", "Dentist", "Dentista", "Dentista", "歯科", "Zahnarzt", "طبيب الأسنان", "牙医", "Tandarts", "Dentista", "Tandläkare", "Зубной врач", "Dentysta", "치과")
  };
  function libelle(s) { var k = String(s || "").toLowerCase().trim(); return LIB[k] || (k ? k.charAt(0).toUpperCase() + k.slice(1) : T("Soin", "Care", "Cuidado", "Cura", "ケア", "Pflege", "عناية", "护理", "Verzorging", "Cuidado", "Vård", "Уход", "Opieka", "케어")); }
  function nbChevaux(n) { return n + " " + (n > 1 ? T("chevaux", "horses", "caballos", "cavalli", "頭", "Pferde", "خيول", "匹马", "paarden", "cavalos", "hästar", "лош.", "konie", "마리") : T("cheval", "horse", "caballo", "cavallo", "頭", "Pferd", "حصان", "匹马", "paard", "cavalo", "häst", "лошадь", "koń", "마리")); }

  /* --- calculs : prochaine echeance par cheval, et point par soin --- */
  var liste = chevaux || [];
  var parId = {}; liste.forEach(function (c) { parId[String(c.id)] = c; });
  /* 07/11 : seule compte l echeance du DERNIER soin de chaque sorte (grippe, rhino, tetanos, West Nile, vermifuge, marechal...) :
     un rappel de 2022 deja remplace par un vaccin plus recent ne doit pas faire apparaitre le cheval « en retard » (cas d Aceitunero). */
  var prochaine = null;
  function calcProchaine() {
    var der = {};
    soins.forEach(function (so) {
      var k = String(so.cheval_id || ""); if (!k) return;
      var ty = String(so.type || "").toLowerCase();
      var cats = ty === "vaccin" ? ["grippe", "rhino", "tetanos", "westnile"].filter(function (c) { return dansType(so, c); }) : [ty === "ferrure" || ty === "parage" ? "marechal" : ty];
      if (!cats.length) cats = ["vaccin"];
      cats.forEach(function (c) {
        var cle = k + "|" + c, d = String(so.date_intervention || "");
        if (!der[cle] || d > String(der[cle].date_intervention || "") || (d === String(der[cle].date_intervention || "") && so.date_prochaine && !der[cle].date_prochaine)) der[cle] = so;
      });
    });
    var res = {};
    Object.keys(der).forEach(function (cle) {
      var so = der[cle]; if (!so.date_prochaine) return;
      var k = cle.split("|")[0];
      if (!res[k] || String(so.date_prochaine) < String(res[k].date_prochaine)) res[k] = so;
    });
    return res;
  }
  function etatDe(c) {
    if (!prochaine) prochaine = calcProchaine();
    var so = prochaine[String(c.id)]; if (!so) return { so: null, etat: null, j: null };
    var j = joursAvant(so.date_prochaine);
    return { so: so, j: j, etat: j === null ? null : (j < 0 ? "vr" : (j <= 15 ? "amb" : "pe")) };
  }
  function motRetard(j) {
    if (j < 0) return Math.abs(j) === 1
      ? T("en retard d’un jour", "1 day overdue", "1 día de retraso", "1 giorno di ritardo", "1日過ぎ", "1 Tag überfällig", "متأخر بيوم", "逾期 1 天", "1 dag te laat", "1 dia de atraso", "en dag försenad", "просрочено на день", "1 dzień spóźnienia", "1일 지남")
      : T("en retard de " + Math.abs(j) + " jours", Math.abs(j) + " days overdue", Math.abs(j) + " días de retraso", Math.abs(j) + " giorni di ritardo", Math.abs(j) + "日過ぎ", "seit " + Math.abs(j) + " Tagen fällig", "متأخر بـ " + Math.abs(j) + " أيام", "逾期 " + Math.abs(j) + " 天", Math.abs(j) + " dagen te laat", Math.abs(j) + " dias de atraso", Math.abs(j) + " dagar försenad", "просрочено на " + Math.abs(j) + " дн.", Math.abs(j) + " dni spóźnienia", Math.abs(j) + "일 지남");
    if (j === 0) return T("aujourd’hui", "today", "hoy", "oggi", "今日", "heute", "اليوم", "今天", "vandaag", "hoje", "idag", "сегодня", "dzisiaj", "오늘");
    if (j === 1) return T("demain", "tomorrow", "mañana", "domani", "明日", "morgen", "غدا", "明天", "morgen", "amanhã", "imorgon", "завтра", "jutro", "내일");
    return T("dans " + j + " jours", "in " + j + " days", "en " + j + " días", "tra " + j + " giorni", j + "日後", "in " + j + " Tagen", "بعد " + j + " أيام", "还有 " + j + " 天", "over " + j + " dagen", "em " + j + " dias", "om " + j + " dagar", "через " + j + " дн.", "za " + j + " dni", j + "일 후");
  }
  var RX = { grippe: /grippe|equip\s*f\b|equip\s*ft|proteq|resequin|prequenza|influenza/i, rhino: /rhino|ehv|pneumequin/i, tetanos: /t[ée]tanos|equip\s*ft|prequenza\s*te|flu-?te|tetanus/i, westnile: /wnv|west\s*-?\s*nil|nilo\s*occ|nil\s*occ/i };
  var TYPES = [
    { k: "grippe", pic: "s", t: T("Grippe", "Flu", "Gripe", "Influenza", "インフルエンザ", "Influenza", "الإنفلونزا", "流感", "Griep", "Gripe", "Influensa", "Грипп", "Grypa", "인플루엔자"), vac: true },
    { k: "rhino", pic: "s", t: T("Rhinopneumonie", "Rhinopneumonitis", "Rinoneumonitis", "Rinopolmonite", "鼻肺炎", "Rhinopneumonitis", "التهاب الأنف والرئة", "鼻肺炎", "Rhinopneumonie", "Rinopneumonite", "Rhinopneumonit", "Ринопневмония", "Rhinopneumonia", "비폐렴") , vac: true },
    { k: "tetanos", pic: "s", t: T("Tétanos", "Tetanus", "Tétanos", "Tetano", "破傷風", "Tetanus", "الكزاز", "破伤风", "Tetanus", "Tétano", "Stelkramp", "Столбняк", "Tężec", "파상풍"), vac: true },
    { k: "westnile", pic: "s", t: T("West Nile", "West Nile", "Nilo Occidental", "West Nile", "西ナイル熱", "West-Nil", "غرب النيل", "西尼罗", "West-Nijl", "Nilo Ocidental", "West Nile", "Западный Нил", "Zachodni Nil", "웨스트나일"), vac: true },
    { k: "vermifuge", pic: "p", t: LIB.vermifuge },
    { k: "marechal", pic: "f", t: T("Maréchal", "Farrier", "Herrador", "Maniscalco", "装蹄", "Hufschmied", "البيطار", "钉蹄", "Hoefsmid", "Ferrador", "Hovslagare", "Коваль", "Kowal", "장제") },
    { k: "dentiste", pic: "d", t: LIB.dentiste }
  ];
  function dansType(so, k) {
    var ty = String(so.type || "").toLowerCase(), txt = String(so.titre || "") + " " + String((so.details && so.details.ligne) || "");
    if (k === "vermifuge") return ty === "vermifuge";
    if (k === "marechal") return ty === "ferrure" || ty === "parage" || ty === "marechal";
    if (k === "dentiste") return ty === "dentiste";
    return ty === "vaccin" && RX[k].test(txt);
  }
  var unAn = (function () { var d = new Date(); d.setFullYear(d.getFullYear() - 1); return d.toISOString().slice(0, 10); })();
  var points = TYPES.map(function (ty) {
    var der = "", faits = {};
    soins.forEach(function (so) {
      if (!dansType(so, ty.k)) return;
      var d = String(so.date_intervention || "");
      if (d > der) der = d;
      if (d >= unAn && parId[String(so.cheval_id)]) faits[String(so.cheval_id)] = 1;
    });
    return Object.assign({}, ty, { der: der, faits: liste.filter(function (c) { return faits[String(c.id)]; }) });
  });

  var PIC = {
    s: "M18 2l4 4M20 4l-9.5 9.5M14 4l6 6M15.5 8.5l-9 9-3 1 1-3 9-9M7 13l4 4M3 21l2.5-2.5",
    p: "M10.5 20.5l10-10a4.95 4.95 0 0 0-7-7l-10 10a4.95 4.95 0 0 0 7 7zM8.5 8.5l7 7",
    f: "M6 20H4.5C3.5 15 3 12 3.5 9 4.5 4.5 8 2.5 12 2.5S19.5 4.5 20.5 9c.5 3 0 6-1 11H18c.6-4 1-6.8.5-9C17.8 7.5 15.5 6 12 6S6.2 7.5 5.5 11C5 13.2 5.4 16 6 20z",
    d: "M12 5.5C10.5 4 8.8 3.5 7 3.5 4.5 3.5 3 5.5 3 8c0 2.5 1 4 1.6 6 .6 2.2.9 6.5 2.6 6.5 1.6 0 1.8-3.5 2.4-5.2.4-1 .9-1.3 1.4-1.3h2c.5 0 1 .3 1.4 1.3.6 1.7.8 5.2 2.4 5.2 1.7 0 2-4.3 2.6-6.5C20 12 21 10.5 21 8c0-2.5-1.5-4.5-4-4.5-1.8 0-3.5.5-5 2z"
  };
  function courbe(cls, d) {
    var id = "scg-" + cls;
    return h("svg", { className: "sc-courbe " + cls, viewBox: "0 0 400 100", preserveAspectRatio: "none", "aria-hidden": "true" },
      h("defs", null, h("linearGradient", { id: id, x1: "0", x2: "1", y1: "0", y2: "0" },
        h("stop", { offset: "0", stopColor: TQ, stopOpacity: "0" }), h("stop", { offset: ".45", stopColor: TQ, stopOpacity: ".95" }), h("stop", { offset: "1", stopColor: TQ, stopOpacity: ".15" }))),
      cls === "c2" ? h("path", { d: d + " L400 100 L0 100 Z", fill: "#070A08", stroke: "none" }) : null,
      h("path", { d: d, fill: "none", stroke: "url(#" + id + ")", strokeWidth: 1.1, vectorEffect: "non-scaling-stroke" }));
  }
  function vign(c, taille) {
    var ph = c.photo_url || "";
    return ph ? h("img", { src: (typeof vignetteHype === "function") ? vignetteHype(ph, taille, taille) : ph, alt: "", loading: "lazy", decoding: "async" }) : "🐎";
  }
  function carteCheval(c) {
    var e = etatDe(c), alerte = e.etat === "vr" || e.etat === "amb";
    var ph = c.photo_url ? ((typeof vignetteHype === "function") ? vignetteHype(c.photo_url, 480, 480) : c.photo_url) : "";
    var coul = e.etat === "vr" ? VR : (e.etat === "amb" ? AMB : TQ);
    return h("button", { key: "ch" + c.id, type: "button", className: "sx-ch" + (alerte ? " " + e.etat : ""), onClick: function () { ouvrir(c); } },
      ph ? h("img", { className: "ph", src: ph, alt: "", loading: "lazy", decoding: "async" }) : h("span", { className: "ph vide", "aria-hidden": "true" }, "🐎"),
      h("b", null, c.nom || ""),
      h("span", { className: "g" },
        h("span", null, e.so ? libelle(e.so.type) : T("Prochain", "Next", "Próximo", "Prossimo", "次回", "Nächster", "القادم", "下一次", "Volgende", "Próximo", "Nästa", "Следующий", "Następny", "다음")),
        h("em", { style: { color: e.so ? coul : "rgba(243,238,228,.45)" } }, e.so ? (alerte ? motRetard(e.j) : enClair(e.so.date_prochaine)) : "—")),
      h("span", { className: "c", "aria-hidden": "true" }, "›"));
  }


  /* 08/11 (Blandine, maquette choisie) : la page reprend le style de la page Santé du cheval —
     titres en majuscules espacées avec une petite icône dorée, listes fines encadrées, cartes des chevaux comme le Suivi. */
  var ICOS = {
    alerte: ["M12 3.5l9 16H3z", "M12 10v4.5M12 17.2v.3"],
    cheval: ["M4 20c1-6 3-9 7-10l-1-4 3 2c3 0 6 2 7 6l-2 1-2-2-1 7"],
    soins: ["M5.5 3.5h13v17h-13z", "M8.5 8h7M8.5 12h7M8.5 16h4"],
    equipe: ["M9 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z", "M3.5 19c.6-3.4 2.8-5 5.5-5s4.9 1.6 5.5 5M16 6.5a2.6 2.6 0 1 1 0 5M17.5 14.5c1.8.5 2.8 2 3 4.5"]
  };
  function tete(k, txt, droite) {
    return h("div", { className: "sx-tete" },
      h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, (ICOS[k] || []).map(function (d, i) { return h("path", { key: i, d: d }); })),
      h("div", { className: "t" }, txt), droite || null);
  }
  /* --- les blocs de la page --- */
  var nbCols = ordi ? 5 : (tablette ? 3 : 2);   /* 08/11 : 5 cartes par ligne sur ordinateur (style Suivi) */
  var alertes = liste.map(function (c) { return { c: c, e: etatDe(c) }; }).filter(function (x) { return x.e.etat === "vr" || x.e.etat === "amb"; })
    .sort(function (a, b) { return a.e.j - b.e.j; });

  var blocAlertes = alertes.length ? h("div", { style: { marginBottom: 30 } },
    tete("alerte", T("À surveiller", "To watch", "A vigilar", "Da tenere d’occhio", "要チェック", "Im Blick behalten", "للمتابعة", "需留意", "In de gaten houden", "A vigiar", "Att hålla koll på", "Под наблюдением", "Do obserwacji", "주의 필요")),
    h("div", { className: "sx-boite" }, alertes.map(function (x) {
      var coul = x.e.etat === "vr" ? VR : AMB;
      return h("div", { key: "al" + x.c.id, role: "button", tabIndex: 0, className: "sx-l", onClick: function () { ouvrir(x.c); },
          onKeyDown: function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); ouvrir(x.c); } } },
        h("span", { className: "r" }, vign(x.c, 120)),
        h("span", { className: "n" }, h("b", null, x.c.nom || ""),
          h("span", { style: { color: coul } }, libelle(x.e.so.type) + " · " + enClair(x.e.so.date_prochaine) + " · " + motRetard(x.e.j))),
        h("span", { className: "c", "aria-hidden": "true" }, "›"));
    }))) : null;

  var blocChevaux = h("div", { style: { marginBottom: 30 } },
    h("div", { className: "sx-tete" }, h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, ICOS.cheval.map(function (d, k) { return h("path", { key: k, d: d }); })),
      h("div", { className: "t" }, T("Les chevaux", "The horses", "Los caballos", "I cavalli", "馬たち", "Die Pferde", "الخيول", "马匹", "De paarden", "Os cavalos", "Hästarna", "Лошади", "Konie", "말들")),
      liste.length > nbCols ? h("button", { type: "button", className: "sc-voir", onClick: function () { setTous(!tous); } },
        tous ? T("Réduire", "Show less", "Ver menos", "Riduci", "閉じる", "Weniger", "عرض أقل", "收起", "Minder", "Ver menos", "Visa färre", "Свернуть", "Zwiń", "접기") + " ‹"
             : T("Voir les ", "See all ", "Ver los ", "Vedi tutti i ", "", "Alle ", "عرض الـ ", "查看全部 ", "Bekijk alle ", "Ver os ", "Visa alla ", "Все ", "Zobacz wszystkie ", "") + liste.length + T("", "", "", "", "頭を見る", " ansehen", "", "", "", "", "", "", "", "마리 보기") + " ›") : null),
    (tous || liste.length <= nbCols)
      ? h("div", { className: "sc-grille", style: { gridTemplateColumns: "repeat(" + nbCols + ",minmax(0,1fr))" } }, liste.map(carteCheval))
      : h("div", { className: "sc-rangee" }, liste.map(carteCheval)));

  var blocSoins = h("div", null,
    tete("soins", T("Les soins de l’écurie", "The stable’s care", "Los cuidados de la cuadra", "Le cure della scuderia", "厩舎のケア", "Die Pflege im Stall", "عناية الإسطبل", "马厩护理", "De verzorging van de stal", "Os cuidados da cocheira", "Stallets vård", "Уход в конюшне", "Opieka w stajni", "마구간 관리")),
    h("p", { className: "sc-intro" }, T("Notés dans les 12 derniers mois, sur les ", "Recorded in the last 12 months, out of ", "Registrados en los últimos 12 meses, de ", "Registrati negli ultimi 12 mesi, su ", "過去12か月の記録・全", "In den letzten 12 Monaten eingetragen, von ", "مسجلة خلال آخر 12 شهرًا، من أصل ", "过去 12 个月的记录，共 ", "Ingevuld in de laatste 12 maanden, van de ", "Registrados nos últimos 12 meses, de ", "Registrerade de senaste 12 månaderna, av ", "За последние 12 месяцев, из ", "Zapisane w ostatnich 12 miesiącach, z ", "최근 12개월 기록, 전체 ") + nbChevaux(liste.length) + "."),
    h("div", { className: "sx-boite sx-soins" }, lignesSoins()));

  /* 08/11 (Blandine) : une seule ligne « Vaccins » ; on la touche pour dérouler Grippe, Rhinopneumonie, Tétanos, West Nile */
  function ligneSoin(pt) {
      var ouv = soinOuvert === pt.k, n = pt.faits.length, presque = liste.length && n / liste.length >= 0.8;
      var reste = presque ? liste.filter(function (c) { return pt.faits.indexOf(c) < 0; }) : [];
      return h("div", { key: "so" + pt.k, className: "sc-s sx-s" + (ouv ? " ouv" : "") + (pt.vac ? " sous" : "") },
        h("button", { type: "button", className: "sc-s-t", "aria-expanded": ouv ? "true" : "false", onClick: function () { setSoinOuvert(ouv ? "" : pt.k); } },
          h("span", { className: "p" }, h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: PIC[pt.pic] }))),
          h("span", { className: "x" }, h("b", null, pt.t),
            h("small", null, n ? ((pt.vac ? LIB.vaccin + " · " : "") + nbChevaux(n)) : T("Rien de noté", "Nothing recorded", "Nada registrado", "Niente registrato", "記録なし", "Nichts eingetragen", "لا شيء مسجل", "暂无记录", "Niets ingevuld", "Nada registrado", "Inget registrerat", "Нет записей", "Brak zapisów", "기록 없음"))),
          h("span", { className: "d" + (pt.der ? "" : " vide") }, pt.der ? enClair(pt.der) : "—"),
          h("span", { className: "c", "aria-hidden": "true" }, "›")),
        ouv ? h("div", { className: "sc-s-c" },
          presque && reste.length ? h("div", null,
            h("p", { className: "sc-lab" }, T("Il reste", "Still to do", "Faltan", "Mancano", "残り", "Noch offen", "المتبقي", "还剩", "Nog te doen", "Faltam", "Kvar", "Осталось", "Pozostało", "남은 말") + " · " + reste.length),
            h("div", { className: "sc-chips" }, reste.map(function (c) { return h("button", { key: "r" + c.id, type: "button", className: "sc-chip", onClick: function () { ouvrir(c); } }, c.nom || ""); })))
          : n ? h("div", null,
            h("p", { className: "sc-lab" }, T("Faits", "Done", "Hechos", "Fatti", "済み", "Erledigt", "تمّت", "已完成", "Gedaan", "Feitos", "Klara", "Сделано", "Zrobione", "완료") + " · " + n),
            h("div", { className: "sc-chips" }, pt.faits.map(function (c) { return h("button", { key: "f" + c.id, type: "button", className: "sc-chip ok", onClick: function () { ouvrir(c); } }, c.nom || ""); })))
          : h("p", { className: "sc-lab", style: { textTransform: "none", letterSpacing: 0, fontSize: 12.5 } }, T("Aucun cheval n’a ce soin noté dans les 12 derniers mois.", "No horse has this recorded in the last 12 months.", "Ningún caballo lo tiene registrado en los últimos 12 meses.", "Nessun cavallo lo ha registrato negli ultimi 12 mesi.", "過去12か月に記録された馬はいません。", "Bei keinem Pferd in den letzten 12 Monaten eingetragen.", "لا يوجد حصان مسجل له ذلك خلال آخر 12 شهرًا.", "过去 12 个月没有马匹记录此项。", "Bij geen enkel paard ingevuld in de laatste 12 maanden.", "Nenhum cavalo tem isto registrado nos últimos 12 meses.", "Ingen häst har detta registrerat de senaste 12 månaderna.", "Ни у одной лошади нет записи за 12 месяцев.", "Żaden koń nie ma tego zapisanego w ostatnich 12 miesiącach.", "최근 12개월 동안 기록된 말이 없습니다."))) : null);
  }
  function lignesSoins() {
    var vacs = points.filter(function (pt) { return pt.vac; }), autres = points.filter(function (pt) { return !pt.vac; });
    var faitsV = {}, derV = "";
    /* tous les vaccins comptent ici, même ceux dont la maladie n'est pas précisée (ex. « Vaccins ») */
    soins.forEach(function (so) {
      if (String(so.type || "").toLowerCase() !== "vaccin") return;
      var d = String(so.date_intervention || "");
      if (d > derV) derV = d;
      if (d >= unAn && parId[String(so.cheval_id)]) faitsV[String(so.cheval_id)] = 1;
    });
    var nV = Object.keys(faitsV).length;
    var ligneV = h("div", { key: "so-vac", className: "sc-s sx-s" + (vacOuvert ? " ouv" : "") },
      h("button", { type: "button", className: "sc-s-t", "aria-expanded": vacOuvert ? "true" : "false", onClick: function () { setVacOuvert(!vacOuvert); if (vacOuvert) setSoinOuvert(""); } },
        h("span", { className: "p" }, h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: PIC.s }))),
        h("span", { className: "x" }, h("b", null, T("Vaccins", "Vaccines", "Vacunas", "Vaccini", "ワクチン", "Impfungen", "اللقاحات", "疫苗", "Vaccins", "Vacinas", "Vacciner", "Прививки", "Szczepienia", "백신")),
          h("small", null, nV ? nbChevaux(nV) : T("Rien de noté", "Nothing recorded", "Nada registrado", "Niente registrato", "記録なし", "Nichts eingetragen", "لا شيء مسجل", "暂无记录", "Niets ingevuld", "Nada registrado", "Inget noterat", "Ничего не записано", "Nic nie zapisano", "기록 없음"))),
        h("span", { className: "d" + (derV ? "" : " vide") }, derV ? enClair(derV) : "—"),
        h("span", { className: "c", "aria-hidden": "true" }, "›")));
    return [ligneV].concat(vacOuvert ? vacs.map(ligneSoin) : [], autres.map(ligneSoin));
  }

  var ROLES = (typeof hypeRolesSoins === "function") ? hypeRolesSoins(T) : {};
  var ORDRE = (typeof HYPE_ROLES_ORDRE !== "undefined" && HYPE_ROLES_ORDRE) ? HYPE_ROLES_ORDRE : ["veterinaire", "marechal", "osteopathe", "dentiste"];
  var lignesEq = [];
  ORDRE.forEach(function (r) {
    var ps = pros.filter(function (p) { return String(p.role || "") === r; }).sort(function (a, b) { return (b.nCh || 0) - (a.nCh || 0); });
    var img = "images/sante-pro-" + r + ".webp";
    if (!ps.length) lignesEq.push(h("div", { key: "eq" + r, className: "sc-eq-l" }, h("span", { className: "r vide" }, h("img", { src: img, alt: "", loading: "lazy" })),   /* 08/11 : la photo du métier aussi sur case vide */
      h("div", { className: "n" }, h("b", null, ROLES[r] || r), h("span", { className: "or" }, T("À ajouter depuis la page Santé d’un cheval", "Add it from a horse’s Health page", "Añádelo desde la página Salud de un caballo", "Aggiungilo dalla pagina Salute di un cavallo", "馬の健康ページから追加", "Über die Gesundheitsseite eines Pferdes hinzufügen", "أضِفه من صفحة صحة أحد الخيول", "在某匹马的健康页面中添加", "Toevoegen via de gezondheidspagina van een paard", "Adicione pela página Saúde de um cavalo", "Lägg till från en hästs hälsosida", "Добавьте на странице здоровья лошади", "Dodaj na stronie Zdrowie konia", "말의 건강 페이지에서 추가")))));
    ps.forEach(function (p) {
      lignesEq.push(h("div", { key: "eq" + p.id, className: "sc-eq-l plein" }, h("span", { className: "r" }, h("img", { src: img, alt: "", loading: "lazy" })),
        h("div", { className: "n" }, h("b", null, p.nom || ""), h("span", null, (ROLES[r] || r) + " · " + nbChevaux(p.nCh || 0))),
        p.tel ? h("a", { className: "sx-tel", href: "tel:" + String(p.tel).replace(/\s+/g, ""), "aria-label": T("Appeler", "Call", "Llamar", "Chiama", "電話", "Anrufen", "اتصال", "拨打电话", "Bellen", "Ligar", "Ring", "Позвонить", "Zadzwoń", "전화") + " " + String(p.tel) }, h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" }))) : null));
    });
  });
  var blocEquipe = h("div", null,
    tete("equipe", T("L’équipe de soins", "The care team", "El equipo de cuidados", "La squadra di cura", "ケアチーム", "Das Pflegeteam", "فريق العناية", "护理团队", "Het verzorgingsteam", "A equipe de cuidados", "Vårdteamet", "Команда ухода", "Zespół opieki", "케어 팀")),
    h("div", { className: "sc-eq" }, lignesEq));

  var ICOB = { hb: "M4 5h16v11H9l-5 4zM8 10.5h.01M12 10.5h.01M16 10.5h.01", mag: "M12 6c-2-1.5-5-2-8-1.5V19c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V4.5c-3-.5-6 0-8 1.5zM12 6v14.5", reg: "M6 3.5h9l3 3v14H6zM9 9h6M9 13h6M9 17h4" };
  function carte(cle, img, titre, sous, onTap) {   /* 08/11 : bandeaux comme sur la page Santé du cheval (photo bien visible à droite) */
    return h("button", { key: cle, type: "button", className: "sx-band" + (cle === "reg" ? " reg" : ""), onClick: onTap },
      h("img", { src: img, alt: "", loading: "lazy", decoding: "async" }),
      h("span", { className: "r" }, h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: ICOB[cle] }))),
      h("span", { className: "x" }, h("b", null, titre), h("span", null, sous)));
  }

  var blocCartes = h("div", { className: "sx-bands" },
    carte("hb", "images/sante-bandeau-heybaby.webp", T("Demander à Hey Baby", "Ask Hey Baby", "Preguntar a Hey Baby", "Chiedi a Hey Baby", "Hey Baby に聞く", "Hey Baby fragen", "اسأل Hey Baby", "问问 Hey Baby", "Vraag het aan Hey Baby", "Perguntar ao Hey Baby", "Fråga Hey Baby", "Спросить Hey Baby", "Zapytaj Hey Baby", "Hey Baby에게 묻기"),
      T("Une question sur la santé de tes chevaux ?", "A question about your horses’ health?", "¿Una pregunta sobre la salud de tus caballos?", "Una domanda sulla salute dei tuoi cavalli?", "馬の健康について質問がありますか？", "Eine Frage zur Gesundheit deiner Pferde?", "سؤال عن صحة خيولك؟", "关于你的马匹健康有疑问吗？", "Een vraag over de gezondheid van je paarden?", "Uma pergunta sobre a saúde dos seus cavalos?", "En fråga om dina hästars hälsa?", "Вопрос о здоровье твоих лошадей?", "Pytanie o zdrowie twoich koni?", "말들의 건강에 대해 궁금한 점이 있나요?"),
      function () { try { window.__hbPrefill = T("J'ai une question sur la santé des chevaux de ", "I have a question about the health of the horses at ", "Tengo una pregunta sobre la salud de los caballos de ", "Ho una domanda sulla salute dei cavalli di ", "", "Ich habe eine Frage zur Gesundheit der Pferde von ", "لدي سؤال عن صحة خيول ", "我有一个关于马厩马匹健康的问题：", "Ik heb een vraag over de gezondheid van de paarden van ", "Tenho uma dúvida sobre a saúde dos cavalos de ", "Jag har en fråga om hälsan hos hästarna på ", "У меня вопрос о здоровье лошадей ", "Mam pytanie o zdrowie koni w ", "마구간 말들의 건강에 대해 질문이 있어요: ") + clubS + T(" : ", ": ", ": ", ": ", " の馬の健康について質問があります：", ": ", ": ", ": ", ": ", ": ", ": ", ": ", ": ", ": "); } catch (eP) { } setEcran("assistant"); }),
    carte("mag", "images/sante-bandeau-magazine.webp", T("Le magazine santé", "The health magazine", "La revista de salud", "La rivista salute", "健康マガジン", "Das Gesundheitsmagazin", "مجلة الصحة", "健康杂志", "Het gezondheidsmagazine", "A revista de saúde", "Hälsomagasinet", "Журнал о здоровье", "Magazyn zdrowia", "건강 매거진"),
      T("Nos articles et conseils", "Our articles and advice", "Nuestros artículos y consejos", "I nostri articoli e consigli", "記事とアドバイス", "Unsere Artikel und Tipps", "مقالاتنا ونصائحنا", "我们的文章与建议", "Onze artikelen en tips", "Nossos artigos e conselhos", "Våra artiklar och råd", "Наши статьи и советы", "Nasze artykuły i porady", "기사와 조언"),
      function () { setEcran("sante"); }),
    carte("reg", "images/galop7-tmp-19-ecurie-couchant.webp", T("Le registre d’élevage", "The holding register", "El registro de explotación", "Il registro di allevamento", "飼養台帳", "Das Bestandsregister", "سجل الحيازة", "饲养登记簿", "Het bedrijfsregister", "O registro de criação", "Djurhållningsregistret", "Журнал содержания", "Rejestr hodowli", "사육 대장"),
      T("Les 7 parties, à imprimer chaque trimestre", "All 7 parts, to print every quarter", "Las 7 partes, para imprimir cada trimestre", "Le 7 parti, da stampare ogni trimestre", "7つの項目、四半期ごとに印刷", "Alle 7 Teile, jedes Quartal zum Ausdrucken", "الأجزاء السبعة، للطباعة كل ثلاثة أشهر", "7 个部分，每季度打印", "De 7 delen, elk kwartaal af te drukken", "As 7 partes, para imprimir a cada trimestre", "Alla 7 delar, att skriva ut varje kvartal", "7 разделов, печать каждый квартал", "7 części do drukowania co kwartał", "7개 항목, 분기마다 인쇄"),
      function () { try { window.__gestionClub = clubS; window.__santeClub = { nom: clubS }; } catch (eR) { } setEcran("registre"); }));

  var corps;
  if (chevaux === null) corps = h("div", { className: "sc-vide" }, "…");
  else if (!liste.length) corps = h("div", { className: "sc-vide" }, T("Aucun cheval rattaché à l’écurie pour l’instant.", "No horse attached to the stable yet.", "Ningún caballo vinculado a la cuadra.", "Nessun cavallo collegato alla scuderia.", "まだ馬がいません。", "Noch keine Pferde im Stall.", "لا توجد خيول مرتبطة بالإسطبل بعد.", "马厩还没有关联的马匹。", "Nog geen paarden gekoppeld aan de stal.", "Nenhum cavalo vinculado à cocheira ainda.", "Inga hästar kopplade till stallet ännu.", "К конюшне пока не привязана ни одна лошадь.", "Do stajni nie przypisano jeszcze żadnego konia.", "아직 마구간에 연결된 말이 없습니다."));
  else corps = h("div", null, blocAlertes, blocChevaux, ordi ? h("div", { className: "sx-deux" }, h("div", null, blocSoins), h("div", null, blocEquipe)) : h("div", null, blocSoins, blocEquipe), blocCartes,
    h("div", { className: "sc-note" }, T("Hype t’aide à tenir ton registre à jour et à ne rien oublier. Le registre reste sous ta responsabilité de détenteur.", "Hype helps you keep your register up to date. The register remains your responsibility as keeper.", "Hype te ayuda a mantener tu registro al día. El registro sigue siendo tu responsabilidad como titular.", "Hype ti aiuta a tenere aggiornato il registro. Il registro resta sotto la tua responsabilità di detentore.", "Hype は台帳の更新を手伝います。台帳の責任は飼養者にあります。", "Hype hilft dir, dein Register aktuell zu halten. Das Register bleibt in deiner Verantwortung als Halter.", "يساعدك Hype على تحديث سجلك. يبقى السجل من مسؤوليتك بصفتك الحائز.", "Hype 帮你保持登记簿更新。登记簿仍由你作为饲养人负责。", "Hype helpt je je register bij te houden. Het register blijft jouw verantwoordelijkheid als houder.", "O Hype ajuda você a manter o registro em dia. O registro continua sob sua responsabilidade de detentor.", "Hype hjälper dig att hålla registret uppdaterat. Registret är fortfarande ditt ansvar som djurhållare.", "Hype помогает вести журнал. Ответственность за журнал остаётся за владельцем.", "Hype pomaga prowadzić rejestr. Rejestr pozostaje na twojej odpowiedzialności jako posiadacza.", "Hype가 대장 관리를 도와줍니다. 대장의 책임은 사육자에게 있습니다.")));

  var page = h("div", { className: "sc" },
    h("div", { className: "sx-fond", "aria-hidden": "true" }),
    /* 08/11 (Blandine) : haut de page comme la page Santé du cheval — « SANTÉ & SOINS », le nom de l’écurie, le nombre de chevaux */
    h("div", { className: "sx-hero" },
      h("div", { className: "ph" }, h("img", { src: "images/theme-sante-bai-repos.webp", alt: "", fetchPriority: "high" })),
      (typeof SelecteurLangue === "function") ? h("div", { className: "sc-langue" }, h(SelecteurLangue, { compact: true })) : null,
      h("button", { type: "button", className: "sx-rond", onClick: retour, "aria-label": T("Retour", "Back", "Volver", "Indietro", "戻る", "Zurück", "رجوع", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wstecz", "뒤로") },
        h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: "M15 5l-7 7 7 7" }))),
      h("div", { className: "nom" },
        h("div", { className: "k" }, T("Santé & soins", "Health & care", "Salud y cuidados", "Salute e cure", "健康とケア", "Gesundheit & Pflege", "الصحة والعناية", "健康与护理", "Gezondheid & verzorging", "Saúde & cuidados", "Hälsa & vård", "Здоровье и уход", "Zdrowie i opieka", "건강 & 케어")),
        h("h1", null, clubS || T("Santé", "Health", "Salud", "Salute", "健康", "Gesundheit", "الصحة", "健康", "Gezondheid", "Saúde", "Hälsa", "Здоровье", "Zdrowie", "건강")),
        liste.length ? h("div", { className: "s" }, nbChevaux(liste.length)) : null)),
    h("div", { className: "sc-in" },
      h("p", { className: "sx-phrase" }, T("Prendre soin, c’est déjà aimer.", "Caring is already loving.", "Cuidar ya es amar.", "Prendersi cura è già amare.", "世話をすることは、もう愛すること。", "Sich kümmern heißt schon lieben.", "الرعاية حبٌّ بالفعل.", "照顾，就是爱。", "Zorgen is al liefhebben.", "Cuidar já é amar.", "Att ta hand om är redan att älska.", "Заботиться — значит уже любить.", "Troszczyć się to już kochać.", "돌보는 것이 곧 사랑입니다.")),
      liste.length ? h("div", { className: "sx-cases" },
        h("button", { type: "button", className: "sx-case", onClick: function () { setNoterOuvert(true); } }, h("b", null, h("i", null, "+"), T("Noter un soin", "Record a treatment", "Registrar un cuidado", "Registra una cura", "ケアを記録", "Pflege eintragen", "تسجيل عناية", "记录护理", "Verzorging noteren", "Registrar um cuidado", "Notera en vård", "Записать уход", "Zapisz zabieg", "케어 기록")), h("span", null, T("Pour plusieurs chevaux à la fois", "For several horses at once", "Para varios caballos a la vez", "Per più cavalli insieme", "複数の馬にまとめて", "Für mehrere Pferde auf einmal", "لعدة خيول دفعة واحدة", "一次为多匹马", "Voor meerdere paarden tegelijk", "Para vários cavalos de uma vez", "För flera hästar samtidigt", "Сразу для нескольких лошадей", "Dla kilku koni naraz", "여러 말을 한 번에"))),
        h("button", { type: "button", className: "sx-case", onClick: function () { setImportOuvert(true); } }, h("b", null, h("i", null, "+"), T("Importer des soins", "Import care records", "Importar cuidados", "Importa cure", "ケア記録の取り込み", "Pflege importieren", "استيراد العناية", "导入护理记录", "Verzorging importeren", "Importar cuidados", "Importera vård", "Импорт записей", "Importuj zabiegi", "관리 기록 가져오기")), h("span", null, T("Tableau, liste du vétérinaire…", "Spreadsheet, vet’s list…", "Tabla, lista del veterinario…", "Tabella, elenco del veterinario…", "表、獣医のリスト…", "Tabelle, Liste des Tierarztes…", "جدول، قائمة الطبيب البيطري…", "表格、兽医清单…", "Tabel, lijst van de dierenarts…", "Planilha, lista do veterinário…", "Tabell, veterinärens lista…", "Таблица, список ветеринара…", "Tabela, lista weterynarza…", "표, 수의사 목록…")))) : null,
      h((typeof HypeVoileSantePremium === "function") ? HypeVoileSantePremium : "div", null,
        err ? h("div", { className: "sc-err" }, T("Les chevaux ou les soins de l’écurie n’ont pas pu être lus : ", "The stable’s horses or care could not load: ", "No se pudieron cargar los caballos o cuidados: ", "Impossibile caricare cavalli o cure: ", "馬またはケアを読み込めませんでした：", "Pferde oder Pflege nicht geladen: ", "تعذّر تحميل الخيول أو العناية: ", "无法加载马匹或护理：", "Paarden of verzorging konden niet laden: ", "Não foi possível carregar cavalos ou cuidados: ", "Hästar eller vård kunde inte laddas: ", "Не удалось загрузить лошадей или уход: ", "Nie udało się wczytać koni lub zabiegów: ", "말 또는 관리 기록을 불러오지 못했습니다: ") + err) : null,
        corps)),
    noterOuvert ? h(NoterPlusieurs, { T: T, chevaux: liste, onFermer: function () { setNoterOuvert(false); }, onEnregistre: function () { setRecharge(function (n) { return n + 1; }); } }) : null,
    importOuvert && typeof ImportSoinsClub === "function" ? h(ImportSoinsClub, { T: T, chevaux: liste, onFermer: function () { setImportOuvert(false); }, onEnregistre: function () { setRecharge(function (n) { return n + 1; }); } }) : null);
  return page;
}
window.HypeSanteClub = { SanteClub: EcranSanteClub };
})();
