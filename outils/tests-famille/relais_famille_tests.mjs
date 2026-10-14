// Lancer : node outils/tests-famille/relais_famille_tests.mjs  (aucun réseau, aucune écriture réelle)
// Banc Premium Famille : base simulée (abonnements + familles), aucune écriture réelle.
import crypto from "node:crypto";
const SECRET="whsec_test"; process.env.STRIPE_WEBHOOK_SECRET=SECRET; process.env.SUPABASE_SERVICE_ROLE_KEY="svc";
const EMAILS={"titu@hype.fr":"u-titu","prem@hype.fr":"u-prem","ia@hype.fr":"u-ia","duo@hype.fr":"u-duo","cry@hype.fr":"u-cry","benef@hype.fr":"u-benef"};
let base, familles, anomalies, panne, appelsFamille, horloge, membres={}, datesRecues=[], periodesRecues=[]; const realNow=Date.now.bind(Date); Date.now=()=>horloge??realNow();
globalThis.fetch=async(url,opt={})=>{
  const u=new URL(url), m=opt.method||"GET", rep=(s,b,h={})=>new Response(b===undefined?"":JSON.stringify(b),{status:s,headers:h});
  if(panne) return rep(503,{e:"panne"});
  const p=u.pathname, corps=opt.body?JSON.parse(opt.body):null;
  if(p.endsWith("/rpc/hype_user_id_par_email")) return rep(200,EMAILS[corps.p_email.toLowerCase()]||null);
  if(p.endsWith("/rpc/famille_ouvrir")){ appelsFamille++;
    { const f0=familles.find(f=>f.sub===corps.p_sub); if(f0){ if(corps.p_periode_fin&&f0.statut!=="annule"&&(!f0.paye||corps.p_periode_fin>f0.paye)){f0.paye=corps.p_periode_fin; if(!f0.expire||corps.p_expire>f0.expire) f0.expire=corps.p_expire;} return rep(200,"deja"); } }
    if(familles.find(f=>f.titulaire===corps.p_titulaire&&f.statut!=="annule"&&new Date(f.expire)>Date.now())) return rep(200,"autre_famille");
    familles.push({titulaire:corps.p_titulaire,sub:corps.p_sub,client:corps.p_customer,statut:"actif",expire:corps.p_expire,evt:corps.p_evenement_le,paye:corps.p_periode_fin||null,refuse:null}); return rep(200,"cree"); }
  if(p.endsWith("/rpc/famille_maj")){ appelsFamille++; datesRecues.push(corps.p_evenement_le); const f=familles.find(f=>f.sub===corps.p_sub); if(!f) return rep(200,0);
    // mêmes règles que la base (testées à part en SQL)
    // mêmes règles que la base livraison C (testées à part en SQL, 32/32)
    const e=corps.p_evenement_le, st=corps.p_statut, pf=corps.p_periode_fin; periodesRecues.push(pf);
    if(f.statut==="annule"){} else if(st==="annule"){f.statut="annule";}
    else if(pf){ const paye=f.paye||"";
      if(st==="impaye"){ if(pf<=paye){} else if(f.statut==="impaye"){ if(!f.refuse||pf>f.refuse) f.refuse=pf; } else {f.statut="impaye";f.refuse=pf;} }
      else { if(pf<=paye){} else { f.paye=pf; if(corps.p_expire&&(!f.expire||corps.p_expire>f.expire)) f.expire=corps.p_expire; if(!(f.statut==="impaye"&&f.refuse&&pf<f.refuse)) f.statut="actif"; } } }
    else if(e&&f.evt&&e<f.evt){} else if(st==="impaye"){ if(f.statut==="actif"){f.statut="impaye";f.evt=e;} }
    else if(corps.p_expire&&(!f.expire||new Date(corps.p_expire)>new Date(f.expire))){f.statut="actif";f.expire=corps.p_expire;f.evt=e;}
    return rep(200,1); }
  if(p.endsWith("/rpc/famille_par_client")){ appelsFamille++; const f=familles.slice().reverse().find(f=>f.client===corps.p_customer); return rep(200,f?f.sub:null); }
  if(p.endsWith("/rpc/famille_du_compte")){ return rep(200, membres[corps.p_uid]||null); }
  if(p.endsWith("/paiements_a_verifier")){ if(!anomalies.find(a=>a.stripe_event_id===corps.stripe_event_id)) anomalies.push(corps); return rep(201); }
  if(p.endsWith("/abonnements_premium")){ const q=Object.fromEntries(u.searchParams);
    if(m==="GET"){const k=q.user_id?"user_id":"stripe_subscription";const v=(q[k]||"").replace(/^eq\./,"");return rep(200,base.filter(r=>r[k]===v).slice(0,1));}
    if(m==="PATCH"){const v=q.stripe_subscription.replace(/^eq\./,"");let n=0;base.forEach(r=>{if(r.stripe_subscription===v){Object.assign(r,corps);n++;}});return rep(200,undefined,{"content-range":n?`0-${n-1}/${n}`:"*/0"});}
    if(m==="POST"){const i=base.findIndex(r=>r.user_id===corps.user_id);if(i>=0)Object.assign(base[i],corps);else base.push({...corps});return rep(201);} }
  return rep(404,{e:"inconnu "+url});
};
const req=ev=>{const c=JSON.stringify(ev),t=Math.floor(Date.now()/1000);return new Request("https://x/",{method:"POST",body:c,headers:{"stripe-signature":`t=${t},v1=${crypto.createHmac("sha256",SECRET).update(t+"."+c).digest("hex")}`}});};
// Copie de test du relais : seuls les identifiants Famille (vides en vrai) sont remplis.
import fs from "node:fs"; import os from "node:os"; import path from "node:path"; import { fileURLToPath } from "node:url";
const ici=path.dirname(fileURLToPath(import.meta.url));
const vrai=fs.readFileSync(path.join(ici,"../../netlify/functions/stripe-webhook.js"),"utf8")
  .replace('    // "plink_…": { jours: 32 },   // Premium Famille 19,99 €/mois','    "plink_FAMILLE_TEST": { jours: 32 },')
  .replace('    // "price_…",                   // Premium Famille 19,99 €/mois','    "price_FAMILLE_TEST",');
