-- ============================================================
-- HYPE · Mémoire d'Écurie de Hey Baby
-- À exécuter dans Supabase (SQL Editor) — projet ldpjebgtskzdokrublfg
-- ------------------------------------------------------------
-- La Mémoire d'Écurie réutilise la table EXISTANTE `memoire_chevaux`.
-- Aucune nouvelle table n'est créée. Ce script :
--   1. garantit que la table existe (au cas où) ;
--   2. s'assure que les colonnes utiles sont présentes ;
--   3. (re)crée les policies RLS pour que chaque cavalier puisse
--      lire / ajouter / METTRE À JOUR (delete + insert) SES fiches.
--
-- Le DELETE est indispensable : une fiche cavalier/cheval est "vivante",
-- on remplace l'ancienne version en la supprimant puis en réinsérant.
--
-- Ce script est idempotent : on peut le relancer sans risque.
-- ============================================================

-- 1) Table (créée seulement si elle n'existe pas déjà)
create table if not exists public.memoire_chevaux (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  cheval_slug text,
  cheval_nom  text,
  type        text default 'note',
  contenu     text,
  created_at  timestamptz not null default now()
);

-- 2) Colonnes utiles si la table préexistait dans une version plus ancienne
alter table public.memoire_chevaux add column if not exists cheval_slug text;
alter table public.memoire_chevaux add column if not exists cheval_nom  text;
alter table public.memoire_chevaux add column if not exists type        text default 'note';
alter table public.memoire_chevaux add column if not exists contenu     text;
alter table public.memoire_chevaux add column if not exists created_at  timestamptz not null default now();

-- 3) Index de lecture (chargement des fiches les plus récentes par utilisateur)
create index if not exists memoire_chevaux_user_type_idx
  on public.memoire_chevaux (user_id, type, created_at desc);

-- 4) Row Level Security : chaque cavalier ne voit et ne gère que ses lignes
alter table public.memoire_chevaux enable row level security;

drop policy if exists "memoire_select_own" on public.memoire_chevaux;
create policy "memoire_select_own"
  on public.memoire_chevaux for select
  using (auth.uid() = user_id);

drop policy if exists "memoire_insert_own" on public.memoire_chevaux;
create policy "memoire_insert_own"
  on public.memoire_chevaux for insert
  with check (auth.uid() = user_id);

drop policy if exists "memoire_update_own" on public.memoire_chevaux;
create policy "memoire_update_own"
  on public.memoire_chevaux for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "memoire_delete_own" on public.memoire_chevaux;
create policy "memoire_delete_own"
  on public.memoire_chevaux for delete
  using (auth.uid() = user_id);

-- ============================================================
-- Conventions de contenu utilisées par l'app (pour info) :
--   type = 'fiche_cavalier'  → 1 fiche vivante par cavalier (slug '__cavalier__')
--   type = 'fiche_cheval'    → 1 fiche vivante par cheval (slug = id/nom du cheval)
--   type = 'analyse' / 'note' → carnet de notes brut (analyses vidéo, etc.)
-- Les fiches synthétisées font <= ~1600 caractères et sont réécrites
-- (delete + insert) à chaque fin de conversation significative.
-- ============================================================
