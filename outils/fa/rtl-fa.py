# HYPE ▸ outils/fa/rtl-fa.py — 12/11 : étend au persan (fa) le sens droite-à-gauche et le repli vers l'anglais.
# Relançable : ne retouche pas ce qui est déjà fait. Usage : python3 outils/fa/rtl-fa.py (depuis la racine du dépôt)
import re, glob
files = ['index.html'] + sorted(glob.glob('hype-*.js'))
VAR = r'(?:window\.__hypeLangue|ctx\.langue|ctxV\.langue|props\.langue|d\.lg|x\.lg|lgM|lgV|langueIntro|langue|actif|LG|lg)'
pat = re.compile(r'(\(?)(?<![\w.])(' + VAR + r') === "ar"(?! \|\| [\w.]+ === "fa")')
INDICES = ('rtl', 'Rtl', 'dir', '›', '\\u203a', 'paddingRight', 'letterSpacing', 'left:', ' ar"', "' ar'")
EXCLURE = ('ar-lb', 'toLocaleDateString', 'G1O_COMP_AR', 'glexSansAl', 'Collator', 'المركز', '" س"', 'String(pl)', 'String(n)', 'Teilen', '(ar||fr)', '(ar || fr)', 'replace(/[أإآٱ]')
n_rtl = n_ko = 0
for f in files:
    s = open(f, encoding='utf-8').read()
    lines = s.split('\n')
    for i, l in enumerate(lines):
        if '=== "ar"' not in l: continue
        def rep(m):
            global n_rtl
            ctx = l[max(0, m.start() - 70):m.end() + 70]
            if any(e in ctx for e in EXCLURE) or not any(k in ctx for k in INDICES): return m.group(0)
            n_rtl += 1
            v = m.group(2)
            return m.group(1) + '(' + v + ' === "ar" || ' + v + ' === "fa")'
        lines[i] = pat.sub(rep, l)
    t = '\n'.join(lines)
    # uniquement les listes de repli vers l'anglais (« … === "pl" || X === "ko") »), jamais un test du coréen seul
    t, k = re.subn(r'(=== "pl" \|\| )(?<![\w.])(' + VAR + r'|L|l) === "ko"\)', lambda m: m.group(1) + m.group(2) + ' === "ko" || ' + m.group(2) + ' === "fa")', t)
    n_ko += k
    if t != s: open(f, 'w', encoding='utf-8').write(t)
print("[fa] droite-à-gauche étendus :", n_rtl, "— replis vers l'anglais :", n_ko)
