/* ============================================================================
   HYPE ▸ netlify/edge-functions/ecurie-route.ts — 10/10/2026 (référencement des écuries, build 851)
   L'ADRESSE PUBLIQUE D'UNE ÉCURIE : https://2hype.fr/ecurie/<adresse>

   Décisions de Blandine (10/10) : TOUTES les écuries de la base des clubs (3 145,
   choix A) ont leur page, trouvable sur Google ; les « événements » = les
   rendez-vous de l'agenda à venir (pas les résultats passés pour l'instant) ;
   aucun nom de cavalier (même règle que les chevaux).

   CE QUE FAIT CE FICHIER (copie du fonctionnement de cheval-route.ts)
   1. Lit l'adresse (/ecurie/<adresse> : minuscules, chiffres, tirets), sinon 404.
   2. Cherche l'écurie dans ecuries.json (fabriqué par ecuries-generer.cjs à partir
      des fichiers hype-clubs-db-*.js) ; inconnue → 404.
   3. Lit dans Supabase, avec la clé PUBLIQUE : ses chevaux publics (non supprimés,
      pas « prive »), leurs derniers résultats visibles (sans aucune colonne de
      cavalier), ses rendez-vous à venir. Base trop lente → la page part quand même,
      sans ces listes (l'écurie existe toujours).
   4. Si l'écurie n'a pas de ville dans la base (2 584 sur 3 145), demande la commune
      au service public geo.api.gouv.fr à partir de ses coordonnées (0,9 s maxi ;
      sinon on s'en passe).
   5. Renvoie la page Hype NORMALE avec, juste après <head><meta charset> :
        <base href="/"> + window.__HYPE_ROUTE_ECURIE = "<nom exact>" (l'appli ouvre
        la page Écurie de ce club, comme une visite — build 851 dans index.html),
        titre, description, canonical, aperçu de partage (Open Graph) ;
      et, dans <div id="root">, un texte simple pour Google (nom, ville, contact,
      chevaux avec lien vers leur fiche publique, rendez-vous, derniers résultats,
      invitation à ajouter son cheval, source OpenStreetMap). L'appli remplace ce
      bloc en démarrant.
   Image d'aperçu : partage-apercu.jpg pour toutes pour l'instant (la grande photo
   de l'écurie viendra quand sa lecture sans connexion aura été ouverte en base).
   ========================================================================= */

import type { Context } from "https://edge.netlify.com";

const SUPABASE_URL = "https://ldpjebgtskzdokrublfg.supabase.co";
const CLE = "sb_publishable_OoSj7bDnqn2O36myBAXF1g_VjPki8TK";
const DOMAINE = "https://2hype.fr";
const FORME_ADRESSE = /^\/ecurie\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/;
const FORME_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FORME_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const REPERE = new TextEncoder().encode('<head><meta charset="utf-8">');
const REPERE_TITRE = new TextEncoder().encode("<title>Hype</title>");
const REPERE_RACINE = new TextEncoder().encode('<div id="root">');
const LECTURE_MAX = 2 * 1024 * 1024;
const DELAI_BASE_MS = 2500;
const DELAI_GEO_MS = 900;
const IMAGE_APERCU = DOMAINE + "/partage-apercu.jpg";

type Ecurie = { n: string; v?: string; cp?: string; d?: string; a?: string; t?: string; s?: string; la?: number; lo?: number };

