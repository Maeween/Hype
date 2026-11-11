// 11/11 (Blandine : « ça serait super pour plus avoir à le faire ») — met à jour les réglages de mails de Supabase
// (modèle « mot de passe oublié », durée de validité des liens) À PARTIR DU DÉPÔT GITHUB Maeween/Hype, sans copier-coller.
// Sécurité : la fonction n'accepte AUCUN contenu venant de l'appel. Elle ne fait que recopier dans Supabase les fichiers
// publiés dans le dépôt (outils/mails/…). La clé d'accès (HYPE_PAT_REGLAGES) est un secret saisi par Blandine dans Supabase,
// jamais visible. Actions : {"action":"lire"} (état actuel, sans secret) ou {"action":"appliquer"}.
// Déployée le 11/11 (verify_jwt = false). Appel par Claude depuis la base : select net.http_post(url:='https://ldpjebgtskzdokrublfg.supabase.co/functions/v1/reglages-mails', body:='{"action":"appliquer"}'::jsonb, headers:='{"Content-Type":"application/json"}'::jsonb);
const REF = "ldpjebgtskzdokrublfg";
const DEPOT = "https://raw.githubusercontent.com/Maeween/Hype/main/outils/mails/";
const API = `https://api.supabase.com/v1/projects/${REF}/config/auth`;

function rep(o: unknown, s = 200) {
  return new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json" } });
}

Deno.serve(async (req: Request) => {
  const pat = Deno.env.get("HYPE_PAT_REGLAGES");
  if (!pat) return rep({ ok: false, erreur: "secret HYPE_PAT_REGLAGES absent" }, 500);
  let action = "lire";
  try { const b = await req.json(); if (b && b.action === "appliquer") action = "appliquer"; } catch (_) { /* lecture par defaut */ }
  const h = { Authorization: `Bearer ${pat}`, "Content-Type": "application/json" };

  async function etat() {
    const r = await fetch(API, { headers: h });
    const t = await r.text();
    if (!r.ok) return { ok: false, statut: r.status, detail: t.slice(0, 300) };
    const c = JSON.parse(t);
    return {
      ok: true,
      mailer_otp_exp: c.mailer_otp_exp,
      smtp_actif: !!c.smtp_host,
      smtp_host: c.smtp_host || null,
      smtp_admin_email: c.smtp_admin_email || null,
      smtp_sender_name: c.smtp_sender_name || null,
      sujet_reinitialisation: c.mailer_subjects_recovery,
      reinitialisation_taille: (c.mailer_templates_recovery_content || "").length,
      reinitialisation_debut: (c.mailer_templates_recovery_content || "").slice(0, 160),
      reinitialisation_maquette_A: (c.mailer_templates_recovery_content || "").includes("mail-hypo.jpg"),
    };
  }

  if (action === "lire") return rep(await etat());

  const r1 = await fetch(DEPOT + "reinitialisation.html?t=" + Date.now());
  if (!r1.ok) return rep({ ok: false, erreur: "modele introuvable dans le depot", statut: r1.status }, 502);
  const modele = await r1.text();
  if (!modele.includes("{{ .ConfirmationURL }}") || modele.length < 2000) return rep({ ok: false, erreur: "modele du depot suspect, rien n'a ete change" }, 422);
  const r2 = await fetch(API, { method: "PATCH", headers: h, body: JSON.stringify({ mailer_templates_recovery_content: modele, mailer_otp_exp: 86400 }) });
  const t2 = await r2.text();
  if (!r2.ok) return rep({ ok: false, statut: r2.status, detail: t2.slice(0, 300) }, 502);
  return rep({ applique: true, apres: await etat() });
});
