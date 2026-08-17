-- ═══════════════════════════════════════════════════════════════════════════
-- HYPE · IDENTIFIANTS UNIQUES (« handles ») — 17/08/2026, session 138 bis
--
-- À PASSER DANS L'ÉDITEUR SQL DE SUPABASE, EN UNE SEULE FOIS.
-- Le fichier est IDEMPOTENT : le relancer ne casse rien et ne double rien.
-- Tout est dans UNE transaction : si une seule étape échoue, RIEN n'est écrit.
--
-- ⚠️ CE FICHIER N'A PU ÊTRE NI EXÉCUTÉ NI ANALYSÉ AVANT LIVRAISON.
--    Mon environnement n'a ni Postgres ni réseau. La logique de normalisation
--    et la génération ont été simulées à l'identique en Python sur tes six
--    comptes réels, et le résultat est celui du tableau en fin de fichier.
--    Mais la GRAMMAIRE SQL, elle, n'est vérifiée par rien d'autre que ma
--    relecture. Si une erreur apparaît, la transaction annule tout : ta base
--    reste intacte. Envoie-moi le message, je corrige.
--
-- DÉCISIONS DE BLANDINE APPLIQUÉES ICI (ses choix, ce jour) :
--   · un identifiant unique EN PLUS du nom ; le nom affiché ne change pour
--     personne, sauf l'exception nommée de l'étape 5 ;
--   · généré automatiquement depuis le pseudo existant ;
--   · le compte LE PLUS ANCIEN obtient la forme courte, les suivants un
--     suffixe numérique ;
--   · modifiable mais rare : premier changement gratuit, puis un tous les
--     60 jours, l'ancien identifiant réservé 6 mois ;
--   · le message d'invitation ne s'affiche qu'aux comptes dont le NOM ÉTAIT
--     EN DOUBLE (ses mots : « seulement les six noms en double »).
--
-- CE FICHIER NE TOUCHE À AUCUNE DONNÉE EXISTANTE, à deux exceptions près,
-- toutes deux voulues et nommées : le pseudo de hadjadj.dominique@gmail.com
-- (étape 5) et le remplissage de la nouvelle colonne (étape 6).
-- Aucune suppression, nulle part.
-- ═══════════════════════════════════════════════════════════════════════════

begin;

-- ───────────────────────────────────────────────────────────────────────────
-- ÉTAPE 1 · LES COLONNES
-- `handle` reste NULLABLE : l'app est écrite pour tolérer un identifiant vide,
-- donc l'ordre des pushs (SQL avant ou après index.html) n'a aucune importance.
-- ───────────────────────────────────────────────────────────────────────────
alter table public.profiles add column if not exists handle              text;
alter table public.profiles add column if not exists handle_a_valider    boolean not null default false;
alter table public.profiles add column if not exists handle_change_le    timestamptz;
alter table public.profiles add column if not exists handle_gratuit_fait boolean not null default false;

comment on column public.profiles.handle is
  'Identifiant unique du cavalier, sans le @. Minuscules, chiffres, point et tiret bas. Unique sur sa version minuscule.';
comment on column public.profiles.handle_a_valider is
  'Vrai = ce cavalier voit le message d''invitation à choisir son identifiant. Posé uniquement sur les noms qui étaient en double.';
comment on column public.profiles.handle_change_le is
  'Date du dernier changement d''identifiant. Sert au délai de 60 jours.';
comment on column public.profiles.handle_gratuit_fait is
  'Vrai = le premier changement gratuit a été utilisé. Après ça, le délai de 60 jours s''applique.';

