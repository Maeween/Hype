/* ============================================================================
   HYPE ▸ netlify/edge-functions/cheval-route.ts — 09/10/2026 (référencement, build 3e + build 4 + build 5)
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
                  de naissance (origines officielles), écurie, nombre de résultats
                  visibles ; aucun nom de cavalier ;
     canonical    https://2hype.fr/cheval/<adresse> (toujours 2hype.fr, même
                  ouvert depuis 2hype.netlify.app).

   BUILD 5 (09/10) — L'APERÇU DANS WHATSAPP, MESSAGES, FACEBOOK, X… (Open Graph) :
     og:title / og:description / og:url (= canonical) / og:image / og:type,
     et les équivalents twitter:. Photo = la PHOTO PRINCIPALE du cheval
     (chevaux.photo_url — choix de Blandine du 09/10), agrandie à 1200 px par
     Supabase comme pour les stories ; pas de photo (ou photo non publiable,
     ex. data:) → l'icône Hype icon-512.png (⚠️ partage-apercu.jpg, utilisé par
     story.html, n'existe PAS sur le dépôt : non utilisé ici).

   CE QU'IL NE FAIT PAS (builds suivants) : aucun texte pour Google dans la
   page, aucun cache.

   ⚠️ LE GROS FICHIER N'EST PAS RELU : on ne lit que le début de la page
   (jusqu'à <head>, vers 200 Ko), on ajoute la ligne, et tout le reste
   (environ 9,4 Mo) part tel quel, morceau par morceau, sans être touché.
   ========================================================================= */

import type { Context } from "https://edge.netlify.com";

const SUPABASE_URL = "https://ldpjebgtskzdokrublfg.supabase.co";
const CLE = "sb_publishable_OoSj7bDnqn2O36myBAXF1g_VjPki8TK";

const FORME_ADRESSE = /^\/cheval\/([a-z0-9]+(?:-[a-z0-9]+)*)$/;
const FORME_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const REPERE = new TextEncoder().encode('<head><meta charset="utf-8">');
const REPERE_TITRE = new TextEncoder().encode("<title>Hype</title>");   // build 4 : remplacé par le titre du cheval
const DOMAINE = "https://2hype.fr";
const LECTURE_MAX = 2 * 1024 * 1024;   // si le repère n'est pas dans les 2 premiers Mo : on s'arrête
const DELAI_BASE_MS = 2500;

/* ---------- Petites pages d'erreur (7 langues, sans dépendre de l'appli) ---------- */
function pageSimple(statut: number, lignes: string[][], titre: string): Response {
  const corps = lignes.map(([lang, txt]) =>
    `<p lang="${lang}"${lang === "ar" ? ' dir="rtl"' : ""}>${txt}</p>`).join("\n");
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
], "Hype");

