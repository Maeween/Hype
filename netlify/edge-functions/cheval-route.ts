/* ============================================================================
   HYPE ▸ netlify/edge-functions/cheval-route.ts — 09/10/2026 (référencement, builds 3e, 4, 5, 6 et 9A)
   L'ADRESSE PUBLIQUE D'UN CHEVAL : https://2hype.fr/cheval/<adresse>

   CE QUE FAIT CE FICHIER (et RIEN d'autre)
   1. Il lit l'adresse demandée (ex. /cheval/rizotto-d-emery) et vérifie sa
      forme : minuscules, chiffres, tirets. Sinon → 404.
   2. Il cherche le cheval qui porte cette adresse (colonne chevaux.slug),
      avec la clé PUBLIQUE de Supabase (la même que story-apercu.ts).
   3. Il vérifie que le cheval peut être montré : non supprimé, pas marqué
      « prive », et au moins une photo OU un résultat visible (visible = true
      et pas masqué par la cavalière). Sinon → 404 (on ne dit jamais qu'un
      cheval privé existe).
   4. Si la base ne répond pas (ou trop lentement) → 503 « réessayez ».
   5. Sinon, il renvoie la page Hype NORMALE (la même index.html que
      2hype.fr), en y glissant UNE seule ligne juste après <head><meta charset> :
        <base href="/">  → l'appli va chercher ses fichiers à la racine ;
        window.__HYPE_ROUTE_CHEVAL = "<uuid>" → l'appli ouvre la fiche de ce
        cheval (aiguillage ajouté au build 759).
      L'adresse /cheval/<adresse> RESTE affichée dans la barre.

   BUILD 4 (09/10) — CE QUE GOOGLE LIT EN HAUT DE LA PAGE :
     <title>      « Nom – Race | Hype » (ou « Nom – Profil cheval | Hype » sans race),
                  qui REMPLACE le <title>Hype</title> d'origine (un seul titre) ;
     description  phrase faite UNIQUEMENT de vraies données : nom, race, année
                  de naissance (origines officielles), écurie, puis ce que la fiche
                  contient (profil, photos, origines, résultats) ; aucun nom de
                  cavalier. Build 9A (09/10) : PLUS AUCUN NOMBRE de résultats (il
                  pouvait différer du compteur de la fiche, qui suit sa propre règle) ;
     canonical    https://2hype.fr/cheval/<adresse> (toujours 2hype.fr, même
                  ouvert depuis 2hype.netlify.app).

   BUILD 5 (09/10) — L'APERÇU DANS WHATSAPP, MESSAGES, FACEBOOK, X… (Open Graph) :
     og:title / og:description / og:url (= canonical) / og:image / og:type,
     et les équivalents twitter:. Photo = la PHOTO PRINCIPALE du cheval
     (chevaux.photo_url — choix de Blandine du 09/10), agrandie à 1200 px par
     Supabase comme pour les stories ; pas de photo (ou photo non publiable,
     ex. data:) → l'icône Hype icon-512.png (⚠️ partage-apercu.jpg, utilisé par
     story.html, n'existe PAS sur le dépôt : non utilisé ici).

   BUILD 6 (09/10) — LE TEXTE QUE GOOGLE LIT DANS LA PAGE :
     un bloc <main id="seo-cheval"> glissé DANS <div id="root"> : nom (h1),
     surnom, race, sexe, robe, naissance, père × mère, écurie, puis les
     résultats visibles (50 plus récents : date, concours, épreuve, classement,
     partants, mention). AUCUN nom de cavalier ; ni naisseur, ni histoire
     (textes libres qui peuvent contenir des noms de personnes).
     L'appli, en démarrant, REMPLACE ce bloc par la vraie fiche (createRoot) :
     c'est la même information, en texte simple. Pendant le chargement, le bloc
     est placé sous l'écran « Hype — chargement… » (rien ne change à l'œil).

   12/10/2026 — RÉFÉRENCEMENT, ACTION 1 (liens entre les pages) :
     dans le texte pour Google, « Écurie : X » devient un LIEN vers la page
     publique de l'écurie (https://2hype.fr/ecurie/<adresse>), trouvée dans
     ecuries.json avec la même clé que l'appli (sans accents, minuscules).
     Si le nom ne correspond à AUCUNE écurie, ou à PLUSIEURS (38 noms en double
     dans l'annuaire), on laisse le simple texte, comme avant. Annuaire illisible
     → texte simple, la fiche part quand même. Rien ne change à l'écran : ce
     bloc est remplacé par la vraie fiche au démarrage de l'appli.

   CE QU'IL NE FAIT PAS (builds suivants) : sitemap, robots.txt, cache.

   ⚠️ LE GROS FICHIER N'EST PAS RELU : on ne lit que le début de la page
   (jusqu'à <head>, vers 200 Ko), on ajoute la ligne, et tout le reste
   (environ 9,4 Mo) part tel quel, morceau par morceau, sans être touché.
   ========================================================================= */

import type { Context } from "https://edge.netlify.com";

const SUPABASE_URL = "https://ldpjebgtskzdokrublfg.supabase.co";
const CLE = "sb_publishable_OoSj7bDnqn2O36myBAXF1g_VjPki8TK";

// 13/10/2026 : aussi /en/cheval/…, /es/…, /it/…, /de/…, /ja/…, /ar/… (pages traduites)
const FORME_ADRESSE = /^\/(?:(en|es|it|de|ja|ar|zh|nl|pt|sv|ru)\/)?cheval\/([a-z0-9]+(?:-[a-z0-9]+)*)$/;
const FORME_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const REPERE = new TextEncoder().encode('<head><meta charset="utf-8">');
const REPERE_TITRE = new TextEncoder().encode("<title>Hype</title>");   // build 4 : remplacé par le titre du cheval
const REPERE_RACINE = new TextEncoder().encode('<div id="root">');      // build 6 : le texte pour Google va juste après
const NB_RESULTATS_TEXTE = 50;
const DOMAINE = "https://2hype.fr";

