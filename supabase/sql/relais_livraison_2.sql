-- Relais Stripe, livraison 2 (PASSÉ EN PRODUCTION le 15/10/2026, accord de Blandine « 1 et 2 »)
-- 1) nouveau type d'alerte « litige »   2) table des messages Stripe déjà traités (anti-doublon)
begin;
alter table public.paiements_a_verifier drop constraint if exists paiements_a_verifier_anomalie_check;
alter table public.paiements_a_verifier add constraint paiements_a_verifier_anomalie_check
  check (anomalie in ('offre_inconnue','double_abonnement','paiement_non_confirme','changement_formule','compte_supprime_abonnement_actif','remboursement_ou_avoir','litige'));
create table if not exists public.relais_evenements_traites (
  stripe_event_id text primary key,
  type_evenement text,
  recu_le timestamptz not null default now()
);
alter table public.relais_evenements_traites enable row level security;
revoke all on public.relais_evenements_traites from anon, authenticated;
commit;
