// netlify/functions/assistant.js — Relais Hey Baby v2
// Streaming + routage automatique des modèles + logs horodatés + timeout.
//
// Variables d'environnement Netlify (Site settings → Environment variables) :
//   OPENAI_API_KEY      (obligatoire)
//   OPENAI_TEXT_MODEL   (ex. "gpt-4o-mini" — utilisé pour le texte seul)
//   OPENAI_VISION_MODEL (ex. "gpt-4o" — utilisé dès qu'une image est envoyée)
//
// Rétrocompatible : si le client n'envoie pas { stream: true }, la réponse
// revient au format JSON historique { content: [{ type: "text", text }] }.

const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

function log() {
    try {
        const args = Array.prototype.slice.call(arguments);
        console.log.apply(console, ["[assistant " + new Date().toISOString() + "]"].concat(args));
    } catch (e) { }
}

function reponseJSON(objet, statut) {
    return new Response(JSON.stringify(objet), {
        status: statut || 200,
        headers: { ...CORS, "Content-Type": "application/json" },
    });
}

// Convertit le format envoyé par l'app (blocs texte / image base64, style Anthropic)
// vers le format OpenAI chat, et détecte la présence d'une image.
function versOpenAI(messages) {
    let uneImage = false;
    const sortie = (Array.isArray(messages) ? messages : []).map((m) => {
        if (Array.isArray(m.content)) {
            const parties = m.content.map((b) => {
                if (b && b.type === "image" && b.source && b.source.type === "base64") {
                    uneImage = true;
                    return { type: "image_url", image_url: { url: "data:" + (b.source.media_type || "image/jpeg") + ";base64," + b.source.data } };
                }
                if (b && b.type === "image_url") { uneImage = true; return b; }
                return { type: "text", text: (b && b.text) || "" };
            });
            return { role: m.role, content: parties };
        }
        return { role: m.role, content: String(m.content || "") };
    });
    return { messages: sortie, uneImage };
}

export default async (req) => {
    if (req.method === "OPTIONS") return new Response("", { status: 204, headers: CORS });
    if (req.method !== "POST") return reponseJSON({ error: "POST uniquement" }, 405);

    const t0 = Date.now();
    let corps;
    try { corps = await req.json(); }
    catch (e) { log("JSON invalide"); return reponseJSON({ error: "JSON invalide" }, 400); }

    const cle = process.env.OPENAI_API_KEY;
    if (!cle) { log("OPENAI_API_KEY manquante"); return reponseJSON({ error: "Clé API manquante côté serveur" }, 500); }

    const { messages, uneImage } = versOpenAI(corps.messages);
    if (!messages.length) return reponseJSON({ error: "Aucun message" }, 400);

    // Routage automatique : jamais de nom de modèle en dur côté app.
    const modele = uneImage
        ? (process.env.OPENAI_VISION_MODEL || "gpt-4o")
        : (process.env.OPENAI_TEXT_MODEL || "gpt-4o-mini");

    const messagesOpenAI = [];
    if (corps.system) messagesOpenAI.push({ role: "system", content: String(corps.system) });
    for (const m of messages) messagesOpenAI.push(m);

    const streaming = corps.stream === true;
    log("requête reçue", { modele, image: uneImage, streaming, nbMessages: messages.length });

    const ctrl = new AbortController();
    const minuteur = setTimeout(() => { log("timeout OpenAI (55 s) — abandon"); try { ctrl.abort(); } catch (e) { } }, 55000);

    let amont;
    try {
        amont = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: "Bearer " + cle },
            signal: ctrl.signal,
            body: JSON.stringify({
                model: modele,
                max_completion_tokens: 1024,
                stream: streaming,
                messages: messagesOpenAI,
            }),
        });
    } catch (e) {
        clearTimeout(minuteur);
        log("erreur réseau vers OpenAI :", e && e.message);
        return reponseJSON({ error: "Connexion OpenAI impossible" }, 502);
    }

    if (!amont.ok) {
        clearTimeout(minuteur);
        const detail = await amont.text().catch(() => "");
        log("OpenAI HTTP", amont.status, "—", detail.slice(0, 400));
        return reponseJSON({ error: "OpenAI " + amont.status }, 502);
    }

    // ----- Mode non-streaming (rétrocompatibilité avec l'ancienne app déployée) -----
    if (!streaming) {
        const data = await amont.json().catch(() => null);
        clearTimeout(minuteur);
        const texte = (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
        log("réponse complète en", Date.now() - t0, "ms —", texte.length, "caractères");
        return reponseJSON({ content: [{ type: "text", text: texte }] });
    }

    // ----- Mode streaming : on relit le SSE d'OpenAI et on renvoie du texte brut -----
    const flux = new ReadableStream({
        async start(controller) {
            const lecteur = amont.body.getReader();
            const dec = new TextDecoder();
            const enc = new TextEncoder();
            let tampon = "", total = 0, premier = true;
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
                        const charge = ligne.slice(5).trim();
                        if (!charge || charge === "[DONE]") continue;
                        try {
                            const j = JSON.parse(charge);
                            const delta = j && j.choices && j.choices[0] && j.choices[0].delta && j.choices[0].delta.content;
                            if (delta) {
                                if (premier) { log("premier token en", Date.now() - t0, "ms"); premier = false; }
                                total += delta.length;
                                controller.enqueue(enc.encode(delta));
                            }
                        } catch (e) { /* fragment SSE incomplet : ignoré */ }
                    }
                }
                log("stream terminé en", Date.now() - t0, "ms —", total, "caractères");
            } catch (e) {
                log("stream interrompu :", e && e.message);
            } finally {
                clearTimeout(minuteur);
                try { controller.close(); } catch (e) { }
            }
        },
        cancel() {
            clearTimeout(minuteur);
            try { ctrl.abort(); } catch (e) { }
            log("stream annulé par le client");
        },
    });

    return new Response(flux, {
        headers: {
            ...CORS,
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    });
};
