-- Hype — couverture (image) des vidéos (11/10/2026, demande de Blandine).
-- 1) Anciennes vidéos (fichiers .mov/.mp4) : la première image fabriquée est enregistrée une fois pour toutes (auto = true).
-- 2) La personne qui a mis la vidéo en ligne (ou une admin) peut choisir / changer / retirer la couverture.
create table if not exists public.video_couvertures (
  video_url text primary key,
  image_url text not null,
  auto boolean not null default true,
  user_id uuid not null default auth.uid(),
  updated_at timestamptz not null default now()
);
alter table public.video_couvertures enable row level security;

-- vrai si la personne connectée a mis cette vidéo en ligne
create or replace function public.hype_est_auteur_video(p_url text)
returns boolean language sql stable as $$
  select auth.uid() is not null and (
    p_url like '%/storage/v1/object/public/photos/' || auth.uid()::text || '/%'
    or exists (select 1 from public.videos_mux vm
               where vm.user_id = auth.uid() and vm.playback_id is not null
                 and p_url like '%' || vm.playback_id || '%'))
$$;

create policy couv_lecture on public.video_couvertures for select using (true);
-- n'importe quelle personne connectée peut enregistrer la couverture AUTOMATIQUE d'une vidéo qui n'en a pas encore ;
-- une couverture CHOISIE (auto = false) seulement par l'auteur de la vidéo ou une admin
create policy couv_creation on public.video_couvertures for insert with check (
  auth.uid() = user_id and (auto = true or hype_est_auteur_video(video_url) or hype_est_moderatrice()));
-- changer ou retirer : seulement l'auteur de la vidéo ou une admin
create policy couv_modif on public.video_couvertures for update
  using (hype_est_auteur_video(video_url) or hype_est_moderatrice())
  with check (hype_est_auteur_video(video_url) or hype_est_moderatrice());
create policy couv_suppr on public.video_couvertures for delete
  using (hype_est_auteur_video(video_url) or hype_est_moderatrice());
