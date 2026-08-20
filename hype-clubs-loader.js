// Hype — Assemblage de la base clubs (à charger APRÈS les 4 fichiers db)
// 20/08/2026 (session 144) : ajout de HYPE_CLUBS_DB_4, les 90 clubs de la liste
// interne du globe absents de l'extraction OSM (dont Écurie Feinn, la SEP,
// l'Étrier de Paris, le Touring, le Parc Équestre Fédéral) + Les Écuries de Lardy.
// Total attendu : 3 145 clubs.
window.HYPE_CLUBS = [].concat(
  window.HYPE_CLUBS_DB_1 || [],
  window.HYPE_CLUBS_DB_2 || [],
  window.HYPE_CLUBS_DB_3 || [],
  window.HYPE_CLUBS_DB_4 || []
);
