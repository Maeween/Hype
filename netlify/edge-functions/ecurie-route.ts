/* ============================================================================
   HYPE ▸ netlify/edge-functions/ecurie-route.ts — 10/10/2026 (référencement des écuries, build 851)
   L'ADRESSE PUBLIQUE D'UNE ÉCURIE : https://2hype.fr/ecurie/<adresse>

   Décisions de Blandine (10/10) : TOUTES les écuries de la base des clubs (3 145,
   choix A) ont leur page, trouvable sur Google ; les « événements » = les
   rendez-vous de l'agenda à venir (pas les résultats passés pour l'instant) ;
   aucun nom de cavalier (même règle que les chevaux).

   CE QUE FAIT CE FICHIER (copie du fonctionnement de cheval-route.ts)
   1. Lit l'adresse (/ecurie/<adresse> : minuscules, chiffres, tirets), sinon 404.
   2. Cherche l'écurie dans ecuries.json (fabriqué par ecuries-generer.cjs à partir
      des fichiers hype-clubs-db-*.js) ; inconnue → 404.
   3. Lit dans Supabase, avec la clé PUBLIQUE : ses chevaux publics (non supprimés,
      pas « prive »), leurs derniers résultats visibles (sans aucune colonne de
      cavalier), ses rendez-vous à venir. Base trop lente → la page part quand même,
      sans ces listes (l'écurie existe toujours).
   4. Si l'écurie n'a pas de ville dans la base (2 584 sur 3 145), demande la commune
      au service public geo.api.gouv.fr à partir de ses coordonnées (0,9 s maxi ;
      sinon on s'en passe).
   5. Renvoie la page Hype NORMALE avec, juste après <head><meta charset> :
        <base href="/"> + window.__HYPE_ROUTE_ECURIE = "<nom exact>" (l'appli ouvre
        la page Écurie de ce club, comme une visite — build 851 dans index.html),
        titre, description, canonical, aperçu de partage (Open Graph) ;
      et, dans <div id="root">, un texte simple pour Google (nom, ville, contact,
      chevaux avec lien vers leur fiche publique, rendez-vous, derniers résultats,
      invitation à ajouter son cheval, source OpenStreetMap). L'appli remplace ce
      bloc en démarrant.
   Image d'aperçu : la grande photo de l'écurie (tableaux_clubs, clé « club-banniere:… »,
   lisible sans connexion depuis la règle passée par Blandine le 10/10) ; sinon
   partage-apercu.jpg.

   12/10/2026 — RÉFÉRENCEMENT, ACTION 1 (liens entre les pages), choix A de Blandine :
     sous les chiffres, le texte pour Google liste maintenant les NOMS des chevaux
     qui ont déjà leur page publique (même règle que cheval-route.ts : adresse +
     photo ou résultat visible), chacun en lien vers /cheval/<adresse>, et les
     rendez-vous à venir en lien vers /evenement/… (lienRdv). Toujours AUCUN nom
     de cavalier, AUCUN résultat. Les chevaux sans page publique ne sont ni
     nommés ni liés. Rien ne change à l'écran : l'appli remplace ce bloc.
   ========================================================================= */

import type { Context } from "https://edge.netlify.com";

const SUPABASE_URL = "https://ldpjebgtskzdokrublfg.supabase.co";
const CLE = "sb_publishable_OoSj7bDnqn2O36myBAXF1g_VjPki8TK";
const DOMAINE = "https://2hype.fr";
// 13/10/2026 : aussi /en/ecurie/…, /es/…, /it/…, /de/…, /ja/…, /ar/… — seulement pour les écuries qui ont
// au moins un cheval ou un rendez-vous sur Hype ; sinon l'adresse étrangère renvoie vers la page française.
const FORME_ADRESSE = /^\/(?:(en|es|it|de|ja|ar|zh|nl)\/)?ecurie\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/;
const FORME_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FORME_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const REPERE = new TextEncoder().encode('<head><meta charset="utf-8">');
const REPERE_TITRE = new TextEncoder().encode("<title>Hype</title>");
const REPERE_RACINE = new TextEncoder().encode('<div id="root">');
const LECTURE_MAX = 2 * 1024 * 1024;
const DELAI_BASE_MS = 2500;
const DELAI_GEO_MS = 900;
const IMAGE_APERCU = DOMAINE + "/partage-apercu.jpg";

