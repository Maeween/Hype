// @ts-nocheck
// 14/11 13h52 (Blandine : « le mail ressemble à rien… ça dit pas du tout qu'on lui a créé un compte… lui préparer un mail lui souhaitant
// la bienvenue… que s'il souhaite changer son mot de passe, il peut le faire… les fonctionnalités de Hype ») — MAIL DE BIENVENUE DU COMPTE EXPRESS.
// Appelée par l'appli juste après la création d'un compte « express » (juste l'e-mail, depuis un lien partagé), avec le jeton de la personne.
// Garde-fous : seulement pour SON propre compte, seulement s'il a été créé en express (user_metadata.accord_inscription.compte_express),
// une seule fois (app_metadata.bienvenue_envoyee). Le lien « Choisir mon mot de passe » est un lien de récupération Supabase (24 h),
// qui ramène sur 2hype.fr (écran « nouveau mot de passe » de l'appli). Le mail part par Brevo (contact@2hype.fr), modèle publié dans le dépôt :
// outils/mails/bienvenue-express.html ({{LIEN}} remplacé).
import { createClient } from "jsr:@supabase/supabase-js@2"
const URL_SB = Deno.env.get("SUPABASE_URL")!
const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
const ANON = Deno.env.get("SUPABASE_ANON_KEY")!
const DEPOT = "https://raw.githubusercontent.com/Maeween/Hype/main/outils/mails/"
// 14/11 21h (Blandine « fais l'ensemble ») : mail traduit. L'appli envoie { langue } ; modèle bienvenue-express.<langue>.html (repli : le français).
const LANGUES = ["en","es","it","ja","de","ar","zh","nl","pt","sv","ru","pl","ko","fa"]
const SUJETS = {"fr": "HYPE — bienvenue, ton compte est prêt 🐴", "en": "HYPE — welcome, your account is ready 🐴", "es": "HYPE — bienvenido, tu cuenta está lista 🐴", "it": "HYPE — benvenuto, il tuo account è pronto 🐴", "ja": "HYPE — ようこそ、アカウントの準備ができました 🐴", "de": "HYPE – willkommen, dein Konto ist bereit 🐴", "ar": "HYPE — مرحبًا، حسابك جاهز 🐴", "zh": "HYPE — 欢迎，你的账号已准备好 🐴", "nl": "HYPE — welkom, je account is klaar 🐴", "pt": "HYPE — bem-vindo, a tua conta está pronta 🐴", "sv": "HYPE — välkommen, ditt konto är klart 🐴", "ru": "HYPE — добро пожаловать, твой аккаунт готов 🐴", "pl": "HYPE — witaj, twoje konto jest gotowe 🐴", "ko": "HYPE — 환영해요, 계정이 준비됐어요 🐴", "fa": "HYPE — خوش آمدی، حسابت آماده است 🐴"}
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS" }
function rep(o, s = 200) { return new Response(JSON.stringify(o), { status: s, headers: { ...CORS, "Content-Type": "application/json; charset=utf-8" } }) }
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS })
  if (req.method !== "POST") return rep({ erreur: "POST" }, 405)
  const cle = Deno.env.get("BREVO_API_KEY")
  if (!cle) return rep({ ok: false, erreur: "BREVO_API_KEY absent" }, 500)
  const moi = createClient(URL_SB, ANON, { global: { headers: { Authorization: req.headers.get("Authorization") || "" } } })
  const { data: u } = await moi.auth.getUser()
  const user = u && u.user
  if (!user || !user.email) return rep({ ok: false, erreur: "connexion" }, 401)
  const meta = user.user_metadata || {}, app = user.app_metadata || {}
  if (!(meta.accord_inscription && meta.accord_inscription.compte_express)) return rep({ ok: false, erreur: "pas un compte express" }, 403)
  if (app.bienvenue_envoyee) return rep({ ok: true, deja: true })
  if (Date.now() - new Date(user.created_at).getTime() > 3600 * 1000) return rep({ ok: false, erreur: "compte trop ancien" }, 403)
  const admin = createClient(URL_SB, SERVICE)
  const { data: lk, error: eL } = await admin.auth.admin.generateLink({ type: "recovery", email: user.email, options: { redirectTo: "https://2hype.fr" } })
  if (eL || !lk || !lk.properties || !lk.properties.action_link) return rep({ ok: false, erreur: "lien", detail: String(eL && eL.message || "") }, 500)
  let lg = "fr"
  try { const b = await req.json(); if (b && LANGUES.includes(String(b.langue || ""))) lg = String(b.langue) } catch (_) { }
  if (lg === "fr" && LANGUES.includes(String(meta.accord_inscription.langue || ""))) lg = String(meta.accord_inscription.langue)
  let m = await fetch(DEPOT + (lg === "fr" ? "bienvenue-express.html" : "bienvenue-express." + lg + ".html") + "?t=" + Date.now())
  if (!m.ok && lg !== "fr") { lg = "fr"; m = await fetch(DEPOT + "bienvenue-express.html?t=" + Date.now()) }
  if (!m.ok) return rep({ ok: false, erreur: "modèle introuvable" }, 500)
  const lien = lk.properties.action_link
  const html = (await m.text()).split("{{LIEN}}").join(lien.replace(/&/g, "&amp;"))
  const r = await fetch("https://api.brevo.com/v3/smtp/email", { method: "POST", headers: { "api-key": cle, "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify({ sender: { name: "Hype", email: "contact@2hype.fr" }, to: [{ email: user.email }], subject: SUJETS[lg] || SUJETS.fr, htmlContent: html }) })
  const t = await r.text()
  if (!r.ok) return rep({ ok: false, erreur: "brevo", statut: r.status, detail: t.slice(0, 300) }, 502)
  await admin.auth.admin.updateUserById(user.id, { app_metadata: { ...app, bienvenue_envoyee: new Date().toISOString() } })
  return rep({ ok: true })
})
