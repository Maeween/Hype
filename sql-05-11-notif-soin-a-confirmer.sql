-- HYPE ▸ 05/11/2026 — NOTIFICATION « SOIN À CONFIRMER » (suite de l'option B de Blandine).
-- À PASSER EN BASE SEULEMENT APRÈS L'ACCORD DE BLANDINE.
-- Quand un soin arrive « non confirmé » (ajouté par quelqu'un qui ne gère pas l'écurie du cheval), une notification
-- personnelle part vers les personnes qui gèrent cette écurie : propriétaire revendiqué de la page (clubs_revendiques)
-- et gestionnaires (club_gestionnaires). S'il n'y en a aucun, elle part vers feinn@live.fr (la modératrice).
-- L'auteur du soin n'est jamais prévenu de son propre ajout.
-- La notification apparaît dans la cloche de l'appli et, comme les autres notifications personnelles, part sur le
-- téléphone via la règle déjà en place sur la table notifications (fonction notifier-notif, type « soin_a_confirmer »).
-- Ne touche à aucune table existante : une fonction et un déclencheur en plus sur soins_cheval.

create or replace function public.hype_notif_soin_a_confirmer()
returns trigger language plpgsql security definer set search_path = public, auth as $$
declare
  ch record;
  clef text;
  dest uuid;
  n int := 0;
begin
  if new.confirme_le is not null or new.refuse then return new; end if;
  select id, nom, club into ch from public.chevaux where id = new.cheval_id;
  if ch.id is null or ch.club is null then return new; end if;
  clef := public.hype_clef_club(ch.club);
  for dest in
    select distinct u.id from auth.users u join public.clubs_revendiques cr on lower(cr.email) = lower(u.email) where cr.clef = clef
    union
    select g.user_id from public.club_gestionnaires g where g.club_clef = clef
  loop
    if dest is distinct from new.created_by then
      insert into public.notifications (destinataire, contexte, acteur, type, cible, extrait, lu)
      values (dest, ch.club, new.created_by, 'soin_a_confirmer', 'soin:' || new.id, ch.nom, false);
      n := n + 1;
    end if;
  end loop;
  if n = 0 then
    select u.id into dest from auth.users u where lower(u.email) = 'feinn@live.fr' limit 1;
    if dest is not null and dest is distinct from new.created_by then
      insert into public.notifications (destinataire, contexte, acteur, type, cible, extrait, lu)
      values (dest, ch.club, new.created_by, 'soin_a_confirmer', 'soin:' || new.id, ch.nom, false);
    end if;
  end if;
  return new;
exception when others then
  return new;   -- une notification ratée ne doit jamais empêcher d'enregistrer le soin
end;
$$;

drop trigger if exists soins_notif_a_confirmer on public.soins_cheval;
create trigger soins_notif_a_confirmer after insert on public.soins_cheval
  for each row execute function public.hype_notif_soin_a_confirmer();
