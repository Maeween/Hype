// supabase/functions/notifier-notif/index.ts — Hype · notification sur le téléphone (20/10/2026)
//
// Blandine : « On pourrait ajouter notif sur tel ? ». Quand une notification PERSONNELLE est créée dans la table
// notifications (mention @, identification, commentaire sur ses albums / vidéos / chevaux / sa page), elle est envoyée
// sur les téléphones de la personne qui ont activé les notifications (table push_abonnements, la même que les rappels
// de rendez-vous, fonction notifier-rdv). Pas les j'aime ni les publications de la communauté (choix de Blandine).
// 07/11 : SAUF les j'aime sur l'histoire d'un cheval, une présentation de cavalier et une vidéo de la Team (« Oui pour les j'aime »,
// Blandine 07/11 01 h 36) : type « jaime_texte », une seule notification par personne et par texte/vidéo (la base y veille).
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

const TYPES = ["identification", "identification_post", "identification_reponse", "identification_photos", "commentaire", "photo", "video", "heybaby", "soin_a_confirmer", "jaime_texte", "epingle_partagee"]   // 09/11 : + conseil Hey Baby envoyé par un coach (Blandine : « surtout qu'ils reçoivent une notification sur leur téléphone »)
// 21/10 : + « Hey Baby t'a répondu » (créée par le relais assistant quand le téléphone est parti avant la fin) ; 05/11 : + soin ajouté par un cavalier, à confirmer par l'écurie (option B de Blandine)

function json(c: unknown, s = 200) { return new Response(JSON.stringify(c), { status: s, headers: { "content-type": "application/json; charset=utf-8" } }) }
const ent = (x: Record<string, string> = {}) => ({ apikey: SERVICE, Authorization: "Bearer " + SERVICE, "Content-Type": "application/json", ...x })
async function rest(chemin: string, init: RequestInit = {}) {
  const r = await fetch(URL_SB + "/rest/v1/" + chemin, init)
  const t = await r.text()
  if (!r.ok) throw new Error("base " + r.status + " " + t.slice(0, 200))
  return t ? JSON.parse(t) : null
}

type L = "fr" | "en" | "es" | "it" | "ja" | "de" | "ar" | "zh" | "nl" | "pt" | "sv" | "ru" | "pl" | "ko"
const T7 = (lg: L, o: Partial<Record<L, string>> & { fr: string }) => o[lg] || o.en || o.fr

