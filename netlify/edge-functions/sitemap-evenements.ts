/* ============================================================================
   HYPE ▸ netlify/edge-functions/sitemap-evenements.ts — 10/10/2026 (référencement, build 856)
   LA LISTE DES RENDEZ-VOUS DONNÉE À GOOGLE : https://2hype.fr/sitemap-evenements.xml
   Fabriquée à chaque demande depuis la base (club_agenda, clé publique) : les
   rendez-vous à venir et ceux des 60 derniers jours (un rendez-vous plus ancien
   garde sa page, il n'est simplement plus proposé à Google). Adresse identique à
   evenement-route.ts : /evenement/<titre>-<8 premiers signes de l'identifiant>.
   Base injoignable → 503 (Google réessaiera).
   ========================================================================= */
import type { Context } from "https://edge.netlify.com";

const SUPABASE_URL = "https://ldpjebgtskzdokrublfg.supabase.co";
const CLE = "sb_publishable_OoSj7bDnqn2O36myBAXF1g_VjPki8TK";
const DOMAINE = "https://2hype.fr";


/* 13/10/2026 : chaque page existe en 8 langues — on donne à Google les 8 adresses, chacune avec ses sœurs (hreflang). */
const LANGUES = ["fr", "en", "es", "it", "de", "ja", "ar", "zh", "nl", "pt", "sv"];
const HL: Record<string, string> = { zh: "zh-Hans", pt: "pt-BR" };   // le chinois simplifié s'écrit zh-Hans dans hreflang
function sept(chemin: string): string {
  const alt = LANGUES.map((l) => `    <xhtml:link rel="alternate" hreflang="${HL[l] || l}" href="${DOMAINE}${l === "fr" ? "" : "/" + l}${chemin}"/>`).join("\n") +
    `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAINE}${chemin}"/>`;
  return LANGUES.map((l) => `  <url>\n    <loc>${DOMAINE}${l === "fr" ? "" : "/" + l}${chemin}</loc>\n${alt}\n  </url>`).join("\n");
}
function slugTexte(s: string): string {
  return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70).replace(/-+$/, "");
}

export default async (_request: Request, _context: Context) => {
  const minuteur = new AbortController();
  const stop = setTimeout(() => minuteur.abort(), 6000);
  try {
    const depuis = new Date(Date.now() - 60 * 86400000).toISOString().slice(0, 10);
    const r = await fetch(SUPABASE_URL + "/rest/v1/club_agenda?or=(date_jour.gte." + depuis + ",date_fin.gte." + depuis + ")&select=id,titre&order=date_jour.asc&limit=5000", {
      headers: { apikey: CLE, Authorization: "Bearer " + CLE }, signal: minuteur.signal,
    });
    if (!r.ok) throw new Error("supabase-http-" + r.status);
    const lignes = await r.json();
    const urls: string[] = [];
    for (const ev of Array.isArray(lignes) ? lignes : []) {
      const id = String(ev.id || "");
      if (!/^[0-9a-f]{8}-/i.test(id)) continue;
      const s = slugTexte(ev.titre);
      urls.push(sept(`/evenement/${s ? s + "-" : ""}${id.slice(0, 8).toLowerCase()}`));
    }
    const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
      urls.join("\n") + (urls.length ? "\n" : "") + "</urlset>\n";
    return new Response(xml, { status: 200, headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=0, must-revalidate" } });
  } catch (e) {
    console.log("[sitemap-evenements] base injoignable :", String(e));
    return new Response("Service momentanément indisponible", { status: 503, headers: { "content-type": "text/plain; charset=utf-8", "retry-after": "3600", "cache-control": "no-store" } });
  } finally { clearTimeout(stop); }
};

export const config = { path: "/sitemap-evenements.xml" };
