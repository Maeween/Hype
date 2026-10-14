-- Tests du compteur IA (base d'essai locale imitant Supabase ; JAMAIS sur la production)
\set QUIET on
\pset format unaligned
\pset tuples_only on
create temp table res (n serial, nom text, attendu text, obtenu text);
grant all on res to authenticated; grant usage on sequence res_n_seq to authenticated;
create or replace function pg_temp.t(p_nom text, p_sql text, p_att text) returns void language plpgsql as $$
declare v text;
begin
  begin execute p_sql into v; exception when others then v := 'ERREUR ' || sqlerrm; end;
  insert into res(nom,attendu,obtenu) values (p_nom, p_att, coalesce(v,'(vide)'));
end $$;
-- comptes : A gratuit, E Premium mensuel, F Hype IA, D Duo, C Crystal, B et G : famille, Blandine modératrice
insert into abonnements_premium (user_id,plan,statut,expire_le) values
 ('00000000-0000-0000-0000-00000000000d','duo','actif',now()+interval '20 days'),
 ('00000000-0000-0000-0000-00000000000c','annuel','actif',now()+interval '200 days')
 on conflict (user_id) do update set plan=excluded.plan, statut='actif', expire_le=excluded.expire_le;
select famille_ouvrir('00000000-0000-0000-0000-000000000010','sub_fam',null,now()+interval '30 days');
insert into famille_membres (famille_id,user_id,role,statut,active_le)
  select id,'00000000-0000-0000-0000-00000000000b','beneficiaire','actif',now() from familles where stripe_subscription='sub_fam';
-- (test seulement) on lève l'anti-rafale pour compter les quotas
create or replace function pg_temp.reserver_n(p_uid uuid, p_n int, p_cat text) returns text language plpgsql as $$
declare i int; r jsonb; ok int := 0;
begin
  for i in 1..p_n loop
    update ia_reservations set cree_le = cree_le - interval '2 minutes' where user_id = p_uid;
    r := hype_ia_reserver(p_uid, case when p_cat='question' then 'question' else 'lecture_palmares' end, p_cat);
    if (r->>'ok')::boolean then ok := ok + 1; end if;
  end loop;
  return ok::text || '/' || coalesce(r->>'code','ok');
end $$;
select pg_temp.t('Gratuit : 1 question, la 2e refusée', $q$select pg_temp.reserver_n('00000000-0000-0000-0000-00000000000a',3,'question')$q$, '1/QUOTA_ATTEINT');
select pg_temp.t('Premium Cavalier : 4', $q$select pg_temp.reserver_n('00000000-0000-0000-0000-00000000000e',6,'question')$q$, '4/QUOTA_ATTEINT');
select pg_temp.t('Hype IA : 15', $q$select pg_temp.reserver_n('00000000-0000-0000-0000-00000000000f',18,'question')$q$, '15/QUOTA_ATTEINT');
select pg_temp.t('Duo : 20', $q$select pg_temp.reserver_n('00000000-0000-0000-0000-00000000000d',22,'question')$q$, '20/QUOTA_ATTEINT');
select pg_temp.t('Crystal : 4', $q$select pg_temp.reserver_n('00000000-0000-0000-0000-00000000000c',6,'question')$q$, '4/QUOTA_ATTEINT');
select pg_temp.t('Famille titulaire : 4', $q$select pg_temp.reserver_n('00000000-0000-0000-0000-000000000010',6,'question')$q$, '4/QUOTA_ATTEINT');
select pg_temp.t('Famille 2e cavalier : 4 à lui (pas partagés)', $q$select pg_temp.reserver_n('00000000-0000-0000-0000-00000000000b',6,'question')$q$, '4/QUOTA_ATTEINT');
select pg_temp.t('Modératrice : sans limite (30 sur 30)', $q$select pg_temp.reserver_n('00000000-0000-0000-0000-000000000011',30,'question')$q$, '30/ok');
select pg_temp.t('Outils : plafond 30, séparé des questions', $q$select pg_temp.reserver_n('00000000-0000-0000-0000-00000000000a',32,'outil')$q$, '30/QUOTA_OUTILS_ATTEINT');
select pg_temp.t('Outils épuisés : les questions ne bougent pas', $q$select questions::text from ia_consommation where user_id='00000000-0000-0000-0000-00000000000a' and jour=hype_ia_jour()$q$, '1');
-- anti-rafale
delete from ia_reservations where user_id='00000000-0000-0000-0000-000000000011'; delete from ia_consommation where user_id='00000000-0000-0000-0000-000000000011';
select pg_temp.t('Anti-rafale : 8 appels en 1 minute puis refus (même pour une modératrice)', $q$select count(*) filter (where (r->>'ok')::boolean)::text || '/' || max(r->>'code') from (select hype_ia_reserver('00000000-0000-0000-0000-000000000011','question','question') r from generate_series(1,10)) x$q$, '8/TROP_RAPIDE');
-- restitution
delete from ia_reservations where user_id='00000000-0000-0000-0000-00000000000e'; delete from ia_consommation where user_id='00000000-0000-0000-0000-00000000000e';
create temp table ids (k text primary key, v uuid);
insert into ids select 'r1', (hype_ia_reserver('00000000-0000-0000-0000-00000000000e','question','question')->>'id')::uuid;
select pg_temp.t('Échec avant réponse : réservation rendue', $q$select hype_ia_terminer((select v from ids where k='r1'), false)->>'statut'$q$, 'restituee');
select pg_temp.t('Échec avant réponse : compteur revenu à 0', $q$select questions::text from ia_consommation where user_id='00000000-0000-0000-0000-00000000000e'$q$, '0');
select pg_temp.t('Remboursement répété : sans effet (jamais sous zéro)', $q$select (hype_ia_terminer((select v from ids where k='r1'), false)->>'deja') || '/' || (select questions from ia_consommation where user_id='00000000-0000-0000-0000-00000000000e')::text$q$, 'restituee/0');
insert into ids select 'r2', (hype_ia_reserver('00000000-0000-0000-0000-00000000000e','question','question')->>'id')::uuid;
select pg_temp.t('Réponse donnée : consommée', $q$select hype_ia_terminer((select v from ids where k='r2'), true)->>'statut'$q$, 'consommee');
select pg_temp.t('Consommée puis tentative de remboursement : refusée', $q$select (hype_ia_terminer((select v from ids where k='r2'), false)->>'deja') || '/' || (select questions from ia_consommation where user_id='00000000-0000-0000-0000-00000000000e')::text$q$, 'consommee/1');
-- question photo en 2 étapes
update ia_reservations set cree_le = cree_le - interval '2 minutes';
insert into ids select 'p1', (hype_ia_reserver('00000000-0000-0000-0000-00000000000e','perception','question',true)->>'id')::uuid;
select pg_temp.t('Photo : observation consommée', $q$select hype_ia_terminer((select v from ids where k='p1'), true)->>'statut'$q$, 'consommee');
insert into ids select 'p2', (hype_ia_reserver('00000000-0000-0000-0000-00000000000e','question','question',false,(select v from ids where k='p1'))->>'id')::uuid;
select pg_temp.t('Photo : la 2e étape ne compte pas une 2e fois', $q$select questions::text from ia_consommation where user_id='00000000-0000-0000-0000-00000000000e'$q$, '2');
select pg_temp.t('Photo : une 3e étape refusée', $q$select hype_ia_reserver('00000000-0000-0000-0000-00000000000e','question','question',false,(select v from ids where k='p1'))->>'code'$q$, 'SUITE_INVALIDE');
select pg_temp.t('Photo : réutiliser l''étape d''un AUTRE compte refusé', $q$select hype_ia_reserver('00000000-0000-0000-0000-00000000000a','question','question',false,(select v from ids where k='p1'))->>'code'$q$, 'SUITE_INVALIDE');
select pg_temp.t('Photo : 2e étape échoue avant réponse → rendue', $q$select hype_ia_terminer((select v from ids where k='p2'), false)->>'statut'$q$, 'restituee');
select pg_temp.t('Photo : toute la question rendue (compteur 2 → 1)', $q$select questions::text from ia_consommation where user_id='00000000-0000-0000-0000-00000000000e'$q$, '1');
select pg_temp.t('Photo : rendue une seule fois', $q$select (hype_ia_terminer((select v from ids where k='p2'), false)->>'deja') || '/' || (select questions from ia_consommation where user_id='00000000-0000-0000-0000-00000000000e')::text$q$, 'restituee/1');
-- falsification / droits
select pg_temp.t('Opération inconnue refusée', $q$select hype_ia_reserver('00000000-0000-0000-0000-00000000000e','question','premium_gratuit')->>'code'$q$, 'OPERATION_INVALIDE');
select pg_temp.t('Sans compte refusé', $q$select hype_ia_reserver(null,'question','question')->>'code'$q$, 'AUTH_REQUIRED');
-- jour de Paris
select pg_temp.t('Jour de Paris : 23 h 30 UTC un soir d''été = lendemain à Paris', $q$select (('2026-07-14 22:30:00+00'::timestamptz at time zone 'Europe/Paris')::date)::text$q$, '2026-07-15');
select pg_temp.t('Jour de Paris : 23 h 30 UTC en hiver = lendemain à Paris', $q$select (('2026-12-14 23:30:00+00'::timestamptz at time zone 'Europe/Paris')::date)::text$q$, '2026-12-15');
select pg_temp.t('Jour de Paris : nuit du changement d''heure (25/10, 22 h 30 UTC = 23 h 30 Paris)', $q$select (('2026-10-25 22:30:00+00'::timestamptz at time zone 'Europe/Paris')::date)::text$q$, '2026-10-25');
-- appli : son compteur seulement
set role authenticated;
select set_config('test.uid','00000000-0000-0000-0000-00000000000e',false);
insert into res(nom,attendu,obtenu) select 'Appli : lit SON compteur', '1/4', (hype_ia_mon_compteur()->>'questions') || '/' || (hype_ia_mon_compteur()->>'limite');
do $$ begin
  begin perform hype_ia_reserver('00000000-0000-0000-0000-00000000000e','question','question'); insert into res(nom,attendu,obtenu) values ('Appli : réserver directement interdit','refusé','accepté');
  exception when insufficient_privilege then insert into res(nom,attendu,obtenu) values ('Appli : réserver directement interdit','refusé','refusé'); end;
  begin perform hype_ia_terminer(gen_random_uuid(), false); insert into res(nom,attendu,obtenu) values ('Appli : se rembourser interdit','refusé','accepté');
  exception when insufficient_privilege then insert into res(nom,attendu,obtenu) values ('Appli : se rembourser interdit','refusé','refusé'); end;
  begin perform 1 from ia_consommation; insert into res(nom,attendu,obtenu) values ('Appli : tables illisibles','refusé','accepté');
  exception when insufficient_privilege then insert into res(nom,attendu,obtenu) values ('Appli : tables illisibles','refusé','refusé'); end;
  begin update ia_consommation set questions = 0; insert into res(nom,attendu,obtenu) values ('Appli : remettre son compteur à zéro interdit','refusé','accepté');
  exception when insufficient_privilege then insert into res(nom,attendu,obtenu) values ('Appli : remettre son compteur à zéro interdit','refusé','refusé'); end;
end $$;
reset role;
\pset tuples_only off
\pset format aligned
select n, case when attendu = obtenu then 'OK' else 'ÉCHEC' end as r, nom, case when attendu = obtenu then '' else 'attendu=' || attendu || ' | obtenu=' || obtenu end as detail from res order by n;
select count(*) filter (where attendu = obtenu) || ' / ' || count(*) as total from res;
