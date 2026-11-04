// netlify/functions/recherche-concours.js — Retrouver un concours FFE (numéro, discipline, clôture)
//
// 04/11/2026 — Demande de Blandine : « quand on rentre la date et le lieu, que l'appli trouve le numéro
// elle-même ; ou à l'inverse, quand on met une date, qu'elle propose plusieurs endroits ».
// Les sites de la FFE refusent les lectures automatiques : on ne les lit donc PAS. On passe par une
// recherche sur internet (outil de recherche web d'OpenAI, même clé que Hey Baby), qui montre ce que
// les moteurs de recherche ont déjà en mémoire. Ça ne marche pas à chaque fois : l'appli propose alors
// de chercher à la main sur le calendrier FFE.
//
// Réservé aux coachs (Blandine, 04/11 : « seulement les coachs de l'équipe compétition ») :
//   modératrice, OU créatrice d'un groupe (équipe), OU responsable du club passé en paramètre.
// Le bouton n'apparaît que sur des pages déjà réservées aux coachs ; cette vérification empêche
// seulement qu'on lance des recherches payantes en passant à côté de l'appli.
//
// Entrée (POST JSON) : { date: "AAAA-MM-JJ", lieu?: "Versailles", discipline?: "CSO", departement?: "78", clef?: "<club_clef>" }
// Sortie : { ok: true, concours: [{ date, discipline, lieu, departement, numero, cloture, source }], remarque }
//          ou { ok: false, code, message }
// Variables Netlify : OPENAI_API_KEY, SUPABASE_SERVICE_ROLE_KEY (déjà présentes),
//                     OPENAI_RECHERCHE_MODEL (facultative, défaut gpt-4.1-mini).

const SUPABASE_URL = "https://ldpjebgtskzdokrublfg.supabase.co";
const ORIGINES = ["https://2hype.fr", "https://www.2hype.fr", "https://2hype.netlify.app"];
const TIMEOUT_MS = 45000;
const MAX_PAR_JOUR = 40;   // par compte, garde-fou de coût (remis à zéro au redémarrage du serveur)

function entetes(req) {
    const o = req.headers.get("origin") || "";
    const ok = ORIGINES.indexOf(o) !== -1 || /^https:\/\/[a-z0-9-]+--2hype\.netlify\.app$/.test(o) || /^http:\/\/localhost(:\d+)?$/.test(o);
    const h = { "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Authorization", "Vary": "Origin", "Content-Type": "application/json" };
    if (ok) h["Access-Control-Allow-Origin"] = o;
    return h;
}

const compteurs = new Map();   // uid → { jour, n }
function compter(uid) {
    const jour = new Date().toISOString().slice(0, 10);
    const c = compteurs.get(uid);
    if (!c || c.jour !== jour) { compteurs.set(uid, { jour: jour, n: 1 }); return true; }
    if (c.n >= MAX_PAR_JOUR) return false;
    c.n++; return true;
}

async function compteDuJeton(service, jeton) {
    const r = await fetch(SUPABASE_URL + "/auth/v1/user", { headers: { apikey: service, Authorization: "Bearer " + jeton } });
    if (r.status === 401 || r.status === 403) return { refuse: true };
    if (!r.ok) return { panne: true };
    const u = await r.json().catch(() => null);
    return (u && u.id) ? { id: u.id } : { refuse: true };
}
// fonction SQL appelée AU NOM de la personne (son jeton) : auth.uid() = elle
async function rpcEnTantQue(service, jeton, nom, params) {
    try {
        const r = await fetch(SUPABASE_URL + "/rest/v1/rpc/" + nom, { method: "POST", headers: { apikey: service, Authorization: "Bearer " + jeton, "Content-Type": "application/json" }, body: JSON.stringify(params || {}) });
        if (!r.ok) return false;
        return (await r.json()) === true;
    } catch (e) { return false; }
}
async function estCoach(service, jeton, uid, clef) {
    if (await rpcEnTantQue(service, jeton, "hype_est_moderatrice", {})) return true;
    try {
        const r = await fetch(SUPABASE_URL + "/rest/v1/groupes?select=id&limit=1&cree_par=eq." + encodeURIComponent(uid), { headers: { apikey: service, Authorization: "Bearer " + service } });
        if (r.ok) { const l = await r.json(); if (Array.isArray(l) && l.length) return true; }
    } catch (e) { }
    if (clef && await rpcEnTantQue(service, jeton, "hype_peut_gerer_club", { clef: String(clef) })) return true;
    return false;
}

