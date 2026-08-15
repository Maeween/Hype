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
//
// ─────────────────────────────────────────────────────────────────────────────
// 🟥 SESSION DU 15/08/2026 — POURQUOI CE FICHIER A ÉTÉ REPRIS
//
// Signalement de Blandine : Dominique et Barbara payaient et n'avaient plus le
// Premium. Vérifications faites avec elle, dans l'ordre :
//   · Stripe : les deux abonnements ACTIFS (14 et 16 juillet). Elles paient.
//   · Supabase : les deux lignes existent, statut "actif" — donc le paiement
//     initial avait bien été rattaché au compte.
//   · MAIS `expire_le` valait le 15/08 12h16 pour Dominique (dépassé de trois
//     heures au moment du diagnostic) et le 17/08 pour Barbara — soit
//     exactement les 32 jours du filet de sécurité posés à la souscription.
//     Aucun renouvellement n'avait jamais prolongé ces dates.
//   · Webhook Stripe : les trois événements écoutés, `invoice.paid` compris.
//     ZÉRO échec, réponse en 1167 ms. L'événement du 14/08 marqué « Envoyé ».
//
// Le tuyau marchait donc parfaitement — et le code ne faisait rien. La cause,
// lisible dans le JSON de l'événement : en API 2026-06-24.dahlia,
// l'identifiant d'abonnement n'est PLUS à la racine de la facture. Il est sous
//     parent.subscription_details.subscription
// Le test `objet.subscription` valait donc `undefined`, le bloc de
// renouvellement était sauté, et la fonction répondait 200 sans rien écrire.
// Un échec parfaitement SILENCIEUX : invisible dans les tableaux de bord de
// Stripe comme de Netlify, puisque tout répondait « OK ».
//
// ⚠️ LEÇON À NE PAS PERDRE : un `if` qui ne matche pas n'est pas une erreur.
// Tout chemin qui décide de NE RIEN FAIRE doit le dire dans les logs — c'est
// la seule raison pour laquelle ce défaut a pu vivre un mois.
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

// ─────────────────────────────────────────────────────────────────────────────
// LECTURE DES CHAMPS QUI ONT CHANGÉ DE PLACE
//
// Stripe déplace des champs d'une version d'API à l'autre. Ces trois fonctions
// regardent TOUS les emplacements connus, du plus récent au plus ancien, pour
// qu'une prochaine version ne casse pas les renouvellements en silence.
// ⚠️ NE JAMAIS revenir à un accès direct du type `objet.subscription`.
// ─────────────────────────────────────────────────────────────────────────────

// L'identifiant d'abonnement d'une facture.
//   2026-06+ : parent.subscription_details.subscription   ← LA CAUSE DU BUG
//   plus ancien : objet.subscription
function abonnementDeFacture(f) {
    try {
        if (!f) return null;
        const p = f.parent && f.parent.subscription_details && f.parent.subscription_details.subscription;
        if (p) return p;
        if (typeof f.subscription === "string" && f.subscription) return f.subscription;
        if (f.subscription && f.subscription.id) return f.subscription.id;
        const l = f.lines && f.lines.data && f.lines.data[0];
        const ls = l && l.parent && l.parent.subscription_item_details && l.parent.subscription_item_details.subscription;
        if (ls) return ls;
        return null;
    } catch (e) { return null; }
}

// La fin de la période payée, en secondes Unix.
function finDePeriode(f) {
    try {
        if (!f) return null;
        const l = f.lines && f.lines.data && f.lines.data[0];
        const fin = l && l.period && l.period.end;
        if (fin) return fin;
        if (f.period_end) return f.period_end;   // repli
        return null;
    } catch (e) { return null; }
}

