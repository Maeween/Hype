/* ============================================================
   HYPE — mux-import (20/10/2026, nuit) — Blandine : « Ok » au plan
   « copier les anciennes vidéos sur Mux, sans rien supprimer ».

   À QUOI ÇA SERT
   46 anciennes vidéos (≈ 2 Go) sont stockées directement dans le
   compartiment « photos » de Supabase, hors Mux : lourdes à regarder,
   sans qualité adaptative, sans le lecteur Mux. Cette fonction demande
   à Mux d'ALLER CHERCHER une de ces vidéos à son adresse publique et
   d'en faire une vidéo Mux (mêmes réglages que mux-upload : qualité
   « basic », lecture publique, MP4 capped-1080p de secours).

   CE QU'ELLE NE FAIT PAS
   - Elle ne supprime RIEN, ni dans Supabase ni ailleurs.
   - Elle ne change AUCUNE adresse dans la base : le remplacement des
     adresses se fait ensuite par un SQL que Blandine passe elle-même,
     à partir de la table hype_import_mux.
   - Elle ne touche pas à mux-upload ni aux quotas.

   QUI PEUT L'APPELER
   Seulement le compte de Blandine (feinn@live.fr), vérifié côté serveur
   à partir de son jeton de session. Tout autre appel est refusé.

   ACTIONS (corps JSON)
   - { action: "importer", url }  : demande à Mux de copier la vidéo.
       L'adresse doit être une vidéo (.mov / .mp4) du compartiment public
       « photos » de CE projet. Une adresse déjà importée n'est pas
       renvoyée à Mux (pas de doublon, pas de double coût).
   - { action: "etat" }           : met à jour et renvoie l'état de toutes
       les copies (en préparation, prête, en erreur).
   ============================================================ */

const ALLOWED_ORIGIN = "*";
const cors = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const jsonHeaders = { ...cors, "Content-Type": "application/json" };

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const COMPTE_AUTORISE = "feinn@live.fr";

function repondre(corps: unknown, status = 200) {
  return new Response(JSON.stringify(corps), { status, headers: jsonHeaders });
}

async function emailDuJeton(req: Request): Promise<string | null> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  const entete = req.headers.get("Authorization") || "";
  if (!entete.toLowerCase().startsWith("bearer ")) return null;
  const jeton = entete.slice(7).trim();
  if (!jeton) return null;
  try {
    const rep = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { Authorization: `Bearer ${jeton}`, apikey: SUPABASE_ANON_KEY },
    });
    if (!rep.ok) return null;
    const u = await rep.json();
    return u && u.email ? String(u.email).toLowerCase().trim() : null;
  } catch (_e) {
    return null; // fermé quand on ne sait pas
  }
}

/* Lecture / écriture de la table hype_import_mux avec la clé de service
   (la table n'a aucune règle d'accès publique : seule cette fonction y écrit). */
