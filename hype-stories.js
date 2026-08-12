/* ============================================================================
   HYPE ▸ hype-stories.js — v2 — SESSION 115 (12/08/2026)

   LES STORIES DES CAVALIERS.
   Visibles par tous les cavaliers, connus et inconnus. Durée de vie 7 jours.
   « Garder en souvenir » range la photo dans l'album Hype Memories du
   cavalier. Bandeau sur 4 pages : Cavalier, Communauté, Club, Écurie.

   NOUVEAU EN v2 (demandes de Blandine du 12/08 au soir)
   1. Le rond du bandeau montre **la photo de la story**, plus l'avatar du
      cavalier. C'était une faute de ma part en v1 : l'avatar passait devant.
   2. Ronds à 104 px au lieu de 62 (« le plus gros possible »).
   3. Le « + » dit « Ajouter » — en v1 le libellé « Ma story » était écrit
      deux fois côte à côte.
   4. **Taguer un cavalier ou un cheval**, sur le système d'identifications
      DÉJÀ présent dans Hype (table `identifications`, indexée par
      `photo_url`) : aucune table nouvelle, et la personne taguée accepte
      avant que son nom apparaisse — c'est le comportement existant, on ne le
      réinvente pas.
   5. **Un lieu** sur la story (colonne `lieu`, 60 caractères). Volontairement
      court et libre : on veut « Écurie Feinn » ou « Itteville », pas une
      adresse. Un fil ouvert aux inconnus avec des enfants parmi les
      utilisateurs ne doit pas porter de position précise.

   RÈGLE DE VERSION : à chaque livraison, incrémenter HYPE_STORIES_VERSION ici
   ET le ?v= de la balise dans index.html.

   ⚠️ CE FICHIER A ÉTÉ INTÉGRALEMENT RÉGÉNÉRÉ en v2, après un incident : la
   copie de travail de la v1 avait grossi de 3 361 octets sans que je puisse
   en rendre compte. Contenu maîtrisé ligne par ligne, plutôt que rafistolé.

   DESIGN BIBLE
   - AUCUN filtre, voile ni dégradé sur une photo. La visionneuse pose la photo
     nue sur du noir absolu ; en-tête au-dessus, légende et actions en dessous
     sur surfaces givrées. C'est la raison de cette mise en page.
   - Palette : #060709, #111417, #20D9F5, #F4F7FA, gris froid.
   - La lumière turquoise guide : liseré turquoise = non vue, gris = déjà vue.

   MODÉRATION : décision de Blandine du 12/08, « plus tard ». Sont en place, et
   rien de plus : le filtre `blocages` à la lecture (aucune interface) et un
   bouton « Signaler » (DÉDUCTION DE CLAUDE — À VALIDER, motif : l'App Store
   refuse un flux public sans moyen de signalement).
============================================================================ */

var HYPE_STORIES_VERSION = "3";
try { if (typeof window !== "undefined") window.HYPE_STORIES_VERSION = HYPE_STORIES_VERSION; } catch (eV) { }

/* Durée de vie : 7 jours (décision de Blandine). */
var HS_JOURS = 7;
var HS_DUREE_MS = HS_JOURS * 24 * 60 * 60 * 1000;
/* Défilement automatique d'une story dans la visionneuse. */
var HS_DUREE_VUE_MS = 6000;
var HS_LEGENDE_MAX = 140;
/* Lieu volontairement court : un nom de club ou de ville, pas une adresse. */
var HS_LIEU_MAX = 60;
/* Taille des ronds. 104 px = 3 ronds visibles sur un iPhone. Blandine a
   demandé « le plus gros possible » ; au-delà de 104 on ne voit plus qu'un
   rond et demi et le bandeau cesse d'être un bandeau.
   DÉDUCTION DE CLAUDE sur la valeur exacte — À VALIDER. */
var HS_TAILLE_ROND = 104;
/* Sur MA COMMUNAUTÉ, le bandeau passe en RECTANGLES VERTICAUX (décision de
   Blandine du 12/08). Deux raisons, dans cet ordre :
   1. Un rond rogne énormément — encolure, cheval de profil, cavalier en pied :
      le cercle coupe tout. Un 3:4 montre la photo à peu près telle qu'elle a
      été prise, ce qui va dans le sens de la règle absolue du projet sur les
      photos. Sur Communauté on découvre des inconnus : c'est l'IMAGE qui
      compte. Sur Cavalier / Club / Écurie on sait déjà de qui il s'agit : le
      rond suffit, c'est un repère d'identité.
   2. 116 × 145 est EXACTEMENT le format des cartes chevaux de l'Écurie et de
      l'agenda du club. La page garde un seul rythme visuel au lieu d'en
      inventer un.
   Un seul composant, un réglage de forme : aucune divergence possible. */
var HS_CARTE_L = 116;
var HS_CARTE_H = 145;
/* Nom de l'album de destination des souvenirs (DÉDUCTION DE CLAUDE — À VALIDER). */
var HS_ALBUM_NOM = "Mes stories";

/* ---------------------------------------------------------------------------
   1. LES VUES — dans le localStorage, PAS en base.
   Une table de vues aurait voulu une ligne par cavalier et par story, donc de
   la RLS et une écriture à chaque ouverture, pour un simple confort
   d'affichage local. On ne stocke que des identifiants — jamais d'image.
--------------------------------------------------------------------------- */
var HS_CLE_VUES = "hype_stories_vues";
function hsVues() {
  try {
    var b = localStorage.getItem(HS_CLE_VUES);
    if (!b) return {};
    var o = JSON.parse(b);
    return (o && typeof o === "object") ? o : {};
  } catch (e) { return {}; }
}
function hsMarquerVue(id) {
  if (!id) return;
  try {
    var o = hsVues();
    o[String(id)] = Date.now();
    /* Ménage : au-delà de 400 identifiants on ne garde que les 300 plus
       récents, sinon la clé gonfle indéfiniment. */
    var cles = Object.keys(o);
    if (cles.length > 400) {
      cles.sort(function (a, b) { return o[b] - o[a]; });
      var g = {};
      for (var i = 0; i < 300; i++) { g[cles[i]] = o[cles[i]]; }
      o = g;
    }
    localStorage.setItem(HS_CLE_VUES, JSON.stringify(o));
  } catch (e) { }
}

/* ---------------------------------------------------------------------------
   2. LECTURE / ÉCRITURE
--------------------------------------------------------------------------- */

/* Publie une story.
   tags = [{ type: "cavalier"|"cheval", id, nom }] — posés APRÈS l'insertion,
   via le système d'identifications existant. Un tag qui échoue ne fait pas
   échouer la publication : la story est déjà en ligne, on ne la perd pas
   pour un nom mal enregistré. */
async function hsPublierStory(fichier, legende, lieu, tags) {
  try {
    if (typeof supa === "undefined" || !supa) return { data: null, error: "indisponible" };
    var user = await utilisateurActuel();
    if (!user) return { data: null, error: "Pas connecté" };

    var r = await envoyerPhoto(fichier);
    if (r.error || !r.url) return { data: null, error: r.error || "Envoi impossible" };

    var ecurie = null;
    try { ecurie = await monEcurieNom(); } catch (eE) { ecurie = null; }
    if (ecurie === "__perso__") ecurie = null;

    var ligne = {
      user_id: user.id,
      photo_url: r.url,
      legende: (legende ? String(legende).slice(0, HS_LEGENDE_MAX) : null),
      ecurie: ecurie,
      expire_le: new Date(Date.now() + HS_DUREE_MS).toISOString()
    };
    var lieuNet = (lieu ? String(lieu).trim().slice(0, HS_LIEU_MAX) : "");
    if (lieuNet) ligne.lieu = lieuNet;

    var res = await supa.from("hype_stories").insert(ligne).select().single();
    if (res && res.error) {
      /* Repli : si la colonne `lieu` n'existe pas encore en base (SQL de la
         v2 pas repassé), on republie sans le lieu plutôt que d'échouer. Le
         message est explicite pour que l'oubli se voie. */
      if (lieuNet) {
        delete ligne.lieu;
        var res2 = await supa.from("hype_stories").insert(ligne).select().single();
        if (res2 && !res2.error) return { data: res2.data, error: null, lieuIgnore: true };
      }
      return { data: null, error: res.error };
    }

    /* Les tags, un par un, sans bloquer. */
    if (tags && tags.length && typeof identifierSouvenir === "function") {
      for (var i = 0; i < tags.length; i++) {
        var t = tags[i];
        if (!t || !t.id) continue;
        try { await identifierSouvenir(r.url, t.type || "cavalier", t.id, t.nom || null); } catch (eT) { }
      }
    }
    return { data: res.data, error: null };
  } catch (e) { return { data: null, error: String(e) }; }
}

async function hsSupprimerStory(id) {
  try {
    if (typeof supa === "undefined" || !supa) return { error: "indisponible" };
    var user = await utilisateurActuel();
    if (!user) return { error: "Pas connecté" };
    return await supa.from("hype_stories").delete().eq("id", id).eq("user_id", user.id);
  } catch (e) { return { error: String(e) }; }
}

async function hsSignalerStory(id, motif) {
  try {
    if (typeof supa === "undefined" || !supa) return { error: "indisponible" };
    var user = await utilisateurActuel();
    if (!user) return { error: "Pas connecté" };
    return await supa.from("hype_stories_signalements").insert({
      story_id: id, signale_par: user.id, motif: String(motif || "").slice(0, 500)
    });
  } catch (e) { return { error: String(e) }; }
}

/* Les tags posés SUR une story. La table `identifications` est indexée par
   `photo_url` : une story a une photo_url, donc rien à créer.
   Les helpers existants (identificationsPour) répondent à la question
   inverse — « où suis-je tagué ? ». Ici on veut « qui est sur cette photo ? ». */
