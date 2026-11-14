/* ============================================================================
   HYPE ▸ netlify/edge-functions/partage-concours.ts
   L'APERÇU WHATSAPP D'UNE PARTIE DU CONCOURS + DES ADRESSES COURTES ET LISIBLES

   14/11 15h02 (Blandine : « c'est toujours pas le bon aperçu ») : les robots d'aperçu ne voient jamais ce qui suit
   le « # » de 2hype.fr/#r=… → aperçu général de Hype. Cette fonction sert les balises d'aperçu de la partie partagée,
   puis envoie aussitôt la personne sur la page du concours.

   14/11 18h07 (Blandine : « réduire l'adresse… que les adresses aient un sens… éviter 6 lignes de chiffres et de lettres ») :
   NOUVELLE ADRESSE   https://2hype.fr/concours/<nom-lisible>-<8 signes>/<partie>[/<cavalier>]
     ex.              https://2hype.fr/concours/cso-versailles-15-novembre-766850e8/ordre-de-passage
                      https://2hype.fr/concours/cso-versailles-15-novembre-766850e8/ordre-de-passage/ella
     - seuls les 8 signes de la fin comptent (le nom n'est là que pour être lisible : s'il change, l'adresse marche toujours) ;
     - <partie> : infos, regles-du-paddock, groupes-du-paddock, ordre-de-passage, embarquement, materiel ;
     - le titre et la date de l'aperçu sont lus en base (club_agenda, lisible par tous, clé publique) ;
     - l'image = la plus récente déposée par l'appli pour ce concours et cette partie, dans le stockage public
       « photos/partages/<8 signes>-<partie>-….jpg » ; sinon l'image Hype commune ;
     - la personne est envoyée sur /?partie=<partie>[&qui=<cavalier>]#r=<id> (ou /#lv=<id> pour le matériel).
   ANCIENNE ADRESSE   /partage/<id>/<fichier>.jpg?t=…&d=… : gardée telle quelle (liens déjà envoyés aux groupes).
   Les deux portent « noindex » : ce ne sont pas des pages pour Google (voir SUIVI : page publique du concours, à décider).
   ========================================================================= */

import type { Context } from "https://edge.netlify.com";

const SUPABASE_URL = "https://ldpjebgtskzdokrublfg.supabase.co";
const CLE = "sb_publishable_OoSj7bDnqn2O36myBAXF1g_VjPki8TK";
const DOMAINE = "https://2hype.fr";
const IMAGE_COMMUNE = DOMAINE + "/partage-apercu.jpg";
const ANCIENNE = /^\/partage\/([0-9a-f-]{36})\/([A-Za-z0-9_-]{6,120}\.jpg)\/?$/;
const NOUVELLE = /^\/concours\/(?:[a-z0-9]+(?:-[a-z0-9]+)*-)?([0-9a-f]{8})(?:\/([a-z-]{2,40}))?(?:\/([a-z0-9-]{1,60}))?\/?$/;
const PARTIES: Record<string, string> = {
  "infos": "Informations du concours",
  "regles-du-paddock": "Règles du paddock",
  "groupes-du-paddock": "Groupes du paddock",
  "ordre-de-passage": "Ordre de passage",
  "embarquement": "Ordre d’embarquement",
  "materiel": "Matériel à emporter",
};
const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

function esc(t: string): string {
  return String(t || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function dateLisible(j: string | null): string {
  const m = String(j || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return "";
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  const t = JOURS[d.getUTCDay()] + " " + (+m[3]) + " " + MOIS[+m[2] - 1];
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function page(titre: string, desc: string, image: string, adresse: string, cible: string): Response {
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
<meta property="og:url" content="${esc(adresse)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${esc(image)}">
<meta http-equiv="refresh" content="0;url=${esc(cible)}">
<style>body{margin:0;background:#070A08;color:#F3EEE4;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh}</style>
</head><body><a href="${esc(cible)}" style="color:#C9A66B">Ouvrir la page sur Hype →</a>
<script>location.replace(${JSON.stringify(cible)});</script></body></html>`;
  return new Response(html, { status: 200, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=120" } });
}
async function lire(chemin: string): Promise<any> {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 2500);
  try {
    const r = await fetch(SUPABASE_URL + "/rest/v1/" + chemin, { headers: { apikey: CLE, Authorization: "Bearer " + CLE }, signal: ctl.signal });
    return r.ok ? await r.json() : null;
  } catch { return null; } finally { clearTimeout(t); }
}
async function derniereImage(prefixe: string): Promise<string | null> {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 2500);
  try {
    const r = await fetch(SUPABASE_URL + "/storage/v1/object/list/photos", {
      method: "POST", signal: ctl.signal,
      headers: { apikey: CLE, Authorization: "Bearer " + CLE, "content-type": "application/json" },
      body: JSON.stringify({ prefix: "partages/", search: prefixe, limit: 20, sortBy: { column: "created_at", order: "desc" } }),
    });
    if (!r.ok) return null;
    const l = await r.json();
    const f = (Array.isArray(l) ? l : []).find((x: any) => x && typeof x.name === "string" && x.name.startsWith(prefixe) && x.name.endsWith(".jpg"));
    return f ? SUPABASE_URL + "/storage/v1/object/public/photos/partages/" + f.name : null;
  } catch { return null; } finally { clearTimeout(t); }
}

export default async (req: Request, _ctx: Context) => {
  const u = new URL(req.url);
  const accueil = () => Response.redirect(new URL("/", u.origin).toString(), 302);

  /* ancienne adresse (liens déjà envoyés) */
  const a = u.pathname.match(ANCIENNE);
  if (a) {
    const titre = (u.searchParams.get("t") || "Hype").slice(0, 140);
    const desc = (u.searchParams.get("d") || "Ouvre la page du concours sur Hype").slice(0, 200);
    return page(titre, desc, SUPABASE_URL + "/storage/v1/object/public/photos/partages/" + a[2], u.toString(), "/#r=" + a[1]);
  }

  /* nouvelle adresse lisible */
  const m = u.pathname.match(NOUVELLE);
  if (!m) return accueil();
  const court = m[1], partie = m[2] && PARTIES[m[2]] ? m[2] : "", qui = (m[3] || "").slice(0, 60);
  const lignes = await lire("club_agenda?id=gte." + court + "-0000-0000-0000-000000000000&id=lte." + court + "-ffff-ffff-ffff-ffffffffffff&select=id,titre,date_jour,lieu&limit=1");
  const ev = Array.isArray(lignes) && lignes[0] ? lignes[0] : null;
  if (!ev) return accueil();
  const nomQui = qui ? qui.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "";
  const titre = [ev.titre || "Concours", partie ? PARTIES[partie] : "", nomQui].filter(Boolean).join(" · ");
  const desc = [dateLisible(ev.date_jour), ev.lieu ? String(ev.lieu).split(",")[0] : ""].filter(Boolean).join(" · ") || "Ouvre la page du concours sur Hype";
  const image = (partie ? await derniereImage(court + "-" + partie + "-") : null) || IMAGE_COMMUNE;
  const cible = partie === "materiel" ? "/#lv=" + ev.id
    : "/" + (partie ? "?partie=" + partie + (qui ? "&qui=" + encodeURIComponent(qui) : "") : "") + "#r=" + ev.id;
  return page(titre, desc, image, u.toString(), cible);
};

export const config = { path: ["/partage/*", "/concours/*"] };
