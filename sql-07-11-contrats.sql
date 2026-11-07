-- HYPE ▸ 07/11/2026 — MON ÉCURIE : « LES CONTRATS ET RÈGLEMENTS » (assurances RC, véhicules, bâtiments, cotisations,
-- abonnements, loyers…) avec RAPPEL DE CHAQUE RÈGLEMENT dans « Les échéances ».
-- Demande de Blandine (07/11 11 h 22 : « rajouter … les rappels de règlement pour la RC aussi, les rappels pour
-- l'assurance des véhicules, etc. »). Passé en base par Claude le 07/11. Ne touche à aucune table existante.
-- Droits : responsables de l'écurie et modératrices.
create table if not exists public.ecurie_contrats (
  id uuid primary key default gen_random_uuid(),
  club_clef text not null,
  nom text not null,                -- ex. « Assurance RC », « Assurance du camion »
  categorie text,                   -- Assurance, Cotisation, Abonnement, Loyer, Autre
  organisme text,                   -- ex. assureur
  montant numeric,                  -- montant de chaque règlement
  frequence text,                   -- Mensuel, Trimestriel, Semestriel, Annuel, Une fois
  prochain_reglement date,          -- prochaine date à payer → rappel ; « Réglé » avance d'une période
  fin_contrat date,                 -- échéance du contrat (renouvellement ou résiliation)
  notes text,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now(),
  maj_le timestamptz not null default now()
);
create index if not exists ecurie_contrats_club on public.ecurie_contrats (club_clef);
alter table public.ecurie_contrats enable row level security;
create policy "contrat_lire" on public.ecurie_contrats for select to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "contrat_creer" on public.ecurie_contrats for insert to authenticated
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "contrat_modifier" on public.ecurie_contrats for update to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef))
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "contrat_supprimer" on public.ecurie_contrats for delete to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
