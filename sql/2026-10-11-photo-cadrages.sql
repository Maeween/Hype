-- Hype — cadrage choisi à la main pour une photo de galerie (11/10/2026, demande de Blandine).
-- On retient seulement l'endroit où centrer la photo dans sa case ("50% 30%"), la photo n'est jamais modifiée.
-- Mêmes droits que photo_formats : lecture pour tous, écriture par l'auteur du réglage ou la modératrice.
create table if not exists public.photo_cadrages (
  photo_url text primary key,
  position text not null check (position ~ '^[0-9]{1,3}(\.[0-9]+)?% [0-9]{1,3}(\.[0-9]+)?%$'),
  user_id uuid not null default auth.uid(),
  updated_at timestamptz not null default now()
);
alter table public.photo_cadrages enable row level security;
create policy cadrages_lecture on public.photo_cadrages for select using (true);
create policy cadrages_insertion on public.photo_cadrages for insert with check (auth.uid() = user_id or hype_est_moderatrice());
create policy cadrages_maj on public.photo_cadrages for update using (auth.uid() = user_id or hype_est_moderatrice()) with check (auth.uid() = user_id or hype_est_moderatrice());
create policy cadrages_suppression on public.photo_cadrages for delete using (auth.uid() = user_id or hype_est_moderatrice());
