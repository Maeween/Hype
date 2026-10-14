\set QUIET on
\pset format unaligned
\pset tuples_only on
create temp table res (n serial, nom text, attendu text, obtenu text);
create temp table codes (k text primary key, v text);
grant all on res, codes to authenticated, anon;
grant usage on sequence res_n_seq to authenticated, anon;
create or replace function pg_temp.t(p_nom text, p_uid text, p_sql text, p_att text) returns void language plpgsql as $$
declare v text;
begin
  perform set_config('test.uid', coalesce(p_uid,''), false);
  begin execute p_sql into v;
  exception when others then v := 'ERREUR ' || sqlerrm; end;
  insert into res(nom,attendu,obtenu) values (p_nom, p_att, coalesce(v,'(vide)'));
end $$;
-- identifiants
\set A '00000000-0000-0000-0000-00000000000a'
\set B '00000000-0000-0000-0000-00000000000b'
\set C '00000000-0000-0000-0000-00000000000c'
\set D '00000000-0000-0000-0000-00000000000d'
\set E '00000000-0000-0000-0000-00000000000e'
\set F '00000000-0000-0000-0000-00000000000f'
\set G '00000000-0000-0000-0000-000000000010'

-- Avant tout : personne n'a de famille
select pg_temp.t('Sans famille : titulaire non Premium', :'A', $q$select (hype_droits()).premium::text$q$, 'false');
select pg_temp.t('Sans famille : inviter refusé', :'A', $q$select famille_inviter()$q$, 'ERREUR FAMILLE_INTROUVABLE');

-- Le futur relais crée la famille (simulé)
insert into familles (id, titulaire_id, stripe_subscription, statut, expire_le)
values ('11111111-1111-1111-1111-111111111111', :'A', 'sub_test_famille', 'actif', now() + interval '31 days');
insert into famille_membres (famille_id, user_id, role, statut, active_le)
values ('11111111-1111-1111-1111-111111111111', :'A', 'titulaire', 'actif', now());

select pg_temp.t('Titulaire : Premium', :'A', $q$select (hype_droits()).premium::text$q$, 'true');
select pg_temp.t('Titulaire : 4 questions IA', :'A', $q$select (hype_droits()).questions_ia::text$q$, '4');
select pg_temp.t('Titulaire : hype_est_premium', :'A', $q$select hype_est_premium()::text$q$, 'true');
select pg_temp.t('Deuxième cavalier pas encore Premium', :'B', $q$select (hype_droits()).premium::text$q$, 'false');

-- Invitation et acceptation
do $$ begin perform set_config('test.uid','00000000-0000-0000-0000-00000000000a',false);
  insert into codes values ('c1', famille_inviter()); end $$;
select pg_temp.t('Code non stocké en clair', null, $q$select count(*)::text from famille_membres m, codes c where m.code_hash = c.v$q$, '0');
select pg_temp.t('Voir invitation', :'B', $q$select valide::text from famille_voir_invitation((select v from codes where k='c1'))$q$, 'true');
select pg_temp.t('Titulaire ne peut pas accepter sa propre invitation', :'A', $q$select famille_accepter((select v from codes where k='c1'))::text$q$, 'ERREUR TITULAIRE_NE_PEUT_PAS_ACCEPTER');
select pg_temp.t('Faux code refusé', :'B', $q$select famille_accepter('nimportequoi')::text$q$, 'ERREUR INVITATION_INVALIDE');
select pg_temp.t('Non connecté refusé', null, $q$select famille_accepter((select v from codes where k='c1'))::text$q$, 'ERREUR CONNEXION_REQUISE');
select pg_temp.t('B accepte', :'B', $q$select famille_accepter((select v from codes where k='c1'))::text$q$, 'true');
select pg_temp.t('B Premium', :'B', $q$select (hype_droits()).premium::text$q$, 'true');
select pg_temp.t('B 4 questions IA (pas 8, pas partagé)', :'B', $q$select (hype_droits()).questions_ia::text$q$, '4');
select pg_temp.t('B via_famille', :'B', $q$select (hype_droits()).via_famille::text$q$, 'true');
select pg_temp.t('Code déjà utilisé : C refusé', :'C', $q$select famille_accepter((select v from codes where k='c1'))::text$q$, 'ERREUR INVITATION_INVALIDE');

-- Pas de 3e cavalier
select pg_temp.t('Inviter un 3e : refusé', :'A', $q$select famille_inviter()$q$, 'ERREUR DEJA_UN_DEUXIEME_CAVALIER');
select pg_temp.t('Insertion directe d''un 3e (contourner) : refusée par la base', null,
  $q$insert into famille_membres (famille_id,user_id,role,statut) values ('11111111-1111-1111-1111-111111111111','00000000-0000-0000-0000-00000000000c','beneficiaire','actif') returning 'inséré'$q$,
  'ERREUR duplicate key value violates unique constraint "famille_un_beneficiaire_en_cours"');

