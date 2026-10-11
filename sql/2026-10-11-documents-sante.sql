-- Hype — refonte Santé, étape 7 : DOCUMENTS DU CARNET (ordonnances, comptes rendus, certificats, pages du carnet de vaccination…)
-- Espace de stockage PRIVÉ « sante » (aucun lien public : chaque ouverture passe par un lien temporaire)
-- + table cheval_documents. Mêmes droits que la page Santé :
--   voir      = cavalières rattachées + propriétaire + modératrices (hype_peut_voir_sante)
--   ajouter / modifier / supprimer = propriétaire + modératrices (hype_peut_ecrire_sante)
-- Fichiers rangés par cheval : sante/<id du cheval>/<nom>. Photos (jpeg, png, webp, heic) et PDF, 15 Mo au plus.
-- À passer une seule fois dans Supabase > SQL Editor.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('sante', 'sante', false, 15728640, array['image/jpeg','image/png','image/webp','image/heic','application/pdf'])
on conflict (id) do nothing;

-- lit l'id du cheval dans le chemin du fichier, sans jamais planter sur un chemin mal formé
create or replace function public.hype_cheval_du_document(p_name text)
returns uuid language sql immutable as $$
  select case when split_part(p_name, '/', 1) ~ '^[0-9a-fA-F-]{36}$' then split_part(p_name, '/', 1)::uuid else null end
$$;

create table if not exists public.cheval_documents (
  id         uuid primary key default gen_random_uuid(),
  cheval_id  uuid not null references public.chevaux(id) on delete cascade,
  soin_id    uuid references public.soins_cheval(id) on delete set null,
  type       text not null default 'autre' check (type in ('ordonnance','compte_rendu','certificat_vaccin','carnet_vaccin','protocole','facture','autre')),
  titre      text,
  date_doc   date,
  chemin     text not null,
  mime       text,
  taille     integer,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now()
);
create index if not exists cheval_documents_cheval on public.cheval_documents (cheval_id);
alter table public.cheval_documents enable row level security;
revoke all on public.cheval_documents from anon;

drop policy if exists docs_lire on public.cheval_documents;
create policy docs_lire on public.cheval_documents for select to authenticated using (public.hype_peut_voir_sante(cheval_id));
drop policy if exists docs_creer on public.cheval_documents;
create policy docs_creer on public.cheval_documents for insert to authenticated with check (public.hype_peut_ecrire_sante(cheval_id));
drop policy if exists docs_modifier on public.cheval_documents;
create policy docs_modifier on public.cheval_documents for update to authenticated using (public.hype_peut_ecrire_sante(cheval_id)) with check (public.hype_peut_ecrire_sante(cheval_id));
drop policy if exists docs_supprimer on public.cheval_documents;
create policy docs_supprimer on public.cheval_documents for delete to authenticated using (public.hype_peut_ecrire_sante(cheval_id));

-- les fichiers eux-mêmes
drop policy if exists sante_voir on storage.objects;
create policy sante_voir on storage.objects for select to authenticated
  using (bucket_id = 'sante' and public.hype_peut_voir_sante(public.hype_cheval_du_document(name)));
drop policy if exists sante_ajouter on storage.objects;
create policy sante_ajouter on storage.objects for insert to authenticated
  with check (bucket_id = 'sante' and public.hype_peut_ecrire_sante(public.hype_cheval_du_document(name)));
drop policy if exists sante_supprimer on storage.objects;
create policy sante_supprimer on storage.objects for delete to authenticated
  using (bucket_id = 'sante' and public.hype_peut_ecrire_sante(public.hype_cheval_du_document(name)));
