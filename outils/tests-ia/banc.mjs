// Banc d'essai de assistant.js : vraie base PostgreSQL locale (fonctions SQL réelles),
// Supabase Auth et OpenAI SIMULÉS. Aucune donnée réelle, aucun appel réseau sortant.
import { execFileSync } from "node:child_process";
process.env.OPENAI_API_KEY = "sk-test"; process.env.SUPABASE_SERVICE_ROLE_KEY = "service-test";
process.env.OPENAI_TEXT_MODEL = "modele-texte"; process.env.OPENAI_VISION_MODEL = "modele-vision";
const PSQL = ["-h", "/tmp/pgfam", "-p", "5499", "-U", "postgres", "-d", "iatest", "-qtA", "-c"];
export const sql = (q) => execFileSync("psql", PSQL.concat([q]), { encoding: "utf8" }).trim();
const lit = (v) => v === null || v === undefined ? "null" : "'" + String(v).replace(/'/g, "''") + "'";
export const JETONS = {   // jeton → compte
  "a.a.gratuit": "00000000-0000-0000-0000-00000000000a", "e.e.premium": "00000000-0000-0000-0000-00000000000e",
  "f.f.hypeia": "00000000-0000-0000-0000-00000000000f", "d.d.duo": "00000000-0000-0000-0000-00000000000d",
  "c.c.crystal": "00000000-0000-0000-0000-00000000000c", "g.g.titulaire": "00000000-0000-0000-0000-000000000010",
  "b.b.famille2": "00000000-0000-0000-0000-00000000000b", "m.m.moderatrice": "00000000-0000-0000-0000-000000000011",
};
export const obs = { openai: [], derniereCharge: null };
export let scenarioIA = { type: "ok" };
export function regler(s) { scenarioIA = s; }
globalThis.fetch = async (url, opt = {}) => {
  const u = new URL(url);
  if (u.hostname.endsWith("supabase.co")) {
    if (u.pathname === "/auth/v1/user") {
      const j = (opt.headers.Authorization || "").replace("Bearer ", "");
      if (j === "x.x.panne") return new Response("{}", { status: 500 });
      return JETONS[j] ? new Response(JSON.stringify({ id: JETONS[j] }), { status: 200 }) : new Response(JSON.stringify({ msg: "invalid JWT" }), { status: 401 });
    }
    if (u.pathname.startsWith("/rest/v1/rpc/")) {
      const nom = u.pathname.split("/").pop(), p = JSON.parse(opt.body);
      let q;
      if (nom === "hype_ia_reserver") q = `select hype_ia_reserver(${lit(p.p_uid)}::uuid, ${lit(p.p_operation)}, ${lit(p.p_categorie)}, ${!!p.p_avec_media}, ${lit(p.p_parent)}::uuid)::text`;
      else if (nom === "hype_ia_terminer") q = `select hype_ia_terminer(${lit(p.p_id)}::uuid, ${!!p.p_consommee})::text`;
      else return new Response("{}", { status: 404 });
      try { return new Response(sql(q), { status: 200 }); } catch (e) { return new Response(JSON.stringify({ message: String(e.stderr || e) }), { status: 400 }); }
    }
    if (u.pathname.startsWith("/rest/v1/heybaby_corrections")) return new Response(JSON.stringify([{ texte: "Correction test : dire « poney » et pas « petit cheval »." }]), { status: 200 });
    return new Response("[]", { status: 200 });
  }
  if (u.hostname === "api.openai.com") {
    const charge = JSON.parse(opt.body); obs.openai.push(charge); obs.derniereCharge = charge;
    const s = scenarioIA;
    if (s.type === "panne_reseau") throw new Error("réseau coupé");
    if (s.type === "http") return new Response(JSON.stringify({ error: { message: s.message || "erreur" } }), { status: s.statut });
    if (charge.stream) {
      const mots = s.type === "vide" ? [] : ["Bonjour ", "cavalier, ", "voici ", "ma réponse."];
      const enc = new TextEncoder();
      const corps = new ReadableStream({ async start(c) {
        for (let i = 0; i < mots.length; i++) {
          if (s.type === "coupure" && i === 2) { c.error(new Error("coupure en cours de réponse")); return; }
          c.enqueue(enc.encode("data: " + JSON.stringify({ choices: [{ delta: { content: mots[i] } }] }) + "\n\n"));
          await new Promise((r) => setTimeout(r, 5));
        }
        c.enqueue(enc.encode("data: [DONE]\n\n")); c.close();
      } });
      return new Response(corps, { status: 200 });
    }
    const texte = s.type === "vide" ? "" : (s.texte || '{"ok":true}');
    return new Response(JSON.stringify({ choices: [{ message: { content: texte }, finish_reason: "stop" }] }), { status: 200 });
  }
  throw new Error("appel inattendu " + url);
};
const VRAI_LOG = console.log;
const mod = await import("../../netlify/functions/assistant.js");
export async function appeler(jeton, corps, opts = {}) {
  const h = { "content-type": "application/json", origin: opts.origin || "https://2hype.fr", "x-nf-client-connection-ip": opts.ip || "1.2.3.4" };
  if (jeton) h.authorization = "Bearer " + jeton;
  const silence = VRAI_LOG; console.log = () => { }; let r, texte;
  try {
    r = await mod.default(new Request("https://2hype.fr/.netlify/functions/assistant", { method: opts.methode || "POST", headers: h, body: opts.methode === "GET" ? undefined : (typeof corps === "string" ? corps : JSON.stringify(corps)) }));
    if (opts.annuler) { const lec = r.body.getReader(); await lec.read(); await lec.cancel(); await new Promise((x) => setTimeout(x, 300)); texte = ""; }
    else texte = await r.text();
  } finally { console.log = silence; }
  let json = null; try { json = JSON.parse(texte); } catch (e) { }
  return { statut: r.status, texte, json, h: r.headers };
}
export const IMG = { type: "image", source: { type: "base64", media_type: "image/jpeg", data: "/9j/" + "A".repeat(4000) } };
export function vider(uid) { sql(`delete from ia_reservations where user_id='${uid}'; delete from ia_consommation where user_id='${uid}';`); }
export function vieillir(uid) { sql(`update ia_reservations set cree_le = cree_le - interval '2 minutes' where user_id='${uid}'`); }
export const compteur = (uid) => sql(`select coalesce((select questions||'/'||outils from ia_consommation where user_id='${uid}' and jour=hype_ia_jour()),'0/0')`);