if((vrai.match(/FAMILLE_TEST/g)||[]).length!==2) throw new Error("copie de test impossible");
const copie=path.join(fs.mkdtempSync(path.join(os.tmpdir(),"relais-")),"relais.mjs"); fs.writeFileSync(copie,vrai);
const mod=await import(copie);
async function jouer(init, evs, opt={}){ base=JSON.parse(JSON.stringify(init.base||[])); familles=JSON.parse(JSON.stringify(init.familles||[])); anomalies=[]; panne=opt.panne||false; appelsFamille=0; membres=init.membres||{}; datesRecues=[]; periodesRecues=[]; const codes=[];
  const s=console.log; console.log=()=>{}; try{ for(const ev of evs){ horloge=(ev.created+5)*1000; codes.push((await mod.default(req(ev))).status);} } finally{console.log=s; horloge=null;}
  return {base,familles,anomalies,codes,appelsFamille,datesRecues,periodesRecues}; }
const T0=1792000000, FUT=new Date((T0+20*86400)*1000).toISOString();
let k=0; const id=()=>"evt_f"+(++k);
const achat=(user,email,sub,o={})=>({id:id(),type:"checkout.session.completed",created:T0,data:{object:{id:"cs_"+sub,created:T0,mode:"subscription",payment_link:"plink_FAMILLE_TEST",payment_status:"paid",client_reference_id:user,customer:"cus_"+sub,customer_details:{email},subscription:sub,amount_total:1999,...o}}});
const facture=(sub,email,prix="price_FAMILLE_TEST",type="invoice.paid",dec=0)=>({id:id(),type,created:T0+dec,data:{object:{customer:"cus_"+sub,customer_email:email,amount_paid:1999,parent:{subscription_details:{subscription:sub}},lines:{data:[{period:{end:T0+dec+30*86400},pricing:{price_details:{price:prix}}}]}}}});
const R=[]; const ok=(n,cond,detail)=>R.push({n,ok:!!cond,detail});
let r;
r=await jouer({},[achat("u-titu","titu@hype.fr","sub_F1")]);
ok("Achat Famille : famille ouverte, rien dans abonnements_premium", r.familles.length===1&&r.familles[0].statut==="actif"&&r.base.length===0&&r.codes[0]===200&&!r.anomalies.length, JSON.stringify(r.familles));
r=await jouer({},[achat("u-titu","titu@hype.fr","sub_F1"),achat("u-titu","titu@hype.fr","sub_F1")]);
ok("Même achat reçu deux fois : une seule famille, pas d'anomalie", r.familles.length===1&&!r.anomalies.length&&r.codes.join()==="200,200", r.codes.join());
r=await jouer({},[facture("sub_F1","titu@hype.fr","price_FAMILLE_TEST","invoice.paid"),achat("u-titu","titu@hype.fr","sub_F1")]);
ok("Facture arrivée avant l'achat : famille ouverte par l'email, une seule", r.familles.length===1&&r.familles[0].titulaire==="u-titu"&&!r.anomalies.length, JSON.stringify(r.familles));
const F_ACT={familles:[{titulaire:"u-titu",sub:"sub_F1",statut:"actif",expire:FUT}]};
r=await jouer(F_ACT,[facture("sub_F1","titu@hype.fr","price_FAMILLE_TEST","invoice.paid",30*86400)]);
ok("Renouvellement Famille : fin prolongée, pas d'anomalie", new Date(r.familles[0].expire)>new Date(FUT)&&!r.anomalies.length&&r.base.length===0, r.familles[0].expire);
r=await jouer(F_ACT,[facture("sub_F1","titu@hype.fr","price_1TrFsxHnB1OJ7FOmIUhz6c2t","invoice.paid",30*86400)]);
ok("Prix changé dans Stripe : prolongé + anomalie « changement de formule »", r.anomalies[0]&&r.anomalies[0].anomalie==="changement_formule"&&r.base.length===0, r.anomalies.map(a=>a.anomalie).join());
r=await jouer(F_ACT,[facture("sub_F1","titu@hype.fr","price_FAMILLE_TEST","invoice.payment_failed")]);
ok("Paiement refusé : famille « impayé »", r.familles[0].statut==="impaye"&&r.codes[0]===200, r.familles[0].statut);
r=await jouer(F_ACT,[{id:id(),type:"customer.subscription.deleted",created:T0,data:{object:{id:"sub_F1"}}}]);
ok("Résiliation : famille « annulée »", r.familles[0].statut==="annule", r.familles[0].statut);
const PREM={base:[{user_id:"u-prem",stripe_subscription:"sub_P",stripe_customer:"cus_P",plan:"mensuel",statut:"actif",expire_le:FUT}]};
r=await jouer(PREM,[achat("u-prem","prem@hype.fr","sub_F2")]);
ok("Cas B : déjà Premium Cavalier → famille ouverte + anomalie « double abonnement », Premium intact", r.familles.length===1&&r.anomalies[0]&&r.anomalies[0].anomalie==="double_abonnement"&&r.base[0].plan==="mensuel"&&r.base[0].stripe_subscription==="sub_P", r.anomalies.map(a=>a.anomalie).join());
const IA={base:[{user_id:"u-ia",stripe_subscription:"sub_I",stripe_customer:"cus_I",plan:"ai",statut:"actif",expire_le:FUT}]};
r=await jouer(IA,[achat("u-ia","ia@hype.fr","sub_F3")]);
ok("Cas C : Hype IA + Famille → les deux gardés, pas d'anomalie", r.familles.length===1&&!r.anomalies.length&&r.base[0].plan==="ai", "");
r=await jouer(F_ACT,[achat("u-titu","titu@hype.fr","sub_F9")]);
ok("2e Famille payée par le même titulaire → rien ouvert, anomalie", r.familles.length===1&&r.anomalies[0]&&r.anomalies[0].anomalie==="double_abonnement", "");
r=await jouer({},[achat("u-titu","titu@hype.fr","sub_F1",{payment_status:"unpaid"})]);
ok("Paiement non confirmé : aucune famille, anomalie", r.familles.length===0&&r.anomalies[0]&&r.anomalies[0].anomalie==="paiement_non_confirme", "");
r=await jouer({},[achat(null,"inconnu@x.fr","sub_F1")]);
ok("Acheteur introuvable : 500 → Stripe réessaie", r.codes[0]===500&&r.familles.length===0, r.codes.join());
r=await jouer({},[achat("u-titu","titu@hype.fr","sub_F1")],{panne:true});
ok("Panne Supabase : 500 → Stripe réessaie", r.codes[0]===500, r.codes.join());
r=await jouer({base:[{user_id:"u-prem",stripe_subscription:"sub_P",plan:"mensuel",statut:"actif",expire_le:FUT}]},[facture("sub_P","prem@hype.fr","price_1TrFsxHnB1OJ7FOmIUhz6c2t","invoice.paid",30*86400)]);
ok("Renouvellement Premium classique : tables Famille jamais consultées", r.appelsFamille===0&&r.base[0].plan==="mensuel"&&!r.anomalies.length, "appels famille="+r.appelsFamille);

