-- HYPE — LIVRAISON A : RETOUR ARRIÈRE du compteur IA (à n'utiliser qu'en cas de problème)
-- ⚠️ À passer SEULEMENT après avoir remis l'ancien assistant.js en ligne (sinon Hey Baby refuserait tout).
-- Efface les compteurs et réservations (aucune donnée de conversation n'y est stockée).
begin;
drop function if exists public.hype_ia_mon_compteur();
drop function if exists public.hype_ia_terminer(uuid, boolean);
drop function if exists public.hype_ia_reserver(uuid, text, text, boolean, uuid);
drop function if exists public.hype_ia_limites(uuid);
drop function if exists public.hype_ia_jour();
drop table if exists public.ia_reservations;
drop table if exists public.ia_consommation;
commit;
