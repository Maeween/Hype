/* sw-linguae.js — Hype Linguae · le hors-ligne
   ==================================================================
   Écrit le 15 août 2026, session 211, sur ordre de Blandine :
   « comment on peut rendre Linguae utilisable sans réseau, dans
   l'avion par exemple » puis « gère juste le hors ligne ».

   🟥 IL NE FAUT PAS DÉMÉNAGER LES IMAGES. Le SUIVI dit à deux endroits
   que le hors-ligne « exige le dossier linguae/ » parce qu'« un service
   worker ne met en cache que ce qui est dans sa portée ». C'EST FAUX,
   et ça a bloqué le chantier pour rien. La portée (`scope`) décide
   quelles PAGES le service worker contrôle — pas quelles ressources il
   peut garder. Une page contrôlée qui demande `/carte-labaule.webp` à
   la racine passe par ce fichier, même si la racine est hors portée.
   Les 31 cartes, 31 fonds, 31 objets et 26 lexiques RESTENT À LA
   RACINE, conformément à la règle des images en tête du SUIVI.

   🟥 IL N'AVALE PAS HYPE. Enregistré avec `scope: "/lingo"`, il ne
   contrôle QUE les adresses commençant par `/lingo` :
   lingo.html, lingo-dialogue.html, lingo-sellerie.html,
   lingo-collection.html, lingo-globe.html. `index.html` (Hype) et son
   propre sw.js à la racine ne sont jamais touchés. Un script posé à la
   racine peut toujours réduire sa portée sans en-tête particulier —
   c'est l'élargir qui exigerait `Service-Worker-Allowed`.
   ⚠️ NE PAS remonter ce scope à "/" : les deux service workers se
   marcheraient dessus, et le sw.js de Hype a déjà trois versions en
   circulation (retrait, hype-v3, hype-v4).

   ================== LES TROIS DÉCISIONS DE BLANDINE ==================
   Proposées et validées d'un « ok », 15/08 :

   1. AUCUNE VIDÉO EN CACHE. Les `arrivee-<ville>.mp4` sont les gros
      fichiers du dépôt ; les embarquer ferait des dizaines de Mo sur le
      téléphone. Hors réseau, `lingo.html` affiche déjà son repli
      (« Vidéo introuvable »), et le reste de la ville fonctionne.
      ⚠️ NE PAS « améliorer » en ajoutant les mp4 au précache.

   2. LE SOCLE D'OFFICE, LES IMAGES AU FIL DE LA VISITE. À
      l'installation : les pages et les 26 lexiques — c'est léger. Les
      cartes et fonds entrent en cache quand la ville est ouverte pour
      de vrai. Pas de téléchargement massif au premier lancement, qui
      viderait le forfait de quelqu'un au bord d'un paddock en 5G.

   3. UN ÉCHEC RÉSEAU NE VAUT JAMAIS « PAS PREMIUM ». Supabase n'est
      JAMAIS mis en cache (voir plus bas) : hors ligne, l'appel échoue
      franchement et `lingo.html` retombe sur son dernier statut connu
      en localStorage. Servir une vieille réponse Supabase serait pire —
      on figerait un état faux. Le vrai garde-fou est dans lingo.html.
      ⚠️ À VÉRIFIER AVANT DÉPLOIEMENT : qu'aucun chemin de `lingo.html`
      n'interprète un échec réseau comme une perte de premium. Une
      abonnée qui perd ses villes en plein vol est le pire scénario.

   ====================== STRATÉGIES, EN CLAIR ======================
   · Supabase, CDN jsdelivr, POST : RÉSEAU SEUL, jamais de cache.
   · Pages .html de Linguae : réseau d'abord (pour avoir la dernière
     version), cache en secours si le réseau manque.
   · Lexiques .js, images .webp, polices : cache d'abord (instantané,
     et le contenu est figé par son `?l=` ou son `VER`).
   · Vidéos .mp4 : réseau seul, jamais stockées.

   ⚠️ LE PIÈGE N°1 DE LA PASSATION, TROIS ÉPISODES DÉJÀ : une image qui
   ne change pas après un push. La parade existe déjà — `var VER` dans
   lingo.html et `?l=` sur les lexiques. Une adresse neuve n'est pas
   dans le cache, donc elle est retéléchargée. C'est pour ça qu'on met
   en cache par URL COMPLÈTE, requête comprise. Si une image s'entête,
   incrémenter `VER` reste le premier geste — pas vider le cache.

   ⚠️ CHANGER `CACHE` À CHAQUE MODIFICATION DE CE FICHIER : c'est ce qui
   déclenche le ménage des anciennes versions.
   ================================================================== */