// ═══ 3 bis : chronologie Stripe ═══
const T=(o)=>o; const evt=(type,obj,dec)=>({id:id(),type,created:T0+dec,data:{object:obj}});
const fac=(dec,fin,prix="price_FAMILLE_TEST")=>({customer:"cus_sub_F1",customer_email:"titu@hype.fr",amount_paid:1999,parent:{subscription_details:{subscription:"sub_F1"}},lines:{data:[{period:{end:T0+fin},pricing:{price_details:{price:prix}}}]}});
const P30=30*86400, P60=60*86400;
r=await jouer({},[achat("u-titu","titu@hype.fr","sub_F1")]);
ok("Premier paiement : famille active", r.familles[0]&&r.familles[0].statut==="actif","");
r=await jouer({},[achat("u-titu","titu@hype.fr","sub_F1"), evt("invoice.paid",fac(P30,P60),P30)]);
ok("Renouvellement : fin prolongée", new Date(r.familles[0].expire)>new Date((T0+P30+86400)*1000), r.familles[0].expire);
r=await jouer({},[achat("u-titu","titu@hype.fr","sub_F1"), evt("invoice.payment_failed",fac(P30,P60),P30)]);
ok("Impayé : suspendue", r.familles[0].statut==="impaye","");
r=await jouer({},[achat("u-titu","titu@hype.fr","sub_F1"), evt("invoice.payment_failed",fac(P30,P60),P30), evt("invoice.paid",fac(P30+3600,P60),P30+3600)]);
ok("Paiement régularisé : réactivée", r.familles[0].statut==="actif", r.familles[0].statut);
r=await jouer({},[achat("u-titu","titu@hype.fr","sub_F1"), evt("invoice.payment_failed",fac(P30,P60),P30), {...evt("invoice.paid",fac(0,P30),0),id:"evt_vieux1"}]);
ok("Ancienne facture reçue après un impayé : reste suspendue", r.familles[0].statut==="impaye", r.familles[0].statut);
r=await jouer({},[achat("u-titu","titu@hype.fr","sub_F1"), evt("customer.subscription.deleted",{id:"sub_F1"},P30), evt("invoice.paid",fac(10,P60),10), achat("u-titu","titu@hype.fr","sub_F1")]);
ok("Ancien paiement / facture après résiliation : reste résiliée", r.familles.length===1&&r.familles[0].statut==="annule", r.familles[0].statut);
ok("La date de chaque message Stripe est bien transmise", r.datesRecues.every(d=>typeof d==="string"&&d.length>10), r.datesRecues.join());
r=await jouer({familles:[{titulaire:"u-titu",sub:"sub_F1",statut:"actif",expire:FUT}],base:[{user_id:"u-prem",stripe_subscription:"sub_P",plan:"mensuel",statut:"actif",expire_le:FUT}]},[facture("sub_P","prem@hype.fr","price_1TrFsxHnB1OJ7FOmIUhz6c2t","invoice.payment_failed")]);
ok("Un impayé sur un AUTRE abonnement ne suspend jamais la famille", r.familles[0].statut==="actif"&&r.base[0].statut==="impaye","");

