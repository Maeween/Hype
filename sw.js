// sw.js — Hype · Service worker de retrait (26/07/2026)
//
// POURQUOI CE FICHIER EXISTE
// Deux mecanismes livres le 26/07 se sont averes destructeurs, et l'un aggravait
// l'autre :
//   - un "chien de garde" dans index.html vidait tous les caches et rechargeait
//     la page a chaque lancement, donc l'app repartait de zero chaque fois ;
//   - la version 5 de ce service worker abandonnait toute requete depassant
//     7 secondes, puis se rabattait sur un cache que le chien de garde venait
//     precisement d'effacer, et renvoyait donc une erreur reseau. Page blanche.
// Un index.html de 8 Mo depasse regulierement 7 secondes : le delai etait
// absurde.
//
// CE QUE FAIT CE FICHIER
// Il se retire. Il vide ses caches, se desinscrit, et n'installe AUCUN
// gestionnaire fetch : plus une seule requete n'est interceptee. Le navigateur
// reprend entierement la main et se comporte comme sur un site normal, avec son
// propre cache HTTP.
//
// CE QU'ON PERD : le fonctionnement hors ligne. C'etait l'interet du service
// worker, mais il coute aujourd'hui bien plus qu'il ne rapporte.
//
// IMPORTANT : ce fichier ne recharge RIEN tout seul. Aucun rechargement
// automatique, aucune purge repetee. Il agit une fois, puis disparait.
// Il devra rester en place plusieurs semaines, le temps que tous les appareils
// deja equipes de l'ancien service worker passent par ici et s'en debarrassent.

self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  e.waitUntil((async function () {
    try {
      var cles = await caches.keys();
      await Promise.all(cles.map(function (k) { return caches.delete(k); }));
    } catch (err) { /* rien a nettoyer */ }
    try {
      await self.registration.unregister();
    } catch (err) { /* deja parti */ }
  })());
});

// Volontairement aucun addEventListener("fetch") : sans lui, le service worker
// ne touche a aucune requete. C'est la garantie qu'il ne peut plus rien casser.
