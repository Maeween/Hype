/* HYPE ▸ 04/11/2026 — ESPACE « MON ÉCURIE » (gestion d'écurie), ÉTAPE 1 : pages « Mon écurie » et « Le registre ».
   Demande de Blandine (04/11, 21 h 40) : priorité absolue avant le Salon du Cheval ; 22 h 18 : « plus proche du design
   habituel » (capture de la Vidéothèque) ; 23 h 06 : « Ok » à la version 2 des maquettes.
   DESIGN : celui de la page d'accueil de la Vidéothèque (hype-video.js), mêmes classes hv2-/hv3- : grande photo sur fond
   noir, courbes dorées, titre Cormorant à droite, ligne « icône + loupe », cases façon « Choisis ton Galop », grille de
   cartes photo, cartes horizontales. La feuille de style de la Vidéothèque est recopiée ici (GESTION_CSS_VIDEO) et injectée
   seulement si la Vidéothèque ne l'a pas déjà mise.
   DONNÉES, toutes réelles, LECTURE SEULE (rien d'écrit en base, aucune table créée à cette étape) :
     · le club : celui choisi depuis la page Écurie (window.__santeClub) sinon ecurie / ecurie2 du profil ;
     · les chevaux du club (chevaux, hypeChevauxDuClub), leur n° SIRE (chevaux.origines.sire) ;
     · les soins (soins_cheval) : par cheval et par type, le DERNIER soin compte ; il est « en retard » si sa date
       prochaine est passée ;
     · les vétérinaires reliés aux chevaux (cheval_professionnels → professionnels, rôle « veterinaire »).
   CE QUI N'EXISTE PAS ENCORE est affiché « Bientôt » ou « À compléter », jamais inventé : détenteur, plan des lieux,
   mouvements, partie contrôles, camion, compta, aides.
   Textes en français seulement : traduction quand le français sera relu (règle de Blandine du 02/11).
   Accès : lien caché 2hype.fr/#mon-ecurie (aucun bouton ajouté ailleurs à cette étape). */