function texteDeReponse(data) {
    if (data && typeof data.output_text === "string") return data.output_text;
    let t = "";
    ((data && data.output) || []).forEach(function (it) {
        if (it && it.type === "message") (it.content || []).forEach(function (c) { if (c && typeof c.text === "string") t += c.text; });
    });
    return t;
}
function lireJSON(t) {
    t = String(t || "").trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
    const a = t.indexOf("{"), b = t.lastIndexOf("}");
    if (a === -1 || b <= a) return null;
    try { return JSON.parse(t.slice(a, b + 1)); } catch (e) { return null; }
}
function nettoyer(o, date) {
    const liste = (o && Array.isArray(o.concours)) ? o.concours : [];
    const vus = {};
    const propre = liste.map(function (c) {
        const num = String((c && c.numero) || "").replace(/\D/g, "");
        return {
            date: /^\d{4}-\d{2}-\d{2}$/.test(String(c && c.date)) ? c.date : date,
            discipline: String((c && c.discipline) || "").slice(0, 40),
            lieu: String((c && c.lieu) || "").slice(0, 80),
            departement: String((c && c.departement) || "").replace(/[^0-9AB]/gi, "").slice(0, 3),
            numero: /^\d{7,9}$/.test(num) ? num : "",          // jamais de numéro inventé ou mal formé
            cloture: /^\d{4}-\d{2}-\d{2}$/.test(String(c && c.cloture)) ? c.cloture : "",
            source: /^https?:\/\//.test(String(c && c.source)) ? String(c.source).slice(0, 300) : "",
        };
    }).filter(function (c) {
        if (!c.numero || !c.lieu) return false;
        if (vus[c.numero]) return false; vus[c.numero] = 1; return true;
    });
    return { concours: propre.slice(0, 15), remarque: String((o && o.remarque) || "").slice(0, 300) };
}

function consigne(q) {
    return [
        "Tu cherches des concours d'équitation de la Fédération Française d'Équitation (FFE, compétitions SIF).",
        "Date : " + q.date + (q.lieu ? ". Lieu : " + q.lieu : "") + (q.departement ? ". Département : " + q.departement : "") + (q.discipline ? ". Discipline : " + q.discipline : "") + ".",
        q.lieu ? "Trouve le ou les concours qui ont lieu ce jour-là à cet endroit (le nom FFE du lieu peut être tronqué, ex. « CLUB HIPPIQUE DE VERSAILL »)." : "Liste les concours qui ont lieu ce jour-là" + (q.departement ? " dans ce département." : "."),
        "Les calendriers des sites des clubs et comités départementaux en « .ffe.com » (pages « Nos concours » / « Concours du département ») affichent : date, discipline, lieu, numéro, clôture. Cherche-les.",
        "Règles strictes : ne donne un numéro QUE s'il apparaît tel quel dans une source trouvée, avec la même date et le même lieu. N'invente jamais. Si tu ne trouves pas, renvoie une liste vide.",
        "Réponds UNIQUEMENT par un objet JSON, sans texte autour :",
        '{"concours":[{"date":"AAAA-MM-JJ","discipline":"CSO","lieu":"nom du lieu tel qu\'écrit par la FFE","departement":"78","numero":"2723966","cloture":"AAAA-MM-JJ ou vide","source":"adresse de la page"}],"remarque":"une phrase courte en français si utile"}',
    ].join("\n");
}

