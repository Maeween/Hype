-- HYPE ▸ 05/11/2026 — REGISTRE D'ÉLEVAGE, PARTIES II (PLAN DES LIEUX) ET VII (CONTRÔLES).
-- À PASSER EN BASE SEULEMENT APRÈS L'ACCORD DE BLANDINE.
-- Guide IFCE : partie II = « recenser l'ensemble des bâtiments et des pâtures » où les chevaux vivent, même
-- occasionnellement (plan de masse, plan cadastral ou vue satellite) + description précise du lieu.
-- Partie VII = remplie par les agents habilités (DDPP, IFCE) ; le vétérinaire peut aussi viser le registre ;
-- partie obligatoirement paginée. Registre informatique : l'imprimer chaque trimestre, à chaque visite du
-- vétérinaire et à la demande des agents. Tout se garde 5 ans.
-- Ne touche à aucune table existante. Mêmes droits que le reste du registre : modératrices et gestionnaires du club.

-- 1) Description du lieu (partie II), dans la fiche existante de l'écurie
alter table public.ecurie_registre add column if not exists description_lieu text;   -- bâtiments, boxes, pâtures, surfaces

-- 2) Documents du registre : plan des lieux (partie II), pages de contrôle signées scannées (partie VII)
create table if not exists public.registre_documents (
  id          uuid primary key default gen_random_uuid(),
  club_clef   text not null,
  type        text not null check (type in ('plan', 'controle', 'autre')),
  titre       text,
  chemin      text,                                    -- <id>/<nom du fichier> dans le compartiment « registre »
  date_doc    date default current_date,
  created_by  uuid default auth.uid(),
  created_at  timestamptz not null default now()
);
create index if not exists registre_documents_club on public.registre_documents (club_clef, type);
alter table public.registre_documents enable row level security;
create policy "regdoc_lire" on public.registre_documents for select to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "regdoc_creer" on public.registre_documents for insert to authenticated
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "regdoc_modifier" on public.registre_documents for update to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef))
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "regdoc_supprimer" on public.registre_documents for delete to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));

-- 3) Visites de contrôle (partie VII) : ce que l'écurie note après une visite
create table if not exists public.registre_controles (
  id             uuid primary key default gen_random_uuid(),
  club_clef      text not null,
  date_controle  date not null,
  organisme      text,            -- DDPP, IFCE, vétérinaire sanitaire, autre
  controleur     text,            -- nom de la personne
  observations   text,
  created_by     uuid default auth.uid(),
  created_at     timestamptz not null default now()
);
create index if not exists registre_controles_club on public.registre_controles (club_clef, date_controle);
alter table public.registre_controles enable row level security;
create policy "regctl_lire" on public.registre_controles for select to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "regctl_creer" on public.registre_controles for insert to authenticated
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "regctl_modifier" on public.registre_controles for update to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef))
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "regctl_supprimer" on public.registre_controles for delete to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));

-- 4) Compartiment privé « registre » (photos et PDF, 15 Mo max). Le fichier est rangé sous l'id de sa ligne
--    registre_documents : la ligne est créée AVANT l'envoi, et la règle retrouve l'écurie par cette ligne.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('registre', 'registre', false, 15728640, array['image/jpeg','image/png','image/webp','image/heic','application/pdf'])
on conflict (id) do nothing;

create or replace function public.hype_club_du_doc_registre(p_name text)
returns text language sql stable security definer set search_path to 'public' as $$
  select d.club_clef from public.registre_documents d
  where split_part(p_name, '/', 1) ~ '^[0-9a-fA-F-]{36}$' and d.id = split_part(p_name, '/', 1)::uuid
$$;

create policy "registre_voir" on storage.objects for select to authenticated
  using (bucket_id = 'registre' and (public.hype_est_moderatrice() or public.hype_peut_gerer_club(public.hype_club_du_doc_registre(name))));
create policy "registre_ajouter" on storage.objects for insert to authenticated
  with check (bucket_id = 'registre' and (public.hype_est_moderatrice() or public.hype_peut_gerer_club(public.hype_club_du_doc_registre(name))));
create policy "registre_supprimer" on storage.objects for delete to authenticated
  using (bucket_id = 'registre' and (public.hype_est_moderatrice() or public.hype_peut_gerer_club(public.hype_club_du_doc_registre(name))));

-- Vérification : select tablename, count(*) from pg_policies where tablename in ('registre_documents','registre_controles') group by 1;  → 4 et 4
--                select policyname from pg_policies where schemaname='storage' and policyname like 'registre_%';  → 3
