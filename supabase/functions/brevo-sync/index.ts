// 11/11 (Blandine : « j'en ai marre des imports, on pourra pas faire ça à 300 ») — SYNCHRO HYPE -> BREVO.
// Lit les comptes Hype dans la base et met Brevo à jour tout seul : contacts, attributs (ECURIE, ECURIE2, PREMIUM, OFFRE,
// GENRE) et listes. Aucun contenu n'est accepté de l'appel (seul {"essai":true} = simulation sans rien écrire).
// Clé Brevo : secret BREVO_API_KEY (créé et collé par Blandine, jamais vu par Claude).
// Règles : - nouveau contact -> PRENOM tiré du pseudo (1er mot) ; contact existant -> PRENOM JAMAIS écrasé (prénoms corrigés à la main).
//          - liste 2 (tous les cavaliers) <- tout le monde sauf EXCLUS (comptes de Blandine et de test).
//          - liste 4 « Accès offert » <- Premium offert sans Stripe qui expire le 10/12/2026 (OFFRE = acces_offert).
//          - GENRE = "m" pour les garçons listés dans GARCONS (sert au « Prêt / Prête » des mails).
// Appel (par Claude, depuis la base) : select net.http_post(url:='https://ldpjebgtskzdokrublfg.supabase.co/functions/v1/brevo-sync', body:='{}'::jsonb, headers:='{"Content-Type":"application/json"}'::jsonb, timeout_milliseconds:=120000);
import { createClient } from "jsr:@supabase/supabase-js@2";

const EXCLUS = new Set(["malicia2008@hotmail.fr", "feinn@live.fr", "fzinn@live.fr", "cherry@gmail.com", "clem@hotmail.fe", "chatgpt@gg.com", "csr2w682sz@privaterelay.appleid.com"]);
const GARCONS = new Set(["a.sitou055@outlook.com", "evanroux569@gmail.com", "liamroux0@gmail.com", "elias.leinenweber@free.fr", "arnaud.aboaf@gmail.com", "guillaumedecoux75@gmail.com"]);
const PRENOMS: Record<string, string> = { "filou_2016@yahoo.com": "Grace" };
const LISTE_TOUS = 2, LISTE_ACCES_OFFERT = 4, FIN_OFFRE = "2026-12-10";
const B = "https://api.brevo.com/v3";

function court(e: string | null): string | null {
  if (!e) return null;
  if (/\(SEP\)/i.test(e) || /^soci[eé]t[eé] d.?[eé]quitation de paris/i.test(e)) return "SEP";
  if (/feinn/i.test(e)) return "Feinn";
  return e;
}
function prenomDe(pseudo: string | null): string | null {
  if (!pseudo) return null;
  const m = pseudo.trim().split(/[\s_.-]+/)[0];
  if (!m || !/^[\p{L}]{2,}$/u.test(m)) return null;
  return m.charAt(0).toUpperCase() + m.slice(1);
}
function rep(o: unknown, s = 200) { return new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json" } }); }

Deno.serve(async (req: Request) => {
  const cle = Deno.env.get("BREVO_API_KEY");
  if (!cle) return rep({ ok: false, erreur: "secret BREVO_API_KEY absent" }, 500);
  let essai = false;
  try { const b = await req.json(); essai = !!(b && b.essai); } catch (_) { }
  const hb = { "api-key": cle, "Content-Type": "application/json", accept: "application/json" };
  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const users: { id: string; email: string }[] = [];
  for (let page = 1; page < 20; page++) {
    const { data, error } = await sb.auth.admin.listUsers({ page, perPage: 500 });
    if (error) return rep({ ok: false, erreur: "lecture comptes", detail: error.message }, 500);
    for (const u of data.users) if (u.email) users.push({ id: u.id, email: u.email.toLowerCase() });
    if (data.users.length < 500) break;
  }
  const { data: profils } = await sb.from("profiles").select("id,pseudo,ecurie,ecurie2,compte_supprime");
  const { data: abos } = await sb.from("abonnements_premium").select("user_id,statut,expire_le,stripe_subscription");
  const P = new Map((profils || []).map((p: any) => [p.id, p]));
  const A = new Map((abos || []).map((a: any) => [a.user_id, a]));
  const maintenant = Date.now();

  const existants = new Map<string, any>();
  for (let offset = 0; offset < 20000; offset += 1000) {
    const r = await fetch(`${B}/contacts?limit=1000&offset=${offset}`, { headers: hb });
    if (!r.ok) return rep({ ok: false, erreur: "lecture Brevo", statut: r.status, detail: (await r.text()).slice(0, 200) }, 502);
    const j = await r.json();
    for (const c of j.contacts || []) existants.set(String(c.email).toLowerCase(), c);
    if (!j.contacts || j.contacts.length < 1000) break;
  }

  if (!essai) { await fetch(`${B}/contacts/attributes/normal/GENRE`, { method: "POST", headers: hb, body: JSON.stringify({ type: "text" }) }); }

  const bilan = { comptes: users.length, ajoutes: [] as string[], mis_a_jour: 0, acces_offert: [] as string[], ignores: 0, erreurs: [] as string[] };
  for (const u of users) {
    const p: any = P.get(u.id) || {};
    if (EXCLUS.has(u.email) || /@example\.com$/.test(u.email) || p.compte_supprime) { bilan.ignores++; continue; }
    const a: any = A.get(u.id);
    const premium = !!(a && a.statut === "actif" && (!a.expire_le || new Date(a.expire_le).getTime() > maintenant));
    const offert = !!(premium && a && !a.stripe_subscription && String(a.expire_le || "").startsWith(FIN_OFFRE));
    const attrs: Record<string, string> = { PREMIUM: premium ? "oui" : "non" };
    const e1 = court(p.ecurie), e2 = court(p.ecurie2);
    if (e1) attrs.ECURIE = e1; if (e2) attrs.ECURIE2 = e2;
    if (offert) attrs.OFFRE = "acces_offert";
    if (GARCONS.has(u.email)) attrs.GENRE = "m";
    const deja = existants.get(u.email);
    if (PRENOMS[u.email] && (!deja || !(deja.attributes || {}).PRENOM)) attrs.PRENOM = PRENOMS[u.email];
    if (!deja) { const pr = PRENOMS[u.email] || prenomDe(p.pseudo); if (pr) attrs.PRENOM = pr; }
    const listes = [LISTE_TOUS]; if (offert) { listes.push(LISTE_ACCES_OFFERT); bilan.acces_offert.push(u.email); }
    if (essai) { if (!deja) bilan.ajoutes.push(u.email); else bilan.mis_a_jour++; continue; }
    const r = await fetch(`${B}/contacts`, { method: "POST", headers: hb, body: JSON.stringify({ email: u.email, attributes: attrs, listIds: listes, updateEnabled: true }) });
    if (r.ok || r.status === 204) { if (!deja) bilan.ajoutes.push(u.email); else bilan.mis_a_jour++; }
    else bilan.erreurs.push(`${u.email}: ${r.status} ${(await r.text()).slice(0, 120)}`);
  }
  return rep({ ok: bilan.erreurs.length === 0, essai, ...bilan });
});
