# Ajouter le persan (fa) dans un fichier de code serveur de Hype

Le persan (code « fa », 15e langue) est déjà dans l'appli. Il faut maintenant l'ajouter dans les fichiers du serveur, partout où les 14 autres langues sont listées.
Lis /home/claude/hype/outils/fa/CONSIGNES.md pour le glossaire et le ton (tutoiement « تو »).

Règles :
1. Partout où il y a une liste ou une table des langues (["fr", …, "ko"], type Lg = … | "ko", Record<Lg,…>, objets { …, ko: … }, tableaux [["ko", "…"]]), ajoute « fa » JUSTE APRÈS « ko », avec un texte persan équivalent au coréen/anglais/français. Ne retire et ne réordonne rien.
2. Codes : hreflang/HTML lang = "fa" ; locale og = "fa_IR" ; noms de langue : en français « persan », en persan « فارسی ».
3. Droite-à-gauche : partout où le code teste l'arabe pour le sens d'écriture (lg === "ar" → dir="rtl", virgule arabe « ، », etc.), ajoute le persan (lg === "ar" || lg === "fa"). Ne touche pas aux tests qui choisissent un texte arabe précis.
4. Dates : le persan garde l'ordre jour/mois/année (comme le français), pas l'ordre japonais/chinois/coréen.
5. Les chemins d'URL par langue (ex. config path: ["/ko/cheval/*"]) : ajoute la même entrée en "/fa/…".
6. Pour une consigne donnée à l'IA (prompt système en coréen, etc.) : écris l'équivalent en persan, fidèle au français/anglais, et dis à l'IA de répondre en persan (فارسی).
7. Ne change rien d'autre (aucun nettoyage, aucune autre amélioration). Garde le style du fichier.
8. Vérifie la syntaxe : `node --check fichier.js` pour du JS ; pour du TypeScript : `npx -y esbuild@0.24.0 fichier.ts --format=esm --log-level=warning > /dev/null` (depuis un dossier temporaire, pas dans le dépôt). Pour du Python : `python3 -m py_compile`.
9. Pas de git, pas de publication, ne lance aucun déploiement.
À la fin, réponds en 2 lignes : fichiers modifiés, nombre d'ajouts « fa », syntaxe OK.
