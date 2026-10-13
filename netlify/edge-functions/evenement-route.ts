/* ============================================================================
   HYPE ▸ netlify/edge-functions/evenement-route.ts — 10/10/2026 (référencement, build 856)
   L'ADRESSE PUBLIQUE D'UN RENDEZ-VOUS DE L'AGENDA : https://2hype.fr/evenement/<titre>-<8 signes>

   Décision de Blandine (10/10) : les « événements » publics = les rendez-vous de
   l'agenda des écuries (stages, concours, sorties…), pas les résultats passés.
   Même fonctionnement que cheval-route.ts / ecurie-route.ts :
   1. L'adresse se termine par les 8 premiers signes de l'identifiant du rendez-vous
      (club_agenda.id) ; le début (le titre) n'est là que pour être lisible. Si le
      titre a changé, l'ancienne adresse marche toujours (seule la fin compte) et la
      page indique à Google la bonne adresse (canonical).
   2. Lecture du rendez-vous avec la clé PUBLIQUE (table lisible par tous).
      Inconnu → 404 ; base injoignable → 503.
   3. La page Hype normale + window.__HYPE_ROUTE_EVENEMENT = {club, id} : l'appli
      ouvre la page de l'écurie et la fiche du rendez-vous (mécanisme existant
      window.__agendaFiche, build 856 dans index.html).
   4. Pour Google : titre, description, canonical, aperçu de partage (l'affiche du
      rendez-vous, sinon l'image Hype commune), données structurées « Event »
      (schema.org) et un texte simple (titre, type, dates, lieu, écurie, description).
      Aucun nom de cavalier (ni inscrits, ni chevaux engagés).
   ========================================================================= */

import type { Context } from "https://edge.netlify.com";

const SUPABASE_URL = "https://ldpjebgtskzdokrublfg.supabase.co";
const CLE = "sb_publishable_OoSj7bDnqn2O36myBAXF1g_VjPki8TK";
const DOMAINE = "https://2hype.fr";
// 13/10/2026 : aussi /en/evenement/…, /es/…, /it/…, /de/…, /ja/…, /ar/… (pages traduites)
const FORME_ADRESSE = /^\/(?:(en|es|it|de|ja|ar)\/)?evenement\/(?:([a-z0-9]+(?:-[a-z0-9]+)*)-)?([0-9a-f]{8})\/?$/;
const REPERE = new TextEncoder().encode('<head><meta charset="utf-8">');
const REPERE_TITRE = new TextEncoder().encode("<title>Hype</title>");
const REPERE_RACINE = new TextEncoder().encode('<div id="root">');
const LECTURE_MAX = 2 * 1024 * 1024;
const DELAI_BASE_MS = 2500;
const IMAGE_APERCU = DOMAINE + "/partage-apercu.jpg";

