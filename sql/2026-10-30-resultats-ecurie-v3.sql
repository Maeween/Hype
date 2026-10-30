-- HYPE — 30/10/2026 — Page « Résultats de l'écurie » V3 (relecture). AJOUTS SEULEMENT : rien n'est supprimé ni réécrit,
-- sauf la nature 'valide' posée sur les 23 liens déjà validés par Blandine. À passer UNIQUEMENT sur son « passe le SQL ».
-- 1) Nature du lien résultat -> rendez-vous : 'auto' (règle), 'valide' (liste validée), 'manuel' (choisi à la main, jamais écrasé)
alter table public.resultats add column if not exists agenda_lien text null;
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'resultats_agenda_lien_chk') then
    alter table public.resultats add constraint resultats_agenda_lien_chk check (agenda_lien is null or agenda_lien in ('auto','valide','manuel'));
  end if;
end $$;
update public.resultats set agenda_lien = 'valide' where agenda_id is not null and agenda_lien is null;

-- droit de gérer une écurie : modératrice, propriétaire du club, ou gestionnaire désignée
create or replace function public.hype_gere_club(p_clef text) returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.hype_est_moderatrice(), false)
      or coalesce(public.hype_est_proprietaire_club(p_clef), false)
      or exists (select 1 from public.club_gestionnaires g where g.club_clef = p_clef and g.user_id = auth.uid());
$$;

-- 2) Cavaliers FFE SANS compte Hype rattachés à une écurie (liste centrale, remplace la liste écrite dans le code)
create table if not exists public.club_cavaliers_ffe (
  club_clef text not null, nom text not null,
  ajoute_par uuid default auth.uid(), ajoute_le timestamptz not null default now(),
  primary key (club_clef, nom)
);
alter table public.club_cavaliers_ffe enable row level security;
drop policy if exists ccf_lecture on public.club_cavaliers_ffe;
create policy ccf_lecture on public.club_cavaliers_ffe for select to authenticated using (true);
drop policy if exists ccf_ajout on public.club_cavaliers_ffe;
create policy ccf_ajout on public.club_cavaliers_ffe for insert to authenticated with check (public.hype_gere_club(club_clef));
drop policy if exists ccf_retrait on public.club_cavaliers_ffe;
create policy ccf_retrait on public.club_cavaliers_ffe for delete to authenticated using (public.hype_gere_club(club_clef));
insert into public.club_cavaliers_ffe (club_clef, nom, ajoute_par) values
 ('ecurie feinn','ELEA BRILLARD',null),('ecurie feinn','EMMA VICTOIRE DURAND',null),('ecurie feinn','VALENTINE LANGLOIS DEPOIX',null),
 ('ecurie feinn','PAULINE GILLES',null),('ecurie feinn','ILONA HUGOT',null),('ecurie feinn','CHLOE BERTHIER',null)
on conflict do nothing;

-- 3) Majorité VÉRIFIÉE par une modératrice : seule condition du nom complet et de la photo de profil sur les pages de résultats
create table if not exists public.majorites_verifiees (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  verifie_par uuid default auth.uid(), verifie_le timestamptz not null default now()
);
alter table public.majorites_verifiees enable row level security;
drop policy if exists mv_lecture on public.majorites_verifiees;
create policy mv_lecture on public.majorites_verifiees for select to authenticated using (true);
drop policy if exists mv_ajout on public.majorites_verifiees;
create policy mv_ajout on public.majorites_verifiees for insert to authenticated with check (public.hype_est_moderatrice());
drop policy if exists mv_retrait on public.majorites_verifiees;
create policy mv_retrait on public.majorites_verifiees for delete to authenticated using (public.hype_est_moderatrice());
