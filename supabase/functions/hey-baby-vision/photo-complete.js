// supabase/functions/hey-baby-vision/photo-complete.js — 15/10/2026
// PHOTO COMPLÈTE CÔTÉ SERVEUR (demande de Blandine : « on peut garder le retour qu'il arrive ? »).
// Avant : le serveur faisait l'OBSERVATION, puis c'était le TÉLÉPHONE qui demandait la RÉDACTION.
// Si l'écran était quitté au mauvais moment, la réponse n'était jamais rédigée.
// Maintenant : un seul envoi ; le serveur fait les DEUX étapes en arrière-plan, avec EXACTEMENT les
// mêmes consignes et réglages qu'avant, puis enregistre la réponse dans la conversation
// (conversations_heybaby) et dans la ligne d'analyse (heybaby_analyses). L'appli peut être fermée.
// Compteur IA (livraison A) : une photo = UNE question ; rendue si aucune réponse n'a pu être rédigée.
import { HEYBABY_PROMPT_PERCEPTION, HEYBABY_CONSIGNES_PEDAGOGIE, getSystemPrompt, contexteSur, reglerCorrections } from "./prompts.js";

const TYPES_IMAGE = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const LIMITE_IMAGE_B64 = 2600000;
const DUREE_OBSERVATION_MS = 230000;   // les deux étapes doivent tenir sous les 400 s de Supabase
const DUREE_REDACTION_MS = 150000;
const QUESTION_PAR_DEFAUT = { fr: "Analyse cette photo.", en: "Analyse this photo.", es: "Analiza esta foto.", it: "Analizza questa foto.", ja: "この写真を分析してください。", de: "Analysiere dieses Foto.", ar: "حللي هذه الصورة." };

