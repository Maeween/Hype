/* sw-linguae.js — Hype Linguae · le hors-ligne
   ==================================================================
   Écrit le 15 août 2026, session 214, sur ordre de Blandine :
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

var CACHE = "linguae-v6";   /* 🟥 v6 le 18/08 : FLYINGE, nouvelle ville (maréchalerie), fichier neuf
                               ajoute au socle.
                               v5 : cheval -> connemara + fontainebleau(fusionne dans jeunes). v4 :
                               obstacle -> wellington+aachen ; concours -> badminton+oliva+rome+
                               concours-reserve. v3 : cinq lexiques ajoutes. v2 : les trois garde-fous. */

/* 🟥🟥 LE DÉFAUT DU 16/08 — L'APP CASSÉE HORS LIGNE APRÈS UN DÉPLOIEMENT.
   Blandine, revenue de son vol : « j'aurais dû pouvoir accéder sans
   connexion mais rien ne marche », puis « faut pas refaire ça la
   prochaine fois ».

   CE QUI S'EST PASSÉ, et c'est une FAUTE DE CONCEPTION, pas un aléa :
   1. Elle appuie sur « emporter le voyage ». Tout descend. ✅
   2. On pousse un nouveau `lingo.html` qui réclame un fichier NEUF
      (`hype-lingo-lex-enseignant.js`).
   3. Elle rouvre l'app AVEC réseau. La stratégie « réseau d'abord »
      pour les pages télécharge la nouvelle version et l'installe DANS
      LE CACHE, par-dessus l'ancienne qui marchait.
   4. Elle décolle. La page en cache réclame un script qui n'a jamais
      été mis en cache — il n'existait pas au moment du téléchargement.
      Rien ne démarre.

   TROIS GARDE-FOUS, posés le 16/08 :
   · A. LES SCRIPTS SONT DANS LE SOCLE. `SOCLE_JS` liste TOUS les
     lexiques. Ils descendent à l'installation du service worker, sans
     attendre qu'une ville soit visitée.
     ⚠️ TOUT LEXIQUE AJOUTÉ À `lingo.html` DOIT ÊTRE AJOUTÉ ICI. C'est
     exactement l'oubli qui a causé le défaut.
   · B. UNE PAGE NE REMPLACE L'ANCIENNE QUE SI ELLE EST COMPLÈTE. Voir
     `pageComplete()` : on lit la nouvelle page, on relève ses `<script
     src>`, et on ne la met en cache QUE si tous sont déjà là ou
     descendent avec succès. Une page qu'on ne peut pas servir
     entièrement ne mérite pas d'écraser une page qui marchait.
   · C. UN SCRIPT MANQUANT NE TUE PLUS L'APP. Un script introuvable
     hors ligne renvoie un fichier VIDE avec un commentaire, plutôt
     qu'une erreur 504. La ville concernée manquera, l'app tournera.
     ⚠️ Un `.js` en 504 arrête l'exécution ; un `.js` vide, non.

   🟥 NE JAMAIS revenir à « réseau d'abord » sans le test de complétude.
   Une abonnée dans un avion ne peut pas recharger. */
