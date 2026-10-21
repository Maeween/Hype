// supabase/functions/notifier-notif/index.ts — Hype · notification sur le téléphone (20/10/2026)
//
// Blandine : « On pourrait ajouter notif sur tel ? ». Quand une notification PERSONNELLE est créée dans la table
// notifications (mention @, identification, commentaire sur ses albums / vidéos / chevaux / sa page), elle est envoyée
// sur les téléphones de la personne qui ont activé les notifications (table push_abonnements, la même que les rappels
// de rendez-vous, fonction notifier-rdv). Pas les j'aime ni les publications de la communauté (choix de Blandine).
//
// QUI L'APPELLE : une règle en base (trigger AFTER INSERT sur notifications, sql/2026-10-20-notif-telephone.sql) avec
// l'identifiant de la ligne. « Verify JWT » ÉTEINT (la base l'appelle sans jeton, comme notifier-rdv).
// SÉCURITÉ : la fonction ne reçoit qu'un identifiant et n'envoie QUE le contenu réel de cette notification, si elle a
// été créée il y a moins de 3 minutes, si son type fait partie de la liste et si elle n'a pas déjà été envoyée
// (colonne pousse_le). Un appel venu d'ailleurs ne peut donc rien inventer ni renvoyer en boucle.
// SECRETS : mêmes noms que notifier-rdv (VAPID_PRIVATE_KEY, VAPID_SUBJECT). Rien dans le dépôt (public).

import webpush from "npm:web-push@3.6.7"

const URL_SB = Deno.env.get("SUPABASE_URL") || ""
const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
const PRIVEE = Deno.env.get("VAPID_PRIVATE_KEY") || ""
const SUJET = Deno.env.get("VAPID_SUBJECT") || "mailto:feinn@live.fr"
const PUBLIQUE = "BP-1TH_5bpRxes4Z2DsVTMa3y8ItFEqsGwizTGy8NLb86OX3X1A-QYuDDaMQXBBIQO0_hD5Va-BMR96rctn4wZM"
if (PRIVEE) webpush.setVapidDetails(SUJET, PUBLIQUE, PRIVEE)

const TYPES = ["identification", "identification_post", "identification_reponse", "identification_photos", "commentaire", "photo", "video"]

function json(c: unknown, s = 200) { return new Response(JSON.stringify(c), { status: s, headers: { "content-type": "application/json; charset=utf-8" } }) }
const ent = (x: Record<string, string> = {}) => ({ apikey: SERVICE, Authorization: "Bearer " + SERVICE, "Content-Type": "application/json", ...x })
async function rest(chemin: string, init: RequestInit = {}) {
  const r = await fetch(URL_SB + "/rest/v1/" + chemin, init)
  const t = await r.text()
  if (!r.ok) throw new Error("base " + r.status + " " + t.slice(0, 200))
  return t ? JSON.parse(t) : null
}

type L = "fr" | "en" | "es" | "it" | "ja" | "de" | "ar" | "zh" | "nl" | "pt" | "sv"
const T7 = (lg: L, o: Partial<Record<L, string>> & { fr: string }) => o[lg] || o.en || o.fr

