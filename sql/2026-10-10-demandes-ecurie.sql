-- HYPE · 10/10/2026 · « Réclamer la page de son écurie » (à lancer par Blandine dans Supabase > SQL)
-- 1. La table des demandes. Personne n'y écrit directement : tout passe par les deux fonctions ci-dessous.
create table if not exists public.demandes_ecurie (
  id uuid primary key default gen_random_uuid(),
  club_clef text not null,
  nom_club text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  nom text, role text, telephone text, email_contact text, affiliation_ffe text, message text,
  statut text not null default 'en_attente' check (statut in ('en_attente', 'acceptee', 'refusee')),
  cree_le timestamptz not null default now(),
  traite_le timestamptz,
  traite_par uuid
);
alter table public.demandes_ecurie enable row level security;
create unique index if not exists demandes_ecurie_une_en_attente
  on public.demandes_ecurie (user_id, club_clef) where statut = 'en_attente';
-- Lecture : chacun voit SES demandes, les modératrices voient tout.
create policy "demandes ecurie lecture" on public.demandes_ecurie
  for select to authenticated using (user_id = auth.uid() or public.hype_est_moderatrice());

-- 2. Envoyer une demande (n'importe quel compte connecté). Refusée si l'écurie a déjà une responsable.
create or replace function public.hype_demander_ecurie(
  p_clef text, p_nom_club text, p_nom text, p_role text, p_tel text, p_email text, p_ffe text, p_message text)
returns text language plpgsql security definer set search_path = public, auth as $$
declare v_id uuid;
begin
  if auth.uid() is null then return 'non_connecte'; end if;
  if coalesce(trim(p_clef), '') = '' then return 'ecurie_inconnue'; end if;
  if exists (select 1 from public.clubs_revendiques where clef = p_clef) then return 'deja_revendiquee'; end if;
  if exists (select 1 from public.demandes_ecurie where user_id = auth.uid() and club_clef = p_clef and statut = 'en_attente') then return 'deja_envoyee'; end if;
  insert into public.demandes_ecurie (club_clef, nom_club, user_id, nom, role, telephone, email_contact, affiliation_ffe, message)
  values (p_clef, left(p_nom_club, 200), auth.uid(), left(p_nom, 120), left(p_role, 60), left(p_tel, 40), left(p_email, 160), left(p_ffe, 40), left(p_message, 1000))
  returning id into v_id;
  -- notification aux modératrices
  insert into public.notifications (destinataire, acteur, type, cible, extrait)
  select u.id, auth.uid(), 'demande-ecurie', 'demande-ecurie:' || v_id, left(p_nom_club, 120)
    from auth.users u where lower(u.email) in ('feinn@live.fr', 'malicia2008@hotmail.fr');
  return 'ok';
end $$;

-- 3. Accepter ou refuser (modératrices seulement). Accepter = la personne devient responsable de l'écurie.
create or replace function public.hype_traiter_demande_ecurie(p_id uuid, p_accepter boolean)
returns text language plpgsql security definer set search_path = public, auth as $$
declare d public.demandes_ecurie%rowtype; v_email text;
begin
  if not public.hype_est_moderatrice() then return 'interdit'; end if;
  select * into d from public.demandes_ecurie where id = p_id for update;
  if not found then return 'introuvable'; end if;
  if d.statut <> 'en_attente' then return d.statut; end if;
  if p_accepter then
    select email into v_email from auth.users where id = d.user_id;
    insert into public.clubs_revendiques (clef, email, ville) values (d.club_clef, v_email, null)
      on conflict (clef) do nothing;
    if not found then return 'deja_revendiquee'; end if;
  end if;
  update public.demandes_ecurie set statut = case when p_accepter then 'acceptee' else 'refusee' end,
    traite_le = now(), traite_par = auth.uid() where id = p_id;
  insert into public.notifications (destinataire, acteur, type, cible, extrait)
  values (d.user_id, auth.uid(), case when p_accepter then 'demande-ecurie-acceptee' else 'demande-ecurie-refusee' end,
          'ecurie:' || d.nom_club, left(d.nom_club, 120));
  return case when p_accepter then 'acceptee' else 'refusee' end;
end $$;

revoke all on function public.hype_demander_ecurie(text, text, text, text, text, text, text, text) from public, anon;
grant execute on function public.hype_demander_ecurie(text, text, text, text, text, text, text, text) to authenticated;
revoke all on function public.hype_traiter_demande_ecurie(uuid, boolean) from public, anon;
grant execute on function public.hype_traiter_demande_ecurie(uuid, boolean) to authenticated;
