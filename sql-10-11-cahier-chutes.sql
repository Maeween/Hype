-- 10/11/2026 (Blandine) : cahier des chutes et incidents — APPLIQUÉ en base le 10/11 (migration cahier_chutes_v1).
-- Pendant le développement : chacun peut écrire ; chaque fiche n'est lue que par son auteur et par la modératrice (Blandine).
-- Plus tard : lecture ouverte aux enseignants de l'écurie (colonne club_clef, déjà prévue).
create table if not exists public.cahier_chutes (
  id uuid primary key default gen_random_uuid(),
  cree_par uuid not null default auth.uid() references auth.users(id) on delete cascade,
  club_clef text,
  survenu_le timestamptz not null default now(),
  lieu text check (lieu in ('carriere','manege','exterieur','paddock','ecurie','concours','autre')),
  type text check (type in ('chute','coup_pied','morsure','bousculade','embarquement','autre')),
  cadre text check (cadre in ('cours_collectif','cours_particulier','travail','concours','balade','soins','autre')),
  cavalier_id uuid, cavalier_nom text, cheval_id uuid, cheval_nom text,
  circonstances text,
  blessure text check (blessure in ('aucune','legere','grave')),
  remonte boolean not null default false, soins_place boolean not null default false, secours boolean not null default false,
  proches_prevenus boolean not null default false, assurance_declaree boolean not null default false, sdjes_declare boolean not null default false,
  suites text, a_suivre boolean not null default false,
  cree_le timestamptz not null default now(), maj_le timestamptz not null default now()
);
create index if not exists cahier_chutes_auteur_idx on public.cahier_chutes (cree_par, survenu_le desc);
alter table public.cahier_chutes enable row level security;
revoke all on public.cahier_chutes from anon;
grant select, insert, update, delete on public.cahier_chutes to authenticated;
create policy chutes_creer on public.cahier_chutes for insert to authenticated with check (cree_par = auth.uid());
create policy chutes_lire on public.cahier_chutes for select to authenticated using (cree_par = auth.uid() or hype_est_moderatrice());
create policy chutes_modifier on public.cahier_chutes for update to authenticated using (cree_par = auth.uid() or hype_est_moderatrice()) with check (cree_par = auth.uid() or hype_est_moderatrice());
create policy chutes_supprimer on public.cahier_chutes for delete to authenticated using (cree_par = auth.uid() or hype_est_moderatrice());
