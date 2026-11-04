// @ts-nocheck
// HYPE ▸ 04/11/2026 — fonction serveur « direct-concours » (Centre de compétition, le direct trouvé par Hype).
// Demande de Blandine (04/11 21h47-21h48 : « 5 », puis « 2 ») : Hype trouve elle-même le direct du concours,
// la coach confirme « c'est bien lui », puis Hype lit les listes de départ et les résultats de ses cavalières.
// Source : les sites Winjump des chronométreurs (pages publiques). Lecture seule, à la demande, avec une mise en
// mémoire de 3 minutes pour ne pas charger leurs sites. Rien n'est publié : les résultats ne servent qu'à l'équipe.
//   action « chercher » {agenda_id} : concours Winjump à la même date, classés par ressemblance avec le lieu/titre.
//   action « lire » {agenda_id, forcer?} : pour le lien confirmé (club_agenda.lien_direct), les passages et
//     résultats des cavalières engagées (concours_engagements). La coach voit toute l'équipe ; une cavalière, elle seule.
import { createClient } from "jsr:@supabase/supabase-js@2"

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
const ANON = Deno.env.get("SUPABASE_ANON_KEY")!
const admin = createClient(SUPABASE_URL, SERVICE)
const SITES = ["results", "boulerie", "equitmetrage", "crege", "jumptimer", "hdl", "jumplive", "wst", "jardy", "timehorse", "horseresults", "cjt", "aperequitation"]
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS" }
function rep(o: unknown, status = 200) { return new Response(JSON.stringify(o), { status, headers: { ...CORS, "Content-Type": "application/json; charset=utf-8" } }) }
async function page(url: string, ms = 9000): Promise<string> {
  const c = new AbortController(); const t = setTimeout(() => c.abort(), ms)
  try { const r = await fetch(url, { signal: c.signal, headers: { "User-Agent": "Hype (2hype.fr) - suivi d'equipe" } }); if (!r.ok) return ""; return await r.text() } catch { return "" } finally { clearTimeout(t) }
}
async function parLots<T, R>(liste: T[], n: number, f: (x: T) => Promise<R>): Promise<R[]> {
  const out: R[] = []; for (let i = 0; i < liste.length; i += n) out.push(...await Promise.all(liste.slice(i, i + n).map(f))); return out
}
// ── lecture des pages Winjump (partagé avec la fonction serveur direct-concours) ──
function nettoie(s) {
  return String(s || "").replace(/<[^>]+>/g, " ").replace(/&#0?39;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}
function norm(s) {
  return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function isoFr(d) { const m = String(d || "").match(/(\d{2})\/(\d{2})\/(\d{4})/); return m ? m[3] + "-" + m[2] + "-" + m[1] : ""; }
// liste des concours d'un site : [{id, slug, nom, debut, fin}]
function lireListe(html) {
  const out = [];
  const lignes = String(html).split(/<tr[\s>]/i);
  for (const l of lignes) {
    const a = l.match(/href="\/concours\/(\d+)\/([^"]+)"[^>]*>([^<]+)<\/a>/i);
    if (!a) continue;
    const dates = l.match(/\d{2}\/\d{2}\/\d{4}/g) || [];
    const debut = isoFr(dates[0]), fin = isoFr(dates[dates.length - 1] || dates[0]);
    out.push({ id: a[1], slug: a[2], nom: nettoie(a[3]), debut, fin: fin || debut });
  }
  return out;
}
const MOIS = { janvier: "01", fevrier: "02", mars: "03", avril: "04", mai: "05", juin: "06", juillet: "07", aout: "08", septembre: "09", octobre: "10", novembre: "11", decembre: "12" };
// page d'un concours : [{ep, num, titre, heure, jour}]
function lireConcours(html) {
  const out = [];
  let jour = "";
  const morceaux = String(html).split(/<tr[\s>]/i);
  for (const m of morceaux) {
    const th = m.match(/<th[^>]*>([^<]*\d{4})<\/th>/i);
    if (th) { const t = norm(th[1]).split(" "); const j = t.find((x) => /^\d{1,2}$/.test(x)); const mo = t.find((x) => MOIS[x]); const an = t.find((x) => /^\d{4}$/.test(x)); if (j && mo && an) jour = an + "-" + MOIS[mo] + "-" + String(j).padStart(2, "0"); }
    const lien = m.match(/\/concours\/\d+\/[^/"]+\/(\d+)\/(?:startlist|results)/i);
    if (!lien) continue;
    const heure = (m.match(/class="hours"[^>]*>\s*([0-9]{1,2}:[0-9]{2})/i) || [])[1] || "";
    const num = nettoie((m.match(/class="id-value"[^>]*>([^<]*)</i) || [])[1] || "");
    const titre = nettoie((m.match(/class="title"[^>]*>([^<]*)</i) || [])[1] || "");
    out.push({ ep: lien[1], num, titre, heure, jour });
  }
  return out;
}
function cellules(ligne) { return (String(ligne).match(/<td[^>]*>[\s\S]*?<\/td>/gi) || []).map(nettoie); }
// liste de départ : {date, heure, engages, lignes:[{ordre, num, cheval, cavalier}]}
function lireDepart(html) {
  const h = String(html);
  const t = (h.match(/<h6>\s*(\d{2}\/\d{2}\/\d{4})\s*-\s*([0-9]{1,2}:[0-9]{2})/) || []);
  const engages = Number((h.match(/Nb Engages\s*:\s*(\d+)/i) || [])[1] || 0);
  const corps = (h.match(/<tbody>([\s\S]*?)<\/tbody>/i) || [])[1] || "";
  const lignes = [];
  for (const l of corps.split(/<tr[\s>]/i)) {
    const c = cellules(l); if (c.length < 4) continue;
    lignes.push({ ordre: Number(String(c[0]).replace(/\D/g, "")) || 0, num: c[1], cheval: c[2], cavalier: c[3] });
  }
  return { date: isoFr(t[1]), heure: t[2] || "", engages, lignes };
}
// résultats : [{clt, num, cheval, cavalier, points, temps}]
function lireResultats(html) {
  const corps = (String(html).match(/<tbody>([\s\S]*?)<\/tbody>/i) || [])[1] || "";
  const out = [];
  for (const l of corps.split(/<tr[\s>]/i)) {
    const c = cellules(l); if (c.length < 4) continue;
    out.push({ clt: String(c[0]).replace(/\.$/, ""), num: c[1], cheval: c[2], cavalier: c[3], points: c[4] || "", temps: c[5] || "" });
  }
  return out;
}
// la cavalière de Hype (« SOJFER Lauren ») est-elle ce cavalier Winjump (« Lauren SOJFER ») ?
function memePersonne(nomHype, nomWj) {
  const a = norm(nomHype).split(" ").filter((x) => x.length > 1), b = norm(nomWj).split(" ").filter((x) => x.length > 1);
  if (!a.length || !b.length) return false;
  const court = a.length <= b.length ? a : b, long = a.length <= b.length ? b : a;
  return court.length >= 2 ? court.every((x) => long.includes(x)) : (court[0].length >= 4 && long.includes(court[0]));
}
function scoreNom(cible, nom) {
  const a = norm(cible).split(" ").filter((x) => x.length > 2 && !["cso", "club", "concours", "the", "les", "des", "sur"].includes(x));
  const b = norm(nom).split(" ");
  let s = 0; for (const x of a) if (b.includes(x)) s += 1;
  return s;
}
function hEnMin(h) { const m = String(h || "").match(/(\d{1,2})[:h](\d{2})/); return m ? Number(m[1]) * 60 + Number(m[2]) : -1; }
function minEnH(m) { if (!(m >= 0)) return ""; const hh = Math.floor(m / 60) % 24, mm = m % 60; return hh + "h" + (mm < 10 ? "0" : "") + mm; }

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS })
  if (req.method !== "POST") return rep({ erreur: "POST" }, 405)
  let corps: any = {}; try { corps = await req.json() } catch { }
  const action = String(corps.action || ""), idEv = String(corps.agenda_id || "")
  if (!/^[0-9a-f-]{36}$/i.test(idEv)) return rep({ erreur: "concours manquant" }, 400)
  const { data: ev } = await admin.from("club_agenda").select("id, club_clef, titre, lieu, date_jour, date_fin, lien_direct").eq("id", idEv).maybeSingle()
  if (!ev) return rep({ erreur: "concours introuvable" }, 404)

  if (action === "chercher") {
    const an = String(ev.date_jour).slice(0, 4), deb = String(ev.date_jour).slice(0, 10), fin = String(ev.date_fin || ev.date_jour).slice(0, 10)
    const pages = await parLots(SITES, 7, async (s) => ({ s, html: await page(`https://${s}.winjump.fr/${an}`) }))
    const cible = `${ev.lieu || ""} ${ev.titre || ""}`
    const vus = new Set<string>(), cands: any[] = []
    for (const p of pages) for (const c of lireListe(p.html)) {
      if (!(c.debut <= fin && (c.fin || c.debut) >= deb)) continue
      const url = `https://${p.s}.winjump.fr/concours/${c.id}/${c.slug}`
      if (vus.has(c.id + c.nom)) continue; vus.add(c.id + c.nom)
      cands.push({ url, nom: c.nom, debut: c.debut, fin: c.fin, site: p.s, score: scoreNom(cible, c.nom) })
    }
    cands.sort((a, b) => b.score - a.score)
    return rep({ candidats: cands.slice(0, 12), sites_lus: pages.filter((p) => p.html).length })
  }

  if (action === "lire") {
    // qui demande ? la coach du club voit toute l'équipe, une cavalière engagée ne voit qu'elle
    const auth = req.headers.get("Authorization") || ""
    const moi = createClient(SUPABASE_URL, ANON, { global: { headers: { Authorization: auth } } })
    const { data: u } = await moi.auth.getUser()
    if (!u || !u.user) return rep({ erreur: "connexion" }, 401)
    let coach = false
    try { const r1 = await moi.rpc("hype_est_moderatrice"); coach = r1.data === true; if (!coach) { const r2 = await moi.rpc("hype_peut_gerer_club", { clef: ev.club_clef }); coach = r2.data === true } } catch { }
    const m = String(ev.lien_direct || "").match(/^https:\/\/([a-z0-9-]+)\.winjump\.fr\/concours\/(\d+)\/([^/?#\s]+)/i)
    if (!m) return rep({ erreur: "pas de lien Winjump", lien: ev.lien_direct || null })
    const { data: engs } = await admin.from("concours_engagements").select("id, cavalier_id, nom, cheval1_nom, cheval2_nom, epreuve1, epreuve2").eq("agenda_id", idEv)
    const equipe = (engs || []).filter((e: any) => coach || e.cavalier_id === u.user.id)
    if (!equipe.length) return rep({ lignes: [], coach })
    // mémoire de 3 minutes, sauf demande « forcer » de la coach
    const { data: cache } = await admin.from("concours_direct").select("donnees, maj_le, lien").eq("agenda_id", idEv).maybeSingle()
    let donnees: any = null
    if (cache && cache.lien === ev.lien_direct && Date.now() - new Date(cache.maj_le).getTime() < 3 * 60 * 1000 && !(coach && corps.forcer)) donnees = cache.donnees
    if (!donnees) {
      const base = `https://${m[1]}.winjump.fr/concours/${m[2]}/${m[3]}`
      const eps = lireConcours(await page(base))
      if (!eps.length) return rep({ erreur: "page du concours illisible", lien: ev.lien_direct })
      const lignes: any[] = []
      const tous = (engs || [])
      await parLots(eps, 6, async (e: any) => {
        const dep = lireDepart(await page(`${base}/${e.ep}/startlist`))
        const trouves = dep.lignes.map((l: any) => ({ l, e: tous.find((g: any) => memePersonne(g.nom, l.cavalier) && (norm(g.nom).split(" ").length >= 2 || [g.cheval1_nom, g.cheval2_nom].some((ch: string) => ch && norm(ch) === norm(l.cheval)))) })).filter((x: any) => x.e)
        if (!trouves.length) return
        const res = lireResultats(await page(`${base}/${e.ep}/results`))
        const debut = hEnMin(dep.heure || e.heure)
        for (const t of trouves) {
          const r = res.find((x: any) => x.num === t.l.num && norm(x.cheval) === norm(t.l.cheval)) || res.find((x: any) => memePersonne(t.e.nom, x.cavalier) && norm(x.cheval) === norm(t.l.cheval))
          lignes.push({ engagement: t.e.id, nom: t.e.nom, epreuve: e.titre, num_epreuve: e.num, jour: dep.date || e.jour, debut_epreuve: minEnH(debut), ordre: t.l.ordre, engages: dep.engages || dep.lignes.length,
            heure_estimee: debut >= 0 ? minEnH(debut + Math.round((t.l.ordre - 1) * 1.75)) : "", cheval: t.l.cheval, cavalier_wj: t.l.cavalier,
            clt: r ? r.clt : "", points: r ? r.points : "", temps: r ? r.temps : "", url_depart: `${base}/${e.ep}/startlist`, url_resultats: `${base}/${e.ep}/results` })
        }
      })
      lignes.sort((a, b) => (a.jour + String(hEnMin(a.heure_estimee)).padStart(5, "0")).localeCompare(b.jour + String(hEnMin(b.heure_estimee)).padStart(5, "0")))
      donnees = { lignes, lu_le: new Date().toISOString() }
      await admin.from("concours_direct").upsert({ agenda_id: idEv, lien: ev.lien_direct, donnees, maj_le: new Date().toISOString() }, { onConflict: "agenda_id" })
    }
    const ids = new Set(equipe.map((e: any) => e.id))
    return rep({ coach, lu_le: donnees.lu_le, lignes: (donnees.lignes || []).filter((l: any) => ids.has(l.engagement)) })
  }
  return rep({ erreur: "action inconnue" }, 400)
})
