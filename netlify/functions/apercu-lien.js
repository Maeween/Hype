// netlify/functions/apercu-lien.js — Aperçu d'un lien externe (titre, image, résumé, site)
//
// 05/11/2026 — Espace « Médias » de la Team, onglet Théorie (« + Partager ») : quand une cavalière colle l'adresse
// d'un article externe, on affiche une carte d'aperçu. Le téléphone ne peut pas lire une autre page web lui-même
// (le navigateur l'interdit) : ce petit service lit la page à sa place et renvoie seulement quelques champs.
// Si le site refuse ou ne donne rien, l'appli affiche une carte de secours avec juste le nom du site.
//
// Garde-fous :
//   - réservé aux comptes Hype connectés (jeton vérifié auprès de Supabase) ;
//   - http/https seulement, ports 80/443, jamais d'adresse interne (localhost, IP privées, .local, .internal) ;
//   - 6 s au plus, 600 Ko lus au plus, 3 redirections au plus (chacune revérifiée) ;
//   - 60 aperçus par compte et par jour.
// Entrée (POST JSON) : { url: "https://…" }
// Sortie : { ok: true, url, titre, image, resume, site } ou { ok: false, code, message }
// Variable Netlify : SUPABASE_SERVICE_ROLE_KEY (déjà présente).

const SUPABASE_URL = "https://ldpjebgtskzdokrublfg.supabase.co";
const ORIGINES = ["https://2hype.fr", "https://www.2hype.fr", "https://2hype.netlify.app"];
const TIMEOUT_MS = 6000;
const MAX_OCTETS = 600 * 1024;
const MAX_PAR_JOUR = 60;

function entetes(req) {
    const o = req.headers.get("origin") || "";
    const ok = ORIGINES.indexOf(o) !== -1 || /^https:\/\/[a-z0-9-]+--2hype\.netlify\.app$/.test(o) || /^http:\/\/localhost(:\d+)?$/.test(o);
    const h = { "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Authorization", "Vary": "Origin", "Content-Type": "application/json; charset=utf-8" };
    if (ok) h["Access-Control-Allow-Origin"] = o;
    return h;
}
function reponse(req, statut, corps) { return new Response(JSON.stringify(corps), { status: statut, headers: entetes(req) }); }

const compteurs = new Map();
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

/* adresse publique seulement */
function adresseAutorisee(brut) {
    let u;
    try { u = new URL(String(brut || "").trim()); } catch (e) { return null; }
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    if (u.username || u.password) return null;
    if (u.port && u.port !== "80" && u.port !== "443") return null;
    const hote = u.hostname.toLowerCase().replace(/^\[|\]$/g, "");
    if (!hote || hote.indexOf(".") === -1) return null;
    if (hote === "localhost" || /\.(local|internal|localhost|lan|home|corp)$/.test(hote)) return null;
    if (/^\d+\.\d+\.\d+\.\d+$/.test(hote)) {
        const p = hote.split(".").map(Number);
        if (p[0] === 10 || p[0] === 127 || p[0] === 0 || (p[0] === 169 && p[1] === 254) || (p[0] === 172 && p[1] >= 16 && p[1] <= 31) || (p[0] === 192 && p[1] === 168) || (p[0] === 100 && p[1] >= 64 && p[1] <= 127) || p[0] >= 224) return null;
    }
    if (hote.indexOf(":") !== -1) return null;   /* pas d'adresse IPv6 brute */
    return u;
}

