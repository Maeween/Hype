#!/usr/bin/env python3
"""HYPE — génère hype-article-cso.js (racine du dépôt) à partir de modele.js + les fichiers <langue>.json.
Usage : python3 -I outils/article-cso/generer.py   (depuis la racine du dépôt)
Contrôles : 14 langues présentes, mêmes clés que fr.json, aucune valeur vide, même nombre de ** et de * que le français."""
import json, os, sys, re

ICI = os.path.dirname(os.path.abspath(__file__))
RACINE = os.path.dirname(os.path.dirname(ICI))
LANGUES = ["fr", "en", "es", "it", "ja", "de", "ar", "zh", "nl", "pt", "sv", "ru", "pl", "ko"]

fr = json.load(open(os.path.join(ICI, "fr.json"), encoding="utf-8"))
txt, erreurs = {}, []
for lg in LANGUES:
    chemin = os.path.join(ICI, lg + ".json")
    if not os.path.exists(chemin):
        erreurs.append(lg + " : fichier absent"); continue
    d = json.load(open(chemin, encoding="utf-8"))
    if set(d) != set(fr):
        erreurs.append(lg + " : clés différentes " + str(sorted(set(fr) ^ set(d))))
    for k, v in d.items():
        if not str(v).strip():
            erreurs.append(lg + " : " + k + " vide")
        if k in fr:
            if v.count("**") != fr[k].count("**"):
                erreurs.append(lg + " : " + k + " gras différent")
            if len(re.findall(r"(?<!\*)\*(?!\*)", v)) != len(re.findall(r"(?<!\*)\*(?!\*)", fr[k])):
                erreurs.append(lg + " : " + k + " doré différent")
    txt[lg] = {k: d.get(k, fr[k]) for k in fr}

if erreurs:
    print("\n".join(erreurs)); sys.exit(1)
modele = open(os.path.join(ICI, "modele.js"), encoding="utf-8").read()
js = modele.replace("__TXT__", json.dumps(txt, ensure_ascii=False, separators=(",", ":")), 1)
open(os.path.join(RACINE, "hype-article-cso.js"), "w", encoding="utf-8").write(js)
print("OK hype-article-cso.js", len(js.encode("utf-8")), "octets,", len(txt), "langues,", len(fr), "textes")
