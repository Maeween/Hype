# Hype Linguae · Les mots encore en doute

**État au 5 août 2026.** Ce document remplace le tableau de bord du 4 août : deux mots ont été corrigés depuis, et le reste est inchangé.

## Ce qui a bougé depuis hier

| Langue | Concept | Avant | Après | Où |
|---|---|---|---|---|
| ES | la liste | `el cordón` | **`la lista`** | `hype-lingo-lex-cheval.js` — fait |
| JA | chaud | `神経質` | **`気性難`** *kishōnan* | `hype-lingo-lex-cheval.js` — fait |

Les deux phrases d'exemple ont suivi. Les deux marqueurs `// ??` correspondants sont retirés : **il en reste dix** dans ce fichier.

## Les six corrections qui attendent leurs fichiers

Elles font accord entre les sources, elles sont prêtes, mais elles vivent dans `hype-lingo-lex-materiel.js` et `hype-lingo-lex-dressage.js` que je n'ai pas.

| Langue | Concept | Actuel | Nouveau | Accord |
|---|---|---|---|---|
| DE | l'amortisseur | `das Lammfell` | `das Sattelpad` (+ `Lammfellpad` mouton, `Gelpad` gel) | 3 sources |
| DE | le collier de chasse | `der Vorderzeug` | `das Vorderzeug` | faute de genre objective |
| DE | le lecteur | `der Ansager` | `der Kommandant` | 1 source, cohérent |
| JA | l'impulsion | `推進` | `推進力` *suishinryoku* | 2 sources |
| IT | l'amortisseur | `il cuscinetto` | `l'ammortizzatore` | 3 sources |
| JA | les bottes | `長靴` | garder le kanji, vérifier `p: ちょうか` | résout le désaccord |

## Ce qu'il ne faut PAS corriger

`la barriera` → `barra` en italien : **deux avis le poussent, aucun n'a regardé ton fichier** — l'un a même validé `barra` comme s'il y était déjà. `barriera` est le terme FISE attesté. Ligne contestée, pas corrigée.

## L'état réel des 220 mots

| Langue | ✅✅ 2 sources+ | ✅ 1 seule | 🟡 à préciser | 🔴 à corriger | ⚠️ désaccord | ❓ inexploitable | Total |
|---|---|---|---|---|---|---|---|
| Allemand | 45 | **36** | 6 | 2 | 1 | 0 | 90 |
| Japonais | 47 | 2 | **29** | 3 | 4 | 3 | 88 |
| Espagnol | 11 | 0 | 5 | 2 | 0 | 3 | 21 |
| Italien | 10 | 0 | 8 | 1 | 0 | 2 | 21 |
| **Total** | **113** | **38** | **48** | **8** | **5** | **8** | **220** |

**Le trou reste le même : 36 mots allemands vus par une seule IA**, chapitres 7 (fin), 8 et 9 — la revue allemande dédiée s'était arrêtée en route. C'est là qu'il faut envoyer la prochaine relecture, et elle doit être humaine.

**Aucun cavalier natif n'a encore relu quoi que ce soit.** Les cinq revues sont des IA, et elles le disent toutes.

---


## Allemand


### Chapitre 3 · Le cheval

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| le pie | **die Schecke** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| l'isabelle | **der Falbe** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le blanc | **der Weißgeborene** | — | 🟡 der Schimmel pour le gris ; Weißgeborenes Pferd = né blanc | 🟡 la plupart sont des Schimmel | 🟡 préciser |
| la balzane | **das Beinabzeichen** | — | ✅ validé | 🟡 générique | 🟡 préciser |
| le passeport | **der Pferdepass** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| chaud | **heiß** | — | ✅ temperamentvoll en officiel | 🟡 heißes Pferd / temperamentvoll / sensibel | 🟡 préciser |
| le cheval d'école | **das Schulpferd** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la race | **die Rasse** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le cheval de trait | **das Kaltblut** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |

### Chapitre 4 · Le matériel

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| le tapis de selle | **die Satteldecke** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| l'amortisseur | **das Lammfell** | 🔴 → Sattelpad | 🔴 → das Pad / Sattelpad | 🔴 → Sattelpad / Sattelunterlage ; puis Lammfellpad, Gelpad | 🔴 corriger (accord) |
| le pommeau | **der Sattelkopf** | — | ✅ aussi Vorderzwiesel | 🟡 peu employé | 🟡 préciser |
| la selle de dressage | **der Dressursattel** | ✅ correct | ✅ validé | ✅ validé | ✅✅ confirmé ×3 |
| la selle d'obstacle | **der Springsattel** | ✅ correct | ✅ validé | ✅ validé | ✅✅ confirmé ×3 |
| la selle mixte | **der Vielseitigkeitssattel** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la têtière | **das Genickstück** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le frontal | **der Stirnriemen** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la sous-gorge | **der Kehlriemen** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la bride | **die Kandare** | — | ✅ validé | 🟡 fausse alerte : Trense/Kandare déjà distingués | 🟡 préciser |
| le collier de chasse | **der Vorderzeug** | — | 🔴 → **das** Vorderzeug (genre) | ✅ à conserver (genre non examiné) | ⚠️ sources en désaccord |
| le gilet airbag | **die Airbagweste** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| les bottes | **die Reitstiefel** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| les mini-chaps | **die Minichaps** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| les guêtres | **die Gamaschen** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| les cloches | **die Hufglocken** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |

### Chapitre 6 · Le dressage

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| le juge | **der Richter** | — | ✅ validé | — | ✅ 1 source seule |
| le lecteur | **der Ansager** | — | 🔴 → der Kommandant | — | 🔴 corriger (1 source) |
| la lice | **die Bande** | — | ✅ validé | — | ✅ 1 source seule |
| la reprise | **die Aufgabe** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la cession à la jambe | **das Schenkelweichen** | ✅ correct | ✅ validé | ✅ validé | ✅✅ confirmé ×3 |
| l'épaule en dedans | **das Schulterherein** | ✅ correct | ✅ validé | ✅ validé | ✅✅ confirmé ×3 |
| le changement de pied | **der Galoppwechsel** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le contre-galop | **der Konter-Galopp** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le trot allongé | **der starke Trab** | — | ✅ validé | — | ✅ 1 source seule |
| la décontraction | **die Losgelassenheit** | ✅ correct | ✅ validé | ✅ validé | ✅✅ confirmé ×3 |
| l'impulsion | **der Schwung** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la rectitude | **die Geraderichtung** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le rassembler | **die Versammlung** | ✅ correct | ✅ validé | ✅ validé | ✅✅ confirmé ×3 |
| l'incurvation | **die Biegung** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la légèreté | **die Leichtigkeit** | — | ✅ validé | — | ✅ 1 source seule |
| la perméabilité aux aides | **die Durchlässigkeit** | ✅ correct | ✅ validé | ✅ validé | ✅✅ confirmé ×3 |
| le protocole | **das Protokoll** | — | ✅ validé | — | ✅ 1 source seule |
| le coefficient | **der Koeffizient** | — | ✅ validé | — | ✅ 1 source seule |
| le pourcentage | **der Prozentsatz** | — | ✅ validé | — | ✅ 1 source seule |
| les notes d'ensemble | **die Gesamtnoten** | — | ✅ validé | — | ✅ 1 source seule |
| l'erreur de parcours | **der Bahnfehler** | — | ✅ validé | — | ✅ 1 source seule |
| la cloche du juge | **die Glocke** | — | ✅ validé | — | ✅ 1 source seule |
| le contrôle des embouchures | **die Ausrüstungskontrolle** | — | ✅ validé | — | ✅ 1 source seule |
| la reprise libre en musique | **die Kür** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |

### Chapitre 7 · L'obstacle

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| la barre | **die Stange** | — | ✅ validé | — | ✅ 1 source seule |
| le chandelier | **der Ständer** | — | ✅ validé | — | ✅ 1 source seule |
| le vertical | **der Steilsprung** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la palanque | **die Planke** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la combinaison | **die Kombination** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| reconnaître le parcours | **den Parcours besichtigen** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le contrat de foulées | **die Distanz** | — | ✅ validé | — | ✅ 1 source seule |
| l'abord | **der Anritt** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le tracé | **die Linienführung** | — | ✅ validé | — | ✅ 1 source seule |
| le paddock de détente | **der Abreiteplatz** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le refus | **die Verweigerung** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la dérobade | **das Vorbeilaufen** | — | ✅ aussi Ausbrechen | ✅ validé | ✅✅ confirmé ×2 |
| la désobéissance | **der Ungehorsam** | — | ✅ validé | — | ✅ 1 source seule |
| le temps accordé | **die erlaubte Zeit** | — | ✅ validé | — | ✅ 1 source seule |
| le dépassement de temps | **die Zeitstrafpunkte** | — | ✅ validé | — | ✅ 1 source seule |
| le sans-faute | **die Nullrunde** | — | ✅ aussi fehlerfreier Ritt | ✅ validé | ✅✅ confirmé ×2 |
| la foulée | **der Galoppsprung** | — | ✅ validé | — | ✅ 1 source seule |
| voir sa foulée | **den Absprung sehen** | — | ✅ validé | — | ✅ 1 source seule |
| le barrage | **das Stechen** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| l'épreuve de puissance | **das Mächtigkeitsspringen** | — | ✅ validé | — | ✅ 1 source seule |
| le tour d'honneur | **die Ehrenrunde** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |

### Chapitre 8 · Le concours

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| l'engagement | **die Nennung** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la liste de départ | **die Startliste** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le commissaire | **der Steward** | — | ✅ validé | — | ✅ 1 source seule |
| la cocarde | **die Schleife** | — | ✅ validé | — | ✅ 1 source seule |
| la licence | **die Turnierlizenz** | — | ✅ validé | — | ✅ 1 source seule |
| le trot de présentation | **die Verfassungsprüfung** | — | ✅ validé | — | ✅ 1 source seule |
| l'obstacle fixe | **das feste Hindernis** | — | ✅ validé | — | ✅ 1 source seule |
| le gué | **die Wasserdurchfahrt** | — | ✅ validé | — | ✅ 1 source seule |
| l'option | **der Umweg** | — | 🟡 cross : der Alternativweg | — | 🟡 préciser |
| le temps optimum | **die Idealzeit** | — | ✅ validé | — | ✅ 1 source seule |
| le van | **der Pferdeanhänger** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| embarquer | **verladen** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le tableau d'affichage | **die Anschlagtafel** | — | ✅ aussi Grünes Brett | — | ✅ 1 source seule |
| le concurrent | **der Teilnehmer** | — | ✅ validé | — | ✅ 1 source seule |
| le jury | **die Jury** | — | ✅ validé | — | ✅ 1 source seule |
| la réclamation | **der Einspruch** | — | ✅ validé | — | ✅ 1 source seule |
| la note minimale | **die Qualifikation** | — | ✅ validé | — | ✅ 1 source seule |

### Chapitre 9 · Les urgences

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| le responsable de l'écurie | **die Stallleitung** | — | ✅ validé | — | ✅ 1 source seule |
| le clou de rue | **der Nageltritt** | — | ✅ validé | — | ✅ 1 source seule |
| le cheval échappé | **das freilaufende Pferd** | — | ✅ validé | — | ✅ 1 source seule |

## Japonais


### Chapitre 3 · Le cheval

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| le pie | **駁毛** | — | 🔴 → 雑色 zasshoku | ✅ validé | ⚠️ sources en désaccord |
| l'isabelle | **河原毛** | ✅ semble correct | ✅ validé | ✅ validé | ✅✅ confirmé ×3 |
| le blanc | **白毛** | ✅ correct | ✅ validé | ✅ validé | ✅✅ confirmé ×3 |
| la balzane | **白斑** | — | ✅ validé | 🟡 générique | 🟡 préciser |
| le passeport | **馬パスポート** | — | ✅ validé | 🟡 terme JEF à confirmer | 🟡 préciser |
| chaud | ~~神経質~~ → **気性難** | 🔴 signifie « nerveux » | 🔴 → 気性難 ; カッライ ⚠ inexistant | 🔴 → à remplacer, 神経質 = nerveux | ✅ CORRIGÉ 05/08 |
| le cheval d'école | **練習馬** | 🟡 usage club à vérifier | ✅ validé | 🟡 学校馬 ? | 🟡 préciser |
| la race | **品種** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le cheval de trait | **重種** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |

### Chapitre 4 · Le matériel

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| le tapis de selle | **ゼッケン** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| l'amortisseur | **ゲルパッド** | — | ✅ validé | 🟡 juste si gel | 🟡 préciser |
| le pommeau | **前橋** | — | ❓ « Corrigé » vers le mot déjà proposé | ✅ validé | ❓ verdict inexploitable |
| la selle de dressage | **馬場鞍** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la selle d'obstacle | **障害鞍** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la selle mixte | **総合鞍** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la têtière | **項革** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le frontal | **額革** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la sous-gorge | **喉革** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la bride | **大勒** | — | ✅ validé | 🟡 double bride seulement | 🟡 préciser |
| le collier de chasse | **胸繋** | — | ✅ validé | 🟡 à confirmer | 🟡 préciser |
| le gilet airbag | **エアバッグベスト** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| les bottes | **長靴** | — | ✅ chōka en équitation | 🔴 → 乗馬ブーツ jōba būtsu | ⚠️ sources en désaccord |
| les mini-chaps | **ハーフチャップス** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| les guêtres | **プロテクター** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| les cloches | **ベルブーツ** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |

### Chapitre 6 · Le dressage

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| le juge | **審判員** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le lecteur | **読み上げ係** | — | ✅ validé | — | ✅ 1 source seule |
| la lice | **馬場柵** | — | ✅ validé | — | ✅ 1 source seule |
| la reprise | **課目** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la cession à la jambe | **脚に譲る** | — | 🔴 → レッグイールド ; 斜里折 ⚠ inexistant | 🟡 à confirmer | 🔴 corriger (1 source) |
| l'épaule en dedans | **ショルダーイン** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le changement de pied | **踏歩変換** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le contre-galop | **反対駈歩** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le trot allongé | **伸長速歩** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la décontraction | **リラックス** | — | ✅ validé | 🟡 terme JEF ? | 🟡 préciser |
| l'impulsion | **推進** | 🟡 à confirmer | ✅ validé | 🔴 → 推進力 suishinryoku | ⚠️ sources en désaccord |
| la rectitude | **直進性** | — | ✅ validé | 🔴 → 真直性 (lecture donnée fausse) | ⚠️ sources en désaccord |
| le rassembler | **収縮** | 🟡 à confirmer | ✅ validé | ✅ validé | 🟡 préciser |
| l'incurvation | **屈曲** | — | 🟡 → 湾曲 / インカーブ | — | 🟡 préciser |
| la légèreté | **軽さ** | — | ✅ validé | 🟡 à confirmer | 🟡 préciser |
| la perméabilité aux aides | **透過性** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le protocole | **採点表** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le coefficient | **係数** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le pourcentage | **得点率** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| les notes d'ensemble | **総合点** | — | ✅ validé | 🟡 distinguer du score total | 🟡 préciser |
| l'erreur de parcours | **コース違い** | — | ✅ validé | 🟡 règlement à confirmer | 🟡 préciser |
| la cloche du juge | **合図の鐘** | — | ❓ validé, lecture fausse あいづのかな | 🟡 terme du règlement ? | ❓ verdict inexploitable |
| le contrôle des embouchures | **馬具検査** | — | ✅ validé | 🟡 trop large (matériel) | 🟡 préciser |
| la reprise libre en musique | **自由演技** | — | ✅ validé | 🟡 フリースタイル ? | 🟡 préciser |

### Chapitre 7 · L'obstacle

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| la barre | **横木** | — | ❓ validé, lecture donnée fausse (おうぎ = 扇) | ✅ validé | ❓ verdict inexploitable |
| le chandelier | **支柱** | — | ✅ validé | 🟡 à confirmer | 🟡 préciser |
| le vertical | **垂直障害** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la palanque | **板障害** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la combinaison | **連続障害** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| reconnaître le parcours | **コース下見** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le contrat de foulées | **歩数** | — | ✅ validé | 🟡 meilleur terme selon lui | 🟡 préciser |
| l'abord | **アプローチ** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le tracé | **走行ライン** | — | ✅ validé | 🟡 correct | 🟡 préciser |
| le paddock de détente | **練習馬場** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le refus | **拒止** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la dérobade | **逃避** | — | 🟡 → 斜走 / よける | 🟡 à vérifier | 🟡 préciser |
| la désobéissance | **不従順** | — | ✅ validé | 🟡 règlement ? | 🟡 préciser |
| le temps accordé | **規定時間** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le dépassement de temps | **時間減点** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le sans-faute | **減点なし** | — | ✅ aussi クリアラウンド | 🟡 naturel | 🟡 préciser |
| la foulée | **ストライド** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| voir sa foulée | **踏切を見る** | — | ✅ validé | 🟡 idiome plus courant ? | 🟡 préciser |
| le barrage | **ジャンプオフ** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| l'épreuve de puissance | **パワー競技** | — | ✅ validé | 🟡 à confirmer | 🟡 préciser |
| le tour d'honneur | **表彰ラウンド** | — | ✅ validé | 🟡 à vérifier | 🟡 préciser |

### Chapitre 8 · Le concours

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| l'engagement | **出場申込** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la liste de départ | **出場順** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le commissaire | **スチュワード** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la cocarde | **ロゼット** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la licence | **会員証** | — | 🔴 → 競技者登録 | 🔴 → terme JEF à rechercher | 🔴 corriger (accord) |
| le trot de présentation | **馬体検査** | — | ✅ validé | 🟡 contrôle vétérinaire ? | 🟡 préciser |
| l'obstacle fixe | **固定障害** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le gué | **水中障害** | — | ✅ validé | 🟡 terminologie complet ? | 🟡 préciser |
| l'option | **迂回ルート** | — | ✅ validé | 🟡 correct | 🟡 préciser |
| le temps optimum | **規定タイム** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le van | **馬運車** | — | ✅ validé | 🟡 馬運トレーラー / ホーストレーラー ? | 🟡 préciser |
| embarquer | **積み込む** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le tableau d'affichage | **掲示板** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le concurrent | **出場者** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le jury | **審判団** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la réclamation | **異議申立** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la note minimale | **資格得点** | — | ✅ validé | 🟡 à confirmer | 🟡 préciser |

### Chapitre 9 · Les urgences

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| le clou de rue | **釘の踏み込み** | — | 🟡 → 踏釘 / 蹄釘踏み込み | 🟡 terme vétérinaire ? | 🟡 préciser |

## Espagnol


### Chapitre 1 · L'écurie

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| le tuyau d'arrosage | **la manguera** | ✅ correct | ✅ validé | ✅ validé | ✅✅ confirmé ×3 |

### Chapitre 3 · Le cheval

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| la liste | ~~el cordón~~ → **la lista** | — | 🔴 → la lista | 🟡 vérifier « lista » | ✅ CORRIGÉ 05/08 |
| l'épi | **el remolino** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |

### Chapitre 4 · Le matériel

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| l'amortisseur | **el amortiguador** | 🔴 → salvacruz / gel protector | 🟡 salvacruz / mantilla de gel | 🟡 salvacruz / gel protector | 🔴 corriger (1 source) |
| la têtière | **la testera** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la muserolle | **la muserola** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| les mini-chaps | **las medias polainas** | — | ✅ validé | 🟡 « mini chaps » courant | 🟡 préciser |
| les guêtres | **las protecciones** | — | 🟡 protectores / polainas de trabajo | 🟡 protectores | 🟡 préciser |

### Chapitre 6 · Le dressage

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| le contre-galop | **el galope a la contra** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |

### Chapitre 7 · L'obstacle

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| la barre | **la barra** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le chandelier | **el soporte** | 🔴 → montante | ❓ « Corrigé » sans correction exploitable | 🟡 → montante | ❓ verdict inexploitable |
| la rivière | **la ría** | ✅ correct ; foso de agua existe | ✅ validé | 🟡 foso de agua aussi | 🟡 préciser |
| la palanque | **las tablas** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la battue | **la batida** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la réception | **la recepción** | — | ❓ mot français recopié, validé tel quel | ✅ validé | ❓ verdict inexploitable |
| la dérobade | **una escapada** | — | ❓ « Corrigé » sans correction exploitable | 🟡 terme RFHE ? | ❓ verdict inexploitable |
| l'épreuve de puissance | **la potencia** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |

### Chapitre 8 · Le concours

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| le chef de piste | **el jefe de pista** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le talus | **el talud** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| le contre-bas | **el salto en bajada** | — | 🟡 el escalón de bajada / el desnivel | 🟡 terme cross ? | 🟡 préciser |

### Chapitre 9 · Les urgences

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| le clou de rue | **un clavo en el casco** | — | ✅ validé | 🟡 terme vétérinaire ? | 🟡 préciser |

## Italien


### Chapitre 1 · L'écurie

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| le tuyau d'arrosage | **il tubo dell'acqua** | — | ✅ validé | 🟡 à conserver | 🟡 préciser |

### Chapitre 3 · Le cheval

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| la liste | **la lista** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| l'épi | **il vortice** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |

### Chapitre 4 · Le matériel

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| l'amortisseur | **il cuscinetto** | 🔴 → ammortizzatore / salvaschiena | 🔴 → sottosella in gel / salvaschiena | 🔴 → ammortizzatore / sottosella ammortizzatore | 🔴 corriger (accord) |
| la têtière | **il sopratesta** | — | ✅ validé | 🟡 terme FISE ? | 🟡 préciser |
| la muserolle | **la capezzina** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| les mini-chaps | **i gambali** | — | ✅ validé | 🟡 « mini chaps » courant | 🟡 préciser |
| les guêtres | **i paracolpi** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |

### Chapitre 6 · Le dressage

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| le contre-galop | **il galoppo rovesciato** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |

### Chapitre 7 · L'obstacle

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| la barre | **la barriera** | 🔴 → barra (contesté) | ✅ validé | ❓ a validé « barra », mot absent du fichier | ❓ verdict inexploitable |
| le chandelier | **il montante** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la rivière | **la riviera** | — | ✅ validé | 🟡 règlement FISE ? | 🟡 préciser |
| la palanque | **le tavole** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la battue | **la battuta** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la réception | **l'atterraggio** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |
| la dérobade | **una scappata** | — | 🟡 scarto / disubbidienza | 🟡 terme FISE ? | 🟡 préciser |
| l'épreuve de puissance | **la potenza** | — | ✅ validé | ✅ validé | ✅✅ confirmé ×2 |

### Chapitre 8 · Le concours

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| le chef de piste | **il disegnatore di percorsi** | — | 🟡 → il direttore di campo | 🟡 → il direttore di campo | 🟡 préciser |
| le talus | **la banchina** | — | ❓ propose « il talus », mot français | 🟡 à vérifier | ❓ verdict inexploitable |
| le contre-bas | **il salto in discesa** | — | 🟡 il gradino in discesa | 🟡 à confirmer | 🟡 préciser |

### Chapitre 9 · Les urgences

| Concept | Terme actuel | Revue prélim. | Gemini | Revue dédiée | État |
|---|---|---|---|---|---|
| le clou de rue | **un chiodo nello zoccolo** | — | ✅ validé | 🟡 terme vétérinaire ? | 🟡 préciser |
# Alertes · ce que les revues ont cassé

Ces huit lignes sont classées ❓ dans le tableau. Elles ne sont pas relues : elles sont abîmées.

## Lectures japonaises fausses

| Mot | Lecture donnée | Lecture réelle | Source |
|---|---|---|---|
| 前橋 (pommeau) | *Maebashi* — c'est une ville | ぜんきょう *zenkyō* | S4, validé trois fois de suite |
| 馬場鞍 (selle de dressage) | *Bababa*, puis *Babagura* | ばばくら *babakura* | S4, en « très forte confiance » |
| 白毛 (blanc) | *Shirage* | しろげ *shiroge* | S4 |
| 横木 (barre) | おうぎ — c'est 扇, l'éventail | よこぎ *yokogi* | S2 |
| 合図の鐘 (cloche) | あいづのかな | あいずのかね *aizu no kane* | S2 |
| 真直性 (rectitude) | *Massugusei* | しんちょくせい *shinchokusei* | S4 |

**Conséquence produit, pas académique.** Le module lit les mots à voix haute (`dire()`, voix `ja-JP`). Donné 前橋, un moteur de synthèse prononcera *Maebashi* dans l'oreille d'une cavalière. Le champ `p` du lexique n'est pas optionnel en japonais : c'est la seule garantie de lecture.

Et c'est aussi ce qui explique le désaccord sur les bottes : 長靴 lu ながぐつ, c'est du caoutchouc ; lu ちょうか, c'est la botte de monte. Même kanji. Sans le champ `p`, l'entrée est juste une fois sur deux.

## Termes inventés

| Terme | Prétendu sens | Source | Verdict |
|---|---|---|---|
| `斜里折` | cession à la jambe | S2 | N'existe pas. Même profil que `係留リング`. |
| `カッライ` | cheval chaud | S2 | N'existe pas. |
| `el stativo` | chandelier | S2 | N'existe pas en espagnol. |
| `il talus` | talus de cross | S2 | Mot français proposé comme italien. |

## Corrections vides ou fautives

- **`el soporte` (chandelier)** — S2 marque « Corrigé » puis énumère sept candidats en se contredisant à voix haute (*el haya, el tupi, el candelero, el arzón, el pincho ? Non…*). `el arzón` est l'arçon de la selle. Aucune correction utilisable. S1 et S5 disent toutes deux `montante` : **c'est ça qu'il faut retenir**, pas la ligne de Gemini.
- **`una escapada` (dérobade, ES)** — « Corrigé », avec `un desobediencia` (faute d'accord) et quatre autres pistes. Rien d'exploitable.
- **`la réception` (ES)** — le mot **français** figure dans la colonne espagnole du rapport, marqué « Validé ». C'est `la recepción`, ce que confirme S5.
- **`la barre` (IT)** — S6 valide « barra ✅ », mot qui n'est pas dans ton fichier (il contient `la barriera`). Deuxième avis à pousser `barra` sans avoir regardé l'existant. `barriera` est le terme FISE attesté : je le garderais et je marquerais la ligne comme contestée, pas corrigée.

## Un désaccord de genre passé inaperçu

`der Vorderzeug` (collier de chasse) : S2 corrige en **das** Vorderzeug, S3 valide « ✅ à conserver » sans regarder l'article. *Zeug* est neutre — S2 a raison. Sans ce tableau, la correction se perdait entre deux fichiers.

---

# Ce que tu peux corriger dès maintenant

Huit lignes en accord, aucune ambiguïté.

| Langue | Concept | Actuel | Nouveau | Accord |
|---|---|---|---|---|
| DE | l'amortisseur | `das Lammfell` | `das Sattelpad` (+ `Lammfellpad` mouton, `Gelpad` gel) | S1 + S2 + S3 |
| DE | le collier de chasse | `der Vorderzeug` | `das Vorderzeug` | S2, faute de genre objective |
| DE | le lecteur | `der Ansager` | `der Kommandant` | S2 seule, mais cohérent (*eine Aufgabe kommandieren*) |
| JA | chaud | `神経質` | `気性難` *kishōnan* | S1 + S2 + S4 |
| JA | l'impulsion | `推進` | `推進力` *suishinryoku* | S2 + S4 |
| JA | les bottes | `長靴` | garder le kanji, **ajouter `p: ちょうか`** | résout le désaccord S2/S4 |
| ES | la liste | `el cordón` | `la lista` | S2 + S5 + cohérence avec l'italien |
| IT | l'amortisseur | `il cuscinetto` | `l'ammortizzatore` (ou `sottosella ammortizzatore`) | S1 + S2 + S6 |

