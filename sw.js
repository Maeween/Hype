// sw.js — Hype · Service worker "réseau d'abord, mais jamais bloquant"
//
// v5 (26/07/2026) — deux corrections par rapport à la v4 :
//
// 1. DÉLAI MAXIMUM SUR CHAQUE REQUÊTE. En v4, `fetch` n'avait aucune limite de
//    temps. Sur une connexion instable, une seule requête suspendue suffisait à
//    ne jamais résoudre `respondWith` : le script correspondant n'aboutissait
//    jamais et l'app restait sur son écran de chargement, indéfiniment, sans
//    aucune erreur. Désormais chaque requête réseau est abandonnée au bout de
//    quelques secondes et on répond avec le cache.
//
// 2. LES FICHIERS LOURDS NE SONT PLUS RETÉLÉCHARGÉS À CHAQUE VISITE. En v4, le
//    `cache: "no-store"` s'appliquait à tout, y compris aux 118 fichiers
//    `hype-images-*.js` et aux photos de `images/`. Chaque ouverture de l'app
//    rapatriait donc plusieurs mégaoctets, même inchangés. Ces fichiers-là sont
//    maintenant servis depuis le cache immédiatement, puis rafraîchis en tâche
//    de fond pour la visite suivante. Une image peut donc avoir une visite de
//    retard — sans conséquence, une image manquante ne casse rien — alors qu'un
//    index.html périmé, lui, serait grave : le HTML et le code restent en
//    réseau d'abord.
//
// Le comportement voulu est préservé : une nouvelle mise en ligne arrive
// immédiatement, le cache ne sert qu'en secours.

const CACHE = "hype-v5";
const DELAI_HTML = 7000;   // pages : on attend un peu plus, c'est le fichier vital
const DELAI_AUTRE = 5000;  // scripts, images : au-delà, le cache fait l'affaire

self.addEventListener("install", () => { self.skipWaiting(); });

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const cles = await caches.keys();
    await Promise.all(cles.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

// Requête réseau qui contourne le cache HTTP du navigateur ET qui s'abandonne
// au bout de `delai` millisecondes, pour ne jamais rester suspendue.
async function reseauLimite(req, delai) {
  const ctrl = new AbortController();
  const minuteur = setTimeout(() => ctrl.abort(), delai);
  try {
    return await fetch(new Request(req, { cache: "no-store", signal: ctrl.signal }));
  } finally {
    clearTimeout(minuteur);
  }
}

// Fichiers volumineux et stables : bundles d'images et photos.
function estFichierLourd(url) {
  return /\/hype-images-\d+\.js$/.test(url.pathname)
      || /^\/images\//.test(url.pathname)
      || /\.(jpg|jpeg|png|webp|gif|mp4|webm)$/i.test(url.pathname);
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  let url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return; // jamais toucher aux API externes

  const estHTML = req.mode === "navigate"
    || (req.headers.get("accept") || "").includes("text/html");

  // --- Fichiers lourds : cache d'abord, rafraîchissement en tâche de fond ---
  if (!estHTML && estFichierLourd(url)) {
    e.respondWith((async () => {
      const c = await caches.open(CACHE);
      const enCache = await c.match(req);
      if (enCache) {
        // On ne l'attend pas : la réponse partant du cache est déjà renvoyée.
        e.waitUntil((async () => {
          try {
            const frais = await reseauLimite(req, DELAI_AUTRE);
            if (frais && frais.ok) await c.put(req, frais.clone());
          } catch (err) { /* hors ligne ou trop lent : on garde le cache */ }
        })());
        return enCache;
      }
      try {
        const frais = await reseauLimite(req, DELAI_AUTRE);
        if (frais && frais.ok) c.put(req, frais.clone());
        return frais;
      } catch (err) {
        return Response.error();
      }
    })());
    return;
  }

  // --- Pages HTML : réseau d'abord (avec délai), cache en secours ---
  if (estHTML) {
    e.respondWith((async () => {
      const c = await caches.open(CACHE);
      try {
        const frais = await reseauLimite(req, DELAI_HTML);
        if (frais && frais.ok) c.put(req, frais.clone());
        return frais;
      } catch (err) {
        return (await c.match(req)) || (await c.match("/index.html")) || Response.error();
      }
    })());
    return;
  }

  // --- Le reste (code de l'app, manifeste, polices locales) : réseau d'abord ---
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    try {
      const frais = await reseauLimite(req, DELAI_AUTRE);
      if (frais && frais.ok) c.put(req, frais.clone());
      return frais;
    } catch (err) {
      return (await c.match(req)) || Response.error();
    }
  })());
});
