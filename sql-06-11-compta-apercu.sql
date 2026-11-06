-- HYPE ▸ 06/11/2026 — MON ÉCURIE : « MA COMPTA » (démonstration de préparation compta).
-- Accord de Blandine le 06/11 (« Ok », 13 h 07). Passé en base par Claude le 06/11.
-- Une ligne par écurie et par année : un résumé préparé à partir de la banque (entrées, sorties, ce qui reste à trier,
-- ce qui a été trouvé pour le registre). Les CHIFFRES ne sont pas dans ce fichier ni dans le dépôt : ils sont écrits
-- directement en base, lisibles seulement par les responsables de l'écurie (et les modératrices).
-- Hype aide à préparer : la compta reste celle de la structure, validée par elle (ou son comptable).
-- Ne touche à aucune table existante.

create table if not exists public.compta_apercus (
  club_clef  text not null,
  annee      integer not null,
  donnees    jsonb not null default '{}'::jsonb,   -- entrees, sorties, operations, sans_ticket, a_classer, versements, postes, trouves
  source     text,                                 -- ex. « Qonto, au 04/11/2026 »
  maj_le     timestamptz not null default now(),
  primary key (club_clef, annee)
);
alter table public.compta_apercus enable row level security;
-- Lecture : responsables de l'écurie et modératrices. Écriture : modératrices seulement (le résumé est préparé, pas saisi).
create policy "compta_lire" on public.compta_apercus for select to authenticated
  using (public.hype_est_moderatrice() or public.hype_peut_gerer_club(club_clef));
create policy "compta_ecrire" on public.compta_apercus for all to authenticated
  using (public.hype_est_moderatrice()) with check (public.hype_est_moderatrice());

-- Vérification : select count(*) from pg_policies where tablename = 'compta_apercus';  → 2
