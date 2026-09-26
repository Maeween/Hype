// supabase/functions/hey-baby-vision/index.ts — Relais Hey Baby sur Supabase (26/09/2026)
//
// POURQUOI (prouvé par le journal Netlify du 26/09) : l'observation d'une photo prend 32 à 51 s
// avec gpt-5.6-sol en « medium », et le projet Netlify coupe la connexion vers 30 s, même en flux.
// Les Edge Functions Supabase acceptent 400 s sur un plan payant (150 s sans aucun envoi) : on y
// déplace l'analyse PHOTO, en « high » sur décision de Blandine. C'est toujours OpenAI derrière.
//
// MÊME CONTRAT QUE netlify/functions/assistant.js (v5), pour que l'index change le moins possible :
//   - mode "perception" : réponse JSON { ok, content:[{type:"text",text}] } ou { ok:false, code, message },
//     précédée d'espaces « signe de vie » toutes les 5 s (JSON.parse les ignore) ;
//   - mode "standard" + stream:true : texte brut en flux, marqueur \u0000HEYBABY_ERROR:CODE:reqId\u0000
//     en fin de flux en cas de coupure.
//
// ACCÈS : « Verify JWT » est ACTIF (le déploiement en ligne de commande le remet toujours) — seul
// un utilisateur connecté à Hype peut l'appeler (l'index envoie le jeton de session). Origines
// autorisées : 2hype.fr, www.2hype.fr, 2hype.netlify.app.
//
// SECRETS SUPABASE (Edge Functions → Secrets) :
//   OPENAI_API_KEY          (obligatoire)
//   OPENAI_VISION_MODEL     (obligatoire pour la perception — ex. "gpt-5.6-sol")
//   OPENAI_VISION_REASONING (réflexion de l'observation — "high" voulu par Blandine)
//   OPENAI_VISION_DETAIL    (facultatif — défaut "original")
//   OPENAI_TEXT_MODEL       (rédaction — ex. "gpt-5.6-sol")
//   OPENAI_REASONING        (réflexion de la rédaction — ex. "medium")

const ORIGINES = ["https://2hype.fr", "https://www.2hype.fr", "https://2hype.netlify.app"];
const DUREE_MAX_MS = 300000;      // 5 min, sous les 400 s de Supabase
const SIGNE_DE_VIE_MS = 5000;     // bien sous les 150 s d'inactivité tolérées
const LIMITE_PAYLOAD_OCTETS = 8 * 1024 * 1024;
const JETONS_PERCEPTION = 16000;  // « high » réfléchit plus : le 26/09 en « medium », 3 763 jetons dont 2 436 de réflexion
const JETONS_STANDARD = 12000;   // rédaction : 4096 sur Netlify ; relevé pour qu'une réflexion « high » ne mange pas la réponse (payé seulement si utilisé)

