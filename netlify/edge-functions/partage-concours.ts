/* ============================================================================
   HYPE ▸ netlify/edge-functions/partage-concours.ts — 14/11/2026
   L'APERÇU WHATSAPP D'UNE PARTIE DU CONCOURS (groupes du paddock, règles, passages, infos, embarquement)

   Blandine (14/11 15h02) : « c'est toujours pas le bon aperçu qui s'affiche » — le lien 2hype.fr/#r=… donne
   l'aperçu général de Hype, parce que les robots d'aperçu ne voient jamais ce qui suit le « # ».

   Adresse : https://2hype.fr/partage/<id du concours>/<fichier>.jpg?t=<titre>
   - <fichier> = l'image du haut de la partie, dessinée dans l'appli au moment du partage et déposée dans
     le stockage public « photos » (dossier partages/). Seul ce dossier est accepté.
   - Le robot lit les balises d'aperçu (image = cette image, titre = le concours + la partie).
   - Une personne qui touche le lien est envoyée tout de suite sur la page du concours (/#r=<id>).
   En cas de pépin (adresse mal formée), on renvoie simplement vers l'accueil : rien ne casse.
   ========================================================================= */

import type { Context } from "https://edge.netlify.com";

const SUPABASE_URL = "https://ldpjebgtskzdokrublfg.supabase.co";
const FORME = /^\/partage\/([0-9a-f-]{36})\/([A-Za-z0-9_-]{6,120}\.jpg)\/?$/;

function esc(t: string): string {
  return String(t || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export default async (req: Request, _ctx: Context) => {
  const u = new URL(req.url);
  const m = u.pathname.match(FORME);
  if (!m) return Response.redirect(new URL("/", u.origin).toString(), 302);
  const id = m[1], fichier = m[2];
  const titre = (u.searchParams.get("t") || "Hype").slice(0, 140);
  const desc = (u.searchParams.get("d") || "Ouvre la page du concours sur Hype").slice(0, 200);
  const image = SUPABASE_URL + "/storage/v1/object/public/photos/partages/" + fichier;
  const cible = "/#r=" + id;
  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
<title>${esc(titre)}</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Hype">
<meta property="og:title" content="${esc(titre)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="720">
<meta property="og:image:height" content="900">
<meta property="og:url" content="${esc(u.toString())}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${esc(image)}">
<meta http-equiv="refresh" content="0;url=${esc(cible)}">
<style>body{margin:0;background:#070A08;color:#F3EEE4;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh}</style>
</head><body><a href="${esc(cible)}" style="color:#C9A66B">Ouvrir la page sur Hype →</a>
<script>location.replace(${JSON.stringify(cible)});</script></body></html>`;
  return new Response(html, { status: 200, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=300" } });
};

export const config = { path: "/partage/*" };
