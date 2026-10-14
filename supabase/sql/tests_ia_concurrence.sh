#!/bin/bash
# Réservations IA simultanées (vraies connexions parallèles, base d'essai locale).
P="psql -h /tmp/pgfam -p 5499 -U postgres -d iatest -qtA"
U=00000000-0000-0000-0000-00000000000e   # Premium : limite 4
$P -c "delete from ia_reservations where user_id='$U'" -c "delete from ia_consommation where user_id='$U'" -c "insert into ia_consommation(user_id,jour,questions) values ('$U',hype_ia_jour(),3)" >/dev/null
echo "T1 · 6 questions envoyées EN MÊME TEMPS alors qu'il en reste 1 sur 4"
for i in 1 2 3 4 5 6; do ( $P -c "select hype_ia_reserver('$U','question','question')->>'code'" > /tmp/ia_c_$i.txt ) & done; wait
cat /tmp/ia_c_*.txt | sed 's/^$/ok/' | sort | uniq -c | sed 's/^/   /'
$P -c "select '   → compteur final : '||questions||' / 4' from ia_consommation where user_id='$U'"
U2=00000000-0000-0000-0000-00000000000d  # Duo : limite 20
$P -c "delete from ia_reservations where user_id='$U2'" -c "delete from ia_consommation where user_id='$U2'" >/dev/null
echo "T2 · 20 questions envoyées EN MÊME TEMPS par un compte Duo (anti-rafale : 8 par minute)"
for i in $(seq 1 20); do ( $P -c "select coalesce(hype_ia_reserver('$U2','question','question')->>'code','ok')" > /tmp/ia_d_$i.txt ) & done; wait
cat /tmp/ia_d_*.txt | sort | uniq -c | sed 's/^/   /'
$P -c "select '   → compteur final : '||questions||' / 20 ; réservations : '||(select count(*) from ia_reservations where user_id='$U2') from ia_consommation where user_id='$U2'"
echo "T3 · même réservation rendue 5 fois EN MÊME TEMPS"
R=$($P -c "update ia_reservations set cree_le = cree_le - interval '2 minutes' where user_id='$U2'" -c "select hype_ia_reserver('$U2','question','question')->>'id'" | tail -1)
for i in 1 2 3 4 5; do ( $P -c "select hype_ia_terminer('$R', false)::text" > /tmp/ia_r_$i.txt ) & done; wait
cat /tmp/ia_r_*.txt | sort | uniq -c | sed 's/^/   /'
$P -c "select '   → compteur final : '||questions||' (attendu 8 : 9 réservées − 1 rendue)' from ia_consommation where user_id='$U2'"
rm -f /tmp/ia_c_*.txt /tmp/ia_d_*.txt /tmp/ia_r_*.txt