async function hsTagsDeStory(photoUrl) {
  try {
    if (typeof supa === "undefined" || !supa || !photoUrl) return { data: [], error: null };
    var r = await supa.from("identifications").select("*").eq("photo_url", photoUrl);
    return { data: (r && r.data) || [], error: (r && r.error) || null };
  } catch (e) { return { data: [], error: String(e) }; }
}

/* Les identifiants avec qui il y a un blocage, dans un sens ou dans l'autre.
   Deux requêtes pour toute la liste, et non un aller-retour par cavalier :
   le bandeau peut afficher trente auteurs. */
async function hsIdsBloques() {
  var ens = {};
  try {
    if (typeof supa === "undefined" || !supa) return ens;
    var user = await utilisateurActuel();
    if (!user) return ens;
    var a = await supa.from("blocages").select("utilisateur_bloque").eq("bloque_par", user.id);
    ((a && a.data) || []).forEach(function (l) { if (l && l.utilisateur_bloque) ens[l.utilisateur_bloque] = true; });
    var b = await supa.from("blocages").select("bloque_par").eq("utilisateur_bloque", user.id);
    ((b && b.data) || []).forEach(function (l) { if (l && l.bloque_par) ens[l.bloque_par] = true; });
  } catch (e) { }
  return ens;
}

/* Lit les stories vivantes et les regroupe par auteur.
   ORDRE : moi, puis mon écurie, puis les cavaliers que je suis, puis tous les
   autres. L'ouverture à tous change le PÉRIMÈTRE, pas l'ordre : « en priorité
   les cavaliers qui les entourent » reste vrai. */
async function hsListerStories() {
  try {
    if (typeof supa === "undefined" || !supa) return { data: [], moiId: null, error: "indisponible" };
    var user = null;
    try { user = await utilisateurActuel(); } catch (eU) { user = null; }
    var moiId = user ? user.id : null;

    var r = await supa.from("hype_stories").select("*")
      .gt("expire_le", new Date().toISOString())
      .order("created_at", { ascending: false }).limit(300);
    if (r && r.error) return { data: [], moiId: moiId, error: r.error };
    var lignes = (r && r.data) || [];
    if (!lignes.length) return { data: [], moiId: moiId, error: null };

    var bloques = await hsIdsBloques();
    lignes = lignes.filter(function (s) { return s && s.user_id && !bloques[s.user_id]; });
    if (!lignes.length) return { data: [], moiId: moiId, error: null };

    var ids = []; var vu = {};
    lignes.forEach(function (s) { if (!vu[s.user_id]) { vu[s.user_id] = true; ids.push(s.user_id); } });
    var parId = {};
    try {
      var rp = await supa.from("profiles").select("id, pseudo, avatar_url, ecurie").in("id", ids);
      ((rp && rp.data) || []).forEach(function (p) { parId[p.id] = p; });
    } catch (eP) { }

    var monEcurie = null;
    try { monEcurie = await monEcurieNom(); } catch (eM) { monEcurie = null; }
    var noyauMoi = "";
    try {
      noyauMoi = (monEcurie && monEcurie !== "__perso__" && typeof noyauEcurie === "function") ? noyauEcurie(monEcurie) : "";
    } catch (eN) { noyauMoi = ""; }

    var suivis = {};
    try {
      if (moiId) {
        var rs = await supa.from("follows").select("followed_id").eq("follower_id", moiId);
        ((rs && rs.data) || []).forEach(function (l) { if (l && l.followed_id) suivis[l.followed_id] = true; });
      }
    } catch (eS) { }

    var vues = hsVues();
    var groupes = []; var index = {};
    lignes.forEach(function (s) {
      var g = index[s.user_id];
      if (!g) {
        var prof = parId[s.user_id] || {};
        var ecA = prof.ecurie || s.ecurie || "";
        var noyauA = "";
        try { noyauA = (ecA && typeof noyauEcurie === "function") ? noyauEcurie(ecA) : ""; } catch (eNA) { noyauA = ""; }
        g = {
          user_id: s.user_id,
          pseudo: prof.pseudo || "Cavalier",
          avatar_url: prof.avatar_url || null,
          ecurie: ecA,
          moi: !!(moiId && s.user_id === moiId),
          memeEcurie: !!(noyauMoi && noyauA && noyauMoi === noyauA),
          suivi: !!suivis[s.user_id],
          stories: []
        };
        index[s.user_id] = g;
        groupes.push(g);
      }
      g.stories.push(s);
    });

    groupes.forEach(function (g) {
      /* Dans un groupe on lit de la plus ancienne à la plus récente. */
      g.stories.sort(function (a, b) { return String(a.created_at) < String(b.created_at) ? -1 : 1; });
      g.toutesVues = g.stories.every(function (s) { return !!vues[String(s.id)]; });
      g.rang = g.moi ? 0 : (g.memeEcurie ? 1 : (g.suivi ? 2 : 3));
      g.dernier = g.stories[g.stories.length - 1].created_at || "";
    });
    groupes.sort(function (a, b) {
      if (a.rang !== b.rang) return a.rang - b.rang;
      if (a.toutesVues !== b.toutesVues) return a.toutesVues ? 1 : -1;
      return String(a.dernier) < String(b.dernier) ? 1 : -1;
    });

    return { data: groupes, moiId: moiId, error: null };
  } catch (e) { return { data: [], moiId: null, error: String(e) }; }
}

/* ---------------------------------------------------------------------------
   LES STORIES À LA UNE
   Demande de Blandine du 12/08 : « on peut garder en mémoire les story en
   faisant des story à la une comme insta ? ».

   AUCUNE TABLE NOUVELLE. Hype a déjà des albums nommés (`albums_cheval`) avec
   couverture, indicateur `promu` et visibilité. Une à la une, c'est un album
   de cible « cavalier:<id> » affiché en rond. Deux conséquences heureuses :
   - les albums sont PUBLICS par défaut (modèle opt-out du 02/08, filtré à un
     seul endroit dans `listerAlbumsCheval`) : une à la une posée sur ta page
     est bien vue par les autres, et tu peux la passer en privé ;
   - la purge des 7 jours ne supprime pas le fichier du bucket — c'est
     précisément ce qui permet à une story de survivre dans une à la une.

   Les albums « automatiques » (marqués __auto ou __lecture par l'application)
   sont écartés : ce ne sont pas des à la une, ce sont des vues calculées. */
async function hsListerALaUne(userId) {
  try {
    if (typeof supa === "undefined" || !supa) return { data: [], error: null };
    var cible = null;
    if (userId) cible = "cavalier:" + userId;
    else {
      var u = await utilisateurActuel();
      if (!u) return { data: [], error: null };
      cible = "cavalier:" + u.id;
    }
    if (typeof listerAlbumsCheval !== "function") return { data: [], error: null };
    var r = await listerAlbumsCheval(cible);
    var liste = ((r && r.data) || []).filter(function (a) {
      return a && !a.__auto && !a.__lecture && (a.photos || []).length > 0;
    });
    /* Les à la une promues d'abord, puis les plus récentes. */
    liste.sort(function (a, b) {
      var pa = a.promu ? 0 : 1, pb = b.promu ? 0 : 1;
      if (pa !== pb) return pa - pb;
      return String(a.created_at) < String(b.created_at) ? 1 : -1;
    });
    return { data: liste, error: null };
  } catch (e) { return { data: [], error: String(e) }; }
}

/* Mes à la une, pour le choix de destination au moment de garder une story.
   Contrairement à hsListerALaUne, on garde ici les albums VIDES : un album
   fraîchement créé doit rester proposé. */
async function hsMesALaUnePourRanger() {
  try {
    if (typeof supa === "undefined" || !supa) return { data: [], error: null };
    var u = await utilisateurActuel();
    if (!u) return { data: [], error: null };
    if (typeof listerAlbumsCheval !== "function") return { data: [], error: null };
    var r = await listerAlbumsCheval("cavalier:" + u.id);
    var liste = ((r && r.data) || []).filter(function (a) {
      return a && a.user_id === u.id && !a.__auto && !a.__lecture;
    });
    return { data: liste, error: null };
  } catch (e) { return { data: [], error: String(e) }; }
}

/* « Garder » : la photo rejoint une À LA UNE choisie par le cavalier.
   destination = { albumId } pour une à la une existante,
                 { nouveau: "Nom" } pour en créer une.
   Sans destination, on retombe sur l'album HS_ALBUM_NOM — c'est le
   comportement de la v1 et v2, conservé pour ne rien casser des stories déjà
   gardées hier soir.
   Le plafond gratuit de 20 photos par album est respecté, comme partout. */
async function hsGarderEnSouvenir(story, premium, destination) {
  try {
    if (typeof supa === "undefined" || !supa) return { error: "indisponible" };
    var user = await utilisateurActuel();
    if (!user) return { error: "Pas connecté" };
    if (!story || !story.photo_url) return { error: "Photo absente" };
    if (story.user_id !== user.id) return { error: "Ce n'est pas ta story" };

    var cible = "cavalier:" + user.id;
    var alb = null;

    if (destination && destination.albumId) {
      try {
        var rl0 = await listerAlbumsCheval(cible);
        alb = ((rl0 && rl0.data) || []).filter(function (a) {
          return a && String(a.id) === String(destination.albumId) && a.user_id === user.id;
        })[0] || null;
      } catch (eL0) { alb = null; }
      if (!alb) return { error: "\u00c0 la une introuvable" };
    } else {
      var nom = (destination && destination.nouveau) ? String(destination.nouveau).trim().slice(0, 40) : HS_ALBUM_NOM;
      if (!nom) nom = HS_ALBUM_NOM;
      try {
        var rl = await listerAlbumsCheval(cible);
        alb = ((rl && rl.data) || []).filter(function (a) {
          return a && a.user_id === user.id && String(a.nom || "") === nom;
        })[0] || null;
      } catch (eL) { alb = null; }
      if (!alb) {
        var rc = await creerAlbumCheval(cible, nom);
        if (rc && rc.error) return { error: rc.error };
        alb = rc && rc.data;
      }
    }
    if (!alb) return { error: "Album indisponible" };

    var photos = (alb.photos || []).slice();
    if (photos.indexOf(story.photo_url) >= 0) return { deja: true, error: null };
    if (!premium && photos.length >= 20) return { error: "quota" };
    photos.push(story.photo_url);

    var champs = { photos: photos };
    /* Première photo d'une à la une neuve : elle en devient la couverture. */
    if (!alb.couverture && photos.length === 1) champs.couverture = story.photo_url;

    var rm = await majAlbumCheval(alb.id, champs);
    if (rm && rm.error) return { error: rm.error };
    try { await supa.from("hype_stories").update({ garde: true }).eq("id", story.id).eq("user_id", user.id); } catch (eG) { }
    return { error: null, nom: alb.nom || "" };
  } catch (e) { return { error: String(e) }; }
}

