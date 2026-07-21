// netlify/functions/assistant.js — Relais Hey Baby v4
// v4 (21/07/2026) — ÉTAPE 1 du correctif timeouts/diagnostic (voir SUIVI.md côté app) :
//   - Timeout OpenAI ramené à 51s (au lieu de 85s) pour rester sous la limite d'exécution
//     Netlify (~60s) et pouvoir répondre proprement AVANT que Netlify ne tue la fonction.
//   - Erreurs JSON structurées avec code + statut HTTP cohérent (au lieu d'un message générique).
//   - Identifiant de requête (reqId) sur chaque log et chaque réponse, pour recouper facilement
//     un appel entre les logs Netlify et la console du navigateur.
//   - Logs de diagnostic non sensibles (modèle, detail image, nb frames, taille body, durées...).
//   - Mesure et garde-fou sur le poids du payload envoyé à OpenAI (rejet avant l'appel si
//     anormalement lourd) — la RÉDUCTION AUTOMATIQUE de qualité/frames n'est PAS faite ici,
//     volontairement, pour isoler la cause réelle avant d'ajuster quoi que ce soit d'autre
//     (étape 2, après les tests en conditions réelles).
//   - Le streaming SSE existant est conservé tel quel dans son principe (relit le flux OpenAI
//     token par token et le retransmet), mais signale désormais une interruption par un marqueur
//     de fin de flux plutôt que de couper silencieusement (voir MARQUEUR_ERREUR ci-dessous ;
//     le frontend doit être adapté pour le détecter — pas encore fait à ce stade, index.html
//     pas encore fourni pour cette étape).
//
// Variables d'environnement Netlify (inchangées) :
//   OPENAI_API_KEY      (obligatoire)
//   OPENAI_TEXT_MODEL   (ex. "gpt-5.5")
//   OPENAI_VISION_MODEL (ex. "gpt-5.5")
//   OPENAI_REASONING    (optionnel : "none" | "low" | "medium" | "high")

const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

// Timeout de l'appel OpenAI : 51s, sous la limite synchrone Netlify (~60s) pour laisser
// le temps au serveur de traiter l'abandon et de répondre proprement (point 1 et 3 de la demande).
const TIMEOUT_OPENAI_MS = 51000;

// Garde-fou de poids du payload envoyé à OpenAI (mesure + rejet, PAS de réduction automatique
// à ce stade — voir note de version ci-dessus). Marge de sécurité sous les limites usuelles
// des fonctions Netlify (généralement autour de 6 Mo pour le corps de la requête ENTRANTE ;
// ici on mesure le corps SORTANT vers OpenAI, qui inclut le payload reçu, remis en forme).
const LIMITE_PAYLOAD_OCTETS = 8 * 1024 * 1024; // 8 Mo

// Table des codes d'erreur -> statut HTTP, telle que demandée.
const STATUTS_ERREUR = {
    INVALID_REQUEST: 400,       // requête client malformée (hors liste demandée, ajouté pour couvrir ce cas — signalé dans la livraison)
    PAYLOAD_TOO_LARGE: 413,
    OPENAI_RATE_LIMIT: 429,
    OPENAI_AUTH_ERROR: 502,
    OPENAI_BAD_REQUEST: 502,
    OPENAI_SERVER_ERROR: 502,
    INVALID_RESPONSE: 502,
    AI_TIMEOUT: 504,
    INTERNAL_ERROR: 500,
};

// Marqueur de fin de flux en cas d'interruption pendant le streaming (timeout, erreur réseau
// amont, etc.). Comme les en-têtes HTTP sont déjà envoyés (200 + text/plain) au moment où une
// interruption peut survenir, on ne peut plus changer le statut HTTP à ce stade : on signale
// donc l'échec par un marqueur improbable en fin de texte, à détecter côté frontend.
// Format : \u0000HEYBABY_ERROR:<CODE>:<reqId>\u0000
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

// Réponse d'erreur structurée : { ok:false, code, message, reqId } + statut HTTP cohérent.
// message = texte lisible non technique (le frontend peut l'afficher ou non) ; le code sert
// à la logique/diagnostic, jamais de détail sensible (clé, contenu du prompt, etc.) dedans.
function erreurJSON(code, message, reqId, extra) {
    const statut = STATUTS_ERREUR[code] || 500;
    return reponseJSON(Object.assign({ ok: false, code: code, message: message, reqId: reqId }, extra || {}), statut, reqId);
}

