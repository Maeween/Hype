// netlify/functions/assistant.js
// Relais 2 modèles OpenAI (texte + vision)

exports.handler = async (event) => {
  const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control- Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: "Méthode non autorisée" }) };
  }

  const cle = process.env.OPENAI_API_KEY;
  if (!cle) {
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: "Clé API absente côté serveur" }) };
  }

  const MODELE_TEXTE = process.env.OPENAI_TEXT_MODEL || "gpt-5.5";
  const MODELE_VISION = process.env.OPENAI_VISION_MODEL || "gpt-4o";

  try {
    const corps = JSON.parse(event.body || "{}");
    const systeme = corps.system || "";
    const messagesEntrants = Array.isArray(corps.messages) ? corps.messages : [];

    // Détecte s'il y a une image dans la conversation
    const contientImage = messagesEntrants.some(
      (m) => Array.isArray(m.content) && m.content.some((b) => b && b.type === "image")
    );
    const modele = contientImage ? MODELE_VISION : MODELE_TEXTE;

    // Traduit les messages "Claude" → "OpenAI"
    const messagesOpenAI = [];
    if (systeme) messagesOpenAI.push({ role: "system", content: systeme });

    for (const m of messagesEntrants) {
      if (typeof m.content === "string") {
        messagesOpenAI.push({ role: m.role, content: m.content });
        continue;
      }

      if (Array.isArray(m.content)) {
        const parts = m.content
          .map((bloc) => {
            if (bloc.type === "text") return { type: "text", text: bloc.text };
            if (bloc.type === "image" && bloc.source && bloc.source.type === "base64") {
              const mt = bloc.source.media_type || "image/jpeg";
              return {
                type: "image_url",
                image_url: { url: `data:${mt};base64,${bloc.source.data}` },
              };
            }
            return null;
          })
          .filter(Boolean);
        messagesOpenAI.push({ role: m.role, content: parts });
        continue;
      }
    }

    // Appel OpenAI
    const reponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cle}`,
      },
      body: JSON.stringify({
        model: modele,
        max_tokens: corps.max_tokens || 1000,
        messages: messagesOpenAI,
      }),
    });

    const data = await reponse.json();

    if (!reponse.ok) {
      const msg = (data && data.error && data.error.message) ? data.error.message : "Erreur OpenAI";
      return { statusCode: reponse.status, headers: { ...CORS, "Content-Type": "application/json" }, body: JSON.stringify({ error: msg }) };
    }

    const texte = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content ? data.choices[0].message.content : "";

    return {
      statusCode: 200,
      headers: { ...CORS, "Content-Type": "application/json" },
      body: JSON.stringify({ content: [{ type: "text", text: texte }] }),
    };
  } catch (err) {
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: String(err?.message || err) }) };
  }
};