/* ---------- L'annuaire (gardé en mémoire tant que la fonction reste chaude) ---------- */
let ANNUAIRE: Promise<Record<string, Ecurie>> | null = null;
function annuaire(origine: string): Promise<Record<string, Ecurie>> {
  if (!ANNUAIRE) {
    ANNUAIRE = fetch(new URL("/ecuries.json", origine)).then((r) => {
      if (!r.ok) throw new Error("ecuries.json http " + r.status);
      return r.json();
    }).catch((e) => { ANNUAIRE = null; throw e; });
  }
  return ANNUAIRE;
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
  ["fr", "Cette écurie n’est pas disponible."],
  ["en", "This stable is not available."],
  ["es", "Esta cuadra no está disponible."],
  ["it", "Questa scuderia non è disponibile."],
  ["de", "Dieser Stall ist nicht verfügbar."],
  ["ja", "この厩舎は表示できません。"],
  ["ar", "هذا الإسطبل غير متاح."],
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

/* ---------- Lectures ---------- */
async function lire(chemin: string, signal: AbortSignal): Promise<any[]> {
  const r = await fetch(SUPABASE_URL + "/rest/v1/" + chemin, { headers: { apikey: CLE, Authorization: "Bearer " + CLE }, signal });
  if (!r.ok) throw new Error("supabase-http-" + r.status);
  const j = await r.json();
  return Array.isArray(j) ? j : [];
}
/* Valeur littérale pour un filtre PostgREST « ilike » : * et % et _ seraient des jokers. */
function litteral(s: string): string { return String(s).replace(/[*%_\\]/g, (c) => "\\" + c); }

async function communeDepuisCoordonnees(la?: number, lo?: number): Promise<{ v: string; d: string } | null> {
  if (typeof la !== "number" || typeof lo !== "number") return null;
  const minuteur = new AbortController();
  const stop = setTimeout(() => minuteur.abort(), DELAI_GEO_MS);
  try {
    const r = await fetch(`https://geo.api.gouv.fr/communes?lat=${la}&lon=${lo}&fields=nom,codeDepartement&format=json`, { signal: minuteur.signal });
    if (!r.ok) return null;
    const j = await r.json();
    const c = Array.isArray(j) ? j[0] : null;
    return c && c.nom ? { v: String(c.nom), d: String(c.codeDepartement || "") } : null;
  } catch { return null; } finally { clearTimeout(stop); }
}

async function contenuHype(nom: string) {
  const vide = { chevaux: [] as any[], resultats: [] as any[], rdv: [] as any[], lu: false };
  const minuteur = new AbortController();
  const stop = setTimeout(() => minuteur.abort(), DELAI_BASE_MS);
  try {
    const aujourdhui = new Date().toISOString().slice(0, 10);
    const [chevaux, rdv] = await Promise.all([
      lire("chevaux?club=ilike." + encodeURIComponent(litteral(nom)) +
        "&supprime_le=is.null&or=(visibilite.is.null,visibilite.neq.prive)" +
        "&select=id,nom,race,slug,photo_url&order=nom.asc&limit=80", minuteur.signal),
      lire("club_agenda?club_clef=eq." + encodeURIComponent(nom.trim().toLowerCase()) +
        "&or=(date_jour.gte." + aujourdhui + ",date_fin.gte." + aujourdhui + ")" +
        "&select=titre,type,date_jour,date_fin,lieu&order=date_jour.asc&limit=10", minuteur.signal),
    ]);
    const ids = chevaux.map((c) => String(c.id || "")).filter((i) => FORME_UUID.test(i));
    let resultats: any[] = [];
    if (ids.length) {
      resultats = await lire("resultats?cheval_id=in.(" + ids.join(",") + ")&visible=is.true&masque_cavaliere=not.is.true" +
        "&select=cheval_id,concours,epreuve,date_epreuve,classement,place,partants,mention" +
        "&order=date_epreuve.desc.nullslast,created_at.desc&limit=400", minuteur.signal);
    }
    return { chevaux, resultats, rdv, lu: true };
  } catch (e) {
    console.log("[ecurie-route] base lente ou injoignable :", String(e));
    return vide;
  } finally { clearTimeout(stop); }
}

/* ---------- Ce que lit Google ---------- */
function construire(slug: string, ec: Ecurie, geo: { v: string; d: string } | null, hype: Awaited<ReturnType<typeof contenuHype>>) {
  const nom = propre(ec.n);
  const ville = propre(ec.v) || (geo ? geo.v : "");
  const dep = propre(ec.d) || (geo ? geo.d : "");
  const villeAff = ville ? (ville + (dep && !/\(\d/.test(ville) ? " (" + dep + ")" : "")) : "";

  // chevaux montrables = même règle que cheval-route.ts (adresse + photo ou résultat visible)
  const avecResultat = new Set(hype.resultats.map((r) => String(r.cheval_id)));
  const montrables = hype.chevaux.filter((c) => FORME_SLUG.test(String(c.slug || "")) &&
    (propre(c.photo_url) !== "" || avecResultat.has(String(c.id))));
  const nomsParId: Record<string, string> = {};
  for (const c of hype.chevaux) nomsParId[String(c.id)] = propre(c.nom);
  const derniers = hype.resultats.slice(0, 15);

  const titre = nom + (villeAff ? " – Écurie à " + villeAff : " – Écurie") + " | Hype";
  let description = nom + (villeAff ? ", écurie à " + villeAff : ", écurie") + ". ";
  const contenu: string[] = [];
  if (montrables.length) contenu.push("ses chevaux");
  if (hype.rdv.length) contenu.push("ses prochains rendez-vous");
  if (derniers.length) contenu.push("ses derniers résultats en concours");
  if (contenu.length) {
    const liste = contenu.length === 1 ? contenu[0] : contenu.slice(0, -1).join(", ") + " et " + contenu[contenu.length - 1];
    description += "Découvre " + liste + " sur Hype.";
  } else {
    description += "Ton cheval est ici ? Crée sa fiche sur Hype : photos, origines, résultats en concours.";
  }

  let html = `<main id="seo-ecurie" lang="fr" style="padding:64vh 20px 48px;max-width:720px;margin:0 auto;color:#9aa1ab;font:14px/1.6 Georgia,serif">`;
  html += `<h1 style="font-size:22px;color:#d8d2c4;margin:0 0 6px">${texte(nom)}</h1>`;
  html += `<p>Écurie${villeAff ? " à " + texte(villeAff) : ""}</p>`;
  const contact: string[] = [];
  if (propre(ec.a)) contact.push("Adresse : " + texte(ec.a) + (propre(ec.cp) ? ", " + texte(ec.cp) : "") + (ville ? " " + texte(ville) : ""));
  if (propre(ec.t)) contact.push("Téléphone : " + texte(ec.t));
  if (propre(ec.s)) contact.push(`Site : <a href="${echapper(propre(ec.s))}" rel="nofollow noopener">${texte(ec.s)}</a>`);
  if (contact.length) html += `<p>${contact.join("<br>")}</p>`;

  if (montrables.length) {
    html += `<h2 style="font-size:17px;color:#d8d2c4;margin:22px 0 6px">Les chevaux de l’écurie</h2><ul style="padding-left:18px;margin:0">`;
    for (const c of montrables) html += `<li><a href="${DOMAINE}/cheval/${c.slug}">${texte(c.nom)}</a>${propre(c.race) ? " — " + texte(c.race) : ""}</li>`;
    html += `</ul>`;
  }
  if (hype.rdv.length) {
    html += `<h2 style="font-size:17px;color:#d8d2c4;margin:22px 0 6px">Prochains rendez-vous</h2><ul style="padding-left:18px;margin:0">`;
    for (const r of hype.rdv) {
      const morceaux = [dateFr(r.date_jour) + (r.date_fin && r.date_fin !== r.date_jour ? " → " + dateFr(r.date_fin) : ""),
        TYPES[String(r.type || "").toLowerCase()] || "", texte(r.titre), texte(r.lieu)].filter(Boolean);
      html += `<li>${morceaux.join(" — ")}</li>`;
    }
    html += `</ul>`;
  }
  if (derniers.length) {
    html += `<h2 style="font-size:17px;color:#d8d2c4;margin:22px 0 6px">Derniers résultats en concours</h2><ul style="padding-left:18px;margin:0">`;
    for (const r of derniers) {
      const morceaux = [dateFr(r.date_epreuve), texte(nomsParId[String(r.cheval_id)] || ""), texte(r.concours), texte(r.epreuve)].filter(Boolean);
      let fin = rang(r.place, r.classement);
      fin = fin ? texte(fin) : "";
      const pa = parseInt(String(r.partants == null ? "" : r.partants), 10);
      if (fin && isFinite(pa) && pa > 0) fin += " sur " + pa + " partants";
      if (propre(r.mention)) fin += (fin ? ", " : "") + (/^sf$/i.test(propre(r.mention)) ? "sans faute" : texte(r.mention));
      if (fin) morceaux.push(fin);
      html += `<li>${morceaux.join(" — ")}</li>`;
    }
    html += `</ul>`;
  }
  if (!montrables.length) {
    // TEXTE PROVISOIRE : sera remplacé par le texte choisi par Blandine (prompt ChatGPT du 10/10)
    html += `<h2 style="font-size:17px;color:#d8d2c4;margin:22px 0 6px">Ton cheval est à ${texte(nom)} ?</h2>`;
    html += `<p>Crée sa fiche sur Hype : ses photos, ses origines, ses résultats en concours et ses souvenirs, au même endroit. Ensuite, toute l’écurie peut suivre les concours, les stages et les sorties ensemble.</p>`;
  }
  html += `<p style="margin-top:22px;font-size:12px">Hype est une application indépendante, sans lien officiel avec cette écurie ni avec la FFE. Données de l’écurie : © contributeurs OpenStreetMap.</p>`;
  html += `</main>`;

  return { titre, description, canonical: DOMAINE + "/ecurie/" + slug, image: IMAGE_APERCU, nom, html };
}

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
async function pageAvecRoute(source: Response, nomClub: string, seo: ReturnType<typeof construire>): Promise<Response | null> {
  if (!source.body) return null;
  const enc = new TextEncoder();
  const ajout = enc.encode(
    `<base href="/"><script>window.__HYPE_ROUTE_ECURIE=${JSON.stringify(nomClub).replace(/</g, "\\u003c")};</script>` +
    `<meta name="description" content="${echapper(seo.description)}">` +
    `<link rel="canonical" href="${echapper(seo.canonical)}">` +
    `<meta property="og:type" content="website">` +
    `<meta property="og:site_name" content="Hype">` +
    `<meta property="og:locale" content="fr_FR">` +
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
  if (!m || m[1].length > 120) return PAGE_404();
  const slug = m[1];

  let ec: Ecurie | undefined;
  try { ec = (await annuaire(url.origin))[slug]; } catch (e) { console.log("[ecurie-route] annuaire :", String(e)); return PAGE_503(); }
  if (!ec || !propre(ec.n)) return PAGE_404();

  const [hype, geo] = await Promise.all([
    contenuHype(ec.n),
    propre(ec.v) ? Promise.resolve(null) : communeDepuisCoordonnees(ec.la, ec.lo),
  ]);
  const seo = construire(slug, ec, geo, hype);

  try {
    const source = await fetch(new URL("/", url.origin), { headers: { accept: "text/html" } });
    if (!source.ok) { console.log("[ecurie-route] index.html http", source.status); return PAGE_503(); }
    const page = await pageAvecRoute(source, propre(ec.n), seo);
    if (!page) { console.log("[ecurie-route] repère <head> introuvable"); return PAGE_503(); }
    if (request.method === "HEAD") { try { await page.body?.cancel(); } catch { /* rien */ } return new Response(null, { status: 200, headers: page.headers }); }
    return page;
  } catch (e) {
    console.log("[ecurie-route] erreur page :", String(e));
    return PAGE_503();
  }
};

export const config = { path: "/ecurie/*" };
