-- HYPE ▸ 07/11/2026 — MON ÉCURIE : « LE STOCK » (foin, paille, aliments, copeaux… avec alerte quand il faut recommander).
-- Idée n° 8 de la liste « soulager le dirigeant » ; carte blanche de Blandine (07/11 10 h 30 puis « Ok continue » 11 h 22).
-- Passé en base par Claude le 07/11. Ne touche à aucune table existante. Droits : responsables de l'écurie et modératrices.
create table if not exists public.ecurie_stock (
  id uuid primary key default gen_random_uuid(),
  club_clef text not null,
  nom text not null,               -- ex. « Foin », « Granulés Cavalor »
  categorie text,                  -- Fourrage, Litière, Aliment, Soins, Autre
  quantite numeric,                -- ce qu'il reste
  unite text,                      -- bottes, sacs, balles, kg…
  seuil numeric,                   -- en dessous : « À recommander »
  fournisseur text,
  derniere_commande date,
  notes text,
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now(),
  maj_le timestamptz not null default now()
);
create index if not exists ecurie_stock_club on public.ecurie_stock (club_clef);
alter table public.ecurie_stock enable row level security;
create policy "stock_lire" on public.ecurie_stock for select to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "stock_creer" on public.ecurie_stock for insert to authenticated
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "stock_modifier" on public.ecurie_stock for update to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef))
  with check (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "stock_supprimer" on public.ecurie_stock for delete to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
