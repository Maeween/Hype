-- HYPE ▸ 05/11/2026 — REGISTRE D'ÉLEVAGE, PARTIE V : « MOUVEMENTS TEMPORAIRES DES ANIMAUX » (terme IFCE ; sorties provisoires des chevaux).
-- Accord de Blandine le 05/11 (« Ok », 20 h 25). Passé en base par Claude le 05/11.
-- Ce que demande l'IFCE (guide du registre d'élevage, arrêté du 5 juin 2000) pour un déplacement provisoire (concours,
-- stage, randonnée, vétérinaire) : date de sortie, date de retour, nom du cheval, motif, adresse du lieu de destination.
-- Tableau dans l'ordre des dates, gardé au moins 5 ans. Facultatif : déplacement en camion (oui/non), chef d'équipe.
-- Le registre est celui du LIEU OÙ VIVENT LES CHEVAUX : club_clef = l'écurie du cheval (chevaux de la SEP → registre
-- de la SEP).
-- Lien avec les concours (codé ensuite depuis la page Engagements) : une ligne venue d'un rendez-vous garde son
-- agenda_id ; le couple (agenda_id, cheval_id) est UNIQUE, donc jamais de doublon. Une ligne venue d'un concours reste
-- modifiable à la main.
-- Droits : modératrices et gestionnaires du club (comme le reste du registre). Suppression permise à eux seuls (une ligne
-- saisie par erreur, ou un cheval retiré d'un concours) ; personne d'autre ne peut ni lire ni écrire.
-- Ne touche à aucune table existante.

create table if not exists public.registre_mouvements (
  id            uuid primary key default gen_random_uuid(),
  club_clef     text not null,                            -- registre du lieu où vit le cheval
  cheval_id     uuid not null references public.chevaux(id),
  date_sortie   date not null,
  date_retour   date,
  motif         text,                                     -- ex. « Concours CSO Club Itteville n° 202691001 »
  destination   text,                                     -- adresse du lieu de destination
  camion        boolean,                                  -- facultatif : déplacement en camion
  chef_equipe   text,                                     -- facultatif : accompagnant / chef d'équipe
  agenda_id     uuid references public.club_agenda(id) on delete set null,   -- rendez-vous d'origine (concours…)
  source        text not null default 'manuel',           -- 'manuel' ou 'concours'
  created_by    uuid default auth.uid(),
  created_at    timestamptz not null default now(),
  maj_le        timestamptz not null default now()
);

create unique index if not exists registre_mouvements_agenda_cheval
  on public.registre_mouvements (agenda_id, cheval_id) where agenda_id is not null;
create index if not exists registre_mouvements_club_date
  on public.registre_mouvements (club_clef, date_sortie);

alter table public.registre_mouvements enable row level security;

create policy "regmv_lire" on public.registre_mouvements for select to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "regmv_creer" on public.registre_mouvements for insert to authenticated
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "regmv_modifier" on public.registre_mouvements for update to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef))
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "regmv_supprimer" on public.registre_mouvements for delete to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));

-- Vérification (doit renvoyer 4 règles) : select policyname from pg_policies where tablename = 'registre_mouvements';
