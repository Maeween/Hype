-- Hype — collections de vidéos : droits élargis (11/10/2026, demande de Blandine).
-- Peuvent créer / renommer / modifier / réordonner / supprimer les collections d'un cheval :
--   la propriétaire du cheval, la propriétaire de son écurie, et les admins (modératrice).
-- À passer UNE fois, après le premier SQL (déjà passé).
create or replace function public.hype_peut_gerer_collections(p_cible text)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select hype_est_moderatrice() or exists (
    select 1 from public.chevaux ch
    where 'cheval:' || ch.id::text = p_cible
      and ( ch.user_id = auth.uid()
            or ( ch.club is not null and hype_est_proprietaire_club(
                   lower(regexp_replace(btrim(public.unaccent(ch.club)), '\s+', ' ', 'g')) ) ) ) )
$$;

drop policy if exists collections_creation on public.collections_videos;
drop policy if exists collections_modif on public.collections_videos;
drop policy if exists collections_suppr on public.collections_videos;

create policy collections_creation on public.collections_videos
  for insert with check (auth.uid() = user_id and hype_peut_gerer_collections(cible));
create policy collections_modif on public.collections_videos
  for update using (hype_peut_gerer_collections(cible)) with check (hype_peut_gerer_collections(cible));
create policy collections_suppr on public.collections_videos
  for delete using (hype_peut_gerer_collections(cible));
