# `g3-c14` Les aides pour tourner — allemand, prêt à injecter

## Contenu

| Fichier | Rôle |
|---|---|
| `de-g3-c14.json` | **la traduction** — 269 chaînes, parité de clés vérifiée (269/269, 0 manquante, 0 en trop) |
| `auto-g3-c14-de.json` | 34 chaînes résolues automatiquement par le lexique (relues, aucune erreur de contexte) |
| `fr-g3-c14-de.json` | le français source, pour référence |

## Commande, dans l'ordre impératif

```
node injecter2.js g3-c14 de auto-g3-c14-de.json de-g3-c14.json
```

Le fichier `auto` **d'abord**, la traduction écrite à la main **ensuite** : sinon le lexique
écrase les choix de traduction.

## Contrôles à enchaîner

```
node preuve_rendu.js <index-avant>.html fr     # doit dire IDENTIQUE AU CARACTERE PRES
node preuve_rendu.js <index-avant>.html de     # 0 perdue, 0 ajoutee ; seules des valeurs DIFFERENTES
node rendu.js de                               # aucune anomalie
node audit2.js de --court                      # doit passer le Galop 3 a 16/16
```

## Terminologie retenue

Alignée sur `g3-c13`, déjà en ligne :

- innerer / äußerer Zügel · öffnender Zügel
- Schulter · Hinterhand (*Ausfallen der Hinterhand* pour le dérapage)
- **Stellung** pour le pli · **Bogen** pour la courbe · Linie pour le tracé
- Zirkel · Volte · Ecke · Hufschlag · Reitplatz
- einwirken / verwahren / nachgeben (le triplet du chapitre précédent, réutilisé tel quel
  dans le bloc « Agir puis céder »)

## Après ça

L'allemand est **complet jusqu'au Galop 4** : Baby 27/27 · G1 19/19 · G2 15/15 · G3 16/16 · G4 15/15.

Restent en/es/it/ja sur `g3-c13` et `g3-c14` — les deux seuls chapitres où ces quatre langues
sont encore en retard sur l'allemand.