/* ---------- 13/10/2026 : les 8 langues de la page (textes autour des données ; noms, races, épreuves restent tels quels) ---------- */
type Lg = "fr" | "en" | "es" | "it" | "de" | "ja" | "ar" | "zh" | "nl" | "pt" | "sv" | "ru";
const LANGUES: Lg[] = ["fr", "en", "es", "it", "de", "ja", "ar", "zh", "nl", "pt", "sv", "ru"];
const LOCALE: Record<Lg, string> = { fr: "fr_FR", en: "en_GB", es: "es_ES", it: "it_IT", de: "de_DE", ja: "ja_JP", ar: "ar_AR", zh: "zh_CN", nl: "nl_NL", pt: "pt_BR", sv: "sv_SE", ru: "ru_RU" };
/* code interne → code de langue HTML / hreflang (le chinois simplifié s'écrit zh-Hans) */
const HL: Record<Lg, string> = { fr: "fr", en: "en", es: "es", it: "it", de: "de", ja: "ja", ar: "ar", zh: "zh-Hans", nl: "nl", pt: "pt-BR", sv: "sv", ru: "ru" };
const prefixe = (lg: Lg) => (lg === "fr" ? "" : "/" + lg);
const TX: Record<Lg, Record<string, any>> = {
  fr: { profil: "Profil cheval", mots: ["Profil", "photos", "origines", "résultats en concours"], et: " et ", sur: " sur Hype.", surnom: "Surnom", ne: (d: string) => "né(e) le " + d, neAn: (a: string) => "né(e) en " + a, neBrut: (t: string) => "né(e) le " + t, origines: "Origines", ecurie: "Écurie", resultats: "Résultats en concours", rang: (n: number) => (n === 1 ? "1er" : n + "e"), partants: (n: number) => " sur " + n + " partants", sf: "sans faute", autres: "… et d’autres résultats sur Hype.", cheval: "Cheval" },
  en: { profil: "Horse profile", mots: ["Profile", "photos", "pedigree", "competition results"], et: " and ", sur: " on Hype.", surnom: "Nickname", ne: (d: string) => "born " + d, neAn: (a: string) => "born in " + a, neBrut: (t: string) => "born " + t, origines: "Pedigree", ecurie: "Stable", resultats: "Competition results", rang: (n: number) => n + (n % 100 >= 11 && n % 100 <= 13 ? "th" : n % 10 === 1 ? "st" : n % 10 === 2 ? "nd" : n % 10 === 3 ? "rd" : "th"), partants: (n: number) => " of " + n + " starters", sf: "clear round", autres: "… and more results on Hype.", cheval: "Horse" },
  es: { profil: "Perfil del caballo", mots: ["Perfil", "fotos", "orígenes", "resultados en concursos"], et: " y ", sur: " en Hype.", surnom: "Apodo", ne: (d: string) => "nacido/a el " + d, neAn: (a: string) => "nacido/a en " + a, neBrut: (t: string) => "nacido/a el " + t, origines: "Orígenes", ecurie: "Cuadra", resultats: "Resultados en concursos", rang: (n: number) => n + ".º", partants: (n: number) => " de " + n + " participantes", sf: "sin faltas", autres: "… y más resultados en Hype.", cheval: "Caballo" },
  it: { profil: "Profilo del cavallo", mots: ["Profilo", "foto", "origini", "risultati in concorso"], et: " e ", sur: " su Hype.", surnom: "Soprannome", ne: (d: string) => "nato/a il " + d, neAn: (a: string) => "nato/a nel " + a, neBrut: (t: string) => "nato/a il " + t, origines: "Origini", ecurie: "Scuderia", resultats: "Risultati in concorso", rang: (n: number) => n + "°", partants: (n: number) => " su " + n + " partenti", sf: "percorso netto", autres: "… e altri risultati su Hype.", cheval: "Cavallo" },
  de: { profil: "Pferdeprofil", mots: ["Profil", "Fotos", "Abstammung", "Turnierergebnisse"], et: " und ", sur: " auf Hype.", surnom: "Rufname", ne: (d: string) => "geboren am " + d, neAn: (a: string) => "geboren " + a, neBrut: (t: string) => "geboren " + t, origines: "Abstammung", ecurie: "Stall", resultats: "Turnierergebnisse", rang: (n: number) => n + ".", partants: (n: number) => " von " + n + " Startern", sf: "fehlerfrei", autres: "… und weitere Ergebnisse auf Hype.", cheval: "Pferd" },
  ja: { profil: "馬のプロフィール", mots: ["プロフィール", "写真", "血統", "競技成績"], et: "、", sur: "をHypeで。", surnom: "愛称", ne: (d: string) => d + "生まれ", neAn: (a: string) => a + "年生まれ", neBrut: (t: string) => t + "生まれ", origines: "血統", ecurie: "厩舎", resultats: "競技成績", rang: (n: number) => n + "位", partants: (n: number) => "（出走" + n + "頭）", sf: "減点なし", autres: "…ほかの成績はHypeで。", cheval: "馬" },
  ar: { profil: "ملف الحصان", mots: ["الملف", "الصور", "النسب", "نتائج المسابقات"], et: " و", sur: " على Hype.", surnom: "اللقب", ne: (d: string) => "مولود في " + d, neAn: (a: string) => "مولود عام " + a, neBrut: (t: string) => "مولود في " + t, origines: "النسب", ecurie: "الإسطبل", resultats: "نتائج المسابقات", rang: (n: number) => "المركز " + n, partants: (n: number) => " من أصل " + n + " مشاركًا", sf: "دون أخطاء", autres: "… ونتائج أخرى على Hype.", cheval: "حصان" },
  zh: { profil: "马匹档案", mots: ["档案", "照片", "血统", "比赛成绩"], et: "和", sur: "，尽在Hype。", surnom: "昵称", ne: (d: string) => d + "出生", neAn: (a: string) => a + "年出生", neBrut: (t: string) => t + "出生", origines: "血统", ecurie: "马厩", resultats: "比赛成绩", rang: (n: number) => "第" + n + "名", partants: (n: number) => "（共" + n + "名参赛）", sf: "零罚分", autres: "……更多成绩尽在Hype。", cheval: "马" },
  nl: { profil: "Paardenprofiel", mots: ["Profiel", "foto's", "afstamming", "wedstrijdresultaten"], et: " en ", sur: " op Hype.", surnom: "Bijnaam", ne: (d: string) => "geboren op " + d, neAn: (a: string) => "geboren in " + a, neBrut: (t: string) => "geboren " + t, origines: "Afstamming", ecurie: "Stal", resultats: "Wedstrijdresultaten", rang: (n: number) => n + "e", partants: (n: number) => " van " + n + " deelnemers", sf: "foutloos", autres: "… en meer resultaten op Hype.", cheval: "Paard" },
  pt: { profil: "Perfil do cavalo", mots: ["Perfil", "fotos", "genealogia", "resultados de provas"], et: " e ", sur: " no Hype.", surnom: "Apelido", ne: (d: string) => "nascido em " + d, neAn: (a: string) => "nascido em " + a, neBrut: (t: string) => "nascido " + t, origines: "Genealogia", ecurie: "Cocheira", resultats: "Resultados de provas", rang: (n: number) => n + "º", partants: (n: number) => " de " + n + " participantes", sf: "sem faltas", autres: "… e mais resultados no Hype.", cheval: "Cavalo" },
  sv: { profil: "Hästprofil", mots: ["Profil", "foton", "härstamning", "tävlingsresultat"], et: " och ", sur: " på Hype.", surnom: "Smeknamn", ne: (d: string) => "född " + d, neAn: (a: string) => "född " + a, neBrut: (t: string) => "född " + t, origines: "Härstamning", ecurie: "Stall", resultats: "Tävlingsresultat", rang: (n: number) => n + ((n % 10 === 1 || n % 10 === 2) && n % 100 !== 11 && n % 100 !== 12 ? ":a" : ":e"), partants: (n: number) => " av " + n + " startande", sf: "felfri runda", autres: "… och fler resultat på Hype.", cheval: "Häst" },
  ru: { profil: "Профиль лошади", mots: ["Профиль", "фото", "родословная", "результаты соревнований"], et: " и ", sur: " на Hype.", surnom: "Кличка", ne: (d: string) => "дата рождения: " + d, neAn: (a: string) => "год рождения: " + a, neBrut: (t: string) => "дата рождения: " + t, origines: "Родословная", ecurie: "Конюшня", resultats: "Результаты соревнований", rang: (n: number) => n + "-е", partants: (n: number) => " из " + n + " участников", sf: "без ошибок", autres: "… и другие результаты на Hype.", cheval: "Лошадь" },
};
/* Sexe : même lecture que l'appli (sexeEnClair) ; valeur inconnue → telle quelle. */
function sexeLg(v: unknown, lg: Lg): string {
  const k = String(v || "").toLowerCase().trim();
  if (!k) return "";
  const J: Record<Lg, string> = { fr: "Jument", en: "Mare", es: "Yegua", it: "Giumenta", de: "Stute", ja: "牝馬", ar: "فرس", zh: "母马", nl: "Merrie", pt: "Égua", sv: "Sto", ru: "Кобыла" };
  const H: Record<Lg, string> = { fr: "Hongre", en: "Gelding", es: "Castrado", it: "Castrone", de: "Wallach", ja: "せん馬", ar: "حصان مخصي", zh: "骟马", nl: "Ruin", pt: "Castrado", sv: "Valack", ru: "Мерин" };
  const E: Record<Lg, string> = { fr: "Entier", en: "Stallion", es: "Entero", it: "Stallone", de: "Hengst", ja: "牡馬", ar: "فحل", zh: "种公马", nl: "Hengst", pt: "Garanhão", sv: "Hingst", ru: "Жеребец" };
  if (lg === "fr") return String(v).trim();   // le français reste exactement comme avant
  if (k === "f" || k.startsWith("jument") || k.startsWith("femelle") || k.startsWith("pouliche")) return J[lg];
  if (k === "h" || k.startsWith("hongre")) return H[lg];
  if (k === "m" || k.startsWith("entier") || k.startsWith("etalon") || k.startsWith("étalon") || k.startsWith("male") || k.startsWith("mâle")) return E[lg];
  return String(v).trim();
}
/* Robe : les plus courantes ; une robe inconnue reste en français plutôt que d'être devinée. */
const ROBES: Record<string, Record<Exclude<Lg, "fr">, string>> = {
  "bai": { en: "bay", es: "castaño", it: "baio", de: "Brauner", ja: "鹿毛", ar: "كميت", zh: "骝毛", nl: "bruin", pt: "castanho", sv: "brun", ru: "гнедая" },
  "bai brun": { en: "dark bay", es: "castaño oscuro", it: "baio scuro", de: "Dunkelbrauner", ja: "黒鹿毛", ar: "كميت داكن", zh: "深骝毛", nl: "donkerbruin", pt: "castanho escuro", sv: "mörkbrun", ru: "темно-гнедая" },
  "alezan": { en: "chestnut", es: "alazán", it: "sauro", de: "Fuchs", ja: "栗毛", ar: "أشقر", zh: "栗毛", nl: "vos", pt: "alazão", sv: "fux", ru: "рыжая" },
  "alezan brule": { en: "liver chestnut", es: "alazán tostado", it: "sauro bruciato", de: "Dunkelfuchs", ja: "栃栗毛", ar: "أشقر داكن", zh: "深栗毛", nl: "donkervos", pt: "alazão tostado", sv: "mörk fux", ru: "караковая" },
  "noir": { en: "black", es: "negro", it: "morello", de: "Rappe", ja: "青毛", ar: "أدهم", zh: "黑毛", nl: "zwart", pt: "preto", sv: "svart", ru: "вороная" },
  "gris": { en: "grey", es: "tordo", it: "grigio", de: "Schimmel", ja: "芦毛", ar: "أشهب", zh: "青毛", nl: "schimmel", pt: "tordilho", sv: "grå", ru: "серая" },
  "pie": { en: "pinto", es: "pío", it: "pezzato", de: "Schecke", ja: "駁毛", ar: "أبلق", zh: "花毛", nl: "bont", pt: "pampa", sv: "skäckig", ru: "пегая" },
  "palomino": { en: "palomino", es: "palomino", it: "palomino", de: "Palomino", ja: "パロミノ", ar: "بالومينو", zh: "帕洛米诺毛色", nl: "palomino", pt: "palomino", sv: "palomino", ru: "паломино" },
};
function robeLg(v: unknown, lg: Lg): string {
  const brut = propre(v);
  if (!brut || lg === "fr") return brut;
  const k = brut.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
  return (ROBES[k] && ROBES[k][lg as Exclude<Lg, "fr">]) || brut;
}
function dateLg(j: string, mo: string, a: string, lg: Lg): string { return lg === "ja" || lg === "zh" ? a + "/" + mo + "/" + j : j + "/" + mo + "/" + a; }
/* Les 8 adresses d'une même page, pour Google (hreflang) — x-default = le français. */
function liensLangues(chemin: string): string {
  return LANGUES.map((l) => `<link rel="alternate" hreflang="${HL[l]}" href="${DOMAINE}${prefixe(l)}${chemin}">`).join("") +
    `<link rel="alternate" hreflang="x-default" href="${DOMAINE}${chemin}">`;
}
const LECTURE_MAX = 2 * 1024 * 1024;   // si le repère n'est pas dans les 2 premiers Mo : on s'arrête
const DELAI_BASE_MS = 2500;

