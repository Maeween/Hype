/* ============================================================================
   HYPE ▸ netlify/edge-functions/sitemap-chevaux.ts — 09/10/2026 (référencement, build 7)
   LA LISTE DES FICHES CHEVAUX DONNÉE À GOOGLE : https://2hype.fr/sitemap-chevaux.xml

   Fabriquée à chaque demande à partir de la base (jamais écrite en dur) :
   un cheval y figure s'il a une adresse (chevaux.slug), s'il n'est pas
   supprimé, pas marqué « prive », et s'il a une photo OU au moins un résultat
   visible (visible = true et pas masqué par la cavalière) — EXACTEMENT la même
   règle que cheval-route.ts, pour que le sitemap ne liste jamais une page 404.
   Un nouveau cheval mis en ligne y apparaît donc tout seul.

   Adresses toujours en https://2hype.fr/cheval/<adresse> (jamais netlify.app,
   jamais de #, jamais d'alias). Base injoignable → 503 (Google réessaiera).
   ========================================================================= */

import type { Context } from "https://edge.netlify.com";

const SUPABASE_URL = "https://ldpjebgtskzdokrublfg.supabase.co";
const CLE = "sb_publishable_OoSj7bDnqn2O36myBAXF1g_VjPki8TK";
const DOMAINE = "https://2hype.fr";

/* 13/10/2026 : chaque page existe en 7 langues — on donne à Google les 7 adresses, chacune avec ses sœurs (hreflang). */
const LANGUES = ["fr", "en", "es", "it", "de", "ja", "ar"];
function sept(chemin: string): string {
  const alt = LANGUES.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${DOMAINE}${l === "fr" ? "" : "/" + l}${chemin}"/>`).join("\n") +
    `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAINE}${chemin}"/>`;
  return LANGUES.map((l) => `  <url>\n    <loc>${DOMAINE}${l === "fr" ? "" : "/" + l}${chemin}</loc>\n${alt}\n  </url>`).join("\n");
}
const FORME_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FORME_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function lire(chemin: string, signal: AbortSignal): Promise<any[]> {
  const r = await fetch(SUPABASE_URL + "/rest/v1/" + chemin, {
    headers: { apikey: CLE, Authorization: "Bearer " + CLE },
    signal,
  });
  if (!r.ok) throw new Error("supabase-http-" + r.status);
  return await r.json();
}

export default async (_request: Request, _context: Context) => {
  const minuteur = new AbortController();
  const stop = setTimeout(() => minuteur.abort(), 6000);
  try {
    const chevaux = await lire(
      "chevaux?slug=not.is.null&supprime_le=is.null&or=(visibilite.is.null,visibilite.neq.prive)" +
      "&select=id,slug,photo_url&order=slug.asc&limit=5000",
      minuteur.signal,
    );
    const garder: string[] = [];
    for (const c of chevaux || []) {
      const slug = String(c.slug || "");
      if (!FORME_SLUG.test(slug)) continue;
      if (String(c.photo_url || "").trim() !== "") { garder.push(slug); continue; }
      // sans photo : il faut au moins un résultat visible
      if (!FORME_UUID.test(String(c.id || ""))) continue;
      const res = await lire(
        "resultats?cheval_id=eq." + encodeURIComponent(c.id) +
        "&visible=is.true&masque_cavaliere=not.is.true&select=id&limit=1",
        minuteur.signal,
      );
      if (Array.isArray(res) && res.length > 0) garder.push(slug);
    }
    const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
      garder.map((s) => sept("/cheval/" + s)).join("\n") +
      (garder.length ? "\n" : "") +
      "</urlset>\n";
    return new Response(xml, {
      status: 200,
      headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=0, must-revalidate" },
    });
  } catch (e) {
    console.log("[sitemap-chevaux] base injoignable :", String(e));
    return new Response("Service momentanément indisponible", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8", "retry-after": "3600", "cache-control": "no-store" },
    });
  } finally {
    clearTimeout(stop);
  }
};

export const config = { path: "/sitemap-chevaux.xml" };
