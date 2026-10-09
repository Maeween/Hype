// supabase/functions/notifier-abonnement/index.ts — Hype · « Nouvel abonnement » sur l'iPhone de Blandine (09/10/2026)
//
// CE QU'ELLE FAIT
// (09/10, ajout) Elle annonce aussi chaque NOUVELLE INSCRIPTION : « 👋 Nouvelle inscription — X a rejoint Hype ».
// Quand quelqu'un prend un abonnement, Blandine reçoit une notification dans Hype :
//   « 🎉 Nouvel abonnement » — « Pack Duo — Léa »
//   « 🔁 Changement d'abonnement » — « Premium mensuel → Premium annuel — Léa »
// Les renouvellements automatiques (chaque mois / chaque année) ne notifient PAS.
//
// COMMENT ELLE SAIT QUOI ENVOYER (build 2, SQL) : une règle posée sur abonnements_premium
// remplit la colonne notif_motif ('nouveau' ou 'changement') au bon moment, puis appelle
// cette fonction. La fonction prend les lignes en attente, les marque comme envoyées
// (notif_motif remis à vide, notifie_le = maintenant) AVANT d'envoyer : chaque abonnement
// n'est donc annoncé qu'UNE fois, même si la fonction est appelée plusieurs fois.
// ⚠️ Tant que le build 2 n'est pas passé, ces colonnes n'existent pas : seul le mode test marche.
//
// ACCÈS : « Verify JWT » ÉTEINT (déployée avec --no-verify-jwt, comme notifier-rdv), car la
// base l'appelle sans jeton. Pas de mot de passe nécessaire : un appel venu d'ailleurs ne peut
// QUE vider la file d'attente des vraies notifications, ou envoyer le message de test.
// Conséquence assumée : quelqu'un qui connaît l'adresse peut envoyer à Blandine le message
// « Test » (rien d'autre, aucune donnée renvoyée).
//
// À QUI : uniquement aux appareils (push_abonnements) du compte feinn@live.fr, retrouvé par la
// fonction SQL hype_user_id_par_email (déjà en base depuis le 28/08, réservée à la clé de service).
//
// SECRETS : la clé PRIVÉE VAPID est lue dans les secrets Supabase (jamais dans le dépôt, qui est
// public). Son nom exact n'est pas connu de Claude : plusieurs noms courants sont essayés. Si
// aucun ne correspond, la fonction répond la LISTE DES NOMS de secrets contenant « VAPID » ou
// « PUSH » — jamais leurs valeurs — pour qu'on corrige le nom ici.
// SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont fournis d'office par Supabase.

import webpush from "npm:web-push@3.6.7";

const EMAIL_BLANDINE = "feinn@live.fr";
const SUJET_DEFAUT = "mailto:feinn@live.fr";
// Clé PUBLIQUE (elle est déjà dans index.html, VAPID_PUBLIQUE) : pas un secret.
const CLE_PUBLIQUE_DEFAUT = "BP-1TH_5bpRxes4Z2DsVTMa3y8ItFEqsGwizTGy8NLb86OX3X1A-QYuDDaMQXBBIQO0_hD5Va-BMR96rctn4wZM";

const NOMS_PRIVEE = ["VAPID_PRIVATE_KEY", "VAPID_PRIVEE", "VAPID_CLE_PRIVEE", "VAPID_PRIVATE", "PRIVATE_VAPID_KEY", "WEB_PUSH_PRIVATE_KEY", "WEBPUSH_PRIVATE_KEY"];
const NOMS_PUBLIQUE = ["VAPID_PUBLIC_KEY", "VAPID_PUBLIQUE", "VAPID_CLE_PUBLIQUE", "VAPID_PUBLIC", "PUBLIC_VAPID_KEY", "WEB_PUSH_PUBLIC_KEY", "WEBPUSH_PUBLIC_KEY"];
const NOMS_SUJET = ["VAPID_SUBJECT", "VAPID_SUJET", "VAPID_EMAIL", "VAPID_MAILTO"];

const LIBELLES: Record<string, string> = {
  mensuel: "Premium mensuel",
  annuel: "Premium annuel",
  ai: "Hey Baby",
  duo: "Pack Duo",
};
const libelle = (p: unknown) => LIBELLES[String(p || "")] || String(p || "abonnement");

function premier(noms: string[]): string {
  for (const n of noms) { const v = Deno.env.get(n); if (v && v.trim()) return v.trim(); }
  return "";
}

function json(corps: unknown, statut = 200) {
  return new Response(JSON.stringify(corps), { status: statut, headers: { "content-type": "application/json; charset=utf-8" } });
}

const URL_SB = Deno.env.get("SUPABASE_URL") || "";
const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const entetes = (extra: Record<string, string> = {}) => ({
  apikey: SERVICE, Authorization: "Bearer " + SERVICE, "Content-Type": "application/json", ...extra,
});

async function rest(chemin: string, init: RequestInit = {}) {
  const r = await fetch(URL_SB + "/rest/v1/" + chemin, init);
  const texte = await r.text();
  if (!r.ok) throw new Error("base " + r.status + " " + texte.slice(0, 200));
  return texte ? JSON.parse(texte) : null;
}

async function appareilsDeBlandine(): Promise<any[]> {
  const id = await rest("rpc/hype_user_id_par_email", {
    method: "POST", headers: entetes(), body: JSON.stringify({ p_email: EMAIL_BLANDINE }),
  });
  if (!id || typeof id !== "string") throw new Error("compte " + EMAIL_BLANDINE + " introuvable");
  return await rest("push_abonnements?user_id=eq." + encodeURIComponent(id) + "&select=endpoint,p256dh,auth",
    { headers: entetes() }) || [];
}

