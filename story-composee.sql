-- HYPE · STORIES v18 (13/08/2026) — la story composée (fondations).
-- `groupe` relie les photos d'une même story ; `disposition` (sur la
-- couverture) dit comment elle se déplie ("hd" : la grande, le texte, la table).
alter table public.hype_stories add column if not exists groupe text;
alter table public.hype_stories add column if not exists disposition text;
