-- Hype — refonte Santé, étape 5 : CONSIGNES DU CHEVAL (enrênement, matériel particulier, soins spécifiques).
-- Une ligne par cheval. Mêmes droits que la page Santé :
--   lire     = cavalières rattachées + propriétaire + modératrices (hype_peut_voir_sante)
--   écrire   = propriétaire + modératrices (hype_peut_ecrire_sante)
-- Rien d'autre n'est touché. À passer une seule fois dans Supabase > SQL Editor.
create table if not exists public.cheval_consignes (
  cheval_id  uuid primary key references public.chevaux(id) on delete cascade,
  enrenement text,
  materiel   text,
  soins      text,
  updated_by uuid default auth.uid(),
  updated_at timestamptz not null default now()
);
alter table public.cheval_consignes enable row level security;
revoke all on public.cheval_consignes from anon;

drop policy if exists consignes_lire on public.cheval_consignes;
create policy consignes_lire on public.cheval_consignes
  for select to authenticated using (public.hype_peut_voir_sante(cheval_id));

drop policy if exists consignes_creer on public.cheval_consignes;
create policy consignes_creer on public.cheval_consignes
  for insert to authenticated with check (public.hype_peut_ecrire_sante(cheval_id));

drop policy if exists consignes_modifier on public.cheval_consignes;
create policy consignes_modifier on public.cheval_consignes
  for update to authenticated using (public.hype_peut_ecrire_sante(cheval_id)) with check (public.hype_peut_ecrire_sante(cheval_id));

drop policy if exists consignes_supprimer on public.cheval_consignes;
create policy consignes_supprimer on public.cheval_consignes
  for delete to authenticated using (public.hype_peut_ecrire_sante(cheval_id));
