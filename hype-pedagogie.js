/* =====================================================================
   HYPE — Repères pédagogiques (mode enseignant)
   Source de données centrale, indépendante de l'interface.
   Référentiel FFE en vigueur, vérifié en 2026 — document officiel version 01/03/2019.
   Ne jamais recopier ces listes en dur dans un composant : toujours lire
   depuis GALOPS_PONEYS_PEDAGOGIE.
   ===================================================================== */

const SOURCE_FFE_GALOPS_PONEYS = {
  organisme: "Fédération Française d'Équitation",
  document: "Règlement officiel des Galops® Poneys",
  versionDocument: "01/03/2019",
  verifieEn: "2026",
  mentionAffichage: "Référentiel FFE en vigueur, vérifié en 2026 — document officiel version 01/03/2019."
};

const MENTION_PREREQUIS = "Les prérequis correspondent aux acquis du niveau précédent et servent de repères à l'enseignant.";

const GALOPS_PONEYS_PEDAGOGIE = {

  poney_bronze: {
    label: "Poney de Bronze",
    cycle: 1,
    objectifOfficiel: "Je découvre le poney et le poney-club.",
    prerequis: [],
    prerequisNote: "Aucun prérequis technique. C'est le niveau de découverte.",
    competencesOfficielles: {
      connaissancesGenerales: [
        "Reconnaître le moniteur et dire son prénom.",
        "Mettre mon casque."
      ],
      soccuperPoney: [
        "Montrer le filet et les rênes.",
        "Montrer la selle.",
        "Brosser le corps.",
        "Brosser la queue.",
        "Ranger la brosse.",
        "Ranger le filet."
      ],
      connaissancesPoney: [
        "Retenir le nom de mon poney.",
        "Reconnaître mon poney parmi les autres.",
        "Montrer les principales parties du corps du poney."
      ],
      pratiqueAPied: [
        "Aborder un poney attaché, capter son attention.",
        "Me positionner près d'un poney attaché et le caresser.",
        "Amener le poney en filet sur le terrain avec aide."
      ],
      pratiqueAPoney: [
        "Monter et descendre avec aide.",
        "Être assis au pas.",
        "Caresser.",
        "Prendre les rênes.",
        "Lâcher les rênes et lever les mains.",
        "Me coucher sur l'encolure, toucher les oreilles, toucher la queue."
      ]
    },
    vigilanceHype: [
      "Adapter les demandes à l'âge et à la maturité de l'enfant.",
      "Faire toutes les approches et manipulations sous surveillance.",
      "Vérifier le casque et le matériel.",
      "Proposer des exercices très courts et ludiques.",
      "Ne jamais forcer un enfant inquiet."
    ],
    source: SOURCE_FFE_GALOPS_PONEYS
  },

  poney_argent: {
    label: "Poney d'Argent",
    cycle: 2,
    objectifOfficiel: "Je me familiarise avec le comportement du poney et la vie au poney-club.",
    prerequis: { niveauPrecedent: "poney_bronze" },
    competencesOfficielles: {
      connaissancesGenerales: [
        "Connaître la sellerie, dire son lieu et son rôle.",
        "Connaître le manège ou la carrière, dire son lieu et son rôle.",
        "Montrer la piste."
      ],
      soccuperPoney: [
        "Montrer le mors, la têtière et le frontal sur le filet.",
        "Montrer le licol.",
        "Reconnaître la paille.",
        "Détacher une boucle : sous-gorge ou muserolle ou croupière…",
        "Enlever un licol.",
        "Ranger la selle et le tapis avec aide."
      ],
      connaissancesPoney: [
        "Observer mon poney : les oreilles.",
        "Reconnaître quand le poney mange, quand il boit, quand il se repose.",
        "Reconnaître quand le poney urine, quand il fait un crottin.",
        "Nommer une robe."
      ],
      pratiqueAPied: [
        "Amener seul le poney en filet sur le terrain.",
        "Changer de côté en passant sous l'encolure.",
        "Faire le tour du poney."
      ],
      pratiqueAPoney: [
        "Me mettre à poney avec ou sans montoir avec aide.",
        "Diriger au pas sur des courbes simples.",
        "Arrêter et repartir au pas.",
        "Lâcher et reprendre les rênes.",
        "Descendre seul."
      ]
    },
    vigilanceHype: [
      "« Seul » signifie sans aide physique directe, mais toujours sous surveillance.",
      "Ne pas exiger le trot ou le galop monté à ce niveau.",
      "Contrôler la distance entre les poneys.",
      "Garder les exercices de direction très simples.",
      "Sécuriser les déplacements autour du poney."
    ],
    source: SOURCE_FFE_GALOPS_PONEYS
  },

  poney_or: {
    label: "Poney d'Or",
    cycle: 3,
    objectifOfficiel: "Je suis en confiance avec le poney et au poney-club.",
    prerequis: { niveauPrecedent: "poney_argent" },
    competencesOfficielles: {
      connaissancesGenerales: [
        "Décrire la tenue d'équitation.",
        "Expliquer pourquoi on ne joue pas avec la nourriture des poneys.",
        "Différencier paille et foin.",
        "Identifier les espaces du poney-club.",
        "Expliquer l'activité promenade."
      ],
      soccuperPoney: [
        "Enlever la selle, la ranger seul avec le tapis.",
        "Utiliser brosse et étrille sur l'ensemble du corps.",
        "Montrer le cure-pieds.",
        "Prendre et curer les antérieurs."
      ],
      connaissancesPoney: [
        "Reconnaître un poney au pas, au trot.",
        "Montrer le toupet, les naseaux, les flancs, le dos, les sabots.",
        "Montrer les antérieurs et les postérieurs.",
        "Différencier poney et poulain."
      ],
      pratiqueAPied: [
        "Déplacer les hanches d'un poney attaché.",
        "Marcher près de mon poney au même rythme, varier la vitesse.",
        "Mener en main sur un tracé simple avec courbes et arrêt."
      ],
      pratiqueAPoney: [
        "Tenir correctement les rênes à deux mains.",
        "Tenir correctement les rênes dans une seule main.",
        "Prendre et poser un objet sur un support.",
        "Diriger au pas, assis dans une bonne posture, sur un enchaînement de courbes.",
        "Trotter quelques foulées."
      ]
    },
    vigilanceHype: [
      "Surveiller étroitement le curage des antérieurs.",
      "Garder les premières foulées de trot courtes et sécurisées.",
      "Ne pas confondre reconnaissance d'une allure et maîtrise montée.",
      "Adapter la promenade au groupe et à l'environnement.",
      "Ne pas demander une autonomie prématurée."
    ],
    source: SOURCE_FFE_GALOPS_PONEYS
  },

  galop_bronze: {
    label: "Galop de Bronze",
    cycle: 4,
    objectifOfficiel: "Je comprends les bases de la communication avec le poney.",
    prerequis: { niveauPrecedent: "poney_or" },
    competencesOfficielles: {
      connaissancesGenerales: [
        "Connaître les aides naturelles.",
        "Connaître les parties du licol.",
        "Connaître les parties du filet.",
        "Connaître le comportement du poney et les principales règles de sécurité.",
        "Dessiner un cercle, une diagonale, un doubler.",
        "Connaître deux disciplines."
      ],
      soccuperPoney: [
        "Aborder au box.",
        "Desseller.",
        "Enlever le filet.",
        "Rincer le mors et ranger le filet."
      ],
      connaissancesPoney: [
        "Citer et reconnaître deux robes.",
        "Reconnaître et nommer les trois allures.",
        "Connaître le paragraphe « Respect du poney » de la Charte du Cavalier FFE."
      ],
      pratiqueAPied: [
        "Éloigner le poney de moi.",
        "Déplacer les hanches du poney en main.",
        "Faire faire demi-tour au poney dans un cercle.",
        "Faire baisser la tête du poney."
      ],
      pratiqueAPoney: [
        "Ajuster et varier la longueur des rênes.",
        "Accélérer et ralentir le pas.",
        "Passer de l'arrêt au pas et au trot.",
        "Franchir des barres au sol au pas.",
        "Utiliser la voix.",
        "Compter le rythme du trot au trot assis.",
        "Conduire au trot.",
        "Galoper quelques foulées."
      ]
    },
    vigilanceHype: [
      "Introduire le galop sur une courte durée et dans un cadre sécurisé.",
      "Ne pas confondre connaissance des aides naturelles et maîtrise autonome.",
      "Vérifier l'équilibre et le contrôle au trot.",
      "Préserver le lien affectif de Liam avec Apy lorsqu'il commence à monter plus grand.",
      "À partir de ce niveau, Evan peut progressivement prendre le relais avec Apy."
    ],
    source: SOURCE_FFE_GALOPS_PONEYS
  },

  galop_argent: {
    label: "Galop d'Argent",
    cycle: 5,
    objectifOfficiel: "Je fais des choix en fonction de mes sensations et des réactions du poney.",
    prerequis: { niveauPrecedent: "galop_bronze" },
    competencesOfficielles: {
      connaissancesGenerales: [
        "Connaître la fédération, la licence.",
        "Connaître quatre métiers liés au poney-club.",
        "Connaître les distances de sécurité à poney."
      ],
      soccuperPoney: [
        "Entretenir la selle.",
        "Mettre un licol.",
        "Reproduire un nœud d'attache.",
        "Prendre et curer les postérieurs.",
        "Utiliser étrille, bouchon et brosse douce."
      ],
      connaissancesPoney: [
        "Connaître les caractéristiques principales du comportement des poneys.",
        "Différencier poney et ponette.",
        "Connaître les cinq robes de base.",
        "Reconnaître des attitudes spécifiques du poney.",
        "Connaître les principales parties du corps du poney.",
        "Connaître l'alimentation distribuée dans mon poney-club."
      ],
      pratiqueAPied: [
        "Faire reculer le poney.",
        "Faire trotter le poney quelques foulées en ligne droite.",
        "Ajuster ma position près de mon poney en fonction des situations."
      ],
      pratiqueAPoney: [
        "Me mettre seul en selle.",
        "Descendre au pas.",
        "Ressangler en selle avec aide.",
        "Franchir un parcours simple de barres au sol au trot, en alternant en équilibre et assis.",
        "Enchaîner un parcours alternant courbes et transitions.",
        "Accélérer et ralentir le trot.",
        "Partir au galop, conserver le galop et repasser au trot."
      ]
    },
    vigilanceHype: [
      "Surveiller étroitement le nœud d'attache et le curage des postérieurs.",
      "Ne pas valider le départ au galop sur une seule réussite isolée.",
      "Observer la stabilité, le calme et le retour au trot.",
      "Adapter le poney à la taille, à la maturité et aux réactions de l'enfant.",
      "Distinguer les connaissances théoriques des comportements réellement observés."
    ],
    source: SOURCE_FFE_GALOPS_PONEYS
  },

  galop_or: {
    label: "Galop d'Or",
    cycle: 6,
    objectifOfficiel: "J'ai atteint un premier stade d'autonomie avec le poney et dans son environnement.",
    prerequis: { niveauPrecedent: "galop_argent" },
    competencesOfficielles: {
      connaissancesGenerales: [
        "Connaître les règles de priorité en manège ou en carrière.",
        "Connaître les principales parties de la selle.",
        "Connaître les principaux types de chevaux et de poneys.",
        "Connaître les principaux types de logement des poneys."
      ],
      soccuperPoney: [
        "Aborder un poney en stabulation ou au pré.",
        "Effectuer seul un pansage élémentaire complet.",
        "Seller.",
        "Mettre le filet.",
        "Lâcher un poney au pré."
      ],
      connaissancesPoney: [
        "Décrire les cinq sens du poney.",
        "Décrire la bouche du poney et comment il s'alimente.",
        "Connaître le comportement et les besoins alimentaires des poneys.",
        "Reconnaître et citer les aliments de base.",
        "Connaître les principales parties de la tête.",
        "Montrer les principales parties des membres."
      ],
      pratiqueAPied: [
        "Mener en main sur un tracé précis en alternant des lignes droites et des courbes.",
        "Déplacer la tête du poney à droite et à gauche, en haut et en bas.",
        "Déplacer les épaules et les hanches à partir de l'arrêt."
      ],
      pratiqueAPoney: [
        "Ressangler seul, en selle ou à pied.",
        "Circuler en respectant les distances de sécurité.",
        "Diriger au pas et au trot sur un tracé défini incluant cercle, volte, diagonale et doubler.",
        "Trotter enlevé sans étriers.",
        "Trotter et galoper assis dans une posture stable.",
        "Enchaîner deux obstacles sur la piste au trot et au galop."
      ]
    },
    vigilanceHype: [
      "« Premier stade d'autonomie » ne signifie jamais absence de surveillance.",
      "Observer l'abord au pré ou en stabulation dans plusieurs situations.",
      "Vérifier seller, mettre le filet et lâcher au pré à plusieurs reprises.",
      "Valider le respect des distances de sécurité avant les exercices collectifs.",
      "Vérifier la stabilité aux allures avant l'enchaînement d'obstacles."
    ],
    source: SOURCE_FFE_GALOPS_PONEYS
  }

};

