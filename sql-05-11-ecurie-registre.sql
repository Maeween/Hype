-- HYPE ▸ 05/11/2026 — ESPACE « MON ÉCURIE », ÉTAPE 2 : parties I (le détenteur) et III (les vétérinaires) du registre d'élevage.
-- À PASSER EN BASE SEULEMENT APRÈS L'ACCORD DE BLANDINE.
-- Ce que ça fait : crée UNE nouvelle table, une ligne par écurie. Ne touche à aucune table existante, ne supprime rien.
-- Qui peut lire et écrire : les modératrices et les personnes qui gèrent l'écurie (mêmes règles que le reste :
-- hype_peut_gerer_club = propriétaire revendiqué du club ou gestionnaire). Personne d'autre, même pas les cavalières.
-- Pas de suppression possible depuis l'appli.

create table if not exists public.ecurie_registre (
  club_clef         text primary key,          -- clé du club (hype_clef_club du nom)
  club_nom          text,                       -- nom tel qu'affiché
  structure         text,                       -- nom de la structure (association, société…)
  responsable       text,                       -- responsable du lieu de détention
  adresse_lieu      text,                       -- adresse du lieu de détention
  siret             text,
  numero_detenteur  text,                       -- n° de détenteur SIRE (espace SIRE de l'IFCE)
  code_ape          text,
  veto_traitant     text,                       -- nom et coordonnées
  veto_sanitaire    text,                       -- obligatoire dès 3 équidés
  maj_le            timestamptz not null default now(),
  maj_par           uuid default auth.uid()
);

alter table public.ecurie_registre enable row level security;

drop policy if exists "registre_lire" on public.ecurie_registre;
create policy "registre_lire" on public.ecurie_registre for select to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));

drop policy if exists "registre_creer" on public.ecurie_registre;
create policy "registre_creer" on public.ecurie_registre for insert to authenticated
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));

drop policy if exists "registre_modifier" on public.ecurie_registre;
create policy "registre_modifier" on public.ecurie_registre for update to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef))
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));

-- Vérification après passage (doit renvoyer 3 règles) :
-- select policyname from pg_policies where tablename = 'ecurie_registre';