-- ───────────────────────────────────────────────────────────────────────────
-- ÉTAPE 2 · LA NORMALISATION
-- Transforme un nom affiché en identifiant valide.
--
-- ⚠️ PIÈGE ÉCARTÉ : `translate()` exige des chaînes de LONGUEUR ÉGALE, sinon
--    elle tronque silencieusement. Les deux chaînes ci-dessous font exactement
--    59 caractères — compté, pas supposé. Ne pas y ajouter un caractère d'un
--    seul côté.
-- ⚠️ Les ligatures (Æ, Œ, ß) valent DEUX lettres et ne peuvent donc PAS passer
--    par translate(). Elles sont traitées avant, par replace().
-- ───────────────────────────────────────────────────────────────────────────
create or replace function public.hype_handle_normalise(src text)
returns text
language plpgsql
immutable
as $$
declare s text;
begin
  s := coalesce(src, '');

  -- ligatures d'abord : une lettre en devient deux
  s := replace(s, 'Æ', 'AE');  s := replace(s, 'æ', 'ae');
  s := replace(s, 'Œ', 'OE');  s := replace(s, 'œ', 'oe');
  s := replace(s, 'ß', 'ss');

  -- accents : 59 caractères contre 59, vérifié
  s := translate(
    s,
    'ÀÁÂÃÄÅàáâãäåÈÉÊËèéêëÌÍÎÏìíîïÒÓÔÕÖØòóôõöøÙÚÛÜùúûüÇçÑñÝýÿŠšŽž',
    'AAAAAAaaaaaaEEEEeeeeIIIIiiiiOOOOOOooooooUUUUuuuuCcNnYyySsZz'
  );

  s := lower(s);
  s := regexp_replace(s, '[^a-z0-9._ -]', '', 'g');   -- on jette le reste (emoji compris)
  s := regexp_replace(s, '[ -]+', '.', 'g');          -- espaces et tirets deviennent des points
  -- ⚠️ SECOND DÉFAUT ATTRAPÉ AVANT LIVRAISON. J'avais écrit
  --    `regexp_replace(s, '\.+', '.')`, qui ne fondait que les points entre
  --    eux. « Ambre._Rose » donnait donc `ambre._rose` — un point suivi d'un
  --    tiret bas, que la contrainte de l'étape 7 refuse. La migration
  --    elle-même aurait produit une valeur illégale et la transaction entière
  --    aurait échoué, sur un nom parfaitement banal.
  --    Corrigé : toute SUITE de séparateurs, quels qu'ils soient, se réduit au
  --    premier. « ._ » devient « . », « _. » devient « _ », « .. » devient « . ».
  s := regexp_replace(s, '([._])[._]+', '\1', 'g');
  s := regexp_replace(s, '^[._]+', '', 'g');
  s := regexp_replace(s, '[._]+$', '', 'g');
  s := regexp_replace(s, '^[^a-z]+', '', 'g');        -- doit commencer par une lettre
  s := left(s, 20);
  s := regexp_replace(s, '[._]+$', '', 'g');          -- la coupe peut laisser un point en fin

  if length(s) < 3 then
    return null;                                       -- trop court : l'appelant met un repli
  end if;
  return s;
end;
$$;

-- ───────────────────────────────────────────────────────────────────────────
-- ÉTAPE 3 · LES MOTS RÉSERVÉS ET LES ANCIENS IDENTIFIANTS
--
-- `hype_handles_interdits` : ce que personne ne peut prendre.
-- `hype_handles_reserves`  : les identifiants LIBÉRÉS par un changement, gardés
--                            6 mois pour que personne ne récupère une identité
--                            que des liens déjà partagés désignent encore.
--                            C'était la crainte de Blandine, elle est traitée ici.
-- ───────────────────────────────────────────────────────────────────────────
create table if not exists public.hype_handles_interdits (
  handle text primary key
);

insert into public.hype_handles_interdits (handle) values
  ('hype'), ('admin'), ('support'), ('equipe'), ('moderateur'), ('feinn'),
  ('staff'), ('contact'), ('aide'), ('officiel'), ('heybaby'), ('linguae')
on conflict (handle) do nothing;

create table if not exists public.hype_handles_reserves (
  handle     text primary key,
  ancien_id  uuid references auth.users(id) on delete set null,
  libere_le  timestamptz not null default now(),
  expire_le  timestamptz not null default (now() + interval '6 months')
);

create index if not exists hype_handles_reserves_expire_idx
  on public.hype_handles_reserves (expire_le);

