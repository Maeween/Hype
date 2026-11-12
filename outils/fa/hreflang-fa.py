# HYPE ▸ outils/fa/hreflang-fa.py — 12/11 : signale aux moteurs (Google, Bing) les pages publiques persanes (fa/).
# Pour chaque page qui a une version fa/<chemin>/index.html : ajoute <link hreflang="fa"> juste après celui du coréen,
# dans toutes les langues et dans les plans du site (+ une entrée <url> par page persane). Relançable.
import os, re, glob
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
os.chdir(R)
fa_pages = set(os.path.dirname(p)[3:] for p in glob.glob("fa/**/index.html", recursive=True))   # "" , "cgv", ...
def chemin(url):  # https://2hype.fr/ko/cgv/ -> "cgv"
    m = re.match(r"https://2hype\.fr/ko/(.*?)/?$", url); return m.group(1) if m else None
n = 0
re_h = re.compile(r'(<link rel="alternate" hreflang="ko" href="(https://2hype\.fr/ko/[^"]*)">)')
for f in glob.glob("*/**/index.html", recursive=True):
    if f.startswith(("docs/", "outils/", "node_modules/")): continue
    s = open(f, encoding="utf-8").read()
    if 'hreflang="fa"' in s: continue
    def rep(m):
        global n
        c = chemin(m.group(2))
        if c is None or c not in fa_pages: return m.group(1)
        n += 1
        return m.group(1) + '\n<link rel="alternate" hreflang="fa" href="https://2hype.fr/fa/' + (c + "/" if c else "") + '">'
    t = re_h.sub(rep, s)
    if t != s: open(f, "w", encoding="utf-8").write(t)
re_x = re.compile(r'(\s*)(<xhtml:link rel="alternate" hreflang="ko" href="(https://2hype\.fr/ko/[^"]*)"/>)')
for f in glob.glob("sitemap*.xml"):
    s = open(f, encoding="utf-8").read()
    def rx(m):
        global n
        if t0[m.end():m.end() + 60].lstrip().startswith('<xhtml:link rel="alternate" hreflang="fa"'): return m.group(0)   # déjà fait
        c = chemin(m.group(3))
        if c is None or c not in fa_pages: return m.group(0)
        n += 1
        return m.group(0) + m.group(1) + '<xhtml:link rel="alternate" hreflang="fa" href="https://2hype.fr/fa/' + (c + "/" if c else "") + '"/>'
    t0 = s
    t = re_x.sub(rx, s)
    # une entrée <url> par page persane, copiée sur l'entrée coréenne
    for c in sorted(fa_pages):
        ko = "https://2hype.fr/ko/" + (c + "/" if c else "")
        m = re.search(r'[ \t]*<url>\s*<loc>' + re.escape(ko) + r'</loc>[\s\S]*?</url>\n', t)
        if m and ("<loc>https://2hype.fr/fa/" + (c + "/" if c else "") + "</loc>") not in t:   # (la recherche tolère les retraits)
            bloc = m.group(0).replace("<loc>" + ko + "</loc>", "<loc>https://2hype.fr/fa/" + (c + "/" if c else "") + "</loc>")
            t = t[:m.end()] + bloc + t[m.end():]; n += 1
    if t != s: open(f, "w", encoding="utf-8").write(t)
print("[fa] pages persanes:", len(fa_pages), "— ajouts:", n)

# Menu des langues en haut des pages : ajoute « فارسی » après « 한국어 » (lien, ou langue en cours sur les pages fa/).
m_n = 0
for f in glob.glob("*/**/index.html", recursive=True):
    if f.startswith(("docs/", "outils/", "node_modules/")): continue
    lg = f.split("/")[0]
    c = os.path.dirname(f)[len(lg) + 1:]
    if c not in fa_pages: continue
    s = open(f, encoding="utf-8").read()
    if 'lang="fa">فارسی' in s or 'lang="fa" aria-current="page">' in s: continue
    suf = (c + "/") if c else ""
    if lg == "fa":
        s2 = s.replace('<li><strong lang="en" aria-current="page">English</strong></li>',
                       '<li><a href="https://2hype.fr/en/' + suf + '" hreflang="en" lang="en">English</a></li>')
        item = '<li><strong lang="fa" aria-current="page">فارسی</strong></li>'
    else:
        s2 = s
        item = '<li><a href="https://2hype.fr/fa/' + suf + '" hreflang="fa" lang="fa">فارسی</a></li>'
    t = re.sub(r'(<li><a href="https://2hype\.fr/ko/[^"]*" hreflang="ko" lang="ko">[^<]*</a></li>|<li><strong lang="ko" aria-current="page">[^<]*</strong></li>)',
               lambda m: m.group(1) + item, s2, count=1)
    if t != s: open(f, "w", encoding="utf-8").write(t); m_n += 1
print("[fa] menus de langues complétés :", m_n)

# Pied de page « · »-séparé : ajoute « فارسی » après « 한국어 » (lien, ou langue en cours sur fa/), et rend « English » cliquable sur fa/.
p_n = 0
for f in glob.glob("*/**/index.html", recursive=True):
    if f.startswith(("docs/", "outils/", "node_modules/")): continue
    lg = f.split("/")[0]
    c = os.path.dirname(f)[len(lg) + 1:]
    if c not in fa_pages: continue
    s = open(f, encoding="utf-8").read()
    if ' · <a href="https://2hype.fr/fa/' in s or ' · <strong lang="fa">' in s: continue
    suf = (c + "/") if c else ""
    if lg == "fa":
        s2 = s.replace('<strong lang="en">English</strong>', '<a href="https://2hype.fr/en/' + suf + '" hreflang="en" lang="en">English</a>')
        item = ' · <strong lang="fa">فارسی</strong>'
    else:
        s2 = s
        item = ' · <a href="https://2hype.fr/fa/' + suf + '" hreflang="fa" lang="fa">فارسی</a>'
    t = re.sub(r'(<a href="https://2hype\.fr/ko/[^"]*" hreflang="ko" lang="ko">[^<]*</a>|<strong lang="ko">[^<]*</strong>)(?=</p>)', lambda m: m.group(1) + item, s2, count=1)
    if t != s: open(f, "w", encoding="utf-8").write(t); p_n += 1
print("[fa] pieds de page complétés :", p_n)
