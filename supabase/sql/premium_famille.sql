-- ═══════════════════════════════════════════════════════════════════════════
-- HYPE — PREMIUM FAMILLE (étape 2 : architecture) — PROJET, NON EXÉCUTÉ
-- Préparé le 14/10/2026. À passer par Blandine UNIQUEMENT après validation.
-- Ne touche pas à abonnements_premium : les droits Famille s'AJOUTENT aux autres.
-- Testé sur une base PostgreSQL 16 locale (stubs Supabase) avant proposition.
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. FAMILLES : un abonnement Famille = une ligne, rattachée à son titulaire.
create table if not exists public.familles (
  id uuid primary key default gen_random_uuid(),
  titulaire_id uuid not null references auth.users(id) on delete restrict,
  stripe_subscription text unique,
  stripe_customer text,
  statut text not null default 'actif' check (statut in ('actif','impaye','annule')),
  expire_le timestamptz,
  cree_le timestamptz not null default now(),
  maj_le timestamptz not null default now()
);
-- Un titulaire n'a qu'UNE famille en cours.
create unique index if not exists familles_une_en_cours_par_titulaire
  on public.familles(titulaire_id) where statut in ('actif','impaye');

-- 2. MEMBRES : le titulaire + au plus UN deuxième cavalier (invité ou actif).
create table if not exists public.famille_membres (
  id bigint generated always as identity primary key,
  famille_id uuid not null references public.familles(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,      -- vide tant que l'invitation n'est pas acceptée
  role text not null check (role in ('titulaire','beneficiaire')),
  statut text not null check (statut in ('invite','actif','refuse','retire','expire')),
  code_hash text,                                                -- empreinte du code d'invitation (jamais le code lui-même)
  invite_expire_le timestamptz,
  active_le timestamptz,
  cree_le timestamptz not null default now(),
  maj_le timestamptz not null default now()
);
-- Jamais plus d'un deuxième cavalier en cours par famille (impossible d'en ajouter un 3e).
create unique index if not exists famille_un_beneficiaire_en_cours
  on public.famille_membres(famille_id) where role = 'beneficiaire' and statut in ('invite','actif');
-- Une personne n'est bénéficiaire que d'une seule famille à la fois.
create unique index if not exists famille_une_famille_par_beneficiaire
  on public.famille_membres(user_id) where role = 'beneficiaire' and statut = 'actif';
create unique index if not exists famille_code_unique
  on public.famille_membres(code_hash) where code_hash is not null;

-- 3. JOURNAL : trace de chaque changement.
create table if not exists public.famille_journal (
  id bigint generated always as identity primary key,
  famille_id uuid not null references public.familles(id) on delete cascade,
  acteur uuid,
  action text not null,           -- invitation, acceptation, refus, retrait, depart, expiration
  detail text,
  cree_le timestamptz not null default now()
);

-- 4. SÉCURITÉ : lecture de SA famille uniquement ; aucune écriture directe.
alter table public.familles enable row level security;
alter table public.famille_membres enable row level security;
alter table public.famille_journal enable row level security;
revoke all on public.familles, public.famille_membres, public.famille_journal from anon;
revoke insert, update, delete on public.familles, public.famille_membres, public.famille_journal from authenticated;
grant select on public.familles, public.famille_membres, public.famille_journal to authenticated;

create or replace function public.famille_de_moi() returns uuid
language sql stable security definer set search_path = public, pg_temp as $$
  select f.id from public.familles f
   where f.statut in ('actif','impaye')
     and (f.titulaire_id = auth.uid()
          or exists (select 1 from public.famille_membres m
                      where m.famille_id = f.id and m.user_id = auth.uid() and m.statut = 'actif'))
   limit 1;
$$;

drop policy if exists familles_lecture on public.familles;
create policy familles_lecture on public.familles for select to authenticated
  using (id = public.famille_de_moi());
drop policy if exists famille_membres_lecture on public.famille_membres;
create policy famille_membres_lecture on public.famille_membres for select to authenticated
  using (famille_id = public.famille_de_moi() and statut in ('invite','actif'));
drop policy if exists famille_journal_lecture on public.famille_journal;
create policy famille_journal_lecture on public.famille_journal for select to authenticated
  using (famille_id in (select id from public.familles where titulaire_id = auth.uid()));

