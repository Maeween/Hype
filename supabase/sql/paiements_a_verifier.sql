-- 14/10/2026 — Table des paiements à vérifier à la main (relais Stripe, livraison 1).
-- DÉJÀ EXÉCUTÉ le 14/10/2026 (accord de Blandine). Fichier conservé pour mémoire.
create table if not exists public.paiements_a_verifier (
  id bigint generated always as identity primary key,
  stripe_event_id text not null unique,
  type_evenement text not null,
  reference_stripe text,
  identifiant_offre text,
  user_id uuid,
  email text,
  montant_centimes integer,
  anomalie text not null check (anomalie in ('offre_inconnue','double_abonnement','paiement_non_confirme','changement_formule')),
  statut text not null default 'a_verifier' check (statut in ('a_verifier','en_cours','resolu')),
  note text,
  cree_le timestamptz not null default now(),
  maj_le timestamptz not null default now()
);
alter table public.paiements_a_verifier enable row level security;
revoke all on table public.paiements_a_verifier from anon, authenticated;
