-- (938) Hype — le responsable d'une écurie peut RATTACHER un professionnel (véto, maréchal, ostéo, dentiste)
-- aux chevaux de son écurie. Ajoute UNE règle d'ajout sur cheval_professionnels, en plus de celle qui existe
-- (propriétaire du cheval ou modératrice). Ne donne accès à RIEN d'autre : ni lecture des soins, ni carnet,
-- ni suppression. À passer une seule fois dans Supabase > SQL Editor.
drop policy if exists chpro_creer_ecurie on public.cheval_professionnels;
create policy chpro_creer_ecurie on public.cheval_professionnels
  for insert to authenticated
  with check (
    created_by = auth.uid()
    and exists (
      select 1 from public.chevaux ch
      where ch.id = cheval_id
        and ch.club is not null
        and public.hype_est_proprietaire_club(lower(regexp_replace(btrim(public.unaccent(ch.club)), '\s+', ' ', 'g')))
    )
  );