async function envoyer(appareils: any[], message: Record<string, string>) {
  let envois = 0;
  const erreurs: string[] = [];
  for (const a of appareils) {
    try {
      await webpush.sendNotification({ endpoint: a.endpoint, keys: { p256dh: a.p256dh, auth: a.auth } }, JSON.stringify(message));
      envois++;
    } catch (e: any) {
      erreurs.push(String(e && (e.statusCode || e.message) || e));
    }
  }
  return { envois, erreurs };
}

async function nomCavaliere(userId: string): Promise<string> {
  try {
    const t = await rest("profiles?id=eq." + encodeURIComponent(userId) + "&select=pseudo,handle&limit=1", { headers: entetes() });
    const p = t && t[0];
    return (p && (p.pseudo || p.handle)) ? String(p.pseudo || p.handle) : "";
  } catch { return ""; }
}

Deno.serve(async (req) => {
  if (!URL_SB || !SERVICE) return json({ ok: false, erreur: "config_supabase" }, 500);

  const privee = premier(NOMS_PRIVEE);
  if (!privee) {
    // Les NOMS seulement, jamais les valeurs.
    const noms = Object.keys(Deno.env.toObject()).filter((n) => /VAPID|PUSH/i.test(n)).sort();
    return json({ ok: false, erreur: "cle_privee_introuvable", noms_trouves: noms }, 500);
  }
  webpush.setVapidDetails(premier(NOMS_SUJET) || SUJET_DEFAUT, premier(NOMS_PUBLIQUE) || CLE_PUBLIQUE_DEFAUT, privee);

  let corps: any = {};
  try { if (req.method === "POST") corps = await req.json(); } catch { corps = {}; }
  const test = corps.test === true || new URL(req.url).searchParams.get("test") === "1";

  try {
    const appareils = await appareilsDeBlandine();
    if (!appareils.length) return json({ ok: false, erreur: "aucun_appareil" });

    // ── Mode test : un seul message, rien n'est lu ni écrit dans les abonnements ──
    if (test) {
      const r = await envoyer(appareils, {
        titre: "🔔 Test — abonnements",
        corps: "Tu seras prévenue ici à chaque nouvel abonnement.",
        url: "/", tag: "hype-abonnement-test",
      });
      return json({ ok: r.envois > 0, mode: "test", appareils: appareils.length, ...r });
    }

    // ── Mode normal : les abonnements en attente d'annonce ──
    const attente = await rest(
      "abonnements_premium?notif_motif=not.is.null&select=user_id,plan,notif_motif,notif_ancien_plan&limit=20",
      { headers: entetes() }) || [];
    let annonces = 0;
    const erreurs: string[] = [];
    for (const l of attente) {
      // On « réserve » la ligne d'abord : si un autre appel l'a déjà prise, rien ne revient.
      const prise = await rest(
        "abonnements_premium?user_id=eq." + encodeURIComponent(l.user_id) + "&notif_motif=eq." + encodeURIComponent(l.notif_motif),
        {
          method: "PATCH",
          headers: entetes({ Prefer: "return=representation" }),
          body: JSON.stringify({ notif_motif: null, notif_ancien_plan: null, notifie_le: new Date().toISOString() }),
        });
      if (!prise || !prise.length) continue;
      const qui = await nomCavaliere(l.user_id);
      const suffixe = qui ? " — " + qui : "";
      const message = l.notif_motif === "changement"
        ? { titre: "🔁 Changement d'abonnement", corps: libelle(l.notif_ancien_plan) + " → " + libelle(l.plan) + suffixe }
        : { titre: "🎉 Nouvel abonnement", corps: libelle(l.plan) + suffixe };
      const r = await envoyer(appareils, { ...message, url: "/", tag: "hype-abonnement-" + l.user_id });
      if (r.envois > 0) annonces++;
      erreurs.push(...r.erreurs);
    }
    // ── 09/10 : les nouvelles inscriptions en attente d'annonce ──
    // File public.inscriptions_a_annoncer, remplie par une règle sur profiles (création de compte).
    // Protégé : si la file n'existe pas encore (SQL pas passé), les abonnements marchent quand même.
    let inscriptions = 0;
    try {
      const file = await rest(
        "inscriptions_a_annoncer?annonce_le=is.null&select=id,user_id&order=id.asc&limit=20",
        { headers: entetes() }) || [];
      for (const ins of file) {
        const prise = await rest(
          "inscriptions_a_annoncer?id=eq." + encodeURIComponent(ins.id) + "&annonce_le=is.null",
          {
            method: "PATCH",
            headers: entetes({ Prefer: "return=representation" }),
            body: JSON.stringify({ annonce_le: new Date().toISOString() }),
          });
        if (!prise || !prise.length) continue;
        const qui = await nomCavaliere(ins.user_id);
        const r = await envoyer(appareils, {
          titre: "👋 Nouvelle inscription",
          corps: qui ? qui + " a rejoint Hype" : "Quelqu'un a rejoint Hype",
          url: "/", tag: "hype-inscription-" + ins.user_id,
        });
        if (r.envois > 0) inscriptions++;
        erreurs.push(...r.erreurs);
      }
    } catch (e) {
      console.log("[notifier-abonnement] inscriptions ignorées :", String(e).slice(0, 200));
    }

    if (erreurs.length) console.log("[notifier-abonnement] erreurs d'envoi :", erreurs.join(" | "));
    return json({ ok: true, en_attente: attente.length, annonces, inscriptions, erreurs });
  } catch (e) {
    console.log("[notifier-abonnement] erreur :", String(e));
    return json({ ok: false, erreur: String(e && (e as Error).message || e).slice(0, 200) }, 500);
  }
});