var CACHE = "linguae-v1";

/* Le socle : ce qui doit être là même si la ville n'a jamais été
   ouverte. Volontairement SANS `?l=` — lingo.html les demandera avec
   leur version, et la réponse sera mise en cache à ce moment-là sous
   son adresse exacte. Ce précache-ci est le filet, pas la vérité. */
var SOCLE = [
  "lingo.html",
  "lingo-dialogue.html",
  "lingo-collection.html",
  "lingo-globe.html",
  "lingo-sellerie.html",
  "linguae.webmanifest"
];

/* ---------- installation ---------- */
/* `addAll` échoue en bloc si UN SEUL fichier manque — c'est trop
   fragile pour une liste qui bougera. On pose donc chaque fichier
   séparément et on ignore les absents : le hors-ligne se construira
   surtout à l'usage, pas ici. */
self.addEventListener("install", function(e){
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      return Promise.all(SOCLE.map(function(u){
        return c.add(u).catch(function(){ /* absent : tant pis, pas de blocage */ });
      }));
    })
  );
});

/* ---------- activation : ménage des vieilles versions ---------- */
self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(noms){
      return Promise.all(noms.map(function(n){
        if(n !== CACHE && n.indexOf("linguae-") === 0) return caches.delete(n);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

/* ---------- le tri des requêtes ---------- */
function estSupabase(u){
  return u.hostname.indexOf("supabase") >= 0 ||
         u.hostname.indexOf("jsdelivr") >= 0 ||
         u.hostname.indexOf("openai") >= 0;
}
function estVideo(u){
  return /\.(mp4|mov|webm)$/i.test(u.pathname);
}
function estFige(u){
  /* contenu qui ne change qu'avec son numéro de version */
  return /\.(webp|jpg|jpeg|png|svg|woff2?|ttf|mp3)$/i.test(u.pathname) ||
         /\.js$/i.test(u.pathname);
}
function estPageLinguae(u){
  return /\.html$/i.test(u.pathname) && u.pathname.indexOf("/lingo") >= 0;
}

self.addEventListener("fetch", function(e){
  var req = e.request;

  /* on ne touche à rien d'autre que les GET : une écriture ne se
     rejoue pas depuis un cache */
  if(req.method !== "GET") return;

  var u;
  try{ u = new URL(req.url); }catch(err){ return; }

  /* 🟥 Supabase et les CDN : RÉSEAU SEUL. Voir décision 3 ci-dessus. */
  if(estSupabase(u)) return;

  /* 🟥 Vidéos : réseau seul, jamais stockées. Décision 1. */
  if(estVideo(u)) return;

  /* autres domaines : on laisse passer */
  if(u.origin !== self.location.origin) return;

  /* --- contenu figé : cache d'abord, réseau en complément --- */
  if(estFige(u)){
    e.respondWith(
      caches.match(req).then(function(rep){
        if(rep) return rep;
        return fetch(req).then(function(net){
          if(net && net.ok){
            var copie = net.clone();
            caches.open(CACHE).then(function(c){ c.put(req, copie); });
          }
          return net;
        }).catch(function(){
          /* hors ligne et jamais vu : on rend une erreur douce, la page
             a déjà ses replis (image manquante, lexique absent) */
          return new Response("", {status:504, statusText:"hors ligne"});
        });
      })
    );
    return;
  }

  /* --- pages de Linguae : réseau d'abord, cache en secours --- */
  if(estPageLinguae(u) || req.mode === "navigate"){
    e.respondWith(
      fetch(req).then(function(net){
        if(net && net.ok){
          var copie = net.clone();
          caches.open(CACHE).then(function(c){ c.put(req, copie); });
        }
        return net;
      }).catch(function(){
        return caches.match(req).then(function(rep){
          if(rep) return rep;
          /* on retente sans la requête : lingo.html?ville=x doit
             pouvoir retomber sur lingo.html mis en cache */
          return caches.match(u.pathname.replace(/^\//, "")) ||
                 caches.match(u.pathname);
        });
      })
    );
    return;
  }

  /* le reste : comportement normal du navigateur */
});