-- Remplacement trop rapide (limite 30 jours)
select pg_temp.t('Titulaire retire B', :'A', $q$select famille_retirer()::text$q$, 'true');
select pg_temp.t('B perd Premium', :'B', $q$select (hype_droits()).premium::text$q$, 'false');
select pg_temp.t('B garde son compte', null, $q$select count(*)::text from auth.users where email='soeur@test.fr'$q$, '1');
do $$ begin perform set_config('test.uid','00000000-0000-0000-0000-00000000000a',false);
  insert into codes values ('c2', famille_inviter()); end $$;
select pg_temp.t('C trop tôt (< 30 jours) : refusé', :'C', $q$select famille_accepter((select v from codes where k='c2'))::text$q$, 'ERREUR LIMITE_30_JOURS');
select pg_temp.t('B peut revenir (même personne, pas un remplacement)', :'B', $q$select famille_accepter((select v from codes where k='c2'))::text$q$, 'true');
-- On vieillit les dates de 40 jours
update famille_membres set active_le = active_le - interval '40 days' where role='beneficiaire';
select pg_temp.t('Retrait après 40 jours', :'A', $q$select famille_retirer()::text$q$, 'true');
do $$ begin perform set_config('test.uid','00000000-0000-0000-0000-00000000000a',false);
  insert into codes values ('c3', famille_inviter()); end $$;
select pg_temp.t('C après 30 jours : accepté', :'C', $q$select famille_accepter((select v from codes where k='c3'))::text$q$, 'true');

-- Refus d'invitation
select pg_temp.t('C quitte la famille', :'C', $q$select famille_quitter()::text$q$, 'true');
select pg_temp.t('C perd Premium', :'C', $q$select (hype_droits()).premium::text$q$, 'false');
update famille_membres set active_le = active_le - interval '40 days' where role='beneficiaire';
do $$ begin perform set_config('test.uid','00000000-0000-0000-0000-00000000000a',false);
  insert into codes values ('c4', famille_inviter()); end $$;
select pg_temp.t('D refuse', :'D', $q$select famille_refuser((select v from codes where k='c4'))::text$q$, 'true');
select pg_temp.t('D non Premium', :'D', $q$select (hype_droits()).premium::text$q$, 'false');
select pg_temp.t('Titulaire peut réinviter après refus', :'A', $q$select (famille_inviter() is not null)::text$q$, 'true');

-- Limite annuelle : B et C déjà passés ; on ajoute 2 personnes anciennes fictives -> 4 cavaliers dans l'année
insert into famille_membres (famille_id,user_id,role,statut,active_le) values
 ('11111111-1111-1111-1111-111111111111', :'E', 'beneficiaire','retire', now()-interval '100 days'),
 ('11111111-1111-1111-1111-111111111111', :'F', 'beneficiaire','retire', now()-interval '200 days');
do $$ begin perform set_config('test.uid','00000000-0000-0000-0000-00000000000a',false);
  insert into codes values ('c5', famille_inviter()); end $$;
select pg_temp.t('5e cavalier dans l''année : refusé', :'D', $q$select famille_accepter((select v from codes where k='c5'))::text$q$, 'ERREUR LIMITE_ANNUELLE');
select pg_temp.t('Un ancien de l''année (B) peut revenir', :'B', $q$select famille_accepter((select v from codes where k='c5'))::text$q$, 'true');

-- Une personne dans une seule famille
insert into familles (id, titulaire_id, statut, expire_le) values ('22222222-2222-2222-2222-222222222222', :'G', 'actif', now()+interval '31 days');
do $$ begin perform set_config('test.uid','00000000-0000-0000-0000-000000000010',false);
  insert into codes values ('g1', famille_inviter()); end $$;
select pg_temp.t('B déjà dans une famille : refusé ailleurs', :'B', $q$select famille_accepter((select v from codes where k='g1'))::text$q$, 'ERREUR DEJA_DANS_UNE_FAMILLE');
update famille_membres set invite_expire_le = now()-interval '1 day' where famille_id='22222222-2222-2222-2222-222222222222' and statut='invite';
select pg_temp.t('Invitation expirée (8 jours) refusée', :'D', $q$select famille_accepter((select v from codes where k='g1'))::text$q$, 'ERREUR INVITATION_INVALIDE');

-- Cumul avec d'autres abonnements
insert into abonnements_premium (user_id,plan,statut,expire_le) values (:'D','ai','actif',now()+interval '20 days');
do $$ begin perform set_config('test.uid','00000000-0000-0000-0000-000000000010',false);
  insert into codes values ('g2', famille_inviter()); end $$;
select pg_temp.t('Cas C : D (Hype IA perso) rejoint une famille', :'D', $q$select famille_accepter((select v from codes where k='g2'))::text$q$, 'true');
select pg_temp.t('Cas C : D Premium + garde ses 15 questions', :'D', $q$select (hype_droits()).premium::text || '/' || (hype_droits()).questions_ia::text$q$, 'true/15');
update abonnements_premium set plan='duo' where user_id=:'D';
select pg_temp.t('Cas C : Duo perso + famille = 20 questions', :'D', $q$select (hype_droits()).questions_ia::text$q$, '20');
update abonnements_premium set statut='annule' where user_id=:'D';
select pg_temp.t('Cas C : Duo arrêté, la famille garde Premium + 4', :'D', $q$select (hype_droits()).premium::text || '/' || (hype_droits()).questions_ia::text$q$, 'true/4');
select pg_temp.t('Hype IA seul : pas Premium', :'F', $q$select (hype_droits()).premium::text$q$, 'false');
select pg_temp.t('Premium perso : Premium, non via_famille', :'E', $q$select (hype_droits()).premium::text || '/' || (hype_droits()).via_famille::text$q$, 'true/false');

