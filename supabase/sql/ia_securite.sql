-- ═══════════════════════════════════════════════════════════════════════════
-- HYPE — LIVRAISON A : SÉCURITÉ DE HEY BABY (compteur IA côté serveur)
-- PROPOSÉ, NON EXÉCUTÉ. À passer par Blandine UNIQUEMENT après validation,
-- AVANT la publication du nouveau assistant.js (qui en dépend).
-- Retour arrière : ia_securite_retour_arriere.sql (même dossier).
--
-- Principe : seul le serveur (clé secrète) lit et écrit ces tables. L'appli
-- n'y a AUCUN accès direct. Aucun contenu de conversation n'est stocké ici :
-- seulement « qui, quoi, quand, dans quel état ».
-- Journée : de minuit à minuit, heure de Paris (changements d'heure compris).
-- Dépend de hype_droits() (installée avec Premium Famille le 14/10/2026).
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. COMPTEUR DU JOUR : une ligne par compte et par jour.
create table if not exists public.ia_consommation (
  user_id uuid not null,
  jour date not null,
  questions integer not null default 0 check (questions >= 0),
  outils integer not null default 0 check (outils >= 0),
  maj_le timestamptz not null default now(),
  primary key (user_id, jour)
);

-- 2. RÉSERVATIONS : une ligne par appel à l'IA (traçable, sans contenu).
create table if not exists public.ia_reservations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  jour date not null,
  operation text not null,                 -- question, perception, lecture_horaires, lecture_ordre, lecture_palmares, lecture_pedigree, memoire
  categorie text not null check (categorie in ('question','outil')),
  avec_media boolean not null default false,
  parent_id uuid references public.ia_reservations(id),   -- 2e étape d'une question photo (ne compte pas une 2e fois)
  statut text not null default 'reservee' check (statut in ('reservee','consommee','restituee')),
  cree_le timestamptz not null default now(),
  maj_le timestamptz not null default now()
);
create index if not exists ia_reservations_par_compte on public.ia_reservations(user_id, cree_le);
-- Une question photo n'a qu'UNE 2e étape.
create unique index if not exists ia_reservations_une_suite on public.ia_reservations(parent_id) where parent_id is not null;

alter table public.ia_consommation enable row level security;
alter table public.ia_reservations enable row level security;
revoke all on public.ia_consommation, public.ia_reservations from anon, authenticated;