// Ordre officiel des niveaux (utile pour retrouver le niveau précédent / calculer les prérequis)
const ORDRE_NIVEAUX_PEDAGOGIE = [
  "poney_bronze", "poney_argent", "poney_or",
  "galop_bronze", "galop_argent", "galop_or"
];

// Domaines de compétences, pour le filtre de la vue
const DOMAINES_PEDAGOGIE = [
  { cle: "connaissancesGenerales", label: "Connaissances générales" },
  { cle: "soccuperPoney", label: "S'occuper du poney" },
  { cle: "connaissancesPoney", label: "Connaissances du poney" },
  { cle: "pratiqueAPied", label: "Pratique équestre à pied" },
  { cle: "pratiqueAPoney", label: "Pratique équestre à poney" }
];

const STATUTS_COMPETENCE = ["non_observe", "en_cours", "acquis", "a_renforcer"];
const LABEL_STATUT_COMPETENCE = {
  non_observe: "Non observé",
  en_cours: "En cours",
  acquis: "Acquis",
  a_renforcer: "À renforcer"
};

// Retourne la liste complète des compétences officielles du niveau précédent
// (utilisée comme "prérequis à vérifier" — jamais recopiée en dur).
function obtenirPrerequisNiveau(niveauId) {
  const niveau = GALOPS_PONEYS_PEDAGOGIE[niveauId];
  if (!niveau) return null;
  if (!niveau.prerequis || !niveau.prerequis.niveauPrecedent) {
    return { niveauPrecedent: null, competences: [], note: niveau.prerequisNote || "" };
  }
  const precedent = GALOPS_PONEYS_PEDAGOGIE[niveau.prerequis.niveauPrecedent];
  if (!precedent) return { niveauPrecedent: null, competences: [], note: "" };
  const competences = Object.values(precedent.competencesOfficielles).flat();
  return {
    niveauPrecedent: precedent.label,
    competences,
    note: MENTION_PREREQUIS
  };
}

