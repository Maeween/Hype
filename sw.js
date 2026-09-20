// sw.js — Hype · Service worker des NOTIFICATIONS (20/09/2026)
//
// CE QU'IL REMPLACE
// L'ancien fichier (26/07/2026) etait un "service worker de retrait" : il vidait
// ses caches, se desinscrivait, et disparaissait. C'etait la bonne decision a
// l'epoque — deux mecanismes se combinaient pour donner une page blanche — mais
// tant qu'il reste en place, AUCUNE notification ne peut arriver : un service
// worker desinscrit ne recoit plus rien.
//
// CE QUE FAIT CELUI-CI
// Il ne fait QUE les notifications. Il n'intercepte AUCUNE requete : il n'y a
// toujours aucun addEventListener("fetch"), donc il ne peut pas recreer la
// panne de juillet. Le navigateur garde entierement la main sur le reseau et
// son cache HTTP, exactement comme aujourd'hui.
//
// CE QU'ON NE RECUPERE PAS : le fonctionnement hors ligne. Ce n'est pas un
// oubli, c'est volontaire, pour les raisons ci-dessus.
//
// CE QU'IL FAUT SAVOIR
// - Les appareils qui ont encore l'ancien fichier s'en debarrassent au premier
//   lancement, puis installent celui-ci au suivant. Il faut donc OUVRIR L'APPLI
//   DEUX FOIS avant que les notifications puissent etre activees.
// - Sur iPhone, rien n'arrivera si Hype n'est pas AJOUTEE A L'ECRAN D'ACCUEIL :
//   Apple l'impose pour les applications web. L'appli le dit a l'ecran.
// - Ce fichier ne decide de rien : il affiche ce que le serveur lui envoie.

self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  // On reprend la main sur les pages deja ouvertes, sans rien effacer d'autre.
  e.waitUntil(self.clients.claim());
});

// Une notification arrive. Le serveur envoie un petit JSON :
// { titre, corps, url, tag }. Si le format est inattendu, on affiche quand meme
// quelque chose de lisible plutot que de rester muet.
self.addEventListener("push", function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; }
  catch (err) {
    try { d = { corps: e.data ? e.data.text() : "" }; } catch (err2) { d = {}; }
  }
  var titre = d.titre || d.title || "Hype";
  var options = {
    body: d.corps || d.body || "",
    icon: d.icone || "/images/icon-192.png",
    badge: d.badge || "/images/icon-192.png",
    tag: d.tag || "hype",
    renotify: true,
    data: { url: d.url || "/" }
  };
  e.waitUntil(self.registration.showNotification(titre, options));
});

// On touche la notification : on ouvre l'appli a l'endroit demande, ou on
// ramene au premier plan l'onglet deja ouvert plutot que d'en ouvrir un second.
self.addEventListener("notificationclick", function (e) {
  e.notification.close();
  var cible = (e.notification.data && e.notification.data.url) || "/";
  e.waitUntil((async function () {
    try {
      var liste = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      for (var i = 0; i < liste.length; i++) {
        var c = liste[i];
        if ("focus" in c) {
          try { if ("navigate" in c && cible && cible !== "/") await c.navigate(cible); } catch (err) { }
          return c.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(cible);
    } catch (err) { }
  })());
});

// Volontairement AUCUN addEventListener("fetch") : sans lui, ce service worker
// ne touche a aucune requete. C'est la garantie qu'il ne peut pas recasser ce
// que le fichier de juillet avait repare.
