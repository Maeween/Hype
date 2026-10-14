-- HYPE — Vérification Premium Famille (LECTURE SEULE : ne modifie rien)
with v(controle, resultat) as (
  -- 1. Tables présentes
  select 'Tables Famille présentes (4 attendues)',
         case when (select count(*) from pg_tables where schemaname='public'
                    and tablename in ('familles','famille_membres','famille_journal','famille_essais')) = 4 then 'OK' else 'PROBLÈME' end
  -- 2. Sécurité ligne par ligne activée
  union all select 'Sécurité RLS activée sur les 4 tables',
         case when (select count(*) from pg_class c join pg_namespace n on n.oid=c.relnamespace
                    where n.nspname='public' and c.relname in ('familles','famille_membres','famille_journal','famille_essais')
                      and c.relrowsecurity) = 4 then 'OK' else 'PROBLÈME' end
  -- 3. Règles de lecture
  union all select 'Règles de lecture (3 attendues)',
         case when (select count(*) from pg_policies where schemaname='public'
                    and policyname in ('familles_lecture','famille_membres_lecture','famille_journal_lecture')) = 3 then 'OK' else 'PROBLÈME' end
  -- 4. Utilisateurs connectés : lecture seule, aucune écriture
  union all select 'Connectés : aucune écriture directe sur les tables',
         case when not exists (select 1 from information_schema.role_table_grants
                    where table_schema='public' and table_name in ('familles','famille_membres','famille_journal','famille_essais')
                      and grantee in ('anon','authenticated') and privilege_type <> 'SELECT') then 'OK' else 'PROBLÈME' end
  union all select 'Visiteurs non connectés : aucun accès aux tables',
         case when not exists (select 1 from information_schema.role_table_grants
                    where table_schema='public' and table_name in ('familles','famille_membres','famille_journal','famille_essais')
                      and grantee = 'anon') then 'OK' else 'PROBLÈME' end
  union all select 'Table des essais : illisible pour les connectés',
         case when not has_table_privilege('authenticated','public.famille_essais','SELECT') then 'OK' else 'PROBLÈME' end
  -- 5. Fonctions présentes
  union all select 'Fonctions Famille présentes (14 attendues)',
         case when (select count(*) from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public'
                    and p.proname in ('famille_de_moi','famille_inviter','famille_controle_code','famille_accepter','famille_refuser',
                                      'famille_retirer','famille_quitter','famille_voir_invitation','famille_mon_etat','famille_ouvrir',
                                      'famille_maj','famille_du_compte','famille_fin_rattachements','hype_droits')) = 14 then 'OK' else 'PROBLÈME' end
  -- 6. Fonctions réservées au serveur : fermées à l'appli
  union all select 'famille_ouvrir : refusée aux connectés et visiteurs',
         case when not has_function_privilege('authenticated','public.famille_ouvrir(uuid,text,text,timestamptz,timestamptz)','EXECUTE')
               and not has_function_privilege('anon','public.famille_ouvrir(uuid,text,text,timestamptz,timestamptz)','EXECUTE')
               and has_function_privilege('service_role','public.famille_ouvrir(uuid,text,text,timestamptz,timestamptz)','EXECUTE') then 'OK' else 'PROBLÈME' end
  union all select 'famille_maj : refusée aux connectés et visiteurs',
         case when not has_function_privilege('authenticated','public.famille_maj(text,text,timestamptz,timestamptz)','EXECUTE')
               and not has_function_privilege('anon','public.famille_maj(text,text,timestamptz,timestamptz)','EXECUTE')
               and has_function_privilege('service_role','public.famille_maj(text,text,timestamptz,timestamptz)','EXECUTE') then 'OK' else 'PROBLÈME' end
  union all select 'famille_du_compte : refusée aux connectés et visiteurs',
         case when not has_function_privilege('authenticated','public.famille_du_compte(uuid)','EXECUTE')
               and not has_function_privilege('anon','public.famille_du_compte(uuid)','EXECUTE') then 'OK' else 'PROBLÈME' end
  union all select 'famille_controle_code (interne) : refusée aux connectés et visiteurs',
         case when not has_function_privilege('authenticated','public.famille_controle_code(text)','EXECUTE')
               and not has_function_privilege('anon','public.famille_controle_code(text)','EXECUTE') then 'OK' else 'PROBLÈME' end
  -- 7. Fonctions de l'appli : connectés oui, visiteurs non
  union all select 'Fonctions de l''appli : ouvertes aux connectés, fermées aux visiteurs',
         case when has_function_privilege('authenticated','public.famille_accepter(text)','EXECUTE')
               and has_function_privilege('authenticated','public.famille_mon_etat()','EXECUTE')
               and not has_function_privilege('anon','public.famille_accepter(text)','EXECUTE')
               and not has_function_privilege('anon','public.famille_inviter()','EXECUTE')
               and not has_function_privilege('anon','public.famille_mon_etat()','EXECUTE')
               and not has_function_privilege('anon','public.hype_droits(uuid)','EXECUTE') then 'OK' else 'PROBLÈME' end
  -- 8. Contraintes d'unicité (pas de 3e cavalier, une famille par personne, code unique, une famille par titulaire)
  union all select 'Garde-fous d''unicité (4 attendus)',
         case when (select count(*) from pg_indexes where schemaname='public' and indexname in
                    ('familles_une_en_cours_par_titulaire','famille_un_beneficiaire_en_cours','famille_une_famille_par_beneficiaire','famille_code_unique')) = 4 then 'OK' else 'PROBLÈME' end
  -- 9. Fin automatique des rattachements
  union all select 'Déclencheur de fin de famille présent',
         case when exists (select 1 from pg_trigger where tgname='famille_fin_rattachements' and not tgisinternal) then 'OK' else 'PROBLÈME' end
  -- 10. Nouvelle sorte d'alerte acceptée
  union all select 'Alerte « compte supprimé avec abonnement actif » acceptée',
         case when (select pg_get_constraintdef(oid) from pg_constraint where conname='paiements_a_verifier_anomalie_check') like '%compte_supprime_abonnement_actif%' then 'OK' else 'PROBLÈME' end
  -- 11. Rien n'est encore créé
  union all select 'Aucune famille en base (normal : pas encore en vente)',
         case when (select count(*) from public.familles) = 0 then 'OK' else 'PROBLÈME' end
  -- 12. Les abonnés actuels gardent exactement le même Premium
  union all select 'Comptes Premium inchangés (empreinte d''avant : 09da5347…)',
         case when (select md5(string_agg(id::text || ':' || coalesce(public.hype_est_premium(id)::text,'null'), ',' order by id)) from auth.users)
                   = '09da5347c3e3943ea3dc2723f69730c7' then 'OK' else 'À REGARDER (un compte a peut-être changé depuis, ex. inscription)' end
)
select controle, resultat from v;
