# Pages publiques Hype en persan (fa)

Tu crées la version persane d'une page publique du site 2hype.fr à partir de la version anglaise.
- Source : /home/claude/hype/en/<chemin>/index.html  → Écris : /home/claude/hype/fa/<chemin>/index.html (crée les dossiers).
- Lis aussi /home/claude/hype/outils/fa/CONSIGNES.md (glossaire, tutoiement) ; pour la version persane de la page, regarde aussi la version arabe /home/claude/hype/ar/<chemin>/index.html pour voir comment le droite-à-gauche est fait.

Règles :
1. Garde le HTML STRICTEMENT identique (balises, classes, styles, scripts, images, structure, liens externes) ; ne change QUE le texte visible et les textes de référencement : <title>, meta description, og:title/og:description/twitter, attributs alt, aria-label, title, et les textes dans les données structurées JSON-LD (name, description, etc. — pas les URL ni les @type).
2. `<html lang="en">` → `<html lang="fa" dir="rtl">`. og:locale → fa_IR.
3. Liens internes vers la version anglaise : `https://2hype.fr/en/...` et `/en/...` → `/fa/...` (même chemin), y compris canonical et og:url. NE TOUCHE PAS aux lignes `<link rel="alternate" hreflang=...>` ni aux liens du sélecteur de langues (ceux qui ont hreflang="..." ou lang="..." vers les autres langues) : je m'en occupe.
4. Si un lien d'appli contient un paramètre de langue (ex. `?lang=en`, `#lang=en`, `/app?lg=en`), mets `fa`.
5. Toute mention du nombre de langues (« 14 languages ») devient « 15 زبان ».
6. Tutoiement (تو) partout, SAUF conditions générales (cgv), mentions légales et page association (donateurs) → « شما ».
7. Ne traduis pas : Hype, Hey Baby, Premium, FFE, noms propres, sigles (AE, BPJEPS, DEJEPS, DESJEPS, CSO…), adresses, SIREN, montants, e-mails.
8. Vérifie à la fin que le fichier est du HTML bien formé (même nombre de balises que la source) : python3 -c "import re,sys;a=open(sys.argv[1]).read();b=open(sys.argv[2]).read();t=lambda s:len(re.findall(r'<[a-zA-Z/!]',s));print(t(a),t(b))" en/<chemin>/index.html fa/<chemin>/index.html (depuis /home/claude/hype) — les deux nombres doivent être égaux. Et qu'il ne reste pas de phrase anglaise visible.
Ne touche à aucun autre fichier, pas de git.
