-- 09/11/2026 — passé en base par Claude avec l'accord de Blandine (« Vas y fais le »).
-- Conseils Hey Baby envoyés à un cavalier : effacer de SA liste (l'auteur garde) + lecture réservée aux Premium.
alter table public.epingles_partages add column if not exists masque_le timestamptz;
create or replace function public.hype_masquer_partage(p_id uuid) returns void
language sql security definer set search_path = public as $$
  update public.epingles_partages set masque_le = now()
   where id = p_id and destinataire_id = auth.uid();
$$;
revoke all on function public.hype_masquer_partage(uuid) from public;
grant execute on function public.hype_masquer_partage(uuid) to authenticated;
alter policy hb_epingle_select_partage on public.echanges_heybaby_epingles using (
  exists (select 1 from public.epingles_partages p
           where p.epingle_id = echanges_heybaby_epingles.id
             and public.hype_est_premium_interne(auth.uid())
             and ((p.destinataire_id = auth.uid() and p.masque_le is null)
                  or (p.groupe_id is not null and public.hype_groupe_voit(p.groupe_id)))));
