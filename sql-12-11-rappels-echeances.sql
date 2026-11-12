-- HYPE ▸ 12/11/2026 — RAPPELS D'ÉCHÉANCE (Blandine, 18 h 27 : « Ok, continue… des rappels d'échéance, même pour les contrôles
-- techniques, etc. … les assurances »).
-- Chaque matin (7 h 15, heure de Paris l'hiver), Hype dépose une notification « À renouveler » UNE fois par échéance, dans le mois qui précède :
--   • coffre (coffre_documents.echeance)         → au propriétaire du document (et on note rappel_le) ;
--   • véhicules de l'écurie (ecurie_vehicules : ct_prochain = contrôle technique, assurance_fin = assurance)
--   • documents de l'écurie (registre_documents.valable_jusqu : assurances, attestations…)
--                                                → aux responsables de l'écurie (clubs_revendiques + club_gestionnaires).
-- Notification : type « echeance », cible « coffre:<id> » / « vehicule:<id>:ct|assurance:<date> » / « registre:<id>:<date> »,
-- extrait « <nom>|<date> », contexte = écurie (ou « docs » / « coffre » pour le coffre). Dans la cloche de l'appli seulement
-- (pas d'envoi sur le téléphone pour l'instant). Aucune table créée, aucun droit modifié.

create or replace function public.hype_rappels_echeances()
returns integer language plpgsql security definer set search_path to 'public' as $$
declare n integer := 0; k integer;
begin
  -- 1. coffre
  with a as (
    select d.id, d.proprietaire, d.echeance, coalesce(nullif(d.titre, ''), d.type) nom,
           case when d.type in ('contrat','compta','famille','identite','diplomes','autre_perso') or d.type like 'c:coffre:%' then 'coffre' else 'docs' end esp
    from coffre_documents d
    where d.echeance is not null and d.rappel_le is null and d.echeance between current_date and current_date + 30),
  i as (insert into notifications (destinataire, acteur, type, cible, extrait, contexte)
        select a.proprietaire, null, 'echeance', 'coffre:' || a.id, left(a.nom, 80) || '|' || a.echeance, a.esp from a returning 1),
  u as (update coffre_documents set rappel_le = now() where id in (select id from a) returning 1)
  select count(*) into k from i; n := n + k;

  -- 2. véhicules et documents de l'écurie → responsables
  with resp as (
    select cr.clef club, us.id uid from clubs_revendiques cr join auth.users us on lower(us.email) = lower(cr.email)
    union select g.club_clef, g.user_id from club_gestionnaires g),
  e as (
    select v.club_clef club, 'vehicule:' || v.id || ':ct:' || v.ct_prochain cible, 'Contrôle technique · ' || coalesce(nullif(v.nom, ''), v.immatriculation, 'véhicule') nom, v.ct_prochain d
      from ecurie_vehicules v where v.ct_prochain between current_date and current_date + 30
    union all
    select v.club_clef, 'vehicule:' || v.id || ':assurance:' || v.assurance_fin, 'Assurance · ' || coalesce(nullif(v.nom, ''), v.immatriculation, 'véhicule'), v.assurance_fin
      from ecurie_vehicules v where v.assurance_fin between current_date and current_date + 30
    union all
    select r.club_clef, 'registre:' || r.id || ':' || r.valable_jusqu, coalesce(nullif(r.titre, ''), r.type), r.valable_jusqu
      from registre_documents r where r.valable_jusqu between current_date and current_date + 30),
  i2 as (insert into notifications (destinataire, acteur, type, cible, extrait, contexte)
         select resp.uid, null, 'echeance', e.cible, left(e.nom, 80) || '|' || e.d, e.club
         from e join resp on resp.club = e.club
         where not exists (select 1 from notifications x where x.destinataire = resp.uid and x.type = 'echeance' and x.cible = e.cible)
         returning 1)
  select count(*) into k from i2; n := n + k;
  return n;
end $$;
revoke all on function public.hype_rappels_echeances() from public, anon, authenticated;

select cron.schedule('rappels-echeances-quotidien', '15 6 * * *', 'select public.hype_rappels_echeances()');