const PAGE_503 = () => pageSimple(503, [
  ["fr", "Hype est momentanément indisponible. Réessaie dans un instant."],
  ["en", "Hype is temporarily unavailable. Please try again shortly."],
  ["es", "Hype no está disponible por el momento. Inténtalo de nuevo en un instante."],
  ["it", "Hype è momentaneamente non disponibile. Riprova tra un attimo."],
  ["de", "Hype ist vorübergehend nicht erreichbar. Versuche es gleich noch einmal."],
  ["ja", "Hypeは一時的に利用できません。しばらくしてからもう一度お試しください。"],
  ["ar", "هايب غير متاح مؤقتًا. حاول مرة أخرى بعد قليل."],
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

function infosSeo(cheval: any, nbResultats: number, slug: string) {
  const nom = propre(cheval.nom) || "Cheval";
  const race = propre(cheval.race);
  let origines: any = cheval.origines;
  try { if (typeof origines === "string") origines = JSON.parse(origines); } catch { origines = null; }
  const mAn = String((origines && origines.naissance) || "").match(/^(\d{4})/);
  const annee = mAn ? mAn[1] : "";
  const clubBrut = propre(cheval.club) || propre(cheval.ecurie);
  const club = (clubBrut && clubBrut !== "__perso__") ? clubBrut : "";

  const titre = nom + " – " + (race || "Profil cheval") + " | Hype";

  let phrase = nom;
  if (race) phrase += ", " + race;
  if (annee) phrase += " (" + annee + ")";
  if (club) phrase += " — " + club;
  phrase += ". ";
  phrase += nbResultats > 0
    ? "Profil, photos et " + nbResultats + " résultat" + (nbResultats > 1 ? "s" : "") + " en concours sur Hype."
    : "Profil et photos sur Hype.";

  return { titre, description: phrase, canonical: DOMAINE + "/cheval/" + slug, image: imageApercu(cheval.photo_url), nom };
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

/* Nombre exact de résultats visibles (en-tête Content-Range « 0-0/189 »). */
async function compterResultats(chevalId: string, signal: AbortSignal): Promise<number> {
  const r = await fetch(SUPABASE_URL + "/rest/v1/resultats?cheval_id=eq." + encodeURIComponent(chevalId) +
    "&visible=is.true&masque_cavaliere=not.is.true&select=id", {
    headers: { apikey: CLE, Authorization: "Bearer " + CLE, Prefer: "count=exact", Range: "0-0" },
    signal,
  });
  if (!r.ok && r.status !== 206 && r.status !== 416) throw new Error("supabase-http-" + r.status);
  try { await r.body?.cancel(); } catch { /* rien */ }
  const total = (r.headers.get("content-range") || "").split("/")[1];
  const n = parseInt(total || "0", 10);
  return isFinite(n) && n > 0 ? n : 0;
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
async function pageAvecRoute(source: Response, uuid: string, seo: { titre: string; description: string; canonical: string; image: string; nom: string }): Promise<Response | null> {
  if (!source.body) return null;
  const enc = new TextEncoder();
  const ajout = enc.encode(
    `<base href="/"><script>window.__HYPE_ROUTE_CHEVAL=${JSON.stringify(uuid)};</script>` +
    `<meta name="description" content="${echapper(seo.description)}">` +
    `<link rel="canonical" href="${echapper(seo.canonical)}">` +
    // build 5 : aperçu de partage (Open Graph + X/Twitter)
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

  // 1. On lit seulement le début : jusqu'au repère <head><meta charset="utf-8">,
  //    puis jusqu'au <title>Hype</title> qui le suit de quelques centaines d'octets.
  let debut = new Uint8Array(0);
  let pos = -1, posTitre = -1;
  while (pos < 0 || posTitre < 0) {
    const { value, done } = await lecteur.read();
    if (done) break;
    const depart = Math.max(0, debut.length - REPERE.length);
    debut = coller(debut, value);
    if (pos < 0) { const p = chercher(debut.subarray(depart), REPERE); if (p >= 0) pos = depart + p; }
    if (pos >= 0 && posTitre < 0) {
      const dT = Math.max(pos, debut.length - value.length - REPERE_TITRE.length);
      const pT = chercher(debut.subarray(dT), REPERE_TITRE);
      if (pT >= 0) posTitre = dT + pT;
    }
    if (debut.length > LECTURE_MAX) break;
  }
  if (pos < 0) { try { lecteur.cancel(); } catch { /* rien */ } return null; }

  const coupe = pos + REPERE.length;
  let tete: Uint8Array;
  if (posTitre > coupe) {
    // un seul <title> : celui du cheval remplace « Hype »
    tete = coller(coller(coller(coller(debut.subarray(0, coupe), ajout), debut.subarray(coupe, posTitre)), nouveauTitre),
      debut.subarray(posTitre + REPERE_TITRE.length));
  } else {
    // <title>Hype</title> introuvable (index.html modifié ?) : la page marche quand même, sans titre de cheval
    console.log("[cheval-route] <title>Hype</title> introuvable : titre non remplacé");
    tete = coller(coller(debut.subarray(0, coupe), ajout), debut.subarray(coupe));
  }

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
  if (!m || m[1].length > 120) return PAGE_404();
  const slug = m[1];

  // 2 à 4. Le cheval, et peut-il être montré ?
  const minuteur = new AbortController();
  const stop = setTimeout(() => minuteur.abort(), DELAI_BASE_MS);
  let cheval: any = null;
  let aUnResultat = false;
  let nbResultats = 0;
  try {
    const lignes = await lire(
      "chevaux?slug=eq." + encodeURIComponent(slug) +
      "&select=id,nom,race,club,ecurie,origines,supprime_le,visibilite,photo_url&limit=1",
      minuteur.signal,
    );
    cheval = lignes && lignes[0];
    if (cheval && FORME_UUID.test(String(cheval.id || ""))) {
      nbResultats = await compterResultats(String(cheval.id), minuteur.signal);
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

  // 5. La page Hype normale, avec la ligne ajoutée
  try {
    const source = await fetch(new URL("/", url.origin), { headers: { accept: "text/html" } });
    if (!source.ok) { console.log("[cheval-route] index.html http", source.status); return PAGE_503(); }
    const page = await pageAvecRoute(source, String(cheval.id), infosSeo(cheval, nbResultats, slug));
    if (!page) { console.log("[cheval-route] repère <head> introuvable"); return PAGE_503(); }
    if (request.method === "HEAD") { try { await page.body?.cancel(); } catch { /* rien */ } return new Response(null, { status: 200, headers: page.headers }); }
    return page;
  } catch (e) {
    console.log("[cheval-route] erreur page :", String(e));
    return PAGE_503();
  }
};

export const config = { path: "/cheval/*" };