function phrase(type: string, lg: L, nom: string, sur: string, cible = ""): string {
  if (type === "soin_a_confirmer") return T7(lg, { fr: (nom || "Un cavalier") + " a ajouté un soin, à confirmer", en: (nom || "A rider") + " added a care entry to confirm" })   // 05/11
  if (type === "epingle_partagee") return T7(lg, { fr: (nom || "Ton coach") + " t'a envoyé un conseil Hey Baby", en: (nom || "Your coach") + " sent you a Hey Baby tip", es: (nom || "Tu coach") + " te ha enviado un consejo de Hey Baby", it: (nom || "Il tuo coach") + " ti ha inviato un consiglio di Hey Baby", ja: (nom || "コーチ") + "がHey Babyのアドバイスを送りました", de: (nom || "Dein Coach") + " hat dir einen Hey-Baby-Rat geschickt", ar: (nom || "مدرّبك") + " أرسل إليكِ نصيحة من Hey Baby", zh: (nom || "你的教练") + "给你发了一条 Hey Baby 建议", nl: (nom || "Je coach") + " heeft je een Hey Baby-tip gestuurd", pt: (nom || "O teu treinador") + " enviou-te um conselho do Hey Baby", sv: (nom || "Din tränare") + " har skickat ett Hey Baby-råd till dig", ru: (nom || "Твой тренер") + " отправил(а) тебе совет Hey Baby", pl: (nom || "Twój trener") + " wysłał(a) ci wskazówkę Hey Baby", ko: (nom || "코치") + "님이 Hey Baby 조언을 보냈어요" })   // 09/11
  if (type === "heybaby") return T7(lg, { fr: "Hey Baby t'a répondu", en: "Hey Baby answered you", es: "Hey Baby te ha respondido", it: "Hey Baby ti ha risposto", ja: "Hey Babyが返信しました", de: "Hey Baby hat dir geantwortet", ar: "Hey Baby ردّ عليكِ", zh: "Hey Baby 回复了你", nl: "Hey Baby heeft je geantwoord", pt: "O Hey Baby respondeu você", sv: "Hey Baby har svarat dig", ru: "Hey Baby ответил тебе", pl: "Hey Baby ci odpowiedział", ko: "Hey Baby가 답했어요" })
  const n = nom || T7(lg, { fr: "Quelqu'un", en: "Someone", es: "Alguien", it: "Qualcuno", ja: "誰か", de: "Jemand", ar: "شخص ما", zh: "有人", nl: "Iemand", pt: "Alguém", sv: "Någon", ru: "Кто-то", pl: "Ktoś", ko: "누군가" })
  if (type === "jaime_texte") {   // 07/11
    if (cible.indexOf("cheval:") === 0) return T7(lg, { fr: n + " a aimé l'histoire de" + sur, en: n + " liked the story of" + sur, es: n + " le gustó la historia de" + sur, it: n + " ha messo mi piace alla storia di" + sur, ja: n + "がストーリーにいいねしました：" + sur, de: n + " gefällt die Geschichte von" + sur, ar: n + " أعجبته قصة" + sur, zh: n + "赞了这段故事：" + sur, nl: n + " vindt het verhaal leuk van" + sur, pt: n + " curtiu a história de" + sur, sv: n + " gillade berättelsen om" + sur, ru: n + " оценил(а) историю" + sur, pl: n + " polubił(a) historię" + sur, ko: n + "님이 이야기에 좋아요를 눌렀어요:" + sur })
    if (cible.indexOf("teamvideo:") === 0) return T7(lg, { fr: n + " a aimé ta vidéo", en: n + " liked your video", es: n + " le gustó tu vídeo", it: n + " ha messo mi piace al tuo video", ja: n + "があなたの動画にいいねしました", de: n + " gefällt dein Video", ar: n + " أعجبه الفيديو الخاص بك", zh: n + "赞了你的视频", nl: n + " vindt je video leuk", pt: n + " curtiu o seu vídeo", sv: n + " gillade din video", ru: n + " оценил(а) твоё видео", pl: n + " polubił(a) twoje wideo", ko: n + "님이 내 영상에 좋아요를 눌렀어요" })
    return T7(lg, { fr: n + " a aimé ta présentation", en: n + " liked your introduction", es: n + " le gustó tu presentación", it: n + " ha messo mi piace alla tua presentazione", ja: n + "があなたの紹介にいいねしました", de: n + " gefällt deine Vorstellung", ar: n + " أعجبه تقديمك", zh: n + "赞了你的自我介绍", nl: n + " vindt je voorstelling leuk", pt: n + " curtiu a sua apresentação", sv: n + " gillade din presentation", ru: n + " оценил(а) твоё описание", pl: n + " polubił(a) twoją prezentację", ko: n + "님이 내 소개에 좋아요를 눌렀어요" })
  }
  if (type.indexOf("identification") === 0) {
    if (type === "identification_photos") return T7(lg, { fr: n + " t'a identifié(e) sur des photos", en: n + " tagged you in photos", es: n + " te etiquetó en fotos", it: n + " ti ha taggato in alcune foto", ja: n + "が写真であなたをタグ付けしました", de: n + " hat dich auf Fotos markiert", ar: n + " أشار إليك في صور", zh: n + "在照片中标记了你", nl: n + " heeft je getagd op foto's", pt: n + " marcou você em fotos", sv: n + " har taggat dig i foton", ru: n + " отметил(а) тебя на фото", pl: n + " oznaczył(a) cię na zdjęciach", ko: n + "님이 사진에 태그했어요" })
    return T7(lg, { fr: n + " t'a mentionné(e)", en: n + " mentioned you", es: n + " te mencionó", it: n + " ti ha menzionato", ja: n + "があなたをメンションしました", de: n + " hat dich erwähnt", ar: n + " أشار إليك", zh: n + "提到了你", nl: n + " heeft je genoemd", pt: n + " mencionou você", sv: n + " har nämnt dig", ru: n + " упомянул(а) тебя", pl: n + " wspomniał(a) o tobie", ko: n + "님이 멘션했어요" })
  }
  if (type === "photo") return T7(lg, { fr: n + " a ajouté une photo" + sur, en: n + " added a photo" + sur, es: n + " añadió una foto" + sur, it: n + " ha aggiunto una foto" + sur, ja: n + "が写真を追加しました" + sur, de: n + " hat ein Foto hinzugefügt" + sur, ar: n + " أضاف صورة" + sur, zh: n + "添加了一张照片" + sur, nl: n + " heeft een foto toegevoegd" + sur, pt: n + " adicionou uma foto" + sur, sv: n + " har lagt till ett foto" + sur, ru: n + " добавил(а) фото" + sur , pl: n + " dodał(a) zdjęcie" + sur, ko: n + "님이 사진을 추가했어요" + sur })
  if (type === "video") return T7(lg, { fr: n + " a ajouté une vidéo" + sur, en: n + " added a video" + sur, es: n + " añadió un vídeo" + sur, it: n + " ha aggiunto un video" + sur, ja: n + "が動画を追加しました" + sur, de: n + " hat ein Video hinzugefügt" + sur, ar: n + " أضاف فيديو" + sur, zh: n + "添加了一个视频" + sur, nl: n + " heeft een video toegevoegd" + sur, pt: n + " adicionou um vídeo" + sur, sv: n + " har lagt till en video" + sur, ru: n + " добавил(а) видео" + sur , pl: n + " dodał(a) film" + sur, ko: n + "님이 동영상을 추가했어요" + sur })
  return T7(lg, { fr: n + " a commenté" + sur, en: n + " commented" + sur, es: n + " comentó" + sur, it: n + " ha commentato" + sur, ja: n + "がコメントしました" + sur, de: n + " hat kommentiert" + sur, ar: n + " علّق" + sur, zh: n + "发表了评论" + sur, nl: n + " heeft gereageerd" + sur, pt: n + " comentou" + sur, sv: n + " har kommenterat" + sur, ru: n + " прокомментировал(а)" + sur , pl: n + " skomentował(a)" + sur, ko: n + "님이 댓글을 남겼어요" + sur })
}

