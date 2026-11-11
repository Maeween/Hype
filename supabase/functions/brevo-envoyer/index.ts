// 11/11 23h04 (Blandine : « envoie-la telle quelle ») — ENVOI D'UNE CAMPAGNE BREVO PAR CLAUDE.
// Le connecteur Brevo de Claude ne sait pas envoyer ; cette fonction le fait avec la clé BREVO_API_KEY (collée par Blandine).
// Garde-fou : elle n'envoie QUE les campagnes inscrites dans la table brevo_envois_autorises (remplie en SQL par Claude
// sur l'accord explicite de Blandine) et pas encore envoyées ; chaque campagne ne part qu'une fois.
// Appel : select net.http_post(url:='https://ldpjebgtskzdokrublfg.supabase.co/functions/v1/brevo-envoyer', body:='{"campagne":1}'::jsonb, headers:='{"Content-Type":"application/json"}'::jsonb);
import { createClient } from "jsr:@supabase/supabase-js@2";
function rep(o: unknown, s = 200) { return new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json" } }); }
Deno.serve(async (req: Request) => {
  const cle = Deno.env.get("BREVO_API_KEY");
  if (!cle) return rep({ ok: false, erreur: "secret BREVO_API_KEY absent" }, 500);
  let id = 0;
  try { const b = await req.json(); id = Number(b && b.campagne) || 0; } catch (_) { }
  if (!id) return rep({ ok: false, erreur: "campagne manquante" }, 400);
  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data: a } = await sb.from("brevo_envois_autorises").select("campagne_id, envoye_le").eq("campagne_id", id).maybeSingle();
  if (!a) return rep({ ok: false, erreur: "campagne non autorisée" }, 403);
  if (a.envoye_le) return rep({ ok: false, erreur: "déjà envoyée" }, 409);
  await sb.from("brevo_envois_autorises").update({ envoye_le: new Date().toISOString(), resultat: "en cours" }).eq("campagne_id", id);
  const r = await fetch("https://api.brevo.com/v3/emailCampaigns/" + id + "/sendNow", { method: "POST", headers: { "api-key": cle, accept: "application/json" } });
  const t = await r.text();
  await sb.from("brevo_envois_autorises").update({ resultat: r.status + " " + t.slice(0, 300) }).eq("campagne_id", id);
  return rep({ ok: r.status >= 200 && r.status < 300, statut: r.status, reponse: t.slice(0, 300) });
});
