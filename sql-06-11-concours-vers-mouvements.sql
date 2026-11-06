-- HYPE ▸ 06/11/2026 — REGISTRE, PARTIE V : LES CONCOURS REMPLISSENT TOUT SEULS LES « MOUVEMENTS TEMPORAIRES ».
-- À PASSER EN BASE SEULEMENT APRÈS L'ACCORD DE BLANDINE.
-- Demande de Blandine (05/11) : les chevaux ajoutés au déplacement d'un concours (agenda_chevaux) remplissent la
-- partie V du registre du lieu où ils vivent, sans doublon, la ligne restant modifiable à la main.
-- Fait EN BASE (et non dans la page Engagements) : ça marche quel que soit l'écran qui ajoute ou retire le cheval.
--  · cheval ajouté à un concours        → ligne créée (sortie = jour du concours, retour = date de fin ou même jour,
--                                         motif « Concours », destination = lieu du concours, source « concours »)
--  · cheval retiré du concours          → sa ligne « concours » est supprimée
--  · date ou lieu du concours changés   → mis à jour SEULEMENT si la ligne n'a pas été corrigée à la main
--  · concours supprimé                  → lignes à venir supprimées ; celles déjà passées restent (elles ont eu lieu)
-- Ne touche à aucune donnée existante, sauf l'étape 4 (rattrapage des concours déjà notés).

-- 1) Cheval ajouté ou retiré
create or replace function public.hype_mv_depuis_agenda_chevaux()
returns trigger language plpgsql security definer set search_path to 'public' as $$
declare a public.club_agenda%rowtype; v_clef text;
begin
  if tg_op = 'DELETE' then
    delete from public.registre_mouvements where agenda_id = old.agenda_id and cheval_id = old.cheval_id and source = 'concours';
    return old;
  end if;
  select * into a from public.club_agenda where id = new.agenda_id;
  if not found or coalesce(a.type, '') <> 'concours' or a.date_jour is null then return new; end if;
  select public.hype_clef_club(c.club) into v_clef from public.chevaux c where c.id = new.cheval_id;
  if v_clef is null or v_clef = '' then return new; end if;
  insert into public.registre_mouvements (club_clef, cheval_id, date_sortie, date_retour, motif, destination, agenda_id, source, created_by)
  values (v_clef, new.cheval_id, a.date_jour, coalesce(a.date_fin, a.date_jour), 'Concours', coalesce(nullif(trim(a.lieu), ''), a.titre), a.id, 'concours', new.ajoute_par)
  on conflict (agenda_id, cheval_id) where agenda_id is not null do nothing;
  return new;
end $$;
drop trigger if exists agenda_chevaux_vers_mouvements on public.agenda_chevaux;
create trigger agenda_chevaux_vers_mouvements after insert or delete on public.agenda_chevaux
  for each row execute function public.hype_mv_depuis_agenda_chevaux();

-- 2) Date ou lieu du concours modifiés (sans écraser une correction faite à la main)
create or replace function public.hype_mv_depuis_agenda_maj()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if new.date_jour is not distinct from old.date_jour and new.date_fin is not distinct from old.date_fin
     and new.lieu is not distinct from old.lieu and new.titre is not distinct from old.titre then return new; end if;
  update public.registre_mouvements m set
    date_sortie = case when m.date_sortie = old.date_jour and new.date_jour is not null then new.date_jour else m.date_sortie end,
    date_retour = case when m.date_retour is not distinct from coalesce(old.date_fin, old.date_jour) then coalesce(new.date_fin, new.date_jour) else m.date_retour end,
    destination = case when m.destination is not distinct from coalesce(nullif(trim(old.lieu), ''), old.titre) then coalesce(nullif(trim(new.lieu), ''), new.titre) else m.destination end,
    maj_le = now()
  where m.agenda_id = new.id and m.source = 'concours';
  return new;
end $$;
drop trigger if exists club_agenda_vers_mouvements on public.club_agenda;
create trigger club_agenda_vers_mouvements after update on public.club_agenda
  for each row execute function public.hype_mv_depuis_agenda_maj();

-- 3) Concours supprimé : on retire seulement les sorties qui n'ont pas encore eu lieu
create or replace function public.hype_mv_agenda_supprime()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  delete from public.registre_mouvements where agenda_id = old.id and source = 'concours' and date_sortie >= current_date;
  return old;
end $$;
drop trigger if exists club_agenda_suppr_mouvements on public.club_agenda;
create trigger club_agenda_suppr_mouvements before delete on public.club_agenda
  for each row execute function public.hype_mv_agenda_supprime();

-- 4) Rattrapage : les chevaux déjà ajoutés à des concours (14 lignes au 06/11, du 25/10 au 15/11)
insert into public.registre_mouvements (club_clef, cheval_id, date_sortie, date_retour, motif, destination, agenda_id, source, created_by)
select public.hype_clef_club(c.club), ac.cheval_id, a.date_jour, coalesce(a.date_fin, a.date_jour), 'Concours',
       coalesce(nullif(trim(a.lieu), ''), a.titre), a.id, 'concours', ac.ajoute_par
from public.agenda_chevaux ac
join public.club_agenda a on a.id = ac.agenda_id and a.type = 'concours' and a.date_jour is not null
join public.chevaux c on c.id = ac.cheval_id
where coalesce(public.hype_clef_club(c.club), '') <> ''
on conflict (agenda_id, cheval_id) where agenda_id is not null do nothing;

-- Vérification : select count(*) from public.registre_mouvements where source = 'concours';
