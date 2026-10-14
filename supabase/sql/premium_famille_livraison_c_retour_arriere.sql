-- HYPE — Premium Famille, RETOUR ARRIÈRE de la livraison C (remet les fonctions d'avant).
-- À passer seulement si la livraison C pose problème. Aucune famille n'est supprimée.
begin;
drop function if exists public.famille_par_client(text);
drop function if exists public.famille_ouvrir(uuid, text, text, timestamptz, timestamptz, timestamptz);
drop function if exists public.famille_maj(text, text, timestamptz, timestamptz, timestamptz);
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
revoke all on function public.famille_ouvrir(uuid, text, text, timestamptz, timestamptz),
  public.famille_maj(text, text, timestamptz, timestamptz) from public, anon, authenticated;
grant execute on function public.famille_ouvrir(uuid, text, text, timestamptz, timestamptz),
  public.famille_maj(text, text, timestamptz, timestamptz) to service_role;
-- Les alertes « remboursement_ou_avoir » éventuelles sont gardées (la contrainte reste élargie).
alter table public.familles drop column if exists periode_refusee_fin;
alter table public.familles drop column if exists periode_payee_fin;
commit;
