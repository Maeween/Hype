-- ═══════════════════════════════════════════════════════════════════════════
-- HYPE — PREMIUM FAMILLE (étapes 2, 3 et 3 bis) — PROJET, NON EXÉCUTÉ
-- Préparé le 14/10/2026. À passer par Blandine UNIQUEMENT après validation.
-- Retour arrière : premium_famille_retour_arriere.sql (même dossier).
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
  stripe_evenement_le timestamptz,   -- date du dernier message Stripe appliqué (les plus anciens sont ignorés)
  cree_le timestamptz not null default now(),
  maj_le timestamptz not null default now()
);
alter table public.familles add column if not exists stripe_evenement_le timestamptz;
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

-- 3 bis. ESSAIS DE CODE RATÉS (limite : 10 par heure et par compte). Ni lisible ni modifiable par l'appli.
create table if not exists public.famille_essais (
  id bigint generated always as identity primary key,
  user_id uuid not null,
  cree_le timestamptz not null default now()
);
create index if not exists famille_essais_par_compte on public.famille_essais(user_id, cree_le);
alter table public.famille_essais enable row level security;
revoke all on public.famille_essais from anon, authenticated;

-- 3 ter. Nouvelle sorte d'anomalie : compte supprimé alors qu'un abonnement Stripe tourne peut-être encore.
alter table public.paiements_a_verifier drop constraint if exists paiements_a_verifier_anomalie_check;
alter table public.paiements_a_verifier add constraint paiements_a_verifier_anomalie_check
  check (anomalie in ('offre_inconnue','double_abonnement','paiement_non_confirme','changement_formule','compte_supprime_abonnement_actif'));

-- 4. SÉCURITÉ : lecture de SA famille uniquement ; aucune écriture directe.
alter table public.familles enable row level security;
alter table public.famille_membres enable row level security;
alter table public.famille_journal enable row level security;
-- (Supabase donne par défaut TOUS les droits aux nouveaux comptes connectés, y compris « vider la table » qui
--  passe outre la sécurité ligne par ligne : on retire tout, puis on rend seulement la lecture.)
revoke all on public.familles, public.famille_membres, public.famille_journal from anon, authenticated;
-- 15/10/2026 (livraison B) : plus AUCUNE lecture directe pour l'appli ; tout passe par les fonctions
-- (famille_mon_etat, famille_voir_invitation…). Passé en production le 15/10 à 0 h 31.
revoke select on public.familles, public.famille_membres, public.famille_journal from authenticated;

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
  -- « for update » : une seule action à la fois par famille (deux clics simultanés passent l'un après l'autre)
  select id into v_f from public.familles
   where titulaire_id = auth.uid() and statut = 'actif' and (expire_le is null or expire_le > now()) for update;
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

-- 5a bis. Contrôle commun d'un code reçu : compte connecté, pas plus de 10 codes faux par heure.
--         Rend la ligne d'invitation valable, ou un code d'erreur (le code faux est alors compté).
create or replace function public.famille_controle_code(p_code text, out ligne public.famille_membres, out erreur text)
language plpgsql security definer set search_path = public, extensions, pg_temp as $$
begin
  if auth.uid() is null then erreur := 'CONNEXION_REQUISE'; return; end if;
  delete from public.famille_essais where cree_le < now() - interval '1 day';
  if (select count(*) from public.famille_essais where user_id = auth.uid() and cree_le > now() - interval '1 hour') >= 10 then
    erreur := 'TROP_D_ESSAIS'; return;
  end if;
  select * into ligne from public.famille_membres
   where code_hash = encode(digest(coalesce(p_code, ''), 'sha256'), 'hex') and statut = 'invite';
  if ligne.id is null or ligne.invite_expire_le <= now() then
    insert into public.famille_essais (user_id) values (auth.uid());
    ligne := null; erreur := 'INVITATION_INVALIDE';
  end if;
end $$;

