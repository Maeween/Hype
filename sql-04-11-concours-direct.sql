-- 04/11/2026 22h : mémoire (3 min) des passages et résultats lus sur Winjump par la fonction serveur direct-concours.
-- Accès réservé au serveur : aucune règle de lecture pour l'appli (la fonction filtre ce que chacune voit). PASSÉ EN BASE.
create table if not exists public.concours_direct (
  agenda_id uuid primary key references public.club_agenda(id) on delete cascade,
  lien text,
  donnees jsonb not null default '{}'::jsonb,
  maj_le timestamptz not null default now()
);
alter table public.concours_direct enable row level security;
