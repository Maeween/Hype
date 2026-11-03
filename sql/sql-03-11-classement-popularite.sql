-- 03/11/2026 (Blandine : « ajoute en dessous [du fil] le classement des chevaux les plus populaires et des cavaliers en fonction de leur activité », « depuis le début »)
-- Une seule fonction, en lecture seule, qui calcule les deux classements depuis les tables existantes.
-- Aucune table nouvelle : les visites des fiches cheval sont rangées dans hype_vues (type « cheval »), une ligne par personne et par cheval.
-- SECURITY DEFINER : elle compte tout le monde, mais ne renvoie que des totaux, un nom, une photo et un identifiant (jamais un contenu privé).
create or replace function public.classement_popularite(nb integer default 10)
returns json
language sql
stable
security definer
set search_path = public
as $$
with ch as (
  select c.id, c.nom, c.photo_url, c.user_id, c.ecurie, c.histoire
  from chevaux c
  where c.supprime_le is null and coalesce(c.visibilite, 'public') = 'public'
),
alb as (
  select substring(a.cible from 8)::uuid as cid, ph.url
  from albums_cheval a, jsonb_array_elements_text(coalesce(a.photos, '[]'::jsonb)) as ph(url)
  where a.cible ~ '^cheval:[0-9a-f-]{36}$'
),
inter as (
  select al.cid, pl.user_id from photo_likes pl join alb al on al.url = pl.photo_url
  union select substring(pc.cible from 8)::uuid, pc.user_id from photo_comments pc where pc.cible ~ '^cheval:[0-9a-f-]{36}$'
  union select substring(co.cible from 8)::uuid, co.user_id from commentaires co where co.cible ~ '^cheval:[0-9a-f-]{36}$'
  union select r.cheval_id, l.user_id from likes l join resultats r on r.id = l.resultat_id where r.cheval_id is not null
),
coeur as (
  select (x.v)::uuid as cid, count(*) as n
  from profiles p, jsonb_array_elements_text(case when jsonb_typeof(p.chevaux_coeur) = 'array' then p.chevaux_coeur else '[]'::jsonb end) as x(v)
  where x.v ~ '^[0-9a-f-]{36}$' and coalesce(p.compte_supprime, false) = false
  group by 1
),
sc_ch as (
  select ch.id, ch.nom, ch.photo_url,
    (select count(*) from hype_vues v where v.type = 'cheval' and v.ref = ch.id::text and v.user_id <> ch.user_id) as visiteurs,
    (select count(distinct i.user_id) from inter i where i.cid = ch.id and i.user_id <> ch.user_id) as interactions,
    (select count(distinct l.user_id) from chevaux_liens l where l.cheval_id = ch.id) as ecuries,
    coalesce((select n from coeur where coeur.cid = ch.id), 0) as coeurs,
    (select count(*) from alb where alb.cid = ch.id) as photos,
    (select count(*) from videos_mux v where v.cible = 'cheval:' || ch.id::text and coalesce(v.statut, '') <> 'erreur') as videos,
    (select count(*) from resultats r where r.cheval_id = ch.id and coalesce(r.visible, true)) as resultats,
    ((select count(*) from soins_cheval s where s.cheval_id = ch.id)
     + (select count(*) from cheval_documents d where d.cheval_id = ch.id)
     + (select count(*) from cheval_professionnels cp where cp.cheval_id = ch.id)
     + (select count(*) from chevaux_histoires h where h.cheval_id = ch.id)
     + case when length(coalesce(ch.histoire, '')) > 20 then 1 else 0 end) as infos
  from ch
),
pr as (
  select p.id, p.pseudo, coalesce(p.avatar_url, p.avatar) as avatar, p.handle
  from profiles p where coalesce(p.compte_supprime, false) = false
),
sc_cav as (
  select pr.id, pr.pseudo, pr.avatar, pr.handle,
    (select coalesce(sum(jsonb_array_length(coalesce(a.photos, '[]'::jsonb))), 0) from albums_cheval a where a.user_id = pr.id) as photos,
    (select count(*) from videos_mux v where v.user_id = pr.id and coalesce(v.statut, '') <> 'erreur') as videos,
    (select count(*) from resultats r where r.user_id = pr.id) as resultats,
    (select count(*) from hype_stories s where s.user_id = pr.id) as stories,
    ((select count(*) from commentaires c where c.user_id = pr.id) + (select count(*) from photo_comments c where c.user_id = pr.id)) as commentaires,
    ((select count(*) from photo_likes x where x.user_id = pr.id) + (select count(*) from likes x where x.user_id = pr.id)
     + (select count(*) from likes_cartes x where x.user_id = pr.id) + (select count(*) from hype_stories_likes x where x.user_id = pr.id)) as jaime,
    coalesce((select case when jsonb_typeof(g.donnees -> 'coursTermines') = 'array' then jsonb_array_length(g.donnees -> 'coursTermines')
                          when jsonb_typeof(g.donnees -> 'coursTermines') = 'object' then (select count(*) from jsonb_object_keys(g.donnees -> 'coursTermines'))
                          else 0 end from progression g where g.user_id = pr.id), 0) as cours,
    ((select count(*) from soins_cheval s where s.created_by = pr.id) + (select count(*) from cheval_documents d where d.created_by = pr.id)) as infos
  from pr
)
select json_build_object(
  'chevaux', coalesce((select json_agg(t) from (
      select id, nom, photo_url, visiteurs, interactions, ecuries, coeurs, photos, videos, resultats, infos,
        (visiteurs * 3 + interactions * 3 + ecuries * 5 + coeurs * 5 + photos + videos * 2 + infos + round(resultats * 0.5))::int as score
      from sc_ch order by score desc, nom limit greatest(1, least(nb, 50))) t), '[]'::json),
  'cavaliers', coalesce((select json_agg(t) from (
      select id, pseudo, avatar, handle, photos, videos, resultats, stories, commentaires, jaime, cours, infos,
        (photos + videos * 2 + round(resultats * 0.5) + stories * 2 + commentaires * 2 + jaime + cours * 3 + infos)::int as score
      from sc_cav order by score desc, pseudo limit greatest(1, least(nb, 50))) t), '[]'::json)
);
$$;
revoke all on function public.classement_popularite(integer) from public;
grant execute on function public.classement_popularite(integer) to authenticated, anon;
