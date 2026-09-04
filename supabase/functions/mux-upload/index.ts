const ALLOWED_ORIGIN = "https://2hype.netlify.app";

const cors = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const jsonHeaders = {
  ...cors,
  "Content-Type": "application/json",
};

/* 04/09 — CETTE FONCTION N'EXIGEAIT PERSONNE.
   Elle acceptait l'en-tête Authorization que l'app lui envoie depuis toujours,
   mais ne le lisait jamais. N'importe quel POST sur l'adresse créait un envoi
   sur le compte Mux d'Écurie Feinn, sans avoir de compte Hype.
   ⚠️ ALLOWED_ORIGIN ne protégeait pas de ça : le CORS n'est respecté que par
   les navigateurs. Un appel direct l'ignore complètement.

   Ce que ça ferme : les inconnus, qui n'ont aucun jeton valable.
   Ce que ça NE ferme PAS : le plafond des 15 vidéos, qui vit toujours dans le
   navigateur et reste contournable par une cavalière inscrite appelant
   l'adresse directement. C'est le point 2, décidé mais pas fait. */
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

async function utilisateurDuJeton(req: Request): Promise<{ id: string } | "config" | null> {
  /* ⚠️ Si les variables d'environnement manquent, on REFUSE au lieu de laisser
     passer. Une vérification qui s'efface quand elle échoue n'en est pas une. */
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return "config";

  const entete = req.headers.get("Authorization") || "";
  if (!entete.toLowerCase().startsWith("bearer ")) return null;
  const jeton = entete.slice(7).trim();
  if (!jeton) return null;

  /* L'app envoie « Bearer <jeton de session> » quand la cavalière est connectée,
     et retombe sur la clé publique sinon. Supabase répond 401 pour la clé
     publique : le cas « pas connectée » est donc couvert par ce seul appel. */
  try {
    const rep = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { Authorization: `Bearer ${jeton}`, apikey: SUPABASE_ANON_KEY },
    });
    if (!rep.ok) return null;
    const utilisateur = await rep.json();
    return utilisateur && utilisateur.id ? utilisateur : null;
  } catch (_error) {
    /* Réseau ou Supabase injoignable : on refuse. Fermé quand on ne sait pas. */
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Méthode non autorisée" }), {
      status: 405,
      headers: jsonHeaders,
    });
  }

  const utilisateur = await utilisateurDuJeton(req);

  if (utilisateur === "config") {
    return new Response(JSON.stringify({
      error: "Configuration incomplète : SUPABASE_URL ou SUPABASE_ANON_KEY absente des secrets de la fonction.",
    }), { status: 500, headers: jsonHeaders });
  }

  if (!utilisateur) {
    return new Response(JSON.stringify({
      error: "Connexion requise pour envoyer une vidéo.",
    }), { status: 401, headers: jsonHeaders });
  }

  try {
    const id = Deno.env.get("MUX_TOKEN_ID");
    const secret = Deno.env.get("MUX_TOKEN_SECRET");

    if (!id || !secret) {
      return new Response(JSON.stringify({ error: "Clés Mux absentes" }), {
        status: 500,
        headers: jsonHeaders,
      });
    }

    let body: { action?: unknown; upload_id?: unknown } | null = null;
    try {
      body = await req.json();
    } catch (_error) {
      // Corps vide ou invalide : comportement d'upload conservé.
    }

    const auth = "Basic " + btoa(`${id}:${secret}`);

    if (
      body?.action === "status" &&
      typeof body.upload_id === "string" &&
      body.upload_id.length > 0
    ) {
      const uploadResponse = await fetch(
        `https://api.mux.com/video/v1/uploads/${encodeURIComponent(body.upload_id)}`,
        { headers: { Authorization: auth } },
      );
      const uploadPayload = await uploadResponse.json();

      if (!uploadResponse.ok) {
        return new Response(JSON.stringify({ error: uploadPayload }), {
          status: uploadResponse.status,
          headers: jsonHeaders,
        });
      }

      const uploadData = uploadPayload.data ?? {};
      if (!uploadData.asset_id) {
        return new Response(JSON.stringify({ status: uploadData.status }), {
          headers: jsonHeaders,
        });
      }

      const assetResponse = await fetch(
        `https://api.mux.com/video/v1/assets/${encodeURIComponent(uploadData.asset_id)}`,
        { headers: { Authorization: auth } },
      );
      const assetPayload = await assetResponse.json();

      if (!assetResponse.ok) {
        return new Response(JSON.stringify({ error: assetPayload }), {
          status: assetResponse.status,
          headers: jsonHeaders,
        });
      }

      const assetData = assetPayload.data ?? {};
      const status = assetData.status ?? uploadData.status;
      if (status !== "ready") {
        return new Response(JSON.stringify({ status }), { headers: jsonHeaders });
      }

      const playbackId = assetData.playback_ids?.[0]?.id;
      if (!playbackId) {
        return new Response(JSON.stringify({ status }), { headers: jsonHeaders });
      }

      return new Response(JSON.stringify({
        status,
        playback_id: playbackId,
        duration: assetData.duration,
      }), { headers: jsonHeaders });
    }

    // Comportement d'upload actuel pour les corps vides ou sans action.
    const rep = await fetch("https://api.mux.com/video/v1/uploads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify({
        cors_origin: ALLOWED_ORIGIN,
        new_asset_settings: {
          playback_policy: ["public"],
          video_quality: "basic",
        },
      }),
    });

    const data = await rep.json();
    if (!rep.ok) {
      return new Response(JSON.stringify({ error: data }), {
        status: rep.status,
        headers: jsonHeaders,
      });
    }

    return new Response(JSON.stringify({
      url: data.data.url,
      upload_id: data.data.id,
    }), { headers: jsonHeaders });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: jsonHeaders,
    });
  }
});