/* ---------- 13/10/2026 : les 8 langues de la page (noms, adresses, titres de rendez-vous restent tels quels) ---------- */
type Lg = "fr" | "en" | "es" | "it" | "de" | "ja" | "ar" | "zh" | "nl";
const LANGUES: Lg[] = ["fr", "en", "es", "it", "de", "ja", "ar", "zh", "nl"];
const LOCALE: Record<Lg, string> = { fr: "fr_FR", en: "en_GB", es: "es_ES", it: "it_IT", de: "de_DE", ja: "ja_JP", ar: "ar_AR", zh: "zh_CN", nl: "nl_NL" };
/* code interne → code de langue HTML / hreflang (le chinois simplifié s'écrit zh-Hans) */
const HL: Record<Lg, string> = { fr: "fr", en: "en", es: "es", it: "it", de: "de", ja: "ja", ar: "ar", zh: "zh-Hans", nl: "nl" };
const prefixe = (lg: Lg) => (lg === "fr" ? "" : "/" + lg);
const TX: Record<Lg, Record<string, any>> = {
  fr: { ecA: (v: string) => "Écurie à " + v, ec: "Écurie", ecAd: (v: string) => "écurie à " + v, ecd: "écurie",
    descTel: "Téléphone, itinéraire, chevaux, résultats et agenda de l’écurie sur Hype.", desc: "Chevaux, résultats et agenda de l’écurie sur Hype.",
    descInvite: "Ton cheval est ici ? Crée sa fiche sur Hype : photos, origines, résultats en concours.",
    adresse: "Adresse", tel: "Téléphone", email: "E-mail", site: "Site", horaires: "Horaires",
    nbCh: (n: number) => n + (n > 1 ? " chevaux" : " cheval"), nbRdv: (n: number) => n + " rendez-vous à venir", surHype: (t: string) => t + " sur Hype.", sep: " · ",
    sesChevaux: "Ses chevaux sur Hype", rdv: "Prochains rendez-vous", compte: "Crée ton compte Hype pour découvrir ses chevaux, ses résultats et son agenda.", contacter: "Contacter l’écurie",
    boxT: "Un box virtuel chez Hype ?", boxP: "Pas de paille à faire ici : juste la fiche de ton cheval, ses photos, ses concours, ses souvenirs et son suivi… et d’autres cavaliers avec qui les partager. Théorie, conseils et coach virtuel t’accompagnent aussi dans ta progression.",
    pied: "Hype est une application indépendante, sans lien officiel avec cette écurie ni avec la FFE. Données de l’écurie : © contributeurs OpenStreetMap.", cheval: "Cheval", rendezVous: "Rendez-vous", dp: " : " },
  en: { ecA: (v: string) => "Stable in " + v, ec: "Stable", ecAd: (v: string) => "stable in " + v, ecd: "stable",
    descTel: "Phone, directions, horses, results and calendar of the stable on Hype.", desc: "Horses, results and calendar of the stable on Hype.",
    descInvite: "Is your horse here? Create its profile on Hype: photos, pedigree, competition results.",
    adresse: "Address", tel: "Phone", email: "Email", site: "Website", horaires: "Opening hours",
    nbCh: (n: number) => n + (n > 1 ? " horses" : " horse"), nbRdv: (n: number) => n + (n > 1 ? " upcoming events" : " upcoming event"), surHype: (t: string) => t + " on Hype.", sep: " · ",
    sesChevaux: "Its horses on Hype", rdv: "Upcoming events", compte: "Create your Hype account to discover its horses, results and calendar.", contacter: "Contact the stable",
    boxT: "A virtual stall at Hype?", boxP: "No straw to muck out here: just your horse’s profile, photos, competitions, memories and care… and other riders to share them with. Theory, tips and a virtual coach also support your progress.",
    pied: "Hype is an independent app with no official link to this stable or to the FFE. Stable data: © OpenStreetMap contributors.", cheval: "Horse", rendezVous: "Event", dp: ": " },
  es: { ecA: (v: string) => "Cuadra en " + v, ec: "Cuadra", ecAd: (v: string) => "cuadra en " + v, ecd: "cuadra",
    descTel: "Teléfono, cómo llegar, caballos, resultados y agenda de la cuadra en Hype.", desc: "Caballos, resultados y agenda de la cuadra en Hype.",
    descInvite: "¿Tu caballo está aquí? Crea su ficha en Hype: fotos, orígenes, resultados en concursos.",
    adresse: "Dirección", tel: "Teléfono", email: "Correo", site: "Sitio web", horaires: "Horario",
    nbCh: (n: number) => n + (n > 1 ? " caballos" : " caballo"), nbRdv: (n: number) => n + (n > 1 ? " próximas citas" : " próxima cita"), surHype: (t: string) => t + " en Hype.", sep: " · ",
    sesChevaux: "Sus caballos en Hype", rdv: "Próximas citas", compte: "Crea tu cuenta Hype para descubrir sus caballos, sus resultados y su agenda.", contacter: "Contactar con la cuadra",
    boxT: "¿Un box virtual en Hype?", boxP: "Aquí no hay paja que sacar: solo la ficha de tu caballo, sus fotos, sus concursos, sus recuerdos y su seguimiento… y otros jinetes con quienes compartirlos. Teoría, consejos y un coach virtual también te acompañan en tu progreso.",
    pied: "Hype es una aplicación independiente, sin vínculo oficial con esta cuadra ni con la FFE. Datos de la cuadra: © colaboradores de OpenStreetMap.", cheval: "Caballo", rendezVous: "Cita", dp: ": " },
  it: { ecA: (v: string) => "Scuderia a " + v, ec: "Scuderia", ecAd: (v: string) => "scuderia a " + v, ecd: "scuderia",
    descTel: "Telefono, indicazioni, cavalli, risultati e agenda della scuderia su Hype.", desc: "Cavalli, risultati e agenda della scuderia su Hype.",
    descInvite: "Il tuo cavallo è qui? Crea la sua scheda su Hype: foto, origini, risultati in concorso.",
    adresse: "Indirizzo", tel: "Telefono", email: "E-mail", site: "Sito", horaires: "Orari",
    nbCh: (n: number) => n + (n > 1 ? " cavalli" : " cavallo"), nbRdv: (n: number) => n + (n > 1 ? " appuntamenti in arrivo" : " appuntamento in arrivo"), surHype: (t: string) => t + " su Hype.", sep: " · ",
    sesChevaux: "I suoi cavalli su Hype", rdv: "Prossimi appuntamenti", compte: "Crea il tuo account Hype per scoprire i suoi cavalli, i risultati e l’agenda.", contacter: "Contattare la scuderia",
    boxT: "Un box virtuale su Hype?", boxP: "Niente paglia da cambiare qui: solo la scheda del tuo cavallo, le sue foto, i concorsi, i ricordi e il suo monitoraggio… e altri cavalieri con cui condividerli. Teoria, consigli e coach virtuale ti accompagnano anche nei tuoi progressi.",
    pied: "Hype è un’applicazione indipendente, senza legami ufficiali con questa scuderia né con la FFE. Dati della scuderia: © contributori di OpenStreetMap.", cheval: "Cavallo", rendezVous: "Appuntamento", dp: ": " },
  de: { ecA: (v: string) => "Stall in " + v, ec: "Stall", ecAd: (v: string) => "Stall in " + v, ecd: "Stall",
    descTel: "Telefon, Anfahrt, Pferde, Ergebnisse und Termine des Stalls auf Hype.", desc: "Pferde, Ergebnisse und Termine des Stalls auf Hype.",
    descInvite: "Steht dein Pferd hier? Erstelle sein Profil auf Hype: Fotos, Abstammung, Turnierergebnisse.",
    adresse: "Adresse", tel: "Telefon", email: "E-Mail", site: "Website", horaires: "Öffnungszeiten",
    nbCh: (n: number) => n + (n > 1 ? " Pferde" : " Pferd"), nbRdv: (n: number) => n + (n > 1 ? " kommende Termine" : " kommender Termin"), surHype: (t: string) => t + " auf Hype.", sep: " · ",
    sesChevaux: "Seine Pferde auf Hype", rdv: "Nächste Termine", compte: "Erstelle dein Hype-Konto, um seine Pferde, Ergebnisse und Termine zu entdecken.", contacter: "Stall kontaktieren",
    boxT: "Eine virtuelle Box bei Hype?", boxP: "Hier muss kein Stroh gemistet werden: nur das Profil deines Pferdes, seine Fotos, Turniere, Erinnerungen und seine Betreuung… und andere Reiter, mit denen du sie teilst. Theorie, Tipps und ein virtueller Coach begleiten dich außerdem bei deinen Fortschritten.",
    pied: "Hype ist eine unabhängige App ohne offizielle Verbindung zu diesem Stall oder zur FFE. Daten des Stalls: © OpenStreetMap-Mitwirkende.", cheval: "Pferd", rendezVous: "Termin", dp: ": " },
  ja: { ecA: (v: string) => v + "の厩舎", ec: "厩舎", ecAd: (v: string) => v + "の厩舎", ecd: "厩舎",
    descTel: "電話、アクセス、馬、成績、予定をHypeで。", desc: "馬、成績、予定をHypeで。",
    descInvite: "あなたの馬はここにいますか？ Hypeでプロフィールを作りましょう：写真、血統、競技成績。",
    adresse: "住所", tel: "電話", email: "メール", site: "ウェブサイト", horaires: "営業時間",
    nbCh: (n: number) => "馬" + n + "頭", nbRdv: (n: number) => "今後の予定" + n + "件", surHype: (t: string) => t + "（Hype）", sep: "・",
    sesChevaux: "Hypeに登録された馬", rdv: "今後の予定", compte: "Hypeのアカウントを作成すると、この厩舎の馬、成績、予定が見られます。", contacter: "厩舎への連絡",
    boxT: "Hypeにバーチャル馬房を？", boxP: "ここでは寝わらの掃除はいりません。愛馬のプロフィール、写真、大会、思い出、日々のケア…そしてそれを分かち合う仲間のライダーたち。理論、アドバイス、バーチャルコーチがあなたの上達もサポートします。",
    pied: "Hypeは独立したアプリで、この厩舎およびFFEとは公式な関係はありません。厩舎のデータ：© OpenStreetMap の貢献者。", cheval: "馬", rendezVous: "予定", dp: "：" },
  ar: { ecA: (v: string) => "إسطبل في " + v, ec: "إسطبل", ecAd: (v: string) => "إسطبل في " + v, ecd: "إسطبل",
    descTel: "الهاتف والاتجاهات والخيول والنتائج وأجندة الإسطبل على Hype.", desc: "الخيول والنتائج وأجندة الإسطبل على Hype.",
    descInvite: "هل حصانك هنا؟ أنشئ ملفه على Hype: الصور، النسب، نتائج المسابقات.",
    adresse: "العنوان", tel: "الهاتف", email: "البريد الإلكتروني", site: "الموقع", horaires: "المواعيد",
    nbCh: (n: number) => "الخيول: " + n, nbRdv: (n: number) => "المواعيد القادمة: " + n, surHype: (t: string) => t + " على Hype.", sep: " · ",
    sesChevaux: "خيوله على Hype", rdv: "المواعيد القادمة", compte: "أنشئ حسابك على Hype لتكتشف خيوله ونتائجه وأجندته.", contacter: "التواصل مع الإسطبل",
    boxT: "مربط افتراضي في Hype؟", boxP: "لا قش لتنظيفه هنا: فقط ملف حصانك وصوره ومسابقاته وذكرياته ومتابعته… وفرسان آخرون تشاركهم إياها. وترافقك أيضًا النظرية والنصائح والمدرب الافتراضي في تقدّمك.",
    pied: "Hype تطبيق مستقل لا تربطه أي صلة رسمية بهذا الإسطبل ولا بالاتحاد الفرنسي للفروسية (FFE). بيانات الإسطبل: © المساهمون في OpenStreetMap.", cheval: "حصان", rendezVous: "موعد", dp: ": " },
  zh: { ecA: (v: string) => v + "的马厩", ec: "马厩", ecAd: (v: string) => v + "的马厩", ecd: "马厩",
    descTel: "电话、路线、马匹、比赛成绩和日程，尽在Hype。", desc: "马匹、比赛成绩和日程，尽在Hype。",
    descInvite: "你的马在这里吗？在Hype上为它建立档案：照片、血统、比赛成绩。",
    adresse: "地址", tel: "电话", email: "邮箱", site: "网站", horaires: "营业时间",
    nbCh: (n: number) => "马匹" + n + "匹", nbRdv: (n: number) => "即将举行的活动" + n + "场", surHype: (t: string) => t + "（Hype）", sep: "，",
    sesChevaux: "他在Hype上的马匹", rdv: "近期活动", compte: "创建你的Hype账户，查看这家马厩的马匹、成绩和日程。", contacter: "联系马厩",
    boxT: "在Hype上拥有一间虚拟马房？", boxP: "这里不用铲马粪：只有你爱马的档案、照片、比赛、回忆和日常照料……还有可以一起分享的其他骑手。理论课程、小贴士和虚拟教练也会陪你一路进步。",
    pied: "Hype 是一款独立的应用，与这家马厩及FFE没有任何官方关系。马厩数据：© OpenStreetMap 贡献者。", cheval: "马", rendezVous: "活动", dp: "：" },
  nl: { ecA: (v: string) => "Stal in " + v, ec: "Stal", ecAd: (v: string) => "stal in " + v, ecd: "stal",
    descTel: "Telefoon, route, paarden, resultaten en agenda van de stal op Hype.", desc: "Paarden, resultaten en agenda van de stal op Hype.",
    descInvite: "Staat jouw paard hier? Maak zijn profiel aan op Hype: foto's, afstamming, wedstrijdresultaten.",
    adresse: "Adres", tel: "Telefoon", email: "E-mail", site: "Website", horaires: "Openingstijden",
    nbCh: (n: number) => n + (n > 1 ? " paarden" : " paard"), nbRdv: (n: number) => n + (n > 1 ? " komende afspraken" : " komende afspraak"), surHype: (t: string) => t + " op Hype.", sep: " · ",
    sesChevaux: "Zijn paarden op Hype", rdv: "Komende afspraken", compte: "Maak je Hype-account aan om de paarden, resultaten en agenda van deze stal te ontdekken.", contacter: "Contact opnemen met de stal",
    boxT: "Een virtuele box op Hype?", boxP: "Hier hoef je niet uit te mesten: alleen het profiel van je paard, zijn foto's, wedstrijden, herinneringen en verzorging… en andere ruiters met wie je het deelt. Theorie, tips en een virtuele coach helpen je bovendien vooruit.",
    pied: "Hype is een onafhankelijke app zonder officiële band met deze stal of met de FFE. Gegevens van de stal: © OpenStreetMap-bijdragers.", cheval: "Paard", rendezVous: "Afspraak", dp: ": " },
};
function liensLangues(chemin: string): string {
  return LANGUES.map((l) => `<link rel="alternate" hreflang="${HL[l]}" href="${DOMAINE}${prefixe(l)}${chemin}">`).join("") +
    `<link rel="alternate" hreflang="x-default" href="${DOMAINE}${chemin}">`;
}

