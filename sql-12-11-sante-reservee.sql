-- HYPE ▸ 12/11/2026 — SANTÉ DU CHEVAL : le « sensible » réservé au propriétaire et à la responsable d'écurie.
-- Décision de Blandine le 12/11 (16 h 30 et 16 h 34) : « la santé est visible uniquement par le propriétaire ou responsable
-- d'écurie » ; « il faut pas bloquer tout, bloque juste l'accès à tout ce qui est un peu touchy… vaccination, date de vaccination,
-- maréchalerie… gentiment grisés, semi-flous, avec un petit mot réservé » ; « tu t'en charges et tu peux le mettre en ligne ».
-- Avant : tout cavalier qui s'ajoutait lui-même un cheval (chevaux_liens, sans accord du propriétaire) lisait ses soins et documents.
-- Après : soins (vaccins, vermifuges, maréchal, dentiste…), documents (carnets, ordonnances) et leurs fichiers =
--   propriétaire du cheval OU responsable de l'écurie du cheval (club ou écurie du cheval revendiqué / gestionnaire) OU modératrice.
-- Inchangé : consignes, équipe de soins (lisibles par les cavaliers rattachés, comme avant), et tous les droits d'écriture.

create or replace function public.hype_peut_voir_sante_sensible(p_cheval uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select public.hype_est_moderatrice()
      or exists (select 1 from public.chevaux c
                 where c.id = p_cheval
                   and (c.user_id = auth.uid()
                        or (coalesce(c.club, '') <> '' and public.hype_peut_gerer_club(lower(trim(public.unaccent(c.club)))))
                        or (coalesce(c.ecurie, '') not in ('', '__perso__') and public.hype_peut_gerer_club(lower(trim(public.unaccent(c.ecurie)))))));
$$;
revoke all on function public.hype_peut_voir_sante_sensible(uuid) from public, anon;
grant execute on function public.hype_peut_voir_sante_sensible(uuid) to authenticated;

drop policy if exists "soins_lire" on public.soins_cheval;
create policy "soins_lire" on public.soins_cheval for select to authenticated using (public.hype_peut_voir_sante_sensible(cheval_id));
drop policy if exists "docs_lire" on public.cheval_documents;
create policy "docs_lire" on public.cheval_documents for select to authenticated using (public.hype_peut_voir_sante_sensible(cheval_id));
drop policy if exists "sante_voir" on storage.objects;
create policy "sante_voir" on storage.objects for select to authenticated using ((bucket_id = 'sante') and public.hype_peut_voir_sante_sensible(public.hype_cheval_du_document(name)));

-- Retour arrière (si besoin) : remettre hype_peut_voir_sante(...) à la place de hype_peut_voir_sante_sensible(...) dans les 3 policies.
