-- Tests de la livraison C (périodes payées) — base de test locale uniquement.
\set QUIET on
\pset format unaligned
\pset tuples_only on
create temp table res (n serial, nom text, attendu text, obtenu text);
create or replace function pg_temp.t(p_nom text, p_sql text, p_att text) returns void language plpgsql as $$
declare v text;
begin
  begin execute p_sql into v; exception when others then v := 'ERREUR ' || sqlerrm; end;
  insert into res(nom,attendu,obtenu) values (p_nom, p_att, coalesce(v,'(vide)'));
end $$;
create or replace function pg_temp.etat(p_sub text) returns text language sql as $$
  select statut || '|' || coalesce(to_char(periode_payee_fin,'MMDD'),'-') || '|' || coalesce(to_char(periode_refusee_fin,'MMDD'),'-')
    from familles where stripe_subscription = p_sub $$;
create or replace function pg_temp.der(p_sub text) returns text language sql as $$
  select j.action from famille_journal j join familles f on f.id = j.famille_id
   where f.stripe_subscription = p_sub order by j.id desc limit 1 $$;
-- Périodes fixes (indépendantes du jour du test) ; T = heure du message
\set A '00000000-0000-0000-0000-00000000000a'
\set D '00000000-0000-0000-0000-00000000000d'
\set G '00000000-0000-0000-0000-000000000010'
create temp table p (k text primary key, v timestamptz);
insert into p values ('P1','2027-01-31'),('P2','2027-02-28'),('P3','2027-03-31'),('P4','2027-04-30'),('P5','2027-05-31'),('T','2027-01-15 10:00:00');
grant all on p to public;

-- 1. Ouverture par la première facture : période retenue
select pg_temp.t('Ouverture avec période payée', $q$select famille_ouvrir('00000000-0000-0000-0000-00000000000a','sub_c',null,(select v from p where k='P1')+interval '2 days',(select v from p where k='T'),(select v from p where k='P1'))$q$, 'cree');
select pg_temp.t('  état', $q$select pg_temp.etat('sub_c')$q$, 'actif|0131|-');
-- 2. Le paiement de fin d'achat arrive après (sans période) : rien ne change
select pg_temp.t('Fin d''achat reçue après la facture → déjà ouverte', $q$select famille_ouvrir('00000000-0000-0000-0000-00000000000a','sub_c',null,now()+interval '32 days',(select v from p where k='T'))$q$, 'deja');
select pg_temp.t('  période gardée', $q$select pg_temp.etat('sub_c')$q$, 'actif|0131|-');

