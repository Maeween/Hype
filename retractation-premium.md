# Ligne légale de rétractation — prête à poser (index repris par Blandine)

**Statut (09/08/2026 au soir)** : validée par Blandine (« oui ok précise peut-être Hype et Linguae »),
rédigée en 6 langues, point d'insertion repéré — **PAS posée** : Blandine a repris l'index en main,
interdiction d'y coder sans son accord. Ce dossier permet de la poser en une minute, par elle ou
par une prochaine session, sans rien redécouvrir.

## Pourquoi (rappel, non-juriste)
Abonnement numérique à exécution immédiate : le droit français/européen exige, avant paiement,
le consentement exprès à l'exécution immédiate ET la reconnaissance de la renonciation au droit
de rétractation de 14 jours. Aujourd'hui l'app dit seulement « annulable à tout moment » — la
mention manque partout. (Chantier plus large noté : de vraies CGV/mentions légales accessibles
dans l'app, exigées aussi par les stores.)

## Où poser (3 gestes dans index.html)

1. **Gabarit `PV5_TPL`** — ajouter le pied de page juste avant la fermeture finale.
   Ancre unique (fin de la chaîne) : `</div>\n\n</div>\n\n";` suivi de `const PV5_TXT`.
   Remplacer par : `</div>\n\n  <p class=\"legal\">{{T_LEGAL}}</p>\n\n</div>\n\n";`
   (une seule ligne, couvre Mensuel + Annuel + IA + Duo).

2. **`PV5_CSS`** — ajouter la classe (au début de la chaîne, ou n'importe où dedans) :
   `.pv5 .legal{max-width:520px;margin:26px auto 8px;padding:0 26px calc(env(safe-area-inset-bottom) + 10px);font-size:9.5px;line-height:1.65;color:#7E8B94;text-align:center;font-family:'Montserrat',sans-serif}`

3. **`PV5_TXT`** — ajouter la clé `"T_LEGAL"` à CHACUNE des 6 langues (le dictionnaire est plat,
   insérer avant la fermeture `}` de chaque langue). Textes exacts ci-dessous.

## Les 6 textes (mention « Hype et Linguae » incluse)

**fr** : En t'abonnant, tu demandes l'accès immédiat à Hype Premium — sur Hype et Linguae — et
reconnais renoncer à ton droit de rétractation de 14 jours (art. L221-28 du Code de la
consommation). Abonnement sans engagement, annulable à tout moment depuis ton profil.

**en** : By subscribing, you request immediate access to Hype Premium — across Hype and Linguae —
and acknowledge waiving your 14-day right of withdrawal (art. L221-28, French Consumer Code).
No commitment, cancel anytime from your profile.

**es** : Al suscribirte, solicitas el acceso inmediato a Hype Premium — en Hype y Linguae — y
reconoces renunciar a tu derecho de desistimiento de 14 días (art. L221-28 del Código de
Consumo francés). Sin compromiso, cancelable en cualquier momento desde tu perfil.

**it** : Abbonandoti, richiedi l'accesso immediato a Hype Premium — su Hype e Linguae — e
riconosci di rinunciare al diritto di recesso di 14 giorni (art. L221-28 del Codice del consumo
francese). Senza vincoli, annullabile in qualsiasi momento dal tuo profilo.

**ja** : 登録と同時に Hype Premium（Hype および Linguae）への即時アクセスをリクエストし、
14日間の撤回権（仏消費者法典 L221-28 条）を放棄することに同意したものとみなされます。
縛りなし、プロフィールからいつでも解約可能です。

**de** : Mit dem Abo verlangst du den sofortigen Zugang zu Hype Premium — in Hype und Linguae —
und erkennst an, auf dein 14-tägiges Widerrufsrecht zu verzichten (Art. L221-28 des
französischen Verbrauchergesetzbuchs). Ohne Bindung, jederzeit über dein Profil kündbar.

## Vérification après pose
`node --check` sur les blocs script + ouvrir l'écran Premium dans chaque langue : la ligne grise
apparaît une fois, tout en bas, après le mécénat.
