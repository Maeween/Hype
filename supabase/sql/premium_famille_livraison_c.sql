-- ═══════════════════════════════════════════════════════════════════════════
-- HYPE — PREMIUM FAMILLE, LIVRAISON C : PAIEMENTS STRIPE PAR PÉRIODE PAYÉE
-- PASSÉ EN PRODUCTION le 15/10/2026 vers 0 h 50 par Claude, avec l'accord de Blandine (« Essaye de le faire toi même »).
-- L'outil refusant les « drop function », les anciennes fonctions ont été RENOMMÉES
-- (famille_ouvrir_avant_c, famille_maj_avant_c) et fermées à tous, au lieu d'être supprimées.
-- Vérification en lecture seule : 9/9 OK.
-- Retour arrière : premium_famille_livraison_c_retour_arriere.sql
-- Sans effet sur les abonnés actuels : aucune famille n'existe, le relais Stripe
-- ne parle pas aux tables Famille tant que Premium Famille n'est pas en vente.
--
-- Pourquoi : la date d'un message Stripe est à la seconde près. Un paiement et un
-- refus reçus dans la même seconde, ou un vieux message rejoué, pouvaient suspendre
-- une famille qui avait payé. On se fie désormais à la PÉRIODE réellement payée
-- (période des lignes de la facture), pas à l'heure du message.
--
-- Règles :
--   · payé    : compte seulement si la période payée est PLUS RÉCENTE que la dernière
--               payée ; la date de fin ne recule jamais ; un impayé n'est levé que si
--               le paiement couvre au moins la période refusée.
--   · refusé  : ne suspend que si la période refusée n'est PAS déjà payée
--               (refus de la même seconde, vieux refus, refus d'un ajustement en
--               cours de mois sur une période déjà réglée → ignoré, noté au journal).
--   · résilié : toujours définitif (une famille résiliée ne revient jamais).
--   · Sans période connue : anciennes règles (date du message), inchangées.
--   · Remboursement ou avoir : JAMAIS d'action automatique ; une ligne « à vérifier ».
-- ═══════════════════════════════════════════════════════════════════════════
begin;

alter table public.familles add column if not exists periode_payee_fin timestamptz;   -- fin de la dernière période payée
alter table public.familles add column if not exists periode_refusee_fin timestamptz; -- fin de la période dont le paiement a été refusé

-- Nouvelle sorte d'alerte : remboursement ou avoir sur une famille (décision humaine).
alter table public.paiements_a_verifier drop constraint if exists paiements_a_verifier_anomalie_check;
alter table public.paiements_a_verifier add constraint paiements_a_verifier_anomalie_check
  check (anomalie in ('offre_inconnue','double_abonnement','paiement_non_confirme','changement_formule',
                      'compte_supprime_abonnement_actif','remboursement_ou_avoir'));

-- Ouverture : retient aussi la période payée par la première facture (si connue).
drop function if exists public.famille_ouvrir(uuid, text, text, timestamptz, timestamptz);
create or replace function public.famille_ouvrir(p_titulaire uuid, p_sub text, p_customer text, p_expire timestamptz,
                                                 p_evenement_le timestamptz default null, p_periode_fin timestamptz default null)
returns text
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_f uuid; v_exist public.familles;
begin
  if p_sub is not null then
    select * into v_exist from public.familles where stripe_subscription = p_sub for update;
    if v_exist.id is not null then
      -- même abonnement déjà ouvert (message en double, ou facture arrivée avant la fin du paiement) :
      -- on complète seulement la période payée si on ne l'avait pas encore.
      if p_periode_fin is not null and v_exist.statut <> 'annule'
         and (v_exist.periode_payee_fin is null or p_periode_fin > v_exist.periode_payee_fin) then
        update public.familles set periode_payee_fin = p_periode_fin,
               expire_le = greatest(coalesce(expire_le, p_expire), p_expire), maj_le = now() where id = v_exist.id;
      end if;
      return 'deja';
    end if;
  end if;
  if exists (select 1 from public.familles where titulaire_id = p_titulaire and statut in ('actif','impaye')
              and (expire_le is null or expire_le > now())) then return 'autre_famille'; end if;
  update public.familles set statut = 'annule', maj_le = now() where titulaire_id = p_titulaire and statut in ('actif','impaye');
  insert into public.familles (titulaire_id, stripe_subscription, stripe_customer, statut, expire_le, stripe_evenement_le, periode_payee_fin)
  values (p_titulaire, p_sub, p_customer, 'actif', p_expire, p_evenement_le, p_periode_fin) returning id into v_f;
  insert into public.famille_membres (famille_id, user_id, role, statut, active_le) values (v_f, p_titulaire, 'titulaire', 'actif', now());
  insert into public.famille_journal (famille_id, acteur, action, detail) values (v_f, p_titulaire, 'ouverture', p_sub);
  return 'cree';