/* ---------- 13/10/2026 : les 7 langues (titre, lieu et description du rendez-vous restent tels qu'écrits) ---------- */
type Lg = "fr" | "en" | "es" | "it" | "de" | "ja" | "ar";
const LANGUES: Lg[] = ["fr", "en", "es", "it", "de", "ja", "ar"];
const LOCALE: Record<Lg, string> = { fr: "fr_FR", en: "en_GB", es: "es_ES", it: "it_IT", de: "de_DE", ja: "ja_JP", ar: "ar_AR" };
const INTL: Record<Lg, string> = { fr: "fr-FR", en: "en-GB", es: "es-ES", it: "it-IT", de: "de-DE", ja: "ja-JP", ar: "ar-u-nu-latn" };
const prefixe = (lg: Lg) => (lg === "fr" ? "" : "/" + lg);
const TYPES_LG: Record<Exclude<Lg, "fr">, Record<string, string>> = {
  en: { stage: "Clinic", concours: "Competition", sortie: "Outing", cours: "Lesson", soiree: "Evening event", reunion: "Meeting" },
  es: { stage: "Cursillo", concours: "Concurso", sortie: "Salida", cours: "Clase", soiree: "Velada", reunion: "Reunión" },
  it: { stage: "Stage", concours: "Concorso", sortie: "Uscita", cours: "Lezione", soiree: "Serata", reunion: "Riunione" },
  de: { stage: "Lehrgang", concours: "Turnier", sortie: "Ausflug", cours: "Reitstunde", soiree: "Abendveranstaltung", reunion: "Versammlung" },
  ja: { stage: "講習会", concours: "競技会", sortie: "外乗", cours: "レッスン", soiree: "夜のイベント", reunion: "ミーティング" },
  ar: { stage: "دورة تدريبية", concours: "مسابقة", sortie: "نزهة", cours: "درس", soiree: "سهرة", reunion: "اجتماع" },
};
const TXE: Record<Exclude<Lg, "fr">, Record<string, any>> = {
  en: { rdv: "Event", du: (a: string, b: string) => "from " + a + " to " + b, le: (a: string) => "on " + a, a: (l: string) => "at " + l, heure: (h: string) => "At " + h, lieu: "Venue", org: (c: string) => "Organised by the stable " + c, defaut: "All the event details on Hype.", pied: "Hype is an independent app with no official link to this stable or to the FFE.", dp: ": " },
  es: { rdv: "Cita", du: (a: string, b: string) => "del " + a + " al " + b, le: (a: string) => "el " + a, a: (l: string) => "en " + l, heure: (h: string) => "A las " + h, lieu: "Lugar", org: (c: string) => "Organizado por la cuadra " + c, defaut: "Toda la información de la cita en Hype.", pied: "Hype es una aplicación independiente, sin vínculo oficial con esta cuadra ni con la FFE.", dp: ": " },
  it: { rdv: "Appuntamento", du: (a: string, b: string) => "dal " + a + " al " + b, le: (a: string) => "il " + a, a: (l: string) => "a " + l, heure: (h: string) => "Alle " + h, lieu: "Luogo", org: (c: string) => "Organizzato dalla scuderia " + c, defaut: "Tutte le informazioni sull’appuntamento su Hype.", pied: "Hype è un’applicazione indipendente, senza legami ufficiali con questa scuderia né con la FFE.", dp: ": " },
  de: { rdv: "Termin", du: (a: string, b: string) => "vom " + a + " bis " + b, le: (a: string) => "am " + a, a: (l: string) => "in " + l, heure: (h: string) => "Um " + h + " Uhr", lieu: "Ort", org: (c: string) => "Veranstaltet vom Stall " + c, defaut: "Alle Infos zum Termin auf Hype.", pied: "Hype ist eine unabhängige App ohne offizielle Verbindung zu diesem Stall oder zur FFE.", dp: ": " },
  ja: { rdv: "イベント", du: (a: string, b: string) => a + "〜" + b, le: (a: string) => a, a: (l: string) => "（" + l + "）", heure: (h: string) => h + "開始", lieu: "場所", org: (c: string) => "主催：" + c, defaut: "イベントの詳細はHypeで。", pied: "Hypeは独立したアプリで、この厩舎およびFFEとは公式な関係はありません。", dp: "：" },
  ar: { rdv: "موعد", du: (a: string, b: string) => "من " + a + " إلى " + b, le: (a: string) => "في " + a, a: (l: string) => "في " + l, heure: (h: string) => "الساعة " + h, lieu: "المكان", org: (c: string) => "ينظمه إسطبل " + c, defaut: "كل تفاصيل الموعد على Hype.", pied: "Hype تطبيق مستقل لا تربطه أي صلة رسمية بهذا الإسطبل ولا بالاتحاد الفرنسي للفروسية (FFE).", dp: ": " },
};
function dateLongueLg(d: unknown, lg: Lg): string {
  const m = String(d || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return "";
  try {
    return new Intl.DateTimeFormat(INTL[lg], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
      .format(new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])));
  } catch { return m[3] + "/" + m[2] + "/" + m[1]; }
}
function liensLangues(chemin: string): string {
  return LANGUES.map((l) => `<link rel="alternate" hreflang="${l}" href="${DOMAINE}${prefixe(l)}${chemin}">`).join("") +
    `<link rel="alternate" hreflang="x-default" href="${DOMAINE}${chemin}">`;
}

