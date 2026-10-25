-- HYPE — Ma Sellerie : codes partagés par les cavaliers (25/10/2026, validé par Blandine)
-- Règles : ouvert à tout le monde (compte connecté) ; affiché TOUT DE SUITE avec « Code non vérifié » ;
-- 6 codes max par jour et par personne ; 3 signalements « ce code ne marche pas » = caché automatiquement ;
-- caché automatiquement après sa date de fin s'il en a une ; la modératrice vérifie / retire / remet ;
-- l'auteur peut retirer son propre code. Aucune table existante n'est modifiée.

create table if not exists public.sellerie_codes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  marque text not null check (char_length(btrim(marque)) between 2 and 60),
  code text not null check (code ~ '^[A-Za-z0-9_-]{3,30}$'),
  avantage text not null check (char_length(btrim(avantage)) between 1 and 40),
  url text not null check (char_length(url) <= 300 and url ~* '^https://[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+(:[0-9]{2,5})?(/[^[:space:]<>"]*)?$'),
  expire_le date,
  verifie boolean not null default false,
  masque boolean not null default false,
  nb_signalements integer not null default 0,
  created_at timestamptz not null default now()
);
create unique index if not exists sellerie_codes_unique on public.sellerie_codes (lower(btrim(marque)), upper(code));
create index if not exists sellerie_codes_recents on public.sellerie_codes (created_at desc);

create table if not exists public.sellerie_codes_signalements (
  code_id uuid not null references public.sellerie_codes(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (code_id, user_id)
);

-- Vérification automatique à l'ajout (+ protection des champs réservés à la modératrice)
create or replace function public.sellerie_codes_avant_ajout()
returns trigger language plpgsql security definer set search_path = public, auth as $$
declare n integer;
begin
  if auth.uid() is null then raise exception 'connexion requise'; end if;
  new.user_id := auth.uid();
  new.marque := btrim(new.marque);
  new.avantage := btrim(new.avantage);
  new.code := upper(btrim(new.code));
  new.created_at := now();
  new.nb_signalements := 0;
  if not public.hype_est_moderatrice() then
    new.verifie := false;
    new.masque := false;
  end if;
  if new.code in ('FEINN10', 'AMBGJ48W') then raise exception 'code deja present'; end if;
  if new.expire_le is not null and new.expire_le < (now() at time zone 'Europe/Paris')::date then
    raise exception 'date de fin passee';
  end if;
  select count(*) into n from public.sellerie_codes
   where user_id = auth.uid()
     and (created_at at time zone 'Europe/Paris')::date = (now() at time zone 'Europe/Paris')::date;
  if n >= 6 and not public.hype_est_moderatrice() then raise exception 'limite de 6 codes par jour'; end if;
  return new;
end $$;
drop trigger if exists sellerie_codes_avant_ajout on public.sellerie_codes;
create trigger sellerie_codes_avant_ajout before insert on public.sellerie_codes
  for each row execute function public.sellerie_codes_avant_ajout();

-- Signalement : compte +1 ; à 3, le code est caché tout seul. On ne signale pas son propre code.
create or replace function public.sellerie_codes_apres_signalement()
returns trigger language plpgsql security definer set search_path = public, auth as $$
begin
  update public.sellerie_codes
     set nb_signalements = nb_signalements + 1,
         masque = masque or (nb_signalements + 1 >= 3)
   where id = new.code_id;
  return new;
end $$;
create or replace function public.sellerie_codes_avant_signalement()
returns trigger language plpgsql security definer set search_path = public, auth as $$
begin
  if auth.uid() is null then raise exception 'connexion requise'; end if;
  new.user_id := auth.uid();
  if exists (select 1 from public.sellerie_codes where id = new.code_id and user_id = auth.uid()) then
    raise exception 'on ne signale pas son propre code';
  end if;
  return new;
end $$;
drop trigger if exists sellerie_codes_avant_signalement on public.sellerie_codes_signalements;
create trigger sellerie_codes_avant_signalement before insert on public.sellerie_codes_signalements
  for each row execute function public.sellerie_codes_avant_signalement();
drop trigger if exists sellerie_codes_apres_signalement on public.sellerie_codes_signalements;
create trigger sellerie_codes_apres_signalement after insert on public.sellerie_codes_signalements
  for each row execute function public.sellerie_codes_apres_signalement();

revoke execute on function public.sellerie_codes_avant_ajout() from public, anon, authenticated;
revoke execute on function public.sellerie_codes_apres_signalement() from public, anon, authenticated;
revoke execute on function public.sellerie_codes_avant_signalement() from public, anon, authenticated;

-- Droits (RLS)
alter table public.sellerie_codes enable row level security;
alter table public.sellerie_codes_signalements enable row level security;

drop policy if exists "sellerie_codes lecture" on public.sellerie_codes;
create policy "sellerie_codes lecture" on public.sellerie_codes for select
  using (
    (not masque and (expire_le is null or expire_le >= (now() at time zone 'Europe/Paris')::date))
    or auth.uid() = user_id
    or public.hype_est_moderatrice()
  );
drop policy if exists "sellerie_codes ajout" on public.sellerie_codes;
create policy "sellerie_codes ajout" on public.sellerie_codes for insert to authenticated
  with check (auth.uid() = user_id);
drop policy if exists "sellerie_codes moderation" on public.sellerie_codes;
create policy "sellerie_codes moderation" on public.sellerie_codes for update to authenticated
  using (public.hype_est_moderatrice()) with check (public.hype_est_moderatrice());
drop policy if exists "sellerie_codes suppression" on public.sellerie_codes;
create policy "sellerie_codes suppression" on public.sellerie_codes for delete to authenticated
  using (auth.uid() = user_id or public.hype_est_moderatrice());

drop policy if exists "sellerie_signalements lecture" on public.sellerie_codes_signalements;
create policy "sellerie_signalements lecture" on public.sellerie_codes_signalements for select to authenticated
  using (auth.uid() = user_id or public.hype_est_moderatrice());
drop policy if exists "sellerie_signalements ajout" on public.sellerie_codes_signalements;
create policy "sellerie_signalements ajout" on public.sellerie_codes_signalements for insert to authenticated
  with check (auth.uid() = user_id);
drop policy if exists "sellerie_signalements suppression" on public.sellerie_codes_signalements;
create policy "sellerie_signalements suppression" on public.sellerie_codes_signalements for delete to authenticated
  using (public.hype_est_moderatrice());

grant select on public.sellerie_codes to anon, authenticated;
grant insert, update, delete on public.sellerie_codes to authenticated;
grant select, insert, delete on public.sellerie_codes_signalements to authenticated;
