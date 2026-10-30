/* ============================================================================
   HYPE ▸ netlify/edge-functions/cours-route.ts — 30/10/2026
   LES ADRESSES PUBLIQUES DES COURS : /<langue>/galops/, /<langue>/galop-N/,
   /<langue>/galop-1/<chapitre>/ (14 langues).

   POURQUOI (Blandine, 30/10) : depuis Google, ces adresses montraient une copie
   du cours en texte brut (« faux semblants »), sans la mise en page, sans les
   images de l'appli, avec des quiz qui ne marchaient pas. Décision : « mettre
   les vrais chapitres ».

   CE QUE FAIT CE FICHIER (et RIEN d'autre)
   1. Il laisse Netlify servir la page fabriquée par outils/seo-galops.cjs.
   2. Si cette page porte <meta name="hype-cible" content="…">, il renvoie à la
      place la page Hype NORMALE (app-base.html, la même que pour /cheval/), en y
      glissant, comme pour les chevaux :
        - <base href="/"> (l'appli va chercher ses fichiers à la racine) ;
        - window.__HYPE_ROUTE_COURS = la cible → l'appli ouvre le VRAI écran
          (sommaire des Galops, page d'un Galop ou chapitre, comme les liens #g=) ;
        - window.__HYPE_ROUTE_LANGUE = la langue de l'adresse (seulement pour un
          visiteur qui n'a pas encore choisi de langue) ;
        - le titre, la description, l'adresse canonique, les liens vers les autres
          langues et l'aperçu de partage de la page fabriquée (repères <!--hype-seo-->) ;
        - le texte du cours pour Google, dans <div id="root"> (repères
          <!--hype-texte-->), caché dès que l'appli démarre ; l'appli le remplace.
      L'adresse affichée dans la barre NE CHANGE PAS.
   3. Au moindre souci (repère absent, appli injoignable) : la page fabriquée part
      telle quelle, comme avant. Jamais d'erreur pour le visiteur.

   Les Galops 2 à 7 restent verrouillés par l'appli elle-même (règle Premium du 09/10).
   ========================================================================== */

const LANGUES = ["fr", "en", "es", "it", "de", "ja", "ar", "zh", "nl", "pt", "sv", "ru", "pl", "ko"];
const REPERE = new TextEncoder().encode('<head><meta charset="utf-8">');
const REPERE_TITRE = new TextEncoder().encode("<title>Hype</title>");
const REPERE_RACINE = new TextEncoder().encode('<div id="root">');
const LECTURE_MAX = 2 * 1024 * 1024;
const FORME_CIBLE = /^(galops|[1-7]|g[1-7]-[a-z0-9-]{1,60}|g5n-02)$/;   // 30/10 : g5n-02 = « Les embouchures » (écran à part)

function chercher(tas: Uint8Array, motif: Uint8Array): number {
  const n = tas.length - motif.length;
  const premier = motif[0];
  for (let i = 0; i <= n; i++) {
    if (tas[i] !== premier) continue;
    let ok = true;
    for (let j = 1; j < motif.length; j++) { if (tas[i + j] !== motif[j]) { ok = false; break; } }
    if (ok) return i;
  }
  return -1;
}
function coller(a: Uint8Array, b: Uint8Array): Uint8Array {
  const c = new Uint8Array(a.length + b.length);
  c.set(a, 0); c.set(b, a.length);
  return c;
}
function entre(txt: string, debut: string, fin: string): string {
  const i = txt.indexOf(debut);
  const j = i < 0 ? -1 : txt.indexOf(fin, i + debut.length);
  return (i < 0 || j < 0) ? "" : txt.slice(i + debut.length, j);
}

