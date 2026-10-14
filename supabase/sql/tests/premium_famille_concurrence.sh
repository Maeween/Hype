#!/bin/bash
# Tests de concurrence réels : deux connexions simultanées sur la base de test locale.
cd /home/claude/hype/supabase/sql
P="psql -h /tmp/pgfam -p 5499 -U postgres"
$P -qc "drop database if exists famc" -c "create database famc" >/dev/null && $P -d famc -q -f tests/premium_famille_imitation_supabase.sql && $P -d famc -q -f premium_famille.sql 2>&1 | grep -v NOTICE
$P -d famc -q >/dev/null <<'EOF'
create table codes(k text primary key, v text);
select famille_ouvrir('00000000-0000-0000-0000-00000000000a','sub_A',null,now()+interval '30 days');
select famille_ouvrir('00000000-0000-0000-0000-000000000010','sub_G',null,now()+interval '30 days');
EOF
A=00000000-0000-0000-0000-00000000000a; G=00000000-0000-0000-0000-000000000010
inv() { $P -d famc -q -c "select set_config('test.uid','$1',false)" -c "delete from codes where k='$2'" -c "insert into codes values ('$2', famille_inviter())" >/dev/null 2>&1; }
vieillir() { $P -d famc -q -c "update famille_membres set active_le = active_le - interval '40 days' where role='beneficiaire'" >/dev/null; }
S() { $P -d famc -qtA -c "begin" -c "select set_config('test.uid','$1',false)" -c "$2" -c "select pg_sleep(${3:-0})" -c "commit" 2>&1 | grep -v "^$\|^0000\|^$1\|BEGIN\|COMMIT" | sed 's/^/   /'; }
Q() { $P -d famc -qtA -c "$1" | sed 's/^/   → /'; }
echo "T1 · deux personnes acceptent le même lien en même temps"
inv $A a
(S 00000000-0000-0000-0000-00000000000b "select 'B : '||famille_accepter((select v from codes where k='a'))" 2 &) ; sleep 0.5; S 00000000-0000-0000-0000-00000000000c "select 'C : '||famille_accepter((select v from codes where k='a'))"; sleep 2
Q "select 'deuxièmes cavaliers actifs famille A : '||count(*) from famille_membres m join familles f on f.id=m.famille_id where f.stripe_subscription='sub_A' and m.role='beneficiaire' and m.statut='actif'"
echo "T2 · le même cavalier (D) accepte deux familles en même temps"
$P -d famc -q -c "select set_config('test.uid','$A',false)" -c "select famille_retirer()" >/dev/null; vieillir
inv $A a; inv $G g
(S 00000000-0000-0000-0000-00000000000d "select 'via A : '||famille_accepter((select v from codes where k='a'))" 2 &) ; sleep 0.5; S 00000000-0000-0000-0000-00000000000d "select 'via G : '||famille_accepter((select v from codes where k='g'))"; sleep 2
Q "select 'familles où D est actif : '||count(*) from famille_membres where user_id='00000000-0000-0000-0000-00000000000d' and statut='actif'"
echo "T3 · acceptation pendant que le titulaire annule l'invitation"
$P -d famc -q -c "select set_config('test.uid','$G',false)" -c "select famille_retirer()" >/dev/null; vieillir; inv $G g
(S $G "select 'retrait : '||famille_retirer()" 2 &) ; sleep 0.5; S 00000000-0000-0000-0000-00000000000e "select 'E accepte : '||famille_accepter((select v from codes where k='g'))"; sleep 2
echo "T4 · lien accepté APRÈS révocation"
S 00000000-0000-0000-0000-00000000000e "select 'E accepte : '||famille_accepter((select v from codes where k='g'))"
echo "T5 · deux invitations créées en même temps"
(S $G "select 'lien 1 : '||left(famille_inviter(),4)||'…'" 2 &) ; sleep 0.5; S $G "select 'lien 2 : '||left(famille_inviter(),4)||'…'"; sleep 2
Q "select 'invitations en cours famille G : '||count(*) from famille_membres m join familles f on f.id=m.famille_id where f.stripe_subscription='sub_G' and m.statut='invite'"
echo "T6 · deux acceptations simultanées de deux liens successifs (1er lien remplacé pendant l'acceptation)"
$P -d famc -q -c "select set_config('test.uid','$G',false)" -c "select famille_retirer()" >/dev/null; vieillir; inv $G g1
(S 00000000-0000-0000-0000-00000000000e "select 'E (lien 1) : '||famille_accepter((select v from codes where k='g1'))" 2 &) ; sleep 0.5; inv $G g2; S 00000000-0000-0000-0000-00000000000c "select 'C (lien 2) : '||famille_accepter((select v from codes where k='g2'))"; sleep 2
Q "select 'deuxièmes cavaliers actifs famille G : '||count(*) from famille_membres m join familles f on f.id=m.famille_id where f.stripe_subscription='sub_G' and m.role='beneficiaire' and m.statut='actif'"
echo "T7 · limite de 30 jours contournée par deux acceptations simultanées ?"
$P -d famc -q -c "select set_config('test.uid','$G',false)" -c "select famille_retirer()" >/dev/null
Q "select 'dernier cavalier arrivé il y a '||extract(day from now()-max(active_le))::int||' jour(s)' from famille_membres m join familles f on f.id=m.famille_id where f.stripe_subscription='sub_G' and m.role='beneficiaire'"
inv $G g3; S 00000000-0000-0000-0000-00000000000b "select 'B : '||famille_accepter((select v from codes where k='g3'))"
