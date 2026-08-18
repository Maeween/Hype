-- =====================================================================
-- HYPE · 18/08/2026 · LE NOM AFFICHE PREND UN QUOTA
--
-- Constat de Blandine, verifie dans le code : un commentaire n'enregistre
-- que `user_id`. Le nom affiche est donc relu sur le profil a chaque
-- lecture. Karine commente aujourd'hui, se renomme Gertrude demain, et
-- TOUS ses anciens commentaires disent Gertrude. Ses mots : « il peut se
-- renommer et aller poster partout, c'est pas acceptable ».
--
-- Decisions de Blandine, 18/08 :
--   · premier changement de nom GRATUIT
--   · ensuite 7 JOURS entre deux changements
--   · plus tard, une boutique permettra de SAUTER le delai — jamais
--     d'acheter le DROIT de changer : personne ne doit rester prisonnier
--     d'un nom (mariage, divorce, faute de frappe).
--
-- LA PREMIERE POSE N'EST PAS UN CHANGEMENT. L'app ecrit le pseudo toute
-- seule a l'inscription et a la synchronisation du profil. Un compte sans
-- nom passe donc SANS consommer quoi que ce soit — sinon l'inscription
-- casserait au premier ecran.
--
-- IDEMPOTENT : `add column if not exists`, `create or replace`. Aucun
-- delete, aucun drop. Une seule transaction : en cas d'erreur, rien ne
-- passe et la base reste intacte.
-- =====================================================================

begin;

alter table public.profiles
  add column if not exists pseudo_change_le    timestamptz,
  add column if not exists pseudo_gratuit_fait boolean not null default false;

create or replace function public.hype_changer_pseudo(nouveau text)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $fn$
declare
  moi      uuid := auth.uid();
  cible    text;
  actuel   text;
  gratuit  boolean;
  dernier  timestamptz;
  DELAI    constant interval := interval '7 days';
begin
  if moi is null then
    return jsonb_build_object('ok', false, 'code', 'non_connecte');
  end if;

  -- Meme mise en forme que l'app : on coupe les blancs et on borne a 30.
  cible := left(btrim(coalesce(nouveau, '')), 30);
  if length(cible) < 2 then
    return jsonb_build_object('ok', false, 'code', 'format');
  end if;

  select p.pseudo, coalesce(p.pseudo_gratuit_fait, false), p.pseudo_change_le
    into actuel, gratuit, dernier
    from public.profiles p
   where p.id = moi;

  -- Deja le sien : ne consomme rien.
  if actuel is not null and actuel = cible then
    return jsonb_build_object('ok', false, 'code', 'identique');
  end if;

  -- PREMIERE POSE : compte vierge, l'app remplit. Hors quota.
  if actuel is null or length(btrim(actuel)) = 0 then
    update public.profiles set pseudo = cible where id = moi;
    return jsonb_build_object('ok', true, 'code', 'ok',
                              'pseudo', cible, 'premiere_pose', true);
  end if;

  -- Quota : le premier VRAI changement est gratuit, les suivants attendent.
  if gratuit and dernier is not null and dernier + DELAI > now() then
    return jsonb_build_object('ok', false, 'code', 'trop_tot',
                              'prochain_le', dernier + DELAI);
  end if;

  update public.profiles
     set pseudo              = cible,
         pseudo_change_le    = now(),
         pseudo_gratuit_fait = true
   where id = moi;

  return jsonb_build_object('ok', true, 'code', 'ok',
                            'pseudo', cible,
                            'prochain_le', now() + DELAI);
end;
$fn$;

revoke all     on function public.hype_changer_pseudo(text) from public;
grant  execute on function public.hype_changer_pseudo(text) to authenticated;

commit;

-- =====================================================================
-- VERIFICATIONS — a lancer separement, apres le commit.
-- =====================================================================

-- (1) Les deux colonnes et la fonction sont la.
-- select 'colonne' as genre, column_name as nom
--   from information_schema.columns
--  where table_name = 'profiles' and column_name like 'pseudo%'
-- union all
-- select 'fonction', proname from pg_proc where proname = 'hype_changer_pseudo'
-- order by 1, 2;
--   Attendu : pseudo · pseudo_change_le · pseudo_gratuit_fait · hype_changer_pseudo

-- (2) Personne n'est marque comme ayant deja consomme son changement :
--     tout le monde part avec son gratuit intact.
-- select count(*) filter (where pseudo_gratuit_fait) as deja_consomme,
--        count(*)                                    as comptes
--   from public.profiles;
--   Attendu : 0 sur 41.
-- =====================================================================
