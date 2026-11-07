-- HYPE ▸ 07/11/2026 — MON ÉCURIE : « LE PLANNING » (qui nourrit, qui sort les chevaux, qui fait les boxes, jour par jour).
-- Choisie par Blandine le 07/11 à 15 h 43 (« 1 et 2 »). Passé en base par Claude le 07/11.
-- Ne touche à aucune table existante. Droits : responsables de l'écurie et modératrices.
create table if not exists public.ecurie_taches (
  id uuid primary key default gen_random_uuid(),
  club_clef text not null,
  tache text not null,             -- ex. « Distribuer le foin », « Curer les boxes »
  qui text,                        -- la personne qui s'en charge
  jours text,                      -- jours séparés par des virgules : Lun,Mar,Mer,Jeu,Ven,Sam,Dim
  moment text,                     -- Matin, Midi, Soir
  fait_le date,                    -- dernier jour où c'est fait
  notes text,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now(),
  maj_le timestamptz not null default now()
);
create index if not exists ecurie_taches_club on public.ecurie_taches (club_clef);
alter table public.ecurie_taches enable row level security;
create policy "taches_lire" on public.ecurie_taches for select to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "taches_creer" on public.ecurie_taches for insert to authenticated
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "taches_modifier" on public.ecurie_taches for update to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef))
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "taches_supprimer" on public.ecurie_taches for delete to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