type Ecurie = { n: string; v?: string; cp?: string; d?: string; a?: string; t?: string; s?: string; la?: number; lo?: number; x?: number };
/* 12/10/2026 : pages « Centres équestres de l'Essonne (91) » : code → [adresse, « de l'Essonne »] ; jamais bloquant. */
let DEPARTEMENTS: Promise<Record<string, [string, string]>> | null = null;
function departements(origine: string): Promise<Record<string, [string, string]>> {
  if (!DEPARTEMENTS) {
    DEPARTEMENTS = fetch(new URL("/fr/centres-equestres/departements.json", origine))
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => { DEPARTEMENTS = null; return {}; });
  }
  return DEPARTEMENTS;
}
let ANNUAIRE: Promise<Record<string, Ecurie>> | null = null;
function annuaire(origine: string): Promise<Record<string, Ecurie>> {
  if (!ANNUAIRE) {
    ANNUAIRE = fetch(new URL("/ecuries.json", origine)).then((r) => { if (!r.ok) throw new Error("ecuries.json http " + r.status); return r.json(); })
      .catch((e) => { ANNUAIRE = null; throw e; });
  }
  return ANNUAIRE;
}
/* Même règle que ecuries-generer.cjs */
export function slugTexte(s: string): string {
  return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70).replace(/-+$/, "");
}
export function adresseEvenement(titre: string, id: string): string {
  const s = slugTexte(titre);
  return "/evenement/" + (s ? s + "-" : "") + String(id).slice(0, 8).toLowerCase();
}

/* ---------- Petites pages d'erreur (7 langues) ---------- */
function pageSimple(statut: number, lignes: string[][]): Response {
  const corps = lignes.map(([lang, txt]) => `<p lang="${lang}"${lang === "ar" ? ' dir="rtl"' : ""}>${txt}</p>`).join("\n");
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>Hype</title>
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
  ["fr", "Ce rendez-vous n’est pas disponible."],
  ["en", "This event is not available."],
  ["es", "Este evento no está disponible."],
  ["it", "Questo evento non è disponibile."],
  ["de", "Dieser Termin ist nicht verfügbar."],
  ["ja", "このイベントは表示できません。"],
  ["ar", "هذا الموعد غير متاح."],
]);
const PAGE_503 = () => pageSimple(503, [
  ["fr", "Hype est momentanément indisponible. Réessaie dans un instant."],
  ["en", "Hype is temporarily unavailable. Please try again shortly."],
  ["es", "Hype no está disponible por el momento. Inténtalo de nuevo en un instante."],
  ["it", "Hype è momentaneamente non disponibile. Riprova tra un attimo."],
  ["de", "Hype ist vorübergehend nicht erreichbar. Versuche es gleich noch einmal."],
  ["ja", "Hypeは一時的に利用できません。しばらくしてからもう一度お試しください。"],
  ["ar", "هايب غير متاح مؤقتًا. حاول مرة أخرى بعد قليل."],
]);

