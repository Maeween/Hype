// Hype — Assemblage de la base clubs (à charger APRÈS les 3 fichiers db)
window.HYPE_CLUBS = [].concat(
  window.HYPE_CLUBS_DB_1 || [],
  window.HYPE_CLUBS_DB_2 || [],
  window.HYPE_CLUBS_DB_3 || []
);
