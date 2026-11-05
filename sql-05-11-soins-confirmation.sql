-- HYPE ▸ 05/11/2026 — ESPACE « MON ÉCURIE » : CONFIRMATION DES SOINS PAR L'ÉCURIE (option B choisie par Blandine, 11 h 28).
-- À PASSER EN BASE SEULEMENT APRÈS L'ACCORD DE BLANDINE.
-- Le principe (ses mots) : un soin ajouté par une cavalière compte tout de suite partout, avec « Non confirmé · ajouté
-- par … » ; la coach le valide après avoir vérifié avec la propriétaire ; une fois validé, « ajouté par … » reste
-- affiché pour toujours (« si un jour il y a un problème, on se rappelle qui a mis quoi, ce soir-là, sur ce cheval-là »).
--
-- Ce que ça change dans la base :
--   1. trois colonnes ajoutées à soins_cheval (rien n'est supprimé ni renommé) : confirme_le, confirme_par, refuse ;
--      « ajouté par » existe déjà : c'est la colonne created_by ;
--   2. les soins DÉJÀ enregistrés sont considérés comme confirmés (on ne les remet pas en doute) ;
--   3. une règle automatique à l'enregistrement d'un soin :
--        · ajouté par une modératrice ou par quelqu'un qui gère l'écurie du cheval → confirmé d'office ;
--        · ajouté par quelqu'un d'autre (la propriétaire, une cavalière) → « non confirmé » ;
--        · si quelqu'un qui ne gère pas l'écurie MODIFIE un soin déjà confirmé (date, type, produit…), il redevient
--          « non confirmé » : personne ne peut changer un soin vérifié sans que la coach le revoie ;
--        · seule l'écurie peut toucher aux colonnes de confirmation ;
--   4. une fonction hype_confirmer_soin(soin, oui/non) : la coach confirme ou refuse. Un soin refusé n'est pas effacé :
--      il reste visible avec « refusé », mais il ne compte plus dans le registre ni dans les échéances.
-- Aucune règle d'accès existante n'est modifiée.

alter table public.soins_cheval add column if not exists confirme_le  timestamptz;
alter table public.soins_cheval add column if not exists confirme_par uuid;
alter table public.soins_cheval add column if not exists refuse       boolean not null default false;

-- 2. l'existant est confirmé (avant de créer la règle automatique)
update public.soins_cheval set confirme_le = coalesce(created_at, now()) where confirme_le is null;

-- qui gère l'écurie de ce cheval ?
create or replace function public.hype_gere_ecurie_du_cheval(p_cheval uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select public.hype_est_moderatrice()
      or exists (select 1 from public.chevaux c
                 where c.id = p_cheval and c.club is not null
                   and public.hype_peut_gerer_club(public.hype_clef_club(c.club)));
$$;

-- 3. règle automatique
create or replace function public.hype_soin_confirmation()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  gere boolean := public.hype_gere_ecurie_du_cheval(new.cheval_id);
begin
  if tg_op = 'INSERT' then
    if gere then
      new.confirme_le := now(); new.confirme_par := auth.uid(); new.refuse := false;
    else
      new.confirme_le := null; new.confirme_par := null; new.refuse := false;
    end if;
    return new;
  end if;
  -- UPDATE
  if not gere then
    new.confirme_le := old.confirme_le; new.confirme_par := old.confirme_par; new.refuse := old.refuse;
    if (new.type, new.titre, new.date_intervention, new.date_prochaine, new.notes, new.cheval_id)
       is distinct from (old.type, old.titre, old.date_intervention, old.date_prochaine, old.notes, old.cheval_id) then
      new.confirme_le := null; new.confirme_par := null; new.refuse := false;
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists soins_confirmation on public.soins_cheval;
create trigger soins_confirmation before insert or update on public.soins_cheval
  for each row execute function public.hype_soin_confirmation();

-- 4. confirmer / refuser (la coach)
create or replace function public.hype_confirmer_soin(p_soin uuid, p_ok boolean)
returns boolean language plpgsql security definer set search_path = public as $$
declare ch uuid;
begin
  select cheval_id into ch from public.soins_cheval where id = p_soin;
  if ch is null or not public.hype_gere_ecurie_du_cheval(ch) then return false; end if;
  update public.soins_cheval
     set confirme_le = case when p_ok then now() else null end,
         confirme_par = auth.uid(),
         refuse = not p_ok
   where id = p_soin;
  return true;
end;
$$;
grant execute on function public.hype_confirmer_soin(uuid, boolean) to authenticated;
grant execute on function public.hype_gere_ecurie_du_cheval(uuid) to authenticated;

-- Vérifications après passage :
-- select count(*) filter (where confirme_le is null) as non_confirmes, count(*) as total from soins_cheval;   -- 0 non confirmés
-- select tgname from pg_trigger where tgrelid = 'public.soins_cheval'::regclass and not tgisinternal;          -- soins_cheval_touch, soins_confirmation