/* ---------- Outils de texte ---------- */
function echapper(t: string): string {
  return String(t || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function propre(t: unknown): string { return String(t == null ? "" : t).replace(/\s+/g, " ").trim(); }
function texte(t: unknown): string { return echapper(propre(t)); }
function dateFr(d: unknown): string {
  const m = String(d || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? m[3] + "/" + m[2] + "/" + m[1] : "";
}
function rang(place: unknown, classement: unknown): string {
  const n = parseInt(String(place == null ? "" : place), 10);
  if (isFinite(n) && n > 0) return n === 1 ? "1er" : n + "e";
  return propre(classement);
}
const TYPES: Record<string, string> = { stage: "Stage", concours: "Concours", sortie: "Sortie", cours: "Cours", soiree: "Soirée", reunion: "Réunion" };

/* La grande photo de l'écurie, agrandie à 1200 px par Supabase (comme cheval-route.ts) ;
   pas de photo utilisable → l'image Hype commune partage-apercu.jpg. */
function imageApercu(brut: unknown): string {
  const u = String(brut || "").trim();
  if (!u || !/^https:\/\//i.test(u)) return IMAGE_APERCU;
  if (u.includes("/storage/v1/object/public/") && !u.includes("/render/image/")) {
    return u.replace("/storage/v1/object/public/", "/storage/v1/render/image/public/") + (u.includes("?") ? "&" : "?") + "width=1200&resize=contain&quality=80";
  }
  return u;
}

/* ---------- Lecture ---------- */
async function lire(chemin: string, signal: AbortSignal): Promise<any[]> {
  const r = await fetch(SUPABASE_URL + "/rest/v1/" + chemin, { headers: { apikey: CLE, Authorization: "Bearer " + CLE }, signal });
  if (!r.ok) throw new Error("supabase-http-" + r.status);
  const j = await r.json();
  return Array.isArray(j) ? j : [];
}
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
function dateLongue(d: unknown): string {
  const m = String(d || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? (parseInt(m[3], 10) === 1 ? "1er" : String(parseInt(m[3], 10))) + " " + MOIS[parseInt(m[2], 10) - 1] + " " + m[1] : "";
}
function heureOk(h: unknown): string { const m = String(h || "").match(/^(\d{1,2}):(\d{2})/); return m ? m[1].padStart(2, "0") + ":" + m[2] : ""; }

function construire(ev: any, ec: Ecurie | null, adresse: string, lg: Lg = "fr") {
  if (lg !== "fr") return construireLg(ev, ec, adresse, lg);
  const titreEv = propre(ev.titre) || "Rendez-vous";
  const type = TYPES[String(ev.type || "").toLowerCase()] || "";
  const nomClub = ec ? propre(ec.n) : propre(ev.club_clef);
  const villeClub = ec ? propre(ec.v).replace(/\s*\([^)]*\)\s*$/, "") : "";   // « Itteville (91) » → « Itteville » (13/10)
  const debut = dateLongue(ev.date_jour);
  const fin = (ev.date_fin && ev.date_fin !== ev.date_jour) ? dateLongue(ev.date_fin) : "";
  const quand = fin ? "du " + debut + " au " + fin : (debut ? "le " + debut : "");
  const lieu = propre(ev.lieu);

  const titre = titreEv + (quand ? " – " + quand : "") + " | Hype";
  let description = (type ? type + " " : "Rendez-vous ") + (quand ? quand + " " : "") + (lieu ? "à " + lieu + " " : "") + (nomClub ? "— " + nomClub : "") + ". ";
  description += propre(ev.description) ? propre(ev.description).slice(0, 110) : "Toutes les infos du rendez-vous sur Hype.";

  let html = `<main id="seo-evenement" lang="fr" style="padding:64vh 20px 48px;max-width:720px;margin:0 auto;color:#9aa1ab;font:14px/1.6 Georgia,serif">`;
  html += `<h1 style="font-size:22px;color:#d8d2c4;margin:0 0 6px">${texte(titreEv)}</h1>`;
  const lignes: string[] = [];
  if (type) lignes.push(texte(type));
  if (quand) lignes.push(texte(quand.charAt(0).toUpperCase() + quand.slice(1)));
  const h = heureOk(ev.heure) || heureOk(ev.heure_epreuve);
  if (h) lignes.push("À " + h);
  if (lieu) lignes.push("Lieu : " + texte(lieu));
  if (lignes.length) html += `<p>${lignes.join("<br>")}</p>`;
  if (nomClub) {
    const lien = ec ? `<a href="${DOMAINE}/ecurie/${ecSlug}">${texte(nomClub)}</a>` : texte(nomClub);
    html += `<p>Organisé par l’écurie ${lien}${villeClub ? " (" + texte(villeClub) + ")" : ""}</p>`;
  }
  if (propre(ev.description)) html += `<p>${texte(ev.description)}</p>`;
  html += `<p style="margin-top:22px;font-size:12px">Hype est une application indépendante, sans lien officiel avec cette écurie ni avec la FFE.</p>`;
  html += `</main>`;

  // Données structurées « Event » (schema.org) : seulement ce qui est vrai.
  const jd: any = {
    "@context": "https://schema.org", "@type": "Event", name: titreEv,
    startDate: String(ev.date_jour || "").slice(0, 10) + (h ? "T" + h : ""),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: DOMAINE + adresse,
  };
  if (ev.date_fin) jd.endDate = String(ev.date_fin).slice(0, 10);
  const nomLieu = lieu || nomClub;
  if (nomLieu) jd.location = { "@type": "Place", name: nomLieu, address: (lieu ? lieu : (villeClub || nomLieu)) };
  if (nomClub) jd.organizer = { "@type": "Organization", name: nomClub, ...(ec ? { url: DOMAINE + "/ecurie/" + ecSlug } : {}) };
  if (propre(ev.description)) jd.description = propre(ev.description).slice(0, 300);
  const img = imageApercu(ev.image_url);
  jd.image = [img];
  const jsonld = `<script type="application/ld+json">${JSON.stringify(jd).replace(/</g, "\\u003c")}</script>`;

  return { titre, description, canonical: DOMAINE + adresse, image: img, nom: titreEv, html, jsonld, lg: "fr" as Lg, chemin: adresse };
}
/* 13/10/2026 : la même page dans une autre langue (mêmes données, mêmes règles : aucun nom de cavalier). */
function construireLg(ev: any, ec: Ecurie | null, adresse: string, lg: Exclude<Lg, "fr">) {
  const t = TXE[lg];
  const titreEv = propre(ev.titre) || t.rdv;
  const type = TYPES_LG[lg][String(ev.type || "").toLowerCase()] || "";
  const nomClub = ec ? propre(ec.n) : propre(ev.club_clef);
  const villeClub = ec ? propre(ec.v).replace(/\s*\([^)]*\)\s*$/, "") : "";   // « Itteville (91) » → « Itteville » (13/10)
  const debut = dateLongueLg(ev.date_jour, lg);
  const fin = (ev.date_fin && ev.date_fin !== ev.date_jour) ? dateLongueLg(ev.date_fin, lg) : "";
  const quand = fin ? t.du(debut, fin) : (debut ? t.le(debut) : "");
  const lieu = propre(ev.lieu);

  const titre = titreEv + (quand ? " – " + quand : "") + " | Hype";
  const morceaux = [type || t.rdv, quand, lieu ? t.a(lieu) : "", nomClub ? "— " + nomClub : ""].filter(Boolean);
  let description = morceaux.join(lg === "ja" ? " " : " ") + (lg === "ja" ? "。" : ". ");
  description += propre(ev.description) ? propre(ev.description).slice(0, 110) : t.defaut;

  let html = `<main id="seo-evenement" lang="${lg}"${lg === "ar" ? ' dir="rtl"' : ""} style="padding:64vh 20px 48px;max-width:720px;margin:0 auto;color:#9aa1ab;font:14px/1.6 Georgia,serif">`;
  html += `<h1 style="font-size:22px;color:#d8d2c4;margin:0 0 6px">${texte(titreEv)}</h1>`;
  const lignes: string[] = [];
  if (type) lignes.push(texte(type));
  if (quand) lignes.push(texte(quand.charAt(0).toUpperCase() + quand.slice(1)));
  const h = heureOk(ev.heure) || heureOk(ev.heure_epreuve);
  if (h) lignes.push(texte(t.heure(h)));
  if (lieu) lignes.push(t.lieu + t.dp + texte(lieu));
  if (lignes.length) html += `<p>${lignes.join("<br>")}</p>`;
  if (nomClub) {
    const lien = ec ? `<a href="${DOMAINE}${prefixe(lg)}/ecurie/${ecSlug}">${texte(nomClub)}</a>` : texte(nomClub);
    html += `<p>${t.org(lien)}${villeClub ? " (" + texte(villeClub) + ")" : ""}</p>`;
  }
  if (propre(ev.description)) html += `<p>${texte(ev.description)}</p>`;
  html += `<p style="margin-top:22px;font-size:12px">${t.pied}</p>`;
  html += `</main>`;

  const jd: any = {
    "@context": "https://schema.org", "@type": "Event", name: titreEv,
    startDate: String(ev.date_jour || "").slice(0, 10) + (h ? "T" + h : ""),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: DOMAINE + prefixe(lg) + adresse, inLanguage: lg,
  };
  if (ev.date_fin) jd.endDate = String(ev.date_fin).slice(0, 10);
  const nomLieu = lieu || nomClub;
  if (nomLieu) jd.location = { "@type": "Place", name: nomLieu, address: (lieu ? lieu : (villeClub || nomLieu)) };
  if (nomClub) jd.organizer = { "@type": "Organization", name: nomClub, ...(ec ? { url: DOMAINE + prefixe(lg) + "/ecurie/" + ecSlug } : {}) };
  if (propre(ev.description)) jd.description = propre(ev.description).slice(0, 300);
  const img = imageApercu(ev.image_url);
  jd.image = [img];
  const jsonld = `<script type="application/ld+json">${JSON.stringify(jd).replace(/</g, "\\u003c")}</script>`;
  return { titre, description, canonical: DOMAINE + prefixe(lg) + adresse, image: img, nom: titreEv, html, jsonld, lg: lg as Lg, chemin: adresse };
}
let ecSlug = "";

/* ---------- Flux : la page Hype avec les ajouts (identique à cheval-route.ts) ---------- */
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
async function pageAvecRoute(source: Response, route: { club: string; id: string }, seo: { titre: string; description: string; canonical: string; image: string; nom: string; html: string; jsonld: string; lg: Lg; chemin: string }): Promise<Response | null> {
  if (!source.body) return null;
  const enc = new TextEncoder();
  const ajout = enc.encode(
    // 12/10 (correctif, comme l'accueil) : le texte pour Google ne doit jamais s'afficher pendant le chargement de
    // l'appli. Caché dès que le JavaScript démarre (classe hype-js) et toujours dans l'appli installée ; il reste
    // dans la page que Google lit.
    `<script>document.documentElement.classList.add("hype-js")</script>` +
    `<style>html.hype-js #seo-evenement{display:none!important}@media (display-mode: standalone){#seo-evenement{display:none!important}}</style>` +
    `<base href="/"><script>window.__HYPE_ROUTE_EVENEMENT=${JSON.stringify(route).replace(/</g, "\\u003c")};</script>` +
    seo.jsonld +
    `<meta name="description" content="${echapper(seo.description)}">` +
    `<link rel="canonical" href="${echapper(seo.canonical)}">` +
    liensLangues(seo.chemin) +
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

  const morceaux: Uint8Array[] = [debut.subarray(0, coupe), ajout];
  let curseur = coupe;
  if (tTitre > 0 && (posRacine < 0 || tTitre < posRacine)) {
    morceaux.push(debut.subarray(curseur, tTitre), nouveauTitre);
    curseur = tTitre + REPERE_TITRE.length;
  }
  if (posRacine > curseur) {
    const finRacine = posRacine + REPERE_RACINE.length;
    morceaux.push(debut.subarray(curseur, finRacine), enc.encode(seo.html));
    curseur = finRacine;
  }
  morceaux.push(debut.subarray(curseur));
  let tete = new Uint8Array(0);
  for (const mo of morceaux) tete = coller(tete, mo);

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
  return new Response(flux, { status: 200, headers: new Headers({ "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=0, must-revalidate" }) });
}

export default async (request: Request, _context: Context) => {
  const url = new URL(request.url);
  const m = url.pathname.match(FORME_ADRESSE);
  if (!m) return PAGE_404();
  const lg = (m[1] || "fr") as Lg;
  const court = m[3];

  const minuteur = new AbortController();
  const stop = setTimeout(() => minuteur.abort(), DELAI_BASE_MS);
  let ev: any = null;
  try {
    const lignes = await lire("club_agenda?id=gte." + court + "-0000-0000-0000-000000000000&id=lte." + court + "-ffff-ffff-ffff-ffffffffffff" +
      "&select=id,club_clef,titre,type,date_jour,date_fin,lieu,description,image_url,heure,heure_epreuve&limit=1", minuteur.signal);
    ev = lignes[0] || null;
  } catch (e) {
    console.log("[evenement-route] base injoignable :", String(e));
    return PAGE_503();
  } finally { clearTimeout(stop); }
  if (!ev || !ev.id) return PAGE_404();

  // l'écurie : son nom exact et son adresse publique, depuis l'annuaire
  let ec: Ecurie | null = null; ecSlug = "";
  try {
    const an = await annuaire(url.origin);
    // 10/10 : même clé que l'appli (clefClubG : sans accents, minuscules, espaces simples)
    const cle = (x: string) => String(x || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
    const clef = cle(ev.club_clef);
    for (const k in an) { if (cle(an[k].n) === clef) { ec = an[k]; ecSlug = k; break; } }
  } catch (e) { console.log("[evenement-route] annuaire :", String(e)); }

  const adresse = adresseEvenement(ev.titre, ev.id);
  const seo = construire(ev, ec, adresse, lg);
  // 12/10/2026 : fil d'Ariane pour Google — Hype › Centres équestres › département › écurie › événement
  // (seulement si l'écurie est trouvée et n'est pas écartée du référencement)
  if (ec && ec.x !== 1 && ecSlug) {
    const slugEc = ecSlug;
    const deps = await departements(url.origin).catch(() => ({} as Record<string, [string, string]>));
    const dep = String(ec.d || "").trim(), pageDep = deps[dep];
    const fil: unknown[] = [{ "@type": "ListItem", position: 1, name: "Hype", item: DOMAINE + "/" + lg + "/" }];
    if (lg === "fr") {   // les pages par département n'existent qu'en français
      fil.push({ "@type": "ListItem", position: 2, name: "Centres équestres", item: DOMAINE + "/fr/centres-equestres/" });
      if (pageDep) fil.push({ "@type": "ListItem", position: 3, name: "Centres équestres " + pageDep[1] + " (" + dep + ")", item: pageDep[0] });
    }
    fil.push({ "@type": "ListItem", position: fil.length + 1, name: String(ec.n), item: DOMAINE + prefixe(lg) + "/ecurie/" + slugEc });
    fil.push({ "@type": "ListItem", position: fil.length + 1, name: seo.nom, item: seo.canonical });
    seo.jsonld += `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: fil }).replace(/</g, "\\u003c")}</script>`;
  }
  try {
    // 12/10 (référencement action 2) : la copie de l'appli SANS le texte de l'accueil (seo-accueil.cjs) ;
    // si elle manque (publication sans le script), l'accueil comme avant.
    let source = await fetch(new URL("/app-base.html", url.origin), { headers: { accept: "text/html" } });
    if (!source.ok) { try { await source.body?.cancel(); } catch { /* rien */ } source = await fetch(new URL("/", url.origin), { headers: { accept: "text/html" } }); }
    if (!source.ok) { console.log("[evenement-route] index.html http", source.status); return PAGE_503(); }
    const page = await pageAvecRoute(source, { club: ec ? propre(ec.n) : propre(ev.club_clef), id: String(ev.id) }, seo);
    if (!page) return PAGE_503();
    if (request.method === "HEAD") { try { await page.body?.cancel(); } catch { /* rien */ } return new Response(null, { status: 200, headers: page.headers }); }
    return page;
  } catch (e) {
    console.log("[evenement-route] erreur page :", String(e));
    return PAGE_503();
  }
};

export const config = { path: ["/evenement/*", "/en/evenement/*", "/es/evenement/*", "/it/evenement/*", "/de/evenement/*", "/ja/evenement/*", "/ar/evenement/*"] };
