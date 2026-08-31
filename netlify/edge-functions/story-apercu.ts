/* ============================================================================
   HYPE ▸ netlify/edge-functions/story-apercu.ts — 31/08/2026
   L'APERÇU WHATSAPP D'UNE STORY PARTAGÉE

   LE PROBLÈME, RAPPELÉ EN UNE PHRASE : les robots qui construisent la carte
   d'aperçu (WhatsApp, Instagram, Facebook, iMessage) n'exécutent JAMAIS le
   JavaScript. Ils lisent le HTML brut tel qu'il sort du serveur. Or dans
   story.html, la photo de la story n'existe qu'après une requête faite par
   le navigateur : au moment où le robot lit la page, il n'y a rien. D'où
   l'aperçu générique que voit Blandine.

   CE QUE FAIT CE FICHIER : il s'intercale devant story.html, va chercher la
   story en base AVANT de servir la page, et réécrit les six balises
   d'aperçu avec la vraie photo, le vrai nom, la vraie légende. Le HTML
   servi au visiteur, lui, est rigoureusement le même — seules les balises
   <meta> changent.

   ⚠️ RÈGLE ABSOLUE TENUE ICI : en cas de pépin (id absent, base qui ne
   répond pas, story expirée, délai dépassé), la fonction rend la page
   EXACTEMENT telle quelle, avec ses balises statiques d'aujourd'hui. Elle
   ne peut donc pas casser le partage existant : au pire, l'aperçu reste ce
   qu'il est en ce moment.

   PAS DE netlify.toml : la route est déclarée en bas de ce fichier
   (`export const config`). Rien à modifier dans la configuration du site,
   et aucun risque d'écraser un netlify.toml existant.

   La clé Supabase utilisée est la clé publiable, déjà présente en clair
   dans story.html : ce fichier n'expose rien de nouveau.
   ========================================================================= */

import type { Context } from "https://edge.netlify.com";

const SUPABASE_URL = "https://ldpjebgtskzdokrublfg.supabase.co";
const CLE = "sb_publishable_OoSj7bDnqn2O36myBAXF1g_VjPki8TK";

/* Le point de transformation d'image de Supabase, comme dans story.html.
   `resize=contain` est indispensable : sans lui la photo est recadrée.
   1200 px de large, c'est le format attendu par WhatsApp et Facebook. */
function urlApercu(u: string): string {
  try {
    if (!u || !u.includes("/storage/v1/object/public/")) return u;
    if (u.includes("/render/image/")) return u;
    return u.replace("/storage/v1/object/public/", "/storage/v1/render/image/public/")
      + (u.includes("?") ? "&" : "?") + "width=1200&resize=contain&quality=80";
  } catch { return u; }
}

/* Échappement pour une valeur d'attribut HTML. Une légende contient des
   guillemets et des apostrophes bien plus souvent qu'on ne le croit. */
function attr(txt: string): string {
  return String(txt || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* Une légende de story peut faire plusieurs paragraphes : la carte
   d'aperçu n'en montrera de toute façon que deux lignes. */
function resumer(txt: string, max: number): string {
  const t = String(txt || "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).trimEnd() + "…";
}

async function lire(chemin: string, signal: AbortSignal) {
  const r = await fetch(SUPABASE_URL + "/rest/v1/" + chemin, {
    headers: { apikey: CLE, Authorization: "Bearer " + CLE },
    signal,
  });
  if (!r.ok) throw new Error("http-" + r.status);
  return await r.json();
}

export default async (request: Request, context: Context) => {
  /* On sert d'abord la page telle qu'elle existe : quoi qu'il arrive
     ensuite, on a déjà une réponse valable sous la main. */
  const reponse = await context.next();
  /* Copie de secours : une fois le corps de la reponse lu (`.text()`), il
     ne peut plus etre relu. Sans ce clone, une erreur survenant APRES la
     lecture rendrait une reponse vide — page blanche. */
  const secours = reponse.clone();

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) return reponse;

    const type = reponse.headers.get("content-type") || "";
    if (!type.includes("text/html")) return reponse;

    /* Garde-fou de temps : un robot d'aperçu n'attend pas. Au-delà de
       2,5 secondes on abandonne et on rend la page inchangée. */
    const minuteur = new AbortController();
    const stop = setTimeout(() => minuteur.abort(), 2500);

    let story: any = null;
    let auteur: any = null;
    try {
      const lignes = await lire(
        "hype_stories?id=eq." + encodeURIComponent(id) +
        "&select=photo_url,legende,ecurie,user_id,expire_le,groupe,disposition",
        minuteur.signal,
      );
      story = lignes && lignes[0];

      if (story && story.user_id) {
        const profils = await lire(
          "profiles?id=eq." + encodeURIComponent(story.user_id) + "&select=pseudo",
          minuteur.signal,
        );
        auteur = profils && profils[0];
      }
    } finally {
      clearTimeout(stop);
    }

    if (!story || !story.photo_url) return reponse;
    /* Story expirée : on ne fabrique pas un bel aperçu pour une page qui
       affichera « Cette story n'est plus visible ». */
    if (story.expire_le && new Date(story.expire_le).getTime() < Date.now()) return reponse;

    const nom = (auteur && auteur.pseudo) ? String(auteur.pseudo) : "Un cavalier";
    const club = (story.ecurie && String(story.ecurie).trim() && String(story.ecurie).trim() !== "__perso__")
      ? String(story.ecurie).trim() : "";

    const titre = club ? `${nom} · ${club}` : `${nom} sur Hype`;
    const description = story.legende
      ? resumer(story.legende, 180)
      : "Un moment de vie d'écurie, partagé sur Hype.";
    const image = urlApercu(String(story.photo_url));

    let html = await reponse.text();

    /* Réécriture ciblée : on remplace la valeur des balises existantes,
       on n'en ajoute pas une deuxième — deux og:title, et le robot en
       choisit un au hasard. */
    html = html
      .replace(/(<meta property="og:title" content=")[^"]*(">)/, `$1${attr(titre)}$2`)
      .replace(/(<meta property="og:description" content=")[^"]*(">)/, `$1${attr(description)}$2`)
      .replace(/(<meta property="og:image" content=")[^"]*(">)/, `$1${attr(image)}$2`);

    /* og:url et les balises d'image secondaires n'existent pas dans le
       fichier statique — et c'est normal, elles n'ont de sens qu'ici, où
       l'on connaît enfin l'adresse exacte de la story. */
    const enPlus = [
      `<meta property="og:url" content="${attr(url.toString())}">`,
      `<meta property="og:image:alt" content="${attr(titre)}">`,
      `<meta name="twitter:title" content="${attr(titre)}">`,
      `<meta name="twitter:description" content="${attr(description)}">`,
      `<meta name="twitter:image" content="${attr(image)}">`,
    ].join("\n");
    html = html.replace(
      '<meta name="twitter:card" content="summary_large_image">',
      '<meta name="twitter:card" content="summary_large_image">\n' + enPlus,
    );

    const entetes = new Headers(reponse.headers);
    entetes.delete("content-length");
    return new Response(html, { status: reponse.status, headers: entetes });
  } catch {
    /* Toute erreur, quelle qu'elle soit : la page d'origine part quand même. */
    return secours;
  }
};

export const config = { path: "/story.html" };
