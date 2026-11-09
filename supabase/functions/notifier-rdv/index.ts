import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import webpush from "npm:web-push@3.6.7"
import { createClient } from "jsr:@supabase/supabase-js@2"

// HYPE ▸ notifier-rdv (appelée toutes les 5 min par la tâche « notifier-rdv-5min »).
// - Rappels 15 min avant le départ et la reconnaissance (inscrits au rendez-vous) — inchangé.
// - 09/11/2026 (Blandine) : PADDOCK — annonce quand la coach publie les groupes de détente,
//   puis rappel 20 min avant l'heure de rendez-vous au paddock (cavaliers des couples du groupe).

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY")
const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT")
const VAPID_PUBLIC_KEY =
  "BP-1TH_5bpRxes4Z2DsVTMa3y8ItFEqsGwizTGy8NLb86OX3X1A-QYuDDaMQXBBIQO0_hD5Va-BMR96rctn4wZM"

if (!SUPABASE_URL) throw new Error("SUPABASE_URL is required")
if (!SERVICE_ROLE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required")
if (!VAPID_PRIVATE_KEY) throw new Error("VAPID_PRIVATE_KEY is required")
if (!VAPID_SUBJECT) throw new Error("VAPID_SUBJECT is required")

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)
webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY)

const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
}

interface AgendaRow {
  id: string | number
  titre: string | null
  lieu: string | null
  date_jour: string
  heure_depart: string | null
  heure_reco: string | null
}

interface SubscriptionRow {
  user_id: string
  endpoint: string
  p256dh: string
  auth: string
}

function parisParts(date = new Date()): Record<string, string> {
  return Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Paris",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  )
}

function parisToday(): string {
  const parts = parisParts()
  return `${parts.year}-${parts.month}-${parts.day}`
}

function parseFreeTime(value: string | null): { hour: number; minute: number } | null {
  if (!value) return null
  const match = value.trim().toLowerCase().match(/^(\d{1,2})\s*h\s*(\d{0,2})$|^(\d{1,2})\s*:\s*(\d{2})$/)
  if (!match) return null

  const hour = Number(match[1] ?? match[3])
  const minute = Number((match[2] ?? match[4] ?? "0") || "0")
  if (!Number.isInteger(hour) || !Number.isInteger(minute) || hour > 23 || minute > 59) {
    return null
  }
  return { hour, minute }
}

function parisDateTime(day: string, hour: number, minute: number): Date {
  const [year, month, date] = day.split("-").map(Number)
  const utcGuess = new Date(Date.UTC(year, month - 1, date, hour, minute))
  const offsetPart = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Paris",
    timeZoneName: "longOffset",
  })
    .formatToParts(utcGuess)
    .find((part) => part.type === "timeZoneName")?.value ?? "GMT"

  const offsetMatch = offsetPart.match(/GMT([+-])(\d{2}):(\d{2})/)
  const offsetMinutes = offsetMatch
    ? (Number(offsetMatch[2]) * 60 + Number(offsetMatch[3])) * (offsetMatch[1] === "+" ? 1 : -1)
    : 0

  return new Date(utcGuess.getTime() - offsetMinutes * 60_000)
}

function formatFrenchTime(hour: number, minute: number): string {
  return `${String(hour).padStart(2, "0")}h${String(minute).padStart(2, "0")}`
}

function isInReminderWindow(target: Date, now: Date): boolean {
  const reminderAt = target.getTime() - 15 * 60_000
  return now.getTime() >= reminderAt && now.getTime() < reminderAt + 5 * 60_000
}

async function deleteSubscription(subscription: SubscriptionRow): Promise<void> {
  const { error } = await supabase
    .from("push_abonnements")
    .delete()
    .eq("endpoint", subscription.endpoint)
    .eq("p256dh", subscription.p256dh)
    .eq("auth", subscription.auth)

  if (error) console.error("Unable to delete expired subscription", error)
}

// 09/11 : envoi commun (mêmes abonnements, même nettoyage des abonnements expirés)
async function envoyer(userIds: string[], payload: Record<string, string>): Promise<number> {
  const ids = [...new Set(userIds.filter(Boolean))]
  if (!ids.length) return 0
  const { data: subscriptions, error } = await supabase
    .from("push_abonnements")
    .select("user_id, endpoint, p256dh, auth")
    .in("user_id", ids)
  if (error) throw error
  let n = 0
  await Promise.allSettled(
    ((subscriptions ?? []) as SubscriptionRow[]).map(async (subscription) => {
      try {
        await webpush.sendNotification({ endpoint: subscription.endpoint, keys: subscription }, JSON.stringify(payload))
        n++
      } catch (error) {
        const statusCode = Number((error as { statusCode?: number }).statusCode)
        if (statusCode === 404 || statusCode === 410) await deleteSubscription(subscription)
        else console.error("Web Push delivery failed", { endpoint: subscription.endpoint, error })
      }
    }),
  )
  return n
}