type Ecurie = { n: string; v?: string; cp?: string; d?: string; a?: string; t?: string; s?: string; la?: number; lo?: number; x?: number };

/* 12/10/2026 : pages « Centres équestres de l'Essonne (91) » (outils/seo-departements.cjs) : code → [adresse, « de l'Essonne »].
   Jamais bloquant : si la liste manque, la page écurie s'affiche simplement sans ce lien. */
let DEPARTEMENTS: Promise<Record<string, [string, string]>> | null = null;
function departements(origine: string): Promise<Record<string, [string, string]>> {
  if (!DEPARTEMENTS) {
    DEPARTEMENTS = fetch(new URL("/fr/centres-equestres/departements.json", origine))
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => { DEPARTEMENTS = null; return {}; });
  }
  return DEPARTEMENTS;
}

/* ---------- L'annuaire (gardé en mémoire tant que la fonction reste chaude) ---------- */
let ANNUAIRE: Promise<Record<string, Ecurie>> | null = null;
function annuaire(origine: string): Promise<Record<string, Ecurie>> {
  if (!ANNUAIRE) {
    ANNUAIRE = fetch(new URL("/ecuries.json", origine)).then((r) => {
      if (!r.ok) throw new Error("ecuries.json http " + r.status);
      return r.json();
    }).catch((e) => { ANNUAIRE = null; throw e; });
  }
  return ANNUAIRE;
}

