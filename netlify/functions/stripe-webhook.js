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
//
// ─────────────────────────────────────────────────────────────────────────────
// RÉVISION DU 28/08/2026 — Violaine, Aurélie et Laurène avaient bien payé
// (confirmé dans Stripe par Blandine) mais aucune des trois n'a jamais reçu
// sa ligne côté base, MALGRÉ les réessais automatiques de Stripe pendant
// plusieurs jours. Un échec permanent, pas aléatoire : la piste du 21/08
// (userIdParEmail) était la bonne direction mais avait elle-même un défaut.
//
// LE BUG : `/auth/v1/admin/users?filter=<email>` ne fait PAS une recherche
// filtrée par email côté serveur — cet endpoint ignore silencieusement ce
// paramètre et renvoie simplement les 200 premiers comptes de la base (par
// défaut de création), dans un ordre non garanti. Le code cherchait ensuite
// l'adresse dans cette liste tronquée. L'app ayant largement plus de 200
// comptes au total tous clubs confondus, toute cavalière dont le compte
// n'est pas dans ce lot de 200 n'est JAMAIS trouvée — et ça reste vrai à
// CHAQUE nouvelle tentative de Stripe, d'où l'échec permanent.
//
// LE CORRECTIF : une fonction SQL dédiée côté base, `hype_user_id_par_email`,
// qui fait une VRAIE recherche filtrée dans auth.users et n'est appelable que
// par le rôle service_role (la clé secrète du webhook).
//
// ⚠️ PREMIÈRE TENTATIVE ÉCARTÉE, notée ici pour que personne n'y revienne :
// j'avais d'abord voulu chercher dans la table `profiles`. VÉRIFIÉ EN BASE le
// 28/08 : `profiles` n'a AUCUNE colonne email (33 colonnes, aucune ne stocke
// l'adresse) — ce correctif-là aurait échoué en silence, exactement comme le
// bug qu'il prétendait réparer. auth.users est la seule source fiable, et
// elle n'est pas exposée directement à l'API REST, d'où la fonction SQL.
//
// PRÉREQUIS EN BASE (déjà exécuté par Blandine le 28/08, testé : renvoie bien
// l'identifiant de Violaine) :
//
//   create or replace function public.hype_user_id_par_email(p_email text)
//   returns uuid language sql security definer
//   set search_path = auth, public as $$
//     select id from auth.users
//     where lower(email) = lower(trim(p_email)) limit 1;
//   $$;
//   revoke all on function public.hype_user_id_par_email(text)
//     from public, anon, authenticated;
//   grant execute on function public.hype_user_id_par_email(text) to service_role;
// ─────────────────────────────────────────────────────────────────────────────

const SUPABASE_URL = "https://ldpjebgtskzdokrublfg.supabase.co";

/* ── LES TARIFS, EN UN SEUL ENDROIT ──────────────────────────────────────────
   16/09/2026. Avant, le plan etait devine en dur dans deux branches :
   `objet.amount_total === 7999 ? "annuel" : "mensuel"`. Deux defauts :
     1. 7999 est un ANCIEN prix. L annuel est a 99,99 € (9999) depuis, donc tout
        annuel etait enregistre comme « mensuel » - et son expire_le calcule sur
        32 jours au lieu de 367. Verifie dans l app le 16/09 : plan_annuel_detail
        dit bien « 99,99 €/an ».
     2. La regle etait ecrite DEUX FOIS, donc a corriger deux fois.
   Ici : une table, en centimes, avec la duree qui va avec. Un tarif qui change
   se corrige a UN seul endroit. Un montant inconnu retombe sur « mensuel », le
   choix le moins genereux - on ne donne pas un an par erreur.                */
/* ── 14/10/2026 — LIVRAISON 1 « SÉCURISATION HYPE IA » ───────────────────────
   On n'identifie PLUS la formule par le montant payé (Hype IA à 14,99 € était
   inconnu → « mensuel » par défaut → Premium complet offert par erreur ; et le
   Pack Duo à 24,99 € était enregistré « mensuel », sans ses 20 questions IA).
   On l'identifie par les IDENTIFIANTS STRIPE présents dans les messages signés :
     · premier achat (checkout.session.completed) → identifiant du LIEN de paiement
     · renouvellement (invoice.paid)               → identifiant du PRIX de la ligne
   Identifiant inconnu → AUCUN droit + anomalie dans la table paiements_a_verifier.
   Le compte Stripe est garanti par la signature (secret propre à ce compte).
   Liens désactivés le 14/10 (Pro IA 11,90 · Pro Duo 15,90 · anciens 9,99 / 79,99)
   et lien de test à 0 € : volontairement absents → traités comme inconnus.      */
