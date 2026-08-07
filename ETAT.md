# Traductions prêtes à injecter — Galop 3, `g3-c13` et `g3-c14`

Ce sont les deux derniers chapitres non traduits jusqu'au Galop 4. Ils étaient monolingues
français ce matin ; leur structure a été convertie et prouvée neutre, il ne reste que la traduction.

## Prêt, parité de clés vérifiée

| Fichier | Chapitre | Langue | Chaînes | Parité |
|---|---|---|---|---|
| `de-g3-c14.json` | Les aides pour tourner | 🇩🇪 | 269 | **269/269** ✓ |
| `en-g3-c13.json` | Agir, résister et céder | 🇬🇧 | 249 | **249/249** ✓ |
| `es-g3-c13.json` | Agir, résister et céder | 🇪🇸 | 249 | **249/249** ✓ |

Les fichiers `auto-*.json` accompagnent chacun leur traduction : ce sont les chaînes résolues
par le lexique, relues une par une.

## Commandes, dans cet ordre

```
node injecter2.js g3-c14 de auto-g3-c14-de.json de-g3-c14.json
node injecter2.js g3-c13 en auto-g3-c13-en.json en-g3-c13.json
node injecter2.js g3-c13 es auto-g3-c13-es.json es-g3-c13.json
```

**Le fichier `auto` toujours en premier**, la traduction écrite à la main ensuite — sinon le
lexique écrase les choix de traduction.

## Après ces trois injections

| | Baby | G1 | G2 | G3 | G4 |
|---|---|---|---|---|---|
| fr | 27/27 | 19/19 | 15/15 | 16/16 | 15/15 |
| **de** | 27/27 | 19/19 | 15/15 | **16/16** | 15/15 |
| en · es | 27/27 | 19/19 | 15/15 | 15/16 | 15/15 |
| it · ja | 27/27 | 19/19 | 15/15 | 14/16 | 15/15 |

**L'allemand devient complet de Baby au Galop 4.**

## Reste à écrire

| Chapitre | Langues | Chaînes |
|---|---|---|
| `g3-c13` | it, ja | 249 × 2 |
| `g3-c14` | en, es, it, ja | 281 × 4 |

Les fichiers `fr-<id>-<langue>.json` et `auto-<id>-<langue>.json` de ces six-là sont déjà
extraits dans l'espace de travail. Attention : pour `g3-c14`, l'allemand avait 269 chaînes à
écrire mais les autres langues en ont **281** — le lexique allemand était plus fourni grâce à
`g3-c13` déjà traduit.

## Terminologie fixée, à ne pas dévier

**`g3-c13`** — agir / résister / céder :
- 🇩🇪 `einwirken` / `verwahren` / `nachgeben` (le triplet consacré en équitation allemande)
- 🇬🇧 `acting` / `resisting` / `yielding`
- 🇪🇸 `actuar` / `resistir` / `ceder`

**`g3-c14`** — les aides pour tourner :
- 🇩🇪 `innerer` / `äußerer Zügel`, `öffnender Zügel`, `Stellung` (le pli), `Bogen` (la courbe),
  `Zirkel`, `Volte`, `Hufschlag`, `Ausfallen der Hinterhand` (le dérapage)
- le bloc « Agir puis céder » de `g3-c14` réutilise mot pour mot le triplet de `g3-c13`

## Contrôles à enchaîner après injection

```
node preuve_rendu.js <index-avant>.html fr    # doit dire IDENTIQUE AU CARACTERE PRES
node preuve_rendu.js <index-avant>.html de    # 0 perdue, 0 ajoutee
node rendu.js de ; node rendu.js en ; node rendu.js es
node audit2.js de --court                     # Galop 3 doit passer a 16/16
```

**Rappel :** depuis la conversion de structure, `controle.js` (comparaison par chemins de
données) crie faussement « 677 champs perdus » sur le Galop 3. C'est `preuve_rendu.js`, qui
compare le rendu, qui fait foi.
