-- Imitation minimale de Supabase pour tester localement
create schema if not exists auth;
create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;
do $$ begin
  if not exists (select 1 from pg_roles where rolname='anon') then create role anon nologin; end if;
  if not exists (select 1 from pg_roles where rolname='authenticated') then create role authenticated nologin; end if;
  if not exists (select 1 from pg_roles where rolname='service_role') then create role service_role nologin; end if;
end $$;
grant usage on schema public, auth, extensions to anon, authenticated, service_role;
create table public.profiles (id uuid primary key, pseudo text);
create table auth.users (id uuid primary key, email text);
create or replace function auth.uid() returns uuid language sql stable as
  $$ select nullif(current_setting('test.uid', true), '')::uuid $$;
grant execute on function auth.uid() to anon, authenticated;

create table public.abonnements_premium (
  user_id uuid primary key, email text, stripe_customer text, stripe_subscription text,
  plan text, statut text, expire_le timestamptz, maj_le timestamptz,
  notif_motif text, notif_ancien_plan text, notifie_le timestamptz);
create table public.paiements_a_verifier (
  id bigint generated always as identity primary key, stripe_event_id text not null unique, type_evenement text not null,
  reference_stripe text, identifiant_offre text, user_id uuid, email text, montant_centimes integer,
  anomalie text not null check (anomalie in ('offre_inconnue','double_abonnement','paiement_non_confirme','changement_formule')),
  statut text not null default 'a_verifier', note text, cree_le timestamptz not null default now(), maj_le timestamptz not null default now());
create table public.hype_ambassadeurs (email text primary key, nom text, ajoute_le timestamptz default now());
create or replace function public.hype_est_moderatrice() returns boolean
language sql stable security definer set search_path = public, auth as $$
  select exists (select 1 from auth.users where id = auth.uid() and lower(email) in ('feinn@live.fr','malicia2008@hotmail.fr'));
$$;

insert into auth.users values
 ('00000000-0000-0000-0000-00000000000a','titulaire@test.fr'),
 ('00000000-0000-0000-0000-00000000000b','soeur@test.fr'),
 ('00000000-0000-0000-0000-00000000000c','cousin@test.fr'),
 ('00000000-0000-0000-0000-00000000000d','intrus@test.fr'),
 ('00000000-0000-0000-0000-00000000000e','premiumperso@test.fr'),
 ('00000000-0000-0000-0000-00000000000f','iaperso@test.fr'),
 ('00000000-0000-0000-0000-000000000010','autre_titulaire@test.fr'),
 ('00000000-0000-0000-0000-000000000011','feinn@live.fr');
insert into public.abonnements_premium (user_id,plan,statut,expire_le) values
 ('00000000-0000-0000-0000-00000000000e','mensuel','actif',now()+interval '20 days'),
 ('00000000-0000-0000-0000-00000000000f','ai','actif',now()+interval '20 days');
insert into public.profiles select id, split_part(email,'@',1) from auth.users;
