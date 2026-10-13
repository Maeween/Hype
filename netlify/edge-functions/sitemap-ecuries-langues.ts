/* ============================================================================
   HYPE ▸ netlify/edge-functions/sitemap-ecuries-langues.ts — 13/10/2026 (référencement)
   LES ÉCURIES TRADUITES DONNÉES À GOOGLE : https://2hype.fr/sitemap-ecuries-langues.xml

   Décision de Blandine (13/10) : une écurie n'a sa page dans les 7 langues que si elle a
   du contenu sur Hype (au moins un cheval ou un rendez-vous à venir) — même règle que
   ecurie-route.ts (« active »). Les autres gardent leur seule page française
   (sitemap-ecuries.xml), et leur adresse étrangère renvoie vers elle.
   Fabriquée à chaque demande depuis la base (clé publique) et l'annuaire ecuries.json :
   une écurie qui ajoute son premier cheval y apparaît toute seule.
   Base injoignable → 503 (Google réessaiera).
   ========================================================================= */
import type { Context } from "https://edge.netlify.com";

const SUPABASE_URL = "https://ldpjebgtskzdokrublfg.supabase.co";
const CLE = "sb_publishable_OoSj7bDnqn2O36myBAXF1g_VjPki8TK";
const DOMAINE = "https://2hype.fr";
const LANGUES = ["fr", "en", "es", "it", "de", "ja", "ar"];

function sept(chemin: string): string {
  const alt = LANGUES.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${DOMAINE}${l === "fr" ? "" : "/" + l}${chemin}"/>`).join("\n") +
    `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAINE}${chemin}"/>`;
  return LANGUES.map((l) => `  <url>\n    <loc>${DOMAINE}${l === "fr" ? "" : "/" + l}${chemin}</loc>\n${alt}\n  </url>`).join("\n");
}
/* La clé d'un club, EXACTEMENT comme l'appli (clefClubG) et ecurie-route.ts. */
function clefClub(n: unknown): string {
  return String(n || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
}
/* ecurie-route.ts lit les chevaux avec « club ilike nom » : égalité sans tenir compte des majuscules. */
function minuscules(n: unknown): string { return String(n || "").toLowerCase().replace(/\s+/g, " ").trim(); }

async function lire(chemin: string, signal: AbortSignal): Promise<any[]> {
  const r = await fetch(SUPABASE_URL + "/rest/v1/" + chemin, { headers: { apikey: CLE, Authorization: "Bearer " + CLE }, signal });
  if (!r.ok) throw new Error("supabase-http-" + r.status);
  const j = await r.json();
  return Array.isArray(j) ? j : [];
}

export default async (request: Request, _context: Context) => {
  const minuteur = new AbortController();
  const stop = setTimeout(() => minuteur.abort(), 6000);
  try {
    const aujourdhui = new Date().toISOString().slice(0, 10);
    const [annuaireR, chevaux, rdv] = await Promise.all([
      fetch(new URL("/ecuries.json", new URL(request.url).origin), { signal: minuteur.signal }),
      lire("chevaux?supprime_le=is.null&or=(visibilite.is.null,visibilite.neq.prive)&club=not.is.null&select=club&limit=10000", minuteur.signal),
      lire("club_agenda?or=(date_jour.gte." + aujourdhui + ",date_fin.gte." + aujourdhui + ")&select=club_clef&limit=5000", minuteur.signal),
    ]);
    if (!annuaireR.ok) throw new Error("ecuries.json http " + annuaireR.status);
    const annuaire: Record<string, { n: string; x?: number }> = await annuaireR.json();
    const clubsChevaux = new Set(chevaux.map((c) => minuscules(c.club)).filter(Boolean));
    const clubsRdv = new Set(rdv.map((r) => String(r.club_clef || "")).filter(Boolean));
    const slugs: string[] = [];
    for (const slug of Object.keys(annuaire).sort()) {
      const ec = annuaire[slug];
      if (!ec || ec.x === 1 || !ec.n) continue;
      if (clubsChevaux.has(minuscules(ec.n)) || clubsRdv.has(clefClub(ec.n))) slugs.push(slug);
    }
    const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
      slugs.map((s) => sept("/ecurie/" + s)).join("\n") + (slugs.length ? "\n" : "") + "</urlset>\n";
    return new Response(xml, { status: 200, headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=0, must-revalidate" } });
  } catch (e) {
    console.log("[sitemap-ecuries-langues] base injoignable :", String(e));
    return new Response("Service momentanément indisponible", { status: 503, headers: { "content-type": "text/plain; charset=utf-8", "retry-after": "3600", "cache-control": "no-store" } });
  } finally { clearTimeout(stop); }
};

export const config = { path: "/sitemap-ecuries-langues.xml" };