try {
  if (typeof window !== "undefined") {
    window.hsPublierStory = hsPublierStory;
    window.hsListerStories = hsListerStories;
    window.hsSupprimerStory = hsSupprimerStory;
    window.hsSignalerStory = hsSignalerStory;
    window.hsGarderEnSouvenir = hsGarderEnSouvenir;
    window.hsTagsDeStory = hsTagsDeStory;
    window.hsListerALaUne = hsListerALaUne;
    window.hsMesALaUnePourRanger = hsMesALaUnePourRanger;
    window.hsMarquerVue = hsMarquerVue;
  }
} catch (eW) { }

/* ---------------------------------------------------------------------------
   3. TEXTES — six langues (FR/EN/ES/IT/JA/DE), règle du projet.
--------------------------------------------------------------------------- */
var HS_TXT = {
  ma: { fr: "Ma story", en: "My story", es: "Mi story", it: "La mia story", ja: "マイストーリー", de: "Meine Story" },
  ajouterCourt: { fr: "Ajouter", en: "Add", es: "A\u00f1adir", it: "Aggiungi", ja: "追加", de: "Hinzuf\u00fcgen" },
  ajouter: { fr: "Ajouter une story", en: "Add a story", es: "A\u00f1adir una story", it: "Aggiungi una story", ja: "ストーリーを追加", de: "Story hinzuf\u00fcgen" },
  legende: { fr: "Une l\u00e9gende (facultatif)\u2026", en: "A caption (optional)\u2026", es: "Un pie de foto (opcional)\u2026", it: "Una didascalia (facoltativa)\u2026", ja: "キャプション（任意）…", de: "Eine Bildunterschrift (optional)\u2026" },
  lieuChamp: { fr: "Le club, la ville\u2026", en: "Club, town\u2026", es: "El club, la ciudad\u2026", it: "Il club, la citt\u00e0\u2026", ja: "クラブ、町…", de: "Verein, Stadt\u2026" },
  lieuTitre: { fr: "Le lieu", en: "Location", es: "El lugar", it: "Il luogo", ja: "場所", de: "Der Ort" },
  taguerTitre: { fr: "Taguer", en: "Tag", es: "Etiquetar", it: "Tagga", ja: "タグ付け", de: "Markieren" },
  chercherCav: { fr: "Chercher un cavalier\u2026", en: "Search a rider\u2026", es: "Buscar un jinete\u2026", it: "Cerca un cavaliere\u2026", ja: "ライダーを検索…", de: "Reiter suchen\u2026" },
  mesChevaux: { fr: "Mes chevaux", en: "My horses", es: "Mis caballos", it: "I miei cavalli", ja: "私の馬", de: "Meine Pferde" },
  aucunResultat: { fr: "Aucun r\u00e9sultat", en: "No result", es: "Sin resultados", it: "Nessun risultato", ja: "結果なし", de: "Kein Ergebnis" },
  tagAvis: { fr: "La personne tagu\u00e9e accepte avant que son nom apparaisse.", en: "The tagged person accepts before their name shows.", es: "La persona etiquetada acepta antes de que aparezca su nombre.", it: "La persona taggata accetta prima che il nome appaia.", ja: "タグ付けされた人が承認するまで名前は表示されません。", de: "Die markierte Person best\u00e4tigt, bevor ihr Name erscheint." },
  enAttente: { fr: "en attente", en: "pending", es: "pendiente", it: "in attesa", ja: "承認待ち", de: "ausstehend" },
  publier: { fr: "Publier", en: "Publish", es: "Publicar", it: "Pubblica", ja: "投稿する", de: "Ver\u00f6ffentlichen" },
  annuler: { fr: "Annuler", en: "Cancel", es: "Cancelar", it: "Annulla", ja: "キャンセル", de: "Abbrechen" },
  envoi: { fr: "Envoi\u2026", en: "Uploading\u2026", es: "Enviando\u2026", it: "Invio\u2026", ja: "送信中…", de: "Wird gesendet\u2026" },
  duree: { fr: "Visible 7 jours par tous les cavaliers.", en: "Visible for 7 days to all riders.", es: "Visible 7 d\u00edas para todos los jinetes.", it: "Visibile 7 giorni a tutti i cavalieri.", ja: "7日間、すべての騎手に表示されます。", de: "7 Tage f\u00fcr alle Reiter sichtbar." },
  garder: { fr: "Garder en souvenir", en: "Keep as a memory", es: "Guardar como recuerdo", it: "Conserva come ricordo", ja: "思い出として保存", de: "Als Erinnerung behalten" },
  gardee: { fr: "Gard\u00e9e \u2713", en: "Kept \u2713", es: "Guardada \u2713", it: "Conservata \u2713", ja: "保存しました \u2713", de: "Behalten \u2713" },
  supprimer: { fr: "Supprimer", en: "Delete", es: "Eliminar", it: "Elimina", ja: "削除", de: "L\u00f6schen" },
  signaler: { fr: "Signaler", en: "Report", es: "Denunciar", it: "Segnala", ja: "報告する", de: "Melden" },
  signale: { fr: "Signal\u00e9e \u2713", en: "Reported \u2713", es: "Denunciada \u2713", it: "Segnalata \u2713", ja: "報告しました \u2713", de: "Gemeldet \u2713" },
  quota: { fr: "Limite de 20 photos par album en gratuit \u2014 passe Premium pour aller plus loin.", en: "20 photos per album on the free plan \u2014 go Premium for more.", es: "L\u00edmite de 20 fotos por \u00e1lbum en gratuito.", it: "Limite di 20 foto per album nel piano gratuito.", ja: "無料プランではアルバムごとに20枚までです。", de: "20 Fotos pro Album im Gratis-Plan." },
  echec: { fr: "Enregistrement impossible \u2014 v\u00e9rifie ta connexion.", en: "Could not save \u2014 check your connection.", es: "No se pudo guardar.", it: "Salvataggio non riuscito.", ja: "保存できませんでした。", de: "Speichern nicht m\u00f6glich." },
  ajoutee: { fr: "Ta story est en ligne.", en: "Your story is live.", es: "Tu story est\u00e1 publicada.", it: "La tua story \u00e8 online.", ja: "ストーリーを公開しました。", de: "Deine Story ist online." },
  lieuIgnore: { fr: "Story en ligne, mais le lieu n'a pas \u00e9t\u00e9 enregistr\u00e9 (SQL v2 \u00e0 repasser).", en: "Story live, but the location was not saved.", es: "Story publicada, pero el lugar no se guard\u00f3.", it: "Story online, ma il luogo non \u00e8 stato salvato.", ja: "ストーリーは公開されましたが、場所は保存されませんでした。", de: "Story online, aber der Ort wurde nicht gespeichert." },
  connecte: { fr: "Connecte-toi pour publier une story.", en: "Sign in to post a story.", es: "Inicia sesi\u00f3n para publicar.", it: "Accedi per pubblicare.", ja: "投稿するにはログインしてください。", de: "Melde dich an, um zu ver\u00f6ffentlichen." },
  aLaUne: { fr: "\u00c0 la une", en: "Highlights", es: "Destacadas", it: "In evidenza", ja: "\u30cf\u30a4\u30e9\u30a4\u30c8", de: "Highlights" },
  rangerOu: { fr: "Ranger dans quelle \u00e0 la une ?", en: "Save to which highlight?", es: "\u00bfEn qu\u00e9 destacada?", it: "In quale in evidenza?", ja: "\u3069\u306e\u30cf\u30a4\u30e9\u30a4\u30c8\u306b\u4fdd\u5b58\u3057\u307e\u3059\u304b\uff1f", de: "In welches Highlight?" },
  nouvelleUne: { fr: "Nouvelle \u00e0 la une", en: "New highlight", es: "Nueva destacada", it: "Nuova in evidenza", ja: "\u65b0\u3057\u3044\u30cf\u30a4\u30e9\u30a4\u30c8", de: "Neues Highlight" },
  nomUne: { fr: "Son nom (Concours, Apy, \u00c9t\u00e9\u2026)", en: "Its name (Shows, Apy, Summer\u2026)", es: "Su nombre (Concursos, Apy, Verano\u2026)", it: "Il suo nome (Concorsi, Apy, Estate\u2026)", ja: "\u540d\u524d\uff08\u5927\u4f1a\u3001\u30a2\u30d4\u30fc\u3001\u590f\u2026\uff09", de: "Sein Name (Turniere, Apy, Sommer\u2026)" },
  creer: { fr: "Cr\u00e9er", en: "Create", es: "Crear", it: "Crea", ja: "\u4f5c\u6210", de: "Erstellen" },
  rangee: { fr: "Rang\u00e9e dans ", en: "Saved to ", es: "Guardada en ", it: "Salvata in ", ja: "\u4fdd\u5b58\u3057\u307e\u3057\u305f\uff1a", de: "Gespeichert in " },
  uneIntrouvable: { fr: "\u00c0 la une introuvable.", en: "Highlight not found.", es: "Destacada no encontrada.", it: "In evidenza non trovata.", ja: "\u30cf\u30a4\u30e9\u30a4\u30c8\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3002", de: "Highlight nicht gefunden." },
  videUne: { fr: "Aucune \u00e0 la une pour l'instant.", en: "No highlight yet.", es: "Sin destacadas por ahora.", it: "Nessuna in evidenza per ora.", ja: "\u307e\u3060\u30cf\u30a4\u30e9\u30a4\u30c8\u306f\u3042\u308a\u307e\u305b\u3093\u3002", de: "Noch keine Highlights." },
  photoIndispo: { fr: "Photo indisponible", en: "Photo unavailable", es: "Foto no disponible", it: "Foto non disponibile", ja: "写真を読み込めません", de: "Foto nicht verfügbar" },
  maintenant: { fr: "\u00e0 l'instant", en: "just now", es: "ahora mismo", it: "adesso", ja: "たった今", de: "gerade eben" },
  ilYa: { fr: "il y a ", en: "", es: "hace ", it: "", ja: "", de: "vor " },
  jour: { fr: " j", en: "d ago", es: " d", it: " g", ja: "日前", de: " T" },
  heure: { fr: " h", en: "h ago", es: " h", it: " h", ja: "時間前", de: " Std." },
  min: { fr: " min", en: "min ago", es: " min", it: " min", ja: "分前", de: " Min." }
};
function hsT(cle, lg) {
  var o = HS_TXT[cle] || {};
  var l = lg || "fr";
  /* Certaines valeurs sont VOLONTAIREMENT vides (le préfixe « il y a » n'existe
     ni en anglais ni en japonais). Un test de véracité les ferait retomber sur
     le français et produirait « il y a 2d ago ». On teste la PRÉSENCE de la
     clé, pas sa valeur. */
  if (Object.prototype.hasOwnProperty.call(o, l)) return o[l];
  if (Object.prototype.hasOwnProperty.call(o, "fr")) return o.fr;
  return "";
}
function hsTempsRelatif(iso, lg) {
  try {
    var d = new Date(iso).getTime();
    if (!d) return "";
    var ecart = Date.now() - d;
    if (ecart < 60000) return hsT("maintenant", lg);
    var min = Math.floor(ecart / 60000);
    if (min < 60) return hsT("ilYa", lg) + min + hsT("min", lg);
    var hh = Math.floor(min / 60);
    if (hh < 24) return hsT("ilYa", lg) + hh + hsT("heure", lg);
    var jj = Math.floor(hh / 24);
    return hsT("ilYa", lg) + jj + hsT("jour", lg);
  } catch (e) { return ""; }
}

