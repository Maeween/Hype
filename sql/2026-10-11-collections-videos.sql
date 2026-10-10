-- Hype — collections de vidéos d'un cheval (11/10/2026). À passer UNE fois par Blandine.
-- Une collection ne contient que des renvois vers des vidéos existantes : la supprimer ne supprime aucune vidéo.
create table if not exists public.collections_videos (
  id uuid primary key default gen_random_uuid(),
  cible text not null,
  user_id uuid not null default auth.uid(),
  nom text not null check (length(btrim(nom)) between 1 and 60),
  videos jsonb not null default '[]'::jsonb,
  ordre int not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists collections_videos_cible on public.collections_videos (cible);
alter table public.collections_videos enable row level security;

create policy collections_lecture on public.collections_videos
  for select using (true);

create policy collections_creation on public.collections_videos
  for insert with check (
    auth.uid() = user_id and (
      hype_est_moderatrice() or exists (
        select 1 from public.chevaux ch
        where 'cheval:' || ch.id::text = cible and ch.user_id = auth.uid())));

create policy collections_modif on public.collections_videos
  for update using (auth.uid() = user_id or hype_est_moderatrice());

create policy collections_suppr on public.collections_videos
  for delete using (auth.uid() = user_id or hype_est_moderatrice());