/* ---------- Petites pages d'erreur (8 langues) ---------- */
function pageSimple(statut: number, lignes: string[][]): Response {
  const corps = lignes.map(([lang, txt]) => `<p lang="${lang === "zh" ? "zh-Hans" : lang}"${lang === "ar" ? ' dir="rtl"' : ""}>${txt}</p>`).join("\n");
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>Hype</title>
<style>body{margin:0;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;background:#060709;color:#E8E2D4;font-family:Georgia,serif;text-align:center;padding:24px}
p{margin:4px 0;font-size:15px;line-height:1.5}p:first-child{font-size:20px;margin-bottom:12px}
a{margin-top:22px;color:#060709;background:#D9B97A;padding:12px 26px;border-radius:999px;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:14px}</style>
</head><body>
${corps}
<a href="https://2hype.fr/">Hype</a>
</body></html>`;
  const entetes = new Headers({ "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
  if (statut === 503) entetes.set("retry-after", "120");
  return new Response(html, { status: statut, headers: entetes });
}
const PAGE_404 = () => pageSimple(404, [
  ["fr", "Cette écurie n’est pas disponible."],
  ["en", "This stable is not available."],
  ["es", "Esta cuadra no está disponible."],
  ["it", "Questa scuderia non è disponibile."],
  ["de", "Dieser Stall ist nicht verfügbar."],
  ["ja", "この厩舎は表示できません。"],
  ["ar", "هذا الإسطبل غير متاح."],
  ["zh", "这家马厩暂时无法显示。"],
  ["nl", "Deze stal is niet beschikbaar."],
]);
const PAGE_503 = () => pageSimple(503, [
  ["fr", "Hype est momentanément indisponible. Réessaie dans un instant."],
  ["en", "Hype is temporarily unavailable. Please try again shortly."],
  ["es", "Hype no está disponible por el momento. Inténtalo de nuevo en un instante."],
  ["it", "Hype è momentaneamente non disponibile. Riprova tra un attimo."],
  ["de", "Hype ist vorübergehend nicht erreichbar. Versuche es gleich noch einmal."],
  ["ja", "Hypeは一時的に利用できません。しばらくしてからもう一度お試しください。"],
  ["ar", "هايب غير متاح مؤقتًا. حاول مرة أخرى بعد قليل."],
  ["zh", "Hype 暂时无法使用，请稍后再试。"],
  ["nl", "Hype is tijdelijk niet beschikbaar. Probeer het zo meteen opnieuw."],
]);

/* ---------- Outils de texte ---------- */
function echapper(t: string): string {
  return String(t || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function propre(t: unknown): string { return String(t == null ? "" : t).replace(/\s+/g, " ").trim(); }
function texte(t: unknown): string { return echapper(propre(t)); }
function dateFr(d: unknown, lg: Lg = "fr"): string {
  const m = String(d || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? (lg === "ja" || lg === "zh" ? m[1] + "/" + m[2] + "/" + m[3] : m[3] + "/" + m[2] + "/" + m[1]) : "";
}
function rang(place: unknown, classement: unknown): string {
  const n = parseInt(String(place == null ? "" : place), 10);
  if (isFinite(n) && n > 0) return n === 1 ? "1er" : n + "e";
  return propre(classement);
}
const TYPES: Record<string, string> = { stage: "Stage", concours: "Concours", sortie: "Sortie", cours: "Cours", soiree: "Soirée", reunion: "Réunion" };

/* La grande photo de l'écurie, agrandie à 1200 px par Supabase (comme cheval-route.ts) ;
   pas de photo utilisable → l'image Hype commune partage-apercu.jpg. */
function imageApercu(brut: unknown): string {
  const u = String(brut || "").trim();
  if (!u || !/^https:\/\//i.test(u)) return IMAGE_APERCU;
  if (u.includes("/storage/v1/object/public/") && !u.includes("/render/image/")) {
    return u.replace("/storage/v1/object/public/", "/storage/v1/render/image/public/") + (u.includes("?") ? "&" : "?") + "width=1200&resize=contain&quality=80";
  }
  return u;
}

/* ---------- Lectures ---------- */
async function lire(chemin: string, signal: AbortSignal): Promise<any[]> {
  const r = await fetch(SUPABASE_URL + "/rest/v1/" + chemin, { headers: { apikey: CLE, Authorization: "Bearer " + CLE }, signal });
  if (!r.ok) throw new Error("supabase-http-" + r.status);
  const j = await r.json();
  return Array.isArray(j) ? j : [];
}
/* Valeur littérale pour un filtre PostgREST « ilike » : * et % et _ seraient des jokers. */
/* 10/10 : la clé d'un club, EXACTEMENT comme l'appli (clefClubG) : sans accents, minuscules, espaces simples.
   Avant ce correctif : simple passage en minuscules → agenda et grande photo introuvables pour les noms accentués. */
function clefClub(n: string): string {
  return String(n || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
}
function litteral(s: string): string { return String(s).replace(/[*%_\\]/g, (c) => "\\" + c); }

async function communeDepuisCoordonnees(la?: number, lo?: number): Promise<{ v: string; d: string } | null> {
  if (typeof la !== "number" || typeof lo !== "number") return null;
  const minuteur = new AbortController();
  const stop = setTimeout(() => minuteur.abort(), DELAI_GEO_MS);
  try {
    const r = await fetch(`https://geo.api.gouv.fr/communes?lat=${la}&lon=${lo}&fields=nom,codeDepartement&format=json`, { signal: minuteur.signal });
    if (!r.ok) return null;
    const j = await r.json();
    const c = Array.isArray(j) ? j[0] : null;
    return c && c.nom ? { v: String(c.nom), d: String(c.codeDepartement || "") } : null;
  } catch { return null; } finally { clearTimeout(stop); }
}

async function contenuHype(nom: string) {
  const vide = { chevaux: [] as any[], resultats: [] as any[], rdv: [] as any[], banniere: "", contactSaisi: null as any, lu: false };
  const minuteur = new AbortController();
  const stop = setTimeout(() => minuteur.abort(), DELAI_BASE_MS);
  try {
    const aujourdhui = new Date().toISOString().slice(0, 10);
    const clef = clefClub(nom);
    const [chevaux, rdv, ban, ctc] = await Promise.all([
      lire("chevaux?club=ilike." + encodeURIComponent(litteral(nom)) +
        "&supprime_le=is.null&or=(visibilite.is.null,visibilite.neq.prive)" +
        "&select=id,nom,race,slug,photo_url&order=nom.asc&limit=80", minuteur.signal),
      lire("club_agenda?club_clef=eq." + encodeURIComponent(clef) +
        "&or=(date_jour.gte." + aujourdhui + ",date_fin.gte." + aujourdhui + ")" +
        "&select=id,titre,type,date_jour,date_fin,lieu&order=date_jour.asc&limit=10", minuteur.signal),
      // 10/10 : la grande photo de l'écurie (lisible sans connexion depuis la règle passée par Blandine le 10/10)
      lire("tableaux_clubs?cle=eq." + encodeURIComponent("club-banniere:" + clef) + "&select=contenu&limit=1", minuteur.signal).catch(() => []),
      // 10/10 (868) : les coordonnées saisies par la responsable (lisibles sans connexion)
      lire("tableaux_clubs?cle=eq." + encodeURIComponent("club-contact:" + clef) + "&select=contenu&limit=1", minuteur.signal).catch(() => []),
    ]);
    const ids = chevaux.map((c) => String(c.id || "")).filter((i) => FORME_UUID.test(i));
    let resultats: any[] = [];
    if (ids.length) {
      resultats = await lire("resultats?cheval_id=in.(" + ids.join(",") + ")&visible=is.true&masque_cavaliere=not.is.true" +
        "&select=cheval_id,concours,epreuve,date_epreuve,classement,place,partants,mention" +
        "&order=date_epreuve.desc.nullslast,created_at.desc&limit=400", minuteur.signal);
    }
    const banniere = (ban && ban[0] && typeof ban[0].contenu === "string") ? ban[0].contenu.trim() : "";
    let contactSaisi: any = null;
    try { contactSaisi = (ctc && ctc[0] && ctc[0].contenu) ? JSON.parse(ctc[0].contenu) : null; } catch { contactSaisi = null; }
    return { chevaux, resultats, rdv, banniere, contactSaisi, lu: true };
  } catch (e) {
    console.log("[ecurie-route] base lente ou injoignable :", String(e));
    return vide;
  } finally { clearTimeout(stop); }
}

/* ---------- Ce que lit Google ---------- */
/* 10/10 (856) : chaque rendez-vous a sa page publique (evenement-route.ts) — même adresse. */
function lienRdv(r: any, lg: Lg = "fr"): string {
  const id = String(r.id || "");
  if (!/^[0-9a-f]{8}-/i.test(id)) return texte(r.titre);
  const s = String(r.titre || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70).replace(/-+$/, "");
  return `<a href="${DOMAINE}${prefixe(lg)}/evenement/${s ? s + "-" : ""}${id.slice(0, 8).toLowerCase()}">${texte(r.titre) || TX[lg].rendezVous}</a>`;
}
function construire(slug: string, ec: Ecurie, geo: { v: string; d: string } | null, hype: Awaited<ReturnType<typeof contenuHype>>, deps: Record<string, [string, string]> = {}, lg: Lg = "fr") {
  const t = TX[lg];
  // 13/10/2026 : « active » = au moins un cheval ou un rendez-vous sur Hype → la page existe dans les 8 langues
  const active = ec.x !== 1 && (hype.chevaux.length > 0 || hype.rdv.length > 0);
  const nom = propre(ec.n);
  const ville = propre(ec.v) || (geo ? geo.v : "");
  const dep = propre(ec.d) || (geo ? geo.d : "");
  const villeAff = ville ? (ville + (dep && !/\(\d/.test(ville) ? " (" + dep + ")" : "")) : "";

  // chevaux montrables = même règle que cheval-route.ts (adresse + photo ou résultat visible)
  const avecResultat = new Set(hype.resultats.map((r) => String(r.cheval_id)));
  const montrables = hype.chevaux.filter((c) => FORME_SLUG.test(String(c.slug || "")) &&
    (propre(c.photo_url) !== "" || avecResultat.has(String(c.id))));
  const nomsParId: Record<string, string> = {};
  for (const c of hype.chevaux) nomsParId[String(c.id)] = propre(c.nom);
  const derniers = hype.resultats.slice(0, 15);

  const titre = nom + " – " + (villeAff ? t.ecA(villeAff) : t.ec) + " | Hype";
  let description = nom + (lg === "ja" || lg === "zh" ? "、" : lg === "ar" ? "، " : ", ") + (villeAff ? t.ecAd(villeAff) : t.ecd) + (lg === "ja" || lg === "zh" ? "。" : ". ");
  if (hype.contactSaisi && propre(hype.contactSaisi.phrase)) description += propre(hype.contactSaisi.phrase).replace(/[.!…]?$/, ". ");   /* (868) la phrase d'accueil de l'écurie */
  if (hype.chevaux.length || hype.rdv.length) {
    description += propre(ec.t) ? t.descTel : t.desc;
  } else {
    description += t.descInvite;
  }

  let html = `<main id="seo-ecurie" lang="${HL[lg]}"${lg === "ar" ? ' dir="rtl"' : ""} style="padding:64vh 20px 48px;max-width:720px;margin:0 auto;color:#9aa1ab;font:14px/1.6 Georgia,serif">`;
  html += `<h1 style="font-size:22px;color:#d8d2c4;margin:0 0 6px">${texte(nom)}</h1>`;
  html += `<p>${villeAff ? texte(t.ecA(villeAff)) : t.ec}</p>`;
  const contact: string[] = [];
  const cs = (hype.contactSaisi && typeof hype.contactSaisi === "object") ? hype.contactSaisi : null;   /* (868) saisies par l'écurie : elles remplacent la base */
  if (cs) {
    if (propre(cs.phrase)) contact.push(`<em>${texte(cs.phrase)}</em>`);
    if (propre(cs.adresse)) contact.push(t.adresse + t.dp + texte(cs.adresse));
    if (propre(cs.tel)) contact.push(t.tel + t.dp + texte(cs.tel));
    if (propre(cs.email)) contact.push(t.email + t.dp + texte(cs.email));
    if (/^https?:\/\//i.test(propre(cs.site))) contact.push(`${t.site}${t.dp}<a href="${echapper(propre(cs.site))}" rel="nofollow noopener">${texte(cs.site)}</a>`);
    if (propre(cs.instagram)) contact.push("Instagram" + t.dp + texte(cs.instagram));
    if (propre(cs.facebook)) contact.push("Facebook" + t.dp + texte(cs.facebook));
    if (propre(cs.horaires)) contact.push(t.horaires + t.dp + texte(cs.horaires));
  } else {
    if (propre(ec.a)) contact.push(t.adresse + t.dp + texte(ec.a) + (propre(ec.cp) ? ", " + texte(ec.cp) : "") + (ville ? " " + texte(ville) : ""));
    if (propre(ec.t)) contact.push(t.tel + t.dp + texte(ec.t));
    if (propre(ec.s)) contact.push(`${t.site}${t.dp}<a href="${echapper(propre(ec.s))}" rel="nofollow noopener">${texte(ec.s)}</a>`);
  }
  const contactLiens = contact;   /* (861) affichées plus bas, sous « Contacter l’écurie » (comme dans l'appli) */

  /* 10/10 (861) VITRINE : Google lit EXACTEMENT ce que voit un visiteur sans compte (sinon il y voit une tromperie) :
     des chiffres, sans la liste des chevaux, des rendez-vous ni des résultats (réservés aux personnes connectées). */
  const nbCh = hype.chevaux.length, nbRdv = hype.rdv.length;
  const chiffres: string[] = [];
  if (nbCh) chiffres.push(t.nbCh(nbCh));
  if (nbRdv) chiffres.push(t.nbRdv(nbRdv));
  if (chiffres.length) html += `<p>${t.surHype(chiffres.join(t.sep))}</p>`;
  /* 12/10 (référencement action 1, choix A) : les noms en liens vers les pages publiques */
  if (montrables.length) {
    html += `<h2 style="font-size:17px;color:#d8d2c4;margin:22px 0 6px">${t.sesChevaux}</h2><p>` +
      montrables.map((c) => `<a href="${DOMAINE}${prefixe(lg)}/cheval/${c.slug}">${texte(c.nom) || t.cheval}</a>`).join(" · ") + `</p>`;
  }
  if (nbRdv) {
    html += `<h2 style="font-size:17px;color:#d8d2c4;margin:22px 0 6px">${t.rdv}</h2><p>` +
      hype.rdv.map((r) => { const d = dateFr(r.date_jour, lg); return lienRdv(r, lg) + (d ? " — " + d : ""); }).join("<br>") + `</p>`;
  }
  html += `<p>${t.compte}</p>`;
  if (contactLiens.length) html += `<h2 style="font-size:17px;color:#d8d2c4;margin:22px 0 6px">${t.contacter}</h2><p>${contactLiens.join("<br>")}</p>`;
  if (!hype.chevaux.length) {   /* (861) même règle que l’appli : aucun cheval → invitation */
    // 10/10 : le texte de Blandine (le même que l'invitation affichée dans l'appli, build 852-853)
    html += `<h2 style="font-size:17px;color:#d8d2c4;margin:22px 0 6px">${t.boxT}</h2>`;
    html += `<p>${t.boxP}</p>`;
  }
  const pageDep = (ec.x === 1 || lg !== "fr") ? null : deps[dep];   // pas de lien depuis une fiche écartée ; pages départements en français seulement
  if (pageDep) html += `<p>Voir aussi : <a href="${echapper(pageDep[0])}">les centres équestres ${texte(pageDep[1])} (${texte(dep)})</a></p>`;
  html += `<p style="margin-top:22px;font-size:12px">${t.pied}</p>`;
  html += `</main>`;

  // 12/10/2026 : « carte d'identité » pour Google (schema.org) — seulement ce qui est vrai et déjà écrit sur la page,
  // et rien pour une fiche écartée. SportsActivityLocation = lieu d'activité sportive (une sorte de LocalBusiness).
  let jsonld = "";
  if (ec.x !== 1) {
    const url = DOMAINE + prefixe(lg) + "/ecurie/" + slug;
    const lieu: Record<string, unknown> = { "@context": "https://schema.org", "@type": "SportsActivityLocation", name: nom, url };
    const adr: Record<string, string> = { "@type": "PostalAddress", addressCountry: "FR" };
    const rue = cs ? propre(cs.adresse) : propre(ec.a);
    if (rue) adr.streetAddress = rue;
    if (!cs && propre(ec.cp)) adr.postalCode = propre(ec.cp);
    if (ville) adr.addressLocality = ville.replace(/\s*\([^)]*\)\s*$/, "");   // « Itteville (91) » → « Itteville »
    lieu.address = adr;
    if (typeof ec.la === "number" && typeof ec.lo === "number") lieu.geo = { "@type": "GeoCoordinates", latitude: ec.la, longitude: ec.lo };
    const tel = cs ? propre(cs.tel) : propre(ec.t);
    if (tel) lieu.telephone = tel;
    const site = cs ? propre(cs.site) : propre(ec.s);
    if (/^https?:\/\//i.test(site)) lieu.sameAs = [site];
    if (cs && propre(cs.phrase)) lieu.description = propre(cs.phrase);
    const fil: unknown[] = [{ "@type": "ListItem", position: 1, name: "Hype", item: DOMAINE + "/" + lg + "/" }];
    if (lg === "fr") fil.push({ "@type": "ListItem", position: 2, name: "Centres équestres", item: DOMAINE + "/fr/centres-equestres/" });
    if (pageDep) fil.push({ "@type": "ListItem", position: 3, name: "Centres équestres " + pageDep[1] + " (" + dep + ")", item: pageDep[0] });
    fil.push({ "@type": "ListItem", position: fil.length + 1, name: nom, item: url });
    const blocs = [lieu, { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: fil }];
    jsonld = blocs.map((b) => `<script type="application/ld+json">${JSON.stringify(b).replace(/</g, "\\u003c")}</script>`).join("");
  }

  // 12/10/2026 : x = écartée du référencement (pas une écurie, ou doublon ; outils/ecuries-exclues.json)
  return { titre, description, canonical: DOMAINE + prefixe(lg) + "/ecurie/" + slug, image: imageApercu(hype.banniere), nom, html, cachee: ec.x === 1, jsonld, lg, active, chemin: "/ecurie/" + slug };
}

/* ---------- Flux : la page Hype avec les ajouts (identique à cheval-route.ts) ---------- */
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
async function pageAvecRoute(source: Response, nomClub: string, seo: ReturnType<typeof construire>): Promise<Response | null> {
  if (!source.body) return null;
  const enc = new TextEncoder();
  const ajout = enc.encode(
    // 12/10 (correctif, comme l'accueil) : le texte pour Google ne doit jamais s'afficher pendant le chargement de
    // l'appli. Caché dès que le JavaScript démarre (classe hype-js) et toujours dans l'appli installée ; il reste
    // dans la page que Google lit.
    `<script>document.documentElement.classList.add("hype-js")</script>` +
    `<style>html.hype-js #seo-ecurie{display:none!important}@media (display-mode: standalone){#seo-ecurie{display:none!important}}</style>` +
    `<base href="/"><script>window.__HYPE_ROUTE_ECURIE=${JSON.stringify(nomClub).replace(/</g, "\\u003c")};</script>` +
    `<meta name="description" content="${echapper(seo.description)}">` +
    `<link rel="canonical" href="${echapper(seo.canonical)}">` +
    (seo.cachee ? `<meta name="robots" content="noindex, follow">` : "") +
    (seo.active ? liensLangues(seo.chemin) : "") +
    seo.jsonld +
    `<meta property="og:type" content="website">` +
    `<meta property="og:site_name" content="Hype">` +
    `<meta property="og:locale" content="${LOCALE[seo.lg]}">` +
    `<meta property="og:title" content="${echapper(seo.titre)}">` +
    `<meta property="og:description" content="${echapper(seo.description)}">` +
    `<meta property="og:url" content="${echapper(seo.canonical)}">` +
    `<meta property="og:image" content="${echapper(seo.image)}">` +
    `<meta property="og:image:alt" content="${echapper(seo.nom)}">` +
    `<meta name="twitter:card" content="summary_large_image">` +
    `<meta name="twitter:title" content="${echapper(seo.titre)}">` +
    `<meta name="twitter:description" content="${echapper(seo.description)}">` +
    `<meta name="twitter:image" content="${echapper(seo.image)}">`);
  const nouveauTitre = enc.encode(`<title>${echapper(seo.titre)}</title>`);
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
  if (pos < 0) { try { lecteur.cancel(); } catch { /* rien */ } return null; }
  const coupe = pos + REPERE.length;
  const posTitre = chercher(debut.subarray(coupe), REPERE_TITRE);
  const tTitre = posTitre >= 0 ? coupe + posTitre : -1;

  const morceaux: Uint8Array[] = [debut.subarray(0, coupe), ajout];
  let curseur = coupe;
  if (tTitre > 0 && (posRacine < 0 || tTitre < posRacine)) {
    morceaux.push(debut.subarray(curseur, tTitre), nouveauTitre);
    curseur = tTitre + REPERE_TITRE.length;
  }
  if (posRacine > curseur) {
    const finRacine = posRacine + REPERE_RACINE.length;
    morceaux.push(debut.subarray(curseur, finRacine), enc.encode(seo.html));
    curseur = finRacine;
  }
  morceaux.push(debut.subarray(curseur));
  let tete = new Uint8Array(0);
  for (const mo of morceaux) tete = coller(tete, mo);

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
  return new Response(flux, { status: 200, headers: new Headers({ "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=0, must-revalidate" }) });
}

export default async (request: Request, _context: Context) => {
  const url = new URL(request.url);
  const m = url.pathname.match(FORME_ADRESSE);
  if (!m || m[2].length > 120) return PAGE_404();
  const lg = (m[1] || "fr") as Lg;
  const slug = m[2];

  let ec: Ecurie | undefined;
  try { ec = (await annuaire(url.origin))[slug]; } catch (e) { console.log("[ecurie-route] annuaire :", String(e)); return PAGE_503(); }
  if (!ec || !propre(ec.n)) return PAGE_404();

  const [hype, geo, deps] = await Promise.all([
    contenuHype(ec.n),
    propre(ec.v) ? Promise.resolve(null) : communeDepuisCoordonnees(ec.la, ec.lo),
    departements(url.origin).catch(() => ({} as Record<string, [string, string]>)),
  ]);
  const seo = construire(slug, ec, geo, hype, deps, lg);
  // 13/10/2026 : version étrangère d'une écurie sans rien sur Hype (ou base injoignable) → la page française
  if (lg !== "fr" && (!seo.active || !hype.lu)) {
    return new Response(null, { status: 302, headers: { location: DOMAINE + "/ecurie/" + slug, "cache-control": "no-store" } });
  }

  try {
    // 12/10 (référencement action 2) : la copie de l'appli SANS le texte de l'accueil (seo-accueil.cjs) ;
    // si elle manque (publication sans le script), l'accueil comme avant.
    let source = await fetch(new URL("/app-base.html", url.origin), { headers: { accept: "text/html" } });
    if (!source.ok) { try { await source.body?.cancel(); } catch { /* rien */ } source = await fetch(new URL("/", url.origin), { headers: { accept: "text/html" } }); }
    if (!source.ok) { console.log("[ecurie-route] index.html http", source.status); return PAGE_503(); }
    const page = await pageAvecRoute(source, propre(ec.n), seo);
    if (!page) { console.log("[ecurie-route] repère <head> introuvable"); return PAGE_503(); }
    if (request.method === "HEAD") { try { await page.body?.cancel(); } catch { /* rien */ } return new Response(null, { status: 200, headers: page.headers }); }
    return page;
  } catch (e) {
    console.log("[ecurie-route] erreur page :", String(e));
    return PAGE_503();
  }
};

export const config = { path: ["/ecurie/*", "/en/ecurie/*", "/es/ecurie/*", "/it/ecurie/*", "/de/ecurie/*", "/ja/ecurie/*", "/ar/ecurie/*", "/zh/ecurie/*", "/nl/ecurie/*"] };