-- ───────────────────────────────────────────────────────────────────────────
-- ÉTAPE 4 · MARQUER LES NOMS EN DOUBLE
--
-- ⚠️ CETTE ÉTAPE PASSE AVANT LE RENOMMAGE, ET CE N'EST PAS UN DÉTAIL.
--    Après l'étape 5, « Dominique » n'est plus un nom en double — les deux
--    Dominique porteront des noms distincts. Si on marquait après, aucune des
--    deux ne verrait le message, alors que c'est précisément le couple qui en
--    a le plus besoin. L'ordre 4 → 5 est donc obligatoire.
-- ───────────────────────────────────────────────────────────────────────────
update public.profiles p
set handle_a_valider = true
where coalesce(trim(p.pseudo), '') <> ''
  and lower(trim(p.pseudo)) in (
    select lower(trim(pseudo))
    from public.profiles
    where coalesce(trim(pseudo), '') <> ''
    group by lower(trim(pseudo))
    having count(*) > 1
  );

-- ───────────────────────────────────────────────────────────────────────────
-- ÉTAPE 5 · L'EXCEPTION NOMMÉE : UN SEUL RENOMMAGE
--
-- Demande explicite de Blandine, sur deux comptes qu'elle connaît
-- personnellement : « Dominique Wirtschafter est mon premier abonné, il garde
-- son nom » et « on peut temporairement l'appeler Dominique H ».
-- C'est la SEULE fois où ce fichier change un nom affiché.
-- Conséquence assumée : son identifiant devient `@dominique.h` au lieu de
-- `@dominique2` — plus lisible qu'un numéro.
-- Le « H » est provisoire : elle verra le message d'invitation (étape 4) et
-- pourra prendre `@dominique.hadjadj` avec son changement gratuit.
-- ⚠️ Dominique WIRTSCHAFTER n'est pas touchée : elle garde « Dominique ».
-- ───────────────────────────────────────────────────────────────────────────
update public.profiles p
set pseudo = 'Dominique H'
where p.id in (
        select u.id from auth.users u
        where lower(trim(u.email)) = 'hadjadj.dominique@gmail.com'
      )
  and coalesce(p.pseudo, '') <> 'Dominique H';

-- ───────────────────────────────────────────────────────────────────────────
-- ÉTAPE 6 · LA GÉNÉRATION
--
-- Le plus ancien d'abord : `row_number()` trie par date de création du COMPTE
-- (auth.users.created_at), pas du profil. Rang 1 = forme courte, rangs
-- suivants = suffixe.
-- ⚠️ Ne touche QUE les lignes où `handle` est NULL : un identifiant déjà
--    attribué n'est jamais réécrit, y compris si on relance le fichier.
-- ⚠️ Le `not exists` final évite qu'un rang tombe sur un identifiant déjà pris
--    lors d'une exécution précédente partielle.
-- ───────────────────────────────────────────────────────────────────────────
with base as (
  select p.id,
         u.created_at,
         coalesce(
           public.hype_handle_normalise(p.pseudo),
           'cavalier.' || left(replace(p.id::text, '-', ''), 6)
         ) as souche
  from public.profiles p
  join auth.users u on u.id = p.id
  where p.handle is null
),
numerote as (
  select id,
         souche,
         row_number() over (partition by souche order by created_at asc, id asc) as rang
  from base
),
propose as (
  select id,
         case when rang = 1 then souche
              else left(souche, 18) || rang::text
         end as h
  from numerote
)
update public.profiles p
set handle = pr.h
from propose pr
where p.id = pr.id
  and p.handle is null
  and not exists (
    select 1 from public.profiles q
    where q.id <> p.id and lower(q.handle) = lower(pr.h)
  );

