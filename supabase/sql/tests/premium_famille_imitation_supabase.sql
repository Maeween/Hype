-- Imitation minimale de Supabase pour tester localement
create schema if not exists auth;
create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;
do $$ begin
  if not exists (select 1 from pg_roles where rolname='anon') then create role anon nologin; end if;
  if not exists (select 1 from pg_roles where rolname='authenticated') then create role authenticated nologin; end if;
end $$;
grant usage on schema public, auth, extensions to anon, authenticated;
create table auth.users (id uuid primary key, email text);
create or replace function auth.uid() returns uuid language sql stable as
  $$ select nullif(current_setting('test.uid', true), '')::uuid $$;
grant execute on function auth.uid() to anon, authenticated;

create table public.abonnements_premium (
  user_id uuid primary key, email text, stripe_customer text, stripe_subscription text,
  plan text, statut text, expire_le timestamptz, maj_le timestamptz,
  notif_motif text, notif_ancien_plan text, notifie_le timestamptz);
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