-- 3. CAS RÉEL : paiement de P2 et refus de P2 à la MÊME seconde, refus reçu après → reste active
select famille_maj('sub_c','actif',(select v from p where k='P2')+interval '2 days',(select v from p where k='T')+interval '30 days',(select v from p where k='P2'));
select pg_temp.t('Même seconde : refus d''une période déjà payée → famille active', $q$select famille_maj('sub_c','impaye',null,(select v from p where k='T')+interval '30 days',(select v from p where k='P2'))::text || '/' || pg_temp.etat('sub_c') || '/' || pg_temp.der('sub_c')$q$, '1/actif|0228|-/ignore_periode_deja_payee');
-- 4. Ajustement en cours de mois (prorata) : même fin de période → aucune prolongation, aucun recul
select pg_temp.t('Facture d''ajustement (prorata) même période → ignorée', $q$select famille_maj('sub_c','actif',(select v from p where k='P2')+interval '2 days',(select v from p where k='T')+interval '40 days',(select v from p where k='P2'))::text || '/' || pg_temp.der('sub_c')$q$, '1/ignore_periode_ancienne');
select pg_temp.t('Refus d''un ajustement sur période déjà payée → reste active', $q$select famille_maj('sub_c','impaye',null,(select v from p where k='T')+interval '41 days',(select v from p where k='P2'))::text || '/' || pg_temp.etat('sub_c')$q$, '1/actif|0228|-');
-- 5. Vrai refus de la période suivante → impayé
select pg_temp.t('Refus de P3 (non payée) → impayé', $q$select famille_maj('sub_c','impaye',null,(select v from p where k='T')+interval '60 days',(select v from p where k='P3'))::text || '/' || pg_temp.etat('sub_c')$q$, '1/impaye|0228|0331');
select pg_temp.t('  impayé = plus Premium', $q$select (select count(*) from familles where stripe_subscription='sub_c' and statut='actif')::text$q$, '0');
-- 6. Vieux paiement (P1) rejoué pendant l'impayé → reste impayé, la fin ne recule pas
select pg_temp.t('Vieux paiement rejoué → reste impayé, rien ne recule', $q$select famille_maj('sub_c','actif',(select v from p where k='P1'),(select v from p where k='T')+interval '61 days',(select v from p where k='P1'))::text || '/' || pg_temp.etat('sub_c') || '/' || to_char((select expire_le from familles where stripe_subscription='sub_c'),'MMDD')$q$, '1/impaye|0228|0331/0302');
-- 7. Message plus ANCIEN en heure mais période plus récente : la période fait foi
select pg_temp.t('Paiement de P3 avec une heure plus ancienne → active (la période fait foi)', $q$select famille_maj('sub_c','actif',(select v from p where k='P3')+interval '2 days',(select v from p where k='T'),(select v from p where k='P3'))::text || '/' || pg_temp.etat('sub_c')$q$, '1/actif|0331|0331');
-- 8. Vieux refus (P3) reçu après son paiement → ignoré
select pg_temp.t('Vieux refus reçu après le paiement → ignoré', $q$select famille_maj('sub_c','impaye',null,(select v from p where k='T')+interval '90 days',(select v from p where k='P3'))::text || '/' || pg_temp.etat('sub_c')$q$, '1/actif|0331|0331');
-- 9. Deux refus de suite puis paiement d'une période AVANT la dernière refusée → reste impayé
select famille_maj('sub_c','impaye',null,(select v from p where k='T')+interval '91 days',(select v from p where k='P4'));
select famille_maj('sub_c','impaye',null,(select v from p where k='T')+interval '92 days',(select v from p where k='P5'));
select pg_temp.t('Deux refus : la période refusée la plus récente est retenue', $q$select pg_temp.etat('sub_c')$q$, 'impaye|0331|0531');
select pg_temp.t('Paiement de P4 seulement (P5 toujours due) → reste impayé', $q$select famille_maj('sub_c','actif',(select v from p where k='P4')+interval '2 days',(select v from p where k='T')+interval '93 days',(select v from p where k='P4'))::text || '/' || pg_temp.etat('sub_c') || '/' || pg_temp.der('sub_c')$q$, '1/impaye|0430|0531/paye_mais_periode_refusee_reste_due');
select pg_temp.t('Paiement de P5 → active', $q$select famille_maj('sub_c','actif',(select v from p where k='P5')+interval '2 days',(select v from p where k='T')+interval '94 days',(select v from p where k='P5'))::text || '/' || pg_temp.etat('sub_c')$q$, '1/actif|0531|0531');
select pg_temp.t('  fin = période P5 + 2 jours de grâce', $q$select to_char((select expire_le from familles where stripe_subscription='sub_c'),'MMDD')$q$, '0602');
-- 10. Résiliation : définitive, même avec une heure de message plus ancienne
select pg_temp.t('Résiliation (heure ancienne) → résiliée quand même', $q$select famille_maj('sub_c','annule',null,(select v from p where k='T'))::text || '/' || pg_temp.etat('sub_c')$q$, '1/annule|0531|0531');
select pg_temp.t('Paiement après résiliation → reste résiliée', $q$select famille_maj('sub_c','actif',now()+interval '400 days',(select v from p where k='T')+interval '200 days',(select v from p where k='P5')+interval '60 days')::text || '/' || pg_temp.etat('sub_c')$q$, '1/annule|0531|0531');
select pg_temp.t('Première facture rejouée après résiliation → pas de réouverture', $q$select famille_ouvrir('00000000-0000-0000-0000-00000000000a','sub_c',null,now()+interval '30 days',null,(select v from p where k='P5')+interval '90 days') || '/' || pg_temp.etat('sub_c')$q$, 'deja/annule|0531|0531');

