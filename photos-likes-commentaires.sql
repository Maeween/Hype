-- ============================================================================
-- HYPE · Likes et commentaires sur les photos d'album
-- 15/08/2026 · session 152
--
-- POURQUOI CE FICHIER
-- Le code de l'application est complet depuis longtemps : chargerLikesPhoto,
-- toggleLikePhoto, listerCommentairesPhoto, ajouterCommentairePhoto,
-- supprimerCommentairePhoto, signalerCommentairePhoto — tout est écrit, dans
-- les deux visionneuses. Ce sont les TABLES qui n'ont jamais été créées.
-- L'application le disait elle-même : « Commentaire impossible — table à
-- ajouter côté base ».
--
-- COMMENT L'EXÉCUTER
-- Supabase → SQL Editor → coller ce fichier entier → Run.
-- Le script est IDEMPOTENT : on peut le relancer sans rien casser. Si une
-- table existe déjà, elle est laissée telle quelle.
--
-- CE QUE ÇA NE FAIT PAS
-- Aucune suppression, aucune modification d'une table existante.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1. LES J'AIME SUR UNE PHOTO
--    Une ligne = une personne qui aime une photo. La contrainte d'unicité
--    empêche le double comptage si le doigt part deux fois.
-- ----------------------------------------------------------------------------
create table if not exists public.photo_likes (
  id          bigserial primary key,
  photo_url   text not null,
  user_id     uuid not null references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (photo_url, user_id)
);

create index if not exists photo_likes_url_idx on public.photo_likes (photo_url);

alter table public.photo_likes enable row level security;

-- Lecture : tout le monde voit le compteur.
drop policy if exists "photo_likes lecture" on public.photo_likes;
create policy "photo_likes lecture"
  on public.photo_likes for select
  using (true);

-- Écriture : on ne peut aimer qu'en son propre nom.
drop policy if exists "photo_likes ajout" on public.photo_likes;
create policy "photo_likes ajout"
  on public.photo_likes for insert
  with check (auth.uid() = user_id);

-- Retrait : on ne retire que son propre j'aime.
drop policy if exists "photo_likes retrait" on public.photo_likes;
create policy "photo_likes retrait"
  on public.photo_likes for delete
  using (auth.uid() = user_id);


-- ----------------------------------------------------------------------------
-- 2. LES COMMENTAIRES SUR UNE PHOTO
--    `cible` reprend la convention déjà utilisée ailleurs dans l'app
--    (« cheval:<id> », « ecurie:<id> »…) : elle dit d'où vient la photo.
-- ----------------------------------------------------------------------------
create table if not exists public.photo_comments (
  id          bigserial primary key,
  photo_url   text not null,
  cible       text,
  user_id     uuid not null references auth.users(id) on delete cascade,
  texte       text not null check (char_length(texte) between 1 and 500),
  created_at  timestamptz not null default now()
);

create index if not exists photo_comments_url_idx on public.photo_comments (photo_url, created_at);

alter table public.photo_comments enable row level security;

drop policy if exists "photo_comments lecture" on public.photo_comments;
create policy "photo_comments lecture"
  on public.photo_comments for select
  using (true);

drop policy if exists "photo_comments ajout" on public.photo_comments;
create policy "photo_comments ajout"
  on public.photo_comments for insert
  with check (auth.uid() = user_id);

-- Suppression : l'auteur du commentaire, ou un modérateur.
-- La liste des modérateurs est celle de l'application (HYPE_MODERATEURS).
-- ⚠️ Si un modérateur est ajouté côté application, l'ajouter ICI aussi.
drop policy if exists "photo_comments suppression" on public.photo_comments;
create policy "photo_comments suppression"
  on public.photo_comments for delete
  using (
    auth.uid() = user_id
    or lower(coalesce(auth.jwt() ->> 'email', '')) in ('feinn@live.fr', 'malicia2008@hotmail.fr')
  );


-- ----------------------------------------------------------------------------
-- 3. LES SIGNALEMENTS DE COMMENTAIRES
--    Personne ne relit ses propres signalements : on écrit, on ne lit pas.
--    Seuls les modérateurs voient la pile.
-- ----------------------------------------------------------------------------
create table if not exists public.signalements_commentaires_photos (
  id             bigserial primary key,
  commentaire_id bigint not null,
  signale_par    uuid not null references auth.users(id) on delete cascade,
  motif          text,
  created_at     timestamptz not null default now()
);

create index if not exists signalements_photos_com_idx
  on public.signalements_commentaires_photos (commentaire_id);

alter table public.signalements_commentaires_photos enable row level security;

drop policy if exists "signalements photos ajout" on public.signalements_commentaires_photos;
create policy "signalements photos ajout"
  on public.signalements_commentaires_photos for insert
  with check (auth.uid() = signale_par);

drop policy if exists "signalements photos lecture" on public.signalements_commentaires_photos;
create policy "signalements photos lecture"
  on public.signalements_commentaires_photos for select
  using (
    lower(coalesce(auth.jwt() ->> 'email', '')) in ('feinn@live.fr', 'malicia2008@hotmail.fr')
  );


-- ============================================================================
-- VÉRIFICATION — à exécuter après coup, doit renvoyer trois lignes.
--
--   select table_name from information_schema.tables
--   where table_schema = 'public'
--     and table_name in ('photo_likes','photo_comments','signalements_commentaires_photos');
--
-- Puis, dans l'application : ouvrir une photo d'album, toucher le cœur, écrire
-- un commentaire. Si le cœur reste éteint ou si le message « Commentaire
-- impossible » revient, c'est que le script n'a pas été exécuté sur la bonne
-- base ou que la ligne d'un modérateur diffère.
-- ============================================================================
