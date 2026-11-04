// @ts-nocheck
// HYPE ▸ 04/11/2026 22h — fonction serveur « notifier-passage » (Centre de compétition, Jour J).
// Quand la coach enregistre des heures de passage modifiées, chaque cavalière concernée reçoit une notification
// sur son téléphone (si elle a activé les alertes) : « Ton heure de passage : 11h52 · Club 2 ».
// Même envoi que notifier-rdv (web-push, table push_abonnements, mêmes clés VAPID). Seule la coach du club peut l'appeler.
import webpush from "npm:web-push@3.6.7"
import { createClient } from "jsr:@supabase/supabase-js@2"

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
const ANON = Deno.env.get("SUPABASE_ANON_KEY")!
const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY")!
const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT")!
const VAPID_PUBLIC_KEY = "BP-1TH_5bpRxes4Z2DsVTMa3y8ItFEqsGwizTGy8NLb86OX3X1A-QYuDDaMQXBBIQO0_hD5Va-BMR96rctn4wZM"
webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY)
const admin = createClient(SUPABASE_URL, SERVICE)
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS" }
function rep(o, status = 200) { return new Response(JSON.stringify(o), { status, headers: { ...CORS, "Content-Type": "application/json; charset=utf-8" } }) }

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS })
  if (req.method !== "POST") return rep({ erreur: "POST" }, 405)
  let corps = {}; try { corps = await req.json() } catch { }
  const idEv = String(corps.agenda_id || ""), ids = Array.isArray(corps.engagements) ? corps.engagements.map(String).slice(0, 60) : []
  if (!/^[0-9a-f-]{36}$/i.test(idEv) || !ids.length) return rep({ erreur: "paramètres" }, 400)
  const moi = createClient(SUPABASE_URL, ANON, { global: { headers: { Authorization: req.headers.get("Authorization") || "" } } })
  const { data: u } = await moi.auth.getUser()
  if (!u || !u.user) return rep({ erreur: "connexion" }, 401)
  const { data: ev } = await admin.from("club_agenda").select("id, titre, club_clef").eq("id", idEv).maybeSingle()
  if (!ev) return rep({ erreur: "concours introuvable" }, 404)
  let coach = false
  try { const r1 = await moi.rpc("hype_est_moderatrice"); coach = r1.data === true; if (!coach) { const r2 = await moi.rpc("hype_peut_gerer_club", { clef: ev.club_clef }); coach = r2.data === true } } catch { }
  if (!coach) return rep({ erreur: "réservé à la coach" }, 403)
  const { data: engs } = await admin.from("concours_engagements").select("id, cavalier_id, epreuve1, passage1, piste1, epreuve2, passage2, piste2").eq("agenda_id", idEv).in("id", ids)
  let envois = 0, sans = 0
  for (const e of engs || []) {
    if (!e.cavalier_id) continue
    const parts = []
    if (e.passage1) parts.push(`${e.passage1}${e.epreuve1 ? " · " + e.epreuve1 : ""}${e.piste1 ? " · piste " + e.piste1 : ""}`)
    if (e.passage2) parts.push(`${e.passage2}${e.epreuve2 ? " · " + e.epreuve2 : ""}${e.piste2 ? " · piste " + e.piste2 : ""}`)
    if (!parts.length) continue
    const { data: abos } = await admin.from("push_abonnements").select("endpoint, p256dh, auth").eq("user_id", e.cavalier_id)
    if (!abos || !abos.length) { sans++; continue }
    const payload = JSON.stringify({ titre: ev.titre || "Concours", corps: (parts.length > 1 ? "Tes heures de passage : " : "Ton heure de passage : ") + parts.join(" / "), url: "/#saison", tag: `passage-${idEv}-${e.id}` })
    for (const a of abos) {
      try { await webpush.sendNotification({ endpoint: a.endpoint, keys: { p256dh: a.p256dh, auth: a.auth } }, payload); envois++ }
      catch (err) { const s = Number(err && err.statusCode); if (s === 404 || s === 410) await admin.from("push_abonnements").delete().eq("endpoint", a.endpoint) }
    }
  }
  return rep({ ok: true, envois, sans_alertes: sans })
})
