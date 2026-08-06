-- Hype · 06/08/2026 · Nom d'affichage de la page Écurie perso, séparé du club.
-- Idempotent : peut être exécuté plusieurs fois sans risque.
alter table public.profiles add column if not exists ecurie_perso text;
-- Reprise pour Blandine : sa page perso s'appelle "Feinn", son club redevient "Ecurie Feinn".
update public.profiles set ecurie_perso = 'Feinn', ecurie = 'Ecurie Feinn'
where id = (select id from auth.users where lower(email) = 'feinn@live.fr');
