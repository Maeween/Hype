// netlify/functions/assistant.js — Relais Hey Baby v5
// v5 (22/07/2026) — Passage contrôlé à GPT-5.6 Sol pour l'analyse photo (spec Blandine) :
//   - Nouveau mode "perception" : appel d'observation visuelle isolé, non-streamé, sortie JSON
//     structurée (response_format json_object), budget de sortie réduit (1200 tokens).
//   - Réglages VISION séparés du texte : OPENAI_VISION_MODEL (obligatoire en mode perception,
//     AUCUN repli silencieux vers un autre modèle), OPENAI_VISION_REASONING (repli :
//     OPENAI_REASONING), OPENAI_VISION_DETAIL (défaut "original", transmis tel quel à OpenAI).
//   - Le mode standard (texte, vidéos, anciens appels photo) reste STRICTEMENT identique à la
//     v4 : detail "high", modèles/repli inchangés (repli gpt-4o journalisé désormais), streaming.
//   - Erreurs distinctes : OPENAI_MODEL_NOT_FOUND (modèle indisponible/non autorisé),
//     OPENAI_REASONING_PARAM, OPENAI_DETAIL_PARAM (paramètre refusé par OpenAI).
//   - Retour arrière : remettre les anciennes valeurs de variables Netlify suffit (aucun ancien
//     réglage supprimé).
//
// Variables d'environnement Netlify :
//   OPENAI_API_KEY           (obligatoire)
//   OPENAI_TEXT_MODEL        (texte/théorie — inchangé)
//   OPENAI_VISION_MODEL      (vision — ex. "gpt-5.6-sol")
//   OPENAI_REASONING         (raisonnement par défaut, texte inclus)
//   OPENAI_VISION_REASONING  (raisonnement des appels perception ; repli : OPENAI_REASONING)
//   OPENAI_VISION_DETAIL     (détail image des appels perception ; défaut "original")

const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

const TIMEOUT_OPENAI_MS = 51000;
const LIMITE_PAYLOAD_OCTETS = 8 * 1024 * 1024;

const STATUTS_ERREUR = {
    INVALID_REQUEST: 400,
    PAYLOAD_TOO_LARGE: 413,
    OPENAI_RATE_LIMIT: 429,
    OPENAI_AUTH_ERROR: 502,
    OPENAI_BAD_REQUEST: 502,
    OPENAI_SERVER_ERROR: 502,
    OPENAI_MODEL_NOT_FOUND: 502,
    OPENAI_REASONING_PARAM: 502,
    OPENAI_DETAIL_PARAM: 502,
    INVALID_RESPONSE: 502,
    AI_TIMEOUT: 504,
    INTERNAL_ERROR: 500,
};

function marqueurErreur(code, reqId) {
    return "\u0000HEYBABY_ERROR:" + code + ":" + reqId + "\u0000";
}

function genererReqId() {
    try { if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID(); } catch (e) { }
    return "hb-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
}

function log(reqId) {
    try {
        const args = Array.prototype.slice.call(arguments, 1);
        console.log.apply(console, ["[assistant " + new Date().toISOString() + " #" + reqId + "]"].concat(args));
    } catch (e) { }
}

function reponseJSON(objet, statut, reqId) {
    return new Response(JSON.stringify(objet), {
        status: statut || 200,
        headers: { ...CORS, "Content-Type": "application/json", "X-Request-Id": reqId || "" },
    });
}

function erreurJSON(code, message, reqId, extra) {
    const statut = STATUTS_ERREUR[code] || 500;
    return reponseJSON(Object.assign({ ok: false, code: code, message: message, reqId: reqId }, extra || {}), statut, reqId);
}

// Convertit le format app (blocs texte / image base64) vers le format OpenAI chat.
// detailImage : niveau de détail appliqué aux images ("high" en mode standard — comportement
// historique inchangé — ou la valeur d'OPENAI_VISION_DETAIL en mode perception).
function versOpenAI(messages, detailImage) {
    let uneImage = false, nbImages = 0;
    const sortie = (Array.isArray(messages) ? messages : []).map((m) => {
        if (Array.isArray(m.content)) {
            const parties = m.content.map((b) => {
                if (b && b.type === "image" && b.source && b.source.type === "base64") {
                    uneImage = true; nbImages++;
                    return { type: "image_url", image_url: { url: "data:" + (b.source.media_type || "image/jpeg") + ";base64," + b.source.data, detail: detailImage } };
                }
                if (b && b.type === "image_url") { uneImage = true; nbImages++; return b; }
                return { type: "text", text: (b && b.text) || "" };
            });
            return { role: m.role, content: parties };
        }
        return { role: m.role, content: String(m.content || "") };
    });
    return { messages: sortie, uneImage: uneImage, nbImages: nbImages };
}