var SOCLE_JS = [
  "hype-lingo-villes.js", "hype-lingo-villes-monde.js", "hype-lingo-phrases-monde.js",
  "hype-lingo-lex-arrivee.js", "hype-lingo-lex-balade.js",
  "hype-lingo-lex-ecurie.js", "hype-lingo-lex-pansage.js", "hype-lingo-lex-materiel.js",
  "hype-lingo-lex-cours.js", "hype-lingo-lex-dressage.js", "hype-lingo-lex-enseignant.js",
  "hype-lingo-lex-derby.js",
  "hype-lingo-lex-cross.js", "hype-lingo-lex-horsemanship.js",
  /* 16/08 : les urgences separees en deux fichiers */
  "hype-lingo-lex-urgences-vet.js", "hype-lingo-lex-urgences-med.js",
  "hype-lingo-lex-poney.js", "hype-lingo-lex-tradition.js", "hype-lingo-lex-western.js",
  "hype-lingo-lex-polo.js", "hype-lingo-lex-haras.js", "hype-lingo-lex-froid.js",
  "hype-lingo-lex-endurance.js", "hype-lingo-lex-vente.js", "hype-lingo-lex-elevage.js",
  /* 🟥🟥 AJOUTES LE 18/08 — ET QUATRE D'ENTRE EUX ETAIENT DEJA MANQUANTS.
     `andalou`, `formation`, `jeunes` et `parade` ont ete crees les 17 et
     18/08 et charges par `lingo.html`, mais PERSONNE NE LES AVAIT INSCRITS
     ICI. Conditions exactes du defaut du vol : hors reseau, Jerez,
     Warendorf, Fontainebleau et Seville seraient tombees sur le fichier
     vide du garde-fou C. Trouve en ajoutant Taupo.
     ⚠️ LA REGLE, POUR LA TROISIEME FOIS : tout lexique ajoute a
     `lingo.html` s'ajoute ICI dans le meme geste, et `CACHE` change. */
  "hype-lingo-lex-andalou.js", "hype-lingo-lex-formation.js",
  "hype-lingo-lex-jeunes.js", "hype-lingo-lex-parade.js",
  /* 18/08 : Taupo, 35e ville, chapitre « Free riding » */
  "hype-lingo-lex-liberte.js",
  /* 🟥🟥 18/08 : DECOUPAGE UN-FICHIER-PAR-VILLE. `hype-lingo-lex-obstacle.js`
     et `hype-lingo-lex-concours.js` sont RETIRES ci-dessus (fusionnes dans
     ces six fichiers neufs). NE PAS les remettre : le contenu a demenage,
     pas ete duplique. */
  "hype-lingo-lex-wellington.js", "hype-lingo-lex-aachen.js",
  "hype-lingo-lex-badminton.js", "hype-lingo-lex-oliva.js",
  "hype-lingo-lex-rome.js", "hype-lingo-lex-concours-reserve.js",
  /* 🟥🟥 18/08 : SUITE DU DECOUPAGE. `hype-lingo-lex-cheval.js` retire
     (voir plus haut) ; Connemara recoit son fichier propre. Fontainebleau
     N'A PAS de fichier separe : sa leçon 4 (ex-cheval) a rejoint
     `hype-lingo-lex-jeunes.js`, deja dans ce socle depuis la v3 — donc
     rien a ajouter pour Fontainebleau ici, tout casserait si on
     dupliquait `jeunes.js`. */
  "hype-lingo-lex-connemara.js",
  /* 18/08 : Flyinge, 36e ville, « Le pied et la maréchalerie ». */
  "hype-lingo-lex-flyinge.js"
];

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
].concat(SOCLE_JS);

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

/* 🟥 GARDE-FOU B — UNE PAGE NE REMPLACE L'ANCIENNE QUE SI ELLE EST
   COMPLÈTE. On relève les `<script src>` de la nouvelle page et on
   s'assure que chacun est en cache ou descend avec succès. Une page
   qu'on ne pourrait pas servir entièrement hors ligne ne mérite pas
   d'écraser une page qui marchait. C'est le correctif du défaut du
   16/08 : voir l'en-tête. ⚠️ NE PAS mettre en cache une page sans
   passer par ici. */
async function pageComplete(rep, cache){
  try{
    var html = await rep.clone().text();
    var srcs = [], m, re = /<script[^>]+src=["']([^"']+)["']/gi;
    while((m = re.exec(html))){
      var u = m[1];
      if(/^https?:/i.test(u)) continue;      /* CDN : hors de notre ressort */
      srcs.push(u);
    }
    for(var i=0;i<srcs.length;i++){
      var deja = await cache.match(srcs[i]);
      if(deja) continue;
      try{
        var r = await fetch(srcs[i], {cache:"no-cache"});
        if(!r || !r.ok) return false;         /* un script manque : on renonce */
        await cache.put(srcs[i], r.clone());
      }catch(e){ return false; }
    }
    return true;
  }catch(e){ return false; }
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
          /* 🟥 GARDE-FOU C — UN SCRIPT MANQUANT NE TUE PLUS L'APP.
             Correctif du 16/08. Un `.js` renvoyé en 504 ARRÊTE
             l'exécution du navigateur ; un `.js` VIDE, non. La ville
             concernée manquera, mais l'app tournera — c'est toujours
             mieux qu'un écran noir dans un avion.
             ⚠️ NE PAS « simplifier » en renvoyant une erreur pour les
             scripts : c'est exactement ce qui a cassé l'app. */
          if(/\.js$/i.test(u.pathname)){
            return new Response(
              "/* hors ligne : ce fichier n'etait pas en cache. */\n",
              {status:200, headers:{"Content-Type":"application/javascript"}});
          }
          /* images et polices : une erreur douce suffit, la page a déjà
             ses replis (image manquante, fond de secours) */
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
          /* 🟥 GARDE-FOU B : on ne remplace la page en cache QUE si tous
             ses scripts sont servables hors ligne. Sinon on rend la
             nouvelle page à l'écran (le réseau est là, elle marchera)
             mais on GARDE l'ancienne en cache — celle qui, elle,
             fonctionne sans réseau. C'est le correctif du 16/08.
             ⚠️ NE PAS remettre un `c.put()` inconditionnel ici. */
          caches.open(CACHE).then(async function(c){
            try{
              if(await pageComplete(copie, c)) await c.put(req, copie);
            }catch(e2){}
          });
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