**Un point transversal :** l'amortisseur pose problème dans les quatre langues, et pour la même raison — le français « amortisseur » ne dit pas la matière, alors que l'allemand, l'espagnol, l'italien et le japonais nomment le gel ou le mouton. Ce n'est pas un problème de traduction, c'est un manque dans l'entrée française. Il faut que le lexique dise **quel** amortisseur l'image montre, sinon aucune langue ne peut trancher. Même mécanique pour les guêtres (tendon boots / fetlock boots / protectores / Gamaschen).

---

# Les 38 mots que personne n'a vraiment regardés

Ce sont les ✅ à une seule source. Trente-six sont allemands, et ils forment un bloc net : la revue allemande dédiée s'est arrêtée au milieu du chapitre 7, donc tout le concours et toutes les urgences ne reposent que sur Gemini.

**Allemand, chapitres 7 (fin) à 9** — `die Stange` · `der Ständer` · `die Distanz` · `die Linienführung` · `der Ungehorsam` · `die erlaubte Zeit` · `die Zeitstrafpunkte` · `der Galoppsprung` · `den Absprung sehen` · `das Mächtigkeitsspringen` · `der Steward` · `die Schleife` · `die Turnierlizenz` · `die Verfassungsprüfung` · `das feste Hindernis` · `die Wasserdurchfahrt` · `die Idealzeit` · `die Anschlagtafel` · `der Teilnehmer` · `die Jury` · `der Einspruch` · `die Qualifikation` · `die Stallleitung` · `der Nageltritt` · `das freilaufende Pferd` — plus le chapitre 6 en partie (`der Richter`, `die Bande`, `das Protokoll`, `der Koeffizient`, `der Prozentsatz`, `die Gesamtnoten`, `der Bahnfehler`, `die Glocke`, `die Ausrüstungskontrolle`, `die Leichtigkeit`).

