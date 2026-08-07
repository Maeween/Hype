# -*- coding: utf-8 -*-
"""Controle de syntaxe de TOUS les blocs script, jamais d'un index fixe.
Le 6 aout 2026, un `}` en trop est passe parce que je verifiais le bloc 14
alors que l'ajout de deux <script src> avait decale le bloc inline en 16."""
import io, re, subprocess, sys, glob
def blocs(path):
    s=io.open(path,encoding="utf-8").read()
    return re.findall(r'<script[^>]*>(.*?)</script>', s, re.S)
ok=True
for path in sys.argv[1:]:
    if path.endswith((".html",)):
        n=0
        for i,b in enumerate(blocs(path)):
            if not b.strip(): continue
            n+=1
            f="/tmp/v%d.js"%i; io.open(f,"w",encoding="utf-8").write(b)
            r=subprocess.run(["node","--check",f],capture_output=True,text=True)
            if r.returncode:
                ok=False; print("ERREUR %s bloc %d :"%(path,i)); print(r.stderr[:500])
        print("%-32s %d bloc(s) non vide(s) : %s" % (path, n, "OK" if ok else "ECHEC"))
    else:
        r=subprocess.run(["node","--check",path],capture_output=True,text=True)
        print("%-32s %s" % (path, "OK" if r.returncode==0 else r.stderr[:300]))
        if r.returncode: ok=False
sys.exit(0 if ok else 1)