if (typeof window !== "undefined") {
  window.GALOPS_PONEYS_PEDAGOGIE = GALOPS_PONEYS_PEDAGOGIE;
  window.ORDRE_NIVEAUX_PEDAGOGIE = ORDRE_NIVEAUX_PEDAGOGIE;
  window.DOMAINES_PEDAGOGIE = DOMAINES_PEDAGOGIE;
  window.STATUTS_COMPETENCE = STATUTS_COMPETENCE;
  window.LABEL_STATUT_COMPETENCE = LABEL_STATUT_COMPETENCE;
  window.obtenirPrerequisNiveau = obtenirPrerequisNiveau;
  window.SOURCE_FFE_GALOPS_PONEYS = SOURCE_FFE_GALOPS_PONEYS;
  window.MENTION_PREREQUIS = MENTION_PREREQUIS;
}
/* =====================================================================
   HYPE — Repères pédagogiques (mode enseignant)
   Vue mobile-first + bouton d'accès niveau + accès discret par cours.
   Écrit en React sans JSX (React.createElement), pour rester cohérent
   avec index.html. À coller dans le <script> principal, après le
   chargement de hype-reperes-pedagogiques-data.js.

   Dépend de : GALOPS_PONEYS_PEDAGOGIE, ORDRE_NIVEAUX_PEDAGOGIE,
   DOMAINES_PEDAGOGIE, STATUTS_COMPETENCE, LABEL_STATUT_COMPETENCE,
   obtenirPrerequisNiveau (voir hype-reperes-pedagogiques-data.js).

   Couleurs Hype Spectral :
   noir profond #060709 · anthracite #111417 · turquoise #20D9F5 · blanc cassé #F4F7FA
   ===================================================================== */

