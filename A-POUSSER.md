# À pousser — Hype Lingo, voyage 1

**Tout à la racine du dépôt.** Aucun dossier à créer.

⚠️ **Ne dépose jamais de fichier nommé `index.html`.** C'est l'application Hype elle-même, et elle a déjà été écrasée une fois.

---

## Ce qui a changé aujourd'hui

| Fichier | Quoi |
|---|---|
| **`lingo.html`** | 79 Ko. Le carnet de route, le titre « Les Îles », les dix villes, les fonds vivants, le cheval noir, **et la leçon jouable** |
| **`hype-lingo-villes.js`** | 14 Ko. Les dix villes : lettre manuscrite et trois volets. Remplace l'objet à trois villes qui était en dur dans `lingo.html` |
| **`cheval.webp`** | 2 Ko. Le cheval noir monté, détouré. Remplace Apy sur le chemin |
| **`fond-*.webp`** | 10 fichiers, 19 Ko au total. Les cartes floutées qui servent de fond aux textes |

## Ce qui était déjà poussé et n'a pas changé

Les 20 `carte-*.webp`, les 13 `.mp4`, les 8 `hype-lingo-lex-*.js`.

---

## Après le déploiement, vérifie dans cet ordre

1. **`majestic-melba-997a68.netlify.app/lingo.html`** → tu dois voir **LES ÎLES** et le carnet de route, avec un fond flou animé.
2. **Partir** → l'ouverture de 12 s, cette fois **entière et non rognée** (bandes noires en haut et en bas, c'est normal : la vidéo est en paysage).
3. Fais glisser le doigt sur le chemin → le **cheval noir** a remplacé le poney spectral.
4. **Arriver à Newmarket** → vidéo, récit, **la carte postale se retourne au doigt**, les trois volets s'ouvrent.
5. **« Les mots du chapitre »** → quatre leçons, puis 21 étapes. C'est le morceau nouveau : joue-en une en entier.

---

## Ce qui manque, pour que tu ne le cherches pas

**`hype-lingo-lex-pansage.js`** est appelé par `lingo.html` mais absent du dépôt. Le chapitre 2 (Lambourn) affichera un message explicite au lieu de planter. Si tu l'as de ton côté, pousse-le.

**Huit `reprise-<ville>.mp4`** manquent : au retour dans une ville, c'est la grande arrivée qui rejoue. Rien ne casse. Une seule reprise générique de 3 s règlerait les huit.

**Le vocal** n'est pas branché — décidé en Premium, pas encore prototypé.

**Le chapitre 10, Les dialogues**, n'a pas de vocabulaire.

---

## Le SUIVI

`SUIVI.md` est à jour, session 84. Il part de la version que tu m'as donnée ce matin — **si une autre conversation y a écrit depuis, ne pousse pas la mienne par-dessus sans regarder**, sinon tu perdrais son travail. Dans ce cas, envoie-moi la version à jour et je réinsère juste mon bloc.