C'est exactement là qu'il faut envoyer la prochaine relecture — allemande, et humaine.

---

# La suite, dans l'ordre

1. **Appliquer les huit corrections ci-dessus.** Elles ne demandent aucun arbitrage.
2. **Ajouter le champ `p` (lecture) à toutes les entrées japonaises.** C'est la seule correction qui empêche la synthèse vocale de dire des bêtises, et six lignes de ce tableau existent uniquement à cause de son absence.
3. **Préciser les entrées françaises ambiguës** — amortisseur, guêtres, bride/filet — avant de traduire quoi que ce soit d'autre. Une entrée source floue rend les six langues indécidables.
4. **Faire relire l'allemand des chapitres 7 à 9 par un cavalier germanophone.** 36 mots, une seule source, et c'est le plus gros trou du référentiel.
5. **Ne pas relancer d'IA sur les 113 lignes ✅✅.** Une sixième revue les revalidera sans rien ajouter, et le risque d'introduire une erreur dépasse le gain — ce tableau en compte huit à l'arrivée.

Ce que les cinq revues ont vraiment produit : huit corrections utilisables, une cinquantaine de précisions de contexte, et la confirmation de leur propre limite. Toutes les cinq le disent, chacune à sa manière : il faut un cavalier natif. C'est le seul point sur lequel elles sont unanimes.
