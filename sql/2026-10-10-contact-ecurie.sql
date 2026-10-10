-- HYPE · 10/10/2026 · Coordonnées d'une écurie modifiables par sa responsable (à lancer par Blandine dans Supabase > SQL)
-- Rangées dans la table existante tableaux_clubs, sous la clé « club-contact:<écurie> » (comme la photo et la citation).
-- 1. Écrire : seulement la responsable de l'écurie (ou une gestionnaire), ou une modératrice, et seulement cette clé-là.
create policy "contact club ajout" on public.tableaux_clubs
  for insert to authenticated
  with check (cle = 'club-contact:' || clef_club and (public.hype_peut_gerer_club(clef_club) or public.hype_est_moderatrice()));
create policy "contact club modif" on public.tableaux_clubs
  for update to authenticated
  using (cle = 'club-contact:' || clef_club and (public.hype_peut_gerer_club(clef_club) or public.hype_est_moderatrice()))
  with check (cle = 'club-contact:' || clef_club and (public.hype_peut_gerer_club(clef_club) or public.hype_est_moderatrice()));
-- 2. Lire sans compte : seulement ces coordonnées (elles sont faites pour être publiques), comme la grande photo.
create policy "contact club lisible sans connexion" on public.tableaux_clubs
  for select to anon using (cle like 'club-contact:%');
