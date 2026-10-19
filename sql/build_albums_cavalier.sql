-- 19/10/2026 — PASSÉ EN BASE par Claude avec l'accord de Blandine (« Tu peux la passer oui », 02:17).
-- Un album « cavalier:<id> » (page Photos du cavalier) est réservé à ce cavalier et à la modération.
-- Avant : la fonction renvoyait vrai pour toute cible autre que « cheval: » → tout compte connecté pouvait
-- créer un album sur le profil d'un autre. Albums de chevaux et d'écurie : règles inchangées.
create or replace function public.hype_peut_creer_album(p_cible text)
 returns boolean
 language plpgsql
 stable security definer
 set search_path to 'public'
as $function$
declare v_id uuid;
begin
  if p_cible like 'cavalier:%' then
    return public.hype_est_moderatrice() or substr(p_cible, 10) = auth.uid()::text;
  end if;
  if p_cible is null or p_cible not like 'cheval:%' then return true; end if;
  begin v_id := substr(p_cible, 8)::uuid; exception when others then return true; end;
  if not exists (select 1 from chevaux c where c.id = v_id) then return true; end if;
  return public.hype_est_moderatrice()
      or exists (select 1 from chevaux c where c.id = v_id and c.user_id = auth.uid())
      or exists (select 1 from chevaux_liens l where l.cheval_id = v_id and l.user_id = auth.uid());
end $function$;
