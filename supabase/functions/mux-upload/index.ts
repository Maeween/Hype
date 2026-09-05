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
   l'adresse directement. C'est le point 2, décidé mais pas fait.

   🟥 05/09 — LA VÉRIFICATION NE SE FAIT PLUS QU'UNE FOIS.
   Blandine : « les premières par Mux ça allait, c'est depuis que t'as mis la
   connexion ». Le contrôle du 04/09 a été déployé sans jamais être mesuré, et
   il s'exécutait à CHAQUE appel — donc aussi pendant l'attente de l'encodage,
   où l'app interroge l'état toutes les 3 secondes, jusqu'à 40 fois. Chaque
   interrogation payait un aller-retour vers /auth/v1/user. Sur un encodage
   d'une minute, ça fait une vingtaine d'allers-retours ajoutés pour rien.

   Désormais : le corps est lu D'ABORD, et la vérification ne s'applique qu'à
   la CRÉATION d'un envoi — le seul geste qui consomme le compte Mux.
   Les interrogations d'état (action: "status") passent sans contrôle.

   ⚠️ CE QUE ÇA ROUVRE, ET C'EST VOLONTAIRE : un inconnu qui devinerait un
   upload_id pourrait lire l'état de cet envoi. Il n'en obtient qu'un statut et
   un identifiant de lecture — et ces adresses sont déjà publiques
   (playback_policy: "public"). Il ne peut RIEN créer. Le trou du 04/09, lui,
   reste bouché. */
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

  try {
    const id = Deno.env.get("MUX_TOKEN_ID");
    const secret = Deno.env.get("MUX_TOKEN_SECRET");

    if (!id || !secret) {
      return new Response(JSON.stringify({ error: "Clés Mux absentes" }), {
        status: 500,
        headers: jsonHeaders,
      });
    }

    /* 05/09 : le corps est lu AVANT toute vérification, pour savoir de quel
       geste il s'agit. Corps vide ou invalide = création d'envoi, comme avant. */
    let body: { action?: unknown; upload_id?: unknown } | null = null;
    try {
      body = await req.json();
    } catch (_error) {
      // Corps vide ou invalide : comportement d'upload conservé.
    }

    const auth = "Basic " + btoa(`${id}:${secret}`);

    const estInterrogationEtat = body?.action === "status" &&
      typeof body.upload_id === "string" &&
      body.upload_id.length > 0;

    if (estInterrogationEtat) {
      /* Pas de vérification ici : c'est ce qui coûtait un aller-retour toutes
         les 3 secondes pendant tout l'encodage. Ce chemin ne crée rien. */
      const uploadResponse = await fetch(
        `https://api.mux.com/video/v1/uploads/${encodeURIComponent(body.upload_id as string)}`,
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

    /* CRÉATION D'UN ENVOI — le seul geste qui consomme le compte Mux.
       C'est ici, et ici seulement, que la connexion est exigée. */
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
          /* 05/09 — EN PLUS DU FLUX HLS, UN MP4 CLASSIQUE.
             Constaté par Blandine (enregistrement 11h37) : en app installée sur
             iPhone, le plein écran natif d'une vidéo HLS est NOIR — commandes
             présentes, temps qui avance, aucune image. Un MP4 n'a pas ce défaut.
             capped-1080p est compatible avec la qualité basic (doc Mux : « MP4
             support for basic assets »). Coût : l'encodage est gratuit, le
             stockage du MP4 est facturé pour la qualité basic — quelques centimes
             par vidéo. L'app propose le MP4 d'abord et retombe sur le HLS.
             ⚠️ Ne vaut que pour les envois APRÈS ce déploiement. Pour les vidéos
             déjà en ligne, Mux permet de l'activer après coup :
             PUT /video/v1/assets/{ASSET_ID}/mp4-support {"mp4_support":"capped-1080p"}. */
          mp4_support: "capped-1080p",
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
