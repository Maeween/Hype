// netlify/functions/stripe-webhook.js — Activation automatique du Premium Hype
// Reçoit les événements signés de Stripe et met à jour la table Supabase
// "abonnements_premium". Aucune dépendance npm : signature vérifiée via Web Crypto.
//
// Variables d'environnement Netlify :
//   STRIPE_WEBHOOK_SECRET      (commence par "whsec_")
//   SUPABASE_SERVICE_ROLE_KEY  (clé "service_role" — SECRÈTE, jamais côté app)
//
// Événements écoutés :
//   checkout.session.completed · invoice.paid · invoice.payment_failed
//   · customer.subscription.deleted
//
// ─────────────────────────────────────────────────────────────────────────────
// RÉVISION DU 21/08/2026 — après la soirée où trois cavalières ont payé sans
// recevoir leur Premium. Trois défauts corrigés :
//
//   1. invoice.paid ne savait que METTRE À JOUR une ligne existante. S'il n'y
//      en avait pas, il ne créait rien et ne le disait pas. Il peut désormais
//      CRÉER la ligne.
//   2. Quand client_reference_id manquait (paiement hors tunnel, second
//      abonnement, lien de facture), la fonction abandonnait en silence.
//      Elle retrouve maintenant la cavalière PAR SON EMAIL.
//   3. Elle répondait « c'est fait » à Stripe même quand rien n'avait été
//      écrit. Stripe considérait le travail accompli et n'insistait jamais.
//      Elle dit maintenant la vérité : en cas d'échec, Stripe réessaie seul.
// ─────────────────────────────────────────────────────────────────────────────

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

/* ── Retrouver la cavalière par son adresse ───────────────────────────────────
   Utilisé quand Stripe ne fournit pas client_reference_id. Cherche dans
   auth.users, sans tenir compte de la casse. Rend l'identifiant ou null.      */
async function userIdParEmail(service, email) {
    if (!email) return null;
    try {
        const r = await fetch(
            SUPABASE_URL + "/auth/v1/admin/users?per_page=200&filter=" + encodeURIComponent(email),
            { headers: entetesSupabase(service) }
        );
        if (!r.ok) { log("recherche email KO", r.status); return null; }
        const data = await r.json();
        const liste = (data && (data.users || data)) || [];
        const cible = String(email).toLowerCase();
        for (const u of liste) {
            if (u && u.email && String(u.email).toLowerCase() === cible) return u.id;
        }
        log("aucun compte pour l'adresse", email);
        return null;
    } catch (e) {
        log("recherche email : erreur", e && e.message);
        return null;
    }
}