-- 11. Fin d'achat AVANT la première facture : la facture complète la période
select famille_ouvrir('00000000-0000-0000-0000-00000000000d','sub_d',null,now()+interval '32 days',(select v from p where k='T'));
select pg_temp.t('Achat sans période connue', $q$select pg_temp.etat('sub_d')$q$, 'actif|-|-');
select pg_temp.t('Puis 1re facture (même abonnement) → période complétée', $q$select famille_ouvrir('00000000-0000-0000-0000-00000000000d','sub_d',null,(select v from p where k='P1')+interval '2 days',(select v from p where k='T'),(select v from p where k='P1')) || '/' || pg_temp.etat('sub_d')$q$, 'deja/actif|0131|-');

-- 12. Sans période (anciens messages) : anciennes règles inchangées
select famille_ouvrir('00000000-0000-0000-0000-000000000010','sub_g',null,now()+interval '30 days',(select v from p where k='T'));
select pg_temp.t('Sans période : refus → impayé (comme avant)', $q$select famille_maj('sub_g','impaye',null,(select v from p where k='T')+interval '1 minute')::text || '/' || pg_temp.etat('sub_g')$q$, '1/impaye|-|-');
select pg_temp.t('Sans période : message plus ancien → ignoré (comme avant)', $q$select famille_maj('sub_g','actif',now()+interval '90 days',(select v from p where k='T'))::text || '/' || pg_temp.der('sub_g')$q$, '1/ignore_message_ancien');

-- 13. Remboursement / avoir : retrouver la famille par le client, alerte acceptée
update familles set stripe_customer = 'cus_c' where stripe_subscription = 'sub_c';
select pg_temp.t('Famille retrouvée par le client Stripe', $q$select famille_par_client('cus_c')$q$, 'sub_c');
select pg_temp.t('Client inconnu → rien', $q$select coalesce(famille_par_client('cus_x'),'(rien)')$q$, '(rien)');
select pg_temp.t('Alerte « remboursement_ou_avoir » acceptée', $q$select pg_get_constraintdef(oid) like '%remboursement_ou_avoir%' from pg_constraint where conname='paiements_a_verifier_anomalie_check'$q$, 'true');
select pg_temp.t('Abonnement inconnu → 0', $q$select famille_maj('sub_inconnu','actif',null,null,(select v from p where k='P1'))::text$q$, '0');

-- 14. Droits : fonctions serveur fermées à l'appli et aux visiteurs
select pg_temp.t('famille_maj (5) : refusée aux connectés', $q$select (not has_function_privilege('authenticated','public.famille_maj(text,text,timestamptz,timestamptz,timestamptz)','EXECUTE'))::text$q$, 'true');
select pg_temp.t('famille_ouvrir (6) : refusée aux connectés', $q$select (not has_function_privilege('authenticated','public.famille_ouvrir(uuid,text,text,timestamptz,timestamptz,timestamptz)','EXECUTE'))::text$q$, 'true');
select pg_temp.t('famille_par_client : refusée aux connectés et visiteurs', $q$select (not has_function_privilege('authenticated','public.famille_par_client(text)','EXECUTE') and not has_function_privilege('anon','public.famille_par_client(text)','EXECUTE'))::text$q$, 'true');
select pg_temp.t('Fonctions serveur ouvertes au serveur', $q$select (has_function_privilege('service_role','public.famille_maj(text,text,timestamptz,timestamptz,timestamptz)','EXECUTE') and has_function_privilege('service_role','public.famille_ouvrir(uuid,text,text,timestamptz,timestamptz,timestamptz)','EXECUTE') and has_function_privilege('service_role','public.famille_par_client(text)','EXECUTE'))::text$q$, 'true');
select pg_temp.t('Anciennes versions supprimées (pas de doublon)', $q$select count(*)::text from pg_proc where proname in ('famille_maj','famille_ouvrir')$q$, '2');

\pset tuples_only off
\pset format aligned
select n, case when attendu = obtenu then 'OK' else 'ÉCHEC' end as r, nom, case when attendu = obtenu then '' else 'attendu=' || attendu || ' | obtenu=' || obtenu end as detail from res order by n;
select count(*) filter (where attendu = obtenu) || ' / ' || count(*) as total from res;
