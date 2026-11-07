-- HYPE ▸ 07/11/2026 — LE PLANNING VISIBLE PAR LE PERSONNEL DE L'ÉCURIE.
-- Blandine, 07/11 17 h 59 : « Ok continue » à la proposition de faire voir le planning aux salariés et de les laisser cocher « C'est fait ».
-- Passé en base par Claude le 07/11. Uniquement des ajouts (une colonne vide, deux fonctions, une règle de lecture).
-- Qui gagne un accès : SEULEMENT les personnes notées dans « Le personnel » de l'écurie, encore présentes,
-- dont le responsable a rempli l'e-mail de leur compte Hype. Elles voient le planning de cette écurie et peuvent
-- seulement marquer une tâche « faite aujourd'hui » (pas d'ajout, pas de modification, pas de suppression).
-- Rien d'autre ne leur est ouvert (personnel, compta, contrats, pensions, stock restent au responsable).
alter table public.registre_personnel add column if not exists email text;

create or replace function public.hype_est_personnel_club(p_clef text)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select exists (
    select 1 from public.registre_personnel p
    where p.club_clef = p_clef
      and coalesce(btrim(p.email), '') <> ''
      and lower(btrim(p.email)) = lower(coalesce(auth.jwt() ->> 'email', ''))
      and (p.date_sortie is null or p.date_sortie >= (now() at time zone 'Europe/Paris')::date)
  )
$$;

create policy "taches_lire_personnel" on public.ecurie_taches for select to authenticated
  using (public.hype_est_personnel_club(club_clef));

create or replace function public.hype_tache_faite(p_id uuid)
returns date language plpgsql security definer set search_path to 'public' as $$
declare v_clef text; v_jour date := (now() at time zone 'Europe/Paris')::date;
begin
  select club_clef into v_clef from public.ecurie_taches where id = p_id;
  if v_clef is null then raise exception 'Tâche introuvable'; end if;
  if not (coalesce(public.hype_est_moderatrice(), false) or coalesce(public.hype_peut_gerer_club(v_clef), false) or public.hype_est_personnel_club(v_clef)) then
    raise exception 'Non autorisé';
  end if;
  update public.ecurie_taches set fait_le = v_jour, maj_le = now() where id = p_id;
  return v_jour;
end;
$$;
revoke all on function public.hype_tache_faite(uuid) from public, anon;
grant execute on function public.hype_tache_faite(uuid) to authenticated;
grant execute on function public.hype_est_personnel_club(text) to authenticated;
