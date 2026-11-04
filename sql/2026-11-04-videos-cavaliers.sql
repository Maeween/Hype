-- 04/11/2026 — Vidéothèque : vidéos ajoutées par les cavaliers (Blandine : « il la voit tout de suite,
-- ça reste en ligne, et il peut nous la soumettre pour la proposer à d'autres cavaliers »).
-- Nouvelle table seule : aucune table existante n'est modifiée.
create table if not exists public.videos_cavaliers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  yt text not null check (yt ~ '^[A-Za-z0-9_-]{11}$'),
  titre text not null check (char_length(titre) between 1 and 120),
  note text check (note is null or char_length(note) <= 300),
  galop int check (galop is null or galop between 1 and 9),
  theme text not null check (theme in ('cheval','position','dressage','obstacle','pied','soins','securite')),
  statut text not null default 'perso' check (statut in ('perso','attente','acceptee','refusee')),
  auteur_nom text check (auteur_nom is null or char_length(auteur_nom) <= 40),
  created_at timestamptz not null default now(),
  repondu_le timestamptz
);
create index if not exists videos_cavaliers_statut_idx on public.videos_cavaliers (statut);
create index if not exists videos_cavaliers_user_idx on public.videos_cavaliers (user_id);
alter table public.videos_cavaliers enable row level security;
-- lecture : les siennes, celles acceptées (tous les cavaliers connectés), tout pour la modératrice
create policy "vc lecture" on public.videos_cavaliers for select to authenticated
  using (user_id = auth.uid() or statut = 'acceptee' or public.hype_est_moderatrice());
-- ajout : seulement pour soi, en « perso » ou « attente »
create policy "vc ajout" on public.videos_cavaliers for insert to authenticated
  with check (user_id = auth.uid() and statut in ('perso','attente'));
-- l'auteur peut proposer / retirer sa proposition (jamais s'accepter lui-même)
create policy "vc auteur" on public.videos_cavaliers for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid() and statut in ('perso','attente'));
-- la modératrice accepte ou refuse
create policy "vc moderatrice" on public.videos_cavaliers for update to authenticated
  using (public.hype_est_moderatrice()) with check (public.hype_est_moderatrice());
-- suppression : l'auteur ou la modératrice
create policy "vc suppression" on public.videos_cavaliers for delete to authenticated
  using (user_id = auth.uid() or public.hype_est_moderatrice());