// Convertit le format envoyé par l'app (blocs texte / image base64, style Anthropic)
// vers le format OpenAI chat, et détecte la présence d'une image + compte les images.
function versOpenAI(messages) {
    let uneImage = false, nbImages = 0;
    const sortie = (Array.isArray(messages) ? messages : []).map((m) => {
        if (Array.isArray(m.content)) {
            const parties = m.content.map((b) => {
                if (b && b.type === "image" && b.source && b.source.type === "base64") {
                    uneImage = true; nbImages++;
                    // detail:"high" -> OpenAI analyse l'image à pleine résolution (tuiles 512px)
                    // au lieu du mode "auto" qui peut la sous-échantillonner. Coût en tokens plus
                    // élevé. Conservé tel quel à cette étape (pas de changement de réglage ici).
                    return { type: "image_url", image_url: { url: "data:" + (b.source.media_type || "image/jpeg") + ";base64," + b.source.data, detail: "high" } };
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

    const { messages, uneImage, nbImages } = versOpenAI(corps.messages);
    if (!messages.length) {
        log(reqId, "aucun message dans la requête");
        return erreurJSON("INVALID_REQUEST", "Aucun message à traiter.", reqId);
    }

    // Routage automatique : jamais de nom de modèle en dur côté app.
    const modele = uneImage
        ? (process.env.OPENAI_VISION_MODEL || "gpt-4o")
        : (process.env.OPENAI_TEXT_MODEL || "gpt-4o-mini");

    const messagesOpenAI = [];
    if (corps.system) messagesOpenAI.push({ role: "system", content: String(corps.system) });
    for (const m of messages) messagesOpenAI.push(m);

    const streaming = corps.stream === true;

    // Charge utile OpenAI. Réglages (max_completion_tokens, reasoning_effort, detail image)
    // volontairement inchangés à cette étape — seule la gestion des délais/erreurs change.
    const charge = {
        model: modele,
        max_completion_tokens: 4096,
        stream: streaming,
        messages: messagesOpenAI,
    };
    if (modele.indexOf("gpt-5") === 0) {
        charge.reasoning_effort = process.env.OPENAI_REASONING || "low";
    }

    // Mesure du poids réel du payload envoyé à OpenAI (point 7 et 11 : mesurer + garde-fou,
    // sans réduction automatique de qualité/frames à ce stade).
    const chargeSerialisee = JSON.stringify(charge);
    const poidsOctets = chargeSerialisee.length;
    const longueurSystemPrompt = corps.system ? String(corps.system).length : 0;

    log(reqId, "requête reçue", {
        type: uneImage ? (nbImages > 1 ? "vidéo/plusieurs images" : "photo") : "texte",
        modele: modele,
        detailImage: uneImage ? "high" : "n/a",
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
        const detail = await amont.text().catch(() => "");
        log(reqId, "OpenAI HTTP", amont.status, "après", dureeMs, "ms —", detail.slice(0, 400));
        let code = "OPENAI_SERVER_ERROR";
        if (amont.status === 401 || amont.status === 403) code = "OPENAI_AUTH_ERROR";
        else if (amont.status === 400) code = "OPENAI_BAD_REQUEST";
        else if (amont.status === 429) code = "OPENAI_RATE_LIMIT";
        else if (amont.status >= 500) code = "OPENAI_SERVER_ERROR";
        else code = "INVALID_RESPONSE";
        return erreurJSON(code, "Le fournisseur IA a renvoyé une erreur.", reqId, { statutAmont: amont.status, dureeMs: dureeMs });
    }

    // ----- Mode non-streaming (rétrocompatibilité) -----
    if (!streaming) {
        const data = await amont.json().catch(() => null);
        clearTimeout(minuteur);
        const dureeMs = Date.now() - t0;
        if (!data) {
            log(reqId, "réponse OpenAI illisible après", dureeMs, "ms");
            return erreurJSON("INVALID_RESPONSE", "Réponse du fournisseur IA illisible.", reqId, { dureeMs: dureeMs });
        }
        const texte = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
        log(reqId, "réponse complète en", dureeMs, "ms —", texte.length, "caractères — statut ok");
        return new Response(JSON.stringify({ ok: true, reqId: reqId, content: [{ type: "text", text: texte }] }), {
            status: 200,
            headers: { ...CORS, "Content-Type": "application/json", "X-Request-Id": reqId },
        });
    }

    // ----- Mode streaming : on relit le SSE d'OpenAI et on renvoie du texte brut -----
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