/* ---------- 12/10 : l'annuaire des écuries (le même fichier qu'ecurie-route.ts) ---------- */
let ANNUAIRE: Promise<Record<string, { n: string }>> | null = null;
function annuaire(origine: string): Promise<Record<string, { n: string }>> {
  if (!ANNUAIRE) {
    ANNUAIRE = fetch(new URL("/ecuries.json", origine)).then((r) => {
      if (!r.ok) throw new Error("ecuries.json http " + r.status);
      return r.json();
    }).catch((e) => { ANNUAIRE = null; throw e; });
  }
  return ANNUAIRE;
}
/* 12/10/2026 : pages « Centres équestres de l'Essonne (91) » (outils/seo-departements.cjs) : code → [adresse, « de l'Essonne »].
   Même fichier qu'ecurie-route.ts ; jamais bloquant. */
let DEPARTEMENTS: Promise<Record<string, [string, string]>> | null = null;
function departements(origine: string): Promise<Record<string, [string, string]>> {
  if (!DEPARTEMENTS) {
    DEPARTEMENTS = fetch(new URL("/fr/centres-equestres/departements.json", origine))
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => { DEPARTEMENTS = null; return {}; });
  }
  return DEPARTEMENTS;
}
/* 12/10/2026 : le chemin pour Google (fil d'Ariane) Hype › Centres équestres › département › écurie › cheval.
   Seulement quand l'écurie du cheval est trouvée sans doute possible et n'est pas écartée du référencement. */