/* ---------------------------------------------------------------------------
   4. LE BANDEAU — un composant, quatre appels.
--------------------------------------------------------------------------- */
function BandeauStories(props) {
  var h = React.createElement;
  var app = (typeof useApp === "function") ? useApp() : {};
  var lg = (app && app.langue) || "fr";
  var premium = !!(app && app.premium);
  var M = "'Montserrat',sans-serif", C = "'Cinzel',Georgia,serif";
  var th = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { principal: "#20D9F5", lumineux: "#5FE9F0" };
  var tn = th.principal, tnL = th.lumineux;
  function tA(a) { return (typeof teinteRGBA === "function") ? teinteRGBA(tn, a) : ("rgba(32,217,245," + a + ")"); }

  var gS = React.useState([]), groupes = gS[0], setGroupes = gS[1];
  var mS = React.useState(null), moiId = mS[0], setMoiId = mS[1];
  var oS = React.useState(-1), ouvert = oS[0], setOuvert = oS[1];
  var cS = React.useState(false), composer = cS[0], setComposer = cS[1];
  var fS = React.useState(null), fichier = fS[0], setFichier = fS[1];
  var tS = React.useState(null), toast = tS[0], setToast = tS[1];
  var fileRef = React.useRef(null);
  var vivantRef = React.useRef(true);

  function bip(txt) { setToast(txt); try { setTimeout(function () { setToast(null); }, 3200); } catch (e) { } }

  function charger() {
    if (typeof hsListerStories !== "function") return;
    hsListerStories().then(function (r) {
      if (!vivantRef.current) return;
      setGroupes((r && r.data) || []);
      setMoiId((r && r.moiId) || null);
    });
  }
  React.useEffect(function () {
    vivantRef.current = true;
    charger();
    return function () { vivantRef.current = false; };
  }, []);

  function choisirFichier() {
    if (!moiId) { bip(hsT("connecte", lg)); return; }
    try { fileRef.current && fileRef.current.click(); } catch (e) { }
  }
  function surFichier(ev) {
    try {
      var f = ev && ev.target && ev.target.files && ev.target.files[0];
      if (f) { setFichier(f); setComposer(true); }
      if (ev && ev.target) ev.target.value = "";
    } catch (e) { }
  }

  var T = (props && props.taille) || HS_TAILLE_ROND;
  var LARGEUR = T + 12;
  /* FORME : "rond" par défaut (Cavalier, Club, Écurie) ou "carte" (Communauté).
     Le choix est passé par la page appelante, pas décidé ici : un seul
     composant, deux présentations, zéro divergence. */
  var carte = !!(props && props.forme === "carte");
  var CL = (props && props.carteL) || HS_CARTE_L;
  var CH_ = (props && props.carteH) || HS_CARTE_H;

  /* Une cellule du bandeau.
     v2 : c'est LA PHOTO DE LA STORY qui s'affiche. L'avatar ne sert que de
     secours quand la story n'a pas d'image lisible.
     En forme RONDE, le liseré est un anneau EXTÉRIEUR (padding du conteneur).
     En forme CARTE, c'est un contour lumineux. Dans les deux cas, jamais un
     voile posé sur la photo. */
  function rond(g, i) {
    var derniere = g.stories[g.stories.length - 1];
    var apercu = (derniere && derniere.photo_url) || g.avatar_url || null;
    var initiale = h("span", { style: { fontFamily: C, fontSize: carte ? 26 : 30, fontWeight: 700, color: tnL } }, String(g.pseudo || "?").charAt(0).toUpperCase());
    var photo = apercu
      ? h("img", { src: apercu, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
      : initiale;
    var pastille = (g.stories.length > 1)
      ? h("div", { style: { position: "absolute", right: carte ? 6 : 1, bottom: carte ? 6 : 1, minWidth: 21, height: 21, padding: "0 5px", borderRadius: 999, background: "rgba(6,7,9,0.88)", border: "1px solid " + tA(0.6), color: tnL, fontSize: 10.5, fontWeight: 800, fontFamily: M, display: "flex", alignItems: "center", justifyContent: "center" } }, String(g.stories.length))
      : null;

    var visuel;
    if (carte) {
      visuel = h("div", {
        style: {
          position: "relative", width: CL, height: CH_, borderRadius: 16, overflow: "hidden",
          background: "#111417", display: "flex", alignItems: "center", justifyContent: "center",
          border: "1px solid " + (g.toutesVues ? "rgba(255,255,255,0.14)" : tA(0.72)),
          boxShadow: g.toutesVues ? "none" : ("0 0 16px " + tA(0.26) + ", inset 0 0 0 1px " + tA(0.18))
        }
      }, photo, pastille);
    } else {
      visuel = h("div", { style: { position: "relative", width: T, height: T, borderRadius: "50%", margin: "0 auto", padding: 3, background: g.toutesVues ? "rgba(255,255,255,0.16)" : ("linear-gradient(135deg," + tn + "," + tnL + ")"), boxShadow: g.toutesVues ? "none" : ("0 0 18px " + tA(0.32)) } },
        h("div", { style: { width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", border: "2.5px solid #060709", background: "#111417", display: "flex", alignItems: "center", justifyContent: "center" } }, photo),
        pastille);
    }

    return h("button", {
      key: "st" + g.user_id,
      onClick: function () { setOuvert(i); },
      style: { background: "none", border: "none", padding: 0, cursor: "pointer", flex: "0 0 auto", width: carte ? CL : LARGEUR, textAlign: carte ? "left" : "center" }
    },
      visuel,
      h("div", { style: { fontSize: 11, marginTop: 7, fontFamily: M, fontWeight: g.toutesVues ? 500 : 700, color: g.toutesVues ? "#8A929C" : "#E4ECEF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
        g.moi ? hsT("ma", lg) : (g.pseudo || "Cavalier")));
  }

  /* Le bouton d'ajout. Libellé « Ajouter » : en v1 il disait « Ma story »,
     exactement comme le rond voisin, et le mot était écrit deux fois. */
  function rondAjout() {
    var creux = h("span", { style: { fontSize: carte ? 30 : 34, lineHeight: 1, color: tnL, fontWeight: 300 } }, "+");
    var visuel = carte
      ? h("div", { style: { width: CL, height: CH_, borderRadius: 16, border: "1px dashed " + tA(0.55), background: "rgba(17,20,23,0.85)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 26px rgba(32,217,245,0.06)" } }, creux)
      : h("div", { style: { width: T, height: T, borderRadius: "50%", margin: "0 auto", border: "1px dashed " + tA(0.55), background: "rgba(17,20,23,0.85)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 0 26px rgba(32,217,245,0.06)" } }, creux);
    return h("button", {
      key: "stplus",
      onClick: choisirFichier,
      "aria-label": hsT("ajouter", lg),
      style: { background: "none", border: "none", padding: 0, cursor: "pointer", flex: "0 0 auto", width: carte ? CL : LARGEUR, textAlign: carte ? "left" : "center" }
    },
      visuel,
      h("div", { style: { fontSize: 11, marginTop: 7, fontFamily: M, fontWeight: 700, color: tnL, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, hsT("ajouterCourt", lg)));
  }

  var portail = (typeof ReactDOM !== "undefined" && ReactDOM.createPortal) ? ReactDOM.createPortal : function (x) { return x; };

  return h("div", { style: { padding: (props && props.padding) || "16px 0 8px" } },
    h("input", { ref: fileRef, type: "file", accept: "image/*", onChange: surFichier, style: { display: "none" } }),
    h("div", { "data-hscroll": "1", style: { display: "flex", alignItems: "flex-start", gap: 10, overflowX: "auto", overflowY: "hidden", padding: "0 14px 6px", WebkitOverflowScrolling: "touch" } },
      rondAjout(),
      groupes.map(function (g, i) { return rond(g, i); })),

    (ouvert >= 0 && groupes[ouvert])
      ? h(VisionneuseStories, {
        groupes: groupes, depart: ouvert, moiId: moiId, premium: premium, langue: lg,
        onFermer: function () { setOuvert(-1); charger(); }
      })
      : null,

    composer
      ? h(ComposeurStory, {
        fichier: fichier, langue: lg,
        onFermer: function () { setComposer(false); setFichier(null); },
        onPublie: function (lieuIgnore) { setComposer(false); setFichier(null); bip(lieuIgnore ? hsT("lieuIgnore", lg) : hsT("ajoutee", lg)); charger(); },
        onEchec: function () { setComposer(false); setFichier(null); bip(hsT("echec", lg)); }
      })
      : null,

    toast
      ? portail(h("div", { style: { position: "fixed", left: 16, right: 16, bottom: "calc(env(safe-area-inset-bottom) + 96px)", zIndex: 9400, padding: "12px 16px", borderRadius: 14, background: "rgba(9,13,17,0.94)", border: "1px solid " + tA(0.4), color: "#EDF2F5", fontSize: 12.5, fontFamily: M, textAlign: "center", lineHeight: 1.45 } }, toast), document.body)
      : null);
}

/* ---------------------------------------------------------------------------
   5. LE COMPOSEUR — aperçu, légende, lieu, tags.
   La photo d'aperçu est posée NUE sur du noir.
--------------------------------------------------------------------------- */
function ComposeurStory(props) {
  var h = React.createElement;
  var lg = props.langue || "fr";
  var M = "'Montserrat',sans-serif", C = "'Cinzel',Georgia,serif";
  var th = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { principal: "#20D9F5", lumineux: "#5FE9F0" };
  var tn = th.principal, tnL = th.lumineux;
  function tA(a) { return (typeof teinteRGBA === "function") ? teinteRGBA(tn, a) : ("rgba(32,217,245," + a + ")"); }

  var lS = React.useState(""), legende = lS[0], setLegende = lS[1];
  var liS = React.useState(""), lieu = liS[0], setLieu = liS[1];
  var bS = React.useState(false), busy = bS[0], setBusy = bS[1];
  var aS = React.useState(null), apercu = aS[0], setApercu = aS[1];
  var qS = React.useState(""), requete = qS[0], setRequete = qS[1];
  var rS = React.useState([]), resultats = rS[0], setResultats = rS[1];
  var chS = React.useState([]), mesCh = chS[0], setMesCh = chS[1];
  var tgS = React.useState([]), tags = tgS[0], setTags = tgS[1];
  var corpsRef = React.useRef(null);
  var vivantRef = React.useRef(true);

  React.useEffect(function () {
    var url = null;
    try {
      if (props.fichier && window.URL && window.URL.createObjectURL) {
        url = window.URL.createObjectURL(props.fichier);
        setApercu(url);
      }
    } catch (e) { }
    return function () { try { if (url && window.URL && window.URL.revokeObjectURL) window.URL.revokeObjectURL(url); } catch (e2) { } };
  }, [props.fichier]);

  /* RÈGLE DU PROJET : tout panneau défilant est remis en haut à l'ouverture. */
  React.useEffect(function () { try { if (corpsRef.current) corpsRef.current.scrollTop = 0; } catch (e) { } }, []);

  /* Mes chevaux, pour les taguer d'un seul geste. */
  React.useEffect(function () {
    vivantRef.current = true;
    (async function () {
      try {
        var a = (typeof mesChevaux === "function") ? await mesChevaux() : { data: [] };
        var b = (typeof mesChevauxLies === "function") ? await mesChevauxLies() : { data: [] };
        var liste = ((a && a.data) || []).concat((b && b.data) || []);
        var vus = {}; var net = [];
        liste.forEach(function (c) { if (c && c.id && !vus[c.id]) { vus[c.id] = true; net.push(c); } });
        if (vivantRef.current) setMesCh(net.slice(0, 12));
      } catch (e) { }
    })();
    return function () { vivantRef.current = false; };
  }, []);

  /* Recherche de cavaliers, en léger différé pour ne pas requêter à chaque
     lettre tapée. */
  React.useEffect(function () {
    var q = String(requete || "").trim();
    if (q.length < 2) { setResultats([]); return; }
    var minuteur = setTimeout(function () {
      (async function () {
        try {
          if (typeof rechercherCavaliersHype !== "function") { setResultats([]); return; }
          var r = await rechercherCavaliersHype(q, 8);
          if (vivantRef.current) setResultats((r && r.data) || []);
        } catch (e) { }
      })();
    }, 320);
    return function () { clearTimeout(minuteur); };
  }, [requete]);

  function estTague(type, id) {
    return tags.some(function (t) { return t.type === type && String(t.id) === String(id); });
  }
  function basculerTag(type, id, nom) {
    if (estTague(type, id)) {
      setTags(tags.filter(function (t) { return !(t.type === type && String(t.id) === String(id)); }));
      return;
    }
    if (tags.length >= 8) return;
    setTags(tags.concat([{ type: type, id: id, nom: nom || "" }]));
  }

  async function publier() {
    if (busy) return;
    setBusy(true);
    try {
      var r = await hsPublierStory(props.fichier, legende, lieu, tags);
      setBusy(false);
      if (r && r.error) { if (props.onEchec) props.onEchec(); return; }
      if (props.onPublie) props.onPublie(!!(r && r.lieuIgnore));
    } catch (e) {
      setBusy(false);
      if (props.onEchec) props.onEchec();
    }
  }

  function titreBloc(txt) {
    return h("div", { style: { fontSize: 9.5, fontFamily: M, fontWeight: 800, letterSpacing: 1.7, textTransform: "uppercase", color: tA(0.92), margin: "18px 0 8px" } }, txt);
  }

  function puce(actif, libelle, onClick, cle) {
    return h("button", {
      key: cle, onClick: onClick,
      style: {
        padding: "8px 13px", borderRadius: 999, cursor: "pointer", fontFamily: M, fontSize: 12,
        fontWeight: actif ? 800 : 600,
        border: "1px solid " + (actif ? tA(0.7) : "rgba(255,255,255,0.18)"),
        background: actif ? "rgba(32,217,245,0.12)" : "transparent",
        color: actif ? tn : "#C9D3D8", flex: "0 0 auto", maxWidth: "100%",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
      }
    }, (actif ? "\u2713 " : "") + libelle);
  }

  var portail = (typeof ReactDOM !== "undefined" && ReactDOM.createPortal) ? ReactDOM.createPortal : function (x) { return x; };
  return portail(
    h("div", {
      onClick: function () { if (!busy && props.onFermer) props.onFermer(); },
      style: { position: "fixed", inset: 0, zIndex: 9200, background: "rgba(4,6,9,0.86)", display: "flex", alignItems: "flex-end", justifyContent: "center" }
    },
      h("div", {
        onClick: function (e) { if (e && e.stopPropagation) e.stopPropagation(); },
        ref: corpsRef,
        style: { width: "100%", maxWidth: 520, maxHeight: "92vh", overflowY: "auto", borderRadius: "22px 22px 0 0", border: "1px solid " + tA(0.34), borderBottom: "none", background: "linear-gradient(180deg, #111417, #060709)", padding: "18px 16px calc(env(safe-area-inset-bottom) + 18px)" }
      },
        h("div", { style: { width: 44, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.18)", margin: "0 auto 16px" } }),
        h("div", { style: { fontFamily: C, fontSize: 14, letterSpacing: 1.8, textTransform: "uppercase", color: "#F4F7FA", textAlign: "center" } }, hsT("ajouter", lg)),
        h("div", { style: { fontSize: 10.5, fontFamily: M, color: tA(0.9), textAlign: "center", marginTop: 6, letterSpacing: 0.3 } }, hsT("duree", lg)),

        apercu
          ? h("div", { style: { marginTop: 16, borderRadius: 16, overflow: "hidden", background: "#060709", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", maxHeight: "38vh" } },
            h("img", { src: apercu, alt: "", style: { width: "100%", maxHeight: "38vh", objectFit: "contain", display: "block" } }))
          : null,

        h("textarea", {
          value: legende, onChange: function (e) { setLegende(e.target.value); },
          rows: 2, maxLength: HS_LEGENDE_MAX, placeholder: hsT("legende", lg),
          style: { marginTop: 14, width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid " + tA(0.28), color: "#F4F7FA", fontSize: 13.5, fontFamily: M, outline: "none", resize: "none", lineHeight: 1.5 }
        }),

        /* --- LE LIEU --- */
        titreBloc("\uD83D\uDCCD " + hsT("lieuTitre", lg)),
        h("input", {
          value: lieu, onChange: function (e) { setLieu(e.target.value); },
          maxLength: HS_LIEU_MAX, placeholder: hsT("lieuChamp", lg),
          style: { width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid " + tA(0.28), color: "#F4F7FA", fontSize: 13.5, fontFamily: M, outline: "none" }
        }),

        /* --- LES TAGS --- */
        titreBloc(hsT("taguerTitre", lg)),
        h("div", { style: { fontSize: 10.5, fontFamily: M, color: "#8A929C", lineHeight: 1.45, marginBottom: 10 } }, hsT("tagAvis", lg)),

        mesCh.length
          ? h("div", null,
            h("div", { style: { fontSize: 10, fontFamily: M, color: "#8A929C", marginBottom: 7 } }, hsT("mesChevaux", lg)),
            h("div", { "data-hscroll": "1", style: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6 } },
              mesCh.map(function (c) {
                return puce(estTague("cheval", c.id), c.nom || "Cheval", function () { basculerTag("cheval", c.id, c.nom || ""); }, "ch" + c.id);
              })))
          : null,

        h("input", {
          value: requete, onChange: function (e) { setRequete(e.target.value); },
          placeholder: hsT("chercherCav", lg),
          style: { marginTop: 10, width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.16)", color: "#F4F7FA", fontSize: 13.5, fontFamily: M, outline: "none" }
        }),
        (String(requete || "").trim().length >= 2 && !resultats.length)
          ? h("div", { style: { fontSize: 11.5, fontFamily: M, color: "#8A929C", marginTop: 9 } }, hsT("aucunResultat", lg))
          : null,
        resultats.length
          ? h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 } },
            resultats.map(function (p) {
              return puce(estTague("cavalier", p.id), p.pseudo || "Cavalier", function () { basculerTag("cavalier", p.id, p.pseudo || ""); }, "cv" + p.id);
            }))
          : null,
        tags.length
          ? h("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 } },
            tags.map(function (t, i) {
              return puce(true, (t.type === "cheval" ? "\uD83D\uDC0E " : "") + (t.nom || "?"), function () { basculerTag(t.type, t.id, t.nom); }, "tg" + i);
            }))
          : null,

        h("div", { style: { display: "flex", gap: 10, marginTop: 20 } },
          h("button", { onClick: function () { if (!busy && props.onFermer) props.onFermer(); }, style: { flex: 1, padding: "13px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#C9D3D8", fontSize: 13, fontWeight: 700, fontFamily: M, cursor: "pointer" } }, hsT("annuler", lg)),
          h("button", { onClick: publier, disabled: busy, style: { flex: 1.4, padding: "13px 0", borderRadius: 999, border: "none", background: busy ? "rgba(32,217,245,0.35)" : ("linear-gradient(90deg," + tn + "," + tnL + ")"), color: "#04252A", fontSize: 13, fontWeight: 800, fontFamily: M, cursor: busy ? "default" : "pointer" } }, busy ? hsT("envoi", lg) : hsT("publier", lg))))),
    document.body);
}

/* ---------------------------------------------------------------------------
   7. LE RAIL DES À LA UNE
   Sur la page Cavalier : les à la une DU CAVALIER AFFICHÉ (soi-même ou la
   personne visitée) — on vient voir cette page, donc ses à la une.
   Sur Club et Écurie : les à la une du cavalier CONNECTÉ.
   DÉDUCTION DE CLAUDE — À VALIDER : Blandine a dit « Cavalier club et écurie »
   sans préciser de qui, sur le club et l'écurie, les à la une devaient être.
   Le sujet de ces deux pages n'est pas une personne, j'ai donc pris le
   cavalier connecté, ce qui est le moins surprenant.
--------------------------------------------------------------------------- */
function RailALaUne(props) {
  var h = React.createElement;
  var app = (typeof useApp === "function") ? useApp() : {};
  var lg = (app && app.langue) || "fr";
  var M = "'Montserrat',sans-serif", C = "'Cinzel',Georgia,serif";
  var th = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { principal: "#20D9F5", lumineux: "#5FE9F0" };
  var tn = th.principal, tnL = th.lumineux;
  function tA(a) { return (typeof teinteRGBA === "function") ? teinteRGBA(tn, a) : ("rgba(32,217,245," + a + ")"); }

  var uS = React.useState([]), unes = uS[0], setUnes = uS[1];
  var oS = React.useState(null), ouverte = oS[0], setOuverte = oS[1];
  var vivantRef = React.useRef(true);

  React.useEffect(function () {
    vivantRef.current = true;
    if (typeof hsListerALaUne === "function") {
      hsListerALaUne(props && props.userId).then(function (r) {
        if (!vivantRef.current) return;
        setUnes((r && r.data) || []);
      });
    }
    return function () { vivantRef.current = false; };
  }, [(props && props.userId) || ""]);

  /* Rien à montrer : le rail ne s'affiche pas du tout. Une page ne porte pas
     une rangée vide (règle d'espace de la Design Bible). */
  if (!unes.length) return null;

  var T = 74;

  return h("div", { style: { padding: (props && props.padding) || "6px 0 10px" } },
    h("div", { style: { fontSize: 9.5, fontFamily: M, fontWeight: 800, letterSpacing: 1.8, textTransform: "uppercase", color: tA(0.9), padding: "0 16px 9px" } }, hsT("aLaUne", lg)),
    h("div", { "data-hscroll": "1", style: { display: "flex", alignItems: "flex-start", gap: 12, overflowX: "auto", overflowY: "hidden", padding: "0 16px 4px", WebkitOverflowScrolling: "touch" } },
      unes.map(function (a) {
        var couv = a.couverture || (a.photos || [])[0] || null;
        return h("button", {
          key: "une" + a.id,
          onClick: function () { setOuverte(a); },
          style: { background: "none", border: "none", padding: 0, cursor: "pointer", flex: "0 0 auto", width: T + 10, textAlign: "center" }
        },
          h("div", { style: { width: T, height: T, borderRadius: "50%", margin: "0 auto", padding: 2, background: "linear-gradient(135deg, rgba(255,255,255,0.22), " + tA(0.42) + ")" } },
            h("div", { style: { width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", border: "2px solid #060709", background: "#111417", display: "flex", alignItems: "center", justifyContent: "center" } },
              couv
                ? h("img", { src: couv, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
                : h("span", { style: { fontFamily: C, fontSize: 20, fontWeight: 700, color: tnL } }, String(a.nom || "?").charAt(0).toUpperCase()))),
          h("div", { style: { fontSize: 10.5, marginTop: 7, fontFamily: M, fontWeight: 600, color: "#C9D3D8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.nom || ""));
      })),

    ouverte
      ? h(VisionneuseStories, {
        /* Une à la une se lit avec la MÊME visionneuse que les stories : on
           fabrique un groupe à partir des photos de l'album. mode "album"
           masque les actions (garder / supprimer / signaler) — on relit un
           souvenir, on n'agit pas dessus. */
        groupes: [{
          user_id: "album:" + ouverte.id,
          pseudo: ouverte.nom || hsT("aLaUne", lg),
          avatar_url: ouverte.couverture || null,
          ecurie: "",
          stories: (ouverte.photos || []).map(function (u, k) { return { id: "alb" + ouverte.id + "-" + k, photo_url: u }; })
        }],
        depart: 0, moiId: null, premium: !!(app && app.premium), langue: lg, mode: "album",
        onFermer: function () { setOuverte(null); }
      })
      : null);
}

/* ---------------------------------------------------------------------------
   8. LE CHOIX DE L'À LA UNE AU MOMENT DE GARDER
   Décision de Blandine du 12/08 : « Garder demande dans laquelle ranger ».
--------------------------------------------------------------------------- */
function ChoixALaUne(props) {
  var h = React.createElement;
  var lg = props.langue || "fr";
  var M = "'Montserrat',sans-serif", C = "'Cinzel',Georgia,serif";
  var th = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { principal: "#20D9F5", lumineux: "#5FE9F0" };
  var tn = th.principal, tnL = th.lumineux;
  function tA(a) { return (typeof teinteRGBA === "function") ? teinteRGBA(tn, a) : ("rgba(32,217,245," + a + ")"); }

  var lS = React.useState([]), listes = lS[0], setListes = lS[1];
  var nS = React.useState(""), nom = nS[0], setNom = nS[1];
  var bS = React.useState(false), busy = bS[0], setBusy = bS[1];
  var corpsRef = React.useRef(null);
  var vivantRef = React.useRef(true);

  React.useEffect(function () {
    vivantRef.current = true;
    if (typeof hsMesALaUnePourRanger === "function") {
      hsMesALaUnePourRanger().then(function (r) {
        if (!vivantRef.current) return;
        setListes((r && r.data) || []);
      });
    }
    return function () { vivantRef.current = false; };
  }, []);
  /* RÈGLE DU PROJET : tout panneau défilant est remis en haut à l'ouverture. */
  React.useEffect(function () { try { if (corpsRef.current) corpsRef.current.scrollTop = 0; } catch (e) { } }, []);

  function choisir(dest) {
    if (busy) return;
    setBusy(true);
    if (props.onChoix) props.onChoix(dest);
  }

  var portail = (typeof ReactDOM !== "undefined" && ReactDOM.createPortal) ? ReactDOM.createPortal : function (x) { return x; };
  return portail(
    h("div", {
      onClick: function () { if (!busy && props.onFermer) props.onFermer(); },
      style: { position: "fixed", inset: 0, zIndex: 9500, background: "rgba(4,6,9,0.9)", display: "flex", alignItems: "flex-end", justifyContent: "center" }
    },
      h("div", {
        onClick: function (e) { if (e && e.stopPropagation) e.stopPropagation(); },
        ref: corpsRef,
        style: { width: "100%", maxWidth: 520, maxHeight: "80vh", overflowY: "auto", borderRadius: "22px 22px 0 0", border: "1px solid " + tA(0.34), borderBottom: "none", background: "linear-gradient(180deg, #111417, #060709)", padding: "18px 16px calc(env(safe-area-inset-bottom) + 18px)" }
      },
        h("div", { style: { width: 44, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.18)", margin: "0 auto 16px" } }),
        h("div", { style: { fontFamily: C, fontSize: 13.5, letterSpacing: 1.6, textTransform: "uppercase", color: "#F4F7FA", textAlign: "center", lineHeight: 1.4 } }, hsT("rangerOu", lg)),

        listes.length
          ? h("div", { style: { marginTop: 16 } },
            listes.map(function (a) {
              var couv = a.couverture || (a.photos || [])[0] || null;
              return h("button", {
                key: "ch" + a.id,
                onClick: function () { choisir({ albumId: a.id }); },
                style: { width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", marginBottom: 8, borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.035)", cursor: "pointer", textAlign: "left" }
              },
                h("div", { style: { width: 44, height: 44, borderRadius: "50%", overflow: "hidden", flex: "0 0 auto", background: "#111417", border: "1px solid " + tA(0.4), display: "flex", alignItems: "center", justifyContent: "center" } },
                  couv
                    ? h("img", { src: couv, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } })
                    : h("span", { style: { fontFamily: C, fontSize: 15, color: tnL, fontWeight: 700 } }, String(a.nom || "?").charAt(0).toUpperCase())),
                h("div", { style: { minWidth: 0, flex: 1 } },
                  h("div", { style: { fontSize: 13, fontWeight: 700, fontFamily: M, color: "#F4F7FA", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, a.nom || ""),
                  h("div", { style: { fontSize: 10.5, fontFamily: M, color: "#8A929C", marginTop: 2 } }, String((a.photos || []).length))),
                h("span", { style: { color: tnL, fontSize: 17, fontWeight: 700, flex: "0 0 auto" } }, "\u203a"));
            }))
          : h("div", { style: { fontSize: 11.5, fontFamily: M, color: "#8A929C", textAlign: "center", margin: "16px 0 4px" } }, hsT("videUne", lg)),

        h("div", { style: { fontSize: 9.5, fontFamily: M, fontWeight: 800, letterSpacing: 1.7, textTransform: "uppercase", color: tA(0.92), margin: "18px 0 8px" } }, hsT("nouvelleUne", lg)),
        h("input", {
          value: nom, onChange: function (e) { setNom(e.target.value); },
          maxLength: 40, placeholder: hsT("nomUne", lg),
          style: { width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid " + tA(0.28), color: "#F4F7FA", fontSize: 13.5, fontFamily: M, outline: "none" }
        }),
        h("div", { style: { display: "flex", gap: 10, marginTop: 14 } },
          h("button", { onClick: function () { if (!busy && props.onFermer) props.onFermer(); }, style: { flex: 1, padding: "13px 0", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#C9D3D8", fontSize: 13, fontWeight: 700, fontFamily: M, cursor: "pointer" } }, hsT("annuler", lg)),
          h("button", {
            onClick: function () { var n = String(nom || "").trim(); if (n) choisir({ nouveau: n }); },
            disabled: busy || !String(nom || "").trim(),
            style: { flex: 1.2, padding: "13px 0", borderRadius: 999, border: "none", background: String(nom || "").trim() ? ("linear-gradient(90deg," + tn + "," + tnL + ")") : "rgba(32,217,245,0.22)", color: "#04252A", fontSize: 13, fontWeight: 800, fontFamily: M, cursor: String(nom || "").trim() ? "pointer" : "default" }
          }, hsT("creer", lg))))),
    document.body);
}

/* ---------------------------------------------------------------------------
   9. LA VISIONNEUSE
   Photo nue au centre sur noir absolu. En-tête au-dessus, lieu / légende /
   tags / actions en dessous, sur surface givrée : la photo ne reçoit AUCUN
   calque.
   - la progression est écrite directement dans le style du DOM, sans état
     React : un re-rendu à 60 images par seconde tuerait l'onglet sur iPhone.
   - aucun setPointerCapture : c'était une des causes du blocage de
     défilement Android. Événements touch simples.
--------------------------------------------------------------------------- */
function VisionneuseStories(props) {
  var h = React.createElement;
  var lg = props.langue || "fr";
  var M = "'Montserrat',sans-serif", C = "'Cinzel',Georgia,serif";
  var th = (typeof teinteHypeActive === "function") ? teinteHypeActive() : { principal: "#20D9F5", lumineux: "#5FE9F0" };
  var tn = th.principal, tnL = th.lumineux;
  function tA(a) { return (typeof teinteRGBA === "function") ? teinteRGBA(tn, a) : ("rgba(32,217,245," + a + ")"); }

  var groupes = props.groupes || [];
  var gS = React.useState(props.depart || 0), ig = gS[0], setIg = gS[1];
  var sS = React.useState(0), is = sS[0], setIs = sS[1];
  var aS = React.useState(null), action = aS[0], setAction = aS[1];
  var tgS = React.useState([]), tagsStory = tgS[0], setTagsStory = tgS[1];
  /* CORRECTIF DE LA SESSION 114b — À NE PLUS JAMAIS PERDRE.
     Le minuteur de 6 s démarrait au MONTAGE du composant. Sur une connexion
     réelle, une photo Supabase met plusieurs secondes à descendre : la story
     se refermait avant que l'image n'apparaisse. Diagnostic fait sur
     l'enregistrement d'écran de Blandine, lu image par image.
     Désormais le CHARGEMENT DE L'IMAGE est le point de départ de tout : le
     minuteur, la barre de progression et le marquage « vue ». */
  var cgS = React.useState(false), chargee = cgS[0], setChargee = cgS[1];
  var erS = React.useState(false), erreur = erS[0], setErreur = erS[1];
  /* mode "album" : on relit une à la une. Aucune action possible sur la photo
     (ni garder, ni supprimer, ni signaler) — on relit un souvenir. */
  var estAlbum = !!(props && props.mode === "album");
  var chS = React.useState(false), choix = chS[0], setChoix = chS[1];
  var nrS = React.useState(""), nomRange = nrS[0], setNomRange = nrS[1];
  var pauseRef = React.useRef(false);
  var barreRef = React.useRef(null);
  var glisseRef = React.useRef({ y0: 0, actif: false });
  var boiteRef = React.useRef(null);
  var vivantRef = React.useRef(true);

  var groupe = groupes[ig] || null;
  var story = groupe ? (groupe.stories[is] || null) : null;
  var estMoi = !!(groupe && props.moiId && groupe.user_id === props.moiId);

  function fermer() { if (props.onFermer) props.onFermer(); }

  function suivante() {
    if (!groupe) { fermer(); return; }
    if (is + 1 < groupe.stories.length) { setIs(is + 1); return; }
    if (ig + 1 < groupes.length) { setIg(ig + 1); setIs(0); return; }
    fermer();
  }
  function precedente() {
    if (is - 1 >= 0) { setIs(is - 1); return; }
    if (ig - 1 >= 0) {
      var gp = groupes[ig - 1];
      setIg(ig - 1);
      setIs(gp ? Math.max(0, gp.stories.length - 1) : 0);
    }
  }

  React.useEffect(function () { vivantRef.current = true; return function () { vivantRef.current = false; }; }, []);

  /* Changement de story : on remet à zéro l'état de chargement. Le marquage
     « vue » N'A PLUS LIEU ICI — il attend l'arrivée de l'image (114b) : une
     story jamais affichée ne doit pas être comptée comme vue. */
  React.useEffect(function () {
    setAction(null);
    setTagsStory([]);
    setChargee(false);
    setErreur(false);
    if (!story) return;
    if (!estAlbum && story.photo_url && typeof hsTagsDeStory === "function") {
      hsTagsDeStory(story.photo_url).then(function (r) {
        if (!vivantRef.current) return;
        setTagsStory((r && r.data) || []);
      });
    }
  }, [(story && story.id) || ""]);

  /* Barre de progression + passage automatique.
     114b : ne démarre QUE quand l'image est arrivée (ou a échoué). Avant, la
     barre reste à zéro — elle dit la vérité. */
  React.useEffect(function () {
    if (!story) return;
    if (!chargee && !erreur) {
      try { if (barreRef.current) barreRef.current.style.width = "0%"; } catch (e0) { }
      return;
    }
    var debut = Date.now(); var reste = HS_DUREE_VUE_MS; var raf = 0; var vivant = true;
    function boucle() {
      if (!vivant) return;
      if (pauseRef.current) {
        debut = Date.now() - (HS_DUREE_VUE_MS - reste);
        raf = requestAnimationFrame(boucle);
        return;
      }
      var ecoule = Date.now() - debut;
      reste = Math.max(0, HS_DUREE_VUE_MS - ecoule);
      var pct = Math.min(100, (ecoule / HS_DUREE_VUE_MS) * 100);
      try { if (barreRef.current) barreRef.current.style.width = pct + "%"; } catch (e) { }
      if (pct >= 100) { vivant = false; suivante(); return; }
      raf = requestAnimationFrame(boucle);
    }
    try { if (barreRef.current) barreRef.current.style.width = "0%"; } catch (e2) { }
    raf = requestAnimationFrame(boucle);
    return function () { vivant = false; if (raf) cancelAnimationFrame(raf); };
  }, [(story && story.id) || "", ig, is, chargee, erreur]);

  async function garder(destination) {
    if (!story) return;
    var r = await hsGarderEnSouvenir(story, !!props.premium, destination);
    if (r && r.error === "quota") { setAction("quota"); return; }
    if (r && r.error) { setAction("echec"); return; }
    setNomRange((r && r.nom) || "");
    setAction("rangee");
  }
  async function signaler() {
    if (!story) return;
    var r = await hsSignalerStory(story.id, "story");
    if (r && r.error) { setAction("echec"); return; }
    setAction("signale");
  }
  async function supprimer() {
    if (!story) return;
    var r = await hsSupprimerStory(story.id);
    if (r && r.error) { setAction("echec"); return; }
    fermer();
  }

  function toucheDebut(e) {
    try {
      pauseRef.current = true;
      var t = e.touches && e.touches[0];
      if (t) glisseRef.current = { y0: t.clientY, actif: true };
    } catch (er) { }
  }
  function toucheBouge(e) {
    try {
      if (!glisseRef.current.actif) return;
      var t = e.touches && e.touches[0];
      if (!t) return;
      var dy = t.clientY - glisseRef.current.y0;
      if (dy > 0 && boiteRef.current) boiteRef.current.style.transform = "translateY(" + Math.min(dy, 260) + "px)";
    } catch (er) { }
  }
  function toucheFin(e) {
    try {
      pauseRef.current = false;
      var dy = 0;
      var t = e.changedTouches && e.changedTouches[0];
      if (t) dy = t.clientY - glisseRef.current.y0;
      glisseRef.current.actif = false;
      if (boiteRef.current) boiteRef.current.style.transform = "translateY(0px)";
      if (dy > 110) fermer();
    } catch (er) { }
  }

  var portail = (typeof ReactDOM !== "undefined" && ReactDOM.createPortal) ? ReactDOM.createPortal : function (x) { return x; };
  if (!groupe || !story) return null;

  var messages = {
    gardee: hsT("gardee", lg), signale: hsT("signale", lg),
    quota: hsT("quota", lg), echec: hsT("echec", lg),
    rangee: hsT("rangee", lg) + (nomRange || "")
  };

  /* Les tags visibles : acceptés pour tout le monde ; en attente, seulement
     pour l'auteur de la story, avec la mention. */
  var tagsVisibles = (tagsStory || []).filter(function (t) {
    if (!t) return false;
    if (t.statut === "accepte") return true;
    return estMoi;
  });

  return portail(
    h("div", {
      ref: boiteRef,
      onTouchStart: toucheDebut, onTouchMove: toucheBouge, onTouchEnd: toucheFin,
      style: { position: "fixed", inset: 0, zIndex: 9300, background: "#060709", display: "flex", flexDirection: "column", transition: "transform 160ms ease-out" }
    },
      h("div", { style: { display: "flex", gap: 4, padding: "calc(env(safe-area-inset-top) + 12px) 14px 0" } },
        groupe.stories.map(function (s, i) {
          var fait = i < is;
          return h("div", { key: "pb" + i, style: { flex: 1, height: 2.5, borderRadius: 999, background: "rgba(255,255,255,0.2)", overflow: "hidden" } },
            i === is
              ? h("div", { ref: barreRef, style: { width: "0%", height: "100%", background: tnL } })
              : h("div", { style: { width: fait ? "100%" : "0%", height: "100%", background: "rgba(255,255,255,0.62)" } }));
        })),

      h("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px 10px" } },
        h("div", { style: { width: 38, height: 38, borderRadius: "50%", overflow: "hidden", flex: "0 0 auto", border: "1px solid " + tA(0.5), background: "#111417", display: "flex", alignItems: "center", justifyContent: "center" } },
          groupe.avatar_url
            ? h("img", { src: groupe.avatar_url, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } })
            : h("span", { style: { fontFamily: C, fontSize: 15, fontWeight: 700, color: tnL } }, String(groupe.pseudo || "?").charAt(0).toUpperCase())),
        h("div", { style: { minWidth: 0, flex: 1 } },
          h("div", { style: { fontSize: 13, fontWeight: 700, fontFamily: M, color: "#F4F7FA", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, groupe.pseudo || "Cavalier"),
          h("div", { style: { fontSize: 10, fontFamily: M, color: "#8A929C", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } },
            hsTempsRelatif(story.created_at, lg) + (groupe.ecurie ? (" \u00b7 " + groupe.ecurie) : ""))),
        h("button", { onClick: fermer, "aria-label": "Fermer", style: { width: 34, height: 34, borderRadius: "50%", flex: "0 0 auto", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.18)", color: "#E4ECEF", fontSize: 15, cursor: "pointer", fontFamily: M } }, "\u2715")),

      /* La photo, nue.
         114b : c'est son chargement qui déclenche le minuteur, le marquage
         « vue » et le préchargement de la suivante. Tant qu'elle descend, une
         respiration turquoise occupe le centre (Design Bible : rien n'est
         parfaitement statique, la lumière guide). */
      h("div", { style: { flex: 1, position: "relative", minHeight: 0, background: "#060709", display: "flex", alignItems: "center", justifyContent: "center" } },
        h("style", { dangerouslySetInnerHTML: { __html: "@keyframes hsResp{0%,100%{opacity:.28;transform:scale(.9)}50%{opacity:.85;transform:scale(1.06)}}" } }),
        (!chargee && !erreur)
          ? h("div", { style: { position: "absolute", width: 54, height: 54, borderRadius: "50%", border: "1px solid " + tA(0.5), boxShadow: "0 0 26px " + tA(0.3) + ", inset 0 0 20px " + tA(0.14), animation: "hsResp 1600ms ease-in-out infinite" } })
          : null,
        erreur
          ? h("div", { style: { position: "absolute", padding: "0 30px", textAlign: "center", fontFamily: M, fontSize: 12.5, color: "#8A929C", lineHeight: 1.5 } }, hsT("photoIndispo", lg))
          : null,
        h("img", {
          src: story.photo_url, alt: "", decoding: "async",
          onLoad: function () {
            setChargee(true);
            if (story.id && typeof hsMarquerVue === "function") hsMarquerVue(story.id);
            /* Préchargement de la story suivante : elle sera déjà là au tap. */
            try {
              var svt = null;
              if (groupe && groupe.stories[is + 1]) svt = groupe.stories[is + 1];
              else if (groupes[ig + 1] && groupes[ig + 1].stories[0]) svt = groupes[ig + 1].stories[0];
              if (svt && svt.photo_url && typeof Image !== "undefined") {
                var pre = new Image();
                pre.decoding = "async";
                pre.src = svt.photo_url;
              }
            } catch (eP) { }
          },
          onError: function () {
            setErreur(true);
            if (story.id && typeof hsMarquerVue === "function") hsMarquerVue(story.id);
          },
          style: { maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block", opacity: chargee ? 1 : 0, transition: "opacity 220ms ease-out" }
        }),
        h("button", { onClick: precedente, "aria-label": "Pr\u00e9c\u00e9dente", style: { position: "absolute", left: 0, top: 0, bottom: 0, width: "32%", background: "transparent", border: "none", cursor: "pointer" } }, ""),
        h("button", { onClick: suivante, "aria-label": "Suivante", style: { position: "absolute", right: 0, top: 0, bottom: 0, width: "48%", background: "transparent", border: "none", cursor: "pointer" } }, "")),

      h("div", { style: { padding: "12px 14px calc(env(safe-area-inset-bottom) + 14px)", background: "linear-gradient(180deg, rgba(17,20,23,0.9), #060709)", borderTop: "1px solid rgba(255,255,255,0.07)" } },
        story.lieu
          ? h("div", { style: { fontSize: 11.5, fontFamily: M, fontWeight: 700, color: tnL, marginBottom: 8, letterSpacing: 0.3 } }, "\uD83D\uDCCD " + story.lieu)
          : null,
        story.legende
          ? h("div", { style: { fontSize: 13.5, lineHeight: 1.55, fontFamily: M, color: "#DCE3E8", marginBottom: 10, whiteSpace: "pre-line" } }, story.legende)
          : null,
        tagsVisibles.length
          ? h("div", { style: { display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 11 } },
            tagsVisibles.map(function (t, i) {
              var attente = (t.statut !== "accepte");
              return h("span", {
                key: "tv" + i,
                style: { padding: "5px 11px", borderRadius: 999, fontSize: 11, fontFamily: M, fontWeight: 700, border: "1px solid " + (attente ? "rgba(255,255,255,0.18)" : tA(0.5)), color: attente ? "#8A929C" : tn, background: attente ? "transparent" : "rgba(32,217,245,0.08)" }
              }, (t.type === "cheval" ? "\uD83D\uDC0E " : "") + (t.cible_nom || "?") + (attente ? (" \u00b7 " + hsT("enAttente", lg)) : ""));
            }))
          : null,
        action
          ? h("div", { style: { fontSize: 11.5, fontFamily: M, color: tnL, marginBottom: 10, lineHeight: 1.45 } }, messages[action] || "")
          : null,
        estAlbum
          ? null
          : h("div", { style: { display: "flex", gap: 9, flexWrap: "wrap" } },
            estMoi
              ? h("button", { onClick: function () { pauseRef.current = true; setChoix(true); }, style: { flex: "1 1 auto", padding: "11px 14px", borderRadius: 999, border: "1px solid " + tA(0.55), background: "rgba(32,217,245,0.08)", color: tn, fontSize: 12, fontWeight: 700, fontFamily: M, cursor: "pointer" } }, "\u2726 " + ((story.garde || action === "rangee") ? hsT("gardee", lg) : hsT("garder", lg)))
              : h("button", { onClick: signaler, style: { flex: "1 1 auto", padding: "11px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", background: "transparent", color: "#9AA5AD", fontSize: 12, fontWeight: 600, fontFamily: M, cursor: "pointer" } }, hsT("signaler", lg)),
            estMoi
              ? h("button", { onClick: supprimer, style: { flex: "0 0 auto", padding: "11px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", background: "transparent", color: "#9AA5AD", fontSize: 12, fontWeight: 600, fontFamily: M, cursor: "pointer" } }, hsT("supprimer", lg))
              : null)),

    /* La feuille de choix de l'à la une. Elle met le minuteur en pause : sans
       ça, la story défilerait pendant qu'on choisit sa destination. */
    choix
      ? h(ChoixALaUne, {
        langue: lg,
        onFermer: function () { setChoix(false); pauseRef.current = false; },
        onChoix: function (dest) { setChoix(false); pauseRef.current = false; garder(dest); }
      })
      : null),
    document.body);
}

try {
  if (typeof window !== "undefined") {
    window.BandeauStories = BandeauStories;
    window.RailALaUne = RailALaUne;
    window.ChoixALaUne = ChoixALaUne;
    window.VisionneuseStories = VisionneuseStories;
    window.ComposeurStory = ComposeurStory;
  }
} catch (eW2) { }
