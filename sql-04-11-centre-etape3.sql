-- HYPE ▸ 04/11/2026 21h — CENTRE DE COMPÉTITION, ÉTAPE 3 (Blandine 21h20 : « mets tout en ligne, t'as carte blanche »)
-- Rien de supprimé, aucune table existante modifiée à part l'AJOUT de colonnes (vides) à concours_engagements (créée le jour même).

-- 1) Liste du van : une liste par cavalière et par concours, recopiée d'un concours à l'autre par l'appli.
create table if not exists public.listes_van (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  agenda_id uuid not null references public.club_agenda(id) on delete cascade,
  items jsonb not null default '[]'::jsonb,
  maj_le timestamptz not null default now(),
  primary key (user_id, agenda_id)
);
alter table public.listes_van enable row level security;
create policy "liste van a soi" on public.listes_van for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- 2) Heures de passage et pistes (jour J), saisies et corrigées par la coach
alter table public.concours_engagements
  add column if not exists passage1 text,
  add column if not exists piste1 text,
  add column if not exists passage2 text,
  add column if not exists piste2 text,
  add column if not exists passage_maj_le timestamptz;

-- 3) Papiers du van : documents du club, visibles par la coach (gestionnaires du club) seulement
create table if not exists public.dossier_van (
  id uuid primary key default gen_random_uuid(),
  club_clef text not null,
  nom text not null check (char_length(nom) <= 120),
  chemin text not null unique,
  valable_jusqu date,
  ajoute_par uuid default auth.uid(),
  ajoute_le timestamptz not null default now()
);
alter table public.dossier_van enable row level security;
create policy "dossier van coach" on public.dossier_van for all
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef))
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));

insert into storage.buckets (id, name, public) values ('dossier', 'dossier', false) on conflict (id) do nothing;
-- dépôt : dans son propre dossier « van/<son id>/… » ; lecture et suppression : la coach du club du document
create policy "dossier_ajouter" on storage.objects for insert to authenticated
  with check (bucket_id = 'dossier' and (storage.foldername(name))[1] = 'van' and (storage.foldername(name))[2] = auth.uid()::text);
create policy "dossier_voir" on storage.objects for select to authenticated
  using (bucket_id = 'dossier' and exists (select 1 from public.dossier_van d where d.chemin = name
         and (public.hype_est_moderatrice() or public.hype_peut_gerer_club(d.club_clef))));
create policy "dossier_supprimer" on storage.objects for delete to authenticated
  using (bucket_id = 'dossier' and ((storage.foldername(name))[2] = auth.uid()::text
         or exists (select 1 from public.dossier_van d where d.chemin = name and (public.hype_est_moderatrice() or public.hype_peut_gerer_club(d.club_clef)))));
