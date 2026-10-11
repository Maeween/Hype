-- 11/10/2026 (build 967) — Hype · abonnements pris dans l'APPLI IPHONE (Apple, via RevenueCat)
-- À PASSER PAR BLANDINE dans Supabase → SQL Editor, AVANT de mettre en ligne la fonction revenuecat-webhook.
-- Ce que ça fait : ajoute UNE colonne « source » à abonnements_premium pour savoir d'où vient l'abonnement.
--   'stripe' = pris sur le site (valeur par défaut : toutes les lignes actuelles deviennent 'stripe')
--   'apple'  = pris dans l'appli iPhone
-- Rien d'autre ne change : mêmes lignes, mêmes droits (RLS inchangée), même lecture par l'appli.
alter table public.abonnements_premium
  add column if not exists source text not null default 'stripe';

-- Vérification (doit renvoyer une ligne « source | text | 'stripe'::text »)
select column_name, data_type, column_default
from information_schema.columns
where table_schema = 'public' and table_name = 'abonnements_premium' and column_name = 'source';
