#!/usr/bin/env python3
"""HYPE — génère hype-ecran-articles.js (page Le Mag) depuis outils/mag/modele.js.
@@OLD:n@@  = n-ième texte traduit (tr({...}) ou hypeT7(...)) de l'ANCIENNE page (outils/mag/ancienne-page.js), recopié tel quel ;
@@NV@@      = outils/mag/textes.json (nouveaux textes, 14 langues) ; @@LIRE@@ = textes.json « lire » ;
@@ART:clé@@ = texte de l'article CSO (outils/article-cso/<langue>.json) ; @@GALOP@@ = texte « Galop n » de l'ancienne page.
Usage (racine du dépôt) : python3 -I outils/mag/generer.py"""
import json, os, re, sys
ICI = os.path.dirname(os.path.abspath(__file__)); RAC = os.path.dirname(os.path.dirname(ICI))
LG = ["fr","en","es","it","ja","de","ar","zh","nl","pt","sv","ru","pl","ko"]
ancien = open(os.path.join(ICI, "ancienne-page.js"), encoding="utf-8").read()
pat = re.compile(r'tr\(\{ ?fr: ?"(?:[^"\\]|\\.)*"[^}]*\}\)|hypeT7\("(?:[^"\\]|\\.)*"[^)]*\)')
OLD = [m.group(0) for m in pat.finditer(ancien)]
nv = json.load(open(os.path.join(ICI, "textes.json"), encoding="utf-8"))
for k, v in nv.items():
    manque = [l for l in LG if not v.get(l)]
    if manque: sys.exit("textes.json : " + k + " sans " + ",".join(manque))
art = {l: json.load(open(os.path.join(RAC, "outils/article-cso", l + ".json"), encoding="utf-8")) for l in LG}
s = open(os.path.join(ICI, "modele.js"), encoding="utf-8").read()
s = s.replace("@@NV@@", json.dumps(nv, ensure_ascii=False))
s = s.replace("@@LIRE@@", json.dumps(nv["lire"], ensure_ascii=False))
s = s.replace("@@GALOP@@", OLD[19])
s = re.sub(r"@@OLD:(\d+)@@", lambda m: OLD[int(m.group(1))], s)
s = re.sub(r"@@ART:(\w+)@@", lambda m: json.dumps({l: art[l][m.group(1)].replace("*", "") for l in LG}, ensure_ascii=False), s)
if "@@" in s: sys.exit("marque non remplacée")
open(os.path.join(RAC, "hype-ecran-articles.js"), "w", encoding="utf-8").write(s)
print("OK hype-ecran-articles.js", len(s.encode("utf-8")), "octets ;", len(OLD), "textes repris de l'ancienne page")
