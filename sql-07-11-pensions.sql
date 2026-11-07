-- HYPE ▸ 07/11/2026 — MON ÉCURIE : « LES PENSIONS » (qui est en pension, à quel tarif, échéance à encaisser).
-- Choisie par Blandine le 07/11 à 15 h 43 (« 1 et 2 »). Passé en base par Claude le 07/11.
-- Ne touche à aucune table existante. Droits : responsables de l'écurie et modératrices.
create table if not exists public.ecurie_pensions (
  id uuid primary key default gen_random_uuid(),
  club_clef text not null,
  cheval text not null,            -- nom du cheval en pension
  proprietaire text,               -- nom du propriétaire
  contact text,                    -- téléphone ou e-mail
  formule text,                    -- Box, Pré, Box et pré, Demi-pension, Travail, Autre
  tarif numeric,                   -- montant de chaque échéance (€)
  frequence text,                  -- Mensuel, Trimestriel, Annuel
  prochain_paiement date,          -- prochaine échéance à encaisser
  debut date,                      -- arrivée du cheval en pension
  notes text,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now(),
  maj_le timestamptz not null default now()
);
create index if not exists ecurie_pensions_club on public.ecurie_pensions (club_clef);
alter table public.ecurie_pensions enable row level security;
create policy "pensions_lire" on public.ecurie_pensions for select to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "pensions_creer" on public.ecurie_pensions for insert to authenticated
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "pensions_modifier" on public.ecurie_pensions for update to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef))
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "pensions_supprimer" on public.ecurie_pensions for delete to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
