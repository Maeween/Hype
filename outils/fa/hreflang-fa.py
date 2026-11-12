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
    if 'hreflang="fa"' in s: continue
    def rx(m):
        global n
        c = chemin(m.group(3))
        if c is None or c not in fa_pages: return m.group(0)
        n += 1
        return m.group(0) + m.group(1) + '<xhtml:link rel="alternate" hreflang="fa" href="https://2hype.fr/fa/' + (c + "/" if c else "") + '"/>'
    t = re_x.sub(rx, s)
    # une entrée <url> par page persane, copiée sur l'entrée coréenne
    for c in sorted(fa_pages):
        ko = "https://2hype.fr/ko/" + (c + "/" if c else "")
        m = re.search(r'  <url>\n    <loc>' + re.escape(ko) + r'</loc>[\s\S]*?</url>\n', t)
        if m and ("<loc>https://2hype.fr/fa/" + (c + "/" if c else "") + "</loc>") not in t:
            bloc = m.group(0).replace("<loc>" + ko + "</loc>", "<loc>https://2hype.fr/fa/" + (c + "/" if c else "") + "</loc>")
            t = t[:m.end()] + bloc + t[m.end():]; n += 1
    if t != s: open(f, "w", encoding="utf-8").write(t)
print("[fa] pages persanes:", len(fa_pages), "— ajouts:", n)
