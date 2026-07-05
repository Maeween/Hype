// sw.js — Hype · Service worker "réseau d'abord"
// Objectif : chaque visite charge la dernière version publiée ; le cache ne
// sert qu'en secours hors-ligne. Les mises à jour arrivent donc immédiatement.
const CACHE = "hype-v3";

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

  // Pages HTML : réseau d'abord, cache en secours hors-ligne.
  if (req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html")) {
    e.respondWith((async () => {
      try {
        const frais = await fetch(req);
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
      const frais = await fetch(req);
      const c = await caches.open(CACHE);
      c.put(req, frais.clone());
      return frais;
    } catch (err) {
      const c = await caches.open(CACHE);
      return (await c.match(req)) || Response.error();
    }
  })());
});
