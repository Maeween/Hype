// supabase/functions/revenuecat-webhook/index.ts — Hype · abonnements pris DANS L'APPLI IPHONE (11/10/2026, build 967)
//
// PRÉPARÉ, PAS ENCORE EN LIGNE. Ne pas déployer avant : (1) le SQL sql/2026-10-11-abonnements-source.sql passé par
// Blandine, (2) le compte RevenueCat créé, (3) le secret REVENUECAT_WEBHOOK_AUTH posé dans Supabase.
//
// CE QU'ELLE FAIT
// Décision de Blandine (11/10) : dans l'appli iPhone, Premium s'achète PAR APPLE, via RevenueCat. À chaque événement
// (achat, renouvellement, changement de formule, résiliation, expiration, remboursement), RevenueCat appelle cette
// fonction. Elle met à jour la MÊME ligne abonnements_premium que le paiement Stripe du site (une ligne par compte),
// avec source = 'apple'. L'appli et le contrôle d'accès du serveur (hey-baby-vision) ne changent donc pas.
//
// QUI EST QUI : l'appli iPhone se connecte à RevenueCat avec l'identifiant du compte Hype (Purchases.logIn(user.id)),
// donc app_user_id = auth.users.id. Un identifiant anonyme ($RCAnonymousID…) est ignoré (journalisé).
//
// CONFLIT STRIPE / APPLE : si le compte a déjà un abonnement Stripe ACTIF et non expiré, la ligne n'est PAS écrasée
// (on journalise : la personne paie deux fois — à rembourser côté Apple). Les dons Crystal (achats simples) ne
// touchent pas cette table : le statut Crystal reste géré par l'appli, comme pour les dons Stripe.
//
// ACCÈS : « Verify JWT » ÉTEINT (RevenueCat n'a pas de jeton Supabase) → à déployer avec --no-verify-jwt.
// Protection : RevenueCat envoie l'en-tête Authorization réglé dans son tableau de bord ; il doit être égal au secret
// Supabase REVENUECAT_WEBHOOK_AUTH (jamais écrit dans le dépôt, qui est public). Sinon : 401, rien n'est écrit.

import { createClient } from "jsr:@supabase/supabase-js@2";

// Identifiants des produits Apple (à créer À L'IDENTIQUE dans App Store Connect, voir SUIVI.md build 967).
const PRODUITS: Record<string, { plan: string; jours: number }> = {
  "fr.ecuriefeinn.hype.premium.mensuel": { plan: "mensuel", jours: 32 },
  "fr.ecuriefeinn.hype.premium.annuel": { plan: "annuel", jours: 367 },
  "fr.ecuriefeinn.hype.duo.mensuel": { plan: "duo", jours: 32 },
  "fr.ecuriefeinn.hype.ia.mensuel": { plan: "ai", jours: 32 },
};

function log(...a: unknown[]) { try { console.log("[revenuecat-webhook " + new Date().toISOString() + "]", ...a); } catch (_e) { /* rien */ } }
const json = (o: unknown, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json" } });

function egal(a: string, b: string): boolean {   // comparaison à temps constant
  if (a.length !== b.length) return false;
  let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return json({ ok: false, message: "POST attendu" }, 405);
  const attendu = Deno.env.get("REVENUECAT_WEBHOOK_AUTH") || "";
  const recu = req.headers.get("authorization") || "";
  if (!attendu || !egal(recu, attendu)) { log("refus : en-tête Authorization absent ou faux"); return json({ ok: false }, 401); }

  let corps: any = null;
  try { corps = await req.json(); } catch (_e) { return json({ ok: false, message: "JSON invalide" }, 400); }
  const ev = corps && corps.event;
  if (!ev || !ev.type) return json({ ok: false, message: "événement absent" }, 400);

  const type = String(ev.type);
  const userId = String(ev.app_user_id || "");
  const produit = String(ev.new_product_id || ev.product_id || "");
  log("reçu", type, produit, userId, ev.environment || "");

  if (type === "TEST") return json({ ok: true, test: true });
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) { log("ignoré : identifiant non Hype", userId); return json({ ok: true, ignore: "app_user_id" }); }
  const p = PRODUITS[produit];
  if (!p) { log("ignoré : produit hors abonnement (don Crystal ou inconnu)", produit); return json({ ok: true, ignore: "produit" }); }

  const url = Deno.env.get("SUPABASE_URL") || "", cle = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  if (!url || !cle) { log("configuration incomplète"); return json({ ok: false }, 500); }
  const admin = createClient(url, cle, { auth: { persistSession: false } });

  // Ligne actuelle (une par compte)
  const lu = await admin.from("abonnements_premium").select("plan,statut,expire_le,source").eq("user_id", userId).maybeSingle();
  if (lu.error) { log("lecture impossible", lu.error.message); return json({ ok: false }, 500); }
  const ligne: any = lu.data;
  const stripeActif = ligne && (ligne.source || "stripe") !== "apple" && ligne.statut === "actif" && (!ligne.expire_le || new Date(ligne.expire_le).getTime() > Date.now());

  const expMs = Number(ev.expiration_at_ms || 0);
  const expire = expMs > 0 ? new Date(expMs).toISOString() : new Date(Date.now() + p.jours * 86400000).toISOString();
  const maj = new Date().toISOString();

  let champs: Record<string, unknown> | null = null;
  switch (type) {
    case "INITIAL_PURCHASE": case "RENEWAL": case "PRODUCT_CHANGE": case "UNCANCELLATION": case "SUBSCRIPTION_EXTENDED": case "TEMPORARY_ENTITLEMENT_GRANT":
      champs = { plan: p.plan, statut: "actif", expire_le: expire, source: "apple", maj_le: maj }; break;
    case "CANCELLATION":   // résiliation : l'accès reste jusqu'à expiration (sauf remboursement)
      champs = (ev.cancel_reason === "CUSTOMER_SUPPORT" || ev.cancel_reason === "REFUND")
        ? { statut: "annule", expire_le: maj, source: "apple", maj_le: maj }
        : { statut: "actif", expire_le: expire, source: "apple", maj_le: maj };
      break;
    case "EXPIRATION":
      champs = { statut: "annule", source: "apple", maj_le: maj }; break;
    case "BILLING_ISSUE":
      champs = { statut: "impaye", source: "apple", maj_le: maj }; break;
    default:
      log("ignoré : type", type); return json({ ok: true, ignore: "type" });
  }

  if (stripeActif) { log("⚠️ abonnement Stripe actif sur ce compte : ligne NON écrasée (double paiement possible)", userId, type, produit); return json({ ok: true, conflit: "stripe_actif" }); }

  const w = await admin.from("abonnements_premium").upsert(Object.assign({ user_id: userId }, champs), { onConflict: "user_id" });
  if (w.error) { log("écriture impossible", w.error.message); return json({ ok: false }, 500); }
  log("écrit", userId, JSON.stringify(champs));
  return json({ ok: true });
});
