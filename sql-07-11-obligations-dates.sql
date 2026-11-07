-- HYPE ▸ 07/11/2026 — LES OBLIGATIONS : DATES À SURVEILLER + CARTES PRO DU PERSONNEL.
-- Carte blanche de Blandine (07/11 10 h 30 : « continue, fais tout ce que tu peux, tu as carte blanche »). Passé en base par Claude le 07/11.
-- Ajoute seulement des colonnes vides ; ne touche à aucune donnée. Mêmes droits que les tables existantes.
-- Ces dates remontent dans « Les échéances » : vérification des extincteurs (+1 an), mise à jour du document unique (+1 an),
-- fin de l'assurance responsabilité civile, vérification de la trousse de secours (+6 mois), fin de carte pro de chaque enseignant.
alter table public.ecurie_registre add column if not exists extincteurs_verif date;   -- dernière vérification des extincteurs
alter table public.ecurie_registre add column if not exists duerp_maj date;           -- dernière mise à jour du document unique
alter table public.ecurie_registre add column if not exists assurance_rc_fin date;    -- fin de l'assurance responsabilité civile
alter table public.ecurie_registre add column if not exists trousse_verif date;       -- dernière vérification de la trousse de secours
alter table public.registre_personnel add column if not exists carte_pro_numero text;  -- carte professionnelle d'éducateur sportif
alter table public.registre_personnel add column if not exists carte_pro_fin date;      -- fin de validité de la carte pro