const e = React.createElement;

// ---- Section repliable générique ------------------------------------
function SectionRepliable({ titre, ouvertParDefaut, enfants }) {
  const [ouvert, setOuvert] = useState(!!ouvertParDefaut);
  return e("div", { style: { borderBottom: "1px solid #1c2126", padding: "14px 0" } },
    e("button", {
      onClick: () => setOuvert(!ouvert),
      style: {
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "none", border: "none", color: "#F4F7FA",
        fontFamily: "Cinzel, serif", fontSize: "15px", letterSpacing: "0.02em",
        padding: 0, cursor: "pointer"
      }
    },
      e("span", null, titre),
      e("span", { style: { color: "#20D9F5", fontSize: "13px" } }, ouvert ? "—" : "+")
    ),
    ouvert ? e("div", { style: { marginTop: "10px", fontFamily: "Montserrat, sans-serif" } }, enfants) : null
  );
}

// ---- Ligne compétence avec statut -------------------------------------
function LigneCompetence({ texte, statut, onChangeStatut }) {
  const couleurs = {
    non_observe: "#6b7280",
    en_cours: "#20D9F5",
    acquis: "#4ade80",
    a_renforcer: "#f59e0b"
  };
  return e("div", {
    style: {
      display: "flex", justifyContent: "space-between", alignItems: "center",
      gap: "10px", padding: "8px 0", borderBottom: "1px solid #16191d"
    }
  },
    e("span", { style: { color: "#F4F7FA", fontSize: "13.5px", flex: 1 } }, texte),
    e("select", {
      value: statut || "non_observe",
      onChange: (ev) => onChangeStatut(ev.target.value),
      style: {
        background: "#111417", color: couleurs[statut || "non_observe"],
        border: "1px solid #262b31", borderRadius: "8px",
        fontSize: "12px", padding: "4px 6px", fontFamily: "Montserrat, sans-serif"
      }
    },
      STATUTS_COMPETENCE.map(s =>
        e("option", { key: s, value: s }, LABEL_STATUT_COMPETENCE[s])
      )
    )
  );
}

