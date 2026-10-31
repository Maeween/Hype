-- 31/10 02h43 (Blandine : « Ok continue ») — appliqué en base.
-- La lecture de tous les résultats est réservée aux personnes connectées.
-- Les visiteurs sans compte gardent les résultats des chevaux à fiche non privée (règle « resultats du cheval public en lecture »),
-- utilisés par les pages publiques des chevaux et des écuries.
alter policy "lecture resultats" on public.resultats to authenticated;
-- Retour arrière si besoin : alter policy "lecture resultats" on public.resultats to public;