/* ── Lire une ligne d'abonnement par l'identifiant Stripe ─────────────────── */
async function ligneParAbonnement(service, subId) {
    if (!subId) return null;
    try {
        const r = await fetch(
            SUPABASE_URL + "/rest/v1/abonnements_premium?stripe_subscription=eq." +
            encodeURIComponent(subId) + "&select=user_id,email,plan&limit=1",
            { headers: entetesSupabase(service) }
        );
        if (!r.ok) return null;
        const t = await r.json();
        return (t && t.length) ? t[0] : null;
    } catch (e) { return null; }
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

/* ── Mise à jour par identifiant d'abonnement Stripe ───────────────────────────
   ⚠️ PostgREST ne renvoie PAS d'erreur quand aucune ligne ne correspond : il
   met à jour zéro ligne et répond 200. On demande donc le compte exact des
   lignes touchées (Prefer: count=exact) pour savoir si le travail a été fait. */
async function majParAbonnement(service, subId, champs) {
    const r = await fetch(SUPABASE_URL + "/rest/v1/abonnements_premium?stripe_subscription=eq." + encodeURIComponent(subId), {
        method: "PATCH",
        headers: { ...entetesSupabase(service), Prefer: "count=exact" },
        body: JSON.stringify(champs),
    });
    if (!r.ok) {
        log("maj KO", r.status, (await r.text().catch(() => "")).slice(0, 300));
        return 0;
    }
    // En-tête Content-Range : "0-0/1" ou "*/0" quand rien n'a été touché.
    const plage = r.headers.get("content-range") || "";
    const n = parseInt(String(plage).split("/")[1], 10);
    return isNaN(n) ? 1 : n; // en cas d'en-tête absent, on ne crie pas au loup
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

    // Vrai tant qu'aucun travail n'a été demandé ; passe à false si une écriture
    // attendue n'a pas abouti. C'est lui qui décide de la réponse à Stripe.
    let ecritureOk = true;

    try {
        // ----- Paiement initial d'un abonnement -----
        if (evenement.type === "checkout.session.completed" && objet && objet.mode === "subscription") {
            const email = (objet.customer_details && objet.customer_details.email) || objet.customer_email || null;
            let userId = objet.client_reference_id || null;

            // Nouveauté : sans identifiant, on retrouve la cavalière par son adresse.
            if (!userId) {
                userId = await userIdParEmail(service, email);
                if (userId) log("rattachée par email :", email);
            }

            const plan = objet.amount_total === 7999 ? "annuel" : "mensuel";
            const dureeJours = plan === "annuel" ? 367 : 32; // filet, affiné par invoice.paid
            const expire = new Date(Date.now() + dureeJours * 86400000).toISOString();

            if (!userId) {
                // Ni identifiant, ni compte trouvé pour cette adresse.
                // On refuse de dire « c'est fait » : Stripe réessaiera, et la
                // ligne restera visible dans les journaux avec son adresse.
                log("ALERTE : paiement non rattachable — email :", email,
                    "· client :", objet.customer, "· abonnement :", objet.subscription);
                ecritureOk = false;
            } else {
                ecritureOk = await upsertAbonnement(service, {
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
        }

        // ----- Paiement de facture : premier paiement OU renouvellement -----
        else if (evenement.type === "invoice.paid" && objet && objet.subscription) {
            let expire = null;
            try {
                const fin = objet.lines && objet.lines.data && objet.lines.data[0] && objet.lines.data[0].period && objet.lines.data[0].period.end;
                if (fin) expire = new Date((fin + 2 * 86400) * 1000).toISOString(); // +2 jours de grâce
            } catch (e) { }

            const champs = { statut: "actif", maj_le: new Date().toISOString() };
            if (expire) champs.expire_le = expire;

            const touchees = await majParAbonnement(service, objet.subscription, champs);

            if (touchees > 0) {
                log("Renouvellement enregistré, expire le", expire || "(période inconnue)");
            } else {
                // Nouveauté : aucune ligne à mettre à jour. Avant, on s'arrêtait
                // là en disant « c'est fait ». On tente maintenant de la CRÉER.
                const email = objet.customer_email ||
                    (objet.customer_details && objet.customer_details.email) || null;
                const userId = await userIdParEmail(service, email);

                if (userId) {
                    const montant = objet.amount_paid || objet.total || 0;
                    ecritureOk = await upsertAbonnement(service, {
                        user_id: userId,
                        email: email,
                        stripe_customer: objet.customer || null,
                        stripe_subscription: objet.subscription || null,
                        plan: montant === 7999 ? "annuel" : "mensuel",
                        statut: "actif",
                        expire_le: expire || new Date(Date.now() + 32 * 86400000).toISOString(),
                        maj_le: new Date().toISOString(),
                    });
                    log("Ligne créée depuis invoice.paid pour", email);
                } else {
                    log("ALERTE : facture payée non rattachable — email :", email,
                        "· client :", objet.customer, "· abonnement :", objet.subscription);
                    ecritureOk = false;
                }
            }
        }

        // ----- Paiement refusé -----
        else if (evenement.type === "invoice.payment_failed" && objet && objet.subscription) {
            const touchees = await majParAbonnement(service, objet.subscription,
                { statut: "impaye", maj_le: new Date().toISOString() });
            if (touchees === 0) log("paiement refusé, aucune ligne correspondante :", objet.subscription);
            log("Paiement refusé enregistré :", objet.subscription);
        }

        // ----- Annulation définitive -----
        else if (evenement.type === "customer.subscription.deleted" && objet && objet.id) {
            const touchees = await majParAbonnement(service, objet.id,
                { statut: "annule", maj_le: new Date().toISOString() });
            if (touchees === 0) log("annulation, aucune ligne correspondante :", objet.id);
            log("Abonnement annulé :", objet.id);
        }
    } catch (e) {
        log("erreur de traitement :", e && e.message);
        ecritureOk = false;
    }

    if (!ecritureOk) {
        // On dit la vérité à Stripe : il réessaiera de lui-même, plusieurs fois,
        // pendant plusieurs jours. C'est le filet qui manquait.
        return new Response("Traitement incomplet", { status: 500 });
    }
    return new Response("OK", { status: 200 });
};