// ---- Vue complète "Repères pédagogiques" pour un niveau --------------
function VueReperesPedagogiques({ niveauId, statutsCompetences, onChangeStatutCompetence, onClose }) {
  const niveau = GALOPS_PONEYS_PEDAGOGIE[niveauId];
  const [domaineFiltre, setDomaineFiltre] = useState(null); // null = tous
  const [toutAfficher, setToutAfficher] = useState(false);

  if (!niveau) return null;
  const prerequis = obtenirPrerequisNiveau(niveauId);

  const domainesAAfficher = domaineFiltre
    ? DOMAINES_PEDAGOGIE.filter(d => d.cle === domaineFiltre)
    : DOMAINES_PEDAGOGIE;

  return e("div", {
    style: {
      position: "fixed", inset: 0, background: "rgba(6,7,9,0.92)", zIndex: 9999,
      display: "flex", alignItems: "flex-end", justifyContent: "center"
    },
    onClick: onClose
  },
    e("div", {
      style: {
        background: "#0a0c0f", width: "100%", maxWidth: "480px", maxHeight: "88vh",
        overflowY: "auto", borderRadius: "20px 20px 0 0",
        border: "1px solid #1c2126", padding: "20px 18px 32px",
        boxShadow: "0 -10px 40px rgba(32,217,245,0.08)"
      },
      onClick: (ev) => ev.stopPropagation()
    },
      // en-tête
      e("div", { style: { textAlign: "center", marginBottom: "6px" } },
        e("span", {
          style: {
            fontFamily: "Montserrat, sans-serif", fontSize: "11px", letterSpacing: "0.12em",
            color: "#20D9F5", textTransform: "uppercase"
          }
        }, "Repères pédagogiques · mode enseignant")
      ),
      e("h2", {
        style: {
          fontFamily: "Cinzel, serif", color: "#F4F7FA", fontSize: "22px",
          textAlign: "center", margin: "6px 0 18px"
        }
      }, niveau.label),

      // bouton tout afficher
      e("div", { style: { textAlign: "right", marginBottom: "8px" } },
        e("button", {
          onClick: () => setToutAfficher(!toutAfficher),
          style: {
            background: "none", border: "1px solid #20D9F5", color: "#20D9F5",
            borderRadius: "20px", fontSize: "11px", padding: "5px 12px",
            fontFamily: "Montserrat, sans-serif", cursor: "pointer"
          }
        }, toutAfficher ? "Replier tout" : "Tout afficher")
      ),

      // Objectif
      e(SectionRepliable, { titre: "Objectif officiel", ouvertParDefaut: true },
        e("p", { style: { color: "#c9d2d8", fontSize: "13.5px", fontStyle: "italic", lineHeight: 1.5 } },
          "« " + niveau.objectifOfficiel + " »"
        )
      ),

      // Prérequis
      e(SectionRepliable, { titre: "Prérequis à vérifier", ouvertParDefaut: toutAfficher },
        prerequis.niveauPrecedent
          ? e("div", null,
              e("p", { style: { color: "#8a939b", fontSize: "12px", marginBottom: "10px" } }, prerequis.note),
              prerequis.competences.map((c, i) =>
                e("div", { key: i, style: { color: "#c9d2d8", fontSize: "13px", padding: "4px 0" } }, "• " + c)
              )
            )
          : e("p", { style: { color: "#8a939b", fontSize: "13px" } }, niveau.prerequisNote || "Aucun prérequis technique.")
      ),

      // Compétences (avec filtre domaine + statut)
      e(SectionRepliable, { titre: "Compétences officielles à acquérir", ouvertParDefaut: true },
        e("div", null,
          e("div", { style: { display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" } },
            e("button", {
              onClick: () => setDomaineFiltre(null),
              style: {
                background: domaineFiltre === null ? "#20D9F5" : "none",
                color: domaineFiltre === null ? "#060709" : "#8a939b",
                border: "1px solid #262b31", borderRadius: "14px",
                fontSize: "11px", padding: "4px 10px", cursor: "pointer"
              }
            }, "Tous"),
            DOMAINES_PEDAGOGIE.map(d =>
              e("button", {
                key: d.cle,
                onClick: () => setDomaineFiltre(d.cle),
                style: {
                  background: domaineFiltre === d.cle ? "#20D9F5" : "none",
                  color: domaineFiltre === d.cle ? "#060709" : "#8a939b",
                  border: "1px solid #262b31", borderRadius: "14px",
                  fontSize: "11px", padding: "4px 10px", cursor: "pointer"
                }
              }, d.label)
            )
          ),
          domainesAAfficher.map(d =>
            e("div", { key: d.cle, style: { marginBottom: "16px" } },
              e("h4", {
                style: { color: "#20D9F5", fontSize: "12.5px", fontFamily: "Montserrat, sans-serif", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }
              }, d.label),
              (niveau.competencesOfficielles[d.cle] || []).map((c, i) =>
                e(LigneCompetence, {
                  key: i,
                  texte: c,
                  statut: statutsCompetences && statutsCompetences[niveauId + "|" + d.cle + "|" + i],
                  onChangeStatut: (val) => onChangeStatutCompetence(niveauId, d.cle, i, val)
                })
              )
            )
          )
        )
      ),

      // Vigilance Hype
      e(SectionRepliable, { titre: "Points de vigilance Hype", ouvertParDefaut: toutAfficher },
        e("div", { style: { background: "#111417", borderRadius: "12px", padding: "12px", border: "1px solid #1c2126" } },
          niveau.vigilanceHype.map((v, i) =>
            e("p", { key: i, style: { color: "#F4F7FA", fontSize: "12.5px", padding: "3px 0" } }, "▸ " + v)
          )
        )
      ),

      // Source officielle
      e(SectionRepliable, { titre: "Source officielle", ouvertParDefaut: false },
        e("div", { style: { color: "#8a939b", fontSize: "12px", lineHeight: 1.6 } },
          e("p", null, niveau.source.organisme),
          e("p", null, niveau.source.document + " — version " + niveau.source.versionDocument),
          e("p", { style: { marginTop: "6px", color: "#5b6570" } }, SOURCE_FFE_GALOPS_PONEYS.mentionAffichage)
        )
      ),

      e("button", {
        onClick: onClose,
        style: {
          marginTop: "18px", width: "100%", background: "#20D9F5", color: "#060709",
          border: "none", borderRadius: "14px", padding: "12px", fontFamily: "Montserrat, sans-serif",
          fontWeight: 600, fontSize: "14px", cursor: "pointer"
        }
      }, "Fermer")
    )
  );
}

// ---- Bouton discret pour la page générale d'un niveau -----------------
function BoutonReperesPedagogiquesNiveau({ niveauId, modeEnseignant, statutsCompetences, onChangeStatutCompetence }) {
  const [ouvert, setOuvert] = useState(false);
  const [statutsLocaux, setStatutsLocaux] = useState(() => {
    try { return JSON.parse(localStorage.getItem("hypeStatutsPedagogie") || "{}"); } catch (e) { return {}; }
  });
  if (!modeEnseignant) return null;
  if (!GALOPS_PONEYS_PEDAGOGIE[niveauId]) return null;
  const gererStatuts = statutsCompetences || statutsLocaux;
  const gererChangement = onChangeStatutCompetence || ((nId, domaine, index, val) => {
    setStatutsLocaux((prev) => {
      const next = { ...prev, [nId + "|" + domaine + "|" + index]: val };
      try { localStorage.setItem("hypeStatutsPedagogie", JSON.stringify(next)); } catch (e) {}
      return next;
    });
  });
  return e(React.Fragment, null,
    e("button", {
      onClick: () => setOuvert(true),
      style: {
        background: "none", border: "1px solid #20D9F5", color: "#20D9F5",
        borderRadius: "16px", fontSize: "11px", padding: "5px 12px",
        fontFamily: "Montserrat, sans-serif", cursor: "pointer", marginLeft: "8px", whiteSpace: "nowrap"
      }
    }, "🎓"),
    ouvert ? e(VueReperesPedagogiques, {
      niveauId, statutsCompetences: gererStatuts, onChangeStatutCompetence: gererChangement,
      onClose: () => setOuvert(false)
    }) : null
  );
}

// ---- Accès discret dans chaque cours (prérequis / compétences / vigilance liés à la séance) --
// coursCompetencesRef: { niveauId, domaine, indices: [i, ...] } fourni par le cours lui-même,
// pour ne montrer QUE les compétences travaillées dans cette séance précise.
function AccesEnseignantCours({ niveauId, coursCompetencesRef, modeEnseignant }) {
  const [ouvert, setOuvert] = useState(false);
  if (!modeEnseignant) return null;
  const niveau = GALOPS_PONEYS_PEDAGOGIE[niveauId];
  if (!niveau) return null;
  const prerequis = obtenirPrerequisNiveau(niveauId);

  const competencesSeance = (coursCompetencesRef || []).map(ref =>
    (niveau.competencesOfficielles[ref.domaine] || [])[ref.index]
  ).filter(Boolean);

  return e(React.Fragment, null,
    e("button", {
      onClick: () => setOuvert(!ouvert),
      style: {
        background: "none", border: "none", color: "#5b6570",
        fontSize: "10.5px", fontFamily: "Montserrat, sans-serif",
        textDecoration: "underline", cursor: "pointer", padding: "4px 0"
      }
    }, "🎓 Repères enseignant"),
    ouvert ? e("div", {
      style: {
        background: "#111417", border: "1px solid #1c2126", borderRadius: "10px",
        padding: "10px 12px", marginTop: "6px", fontFamily: "Montserrat, sans-serif"
      }
    },
      competencesSeance.length ? e("div", { style: { marginBottom: "8px" } },
        e("p", { style: { color: "#20D9F5", fontSize: "10.5px", textTransform: "uppercase", marginBottom: "4px" } }, "Compétences travaillées"),
        competencesSeance.map((c, i) => e("p", { key: i, style: { color: "#F4F7FA", fontSize: "12px", padding: "2px 0" } }, "• " + c))
      ) : null,
      e("div", { style: { marginBottom: "8px" } },
        e("p", { style: { color: "#20D9F5", fontSize: "10.5px", textTransform: "uppercase", marginBottom: "4px" } }, "Prérequis utiles"),
        prerequis.niveauPrecedent
          ? e("p", { style: { color: "#8a939b", fontSize: "11.5px" } }, "Voir les acquis du " + prerequis.niveauPrecedent + " (page niveau).")
          : e("p", { style: { color: "#8a939b", fontSize: "11.5px" } }, "Aucun prérequis technique.")
      ),
      e("div", null,
        e("p", { style: { color: "#20D9F5", fontSize: "10.5px", textTransform: "uppercase", marginBottom: "4px" } }, "Points de vigilance"),
        niveau.vigilanceHype.slice(0, 3).map((v, i) => e("p", { key: i, style: { color: "#F4F7FA", fontSize: "11.5px", padding: "2px 0" } }, "▸ " + v))
      )
    ) : null
  );
}

if (typeof window !== "undefined") {
  window.VueReperesPedagogiques = VueReperesPedagogiques;
  window.BoutonReperesPedagogiquesNiveau = BoutonReperesPedagogiquesNiveau;
  window.AccesEnseignantCours = AccesEnseignantCours;
}