-- 5. FONCTIONS (seule porte d'écriture pour l'appli, règles vérifiées côté serveur)
-- 5a. Le titulaire crée un lien d'invitation (7 jours). Renvoie le code à partager.
create or replace function public.famille_inviter() returns text
language plpgsql security definer set search_path = public, extensions, pg_temp as $$
declare v_f uuid; v_code text;
begin
  select id into v_f from public.familles
   where titulaire_id = auth.uid() and statut = 'actif' and (expire_le is null or expire_le > now());
  if v_f is null then raise exception 'FAMILLE_INTROUVABLE'; end if;
  if exists (select 1 from public.famille_membres where famille_id = v_f and role = 'beneficiaire' and statut = 'actif') then
    raise exception 'DEJA_UN_DEUXIEME_CAVALIER';
  end if;
  update public.famille_membres set statut = 'expire', code_hash = null, maj_le = now()
   where famille_id = v_f and role = 'beneficiaire' and statut = 'invite';
  v_code := translate(encode(gen_random_bytes(9), 'base64'), '+/', '-_');
  insert into public.famille_membres (famille_id, role, statut, code_hash, invite_expire_le)
  values (v_f, 'beneficiaire', 'invite', encode(digest(v_code, 'sha256'), 'hex'), now() + interval '7 days');
  insert into public.famille_journal (famille_id, acteur, action) values (v_f, auth.uid(), 'invitation');
  return v_code;
end $$;

-- 5b. Le deuxième cavalier accepte (connecté). Limites : 1 nouveau cavalier / 30 jours, 4 cavaliers différents / an (le 1er + 3 remplacements).
create or replace function public.famille_accepter(p_code text) returns boolean
language plpgsql security definer set search_path = public, extensions, pg_temp as $$
declare v_m public.famille_membres; v_f public.familles;
begin
  if auth.uid() is null then raise exception 'CONNEXION_REQUISE'; end if;
  select * into v_m from public.famille_membres
   where code_hash = encode(digest(p_code, 'sha256'), 'hex') and statut = 'invite' for update;
  if v_m.id is null or v_m.invite_expire_le < now() then raise exception 'INVITATION_INVALIDE'; end if;
  select * into v_f from public.familles where id = v_m.famille_id;
  if v_f.statut <> 'actif' or (v_f.expire_le is not null and v_f.expire_le <= now()) then raise exception 'FAMILLE_INACTIVE'; end if;
  if v_f.titulaire_id = auth.uid() then raise exception 'TITULAIRE_NE_PEUT_PAS_ACCEPTER'; end if;
  if exists (select 1 from public.famille_membres where user_id = auth.uid() and role = 'beneficiaire' and statut = 'actif') then
    raise exception 'DEJA_DANS_UNE_FAMILLE';
  end if;
  if exists (select 1 from public.famille_membres where famille_id = v_f.id and role = 'beneficiaire'
              and active_le > now() - interval '30 days' and user_id is distinct from auth.uid()) then
    raise exception 'LIMITE_30_JOURS';
  end if;
  if (select count(distinct user_id) from public.famille_membres where famille_id = v_f.id and role = 'beneficiaire'
       and active_le > now() - interval '365 days' and user_id is distinct from auth.uid()) >= 4 then
    raise exception 'LIMITE_ANNUELLE';
  end if;
  update public.famille_membres set user_id = auth.uid(), statut = 'actif', code_hash = null,
         active_le = now(), maj_le = now() where id = v_m.id;
  insert into public.famille_journal (famille_id, acteur, action) values (v_f.id, auth.uid(), 'acceptation');
  return true;
end $$;

-- 5c. Le deuxième cavalier refuse.
create or replace function public.famille_refuser(p_code text) returns boolean
language plpgsql security definer set search_path = public, extensions, pg_temp as $$
declare v_m public.famille_membres;
begin
  select * into v_m from public.famille_membres
   where code_hash = encode(digest(p_code, 'sha256'), 'hex') and statut = 'invite';
  if v_m.id is null then raise exception 'INVITATION_INVALIDE'; end if;
  update public.famille_membres set statut = 'refuse', code_hash = null, maj_le = now() where id = v_m.id;
  insert into public.famille_journal (famille_id, acteur, action) values (v_m.famille_id, auth.uid(), 'refus');
  return true;
end $$;