function phrase(type: string, lg: L, nom: string, sur: string): string {
  const n = nom || T7(lg, { fr: "Quelqu'un", en: "Someone", es: "Alguien", it: "Qualcuno", ja: "誰か", de: "Jemand", ar: "شخص ما", zh: "有人", nl: "Iemand", pt: "Alguém", sv: "Någon" })
  if (type.indexOf("identification") === 0) {
    if (type === "identification_photos") return T7(lg, { fr: n + " t'a identifié(e) sur des photos", en: n + " tagged you in photos", es: n + " te etiquetó en fotos", it: n + " ti ha taggato in alcune foto", ja: n + "が写真であなたをタグ付けしました", de: n + " hat dich auf Fotos markiert", ar: n + " أشار إليك في صور", zh: n + "在照片中标记了你", nl: n + " heeft je getagd op foto's", pt: n + " marcou você em fotos", sv: n + " har taggat dig i foton" })
    return T7(lg, { fr: n + " t'a mentionné(e)", en: n + " mentioned you", es: n + " te mencionó", it: n + " ti ha menzionato", ja: n + "があなたをメンションしました", de: n + " hat dich erwähnt", ar: n + " أشار إليك", zh: n + "提到了你", nl: n + " heeft je genoemd", pt: n + " mencionou você", sv: n + " har nämnt dig" })
  }
  if (type === "photo") return T7(lg, { fr: n + " a ajouté une photo" + sur, en: n + " added a photo" + sur, es: n + " añadió una foto" + sur, it: n + " ha aggiunto una foto" + sur, ja: n + "が写真を追加しました" + sur, de: n + " hat ein Foto hinzugefügt" + sur, ar: n + " أضاف صورة" + sur, zh: n + "添加了一张照片" + sur, nl: n + " heeft een foto toegevoegd" + sur, pt: n + " adicionou uma foto" + sur, sv: n + " har lagt till ett foto" + sur })
  if (type === "video") return T7(lg, { fr: n + " a ajouté une vidéo" + sur, en: n + " added a video" + sur, es: n + " añadió un vídeo" + sur, it: n + " ha aggiunto un video" + sur, ja: n + "が動画を追加しました" + sur, de: n + " hat ein Video hinzugefügt" + sur, ar: n + " أضاف فيديو" + sur, zh: n + "添加了一个视频" + sur, nl: n + " heeft een video toegevoegd" + sur, pt: n + " adicionou um vídeo" + sur, sv: n + " har lagt till en video" + sur })
  return T7(lg, { fr: n + " a commenté" + sur, en: n + " commented" + sur, es: n + " comentó" + sur, it: n + " ha commentato" + sur, ja: n + "がコメントしました" + sur, de: n + " hat kommentiert" + sur, ar: n + " علّق" + sur, zh: n + "发表了评论" + sur, nl: n + " heeft gereageerd" + sur, pt: n + " comentou" + sur, sv: n + " har kommenterat" + sur })
}