export default async (req) => {
    const reqId = genererReqId();
    if (req.method === "OPTIONS") return new Response("", { status: 204, headers: { ...CORS, "X-Request-Id": reqId } });
    if (req.method !== "POST") return erreurJSON("INVALID_REQUEST", "Méthode non autorisée.", reqId);

    const t0 = Date.now();
    let corps;
    try { corps = await req.json(); }
    catch (e) {
        log(reqId, "JSON invalide reçu du client");
        return erreurJSON("INVALID_REQUEST", "Requête invalide.", reqId);
    }

    const cle = process.env.OPENAI_API_KEY;
    if (!cle) {
        log(reqId, "OPENAI_API_KEY manquante côté serveur");
        return erreurJSON("INTERNAL_ERROR", "Configuration serveur incomplète.", reqId);
    }

    // ----- Mode de la requête -----
    // "perception" : observation visuelle isolée (photo unique, JSON structuré, non streamé).
    // "standard"   : comportement historique (texte, vidéos, rétrocompatibilité totale).
    const mode = corps.mode === "perception" ? "perception" : "standard";
    const detailImage = mode === "perception" ? (process.env.OPENAI_VISION_DETAIL || "original") : "high";

    const { messages, uneImage, nbImages } = versOpenAI(corps.messages, detailImage);
    if (!messages.length) {
        log(reqId, "aucun message dans la requête");
        return erreurJSON("INVALID_REQUEST", "Aucun message à traiter.", reqId);
    }

    // ----- Choix du modèle -----
    let modele;
    if (mode === "perception") {
        // Spec : jamais de remplacement silencieux du modèle vision.
        modele = process.env.OPENAI_VISION_MODEL;
        if (!modele) {
            log(reqId, "mode perception refusé : OPENAI_VISION_MODEL non définie");
            return erreurJSON("INTERNAL_ERROR", "Modèle vision non configuré côté serveur.", reqId);
        }
    } else {
        modele = uneImage
            ? (process.env.OPENAI_VISION_MODEL || "gpt-4o")
            : (process.env.OPENAI_TEXT_MODEL || "gpt-4o-mini");
        if (uneImage && !process.env.OPENAI_VISION_MODEL) log(reqId, "⚠ repli silencieux vision → gpt-4o (OPENAI_VISION_MODEL absente)");
        if (!uneImage && !process.env.OPENAI_TEXT_MODEL) log(reqId, "⚠ repli silencieux texte → gpt-4o-mini (OPENAI_TEXT_MODEL absente)");
    }

    const messagesOpenAI = [];
    if (corps.system) messagesOpenAI.push({ role: "system", content: String(corps.system) });
    for (const m of messages) messagesOpenAI.push(m);

    const streaming = mode === "perception" ? false : corps.stream === true;

    const charge = {
        model: modele,
        max_completion_tokens: mode === "perception" ? 1200 : 4096,
        stream: streaming,
        messages: messagesOpenAI,
    };
    if (mode === "perception") charge.response_format = { type: "json_object" };
    if (modele.indexOf("gpt-5") === 0) {
        charge.reasoning_effort = mode === "perception"
            ? (process.env.OPENAI_VISION_REASONING || process.env.OPENAI_REASONING || "low")
            : (process.env.OPENAI_REASONING || "low");
    }

    const chargeSerialisee = JSON.stringify(charge);
    const poidsOctets = chargeSerialisee.length;
    const longueurSystemPrompt = corps.system ? String(corps.system).length : 0;

    log(reqId, "requête reçue", {
        mode: mode,
        type: uneImage ? (nbImages > 1 ? "vidéo/plusieurs images" : "photo") : "texte",
        modele: modele,
        detailImage: uneImage ? detailImage : "n/a",
        nbImages: nbImages,
        streaming: streaming,
        raisonnement: charge.reasoning_effort || "n/a",
        nbMessagesHistorique: messages.length,
        longueurSystemPrompt: longueurSystemPrompt,
        limiteSortieTokens: charge.max_completion_tokens,
        poidsPayloadOctets: poidsOctets,
    });

    if (poidsOctets > LIMITE_PAYLOAD_OCTETS) {
        log(reqId, "payload trop lourd :", poidsOctets, "octets — abandon avant appel OpenAI");
        return erreurJSON("PAYLOAD_TOO_LARGE", "Le média envoyé est trop volumineux.", reqId, { poidsOctets: poidsOctets });
    }

    const ctrl = new AbortController();
    let futTimeout = false;
    const minuteur = setTimeout(() => {
        futTimeout = true;
        log(reqId, "timeout OpenAI (" + TIMEOUT_OPENAI_MS + " ms) — abandon propre de l'appel");
        try { ctrl.abort(); } catch (e) { }
    }, TIMEOUT_OPENAI_MS);

    let amont;
    try {
        amont = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: "Bearer " + cle },
            signal: ctrl.signal,
            body: chargeSerialisee,
        });
    } catch (e) {
        clearTimeout(minuteur);
        const dureeMs = Date.now() - t0;
        if (futTimeout) {
            log(reqId, "appel OpenAI abandonné après", dureeMs, "ms (timeout)");
            return erreurJSON("AI_TIMEOUT", "L'analyse a pris trop de temps.", reqId, { dureeMs: dureeMs });
        }
        log(reqId, "erreur réseau vers OpenAI après", dureeMs, "ms :", e && e.message);
        return erreurJSON("OPENAI_SERVER_ERROR", "Connexion au fournisseur IA impossible.", reqId, { dureeMs: dureeMs });
    }

    if (!amont.ok) {
        clearTimeout(minuteur);
        const dureeMs = Date.now() - t0;
        const detailTxt = await amont.text().catch(() => "");
        log(reqId, "OpenAI HTTP", amont.status, "après", dureeMs, "ms —", detailTxt.slice(0, 400));
        let code = "OPENAI_SERVER_ERROR";
        let messageLisible = "Le fournisseur IA a renvoyé une erreur.";
        if (amont.status === 401 || amont.status === 403) { code = "OPENAI_AUTH_ERROR"; }
        else if (amont.status === 404 || /model/i.test(detailTxt) && /not.?found|does not exist|access/i.test(detailTxt)) {
            code = "OPENAI_MODEL_NOT_FOUND"; messageLisible = "Modèle indisponible ou non autorisé pour ce compte.";
        }
        else if (amont.status === 400 && /reasoning/i.test(detailTxt)) { code = "OPENAI_REASONING_PARAM"; messageLisible = "Paramètre de raisonnement refusé par le fournisseur."; }
        else if (amont.status === 400 && /detail/i.test(detailTxt)) { code = "OPENAI_DETAIL_PARAM"; messageLisible = "Niveau de détail d'image refusé par le fournisseur."; }
        else if (amont.status === 400) { code = "OPENAI_BAD_REQUEST"; }
        else if (amont.status === 429) { code = "OPENAI_RATE_LIMIT"; }
        else if (amont.status >= 500) { code = "OPENAI_SERVER_ERROR"; }
        else { code = "INVALID_RESPONSE"; }
        return erreurJSON(code, messageLisible, reqId, { statutAmont: amont.status, dureeMs: dureeMs });
    }

    // ----- Mode non-streaming (perception + rétrocompatibilité) -----
    if (!streaming) {
        const data = await amont.json().catch(() => null);
        clearTimeout(minuteur);
        const dureeMs = Date.now() - t0;
        if (!data) {
            log(reqId, "réponse OpenAI illisible après", dureeMs, "ms");
            return erreurJSON("INVALID_RESPONSE", "Réponse du fournisseur IA illisible.", reqId, { dureeMs: dureeMs });
        }
        const texte = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
        log(reqId, "réponse complète (" + mode + ") en", dureeMs, "ms —", texte.length, "caractères — statut ok");
        return new Response(JSON.stringify({ ok: true, reqId: reqId, mode: mode, content: [{ type: "text", text: texte }] }), {
            status: 200,
            headers: { ...CORS, "Content-Type": "application/json", "X-Request-Id": reqId },
        });
    }

    // ----- Mode streaming (inchangé depuis la v4) -----
    const flux = new ReadableStream({
        async start(controller) {
            const lecteur = amont.body.getReader();
            const dec = new TextDecoder();
            const enc = new TextEncoder();
            let tampon = "", total = 0, premier = true, erreurSurvenue = null;
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
                        const charge2 = ligne.slice(5).trim();
                        if (!charge2 || charge2 === "[DONE]") continue;
                        try {
                            const j = JSON.parse(charge2);
                            const delta = j && j.choices && j.choices[0] && j.choices[0].delta && j.choices[0].delta.content;
                            if (delta) {
                                if (premier) { log(reqId, "premier token en", Date.now() - t0, "ms"); premier = false; }
                                total += delta.length;
                                controller.enqueue(enc.encode(delta));
                            }
                        } catch (e) { /* fragment SSE incomplet : ignoré */ }
                    }
                }
                log(reqId, "stream terminé en", Date.now() - t0, "ms —", total, "caractères — statut ok");
            } catch (e) {
                erreurSurvenue = futTimeout ? "AI_TIMEOUT" : "OPENAI_SERVER_ERROR";
                log(reqId, "stream interrompu après", Date.now() - t0, "ms —", total, "caractères déjà envoyés — code", erreurSurvenue, "—", e && e.message);
            } finally {
                clearTimeout(minuteur);
                if (erreurSurvenue) {
                    try { controller.enqueue(enc.encode(marqueurErreur(erreurSurvenue, reqId))); } catch (e) { }
                }
                try { controller.close(); } catch (e) { }
            }
        },
        cancel() {
            clearTimeout(minuteur);
            try { ctrl.abort(); } catch (e) { }
            log(reqId, "stream annulé par le client après", Date.now() - t0, "ms");
        },
    });

    return new Response(flux, {
        headers: {
            ...CORS,
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "X-Request-Id": reqId,
        },
    });
};
