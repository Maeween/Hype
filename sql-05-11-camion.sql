-- HYPE ▸ 05/11/2026 — MON ÉCURIE : « LE CAMION » (véhicules, papiers, dates à surveiller).
-- Accord de Blandine le 05/11 (« Ok », 23 h 59). Passé en base par Claude le 06/11.
-- Règles retenues (guide transport FNCH 2024, règlement CE 1/2005) : au-delà de 65 km, transport par un professionnel =
-- autorisation de transporteur type 1 (type 2 au-delà de 8 h) + certificat de compétence CAPTAV du conducteur +
-- registre de transport gardé 3 ans ; document d'accompagnement de chaque cheval à toute distance.
-- Véhicule : contrôle technique (≤ 3,5 t : à 4 ans puis tous les 2 ans ; > 3,5 t : chaque année), assurance.
-- Ne touche à aucune donnée existante. Mêmes droits que le registre : modératrices et gestionnaires du club.

-- 1) Les véhicules de l'écurie
create table if not exists public.ecurie_vehicules (
  id             uuid primary key default gen_random_uuid(),
  club_clef      text not null,
  nom            text not null,                 -- ex. « Camion 2 places », « Van Böckmann »
  genre          text not null default 'camion' check (genre in ('camion', 'van', 'remorque', 'autre')),
  immatriculation text,
  ptac_kg        integer,                       -- poids total autorisé en charge (décide du permis et du contrôle technique)
  ct_prochain    date,                          -- prochain contrôle technique
  assurance_fin  date,                          -- échéance de l'assurance
  assureur       text,
  notes          text,
  created_by     uuid default auth.uid(),
  created_at     timestamptz not null default now(),
  maj_le         timestamptz not null default now()
);
create index if not exists ecurie_vehicules_club on public.ecurie_vehicules (club_clef);
alter table public.ecurie_vehicules enable row level security;
create policy "vehic_lire" on public.ecurie_vehicules for select to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "vehic_creer" on public.ecurie_vehicules for insert to authenticated
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "vehic_modifier" on public.ecurie_vehicules for update to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef))
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "vehic_supprimer" on public.ecurie_vehicules for delete to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));

-- 2) L'autorisation de transporteur de l'écurie (dans sa fiche existante)
alter table public.ecurie_registre add column if not exists autorisation_transport text;      -- n° et type (1 ou 2)
alter table public.ecurie_registre add column if not exists autorisation_transport_fin date;  -- fin de validité

-- 3) Les papiers (carte grise, assurance, autorisation, CAPTAV…) rangés avec les autres documents du registre
alter table public.registre_documents drop constraint if exists registre_documents_type_check;
alter table public.registre_documents add constraint registre_documents_type_check check (type in ('plan', 'controle', 'camion', 'autre'));
alter table public.registre_documents add column if not exists vehicule_id uuid references public.ecurie_vehicules(id) on delete set null;

-- Vérification : select count(*) from pg_policies where tablename = 'ecurie_vehicules';  → 4
