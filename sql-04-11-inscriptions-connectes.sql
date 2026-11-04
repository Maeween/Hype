-- 04/11/2026 22h — PASSÉ EN BASE (carte blanche de Blandine) : la liste de qui participe à quel rendez-vous
-- n'est plus lisible sans compte (des cavalières sont mineures). Lecture réservée aux personnes connectées.
alter policy "ai_lecture" on public.agenda_inscriptions to authenticated using (true);
