-- HYPE — Premium Famille, RETOUR ARRIÈRE de la livraison C (remet les fonctions d'avant).
-- À passer seulement si la livraison C pose problème. Aucune famille n'est supprimée.
-- En production (15/10, 0 h 50), les anciennes fonctions n'ont pas été supprimées mais RENOMMÉES
-- famille_ouvrir_avant_c / famille_maj_avant_c (et fermées à tous) : on les remet simplement en place.
begin;
drop function if exists public.famille_par_client(text);
drop function if exists public.famille_ouvrir(uuid, text, text, timestamptz, timestamptz, timestamptz);
drop function if exists public.famille_maj(text, text, timestamptz, timestamptz, timestamptz);
alter function public.famille_ouvrir_avant_c(uuid, text, text, timestamptz, timestamptz) rename to famille_ouvrir;
alter function public.famille_maj_avant_c(text, text, timestamptz, timestamptz) rename to famille_maj;
revoke all on function public.famille_ouvrir(uuid, text, text, timestamptz, timestamptz),
  public.famille_maj(text, text, timestamptz, timestamptz) from public, anon, authenticated;
grant execute on function public.famille_ouvrir(uuid, text, text, timestamptz, timestamptz),
  public.famille_maj(text, text, timestamptz, timestamptz) to service_role;
-- Les alertes « remboursement_ou_avoir » éventuelles sont gardées (la contrainte reste élargie).
alter table public.familles drop column if exists periode_refusee_fin;
alter table public.familles drop column if exists periode_payee_fin;
commit;