-- 5d. Le titulaire retire le deuxième cavalier (ou annule l'invitation en cours).
create or replace function public.famille_retirer() returns boolean
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_f uuid;
begin
  select id into v_f from public.familles where titulaire_id = auth.uid() and statut in ('actif','impaye');
  if v_f is null then raise exception 'FAMILLE_INTROUVABLE'; end if;
  update public.famille_membres set statut = 'retire', code_hash = null, maj_le = now()
   where famille_id = v_f and role = 'beneficiaire' and statut in ('invite','actif');
  insert into public.famille_journal (famille_id, acteur, action) values (v_f, auth.uid(), 'retrait');
  return true;
end $$;

-- 5e. Le deuxième cavalier quitte la famille (il garde son compte et ses données).
create or replace function public.famille_quitter() returns boolean
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_m public.famille_membres;
begin
  select * into v_m from public.famille_membres where user_id = auth.uid() and role = 'beneficiaire' and statut = 'actif';
  if v_m.id is null then raise exception 'PAS_DE_FAMILLE'; end if;
  update public.famille_membres set statut = 'retire', maj_le = now() where id = v_m.id;
  insert into public.famille_journal (famille_id, acteur, action) values (v_m.famille_id, auth.uid(), 'depart');
  return true;
end $$;

-- 5f. Ce que l'invitation montre avant d'accepter (prénom du titulaire seulement).
create or replace function public.famille_voir_invitation(p_code text) returns table(valide boolean, titulaire_id uuid)
language sql stable security definer set search_path = public, extensions, pg_temp as $$
  select (m.statut = 'invite' and m.invite_expire_le > now() and f.statut = 'actif'), f.titulaire_id
    from public.famille_membres m join public.familles f on f.id = m.famille_id
   where m.code_hash = encode(digest(p_code, 'sha256'), 'hex');
$$;

-- 6. DROITS DU COMPTE : une seule réponse pour l'appli et le serveur.
--    Premium = abonnement personnel OU famille OU ambassadeur OU modératrice ; questions IA = le plus avantageux.
create or replace function public.hype_droits(p_uid uuid default auth.uid())
returns table(premium boolean, questions_ia integer, via_famille boolean)
language plpgsql stable security definer set search_path = public, auth, pg_temp as $$
declare v_plan_perso boolean; v_ai boolean; v_duo boolean; v_fam boolean; v_autre boolean;
begin
  if p_uid is null then return query select false, 1, false; return; end if;
  if p_uid <> auth.uid() and not public.hype_est_moderatrice() then return; end if;
  select bool_or(a.plan in ('mensuel','annuel','duo')), bool_or(a.plan = 'ai'), bool_or(a.plan = 'duo')
    into v_plan_perso, v_ai, v_duo
    from public.abonnements_premium a
   where a.user_id = p_uid and a.statut = 'actif' and (a.expire_le is null or a.expire_le > now());
  select exists (select 1 from public.familles f
                  where f.statut = 'actif' and (f.expire_le is null or f.expire_le > now())
                    and (f.titulaire_id = p_uid
                         or exists (select 1 from public.famille_membres m
                                     where m.famille_id = f.id and m.user_id = p_uid and m.statut = 'actif')))
    into v_fam;
  select exists (select 1 from auth.users u join public.hype_ambassadeurs h on lower(h.email) = lower(u.email) where u.id = p_uid)
      or exists (select 1 from auth.users u where u.id = p_uid and lower(u.email) in ('feinn@live.fr','malicia2008@hotmail.fr'))
    into v_autre;
  return query select
    coalesce(v_plan_perso,false) or coalesce(v_fam,false) or coalesce(v_autre,false),
    case when coalesce(v_duo,false) then 20 when coalesce(v_ai,false) then 15
         when coalesce(v_plan_perso,false) or coalesce(v_fam,false) or coalesce(v_autre,false) then 4 else 1 end,
    coalesce(v_fam,false) and not coalesce(v_plan_perso,false);
end $$;

-- 7. hype_est_premium (déjà en base) : on AJOUTE la famille, le reste est identique.
create or replace function public.hype_est_premium(p_uid uuid default auth.uid())
returns boolean language plpgsql stable security definer set search_path = public, auth, pg_temp as $$
begin
  if p_uid is null then return false; end if;
  if p_uid <> auth.uid() and not public.hype_est_moderatrice() then return null; end if;
  return exists (select 1 from public.abonnements_premium a
                  where a.user_id = p_uid and a.statut = 'actif'
                    and a.plan in ('mensuel','annuel','duo')
                    and (a.expire_le is null or a.expire_le > now()))
      or exists (select 1 from auth.users u join public.hype_ambassadeurs h
                   on lower(h.email) = lower(u.email) where u.id = p_uid)
      or exists (select 1 from auth.users u where u.id = p_uid
                   and lower(u.email) in ('feinn@live.fr','malicia2008@hotmail.fr'))
      or exists (select 1 from public.familles f
                  where f.statut = 'actif' and (f.expire_le is null or f.expire_le > now())
                    and (f.titulaire_id = p_uid
                         or exists (select 1 from public.famille_membres m
                                     where m.famille_id = f.id and m.user_id = p_uid and m.statut = 'actif')));
end $$;

revoke all on function public.famille_inviter(), public.famille_accepter(text), public.famille_refuser(text),
  public.famille_retirer(), public.famille_quitter(), public.famille_voir_invitation(text), public.hype_droits(uuid) from public, anon;
grant execute on function public.famille_inviter(), public.famille_accepter(text), public.famille_refuser(text),
  public.famille_retirer(), public.famille_quitter(), public.famille_voir_invitation(text), public.hype_droits(uuid) to authenticated;
