// 05/11/2026 — Conversion des photos que le telephone ne sait pas ouvrir (Blandine :
// « il est inenvisageable de demander une capture d'ecran »).
// Le recadreur de Hype essaie d'abord de lire la photo sur le telephone (lecture normale,
// puis relecture reduite, puis conversion HEIF sur place). S'il n'y arrive toujours pas,
// il envoie la photo telle quelle ICI : ImageMagick (version WebAssembly) la lit — HEIF/HEIC,
// AVIF, RAW/DNG, TIFF, tres grandes photos… — la remet droite (orientation de l'appareil),
// la reduit a 2560 px maximum et la renvoie en JPEG. Rien n'est stocke : la photo repart
// aussitot vers le telephone, et c'est le circuit normal de Hype qui l'enregistre ensuite.
// Acces : jeton de session obligatoire (verify_jwt), comme hey-baby-vision.
// Mode test (pour verifier depuis la base, sans telephone) : corps JSON { b64 } ou { url } (exemple public
// sur raw.githubusercontent.com seulement) -> reponse
// JSON { ok, w, h, octets } au lieu de l'image.

import { ImageMagick, initializeImageMagick, MagickFormat } from "npm:@imagemagick/magick-wasm@0.0.30";

const wasmBytes = await Deno.readFile(
  new URL("magick.wasm", import.meta.resolve("npm:@imagemagick/magick-wasm@0.0.30")),
);
await initializeImageMagick(wasmBytes);

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const MAX_OCTETS = 40 * 1024 * 1024;
const COTE_MAX = 2560;

function reponseJson(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { ...CORS, "Content-Type": "application/json" } });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return reponseJson({ ok: false, erreur: "POST attendu" }, 405);
  let test = false;
  try {
    let octets: Uint8Array;
    const type = req.headers.get("content-type") || "";
    if (type.includes("application/json")) {
      const j = await req.json();
      test = true;
      const url = String(j && j.url || "");
      if (url) {
        // test seulement : photo d'exemple publique, limitee a GitHub (pas d'acces a d'autres adresses)
        if (!/^https:\/\/raw\.githubusercontent\.com\//.test(url)) return reponseJson({ ok: false, erreur: "adresse refusee" }, 400);
        const r = await fetch(url);
        if (!r.ok) return reponseJson({ ok: false, erreur: "exemple introuvable " + r.status }, 400);
        octets = new Uint8Array(await r.arrayBuffer());
      } else {
        octets = Uint8Array.from(atob(String(j && j.b64 || "")), (c) => c.charCodeAt(0));
      }
    } else {
      octets = new Uint8Array(await req.arrayBuffer());
    }
    if (!octets.length) return reponseJson({ ok: false, erreur: "photo vide" }, 400);
    if (octets.length > MAX_OCTETS) return reponseJson({ ok: false, erreur: "photo trop lourde" }, 413);

    let w = 0, h = 0;
    const jpeg = ImageMagick.read(octets, (img): Uint8Array => {
      img.autoOrient();
      if (Math.max(img.width, img.height) > COTE_MAX) img.resize(COTE_MAX, COTE_MAX); // garde les proportions
      img.strip();
      img.quality = 90;
      w = img.width; h = img.height;
      return img.write(MagickFormat.Jpeg, (data) => new Uint8Array(data));
    });

    if (test) return reponseJson({ ok: true, w, h, octets: jpeg.length });
    return new Response(jpeg, { headers: { ...CORS, "Content-Type": "image/jpeg", "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("hype-convertir-photo : echec", e);
    return reponseJson({ ok: false, erreur: "conversion impossible", detail: String(e && (e as Error).message || e).slice(0, 300) }, 422);
  }
});