// d = { req, corps, reqId, t0, cle, env(nom), createClient, waitUntil(promesse), log(...), json(obj, statut), erreur(code, msg, statut, extra), jetonsPerception, jetonsStandard }
export async function photoComplete(d) {
  const { req, corps, reqId, t0, cle, env, log, json, erreur } = d;
  const urlSb = env("SUPABASE_URL") || "", cleService = env("SUPABASE_SERVICE_ROLE_KEY") || "";
  if (!urlSb || !cleService) return erreur("INTERNAL_ERROR", "Configuration serveur incomplète.", 500);
  const admin = d.createClient(urlSb, cleService, { auth: { persistSession: false } });

  // Compte vérifié (déjà fait plus haut pour l'accès ; on relit l'identifiant ici).
  const jeton = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  let uid = "";
  try { const u = await admin.auth.getUser(jeton); uid = (u && u.data && u.data.user && u.data.user.id) || ""; } catch (_e) { uid = ""; }
  if (!uid) return erreur("AUTH_REQUIRED", "Session non reconnue.", 401);

  // Photo contrôlée
  const img = corps && corps.image;
  const ok = img && img.type === "image" && img.source && img.source.type === "base64"
    && TYPES_IMAGE.indexOf(String(img.source.media_type || "")) !== -1
    && typeof img.source.data === "string" && img.source.data.length > 0 && img.source.data.length <= LIMITE_IMAGE_B64;
  if (!ok) return erreur("MEDIA_REFUSE", "Cette photo ne peut pas être analysée (format ou poids).", 400);
  const langue = ["fr", "en", "es", "it", "de", "ja", "ar"].indexOf(corps.langue) !== -1 ? corps.langue : "fr";
  const question = String(corps.question || "").slice(0, 2000);
  const contexte = contexteSur(corps.contexte);
  const conversationId = corps.conversationId ? String(corps.conversationId).slice(0, 80) : null;

  const modeleVision = env("OPENAI_VISION_MODEL") || "";
  if (!modeleVision) return erreur("INTERNAL_ERROR", "Modèle vision non configuré côté serveur.", 500);
  const modeleTexte = env("OPENAI_TEXT_MODEL") || "gpt-4o-mini";

  // Réservation AVANT toute dépense (une photo = une question).
  let res = null;
  try {
    const r = await admin.rpc("hype_ia_reserver", { p_uid: uid, p_operation: "photo", p_categorie: "question", p_avec_media: true, p_parent: null });
    res = r && r.data;
  } catch (_e) { res = null; }
  if (!res || res.ok !== true) {
    const code = (res && res.code) || "SERVICE_INDISPONIBLE";
    log(reqId, "photo complète : réservation refusée —", code);
    return erreur(code, "Limite du jour atteinte ou service indisponible.", code === "SERVICE_INDISPONIBLE" ? 503 : 429, { utilisees: res && res.utilisees, limite: res && res.limite });
  }
  const idRes = res.id;
  const terminer = async (consommee) => { try { await admin.rpc("hype_ia_terminer", { p_id: idRes, p_consommee: !!consommee }); } catch (_e) { log(reqId, "fin de réservation non enregistrée (reste comptée)"); } };

  const ins = await admin.from("heybaby_analyses").insert({ user_id: uid, statut: "en_cours" }).select("id").single();
  if (ins.error || !ins.data) { await terminer(false); return erreur("INTERNAL_ERROR", "Analyse impossible à enregistrer.", 500); }
  const jobId = ins.data.id;
  const ecrire = async (champs) => {
    const r = await admin.from("heybaby_analyses").update({ ...champs, updated_at: new Date().toISOString() }).eq("id", jobId);
    if (r.error) log(reqId, "photo complète : écriture impossible —", r.error.message);
  };

  const appel = async (charge, dureeMax) => {
    const ctrl = new AbortController();
    let expire = false;
    const m = setTimeout(() => { expire = true; try { ctrl.abort(); } catch (_e) { /* rien */ } }, dureeMax);
    try {
      const amont = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + cle }, signal: ctrl.signal, body: JSON.stringify(charge),
      });
      if (!amont.ok) { const det = await amont.text().catch(() => ""); return { erreur: "OPENAI_HTTP_" + amont.status, detail: det.slice(0, 300) }; }
      const data = await amont.json().catch(() => null);
      const texte = (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
      return texte ? { texte } : { erreur: "INVALID_RESPONSE" };
    } catch (_e) { return { erreur: expire ? "AI_TIMEOUT" : "OPENAI_SERVER_ERROR" }; }
    finally { clearTimeout(m); }
  };

  const travail = (async () => {
    try {
      // Corrections de la monitrice (comme l'appli et assistant.js)
      try {
        const rc = await admin.from("heybaby_corrections").select("texte").eq("actif", true).order("created_at", { ascending: true }).limit(40);
        reglerCorrections(((rc && rc.data) || []).map((x) => String((x && x.texte) || "").trim()).filter(Boolean));
      } catch (_e) { reglerCorrections([]); }

      // ÉTAPE 1 — observation (mêmes réglages que le mode « perception »)
      const c1 = {
        model: modeleVision, max_completion_tokens: d.jetonsPerception, stream: false, response_format: { type: "json_object" },
        messages: [{ role: "system", content: HEYBABY_PROMPT_PERCEPTION }, { role: "user", content: [
          { type: "image_url", image_url: { url: "data:" + img.source.media_type + ";base64," + img.source.data, detail: env("OPENAI_VISION_DETAIL") || "original" } },
          { type: "text", text: question || "Observe cette photo selon la méthode." }] }],
      };
      if (modeleVision.indexOf("gpt-5") === 0) c1.reasoning_effort = env("OPENAI_VISION_REASONING") || env("OPENAI_REASONING") || "low";
      const r1 = await appel(c1, DUREE_OBSERVATION_MS);
      if (r1.erreur) { log(reqId, "photo complète : observation échouée —", r1.erreur); await terminer(false); await ecrire({ statut: "erreur", erreur_code: r1.erreur, erreur_message: "L'observation de la photo a échoué." }); return; }
      let obs = String(r1.texte).replace(/```json|```/g, "").trim();
      try { obs = JSON.stringify(JSON.parse(obs)); } catch (_e) { /* texte brut transmis, comme avant */ }
      log(reqId, "photo complète : observation en", Date.now() - t0, "ms");

      // ÉTAPE 2 — rédaction (mêmes réglages que la rédaction faite avant par le téléphone)
      const ctx2 = { ...contexte, avecPhoto: false, avecVideo: false, nbFrames: 0, avecTimestamps: false };
      const c2 = {
        model: modeleTexte, max_completion_tokens: d.jetonsStandard, stream: false,
        messages: [{ role: "system", content: getSystemPrompt(langue, ctx2) + HEYBABY_CONSIGNES_PEDAGOGIE.replace("{OBS}", obs) },
                   { role: "user", content: question || QUESTION_PAR_DEFAUT[langue] || QUESTION_PAR_DEFAUT.fr }],
      };
      if (modeleTexte.indexOf("gpt-5") === 0) c2.reasoning_effort = env("OPENAI_REASONING") || "low";
      const r2 = await appel(c2, DUREE_REDACTION_MS);
      if (r2.erreur) { log(reqId, "photo complète : rédaction échouée —", r2.erreur); await terminer(false); await ecrire({ statut: "erreur", erreur_code: r2.erreur, erreur_message: "La rédaction de la réponse a échoué." }); return; }

      // Réponse enregistrée : dans la conversation (visible au retour) ET dans la ligne d'analyse.
      const reponse = String(r2.texte).slice(0, 12000);
      const rc2 = await admin.from("conversations_heybaby").insert({ user_id: uid, conversation_id: conversationId, role: "assistant", contenu: reponse, avec_image: false });
      if (rc2.error) log(reqId, "photo complète : réponse non ajoutée à la conversation —", rc2.error.message);
      await ecrire({ statut: "termine", resultat: reponse });
      await terminer(true);
      log(reqId, "photo complète : réponse enregistrée en", Date.now() - t0, "ms —", reponse.length, "caractères — job", jobId);
    } catch (e) {
      log(reqId, "photo complète : échec —", e && e.message);
      await terminer(false);
      await ecrire({ statut: "erreur", erreur_code: "INTERNAL_ERROR", erreur_message: "Analyse interrompue." });
    }
  })();
  try { d.waitUntil(travail); } catch (_e) { /* rien */ }
  log(reqId, "photo complète : job", jobId, "lancé");
  return json({ ok: true, differe: true, complet: true, jobId, reqId, quota: { utilisees: res.utilisees, limite: res.limite } });
}