async function table(methode: string, chemin: string, corps?: unknown, extra: Record<string, string> = {}) {
  const rep = await fetch(`${SUPABASE_URL}/rest/v1/${chemin}`, {
    method: methode,
    headers: {
      apikey: SERVICE_KEY!,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      ...extra,
    },
    body: corps === undefined ? undefined : JSON.stringify(corps),
  });
  const texte = await rep.text();
  let donnees: unknown = null;
  try { donnees = texte ? JSON.parse(texte) : null; } catch (_e) { donnees = texte; }
  return { ok: rep.ok, status: rep.status, donnees };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return repondre({ error: "Méthode non autorisée" }, 405);

  const idMux = Deno.env.get("MUX_TOKEN_ID");
  const secretMux = Deno.env.get("MUX_TOKEN_SECRET");
  if (!idMux || !secretMux || !SUPABASE_URL || !SERVICE_KEY) return repondre({ error: "Configuration absente" }, 500);

  const email = await emailDuJeton(req);
  if (email !== COMPTE_AUTORISE) return repondre({ error: "Réservé au compte administrateur" }, 403);

  let body: { action?: unknown; url?: unknown } | null = null;
  try { body = await req.json(); } catch (_e) { body = null; }
  const authMux = "Basic " + btoa(`${idMux}:${secretMux}`);

  /* ---------- ÉTAT DE TOUTES LES COPIES ---------- */
  if (body?.action === "etat") {
    const lignes = await table("GET", "hype_import_mux?select=*&order=cree_le.asc");
    if (!lignes.ok) return repondre({ error: "Table hype_import_mux illisible (SQL passé ?)", detail: lignes.donnees }, 500);
    const liste = (lignes.donnees as Array<Record<string, unknown>>) || [];
    for (const l of liste) {
      if (l.statut === "ready" || l.statut === "errored" || !l.asset_id) continue;
      try {
        const r = await fetch(`https://api.mux.com/video/v1/assets/${l.asset_id}`, { headers: { Authorization: authMux } });
        if (!r.ok) continue;
        const a = (await r.json())?.data || {};
        const maj = { statut: String(a.status || l.statut), duree_s: typeof a.duration === "number" ? a.duration : null, maj_le: new Date().toISOString() };
        await table("PATCH", `hype_import_mux?source_url=eq.${encodeURIComponent(String(l.source_url))}`, maj);
        Object.assign(l, maj);
      } catch (_e) { /* on garde l'état connu */ }
    }
    return repondre({ copies: liste });
  }

  /* ---------- TOUT IMPORTER (20/10, Blandine « vas-y ») ----------
     Copie d'un coup toutes les vidéos de la liste hype_import_mux en statut « a_copier » (liste préparée
     en base) ou « errored » (nouvel essai), plus la vidéo ouverte (url) si elle n'y est pas encore.
     Les copies déjà en préparation ou prêtes ne sont jamais renvoyées à Mux. */
  if (body?.action === "importer_tout") {
    const prefixeT = `${SUPABASE_URL}/storage/v1/object/public/photos/`;
    if (typeof body.url === "string") {
      const u0 = body.url.trim().split("?")[0];
      if (u0.startsWith(prefixeT) && /\.(mov|mp4)$/i.test(u0)) {
        await table("POST", "hype_import_mux", { source_url: u0, statut: "a_copier" }, { Prefer: "resolution=ignore-duplicates" });
      }
    }
    const aFaire = await table("GET", "hype_import_mux?select=source_url,statut&statut=in.(a_copier,errored)");
    if (!aFaire.ok) return repondre({ error: "Table hype_import_mux illisible", detail: aFaire.donnees }, 500);
    let lancees = 0, refusees = 0;
    for (const l of (aFaire.donnees as Array<Record<string, unknown>>) || []) {
      const urlT = String(l.source_url || "");
      if (!urlT.startsWith(prefixeT) || !/\.(mov|mp4)$/i.test(urlT)) { refusees++; continue; }
      try {
        const r = await fetch("https://api.mux.com/video/v1/assets", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: authMux },
          body: JSON.stringify({ input: [{ url: urlT }], playback_policy: ["public"], video_quality: "basic", mp4_support: "capped-1080p", passthrough: "import-hype:" + urlT.slice(prefixeT.length) }),
        });
        const d = await r.json().catch(() => null);
        if (!r.ok) { refusees++; await table("PATCH", `hype_import_mux?source_url=eq.${encodeURIComponent(urlT)}`, { statut: "errored", maj_le: new Date().toISOString() }); continue; }
        const a1 = d?.data || {};
        const pb = Array.isArray(a1.playback_ids) && a1.playback_ids[0] ? a1.playback_ids[0].id : null;
        await table("PATCH", `hype_import_mux?source_url=eq.${encodeURIComponent(urlT)}`, { asset_id: a1.id || null, playback_id: pb, mux_url: pb ? `https://stream.mux.com/${pb}.m3u8` : null, statut: String(a1.status || "preparing"), maj_le: new Date().toISOString() });
        lancees++;
      } catch (_e) { refusees++; }
    }
    return repondre({ lancees, refusees });
  }

  /* ---------- IMPORTER UNE VIDÉO ---------- */
  if (body?.action === "importer" && typeof body.url === "string") {
    const url = body.url.trim().split("?")[0];
    const prefixe = `${SUPABASE_URL}/storage/v1/object/public/photos/`;
    if (!url.startsWith(prefixe) || !/\.(mov|mp4)$/i.test(url)) {
      return repondre({ error: "Adresse refusée : seulement une vidéo .mov / .mp4 du compartiment photos de Hype" }, 400);
    }

    const deja = await table("GET", `hype_import_mux?select=*&source_url=eq.${encodeURIComponent(url)}`);
    if (!deja.ok) return repondre({ error: "Table hype_import_mux illisible (SQL passé ?)", detail: deja.donnees }, 500);
    const existante = (deja.donnees as Array<Record<string, unknown>>)?.[0];
    if (existante && existante.statut !== "errored") {
      /* 20/10 : deuxieme toucher = nouvelles de la copie (etat a jour chez Mux), sans rien relancer */
      if (existante.asset_id && existante.statut !== "ready") {
        try {
          const r = await fetch(`https://api.mux.com/video/v1/assets/${existante.asset_id}`, { headers: { Authorization: authMux } });
          if (r.ok) {
            const a0 = (await r.json())?.data || {};
            const maj = { statut: String(a0.status || existante.statut), duree_s: typeof a0.duration === "number" ? a0.duration : null, maj_le: new Date().toISOString() };
            await table("PATCH", `hype_import_mux?source_url=eq.${encodeURIComponent(url)}`, maj);
            Object.assign(existante, maj);
          }
        } catch (_e) { /* etat connu conserve */ }
      }
      return repondre({ deja: true, copie: existante });
    }

    const rep = await fetch("https://api.mux.com/video/v1/assets", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: authMux },
      body: JSON.stringify({
        input: [{ url }],
        playback_policy: ["public"],
        video_quality: "basic",
        mp4_support: "capped-1080p",
        passthrough: "import-hype:" + url.slice(prefixe.length),
      }),
    });
    const donnees = await rep.json().catch(() => null);
    if (!rep.ok) return repondre({ error: "Mux a refusé la copie", detail: donnees }, 502);

    const a = donnees?.data || {};
    const playback = Array.isArray(a.playback_ids) && a.playback_ids[0] ? a.playback_ids[0].id : null;
    const ligne = {
      source_url: url,
      asset_id: a.id || null,
      playback_id: playback,
      mux_url: playback ? `https://stream.mux.com/${playback}.m3u8` : null,
      statut: String(a.status || "preparing"),
      cree_le: new Date().toISOString(),
      maj_le: new Date().toISOString(),
    };
    const ecrit = await table("POST", "hype_import_mux", ligne, { Prefer: "resolution=merge-duplicates,return=representation" });
    if (!ecrit.ok) return repondre({ error: "Copie lancée chez Mux mais non enregistrée", mux: ligne, detail: ecrit.donnees }, 500);
    return repondre({ copie: ligne });
  }

  return repondre({ error: "Action inconnue" }, 400);
});
