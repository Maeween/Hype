-- HYPE — 10/10/2026 — Validation automatique : PRÉVENIR AUSSI LES MODÉRATRICES
-- À lancer APRÈS la mise en ligne du build 869 (sinon l'appli ne saurait pas afficher cette notification).
-- Remplace seulement la fonction hype_demander_ecurie : même fonctionnement que le SQL précédent,
-- avec en plus une notification « X a récupéré la page de … » pour feinn@live.fr et malicia2008@hotmail.fr.

create or replace function public.hype_demander_ecurie(p_clef text, p_nom_club text, p_nom text, p_role text, p_tel text, p_email text, p_ffe text, p_message text)
 returns text
 language plpgsql
 security definer
 set search_path to 'public', 'auth'
as $function$
declare v_id uuid; v_email text; v_auto boolean := false;
begin
  if auth.uid() is null then return 'non_connecte'; end if;
  if coalesce(trim(p_clef), '') = '' then return 'ecurie_inconnue'; end if;
  if exists (select 1 from public.clubs_revendiques where clef = p_clef) then return 'deja_revendiquee'; end if;
  if exists (select 1 from public.demandes_ecurie where user_id = auth.uid() and club_clef = p_clef and statut = 'en_attente') then return 'deja_envoyee'; end if;
  -- e-mail du compte, seulement s'il a été confirmé
  select lower(trim(email)) into v_email from auth.users where id = auth.uid() and email_confirmed_at is not null;
  if v_email is not null and exists (select 1 from public.clubs_emails_annuaire where clef = p_clef and email = v_email) then
    v_auto := true;
  end if;
  insert into public.demandes_ecurie (club_clef, nom_club, user_id, nom, role, telephone, email_contact, affiliation_ffe, message)
  values (p_clef, left(p_nom_club, 200), auth.uid(), left(p_nom, 120), left(p_role, 60), left(p_tel, 40), left(p_email, 160), left(p_ffe, 40), left(p_message, 1000))
  returning id into v_id;
  if v_auto then
    insert into public.clubs_revendiques (clef, email, ville) values (p_clef, v_email, null) on conflict (clef) do nothing;
    update public.demandes_ecurie set statut = 'acceptee', traite_le = now(), traite_par = null where id = v_id;
    insert into public.notifications (destinataire, acteur, type, cible, extrait)
    values (auth.uid(), auth.uid(), 'demande-ecurie-acceptee', 'ecurie:' || left(p_nom_club, 200), left(p_nom_club, 120));
    -- les moderatrices sont prevenues aussi (Blandine, 10/10)
    insert into public.notifications (destinataire, acteur, type, cible, extrait)
    select u.id, auth.uid(), 'demande-ecurie-auto', 'demande-ecurie:' || v_id, left(p_nom_club, 120)
      from auth.users u where lower(u.email) in ('feinn@live.fr', 'malicia2008@hotmail.fr');
    return 'ok';
  end if;
  insert into public.notifications (destinataire, acteur, type, cible, extrait)
  select u.id, auth.uid(), 'demande-ecurie', 'demande-ecurie:' || v_id, left(p_nom_club, 120)
    from auth.users u where lower(u.email) in ('feinn@live.fr', 'malicia2008@hotmail.fr');
  return 'ok';
end $function$;
