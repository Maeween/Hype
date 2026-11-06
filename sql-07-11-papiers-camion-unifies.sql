-- HYPE ▸ 07/11/2026 — UN SEUL ENDROIT POUR LES PAPIERS DU CAMION / DU VAN.
-- Accord de Blandine le 07/11 (« Ok continue », 00 h 47). Passé en base par Claude le 07/11.
-- Doublon repéré le 06/11 : « Le camion » (Mon écurie) rangeait ses papiers dans registre_documents (type « camion »),
-- le « Dossier du concours » (Centre de compétition) dans dossier_van. Les deux sont VIDES au 07/11 : rien à déplacer.
-- On garde registre_documents (rangement privé « registre », même droits) et on lui ajoute la date de validité
-- qu'avait dossier_van. La table dossier_van n'est plus utilisée par l'appli ; elle n'est PAS supprimée.
alter table public.registre_documents add column if not exists valable_jusqu date;   -- ex. fin d'assurance, d'autorisation
-- Vérification : select column_name from information_schema.columns where table_name = 'registre_documents' and column_name = 'valable_jusqu';