// Le plan, déduit de l'INTERVALLE réel de facturation et non d'un montant.
// ⚠️ L'ancien code testait `amount_total === 7999`. Les tarifs ont changé
// depuis (annuel passé à 99,99 €, Pack Duo à 24,99 €/mois) : l'annuel était
// donc étiqueté « mensuel » et ne recevait que 32 jours. Un prix bouge, un
// intervalle non — c'est lui qui doit décider.
function planDepuisIntervalle(f, replis) {
    try {
        const l = f && f.lines && f.lines.data && f.lines.data[0];
        const pd = l && l.pricing && l.pricing.price_details;
        const rec = (pd && pd.recurring) || (l && l.price && l.price.recurring);
        if (rec && rec.interval === "year") return "annuel";
        if (rec && rec.interval === "month") return "mensuel";
        // Repli : la durée réelle de la période facturée.
        const d = finDePeriode(f);
        const deb = (l && l.period && l.period.start) || f.period_start;
        if (d && deb) return ((d - deb) > 200 * 86400) ? "annuel" : "mensuel";
    } catch (e) { }
    return replis || "mensuel";
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

// Met à jour par identifiant d'abonnement Stripe (renouvellements, annulations).
// `Prefer: return=representation` fait renvoyer les lignes touchées : sans ça,
// une mise à jour qui ne trouve AUCUNE ligne répond 200 comme si tout allait
// bien. C'est ce silence qui a coûté un mois.
async function majParAbonnement(service, subId, champs) {
    const r = await fetch(SUPABASE_URL + "/rest/v1/abonnements_premium?stripe_subscription=eq." + encodeURIComponent(subId), {
        method: "PATCH",
        headers: { ...entetesSupabase(service), Prefer: "return=representation" },
        body: JSON.stringify(champs),
    });
    if (!r.ok) { log("maj KO", r.status, (await r.text().catch(() => "")).slice(0, 300)); return 0; }
    try {
        const lignes = await r.json();
        return Array.isArray(lignes) ? lignes.length : 0;
    } catch (e) { return 0; }
}

// Repli : mise à jour par identifiant CLIENT Stripe. Sert quand la ligne a été
// créée sans `stripe_subscription` (activation manuelle, paiement hors app).
async function majParClient(service, custId, champs) {
    const r = await fetch(SUPABASE_URL + "/rest/v1/abonnements_premium?stripe_customer=eq." + encodeURIComponent(custId), {
        method: "PATCH",
        headers: { ...entetesSupabase(service), Prefer: "return=representation" },
        body: JSON.stringify(champs),
    });
    if (!r.ok) { log("maj client KO", r.status, (await r.text().catch(() => "")).slice(0, 300)); return 0; }
    try {
        const lignes = await r.json();
        return Array.isArray(lignes) ? lignes.length : 0;
    } catch (e) { return 0; }
}

// Dernier repli : mise à jour par ADRESSE E-MAIL, et au passage on inscrit
// l'identifiant d'abonnement pour que les fois suivantes passent par le
// chemin normal. Sans ça, une ligne mal raccrochée le reste à vie.
async function majParEmail(service, email, champs) {
    const r = await fetch(SUPABASE_URL + "/rest/v1/abonnements_premium?email=eq." + encodeURIComponent(email), {
        method: "PATCH",
        headers: { ...entetesSupabase(service), Prefer: "return=representation" },
        body: JSON.stringify(champs),
    });
    if (!r.ok) { log("maj email KO", r.status, (await r.text().catch(() => "")).slice(0, 300)); return 0; }
    try {
        const lignes = await r.json();
        return Array.isArray(lignes) ? lignes.length : 0;
    } catch (e) { return 0; }
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
            /* Le plan ne peut pas être lu ici (la session ne porte pas
               l'intervalle) : on repart du montant, mais SANS le figer sur un
               tarif précis — au-dessus de 50 € c'est forcément une formule
               annuelle. `invoice.paid` corrigera de toute façon dans la
               seconde qui suit, avec la vraie période. */
            const montant = Number(objet.amount_total || 0);
            const plan = montant >= 5000 ? "annuel" : "mensuel";
            const dureeJours = plan === "annuel" ? 367 : 32; // filet, affiné par invoice.paid
            const expire = new Date(Date.now() + dureeJours * 86400000).toISOString();
            if (!userId) {
                // Client non identifié (paiement hors app) : à activer manuellement via l'email
                log("ALERTE : paiement sans client_reference_id — email :", email, "— montant :", montant);
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
            log("Premium activé :", plan, "—", email, "— expire (provisoire)", expire);
        }

        // ----- Renouvellement (chaque paiement de facture) -----
        else if (evenement.type === "invoice.paid" && objet) {
            const subId = abonnementDeFacture(objet);
            const email = objet.customer_email || null;
            const custId = objet.customer || null;

            /* ⚠️ C'EST ICI QUE TOUT SE JOUAIT. L'ancien code exigeait
               `objet.subscription` : depuis l'API 2026-06, ce champ est sous
               `parent`, la condition était donc toujours fausse et la facture
               repartait sans rien avoir mis à jour. */
            if (!subId) {
                log("ALERTE : invoice.paid SANS identifiant d'abonnement trouvable — email :", email, "— client :", custId);
                return new Response("OK (abonnement introuvable)", { status: 200 });
            }

            const fin = finDePeriode(objet);
            const expire = fin ? new Date((fin + 2 * 86400) * 1000).toISOString() : null; // +2 jours de grâce
            const plan = planDepuisIntervalle(objet, null);

            const champs = { statut: "actif", maj_le: new Date().toISOString() };
            if (expire) champs.expire_le = expire;
            if (plan) champs.plan = plan;

            let touchees = await majParAbonnement(service, subId, champs);

            /* Aucune ligne touchée = la ligne existe sous un autre repère.
               On rattrape par client, puis par e-mail — et on RACCROCHE
               l'identifiant d'abonnement au passage, pour que la fois
               suivante passe par le chemin normal. */
            if (!touchees && custId) {
                touchees = await majParClient(service, custId, Object.assign({ stripe_subscription: subId }, champs));
                if (touchees) log("rattrapé par stripe_customer");
            }
            if (!touchees && email) {
                touchees = await majParEmail(service, email, Object.assign({ stripe_subscription: subId, stripe_customer: custId }, champs));
                if (touchees) log("rattrapé par e-mail");
            }
            if (!touchees) {
                log("ALERTE : aucune ligne d'abonnement mise à jour — abonnement :", subId, "— email :", email);
            } else {
                log("Renouvellement enregistré :", plan || "(plan inchangé)", "— expire le", expire || "(période inconnue)", "—", email);
            }
        }

        // ----- Annulation définitive -----
        else if (evenement.type === "customer.subscription.deleted" && objet && objet.id) {
            const n = await majParAbonnement(service, objet.id, { statut: "annule", maj_le: new Date().toISOString() });
            if (!n) log("ALERTE : annulation sans ligne correspondante —", objet.id);
            else log("Abonnement annulé :", objet.id);
        }

        // ----- Tout le reste : on le DIT. -----
        /* Un événement ignoré en silence est exactement ce qui a masqué le
           défaut pendant un mois. Désormais chaque chemin laisse une trace. */
        else {
            log("événement non traité :", evenement.type);
        }
    } catch (e) {
        log("erreur de traitement :", e && e.message);
        // On répond 200 pour éviter les redéliveries en boucle ; l'erreur est dans les logs.
    }

    return new Response("OK", { status: 200 });
};
