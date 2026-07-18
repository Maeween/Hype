// sw.js — Hype · Service worker "réseau d'abord"
// Objectif : chaque visite charge la dernière version publiée ; le cache ne
// sert qu'en secours hors-ligne. Les mises à jour arrivent donc immédiatement.
// v4 : les requêtes réseau contournent aussi le cache HTTP du navigateur
// (cache: "no-store"), pour éviter qu'iOS Safari / PWA installée ne resserve
// une ancienne réponse mise en cache avant même que le service worker agisse.
const CACHE = "hype-v4";

self.addEventListener("install", (e) => { self.skipWaiting(); });

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const cles = await caches.keys();
    await Promise.all(cles.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // jamais toucher aux API externes

  // Requête jumelle qui force un vrai aller-retour réseau, sans passer par le
  // cache HTTP du navigateur (celui-ci est distinct du Cache API ci-dessous).
  const reqReseau = new Request(req, { cache: "no-store" });

  // Pages HTML : réseau d'abord, cache en secours hors-ligne.
  if (req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html")) {
    e.respondWith((async () => {
      try {
        const frais = await fetch(reqReseau);
        const c = await caches.open(CACHE);
        c.put(req, frais.clone());
        return frais;
      } catch (err) {
        const c = await caches.open(CACHE);
        return (await c.match(req)) || (await c.match("/index.html")) || Response.error();
      }
    })());
    return;
  }

  // Autres fichiers (images, scripts) : réseau d'abord aussi, secours cache.
  e.respondWith((async () => {
    try {
      const frais = await fetch(reqReseau);
      const c = await caches.open(CACHE);
      c.put(req, frais.clone());
      return frais;
    } catch (err) {
      const c = await caches.open(CACHE);
      return (await c.match(req)) || Response.error();
    }
  })());
});
