// netlify/functions/stripe-webhook.js — Activation automatique du Premium Hype
// Reçoit les événements signés de Stripe et met à jour la table Supabase
// "abonnements_premium". Aucune dépendance npm : signature vérifiée via Web Crypto.
//
// Variables d'environnement Netlify (Site configuration → Environment variables) :
//   STRIPE_WEBHOOK_SECRET      (commence par "whsec_", fournie par Stripe à la création du webhook)
//   SUPABASE_SERVICE_ROLE_KEY  (clé "service_role" de Supabase — SECRÈTE, jamais côté app)
//
// Événements Stripe à cocher lors de la création du webhook :
//   checkout.session.completed · invoice.paid · customer.subscription.deleted

const SUPABASE_URL = "https://ldpjebgtskzdokrublfg.supabase.co";

function log() {
    try {
        const args = Array.prototype.slice.call(arguments);
        console.log.apply(console, ["[stripe-webhook " + new Date().toISOString() + "]"].concat(args));
    } catch (e) { }
}

// Vérifie la signature Stripe (en-tête "Stripe-Signature" : t=…,v1=…)
async function signatureValide(corpsBrut, enTete, secret) {
    if (!enTete || !secret) return false;
    const parties = { v1: [] };
    for (const morceau of enTete.split(",")) {
        const i = morceau.indexOf("=");
        if (i <= 0) continue;
        const k = morceau.slice(0, i).trim(), v = morceau.slice(i + 1).trim();
        if (k === "v1") parties.v1.push(v); else parties[k] = v;
    }
    if (!parties.t || !parties.v1.length) return false;
    if (Math.abs(Date.now() / 1000 - Number(parties.t)) > 300) return false; // tolérance 5 min
    const enc = new TextEncoder();
    const cle = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const sig = await crypto.subtle.sign("HMAC", cle, enc.encode(parties.t + "." + corpsBrut));
    const hex = Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
    return parties.v1.indexOf(hex) !== -1;
}

function entetesSupabase(service) {
    return {
        apikey: service,
        Authorization: "Bearer " + service,
        "Content-Type": "application/json",
    };
}

// Crée ou met à jour la ligne d'abonnement d'un cavalier (clé : user_id)
async function upsertAbonnement(service, ligne) {
    const r = await fetch(SUPABASE_URL + "/rest/v1/abonnements_premium?on_conflict=user_id", {
        method: "POST",
        headers: { ...entetesSupabase(service), Prefer: "resolution=merge-duplicates" },
        body: JSON.stringify(ligne),
    });
    if (!r.ok) log("upsert KO", r.status, (await r.text().catch(() => "")).slice(0, 300));
    return r.ok;
}

// Met à jour par identifiant d'abonnement Stripe (renouvellements, annulations)
async function majParAbonnement(service, subId, champs) {
    const r = await fetch(SUPABASE_URL + "/rest/v1/abonnements_premium?stripe_subscription=eq." + encodeURIComponent(subId), {
        method: "PATCH",
        headers: entetesSupabase(service),
        body: JSON.stringify(champs),
    });
    if (!r.ok) log("maj KO", r.status, (await r.text().catch(() => "")).slice(0, 300));
    return r.ok;
}

export default async (req) => {
    if (req.method !== "POST") return new Response("POST uniquement", { status: 405 });

    const secretStripe = process.env.STRIPE_WEBHOOK_SECRET;
    const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!secretStripe || !service) { log("variables d'environnement manquantes"); return new Response("Config incomplète", { status: 500 }); }

    const corps = await req.text();
    const ok = await signatureValide(corps, req.headers.get("stripe-signature"), secretStripe);
    if (!ok) { log("signature invalide — requête refusée"); return new Response("Signature invalide", { status: 400 }); }

    let evenement;
    try { evenement = JSON.parse(corps); } catch (e) { return new Response("JSON invalide", { status: 400 }); }
    const objet = evenement.data && evenement.data.object;
    log("événement", evenement.type);

    try {
        // ----- Paiement initial d'un abonnement -----
        if (evenement.type === "checkout.session.completed" && objet && objet.mode === "subscription") {
            const userId = objet.client_reference_id || null;
            const email = (objet.customer_details && objet.customer_details.email) || objet.customer_email || null;
            const plan = objet.amount_total === 7999 ? "annuel" : "mensuel";
            const dureeJours = plan === "annuel" ? 367 : 32; // filet de sécurité, affiné par invoice.paid
            const expire = new Date(Date.now() + dureeJours * 86400000).toISOString();
            if (!userId) {
                // Client non identifié (paiement hors app) : à activer manuellement via l'email
                log("ALERTE : paiement sans client_reference_id — email :", email);
                return new Response("OK (non identifié)", { status: 200 });
            }
            await upsertAbonnement(service, {
                user_id: userId,
                email: email,
                stripe_customer: objet.customer || null,
                stripe_subscription: objet.subscription || null,
                plan: plan,
                statut: "actif",
                expire_le: expire,
                maj_le: new Date().toISOString(),
            });
            log("Premium activé :", plan, "—", email);
        }

        // ----- Renouvellement (chaque paiement de facture) -----
        else if (evenement.type === "invoice.paid" && objet && objet.subscription) {
            let expire = null;
            try {
                const fin = objet.lines && objet.lines.data && objet.lines.data[0] && objet.lines.data[0].period && objet.lines.data[0].period.end;
                if (fin) expire = new Date((fin + 2 * 86400) * 1000).toISOString(); // +2 jours de grâce
            } catch (e) { }
            const champs = { statut: "actif", maj_le: new Date().toISOString() };
            if (expire) champs.expire_le = expire;
            await majParAbonnement(service, objet.subscription, champs);
            log("Renouvellement enregistré, expire le", expire || "(période inconnue)");
        }

        // ----- Annulation définitive -----
        else if (evenement.type === "customer.subscription.deleted" && objet && objet.id) {
            await majParAbonnement(service, objet.id, { statut: "annule", maj_le: new Date().toISOString() });
            log("Abonnement annulé :", objet.id);
        }
    } catch (e) {
        log("erreur de traitement :", e && e.message);
        // On répond 200 pour éviter les redéliveries en boucle ; l'erreur est dans les logs.
    }

    return new Response("OK", { status: 200 });
};
