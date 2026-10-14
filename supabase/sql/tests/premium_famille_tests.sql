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
select pg_temp.t('Relais : ouvre la famille', null, $q$select famille_ouvrir('00000000-0000-0000-0000-00000000000a','sub_test_famille','cus_x',now()+interval '31 days')$q$, 'cree');
select pg_temp.t('Relais : message reçu deux fois → rien de plus', null, $q$select famille_ouvrir('00000000-0000-0000-0000-00000000000a','sub_test_famille','cus_x',now()+interval '31 days')$q$, 'deja');
select pg_temp.t('Relais : 2e famille payée par le même titulaire → signalée', null, $q$select famille_ouvrir('00000000-0000-0000-0000-00000000000a','sub_autre','cus_x',now()+interval '31 days')$q$, 'autre_famille');
-- (test seulement) on donne à cette famille un identifiant fixe pour la suite
set session_replication_role = replica;
update famille_membres set famille_id = '11111111-1111-1111-1111-111111111111' where famille_id = (select id from familles where stripe_subscription = 'sub_test_famille');
update famille_journal set famille_id = '11111111-1111-1111-1111-111111111111' where famille_id = (select id from familles where stripe_subscription = 'sub_test_famille');
update familles set id = '11111111-1111-1111-1111-111111111111' where stripe_subscription = 'sub_test_famille';
set session_replication_role = origin;
select pg_temp.t('Mon compte : titulaire voit sa famille', :'A', $q$select (famille_mon_etat()->>'role') || '/' || (famille_mon_etat()->>'actif')$q$, 'titulaire/true');
select pg_temp.t('Mon compte : rien pour un compte sans famille', :'C', $q$select coalesce(famille_mon_etat()::text,'(rien)')$q$, '(rien)');

select pg_temp.t('Titulaire : Premium', :'A', $q$select (hype_droits()).premium::text$q$, 'true');
select pg_temp.t('Titulaire : 4 questions IA', :'A', $q$select (hype_droits()).questions_ia::text$q$, '4');
select pg_temp.t('Titulaire : hype_est_premium', :'A', $q$select hype_est_premium()::text$q$, 'true');
select pg_temp.t('Deuxième cavalier pas encore Premium', :'B', $q$select (hype_droits()).premium::text$q$, 'false');

-- Invitation et acceptation
do $$ begin perform set_config('test.uid','00000000-0000-0000-0000-00000000000a',false);
  insert into codes values ('c1', famille_inviter()); end $$;
select pg_temp.t('Code non stocké en clair', null, $q$select count(*)::text from famille_membres m, codes c where m.code_hash = c.v$q$, '0');
select pg_temp.t('Voir invitation : valide + pseudo du titulaire', :'B', $q$select valide::text || '/' || titulaire from famille_voir_invitation((select v from codes where k='c1'))$q$, 'true/titulaire');
select pg_temp.t('Mon compte : invitation en cours visible', :'A', $q$select famille_mon_etat()->>'invitation_en_cours'$q$, 'true');
select pg_temp.t('Titulaire ne peut pas accepter sa propre invitation', :'A', $q$select famille_accepter((select v from codes where k='c1'))::text$q$, 'TITULAIRE_NE_PEUT_PAS_ACCEPTER');
select pg_temp.t('Faux code refusé', :'B', $q$select famille_accepter('nimportequoi')::text$q$, 'INVITATION_INVALIDE');
select pg_temp.t('Non connecté refusé', null, $q$select famille_accepter((select v from codes where k='c1'))::text$q$, 'CONNEXION_REQUISE');
select pg_temp.t('B accepte', :'B', $q$select famille_accepter((select v from codes where k='c1'))::text$q$, 'OK');
select pg_temp.t('B Premium', :'B', $q$select (hype_droits()).premium::text$q$, 'true');
select pg_temp.t('B 4 questions IA (pas 8, pas partagé)', :'B', $q$select (hype_droits()).questions_ia::text$q$, '4');
select pg_temp.t('B via_famille', :'B', $q$select (hype_droits()).via_famille::text$q$, 'true');
select pg_temp.t('Mon compte : B voit le titulaire', :'B', $q$select (famille_mon_etat()->>'role') || '/' || (famille_mon_etat()->>'titulaire')$q$, 'beneficiaire/titulaire');
select pg_temp.t('Mon compte : titulaire voit B', :'A', $q$select famille_mon_etat()->>'deuxieme'$q$, 'soeur');
select pg_temp.t('Code déjà utilisé : C refusé', :'C', $q$select famille_accepter((select v from codes where k='c1'))::text$q$, 'INVITATION_INVALIDE');

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
select pg_temp.t('C trop tôt (< 30 jours) : refusé', :'C', $q$select famille_accepter((select v from codes where k='c2'))::text$q$, 'LIMITE_30_JOURS');
select pg_temp.t('B peut revenir (même personne, pas un remplacement)', :'B', $q$select famille_accepter((select v from codes where k='c2'))::text$q$, 'OK');
-- On vieillit les dates de 40 jours
update famille_membres set active_le = active_le - interval '40 days' where role='beneficiaire';
select pg_temp.t('Retrait après 40 jours', :'A', $q$select famille_retirer()::text$q$, 'true');
do $$ begin perform set_config('test.uid','00000000-0000-0000-0000-00000000000a',false);
  insert into codes values ('c3', famille_inviter()); end $$;
