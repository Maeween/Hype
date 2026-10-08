/* ============================================================================
   HYPE ▸ netlify/edge-functions/cheval-route.ts — 09/10/2026 (référencement, build 3e)
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

   CE QU'IL NE FAIT PAS (builds suivants) : aucun titre, aucune description,
   aucun aperçu WhatsApp, aucun texte pour Google, aucun cache.

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

/* ---------- Lecture Supabase (clé publique) ---------- */
async function lire(chemin: string, signal: AbortSignal): Promise<any[]> {
  const r = await fetch(SUPABASE_URL + "/rest/v1/" + chemin, {
    headers: { apikey: CLE, Authorization: "Bearer " + CLE },
    signal,
  });
  if (!r.ok) throw new Error("supabase-http-" + r.status);
  return await r.json();
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
async function pageAvecRoute(source: Response, uuid: string): Promise<Response | null> {
  if (!source.body) return null;
  const ajout = new TextEncoder().encode(
    `<base href="/"><script>window.__HYPE_ROUTE_CHEVAL=${JSON.stringify(uuid)};</script>`);
  const lecteur = source.body.getReader();

  // 1. On lit seulement jusqu'au repère <head><meta charset="utf-8">.
  let debut = new Uint8Array(0);
  let pos = -1;
  while (pos < 0) {
    const { value, done } = await lecteur.read();
    if (done) break;
    // on ne recherche que dans la zone neuve (+ chevauchement de la taille du repère)
    const depart = Math.max(0, debut.length - REPERE.length);
    debut = coller(debut, value);
    const p = chercher(debut.subarray(depart), REPERE);
    if (p >= 0) pos = depart + p;
    else if (debut.length > LECTURE_MAX) break;
  }
  if (pos < 0) { try { lecteur.cancel(); } catch { /* rien */ } return null; }

  const coupe = pos + REPERE.length;
  const tete = coller(coller(debut.subarray(0, coupe), ajout), debut.subarray(coupe));

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
  try {
    const lignes = await lire(
      "chevaux?slug=eq." + encodeURIComponent(slug) + "&select=id,supprime_le,visibilite,photo_url&limit=1",
      minuteur.signal,
    );
    cheval = lignes && lignes[0];
    if (cheval && !String(cheval.photo_url || "").trim()) {
      const res = await lire(
        "resultats?cheval_id=eq." + encodeURIComponent(cheval.id) +
        "&visible=is.true&masque_cavaliere=not.is.true&select=id&limit=1",
        minuteur.signal,
      );
      aUnResultat = Array.isArray(res) && res.length > 0;
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
    const page = await pageAvecRoute(source, String(cheval.id));
    if (!page) { console.log("[cheval-route] repère <head> introuvable"); return PAGE_503(); }
    if (request.method === "HEAD") { try { await page.body?.cancel(); } catch { /* rien */ } return new Response(null, { status: 200, headers: page.headers }); }
    return page;
  } catch (e) {
    console.log("[cheval-route] erreur page :", String(e));
    return PAGE_503();
  }
};

export const config = { path: "/cheval/*" };
