-- HYPE · STORIES v7 (13/08/2026) — la colonne de la musique.
-- Une seule ligne. La story stocke une REFERENCE ("warriors"), jamais une URL.
alter table public.hype_stories add column if not exists musique text;