// ═══ 3 bis : doubles abonnements dans les deux sens ═══
const PLINK={mensuel:"plink_1TrFteHnB1OJ7FOmhQ9f3GU5",annuel:"plink_1TrFwtHnB1OJ7FOmVdlbOVhT",duo:"plink_1TrGrTHnB1OJ7FOmZscujhRX",ai:"plink_1TrGWfHnB1OJ7FOmQfLvaAsl"};
const achatPerso=(user,plan)=>({id:id(),type:"checkout.session.completed",created:T0,data:{object:{id:"cs_"+user+plan,created:T0,mode:plan==="annuel"?"payment":"subscription",payment_link:PLINK[plan],payment_status:"paid",client_reference_id:user,customer:"cus_"+user,customer_details:{email:user+"@x.fr"},subscription:plan==="annuel"?null:"sub_"+user+plan,amount_total:1299}}});
for (const [plan,nom] of [["mensuel","Premium Cavalier"],["duo","Duo"],["annuel","Crystal"]]) {
  r=await jouer({base:[{user_id:"u-titu",stripe_subscription:plan==="annuel"?null:"sub_X",stripe_customer:"cus_X",plan,statut:"actif",expire_le:FUT}]},[achat("u-titu","titu@hype.fr","sub_F1")]);
  ok("Titulaire "+nom+" puis Famille : famille ouverte, "+nom+" intact, anomalie avec note", r.familles.length===1&&r.base[0].plan===plan&&r.anomalies[0]&&r.anomalies[0].anomalie==="double_abonnement"&&(r.anomalies[0].note||"").length>20, r.anomalies[0]&&r.anomalies[0].note);
}
for (const [plan,nom,attendu] of [["mensuel","Premium mensuel",true],["annuel","Crystal",true],["ai","Hype IA",false],["duo","Duo",true]]) {
  r=await jouer({membres:{"u-benef":"beneficiaire"}},[achatPerso("u-benef",plan)]);
  const a=r.anomalies[0];
  ok("Bénéficiaire Famille puis "+nom+" : achat enregistré"+(attendu?", anomalie avec note":", aucune alerte (complémentaire)"),
     r.base[0]&&r.base[0].plan===plan&&r.codes[0]===200&&(attendu? (a&&a.anomalie==="double_abonnement"&&(a.note||"").length>20) : !a), a?a.note:"aucune");
}
{ const ev=achatPerso("u-benef","mensuel"); r=await jouer({membres:{"u-benef":"beneficiaire"}},[ev,ev],{}); }
ok("Le même achat reçu deux fois : une seule alerte, réponses 200", r.anomalies.length===1&&r.codes.join()==="200,200",r.codes.join());