/* La page Hype avec les ajouts, en flux (seul le début du fichier de 10 Mo est lu). */
async function pageAppli(source: Response, ajoutTete: string, texteGoogle: string): Promise<Response | null> {
  if (!source.body) return null;
  const enc = new TextEncoder();
  const lecteur = source.body.getReader();
  let debut = new Uint8Array(0);
  let posRacine = -1;
  while (posRacine < 0) {
    const { value, done } = await lecteur.read();
    if (done) break;
    const depart = Math.max(0, debut.length - REPERE_RACINE.length);
    debut = coller(debut, value);
    const p = chercher(debut.subarray(depart), REPERE_RACINE);
    if (p >= 0) posRacine = depart + p;
    else if (debut.length > LECTURE_MAX) break;
  }
  const pos = chercher(debut, REPERE);
  if (pos < 0 || posRacine < 0) { try { lecteur.cancel(); } catch { /* rien */ } return null; }
  const coupe = pos + REPERE.length;
  const p2 = chercher(debut.subarray(coupe), REPERE_TITRE);
  const tTitre = p2 >= 0 ? coupe + p2 : -1;

  const morceaux: Uint8Array[] = [debut.subarray(0, coupe), enc.encode(ajoutTete)];
  let curseur = coupe;
  if (tTitre > 0 && tTitre < posRacine) {
    // le <title> de la page du cours est déjà dans ajoutTete : on retire celui de l'appli (un seul titre)
    morceaux.push(debut.subarray(curseur, tTitre));
    curseur = tTitre + REPERE_TITRE.length;
  }
  const finRacine = posRacine + REPERE_RACINE.length;
  morceaux.push(debut.subarray(curseur, finRacine), enc.encode(texteGoogle), debut.subarray(finRacine));
  let tete = new Uint8Array(0);
  for (const m of morceaux) tete = coller(tete, m);

  const flux = new ReadableStream<Uint8Array>({
    start(ctrl) { ctrl.enqueue(tete); },
    async pull(ctrl) {
      try {
        const { value, done } = await lecteur.read();
        if (done) ctrl.close(); else ctrl.enqueue(value);
      } catch (e) { ctrl.error(e); }
    },
    cancel() { try { lecteur.cancel(); } catch { /* rien */ } },
  });
  return new Response(flux, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=0, must-revalidate" },
  });
}

export default async (request: Request, context: any) => {
  const reponse: Response = await context.next();
  let statique = "";
  try {
    if (reponse.status !== 200 || !(reponse.headers.get("content-type") || "").includes("text/html")) return reponse;
    const url = new URL(request.url);
    const lg = url.pathname.split("/")[1] || "";
    if (!LANGUES.includes(lg)) return reponse;

    statique = await reponse.text();
    const garder = () => new Response(statique, { status: 200, headers: reponse.headers });
    const m = statique.match(/<meta name="hype-cible" content="([^"]+)">/);
    const cible = m ? m[1] : "";
    const seo = entre(statique, "<!--hype-seo-->", "<!--/hype-seo-->");
    const corps = entre(statique, "<!--hype-texte-->", "<!--/hype-texte-->");
    if (!FORME_CIBLE.test(cible) || !seo || !corps) return garder();

    const source = await fetch(new URL("/app-base.html", url.origin), { headers: { accept: "text/html" } });
    if (!source.ok) { try { await source.body?.cancel(); } catch { /* rien */ } return garder(); }

    const ajout =
      `<script>document.documentElement.classList.add("hype-js")</script>` +
      `<style>html.hype-js #seo-cours{display:none!important}@media (display-mode: standalone){#seo-cours{display:none!important}}</style>` +
      `<base href="/"><script>window.__HYPE_ROUTE_COURS=${JSON.stringify(cible)};window.__HYPE_ROUTE_LANGUE=${JSON.stringify(lg)};</script>` +
      seo;
    const texte = `<div id="seo-cours" lang="${lg === "zh" ? "zh-Hans" : lg}"${lg === "ar" ? ' dir="rtl"' : ""} style="max-width:820px;margin:0 auto;padding:24px 20px;color:#ece5d6;background:#060a09;font:16px/1.7 system-ui,sans-serif">${corps}</div>`;
    const page = await pageAppli(source, ajout, texte);
    if (!page) return garder();
    if (request.method === "HEAD") { try { await page.body?.cancel(); } catch { /* rien */ } return new Response(null, { status: 200, headers: page.headers }); }
    return page;
  } catch (e) {
    console.log("[cours-route] erreur, page fabriquée servie :", String(e));
    return reponse.bodyUsed ? new Response(statique, { status: 200, headers: reponse.headers }) : reponse;
  }
};

