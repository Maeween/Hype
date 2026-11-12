-- HYPE ▸ 12/11/2026 — « MON COFFRE-FORT » : le registre des documents personnels de chaque compte.
-- Accord de Blandine le 12/11 (« Premium et r 2 oui on peut faire les deux vas y », 14 h 05), après explication :
-- « un petit registre de tes documents (nom, type, cheval rattaché, échéance, qui l'a déposé) ; chaque compte ne voit,
-- ne modifie et ne supprime que ses propres lignes ; personne d'autre, ni coach, ni écurie, ni modératrice ».
-- Les fichiers vont dans l'espace privé « documents » créé le 10/11 (chaque compte n'accède qu'à son dossier <son id>/).
-- Ne touche à aucune donnée existante, ni aux abonnements, ni aux droits existants.

create table if not exists public.coffre_documents (
  id           uuid primary key default gen_random_uuid(),
  proprietaire uuid not null default auth.uid(),
  type         text not null default 'autre',   -- licence, vaccins, vehicule, assurance, contrat, autre
  titre        text,
  cheval_id    uuid references public.chevaux(id) on delete set null,
  echeance     date,                            -- facultative : assurance, contrôle technique, licence…
  chemin       text,                            -- <proprietaire>/<id>-<nom du fichier> dans l'espace « documents »
  mime         text,
  taille       integer,
  rappel_le    timestamptz,                     -- quand Hype a prévenu de l'échéance (une seule fois)
  created_at   timestamptz not null default now()
);
create index if not exists coffre_documents_proprietaire on public.coffre_documents (proprietaire);
create index if not exists coffre_documents_cheval on public.coffre_documents (cheval_id);
alter table public.coffre_documents enable row level security;
create policy "coffre_lire" on public.coffre_documents for select to authenticated using (proprietaire = auth.uid());
create policy "coffre_creer" on public.coffre_documents for insert to authenticated with check (proprietaire = auth.uid());
create policy "coffre_modifier" on public.coffre_documents for update to authenticated using (proprietaire = auth.uid()) with check (proprietaire = auth.uid());
create policy "coffre_supprimer" on public.coffre_documents for delete to authenticated using (proprietaire = auth.uid());

-- Vérification : select count(*) from pg_policies where tablename = 'coffre_documents';  → 4