async function appelOpenAI(cle, modele, outil, q) {
    const ctrl = new AbortController();
    const minu = setTimeout(function () { try { ctrl.abort(); } catch (e) { } }, TIMEOUT_MS);
    try {
        return await fetch("https://api.openai.com/v1/responses", {
            method: "POST", signal: ctrl.signal,
            headers: { "Content-Type": "application/json", Authorization: "Bearer " + cle },
            body: JSON.stringify({ model: modele, tools: [{ type: outil }], tool_choice: "auto", input: consigne(q) }),
        });
    } finally { clearTimeout(minu); }
}

export default async (req) => {
    const H = entetes(req);
    const rep = (o, s) => new Response(JSON.stringify(o), { status: s || 200, headers: H });
    if (req.method === "OPTIONS") return new Response("", { status: 204, headers: H });
    if (req.method !== "POST") return rep({ ok: false, code: "INVALID_REQUEST", message: "Méthode non autorisée." }, 405);

    const cle = process.env.OPENAI_API_KEY, service = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!cle || !service) return rep({ ok: false, code: "CONFIG", message: "Configuration serveur incomplète." }, 500);

    const jeton = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "").trim();
    if (!jeton || jeton.split(".").length !== 3) return rep({ ok: false, code: "AUTH_REQUIRED", message: "Connecte-toi pour chercher un concours." }, 401);
    let compte; try { compte = await compteDuJeton(service, jeton); } catch (e) { compte = { panne: true }; }
    if (compte.panne) return rep({ ok: false, code: "INDISPONIBLE", message: "Service momentanément indisponible." }, 503);
    if (compte.refuse) return rep({ ok: false, code: "AUTH_REQUIRED", message: "Session expirée : reconnecte-toi." }, 401);

    let corps; try { corps = await req.json(); } catch (e) { corps = null; }
    const q = {
        date: String((corps && corps.date) || "").slice(0, 10),
        lieu: String((corps && corps.lieu) || "").trim().slice(0, 80),
        discipline: String((corps && corps.discipline) || "").trim().slice(0, 30),
        departement: String((corps && corps.departement) || "").replace(/[^0-9AB]/gi, "").slice(0, 3),
    };
    if (!/^\d{4}-\d{2}-\d{2}$/.test(q.date)) return rep({ ok: false, code: "DATE", message: "Indique la date du concours." }, 400);

    if (!(await estCoach(service, jeton, compte.id, corps && corps.clef))) return rep({ ok: false, code: "RESERVE", message: "Cette recherche est réservée aux coachs." }, 403);
    if (!compter(compte.id)) return rep({ ok: false, code: "LIMITE", message: "Beaucoup de recherches aujourd'hui : réessaie demain ou cherche sur le calendrier FFE." }, 429);

    const modele = process.env.OPENAI_RECHERCHE_MODEL || "gpt-4.1-mini";
    let r;
    try {
        r = await appelOpenAI(cle, modele, "web_search", q);
        if (r.status === 400) {   // ancien nom de l'outil sur certains modèles
            const d = await r.text().catch(function () { return ""; });
            if (/web_search|tool/i.test(d)) r = await appelOpenAI(cle, modele, "web_search_preview", q);
            else return rep({ ok: false, code: "IA", message: "La recherche a été refusée par le service." }, 502);
        }
    } catch (e) {
        return rep({ ok: false, code: "DELAI", message: "La recherche a pris trop de temps." }, 504);
    }
    if (!r.ok) { console.log("[recherche-concours] OpenAI HTTP", r.status); return rep({ ok: false, code: "IA", message: "Le service de recherche ne répond pas." }, 502); }
    const data = await r.json().catch(function () { return null; });
    const res = nettoyer(lireJSON(texteDeReponse(data)), q.date);
    console.log("[recherche-concours]", q.date, q.lieu || "-", "→", res.concours.length, "résultat(s)");
    return rep({ ok: true, concours: res.concours, remarque: res.remarque });
};