// où mène le toucher : les liens de page qui existent déjà dans Hype (#hp, #hv, #ha, #pp, #pv, #r)
async function lien(cible: string): Promise<{ url: string; sur: (lg: L) => string }> {
  const rien = { url: "/", sur: (_: L) => "" }
  if (!cible) return rien
  let pu = "", cb = cible
  const m = cible.match(/^(photocom|albumcom|videocom):(.+)$/)
  if (m) {
    const l = await rest("photo_comments?id=eq." + encodeURIComponent(m[2]) + "&select=photo_url,cible&limit=1", { headers: ent() })
    if (!l || !l[0]) return rien
    pu = String(l[0].photo_url || ""); cb = String(l[0].cible || "")
  }
  const video = /\.(mp4|mov|webm|m4v|m3u8)(\?|#|$)/i.test(pu) || (m && m[1] === "videocom")
  const album = pu.indexOf("album:") === 0
  const surAlbum = (lg: L) => T7(lg, { fr: " ton album", en: " on your album", es: " tu álbum", it: " il tuo album", ja: "（アルバム）", de: " dein Album", ar: " على ألبومك", zh: "（相册）", nl: " op je album", pt: " no seu álbum", sv: " i ditt album" })
  const surVideo = (lg: L) => T7(lg, { fr: " une vidéo", en: " on a video", es: " un vídeo", it: " un video", ja: "（動画）", de: " ein Video", ar: " على فيديو", zh: "（视频）", nl: " op een video", pt: " em um vídeo", sv: " på en video" })
  const surPhoto = (lg: L) => T7(lg, { fr: " une photo", en: " on a photo", es: " una foto", it: " una foto", ja: "（写真）", de: " ein Foto", ar: " على صورة", zh: "（照片）", nl: " op een foto", pt: " em uma foto", sv: " på ett foto" })
  const sur = m ? (album ? surAlbum : (video ? surVideo : surPhoto)) : ((_: L) => "")
  if (cb.indexOf("cheval:") === 0) return { url: "/#" + (m ? (video ? "hv" : "hp") : "ha") + "=" + encodeURIComponent(cb.slice(7)), sur }
  if (cb.indexOf("cavalier:") === 0) return { url: "/#" + (video ? "pv" : (m ? "pp" : "p")) + "=" + encodeURIComponent(cb.slice(9)), sur }
  if (cb.indexOf("photos-cavalier:") === 0) return { url: "/#pp=" + encodeURIComponent(cb.slice(16)), sur }
  if (cb.indexOf("agenda:") === 0) return { url: "/#r=" + encodeURIComponent(cb.slice(7)), sur }
  return { url: "/", sur }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "POST" }, 405)
  if (!PRIVEE) return json({ ok: false, error: "secret VAPID_PRIVATE_KEY absent" }, 500)
  try {
    let corps: { id?: string } = {}
    try { corps = await req.json() } catch { /* corps vide */ }
    const id = String(corps.id || "")
    if (!/^[0-9a-f-]{36}$/i.test(id)) return json({ ok: false, error: "id" }, 400)
    // on « prend » la ligne : pousse_le passe de vide à maintenant, une seule fois, et seulement si elle est récente
    const depuis = new Date(Date.now() - 3 * 60_000).toISOString()
    const pris = await rest("notifications?id=eq." + id + "&pousse_le=is.null&destinataire=not.is.null&created_at=gte." + encodeURIComponent(depuis) + "&type=in.(" + TYPES.join(",") + ")",
      { method: "PATCH", headers: ent({ Prefer: "return=representation" }), body: JSON.stringify({ pousse_le: new Date().toISOString() }) })
    const n = pris && pris[0]
    if (!n) return json({ ok: true, envoyes: 0, raison: "rien a envoyer" })
    const dest = String(n.destinataire)
    const appareils = await rest("push_abonnements?user_id=eq." + encodeURIComponent(dest) + "&select=endpoint,p256dh,auth", { headers: ent() }) || []
    if (!appareils.length) return json({ ok: true, envoyes: 0, raison: "aucun telephone" })
    const profils = await rest("profiles?id=in.(" + [dest, n.acteur].filter(Boolean).map((x: string) => encodeURIComponent(x)).join(",") + ")&select=id,pseudo,langue", { headers: ent() }) || []
    const pDest = profils.find((p: any) => p.id === dest) || {}
    const pAct = profils.find((p: any) => p.id === n.acteur) || {}
    const lg = (["fr", "en", "es", "it", "ja", "de", "ar", "zh", "nl", "pt", "sv"].indexOf(pDest.langue) >= 0 ? pDest.langue : "fr") as L
    const li = await lien(String(n.cible || ""))
    const titre = phrase(String(n.type), lg, String(pAct.pseudo || "").trim(), li.sur(lg))
    const charge = JSON.stringify({ titre, corps: n.extrait ? String(n.extrait).slice(0, 140) : "", url: li.url, tag: "notif-" + id })
    let envoyes = 0
    await Promise.allSettled(appareils.map(async (a: any) => {
      try { await webpush.sendNotification({ endpoint: a.endpoint, keys: { p256dh: a.p256dh, auth: a.auth } }, charge); envoyes++ }
      catch (e) {
        const code = Number((e as { statusCode?: number }).statusCode)
        if (code === 404 || code === 410) { try { await rest("push_abonnements?endpoint=eq." + encodeURIComponent(a.endpoint), { method: "DELETE", headers: ent() }) } catch { /* rien */ } }
        else console.error("envoi refuse", code)
      }
    }))
    return json({ ok: true, envoyes })
  } catch (e) {
    console.error("notifier-notif", e)
    return json({ ok: false, error: "Erreur interne" }, 500)
  }
})
