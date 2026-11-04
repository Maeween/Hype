-- HYPE ▸ 04/11/2026 — CENTRE DE COMPÉTITION : ENGAGEMENTS ET LICENCES
-- Demande de Blandine (04/11 17h30) : la coach choisit les couples par épreuve, Hype prépare la feuille
-- « Engagements Concours CSO Club » à remettre à la SEP ; les licences des cavalières sont gardées.
-- Rien n'est modifié dans les tables existantes : trois tables NOUVELLES et une fonction de droits.
-- Droits :
--   · licences : la cavalière elle-même, sa coach (gestionnaire d'un de ses clubs) et la modératrice ;
--   · engagements : la coach du club du concours (et la modératrice) lit et écrit ;
--     la cavalière LIT seulement sa propre ligne ;
--   · en-tête de la feuille : la coach du club du concours (et la modératrice) seulement.

-- 1) Est-ce que la personne connectée est la coach de cette cavalière ?
--    (gestionnaire d'un des deux clubs de son profil ; même clé que l'appli : sans accents, minuscules)
create or replace function public.hype_coach_de(p_user uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles p
    where p.id = p_user and (
      (coalesce(p.ecurie, '') <> '' and public.hype_peut_gerer_club(lower(regexp_replace(trim(public.unaccent(p.ecurie)), '\s+', ' ', 'g'))))
      or (coalesce(p.ecurie2, '') <> '' and public.hype_peut_gerer_club(lower(regexp_replace(trim(public.unaccent(p.ecurie2)), '\s+', ' ', 'g'))))
    ));
$$;

-- 2) Licence et nom FFE de chaque cavalière (tapés une fois, gardés)
create table if not exists public.cavaliers_licences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  nom text check (char_length(nom) <= 120),
  licence text check (char_length(licence) <= 20),
  maj_par uuid default auth.uid(),
  maj_le timestamptz not null default now()
);
alter table public.cavaliers_licences enable row level security;
create policy "licences lecture" on public.cavaliers_licences for select
  using (user_id = auth.uid() or public.hype_coach_de(user_id) or public.hype_est_moderatrice());
create policy "licences ajout" on public.cavaliers_licences for insert
  with check (user_id = auth.uid() or public.hype_coach_de(user_id) or public.hype_est_moderatrice());
create policy "licences modification" on public.cavaliers_licences for update
  using (user_id = auth.uid() or public.hype_coach_de(user_id) or public.hype_est_moderatrice());
create policy "licences suppression" on public.cavaliers_licences for delete
  using (user_id = auth.uid() or public.hype_coach_de(user_id) or public.hype_est_moderatrice());

-- 3) En-tête de la feuille d'un concours (épreuves proposées, n° du concours, prix…)
create table if not exists public.concours_feuille (
  agenda_id uuid primary key references public.club_agenda(id) on delete cascade,
  epreuves text[] not null default '{}',
  discipline text, numero text, prix text, transport text, facturer_le text, faits_le text,
  chef_nom text, chef_licence text,
  maj_par uuid default auth.uid(),
  maj_le timestamptz not null default now()
);
alter table public.concours_feuille enable row level security;
create policy "feuille coach" on public.concours_feuille for all
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club((select a.club_clef from public.club_agenda a where a.id = agenda_id)))
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club((select a.club_clef from public.club_agenda a where a.id = agenda_id)));

-- 4) Une ligne par cavalière et par concours : deux épreuves possibles, comme sur la feuille
create table if not exists public.concours_engagements (
  id uuid primary key default gen_random_uuid(),
  agenda_id uuid not null references public.club_agenda(id) on delete cascade,
  cavalier_id uuid references auth.users(id) on delete set null,
  nom text not null check (char_length(nom) <= 120),
  licence text check (char_length(licence) <= 20),
  epreuve1 text, cheval1_id uuid references public.chevaux(id) on delete set null, cheval1_nom text,
  epreuve2 text, cheval2_id uuid references public.chevaux(id) on delete set null, cheval2_nom text,
  ordre int not null default 0,
  cree_par uuid default auth.uid(),
  maj_le timestamptz not null default now()
);
create index if not exists concours_engagements_agenda on public.concours_engagements(agenda_id);
alter table public.concours_engagements enable row level security;
create policy "engagements lecture" on public.concours_engagements for select
  using (cavalier_id = auth.uid() or public.hype_est_moderatrice()
         or public.hype_peut_gerer_club((select a.club_clef from public.club_agenda a where a.id = agenda_id)));
create policy "engagements ajout" on public.concours_engagements for insert
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club((select a.club_clef from public.club_agenda a where a.id = agenda_id)));
create policy "engagements modification" on public.concours_engagements for update
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club((select a.club_clef from public.club_agenda a where a.id = agenda_id)));
create policy "engagements suppression" on public.concours_engagements for delete
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club((select a.club_clef from public.club_agenda a where a.id = agenda_id)));
