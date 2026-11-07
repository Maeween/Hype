-- HYPE ▸ 07/11/2026 — MON ÉCURIE : « LE REGISTRE DU PERSONNEL » (registre unique du personnel).
-- Demande de Blandine (07/11 02 h 47 : « tu peux le mettre en ligne dans l'appli aussi ? »). Passé en base par Claude le 07/11.
-- Code du travail L. 1221-13 et D. 1221-23 : tous les salariés dans l'ordre d'embauche (nom, prénoms, nationalité,
-- date de naissance, sexe, emploi, qualification, dates d'entrée et de sortie, type de contrat, temps partiel,
-- titre de travail des salariés étrangers) ; stagiaires dans une partie à part (dates, tuteur). Gardé 5 ans après
-- chaque départ. Données personnelles : lisibles et modifiables SEULEMENT par les responsables de l'écurie et les
-- modératrices (mêmes règles que Ma compta). Ne touche à aucune table existante.
create table if not exists public.registre_personnel (
  id              uuid primary key default gen_random_uuid(),
  club_clef       text not null,
  nom             text not null,
  prenoms         text,
  nationalite     text,
  date_naissance  date,
  sexe            text,
  emploi          text,
  qualification   text,
  type_contrat    text,          -- CDI, CDD, Apprentissage, Stage, Saisonnier, Autre
  temps_partiel   boolean,
  date_entree     date,
  date_sortie     date,
  titre_travail   text,          -- salarié étranger : type et n° du titre qui autorise à travailler
  tuteur          text,          -- stagiaire : nom du tuteur
  notes           text,
  created_by      uuid default auth.uid(),
  created_at      timestamptz not null default now(),
  maj_le          timestamptz not null default now()
);
create index if not exists registre_personnel_club on public.registre_personnel (club_clef);
alter table public.registre_personnel enable row level security;
create policy "perso_lire" on public.registre_personnel for select to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "perso_creer" on public.registre_personnel for insert to authenticated
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "perso_modifier" on public.registre_personnel for update to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef))
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "perso_supprimer" on public.registre_personnel for delete to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
-- Vérification : select count(*) from pg_policies where tablename = 'registre_personnel';  → 4