// 09/11 : groupes de détente du paddock — annonce à la publication, rappel 20 min avant le rendez-vous
async function paddock(jour: string, now: Date): Promise<number> {
  let n = 0
  const { data: groupes, error } = await supabase
    .from("concours_groupes_detente")
    .select("id, agenda_id, epreuve, nom, heure_rdv, couples, publie, annonce_envoyee, rappel_envoye, club_agenda(titre, date_jour)")
    .eq("publie", true)
    .or("annonce_envoyee.eq.false,rappel_envoye.eq.false")
  if (error) throw error
  for (const g of (groupes ?? []) as any[]) {
    const ev = g.club_agenda || {}
    const membres = (Array.isArray(g.couples) ? g.couples : []).map((c: any) => c && c.cavalier_id).filter(Boolean)
    const heure = parseFreeTime(g.heure_rdv)
    const libHeure = heure ? formatFrenchTime(heure.hour, heure.minute) : ""
    const dateEv = String(ev.date_jour || "")
    // annonce : une seule fois après chaque publication, seulement si le concours n'est pas passé
    if (!g.annonce_envoyee) {
      if (dateEv >= jour) {
        n += await envoyer(membres, {
          titre: ev.titre ? `${ev.titre} · paddock` : "Paddock",
          corps: `${g.nom || "Ton groupe"} · ${g.epreuve || ""}${libHeure ? ` · rendez-vous au paddock à ${libHeure}` : ""}`,
          url: `/#r=${g.agenda_id}`,
          tag: `paddock-${g.id}`,
        })
      }
      await supabase.from("concours_groupes_detente").update({ annonce_envoyee: true }).eq("id", g.id)
    }
    // rappel : 20 min avant, le jour du concours (fenêtre de rattrapage jusqu'à l'heure du rendez-vous)
    if (!g.rappel_envoye && heure && dateEv === jour) {
      const cible = parisDateTime(jour, heure.hour, heure.minute)
      const t = now.getTime(), debut = cible.getTime() - 20 * 60_000
      if (t >= debut && t < cible.getTime()) {
        n += await envoyer(membres, {
          titre: ev.titre ? `${ev.titre} · paddock` : "Paddock",
          corps: `Rendez-vous au paddock à ${libHeure} · ${g.nom || "ton groupe"} · ${g.epreuve || ""}`,
          url: `/#r=${g.agenda_id}`,
          tag: `paddock-rappel-${g.id}`,
        })
        await supabase.from("concours_groupes_detente").update({ rappel_envoye: true }).eq("id", g.id)
      }
    }
  }
  return n
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "POST required" }), {
      status: 405,
      headers: jsonHeaders,
    })
  }

  try {
    let body: { test?: boolean } = {}
    try {
      body = await req.json()
    } catch {
      // An empty request body is equivalent to a normal scheduled run.
    }

    // 18/10/2026 : le mode test (envoi immediat de tous les rappels du jour) n est plus ouvert a tous.
    // Il exige la cle service (secrete). Les passages planifies (corps vide, sans cle) ne changent pas.
    const test = body?.test === true && req.headers.get("authorization") === `Bearer ${SERVICE_ROLE_KEY}`
    const jour = parisToday()
    const now = new Date()

    const { data: agenda, error: agendaError } = await supabase
      .from("club_agenda")
      .select("id, titre, lieu, date_jour, heure_depart, heure_reco")
      .eq("date_jour", jour)

    if (agendaError) throw agendaError

    let successfulSends = 0

    for (const rdv of (agenda ?? []) as AgendaRow[]) {
      const reminders = [
        { field: "heure_reco", label: "Reconnaissance" },
        { field: "heure_depart", label: "Départ" },
      ] as const

      for (const reminder of reminders) {
        const rawTime = rdv[reminder.field]
        const parsedTime = parseFreeTime(rawTime)
        if (!parsedTime) {
          if (rawTime) console.warn("Unsupported appointment time", { id: rdv.id, value: rawTime })
          continue
        }

        const target = parisDateTime(jour, parsedTime.hour, parsedTime.minute)
        if (!test && !isInReminderWindow(target, now)) continue

        // agenda_id is the foreign-key column from agenda_inscriptions to club_agenda.
        const { data: inscriptions, error: inscriptionsError } = await supabase
          .from("agenda_inscriptions")
          .select("user_id")
          .eq("agenda_id", rdv.id)

        if (inscriptionsError) throw inscriptionsError

        const userIds = [...new Set((inscriptions ?? []).map((row) => row.user_id).filter(Boolean))]
        if (userIds.length === 0) continue

        const { data: subscriptions, error: subscriptionsError } = await supabase
          .from("push_abonnements")
          .select("user_id, endpoint, p256dh, auth")
          .in("user_id", userIds)

        if (subscriptionsError) throw subscriptionsError

        const payload = {
          titre: rdv.titre ?? "Rendez-vous",
          corps: `${reminder.label} à ${formatFrenchTime(parsedTime.hour, parsedTime.minute)} · ${rdv.lieu ?? ""}`.trim(),
          url: `/#r=${rdv.id}`,
          tag: `rdv-${rdv.id}-${reminder.field}`,
        }

        const results = await Promise.allSettled(
          ((subscriptions ?? []) as SubscriptionRow[]).map(async (subscription) => {
            try {
              await webpush.sendNotification({endpoint:subscription.endpoint,keys:subscription}, JSON.stringify(payload))
              successfulSends++
            } catch (error) {
              const statusCode = Number((error as { statusCode?: number }).statusCode)
              if (statusCode === 404 || statusCode === 410) {
                await deleteSubscription(subscription)
              } else {
                console.error("Web Push delivery failed", { endpoint: subscription.endpoint, error })
              }
            }
          }),
        )

        const rejected = results.filter((result) => result.status === "rejected")
        if (rejected.length > 0) console.error("Unexpected notification errors", rejected)
      }
    }

    // 09/11 : paddock (une erreur ici ne doit pas empêcher les rappels de départ ci-dessus)
    let envoisPaddock = 0
    try { envoisPaddock = await paddock(jour, now) } catch (e) { console.error("paddock failed", e) }

    return new Response(JSON.stringify({ ok: true, jour, envois: successfulSends, paddock: envoisPaddock }), {
      status: 200,
      headers: jsonHeaders,
    })
  } catch (error) {
    console.error("notifier-rdv failed", error)
    return new Response(JSON.stringify({ ok: false, error: "Erreur interne" }), {
      status: 500,
      headers: jsonHeaders,
    })
  }
})