select pg_temp.t('C après 30 jours : accepté', :'C', $q$select famille_accepter((select v from codes where k='c3'))::text$q$, 'OK');

-- Refus d'invitation
select pg_temp.t('C quitte la famille', :'C', $q$select famille_quitter()::text$q$, 'true');
select pg_temp.t('C perd Premium', :'C', $q$select (hype_droits()).premium::text$q$, 'false');
update famille_membres set active_le = active_le - interval '40 days' where role='beneficiaire';
do $$ begin perform set_config('test.uid','00000000-0000-0000-0000-00000000000a',false);
  insert into codes values ('c4', famille_inviter()); end $$;
select pg_temp.t('D refuse', :'D', $q$select famille_refuser((select v from codes where k='c4'))::text$q$, 'OK');
select pg_temp.t('D non Premium', :'D', $q$select (hype_droits()).premium::text$q$, 'false');
select pg_temp.t('Titulaire peut réinviter après refus', :'A', $q$select (famille_inviter() is not null)::text$q$, 'true');

-- Limite annuelle : B et C déjà passés ; on ajoute 2 personnes anciennes fictives -> 4 cavaliers dans l'année
insert into famille_membres (famille_id,user_id,role,statut,active_le) values
 ('11111111-1111-1111-1111-111111111111', :'E', 'beneficiaire','retire', now()-interval '100 days'),
 ('11111111-1111-1111-1111-111111111111', :'F', 'beneficiaire','retire', now()-interval '200 days');
do $$ begin perform set_config('test.uid','00000000-0000-0000-0000-00000000000a',false);
  insert into codes values ('c5', famille_inviter()); end $$;
select pg_temp.t('5e cavalier dans l''année : refusé', :'D', $q$select famille_accepter((select v from codes where k='c5'))::text$q$, 'LIMITE_ANNUELLE');
select pg_temp.t('Un ancien de l''année (B) peut revenir', :'B', $q$select famille_accepter((select v from codes where k='c5'))::text$q$, 'OK');

-- Une personne dans une seule famille
select pg_temp.t('Un titulaire ne peut pas être aussi bénéficiaire', :'A', $q$select famille_accepter((select v from codes where k='c5'))::text$q$, 'INVITATION_INVALIDE');
insert into familles (id, titulaire_id, statut, expire_le) values ('22222222-2222-2222-2222-222222222222', :'G', 'actif', now()+interval '31 days');
do $$ begin perform set_config('test.uid','00000000-0000-0000-0000-000000000010',false);
  insert into codes values ('g1', famille_inviter()); end $$;
select pg_temp.t('B déjà dans une famille : refusé ailleurs', :'B', $q$select famille_accepter((select v from codes where k='g1'))::text$q$, 'DEJA_DANS_UNE_FAMILLE');
update famille_membres set invite_expire_le = now()-interval '1 day' where famille_id='22222222-2222-2222-2222-222222222222' and statut='invite';
select pg_temp.t('Invitation expirée (8 jours) refusée', :'D', $q$select famille_accepter((select v from codes where k='g1'))::text$q$, 'INVITATION_INVALIDE');