const OFFRES_PAR_LIEN = {
    "plink_1TrFteHnB1OJ7FOmhQ9f3GU5": { plan: "mensuel", jours: 32 },   // Hype Premium mensuel 12,99 €
    "plink_1TrFwtHnB1OJ7FOmVdlbOVhT": { plan: "annuel", jours: 367 },   // Cercle Crystal 99,99 € (paiement unique)
    "plink_1TrGrTHnB1OJ7FOmZscujhRX": { plan: "duo", jours: 32 },       // Pack Duo 24,99 € (Premium + IA, un compte)
    "plink_1TrGWfHnB1OJ7FOmQfLvaAsl": { plan: "ai", jours: 32 },        // Hype IA 14,99 € (IA seule, SANS Premium)
};
const OFFRES_PAR_PRIX = {
    "price_1TrFsxHnB1OJ7FOmIUhz6c2t": { plan: "mensuel" },   // 12,99 €/mois
    "price_1TrGrMHnB1OJ7FOmyXeAxdKt": { plan: "duo" },       // 24,99 €/mois
    "price_1TrGW8HnB1OJ7FOmxDCQ9pyU": { plan: "ai" },        // 14,99 €/mois
    "price_1TrFwmHnB1OJ7FOmLywabzpo": { plan: "annuel" },    // 99,99 € une fois (pas de facture de renouvellement)
};
// Liens de DONS (mécénat « Soutenez Hype ») : aucun droit, jamais.
const LIENS_DONS = new Set([
    "plink_1TofuoHnB1OJ7FOmlNSFTC35", // 20 €
    "plink_1Toge8HnB1OJ7FOm3R3kNg1B", // 40 €
    "plink_1TpwIOHnB1OJ7FOmgVNRdXyt", // 40 € (ancien)
    "plink_1TogAVHnB1OJ7FOmw3rz7hdq", // 80 €
    "plink_1Tp52AHnB1OJ7FOmbJ0W7dUp", // 120 € (inutilisé)
    "plink_1Tp54tHnB1OJ7FOmJyLfYqpI", // 150 €
    "plink_1Tp55WHnB1OJ7FOmyxHf2I5R", // 200 € (inutilisé)
    "plink_1Tpw0fHnB1OJ7FOm32agYGI7", // 250 €
    "plink_1TpvvFHnB1OJ7FOmJ3VdMPMA", // 500 €
]);
const PLANS_PAYES = { mensuel: 1, annuel: 1, duo: 1, ai: 1 };

function prixDeFacture(f) {
    try {
        const l = f && f.lines && f.lines.data && f.lines.data[0];
        if (!l) return null;
        const pd = l.pricing && l.pricing.price_details;
        if (pd && pd.price) return typeof pd.price === "string" ? pd.price : (pd.price.id || null);
        if (l.price) return typeof l.price === "string" ? l.price : (l.price.id || null);
        if (l.plan && l.plan.id) return l.plan.id;
    } catch (e) { }
    return null;
}

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
   Utilisé quand Stripe ne fournit pas client_reference_id.
   28/08 : cherche désormais dans `profiles` via une VRAIE recherche filtrée
   côté base (ilike, insensible à la casse, correspondance exacte puisqu'on
   ne passe aucun joker %). L'ancienne version interrogeait l'API admin avec
   un paramètre "filter" qu'elle ignore silencieusement, et ne regardait donc
   jamais que les 200 premiers comptes de toute la base — la vraie cause du
   blocage permanent de Violaine, Aurélie et Laurène. Rend l'identifiant ou
   null.                                                                      */
