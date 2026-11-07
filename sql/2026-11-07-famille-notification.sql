-- 07/11/2026 — PREMIUM FAMILLE : prévenir Blandine sur son iPhone à chaque nouvelle famille (comme les autres abonnements).
-- Pourquoi : le Premium Famille est en vente depuis le 15/10, mais il est rangé dans « familles », pas dans
-- « abonnements_premium ». Les règles qui envoient « 🎉 Nouvel abonnement » (hype_abonnement_a_notifier /
-- hype_abonnement_annoncer, 09/10) ne regardent que abonnements_premium : un achat Famille ne la prévenait pas,
-- et n'apparaissait pas non plus dans le journal des abonnements de Mon compte.
-- Ce que fait ce SQL (rien d'autre) :
--   1. une colonne familles.notifie_le (vide = pas encore annoncée) ;
--   2. les familles DÉJÀ existantes sont marquées comme annoncées (aucune vieille annonce envoyée d'un coup) ;
--   3. une règle après la création d'une famille : une ligne dans abonnements_journal (plan « famille »)
--      et l'appel de la fonction notifier-abonnement, qui envoie « 🎉 Nouvel abonnement — Premium Famille — <pseudo> ».
-- Aucun droit changé, aucun paiement touché. Peut être repassé sans danger (if not exists / or replace).

alter table public.familles add column if not exists notifie_le timestamptz;
update public.familles set notifie_le = coalesce(notifie_le, now()) where notifie_le is null;

create or replace function public.hype_famille_annoncer() returns trigger
language plpgsql security definer set search_path to 'public' as $$
begin
  if new.statut = 'actif' then
    insert into public.abonnements_journal (user_id, motif, plan, ancien_plan, statut)
    values (new.titulaire_id, 'nouveau', 'famille', null, new.statut);
    begin
      perform net.http_post(
        url := 'https://ldpjebgtskzdokrublfg.supabase.co/functions/v1/notifier-abonnement',
        body := '{}'::jsonb);
    exception when others then raise warning 'notifier-abonnement non appelée (famille) : %', sqlerrm;
    end;
  end if;
  return null;
end $$;

drop trigger if exists famille_annoncer on public.familles;
create trigger famille_annoncer after insert on public.familles
  for each row execute function public.hype_famille_annoncer();