/* liste écrite en toutes lettres : Netlify la lit sans exécuter le fichier */
export const config = { path: ["/fr/galops/*", "/fr/galop-1/*", "/fr/galop-2/*", "/fr/galop-3/*", "/fr/galop-4/*", "/fr/galop-5/*", "/fr/galop-6/*", "/fr/galop-7/*", "/en/galops/*", "/en/galop-1/*", "/en/galop-2/*", "/en/galop-3/*", "/en/galop-4/*", "/en/galop-5/*", "/en/galop-6/*", "/en/galop-7/*", "/es/galops/*", "/es/galop-1/*", "/es/galop-2/*", "/es/galop-3/*", "/es/galop-4/*", "/es/galop-5/*", "/es/galop-6/*", "/es/galop-7/*", "/it/galops/*", "/it/galop-1/*", "/it/galop-2/*", "/it/galop-3/*", "/it/galop-4/*", "/it/galop-5/*", "/it/galop-6/*", "/it/galop-7/*", "/de/galops/*", "/de/galop-1/*", "/de/galop-2/*", "/de/galop-3/*", "/de/galop-4/*", "/de/galop-5/*", "/de/galop-6/*", "/de/galop-7/*", "/ja/galops/*", "/ja/galop-1/*", "/ja/galop-2/*", "/ja/galop-3/*", "/ja/galop-4/*", "/ja/galop-5/*", "/ja/galop-6/*", "/ja/galop-7/*", "/ar/galops/*", "/ar/galop-1/*", "/ar/galop-2/*", "/ar/galop-3/*", "/ar/galop-4/*", "/ar/galop-5/*", "/ar/galop-6/*", "/ar/galop-7/*", "/zh/galops/*", "/zh/galop-1/*", "/zh/galop-2/*", "/zh/galop-3/*", "/zh/galop-4/*", "/zh/galop-5/*", "/zh/galop-6/*", "/zh/galop-7/*", "/nl/galops/*", "/nl/galop-1/*", "/nl/galop-2/*", "/nl/galop-3/*", "/nl/galop-4/*", "/nl/galop-5/*", "/nl/galop-6/*", "/nl/galop-7/*", "/pt/galops/*", "/pt/galop-1/*", "/pt/galop-2/*", "/pt/galop-3/*", "/pt/galop-4/*", "/pt/galop-5/*", "/pt/galop-6/*", "/pt/galop-7/*", "/sv/galops/*", "/sv/galop-1/*", "/sv/galop-2/*", "/sv/galop-3/*", "/sv/galop-4/*", "/sv/galop-5/*", "/sv/galop-6/*", "/sv/galop-7/*", "/ru/galops/*", "/ru/galop-1/*", "/ru/galop-2/*", "/ru/galop-3/*", "/ru/galop-4/*", "/ru/galop-5/*", "/ru/galop-6/*", "/ru/galop-7/*", "/pl/galops/*", "/pl/galop-1/*", "/pl/galop-2/*", "/pl/galop-3/*", "/pl/galop-4/*", "/pl/galop-5/*", "/pl/galop-6/*", "/pl/galop-7/*", "/ko/galops/*", "/ko/galop-1/*", "/ko/galop-2/*", "/ko/galop-3/*", "/ko/galop-4/*", "/ko/galop-5/*", "/ko/galop-6/*", "/ko/galop-7/*"] };