-- 5b. Le deuxième cavalier accepte (connecté, après avoir appuyé sur « Accepter »).
--     Rend 'OK' ou un code d'erreur lisible (jamais d'erreur technique).
--     Limites : 1 nouveau cavalier / 30 jours, 4 cavaliers différents / an (le 1er + 3 remplacements).
drop function if exists public.famille_accepter(text);
create or replace function public.famille_accepter(p_code text) returns text
language plpgsql security definer set search_path = public, extensions, pg_temp as $$
declare c record; v_m public.famille_membres; v_f public.familles;
begin
  select * into c from public.famille_controle_code(p_code);
  if c.erreur is not null then return c.erreur; end if;
  -- Une seule action à la fois sur cette famille : on la réserve, puis on relit l'invitation.
  select * into v_f from public.familles where id = (c.ligne).famille_id for update;
  select * into v_m from public.famille_membres where id = (c.ligne).id for update;
  if v_m.statut <> 'invite' or v_m.invite_expire_le <= now() then return 'INVITATION_INVALIDE'; end if;
  if v_f.statut <> 'actif' or (v_f.expire_le is not null and v_f.expire_le <= now()) then return 'FAMILLE_INACTIVE'; end if;
  if v_f.titulaire_id = auth.uid() then return 'TITULAIRE_NE_PEUT_PAS_ACCEPTER'; end if;
  if exists (select 1 from public.famille_membres where user_id = auth.uid() and role = 'beneficiaire' and statut = 'actif') then
    return 'DEJA_DANS_UNE_FAMILLE';
  end if;
  if exists (select 1 from public.familles where titulaire_id = auth.uid() and statut in ('actif','impaye')) then
    return 'DEJA_TITULAIRE';
  end if;
  if exists (select 1 from public.famille_membres where famille_id = v_f.id and role = 'beneficiaire'
              and active_le > now() - interval '30 days' and user_id is distinct from auth.uid()) then
    return 'LIMITE_30_JOURS';
  end if;
  if (select count(distinct user_id) from public.famille_membres where famille_id = v_f.id and role = 'beneficiaire'
       and active_le > now() - interval '365 days' and user_id is distinct from auth.uid()) >= 4 then
    return 'LIMITE_ANNUELLE';
  end if;
  begin
    update public.famille_membres set user_id = auth.uid(), statut = 'actif', code_hash = null,
           active_le = now(), maj_le = now() where id = v_m.id;
  exception when unique_violation then
    -- Rejoint une autre famille à la même seconde : la base a refusé, on le dit clairement.
    return 'DEJA_DANS_UNE_FAMILLE';
  end;
  -- Cas A : le nouveau venu payait déjà Premium lui-même → noté pour Blandine (aucune résiliation automatique)
  insert into public.famille_journal (famille_id, acteur, action, detail) values (v_f.id, auth.uid(), 'acceptation',
    case when exists (select 1 from public.abonnements_premium a where a.user_id = auth.uid() and a.statut = 'actif'
                        and a.plan in ('mensuel','annuel','duo') and (a.expire_le is null or a.expire_le > now()))
         then 'deja_premium_personnel' end);
  return 'OK';
end $$;

-- 5c. Le deuxième cavalier refuse. Rend 'OK' ou un code d'erreur.
drop function if exists public.famille_refuser(text);
create or replace function public.famille_refuser(p_code text) returns text
language plpgsql security definer set search_path = public, extensions, pg_temp as $$
declare c record;
begin
  select * into c from public.famille_controle_code(p_code);
  if c.erreur is not null then return c.erreur; end if;
  update public.famille_membres set statut = 'refuse', code_hash = null, maj_le = now()
   where id = (c.ligne).id and statut = 'invite';
  insert into public.famille_journal (famille_id, acteur, action) values ((c.ligne).famille_id, auth.uid(), 'refus');
  return 'OK';
end $$;