async function userIdParEmail(service, email) {
    if (!email) return null;
    try {
        const r = await fetch(SUPABASE_URL + "/rest/v1/rpc/hype_user_id_par_email", {
            method: "POST",
            headers: entetesSupabase(service),
            body: JSON.stringify({ p_email: String(email).trim() }),
        });
        if (!r.ok) { log("recherche email KO", r.status, (await r.text().catch(() => "")).slice(0, 300)); return null; }
        const data = await r.json();
        // La fonction renvoie l'identifiant seul, ou null si aucun compte.
        if (data && typeof data === "string") return data;
        if (data && data.id) return data.id;
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

/* ── Ligne actuelle d'un compte (pour ne JAMAIS écraser un autre accès payé) ── */
async function ligneParUtilisateur(service, userId) {
    const r = await fetch(SUPABASE_URL + "/rest/v1/abonnements_premium?user_id=eq." + encodeURIComponent(userId) +
        "&select=*&limit=1",
        { headers: entetesSupabase(service) });
    if (!r.ok) throw new Error("lecture ligne KO " + r.status);
    const t = await r.json();
    return (t && t.length) ? t[0] : null;
}
/* Un accès PAYÉ encore valable, venant d'un AUTRE achat que celui-ci ?
   (abonnement Stripe différent, Crystal, Duo, IA ou achat Apple). Un mois offert
   saisi à la main (sans trace Stripe, plan mensuel) n'est pas un conflit : un vrai
   achat le remplace normalement.                                                */
function accesPayeConcurrent(ligne, nouvelAbo) {
    if (!ligne || ligne.statut !== "actif") return false;
    if (ligne.expire_le && new Date(ligne.expire_le).getTime() <= Date.now()) return false;
    if (nouvelAbo && ligne.stripe_subscription === nouvelAbo) return false;
    const paye = !!(ligne.stripe_subscription || ligne.stripe_customer || ligne.source === "apple"
        || ligne.plan === "annuel" || ligne.plan === "duo" || ligne.plan === "ai");
    return paye;
}
/* ── Anomalie à vérifier à la main (table paiements_a_verifier, 14/10) ─────────
   Un même événement ne crée qu'UNE ligne (stripe_event_id unique). Renvoie true
   si l'anomalie est bien enregistrée : sinon on ne confirme PAS à Stripe.       */
async function anomalie(service, evenement, infos) {
    log("ANOMALIE", infos.anomalie, "·", evenement.id, "·", infos.identifiant_offre || "", "·", infos.email || "");
    const r = await fetch(SUPABASE_URL + "/rest/v1/paiements_a_verifier?on_conflict=stripe_event_id", {
        method: "POST",
        headers: { ...entetesSupabase(service), Prefer: "resolution=ignore-duplicates,return=minimal" },
        body: JSON.stringify({
            stripe_event_id: evenement.id, type_evenement: evenement.type,
            reference_stripe: infos.reference_stripe || null, identifiant_offre: infos.identifiant_offre || null,
            user_id: infos.user_id || null, email: infos.email || null,
            montant_centimes: (typeof infos.montant === "number") ? infos.montant : null,
            anomalie: infos.anomalie,
        }),
    });
    if (!r.ok) log("anomalie NON enregistrée", r.status, (await r.text().catch(() => "")).slice(0, 300));
    return r.ok;
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

/* ── Numéro d'abonnement d'une FACTURE (14/10/2026) ──────────────────────────
   Depuis la version d'API 2025-03 (« basil », et donc la nôtre, 2026-06-24.dahlia),
   une facture n'a PLUS de champ `subscription` en haut : le numéro est rangé dans
   parent.subscription_details.subscription (ou sur chaque ligne). Le relais
   testait `objet.subscription` → toujours vide → renouvellements et refus de
   paiement IGNORÉS en silence (réponse « OK » sans rien écrire) → Premium expiré
   au bout de 32 jours malgré le prélèvement → validations à la main.
   On lit maintenant les trois endroits possibles, l'ancien d'abord.          */
function aboDeFacture(f) {
    try {
        if (!f) return null;
        if (typeof f.subscription === "string" && f.subscription) return f.subscription;
        if (f.subscription && f.subscription.id) return f.subscription.id;
        const p = f.parent && f.parent.subscription_details && f.parent.subscription_details.subscription;
        if (p) return typeof p === "string" ? p : (p.id || null);
        const l = f.lines && f.lines.data && f.lines.data[0];
        const s = l && l.parent && l.parent.subscription_item_details && l.parent.subscription_item_details.subscription;
        if (s) return typeof s === "string" ? s : (s.id || null);
    } catch (e) { }
    return null;
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
        /* ── Paiement initial : ABONNEMENT *ou* PAIEMENT UNIQUE ─────────────────────
           🟥 RÉVISION DU 16/09/2026 — Soraya a payé 99,99 € le 14/09 (Hype Premium
           annuel) et n'a jamais reçu sa ligne. Diagnostic établi sur le tableau de
           bord Stripe, preuves à l'appui :
             · Client « Invité », identifiant gcus_… et non cus_… (d'où « Clients : 0 »)
             · AUCUN sub_, aucune ligne « Subscription creation » dans ses événements
             · le lien utilisé, plink_1TrFwt…, est un tarif à PAIEMENT UNIQUE

           LE BUG : cette condition exigeait `mode === "subscription"`. Pour un
           paiement unique `mode` vaut "payment" → aucune branche ne s'exécutait,
           `ecritureOk` restait à true, et le webhook répondait 200 OK. Stripe
           considérait le travail fait et ne réessayait JAMAIS. Ni ligne, ni alerte,
           ni trace : un échec totalement silencieux.

           ⚠️ CE N'EST PAS LE BUG D'AOÛT, et il ne faut pas les confondre. En août
           (Violaine, Aurélie, Laurène) le webhook ENTRAIT bien dans la branche,
           échouait à trouver la cavalière, répondait 500, et Stripe réessayait
           pendant des jours — un échec visible et répété. La preuve que les
           paiements d'août étaient bien des abonnements : userIdParEmail n'est
           appelée qu'À L'INTÉRIEUR de cette branche ; s'ils avaient été des
           paiements uniques, elle n'aurait jamais été atteinte et le bug de la
           liste tronquée n'aurait pas pu se produire. Le correctif du 28/08 est
           intact et fonctionne — celui-ci bouche un AUTRE trou.

           ⚠️ CE QUE CHANGE LE PAIEMENT UNIQUE : il n'y a pas de `subscription`, donc
           pas d'invoice.paid, donc AUCUN renouvellement automatique. La durée
           écrite ici est la seule qui vaudra : à l'échéance, l'abonnement expire
           et la cavalière devra repayer. C'est cohérent avec un tarif « Fondateur »
           payé une fois, mais il faut le savoir.                                  */
        const modeSession = objet && objet.mode;
        if (evenement.type === "checkout.session.completed" && objet && (modeSession === "subscription" || modeSession === "payment")) {
            const email = (objet.customer_details && objet.customer_details.email) || objet.customer_email || null;
            let userId = objet.client_reference_id || null;

            // Nouveauté : sans identifiant, on retrouve la cavalière par son adresse.
            if (!userId) {
                userId = await userIdParEmail(service, email);
                if (userId) log("rattachée par email :", email);
            }

            const lien = objet.payment_link || null;
            const offre = lien ? OFFRES_PAR_LIEN[lien] : null;
            const refS = objet.subscription || objet.payment_intent || objet.id;
            const infosBase = { reference_stripe: refS, identifiant_offre: lien, user_id: userId, email: email, montant: objet.amount_total };

            if (lien && LIENS_DONS.has(lien)) {
                // Don : remerciement côté appli, AUCUN droit.
                log("don reçu (aucun droit) :", lien, "—", objet.amount_total);
            } else if (objet.payment_status !== "paid" && objet.payment_status !== "no_payment_required") {
                // Paiement pas encore confirmé (moyen différé) : aucun droit.
                ecritureOk = await anomalie(service, evenement, { ...infosBase, anomalie: "paiement_non_confirme" });
            } else if (!offre) {
                // Lien inconnu : on ne devine JAMAIS la formule par le montant.
                ecritureOk = await anomalie(service, evenement, { ...infosBase, anomalie: "offre_inconnue" });
            } else if (!userId) {
                // Ni identifiant, ni compte trouvé pour cette adresse.
                // On refuse de dire « c'est fait » : Stripe réessaiera, et la
                // ligne restera visible dans les journaux avec son adresse.
                log("ALERTE : paiement non rattachable — email :", email,
                    "· mode :", modeSession,
                    "· client :", objet.customer, "· abonnement :", objet.subscription);
                ecritureOk = false;
            } else {
                const plan = offre.plan;
                /* Fin calculée depuis la DATE DU PAIEMENT (objet.created), pas depuis
                   la réception : un ancien message rejoué ne prolonge rien.       */
                const depart = (objet.created ? objet.created * 1000 : Date.now());
                const expire = new Date(depart + offre.jours * 86400000).toISOString();
                const ligneU = await ligneParUtilisateur(service, userId);
                const dejaFait = !!(ligneU && ligneU.statut === "actif" && ligneU.plan === plan && ligneU.expire_le
                    && Math.abs(new Date(ligneU.expire_le).getTime() - new Date(expire).getTime()) < 120000
                    && (ligneU.stripe_subscription || null) === (objet.subscription || null));
                if (dejaFait) {
                    // Même achat déjà enregistré (message reçu deux fois) : rien à refaire.
                    log("achat déjà enregistré, rien à refaire :", refS);
                } else if (accesPayeConcurrent(ligneU, objet.subscription || null)) {
                    // Le compte a déjà un AUTRE accès payé valable : on n'écrase rien.
                    ecritureOk = await anomalie(service, evenement, { ...infosBase, anomalie: "double_abonnement" });
                } else {
                ecritureOk = await upsertAbonnement(service, {
                    user_id: userId,
                    email: email,
                    stripe_customer: objet.customer || null,
                    /* Pour un paiement unique, il n'y a pas d'abonnement : on laisse
                       null plutôt que d'inventer une valeur. C'est aussi ce qui
                       permettra plus tard de distinguer les deux en base. */
                    stripe_subscription: objet.subscription || null,
                    plan: plan,
                    statut: "actif",
                    expire_le: expire,
                    maj_le: new Date().toISOString(),
                });
                log("Accès activé :", plan, "—", email,
                    "— mode :", modeSession,
                    modeSession === "payment" ? "(paiement unique : aucun renouvellement automatique)" : "");
                }
            }
        }

        // ----- Paiement de facture : premier paiement OU renouvellement -----
        else if (evenement.type === "invoice.paid" && objet && aboDeFacture(objet)) {
            const aboFacture = aboDeFacture(objet);
            let expire = null;
            try {
                const fin = objet.lines && objet.lines.data && objet.lines.data[0] && objet.lines.data[0].period && objet.lines.data[0].period.end;
                if (fin) expire = new Date((fin + 2 * 86400) * 1000).toISOString(); // +2 jours de grâce
            } catch (e) { }

            const champs = { statut: "actif", maj_le: new Date().toISOString() };
            if (expire) champs.expire_le = expire;
            const prix = prixDeFacture(objet);
            const offreF = prix ? OFFRES_PAR_PRIX[prix] : null;
            const emailF = objet.customer_email || (objet.customer_details && objet.customer_details.email) || null;
            const infosF = { reference_stripe: aboFacture, identifiant_offre: prix, email: emailF, montant: objet.amount_paid };

            const ligneAbo = await ligneParAbonnement(service, aboFacture);
            const touchees = ligneAbo ? await majParAbonnement(service, aboFacture, champs) : 0;

            if (touchees > 0) {
                // Renouvellement d'une ligne existante : on prolonge SEULEMENT ses droits
                // (la formule n'est jamais changée ici).
                log("Renouvellement enregistré, expire le", expire || "(période inconnue)");
                if (!offreF) {
                    ecritureOk = await anomalie(service, evenement, { ...infosF, user_id: ligneAbo.user_id, anomalie: "offre_inconnue" });
                } else if (ligneAbo.plan && offreF.plan !== ligneAbo.plan) {
                    ecritureOk = await anomalie(service, evenement, { ...infosF, user_id: ligneAbo.user_id, anomalie: "changement_formule" });
                }
            } else if (ligneAbo) {
                ecritureOk = false; // ligne trouvée mais mise à jour refusée : Stripe réessaiera
            } else if (!offreF) {
                ecritureOk = await anomalie(service, evenement, { ...infosF, anomalie: "offre_inconnue" });
            } else {
                // Nouveauté : aucune ligne à mettre à jour. Avant, on s'arrêtait
                // là en disant « c'est fait ». On tente maintenant de la CRÉER.
                const email = objet.customer_email ||
                    (objet.customer_details && objet.customer_details.email) || null;
                const userId = await userIdParEmail(service, email);

                if (userId && accesPayeConcurrent(await ligneParUtilisateur(service, userId), aboFacture)) {
                    // Ex. : abonnée Premium qui a aussi Hype IA → on n'écrase pas son Premium.
                    ecritureOk = await anomalie(service, evenement, { ...infosF, user_id: userId, anomalie: "double_abonnement" });
                } else if (userId) {
                    const tF = { plan: offreF.plan, jours: 32 };
                    ecritureOk = await upsertAbonnement(service, {
                        user_id: userId,
                        email: email,
                        stripe_customer: objet.customer || null,
                        stripe_subscription: aboFacture,
                        plan: tF.plan,
                        statut: "actif",
                        expire_le: expire || new Date(Date.now() + tF.jours * 86400000).toISOString(),
                        maj_le: new Date().toISOString(),
                    });
                    log("Ligne créée depuis invoice.paid pour", email);
                } else {
                    log("ALERTE : facture payée non rattachable — email :", email,
                        "· client :", objet.customer, "· abonnement :", aboFacture);
                    ecritureOk = false;
                }
            }
        }

        // ----- Paiement refusé -----
        else if (evenement.type === "invoice.payment_failed" && objet && aboDeFacture(objet)) {
            const aboRefus = aboDeFacture(objet);
            const touchees = await majParAbonnement(service, aboRefus,
                { statut: "impaye", maj_le: new Date().toISOString() });
            if (touchees === 0) log("paiement refusé, aucune ligne correspondante :", aboRefus);
            log("Paiement refusé enregistré :", aboRefus);
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
