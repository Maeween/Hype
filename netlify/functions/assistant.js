// netlify/functions/assistant.js
// ────────────────────────────────────────────────────────────────────────
// Relais sécurisé entre l'appli « Au Galop » et l'API Anthropic.
// La clé API reste ICI, côté serveur (variable d'environnement) — jamais dans l'appli.
// Aucune dépendance à installer : « fetch » est natif sur Netlify (Node 18+).
// ────────────────────────────────────────────────────────────────────────

const API_ANTHROPIC = "https://api.anthropic.com/v1/messages";

exports.handler = async (event) => {
  // Origine : si la variable ORIGINE_AUTORISEE est définie (ex. l'adresse de ton appli),
  // on n'autorise QUE celle-ci. Sinon on autorise tout (pratique tant que l'appli n'est pas en ligne).
  const origineDemande = (event.headers && (event.headers.origin || event.headers.Origin)) || "";
  const origineAutorisee = process.env.ORIGINE_AUTORISEE || "";
  const origineRetour = origineAutorisee || "*";

  const cors = {
    "Access-Control-Allow-Origin": origineRetour,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };

  // Pré-vol envoyé automatiquement par le navigateur.
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: cors, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: cors, body: JSON.stringify({ error: "Méthode non autorisée." }) };
  }

  // Si une origine est imposée, on refuse les autres.
  if (origineAutorisee && origineDemande && origineDemande !== origineAutorisee) {
    return { statusCode: 403, headers: cors, body: JSON.stringify({ error: "Origine non autorisée." }) };
  }

  const cle = process.env.ANTHROPIC_API_KEY;
  if (!cle) {
    return { statusCode: 500, headers: cors, body: JSON.stringify({ error: "Clé API absente côté serveur." }) };
  }

  let corps;
  try {
    corps = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ error: "Requête illisible." }) };
  }

  // Garde-fous : on borne ce que l'appli peut demander (maîtrise des coûts).
  const messages = Array.isArray(corps.messages) ? corps.messages.slice(-20) : [];
  const charge = {
    model: corps.model || "claude-sonnet-4-6",
    max_tokens: Math.min(Math.max(parseInt(corps.max_tokens, 10) || 1000, 1), 1500),
    messages: messages,
  };
  if (typeof corps.system === "string" && corps.system) {
    charge.system = corps.system;
  }

  try {
    const reponse = await fetch(API_ANTHROPIC, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": cle,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(charge),
    });
    const texte = await reponse.text();
    return {
      statusCode: reponse.status,
      headers: Object.assign({}, cors, { "Content-Type": "application/json" }),
      body: texte,
    };
  } catch (err) {
    return { statusCode: 502, headers: cors, body: JSON.stringify({ error: "Relais indisponible : " + String(err) }) };
  }
};
