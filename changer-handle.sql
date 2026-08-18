-- =====================================================================
-- HYPE · 18/08/2026 · IDENTIFIANTS UNIQUES — ETAPE 2b, LA FONCTION
--
-- Decisions de Blandine, prises en conversation le 18/08 :
--   · voie B : tout se decide EN BASE, l'app ne fait que demander
--   · premier changement GRATUIT, puis 30 JOURS entre deux changements
--   · l'ancien identifiant part en reserve 6 MOIS
--   · le libelle de l'app dit « rarement modifiable », JAMAIS « definitif »
--
-- POURQUOI UNE FONCTION ET PAS `majProfil` :
--   `hype_handles_reserves` est en RLS LECTURE SEULE. Une app qui ecrit
--   directement sur `profiles` ne peut donc PAS poser la reservation —
--   l'ancien identifiant redeviendrait libre a l'instant meme, ce qui est
--   exactement ce que Blandine voulait empecher. Cette fonction est
--   SECURITY DEFINER : elle ecrit avec les droits du proprietaire, pas
--   ceux du telephone.
--
-- IDEMPOTENT. `create or replace` : relancer ce fichier ne fait rien de
-- plus. Aucun delete, aucun drop, aucune donnee existante touchee.
-- Une seule transaction : en cas d'erreur, rien ne passe.
-- =====================================================================

begin;

create or replace function public.hype_changer_handle(nouveau text)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $fn$
declare
  moi        uuid := auth.uid();
  cible      text;
  actuel     text;
  gratuit    boolean;
  dernier    timestamptz;
  DELAI      constant interval := interval '30 days';   -- entre deux changements
  RESERVE    constant interval := interval '6 months';  -- duree de mise sous cloche
begin
  -- 1. Qui demande ?
  if moi is null then
    return jsonb_build_object('ok', false, 'code', 'non_connecte');
  end if;

  -- 2. Mise en forme — LA MEME fonction que la migration du 17/08.
  --    La regle de formation n'existe qu'ici ; la fonction JS de l'app
  --    n'en est qu'un miroir de prediction.
  cible := public.hype_handle_normalise(nouveau);
  if cible is null or length(cible) < 3 then
    return jsonb_build_object('ok', false, 'code', 'format');
  end if;

  select p.handle, coalesce(p.handle_gratuit_fait, false), p.handle_change_le
    into actuel, gratuit, dernier
    from public.profiles p
   where p.id = moi;

  -- 3. Rien a faire si c'est deja le sien (ne consomme pas le quota).
  if actuel is not null and lower(actuel) = lower(cible) then
    return jsonb_build_object('ok', false, 'code', 'identique');
  end if;

  -- 4. Mot interdit.
  if exists (
    select 1 from public.hype_handles_interdits i
     where lower(i.handle) = lower(cible)
  ) then
    return jsonb_build_object('ok', false, 'code', 'interdit');
  end if;

  -- 5. Identifiant sous cloche pour quelqu'un d'autre.
  --    On laisse passer si la reservation est la SIENNE : quelqu'un a le
  --    droit de reprendre l'identifiant qu'il vient de quitter.
  if exists (
    select 1 from public.hype_handles_reserves r
     where lower(r.handle) = lower(cible)
       and r.expire_le > now()
       and (r.ancien_id is null or r.ancien_id <> moi)
  ) then
    return jsonb_build_object('ok', false, 'code', 'reserve');
  end if;

  -- 6. Quota. Le premier changement est gratuit et ignore le delai :
  --    quelqu'un a qui la migration a donne « @blandine2 » sans l'avoir
  --    choisi ne doit pas attendre pour le corriger.
  if gratuit and dernier is not null and dernier + DELAI > now() then
    return jsonb_build_object('ok', false, 'code', 'trop_tot',
                              'prochain_le', dernier + DELAI);
  end if;

  -- 7. Deja porte par quelqu'un. Confort seulement : la vraie garantie
  --    est l'index unique, dont l'echec est rattrape plus bas.
  if exists (
    select 1 from public.profiles p
     where p.id <> moi and p.handle is not null
       and lower(p.handle) = lower(cible)
  ) then
    return jsonb_build_object('ok', false, 'code', 'pris');
  end if;

  -- 8. L'ancien part sous cloche pour six mois.
  --    Le delete prealable evite une collision si cet identifiant avait
  --    deja ete reserve puis libere autrefois : sans lui, une contrainte
  --    d'unicite sur la table de reserve ferait echouer l'insert et le
  --    cavalier lirait « deja pris », ce qui serait faux.
  if actuel is not null and length(actuel) > 0 then
    delete from public.hype_handles_reserves r
     where lower(r.handle) = lower(actuel);
    insert into public.hype_handles_reserves (handle, ancien_id, libere_le, expire_le)
    values (actuel, moi, now(), now() + RESERVE);
  end if;

  -- 9. L'ecriture.
  update public.profiles
     set handle              = cible,
         handle_a_valider    = false,
         handle_change_le    = now(),
         handle_gratuit_fait = true
   where id = moi;

  return jsonb_build_object('ok', true, 'code', 'ok',
                            'handle', cible,
                            'prochain_le', now() + DELAI);

exception
  -- L'index unique sur lower(handle) a parle : deux personnes ont demande
  -- le meme identifiant a la meme seconde. Echec propre, rien n'est ecrit.
  when unique_violation then
    return jsonb_build_object('ok', false, 'code', 'pris');
end;
$fn$;

revoke all    on function public.hype_changer_handle(text) from public;
grant  execute on function public.hype_changer_handle(text) to authenticated;

commit;

-- =====================================================================
-- VERIFICATIONS — a lancer separement, apres le commit.
-- =====================================================================

-- (1) La fonction existe et son entete est juste.
-- select p.proname,
--        pg_get_function_arguments(p.oid) as entree,
--        pg_get_function_result(p.oid)    as sortie,
--        p.prosecdef                      as security_definer
--   from pg_proc p
--   join pg_namespace n on n.oid = p.pronamespace
--  where p.proname = 'hype_changer_handle';

-- (2) Un essai a blanc, SANS RIEN CHANGER : demander son identifiant
--     actuel doit repondre 'identique'.
--     A lancer depuis l'app ou avec une session, pas dans l'editeur SQL
--     (auth.uid() y est nul, la reponse serait 'non_connecte').
-- select public.hype_changer_handle('blandine');
-- =====================================================================
