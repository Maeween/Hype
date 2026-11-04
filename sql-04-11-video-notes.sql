-- 04/11/2026 22h15 — PASSÉ EN BASE (carte blanche) : commentaires posés à un instant précis d'une vidéo de parcours.
create table if not exists public.video_notes (
  id uuid primary key default gen_random_uuid(),
  agenda_id uuid references public.club_agenda(id) on delete cascade,
  media text not null check (char_length(media) <= 600),
  proprio uuid references auth.users(id) on delete cascade,
  t numeric not null default 0 check (t >= 0),
  texte text not null check (char_length(texte) between 1 and 1000),
  auteur uuid not null default auth.uid() references auth.users(id) on delete cascade,
  cree_le timestamptz not null default now()
);
create index if not exists video_notes_media on public.video_notes(media);
alter table public.video_notes enable row level security;
create policy "notes video lecture" on public.video_notes for select to authenticated
  using (auteur = auth.uid() or proprio = auth.uid() or public.hype_est_moderatrice()
         or public.hype_peut_gerer_club((select a.club_clef from public.club_agenda a where a.id = agenda_id)));
create policy "notes video ajout" on public.video_notes for insert to authenticated
  with check (auteur = auth.uid() and (proprio = auth.uid() or public.hype_est_moderatrice()
         or public.hype_peut_gerer_club((select a.club_clef from public.club_agenda a where a.id = agenda_id))));
create policy "notes video suppression" on public.video_notes for delete to authenticated
  using (auteur = auth.uid() or public.hype_est_moderatrice());
