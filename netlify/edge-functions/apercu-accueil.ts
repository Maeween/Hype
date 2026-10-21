/* ============================================================================
   HYPE ▸ netlify/edge-functions/apercu-accueil.ts — 13/10/2026
   L'APERÇU (BANDEAU) QUAND ON PARTAGE 2hype.fr DANS WHATSAPP, MESSAGES, ETC.

   LE PROBLÈME : la page d'accueil pèse environ 8 Mo. Les robots d'aperçu
   (WhatsApp, Facebook, Messages, Telegram…) ne lisent que le début d'une page
   et abandonnent si elle est trop lourde : pas de bandeau dans le partage,
   alors que les balises sont pourtant bonnes.

   CE QUE FAIT CE FICHIER : quand c'est UN ROBOT D'APERÇU qui demande
   l'accueil, il reçoit une petite page légère (≈ 2 Ko) avec le titre, la
   description et le bandeau Hype (images/hype-partage-1200x630.jpg).
   Les visiteurs ne voient AUCUNE différence : pour eux, la fonction ne fait
   rien et la vraie page passe telle quelle.

   ⚠️ Google (Googlebot) n'est PAS concerné, volontairement : il continue de
   voir la vraie page. Seuls les robots de « carte d'aperçu » sont visés.

   POUR ANNULER : supprimer ce fichier. Rien d'autre à toucher.
   Titre et description : mêmes textes que outils/seo-accueil.cjs (à garder
   identiques si on les change là-bas).
   ========================================================================= */

import type { Context } from "https://edge.netlify.com";

const DOMAINE = "https://2hype.fr";
const TITRE = "Hype — l'appli des cavaliers : ton cheval, ton écurie et une IA équestre";
const DESCRIPTION = "Photos, souvenirs, vidéos, résultats en concours, santé et soins de ton cheval, " +
  "agenda de ton écurie et Hey Baby, l'IA équestre. En 13 langues.";
const IMAGE = DOMAINE + "/images/hype-partage-1200x630.jpg";

/* Robots qui fabriquent les cartes d'aperçu. iMessage / Messages se présente
   comme facebookexternalhit + Twitterbot. Pas de Googlebot ici. */
const ROBOTS_APERCU = /whatsapp|facebookexternalhit|facebot|twitterbot|slackbot|telegrambot|discordbot|linkedinbot|skypeuripreview|pinterest|redditbot|embedly|vkshare|snapchat|viber|signal|applebot-preview|iframely|mastodon/i;

function echapper(t: string): string {
  return t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function pageApercu(): string {
  const t = echapper(TITRE), d = echapper(DESCRIPTION);
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8">` +
    `<title>${t}</title>` +
    `<meta name="description" content="${d}">` +
    `<link rel="canonical" href="${DOMAINE}/">` +
    `<meta property="og:type" content="website">` +
    `<meta property="og:site_name" content="Hype">` +
    `<meta property="og:locale" content="fr_FR">` +
    `<meta property="og:title" content="${t}">` +
    `<meta property="og:description" content="${d}">` +
    `<meta property="og:url" content="${DOMAINE}/">` +
    `<meta property="og:image" content="${IMAGE}">` +
    `<meta property="og:image:secure_url" content="${IMAGE}">` +
    `<meta property="og:image:type" content="image/jpeg">` +
    `<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">` +
    `<meta property="og:image:alt" content="Hype — l'appli des cavaliers">` +
    `<meta name="twitter:card" content="summary_large_image">` +
    `<meta name="twitter:title" content="${t}">` +
    `<meta name="twitter:description" content="${d}">` +
    `<meta name="twitter:image" content="${IMAGE}">` +
    `</head><body><h1>${t}</h1><p>${d}</p>` +
    `<p><img src="${IMAGE}" width="1200" height="630" alt="Hype"></p>` +
    `<p><a href="${DOMAINE}/">2hype.fr</a></p></body></html>`;
}

export default async (req: Request, _context: Context) => {
  try {
    if (req.method !== "GET" && req.method !== "HEAD") return;
    const ua = req.headers.get("user-agent") || "";
    if (!ROBOTS_APERCU.test(ua) || /googlebot/i.test(ua)) return; // visiteurs : la vraie page
    return new Response(req.method === "HEAD" ? null : pageApercu(), {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=0, must-revalidate",
        "vary": "User-Agent",
      },
    });
  } catch {
    return; // au moindre pépin, la vraie page
  }
};

export const config = { path: ["/", "/index.html"] };