function decoder(t) {
    return String(t || "").replace(/&#(\d+);/g, (m, n) => String.fromCharCode(Number(n))).replace(/&#x([0-9a-f]+);/gi, (m, n) => String.fromCharCode(parseInt(n, 16)))
        .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}
function meta(html, noms) {
    for (const n of noms) {
        const re1 = new RegExp('<meta[^>]+(?:property|name)\\s*=\\s*["\']' + n + '["\'][^>]*content\\s*=\\s*["\']([^"\']*)["\']', "i");
        const re2 = new RegExp('<meta[^>]+content\\s*=\\s*["\']([^"\']*)["\'][^>]*(?:property|name)\\s*=\\s*["\']' + n + '["\']', "i");
        const m = html.match(re1) || html.match(re2);
        if (m && m[1]) return decoder(m[1]);
    }
    return "";
}

async function lirePage(depart) {
    let u = depart;
    for (let saut = 0; saut < 4; saut++) {
        const ctrl = new AbortController();
        const minuteur = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
        let r;
        try {
            r = await fetch(u.toString(), { redirect: "manual", signal: ctrl.signal, headers: { "User-Agent": "HypeApercu/1.0 (+https://2hype.fr)", "Accept": "text/html,application/xhtml+xml", "Accept-Language": "fr,en;q=0.8" } });
        } finally { clearTimeout(minuteur); }
        if (r.status >= 300 && r.status < 400 && r.headers.get("location")) {
            const suivant = adresseAutorisee(new URL(r.headers.get("location"), u).toString());
            if (!suivant) return { refus: true };
            u = suivant; continue;
        }
        if (!r.ok) return { refus: true, statut: r.status };
        const type = (r.headers.get("content-type") || "").toLowerCase();
        if (type && type.indexOf("html") === -1) return { url: u, html: "" };
        const lecteur = r.body && r.body.getReader ? r.body.getReader() : null;
        if (!lecteur) return { url: u, html: (await r.text()).slice(0, MAX_OCTETS) };
        const morceaux = []; let total = 0;
        while (total < MAX_OCTETS) {
            const { done, value } = await lecteur.read();
            if (done) break;
            morceaux.push(value); total += value.length;
            /* l'en-tête suffit : on s'arrête dès la fin de <head> */
            if (Buffer.concat(morceaux).toString("utf8").search(/<\/head>/i) !== -1) break;
        }
        try { lecteur.cancel(); } catch (e) { }
        return { url: u, html: Buffer.concat(morceaux).toString("utf8") };
    }
    return { refus: true };
}

export default async (req) => {
    if (req.method === "OPTIONS") return new Response("", { status: 204, headers: entetes(req) });
    if (req.method !== "POST") return reponse(req, 405, { ok: false, code: "methode", message: "POST uniquement." });
    const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!service) return reponse(req, 500, { ok: false, code: "config", message: "Service indisponible." });
    const jeton = String(req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
    if (!jeton) return reponse(req, 401, { ok: false, code: "connexion", message: "Connecte-toi pour voir l'aperçu." });
    const compte = await compteDuJeton(service, jeton).catch(() => ({ panne: true }));
    if (compte.refuse) return reponse(req, 401, { ok: false, code: "connexion", message: "Connecte-toi pour voir l'aperçu." });
    if (compte.panne) return reponse(req, 503, { ok: false, code: "panne", message: "Aperçu indisponible pour le moment." });
    if (!compter(compte.id)) return reponse(req, 429, { ok: false, code: "limite", message: "Trop d'aperçus aujourd'hui." });

    const corps = await req.json().catch(() => null);
    const depart = adresseAutorisee(corps && corps.url);
    if (!depart) return reponse(req, 400, { ok: false, code: "adresse", message: "Adresse non valable." });
    const site = depart.hostname.replace(/^www\./, "");
    let page;
    try { page = await lirePage(depart); } catch (e) { page = { refus: true }; }
    if (!page || page.refus || !page.html) return reponse(req, 200, { ok: true, url: depart.toString(), titre: "", image: "", resume: "", site: site, secours: true });

    const html = page.html;
    let titre = meta(html, ["og:title", "twitter:title"]);
    if (!titre) { const m = html.match(/<title[^>]*>([^<]{1,300})<\/title>/i); titre = m ? decoder(m[1]) : ""; }
    const resume = meta(html, ["og:description", "twitter:description", "description"]).slice(0, 300);
    let image = meta(html, ["og:image:secure_url", "og:image", "twitter:image", "twitter:image:src"]);
    try { if (image) { const ui = new URL(image, page.url); image = (ui.protocol === "https:" || ui.protocol === "http:") ? ui.toString() : ""; } } catch (e) { image = ""; }
    const nomSite = meta(html, ["og:site_name"]) || site;
    return reponse(req, 200, { ok: true, url: page.url.toString(), titre: titre.slice(0, 200), image: image, resume: resume, site: nomSite.slice(0, 80), secours: !titre });
};