-- ───────────────────────────────────────────────────────────────────────────
-- ÉTAPE 7 · LE VERROU
--
-- ⚠️ L'INDEX EST SUR `lower(handle)`, PAS SUR `handle`. Sans ça, « Ambre » et
--    « ambre » coexisteraient et tout le travail ci-dessus serait inutile.
-- ⚠️ Il est créé APRÈS la génération, VOLONTAIREMENT : si l'étape 6 avait
--    produit un doublon, la création échoue ici et la transaction entière est
--    annulée. Un échec bruyant valait mieux qu'un doublon silencieux.
-- La contrainte de format est posée ici aussi : elle vaut pour tout ce qui
--    sera écrit ensuite par l'app.
-- ───────────────────────────────────────────────────────────────────────────
create unique index if not exists profiles_handle_unique_idx
  on public.profiles (lower(handle))
  where handle is not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_handle_format_chk'
  ) then
    alter table public.profiles
      add constraint profiles_handle_format_chk
      -- ⚠️ DÉFAUT ATTRAPÉ AVANT LIVRAISON : ma première version était
      --    `^[a-z][a-z0-9._]{2,19}$`, qui acceptait « ambre. » — un point final
      --    que la normalisation de l'étape 2 retire pourtant toujours. Le garde
      --    était donc plus laxiste que la fonction, et l'app aurait pu écrire
      --    une forme que la migration ne produit jamais. Deux gardes qui ne
      --    disent pas la même chose, c'est une divergence qui finit en bug.
      --    Corrigé : commence par une lettre, FINIT par une lettre ou un
      --    chiffre, 3 à 20 caractères, et jamais deux séparateurs de suite.
      check (
        handle is null
        or (
          handle ~ '^[a-z][a-z0-9._]{1,18}[a-z0-9]$'
          and handle !~ '\.\.'
          and handle !~ '__'
          and handle !~ '\._'
          and handle !~ '_\.'
        )
      );
  end if;
end $$;

-- ───────────────────────────────────────────────────────────────────────────
-- ÉTAPE 8 · LES DROITS
-- Lecture publique des deux tables : l'app doit pouvoir dire « déjà pris »
-- avant de laisser valider. Aucune écriture depuis l'app : ces tables ne sont
-- alimentées que par ce fichier et par la fonction de changement à venir.
-- ───────────────────────────────────────────────────────────────────────────
alter table public.hype_handles_interdits enable row level security;
alter table public.hype_handles_reserves  enable row level security;

drop policy if exists hype_handles_interdits_lecture on public.hype_handles_interdits;
create policy hype_handles_interdits_lecture
  on public.hype_handles_interdits for select using (true);

drop policy if exists hype_handles_reserves_lecture on public.hype_handles_reserves;
create policy hype_handles_reserves_lecture
  on public.hype_handles_reserves for select using (true);

commit;

-- ═══════════════════════════════════════════════════════════════════════════
-- VÉRIFICATION — à lancer JUSTE APRÈS, et à me montrer.
-- Attendu, d'après la simulation sur tes six comptes :
--
--   feinn@live.fr                     Blandine      @blandine       à valider
--   dominique.wirtschafter@orange.fr  Dominique     @dominique      à valider
--   liamroux0@gmail.com               Liam          @liam           à valider
--   hadjadj.dominique@gmail.com       Dominique H   @dominique.h    à valider
--   fzinn@live.fr                     Blandine      @blandine2      à valider
--   liamroux0@gmail.fr                Liam          @liam2          à valider
--
-- Si une ligne diffère, ne pousse PAS index.html et dis-le moi.
-- ═══════════════════════════════════════════════════════════════════════════
select u.email,
       p.pseudo,
       '@' || p.handle          as identifiant,
       p.handle_a_valider       as a_valider,
       u.created_at::date       as compte_cree
from public.profiles p
join auth.users u on u.id = p.id
order by u.created_at asc;

-- Contrôle de sûreté : doit renvoyer ZÉRO ligne.
select lower(handle) as identifiant_en_double, count(*)
from public.profiles
where handle is not null
group by lower(handle)
having count(*) > 1;

-- Contrôle de sûreté : doit renvoyer ZÉRO ligne (aucun profil sans identifiant).
select u.email, p.pseudo
from public.profiles p
join auth.users u on u.id = p.id
where p.handle is null;