-- 3. Le jour de Paris (minuit à minuit, heure d'été comprise).
create or replace function public.hype_ia_jour() returns date
language sql stable set search_path = pg_catalog as $$
  select (now() at time zone 'Europe/Paris')::date;
$$;

-- 4. Les limites d'un compte, calculées UNIQUEMENT depuis la base.
--    Questions : 1 gratuit / 4 Premium, Crystal, Famille / 15 Hype IA / 20 Duo (hype_droits) ; modératrices sans limite.
--    Outils (lecture de captures, mémoire) : plafond de départ 30 par jour (hypothèse de test, à valider).
create or replace function public.hype_ia_limites(p_uid uuid,
  out questions integer, out outils integer, out illimite boolean)
language plpgsql stable security definer set search_path = public, auth, pg_temp as $$
begin
  select coalesce((select lower(email) in ('feinn@live.fr','malicia2008@hotmail.fr') from auth.users where id = p_uid), false)
    into illimite;
  select d.questions_ia into questions from public.hype_droits(p_uid) d;
  questions := coalesce(questions, 1);
  outils := 30;
end $$;

-- 5. RÉSERVER une utilisation AVANT l'appel à l'IA (atomique).
--    Rend {ok:true, id, utilisees, limite} ou {ok:false, code: QUOTA_ATTEINT | TROP_RAPIDE | SUITE_INVALIDE, ...}.
--    p_parent : réservation de la 1re étape d'une question photo → la 2e étape ne compte pas à nouveau.
create or replace function public.hype_ia_reserver(p_uid uuid, p_operation text, p_categorie text,
                                                   p_avec_media boolean default false, p_parent uuid default null)
returns jsonb
language plpgsql security definer set search_path = public, pg_temp as $$
declare
  v_jour date := public.hype_ia_jour();
  v_lim record; v_n integer; v_id uuid; v_recent integer; v_p public.ia_reservations;
begin
  if p_uid is null then return jsonb_build_object('ok', false, 'code', 'AUTH_REQUIRED'); end if;
  if p_categorie not in ('question','outil') then return jsonb_build_object('ok', false, 'code', 'OPERATION_INVALIDE'); end if;

  -- Une seule réservation à la fois par compte : deux requêtes simultanées passent l'une après l'autre.
  perform pg_advisory_xact_lock(hashtextextended('hype_ia:' || p_uid::text, 0));

  -- Anti-rafale (par compte, valable quel que soit le nombre de serveurs Netlify) : 8 appels par minute.
  select count(*) into v_recent from public.ia_reservations
   where user_id = p_uid and cree_le > now() - interval '1 minute';
  if v_recent >= 8 then return jsonb_build_object('ok', false, 'code', 'TROP_RAPIDE'); end if;

  -- 2e étape d'une question photo : rattachée à la 1re, sans nouveau décompte.
  if p_parent is not null then
    select * into v_p from public.ia_reservations where id = p_parent for update;
    if v_p.id is null or v_p.user_id <> p_uid or v_p.categorie <> 'question' or v_p.parent_id is not null
       or v_p.statut <> 'consommee' or v_p.cree_le < now() - interval '15 minutes'
       or exists (select 1 from public.ia_reservations where parent_id = p_parent) then
      return jsonb_build_object('ok', false, 'code', 'SUITE_INVALIDE');
    end if;
    insert into public.ia_reservations (user_id, jour, operation, categorie, avec_media, parent_id)
    values (p_uid, v_p.jour, p_operation, 'question', p_avec_media, p_parent) returning id into v_id;
    select questions into v_n from public.ia_consommation where user_id = p_uid and jour = v_p.jour;
    select * into v_lim from public.hype_ia_limites(p_uid);
    return jsonb_build_object('ok', true, 'id', v_id, 'utilisees', coalesce(v_n, 0),
                              'limite', case when v_lim.illimite then null else v_lim.questions end);
  end if;

  select * into v_lim from public.hype_ia_limites(p_uid);
  insert into public.ia_consommation (user_id, jour) values (p_uid, v_jour) on conflict do nothing;
  if p_categorie = 'question' then
    update public.ia_consommation set questions = questions + 1, maj_le = now()
     where user_id = p_uid and jour = v_jour and (v_lim.illimite or questions < v_lim.questions)
     returning questions into v_n;
    if v_n is null then
      select questions into v_n from public.ia_consommation where user_id = p_uid and jour = v_jour;
      return jsonb_build_object('ok', false, 'code', 'QUOTA_ATTEINT', 'utilisees', v_n, 'limite', v_lim.questions);
    end if;
  else
    update public.ia_consommation set outils = outils + 1, maj_le = now()
     where user_id = p_uid and jour = v_jour and (v_lim.illimite or outils < v_lim.outils)
     returning outils into v_n;
    if v_n is null then
      select outils into v_n from public.ia_consommation where user_id = p_uid and jour = v_jour;
      return jsonb_build_object('ok', false, 'code', 'QUOTA_OUTILS_ATTEINT', 'utilisees', v_n, 'limite', v_lim.outils);
    end if;
  end if;
  insert into public.ia_reservations (user_id, jour, operation, categorie, avec_media)
  values (p_uid, v_jour, p_operation, p_categorie, p_avec_media) returning id into v_id;
  return jsonb_build_object('ok', true, 'id', v_id, 'utilisees', v_n,
    'limite', case when v_lim.illimite then null when p_categorie = 'question' then v_lim.questions else v_lim.outils end);
end $$;

-- 6. TERMINER une réservation : consommée (l'IA a répondu, même partiellement) ou restituée
--    (échec AVANT toute réponse). Une réservation ne change d'état qu'UNE fois ; le compteur
--    ne descend jamais sous zéro. Si la 2e étape d'une question photo échoue avant toute
--    réponse, la question entière est rendue (1re étape comprise), une seule fois.
create or replace function public.hype_ia_terminer(p_id uuid, p_consommee boolean) returns jsonb
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_r public.ia_reservations; v_p public.ia_reservations; v_rendue uuid;
begin
  select * into v_r from public.ia_reservations where id = p_id for update;
  if v_r.id is null then return jsonb_build_object('ok', false, 'code', 'INCONNUE'); end if;
  if v_r.statut <> 'reservee' then return jsonb_build_object('ok', true, 'deja', v_r.statut); end if;
  update public.ia_reservations set statut = case when p_consommee then 'consommee' else 'restituee' end, maj_le = now()
   where id = p_id;
  if p_consommee then return jsonb_build_object('ok', true, 'statut', 'consommee'); end if;

  if v_r.parent_id is null then
    v_rendue := v_r.id;
  else
    -- 2e étape sans réponse : on rend la question d'origine (si elle ne l'a pas déjà été).
    select * into v_p from public.ia_reservations where id = v_r.parent_id for update;
    if v_p.statut = 'consommee' then
      update public.ia_reservations set statut = 'restituee', maj_le = now() where id = v_p.id;
      v_rendue := v_p.id;
    end if;
  end if;
  if v_rendue is not null then
    select * into v_p from public.ia_reservations where id = v_rendue;
    if v_p.categorie = 'question' then
      update public.ia_consommation set questions = greatest(questions - 1, 0), maj_le = now()
       where user_id = v_p.user_id and jour = v_p.jour;
    else
      update public.ia_consommation set outils = greatest(outils - 1, 0), maj_le = now()
       where user_id = v_p.user_id and jour = v_p.jour;
    end if;
  end if;
  return jsonb_build_object('ok', true, 'statut', 'restituee');
end $$;

-- 7. LE COMPTEUR POUR L'AFFICHAGE (appli) : uniquement le sien.
create or replace function public.hype_ia_mon_compteur() returns jsonb
language plpgsql stable security definer set search_path = public, pg_temp as $$
declare v_lim record; v_c public.ia_consommation;
begin
  if auth.uid() is null then return null; end if;
  select * into v_lim from public.hype_ia_limites(auth.uid());
  select * into v_c from public.ia_consommation where user_id = auth.uid() and jour = public.hype_ia_jour();
  return jsonb_build_object('jour', public.hype_ia_jour(), 'questions', coalesce(v_c.questions, 0),
    'limite', case when v_lim.illimite then null else v_lim.questions end);
end $$;

-- 8. DROITS : tout est fermé à l'appli, sauf la lecture de SON compteur.
revoke all on function public.hype_ia_limites(uuid), public.hype_ia_reserver(uuid, text, text, boolean, uuid),
  public.hype_ia_terminer(uuid, boolean), public.hype_ia_mon_compteur() from public, anon, authenticated;
grant execute on function public.hype_ia_reserver(uuid, text, text, boolean, uuid),
  public.hype_ia_terminer(uuid, boolean) to service_role;
grant execute on function public.hype_ia_mon_compteur() to authenticated;