// où mène le toucher : les liens de page qui existent déjà dans Hype (#hp, #hv, #ha, #pp, #pv, #r)
async function lien(cible: string): Promise<{ url: string; sur: (lg: L) => string }> {
  const rien = { url: "/", sur: (_: L) => "" }
  if (!cible) return rien
  if (cible.indexOf("epingle:") === 0) return { url: "/#ep-" + encodeURIComponent(cible.slice(8)), sur: (_: L) => "" }   // 09/11 : ouvre le conseil partagé
  if (cible === "heybaby") return { url: "/#hb=1", sur: (_: L) => "" }   // 21/10 : ouvre Hey Baby, qui affiche la réponse gardée
  if (cible.indexOf("soin:") === 0) return { url: "/#soins-a-confirmer", sur: (_: L) => "" }   // 05/11 : page « À confirmer » de l'écurie
  let pu = "", cb = cible
  const m = cible.match(/^(photocom|albumcom|videocom):(.+)$/)
  if (m) {
    const l = await rest("photo_comments?id=eq." + encodeURIComponent(m[2]) + "&select=photo_url,cible&limit=1", { headers: ent() })
    if (!l || !l[0]) return rien
    pu = String(l[0].photo_url || ""); cb = String(l[0].cible || "")
  }
  const video = /\.(mp4|mov|webm|m4v|m3u8)(\?|#|$)/i.test(pu) || (m && m[1] === "videocom")
  const album = pu.indexOf("album:") === 0
  const surAlbum = (lg: L) => T7(lg, { fr: " ton album", en: " on your album", es: " tu álbum", it: " il tuo album", ja: "（アルバム）", de: " dein Album", ar: " على ألبومك", zh: "（相册）", nl: " op je album", pt: " no seu álbum", sv: " i ditt album", ru: " твой альбом", pl: " w twoim albumie", ko: " (내 앨범)" })
  const surVideo = (lg: L) => T7(lg, { fr: " une vidéo", en: " on a video", es: " un vídeo", it: " un video", ja: "（動画）", de: " ein Video", ar: " على فيديو", zh: "（视频）", nl: " op een video", pt: " em um vídeo", sv: " på en video", ru: " видео", pl: " pod filmem", ko: " (동영상)" })
  const surPhoto = (lg: L) => T7(lg, { fr: " une photo", en: " on a photo", es: " una foto", it: " una foto", ja: "（写真）", de: " ein Foto", ar: " على صورة", zh: "（照片）", nl: " op een foto", pt: " em uma foto", sv: " på ett foto", ru: " фото", pl: " pod zdjęciem", ko: " (사진)" })
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
    if (n.type === "heybaby" && n.acteur) return json({ ok: true, envoyes: 0, raison: "heybaby sans serveur" })   // 21/10 : seule une ligne créée par le serveur (acteur vide) est envoyée
    const dest = String(n.destinataire)
    const appareils = await rest("push_abonnements?user_id=eq." + encodeURIComponent(dest) + "&select=endpoint,p256dh,auth", { headers: ent() }) || []
    if (!appareils.length) return json({ ok: true, envoyes: 0, raison: "aucun telephone" })
    const profils = await rest("profiles?id=in.(" + [dest, n.acteur].filter(Boolean).map((x: string) => encodeURIComponent(x)).join(",") + ")&select=id,pseudo,langue", { headers: ent() }) || []
    const pDest = profils.find((p: any) => p.id === dest) || {}
    const pAct = profils.find((p: any) => p.id === n.acteur) || {}
    const lg = (["fr", "en", "es", "it", "ja", "de", "ar", "zh", "nl", "pt", "sv", "ru", "pl", "ko"].indexOf(pDest.langue) >= 0 ? pDest.langue : "fr") as L
    const li = await lien(String(n.cible || ""))
    const titre = phrase(String(n.type), lg, String(pAct.pseudo || "").trim(), n.type === "jaime_texte" && n.extrait ? " " + String(n.extrait) : li.sur(lg), String(n.cible || ""))
    const charge = JSON.stringify({ titre, corps: (n.extrait && n.type !== "jaime_texte") ? String(n.extrait).slice(0, 140) : "", url: li.url, tag: "notif-" + id })
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