-- 5d. Le titulaire retire le deuxième cavalier (ou annule l'invitation en cours).
create or replace function public.famille_retirer() returns boolean
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_f uuid;
begin
  select id into v_f from public.familles where titulaire_id = auth.uid() and statut in ('actif','impaye') for update;
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
  perform 1 from public.familles where id = v_m.famille_id for update;
  update public.famille_membres set statut = 'retire', maj_le = now() where id = v_m.id;
  insert into public.famille_journal (famille_id, acteur, action) values (v_m.famille_id, auth.uid(), 'depart');
  return true;
end $$;

drop function if exists public.famille_voir_invitation(text);
-- 5f. Ce que l'invitation montre avant d'accepter : seulement le pseudo du titulaire (codes faux comptés).
create or replace function public.famille_voir_invitation(p_code text) returns table(valide boolean, titulaire text, raison text)
language plpgsql security definer set search_path = public, extensions, pg_temp as $$
declare c record; v_f public.familles;
begin
  select * into c from public.famille_controle_code(p_code);
  if c.erreur is not null then return query select false, ''::text, c.erreur; return; end if;
  select * into v_f from public.familles where id = (c.ligne).famille_id;
  if v_f.statut <> 'actif' or (v_f.expire_le is not null and v_f.expire_le <= now()) then
    return query select false, ''::text, 'FAMILLE_INACTIVE'::text; return;
  end if;
  return query select true, coalesce((select pseudo from public.profiles where id = v_f.titulaire_id), ''), null::text;
end $$;

-- 5g. Ma famille, pour l'écran « Mon compte » (rien si je n'en ai pas).
create or replace function public.famille_mon_etat() returns jsonb
language plpgsql stable security definer set search_path = public, pg_temp as $$
declare v_f public.familles; v_role text; v_b public.famille_membres;
begin
  if auth.uid() is null then return null; end if;
  select f.* into v_f from public.familles f where f.titulaire_id = auth.uid() and f.statut in ('actif','impaye') limit 1;
  if v_f.id is not null then v_role := 'titulaire';
  else
    select f.* into v_f from public.familles f join public.famille_membres m on m.famille_id = f.id
     where m.user_id = auth.uid() and m.role = 'beneficiaire' and m.statut = 'actif' and f.statut in ('actif','impaye') limit 1;
    if v_f.id is null then return null; end if;
    v_role := 'beneficiaire';
  end if;
  select * into v_b from public.famille_membres where famille_id = v_f.id and role = 'beneficiaire' and statut in ('invite','actif')
   order by cree_le desc limit 1;
  return jsonb_build_object(
    'role', v_role,
    'statut', v_f.statut,
    'actif', v_f.statut = 'actif' and (v_f.expire_le is null or v_f.expire_le > now()),
    'expire_le', v_f.expire_le,
    'titulaire', (select pseudo from public.profiles where id = v_f.titulaire_id),
    'deuxieme', case when v_b.statut = 'actif' then (select pseudo from public.profiles where id = v_b.user_id) end,
    'invitation_en_cours', v_b.statut = 'invite' and v_b.invite_expire_le > now(),
    'invitation_expire_le', case when v_b.statut = 'invite' then v_b.invite_expire_le end,
    'remplacement_possible_le', (select max(active_le) + interval '30 days' from public.famille_membres
                                  where famille_id = v_f.id and role = 'beneficiaire' and active_le is not null)
  );
end $$;

-- 5h. RÉSERVÉ AU RELAIS STRIPE (clé serveur) : ouvrir une famille après paiement.
--     Rend 'cree', 'deja' (même abonnement déjà enregistré) ou 'autre_famille' (le titulaire en a déjà une autre en cours).
drop function if exists public.famille_ouvrir(uuid, text, text, timestamptz);
create or replace function public.famille_ouvrir(p_titulaire uuid, p_sub text, p_customer text, p_expire timestamptz,
                                                 p_evenement_le timestamptz default null) returns text
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_f uuid;
begin
  if p_sub is not null and exists (select 1 from public.familles where stripe_subscription = p_sub) then return 'deja'; end if;
  if exists (select 1 from public.familles where titulaire_id = p_titulaire and statut in ('actif','impaye')
              and (expire_le is null or expire_le > now())) then return 'autre_famille'; end if;
  -- ancienne famille du même titulaire restée « en cours » mais échue : on la clôt proprement
  update public.familles set statut = 'annule', maj_le = now() where titulaire_id = p_titulaire and statut in ('actif','impaye');
  insert into public.familles (titulaire_id, stripe_subscription, stripe_customer, statut, expire_le, stripe_evenement_le)
  values (p_titulaire, p_sub, p_customer, 'actif', p_expire, p_evenement_le) returning id into v_f;
  insert into public.famille_membres (famille_id, user_id, role, statut, active_le) values (v_f, p_titulaire, 'titulaire', 'actif', now());
  insert into public.famille_journal (famille_id, acteur, action, detail) values (v_f, p_titulaire, 'ouverture', p_sub);
  return 'cree';
end $$;