-- Résiliation / impayé : les deux perdent, données gardées
update familles set statut = 'impaye' where id = '11111111-1111-1111-1111-111111111111';
select pg_temp.t('Impayé : titulaire perd Premium', :'A', $q$select hype_est_premium()::text$q$, 'false');
select pg_temp.t('Impayé : B perd Premium', :'B', $q$select hype_est_premium()::text$q$, 'false');
select pg_temp.t('Impayé : pas d''invitation possible', :'A', $q$select famille_inviter()$q$, 'ERREUR FAMILLE_INTROUVABLE');
update familles set statut = 'actif', expire_le = now() - interval '1 hour' where id = '11111111-1111-1111-1111-111111111111';
select pg_temp.t('Date dépassée : B perd Premium', :'B', $q$select (hype_droits()).premium::text$q$, 'false');
update familles set expire_le = now() + interval '30 days' where id = '11111111-1111-1111-1111-111111111111';
select pg_temp.t('Renouvelée : B retrouve Premium', :'B', $q$select (hype_droits()).premium::text$q$, 'true');
select pg_temp.t('Lien B conservé pendant l''impayé', null, $q$select statut from famille_membres where user_id='00000000-0000-0000-0000-00000000000b' and statut='actif'$q$, 'actif');

-- Confidentialité : on lit les droits d'un autre ?
select pg_temp.t('Lire les droits d''un autre : rien', :'C', $q$select count(*)::text from hype_droits('00000000-0000-0000-0000-00000000000a')$q$, '0');
select pg_temp.t('Suppression du titulaire bloquée tant que la famille existe', null, $q$delete from auth.users where id='00000000-0000-0000-0000-00000000000a' returning 'supprimé'$q$,
  'ERREUR update or delete on table "users" violates foreign key constraint "familles_titulaire_id_fkey" on table "familles"');

-- Sécurité RLS en tant qu'utilisateur connecté
set role authenticated;
select set_config('test.uid', '00000000-0000-0000-0000-00000000000c', false);
insert into res(nom,attendu,obtenu) select 'RLS : C (hors famille) ne voit aucune famille', '0', count(*)::text from familles;
insert into res(nom,attendu,obtenu) select 'RLS : C ne voit aucun membre', '0', count(*)::text from famille_membres;
select set_config('test.uid', '00000000-0000-0000-0000-00000000000b', false);
insert into res(nom,attendu,obtenu) select 'RLS : B voit sa famille seulement', '1', count(*)::text from familles;
insert into res(nom,attendu,obtenu) select 'RLS : B voit 2 membres actifs (lui + titulaire)', '2', count(*)::text from famille_membres where statut='actif';
insert into res(nom,attendu,obtenu) select 'RLS : B ne lit pas le journal', '0', count(*)::text from famille_journal;
do $$ begin
  begin insert into famille_membres (famille_id,user_id,role,statut) values ('11111111-1111-1111-1111-111111111111','00000000-0000-0000-0000-00000000000d','beneficiaire','actif');
        insert into res(nom,attendu,obtenu) values ('RLS : écriture directe interdite','refusé','accepté');
  exception when insufficient_privilege then insert into res(nom,attendu,obtenu) values ('RLS : écriture directe interdite','refusé','refusé'); end;
  begin update familles set expire_le = now() + interval '10 years';
        insert into res(nom,attendu,obtenu) values ('RLS : prolonger soi-même interdit','refusé','accepté');
  exception when insufficient_privilege then insert into res(nom,attendu,obtenu) values ('RLS : prolonger soi-même interdit','refusé','refusé'); end;
end $$;
select set_config('test.uid', '00000000-0000-0000-0000-00000000000a', false);
insert into res(nom,attendu,obtenu) select 'RLS : titulaire lit le journal', 'oui', case when count(*) > 0 then 'oui' else 'non' end from famille_journal;
reset role;
set role anon;
do $$ begin
  begin perform famille_inviter(); insert into res(nom,attendu,obtenu) values ('Anonyme : fonctions interdites','refusé','accepté');
  exception when insufficient_privilege then insert into res(nom,attendu,obtenu) values ('Anonyme : fonctions interdites','refusé','refusé'); end;
end $$;
reset role;

\pset tuples_only off
\pset format aligned
select n, case when attendu = obtenu then 'OK' else 'ÉCHEC' end as r, nom, case when attendu = obtenu then '' else 'attendu=' || attendu || ' | obtenu=' || obtenu end as detail from res order by n;
select count(*) filter (where attendu = obtenu) || ' / ' || count(*) as total from res;