end $$;

-- Mise à jour : rend 1 si l'abonnement est une famille (même si le message est ignoré), 0 sinon.
drop function if exists public.famille_maj(text, text, timestamptz, timestamptz);
create or replace function public.famille_maj(p_sub text, p_statut text, p_expire timestamptz default null,
                                              p_evenement_le timestamptz default null, p_periode_fin timestamptz default null)
returns integer
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_f public.familles; v_action text; v_paye timestamptz;
begin
  if p_statut not in ('actif','impaye','annule') then raise exception 'STATUT_INVALIDE'; end if;
  select * into v_f from public.familles where stripe_subscription = p_sub for update;
  if v_f.id is null then return 0; end if;
  v_paye := coalesce(v_f.periode_payee_fin, '-infinity'::timestamptz);

  if v_f.statut = 'annule' then
    v_action := 'ignore_deja_resiliee';

  elsif p_statut = 'annule' then
    update public.familles set statut = 'annule', maj_le = now(),
           stripe_evenement_le = greatest(stripe_evenement_le, p_evenement_le) where id = v_f.id;
    v_action := 'stripe_annule';

  elsif p_periode_fin is not null then
    -- ═══ Règles par période payée (livraison C) ═══
    if p_statut = 'impaye' then
      if p_periode_fin <= v_paye then
        v_action := 'ignore_periode_deja_payee';
      elsif v_f.statut = 'impaye' then
        update public.familles set periode_refusee_fin = greatest(periode_refusee_fin, p_periode_fin), maj_le = now() where id = v_f.id;
        v_action := 'ignore_deja_impaye';
      else
        update public.familles set statut = 'impaye', periode_refusee_fin = p_periode_fin, maj_le = now(),
               stripe_evenement_le = greatest(stripe_evenement_le, p_evenement_le) where id = v_f.id;
        v_action := 'stripe_impaye';
      end if;
    else -- 'actif'
      if p_periode_fin <= v_paye then
        v_action := 'ignore_periode_ancienne';
      else
        update public.familles set
               periode_payee_fin = p_periode_fin,
               expire_le = case when p_expire is null then expire_le else greatest(coalesce(expire_le, p_expire), p_expire) end,
               statut = case when statut = 'impaye' and periode_refusee_fin is not null and p_periode_fin < periode_refusee_fin
                             then 'impaye' else 'actif' end,
               maj_le = now(), stripe_evenement_le = greatest(stripe_evenement_le, p_evenement_le)
         where id = v_f.id;
        v_action := case when v_f.statut = 'impaye' and v_f.periode_refusee_fin is not null and p_periode_fin < v_f.periode_refusee_fin
                         then 'paye_mais_periode_refusee_reste_due' else 'stripe_actif' end;
      end if;
    end if;

  -- ═══ Sans période connue : règles d'avant (date du message) ═══
  elsif p_evenement_le is not null and v_f.stripe_evenement_le is not null and p_evenement_le < v_f.stripe_evenement_le then
    v_action := 'ignore_message_ancien';
  elsif p_statut = 'impaye' then
    if v_f.statut = 'actif' then
      update public.familles set statut = 'impaye', maj_le = now(),
             stripe_evenement_le = greatest(stripe_evenement_le, p_evenement_le) where id = v_f.id;
      v_action := 'stripe_impaye';
    else v_action := 'ignore_deja_impaye'; end if;
  else
    if p_expire is not null and (v_f.expire_le is null or p_expire > v_f.expire_le) then
      update public.familles set statut = 'actif', expire_le = p_expire, maj_le = now(),
             stripe_evenement_le = greatest(stripe_evenement_le, p_evenement_le) where id = v_f.id;
      v_action := 'stripe_actif';
    else v_action := 'ignore_periode_ancienne'; end if;
  end if;

  insert into public.famille_journal (famille_id, action, detail) values (v_f.id, v_action, p_sub);
  return 1;
end $$;

-- Retrouver la famille d'un client Stripe (remboursement / avoir) : serveur seulement.
create or replace function public.famille_par_client(p_customer text) returns text
language sql stable security definer set search_path = public, pg_temp as $$
  select stripe_subscription from public.familles where stripe_customer = p_customer
   order by cree_le desc limit 1;
$$;

revoke all on function public.famille_ouvrir(uuid, text, text, timestamptz, timestamptz, timestamptz),
  public.famille_maj(text, text, timestamptz, timestamptz, timestamptz),
  public.famille_par_client(text) from public, anon, authenticated;
grant execute on function public.famille_ouvrir(uuid, text, text, timestamptz, timestamptz, timestamptz),
  public.famille_maj(text, text, timestamptz, timestamptz, timestamptz),
  public.famille_par_client(text) to service_role;

commit;
