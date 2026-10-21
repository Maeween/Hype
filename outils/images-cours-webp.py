#!/usr/bin/env python3
"""21/10/2026 — Allège les images des cours (Chemin Baby, Galops 1 à 7).
Pour chaque image appelée par un fichier de cours via HYPE_IMGS["kNNN"], fabrique une copie WebP (au plus 1600 px de
large, qualité 82 : le texte des affiches reste lisible) dans images/webp/, seulement si elle est au moins 10 % plus
légère. Puis écrit hype-images-webp-vN.js, qui fait pointer ces clés vers les copies WebP (chargé dans index.html juste
après hype-images-tout-v1.js). Les images d'origine ne sont JAMAIS modifiées ni supprimées.
⚠ Les fichiers hype-images-*.js sont gardés un an dans les téléphones (_headers) : ne jamais réécrire un fichier déjà
publié ; pour refaire après l'ajout d'images, passer à la version suivante (v2, v3…) et changer la balise dans index.html.
Usage : python3 outils/images-cours-webp.py 2   (le numéro de version du fichier à écrire)"""
import re, os, glob, io, sys, json
from PIL import Image
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
VERSION = sys.argv[1] if len(sys.argv) > 1 else "1"
LARG, QUAL = 1600, 82
m = {}
for f in sorted(glob.glob(os.path.join(R, "hype-images-tout-v*.js"))) + sorted(glob.glob(os.path.join(R, "hype-images-[0-9]*.js"))) + [os.path.join(R, "index.html")]:
    for k, u in re.findall(r'HYPE_IMGS\["(k\d+)"\]\s*=\s*"([^"]+)"', open(f, encoding="utf8", errors="ignore").read()):
        m.setdefault(k, u)
cles = set()
for f in ["hype-cours-baby.js"] + ["hype-cours-galop%d.js" % n for n in range(1, 8)]:
    cles |= set(re.findall(r'HYPE_IMGS\["(k\d+)"\]', open(os.path.join(R, f), encoding="utf8").read()))
carte, av, ap, faites = {}, 0, 0, 0
for k in sorted(cles, key=lambda x: int(x[1:])):
    u = m.get(k)
    if not u or not u.startswith("images/") or u.startswith("images/webp/"): continue
    src = os.path.join(R, u.split("?")[0])
    if not os.path.exists(src): continue
    dest_rel = "images/webp/" + os.path.splitext(u.split("?")[0][len("images/"):])[0] + ".webp"
    dest = os.path.join(R, dest_rel)
    t = os.path.getsize(src)
    if not os.path.exists(dest):
        im = Image.open(src)
        im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") and "transparency" in im.info or im.mode in ("RGBA", "LA") else "RGB")
        if im.width > LARG: im = im.resize((LARG, round(im.height * LARG / im.width)), Image.LANCZOS)
        b = io.BytesIO(); im.save(b, "WEBP", quality=QUAL, method=6)
        if b.tell() > t * 0.9: continue
        os.makedirs(os.path.dirname(dest), exist_ok=True); open(dest, "wb").write(b.getvalue()); faites += 1
    carte[k] = dest_rel; av += t; ap += os.path.getsize(dest)
js = ("/* FABRIQUÉ par outils/images-cours-webp.py (21/10/2026) — images des cours en WebP (≤ %d px, q%d). Ne pas modifier :\n"
      "   ce fichier est gardé un an dans les téléphones ; pour refaire, nouvelle version (v suivante) + balise dans index.html.\n"
      "   Pas sur les iPhone/iPad en iOS 13 ou moins (WebP non lu) : ils gardent les images d'origine. */\n"
      "(function () {\n  try { var mI = /OS (\\d+)_\\d+(_\\d+)? like Mac OS X/.exec(navigator.userAgent || \"\"); if (mI && +mI[1] < 14) return; } catch (e) { }\n"
      "  if (typeof HYPE_IMGS === \"undefined\" || !HYPE_IMGS) return;\n  var W = %s;\n  for (var k in W) HYPE_IMGS[k] = W[k];\n})();\n") % (LARG, QUAL, json.dumps(carte, separators=(",", ":")))
open(os.path.join(R, "hype-images-webp-v%s.js" % VERSION), "w").write(js)
print("%d images (dont %d nouvelles) : %.1f Mo -> %.1f Mo ; hype-images-webp-v%s.js écrit" % (len(carte), faites, av / 1048576, ap / 1048576, VERSION))
