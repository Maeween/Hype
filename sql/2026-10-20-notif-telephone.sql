-- 20/10/2026 — Hype · notifications personnelles envoyées sur le téléphone (fonction notifier-notif)
-- À passer UNE fois. Relançable sans risque.
-- 1. une colonne pour ne jamais envoyer deux fois la même notification
alter table public.notifications add column if not exists pousse_le timestamptz;

-- 2. la règle : après chaque nouvelle notification personnelle d'un type choisi, on appelle la fonction avec son identifiant
create or replace function public.hype_notif_vers_telephone() returns trigger
language plpgsql security definer set search_path = public, extensions as $$
begin
  if new.destinataire is not null
     and new.type in ('identification','identification_post','identification_reponse','identification_photos','commentaire','photo','video') then
    perform net.http_post(
      url := 'https://ldpjebgtskzdokrublfg.supabase.co/functions/v1/notifier-notif',
      headers := jsonb_build_object('Content-Type', 'application/json'),
      body := jsonb_build_object('id', new.id)
    );
  end if;
  return new;
exception when others then
  return new;   -- l'envoi ne doit JAMAIS empêcher la notification d'être créée
end $$;

drop trigger if exists notif_vers_telephone on public.notifications;
create trigger notif_vers_telephone after insert on public.notifications
  for each row execute function public.hype_notif_vers_telephone();