-- 5i. RÉSERVÉ AU RELAIS STRIPE : renouvellement, impayé, résiliation.
--     Rend 1 si l'abonnement est bien une famille (même si le message est ignoré), 0 sinon.
--     Règles d'ordre (3 bis) :
--       · une famille résiliée ne revient JAMAIS (un nouvel achat ouvre une nouvelle famille) ;
--       · un message Stripe plus ancien que le dernier appliqué est ignoré ;
--       · « payé » ne réactive que si la facture couvre une période PLUS RÉCENTE (la date de fin ne recule jamais) ;
--       · « impayé » ne touche qu'une famille active.
drop function if exists public.famille_maj(text, text, timestamptz);
create or replace function public.famille_maj(p_sub text, p_statut text, p_expire timestamptz default null,
                                              p_evenement_le timestamptz default null) returns integer
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_f public.familles; v_action text;
begin
  if p_statut not in ('actif','impaye','annule') then raise exception 'STATUT_INVALIDE'; end if;
  select * into v_f from public.familles where stripe_subscription = p_sub for update;
  if v_f.id is null then return 0; end if;
  if v_f.statut = 'annule' then
    v_action := 'ignore_deja_resiliee';
  elsif p_evenement_le is not null and v_f.stripe_evenement_le is not null and p_evenement_le < v_f.stripe_evenement_le then
    v_action := 'ignore_message_ancien';
  elsif p_statut = 'annule' then
    update public.familles set statut = 'annule', maj_le = now(),
           stripe_evenement_le = greatest(stripe_evenement_le, p_evenement_le) where id = v_f.id;
    v_action := 'stripe_annule';
  elsif p_statut = 'impaye' then
    if v_f.statut = 'actif' then
      update public.familles set statut = 'impaye', maj_le = now(),
             stripe_evenement_le = greatest(stripe_evenement_le, p_evenement_le) where id = v_f.id;
      v_action := 'stripe_impaye';
    else v_action := 'ignore_deja_impaye'; end if;
  else -- 'actif'
    if p_expire is not null and (v_f.expire_le is null or p_expire > v_f.expire_le) then
      update public.familles set statut = 'actif', expire_le = p_expire, maj_le = now(),
             stripe_evenement_le = greatest(stripe_evenement_le, p_evenement_le) where id = v_f.id;
      v_action := 'stripe_actif';
    else v_action := 'ignore_periode_ancienne'; end if;
  end if;
  insert into public.famille_journal (famille_id, action, detail) values (v_f.id, v_action, p_sub);
  return 1;
end $$;

-- 5i bis. RÉSERVÉ AU SERVEUR : ce compte fait-il partie d'une famille en cours ? ('titulaire', 'beneficiaire' ou null)
create or replace function public.famille_du_compte(p_uid uuid) returns text
language sql stable security definer set search_path = public, pg_temp as $$
  select case when exists (select 1 from public.familles f where f.titulaire_id = p_uid and f.statut in ('actif','impaye')
                             and (f.expire_le is null or f.expire_le > now())) then 'titulaire'
              when exists (select 1 from public.familles f join public.famille_membres m on m.famille_id = f.id
                            where m.user_id = p_uid and m.role = 'beneficiaire' and m.statut = 'actif'
                              and f.statut in ('actif','impaye') and (f.expire_le is null or f.expire_le > now())) then 'beneficiaire'
         end;
$$;

-- 5j. Famille résiliée → les deux rattachements prennent fin (les comptes et données restent).
--     Le deuxième cavalier peut alors rejoindre une autre famille.
create or replace function public.famille_fin_rattachements() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if new.statut = 'annule' and old.statut <> 'annule' then
    update public.famille_membres set statut = 'expire', code_hash = null, maj_le = now()
     where famille_id = new.id and statut in ('invite','actif');
  end if;
  return new;
end $$;
drop trigger if exists famille_fin_rattachements on public.familles;
create trigger famille_fin_rattachements after update of statut on public.familles
  for each row execute function public.famille_fin_rattachements();

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
  public.famille_retirer(), public.famille_quitter(), public.famille_voir_invitation(text), public.famille_mon_etat(),
  public.hype_droits(uuid), public.famille_ouvrir(uuid, text, text, timestamptz, timestamptz),
  public.famille_maj(text, text, timestamptz, timestamptz), public.famille_du_compte(uuid),
  public.famille_controle_code(text), public.famille_de_moi(), public.famille_fin_rattachements() from public, anon, authenticated;
grant execute on function public.famille_inviter(), public.famille_accepter(text), public.famille_refuser(text),
  public.famille_retirer(), public.famille_quitter(), public.famille_voir_invitation(text), public.famille_mon_etat(),
  public.hype_droits(uuid), public.famille_de_moi() to authenticated;
-- Ouvrir / mettre à jour une famille, savoir si un compte est en famille : uniquement le serveur (clé secrète), jamais l'appli.
grant execute on function public.famille_ouvrir(uuid, text, text, timestamptz, timestamptz),
  public.famille_maj(text, text, timestamptz, timestamptz), public.famille_du_compte(uuid) to service_role;
