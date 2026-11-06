-- HYPE ▸ 07/11/2026 00h10 — DROITS DE COACH DANS UN GROUPE, « comme les admins WhatsApp » (Blandine 06/11 23h38 et 07/11 00h07 : « Ok continue »)
-- Rien de supprimé. Ajout d'une colonne (tous les membres actuels restent « membre ») ; les règles existantes sont ÉLARGIES aux coachs du groupe.

-- 1) rôle dans le groupe
alter table public.groupes_membres add column if not exists role text not null default 'membre';
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'groupes_membres_role_ck') then
    alter table public.groupes_membres add constraint groupes_membres_role_ck check (role in ('membre', 'coach'));
  end if;
end $$;

-- 2) qui gère ce groupe : propriétaire / gestionnaires du club, la créatrice du groupe, ou une coach nommée dans le groupe
create or replace function public.hype_coach_groupe(p_groupe uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select exists (
    select 1 from public.groupes g
    where g.id = p_groupe and (
      public.hype_peut_gerer_club(g.club_clef)
      or g.cree_par = auth.uid()
      or exists (select 1 from public.groupes_membres m where m.groupe_id = g.id and m.user_id = auth.uid() and m.role = 'coach')
    ));
$$;
grant execute on function public.hype_coach_groupe(uuid) to authenticated;

-- 3) membres : ajout, retrait, et (nouveau) changement de rôle
drop policy if exists "membres ajout" on public.groupes_membres;
create policy "membres ajout" on public.groupes_membres for insert with check (public.hype_coach_groupe(groupe_id));
drop policy if exists "membres retrait" on public.groupes_membres;
create policy "membres retrait" on public.groupes_membres for delete using (public.hype_coach_groupe(groupe_id));
drop policy if exists "membres role" on public.groupes_membres;
create policy "membres role" on public.groupes_membres for update using (public.hype_coach_groupe(groupe_id)) with check (public.hype_coach_groupe(groupe_id));

-- 4) chevaux du groupe
drop policy if exists "chevaux groupe ajout" on public.groupes_chevaux;
create policy "chevaux groupe ajout" on public.groupes_chevaux for insert with check (public.hype_coach_groupe(groupe_id));
drop policy if exists "chevaux groupe retrait" on public.groupes_chevaux;
create policy "chevaux groupe retrait" on public.groupes_chevaux for delete using (public.hype_coach_groupe(groupe_id));

-- 5) rendez-vous rattachés au groupe (un rendez-vous du même club)
drop policy if exists "agenda groupes ajout" on public.agenda_groupes;
create policy "agenda groupes ajout" on public.agenda_groupes for insert with check (
  exists (select 1 from public.groupes g join public.club_agenda a on a.id = agenda_groupes.agenda_id
          where g.id = agenda_groupes.groupe_id and a.club_clef = g.club_clef and public.hype_coach_groupe(g.id)));
drop policy if exists "agenda groupes retrait" on public.agenda_groupes;
create policy "agenda groupes retrait" on public.agenda_groupes for delete using (public.hype_coach_groupe(groupe_id));

-- 6) la fiche du groupe (nom, photo, club) reste modifiable par la propriétaire et les gestionnaires du club seulement (inchangé).