-- Cumul avec d'autres abonnements
insert into abonnements_premium (user_id,plan,statut,expire_le) values (:'D','ai','actif',now()+interval '20 days');
do $$ begin perform set_config('test.uid','00000000-0000-0000-0000-000000000010',false);
  insert into codes values ('g2', famille_inviter()); end $$;
select pg_temp.t('Cas C : D (Hype IA perso) rejoint une famille', :'D', $q$select famille_accepter((select v from codes where k='g2'))::text$q$, 'OK');
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

select pg_temp.t('Relais : renouvellement', null, $q$select famille_maj('sub_test_famille','actif', now()+interval '33 days')::text$q$, '1');
select pg_temp.t('Relais : abonnement inconnu → 0', null, $q$select famille_maj('sub_inconnu','actif', null)::text$q$, '0');
select pg_temp.t('Relais : statut farfelu refusé', null, $q$select famille_maj('sub_test_famille','gratuit_a_vie', null)::text$q$, 'ERREUR STATUT_INVALIDE');

-- Confidentialité : on lit les droits d'un autre ?
select pg_temp.t('Lire les droits d''un autre : rien', :'C', $q$select count(*)::text from hype_droits('00000000-0000-0000-0000-00000000000a')$q$, '0');
select pg_temp.t('Suppression du titulaire bloquée tant que la famille existe', null, $q$delete from auth.users where id='00000000-0000-0000-0000-00000000000a' returning 'supprimé'$q$,
  'ERREUR update or delete on table "users" violates foreign key constraint "familles_titulaire_id_fkey" on table "familles"');

-- Résiliation définitive : les rattachements prennent fin, B peut rejoindre une autre famille
select pg_temp.t('Relais : résiliation G', null, $q$select famille_maj((select stripe_subscription from familles where id='22222222-2222-2222-2222-222222222222'),'annule')::text$q$, '0');
update familles set stripe_subscription='sub_g' where id='22222222-2222-2222-2222-222222222222';
select pg_temp.t('Relais : résiliation G (avec son abonnement)', null, $q$select famille_maj('sub_g','annule')::text$q$, '1');
select pg_temp.t('Après résiliation : D n''est plus rattaché', null, $q$select count(*)::text from famille_membres where famille_id='22222222-2222-2222-2222-222222222222' and statut in ('actif','invite')$q$, '0');
select pg_temp.t('Après résiliation : G peut repayer une famille', null, $q$select famille_ouvrir('00000000-0000-0000-0000-000000000010','sub_g2',null,now()+interval '31 days')$q$, 'cree');

-- Cas A : un cavalier qui payait déjà Premium rejoint → noté pour Blandine
update famille_membres set statut='retire' where famille_id='11111111-1111-1111-1111-111111111111' and role='beneficiaire' and statut in ('actif','invite');
delete from famille_membres where famille_id='11111111-1111-1111-1111-111111111111' and role='beneficiaire' and user_id in ('00000000-0000-0000-0000-00000000000e','00000000-0000-0000-0000-00000000000f');
update famille_membres set active_le = active_le - interval '400 days' where famille_id='11111111-1111-1111-1111-111111111111' and role='beneficiaire';
do $$ begin perform set_config('test.uid','00000000-0000-0000-0000-00000000000a',false);
  insert into codes values ('c6', famille_inviter()); end $$;
select pg_temp.t('Cas A : E (déjà Premium perso) accepte', :'E', $q$select famille_accepter((select v from codes where k='c6'))::text$q$, 'OK');
select pg_temp.t('Cas A : noté « déjà Premium personnel » dans le journal', null, $q$select detail from famille_journal where action='acceptation' and acteur='00000000-0000-0000-0000-00000000000e'$q$, 'deja_premium_personnel');

