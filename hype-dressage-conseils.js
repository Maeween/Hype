/* ────────────────────────────────────────────────────────────────────────────
   HYPE ▸ BIBLIOTHÈQUE CENTRALISÉE DES CONSEILS DE DRESSAGE — v1
   Source : « Bibliothèque Hype Dressage — Conseils du coach v1 » (Blandine).
   Les textes des conseils sont repris MOT POUR MOT, rien n'a été réécrit.
   Ajouté par Claude : obs (ce que le juge observe), phase, type faire/eviter,
   prio 1-3, galopMin numérique, et le rattachement figure → identifiants.
   Fichier autonome : à pousser à côté de index.html, chargé avant lui.
   Traductions en/es/it/de/ja à ajouter dans les mêmes objets {fr:...}.
   ──────────────────────────────────────────────────────────────────────────── */
window.HYPE_DRESSAGE = window.HYPE_DRESSAGE || {};
window.HYPE_DRESSAGE.version = "1.3";
window.HYPE_DRESSAGE.fiches = {
 "entry_centerline": {
  "id": "entry_centerline",
  "label": {
   "fr": "Entrée sur la ligne du milieu"
  },
  "phase": "Entrée",
  "galopMin": 3,
  "difficulty": 2,
  "timing": {
   "trigger": "anticipe",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la rectitude sur l'axe"
   },
   {
    "fr": "la régularité de l'allure"
   },
   {
    "fr": "la tenue du cavalier"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Entre bien droit entre les deux lices."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Regarde X dès l’entrée."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Garde les deux jambes présentes pour éviter les zigzags."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Ne regarde pas le jury au détriment de la rectitude."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Stabilise l’allure avant d’entrer."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Évite de corriger trop tard avec les mains."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 4
   }
  ],
  "relatedFigures": [
   "straightness",
   "bend",
   "balance"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "halt_at_x": {
  "id": "halt_at_x",
  "label": {
   "fr": "Arrêt en X"
  },
  "phase": "Arrêt",
  "galopMin": 3,
  "difficulty": 2,
  "timing": {
   "trigger": "anticipe",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la précision de l'arrêt sur la lettre"
   },
   {
    "fr": "l'immobilité"
   },
   {
    "fr": "un cheval carré et droit"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Prépare l’arrêt plusieurs foulées avant X."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Garde le cheval droit entre les jambes et les rênes."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Cherche un arrêt net mais sans tirer brutalement."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Évite de t’arrêter avant ou après X."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Reste immobile quelques secondes."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Ne relâche pas tout avant que l’arrêt soit réellement stabilisé."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 4
   }
  ],
  "relatedFigures": [
   "salute",
   "final_halt",
   "rein_back"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "salute": {
  "id": "salute",
  "label": {
   "fr": "Salut"
  },
  "phase": "Arrêt",
  "galopMin": 3,
  "difficulty": 2,
  "timing": {
   "trigger": "anticipe",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "l'immobilité pendant le salut"
   },
   {
    "fr": "le calme du cheval"
   },
   {
    "fr": "la reprise des rênes sans geste brusque"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Stabilise d’abord l’arrêt avant de saluer."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Garde le buste droit et le regard calme."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Salue sans précipitation."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Évite de laisser le cheval repartir pendant le salut."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Reprends tes rênes sans geste brusque."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Prépare déjà le départ qui suit."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 4
   }
  ],
  "relatedFigures": [
   "halt_at_x",
   "final_halt",
   "rein_back"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "final_halt": {
  "id": "final_halt",
  "label": {
   "fr": "Arrêt final"
  },
  "phase": "Arrêt",
  "galopMin": 3,
  "difficulty": 2,
  "timing": {
   "trigger": "anticipe",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la précision de l'arrêt"
   },
   {
    "fr": "l'immobilité"
   },
   {
    "fr": "la qualité de la dernière transition"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Termine la reprise avec la même précision qu’au début."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Prépare l’arrêt avant X."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Garde le cheval droit jusqu’à l’immobilité."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Ne relâche pas ton attention trop tôt."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Évite un arrêt précipité."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Soigne le salut final."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 4
   }
  ],
  "relatedFigures": [
   "halt_at_x",
   "salute",
   "rein_back"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "walk_working": {
  "id": "walk_working",
  "label": {
   "fr": "Pas de travail"
  },
  "phase": "Pas",
  "galopMin": 2,
  "difficulty": 1,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "la régularité du pas à quatre temps"
   },
   {
    "fr": "l'activité"
   },
   {
    "fr": "la souplesse du contact"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Laisse le cheval avancer avec une cadence régulière."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Accompagne le mouvement avec ton bassin."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Garde un contact souple."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Évite de raccourcir l’encolure avec les mains."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Ne pousse pas à chaque foulée."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Recherche un pas actif sans précipitation."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 3
   }
  ],
  "relatedFigures": [
   "walk_free",
   "walk_medium",
   "walk_extended"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "walk_medium": {
  "id": "walk_medium",
  "label": {
   "fr": "Pas moyen"
  },
  "phase": "Pas",
  "galopMin": 4,
  "difficulty": 3,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "l'amplitude des foulées"
   },
   {
    "fr": "l'activité des postérieurs"
   },
   {
    "fr": "la rectitude"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Laisse le cheval couvrir du terrain."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Garde une activité régulière des postérieurs."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Autorise l’encolure à s’étendre sans perdre le contact."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Évite de bloquer le mouvement avec les mains."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Ne confonds pas amplitude et vitesse."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Garde une trajectoire précise."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 5
   }
  ],
  "relatedFigures": [
   "walk_free",
   "walk_working",
   "walk_extended"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "walk_free": {
  "id": "walk_free",
  "label": {
   "fr": "Pas libre"
  },
  "phase": "Pas",
  "galopMin": 3,
  "difficulty": 2,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "la descente d'encolure"
   },
   {
    "fr": "l'activité du pas"
   },
   {
    "fr": "un tracé maîtrisé"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Laisse le cheval descendre son encolure."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Garde les rênes suffisamment longues."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Conserve une marche active et régulière."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Évite de jeter complètement les rênes."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Ne laisse pas le cheval zigzaguer."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Reprends le contact progressivement avant la transition suivante."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 4
   }
  ],
  "relatedFigures": [
   "walk_working",
   "walk_medium",
   "walk_extended"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "walk_extended": {
  "id": "walk_extended",
  "label": {
   "fr": "Pas allongé"
  },
  "phase": "Pas",
  "galopMin": 6,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "l'amplitude maximale"
   },
   {
    "fr": "l'extension de l'encolure"
   },
   {
    "fr": "la régularité des quatre temps"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Recherche davantage d’amplitude sans accélérer."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Laisse l’encolure s’étendre."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Garde le cheval droit."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Évite de pousser trop fort avec les jambes."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Ne perds pas le rythme à quatre temps."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Prépare la reprise des rênes sans casser l’activité."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 7
   }
  ],
  "relatedFigures": [
   "walk_medium",
   "walk_free",
   "walk_working"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "trot_working": {
  "id": "trot_working",
  "label": {
   "fr": "Trot de travail"
  },
  "phase": "Trot",
  "galopMin": 2,
  "difficulty": 1,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "la régularité du rythme"
   },
   {
    "fr": "l'impulsion"
   },
   {
    "fr": "l'équilibre"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Garde une cadence régulière."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Cherche un cheval actif mais pas précipité."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Stabilise tes mains."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Évite de pousser à chaque foulée."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Ne laisse pas le cheval s’appuyer sur les épaules."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Conserve la même énergie dans les courbes."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 3
   }
  ],
  "relatedFigures": [
   "change_diagonal",
   "trot_rising",
   "stirrups_out_in"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "trot_medium": {
  "id": "trot_medium",
  "label": {
   "fr": "Trot moyen"
  },
  "phase": "Trot",
  "galopMin": 6,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "l'allongement des foulées"
   },
   {
    "fr": "la cadence conservée"
   },
   {
    "fr": "l'équilibre"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Demande plus d’amplitude, pas simplement plus de vitesse."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Prépare la transition avant la ligne."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Garde le cheval droit."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Évite de te pencher en avant."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Ne laisse pas la cadence s’accélérer."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Reprends progressivement avant la fin de la diagonale."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 7
   }
  ],
  "relatedFigures": [
   "lengthen_few_strides",
   "trot_sitting",
   "trot_extended"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "trot_extended": {
  "id": "trot_extended",
  "label": {
   "fr": "Trot allongé"
  },
  "phase": "Trot",
  "galopMin": 7,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "l'amplitude maximale"
   },
   {
    "fr": "la cadence inchangée"
   },
   {
    "fr": "la rectitude"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Recherche une vraie augmentation d’amplitude."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Garde le cheval en équilibre."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Accompagne sans pousser excessivement."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Évite la précipitation."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Ne laisse pas le cheval se désunir dans son rythme."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Prépare la transition de retour avant la lettre."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 8
   }
  ],
  "relatedFigures": [
   "trot_medium",
   "lengthen_few_strides",
   "trot_sitting"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "trot_sitting": {
  "id": "trot_sitting",
  "label": {
   "fr": "Trot assis"
  },
  "phase": "Trot",
  "galopMin": 5,
  "difficulty": 4,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "une assiette liante"
   },
   {
    "fr": "la régularité"
   },
   {
    "fr": "la décontraction du dos du cheval"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Assieds-toi sans te crisper."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Laisse ton bassin suivre le mouvement."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Garde les jambes descendues."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Évite de serrer les genoux."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Ne bloque pas le dos du cheval."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Cherche la stabilité avant la force."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 6
   }
  ],
  "relatedFigures": [
   "trot_medium",
   "lengthen_few_strides",
   "stirrups_out_in"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "trot_rising": {
  "id": "trot_rising",
  "label": {
   "fr": "Trot enlevé"
  },
  "phase": "Trot",
  "galopMin": 1,
  "difficulty": 1,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "le diagonal juste"
   },
   {
    "fr": "la régularité"
   },
   {
    "fr": "la souplesse du mouvement"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Garde un rythme régulier."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Monte et descends avec le mouvement du cheval."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Reste légère dans les étriers."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Évite de te jeter en avant."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Ne tire pas sur les rênes pour te stabiliser."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Vérifie le bon diagonal quand il est demandé."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 2
   }
  ],
  "relatedFigures": [
   "trot_working",
   "change_diagonal",
   "stirrups_out_in"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "canter_working": {
  "id": "canter_working",
  "label": {
   "fr": "Galop de travail"
  },
  "phase": "Galop",
  "galopMin": 3,
  "difficulty": 2,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "la netteté des trois temps"
   },
   {
    "fr": "l'équilibre"
   },
   {
    "fr": "la rectitude"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Garde un galop régulier et équilibré."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Accompagne avec ton bassin."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Stabilise tes mains."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Évite d’accélérer dans les courbes."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Ne laisse pas le cheval tomber sur les épaules."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Garde l’impulsion sans précipitation."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 4
   }
  ],
  "relatedFigures": [
   "counter_canter",
   "canter_medium",
   "counter_canter_loop"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "canter_medium": {
  "id": "canter_medium",
  "label": {
   "fr": "Galop moyen"
  },
  "phase": "Galop",
  "galopMin": 6,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "l'allongement de la foulée"
   },
   {
    "fr": "la cadence"
   },
   {
    "fr": "l'équilibre"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Augmente l’amplitude sans perdre l’équilibre."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Garde le cheval droit."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Prépare la transition avant la ligne."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Évite de pousser brusquement."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Ne laisse pas le galop devenir plat."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Reprends progressivement avant la lettre."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 7
   }
  ],
  "relatedFigures": [
   "counter_canter_loop",
   "counter_canter",
   "canter_extended"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "canter_extended": {
  "id": "canter_extended",
  "label": {
   "fr": "Galop allongé"
  },
  "phase": "Galop",
  "galopMin": 7,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "l'amplitude"
   },
   {
    "fr": "la franchise"
   },
   {
    "fr": "le retour au cadre en fin de ligne"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Recherche de grandes foulées sans précipitation."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Garde le cheval devant les jambes."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Reste stable dans ton haut du corps."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Évite de te pencher en avant."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Ne laisse pas le cheval s’ouvrir complètement."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Prépare la reprise de l’équilibre avant la fin de la ligne."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 8
   }
  ],
  "relatedFigures": [
   "canter_medium",
   "counter_canter_loop",
   "flying_change"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "transition_walk_trot": {
  "id": "transition_walk_trot",
  "label": {
   "fr": "Transition pas → trot"
  },
  "phase": "Transition",
  "galopMin": 2,
  "difficulty": 1,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "la franchise du départ"
   },
   {
    "fr": "la précision du lieu"
   },
   {
    "fr": "la régularité obtenue"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Prépare la transition quelques foulées avant."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Demande avec les jambes sans te jeter en avant."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Garde un contact stable."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Évite une transition brusque."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Ne laisse pas le cheval partir en accélérant."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Cherche un premier trot déjà régulier."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 3
   }
  ],
  "relatedFigures": [
   "transition_trot_walk",
   "transition_trot_canter",
   "transition_canter_trot"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "transition_trot_walk": {
  "id": "transition_trot_walk",
  "label": {
   "fr": "Transition trot → pas"
  },
  "phase": "Transition",
  "galopMin": 2,
  "difficulty": 1,
  "timing": {
   "trigger": "anticipe",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la netteté de la transition"
   },
   {
    "fr": "l'absence de résistance"
   },
   {
    "fr": "la qualité du pas obtenu"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Prépare avec ton bassin avant d’utiliser les mains."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Garde le cheval devant les jambes."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Cherche une transition nette et calme."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Évite de tirer au dernier moment."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Ne laisse pas le cheval s’effondrer sur les épaules."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Obtiens un pas actif dès la première foulée."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 3
   }
  ],
  "relatedFigures": [
   "transition_walk_trot",
   "transition_trot_canter",
   "transition_canter_trot"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "transition_trot_canter": {
  "id": "transition_trot_canter",
  "label": {
   "fr": "Transition trot → galop"
  },
  "phase": "Transition",
  "galopMin": 3,
  "difficulty": 2,
  "timing": {
   "trigger": "anticipe",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "le bon pied"
   },
   {
    "fr": "la franchise"
   },
   {
    "fr": "la rectitude au moment du départ"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Prépare l’incurvation avant la demande."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Garde le trot régulier jusqu’au départ."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Demande franchement sans précipiter."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Évite de lancer le cheval avec le haut du corps."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Ne demande pas trop tard dans le virage."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Vérifie immédiatement le bon pied."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 4
   }
  ],
  "relatedFigures": [
   "transition_canter_trot",
   "transition_walk_trot",
   "transition_trot_walk"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "transition_canter_trot": {
  "id": "transition_canter_trot",
  "label": {
   "fr": "Transition galop → trot"
  },
  "phase": "Transition",
  "galopMin": 3,
  "difficulty": 2,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "la progressivité"
   },
   {
    "fr": "l'équilibre"
   },
   {
    "fr": "un cheval droit"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Prépare la transition avant la lettre."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Redresse-toi sans tirer."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Garde l’activité des postérieurs."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Évite un trot précipité après la transition."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Ne laisse pas le cheval tomber sur les épaules."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Stabilise rapidement le nouveau rythme."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 4
   }
  ],
  "relatedFigures": [
   "transition_trot_canter",
   "transition_walk_trot",
   "transition_trot_walk"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "transition_walk_canter": {
  "id": "transition_walk_canter",
  "label": {
   "fr": "Départ au galop du pas"
  },
  "phase": "Transition",
  "galopMin": 5,
  "difficulty": 4,
  "timing": {
   "trigger": "anticipe",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "le bon pied"
   },
   {
    "fr": "l'absence de foulées de trot"
   },
   {
    "fr": "la rectitude"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Garde un pas actif jusqu’à la demande."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Prépare l’incurvation et l’équilibre."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Demande sans passer par le trot."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Évite de ralentir excessivement avant le départ."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Ne te penche pas vers l’intérieur."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Garde les épaules du cheval contrôlées."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 6
   }
  ],
  "relatedFigures": [
   "transition_canter_walk",
   "transition_within_trot",
   "simple_change"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "transition_canter_walk": {
  "id": "transition_canter_walk",
  "label": {
   "fr": "Transition galop → pas"
  },
  "phase": "Transition",
  "galopMin": 5,
  "difficulty": 4,
  "timing": {
   "trigger": "anticipe",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la netteté"
   },
   {
    "fr": "l'équilibre"
   },
   {
    "fr": "la qualité du pas obtenu"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Prépare fortement l’équilibre avant la transition."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Garde l’activité jusqu’au dernier temps de galop."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Cherche un passage net au pas."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Évite les foulées de trot."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Ne tire pas brutalement."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Obtiens immédiatement un pas régulier."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 6
   }
  ],
  "relatedFigures": [
   "transition_walk_canter",
   "transition_within_trot",
   "simple_change"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "simple_change": {
  "id": "simple_change",
  "label": {
   "fr": "Changement de pied simple"
  },
  "phase": "Transition",
  "galopMin": 6,
  "difficulty": 5,
  "timing": {
   "trigger": "anticipe",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "le nombre de foulées de pas"
   },
   {
    "fr": "le bon pied au départ"
   },
   {
    "fr": "la rectitude"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Prépare la transition au pas avant la lettre."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Garde le cheval droit."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Stabilise quelques foulées de pas."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Redemande le galop sans précipitation."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Évite de passer par le trot."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Ne laisse pas les hanches se décaler."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 7
   }
  ],
  "relatedFigures": [
   "transition_within_canter",
   "transition_walk_canter",
   "transition_canter_walk"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "transition_within_trot": {
  "id": "transition_within_trot",
  "label": {
   "fr": "Transition dans le trot"
  },
  "phase": "Transition",
  "galopMin": 5,
  "difficulty": 4,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "une différence visible entre les deux trots"
   },
   {
    "fr": "la cadence conservée"
   },
   {
    "fr": "le retour au cadre"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Modifie l’amplitude sans changer la cadence."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Garde le cheval droit."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Prépare la transition avant la lettre."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Évite de confondre allongement et accélération."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Ne perds pas l’équilibre au retour."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Garde le cheval devant les jambes."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 6
   }
  ],
  "relatedFigures": [
   "transition_walk_canter",
   "transition_canter_walk",
   "simple_change"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "transition_within_canter": {
  "id": "transition_within_canter",
  "label": {
   "fr": "Transition dans le galop"
  },
  "phase": "Transition",
  "galopMin": 6,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "une différence visible"
   },
   {
    "fr": "la cadence conservée"
   },
   {
    "fr": "l'équilibre"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Change l’amplitude sans casser le rythme."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Garde le cheval équilibré."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Prépare la transition avec le bassin et les jambes."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Évite un galop plat."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Ne ferme pas brutalement les doigts au retour."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Conserve l’impulsion."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 7
   }
  ],
  "relatedFigures": [
   "simple_change",
   "transition_walk_canter",
   "transition_canter_walk"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "diagonal_change_rein": {
  "id": "diagonal_change_rein",
  "label": {
   "fr": "Diagonale / changement de main"
  },
  "phase": "Ligne",
  "galopMin": 2,
  "difficulty": 1,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la rectitude de la ligne"
   },
   {
    "fr": "la précision du départ et de l'arrivée"
   },
   {
    "fr": "la régularité de l'allure"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Pars exactement de la lettre."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Regarde la lettre d’arrivée."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Garde une ligne droite."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Évite de tourner trop tôt."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Ne laisse pas les épaules dériver."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Prépare le changement d’incurvation à la fin."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 3
   }
  ],
  "relatedFigures": [
   "centerline",
   "across_short_side",
   "corner"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "centerline": {
  "id": "centerline",
  "label": {
   "fr": "Doubler dans la longueur"
  },
  "phase": "Ligne",
  "galopMin": 2,
  "difficulty": 1,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la rectitude sur l'axe"
   },
   {
    "fr": "la précision du doubler"
   },
   {
    "fr": "la régularité"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Entre droit sur la ligne."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Regarde le point d’arrivée."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Garde les deux jambes présentes."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Évite les zigzags."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Ne corrige pas brutalement avec les rênes."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Prépare la sortie avant la piste."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 3
   }
  ],
  "relatedFigures": [
   "diagonal_change_rein",
   "across_short_side",
   "corner"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "across_short_side": {
  "id": "across_short_side",
  "label": {
   "fr": "Doubler dans la largeur"
  },
  "phase": "Ligne",
  "galopMin": 2,
  "difficulty": 1,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "des coins passés en entier"
   },
   {
    "fr": "l'équilibre"
   },
   {
    "fr": "la régularité"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Pars précisément à la lettre."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Garde le cheval droit."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Regarde la lettre opposée."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Évite une trajectoire en biais."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Ne tourne pas trop tôt."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Prépare la nouvelle direction avant la piste."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 3
   }
  ],
  "relatedFigures": [
   "diagonal_change_rein",
   "centerline",
   "corner"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "long_side": {
  "id": "long_side",
  "label": {
   "fr": "Ligne droite sur le grand côté"
  },
  "phase": "Ligne",
  "galopMin": 1,
  "difficulty": 1,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "la rectitude le long de la piste"
   },
   {
    "fr": "la constance de l'allure"
   },
   {
    "fr": "un cheval réellement sur la piste"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Garde le cheval parallèle à la piste."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Regarde loin devant."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Conserve le même rythme."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Évite de coller à la lice."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Ne laisse pas les épaules partir vers l’intérieur."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Prépare le coin avant d’y arriver."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 2
   }
  ],
  "relatedFigures": [
   "diagonal_change_rein",
   "centerline",
   "across_short_side"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "corner": {
  "id": "corner",
  "label": {
   "fr": "Passage du coin"
  },
  "phase": "Ligne",
  "galopMin": 2,
  "difficulty": 1,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "un coin réellement passé"
   },
   {
    "fr": "une incurvation adaptée"
   },
   {
    "fr": "l'équilibre"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Prépare le coin avant d’y entrer."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Garde une incurvation adaptée."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Soutiens l’épaule extérieure."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Évite de couper le coin."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Ne ralentis pas excessivement."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Regarde déjà la ligne suivante."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 3
   }
  ],
  "relatedFigures": [
   "diagonal_change_rein",
   "centerline",
   "across_short_side"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "circle_20m": {
  "id": "circle_20m",
  "label": {
   "fr": "Cercle de 20 m"
  },
  "phase": "Cercle",
  "galopMin": 2,
  "difficulty": 1,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la précision du diamètre"
   },
   {
    "fr": "la régularité"
   },
   {
    "fr": "l'incurvation"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Regarde le prochain quart de cercle."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Garde un diamètre régulier."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Conserve la même cadence."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Évite de couper le cercle."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Ne laisse pas les épaules s’échapper."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Prépare la sortie avant de revenir à la lettre."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 3
   }
  ],
  "relatedFigures": [
   "volte",
   "half_volte",
   "serpentine_3"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "circle_15m": {
  "id": "circle_15m",
  "label": {
   "fr": "Cercle de 15 m"
  },
  "phase": "Cercle",
  "galopMin": 4,
  "difficulty": 3,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la précision du diamètre"
   },
   {
    "fr": "l'incurvation"
   },
   {
    "fr": "l'équilibre"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Prépare davantage l’incurvation qu’en cercle de 20 m."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Garde l’activité des postérieurs."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Conserve un tracé rond."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Évite de réduire le cercle en spirale."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Ne laisse pas le cheval tomber vers l’intérieur."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Anticipe la sortie."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 5
   }
  ],
  "relatedFigures": [
   "reverse_half_volte",
   "shallow_loop",
   "enlarge_circle"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "circle_10m": {
  "id": "circle_10m",
  "label": {
   "fr": "Cercle de 10 m"
  },
  "phase": "Cercle",
  "galopMin": 5,
  "difficulty": 4,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la rondeur"
   },
   {
    "fr": "l'incurvation"
   },
   {
    "fr": "l'engagement de l'arrière-main"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Prépare l’équilibre avant d’entrer."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Garde une incurvation constante."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Contrôle les épaules."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Évite de ralentir excessivement."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Ne transforme pas le cercle en ovale."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Garde l’impulsion jusqu’à la sortie."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 6
   }
  ],
  "relatedFigures": [
   "serpentine_4",
   "spiral_in_out",
   "half_circle_20m"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "circle_8m": {
  "id": "circle_8m",
  "label": {
   "fr": "Cercle de 8 m"
  },
  "phase": "Cercle",
  "galopMin": 7,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la rondeur"
   },
   {
    "fr": "une incurvation soutenue"
   },
   {
    "fr": "l'équilibre"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Rassemble avant d’entrer."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Garde le cheval très équilibré."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Contrôle précisément les épaules et les hanches."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Évite de perdre l’activité."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Ne demande pas trop d’incurvation."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Soigne la sortie pour retrouver la ligne."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 8
   }
  ],
  "relatedFigures": [
   "counter_change_loop",
   "circle_12m",
   "circle_6m"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "circle_6m": {
  "id": "circle_6m",
  "label": {
   "fr": "Cercle de 6 m"
  },
  "phase": "Cercle",
  "galopMin": 8,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la rondeur"
   },
   {
    "fr": "le rassembler"
   },
   {
    "fr": "le contrôle des épaules"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Prépare nettement le rassembler."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Garde un tracé parfaitement régulier."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Contrôle les épaules sans bloquer l’impulsion."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Évite que les hanches s’échappent."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Ne laisse pas le cercle s’agrandir."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 9
   },
   {
    "txt": {
     "fr": "Sors avec la même qualité d’allure."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 9
   }
  ],
  "relatedFigures": [
   "half_circle_10m",
   "circle_8m",
   "counter_change_loop"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "volte": {
  "id": "volte",
  "label": {
   "fr": "Volte"
  },
  "phase": "Cercle",
  "galopMin": 3,
  "difficulty": 2,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "une taille régulière"
   },
   {
    "fr": "l'incurvation"
   },
   {
    "fr": "l'équilibre"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Prépare la volte avant la lettre."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Regarde le point de sortie."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Garde une incurvation régulière."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Évite une volte ovale."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Ne coupe pas la sortie."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Garde le même rythme."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 4
   }
  ],
  "relatedFigures": [
   "half_volte",
   "serpentine_3",
   "circle_20m"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "half_volte": {
  "id": "half_volte",
  "label": {
   "fr": "Demi-volte"
  },
  "phase": "Cercle",
  "galopMin": 3,
  "difficulty": 2,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la régularité de la demi-volte"
   },
   {
    "fr": "un retour précis sur la piste"
   },
   {
    "fr": "l'incurvation"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Dessine une première moitié de cercle régulière."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Prépare la diagonale de retour."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Change progressivement d’incurvation."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Évite de casser la courbe."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Ne rejoins pas la piste trop tôt."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Garde la même cadence."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 4
   }
  ],
  "relatedFigures": [
   "volte",
   "serpentine_3",
   "circle_20m"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "reverse_half_volte": {
  "id": "reverse_half_volte",
  "label": {
   "fr": "Demi-volte renversée"
  },
  "phase": "Cercle",
  "galopMin": 4,
  "difficulty": 3,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "un départ précis"
   },
   {
    "fr": "la régularité de la courbe"
   },
   {
    "fr": "le retour à la piste dans l'axe"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Entre droit sur la diagonale."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Prépare la courbe avant la fin de la ligne."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Change progressivement d’incurvation."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Évite un retour brusque vers la piste."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Ne coupe pas la demi-volte."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Conserve le rythme."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 5
   }
  ],
  "relatedFigures": [
   "circle_15m",
   "shallow_loop",
   "enlarge_circle"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "serpentine_3": {
  "id": "serpentine_3",
  "label": {
   "fr": "Serpentine à 3 boucles"
  },
  "phase": "Cercle",
  "galopMin": 3,
  "difficulty": 2,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "des boucles de taille égale"
   },
   {
    "fr": "des changements de pli nets"
   },
   {
    "fr": "la régularité"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Répartis les boucles régulièrement."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Passe sur la ligne du milieu à chaque changement."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Change d’incurvation progressivement."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Évite des boucles de tailles différentes."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Ne tourne pas trop tôt."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Garde la cadence constante."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 4
   }
  ],
  "relatedFigures": [
   "volte",
   "half_volte",
   "circle_20m"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "serpentine_4": {
  "id": "serpentine_4",
  "label": {
   "fr": "Serpentine à 4 boucles"
  },
  "phase": "Cercle",
  "galopMin": 5,
  "difficulty": 4,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "des boucles égales"
   },
   {
    "fr": "les changements de pli"
   },
   {
    "fr": "l'équilibre"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Prépare chaque changement d’incurvation."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Garde les boucles symétriques."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Passe précisément sur la ligne du milieu."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Évite de perdre le rythme."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Ne laisse pas les épaules dériver."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Anticipe la boucle suivante."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 6
   }
  ],
  "relatedFigures": [
   "circle_10m",
   "spiral_in_out",
   "half_circle_20m"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "shallow_loop": {
  "id": "shallow_loop",
  "label": {
   "fr": "Boucle peu profonde"
  },
  "phase": "Cercle",
  "galopMin": 4,
  "difficulty": 3,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "une profondeur régulière"
   },
   {
    "fr": "la rectitude retrouvée"
   },
   {
    "fr": "la cadence"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Pars précisément de la piste."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Garde une courbe fluide."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Prépare le retour vers la piste."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Évite une boucle trop profonde."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Ne change pas brutalement d’incurvation."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Conserve la cadence."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 5
   }
  ],
  "relatedFigures": [
   "circle_15m",
   "reverse_half_volte",
   "enlarge_circle"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "counter_change_loop": {
  "id": "counter_change_loop",
  "label": {
   "fr": "Contre-changement de main"
  },
  "phase": "Cercle",
  "galopMin": 6,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la symétrie des boucles"
   },
   {
    "fr": "les changements de pli"
   },
   {
    "fr": "la régularité"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Garde les deux diagonales symétriques."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Prépare le changement de direction au milieu."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Conserve l’équilibre et la cadence."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Évite de casser la ligne au changement."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Ne laisse pas les hanches dévier."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Regarde chaque point de passage."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 7
   }
  ],
  "relatedFigures": [
   "circle_12m",
   "circle_10m",
   "serpentine_4"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "rein_back": {
  "id": "rein_back",
  "label": {
   "fr": "Reculer"
  },
  "phase": "Arrêt",
  "galopMin": 5,
  "difficulty": 4,
  "timing": {
   "trigger": "anticipe",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "le nombre de pas"
   },
   {
    "fr": "des diagonaux nets"
   },
   {
    "fr": "un cheval droit"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Obtiens d’abord un arrêt droit et immobile."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Demande des pas réguliers et diagonalisés."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Garde le cheval droit."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Évite de tirer en continu."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Ne laisse pas les hanches partir de côté."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Repars en avant dès que la réponse est obtenue."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 6
   }
  ],
  "relatedFigures": [
   "halt_reinback_forward",
   "halt_at_x",
   "salute"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "halt_reinback_forward": {
  "id": "halt_reinback_forward",
  "label": {
   "fr": "Arrêt – reculer – repartir"
  },
  "phase": "Arrêt",
  "galopMin": 6,
  "difficulty": 5,
  "timing": {
   "trigger": "anticipe",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la netteté de l'arrêt"
   },
   {
    "fr": "la régularité du reculer"
   },
   {
    "fr": "la franchise du départ en avant"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Stabilise complètement l’arrêt."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Garde le cheval droit pendant le reculer."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Repars franchement vers l’avant."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Évite un temps mort trop long."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Ne laisse pas le cheval s’ouvrir."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Conserve une sensation de disponibilité."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 7
   }
  ],
  "relatedFigures": [
   "rein_back",
   "halt_at_x",
   "salute"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "leg_yield": {
  "id": "leg_yield",
  "label": {
   "fr": "Cession à la jambe"
  },
  "phase": "Latéral",
  "galopMin": 5,
  "difficulty": 4,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "l'angle et le croisement"
   },
   {
    "fr": "la rectitude du corps"
   },
   {
    "fr": "la régularité de l'allure"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Pense “en avant et de côté”."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Garde une légère flexion opposée au déplacement."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Contrôle les épaules."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Évite que les hanches dépassent."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Ne perds pas la cadence."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Termine la figure droit."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 6
   }
  ],
  "relatedFigures": [
   "shoulder_in",
   "counter_shoulder_in",
   "travers"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "shoulder_in": {
  "id": "shoulder_in",
  "label": {
   "fr": "Épaule en dedans"
  },
  "phase": "Latéral",
  "galopMin": 6,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "un angle constant"
   },
   {
    "fr": "l'incurvation"
   },
   {
    "fr": "la cadence conservée"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Prépare l’incurvation avant la figure."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Garde trois pistes régulières."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Contrôle les épaules avec la rêne extérieure."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Évite trop d’angle."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Ne laisse pas les hanches sortir."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Conserve l’activité des postérieurs."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 7
   }
  ],
  "relatedFigures": [
   "leg_yield",
   "counter_shoulder_in",
   "travers"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "counter_shoulder_in": {
  "id": "counter_shoulder_in",
  "label": {
   "fr": "Contre-épaule en dedans"
  },
  "phase": "Latéral",
  "galopMin": 7,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "l'angle"
   },
   {
    "fr": "le contrôle des épaules"
   },
   {
    "fr": "la régularité"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Garde les épaules déplacées vers l’intérieur de la carrière."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Maintiens une incurvation adaptée."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Contrôle les hanches sur la piste."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Évite de perdre la cadence."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Ne demande pas trop d’angle."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Prépare la sortie progressivement."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 8
   }
  ],
  "relatedFigures": [
   "travers",
   "half_pass_trot",
   "shoulder_in"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "travers": {
  "id": "travers",
  "label": {
   "fr": "Travers"
  },
  "phase": "Latéral",
  "galopMin": 7,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "l'angle et l'incurvation"
   },
   {
    "fr": "la régularité"
   },
   {
    "fr": "l'engagement"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Garde les épaules sur la piste."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Déplace les hanches vers l’intérieur."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Maintiens l’incurvation dans le sens du mouvement."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Évite que les épaules quittent la piste."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Ne perds pas l’impulsion."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Conserve un angle régulier."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 8
   }
  ],
  "relatedFigures": [
   "counter_shoulder_in",
   "half_pass_trot",
   "shoulder_in"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "renvers": {
  "id": "renvers",
  "label": {
   "fr": "Renvers"
  },
  "phase": "Latéral",
  "galopMin": 8,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "l'angle"
   },
   {
    "fr": "l'incurvation"
   },
   {
    "fr": "la cadence"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Contrôle précisément les épaules."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Maintiens les hanches sur la piste intérieure."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Garde l’incurvation dans le sens du mouvement."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Évite la perte de cadence."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Ne laisse pas le cheval se traverser."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 9
   },
   {
    "txt": {
     "fr": "Prépare soigneusement l’entrée et la sortie."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 9
   }
  ],
  "relatedFigures": [
   "half_pass_canter",
   "counter_shoulder_in",
   "travers"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "half_pass_trot": {
  "id": "half_pass_trot",
  "label": {
   "fr": "Appuyer au trot"
  },
  "phase": "Latéral",
  "galopMin": 7,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "le croisement"
   },
   {
    "fr": "l'incurvation vers le déplacement"
   },
   {
    "fr": "le parallélisme au grand côté"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Prépare l’incurvation avant la diagonale."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Pense d’abord en avant, puis de côté."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Garde les épaules légèrement en avance sur les hanches."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Évite trop de déplacement latéral."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Ne perds pas la cadence."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Termine droit avant la piste."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 8
   }
  ],
  "relatedFigures": [
   "counter_shoulder_in",
   "travers",
   "shoulder_in"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "half_pass_canter": {
  "id": "half_pass_canter",
  "label": {
   "fr": "Appuyer au galop"
  },
  "phase": "Latéral",
  "galopMin": 8,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "le croisement"
   },
   {
    "fr": "l'incurvation"
   },
   {
    "fr": "l'équilibre du galop"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Garde le galop actif et rassemblé."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Maintiens l’incurvation dans le sens du déplacement."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Contrôle les épaules."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Évite que les hanches passent devant."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Ne laisse pas le galop devenir plat."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 9
   },
   {
    "txt": {
     "fr": "Prépare la sortie avant la piste."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 9
   }
  ],
  "relatedFigures": [
   "renvers",
   "counter_shoulder_in",
   "travers"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "counter_canter": {
  "id": "counter_canter",
  "label": {
   "fr": "Contre-galop"
  },
  "phase": "Galop",
  "galopMin": 5,
  "difficulty": 4,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "le maintien du pied"
   },
   {
    "fr": "l'équilibre"
   },
   {
    "fr": "une incurvation contrôlée"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Garde le cheval équilibré sur le pied demandé."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Contrôle les épaules."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Regarde loin dans la courbe."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Évite de changer involontairement de pied."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Ne pousse pas les hanches vers l’extérieur."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Conserve un galop régulier."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 6
   }
  ],
  "relatedFigures": [
   "canter_medium",
   "counter_canter_loop",
   "canter_working"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "counter_canter_loop": {
  "id": "counter_canter_loop",
  "label": {
   "fr": "Boucle au contre-galop"
  },
  "phase": "Galop",
  "galopMin": 6,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "la netteté de la boucle"
   },
   {
    "fr": "le maintien du pied"
   },
   {
    "fr": "l'équilibre"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Prépare la courbe avant de quitter la piste."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Garde les épaules contrôlées."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Conserve le même pied."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Évite une boucle trop profonde."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Ne perds pas l’équilibre au retour."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Garde la cadence."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 7
   }
  ],
  "relatedFigures": [
   "canter_medium",
   "counter_canter",
   "canter_extended"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "flying_change": {
  "id": "flying_change",
  "label": {
   "fr": "Changement de pied en l’air"
  },
  "phase": "Galop",
  "galopMin": 8,
  "difficulty": 5,
  "timing": {
   "trigger": "anticipe",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "un changement net devant et derrière"
   },
   {
    "fr": "la rectitude"
   },
   {
    "fr": "le calme"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Garde le galop droit et équilibré avant la demande."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Prépare le changement sans accélérer."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Demande dans une foulée montante."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Évite de jeter les épaules."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Ne laisse pas les hanches se décaler."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 9
   },
   {
    "txt": {
     "fr": "Stabilise immédiatement le nouveau galop."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 9
   }
  ],
  "relatedFigures": [
   "flying_changes_line",
   "canter_extended",
   "canter_medium"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "flying_changes_line": {
  "id": "flying_changes_line",
  "label": {
   "fr": "Ligne de changements de pied"
  },
  "phase": "Galop",
  "galopMin": 8,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "le nombre de foulées entre les changements"
   },
   {
    "fr": "la rectitude"
   },
   {
    "fr": "la régularité"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Garde un rythme constant entre les changements."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Reste droit sur la ligne."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Prépare chaque changement sans précipitation."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Évite de compter trop tard."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Ne laisse pas les hanches osciller."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 9
   },
   {
    "txt": {
     "fr": "Conserve la même qualité de galop."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 9
   }
  ],
  "relatedFigures": [
   "flying_change",
   "canter_extended",
   "canter_medium"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "collected_trot": {
  "id": "collected_trot",
  "label": {
   "fr": "Trot rassemblé"
  },
  "phase": "Rassembler",
  "galopMin": 8,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "l'engagement de l'arrière-main"
   },
   {
    "fr": "des foulées raccourcies et relevées"
   },
   {
    "fr": "la cadence"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Recherche plus d’équilibre, pas moins d’activité."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Garde les postérieurs engagés."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Reste souple dans le bassin."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Évite de ralentir simplement l’allure."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Ne bloque pas l’encolure."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 9
   },
   {
    "txt": {
     "fr": "Conserve une cadence claire."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 9
   }
  ],
  "relatedFigures": [
   "collected_canter",
   "canter_half_pirouette",
   "walk_pirouette_half"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "collected_canter": {
  "id": "collected_canter",
  "label": {
   "fr": "Galop rassemblé"
  },
  "phase": "Rassembler",
  "galopMin": 8,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "le rassembler"
   },
   {
    "fr": "un équilibre montant"
   },
   {
    "fr": "la cadence"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Garde l’activité des postérieurs."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Réduis l’amplitude sans perdre le rythme."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Contrôle les épaules."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Évite un galop à quatre temps."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Ne serre pas les mains en continu."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 9
   },
   {
    "txt": {
     "fr": "Recherche une sensation montante."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 9
   }
  ],
  "relatedFigures": [
   "collected_trot",
   "canter_half_pirouette",
   "walk_pirouette_half"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "walk_pirouette_half": {
  "id": "walk_pirouette_half",
  "label": {
   "fr": "Demi-pirouette au pas"
  },
  "phase": "Rassembler",
  "galopMin": 7,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "des pas maintenus"
   },
   {
    "fr": "la taille du cercle"
   },
   {
    "fr": "le calme"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Garde un pas actif et régulier."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Déplace les épaules autour des hanches."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Maintiens une légère incurvation."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Évite que les postérieurs se croisent excessivement."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Ne bloque pas le pas."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Sors droit et en avant."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 8
   }
  ],
  "relatedFigures": [
   "collected_trot",
   "collected_canter",
   "canter_half_pirouette"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "canter_half_pirouette": {
  "id": "canter_half_pirouette",
  "label": {
   "fr": "Demi-pirouette au galop"
  },
  "phase": "Rassembler",
  "galopMin": 8,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "l'engagement"
   },
   {
    "fr": "le nombre de foulées"
   },
   {
    "fr": "l'équilibre"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Prépare un galop très rassemblé."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Garde l’activité et la cadence."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Déplace les épaules autour des hanches."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Évite de perdre le saut du galop."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Ne laisse pas la pirouette s’agrandir."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 9
   },
   {
    "txt": {
     "fr": "Sors avec une foulée active et droite."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 9
   }
  ],
  "relatedFigures": [
   "collected_trot",
   "collected_canter",
   "walk_pirouette_half"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "spiral_in_out": {
  "id": "spiral_in_out",
  "label": {
   "fr": "Spirale sur le cercle"
  },
  "phase": "Cercle",
  "galopMin": 5,
  "difficulty": 4,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la régularité de la spirale"
   },
   {
    "fr": "l'incurvation"
   },
   {
    "fr": "le contrôle du diamètre"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Réduis le cercle progressivement."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Garde l’incurvation et la cadence."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Contrôle les épaules."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Évite de tirer vers l’intérieur."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Ne perds pas l’impulsion."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Agrandis ensuite sans laisser les hanches fuir."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 6
   }
  ],
  "relatedFigures": [
   "circle_10m",
   "serpentine_4",
   "half_circle_20m"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "enlarge_circle": {
  "id": "enlarge_circle",
  "label": {
   "fr": "Agrandir le cercle"
  },
  "phase": "Cercle",
  "galopMin": 4,
  "difficulty": 3,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la progressivité de l'agrandissement"
   },
   {
    "fr": "l'incurvation"
   },
   {
    "fr": "la cadence"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Garde l’incurvation en allant vers l’extérieur."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Déplace le cheval avec la jambe intérieure."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Contrôle l’épaule extérieure."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Évite de partir en diagonale."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Ne perds pas le rythme."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Reviens ensuite sur un cercle régulier."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 5
   }
  ],
  "relatedFigures": [
   "circle_15m",
   "reverse_half_volte",
   "shallow_loop"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "reduce_circle": {
  "id": "reduce_circle",
  "label": {
   "fr": "Réduire le cercle"
  },
  "phase": "Cercle",
  "galopMin": 4,
  "difficulty": 3,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la progressivité"
   },
   {
    "fr": "l'engagement"
   },
   {
    "fr": "l'équilibre"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Réduis progressivement le diamètre."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Garde les épaules sur la courbe."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Maintiens l’activité."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Évite de tourner uniquement avec la rêne intérieure."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Ne laisse pas les hanches sortir."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Conserve une incurvation adaptée."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 5
   }
  ],
  "relatedFigures": [
   "circle_15m",
   "reverse_half_volte",
   "shallow_loop"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "precision_letter": {
  "id": "precision_letter",
  "label": {
   "fr": "Précision à la lettre"
  },
  "phase": "Fond",
  "galopMin": 1,
  "difficulty": 1,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "l'exécution à la lettre"
   },
   {
    "fr": "la préparation anticipée"
   },
   {
    "fr": "la netteté"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Prépare la figure avant la lettre."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "La lettre indique l’endroit où la figure doit être visible."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Évite de commencer ta demande au dernier moment."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Regarde la lettre suivante."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Ne sacrifie pas l’équilibre pour la précision."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Termine proprement avant d’enchaîner."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 2
   }
  ],
  "relatedFigures": [
   "straightness",
   "bend",
   "balance"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "rhythm_regularity": {
  "id": "rhythm_regularity",
  "label": {
   "fr": "Régularité du rythme"
  },
  "phase": "Fond",
  "galopMin": 1,
  "difficulty": 1,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "la régularité du rythme"
   },
   {
    "fr": "la constance de la cadence"
   },
   {
    "fr": "un tempo inchangé"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Garde la même cadence avant, pendant et après la figure."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Évite d’accélérer dans les lignes droites."
    },
    "type": "eviter",
    "prio": 1,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Ne ralentis pas excessivement dans les courbes."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Stabilise ton bassin."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Garde des aides discrètes."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Corrige tôt plutôt que brutalement."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 2
   }
  ],
  "relatedFigures": [
   "straightness",
   "bend",
   "balance"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "straightness": {
  "id": "straightness",
  "label": {
   "fr": "Rectitude"
  },
  "phase": "Fond",
  "galopMin": 1,
  "difficulty": 1,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "la rectitude sur les lignes"
   },
   {
    "fr": "épaules et hanches alignées"
   },
   {
    "fr": "un contact égal"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Garde les épaules devant les hanches."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Encadre le cheval avec les deux jambes."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Regarde loin devant."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Évite de corriger uniquement avec les rênes."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Ne laisse pas l’encolure remplacer la trajectoire du corps."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Garde un contact égal."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 2
   }
  ],
  "relatedFigures": [
   "bend",
   "balance",
   "rhythm_regularity"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "bend": {
  "id": "bend",
  "label": {
   "fr": "Incurvation"
  },
  "phase": "Fond",
  "galopMin": 1,
  "difficulty": 1,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "une incurvation homogène"
   },
   {
    "fr": "le contrôle de l'épaule extérieure"
   },
   {
    "fr": "l'adaptation à la courbe"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Cherche une courbe régulière de la tête à la queue."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Garde la jambe intérieure à la sangle."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Contrôle l’épaule extérieure."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Évite de plier uniquement l’encolure."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Ne pousse pas les hanches vers l’extérieur."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Adapte l’incurvation à la taille de la courbe."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 2
   }
  ],
  "relatedFigures": [
   "straightness",
   "balance",
   "rhythm_regularity"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "balance": {
  "id": "balance",
  "label": {
   "fr": "Équilibre"
  },
  "phase": "Fond",
  "galopMin": 1,
  "difficulty": 1,
  "timing": {
   "trigger": "debut",
   "duree": 4800
  },
  "obs": [
   {
    "fr": "l'équilibre dans les transitions"
   },
   {
    "fr": "un cheval devant les jambes"
   },
   {
    "fr": "l'absence d'appui sur les épaules"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Prépare les transitions avant la figure."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Garde le cheval devant les jambes."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Stabilise ton haut du corps."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Évite de tirer pour ralentir."
    },
    "type": "eviter",
    "prio": 2,
    "galopMin": 1
   },
   {
    "txt": {
     "fr": "Ne laisse pas le cheval tomber sur les épaules."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Recherche une sensation montante."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 2
   }
  ],
  "relatedFigures": [
   "straightness",
   "bend",
   "rhythm_regularity"
  ],
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "circle_12m": {
  "id": "circle_12m",
  "label": {
   "fr": "Cercle de 12 mètres"
  },
  "phase": "Cercle",
  "galopMin": 6,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la précision du diamètre"
   },
   {
    "fr": "la régularité de l'incurvation"
   },
   {
    "fr": "l'équilibre dans la courbe"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Prépare ton cercle avant d'arriver à la lettre."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Garde un diamètre parfaitement constant du début à la fin."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Conserve une incurvation régulière sans plier uniquement l'encolure."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Garde les épaules devant les hanches pour préserver l'équilibre."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Évite de rétrécir progressivement ton cercle ou de sortir trop tôt."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Prépare la sortie plusieurs foulées avant de retrouver la piste."
    },
    "type": "faire",
    "prio": 3,
    "galopMin": 7
   }
  ],
  "relatedFigures": [
   "counter_change_loop",
   "circle_10m",
   "serpentine_4"
  ],
  "source": "Blandine",
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "curved_line_x": {
  "id": "curved_line_x",
  "label": {
   "fr": "Ligne courbe passant par X"
  },
  "phase": "Ligne",
  "galopMin": 6,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "le passage exact par X"
   },
   {
    "fr": "la fluidité de la courbe"
   },
   {
    "fr": "le changement d'incurvation au centre"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Vise X, puis seulement ensuite la lettre d'arrivée."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Dessine une seule courbe continue, sans partie droite au milieu."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Change d'incurvation progressivement en passant sur X."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Garde la même cadence du début à la fin de la ligne."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Évite de couper en deux diagonales avec un angle sur X."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Ne laisse pas les épaules glisser vers l'extérieur dans la seconde moitié."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 7
   }
  ],
  "relatedFigures": [
   "diagonal_change_rein",
   "centerline",
   "across_short_side"
  ],
  "source": "Claude",
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "half_circle_20m": {
  "id": "half_circle_20m",
  "label": {
   "fr": "Demi-cercle de 20 m"
  },
  "phase": "Cercle",
  "galopMin": 5,
  "difficulty": 4,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la rondeur du demi-cercle"
   },
   {
    "fr": "les points de départ et d'arrivée respectés"
   },
   {
    "fr": "la régularité de l'allure"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Pars exactement à la lettre et vise déjà la lettre de sortie."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Garde le même rayon sur toute la demi-courbe."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Conserve une incurvation régulière jusqu'au retour sur la piste."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Prépare la transition ou la suite avant la fin du demi-cercle."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 5
   },
   {
    "txt": {
     "fr": "Évite d'aplatir la première moitié puis de resserrer la seconde."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Ne reviens pas à la piste en diagonale, termine ta courbe."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 6
   }
  ],
  "relatedFigures": [
   "circle_10m",
   "serpentine_4",
   "spiral_in_out"
  ],
  "source": "Claude",
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "half_circle_10m": {
  "id": "half_circle_10m",
  "label": {
   "fr": "Demi-cercle de 10 m"
  },
  "phase": "Cercle",
  "galopMin": 8,
  "difficulty": 5,
  "timing": {
   "trigger": "debut",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "la taille réelle du demi-cercle"
   },
   {
    "fr": "l'engagement de l'arrière-main"
   },
   {
    "fr": "l'équilibre dans une courbe serrée"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Rassemble un peu avant d'entrer dans la courbe."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Garde la jambe intérieure à la sangle pour tenir le rayon."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Contrôle l'épaule extérieure du début à la fin."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Regarde le point de sortie dès le premier quart."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Évite de ralentir pour tourner : garde l'activité."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 9
   },
   {
    "txt": {
     "fr": "Ne laisse pas les hanches s'échapper vers l'extérieur."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 9
   }
  ],
  "relatedFigures": [
   "circle_6m",
   "circle_8m",
   "counter_change_loop"
  ],
  "source": "Claude",
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "release_contact": {
  "id": "release_contact",
  "label": {
   "fr": "Rênes longues, rupture de contact"
  },
  "phase": "Fond",
  "galopMin": 8,
  "difficulty": 5,
  "timing": {
   "trigger": "anticipe",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "un cheval qui reste dans le même équilibre"
   },
   {
    "fr": "l'allure et la trajectoire conservées"
   },
   {
    "fr": "la reprise du contact en douceur"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Avance les mains franchement, sans les jeter."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Le cheval doit garder la même allure et le même tracé sans la main."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Continue à conduire avec l'assiette et les jambes."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Reprends le contact progressivement, pas d'un coup."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 8
   },
   {
    "txt": {
     "fr": "Évite de laisser le cheval accélérer ou tomber sur les épaules."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 9
   },
   {
    "txt": {
     "fr": "Ne rends que ce que tu peux reprendre proprement."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 9
   }
  ],
  "relatedFigures": [
   "straightness",
   "bend",
   "balance"
  ],
  "source": "Claude",
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "change_diagonal": {
  "id": "change_diagonal",
  "label": {
   "fr": "Changer de diagonal"
  },
  "phase": "Trot",
  "galopMin": 2,
  "difficulty": 1,
  "timing": {
   "trigger": "anticipe",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "le changement effectué à l'endroit demandé"
   },
   {
    "fr": "le rythme conservé"
   },
   {
    "fr": "l'assiette qui reste liante"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Assieds-toi une seule foulée, puis repars sur l'autre diagonal."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Change au point demandé, pas quand ça t'arrange."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Garde le buste droit pendant la foulée assise."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Vérifie ton diagonal sans baisser les yeux sur l'épaule."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 2
   },
   {
    "txt": {
     "fr": "Évite de casser le rythme du trot pour changer."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Ne t'aide pas des rênes pour te rasseoir."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 3
   }
  ],
  "relatedFigures": [
   "trot_working",
   "trot_rising",
   "stirrups_out_in"
  ],
  "source": "Claude",
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "stirrups_out_in": {
  "id": "stirrups_out_in",
  "label": {
   "fr": "Déchausser et rechausser les étriers"
  },
  "phase": "Trot",
  "galopMin": 3,
  "difficulty": 2,
  "timing": {
   "trigger": "anticipe",
   "duree": 5600
  },
  "obs": [
   {
    "fr": "la fixité de la jambe pieds hors des étriers"
   },
   {
    "fr": "l'allure et le tracé conservés"
   },
   {
    "fr": "des étriers repris sans regarder"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Garde les jambes longues et descendues, sans chercher l'étrier avec le pied."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Continue à conduire : le tracé et l'allure sont notés autant que l'exercice."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Retrouve l'étrier par le sens du pied, la tête haute."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Reste liant du bassin, sans te crisper sur les genoux."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 3
   },
   {
    "txt": {
     "fr": "Évite de regarder tes pieds ou de te pencher."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 4
   },
   {
    "txt": {
     "fr": "Ne laisse pas le cheval ralentir pendant l'exercice."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 4
   }
  ],
  "relatedFigures": [
   "trot_working",
   "change_diagonal",
   "trot_rising"
  ],
  "source": "Claude",
  "video": null,
  "illustration": null,
  "courseId": null
 },
 "lengthen_few_strides": {
  "id": "lengthen_few_strides",
  "label": {
   "fr": "Quelques foulées de développement"
  },
  "phase": "Trot",
  "galopMin": 6,
  "difficulty": 5,
  "timing": {
   "trigger": "anticipe",
   "duree": 5200
  },
  "obs": [
   {
    "fr": "une différence visible sur quelques foulées"
   },
   {
    "fr": "la cadence inchangée"
   },
   {
    "fr": "le retour au cadre net"
   }
  ],
  "tips": [
   {
    "txt": {
     "fr": "Demande de l'amplitude, pas de la vitesse."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Développe franchement puis reviens avant la fin de la ligne."
    },
    "type": "faire",
    "prio": 1,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Garde le cheval droit pendant tout le développement."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Compte tes foulées pour que le retour soit préparé."
    },
    "type": "faire",
    "prio": 2,
    "galopMin": 6
   },
   {
    "txt": {
     "fr": "Évite de précipiter la cadence pour paraître plus rapide."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 7
   },
   {
    "txt": {
     "fr": "Ne reviens pas en tirant : referme avec le dos et les jambes."
    },
    "type": "eviter",
    "prio": 3,
    "galopMin": 7
   }
  ],
  "relatedFigures": [
   "trot_medium",
   "trot_sitting",
   "trot_extended"
  ],
  "source": "Claude",
  "video": null,
  "illustration": null,
  "courseId": null
 }
};
window.HYPE_DRESSAGE.figuresIds = {
 "g3": [
  [
   "entry_centerline",
   "trot_sitting"
  ],
  [
   "circle_20m",
   "change_diagonal",
   "diagonal_change_rein",
   "trot_rising"
  ],
  [
   "circle_20m",
   "stirrups_out_in",
   "diagonal_change_rein"
  ],
  [
   "reverse_half_volte",
   "transition_trot_walk",
   "corner"
  ],
  [
   "transition_trot_canter",
   "trot_working"
  ],
  [
   "circle_20m",
   "transition_canter_trot"
  ],
  [
   "half_volte",
   "transition_trot_walk"
  ],
  [
   "transition_trot_canter",
   "trot_working"
  ],
  [
   "circle_20m",
   "transition_canter_trot"
  ],
  [
   "final_halt",
   "centerline",
   "salute"
  ]
 ],
 "g4": [
  [
   "entry_centerline",
   "halt_at_x",
   "salute"
  ],
  [
   "transition_walk_trot",
   "trot_working"
  ],
  [
   "trot_working",
   "corner"
  ],
  [
   "circle_20m",
   "trot_working"
  ],
  [
   "diagonal_change_rein",
   "trot_working"
  ],
  [
   "trot_working",
   "corner"
  ],
  [
   "circle_20m",
   "trot_working"
  ],
  [
   "diagonal_change_rein",
   "trot_working"
  ],
  [
   "transition_trot_walk",
   "walk_medium"
  ],
  [
   "walk_extended",
   "diagonal_change_rein"
  ],
  [
   "transition_walk_trot",
   "walk_medium"
  ],
  [
   "transition_trot_canter",
   "canter_working"
  ],
  [
   "circle_20m",
   "canter_working"
  ],
  [
   "diagonal_change_rein",
   "transition_canter_trot"
  ],
  [
   "transition_trot_canter",
   "canter_working"
  ],
  [
   "circle_20m",
   "canter_working"
  ],
  [
   "diagonal_change_rein",
   "transition_canter_trot"
  ],
  [
   "trot_working",
   "corner"
  ],
  [
   "trot_working",
   "long_side"
  ],
  [
   "final_halt",
   "transition_trot_walk",
   "salute"
  ]
 ],
 "g5": [
  [
   "entry_centerline",
   "transition_trot_walk",
   "halt_at_x",
   "salute"
  ],
  [
   "circle_15m",
   "trot_working",
   "corner"
  ],
  [
   "across_short_side",
   "trot_working"
  ],
  [
   "circle_15m",
   "trot_working"
  ],
  [
   "serpentine_4",
   "trot_working"
  ],
  [
   "transition_trot_walk",
   "walk_medium"
  ],
  [
   "walk_extended"
  ],
  [
   "walk_medium",
   "transition_walk_trot"
  ],
  [
   "transition_trot_canter",
   "canter_working"
  ],
  [
   "canter_working",
   "long_side"
  ],
  [
   "circle_20m",
   "canter_working"
  ],
  [
   "half_circle_20m",
   "transition_canter_trot"
  ],
  [
   "diagonal_change_rein",
   "trot_working"
  ],
  [
   "transition_trot_canter",
   "canter_working"
  ],
  [
   "canter_working",
   "long_side"
  ],
  [
   "circle_20m",
   "canter_working"
  ],
  [
   "half_circle_20m",
   "transition_canter_trot"
  ],
  [
   "diagonal_change_rein",
   "trot_working"
  ],
  [
   "centerline",
   "trot_working"
  ],
  [
   "final_halt",
   "transition_trot_walk",
   "salute"
  ]
 ],
 "g6": [
  [
   "entry_centerline",
   "halt_at_x",
   "salute"
  ],
  [
   "circle_12m",
   "trot_working"
  ],
  [
   "diagonal_change_rein",
   "lengthen_few_strides",
   "trot_medium"
  ],
  [
   "leg_yield",
   "centerline"
  ],
  [
   "circle_12m",
   "trot_working"
  ],
  [
   "diagonal_change_rein",
   "lengthen_few_strides",
   "trot_medium"
  ],
  [
   "leg_yield",
   "centerline",
   "trot_working"
  ],
  [
   "walk_extended",
   "walk_medium"
  ],
  [
   "transition_walk_trot",
   "walk_medium"
  ],
  [
   "transition_trot_canter",
   "canter_working"
  ],
  [
   "curved_line_x",
   "canter_working"
  ],
  [
   "canter_working",
   "long_side"
  ],
  [
   "circle_15m",
   "canter_working"
  ],
  [
   "diagonal_change_rein",
   "transition_canter_trot"
  ],
  [
   "transition_trot_canter",
   "canter_working"
  ],
  [
   "curved_line_x",
   "canter_working"
  ],
  [
   "canter_working",
   "long_side"
  ],
  [
   "circle_15m",
   "canter_working"
  ],
  [
   "diagonal_change_rein",
   "transition_canter_trot"
  ],
  [
   "final_halt",
   "centerline",
   "salute"
  ]
 ],
 "g7": [
  [
   "entry_centerline",
   "halt_at_x",
   "salute"
  ],
  [
   "diagonal_change_rein",
   "trot_medium",
   "corner"
  ],
  [
   "circle_10m",
   "centerline"
  ],
  [
   "leg_yield",
   "trot_working"
  ],
  [
   "trot_working",
   "corner"
  ],
  [
   "diagonal_change_rein",
   "trot_medium"
  ],
  [
   "circle_10m",
   "centerline"
  ],
  [
   "leg_yield",
   "trot_working"
  ],
  [
   "transition_trot_walk",
   "walk_medium"
  ],
  [
   "walk_extended",
   "diagonal_change_rein"
  ],
  [
   "transition_walk_canter",
   "canter_working"
  ],
  [
   "circle_12m",
   "canter_working"
  ],
  [
   "canter_working",
   "long_side"
  ],
  [
   "counter_canter",
   "half_circle_20m",
   "diagonal_change_rein"
  ],
  [
   "transition_canter_trot",
   "trot_working"
  ],
  [
   "transition_walk_canter",
   "walk_medium",
   "canter_working"
  ],
  [
   "half_circle_20m",
   "release_contact",
   "canter_working"
  ],
  [
   "circle_12m",
   "canter_working"
  ],
  [
   "canter_working",
   "long_side"
  ],
  [
   "counter_canter",
   "half_circle_20m",
   "diagonal_change_rein"
  ],
  [
   "transition_canter_trot",
   "trot_working"
  ],
  [
   "final_halt",
   "centerline",
   "salute"
  ]
 ],
 "clubelite": [
  [
   "entry_centerline",
   "trot_working"
  ],
  [
   "halt_at_x",
   "salute",
   "trot_working"
  ],
  [
   "corner",
   "long_side"
  ],
  [
   "diagonal_change_rein",
   "trot_medium"
  ],
  [
   "shoulder_in",
   "trot_working"
  ],
  [
   "half_circle_10m",
   "trot_working"
  ],
  [
   "shoulder_in",
   "straightness",
   "trot_working"
  ],
  [
   "half_circle_20m",
   "release_contact",
   "trot_working"
  ],
  [
   "halt_reinback_forward",
   "rein_back",
   "transition_trot_walk"
  ],
  [
   "walk_extended",
   "walk_medium",
   "diagonal_change_rein"
  ],
  [
   "transition_walk_canter",
   "canter_working"
  ],
  [
   "canter_medium",
   "transition_within_canter"
  ],
  [
   "half_circle_20m",
   "release_contact",
   "canter_working"
  ],
  [
   "canter_working",
   "straightness"
  ],
  [
   "half_circle_10m",
   "transition_canter_walk",
   "walk_medium"
  ],
  [
   "transition_walk_canter",
   "canter_working"
  ],
  [
   "canter_working",
   "long_side",
   "straightness"
  ],
  [
   "half_circle_10m",
   "transition_canter_walk",
   "walk_medium"
  ],
  [
   "transition_walk_canter",
   "canter_working"
  ],
  [
   "transition_canter_trot",
   "trot_working"
  ],
  [
   "diagonal_change_rein",
   "trot_medium"
  ],
  [
   "final_halt",
   "centerline",
   "salute"
  ]
 ]
};

/* Sélection des conseils : filtre le niveau du cavalier, puis prend le meilleur
   « faire » et le meilleur « eviter » (priorité croissante). Le décalage permet
   de ne pas resservir les deux mêmes conseils à chaque relecture. */
window.HYPE_DRESSAGE.conseilsPour = function (ids, galop, decalage, secours) {
    const F = window.HYPE_DRESSAGE.fiches;
    const dispo = [];
    (ids || []).forEach(function (id, rang) {
        const f = F[id];
        if (!f) return;
        f.tips.forEach(function (t) {
            if ((t.galopMin || 1) > galop) return;
            dispo.push({ txt: t.txt, type: t.type, poids: (t.prio || 2) * 10 + rang });
        });
    });
    dispo.sort(function (a, b) { return a.poids - b.poids; });
    const faire = dispo.filter(function (t) { return t.type === "faire"; });
    const eviter = dispo.filter(function (t) { return t.type === "eviter"; });
    const d = decalage || 0;
    const choix = [];
    if (faire.length) choix.push(faire[d % faire.length]);
    if (eviter.length) choix.push(eviter[d % eviter.length]);
    if (!choix.length && !secours) {
        const principale = F[(ids || [])[0]];
        const fond = principale && window.HYPE_DRESSAGE.fondPourPhase[principale.phase];
        if (fond) return window.HYPE_DRESSAGE.conseilsPour([fond], galop, decalage, true);
    }
    return choix;
};
/* Repli : si aucun conseil n'est accessible au niveau du cavalier (figure trop
   avancée pour lui), on sert un principe général de la section 13, adapté à la
   famille de la figure. Le cavalier n'a jamais une carte vide. */
window.HYPE_DRESSAGE.fondPourPhase = { "Entrée": "straightness", "Arrêt": "balance", "Pas": "rhythm_regularity",
 "Trot": "rhythm_regularity", "Galop": "balance", "Transition": "balance", "Ligne": "straightness",
 "Cercle": "bend", "Latéral": "bend", "Rassembler": "balance", "Fond": "rhythm_regularity" };
/* Une figure de reprise = une liste d'identifiants (+ surcharge de timing possible).
   Accepte les deux écritures : tableau simple, ou objet { ids, timing }. */
window.HYPE_DRESSAGE.timingDefaut = { trigger: "debut", duree: 4800 };
window.HYPE_DRESSAGE.ficheFigure = function (niveau, figIndex) {
    const brut = (window.HYPE_DRESSAGE.figuresIds[niveau] || [])[figIndex];
    if (!brut) return { ids: [], principale: null, timing: window.HYPE_DRESSAGE.timingDefaut };
    const ids = Array.isArray(brut) ? brut : (brut.ids || []);
    const f = window.HYPE_DRESSAGE.fiches[ids[0]] || null;
    const timing = (!Array.isArray(brut) && brut.timing) || (f && f.timing) || window.HYPE_DRESSAGE.timingDefaut;
    return { ids: ids, principale: f, timing: timing };
};
