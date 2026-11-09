-- 09/11/2026 (Blandine : « A ») — points de télémat dont la virgule avait été effacée par l'ancien import
-- (nb() : « 1.88 » → 188). 21 lignes vidées (points = null) ; l'import corrigé (hype-import-ffe.js v30)
-- les remplira au prochain import du télémat (il ne complète que les points vides).
-- SAUVEGARDE des anciennes valeurs (id → points enregistré à tort) :
-- 6ee487ba-3032-4578-adeb-c1f84cc2bd5d 225 | 80a3fc78-a808-4bcf-9516-c8ab75123ec7 225 | 157423a3-398c-4665-b53b-79bf8802adc6 225
-- debde0eb-38d8-475a-8ec3-94e641bbb771 225 | 80ad5975-7954-4df2-872b-58ae359b42ef 225 | e140b6fd-c597-48ee-97bf-f4e5cd524576 375
-- 60aa5ce6-ae88-4a63-9e2a-b6d27d749e28 188 | b87df4d2-b708-4932-b00f-553ba0f032e2 225 | 3c28d9b9-b288-4e37-8e1d-1b32e697eb3d 225
-- 635c470e-8b3d-4669-bb71-6d9da36e2a0e 187 | c4cc7071-fe3e-4f47-a0a9-b76334549770 375 | 7d96d446-8d7b-4c71-a279-9f6a4741feff 188
-- d99b7ea2-bccb-4d23-94f1-a6ef5a1a084a 525 | e5e38aea-f88b-4f9f-b6e0-5dd48cf43e39 225 | fde11db4-68e8-459f-8d22-f2cdb482b323 125
-- 177e2bf6-6073-4bf8-90ef-3be5cec26d17 375 | 072a1e1e-6c02-4163-b45a-e6967103944f 375 | 45ea1748-8c93-4190-98c4-4916300b498c 188
-- 0e8a7628-4f35-4b0e-a930-1f5a6907115b 375 | dcf1fd90-8f1d-456d-8482-ae82d795df3e 405 | 01518bce-edc1-4e94-80ef-1a77766f68fa 135
update resultats set points = null where points >= 100 and id in (
 '6ee487ba-3032-4578-adeb-c1f84cc2bd5d','80a3fc78-a808-4bcf-9516-c8ab75123ec7','157423a3-398c-4665-b53b-79bf8802adc6','debde0eb-38d8-475a-8ec3-94e641bbb771',
 '80ad5975-7954-4df2-872b-58ae359b42ef','e140b6fd-c597-48ee-97bf-f4e5cd524576','60aa5ce6-ae88-4a63-9e2a-b6d27d749e28','b87df4d2-b708-4932-b00f-553ba0f032e2',
 '3c28d9b9-b288-4e37-8e1d-1b32e697eb3d','635c470e-8b3d-4669-bb71-6d9da36e2a0e','c4cc7071-fe3e-4f47-a0a9-b76334549770','7d96d446-8d7b-4c71-a279-9f6a4741feff',
 'd99b7ea2-bccb-4d23-94f1-a6ef5a1a084a','e5e38aea-f88b-4f9f-b6e0-5dd48cf43e39','fde11db4-68e8-459f-8d22-f2cdb482b323','177e2bf6-6073-4bf8-90ef-3be5cec26d17',
 '072a1e1e-6c02-4163-b45a-e6967103944f','45ea1748-8c93-4190-98c4-4916300b498c','0e8a7628-4f35-4b0e-a930-1f5a6907115b','dcf1fd90-8f1d-456d-8482-ae82d795df3e',
 '01518bce-edc1-4e94-80ef-1a77766f68fa');
-- PASSÉ EN BASE le 09/11 vers 12h10 : 21 lignes.
