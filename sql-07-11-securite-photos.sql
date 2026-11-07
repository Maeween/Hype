-- 07/11/2026 — Sécurité des photos — DÉJÀ PASSÉ EN BASE par Claude (migration securite_photos_identifications_dates_20261107),
-- sur accord de Blandine (« Ok continue », 01:20). Ce fichier est la trace ; le relancer ne casse rien.
-- 1) identifications : sur une VRAIE photo (adresse http), identifier une autre cavalière ou un cheval qui n'est pas à soi
--    arrive toujours « en attente ». L'auteur ne peut plus passer lui-même en « acceptée » : seules la personne identifiée,
--    la propriétaire du cheval ou la modération. Mentions dans les commentaires / publications (post:, photocom:…) inchangées.
create or replace function public.hype_identification_garde() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  moi uuid := auth.uid();
  droit boolean;
begin
  if moi is null or hype_est_moderatrice() then return new; end if;
  if new.statut is distinct from 'accepte' then return new; end if;
  droit := (new.cible_id = moi::text)
        or (new.type = 'cheval' and exists (select 1 from chevaux c where c.id::text = new.cible_id and c.user_id = moi))
        or new.type not in ('cavalier','cheval');
  if tg_op = 'INSERT' then
    if new.photo_url ~ '^https?://' and not droit then new.statut := 'attente'; end if;
    return new;
  end if;
  if (old.statut is distinct from 'accepte' or new.cible_id is distinct from old.cible_id or new.photo_url is distinct from old.photo_url)
     and not droit then
    raise exception 'Seule la personne identifiée (ou la propriétaire du cheval) peut accepter cette identification.';
  end if;
  return new;
end $$;
drop trigger if exists hype_identification_garde on public.identifications;
create trigger hype_identification_garde before insert or update on public.identifications
  for each row execute function public.hype_identification_garde();

-- 2) photo_dates : on ne date que ses propres photos (rangées dans son dossier), sauf modération.
create or replace function public.hype_peut_dater(url text) returns boolean
language sql stable security definer set search_path = public as $$
  select hype_est_moderatrice()
      or url !~ '^https?://[^/]+/storage/v1/object/public/'
      or split_part(regexp_replace(url, '^https?://[^/]+/storage/v1/object/public/[^/]+/', ''), '/', 1) = auth.uid()::text
$$;
drop policy if exists "photo_dates insertion par proprietaire" on public.photo_dates;
create policy "photo_dates insertion par proprietaire" on public.photo_dates
  for insert with check (auth.uid() = user_id and hype_peut_dater(photo_url));
drop policy if exists "photo_dates maj par proprietaire ou moderatrice" on public.photo_dates;
create policy "photo_dates maj par proprietaire ou moderatrice" on public.photo_dates
  for update using ((auth.uid() = user_id) or hype_est_moderatrice())
  with check (((auth.uid() = user_id) and hype_peut_dater(photo_url)) or hype_est_moderatrice());