-- ═══ 3 bis : ordre des messages Stripe ═══
select famille_ouvrir('00000000-0000-0000-0000-00000000000d','sub_chrono',null, now()+interval '30 days', now()-interval '1 hour');
select pg_temp.t('Chrono : message reçu deux fois (même période) → rien ne change (message traité)', null, $q$select famille_maj('sub_chrono','actif', (select expire_le from familles where stripe_subscription='sub_chrono'), now())::text$q$, '1');
select pg_temp.t('Chrono : message reçu deux fois (même période) → rien ne change', null, $q$select statut from familles where stripe_subscription='sub_chrono'$q$, 'actif');
select pg_temp.t('Chrono : impayé (message traité)', null, $q$select famille_maj('sub_chrono','impaye', null, now()+interval '1 minute')::text$q$, '1');
select pg_temp.t('Chrono : impayé', null, $q$select statut from familles where stripe_subscription='sub_chrono'$q$, 'impaye');
select pg_temp.t('Chrono : vieille facture (période passée) après impayé → reste impayé, date ne recule pas (message traité)', null, $q$select famille_maj('sub_chrono','actif', now()-interval '5 days', now()+interval '2 minutes')::text$q$, '1');
select pg_temp.t('Chrono : vieille facture (période passée) après impayé → reste impayé, date ne recule pas', null, $q$select statut || '/' || (expire_le > now()+interval '29 days')::text from familles where stripe_subscription='sub_chrono'$q$, 'impaye/true');
select pg_temp.t('Chrono : message plus ancien que le dernier appliqué → ignoré (message traité)', null, $q$select famille_maj('sub_chrono','actif', now()+interval '60 days', now()-interval '2 hours')::text$q$, '1');
select pg_temp.t('Chrono : message plus ancien que le dernier appliqué → ignoré', null, $q$select statut from familles where stripe_subscription='sub_chrono'$q$, 'impaye');
select pg_temp.t('Chrono : paiement régularisé (période plus récente) → actif (message traité)', null, $q$select famille_maj('sub_chrono','actif', now()+interval '61 days', now()+interval '3 minutes')::text$q$, '1');
select pg_temp.t('Chrono : paiement régularisé (période plus récente) → actif', null, $q$select statut from familles where stripe_subscription='sub_chrono'$q$, 'actif');
select pg_temp.t('Chrono : résiliation (message traité)', null, $q$select famille_maj('sub_chrono','annule', null, now()+interval '4 minutes')::text$q$, '1');
select pg_temp.t('Chrono : résiliation', null, $q$select statut from familles where stripe_subscription='sub_chrono'$q$, 'annule');
select pg_temp.t('Chrono : vieille facture APRÈS résiliation → reste résiliée (message traité)', null, $q$select famille_maj('sub_chrono','actif', now()+interval '400 days', now()+interval '5 minutes')::text$q$, '1');
select pg_temp.t('Chrono : vieille facture APRÈS résiliation → reste résiliée', null, $q$select statut from familles where stripe_subscription='sub_chrono'$q$, 'annule');
select pg_temp.t('Chrono : vieux paiement initial APRÈS résiliation → pas de réouverture', null, $q$select famille_ouvrir('00000000-0000-0000-0000-00000000000d','sub_chrono',null, now()+interval '30 days')$q$, 'deja');
select pg_temp.t('Chrono : impayé sur famille résiliée → ignoré (message traité)', null, $q$select famille_maj('sub_chrono','impaye', null, now()+interval '6 minutes')::text$q$, '1');
select pg_temp.t('Chrono : impayé sur famille résiliée → ignoré', null, $q$select statut from familles where stripe_subscription='sub_chrono'$q$, 'annule');
select pg_temp.t('Chrono : un autre abonnement ne touche jamais la famille', null, $q$select famille_maj('sub_PREMIUM_PERSO','impaye')::text$q$, '0');

-- ═══ 3 bis : compte en famille ? (pour le relais) ═══
select pg_temp.t('famille_du_compte : titulaire', null, $q$select famille_du_compte('00000000-0000-0000-0000-00000000000a')$q$, 'titulaire');
select pg_temp.t('famille_du_compte : bénéficiaire', null, $q$select famille_du_compte('00000000-0000-0000-0000-00000000000e')$q$, 'beneficiaire');
select pg_temp.t('famille_du_compte : hors famille', null, $q$select coalesce(famille_du_compte('00000000-0000-0000-0000-00000000000c'),'(aucune)')$q$, '(aucune)');

-- ═══ 3 bis : codes faux limités à 10 par heure ═══
delete from famille_essais;
do $$ declare i int; begin perform set_config('test.uid','00000000-0000-0000-0000-00000000000c',false);
  for i in 1..10 loop perform famille_voir_invitation('faux' || i); end loop; end $$;
