# HYPE ▸ outils/fa/fusionner.py — rassemble les lots traduits (lots/lot-NNN.fa.json : {numéro: persan})
# dans traductions.json (clé = français + \u0001 + anglais), puis relancer injecter-fa.cjs.
import json, glob, os
D = os.path.dirname(os.path.abspath(__file__))
src = {}
for f in glob.glob(os.path.join(D, "lots", "lot-[0-9][0-9][0-9].json")):
    for x in json.load(open(f, encoding="utf-8")): src[str(x["i"])] = x
dico_f = os.path.join(D, "traductions.json")
dico = json.load(open(dico_f, encoding="utf-8")) if os.path.exists(dico_f) else {}
n = 0
for f in sorted(glob.glob(os.path.join(D, "lots", "lot-*.fa.json"))):
    for i, fa in json.load(open(f, encoding="utf-8")).items():
        x = src.get(str(i))
        if x is None or fa is None: continue
        dico[x["fr"] + "\u0001" + (x["en"] or "")] = fa; n += 1
json.dump(dico, open(dico_f, "w", encoding="utf-8"), ensure_ascii=False, indent=0, sort_keys=True)
print("[fa] traductions rassemblées :", len(dico), "(dont", n, "lues dans les lots)")