/* Copie de la feuille de style de la Vidéothèque (hype-video.js, CSS2, recopiée le 04/11/2026) : même design. */
var GESTION_CSS_VIDEO = ".hv2{--hv-noir:#070A08;--hv-p1:rgba(16,26,29,.74);--hv-p2:rgba(16,29,34,.82);--hv-og:rgba(16,26,29,.45);--hv-og-on:linear-gradient(180deg,rgba(16,29,34,.95),rgba(12,22,26,.95));--hv-pan:linear-gradient(180deg,rgba(16,29,34,.96),rgba(12,21,25,.98));--hv-iv:#F3EEE4;--hv-iv2:rgba(243,238,228,.64);--hv-iv3:rgba(243,238,228,.40);--hv-ch:#C9A66B;--hv-ch2:rgba(201,166,107,.55);\nbackground:var(--hv-noir);color:var(--hv-iv);font-family:'Montserrat',system-ui,sans-serif;min-height:100vh;padding-bottom:24px;overflow-x:clip}\n.hv2 *{box-sizing:border-box}\n.hv2 button{font-family:inherit;color:inherit;-webkit-tap-highlight-color:transparent}\n.hv2-in{max-width:1240px;margin:0 auto;padding:0 18px}\n.hv2-traite{position:relative;overflow:hidden;background:#0B0F0E}\n.hv2-traite img{display:block;width:100%;height:100%;object-fit:cover;filter:var(--hv-filtre,none)}\n.hv2-traite:after{content:'';position:absolute;inset:0;pointer-events:none;box-shadow:inset 0 0 70px rgba(7,10,8,var(--hv-bords,0))}\n.hv2{position:relative}.hv2-langue{position:absolute;z-index:6;top:calc(env(safe-area-inset-top) + 12px);inset-inline-end:14px}\n.hv2-hero{position:relative;padding-top:calc(env(safe-area-inset-top) + 14px)}\n.hv2-marque{text-align:center;font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:21px;letter-spacing:.62em;padding-inline-start:.62em;color:var(--hv-iv);position:relative;z-index:2}\n.hv2-photo{position:relative;height:clamp(300px,92vw,430px);margin-top:-6px}\n.hv2-photo img{object-position:var(--hv-pos-tel,center)}\n.hv2-photo{-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 14%,#000 50%,transparent 90%),linear-gradient(90deg,transparent 0,#000 12%,#000 100%);-webkit-mask-composite:source-in;mask-image:linear-gradient(180deg,transparent 0,#000 14%,#000 50%,transparent 90%),linear-gradient(90deg,transparent 0,#000 12%,#000 100%);mask-composite:intersect}\n.hv2-photo.hv2-traite:after{box-shadow:none}\n.hv2-courbe{position:absolute;left:0;right:0;width:100%;height:70px;pointer-events:none;z-index:2}\n.hv2-courbe.c1{top:calc(env(safe-area-inset-top) + 2px);height:110px}\n.hv2-hero-retour{position:relative;z-index:4;margin-top:2px}\n.hv2-hero-r .hv2-photo{margin-top:-30px}\n.hv2-courbe.c2{position:relative;display:block;height:64px;margin-top:-64px}\n[dir=rtl] .hv2-courbe{transform:scaleX(-1)}\n.hv2-titre{text-align:end;margin-top:-12px;position:relative;z-index:3}\n.hv2-titre h1{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(44px,12vw,64px);line-height:1;margin:0;color:var(--hv-iv);letter-spacing:.005em}\n.hv2-titre p{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:500;font-size:clamp(17px,4.6vw,21px);margin:8px 0 0;color:var(--hv-iv);opacity:.88}\n.hv2-intro{position:absolute;inset-inline-end:12%;top:52%;width:58px;height:58px;border-radius:50%;border:1px solid var(--hv-ch);background:rgba(7,10,8,.35);display:flex;align-items:center;justify-content:center;z-index:3}\n.hv2-ligne{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:22px;padding:4px 0 10px;position:relative}\n.hv2-ligne:after{content:'';position:absolute;left:0;right:0;bottom:0;height:1px;background:linear-gradient(90deg,rgba(201,166,107,.15),var(--hv-ch) 55%,rgba(201,166,107,.15))}\n.hv2-mes{display:flex;align-items:center;gap:14px;background:none;border:none;padding:10px 6px;min-height:44px;font-size:15px;letter-spacing:.03em;color:var(--hv-iv)}\n.hv2-mes svg,.hv2-loupe svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}\n.hv2-mes svg{color:var(--hv-ch)}\n.hv2-loupe{width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:none;border:none;color:var(--hv-iv)}\n.hv2-rech{display:flex;align-items:center;gap:10px;margin-top:14px;padding:4px 6px 4px 14px;padding-inline-start:14px;padding-inline-end:6px;border-radius:14px;border:1px solid var(--hv-ch2);background:var(--hv-p1);box-shadow:0 10px 28px -16px rgba(0,0,0,.9)}\n.hv2-rech svg{width:18px;height:18px;stroke:var(--hv-ch);fill:none;stroke-width:1.6;flex:0 0 18px}\n.hv2-rech:focus-within{border-color:var(--hv-ch)}\n.hv2-rech input:focus,.hv2-rech input:focus-visible{outline:none}\n.hv2-rech input{flex:1;min-width:0;background:none;border:none;outline:none;color:var(--hv-iv);font-family:inherit;font-size:16px;padding:10px 0}\n.hv2-rech input::placeholder{color:var(--hv-iv3)}\n.hv2-rech input::-webkit-search-cancel-button{display:none}\n.hv2-x{width:40px;height:40px;border:none;background:none;color:var(--hv-iv2);font-size:22px;line-height:1}\n.hv2-onglets{display:flex;gap:8px;overflow-x:auto;margin:22px -18px 0;padding:2px 18px 8px;scroll-snap-type:x proximity;scrollbar-width:none;-webkit-overflow-scrolling:touch}\n.hv2-onglets::-webkit-scrollbar{display:none}\n.hv2-og{flex:0 0 auto;scroll-snap-align:start;min-height:46px;padding:9px 17px;border-radius:12px;border:1px solid rgba(243,238,228,.12);background:var(--hv-og);\ncolor:var(--hv-iv);font-size:14px;letter-spacing:.02em;white-space:nowrap;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.15;transition:border-color .2s,background .2s}\n.hv2-og.on{border-color:var(--hv-ch);background:var(--hv-og-on);box-shadow:0 8px 22px -12px rgba(0,0,0,.95),inset 0 0 0 .5px rgba(201,166,107,.35)}\n.hv2-og:disabled{opacity:.42;cursor:default}\n.hv2-o2 .hv2-og{border-radius:999px;padding:9px 20px;background:linear-gradient(180deg,rgba(28,40,44,.62),rgba(7,10,8,.55));border-color:rgba(201,166,107,.22);box-shadow:0 8px 18px -12px rgba(0,0,0,.95)}\n.hv2-o2 .hv2-og.on{background:linear-gradient(180deg,rgba(201,166,107,.30),rgba(201,166,107,.08));border-color:rgba(201,166,107,.85);color:#F7E9CF;box-shadow:0 10px 22px -12px rgba(0,0,0,.95),inset 0 1px 0 rgba(255,255,255,.08)}\n.hv2-o3 .hv2-og{border-radius:10px 10px 4px 4px;border:none;border-bottom:1px solid rgba(243,238,228,.14);background:linear-gradient(180deg,rgba(243,238,228,.07),rgba(243,238,228,.015));box-shadow:0 10px 20px -14px rgba(0,0,0,.95)}\n.hv2-o3 .hv2-og.on{background:linear-gradient(180deg,rgba(16,29,34,.85),rgba(16,29,34,.35));border-bottom:2px solid #C9A66B;box-shadow:0 12px 24px -12px rgba(0,0,0,.95)}\n.hv2-o4 .hv2-og{border-radius:14px;background:linear-gradient(160deg,rgba(243,238,228,.12),rgba(243,238,228,.025));border-color:rgba(243,238,228,.16);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);box-shadow:0 10px 22px -14px rgba(0,0,0,.95),inset 0 1px 0 rgba(255,255,255,.07)}\n.hv2-o4 .hv2-og.on{background:linear-gradient(160deg,rgba(243,238,228,.24),rgba(201,166,107,.10));border-color:rgba(243,238,228,.55);box-shadow:0 12px 24px -12px rgba(0,0,0,.95),inset 0 1px 0 rgba(255,255,255,.14)}\n.hv2-og-court{display:none}\n.hv2-choix{margin-top:22px}\n.hv2-choix-tete{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}\n.hv2-tous{min-height:40px;padding:7px 20px;border-radius:999px;border:1px solid rgba(243,238,228,.18);background:var(--hv-og);color:var(--hv-iv);font-size:14px;box-shadow:0 8px 18px -12px rgba(0,0,0,.95)}\n.hv2-tous.on{border-color:var(--hv-ch)}\n.hv2-choix-rang{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px}\n.hv2-choix-plus{margin-top:7px;animation:hv2Deroule .25s ease-out}\n@keyframes hv2Deroule{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}\n.hv2-cg:disabled{opacity:.42}\n.hv2-cg-plus span{color:var(--hv-ch)}.hv2-cg-plus.ouvert{border-color:rgba(201,166,107,.45)}\n.hv2-cg{width:100%;min-width:0;min-height:62px;padding:9px 3px;display:flex;flex-direction:column;align-items:center;justify-content:center}\n.hv2-cg b{font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:17px;line-height:1.1;color:var(--hv-iv);white-space:nowrap}\n.hv2-cg span{font-size:10px;letter-spacing:.03em;color:var(--hv-iv2);margin-top:4px;white-space:nowrap}\n@media (min-width:700px){.hv2-choix-rang{gap:12px}.hv2-choix-plus{margin-top:12px}.hv2-cg b{font-size:22px}}\n.hv2-serre .hv2-onglets{overflow:visible;margin-left:0;margin-right:0;padding-left:0;padding-right:0;gap:5px}\n.hv2-serre .hv2-og{flex:1 1 0;min-width:0;padding:6px 2px;min-height:52px;border-radius:11px}\n.hv2-serre .hv2-og-long,.hv2-serre .hv2-og small{display:none}\n.hv2-serre .hv2-og-court{display:flex;flex-direction:column;align-items:center;line-height:1}\n.hv2-serre .hv2-og-court i{font-style:normal;font-size:8.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--hv-iv2);margin-bottom:4px}\n.hv2-serre .hv2-og-court b{font-family:'Montserrat',sans-serif;font-weight:500;font-size:16px;color:var(--hv-iv);font-variant-numeric:lining-nums}\n.hv2-serre .hv2-og:first-child{flex-grow:1.35}\n.hv2-serre .hv2-og:first-child .hv2-og-court b{font-family:'Montserrat',sans-serif;font-weight:500;font-size:12.5px}\n.hv2-serre .hv2-og:disabled{opacity:.32}\n.hv2-serre .hv2-og.on .hv2-og-court i{color:var(--hv-ch)}\n.hv2-og small{display:block;font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--hv-iv2);margin-top:3px}\n.hv2-h2{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(28px,7.4vw,36px);margin:22px 0 14px;color:var(--hv-iv);line-height:1.1}\n.hv2-grille{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}\n.hv2-theme{display:flex;flex-direction:column;text-align:center;padding:0;border-radius:16px;overflow:hidden;border:1px solid rgba(243,238,228,.09);background:var(--hv-p2);box-shadow:0 14px 30px -18px rgba(0,0,0,.95);min-width:0}\n.hv2-theme .hv2-traite{aspect-ratio:4/3;width:100%}\n.hv2-theme img{object-position:var(--hv-pos,center)}\n.hv2-pan{flex:1;display:flex;flex-direction:column;justify-content:center;padding:11px 8px 13px;background:var(--hv-pan)}\n.hv2-pan b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;font-size:19px;line-height:1.15;color:var(--hv-iv);overflow-wrap:anywhere}\n.hv2-pan span{display:block;font-size:12px;letter-spacing:.04em;color:var(--hv-iv2);margin-top:4px}\n.hv2-theme:active{transform:scale(.985)}\n@media (max-width:699px){.hv2-theme.seul2{grid-column:1/-1}.hv2-theme.seul2 .hv2-traite{aspect-ratio:21/9}}\n.hv2-theme.large{grid-column:1/-1}.hv2-theme.large .hv2-traite{aspect-ratio:21/9}\n@media (min-width:700px){.hv2-theme.large .hv2-traite{aspect-ratio:3/1}}\n.hv2-retour{display:flex;align-items:center;gap:10px;background:none;border:none;padding:12px 2px;min-height:44px;font-size:14px;color:var(--hv-iv);letter-spacing:.02em}\n.hv2-retour i{font-style:normal;color:var(--hv-ch);font-size:22px;line-height:1}\n[dir=rtl] .hv2-retour i{transform:scaleX(-1)}\n.hv2-sous{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:18px;color:var(--hv-iv2);margin:-6px 0 16px}\n.hv2-liste{border-radius:16px;border:1px solid rgba(243,238,228,.08);background:var(--hv-p1);padding:2px 14px;box-shadow:0 14px 30px -20px rgba(0,0,0,.95)}\n.hv2 .hv-ligne{padding:12px 0}\n.hv2 .hv-ligne h4{color:var(--hv-iv);font-size:14px}\n.hv2 .hv-ligne .hv-meta{color:var(--hv-iv2);font-size:11px}\n.hv2 .hv-ligne .hv-cov{border-color:rgba(243,238,228,.1);width:96px;flex-basis:96px}\n.hv2 .hv-ligne .hv-arc{display:none}\n.hv2 .hv-fav{width:44px;height:44px;font-size:18px;color:var(--hv-iv3)}\n.hv2 .hv-fav.on{color:var(--hv-ch)}\n.hv2-liste>div:last-child{border-bottom:none!important}\n.hv2-vide{text-align:center;padding:26px 10px}\n.hv2-vide p{margin:0;font-size:14px;color:var(--hv-iv2);line-height:1.6}\n.hv2-vide p+p{font-size:12px;color:var(--hv-iv3);margin-top:6px}\n.hv2-mini-ong{display:flex;gap:8px;margin:22px 0 14px}\n.hv2-mini-ong button{min-height:44px;padding:9px 18px;border-radius:12px;border:1px solid rgba(243,238,228,.12);background:var(--hv-og);font-size:14px}\n.hv2-mini-ong button.on{border-color:var(--hv-ch);background:var(--hv-og-on)}\n.hv2-pB{--hv-p1:rgba(21,22,22,.84);--hv-p2:rgba(23,24,24,.9);--hv-og:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));--hv-og-on:linear-gradient(180deg,rgba(38,39,39,.95),rgba(24,25,25,.95));--hv-pan:linear-gradient(180deg,rgba(26,27,27,.97),rgba(17,18,18,.98))}\n.hv2-pC{--hv-p1:rgba(12,16,17,.84);--hv-p2:rgba(13,18,19,.9);--hv-og:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.015));--hv-og-on:linear-gradient(180deg,rgba(16,29,34,.95),rgba(10,17,19,.95));--hv-pan:linear-gradient(180deg,rgba(15,20,21,.97),rgba(9,12,12,.98))}\n.hv2-k{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--hv-ch);margin:22px 0 10px}\n.hv2-modo{display:block;margin:34px auto 0;background:none;border:none;font-size:11px;letter-spacing:.12em;color:var(--hv-iv3);padding:12px}\n.hv2-vc-ajout{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:15px;border-radius:14px;border:1px dashed rgba(201,166,107,.5);background:rgba(201,166,107,.05);color:#C9A66B;font-family:inherit;font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:600}\n.hv2-vc-ajout span{font-size:20px;line-height:1;font-weight:400}\n.hv2-vc-form{padding:18px 16px;border-radius:16px;border:1px solid rgba(243,238,228,.1);background:linear-gradient(160deg,rgba(16,26,29,.7),rgba(7,10,8,.7));box-shadow:0 12px 30px rgba(0,0,0,.35)}\n.hv2-vc-form select{appearance:auto}\n.hv2-vc-ok{flex:1;padding:13px;border-radius:12px;border:1px solid rgba(201,166,107,.6);background:rgba(201,166,107,.14);color:#F3EEE4;font-family:inherit;font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:600}\n.hv2-vc-ok:disabled{opacity:.45}\n.hv2-vc-non{padding:13px 16px;border-radius:12px;border:1px solid rgba(243,238,228,.18);background:none;color:rgba(243,238,228,.7);font-family:inherit;font-size:12px;letter-spacing:.1em;text-transform:uppercase}\n.hv2-l-in{padding-top:6px}\n.hv2-l-hero .hv2-titre h1{font-size:clamp(30px,8.4vw,44px);line-height:1.08}\n.hv2-l-hero .hv2-titre p{font-style:normal;font-family:'Montserrat',sans-serif;font-size:13px;letter-spacing:.03em;color:var(--hv-iv2)}\n.hv2-dC .hv2-l-hero .hv2-titre h1,.hv2-dD .hv2-l-hero .hv2-titre h1,.hv2-dE .hv2-l-hero .hv2-titre h1{font-size:52px}\n.hv2-l-averifier{margin:8px 0 4px;padding:10px 12px;border-radius:10px;border:1px dashed var(--hv-ch2);font-size:12.5px;color:var(--hv-ch)}\n.hv2-l-cours-l{display:block;width:100%;text-align:start;background:none;border:0;padding:6px 0 4px;border-top:1px solid rgba(243,238,228,.07)}\n.hv2-l-cours-l:first-of-type{border-top:0;padding-top:0}\n.hv2-l-sc.seule{grid-column:1/-1;flex-direction:row;align-items:stretch}\n.hv2-l-sc.seule .hv2-l-sc-img{flex:0 0 46%}\n.hv2-l-sc.seule .hv2-l-sc-t{display:flex;align-items:center}\n.hv2-lecteur{position:relative;aspect-ratio:16/9;margin-top:22px;border-radius:14px;overflow:hidden;background:#000;box-shadow:0 18px 40px -22px rgba(0,0,0,.95)}\n.hv2-l2 .hv2-lecteur{margin-left:-18px;margin-right:-18px;border-radius:0}\n.hv2-lecteur iframe,.hv2-lecteur video{position:absolute;inset:0;width:100%;height:100%;border:0;background:#000}\n.hv2-lect-poster{position:absolute;inset:0;width:100%;height:100%;padding:0;border:0;background:#0B0F0E;display:block}\n.hv2-lect-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:var(--hv-filtre,none)}\n.hv2-play{position:absolute;left:50%;top:50%;width:58px;height:58px;margin:-29px 0 0 -29px;border-radius:50%;background:rgba(7,10,8,.55);border:1px solid rgba(243,238,228,.75);display:flex;align-items:center;justify-content:center;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}\n.hv2-play svg{width:24px;height:24px;fill:#F3EEE4;margin-left:3px}\n.hv2-play.petit{left:auto;top:auto;right:10px;bottom:10px;margin:0;width:34px;height:34px}.hv2-play.petit svg{width:15px;height:15px;margin-left:2px}\n[dir=rtl] .hv2-play.petit{right:auto;left:10px}\n.hv2-lect-bientot{position:absolute;inset:auto 0 14px 0;text-align:center;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--hv-iv)}\n.hv2-l-courbe{display:block;width:100%;height:30px;margin:6px 0 4px}\n[dir=rtl] .hv2-l-courbe{transform:scaleX(-1)}\n.hv2-l-meta{margin:6px 0 0;font-size:13px;letter-spacing:.03em;color:var(--hv-iv2)}\n.hv2-l-titre{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(32px,8.6vw,46px);line-height:1.08;margin:6px 0 0;color:var(--hv-iv)}\n.hv2-l-resume{margin:10px 0 0;font-size:15px;line-height:1.55;color:var(--hv-iv)}\n.hv2-l-langue{margin:8px 0 0;font-size:13px;font-style:italic;color:var(--hv-iv2)}\n.hv2-l-yt{float:inline-end;margin:8px 0 0 12px;font-size:13px;color:var(--hv-iv2);text-decoration:underline;text-underline-offset:3px}\n.hv2-l-actions{display:grid;grid-template-columns:1.45fr 1fr;gap:12px;margin-top:20px}\n.hv2-l-btn{min-height:50px;display:flex;align-items:center;justify-content:center;gap:12px;border-radius:12px;border:1px solid rgba(243,238,228,.16);background:var(--hv-og);font-size:14.5px;color:var(--hv-iv);box-shadow:0 10px 22px -14px rgba(0,0,0,.95)}\n.hv2-l-btn span{font-size:18px;color:var(--hv-iv)}\n.hv2-l-btn.on{border-color:var(--hv-ch);background:var(--hv-og-on)}.hv2-l-btn.on span{color:var(--hv-ch)}\n.hv2-l-carte{display:block;width:100%;text-align:start;margin-top:16px;padding:16px 18px;border-radius:14px;border:1px solid rgba(243,238,228,.09);background:var(--hv-p1);box-shadow:0 14px 30px -20px rgba(0,0,0,.95)}\n.hv2-l-k{margin:0 0 6px;font-size:13px;font-style:italic;color:var(--hv-ch)}\n.hv2-l-carte b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:24px;line-height:1.15;color:var(--hv-iv)}\n.hv2-l-lien{display:inline-block;margin-top:10px;font-size:14px;color:var(--hv-ch);text-decoration:none}\n.hv2-l-petit{margin:6px 0 0;font-size:12.5px;line-height:1.5;color:var(--hv-iv2)}\n.hv2-l-obs{list-style:none;margin:0;padding:0}\n.hv2-l-obs li{position:relative;padding:7px 0;padding-inline-start:18px;font-size:14px;line-height:1.45;color:var(--hv-iv);border-bottom:1px solid rgba(243,238,228,.06)}\n.hv2-l-obs li:last-child{border-bottom:0}\n.hv2-l-obs li:before{content:'';position:absolute;inset-inline-start:2px;top:15px;width:5px;height:5px;border-radius:50%;background:var(--hv-ch)}\n.hv2-l-suiv{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}\n.hv2-l-sc{display:flex;flex-direction:column;padding:0;text-align:start;border-radius:14px;overflow:hidden;border:1px solid rgba(243,238,228,.09);background:var(--hv-p2);box-shadow:0 14px 30px -18px rgba(0,0,0,.95);min-width:0}\n.hv2-l-sc-img{position:relative;display:block;aspect-ratio:16/10;background:#0B0F0E}\n.hv2-l-sc-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:var(--hv-filtre,none)}\n.hv2-l-sc-t{display:block;padding:11px 13px 13px;font-size:14px;line-height:1.35;color:var(--hv-iv);background:var(--hv-pan);flex:1}\n@media (min-width:700px){.hv2-l2 .hv2-lecteur{margin-left:-32px;margin-right:-32px}.hv2-l-suiv{grid-template-columns:repeat(3,minmax(0,1fr))}}\n@media (min-width:1100px){.hv2-l-in{max-width:960px}.hv2-l2 .hv2-lecteur{margin-left:0;margin-right:0;border-radius:14px}.hv2-l-suiv{grid-template-columns:repeat(4,minmax(0,1fr))}}\n@media (min-width:700px){.hv2-in{padding:0 32px}.hv2-onglets{margin:26px -32px 0;padding:2px 32px 8px}\n.hv2-grille{grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.hv2-theme.seul3{grid-column:2}\n.hv2-photo{height:clamp(360px,52vw,460px)}.hv2-photo img{object-position:var(--hv-pos-tab,center)}\n.hv2-titre{margin-top:-16px}.hv2-marque{font-size:22px}}\n@media (min-width:1100px){.hv2-photo img{object-position:var(--hv-pos-ordi,center)}\n.hv2-onglets{overflow:visible;flex-wrap:nowrap;justify-content:flex-start;margin:28px 0 0;padding:2px 0 8px}\n.hv2-grille{grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}.hv2-theme.seul3{grid-column:auto}\n.hv2-liste{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:36px}.hv2-liste>div{border-bottom:1px solid rgba(243,238,228,.07)!important}\n.hv2-dA .hv2-photo{height:480px;width:100%;max-width:1240px;margin:0 auto;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 12%,#000 54%,transparent 90%),linear-gradient(90deg,transparent 0,#000 16%,#000 84%,transparent 100%);mask-image:linear-gradient(180deg,transparent 0,#000 12%,#000 54%,transparent 90%),linear-gradient(90deg,transparent 0,#000 16%,#000 84%,transparent 100%)}\n.hv2-dA .hv2-courbe.c2{max-width:1240px;margin:-64px auto 0}.hv2-dA .hv2-hero-retour{margin-bottom:6px}\n.hv2-dA .hv2-titre h1{font-size:68px}\n.hv2-dC .hv2-photo,.hv2-dD .hv2-photo,.hv2-dE .hv2-photo{width:100%;max-width:1240px;margin:0 auto;display:flex;justify-content:center;-webkit-mask-image:none;mask-image:none;background:transparent}\n.hv2-dC .hv2-photo{height:520px}.hv2-dD .hv2-photo{height:440px}.hv2-dE .hv2-photo{height:580px;justify-content:flex-end;padding-inline-end:32px}\n.hv2-dC .hv2-photo img,.hv2-dD .hv2-photo img,.hv2-dE .hv2-photo img{width:auto;max-width:100%;height:100%;object-fit:contain;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 12%,#000 62%,transparent 94%),linear-gradient(90deg,transparent 0,#000 16%,#000 84%,transparent 100%);-webkit-mask-composite:source-in;mask-image:linear-gradient(180deg,transparent 0,#000 12%,#000 62%,transparent 94%),linear-gradient(90deg,transparent 0,#000 16%,#000 84%,transparent 100%);mask-composite:intersect}\n.hv2-dC .hv2-photo.hv2-traite:after,.hv2-dD .hv2-photo.hv2-traite:after,.hv2-dE .hv2-photo.hv2-traite:after{display:none}\n.hv2-dC .hv2-courbe.c2,.hv2-dD .hv2-courbe.c2,.hv2-dE .hv2-courbe.c2{max-width:1240px;margin:-64px auto 0}\n.hv2-dC .hv2-titre h1,.hv2-dD .hv2-titre h1,.hv2-dE .hv2-titre h1{font-size:68px}\n.hv2-dD .hv2-titre{text-align:center}\n.hv2-dB .hv2-hero{display:grid;grid-template-columns:minmax(0,40fr) minmax(0,60fr);grid-template-rows:auto auto 1fr auto;grid-template-areas:'m m' 'r p' 't p' 'c c';max-width:1240px;margin:0 auto;padding-left:32px;padding-right:32px;column-gap:24px}\n.hv2-dB .hv2-marque{grid-area:m}.hv2-dB .hv2-hero-retour{grid-area:r;padding:0;margin:26px 0 0;max-width:none}\n.hv2-dB .hv2-photo{grid-area:p;width:100%;height:480px;margin:0;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 12%,#000 56%,transparent 92%),linear-gradient(90deg,transparent 0,#000 30%,#000 100%);mask-image:linear-gradient(180deg,transparent 0,#000 12%,#000 56%,transparent 92%),linear-gradient(90deg,transparent 0,#000 30%,#000 100%)}\n[dir=rtl] .hv2-dB .hv2-photo{-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 12%,#000 56%,transparent 92%),linear-gradient(270deg,transparent 0,#000 30%,#000 100%);mask-image:linear-gradient(180deg,transparent 0,#000 12%,#000 56%,transparent 92%),linear-gradient(270deg,transparent 0,#000 30%,#000 100%)}\n.hv2-dB .hv2-hero>.hv2-in:not(.hv2-hero-retour){grid-area:t;align-self:end;padding:0 0 70px;margin:0;max-width:none;position:relative;z-index:3}\n.hv2-dB .hv2-titre{text-align:start;margin:0}.hv2-dB .hv2-titre h1{font-size:68px}.hv2-dB .hv2-titre p{font-size:22px}\n.hv2-dB .hv2-courbe.c2{grid-area:c;margin:-64px 0 0;max-width:none}}\n.hv2{--hv-filtre-vig:saturate(.82) contrast(1.1) brightness(.86) sepia(.24) hue-rotate(-4deg);--hv-p1:linear-gradient(135deg,rgba(14,22,24,.62),rgba(7,10,8,.94) 62%);--hv-p2:rgba(10,14,14,.9);--hv-og:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.018));--hv-og-on:linear-gradient(180deg,rgba(201,166,107,.12),rgba(201,166,107,.03));--hv-pan:linear-gradient(180deg,rgba(12,17,18,.96),rgba(7,10,8,.98))}\n.hv2-rech{background:rgba(7,10,8,.66)}\n.hv2-vide{background:none;border:1px solid rgba(243,238,228,.08);border-radius:14px}\n.hv3-pils{display:flex;gap:10px;overflow-x:auto;margin:22px 0 0;padding:2px 0 8px;scroll-snap-type:x proximity;scrollbar-width:none}\n.hv3-pils::-webkit-scrollbar{display:none}\n.hv3-pil{flex:0 0 auto;scroll-snap-align:start;min-height:44px;padding:0 20px;border-radius:999px;border:1px solid rgba(243,238,228,.12);background:var(--hv-og);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:0 8px 20px -12px rgba(0,0,0,.95);color:var(--hv-iv);font-family:inherit;font-size:15px;white-space:nowrap}\n.hv3-pil.on{border-color:var(--hv-ch);background:var(--hv-og-on);box-shadow:0 8px 22px -12px rgba(0,0,0,.95),inset 0 0 0 .5px rgba(201,166,107,.4)}\n.hv3-h2{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(28px,7.6vw,34px);line-height:1.05;color:var(--hv-iv);margin:36px 0 24px;padding-inline-start:16px;border-inline-start:2px solid var(--hv-ch)}\n.hv3-tete{display:flex;align-items:flex-end;justify-content:space-between;gap:12px}\n.hv3-tete .hv3-h2{margin-bottom:24px}\n.hv3-voir{flex:0 0 auto;background:none;border:none;color:var(--hv-iv);font-family:inherit;font-size:14px;padding:10px 0 18px;white-space:nowrap}\n.hv3-voir i{font-style:normal;font-size:18px}\n.hv3-cartes{display:grid;grid-template-columns:minmax(0,1fr);gap:10px}\n.hv3-carte{position:relative;display:flex;flex-wrap:wrap;align-items:stretch;min-height:0;border-radius:14px;border:1px solid rgba(243,238,228,.09);background:var(--hv-p1);overflow:hidden;box-shadow:0 12px 26px -20px rgba(0,0,0,.95)}\n.hv3-vig{position:relative;flex:0 0 35%;max-width:240px;aspect-ratio:16/10.4;min-height:0;padding:0;border:none;background:#0B0F0E;overflow:hidden;cursor:pointer}\n.hv3-vig img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:var(--hv-filtre-vig)}\n.hv3-vig:after,.hv3-photo-img:after{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(125% 95% at 50% 42%,rgba(7,10,8,0) 52%,rgba(7,10,8,.62) 100%),linear-gradient(180deg,rgba(214,150,74,.10),rgba(7,10,8,.18))}\n.hv3-play,.hv3-duree,.hv3-lock{z-index:2}\n.hv3-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:38px;height:38px;border-radius:50%;background:rgba(7,10,8,.42);border:1px solid rgba(243,238,228,.75);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center}\n.hv3-play svg{width:18px;height:18px;fill:#F3EEE4;margin-inline-start:2px}\n.hv3-play.petit{width:32px;height:32px}.hv3-play.petit svg{width:14px;height:14px}\n.hv3-duree{position:absolute;inset-inline-end:6px;bottom:6px;padding:2px 7px;border-radius:6px;background:rgba(7,10,8,.78);color:#F3EEE4;font-size:11px;letter-spacing:.02em}\n.hv3-lock{position:absolute;top:6px;inset-inline-start:6px;color:#C9A66B;font-size:14px}\n.hv3-info{flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center;gap:3px;padding:9px 12px;padding-inline-end:38px;background:none;border:none;color:inherit;text-align:start;font-family:inherit;cursor:pointer}\n.hv3-info h4{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:19.5px;line-height:1.15;color:var(--hv-iv);overflow:hidden;white-space:nowrap;text-overflow:ellipsis}\n.hv3-cours{font-size:12px;color:var(--hv-iv2);line-height:1.35;overflow:hidden;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical}\n.hv3-meta{display:flex;flex-wrap:nowrap;min-width:0;align-items:center;gap:6px 9px;margin-top:4px;font-size:12px;color:var(--hv-iv2)}\n.hv3-pill{font-style:normal;border:1px solid rgba(201,166,107,.75);color:var(--hv-ch);border-radius:999px;padding:2px 10px;font-size:11.5px;line-height:1.4;white-space:nowrap}\n.hv3-pill+.hv3-qui{padding-inline-start:9px;border-inline-start:1px solid rgba(243,238,228,.25)}\n.hv3-qui{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.hv3-prog{display:flex;align-items:center;gap:10px;margin-top:5px}\n.hv3-barre{flex:1;height:3px;border-radius:2px;background:rgba(243,238,228,.12);overflow:hidden}\n.hv3-barre span{display:block;height:100%;background:linear-gradient(90deg,#B8955C,#E2C48E)}\n.hv3-etat{font-size:12px;color:var(--hv-iv);white-space:nowrap}\n.hv3-fav{position:absolute;top:2px;inset-inline-end:2px;width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:none;border:none;padding:0;cursor:pointer}\n.hv3-fav svg{width:22px;height:22px;fill:none;stroke:rgba(243,238,228,.7);stroke-width:1.4;stroke-linejoin:round}\n.hv3-fav.on svg{fill:var(--hv-ch);stroke:var(--hv-ch)}\n.hv3-actions{flex:0 0 100%;display:flex;flex-wrap:wrap;gap:8px;padding:10px 14px 12px;border-top:1px solid rgba(243,238,228,.06)}\n.hv3-actions button{min-height:36px;padding:0 14px;border-radius:999px;border:1px solid rgba(201,166,107,.5);background:none;color:var(--hv-ch);font-family:inherit;font-size:12.5px}\n.hv3-actions button.gris{border-color:rgba(243,238,228,.2);color:var(--hv-iv2)}\n.hv3-vc{margin-top:10px;padding-top:6px;border-top:1px solid rgba(243,238,228,.07)}\n.hv3-rangee{display:grid;grid-auto-flow:column;grid-auto-columns:31.5%;gap:10px;overflow-x:auto;margin:0;padding:0 0 6px;scroll-snap-type:x proximity;scrollbar-width:none}\n.hv3-rangee::-webkit-scrollbar{display:none}\n.hv3-photo{scroll-snap-align:start;text-align:start;background:none;border:none;padding:0;color:inherit;font-family:inherit;min-width:0;cursor:pointer}\n.hv3-photo-img{position:relative;display:block;aspect-ratio:16/10;border-radius:12px;overflow:hidden;border:1px solid rgba(243,238,228,.08);background:#0B0F0E}\n.hv3-photo-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:var(--hv-filtre-vig)}\n.hv3-photo b{display:block;margin-top:8px;font-weight:500;font-size:13px;line-height:1.3;color:var(--hv-iv);overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}\n.hv3-photo small{display:block;margin-top:3px;font-size:11px;color:var(--hv-iv2)}\n.hv3-ajout-zone{display:flex;justify-content:center;margin:40px 0 8px}\n.hv3-plus-zone{display:flex;justify-content:center;margin:14px 0 0}\n.hv3-plus{display:inline-flex;align-items:center;gap:10px;min-height:44px;padding:0 22px;border-radius:999px;border:1px solid rgba(243,238,228,.16);background:var(--hv-og);color:var(--hv-iv);font-family:inherit;font-size:14px;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}\n.hv3-plus i{font-style:normal;color:var(--hv-ch);font-size:16px}\n.hv3-ajout{display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:52px;padding:0 32px;border-radius:999px;border:1px solid var(--hv-ch);background:rgba(7,10,8,.55);color:var(--hv-ch);font-family:inherit;font-size:15.5px;font-weight:500;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);box-shadow:0 10px 24px -16px rgba(0,0,0,.95)}\n.hv3-ajout span{font-size:24px;font-weight:300;line-height:1}\n.hv3-ajout-zone:has(.hv3-ban){display:block}\n.hv3-ban{position:relative;display:block;width:100%;min-height:400px;padding:0;border:1px solid rgba(201,166,107,.28);border-radius:20px;overflow:hidden;background:#070A08;color:#F3EEE4;font-family:inherit;text-align:start;cursor:pointer;box-shadow:0 18px 40px -24px rgba(0,0,0,.95)}\n.hv3-ban-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:var(--hv-filtre-vig,none);transform:scale(1.02);transition:transform .6s ease}\n.hv3-ban:active .hv3-ban-img{transform:scale(1.05)}\n.hv3-ban-voile{position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,10,8,0) 0%,rgba(7,10,8,0) 48%,rgba(7,10,8,.62) 68%,rgba(7,10,8,.96) 100%)}\n.hv3-ban-txt{position:relative;display:flex;flex-direction:column;justify-content:flex-end;gap:8px;min-height:400px;box-sizing:border-box;padding:22px 20px 20px}\n.hv3-ban-t{font-family:'Cormorant Garamond',Georgia,serif;font-size:27px;font-weight:500;line-height:1.1;color:#F3EEE4}\n.hv3-ban-s{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:16.5px;line-height:1.35;color:rgba(243,238,228,.82);max-width:34em}\n.hv3-ban-cta{align-self:flex-start;display:inline-flex;align-items:center;gap:10px;margin-top:8px;min-height:44px;padding:0 22px;border-radius:999px;border:1px solid var(--hv-ch);background:rgba(7,10,8,.55);color:var(--hv-ch);font-size:15px;font-weight:500;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}\n.hv3-ban-cta i{font-style:normal;font-size:22px;font-weight:300;line-height:1}\n@media (min-width:900px){.hv3-ban,.hv3-ban-txt{min-height:340px}.hv3-ban-txt{padding:30px 32px}.hv3-ban-t{font-size:32px}}\n.hv3-voile{position:fixed;inset:0;z-index:2147483600;background:rgba(0,0,0,.6);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);animation:hv3Fondu .2s ease-out}\n.hv3-feuille{position:fixed;left:0;right:0;bottom:0;z-index:2147483601;max-width:640px;margin:0 auto;max-height:88vh;overflow:auto;-webkit-overflow-scrolling:touch;border-radius:22px 22px 0 0;border-top:1px solid rgba(201,166,107,.35);background:linear-gradient(180deg,#0D1315,#070A08 40%);padding:8px 18px calc(env(safe-area-inset-bottom) + 24px);box-shadow:0 -20px 50px rgba(0,0,0,.7);animation:hv3Monte .28s cubic-bezier(.2,.8,.2,1)}\n.hv3-poignee{display:block;width:44px;height:4px;border-radius:2px;background:rgba(243,238,228,.25);margin:4px auto 14px}\n.hv3-feuille .hv2-vc-form{border:none;background:none;box-shadow:none;padding:0}\n.hv3-feuille input:focus,.hv3-feuille textarea:focus,.hv3-feuille select:focus{outline:none;border-color:rgba(201,166,107,.75)!important;box-shadow:0 0 0 3px rgba(201,166,107,.18)}\n@keyframes hv3Monte{from{transform:translateY(100%)}to{transform:none}}\n@keyframes hv3Fondu{from{opacity:0}to{opacity:1}}\n.hv2-mini-ong button{border-radius:999px;background:var(--hv-og);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:0 8px 20px -12px rgba(0,0,0,.95);color:var(--hv-iv);font-family:inherit}\n.hv2-mini-ong button.on{border-color:var(--hv-ch);background:var(--hv-og-on)}\n.hv3-reserve>div{padding:12px 14px!important;border:1px solid rgba(243,238,228,.09)!important;border-radius:14px;background:var(--hv-p1)}\n.hv2-lect-img,.hv2-l-suiv img{filter:var(--hv-filtre-vig)}\n@media (min-width:700px){.hv3-pils{margin-top:26px}.hv3-rangee{grid-auto-columns:31%}.hv3-vig{flex-basis:34%}.hv3-info h4{font-size:23px}}\n@media (min-width:980px){.hv3-cartes{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.hv3-rangee{grid-auto-columns:23%}}\n.hv3-hm{position:relative}\n.hv3-hm-photo{position:relative;height:clamp(300px,74vw,460px);overflow:hidden}\n.hv3-hm-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:var(--hv-pos-tel,center);filter:var(--hv-filtre,none)}\n.hv3-hm-photo:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,10,8,.55) 0%,rgba(7,10,8,0) 22%,rgba(7,10,8,0) 45%,rgba(7,10,8,.78) 78%,#070A08 100%),linear-gradient(90deg,rgba(7,10,8,.55) 0%,rgba(7,10,8,0) 60%)}\n[dir=rtl] .hv3-hm-photo:after{background:linear-gradient(180deg,rgba(7,10,8,.55) 0%,rgba(7,10,8,0) 22%,rgba(7,10,8,0) 45%,rgba(7,10,8,.78) 78%,#070A08 100%),linear-gradient(270deg,rgba(7,10,8,.55) 0%,rgba(7,10,8,0) 60%)}\n.hv3-rond{position:absolute;z-index:6;top:calc(env(safe-area-inset-top) + 12px);inset-inline-start:16px;width:46px;height:46px;border-radius:50%;border:1px solid rgba(243,238,228,.28);background:rgba(7,10,8,.45);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:0}\n.hv3-rond svg{width:20px;height:20px;fill:none;stroke:#F3EEE4;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}\n[dir=rtl] .hv3-rond svg{transform:scaleX(-1)}\n.hv3-hm .hv2-langue{z-index:6}\n.hv3-hm-txt{position:absolute;z-index:4;left:0;right:0;bottom:clamp(42px,11vw,64px);max-width:1240px;margin:0 auto;padding:0 24px;text-align:start}\n.hv3-hm-k{display:block;font-size:12px;letter-spacing:.32em;text-transform:uppercase;color:var(--hv-ch);font-weight:500;margin-bottom:6px}\n.hv3-hm-txt h1{margin:0;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:clamp(46px,13vw,72px);line-height:.98;color:var(--hv-iv)}\n.hv3-hm-txt p{margin:8px 0 0;font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(17px,4.6vw,22px);color:var(--hv-iv);opacity:.9}\n.hv3-hm-courbe{position:absolute;z-index:3;left:0;bottom:-1px;width:100%;height:clamp(34px,9vw,60px);display:block}\n@media (min-width:700px){.hv3-hm-photo{height:clamp(380px,48vw,520px)}.hv3-hm-photo img{object-position:var(--hv-pos-tab,center)}.hv3-hm-txt{padding:0 32px}}\n@media (min-width:1100px){.hv3-hm-photo img{object-position:var(--hv-pos-ordi,center)}}\n.hv3-pils{gap:12px;padding:4px 2px 12px;scroll-behavior:smooth;-webkit-overflow-scrolling:touch}\n.hv3-pil{padding:0 22px;min-height:46px;border-color:rgba(243,238,228,.10);background:linear-gradient(180deg,rgba(16,26,29,.72),rgba(7,10,8,.72));box-shadow:0 10px 24px -14px rgba(0,0,0,.9),inset 0 1px 0 rgba(255,255,255,.04)}\n.hv3-pil.on{border-color:var(--hv-ch);background:linear-gradient(180deg,rgba(16,26,29,.85),rgba(7,10,8,.85));box-shadow:0 10px 24px -14px rgba(0,0,0,.9),inset 0 0 0 .5px rgba(201,166,107,.5)}\n.hv3-cartes{gap:16px}\n.hv3-carte{background:linear-gradient(135deg,rgba(16,26,29,.42),rgba(7,10,8,.96) 58%)}\n.hv3-vig{flex:0 0 44%;max-width:300px;aspect-ratio:16/9}\n.hv3-info h4{font-size:18px}\n.hv3-info{padding:8px 11px;padding-inline-end:36px}\n.hv3-cours{font-size:11.5px}.hv3-meta{font-size:11.5px}.hv3-pill{font-size:11px;padding:1px 9px}\n.hv3-page-bas{height:calc(env(safe-area-inset-bottom) + 96px)}\n.hv2-cg{min-height:66px;border-radius:14px;border:1px solid rgba(243,238,228,.10);background:linear-gradient(180deg,rgba(16,26,29,.70),rgba(7,10,8,.78));box-shadow:0 10px 24px -14px rgba(0,0,0,.9),inset 0 1px 0 rgba(255,255,255,.04)}\n.hv2-cg.on{border-color:var(--hv-ch);background:linear-gradient(180deg,rgba(16,26,29,.9),rgba(7,10,8,.9));box-shadow:0 10px 24px -14px rgba(0,0,0,.9),inset 0 0 0 .5px rgba(201,166,107,.5)}\n.hv2-cg b{font-size:18px}.hv2-cg span{font-size:10.5px;color:rgba(243,238,228,.72)}\n.hv2-choix-rang{gap:9px}\n.hv2-choix-defile{display:grid;grid-auto-flow:column;grid-auto-columns:calc((100% - 27px) / 4);gap:9px;overflow-x:auto;scroll-snap-type:none;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding:2px 0 10px}\n.hv2-choix-defile::-webkit-scrollbar{display:none}\n.hv2-choix-defile .hv2-cg{scroll-snap-align:start}\n@media (min-width:700px){.hv2-choix-defile{grid-auto-columns:calc((100% - 72px) / 7);gap:12px}}\n.hv2-tous{background:linear-gradient(180deg,rgba(16,26,29,.70),rgba(7,10,8,.78))}\n.hv2-theme{background:#070A08;border-color:rgba(243,238,228,.08)}\n.hv2-theme .hv2-traite{position:relative}\n.hv2-theme .hv2-traite:before{content:'';position:absolute;left:0;right:0;bottom:0;height:42%;z-index:1;pointer-events:none;background:linear-gradient(180deg,rgba(7,10,8,0),#070A08)}\n.hv2-pan{background:#070A08;padding:4px 10px 15px;min-height:64px;justify-content:flex-start}\n.hv2-pan b{font-size:20px;font-weight:500;letter-spacing:.005em}\n.hv2-pan span{font-size:12px;color:rgba(243,238,228,.74);margin-top:5px}\n@media (min-width:700px){.hv3-vig{flex-basis:40%}.hv3-info h4{font-size:21px}}\n@media (min-width:980px){.hv3-vig{flex-basis:42%}}";
(function () {
  var PHOTOS = {
    accueil: { img: "images/ECURIE_HERO2.jpg", pos: "50% 62%" },
    registre: { img: "images/galop7-tmp-19-ecurie-couchant.webp", pos: "50% 55%" },
    detenteur: { img: "images/galop7-tmp-19-ecurie-couchant.webp", pos: "50% 55%" },
    plan: { img: "images/ecurie-couverture-defaut-2.webp", pos: "50% 50%" },
    veto: { img: "images/cours-g1-c3-box.webp", pos: "50% 40%" },
    chevaux: { img: "images/concours-hero-bai-tresse.webp", pos: "70% 30%" },
    mouvements: { img: "images/galop5-hero-elfe-liam.webp", pos: "50% 40%" },
    soins: { img: "images/galop1-hero-bai.webp", pos: "60% 35%" },
    controles: { img: "images/galop6-hero-gris.webp", pos: "60% 35%" },
    camion: { img: "images/ecurie-couverture-defaut-2.webp", pos: "50% 50%" },
    compta: { img: "images/cours-g1-c3-box.webp", pos: "50% 40%" },
    aides: { img: "images/galop5-hero-elfe-liam.webp", pos: "50% 40%" }
  };

  var CSS_ID = "hype-gestion-css-1";
  var CSS_PROPRE = [
    ".hg-ret{display:flex;align-items:center;gap:10px;background:none;border:none;padding:12px 2px;min-height:44px;font-size:14px;color:#F3EEE4;letter-spacing:.02em;font-family:'Montserrat',sans-serif}",
    ".hg-ret i{font-style:normal;color:#C9A66B;font-size:22px;line-height:1}",
    ".hg .hv2-cg span.or,.hg .hv3-etat.or{color:#C9A66B}",
    ".hg .hv2-cg b,.hg .hv3-info h4{font-variant-numeric:lining-nums}",
    ".hg .hv2-theme:disabled{opacity:.55}.hg .hv3-carte.off{opacity:.62}",
    ".hg-legal{margin:28px 0 8px;font-size:10.5px;line-height:1.5;color:rgba(243,238,228,.45);text-align:center;font-family:'Montserrat',sans-serif}",
    ".hg-err{margin-top:14px;font-size:12px;color:#C9A66B}",
    ".hg-attente{padding:30px 0;color:#C9A66B;font-size:22px;text-align:center}",
    ".hg-vide{margin-top:18px;border:1px solid rgba(243,238,228,.12);border-radius:14px;padding:16px;font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-size:18px;color:rgba(243,238,228,.7)}"
  ].join("\n");

  function injecterCss() {
    try {
      if (!document.getElementById("hype-video-css-2") && !document.getElementById(CSS_ID + "-video") && typeof GESTION_CSS_VIDEO === "string") {
        var sv = document.createElement("style"); sv.id = CSS_ID + "-video"; sv.textContent = GESTION_CSS_VIDEO; document.head.appendChild(sv);
      }
      if (!document.getElementById(CSS_ID)) { var st = document.createElement("style"); st.id = CSS_ID; st.textContent = CSS_PROPRE; document.head.appendChild(st); }
    } catch (e) { }
  }

  var RACINE = "hv2 hv2-dE hv2-o1 hv2-pA hv2-l1 hg";
  var FILTRE = { "--hv-filtre": "saturate(.92) contrast(1.05) brightness(.95) sepia(.07)", "--hv-bords": .5 };

  /* ───────────── petits morceaux de dessin (mêmes balises que la Vidéothèque) ───────────── */
  function courbe(h, cls, d) {
    return h("svg", { className: "hv2-courbe " + cls, viewBox: "0 0 400 100", preserveAspectRatio: "none", "aria-hidden": "true" },
      h("defs", null, h("linearGradient", { id: "hgg-" + cls, x1: "0", x2: "1", y1: "0", y2: "0" },
        h("stop", { offset: "0", stopColor: "#C9A66B", stopOpacity: "0" }),
        h("stop", { offset: ".45", stopColor: "#C9A66B", stopOpacity: ".95" }),
        h("stop", { offset: "1", stopColor: "#C9A66B", stopOpacity: ".15" }))),
      cls === "c2" ? h("path", { d: d + " L400 100 L0 100 Z", fill: "#070A08", stroke: "none" }) : null,
      h("path", { d: d, fill: "none", stroke: "url(#hgg-" + cls + ")", strokeWidth: 1.1, vectorEffect: "non-scaling-stroke" }));
  }
  function hero(h, o) {
    return h("div", { className: "hv2-hero" + (o.retour ? " hv2-hero-r" : "") },
      (typeof SelecteurLangue === "function") ? h("div", { className: "hv2-langue" }, h(SelecteurLangue, { compact: true })) : null,
      o.retour ? h("div", { className: "hv2-in hv2-hero-retour" }, h("button", { type: "button", className: "hg-ret", onClick: o.retour }, h("i", null, "‹"), o.retourTxt)) : null,
      courbe(h, "c1", "M250 4 C 330 8, 385 40, 400 96"),
      h("div", { className: "hv2-photo hv2-traite", style: { "--hv-pos-tel": o.photo.pos, "--hv-pos-tab": o.photo.pos, "--hv-pos-ordi": o.photo.pos } },
        h("img", { src: o.photo.img, alt: "", "aria-hidden": "true", fetchpriority: "high" })),
      courbe(h, "c2", "M0 92 C 130 90, 240 62, 400 8"),
      h("div", { className: "hv2-in" }, h("div", { className: "hv2-titre" }, h("h1", null, o.titre), o.sous ? h("p", null, o.sous) : null)));
  }
  var SVG_CLOCHE = function (h) { return h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: "M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2H4.5z" }), h("path", { d: "M10 20.5a2 2 0 0 0 4 0" })); };
  function carte(h, o) {
    return h("div", { key: o.cle, className: "hv3-carte" + (o.onClick ? "" : " off") },
      h("button", { type: "button", className: "hv3-vig", onClick: o.onClick || undefined, disabled: !o.onClick, "aria-label": o.titre },
        h("img", { src: o.photo.img, alt: "", loading: "lazy", style: { objectPosition: o.photo.pos } })),
      h("button", { type: "button", className: "hv3-info", onClick: o.onClick || undefined, disabled: !o.onClick },
        h("h4", null, o.titre),
        o.sous ? h("span", { className: "hv3-cours" }, o.sous) : null,
        h("span", { className: "hv3-meta" }, o.pill ? h("i", { className: "hv3-pill" }, o.pill) : null, o.qui ? h("span", { className: "hv3-qui" }, o.qui) : null),
        o.etat ? h("span", { className: "hv3-prog" }, h("span", { style: { flex: 1 } }), h("span", { className: "hv3-etat" + (o.alerte ? " or" : "") }, o.etat)) : null));
  }
  var LEGAL = function (h) { return h("div", { className: "hg-legal" }, "Hype t'aide à tenir ton registre à jour et à ne rien oublier.", h("br"), "Le registre reste sous ta responsabilité de détenteur."); };

  /* ───────────── lecture des données (partagée par les deux pages) ───────────── */
  function clefDe(n) { try { return (typeof clefClubG === "function") ? clefClubG(n) : String(n || "").toLowerCase().trim(); } catch (e) { return String(n || "").toLowerCase().trim(); } }
  function isoAuj() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function sireReg(d, ch) { var x = (d && d.regch || {})[String(ch && ch.id)]; return sireDe(ch) || (x && x.sire ? String(x.sire).trim() : ""); }
  function sireDe(ch) {
    try { var o = ch && ch.origines; if (typeof o === "string") o = JSON.parse(o); return (o && typeof o === "object" && o.sire) ? String(o.sire).trim() : ""; } catch (e) { return ""; }
  }

  function useDonneesEcurie(club, recharge) {
    var _d = React.useState(null); var d = _d[0], setD = _d[1];
    React.useEffect(function () {
      var vif = true;
      setD(null);
      (async function () {
        var res = { club: club, chevaux: [], soins: [], docs: [], mouvements: [], mvAbsent: false, vetos: [], fiche: null, ficheAbsente: false, regch: {}, regchAbsent: false, peutGerer: false, erreur: "" };
        try {
          if (typeof supa === "undefined" || !supa) { res.erreur = "Pas de connexion."; if (vif) setD(res); return; }
          if (!club) { if (vif) setD(res); return; }
          /* select("*") : une seule colonne absente ferait rejeter toute la requête (piège connu du projet) */
          var rc = await supa.from("chevaux").select("*").is("supprime_le", null).limit(600);
          if (rc && rc.error) throw new Error(rc.error.message || String(rc.error));
          var tous = (rc && rc.data) || [];
          res.chevaux = (typeof hypeChevauxDuClub === "function") ? hypeChevauxDuClub(tous, club) : [];
          var ids = res.chevaux.map(function (c) { return c.id; }).filter(Boolean);
          if (ids.length) {
            var rs = await supa.from("soins_cheval").select("*").in("cheval_id", ids.slice(0, 300)).limit(2000);
            if (rs && rs.error) res.erreur = String(rs.error.message || rs.error); else res.soins = (rs && rs.data) || [];
            try { var rdoc = await supa.from("cheval_documents").select("*").in("cheval_id", ids.slice(0, 300)).limit(2000); if (rdoc && !rdoc.error) res.docs = rdoc.data || []; } catch (eDoc) { }
            try {
              var rl = await supa.from("cheval_professionnels").select("*").in("cheval_id", ids.slice(0, 300)).limit(1000);
              var pids = []; ((rl && !rl.error && rl.data) || []).forEach(function (x) { if (x.professionnel_id && pids.indexOf(x.professionnel_id) < 0) pids.push(x.professionnel_id); });
              if (pids.length) {
                var rp = await supa.from("professionnels").select("*").in("id", pids.slice(0, 200));
                res.vetos = ((rp && !rp.error && rp.data) || []).filter(function (p) { return String(p.role || "").toLowerCase().indexOf("veterinaire") >= 0; });
              }
            } catch (eP) { }
          }
          /* 05/11 étape 2 — fiche du registre (parties I et III) : une ligne par écurie dans ecurie_registre.
             Tant que la table n'existe pas en base, on le dit (ficheAbsente) sans rien casser. */
          try {
            var clef = clefDe(club);
            var rf = await supa.from("ecurie_registre").select("*").eq("club_clef", clef).maybeSingle();
            if (rf && rf.error) { var m = String(rf.error.message || rf.error.code || ""); if (/does not exist|relation|42P01|schema cache/i.test(m)) res.ficheAbsente = true; }
            else res.fiche = (rf && rf.data) || null;
            /* 05/11 étape 3 — registre des chevaux (partie IV), une ligne par cheval tenue par l'écurie */
            /* 05/11 partie V — mouvements des chevaux de cette écurie */
            var rmv = await supa.from("registre_mouvements").select("*").eq("club_clef", clef).order("date_sortie", { ascending: false }).limit(3000);
            if (rmv && rmv.error) { var m3 = String(rmv.error.message || rmv.error.code || ""); if (/does not exist|relation|42P01|schema cache/i.test(m3)) res.mvAbsent = true; }
            else res.mouvements = (rmv && rmv.data) || [];
            var rr = await supa.from("registre_chevaux").select("*").eq("club_clef", clef).limit(1000);
            if (rr && rr.error) { var m2 = String(rr.error.message || rr.error.code || ""); if (/does not exist|relation|42P01|schema cache/i.test(m2)) res.regchAbsent = true; }
            else ((rr && rr.data) || []).forEach(function (x) { res.regch[String(x.cheval_id)] = x; });
            try { var r1 = await supa.rpc("hype_est_moderatrice"); res.peutGerer = !!(r1 && r1.data === true); } catch (eM) { }
            if (!res.peutGerer) { try { var r2 = await supa.rpc("hype_peut_gerer_club", { clef: clef }); res.peutGerer = !!(r2 && r2.data === true); } catch (eG) { } }
          } catch (eF) { }
        } catch (e) { res.erreur = String((e && e.message) || e); }
        if (vif) setD(res);
      })();
      return function () { vif = false; };
    }, [club, recharge || 0]);
    return d;
  }

  /* le dernier soin de chaque type pour chaque cheval ; en retard si sa date prochaine est passée */
  function nonConfirme(s) { return s && s.confirme_le === null && !s.refuse; }   /* null = colonne présente et vide ; undefined = pas encore en base */
  function analyserSoins(d) {
    var auj = isoAuj(), dernier = {};
    (d.soins || []).filter(function (s) { return !s.refuse; }).forEach(function (s) {
      var k = String(s.cheval_id) + "|" + String(s.type || "");
      var di = String(s.date_intervention || "");
      if (!dernier[k] || di > String(dernier[k].date_intervention || "")) dernier[k] = s;
    });
    var retards = [], prochains = [];
    Object.keys(dernier).forEach(function (k) {
      var s = dernier[k], dp = String(s.date_prochaine || "").slice(0, 10);
      if (!dp) return;
      if (dp < auj) retards.push(s); else prochains.push(s);
    });
    prochains.sort(function (a, b) { return String(a.date_prochaine).localeCompare(String(b.date_prochaine)); });
    return { retards: retards, prochains: prochains, aConfirmer: (d.soins || []).filter(nonConfirme) };
  }
  function nomCheval(d, id) { var c = (d.chevaux || []).filter(function (x) { return x.id === id; })[0]; return c ? (c.nom || "") : ""; }
  var TYPES = { vaccin: "Vaccin", vermifuge: "Vermifuge", ferrure: "Ferrure", parage: "Parage", veterinaire: "Vétérinaire", dentiste: "Dentiste", osteopathe: "Ostéopathe", traitement: "Traitement" };
  function dateCourte(iso) { var m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})/); if (!m) return ""; try { var dd = new Date(+m[1], +m[2] - 1, +m[3]); var o = { day: "numeric", month: "short" }; if (dd.getFullYear() !== new Date().getFullYear()) o.year = "numeric"; return new Intl.DateTimeFormat("fr-FR", o).format(dd); } catch (e) { return m[3] + "/" + m[2]; } }

  function etatRegistre(d) {
    var nCh = (d.chevaux || []).length;
    var presents = (d.chevaux || []).filter(function (c) { var x = (d.regch || {})[String(c.id)]; return !(x && x.date_sortie); });
    var nSire = presents.filter(function (c) { return !!sireReg(d, c); }).length;
    var nComplets = presents.filter(function (c) { var x = (d.regch || {})[String(c.id)] || {}; return !!sireReg(d, c) && !!x.puce && !!x.date_entree; }).length;
    var so = analyserSoins(d);
    nCh = presents.length;
    var chevauxOk = nCh > 0 && nComplets === nCh;
    var soinsOk = so.retards.length === 0 && (d.soins || []).length > 0;
    var f = d.fiche || {};
    var manqueI = [!f.numero_detenteur && "n° de détenteur", !f.siret && "SIRET", !f.adresse_lieu && "adresse"].filter(Boolean);
    var manqueIII = [!f.veto_traitant && "traitant", !f.veto_sanitaire && "sanitaire"].filter(Boolean);
    var detOk = manqueI.length === 0, vetOk = manqueIII.length === 0;
    return { nCh: nCh, nSire: nSire, nComplets: nComplets, so: so, chevauxOk: chevauxOk, soinsOk: soinsOk, detOk: detOk, vetOk: vetOk, manqueI: manqueI, manqueIII: manqueIII,
      complets: (chevauxOk ? 1 : 0) + (soinsOk ? 1 : 0) + (detOk ? 1 : 0) + (vetOk ? 1 : 0) };
  }

  /* ───────────── le club : choisi depuis la page Écurie, sinon celui du profil ───────────── */
  function useClub() {
    var _c = React.useState(function () { try { return (window.__santeClub && window.__santeClub.nom) || window.__gestionClub || ""; } catch (e) { return ""; } });
    var club = _c[0], setClub = _c[1];
    var _l = React.useState([]); var clubs = _l[0], setClubs = _l[1];
    React.useEffect(function () {
      var vif = true;
      (async function () {
        try {
          var u = (typeof utilisateurActuel === "function") ? await utilisateurActuel() : null;
          if (!u || !u.id || typeof supa === "undefined" || !supa) return;
          var rp = await supa.from("profiles").select("*").eq("id", u.id).maybeSingle();
          var p = (rp && rp.data) || {};
          var l = [p.ecurie, p.ecurie2].map(function (x) { return String(x || "").trim(); }).filter(Boolean);
          if (!vif) return;
          setClubs(l);
          setClub(function (c) { return c || l[0] || ""; });
        } catch (e) { }
      })();
      return function () { vif = false; };
    }, []);
    function choisir(n) { try { window.__gestionClub = n; window.__santeClub = { nom: n }; } catch (e) { } setClub(n); }
    return { club: club, clubs: clubs, choisir: choisir };
  }
  function pilsClubs(h, c) {
    if (!c.clubs || c.clubs.length < 2) return null;
    return h("div", { className: "hv3-pils", role: "tablist" }, c.clubs.map(function (n) {
      var on = n === c.club;
      return h("button", { key: n, type: "button", className: "hv3-pil" + (on ? " on" : ""), "aria-pressed": on, onClick: function () { c.choisir(n); } }, n);
    }));
  }

  /* ═════════════════════════ PAGE « MON ÉCURIE » ═════════════════════════ */
  function EcranMonEcurie() {
    var h = React.createElement;
    var app = (typeof useApp === "function") ? useApp() : {};
    var setEcran = app.setEcran || function () { };
    React.useEffect(function () { injecterCss(); try { window.scrollTo(0, 0); } catch (e) { } }, []);
    var c = useClub();
    var d = useDonneesEcurie(c.club);
    function ouvrir(ecran) { try { window.__santeClub = { nom: c.club }; window.__gestionClub = c.club; } catch (e) { } setEcran(ecran); }

    var corps;
    if (!d) corps = h("div", { className: "hg-attente", "aria-busy": "true" }, "…");
    else if (!c.club) corps = h("div", { className: "hg-vide" }, "Rattache-toi à une écurie depuis ton profil pour ouvrir cet espace.");
    else {
      var r = etatRegistre(d);
      var nRet = r.so.retards.length;
      var prochain = r.so.prochains[0];
      var cases = [
        { b: "Registre", s: r.complets + " sur 7", on: function () { ouvrir("registre"); } },
        { b: "Soins", s: nRet ? (nRet + " en retard") : ((d.soins || []).length ? "À jour" : "Aucun noté"), alerte: nRet > 0, on: function () { ouvrir("sante-club"); } },
        { b: "Camion", s: "Bientôt" },
        { b: "Compta", s: "Bientôt" }
      ];
      corps = h("div", null,
        h("div", { className: "hv2-ligne" },
          (r.so.aConfirmer.length
            ? h("button", { type: "button", className: "hv2-mes", onClick: function () { ouvrir("soins-a-confirmer"); } }, SVG_CLOCHE(h), "À confirmer · " + r.so.aConfirmer.length + (nRet ? " · " + nRet + " en retard" : ""))
            : h("button", { type: "button", className: "hv2-mes", onClick: function () { ouvrir("sante-club"); } }, SVG_CLOCHE(h), nRet ? ("Mes alertes · " + nRet) : "Aucune alerte")),
          h("span", null)),
        pilsClubs(h, c),
        h("div", { className: "hv2-choix" },
          h("div", { className: "hv2-choix-tete" }, h("h2", { className: "hv2-h2", style: { margin: 0 } }, "Ce qui t'attend")),
          h("div", { className: "hv2-choix-rang" }, cases.map(function (x) {
            return h("button", { key: x.b, type: "button", className: "hv2-og hv2-cg", disabled: !x.on, onClick: x.on || undefined },
              h("b", null, x.b), h("span", { className: x.alerte ? "or" : "" }, x.s));
          }))),
        h("h2", { className: "hv2-h2" }, "Explore ton écurie"),
        h("div", { className: "hv2-grille" },
          theme(h, "large", PHOTOS.registre, "Le registre d'élevage", "7 parties · " + r.complets + " complète" + (r.complets > 1 ? "s" : ""), function () { ouvrir("registre"); }),
          theme(h, "", PHOTOS.soins, "Les soins", (d.soins || []).length ? ((d.soins || []).length + " noté" + ((d.soins || []).length > 1 ? "s" : "") + (nRet ? " · " + nRet + " en retard" : "")) : "Aucun soin noté", function () { ouvrir("sante-club"); }),
          theme(h, "", PHOTOS.controles, "Les échéances", prochain ? ("Prochaine : " + dateCourte(prochain.date_prochaine)) : "Aucune date à venir", function () { ouvrir("sante-club"); }),
          theme(h, "", PHOTOS.camion, "Le camion", "Bientôt", null),
          theme(h, "", PHOTOS.compta, "Ma compta", "Bientôt", null)),
        d.erreur ? h("div", { className: "hg-err" }, "Une partie n'a pas pu être lue : " + d.erreur) : null,
        LEGAL(h));
    }
    return h("div", { className: RACINE, style: FILTRE },
      hero(h, { photo: PHOTOS.accueil, titre: "Mon écurie", sous: c.club ? c.club : "Tout en règle. Pars tranquille." }),
      h("div", { className: "hv2-in" }, corps));
  }
  function theme(h, cls, ph, titre, sous, onClick) {
    return h("button", { key: titre, type: "button", className: "hv2-theme " + cls, disabled: !onClick, onClick: onClick || undefined },
      h("span", { className: "hv2-traite", style: { display: "block", "--hv-pos": ph.pos } }, h("img", { src: ph.img, alt: "", loading: "lazy" })),
      h("span", { className: "hv2-pan" }, h("b", null, titre), h("span", null, sous)));
  }

  /* ═════════════════════════ PAGE « LE REGISTRE » ═════════════════════════ */
  function EcranRegistre() {
    var h = React.createElement;
    var app = (typeof useApp === "function") ? useApp() : {};
    var setEcran = app.setEcran || function () { };
    React.useEffect(function () { injecterCss(); try { window.scrollTo(0, 0); } catch (e) { } }, []);
    var c = useClub();
    var d = useDonneesEcurie(c.club);
    var _f = React.useState("tout"); var filtre = _f[0], setFiltre = _f[1];
    function ouvrir(ecran) { try { window.__santeClub = { nom: c.club }; window.__gestionClub = c.club; } catch (e) { } setEcran(ecran); }

    var corps;
    if (!d) corps = h("div", { className: "hg-attente", "aria-busy": "true" }, "…");
    else if (!c.club) corps = h("div", { className: "hg-vide" }, "Rattache-toi à une écurie depuis ton profil pour ouvrir cet espace.");
    else {
      var r = etatRegistre(d);
      var nRet = r.so.retards.length;
      var v = d.vetos || [];
      var parties = [
        { cle: "I", ok: r.detOk, photo: PHOTOS.detenteur, titre: "Le détenteur", sous: r.detOk ? "N° de détenteur, SIRET et adresse notés" : ("Il manque : " + r.manqueI.join(", ")), pill: "Partie I", etat: r.detOk ? "\u2713 À jour" : "À compléter", on: function () { ouvrir("detenteur"); } },
        { cle: "II", ok: false, photo: PHOTOS.plan, titre: "Le plan des lieux", sous: "Bâtiments et pâtures", pill: "Partie II", etat: "À compléter" },
        { cle: "III", ok: r.vetOk, photo: PHOTOS.veto, titre: "Les vétérinaires", sous: r.vetOk ? "Traitant et sanitaire notés" : ("Il manque : " + r.manqueIII.join(", ")), pill: "Partie III", qui: (!r.vetOk && v.length) ? (v.length + " dans l'équipe de soins") : "", etat: r.vetOk ? "\u2713 À jour" : "À compléter", on: function () { ouvrir("detenteur"); } },
        { cle: "IV", ok: r.chevauxOk, photo: PHOTOS.chevaux, titre: "Les chevaux présents", sous: r.chevauxOk ? "SIRE, puce et entrée notés" : ((r.nCh - r.nComplets) + " fiche" + ((r.nCh - r.nComplets) > 1 ? "s" : "") + " à compléter"), pill: "Partie IV", qui: r.nCh + " cheva" + (r.nCh > 1 ? "ux" : "l"), etat: r.chevauxOk ? "\u2713 À jour" : (r.nComplets + " / " + r.nCh), on: function () { ouvrir("registre-chevaux"); } },
        { cle: "V", ok: !d.mvAbsent && (d.mouvements || []).length > 0, photo: PHOTOS.mouvements, titre: "Les mouvements", sous: d.mvAbsent ? "Concours, stages, vétérinaire" : ((d.mouvements || []).length + " déplacement" + ((d.mouvements || []).length > 1 ? "s" : "") + " noté" + ((d.mouvements || []).length > 1 ? "s" : "")), pill: "Partie V", etat: d.mvAbsent ? "Bientôt" : ((d.mouvements || []).length ? "\u2713 Tenu" : "À commencer"), on: d.mvAbsent ? null : function () { ouvrir("registre-mouvements"); } },
        { cle: "VI", ok: r.soinsOk, photo: PHOTOS.soins, titre: "Les soins", sous: (d.soins || []).length + " soin" + ((d.soins || []).length > 1 ? "s" : "") + " noté" + ((d.soins || []).length > 1 ? "s" : ""), pill: "Partie VI", qui: r.so.aConfirmer.length ? (r.so.aConfirmer.length + " à confirmer") : (nRet ? r.so.retards.slice(0, 2).map(function (s) { return nomCheval(d, s.cheval_id); }).join(", ") : ""), etat: nRet ? (nRet + " en retard") : ((d.soins || []).length ? "✓ À jour" : "Aucun soin"), alerte: nRet > 0, on: function () { ouvrir("registre-soins"); } },
        { cle: "VII", ok: false, bientot: true, photo: PHOTOS.controles, titre: "Les contrôles", sous: "La page à montrer lors d'une visite", pill: "Partie VII", etat: "Bientôt" }
      ];
      var aFaire = parties.filter(function (p) { return !p.ok; }), ajour = parties.filter(function (p) { return p.ok; });
      var vis = filtre === "afaire" ? { a: aFaire, j: [] } : filtre === "ajour" ? { a: [], j: ajour } : { a: aFaire, j: ajour };
      corps = h("div", null,
        pilsClubs(h, c),
        h("div", { className: "hv3-pils", role: "tablist" },
          [["tout", "Les 7 parties"], ["afaire", "À compléter (" + aFaire.length + ")"], ["ajour", "À jour (" + ajour.length + ")"]].map(function (x) {
            return h("button", { key: x[0], type: "button", className: "hv3-pil" + (filtre === x[0] ? " on" : ""), "aria-pressed": filtre === x[0], onClick: function () { setFiltre(x[0]); } }, x[1]);
          })),
        vis.a.length ? h("div", null, h("h2", { className: "hv3-h2" }, "À compléter"), h("div", { className: "hv3-cartes" }, vis.a.map(function (p) { return carte(h, { cle: p.cle, photo: p.photo, titre: p.titre, sous: p.sous, pill: p.pill, qui: p.qui, etat: p.etat, alerte: p.alerte, onClick: p.on }); }))) : null,
        vis.j.length ? h("div", null, h("h2", { className: "hv3-h2" }, "À jour"), h("div", { className: "hv3-cartes" }, vis.j.map(function (p) { return carte(h, { cle: p.cle, photo: p.photo, titre: p.titre, sous: p.sous, pill: p.pill, qui: p.qui, etat: p.etat, onClick: p.on }); }))) : null,
        d.erreur ? h("div", { className: "hg-err" }, "Une partie n'a pas pu être lue : " + d.erreur) : null,
        LEGAL(h));
    }
    return h("div", { className: RACINE, style: FILTRE },
      hero(h, { photo: PHOTOS.registre, titre: "Le registre", sous: "Ton registre d'élevage, toujours prêt.", retour: function () { setEcran("mon-ecurie"); }, retourTxt: "Mon écurie" }),
      h("div", { className: "hv2-in" }, corps));
  }


  /* ═════════════════════════ PAGE « LE DÉTENTEUR » (parties I et III) ═════════════════════════
     05/11 étape 2 : une fiche par écurie (table ecurie_registre). Seules les personnes qui gèrent l'écurie
     (et les modératrices) peuvent la lire et la remplir : la base le vérifie aussi.
     ⚠️ Piège du projet : une écriture refusée par une règle renvoie ZÉRO LIGNE sans erreur.
     Après l'enregistrement, on relit donc la ligne et on ne dit « Enregistré » que si elle est revenue. */
  var CHAMPS_I = [
    { k: "structure", lab: "Nom de la structure", ex: "Association, société, élevage…" },
    { k: "responsable", lab: "Responsable du lieu", ex: "Prénom et nom" },
    { k: "adresse_lieu", lab: "Adresse du lieu de détention", ex: "Là où vivent les chevaux" },
    { k: "siret", lab: "SIRET", ex: "14 chiffres", aide: "Sur ton avis de situation INSEE ou ton relevé bancaire professionnel." },
    { k: "numero_detenteur", lab: "N° de détenteur SIRE", ex: "Ton numéro dans l'espace SIRE", aide: "Dans ton espace SIRE sur ifce.fr, rubrique « Sanitaire et détention ». Obligatoire : sans déclaration, amende jusqu'à 1 500 €." },
    { k: "code_ape", lab: "Code APE", ex: "Facultatif" }
  ];
  var CHAMPS_III = [
    { k: "veto_traitant", lab: "Vétérinaire traitant", ex: "Nom, cabinet, téléphone" },
    { k: "veto_sanitaire", lab: "Vétérinaire sanitaire", ex: "Nom, cabinet, téléphone", aide: "Obligatoire dès 3 chevaux, désigné auprès de la DDPP. Souvent le même que le traitant." }
  ];
  var CSS_FORM = [
    ".hg-f{margin-top:6px}",
    ".hg-f label{display:block;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:rgba(243,238,228,.64);margin:16px 0 6px;font-family:'Montserrat',sans-serif}",
    ".hg-f input{width:100%;box-sizing:border-box;min-height:46px;padding:11px 13px;border-radius:12px;border:1px solid rgba(243,238,228,.14);background:rgba(16,26,29,.55);color:#F3EEE4;font-family:'Montserrat',sans-serif;font-size:16px;outline:none}",
    ".hg-f input:focus{border-color:#C9A66B}",
    ".hg-f input::placeholder{color:rgba(243,238,228,.38)}",
    ".hg-f input[readonly]{opacity:.7}",
    ".hg-aide{font-size:11px;line-height:1.45;color:rgba(243,238,228,.5);margin-top:6px;font-family:'Montserrat',sans-serif}",
    ".hg-sugg{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}",
    ".hg-sugg button{border:1px solid rgba(201,166,107,.6);background:transparent;color:#C9A66B;border-radius:999px;padding:5px 12px;font-size:12px;font-family:'Montserrat',sans-serif}",
    ".hg-btn{display:flex;align-items:center;justify-content:center;width:100%;min-height:48px;margin-top:22px;border-radius:999px;border:1px solid #C9A66B;background:#C9A66B;color:#070A08;font-weight:600;font-size:14.5px;font-family:'Montserrat',sans-serif}",
    ".hg-btn[disabled]{opacity:.5}",
    ".hg-ok{margin-top:12px;text-align:center;font-size:13px;color:#C9A66B;font-family:'Montserrat',sans-serif}",
    ".hg-encart{margin-top:18px;border:1px solid rgba(201,166,107,.4);border-radius:14px;padding:14px;background:linear-gradient(135deg,rgba(201,166,107,.08),rgba(7,10,8,0) 70%);font-family:'Montserrat',sans-serif;font-size:12.5px;line-height:1.5;color:rgba(243,238,228,.8)}",
    ".hg-encart b{display:block;font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;font-size:20px;color:#F3EEE4;margin-bottom:4px}"
  ].join("\n");

  function EcranDetenteur() {
    var h = React.createElement;
    var app = (typeof useApp === "function") ? useApp() : {};
    var setEcran = app.setEcran || function () { };
    React.useEffect(function () {
      injecterCss();
      try { if (!document.getElementById(CSS_ID + "-form")) { var s = document.createElement("style"); s.id = CSS_ID + "-form"; s.textContent = CSS_FORM; document.head.appendChild(s); } } catch (e) { }
      try { window.scrollTo(0, 0); } catch (e) { }
    }, []);
    var c = useClub();
    var _r = React.useState(0); var recharge = _r[0], setRecharge = _r[1];
    var d = useDonneesEcurie(c.club, recharge);
    var _v = React.useState(null); var val = _v[0], setVal = _v[1];
    var _s = React.useState(""); var msg = _s[0], setMsg = _s[1];
    var _e = React.useState(false); var envoi = _e[0], setEnvoi = _e[1];
    React.useEffect(function () { if (d) setVal(Object.assign({}, d.fiche || {})); }, [d]);

    function champ(x, lecture) {
      return h("div", { key: x.k },
        h("label", { htmlFor: "hg-" + x.k }, x.lab),
        h("input", { id: "hg-" + x.k, value: (val && val[x.k]) || "", placeholder: x.ex, readOnly: !!lecture, autoComplete: "off",
          inputMode: (x.k === "siret") ? "numeric" : undefined,
          onChange: function (e) { var v = e.target.value; setMsg(""); setVal(function (o) { var n = Object.assign({}, o); n[x.k] = v; return n; }); } }),
        x.aide ? h("div", { className: "hg-aide" }, x.aide) : null);
    }

    async function enregistrer() {
      if (!d || !val) return;
      setEnvoi(true); setMsg("");
      try {
        var clef = clefDe(c.club);
        var ligne = { club_clef: clef, club_nom: c.club };
        CHAMPS_I.concat(CHAMPS_III).forEach(function (x) { var v = String((val[x.k] || "")).trim(); ligne[x.k] = v || null; });
        if (ligne.siret) ligne.siret = ligne.siret.replace(/\s+/g, "");
        ligne.maj_le = new Date().toISOString();
        var r = await supa.from("ecurie_registre").upsert(ligne, { onConflict: "club_clef" }).select("*");
        if (r && r.error) throw new Error(r.error.message || String(r.error));
        var relue = await supa.from("ecurie_registre").select("*").eq("club_clef", clef).maybeSingle();
        if (!relue || relue.error || !relue.data) throw new Error("La base n'a rien enregistré (droits de l'écurie à vérifier).");
        setMsg("✓ Enregistré");
        setRecharge(function (n) { return n + 1; });
      } catch (e) { setMsg("Pas enregistré : " + String((e && e.message) || e)); }
      setEnvoi(false);
    }

    var corps;
    if (!d || !val) corps = h("div", { className: "hg-attente", "aria-busy": "true" }, "…");
    else if (!c.club) corps = h("div", { className: "hg-vide" }, "Rattache-toi à une écurie depuis ton profil pour ouvrir cet espace.");
    else if (d.ficheAbsente) corps = h("div", { className: "hg-encart" }, h("b", null, "Bientôt"), "Cette partie du registre arrive très vite : elle n'est pas encore activée.");
    else if (!d.peutGerer) corps = h("div", { className: "hg-encart" }, h("b", null, "Réservé au responsable"), "Seule la personne qui gère l'écurie peut voir et remplir cette partie du registre.");
    else {
      var vets = (d.vetos || []).map(function (p) { return [p.nom, p.structure, p.tel].filter(Boolean).join(" · "); }).filter(Boolean);
      corps = h("div", null,
        pilsClubs(h, c),
        h("div", { className: "hg-encart" }, h("b", null, "Pourquoi c'est important"),
          "La personne qui s'occupe du lieu où vivent les chevaux doit se déclarer à l'IFCE. Ces informations ouvrent ton registre d'élevage."),
        h("h2", { className: "hv3-h2" }, "Le détenteur"),
        h("div", { className: "hg-f" }, CHAMPS_I.map(function (x) { return champ(x); })),
        h("h2", { className: "hv3-h2" }, "Les vétérinaires"),
        h("div", { className: "hg-f" }, CHAMPS_III.map(function (x) {
          return h("div", { key: x.k }, champ(x),
            vets.length ? h("div", { className: "hg-sugg" }, vets.map(function (s) {
              return h("button", { key: s, type: "button", onClick: function () { setMsg(""); setVal(function (o) { var n = Object.assign({}, o); n[x.k] = s; return n; }); } }, "Reprendre : " + s);
            })) : null);
        })),
        h("button", { type: "button", className: "hg-btn", disabled: envoi, onClick: enregistrer }, envoi ? "Enregistrement…" : "Enregistrer"),
        msg ? h("div", { className: "hg-ok", role: "status" }, msg) : null,
        LEGAL(h));
    }
    return h("div", { className: RACINE, style: FILTRE },
      hero(h, { photo: PHOTOS.detenteur, titre: "Le détenteur", sous: "Parties I et III de ton registre.", retour: function () { setEcran("registre"); }, retourTxt: "Le registre" }),
      h("div", { className: "hv2-in" }, corps));
  }


  /* ═════════════════════════ PAGE « LES CHEVAUX PRÉSENTS » (partie IV) ═════════════════════════
     05/11 étape 3 : une ligne par cheval dans registre_chevaux, tenue par l'écurie (la fiche du cheval n'est pas touchée).
     Le n° SIRE de la fiche du cheval est repris tel quel ; on ne le demande que s'il manque.
     Un cheval qui part reçoit une date de sortie : il reste dans le registre (gardé 5 ans), rangé dans « Sortis ». */
  var CHAMPS_CH = [
    { k: "sire", lab: "N° SIRE", ex: "8 chiffres et une lettre", aide: "Sur le document d'identification ou la carte d'immatriculation." },
    { k: "puce", lab: "N° de puce", ex: "15 chiffres", num: true },
    { k: "proprietaire", lab: "Propriétaire", ex: "Nom du propriétaire" },
    { k: "date_entree", lab: "Arrivé à l'écurie le", date: true },
    { k: "provenance", lab: "Venant de", ex: "Adresse ou élevage d'origine" },
    { k: "date_sortie", lab: "Parti le", date: true, aide: "À remplir seulement s'il a quitté l'écurie." },
    { k: "motif_sortie", lab: "Motif du départ", ex: "Vente, retour propriétaire, retraite…" },
    { k: "destination", lab: "Parti vers", ex: "Adresse de destination" }
  ];
  function EcranRegistreChevaux() {
    var h = React.createElement;
    var app = (typeof useApp === "function") ? useApp() : {};
    var setEcran = app.setEcran || function () { };
    React.useEffect(function () {
      injecterCss();
      try { if (!document.getElementById(CSS_ID + "-form")) { var s = document.createElement("style"); s.id = CSS_ID + "-form"; s.textContent = CSS_FORM; document.head.appendChild(s); } } catch (e) { }
      try { window.scrollTo(0, 0); } catch (e) { }
    }, []);
    var c = useClub();
    var _r = React.useState(0); var recharge = _r[0], setRecharge = _r[1];
    var d = useDonneesEcurie(c.club, recharge);
    var _f = React.useState("afaire"); var filtre = _f[0], setFiltre = _f[1];
    var _o = React.useState(null); var ouvert = _o[0], setOuvert = _o[1];
    var _v = React.useState({}); var val = _v[0], setVal = _v[1];
    var _m = React.useState(""); var msg = _m[0], setMsg = _m[1];
    var _e = React.useState(false); var envoi = _e[0], setEnvoi = _e[1];

    function ouvrirCheval(ch) {
      if (ouvert === ch.id) { setOuvert(null); return; }
      var x = (d.regch || {})[String(ch.id)] || {};
      var v = {}; CHAMPS_CH.forEach(function (f) { v[f.k] = x[f.k] || ""; });
      setVal(v); setMsg(""); setOuvert(ch.id);
    }
    async function enregistrer(ch) {
      setEnvoi(true); setMsg("");
      try {
        var clef = clefDe(c.club);
        var ligne = { club_clef: clef, cheval_id: ch.id, maj_le: new Date().toISOString() };
        CHAMPS_CH.forEach(function (f) { var v = String(val[f.k] || "").trim(); ligne[f.k] = v || null; });
        if (sireDe(ch)) ligne.sire = null;   /* déjà sur la fiche du cheval : on ne le recopie pas */
        if (ligne.puce) ligne.puce = ligne.puce.replace(/\s+/g, "");
        var r = await supa.from("registre_chevaux").upsert(ligne, { onConflict: "club_clef,cheval_id" }).select("*");
        if (r && r.error) throw new Error(r.error.message || String(r.error));
        var relue = await supa.from("registre_chevaux").select("*").eq("club_clef", clef).eq("cheval_id", ch.id).maybeSingle();
        if (!relue || relue.error || !relue.data) throw new Error("La base n'a rien enregistré (droits de l'écurie à vérifier).");
        setMsg("✓ Enregistré"); setOuvert(null); setRecharge(function (n) { return n + 1; });
      } catch (e) { setMsg("Pas enregistré : " + String((e && e.message) || e)); }
      setEnvoi(false);
    }

    function formulaire(ch) {
      var sireFiche = sireDe(ch);
      return h("div", { className: "hg-f", style: { padding: "0 4px 14px" } },
        CHAMPS_CH.map(function (f) {
          if (f.k === "sire" && sireFiche) return h("div", { key: f.k }, h("label", null, f.lab), h("input", { value: sireFiche, readOnly: true }), h("div", { className: "hg-aide" }, "Repris de la fiche du cheval."));
          return h("div", { key: f.k },
            h("label", { htmlFor: "hg-" + f.k + "-" + ch.id }, f.lab),
            h("input", { id: "hg-" + f.k + "-" + ch.id, type: f.date ? "date" : "text", value: val[f.k] || "", placeholder: f.ex || "", autoComplete: "off", inputMode: f.num ? "numeric" : undefined,
              onChange: function (e) { var v = e.target.value; setMsg(""); setVal(function (o) { var n = Object.assign({}, o); n[f.k] = v; return n; }); } }),
            f.aide ? h("div", { className: "hg-aide" }, f.aide) : null);
        }),
        h("button", { type: "button", className: "hg-btn", disabled: envoi, onClick: function () { enregistrer(ch); } }, envoi ? "Enregistrement…" : "Enregistrer " + (ch.nom || "")),
        msg ? h("div", { className: "hg-ok", role: "status" }, msg) : null);
    }

    var corps;
    if (!d) corps = h("div", { className: "hg-attente", "aria-busy": "true" }, "…");
    else if (!c.club) corps = h("div", { className: "hg-vide" }, "Rattache-toi à une écurie depuis ton profil pour ouvrir cet espace.");
    else if (d.regchAbsent) corps = h("div", { className: "hg-encart" }, h("b", null, "Bientôt"), "Cette partie du registre arrive très vite : elle n'est pas encore activée.");
    else if (!d.peutGerer) corps = h("div", { className: "hg-encart" }, h("b", null, "Réservé au responsable"), "Seule la personne qui gère l'écurie peut voir et remplir cette partie du registre.");
    else {
      var lignes = (d.chevaux || []).map(function (ch) {
        var x = (d.regch || {})[String(ch.id)] || {};
        var manque = [!sireReg(d, ch) && "SIRE", !x.puce && "puce", !x.date_entree && "entrée"].filter(Boolean);
        return { ch: ch, x: x, manque: manque, sorti: !!x.date_sortie };
      }).sort(function (a, b) { return String(a.ch.nom || "").localeCompare(String(b.ch.nom || ""), "fr"); });
      var nAF = lignes.filter(function (l) { return !l.sorti && l.manque.length; }).length;
      var nOK = lignes.filter(function (l) { return !l.sorti && !l.manque.length; }).length;
      var nS = lignes.filter(function (l) { return l.sorti; }).length;
      var vis = lignes.filter(function (l) { return filtre === "sortis" ? l.sorti : filtre === "ajour" ? (!l.sorti && !l.manque.length) : (!l.sorti && l.manque.length); });
      corps = h("div", null,
        pilsClubs(h, c),
        h("div", { className: "hv3-pils", role: "tablist" },
          [["afaire", "À compléter (" + nAF + ")"], ["ajour", "À jour (" + nOK + ")"], ["sortis", "Sortis (" + nS + ")"]].map(function (x) {
            return h("button", { key: x[0], type: "button", className: "hv3-pil" + (filtre === x[0] ? " on" : ""), "aria-pressed": filtre === x[0], onClick: function () { setFiltre(x[0]); setOuvert(null); } }, x[1]);
          })),
        h("div", { className: "hg-aide", style: { marginTop: 4 } }, "Touche un cheval pour compléter sa ligne du registre. Sa fiche à lui ne change pas."),
        msg && !ouvert ? h("div", { className: "hg-ok", role: "status" }, msg) : null,
        vis.length ? h("div", { className: "hv3-cartes", style: { marginTop: 16 } }, vis.map(function (l) {
          var ph = l.ch.photo_url ? { img: l.ch.photo_url, pos: "50% 35%" } : PHOTOS.chevaux;
          var sire = sireReg(d, l.ch);
          return h("div", { key: l.ch.id },
            carte(h, { cle: l.ch.id, photo: ph, titre: l.ch.nom || "",
              sous: l.sorti ? ("Parti le " + dateCourte(l.x.date_sortie)) : (l.manque.length ? l.manque.join(" · ") : ("Entré le " + dateCourte(l.x.date_entree))),
              pill: sire ? ("SIRE " + sire) : "", qui: "",
              etat: l.sorti ? (l.x.motif_sortie || "Sorti") : (l.manque.length ? "À compléter" : "✓ À jour"),
              alerte: !l.sorti && l.manque.length > 0, onClick: function () { ouvrirCheval(l.ch); } }),
            ouvert === l.ch.id ? formulaire(l.ch) : null);
        })) : h("div", { className: "hg-vide" }, filtre === "afaire" ? "Toutes les fiches sont complètes." : filtre === "sortis" ? "Aucun cheval sorti." : "Aucune fiche complète pour l'instant."),
        LEGAL(h));
    }
    return h("div", { className: RACINE, style: FILTRE },
      hero(h, { photo: PHOTOS.chevaux, titre: "Les chevaux", sous: "Partie IV de ton registre.", retour: function () { setEcran("registre"); }, retourTxt: "Le registre" }),
      h("div", { className: "hv2-in" }, corps));
  }


  /* ═════════════════════════ CONFIRMATION DES SOINS (option B, 05/11) ═════════════════════════
     Un soin ajouté par quelqu'un qui ne gère pas l'écurie compte tout de suite partout, marqué « non confirmé ».
     La coach le confirme ou le refuse après avoir vérifié. « Ajouté par » reste affiché pour toujours.
     Les règles sont dans la base (sql-05-11-soins-confirmation.sql) : l'appli ne fait qu'afficher et appeler
     hype_confirmer_soin, qui revérifie les droits. */
  var _pseudos = {};
  async function pseudosDe(ids) {
    var manque = ids.filter(function (x) { return x && !(x in _pseudos); });
    if (manque.length) {
      try {
        var r = await supa.from("profiles").select("id, pseudo").in("id", manque.slice(0, 200));
        ((r && r.data) || []).forEach(function (p) { _pseudos[p.id] = p.pseudo || ""; });
      } catch (e) { }
      manque.forEach(function (x) { if (!(x in _pseudos)) _pseudos[x] = ""; });
    }
    return _pseudos;
  }
  function quandLong(iso) {
    try { var d = new Date(iso); if (isNaN(d)) return ""; return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(d).replace(":", " h "); } catch (e) { return ""; }
  }
  async function confirmerSoin(id, ok) {
    var r = await supa.rpc("hype_confirmer_soin", { p_soin: id, p_ok: ok });
    if (r && r.error) throw new Error(r.error.message || String(r.error));
    if (!(r && r.data === true)) throw new Error("Seule la personne qui gère l'écurie peut confirmer ce soin.");
    return true;
  }

  /* Bloc affiché dans le détail d'un soin (FeuilleSoin, index.html) */
  function TraceSoin(props) {
    var h = React.createElement;
    var s = props.soin || {};
    var actif = ("confirme_le" in s) || ("refuse" in s);
    var _p = React.useState({}); var ps = _p[0], setPs = _p[1];
    var _g = React.useState(false); var gere = _g[0], setGere = _g[1];
    var _m = React.useState(""); var msg = _m[0], setMsg = _m[1];
    var _e = React.useState(false); var envoi = _e[0], setEnvoi = _e[1];
    React.useEffect(function () {
      if (!actif) return undefined;
      var vif = true;
      (async function () {
        var p = await pseudosDe([s.created_by, s.confirme_par]);
        if (vif) setPs(Object.assign({}, p));
        try { var rg = await supa.rpc("hype_gere_ecurie_du_cheval", { p_cheval: s.cheval_id }); if (vif) setGere(!!(rg && rg.data === true)); } catch (e) { }
      })();
      return function () { vif = false; };
    }, [s.id]);
    if (!actif) return null;
    var M = "'Montserrat',sans-serif";
    var auteur = (s.created_by && ps[s.created_by]) || (s.created_by ? "un membre" : "");
    var conf = (s.confirme_par && ps[s.confirme_par]) || "";
    var lignes = [];
    if (s.created_by || s.created_at) lignes.push("Ajouté" + (auteur ? " par " + auteur : "") + (s.created_at ? " le " + quandLong(s.created_at) : ""));
    if (s.refuse) lignes.push("Refusé" + (conf ? " par " + conf : "") + " : ne compte pas dans le registre");
    else if (s.confirme_le) lignes.push("Confirmé" + (conf ? " par " + conf : "") + " le " + quandLong(s.confirme_le));
    else lignes.push("Non confirmé par l'écurie");
    async function agir(ok) {
      setEnvoi(true); setMsg("");
      try { await confirmerSoin(s.id, ok); setMsg(ok ? "✓ Confirmé" : "Refusé"); if (props.onChange) setTimeout(props.onChange, 500); }
      catch (e) { setMsg(String((e && e.message) || e)); }
      setEnvoi(false);
    }
    var nonConf = !s.confirme_le && !s.refuse;
    return h("div", { style: { marginTop: 18, padding: "12px 14px", borderRadius: 14, border: "1px solid " + (nonConf ? "rgba(201,166,107,0.6)" : "rgba(243,238,228,0.14)"), background: "rgba(7,10,8,0.35)" } },
      h("div", { style: { fontFamily: M, fontSize: 10, letterSpacing: 1.6, textTransform: "uppercase", color: "#C9A66B", marginBottom: 6 } }, "Traçabilité"),
      lignes.map(function (l, i) { return h("div", { key: i, style: { fontFamily: M, fontSize: 12.5, lineHeight: 1.5, color: (i === lignes.length - 1 && nonConf) ? "#C9A66B" : "rgba(243,238,228,0.82)" } }, l); }),
      (gere && (nonConf || s.refuse)) ? h("div", { style: { display: "flex", gap: 8, marginTop: 10 } },
        s.refuse ? null : h("button", { type: "button", disabled: envoi, onClick: function () { agir(false); }, style: { flex: 1, minHeight: 42, borderRadius: 999, border: "1px solid rgba(243,238,228,0.25)", background: "transparent", color: "#F3EEE4", fontFamily: M, fontSize: 13 } }, "Refuser"),
        h("button", { type: "button", disabled: envoi, onClick: function () { agir(true); }, style: { flex: 1, minHeight: 42, borderRadius: 999, border: "1px solid #C9A66B", background: "#C9A66B", color: "#070A08", fontFamily: M, fontSize: 13, fontWeight: 600 } }, "Confirmer")) : null,
      msg ? h("div", { style: { fontFamily: M, fontSize: 12, color: "#C9A66B", marginTop: 8, textAlign: "center" } }, msg) : null);
  }

  /* Page « À confirmer » : tous les soins non confirmés des chevaux de l'écurie */
  function EcranSoinsAConfirmer() {
    var h = React.createElement;
    var app = (typeof useApp === "function") ? useApp() : {};
    var setEcran = app.setEcran || function () { };
    React.useEffect(function () { injecterCss(); try { window.scrollTo(0, 0); } catch (e) { } }, []);
    var c = useClub();
    var _r = React.useState(0); var recharge = _r[0], setRecharge = _r[1];
    var d = useDonneesEcurie(c.club, recharge);
    var _p = React.useState({}); var ps = _p[0], setPs = _p[1];
    var _m = React.useState({}); var msgs = _m[0], setMsgs = _m[1];
    React.useEffect(function () { try { if (!document.getElementById(CSS_ID + "-form")) { var st = document.createElement("style"); st.id = CSS_ID + "-form"; st.textContent = CSS_FORM; document.head.appendChild(st); } } catch (e) { } }, []);
    var liste = d ? (d.soins || []).filter(nonConfirme).sort(function (a, b) { return String(b.created_at || "").localeCompare(String(a.created_at || "")); }) : [];
    React.useEffect(function () { var vif = true; if (liste.length) pseudosDe(liste.map(function (s) { return s.created_by; })).then(function (p) { if (vif) setPs(Object.assign({}, p)); }); return function () { vif = false; }; }, [d]);
    async function agir(s, ok) {
      try { await confirmerSoin(s.id, ok); setRecharge(function (n) { return n + 1; }); }
      catch (e) { var m = {}; m[s.id] = String((e && e.message) || e); setMsgs(function (o) { return Object.assign({}, o, m); }); }
    }
    var corps;
    if (!d) corps = h("div", { className: "hg-attente", "aria-busy": "true" }, "…");
    else if (!d.peutGerer) corps = h("div", { className: "hg-vide" }, "Seule la personne qui gère l'écurie peut confirmer les soins.");
    else if (!liste.length) corps = h("div", { className: "hg-vide" }, "Aucun soin à confirmer. Tout est vérifié.");
    else corps = h("div", null,
      pilsClubs(h, c),
      h("div", { className: "hg-aide", style: { marginTop: 14 } }, "Ces soins ont été ajoutés par des cavaliers. Ils comptent déjà partout ; confirme-les après avoir vérifié avec le propriétaire. Leur auteur reste noté."),
      h("div", { className: "hv3-cartes", style: { marginTop: 16 } }, liste.map(function (s) {
        var ch = (d.chevaux || []).filter(function (x) { return x.id === s.cheval_id; })[0] || {};
        var ph = ch.photo_url ? { img: ch.photo_url, pos: "50% 35%" } : PHOTOS.soins;
        return h("div", { key: s.id },
          carte(h, { cle: s.id, photo: ph, titre: ch.nom || "", sous: (TYPES[s.type] || s.type || "Soin") + (s.titre ? " · " + s.titre : "") + (s.date_intervention ? " · " + dateCourte(s.date_intervention) : ""),
            pill: "Non confirmé", qui: (s.created_by && ps[s.created_by]) ? ("par " + ps[s.created_by]) : "", etat: "" }),
          h("div", { style: { display: "flex", gap: 8, margin: "8px 2px 4px" } },
            h("button", { type: "button", className: "hg-btn", style: { marginTop: 0, background: "transparent", color: "#F3EEE4", borderColor: "rgba(243,238,228,.25)", fontWeight: 400 }, onClick: function () { agir(s, false); } }, "Refuser"),
            h("button", { type: "button", className: "hg-btn", style: { marginTop: 0 }, onClick: function () { agir(s, true); } }, "Confirmer")),
          msgs[s.id] ? h("div", { className: "hg-ok" }, msgs[s.id]) : null);
      })),
      LEGAL(h));
    return h("div", { className: RACINE, style: FILTRE },
      hero(h, { photo: PHOTOS.soins, titre: "À confirmer", sous: "Les soins ajoutés par les cavaliers.", retour: function () { setEcran("mon-ecurie"); }, retourTxt: "Mon écurie" }),
      h("div", { className: "hv2-in" }, corps));
  }


  /* ═════════════════════════ PAGE « LES SOINS » DU REGISTRE (partie VI, 05/11) ═════════════════════════
     Demande de Blandine : « retrouver par date et par cheval les soins enregistrés et les ordonnances ».
     Tous les soins des chevaux de l'écurie, du plus récent au plus ancien, groupés par mois ; filtres par cheval, par
     année et par type (dont « Avec ordonnance ») ; pour chaque soin : qui l'a ajouté, s'il est confirmé, et ses documents
     (ouverts en lien privé de 10 minutes, comme sur la page Santé du cheval). Les documents rattachés à aucun soin sont
     listés aussi, à leur date. Lecture seule : on modifie un soin depuis la page Santé du cheval (nom du cheval en doré). */
  var TYPES_DOCS = { ordonnance: "Ordonnance", compte_rendu: "Compte rendu", certificat_vaccin: "Certificat de vaccination", carnet_vaccin: "Carnet de vaccination", protocole: "Protocole", facture: "Facture", autre: "Document" };
  var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  function EcranRegistreSoins() {
    var h = React.createElement;
    var app = (typeof useApp === "function") ? useApp() : {};
    var setEcran = app.setEcran || function () { };
    React.useEffect(function () {
      injecterCss();
      try { if (!document.getElementById(CSS_ID + "-form")) { var s = document.createElement("style"); s.id = CSS_ID + "-form"; s.textContent = CSS_FORM; document.head.appendChild(s); } } catch (e) { }
      try { window.scrollTo(0, 0); } catch (e) { }
    }, []);
    var c = useClub();
    var d = useDonneesEcurie(c.club);
    var _ch = React.useState("tous"); var fCh = _ch[0], setFCh = _ch[1];
    var _ty = React.useState("tous"); var fTy = _ty[0], setFTy = _ty[1];
    var _an = React.useState("tous"); var fAn = _an[0], setFAn = _an[1];
    var _ps = React.useState({}); var ps = _ps[0], setPs = _ps[1];
    var _er = React.useState(""); var errDoc = _er[0], setErrDoc = _er[1];
    React.useEffect(function () {
      var vif = true;
      if (d && (d.soins || []).length) pseudosDe((d.soins || []).map(function (s) { return s.created_by; })).then(function (p) { if (vif) setPs(Object.assign({}, p)); });
      return function () { vif = false; };
    }, [d]);

    async function ouvrirDoc(doc) {
      setErrDoc("");
      try {
        var r = await supa.storage.from("sante").createSignedUrl(doc.chemin, 600);
        if (r && r.error) throw new Error(r.error.message || String(r.error));
        var u = r && r.data && (r.data.signedUrl || r.data.signedURL);
        if (!u) throw new Error("lien indisponible");
        try { window.open(u, "_blank"); } catch (eW) { window.location.href = u; }
      } catch (e) { setErrDoc("Impossible d'ouvrir le document : " + String((e && e.message) || e)); }
    }
    function ouvrirCheval(id) {
      var ch = (d.chevaux || []).filter(function (x) { return x.id === id; })[0] || {};
      try { window.__santeCheval = { id: id, nom: ch.nom || "" }; } catch (e) { }
      setEcran("sante-cheval");
    }

    var corps;
    if (!d) corps = h("div", { className: "hg-attente", "aria-busy": "true" }, "…");
    else if (!c.club) corps = h("div", { className: "hg-vide" }, "Rattache-toi à une écurie depuis ton profil pour ouvrir cet espace.");
    else {
      var M = "'Montserrat',sans-serif";
      var nomDe = {}; (d.chevaux || []).forEach(function (x) { nomDe[x.id] = x.nom || ""; });
      var docsParSoin = {}, docsSeuls = [];
      (d.docs || []).forEach(function (x) { if (x.soin_id) (docsParSoin[x.soin_id] = docsParSoin[x.soin_id] || []).push(x); else docsSeuls.push(x); });
      var items = (d.soins || []).map(function (s) { return { k: "s" + s.id, date: String(s.date_intervention || s.date_prochaine || "").slice(0, 10), ch: s.cheval_id, type: s.type, soin: s, docs: docsParSoin[s.id] || [] }; })
        .concat(docsSeuls.map(function (x) { return { k: "d" + x.id, date: String(x.date_doc || x.created_at || "").slice(0, 10), ch: x.cheval_id, type: "_doc", doc: x, docs: [x] }; }));
      var annees = []; items.forEach(function (it) { var a = it.date.slice(0, 4); if (a && annees.indexOf(a) < 0) annees.push(a); }); annees.sort().reverse();
      var typesPres = []; items.forEach(function (it) { if (it.type !== "_doc" && it.type && typesPres.indexOf(it.type) < 0) typesPres.push(it.type); });
      var vis = items.filter(function (it) {
        return (fCh === "tous" || it.ch === fCh) && (fAn === "tous" || it.date.slice(0, 4) === fAn)
          && (fTy === "tous" || (fTy === "_ordo" ? it.docs.length > 0 : it.type === fTy));
      }).sort(function (a, b) { return b.date.localeCompare(a.date); });
      var groupes = [], cle = null;
      vis.forEach(function (it) { var m = it.date.slice(0, 7); if (m !== cle) { cle = m; groupes.push({ m: m, l: [] }); } groupes[groupes.length - 1].l.push(it); });
      function titreMois(m) { var p = m.split("-"); return (p.length === 2 && +p[1]) ? (MOIS[+p[1] - 1] + " " + p[0]).replace(/^./, function (x) { return x.toUpperCase(); }) : "Sans date"; }
      function selecteur(val, set, options, lab) {
        return h("label", { style: { display: "flex", flexDirection: "column", gap: 5, flex: 1, minWidth: 0 } },
          h("span", { style: { fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(243,238,228,.6)", fontFamily: M } }, lab),
          h("select", { value: val, onChange: function (e) { set(e.target.value); }, style: { width: "100%", minHeight: 44, borderRadius: 12, border: "1px solid rgba(243,238,228,.16)", background: "rgba(16,26,29,.6)", color: "#F3EEE4", fontFamily: M, fontSize: 15, padding: "0 10px" } },
            options.map(function (o) { return h("option", { key: o[0], value: o[0] }, o[1]); })));
      }
      var chevauxOpt = [["tous", "Tous les chevaux"]].concat((d.chevaux || []).slice().sort(function (a, b) { return String(a.nom || "").localeCompare(String(b.nom || ""), "fr"); }).map(function (x) { return [x.id, x.nom || "?"]; }));
      corps = h("div", null,
        pilsClubs(h, c),
        h("div", { style: { display: "flex", gap: 8, marginTop: 18 } },
          selecteur(fCh, setFCh, chevauxOpt, "Cheval"),
          selecteur(fAn, setFAn, [["tous", "Toutes"]].concat(annees.map(function (a) { return [a, a]; })), "Année")),
        h("div", { className: "hv3-pils", role: "tablist" },
          [["tous", "Tout"], ["_ordo", "Avec ordonnance"]].concat(typesPres.map(function (k) { return [k, TYPES[k] || k]; })).map(function (x) {
            return h("button", { key: x[0], type: "button", className: "hv3-pil" + (fTy === x[0] ? " on" : ""), "aria-pressed": fTy === x[0], onClick: function () { setFTy(x[0]); } }, x[1]);
          })),
        h("div", { className: "hg-aide", style: { marginTop: 6 } }, vis.length + " élément" + (vis.length > 1 ? "s" : "") + ". Les ordonnances et factures se gardent 5 ans avec le registre."),
        errDoc ? h("div", { className: "hg-err" }, errDoc) : null,
        groupes.length ? groupes.map(function (g) {
          return h("div", { key: g.m },
            h("h2", { className: "hv3-h2" }, titreMois(g.m)),
            g.l.map(function (it) {
              var s = it.soin;
              var titre = it.doc ? (TYPES_DOCS[it.doc.type] || "Document") + (it.doc.titre ? " · " + it.doc.titre : "") : ((TYPES[s.type] || s.type || "Soin") + (s.titre ? " · " + s.titre : ""));
              var etatConf = s ? (s.refuse ? "Refusé" : (s.confirme_le === null ? "Non confirmé" : "")) : "";
              var auteur = (s && s.created_by && ps[s.created_by]) ? ("ajouté par " + ps[s.created_by]) : "";
              return h("div", { key: it.k, style: { padding: "12px 14px", marginBottom: 8, borderRadius: 14, border: "1px solid rgba(243,238,228,.1)", background: "linear-gradient(135deg,rgba(16,26,29,.42),rgba(7,10,8,.96) 58%)" } },
                h("div", { style: { display: "flex", alignItems: "baseline", gap: 10 } },
                  h("div", { style: { flex: 1, minWidth: 0, fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 18, color: "#F3EEE4", lineHeight: 1.2 } }, titre),
                  h("div", { style: { flex: "0 0 auto", fontFamily: M, fontSize: 12, color: "rgba(243,238,228,.75)" } }, it.date ? dateCourte(it.date) : "")),
                h("div", { style: { fontFamily: M, fontSize: 12, color: "rgba(243,238,228,.65)", marginTop: 3 } },
                  h("button", { type: "button", onClick: function () { ouvrirCheval(it.ch); }, style: { background: "none", border: "none", padding: 0, color: "#C9A66B", fontFamily: M, fontSize: 12 } }, nomDe[it.ch] || "Cheval"),
                  auteur ? " · " + auteur : "", etatConf ? h("span", { style: { color: "#C9A66B" } }, " · " + etatConf) : null),
                it.docs.length ? h("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 } }, it.docs.map(function (x) {
                  return h("button", { key: x.id, type: "button", onClick: function () { ouvrirDoc(x); }, style: { border: "1px solid rgba(201,166,107,.6)", background: "transparent", color: "#C9A66B", borderRadius: 999, padding: "5px 12px", fontFamily: M, fontSize: 12 } }, "▤ " + (TYPES_DOCS[x.type] || "Document"));
                })) : null);
            }));
        }) : h("div", { className: "hg-vide" }, "Aucun soin pour ce choix."),
        LEGAL(h));
    }
    return h("div", { className: RACINE, style: FILTRE },
      hero(h, { photo: PHOTOS.soins, titre: "Les soins", sous: "Partie VI de ton registre.", retour: function () { setEcran("registre"); }, retourTxt: "Le registre" }),
      h("div", { className: "hv2-in" }, corps));
  }


  /* ═════════════════════════ PAGE « LES MOUVEMENTS » (partie V, 05/11) ═════════════════════════
     Déplacements provisoires (concours, stage, randonnée, vétérinaire…) : date de sortie, date de retour, cheval, motif,
     adresse de destination (exigés par l'IFCE) ; en facultatif : camion oui/non, chef d'équipe. Table registre_mouvements
     (sql-05-11-registre-mouvements.sql), une ligne par cheval et par déplacement, registre du lieu où vit le cheval.
     Les lignes venues d'un concours (source « concours », agenda_id) le disent et restent modifiables à la main.
     Ajout, modification et suppression : modératrices et gestionnaires de l'écurie seulement (la base revérifie). */
  var MOTIFS = ["Concours", "Stage", "Randonnée", "Vétérinaire", "Clinique", "Saillie", "Autre"];
  function EcranRegistreMouvements() {
    var h = React.createElement;
    var app = (typeof useApp === "function") ? useApp() : {};
    var setEcran = app.setEcran || function () { };
    React.useEffect(function () {
      injecterCss();
      try { if (!document.getElementById(CSS_ID + "-form")) { var s = document.createElement("style"); s.id = CSS_ID + "-form"; s.textContent = CSS_FORM; document.head.appendChild(s); } } catch (e) { }
      try { window.scrollTo(0, 0); } catch (e) { }
    }, []);
    var c = useClub();
    var _r = React.useState(0); var recharge = _r[0], setRecharge = _r[1];
    var d = useDonneesEcurie(c.club, recharge);
    var _ch = React.useState("tous"); var fCh = _ch[0], setFCh = _ch[1];
    var _an = React.useState("tous"); var fAn = _an[0], setFAn = _an[1];
    var _o = React.useState(null); var ouvert = _o[0], setOuvert = _o[1];      /* id de la ligne ouverte, ou "nouveau" */
    var _v = React.useState({}); var val = _v[0], setVal = _v[1];
    var _m = React.useState(""); var msg = _m[0], setMsg = _m[1];
    var _e = React.useState(false); var envoi = _e[0], setEnvoi = _e[1];
    var _s = React.useState(false); var confSuppr = _s[0], setConfSuppr = _s[1];
    var M = "'Montserrat',sans-serif";

    function ouvrirLigne(l) {
      if (ouvert === (l ? l.id : "nouveau")) { setOuvert(null); return; }
      setMsg(""); setConfSuppr(false);
      if (l) setVal({ cheval_id: l.cheval_id, date_sortie: l.date_sortie || "", date_retour: l.date_retour || "", motif: l.motif || "", destination: l.destination || "", camion: l.camion === true ? "oui" : (l.camion === false ? "non" : ""), chef_equipe: l.chef_equipe || "" });
      else setVal({ cheval_id: (fCh !== "tous" ? fCh : ""), date_sortie: isoAuj(), date_retour: isoAuj(), motif: "", destination: "", camion: "", chef_equipe: "" });
      setOuvert(l ? l.id : "nouveau");
    }
    function maj(k, v) { setMsg(""); setVal(function (o) { var n = Object.assign({}, o); n[k] = v; return n; }); }
    async function enregistrer(l) {
      if (!val.cheval_id) { setMsg("Choisis le cheval."); return; }
      if (!val.date_sortie) { setMsg("Indique la date de sortie."); return; }
      if (val.date_retour && val.date_retour < val.date_sortie) { setMsg("Le retour ne peut pas être avant la sortie."); return; }
      setEnvoi(true); setMsg("");
      try {
        var ch = (d.chevaux || []).filter(function (x) { return x.id === val.cheval_id; })[0] || {};
        var ligne = { club_clef: clefDe(ch.club || c.club), cheval_id: val.cheval_id, date_sortie: val.date_sortie, date_retour: val.date_retour || null,
          motif: String(val.motif || "").trim() || null, destination: String(val.destination || "").trim() || null,
          camion: val.camion === "oui" ? true : (val.camion === "non" ? false : null), chef_equipe: String(val.chef_equipe || "").trim() || null, maj_le: new Date().toISOString() };
        var r = l ? await supa.from("registre_mouvements").update(ligne).eq("id", l.id).select("*")
                  : await supa.from("registre_mouvements").insert(Object.assign({ source: "manuel" }, ligne)).select("*");
        if (r && r.error) throw new Error(r.error.message || String(r.error));
        if (!r || !r.data || !r.data.length) throw new Error("La base n'a rien enregistré (droits de l'écurie à vérifier).");
        setOuvert(null); setMsg("✓ Enregistré"); setRecharge(function (n) { return n + 1; });
      } catch (e) { setMsg("Pas enregistré : " + String((e && e.message) || e)); }
      setEnvoi(false);
    }
    async function supprimer(l) {
      setEnvoi(true); setMsg("");
      try {
        var r = await supa.from("registre_mouvements").delete().eq("id", l.id).select("id");
        if (r && r.error) throw new Error(r.error.message || String(r.error));
        if (!r || !r.data || !r.data.length) throw new Error("La base n'a rien supprimé (droits de l'écurie à vérifier).");
        setOuvert(null); setMsg("Mouvement supprimé."); setRecharge(function (n) { return n + 1; });
      } catch (e) { setMsg("Pas supprimé : " + String((e && e.message) || e)); }
      setEnvoi(false);
    }

    function champ(k, lab, opts) {
      opts = opts || {};
      return h("div", { key: k },
        h("label", { htmlFor: "hgm-" + k }, lab),
        h("input", { id: "hgm-" + k, type: opts.date ? "date" : "text", value: val[k] || "", placeholder: opts.ex || "", autoComplete: "off", onChange: function (e) { maj(k, e.target.value); } }),
        opts.aide ? h("div", { className: "hg-aide" }, opts.aide) : null);
    }
    function pastilles(k, choix) {
      return h("div", { className: "hg-sugg" }, choix.map(function (x) {
        var on = x[0] === val[k];
        return h("button", { key: x[0], type: "button", onClick: function () { maj(k, on ? "" : x[0]); }, style: on ? { background: "#C9A66B", color: "#070A08" } : null }, x[1]);
      }));
    }
    function formulaire(l) {
      var chevauxTries = (d.chevaux || []).slice().sort(function (a, b) { return String(a.nom || "").localeCompare(String(b.nom || ""), "fr"); });
      return h("div", { className: "hg-f", style: { padding: "0 4px 14px" } },
        l && l.source === "concours" ? h("div", { className: "hg-aide", style: { marginTop: 10, color: "#C9A66B" } }, "Ligne venue d'un concours de l'agenda. Tu peux la corriger à la main.") : null,
        h("label", { htmlFor: "hgm-cheval" }, "Cheval"),
        h("select", { id: "hgm-cheval", value: val.cheval_id || "", onChange: function (e) { maj("cheval_id", e.target.value); },
          style: { width: "100%", minHeight: 46, borderRadius: 12, border: "1px solid rgba(243,238,228,.14)", background: "rgba(16,26,29,.55)", color: "#F3EEE4", fontFamily: M, fontSize: 16, padding: "0 10px" } },
          [h("option", { key: "", value: "" }, "Choisir…")].concat(chevauxTries.map(function (x) { return h("option", { key: x.id, value: x.id }, x.nom || "?"); }))),
        h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, champ("date_sortie", "Sortie le", { date: true }), champ("date_retour", "Retour le", { date: true })),
        h("label", null, "Motif"),
        pastilles("motif", MOTIFS.map(function (x) { return [x, x]; })),
        h("input", { value: val.motif || "", placeholder: "Ou écris le motif (ex. Concours CSO Club Itteville)", onChange: function (e) { maj("motif", e.target.value); }, style: { marginTop: 8 } }),
        champ("destination", "Adresse de destination", { ex: "Lieu où va le cheval" }),
        h("label", null, "En camion (facultatif)"),
        pastilles("camion", [["oui", "Oui"], ["non", "Non"]]),
        champ("chef_equipe", "Chef d'équipe (facultatif)", { ex: "Qui accompagne" }),
        h("button", { type: "button", className: "hg-btn", disabled: envoi, onClick: function () { enregistrer(l); } }, envoi ? "Enregistrement…" : "Enregistrer"),
        l ? (confSuppr
          ? h("div", { style: { display: "flex", gap: 8, marginTop: 10 } },
              h("button", { type: "button", className: "hg-btn", style: { marginTop: 0, background: "transparent", color: "#F3EEE4", borderColor: "rgba(243,238,228,.25)", fontWeight: 400 }, onClick: function () { setConfSuppr(false); } }, "Garder"),
              h("button", { type: "button", className: "hg-btn", style: { marginTop: 0, background: "transparent", color: "#C9A66B" }, disabled: envoi, onClick: function () { supprimer(l); } }, "Supprimer vraiment"))
          : h("button", { type: "button", onClick: function () { setConfSuppr(true); }, style: { display: "block", margin: "12px auto 0", background: "none", border: "none", color: "rgba(243,238,228,.55)", fontFamily: M, fontSize: 12.5, textDecoration: "underline" } }, "Supprimer ce mouvement")) : null,
        msg ? h("div", { className: "hg-ok", role: "status" }, msg) : null);
    }

    var corps;
    if (!d) corps = h("div", { className: "hg-attente", "aria-busy": "true" }, "…");
    else if (!c.club) corps = h("div", { className: "hg-vide" }, "Rattache-toi à une écurie depuis ton profil pour ouvrir cet espace.");
    else if (d.mvAbsent) corps = h("div", { className: "hg-encart" }, h("b", null, "Bientôt"), "Cette partie du registre arrive très vite : elle n'est pas encore activée.");
    else if (!d.peutGerer) corps = h("div", { className: "hg-encart" }, h("b", null, "Réservé au responsable"), "Seule la personne qui gère l'écurie peut voir et remplir cette partie du registre.");
    else {
      var nomDe = {}; (d.chevaux || []).forEach(function (x) { nomDe[x.id] = x.nom || ""; });
      var liste = (d.mouvements || []).slice();
      var annees = []; liste.forEach(function (l) { var a = String(l.date_sortie || "").slice(0, 4); if (a && annees.indexOf(a) < 0) annees.push(a); }); annees.sort().reverse();
      var vis = liste.filter(function (l) { return (fCh === "tous" || l.cheval_id === fCh) && (fAn === "tous" || String(l.date_sortie || "").slice(0, 4) === fAn); })
        .sort(function (a, b) { return String(b.date_sortie || "").localeCompare(String(a.date_sortie || "")); });
      function selecteur(v, set, options, lab) {
        return h("label", { style: { display: "flex", flexDirection: "column", gap: 5, flex: 1, minWidth: 0 } },
          h("span", { style: { fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(243,238,228,.6)", fontFamily: M } }, lab),
          h("select", { value: v, onChange: function (e) { set(e.target.value); setOuvert(null); }, style: { width: "100%", minHeight: 44, borderRadius: 12, border: "1px solid rgba(243,238,228,.16)", background: "rgba(16,26,29,.6)", color: "#F3EEE4", fontFamily: M, fontSize: 15, padding: "0 10px" } },
            options.map(function (o) { return h("option", { key: o[0], value: o[0] }, o[1]); })));
      }
      var chevauxOpt = [["tous", "Tous les chevaux"]].concat((d.chevaux || []).slice().sort(function (a, b) { return String(a.nom || "").localeCompare(String(b.nom || ""), "fr"); }).map(function (x) { return [x.id, x.nom || "?"]; }));
      corps = h("div", null,
        pilsClubs(h, c),
        h("div", { style: { display: "flex", gap: 8, marginTop: 18 } },
          selecteur(fCh, setFCh, chevauxOpt, "Cheval"),
          selecteur(fAn, setFAn, [["tous", "Toutes"]].concat(annees.map(function (a) { return [a, a]; })), "Année")),
        h("button", { type: "button", className: "hg-btn", onClick: function () { ouvrirLigne(null); } }, ouvert === "nouveau" ? "Fermer" : "+ Ajouter un mouvement"),
        ouvert === "nouveau" ? formulaire(null) : null,
        msg && !ouvert ? h("div", { className: "hg-ok", role: "status" }, msg) : null,
        h("div", { className: "hg-aide", style: { marginTop: 14 } }, "Concours, stages, randonnées, vétérinaire : chaque sortie provisoire d'un cheval, avec ses dates et sa destination. À garder 5 ans."),
        vis.length ? h("div", { style: { marginTop: 14 } }, vis.map(function (l) {
          var dates = dateCourte(l.date_sortie) + (l.date_retour && l.date_retour !== l.date_sortie ? " → " + dateCourte(l.date_retour) : "");
          var ouvre = ouvert === l.id;
          return h("div", { key: l.id, style: { marginBottom: 8, borderRadius: 14, border: "1px solid " + (ouvre ? "rgba(201,166,107,.55)" : "rgba(243,238,228,.1)"), background: "linear-gradient(135deg,rgba(16,26,29,.42),rgba(7,10,8,.96) 58%)" } },
            h("button", { type: "button", onClick: function () { ouvrirLigne(l); }, style: { display: "block", width: "100%", textAlign: "start", background: "none", border: "none", padding: "12px 14px", color: "inherit", fontFamily: M } },
              h("div", { style: { display: "flex", alignItems: "baseline", gap: 10 } },
                h("div", { style: { flex: 1, minWidth: 0, fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 18, color: "#F3EEE4", lineHeight: 1.2 } }, nomDe[l.cheval_id] || "Cheval"),
                h("div", { style: { flex: "0 0 auto", fontSize: 12, color: "rgba(243,238,228,.75)" } }, dates)),
              h("div", { style: { fontSize: 12, color: "rgba(243,238,228,.7)", marginTop: 3 } }, [l.motif, l.destination].filter(Boolean).join(" · ") || "Motif et destination à compléter"),
              l.source === "concours" ? h("div", { style: { fontSize: 11.5, color: "#C9A66B", marginTop: 3 } }, "Depuis le concours de l'agenda") : null),
            ouvre ? formulaire(l) : null);
        })) : h("div", { className: "hg-vide" }, "Aucun mouvement pour ce choix."),
        LEGAL(h));
    }
    return h("div", { className: RACINE, style: FILTRE },
      hero(h, { photo: PHOTOS.mouvements, titre: "Les mouvements", sous: "Partie V de ton registre.", retour: function () { setEcran("registre"); }, retourTxt: "Le registre" }),
      h("div", { className: "hv2-in" }, corps));
  }

  window.HypeGestion = { RegistreMouvements: EcranRegistreMouvements, RegistreSoins: EcranRegistreSoins, MonEcurie: EcranMonEcurie, Registre: EcranRegistre, Detenteur: EcranDetenteur, RegistreChevaux: EcranRegistreChevaux, SoinsAConfirmer: EcranSoinsAConfirmer, TraceSoin: TraceSoin };
})();
