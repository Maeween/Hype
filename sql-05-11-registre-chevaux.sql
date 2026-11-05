-- HYPE ▸ 05/11/2026 — ESPACE « MON ÉCURIE », ÉTAPE 3 : partie IV du registre (les chevaux présents).
-- À PASSER EN BASE SEULEMENT APRÈS L'ACCORD DE BLANDINE.
-- Ce que ça fait : crée UNE nouvelle table, une ligne par cheval et par écurie, tenue par l'écurie.
-- Pourquoi une table à part : la fiche du cheval appartient à son propriétaire ; le registre appartient à l'écurie
-- (dates d'entrée et de sortie, puce, propriétaire en clair). L'écurie remplit son registre sans toucher à la fiche
-- du cheval. Le n° SIRE déjà noté sur la fiche du cheval est repris automatiquement ; la colonne « sire » ici ne sert
-- que s'il manque sur la fiche.
-- Qui peut lire et écrire : les modératrices et les personnes qui gèrent l'écurie (hype_peut_gerer_club).
-- Ne touche à aucune table existante. Pas de suppression depuis l'appli : un cheval qui part reçoit une date de sortie.

create table if not exists public.registre_chevaux (
  club_clef      text not null,
  cheval_id      uuid not null references public.chevaux(id),
  sire           text,          -- seulement si la fiche du cheval ne l'a pas
  puce           text,          -- n° de transpondeur (15 chiffres)
  proprietaire   text,          -- nom du propriétaire, en clair
  date_entree    date,
  provenance     text,          -- adresse d'où vient le cheval
  date_sortie    date,
  motif_sortie   text,          -- vente, retour propriétaire, retraite, mort…
  destination    text,
  maj_le         timestamptz not null default now(),
  maj_par        uuid default auth.uid(),
  primary key (club_clef, cheval_id)
);

alter table public.registre_chevaux enable row level security;

create policy "regch_lire" on public.registre_chevaux for select to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "regch_creer" on public.registre_chevaux for insert to authenticated
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "regch_modifier" on public.registre_chevaux for update to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef))
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));

-- Vérification (doit renvoyer 3 règles) : select policyname from pg_policies where tablename = 'registre_chevaux';