select pg_temp.t('Essais : 10 codes faux comptés', null, $q$select count(*)::text from famille_essais where user_id='00000000-0000-0000-0000-00000000000c'$q$, '10');
select pg_temp.t('Essais : le 11e → trop d''essais', :'C', $q$select raison from famille_voir_invitation('encore_faux')$q$, 'TROP_D_ESSAIS');
select pg_temp.t('Essais : même un bon code est bloqué pendant 1 heure', :'C', $q$select famille_accepter((select v from codes where k='c6'))$q$, 'TROP_D_ESSAIS');
select pg_temp.t('Essais : un autre compte n''est pas bloqué', :'D', $q$select raison from famille_voir_invitation('faux')$q$, 'INVITATION_INVALIDE');
update famille_essais set cree_le = now() - interval '2 hours' where user_id='00000000-0000-0000-0000-00000000000c';
select pg_temp.t('Essais : débloqué au bout d''une heure', :'C', $q$select raison from famille_voir_invitation('faux')$q$, 'INVITATION_INVALIDE');
select pg_temp.t('Essais : non connecté', null, $q$select raison from famille_voir_invitation('faux')$q$, 'CONNEXION_REQUISE');

-- ═══ 3 bis : nouvelle sorte d'anomalie acceptée ═══
select pg_temp.t('Anomalie « compte supprimé avec abonnement actif » acceptée', null, $q$insert into paiements_a_verifier (stripe_event_id, type_evenement, anomalie) values ('test-suppr','demande_suppression_compte','compte_supprime_abonnement_actif') returning anomalie$q$, 'compte_supprime_abonnement_actif');

-- Sécurité RLS en tant qu'utilisateur connecté
set role authenticated;
select set_config('test.uid', '00000000-0000-0000-0000-00000000000c', false);
insert into res(nom,attendu,obtenu) select 'RLS : C (hors famille) ne voit aucune famille', '0', count(*)::text from familles;
insert into res(nom,attendu,obtenu) select 'RLS : C ne voit aucun membre', '0', count(*)::text from famille_membres;
select set_config('test.uid', '00000000-0000-0000-0000-00000000000e', false);
insert into res(nom,attendu,obtenu) select 'RLS : E voit sa famille seulement', '1', count(*)::text from familles;
insert into res(nom,attendu,obtenu) select 'RLS : E voit 2 membres actifs (lui + titulaire)', '2', count(*)::text from famille_membres where statut='actif';
insert into res(nom,attendu,obtenu) select 'RLS : E (bénéficiaire) ne lit pas le journal', '0', count(*)::text from famille_journal;
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
do $$ begin
  begin perform famille_ouvrir('00000000-0000-0000-0000-00000000000d','sub_pirate',null,now()+interval '10 years');
        insert into res(nom,attendu,obtenu) values ('Connecté : ouvrir une famille soi-même interdit','refusé','accepté');
  exception when insufficient_privilege then insert into res(nom,attendu,obtenu) values ('Connecté : ouvrir une famille soi-même interdit','refusé','refusé'); end;
  begin perform famille_du_compte('00000000-0000-0000-0000-00000000000a');
        insert into res(nom,attendu,obtenu) values ('Connecté : fonction serveur famille_du_compte interdite','refusé','accepté');
  exception when insufficient_privilege then insert into res(nom,attendu,obtenu) values ('Connecté : fonction serveur famille_du_compte interdite','refusé','refusé'); end;
  begin perform famille_controle_code('x');
        insert into res(nom,attendu,obtenu) values ('Connecté : contrôle interne des codes non appelable','refusé','accepté');
  exception when insufficient_privilege then insert into res(nom,attendu,obtenu) values ('Connecté : contrôle interne des codes non appelable','refusé','refusé'); end;
  begin perform 1 from famille_essais;
        insert into res(nom,attendu,obtenu) values ('Connecté : table des essais illisible','refusé','accepté');
  exception when insufficient_privilege then insert into res(nom,attendu,obtenu) values ('Connecté : table des essais illisible','refusé','refusé'); end;
  begin perform famille_maj('sub_test_famille','actif',now()+interval '10 years');
        insert into res(nom,attendu,obtenu) values ('Connecté : prolonger via le relais interdit','refusé','accepté');
  exception when insufficient_privilege then insert into res(nom,attendu,obtenu) values ('Connecté : prolonger via le relais interdit','refusé','refusé'); end;
end $$;
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