// ═══ Livraison C : la période payée fait foi ═══
const iso=(sec)=>new Date(sec*1000).toISOString();
const facL=(lignes)=>({customer:"cus_sub_F1",customer_email:"titu@hype.fr",amount_paid:1999,parent:{subscription_details:{subscription:"sub_F1"}},lines:{data:lignes}});
const L=(fin,prix="price_FAMILLE_TEST")=>({period:{end:T0+fin},pricing:{price_details:{price:prix}}});
r=await jouer({},[achat("u-titu","titu@hype.fr","sub_F1"), evt("invoice.paid",fac(P30,P60),P30), evt("invoice.payment_failed",fac(P30,P60),P30)]);
ok("C · CAS RÉEL : paiement et refus de la même période à la même seconde → reste active", r.familles[0].statut==="actif", r.familles[0].statut);
ok("C · la fin de période facturée est transmise à la base", r.periodesRecues.includes(iso(T0+P60)), r.periodesRecues.join());
r=await jouer({},[achat("u-titu","titu@hype.fr","sub_F1"), evt("invoice.payment_failed",fac(P30,P60),P30), evt("invoice.paid",fac(P30,P60),P30)]);
ok("C · refus puis paiement de la même période (même seconde) → active", r.familles[0].statut==="actif", r.familles[0].statut);
r=await jouer({},[achat("u-titu","titu@hype.fr","sub_F1"), evt("invoice.paid",fac(P30,P60),P30), evt("invoice.paid",facL([{...L(P60),amount:-999},L(P60)]),P30+86400)]);
ok("C · facture d'ajustement (prorata) : rien ne recule ni ne s'allonge", r.familles[0].statut==="actif"&&r.familles[0].paye===iso(T0+P60), r.familles[0].paye);
r=await jouer({},[achat("u-titu","titu@hype.fr","sub_F1"), evt("invoice.paid",fac(P30,P60),P30), evt("invoice.payment_failed",facL([L(P60)]),P30+86400)]);
ok("C · refus d'un ajustement sur une période déjà payée → reste active", r.familles[0].statut==="actif", r.familles[0].statut);
r=await jouer({},[achat("u-titu","titu@hype.fr","sub_F1"), evt("invoice.paid",facL([L(P60,"price_AUTRE"),L(P30)]),P30)]);
ok("C · plusieurs lignes : la ligne Famille fait foi", r.periodesRecues.includes(iso(T0+P30)), r.periodesRecues.join());
r=await jouer({},[evt("invoice.paid",fac(0,P30),0), achat("u-titu","titu@hype.fr","sub_F1")]);
ok("C · 1re facture avant la fin d'achat : famille ouverte avec sa période", r.familles.length===1&&r.familles[0].paye===iso(T0+P30), JSON.stringify(r.familles[0]));
r=await jouer({},[achat("u-titu","titu@hype.fr","sub_F1"), evt("invoice.paid",fac(0,P30),0)]);
ok("C · fin d'achat puis 1re facture : période complétée, une seule famille", r.familles.length===1&&r.familles[0].paye===iso(T0+P30), JSON.stringify(r.familles[0]));
r=await jouer({},[achat("u-titu","titu@hype.fr","sub_F1"), evt("charge.refunded",{customer:"cus_sub_F1",amount_refunded:1999,billing_details:{email:"titu@hype.fr"}},P30)]);
ok("C · remboursement sur une famille : alerte « à vérifier », famille inchangée", r.anomalies[0]&&r.anomalies[0].anomalie==="remboursement_ou_avoir"&&r.familles[0].statut==="actif"&&r.codes[1]===200, r.anomalies.map(a=>a.anomalie).join());
r=await jouer({},[achat("u-titu","titu@hype.fr","sub_F1"), evt("credit_note.created",{customer:"cus_sub_F1",total:500},P30)]);
ok("C · avoir sur une famille : alerte « à vérifier »", r.anomalies[0]&&r.anomalies[0].anomalie==="remboursement_ou_avoir"&&r.anomalies[0].montant_centimes===500, "");
r=await jouer(PREM,[evt("charge.refunded",{customer:"cus_P",amount_refunded:999},P30)]);
ok("C · remboursement hors Famille : rien (comportement d'avant)", !r.anomalies.length&&r.codes[0]===200, "");
{ const ev=evt("charge.refunded",{customer:"cus_sub_F1",amount_refunded:1999},P30); r=await jouer({},[achat("u-titu","titu@hype.fr","sub_F1"),ev,ev]); }
ok("C · même remboursement reçu deux fois : une seule alerte", r.anomalies.length===1, String(r.anomalies.length));
r=await jouer({},[achat("u-titu","titu@hype.fr","sub_F1"), evt("charge.refunded",{customer:"cus_sub_F1",amount_refunded:1999},P30)],{panne:false});
ok("C · rien n'est jamais résilié ni remboursé automatiquement", r.familles[0].statut==="actif", "");

for(const x of R) console.log((x.ok?"OK    ":"ÉCHEC ")+x.n+(x.ok?"":"  → "+x.detail));
console.log(R.filter(x=>x.ok).length+" / "+R.length);
