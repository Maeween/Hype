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
  var prochaine = {};
  soins.forEach(function (so) {
    var k = String(so.cheval_id || ""); if (!k || !so.date_prochaine) return;
    if (!prochaine[k] || String(so.date_prochaine) < String(prochaine[k].date_prochaine)) prochaine[k] = so;
  });
  function etatDe(c) {
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
    var e = etatDe(c);
    var sous = e.etat === "vr" || e.etat === "amb" ? motRetard(e.j)
      : (e.etat === "pe" ? libelle(e.so.type) + " · " + enClair(e.so.date_prochaine)
        : T("Aucune échéance", "No due date", "Sin vencimiento", "Nessuna scadenza", "予定なし", "Keine Fälligkeit", "لا يوجد موعد", "没有到期日", "Geen vervaldatum", "Sem data prevista", "Inget förfallodatum", "Нет срока", "Brak terminu", "예정 없음"));
    return h("button", { key: "ch" + c.id, type: "button", className: "sc-ch" + (e.etat === "vr" || e.etat === "amb" ? " " + e.etat : ""), onClick: function () { ouvrir(c); } },
      h("span", { className: "im" }, vign(c, 360)),
      h("b", null, c.nom || ""),
      h("small", { className: e.etat || "" }, sous));
  }

  /* --- les blocs de la page --- */
  var nbCols = ordi ? 4 : (tablette ? 3 : 2);
  var alertes = liste.map(function (c) { return { c: c, e: etatDe(c) }; }).filter(function (x) { return x.e.etat === "vr" || x.e.etat === "amb"; })
    .sort(function (a, b) { return a.e.j - b.e.j; });

  var blocAlertes = alertes.length ? h("div", null,
    h("div", { className: "sc-h2" }, h("h2", null, T("À surveiller", "To watch", "A vigilar", "Da tenere d’occhio", "要チェック", "Im Blick behalten", "للمتابعة", "需留意", "In de gaten houden", "A vigiar", "Att hålla koll på", "Под наблюдением", "Do obserwacji", "주의 필요"))),
    alertes.map(function (x) {
      var coul = x.e.etat === "vr" ? VR : AMB;
      return h("div", { key: "al" + x.c.id, role: "button", tabIndex: 0, className: "sc-verre sc-alerte" + (x.e.etat === "amb" ? " amb" : ""), onClick: function () { ouvrir(x.c); },
          onKeyDown: function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); ouvrir(x.c); } } },
        h("span", { className: "v" }, vign(x.c, 200)),
        h("div", { className: "t" }, h("b", null, x.c.nom || ""),
          h("span", { style: { color: coul } }, libelle(x.e.so.type) + " · " + enClair(x.e.so.date_prochaine)),
          h("i", { style: { color: coul } }, motRetard(x.e.j))),
        h("span", { style: { color: TQ, fontSize: 18 } }, "›"));
    })) : null;

  var blocChevaux = h("div", null,
    h("div", { className: "sc-h2" },
      h("h2", null, T("Les chevaux", "The horses", "Los caballos", "I cavalli", "馬たち", "Die Pferde", "الخيول", "马匹", "De paarden", "Os cavalos", "Hästarna", "Лошади", "Konie", "말들")),
      liste.length > nbCols ? h("button", { type: "button", className: "sc-voir", onClick: function () { setTous(!tous); } },
        tous ? T("Réduire", "Show less", "Ver menos", "Riduci", "閉じる", "Weniger", "عرض أقل", "收起", "Minder", "Ver menos", "Visa färre", "Свернуть", "Zwiń", "접기") + " ‹"
             : T("Voir les ", "See all ", "Ver los ", "Vedi tutti i ", "", "Alle ", "عرض الـ ", "查看全部 ", "Bekijk alle ", "Ver os ", "Visa alla ", "Все ", "Zobacz wszystkie ", "") + liste.length + T("", "", "", "", "頭を見る", " ansehen", "", "", "", "", "", "", "", "마리 보기") + " ›") : null),
    (tous || liste.length <= nbCols)
      ? h("div", { className: "sc-grille", style: { gridTemplateColumns: "repeat(" + nbCols + ",minmax(0,1fr))" } }, liste.map(carteCheval))
      : h("div", { className: "sc-rangee" }, liste.map(carteCheval)));

  var blocSoins = h("div", null,
    h("div", { className: "sc-h2" }, h("h2", null, T("Les soins de l’écurie", "The stable’s care", "Los cuidados de la cuadra", "Le cure della scuderia", "厩舎のケア", "Die Pflege im Stall", "عناية الإسطبل", "马厩护理", "De verzorging van de stal", "Os cuidados da cocheira", "Stallets vård", "Уход в конюшне", "Opieka w stajni", "마구간 관리"))),
    h("p", { className: "sc-intro" }, T("Notés dans les 12 derniers mois, sur les ", "Recorded in the last 12 months, out of ", "Registrados en los últimos 12 meses, de ", "Registrati negli ultimi 12 mesi, su ", "過去12か月の記録・全", "In den letzten 12 Monaten eingetragen, von ", "مسجلة خلال آخر 12 شهرًا، من أصل ", "过去 12 个月的记录，共 ", "Ingevuld in de laatste 12 maanden, van de ", "Registrados nos últimos 12 meses, de ", "Registrerade de senaste 12 månaderna, av ", "За последние 12 месяцев, из ", "Zapisane w ostatnich 12 miesiącach, z ", "최근 12개월 기록, 전체 ") + nbChevaux(liste.length) + "."),
    h("div", { className: "sc-soins" }, points.map(function (pt) {
      var ouv = soinOuvert === pt.k, n = pt.faits.length, presque = liste.length && n / liste.length >= 0.8;
      var reste = presque ? liste.filter(function (c) { return pt.faits.indexOf(c) < 0; }) : [];
      return h("div", { key: "so" + pt.k, className: "sc-verre sc-s" + (ouv ? " ouv" : "") },
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
    })));

  var ROLES = (typeof hypeRolesSoins === "function") ? hypeRolesSoins(T) : {};
  var ORDRE = (typeof HYPE_ROLES_ORDRE !== "undefined" && HYPE_ROLES_ORDRE) ? HYPE_ROLES_ORDRE : ["veterinaire", "marechal", "osteopathe", "dentiste"];
  var lignesEq = [];
  ORDRE.forEach(function (r) {
    var ps = pros.filter(function (p) { return String(p.role || "") === r; }).sort(function (a, b) { return (b.nCh || 0) - (a.nCh || 0); });
    var img = "images/sante-pro-" + r + ".webp";
    if (!ps.length) lignesEq.push(h("div", { key: "eq" + r, className: "sc-eq-l" }, h("span", { className: "r" }, "+"),
      h("div", { className: "n" }, h("b", null, ROLES[r] || r), h("span", { className: "or" }, T("À ajouter depuis la page Santé d’un cheval", "Add it from a horse’s Health page", "Añádelo desde la página Salud de un caballo", "Aggiungilo dalla pagina Salute di un cavallo", "馬の健康ページから追加", "Über die Gesundheitsseite eines Pferdes hinzufügen", "أضِفه من صفحة صحة أحد الخيول", "在某匹马的健康页面中添加", "Toevoegen via de gezondheidspagina van een paard", "Adicione pela página Saúde de um cavalo", "Lägg till från en hästs hälsosida", "Добавьте на странице здоровья лошади", "Dodaj na stronie Zdrowie konia", "말의 건강 페이지에서 추가")))));
    ps.forEach(function (p) {
      lignesEq.push(h("div", { key: "eq" + p.id, className: "sc-eq-l plein" }, h("span", { className: "r" }, h("img", { src: img, alt: "", loading: "lazy" })),
        h("div", { className: "n" }, h("b", null, p.nom || ""), h("span", null, (ROLES[r] || r) + " · " + nbChevaux(p.nCh || 0))),
        p.tel ? h("a", { href: "tel:" + String(p.tel).replace(/\s+/g, ""), style: { color: TQ, fontSize: 13, textDecoration: "none" } }, String(p.tel)) : null));
    });
  });
  var blocEquipe = h("div", null,
    h("div", { className: "sc-eq-t" }, h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("circle", { cx: 12, cy: 8, r: 3.5, fill: "none", stroke: TQ, strokeWidth: 1.6 }), h("path", { d: "M5 20c.8-3.8 3.6-5.5 7-5.5s6.2 1.7 7 5.5M5.5 11a2.5 2.5 0 1 1 0-.1M18.5 11a2.5 2.5 0 1 1 0-.1", fill: "none", stroke: TQ, strokeWidth: 1.6, strokeLinecap: "round" })),
      h("div", null, T("L’équipe de soins", "The care team", "El equipo de cuidados", "La squadra di cura", "ケアチーム", "Das Pflegeteam", "فريق العناية", "护理团队", "Het verzorgingsteam", "A equipe de cuidados", "Vårdteamet", "Команда ухода", "Zespół opieki", "케어 팀"))),
    h("div", { className: "sc-eq" }, lignesEq));

  function carte(cle, img, titre, sous, onTap) {
    return h("button", { key: cle, type: "button", className: "sc-carte", onClick: onTap },
      h("span", { className: "ph" }, h("img", { src: img, alt: "", loading: "lazy", decoding: "async", style: { objectPosition: "85% 50%" } })),
      h("span", { className: "pan" }, h("b", null, titre), h("span", null, sous)));
  }
  var blocCartes = h("div", { className: "sc-cartes", style: { gridTemplateColumns: tablette ? "repeat(3,minmax(0,1fr))" : "minmax(0,1fr)" } },
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
  else corps = h("div", null, blocAlertes, blocChevaux, blocSoins, blocEquipe, blocCartes,
    h("div", { className: "sc-note" }, T("Hype t’aide à tenir ton registre à jour et à ne rien oublier. Le registre reste sous ta responsabilité de détenteur.", "Hype helps you keep your register up to date. The register remains your responsibility as keeper.", "Hype te ayuda a mantener tu registro al día. El registro sigue siendo tu responsabilidad como titular.", "Hype ti aiuta a tenere aggiornato il registro. Il registro resta sotto la tua responsabilità di detentore.", "Hype は台帳の更新を手伝います。台帳の責任は飼養者にあります。", "Hype hilft dir, dein Register aktuell zu halten. Das Register bleibt in deiner Verantwortung als Halter.", "يساعدك Hype على تحديث سجلك. يبقى السجل من مسؤوليتك بصفتك الحائز.", "Hype 帮你保持登记簿更新。登记簿仍由你作为饲养人负责。", "Hype helpt je je register bij te houden. Het register blijft jouw verantwoordelijkheid als houder.", "O Hype ajuda você a manter o registro em dia. O registro continua sob sua responsabilidade de detentor.", "Hype hjälper dig att hålla registret uppdaterat. Registret är fortfarande ditt ansvar som djurhållare.", "Hype помогает вести журнал. Ответственность за журнал остаётся за владельцем.", "Hype pomaga prowadzić rejestr. Rejestr pozostaje na twojej odpowiedzialności jako posiadacza.", "Hype가 대장 관리를 도와줍니다. 대장의 책임은 사육자에게 있습니다.")));

  var page = h("div", { className: "sc" },
    h("div", { className: "sc-hero" },
      (typeof SelecteurLangue === "function") ? h("div", { className: "sc-langue" }, h(SelecteurLangue, { compact: true })) : null,
      h("button", { type: "button", className: "sc-rond", onClick: retour, "aria-label": T("Retour", "Back", "Volver", "Indietro", "戻る", "Zurück", "رجوع", "返回", "Terug", "Voltar", "Tillbaka", "Назад", "Wstecz", "뒤로") },
        h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: "M15 5l-7 7 7 7" }))),
      courbe("c1", "M250 4 C 330 8, 385 40, 400 96"),
      h("div", { className: "sc-photo" }, h("img", { src: "images/theme-sante-bai-repos.webp", alt: "", fetchPriority: "high" })),
      courbe("c2", "M0 92 C 130 90, 240 62, 400 8"),
      h("div", { className: "sc-in" }, h("div", { className: "sc-titre" },
        h("h1", null, T("Santé", "Health", "Salud", "Salute", "健康", "Gesundheit", "الصحة", "健康", "Gezondheid", "Saúde", "Hälsa", "Здоровье", "Zdrowie", "건강")),
        h("p", null, T("Prendre soin, c’est déjà aimer.", "Caring is already loving.", "Cuidar ya es amar.", "Prendersi cura è già amare.", "世話をすることは、もう愛すること。", "Sich kümmern heißt schon lieben.", "الرعاية حبٌّ بالفعل.", "照顾，就是爱。", "Zorgen is al liefhebben.", "Cuidar já é amar.", "Att ta hand om är redan att älska.", "Заботиться — значит уже любить.", "Troszczyć się to już kochać.", "돌보는 것이 곧 사랑입니다."))))),
    h("div", { className: "sc-in" },
      h("div", { className: "sc-ligne" },
        h("div", { className: "sc-mes" }, h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: "M3 11l9-7 9 7" }), h("path", { d: "M5 10v10h14V10" }), h("path", { d: "M10 20v-6h4v6" })), h("span", null, clubS)),
        liste.length ? h("button", { type: "button", className: "sc-imp", onClick: function () { setImportOuvert(true); } },
          T("Importer des soins", "Import care records", "Importar cuidados", "Importa cure", "ケア記録の取り込み", "Pflege importieren", "استيراد العناية", "导入护理记录", "Verzorging importeren", "Importar cuidados", "Importera vård", "Импорт записей", "Importuj zabiegi", "관리 기록 가져오기")) : null),
      h((typeof HypeVoileSantePremium === "function") ? HypeVoileSantePremium : "div", null,
        err ? h("div", { className: "sc-err" }, T("Les chevaux ou les soins de l’écurie n’ont pas pu être lus : ", "The stable’s horses or care could not load: ", "No se pudieron cargar los caballos o cuidados: ", "Impossibile caricare cavalli o cure: ", "馬またはケアを読み込めませんでした：", "Pferde oder Pflege nicht geladen: ", "تعذّر تحميل الخيول أو العناية: ", "无法加载马匹或护理：", "Paarden of verzorging konden niet laden: ", "Não foi possível carregar cavalos ou cuidados: ", "Hästar eller vård kunde inte laddas: ", "Не удалось загрузить лошадей или уход: ", "Nie udało się wczytać koni lub zabiegów: ", "말 또는 관리 기록을 불러오지 못했습니다: ") + err) : null,
        corps)),
    importOuvert && typeof ImportSoinsClub === "function" ? h(ImportSoinsClub, { T: T, chevaux: liste, onFermer: function () { setImportOuvert(false); }, onEnregistre: function () { setRecharge(function (n) { return n + 1; }); } }) : null);
  return page;
}
window.HypeSanteClub = { SanteClub: EcranSanteClub };
})();