async function filAriane(ecurieSlug: string, nomCheval: string, urlCheval: string, origine: string, lg: Lg = "fr"): Promise<string> {
  if (!ecurieSlug) return "";
  try {
    const ec: any = (await annuaire(origine))[ecurieSlug];
    if (!ec || ec.x === 1 || !propre(ec.n)) return "";
    const deps = await departements(origine).catch(() => ({} as Record<string, [string, string]>));
    const dep = propre(ec.d), pageDep = deps[dep];
    // les pages par département n'existent qu'en français : dans les autres langues, Hype › écurie › cheval
    const fil: unknown[] = [{ "@type": "ListItem", position: 1, name: "Hype", item: DOMAINE + "/" + lg + "/" }];
    if (lg === "fr") {
      fil.push({ "@type": "ListItem", position: 2, name: "Centres équestres", item: DOMAINE + "/fr/centres-equestres/" });
      if (pageDep) fil.push({ "@type": "ListItem", position: 3, name: "Centres équestres " + pageDep[1] + " (" + dep + ")", item: pageDep[0] });
    }
    fil.push({ "@type": "ListItem", position: fil.length + 1, name: propre(ec.n), item: DOMAINE + prefixe(lg) + "/ecurie/" + ecurieSlug });
    fil.push({ "@type": "ListItem", position: fil.length + 1, name: nomCheval, item: urlCheval });
    return `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: fil }).replace(/</g, "\\u003c")}</script>`;
  } catch { return ""; }
}
/* La clé d'un club, EXACTEMENT comme l'appli (clefClubG) et ecurie-route.ts. */
function clefClub(n: unknown): string {
  return String(n || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
}
/* L'adresse publique de l'écurie du cheval : une seule correspondance, sinon "". */
async function adresseEcurie(club: string, origine: string): Promise<string> {
  const clef = clefClub(club);
  if (!clef || clef === "__perso__") return "";
  try {
    const an = await annuaire(origine);
    let trouve = "";
    for (const s in an) {
      if (clefClub(an[s] && an[s].n) !== clef) continue;
      if (trouve) return "";          // nom en double dans l'annuaire : on ne devine pas
      trouve = s;
    }
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(trouve) ? trouve : "";
  } catch (e) {
    console.log("[cheval-route] annuaire :", String(e));
    return "";
  }
}

/* ---------- Petites pages d'erreur (8 langues, sans dépendre de l'appli) ---------- */
function pageSimple(statut: number, lignes: string[][], titre: string): Response {
  const corps = lignes.map(([lang, txt]) =>
    `<p lang="${HL[lang as Lg]}"${lang === "ar" ? ' dir="rtl"' : ""}>${txt}</p>`).join("\n");
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>${titre}</title>
<style>body{margin:0;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;background:#060709;color:#E8E2D4;font-family:Georgia,serif;text-align:center;padding:24px}
p{margin:4px 0;font-size:15px;line-height:1.5}p:first-child{font-size:20px;margin-bottom:12px}
a{margin-top:22px;color:#060709;background:#D9B97A;padding:12px 26px;border-radius:999px;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:14px}</style>
</head><body>
${corps}
<a href="https://2hype.fr/">Hype</a>
</body></html>`;
  const entetes = new Headers({ "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
  if (statut === 503) entetes.set("retry-after", "120");
  return new Response(html, { status: statut, headers: entetes });
}

const PAGE_404 = () => pageSimple(404, [
  ["fr", "Ce cheval n’est pas disponible."],
  ["en", "This horse is not available."],
  ["es", "Este caballo no está disponible."],
  ["it", "Questo cavallo non è disponibile."],
  ["de", "Dieses Pferd ist nicht verfügbar."],
  ["ja", "この馬は表示できません。"],
  ["ar", "هذا الحصان غير متاح."],
  ["zh", "这匹马暂时无法显示。"],
  ["nl", "Dit paard is niet beschikbaar."],
  ["pt", "Este cavalo não está disponível."],
  ["sv", "Den här hästen är inte tillgänglig."],
  ["ru", "Эта лошадь недоступна."],
], "Hype");

const PAGE_503 = () => pageSimple(503, [
  ["fr", "Hype est momentanément indisponible. Réessaie dans un instant."],
  ["en", "Hype is temporarily unavailable. Please try again shortly."],
  ["es", "Hype no está disponible por el momento. Inténtalo de nuevo en un instante."],
  ["it", "Hype è momentaneamente non disponibile. Riprova tra un attimo."],
  ["de", "Hype ist vorübergehend nicht erreichbar. Versuche es gleich noch einmal."],
  ["ja", "Hypeは一時的に利用できません。しばらくしてからもう一度お試しください。"],
  ["ar", "هايب غير متاح مؤقتًا. حاول مرة أخرى بعد قليل."],
  ["zh", "Hype 暂时无法使用，请稍后再试。"],
  ["nl", "Hype is tijdelijk niet beschikbaar. Probeer het zo meteen opnieuw."],
  ["pt", "O Hype está temporariamente indisponível. Tente novamente em instantes."],
  ["sv", "Hype är tillfälligt otillgängligt. Försök igen om en stund."],
  ["ru", "Hype временно недоступен. Попробуй ещё раз через минуту."],
], "Hype");

/* ---------- Build 4 : titre, description, canonical ---------- */
function echapper(t: string): string {
  return String(t || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
/* Build 5 : l'image d'aperçu. Même transformation Supabase que story-apercu.ts
   (1200 px de large, sans recadrage). Une photo non utilisable → icône Hype. */
const IMAGE_HYPE = DOMAINE + "/icon-512.png";
function imageApercu(brut: unknown): string {
  const u = String(brut || "").trim();
  if (!u || u.startsWith("data:") || u.startsWith("blob:")) return IMAGE_HYPE;
  let abs = u;
  if (u.startsWith("//")) abs = "https:" + u;
  else if (!/^https?:\/\//i.test(u)) abs = DOMAINE + "/" + u.replace(/^\.?\/+/, "");
  if (abs.includes("/storage/v1/object/public/") && !abs.includes("/render/image/")) {
    abs = abs.replace("/storage/v1/object/public/", "/storage/v1/render/image/public/") +
      (abs.includes("?") ? "&" : "?") + "width=1200&resize=contain&quality=80";
  }
  return abs;
}
function propre(t: unknown): string { return String(t == null ? "" : t).replace(/\s+/g, " ").trim(); }

function infosSeo(cheval: any, nbResultats: number, slug: string, lg: Lg = "fr") {
  const t = TX[lg];
  const nom = propre(cheval.nom) || t.cheval;
  const race = propre(cheval.race);
  let origines: any = cheval.origines;
  try { if (typeof origines === "string") origines = JSON.parse(origines); } catch { origines = null; }
  // l'année de naissance, quelle que soit l'écriture : « 2005-05-07 », « 2005 » ou « 07/05/2005 » (correctif 09/10)
  const mAn = String((origines && origines.naissance) || "").match(/(?:^|\D)((?:19|20)\d{2})(?:\D|$)/);
  const annee = mAn ? mAn[1] : "";
  const clubBrut = propre(cheval.club) || propre(cheval.ecurie);
  const club = (clubBrut && clubBrut !== "__perso__") ? clubBrut : "";

  const titre = nom + " – " + (race || t.profil) + " | Hype";

  let phrase = nom;
  if (race) phrase += ", " + race;
  if (annee) phrase += " (" + annee + ")";
  if (club) phrase += " — " + club;
  phrase += lg === "ja" || lg === "zh" ? "。" : ". ";
  // Build 9A : ce que contient la fiche, SANS chiffre, seulement ce qui existe vraiment.
  const contenu = [t.mots[0]];
  if (propre(cheval.photo_url)) contenu.push(t.mots[1]);
  if (origines && (nomParent(origines.pere) || nomParent(origines.mere))) contenu.push(t.mots[2]);
  if (nbResultats > 0) contenu.push(t.mots[3]);
  const virgule = lg === "ja" || lg === "zh" ? "、" : lg === "ar" ? "، " : ", ";
  const liste = contenu.length === 1 ? contenu[0]
    : contenu.slice(0, -1).join(virgule) + t.et + contenu[contenu.length - 1];
  phrase += liste + t.sur;

  return { titre, description: phrase, canonical: DOMAINE + prefixe(lg) + "/cheval/" + slug, image: imageApercu(cheval.photo_url), nom, lg, chemin: "/cheval/" + slug };
}

/* ---------- Build 6 : le texte de la fiche pour Google ---------- */
function texte(t: unknown): string { return echapper(propre(t)); }
function dateFr(d: unknown, annee: unknown, lg: Lg = "fr"): string {
  const m = String(d || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return dateLg(m[3], m[2], m[1], lg);
  return propre(annee);
}
function rang(place: unknown, classement: unknown, lg: Lg = "fr"): string {
  const n = parseInt(String(place == null ? "" : place), 10);
  if (isFinite(n) && n > 0) return TX[lg].rang(n);
  return propre(classement);
}
/* 13/10/2026 : un parent est enregistré soit comme un nom, soit comme { nom, … } (comme l'appli : og.pere.nom || og.pere).
   Avant ce correctif, le second cas s'écrivait « [object Object] » dans le texte lu par Google. */
function nomParent(p: unknown): string {
  if (p && typeof p === "object") return propre((p as any).nom);
  return propre(p);
}
function blocTexte(cheval: any, nbResultats: number, resultats: any[], ecurieSlug = "", lg: Lg = "fr"): string {
  const t = TX[lg];
  let og: any = cheval.origines;
  try { if (typeof og === "string") og = JSON.parse(og); } catch { og = null; }
  og = og || {};
  const nom = propre(cheval.nom) || t.cheval;
  const infos: string[] = [];
  if (propre(cheval.race)) infos.push(texte(cheval.race));
  if (propre(og.sexe)) infos.push(texte(sexeLg(og.sexe, lg)));
  if (propre(og.robe)) infos.push(texte(robeLg(og.robe, lg)));
  const naiss = String(og.naissance || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (naiss) infos.push(t.ne(dateLg(naiss[3], naiss[2], naiss[1], lg)));
  else if (propre(og.naissance)) infos.push(/^\d{4}$/.test(propre(og.naissance)) ? t.neAn(texte(og.naissance)) : t.neBrut(texte(og.naissance)));
  const club = (propre(cheval.club) || propre(cheval.ecurie));
  let html = `<main id="seo-cheval" lang="${HL[lg]}"${lg === "ar" ? ' dir="rtl"' : ""} style="padding:64vh 20px 48px;max-width:720px;margin:0 auto;color:#9aa1ab;font:14px/1.6 Georgia,serif">`;
  html += `<h1 style="font-size:22px;color:#d8d2c4;margin:0 0 6px">${texte(nom)}</h1>`;
  const dp = lg === "fr" ? " : " : lg === "ja" || lg === "zh" ? "：" : ": ";
  if (propre(cheval.alias)) html += `<p>${t.surnom}${dp}${texte(cheval.alias)}</p>`;
  if (infos.length) html += `<p>${infos.join(" · ")}</p>`;
  const pereN = nomParent(og.pere), mereN = nomParent(og.mere);
  if (pereN || mereN) html += `<p>${t.origines}${dp}${texte(pereN) || "?"} × ${texte(mereN) || "?"}</p>`;
  if (club && club !== "__perso__") {
    // 12/10 : lien vers la page publique de l'écurie quand elle est trouvée sans ambiguïté
    html += ecurieSlug
      ? `<p>${t.ecurie}${dp}<a href="${DOMAINE}${prefixe(lg)}/ecurie/${ecurieSlug}">${texte(club)}</a></p>`
      : `<p>${t.ecurie}${dp}${texte(club)}</p>`;
  }
  if (nbResultats > 0) {
    html += `<h2 style="font-size:17px;color:#d8d2c4;margin:22px 0 6px">${t.resultats}</h2><ul style="padding-left:18px;margin:0">`;
    for (const r of resultats) {
      const morceaux = [dateFr(r.date_epreuve, r.annee, lg), texte(r.concours), texte(r.epreuve)].filter(Boolean);
      const cl = rang(r.place, r.classement, lg);
      let fin = cl ? texte(cl) : "";
      const pa = parseInt(String(r.partants == null ? "" : r.partants), 10);
      if (fin && isFinite(pa) && pa > 0) fin += t.partants(pa);
      if (propre(r.mention)) fin += (fin ? (lg === "ja" || lg === "zh" ? "、" : lg === "ar" ? "، " : ", ") : "") + (/^sf$/i.test(propre(r.mention)) ? t.sf : texte(r.mention));
      if (fin) morceaux.push(fin);
      if (morceaux.length) html += `<li>${morceaux.join(" — ")}</li>`;
    }
    html += `</ul>`;
    if (nbResultats > resultats.length) html += `<p>${t.autres}</p>`;   // build 9A : sans nombre
  }
  html += `</main>`;
  return html;
}

/* ---------- Lecture Supabase (clé publique) ---------- */
async function lire(chemin: string, signal: AbortSignal): Promise<any[]> {
  const r = await fetch(SUPABASE_URL + "/rest/v1/" + chemin, {
    headers: { apikey: CLE, Authorization: "Bearer " + CLE },
    signal,
  });
  if (!r.ok) throw new Error("supabase-http-" + r.status);
  return await r.json();
}

/* Résultats visibles : le nombre exact (en-tête Content-Range « 0-49/181 ») et les
   50 plus récents. Colonnes choisies : AUCUNE colonne de cavalier n'est demandée. */
async function lireResultats(chevalId: string, signal: AbortSignal): Promise<{ n: number; lignes: any[] }> {
  const r = await fetch(SUPABASE_URL + "/rest/v1/resultats?cheval_id=eq." + encodeURIComponent(chevalId) +
    "&visible=is.true&masque_cavaliere=not.is.true" +
    "&select=concours,epreuve,date_epreuve,annee,classement,place,partants,mention" +
    "&order=date_epreuve.desc.nullslast,created_at.desc", {
    headers: { apikey: CLE, Authorization: "Bearer " + CLE, Prefer: "count=exact", Range: "0-" + (NB_RESULTATS_TEXTE - 1) },
    signal,
  });
  if (r.status === 416) { try { await r.body?.cancel(); } catch { /* rien */ } return { n: 0, lignes: [] }; }
  if (!r.ok) throw new Error("supabase-http-" + r.status);
  const lignes = await r.json();
  const total = (r.headers.get("content-range") || "").split("/")[1];
  const n = parseInt(total || "0", 10);
  return { n: isFinite(n) && n > 0 ? n : (Array.isArray(lignes) ? lignes.length : 0), lignes: Array.isArray(lignes) ? lignes : [] };
}

/* ---------- Recherche d'une suite d'octets ---------- */
function chercher(tas: Uint8Array, motif: Uint8Array): number {
  const n = tas.length - motif.length;
  const premier = motif[0];
  for (let i = 0; i <= n; i++) {
    if (tas[i] !== premier) continue;
    let ok = true;
    for (let j = 1; j < motif.length; j++) { if (tas[i + j] !== motif[j]) { ok = false; break; } }
    if (ok) return i;
  }
  return -1;
}

function coller(a: Uint8Array, b: Uint8Array): Uint8Array {
  const c = new Uint8Array(a.length + b.length);
  c.set(a, 0); c.set(b, a.length);
  return c;
}

/* ---------- La page Hype avec la ligne ajoutée, en flux ---------- */
async function pageAvecRoute(source: Response, uuid: string, seo: { titre: string; description: string; canonical: string; image: string; nom: string; lg: Lg; chemin: string }, texteGoogle: string, jsonld = ""): Promise<Response | null> {
  if (!source.body) return null;
  const enc = new TextEncoder();
  const ajout = enc.encode(
    // 12/10 (correctif, comme l'accueil) : le texte pour Google ne doit jamais s'afficher pendant le chargement de
    // l'appli. Caché dès que le JavaScript démarre (classe hype-js) et toujours dans l'appli installée ; il reste
    // dans la page que Google lit.
    `<script>document.documentElement.classList.add("hype-js")</script>` +
    `<style>html.hype-js #seo-cheval{display:none!important}@media (display-mode: standalone){#seo-cheval{display:none!important}}</style>` +
    `<base href="/"><script>window.__HYPE_ROUTE_CHEVAL=${JSON.stringify(uuid)};</script>` +
    `<meta name="description" content="${echapper(seo.description)}">` +
    `<link rel="canonical" href="${echapper(seo.canonical)}">` +
    liensLangues(seo.chemin) +
    jsonld +
    // build 5 : aperçu de partage (Open Graph + X/Twitter)
    `<meta property="og:type" content="website">` +
    `<meta property="og:site_name" content="Hype">` +
    `<meta property="og:locale" content="${LOCALE[seo.lg]}">` +
    `<meta property="og:title" content="${echapper(seo.titre)}">` +
    `<meta property="og:description" content="${echapper(seo.description)}">` +
    `<meta property="og:url" content="${echapper(seo.canonical)}">` +
    `<meta property="og:image" content="${echapper(seo.image)}">` +
    `<meta property="og:image:alt" content="${echapper(seo.nom)}">` +
    `<meta name="twitter:card" content="summary_large_image">` +
    `<meta name="twitter:title" content="${echapper(seo.titre)}">` +
    `<meta name="twitter:description" content="${echapper(seo.description)}">` +
    `<meta name="twitter:image" content="${echapper(seo.image)}">`);
  const nouveauTitre = enc.encode(`<title>${echapper(seo.titre)}</title>`);
  const lecteur = source.body.getReader();

  // 1. On lit seulement le début, jusqu'à <div id="root"> (vers 640 Ko sur 9,6 Mo) :
  //    on y trouve <head><meta charset="utf-8">, <title>Hype</title> et <div id="root">.
  let debut = new Uint8Array(0);
  let posRacine = -1;
  while (posRacine < 0) {
    const { value, done } = await lecteur.read();
    if (done) break;
    const depart = Math.max(0, debut.length - REPERE_RACINE.length);
    debut = coller(debut, value);
    const p = chercher(debut.subarray(depart), REPERE_RACINE);
    if (p >= 0) posRacine = depart + p;
    else if (debut.length > LECTURE_MAX) break;
  }
  const pos = chercher(debut, REPERE);
  if (pos < 0) { try { lecteur.cancel(); } catch { /* rien */ } return null; }
  const coupe = pos + REPERE.length;
  const posTitre = chercher(debut.subarray(coupe), REPERE_TITRE);
  const tTitre = posTitre >= 0 ? coupe + posTitre : -1;
  if (tTitre < 0) console.log("[cheval-route] <title>Hype</title> introuvable : titre non remplacé");
  if (posRacine < 0) console.log("[cheval-route] <div id=\"root\"> introuvable : pas de texte pour Google");

  // Assemblage : [début][ajout][…][titre du cheval][…]<div id="root">[texte Google][suite]
  const morceaux: Uint8Array[] = [debut.subarray(0, coupe), ajout];
  let curseur = coupe;
  if (tTitre > 0 && (posRacine < 0 || tTitre < posRacine)) {
    morceaux.push(debut.subarray(curseur, tTitre), nouveauTitre);
    curseur = tTitre + REPERE_TITRE.length;
  }
  if (posRacine > curseur) {
    const finRacine = posRacine + REPERE_RACINE.length;
    morceaux.push(debut.subarray(curseur, finRacine), enc.encode(texteGoogle));
    curseur = finRacine;
  }
  morceaux.push(debut.subarray(curseur));
  let tete = new Uint8Array(0);
  for (const mo of morceaux) tete = coller(tete, mo);

  // 2. Le reste du fichier part tel quel, sans être lu ni modifié.
  const flux = new ReadableStream<Uint8Array>({
    start(ctrl) { ctrl.enqueue(tete); },
    async pull(ctrl) {
      try {
        const { value, done } = await lecteur.read();
        if (done) ctrl.close(); else ctrl.enqueue(value);
      } catch (e) { ctrl.error(e); }
    },
    cancel() { try { lecteur.cancel(); } catch { /* rien */ } },
  });

  const entetes = new Headers({
    "content-type": "text/html; charset=utf-8",
    "cache-control": "public, max-age=0, must-revalidate",   // aucun cache pour l'instant (build 3e)
  });
  return new Response(flux, { status: 200, headers: entetes });
}

export default async (request: Request, _context: Context) => {
  const url = new URL(request.url);

  // 1. Forme de l'adresse
  const m = url.pathname.match(FORME_ADRESSE);
  if (!m || m[2].length > 120) return PAGE_404();
  const lg = (m[1] || "fr") as Lg;
  const slug = m[2];

  // 2 à 4. Le cheval, et peut-il être montré ?
  const minuteur = new AbortController();
  const stop = setTimeout(() => minuteur.abort(), DELAI_BASE_MS);
  let cheval: any = null;
  let aUnResultat = false;
  let nbResultats = 0;
  let resultats: any[] = [];
  try {
    const lignes = await lire(
      "chevaux?slug=eq." + encodeURIComponent(slug) +
      "&select=id,nom,alias,race,club,ecurie,origines,supprime_le,visibilite,photo_url&limit=1",
      minuteur.signal,
    );
    cheval = lignes && lignes[0];
    if (cheval && FORME_UUID.test(String(cheval.id || ""))) {
      const lu = await lireResultats(String(cheval.id), minuteur.signal);
      nbResultats = lu.n;
      resultats = lu.lignes;
      aUnResultat = nbResultats > 0;
    }
  } catch (e) {
    console.log("[cheval-route] base injoignable :", String(e));
    return PAGE_503();
  } finally {
    clearTimeout(stop);
  }

  if (!cheval || !FORME_UUID.test(String(cheval.id || ""))) return PAGE_404();
  const montrable =
    !cheval.supprime_le &&
    String(cheval.visibilite || "public") !== "prive" &&
    (String(cheval.photo_url || "").trim() !== "" || aUnResultat);
  if (!montrable) return PAGE_404();

  // 12/10 : l'adresse de l'écurie (annuaire), pour le lien dans le texte Google
  const ecurieSlug = await adresseEcurie(propre(cheval.club) || propre(cheval.ecurie), url.origin);

  // 5. La page Hype normale, avec la ligne ajoutée
  try {
    // 12/10 (référencement action 2) : la copie de l'appli SANS le texte de l'accueil (seo-accueil.cjs) ;
    // si elle manque (publication sans le script), l'accueil comme avant.
    let source = await fetch(new URL("/app-base.html", url.origin), { headers: { accept: "text/html" } });
    if (!source.ok) { try { await source.body?.cancel(); } catch { /* rien */ } source = await fetch(new URL("/", url.origin), { headers: { accept: "text/html" } }); }
    if (!source.ok) { console.log("[cheval-route] index.html http", source.status); return PAGE_503(); }
    const seo = infosSeo(cheval, nbResultats, slug, lg);
    const fil = await filAriane(ecurieSlug, seo.nom, seo.canonical, url.origin, lg);
    const page = await pageAvecRoute(source, String(cheval.id), seo, blocTexte(cheval, nbResultats, resultats, ecurieSlug, lg), fil);
    if (!page) { console.log("[cheval-route] repère <head> introuvable"); return PAGE_503(); }
    if (request.method === "HEAD") { try { await page.body?.cancel(); } catch { /* rien */ } return new Response(null, { status: 200, headers: page.headers }); }
    return page;
  } catch (e) {
    console.log("[cheval-route] erreur page :", String(e));
    return PAGE_503();
  }
};

export const config = { path: ["/cheval/*", "/en/cheval/*", "/es/cheval/*", "/it/cheval/*", "/de/cheval/*", "/ja/cheval/*", "/ar/cheval/*", "/zh/cheval/*", "/nl/cheval/*", "/pt/cheval/*", "/sv/cheval/*", "/ru/cheval/*"] };
