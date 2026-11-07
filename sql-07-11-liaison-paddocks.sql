-- HYPE ▸ 07/11/2026 — MON ÉCURIE : « LE CAHIER DE LIAISON » ET « LES PADDOCKS ».
-- Idées n° 3 et 4 proposées à Blandine le 07/11 ; « Ok continue » à 22 h 40 (après les n° 1 et 2).
-- Passé en base par Claude le 07/11. Uniquement des ajouts (deux tables neuves, une fonction de signature).
-- Cahier de liaison : le responsable ET le personnel noté avec son e-mail (comme pour Le planning) lisent et écrivent ;
--   la signature (pseudo Hype) est mise par la base, pas tapée ; chacun ne modifie ou supprime que ses mots,
--   le responsable peut tout modifier ou supprimer.
-- Paddocks : responsables de l'écurie et modératrices seulement.
create table if not exists public.ecurie_liaison (
  id uuid primary key default gen_random_uuid(),
  club_clef text not null,
  texte text not null,               -- le mot (« Elfe boite, pas de travail »)
  cheval text,                       -- cheval concerné (facultatif)
  priorite text,                     -- Normal, Important
  auteur text,                       -- pseudo Hype, rempli par la base
  notes text,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now(),
  maj_le timestamptz not null default now()
);
create index if not exists ecurie_liaison_club on public.ecurie_liaison (club_clef, created_at desc);
alter table public.ecurie_liaison enable row level security;
create policy "liaison_lire" on public.ecurie_liaison for select to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef) or public.hype_est_personnel_club(club_clef));
create policy "liaison_creer" on public.ecurie_liaison for insert to authenticated
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef) or public.hype_est_personnel_club(club_clef));
create policy "liaison_modifier" on public.ecurie_liaison for update to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef) or (created_by = auth.uid() and public.hype_est_personnel_club(club_clef)))
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef) or (created_by = auth.uid() and public.hype_est_personnel_club(club_clef)));
create policy "liaison_supprimer" on public.ecurie_liaison for delete to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef) or (created_by = auth.uid() and public.hype_est_personnel_club(club_clef)));
create or replace function public.hype_liaison_signer()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  new.created_by := auth.uid();
  new.auteur := (select nullif(btrim(p.pseudo), '') from public.profiles p where p.id = auth.uid());
  return new;
end;
$$;
create trigger ecurie_liaison_signer before insert on public.ecurie_liaison
  for each row execute function public.hype_liaison_signer();

create table if not exists public.ecurie_paddocks (
  id uuid primary key default gen_random_uuid(),
  club_clef text not null,
  nom text not null,                 -- « Grand pré », « Paddock 3 »
  chevaux text,                      -- chevaux dedans
  etat text,                         -- Occupé, Au repos
  depuis date,                       -- depuis quand dans cet état
  surface text,                      -- ex. 1 ha
  notes text,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now(),
  maj_le timestamptz not null default now()
);
create index if not exists ecurie_paddocks_club on public.ecurie_paddocks (club_clef);
alter table public.ecurie_paddocks enable row level security;
create policy "paddocks_lire" on public.ecurie_paddocks for select to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "paddocks_creer" on public.ecurie_paddocks for insert to authenticated
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "paddocks_modifier" on public.ecurie_paddocks for update to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef))
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "paddocks_supprimer" on public.ecurie_paddocks for delete to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
