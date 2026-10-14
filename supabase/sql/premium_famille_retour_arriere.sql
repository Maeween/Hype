-- ═══════════════════════════════════════════════════════════════════════════
-- HYPE — PREMIUM FAMILLE : RETOUR ARRIÈRE (à n'utiliser qu'en cas de problème)
-- Remet la base exactement comme avant premium_famille.sql.
-- ⚠️ Efface les familles, membres, journal et essais : à ne passer que si
--    Famille n'est pas encore en vente (sinon, en parler d'abord).
-- L'appli et le relais publiés supportent l'absence de ces tables (ils ignorent l'erreur).
-- ═══════════════════════════════════════════════════════════════════════════
begin;

-- 1. hype_est_premium : version en ligne du 14/10/2026, recopiée à l'identique (sans la famille)
create or replace function public.hype_est_premium(p_uid uuid default auth.uid())
 returns boolean
 language plpgsql
 stable security definer
 set search_path to 'public', 'auth', 'pg_temp'
as $function$
begin
  if p_uid is null then return false; end if;
  -- on ne renseigne que sur soi-même, sauf pour une modératrice
  if p_uid <> auth.uid() and not public.hype_est_moderatrice() then return null; end if;
  return exists (select 1 from public.abonnements_premium a
                  where a.user_id = p_uid and a.statut = 'actif'
                    and a.plan in ('mensuel','annuel','duo')
                    and (a.expire_le is null or a.expire_le > now()))
      or exists (select 1 from auth.users u join public.hype_ambassadeurs h
                   on lower(h.email) = lower(u.email) where u.id = p_uid)
      or exists (select 1 from auth.users u where u.id = p_uid
                   and lower(u.email) in ('feinn@live.fr','malicia2008@hotmail.fr'));
end $function$;

-- 2. Fonctions Famille
drop function if exists public.famille_inviter();
drop function if exists public.famille_accepter(text);
drop function if exists public.famille_refuser(text);
drop function if exists public.famille_retirer();
drop function if exists public.famille_quitter();
drop function if exists public.famille_voir_invitation(text);
drop function if exists public.famille_mon_etat();
drop function if exists public.famille_controle_code(text);
drop function if exists public.famille_ouvrir(uuid, text, text, timestamptz, timestamptz);
drop function if exists public.famille_maj(text, text, timestamptz, timestamptz);
drop function if exists public.famille_du_compte(uuid);
drop function if exists public.hype_droits(uuid);

-- 3. Tables Famille (le déclencheur et les règles de lecture partent avec)
drop table if exists public.famille_essais;
drop table if exists public.famille_journal;
drop table if exists public.famille_membres;
drop table if exists public.familles;
drop function if exists public.famille_fin_rattachements();
drop function if exists public.famille_de_moi();

-- 4. Anomalies : liste d'origine (on garde d'abord les lignes déjà créées avec la nouvelle sorte)
update public.paiements_a_verifier set anomalie = 'double_abonnement',
       note = coalesce(note || ' · ', '') || 'ex-compte_supprime_abonnement_actif'
 where anomalie = 'compte_supprime_abonnement_actif';
alter table public.paiements_a_verifier drop constraint if exists paiements_a_verifier_anomalie_check;
alter table public.paiements_a_verifier add constraint paiements_a_verifier_anomalie_check
  check (anomalie in ('offre_inconnue','double_abonnement','paiement_non_confirme','changement_formule'));

commit;
