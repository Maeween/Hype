# HYPE ▸ outils/fa/quinze-langues.py — 12/11 : « 14 langues » → « 15 langues » et ajout du persan à la fin des listes de langues,
# sur les pages publiques de chaque langue. Relançable (ne refait rien si déjà fait).
import re, glob, os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
R = {
 "fr": [("14 langues", "15 langues"), ("polonais et coréen", "polonais, coréen et persan"), ("polonais ou coréen", "polonais, coréen ou persan")],
 "en": [("14 languages", "15 languages"), ("Polish and Korean", "Polish, Korean and Persian"), ("Polish or Korean", "Polish, Korean or Persian")],
 "es": [("14 idiomas", "15 idiomas"), ("polaco y coreano", "polaco, coreano y persa"), ("polaco o coreano", "polaco, coreano o persa")],
 "it": [("14 lingue", "15 lingue"), ("polacco e coreano", "polacco, coreano e persiano"), ("polacco o coreano", "polacco, coreano o persiano")],
 "de": [("14 Sprachen", "15 Sprachen"), ("Polnisch und Koreanisch", "Polnisch, Koreanisch und Persisch"), ("Polnisch oder Koreanisch", "Polnisch, Koreanisch oder Persisch")],
 "nl": [("14 talen", "15 talen"), ("Pools en Koreaans", "Pools, Koreaans en Perzisch"), ("Pools of Koreaans", "Pools, Koreaans of Perzisch")],
 "pt": [("14 idiomas", "15 idiomas"), ("polonês e coreano", "polonês, coreano e persa"), ("polonês ou coreano", "polonês, coreano ou persa")],
 "sv": [("14 språk", "15 språk"), ("polska och koreanska", "polska, koreanska och persiska"), ("polska eller koreanska", "polska, koreanska eller persiska")],
 "ru": [("14 языках", "15 языках"), ("польском и корейском", "польском, корейском и персидском"), ("польском или корейском", "польском, корейском или персидском")],
 "pl": [("14 językach", "15 językach"), ("polski i koreański", "polski, koreański i perski")],
 "zh": [("14 种语言", "15 种语言"), ("波兰语和韩语", "波兰语、韩语和波斯语"), ("波兰语或韩语", "波兰语、韩语或波斯语")],
 "ja": [("14か国語", "15か国語"), ("ポーランド語、韓国語", "ポーランド語、韓国語、ペルシア語")],
 "ar": [("بأربع عشرة لغة", "بخمس عشرة لغة"), ("البولندية والكورية", "البولندية والكورية والفارسية"), ("البولندية أو الكورية", "البولندية أو الكورية أو الفارسية")],
 "ko": [("14개 언어", "15개 언어"), ("폴란드어, 한국어", "폴란드어, 한국어, 페르시아어")],
}
tot = 0
for lg, regles in R.items():
    for f in glob.glob(lg + "/**/index.html", recursive=True):
        s = open(f, encoding="utf-8").read(); t = s
        for a, b in regles:
            if b in t and a not in t.replace(b, ""): continue
            t = t.replace(a, b)
        if t != s: open(f, "w", encoding="utf-8").write(t); tot += 1
print("[fa] pages passées à 15 langues :", tot)