function entetesCors(req: Request): Record<string, string> {
  const o = req.headers.get("origin") || "";
  return {
    "Access-Control-Allow-Origin": ORIGINES.includes(o) ? o : ORIGINES[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Vary": "Origin",
  };
}

function genererReqId(): string {
  try { return crypto.randomUUID(); } catch (_e) { return "hb-" + Date.now().toString(36); }
}

function log(reqId: string, ...args: unknown[]) {
  try { console.log("[hey-baby-vision " + new Date().toISOString() + " #" + reqId + "]", ...args); } catch (_e) { /* rien */ }
}

// Convertit le format de l'app (blocs texte / image base64) vers le format OpenAI chat.
function versOpenAI(messages: unknown, detailImage: string) {
  let uneImage = false, nbImages = 0;
  const sortie = (Array.isArray(messages) ? messages : []).map((m: any) => {
    if (Array.isArray(m?.content)) {
      const parties = m.content.map((b: any) => {
        if (b && b.type === "image" && b.source && b.source.type === "base64") {
          uneImage = true; nbImages++;
          return { type: "image_url", image_url: { url: "data:" + (b.source.media_type || "image/jpeg") + ";base64," + b.source.data, detail: detailImage } };
        }
        if (b && b.type === "image_url") { uneImage = true; nbImages++; return b; }
        return { type: "text", text: (b && b.text) || "" };
      });
      return { role: m.role, content: parties };
    }
    return { role: m?.role, content: String(m?.content || "") };
  });
  return { messages: sortie, uneImage, nbImages };
}

function codeErreurOpenAI(statut: number, detail: string): string {
  if (statut === 401 || statut === 403) return "OPENAI_AUTH_ERROR";
  if (statut === 404 || (/model/i.test(detail) && /not.?found|does not exist|access/i.test(detail))) return "OPENAI_MODEL_NOT_FOUND";
  if (statut === 400 && /reasoning/i.test(detail)) return "OPENAI_REASONING_PARAM";
  if (statut === 400 && /detail/i.test(detail)) return "OPENAI_DETAIL_PARAM";
  if (statut === 400) return "OPENAI_BAD_REQUEST";
  if (statut === 429) return "OPENAI_RATE_LIMIT";
  return "OPENAI_SERVER_ERROR";
}

Deno.serve(async (req: Request) => {
  const cors = entetesCors(req);
  const reqId = genererReqId();
  const json = (objet: unknown, statut = 200) =>
    new Response(JSON.stringify(objet), { status: statut, headers: { ...cors, "Content-Type": "application/json", "X-Request-Id": reqId } });
  const erreur = (code: string, message: string, statut: number, extra: Record<string, unknown> = {}) =>
    json({ ok: false, code, message, reqId, ...extra }, statut);

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return erreur("INVALID_REQUEST", "Méthode non autorisée.", 405);

  const t0 = Date.now();
  let corps: any;
  try { corps = await req.json(); } catch (_e) { log(reqId, "JSON invalide reçu du client"); return erreur("INVALID_REQUEST", "Requête invalide.", 400); }

  const cle = Deno.env.get("OPENAI_API_KEY");
  if (!cle) { log(reqId, "OPENAI_API_KEY manquante"); return erreur("INTERNAL_ERROR", "Configuration serveur incomplète (clé OpenAI).", 500); }

  const mode = corps?.mode === "perception" ? "perception" : "standard";
  const detailImage = mode === "perception" ? (Deno.env.get("OPENAI_VISION_DETAIL") || "original") : "high";
  const { messages, uneImage, nbImages } = versOpenAI(corps?.messages, detailImage);
  if (!messages.length) return erreur("INVALID_REQUEST", "Aucun message à traiter.", 400);

  let modele: string;
  if (mode === "perception") {
    modele = Deno.env.get("OPENAI_VISION_MODEL") || "";
    if (!modele) { log(reqId, "OPENAI_VISION_MODEL non définie"); return erreur("INTERNAL_ERROR", "Modèle vision non configuré côté serveur.", 500); }
  } else {
    modele = uneImage ? (Deno.env.get("OPENAI_VISION_MODEL") || "gpt-4o") : (Deno.env.get("OPENAI_TEXT_MODEL") || "gpt-4o-mini");
  }

  const messagesOpenAI: unknown[] = [];
  if (corps.system) messagesOpenAI.push({ role: "system", content: String(corps.system) });
  for (const m of messages) messagesOpenAI.push(m);

  const streaming = mode === "perception" ? false : corps.stream === true;
  const charge: Record<string, unknown> = {
    model: modele,
    max_completion_tokens: mode === "perception" ? JETONS_PERCEPTION : JETONS_STANDARD,
    stream: streaming,
    messages: messagesOpenAI,
  };
  if (mode === "perception") charge.response_format = { type: "json_object" };
  if (modele.indexOf("gpt-5") === 0) {
    charge.reasoning_effort = mode === "perception"
      ? (Deno.env.get("OPENAI_VISION_REASONING") || Deno.env.get("OPENAI_REASONING") || "low")
      : (Deno.env.get("OPENAI_REASONING") || "low");
  }
  const chargeSerialisee = JSON.stringify(charge);
  log(reqId, "requête reçue", {
    mode, type: uneImage ? (nbImages > 1 ? "vidéo/plusieurs images" : "photo") : "texte", modele,
    detailImage: uneImage ? detailImage : "n/a", nbImages, streaming, raisonnement: charge.reasoning_effort || "n/a",
    longueurSystemPrompt: corps.system ? String(corps.system).length : 0,
    limiteSortieTokens: charge.max_completion_tokens, poidsPayloadOctets: chargeSerialisee.length,
  });
  if (chargeSerialisee.length > LIMITE_PAYLOAD_OCTETS) return erreur("PAYLOAD_TOO_LARGE", "Le média envoyé est trop volumineux.", 413);

  const enc = new TextEncoder();
  const ctrl = new AbortController();
  let expire = false;
  const appelerOpenAI = () => fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + cle },
    signal: ctrl.signal,
    body: chargeSerialisee,
  });

  // ----- Perception : JSON final précédé de signes de vie -----
  if (mode === "perception") {
    let vie: number | undefined, minuteur: number | undefined, fini = false;
    const flux = new ReadableStream({
      async start(controller) {
        const envoyer = (t: string) => { try { controller.enqueue(enc.encode(t)); } catch (_e) { /* fermé */ } };
        const terminer = (objet: unknown) => {
          if (fini) return; fini = true;
          clearInterval(vie); clearTimeout(minuteur);
          envoyer(JSON.stringify(objet));
          try { controller.close(); } catch (_e) { /* déjà fermé */ }
        };
        envoyer(" ");
        vie = setInterval(() => envoyer(" "), SIGNE_DE_VIE_MS);
        minuteur = setTimeout(() => { expire = true; log(reqId, "timeout perception (" + DUREE_MAX_MS + " ms)"); try { ctrl.abort(); } catch (_e) { /* rien */ } }, DUREE_MAX_MS);
        try {
          const amont = await appelerOpenAI();
          if (!amont.ok) {
            const detail = await amont.text().catch(() => "");
            log(reqId, "OpenAI HTTP", amont.status, "après", Date.now() - t0, "ms (perception) —", detail.slice(0, 400));
            terminer({ ok: false, code: codeErreurOpenAI(amont.status, detail), message: "Le fournisseur IA a renvoyé une erreur (HTTP " + amont.status + ").", reqId, dureeMs: Date.now() - t0 });
            return;
          }
          const data: any = await amont.json().catch(() => null);
          const choix = data?.choices?.[0];
          const texte: string = choix?.message?.content || "";
          const raison = choix?.finish_reason || "?";
          const u = data?.usage || {};
          const reflexion = u?.completion_tokens_details?.reasoning_tokens;
          log(reqId, "réponse complète (perception) en", Date.now() - t0, "ms —", texte.length, "caractères — fin :", raison, "— jetons sortie", u.completion_tokens, "dont réflexion", reflexion);
          if (!texte) { terminer({ ok: false, code: "INVALID_RESPONSE", message: "Observation vide (fin : " + raison + ", réflexion " + reflexion + " jetons).", reqId, dureeMs: Date.now() - t0 }); return; }
          terminer({ ok: true, reqId, mode, content: [{ type: "text", text: texte }] });
        } catch (e) {
          const d = Date.now() - t0;
          if (expire) terminer({ ok: false, code: "AI_TIMEOUT", message: "L'analyse a pris trop de temps.", reqId, dureeMs: d });
          else { log(reqId, "erreur réseau vers OpenAI (perception) après", d, "ms :", (e as Error)?.message); terminer({ ok: false, code: "OPENAI_SERVER_ERROR", message: "Connexion au fournisseur IA impossible.", reqId, dureeMs: d }); }
        }
      },
      cancel() {
        fini = true; clearInterval(vie); clearTimeout(minuteur);
        try { ctrl.abort(); } catch (_e) { /* rien */ }
        log(reqId, "perception annulée par le client après", Date.now() - t0, "ms");
      },
    });
    return new Response(flux, { status: 200, headers: { ...cors, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-cache", "X-Request-Id": reqId } });
  }

  // ----- Standard (rédaction, texte) -----
  const minuteur = setTimeout(() => { expire = true; log(reqId, "timeout standard (" + DUREE_MAX_MS + " ms)"); try { ctrl.abort(); } catch (_e) { /* rien */ } }, DUREE_MAX_MS);
  let amont: Response;
  try { amont = await appelerOpenAI(); }
  catch (e) {
    clearTimeout(minuteur);
    const d = Date.now() - t0;
    if (expire) return erreur("AI_TIMEOUT", "L'analyse a pris trop de temps.", 504, { dureeMs: d });
    log(reqId, "erreur réseau vers OpenAI après", d, "ms :", (e as Error)?.message);
    return erreur("OPENAI_SERVER_ERROR", "Connexion au fournisseur IA impossible.", 502, { dureeMs: d });
  }
  if (!amont.ok) {
    clearTimeout(minuteur);
    const detail = await amont.text().catch(() => "");
    log(reqId, "OpenAI HTTP", amont.status, "après", Date.now() - t0, "ms —", detail.slice(0, 400));
    return erreur(codeErreurOpenAI(amont.status, detail), "Le fournisseur IA a renvoyé une erreur.", 502, { statutAmont: amont.status });
  }
  if (!streaming) {
    const data: any = await amont.json().catch(() => null);
    clearTimeout(minuteur);
    const texte: string = data?.choices?.[0]?.message?.content || "";
    log(reqId, "réponse complète (standard) en", Date.now() - t0, "ms —", texte.length, "caractères");
    return json({ ok: true, reqId, mode, content: [{ type: "text", text: texte }] });
  }
  const flux = new ReadableStream({
    async start(controller) {
      const lecteur = amont.body!.getReader();
      const dec = new TextDecoder();
      let tampon = "", total = 0, premier = true, erreurSurvenue: string | null = null;
      try {
        while (true) {
          const lu = await lecteur.read();
          if (lu.done) break;
          tampon += dec.decode(lu.value, { stream: true });
          const lignes = tampon.split("\n");
          tampon = lignes.pop() || "";
          for (const brute of lignes) {
            const ligne = brute.trim();
            if (!ligne.startsWith("data:")) continue;
            const c2 = ligne.slice(5).trim();
            if (!c2 || c2 === "[DONE]") continue;
            try {
              const j = JSON.parse(c2);
              const delta = j?.choices?.[0]?.delta?.content;
              if (delta) {
                if (premier) { log(reqId, "premier fragment en", Date.now() - t0, "ms"); premier = false; }
                total += delta.length;
                controller.enqueue(enc.encode(delta));
              }
            } catch (_e) { /* fragment incomplet */ }
          }
        }
        log(reqId, "flux terminé en", Date.now() - t0, "ms —", total, "caractères");
      } catch (e) {
        erreurSurvenue = expire ? "AI_TIMEOUT" : "OPENAI_SERVER_ERROR";
        log(reqId, "flux interrompu après", Date.now() - t0, "ms —", total, "caractères — code", erreurSurvenue, "—", (e as Error)?.message);
      } finally {
        clearTimeout(minuteur);
        if (erreurSurvenue) { try { controller.enqueue(enc.encode("\u0000HEYBABY_ERROR:" + erreurSurvenue + ":" + reqId + "\u0000")); } catch (_e) { /* rien */ } }
        try { controller.close(); } catch (_e) { /* rien */ }
      }
    },
    cancel() { clearTimeout(minuteur); try { ctrl.abort(); } catch (_e) { /* rien */ } log(reqId, "flux annulé par le client après", Date.now() - t0, "ms"); },
  });
  return new Response(flux, { headers: { ...cors, "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache", "X-Request-Id": reqId } });
});
