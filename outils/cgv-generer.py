# -*- coding: utf-8 -*-
# Génère les 7 pages CGV : /{langue}/cgv/index.html  (15/10/2026)
# La version française fait foi. Lancer : python3 outils/cgv-generer.py
import os, html
LANGUES = ["fr","en","es","it","de","ja","ar","zh","nl","pt"]
NOMS = {"fr":"Français","en":"English","es":"Español","it":"Italiano","de":"Deutsch","ja":"日本語","ar":"العربية","zh":"中文","nl":"Nederlands","pt":"Português"}
MAIL = '<a href="mailto:feinn@live.fr">feinn@live.fr</a>'
VEND = "Association FEINN Équitation et Environnement"
ADR = "3 chemin des Prés Picard, 91760 Itteville, France — SIREN 898 028 980"
def tab(rows, head):
    h = "<tr>" + "".join(f"<th>{c}</th>" for c in head) + "</tr>"
    return '<div class="tab"><table>' + h + "".join("<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>" for r in rows) + "</table></div>"
def ul(items): return "<ul>" + "".join(f"<li>{i}</li>" for i in items) + "</ul>"
T = {}
T["fr"] = dict(
 title="Conditions générales de vente", desc="Conditions générales de vente des abonnements Hype Premium et du mécénat Hype.",
 sous="Abonnements Hype Premium et mécénat Hype · version du 15 octobre 2026", asso="L'association", foi="",
 bref="<b>En bref.</b> Les abonnements mensuels sont sans engagement et se résilient en ligne à tout moment. Le Cercle Crystal se paie une seule fois pour 12 mois, sans renouvellement automatique. L'accès est immédiat après le paiement : en le demandant, vous renoncez au délai de rétractation de 14 jours. Le mécénat est un soutien à l'application, pas un don à l'association.",
 s=[
 ("1. Qui vend", f"<p>Les présentes conditions s'appliquent aux achats faits dans l'application Hype (2hype.fr) auprès de l'<b>{VEND}</b>, association déclarée, {ADR}, représentée par sa présidente, Blandine Pronost. Contact : {MAIL}. Ci-après « l'association ».</p>"),
 ("2. Objet", "<p>Hype est une application pour les cavaliers : cours et quiz des Galops, passeport équestre, communauté, suivi des chevaux et coach d'intelligence artificielle « Hey Baby ». Certaines fonctions sont gratuites ; d'autres sont réservées aux abonnés Premium. Les présentes conditions décrivent les offres payantes, leur prix, leur paiement, leur durée et leur résiliation.</p>"),
 ("3. Les offres et leurs prix", "<p>Les prix sont indiqués en euros. TVA non applicable, article 293 B du Code général des impôts.</p>" + tab([
   ["Premium Cavalier","12,99 € / mois","mensuelle, renouvelée chaque mois","Accès Premium pour 1 compte, coach IA : 4 questions par jour"],
   ["Premium Famille","19,99 € / mois","mensuelle, renouvelée chaque mois","Accès Premium pour 2 comptes séparés (le titulaire et un deuxième cavalier invité), coach IA : 4 questions par jour pour chacun"],
   ["Cercle Crystal","99,99 € pour 12 mois","12 mois, paiement unique, sans renouvellement automatique","Accès Premium pour 1 compte, coach IA : 4 questions par jour"],
   ["Pack Duo","24,99 € / mois","mensuelle, renouvelée chaque mois","Accès Premium + Hype IA pour 1 compte, coach IA : 20 questions par jour, vidéos incluses"],
   ["Hype IA","14,99 € / mois","mensuelle, renouvelée chaque mois","Coach IA : jusqu'à 15 questions par jour, pour 1 compte. Ne donne pas accès à Premium."]],
   ["Offre","Prix","Durée","Ce qu'elle comprend"]) + "<p>Les questions au coach IA se comptent par jour, de minuit à minuit (heure de Paris). Une question non utilisée ne se reporte pas au lendemain. L'association peut faire évoluer le contenu des offres pour améliorer l'application, sans réduire de façon importante ce qui a été acheté pendant la période en cours.</p>"),
 ("4. Commande et paiement", ul(["Un compte Hype est nécessaire : l'abonnement s'active sur le compte connecté au moment du paiement. Avant de payer, l'application affiche l'adresse du compte concerné et demande de la confirmer.","Le paiement se fait par carte bancaire sur la page sécurisée de Stripe. Hype n'a jamais accès aux numéros de carte.","Pour les offres mensuelles, le paiement est prélevé à la souscription puis chaque mois à la même date, jusqu'à la résiliation.","Si un paiement mensuel échoue, l'accès Premium peut être suspendu jusqu'à la régularisation."])),
 ("5. Accès immédiat et droit de rétractation", "<p>Les offres donnent accès à un contenu numérique dès le paiement. Avant de payer, l'application vous demande de confirmer que vous souhaitez cet accès immédiat et que vous renoncez ainsi à votre droit de rétractation de 14 jours (article L221-28, 13° du Code de la consommation). Sans cette confirmation, le paiement ne s'ouvre pas.</p>"),
 ("6. Durée, renouvellement et résiliation", ul(["<b>Offres mensuelles</b> (Premium Cavalier, Premium Famille, Pack Duo, Hype IA) : sans engagement. Vous pouvez résilier à tout moment ; la résiliation prend effet à la fin du mois déjà payé, et l'accès reste ouvert jusque-là. Aucun mois commencé n'est remboursé.","<b>Cercle Crystal</b> : 12 mois à partir du paiement, puis l'accès s'arrête de lui-même. Rien n'est prélevé ensuite.",f"<b>Comment résilier</b> : en ligne, à tout moment, avec le bouton « Gérer mon abonnement » dans Mon compte (page sécurisée de Stripe, où vous pouvez aussi changer de carte et retrouver vos factures). Vous pouvez aussi écrire à {MAIL} depuis l'adresse de votre compte.","Si vous supprimez votre compte Hype alors qu'un abonnement est en cours, pensez à le résilier : la suppression du compte n'arrête pas automatiquement le prélèvement. Pour Premium Famille, le titulaire doit d'abord résilier."])),
 ("7. Règles propres à Premium Famille", ul(["La personne qui paie est le <b>titulaire</b>. Elle invite un deuxième cavalier depuis Mon compte, avec un lien valable 7 jours.","Chacun garde son propre compte, ses données et ses 4 questions IA par jour ; rien n'est partagé entre les deux comptes.","Le titulaire peut retirer le deuxième cavalier, et celui-ci peut quitter la famille. Un remplacement est possible au plus une fois tous les 30 jours, avec au plus 4 deuxièmes cavaliers différents par an.","Aucun lien de parenté n'est demandé. Le titulaire est responsable du choix de la personne invitée.","Si l'abonnement s'arrête (résiliation, impayé), l'accès Premium s'arrête pour les deux comptes."])),
 ("8. Mécénat de Hype", f"<p>Les paliers de mécénat (de 20 € à 500 €) sont un soutien volontaire au développement de l'application, payé une seule fois. Ils ne donnent pas accès à Premium, ne sont pas un don à l'association FEINN et n'ouvrent droit à aucune réduction d'impôt. Ils ne sont pas remboursables, sauf erreur manifeste signalée rapidement à {MAIL}.</p>"),
 ("9. Fonctionnement du service", "<p>L'association fait de son mieux pour que Hype fonctionne en continu, mais des interruptions peuvent arriver (maintenance, panne d'un prestataire). Les réponses du coach IA sont des conseils généraux produits par une intelligence artificielle : elles ne remplacent ni un enseignant diplômé, ni un vétérinaire, et peuvent contenir des erreurs.</p>"),
 ("10. Données personnelles", f"<p>Les données nécessaires au compte et aux abonnements sont traitées pour fournir le service. Vous pouvez demander l'accès à vos données ou leur suppression en écrivant à {MAIL}.</p>"),
 ("11. Réclamations et médiation", f"<p>Pour toute réclamation, écrivez d'abord à {MAIL}. Médiateur de la consommation : en cours de désignation ; ses coordonnées seront indiquées ici. En attendant, toute réclamation peut être adressée à {MAIL}. Vous pouvez aussi utiliser la plateforme européenne de règlement en ligne des litiges.</p>"),
 ("12. Droit applicable", "<p>Les présentes conditions sont soumises au droit français. Elles peuvent être mises à jour ; la version applicable est celle en vigueur au jour du paiement.</p>"),
 ])
T["en"] = dict(
 title="Terms of sale", desc="Terms of sale for Hype Premium subscriptions and Hype patronage.",
 sous="Hype Premium subscriptions and Hype patronage · version of 15 October 2026", asso="The association", foi="This is a translation; the French version is the authoritative one.",
 bref="<b>In short.</b> Monthly subscriptions have no commitment and can be cancelled online at any time. The Cercle Crystal is paid once for 12 months, with no automatic renewal. Access is immediate after payment: by requesting it, you waive the 14-day withdrawal period. Patronage supports the app; it is not a donation to the association.",
 s=[
 ("1. Who sells", f"<p>These terms apply to purchases made in the Hype app (2hype.fr) from the <b>{VEND}</b>, a registered French association, {ADR}, represented by its president, Blandine Pronost. Contact: {MAIL}. Hereinafter “the association”.</p>"),
 ("2. Purpose", "<p>Hype is an app for riders: Galop courses and quizzes, equestrian passport, community, horse tracking and the “Hey Baby” artificial intelligence coach. Some features are free; others are reserved for Premium subscribers. These terms describe the paid offers, their price, payment, duration and cancellation.</p>"),
 ("3. Offers and prices", "<p>Prices are in euros. VAT not applicable, article 293 B of the French General Tax Code.</p>" + tab([
   ["Premium Rider","€12.99 / month","monthly, renewed every month","Premium access for 1 account, AI coach: 4 questions a day"],
   ["Premium Family","€19.99 / month","monthly, renewed every month","Premium access for 2 separate accounts (the holder and an invited second rider), AI coach: 4 questions a day each"],
   ["Cercle Crystal","€99.99 for 12 months","12 months, single payment, no automatic renewal","Premium access for 1 account, AI coach: 4 questions a day"],
   ["Duo Pack","€24.99 / month","monthly, renewed every month","Premium + Hype AI for 1 account, AI coach: 20 questions a day, videos included"],
   ["Hype AI","€14.99 / month","monthly, renewed every month","AI coach: up to 15 questions a day, for 1 account. Does not give access to Premium."]],
   ["Offer","Price","Duration","What it includes"]) + "<p>AI coach questions are counted per day, from midnight to midnight (Paris time). Unused questions do not carry over. The association may change the content of the offers to improve the app, without significantly reducing what was purchased for the current period.</p>"),
 ("4. Order and payment", ul(["A Hype account is required: the subscription is activated on the account signed in at the time of payment. Before paying, the app shows the account's email address and asks you to confirm it.","Payment is made by card on Stripe's secure page. Hype never has access to card numbers.","For monthly offers, payment is taken at sign-up and then every month on the same date, until cancellation.","If a monthly payment fails, Premium access may be suspended until it is settled."])),
 ("5. Immediate access and right of withdrawal", "<p>The offers give access to digital content as soon as you pay. Before paying, the app asks you to confirm that you want this immediate access and that you therefore waive your 14-day right of withdrawal (article L221-28, 13° of the French Consumer Code). Without this confirmation, payment does not open.</p>"),
 ("6. Duration, renewal and cancellation", ul(["<b>Monthly offers</b> (Premium Rider, Premium Family, Duo Pack, Hype AI): no commitment. You can cancel at any time; cancellation takes effect at the end of the month already paid, and access remains open until then. No started month is refunded.","<b>Cercle Crystal</b>: 12 months from payment, then access ends by itself. Nothing further is charged.",f"<b>How to cancel</b>: online, at any time, with the “Manage my subscription” button in My account (Stripe's secure page, where you can also change your card and find your invoices). You can also write to {MAIL} from your account's email address.","If you delete your Hype account while a subscription is running, remember to cancel it: deleting the account does not automatically stop payments. For Premium Family, the holder must cancel first."])),
 ("7. Premium Family rules", ul(["The person who pays is the <b>holder</b>. They invite a second rider from My account, with a link valid for 7 days.","Each keeps their own account, data and 4 AI questions a day; nothing is shared between the two accounts.","The holder can remove the second rider, and the second rider can leave the family. A replacement is possible at most once every 30 days, with at most 4 different second riders per year.","No family relationship is required. The holder is responsible for choosing the invited person.","If the subscription ends (cancellation, failed payment), Premium access ends for both accounts."])),
 ("8. Hype patronage", f"<p>Patronage tiers (from €20 to €500) are a voluntary one-off support for the app's development. They do not give access to Premium, are not a donation to the FEINN association and give no tax deduction. They are not refundable, except for an obvious error reported promptly to {MAIL}.</p>"),
 ("9. Service operation", "<p>The association does its best to keep Hype running continuously, but interruptions can happen (maintenance, provider outage). The AI coach's answers are general advice produced by artificial intelligence: they replace neither a qualified instructor nor a vet, and may contain errors.</p>"),
 ("10. Personal data", f"<p>The data needed for the account and subscriptions is processed to provide the service. You can request access to your data or its deletion by writing to {MAIL}.</p>"),
 ("11. Complaints and mediation", f"<p>For any complaint, write first to {MAIL}. Consumer mediator: being appointed; their details will be given here. In the meantime, any complaint can be sent to {MAIL}. You can also use the European online dispute resolution platform.</p>"),
 ("12. Applicable law", "<p>These terms are governed by French law. They may be updated; the applicable version is the one in force on the day of payment.</p>"),
 ])
T["es"] = dict(
 title="Condiciones generales de venta", desc="Condiciones generales de venta de las suscripciones Hype Premium y del mecenazgo Hype.",
 sous="Suscripciones Hype Premium y mecenazgo Hype · versión del 15 de octubre de 2026", asso="La asociación", foi="Esto es una traducción; la versión francesa es la que da fe.",
 bref="<b>En resumen.</b> Las suscripciones mensuales son sin compromiso y se cancelan en línea en cualquier momento. El Cercle Crystal se paga una sola vez por 12 meses, sin renovación automática. El acceso es inmediato tras el pago: al solicitarlo, renuncias al plazo de desistimiento de 14 días. El mecenazgo es un apoyo a la aplicación, no un donativo a la asociación.",
 s=[
 ("1. Quién vende", f"<p>Estas condiciones se aplican a las compras realizadas en la aplicación Hype (2hype.fr) a la <b>{VEND}</b>, asociación declarada en Francia, {ADR}, representada por su presidenta, Blandine Pronost. Contacto: {MAIL}. En adelante, «la asociación».</p>"),
 ("2. Objeto", "<p>Hype es una aplicación para jinetes: cursos y cuestionarios de los Galops, pasaporte ecuestre, comunidad, seguimiento de los caballos y el coach de inteligencia artificial «Hey Baby». Algunas funciones son gratuitas; otras están reservadas a los suscriptores Premium. Estas condiciones describen las ofertas de pago, su precio, su pago, su duración y su cancelación.</p>"),
 ("3. Ofertas y precios", "<p>Los precios se indican en euros. IVA no aplicable, artículo 293 B del Código General de Impuestos francés.</p>" + tab([
   ["Premium Jinete","12,99 € / mes","mensual, renovada cada mes","Acceso Premium para 1 cuenta, coach de IA: 4 preguntas al día"],
   ["Premium Familia","19,99 € / mes","mensual, renovada cada mes","Acceso Premium para 2 cuentas separadas (el titular y un segundo jinete invitado), coach de IA: 4 preguntas al día cada uno"],
   ["Cercle Crystal","99,99 € por 12 meses","12 meses, pago único, sin renovación automática","Acceso Premium para 1 cuenta, coach de IA: 4 preguntas al día"],
   ["Pack Dúo","24,99 € / mes","mensual, renovada cada mes","Premium + Hype IA para 1 cuenta, coach de IA: 20 preguntas al día, vídeos incluidos"],
   ["Hype IA","14,99 € / mes","mensual, renovada cada mes","Coach de IA: hasta 15 preguntas al día, para 1 cuenta. No da acceso a Premium."]],
   ["Oferta","Precio","Duración","Qué incluye"]) + "<p>Las preguntas al coach de IA se cuentan por día, de medianoche a medianoche (hora de París). Las preguntas no usadas no se acumulan. La asociación puede modificar el contenido de las ofertas para mejorar la aplicación, sin reducir de forma importante lo comprado para el periodo en curso.</p>"),
 ("4. Pedido y pago", ul(["Se necesita una cuenta Hype: la suscripción se activa en la cuenta conectada en el momento del pago. Antes de pagar, la aplicación muestra el correo de la cuenta y pide confirmarlo.","El pago se realiza con tarjeta en la página segura de Stripe. Hype nunca tiene acceso a los números de tarjeta.","En las ofertas mensuales, el pago se cobra al suscribirse y después cada mes en la misma fecha, hasta la cancelación.","Si un pago mensual falla, el acceso Premium puede suspenderse hasta su regularización."])),
 ("5. Acceso inmediato y derecho de desistimiento", "<p>Las ofertas dan acceso a un contenido digital desde el pago. Antes de pagar, la aplicación te pide confirmar que deseas ese acceso inmediato y que renuncias así a tu derecho de desistimiento de 14 días (artículo L221-28, 13.º del Código de Consumo francés). Sin esta confirmación, el pago no se abre.</p>"),
 ("6. Duración, renovación y cancelación", ul(["<b>Ofertas mensuales</b> (Premium Jinete, Premium Familia, Pack Dúo, Hype IA): sin compromiso. Puedes cancelar en cualquier momento; la cancelación surte efecto al final del mes ya pagado, y el acceso sigue abierto hasta entonces. Ningún mes empezado se reembolsa.","<b>Cercle Crystal</b>: 12 meses desde el pago; después el acceso termina solo. No se cobra nada más.",f"<b>Cómo cancelar</b>: en línea, en cualquier momento, con el botón «Gestionar mi suscripción» en Mi cuenta (página segura de Stripe, donde también puedes cambiar de tarjeta y ver tus facturas). También puedes escribir a {MAIL} desde el correo de tu cuenta.","Si eliminas tu cuenta Hype con una suscripción en curso, recuerda cancelarla: eliminar la cuenta no detiene automáticamente los cobros. En Premium Familia, el titular debe cancelar primero."])),
 ("7. Normas de Premium Familia", ul(["Quien paga es el <b>titular</b>. Invita a un segundo jinete desde Mi cuenta, con un enlace válido 7 días.","Cada uno conserva su propia cuenta, sus datos y sus 4 preguntas de IA al día; no se comparte nada entre las dos cuentas.","El titular puede retirar al segundo jinete, y este puede salir de la familia. Se permite un cambio como máximo cada 30 días, con un máximo de 4 segundos jinetes distintos al año.","No se exige ningún vínculo de parentesco. El titular es responsable de la elección de la persona invitada.","Si la suscripción termina (cancelación, impago), el acceso Premium termina para las dos cuentas."])),
 ("8. Mecenazgo de Hype", f"<p>Los niveles de mecenazgo (de 20 € a 500 €) son un apoyo voluntario y único al desarrollo de la aplicación. No dan acceso a Premium, no son un donativo a la asociación FEINN y no dan derecho a deducción fiscal. No son reembolsables, salvo error manifiesto comunicado rápidamente a {MAIL}.</p>"),
 ("9. Funcionamiento del servicio", "<p>La asociación hace todo lo posible para que Hype funcione de forma continua, pero pueden producirse interrupciones (mantenimiento, avería de un proveedor). Las respuestas del coach de IA son consejos generales producidos por una inteligencia artificial: no sustituyen a un profesor titulado ni a un veterinario y pueden contener errores.</p>"),
 ("10. Datos personales", f"<p>Los datos necesarios para la cuenta y las suscripciones se tratan para prestar el servicio. Puedes solicitar el acceso a tus datos o su eliminación escribiendo a {MAIL}.</p>"),
 ("11. Reclamaciones y mediación", f"<p>Para cualquier reclamación, escribe primero a {MAIL}. Mediador de consumo: en proceso de designación; sus datos se indicarán aquí. Mientras tanto, cualquier reclamación puede enviarse a {MAIL}. También puedes usar la plataforma europea de resolución de litigios en línea.</p>"),
 ("12. Ley aplicable", "<p>Estas condiciones se rigen por la ley francesa. Pueden actualizarse; la versión aplicable es la vigente el día del pago.</p>"),
 ])
T["it"] = dict(
 title="Condizioni generali di vendita", desc="Condizioni generali di vendita degli abbonamenti Hype Premium e del mecenatismo Hype.",
 sous="Abbonamenti Hype Premium e mecenatismo Hype · versione del 15 ottobre 2026", asso="L'associazione", foi="Questa è una traduzione; fa fede la versione francese.",
 bref="<b>In breve.</b> Gli abbonamenti mensili sono senza vincoli e si disdicono online in qualsiasi momento. Il Cercle Crystal si paga una sola volta per 12 mesi, senza rinnovo automatico. L'accesso è immediato dopo il pagamento: richiedendolo, rinunci al periodo di recesso di 14 giorni. Il mecenatismo è un sostegno all'app, non una donazione all'associazione.",
 s=[
 ("1. Chi vende", f"<p>Le presenti condizioni si applicano agli acquisti effettuati nell'app Hype (2hype.fr) presso la <b>{VEND}</b>, associazione registrata in Francia, {ADR}, rappresentata dalla sua presidente, Blandine Pronost. Contatto: {MAIL}. Di seguito «l'associazione».</p>"),
 ("2. Oggetto", "<p>Hype è un'app per cavalieri: corsi e quiz dei Galops, passaporto equestre, community, gestione dei cavalli e il coach di intelligenza artificiale «Hey Baby». Alcune funzioni sono gratuite; altre sono riservate agli abbonati Premium. Le presenti condizioni descrivono le offerte a pagamento, il prezzo, il pagamento, la durata e la disdetta.</p>"),
 ("3. Offerte e prezzi", "<p>I prezzi sono in euro. IVA non applicabile, articolo 293 B del Codice generale delle imposte francese.</p>" + tab([
   ["Premium Cavaliere","12,99 € / mese","mensile, rinnovato ogni mese","Accesso Premium per 1 account, coach IA: 4 domande al giorno"],
   ["Premium Famiglia","19,99 € / mese","mensile, rinnovato ogni mese","Accesso Premium per 2 account separati (il titolare e un secondo cavaliere invitato), coach IA: 4 domande al giorno ciascuno"],
   ["Cercle Crystal","99,99 € per 12 mesi","12 mesi, pagamento unico, senza rinnovo automatico","Accesso Premium per 1 account, coach IA: 4 domande al giorno"],
   ["Pack Duo","24,99 € / mese","mensile, rinnovato ogni mese","Premium + Hype IA per 1 account, coach IA: 20 domande al giorno, video inclusi"],
   ["Hype IA","14,99 € / mese","mensile, rinnovato ogni mese","Coach IA: fino a 15 domande al giorno, per 1 account. Non dà accesso a Premium."]],
   ["Offerta","Prezzo","Durata","Cosa comprende"]) + "<p>Le domande al coach IA si contano per giorno, da mezzanotte a mezzanotte (ora di Parigi). Le domande non usate non si accumulano. L'associazione può modificare il contenuto delle offerte per migliorare l'app, senza ridurre in modo rilevante quanto acquistato per il periodo in corso.</p>"),
 ("4. Ordine e pagamento", ul(["Serve un account Hype: l'abbonamento si attiva sull'account connesso al momento del pagamento. Prima di pagare, l'app mostra l'indirizzo e-mail dell'account e chiede di confermarlo.","Il pagamento avviene con carta sulla pagina sicura di Stripe. Hype non ha mai accesso ai numeri delle carte.","Per le offerte mensili, il pagamento viene addebitato all'iscrizione e poi ogni mese alla stessa data, fino alla disdetta.","Se un pagamento mensile non va a buon fine, l'accesso Premium può essere sospeso fino alla regolarizzazione."])),
 ("5. Accesso immediato e diritto di recesso", "<p>Le offerte danno accesso a un contenuto digitale subito dopo il pagamento. Prima di pagare, l'app ti chiede di confermare che desideri questo accesso immediato e che rinunci quindi al diritto di recesso di 14 giorni (articolo L221-28, 13° del Codice del consumo francese). Senza questa conferma, il pagamento non si apre.</p>"),
 ("6. Durata, rinnovo e disdetta", ul(["<b>Offerte mensili</b> (Premium Cavaliere, Premium Famiglia, Pack Duo, Hype IA): senza vincoli. Puoi disdire in qualsiasi momento; la disdetta ha effetto alla fine del mese già pagato e l'accesso resta attivo fino ad allora. Nessun mese iniziato viene rimborsato.","<b>Cercle Crystal</b>: 12 mesi dal pagamento, poi l'accesso termina da solo. Non viene addebitato altro.",f"<b>Come disdire</b>: online, in qualsiasi momento, con il pulsante «Gestisci il mio abbonamento» in Il mio account (pagina sicura di Stripe, dove puoi anche cambiare carta e trovare le fatture). Puoi anche scrivere a {MAIL} dall'indirizzo del tuo account.","Se elimini il tuo account Hype con un abbonamento in corso, ricordati di disdirlo: l'eliminazione dell'account non interrompe automaticamente gli addebiti. Per Premium Famiglia, il titolare deve prima disdire."])),
 ("7. Regole di Premium Famiglia", ul(["Chi paga è il <b>titolare</b>. Invita un secondo cavaliere da Il mio account, con un link valido 7 giorni.","Ognuno mantiene il proprio account, i propri dati e le proprie 4 domande IA al giorno; nulla è condiviso tra i due account.","Il titolare può rimuovere il secondo cavaliere, e questi può lasciare la famiglia. Una sostituzione è possibile al massimo una volta ogni 30 giorni, con al massimo 4 secondi cavalieri diversi all'anno.","Non è richiesto alcun legame di parentela. Il titolare è responsabile della scelta della persona invitata.","Se l'abbonamento termina (disdetta, mancato pagamento), l'accesso Premium termina per entrambi gli account."])),
 ("8. Mecenatismo di Hype", f"<p>I livelli di mecenatismo (da 20 € a 500 €) sono un sostegno volontario e unico allo sviluppo dell'app. Non danno accesso a Premium, non sono una donazione all'associazione FEINN e non danno diritto ad alcuna detrazione fiscale. Non sono rimborsabili, salvo errore evidente segnalato rapidamente a {MAIL}.</p>"),
 ("9. Funzionamento del servizio", "<p>L'associazione fa del suo meglio perché Hype funzioni in modo continuo, ma possono verificarsi interruzioni (manutenzione, guasto di un fornitore). Le risposte del coach IA sono consigli generali prodotti da un'intelligenza artificiale: non sostituiscono né un istruttore qualificato né un veterinario e possono contenere errori.</p>"),
 ("10. Dati personali", f"<p>I dati necessari all'account e agli abbonamenti sono trattati per fornire il servizio. Puoi chiedere l'accesso ai tuoi dati o la loro cancellazione scrivendo a {MAIL}.</p>"),
 ("11. Reclami e mediazione", f"<p>Per qualsiasi reclamo, scrivi prima a {MAIL}. Mediatore dei consumatori: in corso di designazione; i suoi recapiti saranno indicati qui. Nel frattempo, ogni reclamo può essere inviato a {MAIL}. Puoi anche usare la piattaforma europea di risoluzione online delle controversie.</p>"),
 ("12. Legge applicabile", "<p>Le presenti condizioni sono regolate dalla legge francese. Possono essere aggiornate; la versione applicabile è quella in vigore il giorno del pagamento.</p>"),
 ])
T["de"] = dict(
 title="Allgemeine Verkaufsbedingungen", desc="Allgemeine Verkaufsbedingungen für Hype-Premium-Abos und das Hype-Mäzenatentum.",
 sous="Hype-Premium-Abos und Hype-Mäzenatentum · Fassung vom 15. Oktober 2026", asso="Der Verein", foi="Dies ist eine Übersetzung; maßgeblich ist die französische Fassung.",
 bref="<b>Kurz gesagt.</b> Monatsabos sind ohne Bindung und jederzeit online kündbar. Der Cercle Crystal wird einmal für 12 Monate bezahlt, ohne automatische Verlängerung. Der Zugang ist sofort nach der Zahlung frei: Wer ihn verlangt, verzichtet auf die 14-tägige Widerrufsfrist. Mäzenatentum unterstützt die App und ist keine Spende an den Verein.",
 s=[
 ("1. Wer verkauft", f"<p>Diese Bedingungen gelten für Käufe in der App Hype (2hype.fr) bei der <b>{VEND}</b>, eingetragener französischer Verein, {ADR}, vertreten durch die Präsidentin Blandine Pronost. Kontakt: {MAIL}. Im Folgenden „der Verein“.</p>"),
 ("2. Gegenstand", "<p>Hype ist eine App für Reiter: Kurse und Quiz der Galops, Reiterpass, Community, Pferdeverwaltung und der KI-Coach „Hey Baby“. Manche Funktionen sind kostenlos, andere Premium-Abonnenten vorbehalten. Diese Bedingungen beschreiben die kostenpflichtigen Angebote, ihren Preis, die Zahlung, die Laufzeit und die Kündigung.</p>"),
 ("3. Angebote und Preise", "<p>Die Preise verstehen sich in Euro. Keine Mehrwertsteuer gemäß Artikel 293 B des französischen Steuergesetzbuchs.</p>" + tab([
   ["Premium Reiter","12,99 € / Monat","monatlich, jeden Monat verlängert","Premium-Zugang für 1 Konto, KI-Coach: 4 Fragen pro Tag"],
   ["Premium Familie","19,99 € / Monat","monatlich, jeden Monat verlängert","Premium-Zugang für 2 getrennte Konten (Inhaber und ein eingeladener zweiter Reiter), KI-Coach: je 4 Fragen pro Tag"],
   ["Cercle Crystal","99,99 € für 12 Monate","12 Monate, Einmalzahlung, keine automatische Verlängerung","Premium-Zugang für 1 Konto, KI-Coach: 4 Fragen pro Tag"],
   ["Duo-Paket","24,99 € / Monat","monatlich, jeden Monat verlängert","Premium + Hype KI für 1 Konto, KI-Coach: 20 Fragen pro Tag, Videos inklusive"],
   ["Hype KI","14,99 € / Monat","monatlich, jeden Monat verlängert","KI-Coach: bis zu 15 Fragen pro Tag, für 1 Konto. Kein Zugang zu Premium."]],
   ["Angebot","Preis","Laufzeit","Inhalt"]) + "<p>Fragen an den KI-Coach werden pro Tag gezählt, von Mitternacht bis Mitternacht (Pariser Zeit). Nicht genutzte Fragen verfallen. Der Verein kann die Angebote weiterentwickeln, um die App zu verbessern, ohne das für den laufenden Zeitraum Gekaufte wesentlich einzuschränken.</p>"),
 ("4. Bestellung und Zahlung", ul(["Ein Hype-Konto ist erforderlich: Das Abo wird auf dem bei der Zahlung angemeldeten Konto aktiviert. Vor der Zahlung zeigt die App die E-Mail-Adresse des Kontos an und bittet um Bestätigung.","Die Zahlung erfolgt per Karte auf der sicheren Seite von Stripe. Hype hat nie Zugriff auf Kartennummern.","Bei Monatsangeboten wird die Zahlung beim Abschluss und danach jeden Monat am selben Tag bis zur Kündigung eingezogen.","Schlägt eine Monatszahlung fehl, kann der Premium-Zugang bis zur Begleichung ausgesetzt werden."])),
 ("5. Sofortiger Zugang und Widerrufsrecht", "<p>Die Angebote geben ab der Zahlung Zugang zu digitalen Inhalten. Vor der Zahlung bittet die App um die Bestätigung, dass du diesen sofortigen Zugang wünschst und damit auf dein 14-tägiges Widerrufsrecht verzichtest (Artikel L221-28, 13° des französischen Verbrauchergesetzbuchs). Ohne diese Bestätigung öffnet sich die Zahlung nicht.</p>"),
 ("6. Laufzeit, Verlängerung und Kündigung", ul(["<b>Monatsangebote</b> (Premium Reiter, Premium Familie, Duo-Paket, Hype KI): ohne Bindung. Du kannst jederzeit kündigen; die Kündigung wirkt zum Ende des bereits bezahlten Monats, bis dahin bleibt der Zugang offen. Angebrochene Monate werden nicht erstattet.","<b>Cercle Crystal</b>: 12 Monate ab der Zahlung, danach endet der Zugang von selbst. Es wird nichts weiter abgebucht.",f"<b>So kündigst du</b>: online, jederzeit, mit der Schaltfläche „Mein Abo verwalten“ unter Mein Konto (sichere Seite von Stripe, wo du auch die Karte ändern und Rechnungen abrufen kannst). Du kannst auch von der Adresse deines Kontos an {MAIL} schreiben.","Wenn du dein Hype-Konto bei laufendem Abo löschst, denk an die Kündigung: Das Löschen des Kontos stoppt die Zahlungen nicht automatisch. Bei Premium Familie muss der Inhaber zuerst kündigen."])),
 ("7. Regeln für Premium Familie", ul(["Wer zahlt, ist der <b>Inhaber</b>. Er lädt einen zweiten Reiter unter Mein Konto ein, mit einem 7 Tage gültigen Link.","Jeder behält sein eigenes Konto, seine Daten und seine 4 KI-Fragen pro Tag; zwischen den beiden Konten wird nichts geteilt.","Der Inhaber kann den zweiten Reiter entfernen, und dieser kann die Familie verlassen. Ein Wechsel ist höchstens alle 30 Tage möglich, mit höchstens 4 verschiedenen zweiten Reitern pro Jahr.","Ein Verwandtschaftsverhältnis wird nicht verlangt. Der Inhaber ist für die Wahl der eingeladenen Person verantwortlich.","Endet das Abo (Kündigung, Zahlungsausfall), endet der Premium-Zugang für beide Konten."])),
 ("8. Hype-Mäzenatentum", f"<p>Die Mäzenatenstufen (20 € bis 500 €) sind eine freiwillige, einmalige Unterstützung der App-Entwicklung. Sie geben keinen Zugang zu Premium, sind keine Spende an den Verein FEINN und berechtigen zu keinem Steuerabzug. Sie werden nicht erstattet, außer bei einem offensichtlichen Fehler, der rasch an {MAIL} gemeldet wird.</p>"),
 ("9. Betrieb des Dienstes", "<p>Der Verein bemüht sich, Hype ohne Unterbrechung bereitzustellen, doch Ausfälle können vorkommen (Wartung, Störung eines Dienstleisters). Die Antworten des KI-Coachs sind allgemeine, von einer künstlichen Intelligenz erzeugte Ratschläge: Sie ersetzen weder einen qualifizierten Reitlehrer noch einen Tierarzt und können Fehler enthalten.</p>"),
 ("10. Personenbezogene Daten", f"<p>Die für Konto und Abos nötigen Daten werden zur Erbringung des Dienstes verarbeitet. Du kannst Auskunft über deine Daten oder ihre Löschung verlangen, indem du an {MAIL} schreibst.</p>"),
 ("11. Beschwerden und Schlichtung", f"<p>Bei Beschwerden schreib zuerst an {MAIL}. Verbraucherschlichtungsstelle: wird benannt; ihre Kontaktdaten werden hier angegeben. Bis dahin kann jede Beschwerde an {MAIL} gerichtet werden. Du kannst auch die europäische Plattform zur Online-Streitbeilegung nutzen.</p>"),
 ("12. Anwendbares Recht", "<p>Diese Bedingungen unterliegen französischem Recht. Sie können aktualisiert werden; maßgeblich ist die am Tag der Zahlung gültige Fassung.</p>"),
 ])
T["ja"] = dict(
 title="販売条件", desc="Hype Premium のサブスクリプションと Hype 支援（メセナ）に関する販売条件。",
 sous="Hype Premium のサブスクリプションと Hype 支援 · 2026年10月15日版", asso="協会について", foi="これは翻訳です。フランス語版が正本となります。",
 bref="<b>概要。</b>月額プランは契約期間の縛りがなく、いつでもオンラインで解約できます。Cercle Crystal は12か月分を一度だけお支払いいただき、自動更新はありません。お支払い後すぐに利用でき、即時利用を希望することで14日間の撤回期間を放棄することになります。支援（メセナ）はアプリへの支援であり、協会への寄付ではありません。",
 s=[
 ("1. 販売者", f"<p>本条件は、Hype アプリ（2hype.fr）での購入に適用されます。販売者：<b>{VEND}</b>（フランスの届出協会）、{ADR}。代表者：会長 Blandine Pronost。連絡先：{MAIL}。以下「協会」といいます。</p>"),
 ("2. 目的", "<p>Hype はライダーのためのアプリです：ギャロップの講座とクイズ、乗馬パスポート、コミュニティ、馬の管理、AIコーチ「Hey Baby」。一部の機能は無料で、その他は Premium 会員限定です。本条件は、有料プランの内容、料金、支払い、期間、解約について定めます。</p>"),
 ("3. プランと料金", "<p>料金はユーロ表示です。フランス租税一般法典第293条Bにより付加価値税（TVA）は適用されません。</p>" + tab([
   ["Premium ライダー","12,99 € / 月","月額、毎月更新","1アカウントの Premium 利用、AIコーチ：1日4回の質問"],
   ["Premium ファミリー","19,99 € / 月","月額、毎月更新","別々の2アカウント（契約者と招待された2人目）の Premium 利用、AIコーチ：それぞれ1日4回の質問"],
   ["Cercle Crystal","12か月で 99,99 €","12か月、1回払い、自動更新なし","1アカウントの Premium 利用、AIコーチ：1日4回の質問"],
   ["デュオパック","24,99 € / 月","月額、毎月更新","1アカウントの Premium + Hype AI、AIコーチ：1日20回の質問、動画付き"],
   ["Hype AI","14,99 € / 月","月額、毎月更新","AIコーチ：1日最大15回の質問（1アカウント）。Premium は含まれません。"]],
   ["プラン","料金","期間","内容"]) + "<p>AIコーチへの質問は1日単位（パリ時間の0時から0時まで）で数えます。使わなかった質問は翌日に繰り越されません。協会はアプリ改善のためにプラン内容を変更することがありますが、現在の期間に購入された内容を大きく減らすことはありません。</p>"),
 ("4. 注文と支払い", ul(["Hype のアカウントが必要です。サブスクリプションは支払い時にログインしているアカウントで有効になります。支払い前に、アプリがアカウントのメールアドレスを表示し、確認を求めます。","支払いは Stripe の安全なページでカードにより行われます。Hype がカード番号にアクセスすることはありません。","月額プランは、登録時とその後毎月同じ日に、解約まで請求されます。","月額の支払いに失敗した場合、精算されるまで Premium の利用が停止されることがあります。"])),
 ("5. 即時利用と撤回権", "<p>各プランは支払い後すぐにデジタルコンテンツを利用できます。支払い前に、アプリは即時利用を希望し、それにより14日間の撤回権（フランス消費法典 L221-28条13号）を放棄することの確認を求めます。この確認がない場合、支払い画面は開きません。</p>"),
 ("6. 期間・更新・解約", ul(["<b>月額プラン</b>（Premium ライダー、Premium ファミリー、デュオパック、Hype AI）：縛りなし。いつでも解約でき、解約はお支払い済みの月の終わりに有効となり、それまでは利用できます。開始済みの月は返金されません。","<b>Cercle Crystal</b>：支払いから12か月で利用が自動的に終了します。その後の請求はありません。",f"<b>解約方法</b>：「マイアカウント」の「サブスクリプションを管理」ボタンから、いつでもオンラインで（Stripe の安全なページで、カードの変更や請求書の確認もできます）。アカウントのメールアドレスから {MAIL} に連絡することもできます。","サブスクリプションの利用中に Hype のアカウントを削除する場合は、解約もお忘れなく。アカウントを削除しても請求は自動的には止まりません。Premium ファミリーの場合、契約者が先に解約する必要があります。"])),
 ("7. Premium ファミリーのルール", ul(["お支払いする人が<b>契約者</b>です。「マイアカウント」から、7日間有効なリンクで2人目のライダーを招待します。","それぞれが自分のアカウント、データ、1日4回のAI質問を持ち、2つのアカウント間で共有されるものはありません。","契約者は2人目を外すことができ、2人目も自らファミリーを離れることができます。入れ替えは30日に1回まで、年間で異なる2人目は最大4人までです。","親族関係の証明は不要です。招待する人の選択は契約者の責任となります。","サブスクリプションが終了した場合（解約、未払い）、両方のアカウントで Premium の利用が終了します。"])),
 ("8. Hype への支援（メセナ）", f"<p>支援の各段階（20 €〜500 €）は、アプリ開発への任意の1回限りの支援です。Premium は含まれず、FEINN 協会への寄付ではなく、税控除の対象にもなりません。明らかな誤りを速やかに {MAIL} にご連絡いただいた場合を除き、返金はできません。</p>"),
 ("9. サービスの運営", "<p>協会は Hype が継続して動作するよう努めますが、中断が生じることがあります（メンテナンス、提供業者の障害など）。AIコーチの回答は人工知能による一般的な助言であり、資格のある指導者や獣医の代わりにはならず、誤りを含む場合があります。</p>"),
 ("10. 個人データ", f"<p>アカウントとサブスクリプションに必要なデータは、サービス提供のために処理されます。データの開示や削除は {MAIL} までご請求ください。</p>"),
 ("11. 苦情と調停", f"<p>苦情はまず {MAIL} までお寄せください。消費者調停人：現在選任中で、決まり次第ここに記載します。それまでは苦情を {MAIL} までお送りください。欧州のオンライン紛争解決プラットフォームも利用できます。</p>"),
 ("12. 準拠法", "<p>本条件はフランス法に準拠します。本条件は更新されることがあり、適用されるのは支払い日に有効な版です。</p>"),
 ])
T["ar"] = dict(
 title="الشروط العامة للبيع", desc="الشروط العامة لبيع اشتراكات Hype Premium ورعاية Hype.",
 sous="اشتراكات Hype Premium ورعاية Hype · نسخة 15 أكتوبر 2026", asso="الجمعية", foi="هذه ترجمة؛ والنسخة الفرنسية هي المعتمدة.",
 bref="<b>باختصار.</b> الاشتراكات الشهرية دون التزام ويمكن إلغاؤها عبر الإنترنت في أي وقت. يُدفع Cercle Crystal مرة واحدة لمدة 12 شهرًا دون تجديد تلقائي. الوصول فوري بعد الدفع: بطلبه، تتنازلين عن مهلة التراجع البالغة 14 يومًا. الرعاية دعم للتطبيق وليست تبرعًا للجمعية.",
 s=[
 ("1. البائع", f"<p>تنطبق هذه الشروط على المشتريات التي تتم في تطبيق Hype ‏(2hype.fr) لدى <b>{VEND}</b>، جمعية مسجّلة في فرنسا، {ADR}، تمثّلها رئيستها Blandine Pronost. للتواصل: {MAIL}. ويُشار إليها فيما يلي بـ«الجمعية».</p>"),
 ("2. الموضوع", "<p>Hype تطبيق للفرسان: دروس واختبارات مستويات الغالوب، جواز الفروسية، المجتمع، متابعة الخيول، ومدرب الذكاء الاصطناعي «Hey Baby». بعض الميزات مجانية، وبعضها مخصص لمشتركي Premium. تصف هذه الشروط العروض المدفوعة وأسعارها ودفعها ومدتها وإلغاءها.</p>"),
 ("3. العروض والأسعار", "<p>الأسعار باليورو. الضريبة على القيمة المضافة غير مطبّقة، المادة 293 ب من القانون العام للضرائب الفرنسي.</p>" + tab([
   ["Premium الفارس","12,99 € / شهر","شهري، يتجدد كل شهر","وصول Premium لحساب واحد، مدرب الذكاء الاصطناعي: 4 أسئلة يوميًا"],
   ["Premium العائلة","19,99 € / شهر","شهري، يتجدد كل شهر","وصول Premium لحسابين منفصلين (صاحب الاشتراك وفارس ثانٍ مدعو)، مدرب الذكاء الاصطناعي: 4 أسئلة يوميًا لكل منهما"],
   ["Cercle Crystal","99,99 € لمدة 12 شهرًا","12 شهرًا، دفعة واحدة، دون تجديد تلقائي","وصول Premium لحساب واحد، مدرب الذكاء الاصطناعي: 4 أسئلة يوميًا"],
   ["باقة الثنائي","24,99 € / شهر","شهري، يتجدد كل شهر","Premium و Hype IA لحساب واحد، مدرب الذكاء الاصطناعي: 20 سؤالًا يوميًا، الفيديوهات مشمولة"],
   ["Hype IA","14,99 € / شهر","شهري، يتجدد كل شهر","مدرب الذكاء الاصطناعي: حتى 15 سؤالًا يوميًا لحساب واحد. لا يمنح الوصول إلى Premium."]],
   ["العرض","السعر","المدة","ما يشمله"]) + "<p>تُحتسب أسئلة مدرب الذكاء الاصطناعي يوميًا، من منتصف الليل إلى منتصف الليل (بتوقيت باريس). الأسئلة غير المستخدمة لا تُرحَّل إلى اليوم التالي. يمكن للجمعية تطوير محتوى العروض لتحسين التطبيق، دون تقليص ما تم شراؤه للفترة الجارية بشكل كبير.</p>"),
 ("4. الطلب والدفع", ul(["يلزم حساب Hype: يُفعَّل الاشتراك على الحساب المتصل وقت الدفع. قبل الدفع، يعرض التطبيق البريد الإلكتروني للحساب ويطلب تأكيده.","يتم الدفع بالبطاقة على صفحة Stripe الآمنة. لا يطّلع Hype أبدًا على أرقام البطاقات.","في العروض الشهرية، يُقتطع المبلغ عند الاشتراك ثم كل شهر في التاريخ نفسه حتى الإلغاء.","إذا فشل دفع شهري، قد يُعلَّق الوصول إلى Premium حتى تسوية المبلغ."])),
 ("5. الوصول الفوري وحق التراجع", "<p>تمنح العروض الوصول إلى محتوى رقمي فور الدفع. قبل الدفع، يطلب منك التطبيق تأكيد رغبتك في هذا الوصول الفوري وتنازلك بذلك عن حقك في التراجع خلال 14 يومًا (المادة L221-28، الفقرة 13 من قانون الاستهلاك الفرنسي). من دون هذا التأكيد لا تُفتح صفحة الدفع.</p>"),
 ("6. المدة والتجديد والإلغاء", ul(["<b>العروض الشهرية</b> (Premium الفارس، Premium العائلة، باقة الثنائي، Hype IA): دون التزام. يمكنك الإلغاء في أي وقت؛ يسري الإلغاء في نهاية الشهر المدفوع ويبقى الوصول متاحًا حتى ذلك الحين. لا يُستردّ أي شهر بدأ.","<b>Cercle Crystal</b>: 12 شهرًا من تاريخ الدفع، ثم ينتهي الوصول تلقائيًا. لا يُقتطع أي مبلغ بعد ذلك.",f"<b>طريقة الإلغاء</b>: عبر الإنترنت في أي وقت، بزر «إدارة اشتراكي» في «حسابي» (صفحة Stripe الآمنة، حيث يمكنك أيضًا تغيير البطاقة والاطلاع على فواتيرك). ويمكنك أيضًا مراسلة {MAIL} من بريد حسابك.","إذا حذفت حسابك في Hype أثناء سريان اشتراك، تذكّري إلغاءه: حذف الحساب لا يوقف الاقتطاع تلقائيًا. في Premium العائلة، يجب على صاحب الاشتراك الإلغاء أولًا."])),
 ("7. قواعد Premium العائلة", ul(["من يدفع هو <b>صاحب الاشتراك</b>. يدعو فارسًا ثانيًا من «حسابي» برابط صالح لمدة 7 أيام.","يحتفظ كل منهما بحسابه وبياناته وأسئلته الأربعة اليومية؛ لا شيء مشترك بين الحسابين.","يمكن لصاحب الاشتراك إزالة الفارس الثاني، ويمكن لهذا الأخير مغادرة العائلة. يُسمح بالاستبدال مرة واحدة كل 30 يومًا على الأكثر، وبأربعة فرسان ثانين مختلفين في السنة كحد أقصى.","لا تُشترط أي صلة قرابة. صاحب الاشتراك مسؤول عن اختيار الشخص المدعو.","إذا انتهى الاشتراك (إلغاء أو عدم دفع)، ينتهي الوصول إلى Premium للحسابين معًا."])),
 ("8. رعاية Hype", f"<p>مستويات الرعاية (من 20 € إلى 500 €) دعم طوعي لمرة واحدة لتطوير التطبيق. لا تمنح الوصول إلى Premium، وليست تبرعًا لجمعية FEINN، ولا تخوّل أي تخفيض ضريبي. ولا تُستردّ إلا في حال خطأ واضح يُبلَّغ عنه سريعًا إلى {MAIL}.</p>"),
 ("9. تشغيل الخدمة", "<p>تبذل الجمعية جهدها ليعمل Hype باستمرار، لكن قد تحدث انقطاعات (صيانة، عطل لدى مزوّد). إجابات مدرب الذكاء الاصطناعي نصائح عامة يُنتجها ذكاء اصطناعي: لا تغني عن مدرّب مؤهَّل ولا عن طبيب بيطري، وقد تحتوي على أخطاء.</p>"),
 ("10. البيانات الشخصية", f"<p>تُعالَج البيانات اللازمة للحساب والاشتراكات لتقديم الخدمة. يمكنك طلب الاطلاع على بياناتك أو حذفها بمراسلة {MAIL}.</p>"),
 ("11. الشكاوى والوساطة", f"<p>لأي شكوى، راسلي أولًا {MAIL}. وسيط الاستهلاك: قيد التعيين، وستُذكر بياناته هنا. وفي الأثناء يمكن توجيه أي شكوى إلى {MAIL}. ويمكنك أيضًا استخدام المنصة الأوروبية لتسوية النزاعات عبر الإنترنت.</p>"),
 ("12. القانون المطبّق", "<p>تخضع هذه الشروط للقانون الفرنسي. ويمكن تحديثها؛ والنسخة المطبّقة هي السارية يوم الدفع.</p>"),
 ])

T["zh"] = dict(
 title="销售条款", desc="Hype Premium 订阅与 Hype 赞助的销售条款。",
 sous="Hype Premium 订阅与 Hype 赞助 · 2026年10月15日版", asso="协会简介", foi="本页为译文，以法文版为准。",
 bref="<b>简要说明。</b>月度订阅没有绑定期限，可随时在线取消。Cercle Crystal 一次性支付，有效期 12 个月，不会自动续订。付款后即可立即使用：你提出立即使用，即表示放弃 14 天的撤回权。赞助是对应用的支持，不是对协会的捐赠。",
 s=[
 ("1. 销售方", f"<p>本条款适用于在 Hype 应用（2hype.fr）内向<b>{VEND}</b>（已依法申报登记的协会，{ADR}，由其会长 Blandine Pronost 代表）所做的购买。联系方式：{MAIL}。以下简称“协会”。</p>"),
 ("2. 服务内容", "<p>Hype 是一款为骑手打造的应用：Galop 课程与测验、马术护照、社区、马匹管理，以及人工智能教练“Hey Baby”。部分功能免费，其他功能仅限 Premium 订阅用户使用。本条款说明各项付费套餐的价格、支付、期限和取消方式。</p>"),
 ("3. 套餐与价格", "<p>价格以欧元标示。依据法国《税法总则》第 293 B 条，不适用增值税（TVA）。</p>" + tab([
   ["Premium 骑手","12,99 € / 月","月度，每月续订","1 个账户享有 Premium 权限，AI 教练：每天 4 个问题"],
   ["Premium 家庭","19,99 € / 月","月度，每月续订","2 个独立账户享有 Premium 权限（持有人和受邀的第二位骑手），AI 教练：每人每天 4 个问题"],
   ["Cercle Crystal","12 个月 99,99 €","12 个月，一次性支付，不自动续订","1 个账户享有 Premium 权限，AI 教练：每天 4 个问题"],
   ["Duo 套餐","24,99 € / 月","月度，每月续订","1 个账户享有 Premium + Hype AI，AI 教练：每天 20 个问题，含视频"],
   ["Hype AI","14,99 € / 月","月度，每月续订","AI 教练：每天最多 15 个问题，限 1 个账户。不含 Premium 权限。"]],
   ["套餐","价格","期限","包含内容"]) + "<p>向 AI 教练提问的次数按自然日计算，从午夜到午夜（巴黎时间）。当天未用完的问题不会顺延到第二天。协会可以为改进应用而调整套餐内容，但不会大幅减少你在当期已购买的内容。</p>"),
 ("4. 下单与支付", ul(["需要有 Hype 账户：订阅会在付款时已登录的账户上生效。付款前，应用会显示相关账户的邮箱地址，并要求你确认。","通过 Stripe 的安全页面使用银行卡付款。Hype 从不接触你的银行卡号。","月度套餐在订阅时扣款，之后每月同一日期扣款，直到取消为止。","如果某次月度付款失败，Premium 权限可能会被暂停，直至补缴。"])),
 ("5. 立即使用与撤回权", "<p>各套餐在付款后即可访问数字内容。付款前，应用会请你确认：你希望立即使用，并因此放弃 14 天的撤回权（法国《消费法典》第 L221-28 条第 13 项）。没有这项确认，付款页面不会打开。</p>"),
 ("6. 期限、续订与取消", ul(["<b>月度套餐</b>（Premium 骑手、Premium 家庭、Duo 套餐、Hype AI）：没有绑定期限。你可以随时取消；取消在已付费的当月结束时生效，在此之前仍可正常使用。已开始的月份不予退款。","<b>Cercle Crystal</b>：自付款起 12 个月，到期后权限自动终止，之后不会再扣款。",f"<b>如何取消</b>：随时可在线取消，在“我的账户”中点击“管理我的订阅”按钮（Stripe 的安全页面，你也可以在那里更换银行卡和查看发票）。你也可以用账户所用的邮箱给 {MAIL} 写信。","如果你在订阅仍有效时删除了 Hype 账户，请记得取消订阅：删除账户不会自动停止扣款。对于 Premium 家庭，必须由持有人先取消。"])),
 ("7. Premium 家庭的专属规则", ul(["付款的人是<b>持有人</b>。持有人在“我的账户”中邀请第二位骑手，邀请链接有效期为 7 天。","每个人保留各自的账户、数据以及每天 4 个 AI 问题；两个账户之间不共享任何内容。","持有人可以移除第二位骑手，第二位骑手也可以退出家庭。更换最多每 30 天一次，每年最多可更换为 4 位不同的第二位骑手。","不要求有亲属关系。持有人须对所邀请人员的选择负责。","如果订阅终止（取消或欠费），两个账户的 Premium 权限都会终止。"])),
 ("8. Hype 赞助", f"<p>赞助档位（20 € 至 500 €）是对应用开发的自愿支持，只需支付一次。赞助不提供 Premium 权限，不是对 FEINN 协会的捐赠，也不享受任何税收减免。赞助不可退款，但如有明显错误并及时告知 {MAIL}，则不在此限。</p>"),
 ("9. 服务运行", "<p>协会会尽力保证 Hype 持续运行，但可能出现中断（维护、服务提供商故障）。AI 教练的回答是由人工智能生成的一般性建议：它们不能取代持证教练或兽医，并且可能包含错误。</p>"),
 ("10. 个人数据", f"<p>处理账户和订阅所需的数据，是为了提供服务。你可以写信至 {MAIL}，请求查阅或删除你的数据。</p>"),
 ("11. 投诉与调解", f"<p>如有任何投诉，请先写信至 {MAIL}。消费调解员：正在指定中；其联系方式将在此处公布。在此期间，任何投诉都可以发送至 {MAIL}。你也可以使用欧盟在线争议解决平台。</p>"),
 ("12. 适用法律", "<p>本条款受法国法律管辖。条款可能会更新；适用的版本为付款当日有效的版本。</p>"),
 ])

T["nl"] = dict(
 title="Algemene verkoopvoorwaarden", desc="Algemene verkoopvoorwaarden voor Hype Premium-abonnementen en het Hype-mecenaat.",
 sous="Hype Premium-abonnementen en Hype-mecenaat · versie van 15 oktober 2026", asso="De vereniging", foi="Dit is een vertaling; de Franse versie is leidend.",
 bref="<b>In het kort.</b> Maandabonnementen zijn zonder verplichting en kun je op elk moment online opzeggen. De Cercle Crystal betaal je één keer voor 12 maanden, zonder automatische verlenging. De toegang is direct na betaling: door die te vragen, doe je afstand van de bedenktijd van 14 dagen. Het mecenaat is steun aan de app, geen donatie aan de vereniging.",
 s=[
 ("1. Wie verkoopt", f"<p>Deze voorwaarden gelden voor aankopen in de Hype-app (2hype.fr) bij de <b>{VEND}</b>, een in Frankrijk geregistreerde vereniging, {ADR}, vertegenwoordigd door haar voorzitster, Blandine Pronost. Contact: {MAIL}. Hierna “de vereniging”.</p>"),
 ("2. Doel", "<p>Hype is een app voor ruiters: lessen en quizzen van de Galop-niveaus, paardenpaspoort, community, het bijhouden van je paarden en de coach met kunstmatige intelligentie “Hey Baby”. Sommige functies zijn gratis; andere zijn alleen voor Premium-abonnees. Deze voorwaarden beschrijven de betaalde aanbiedingen, hun prijs, betaling, looptijd en opzegging.</p>"),
 ("3. Aanbiedingen en prijzen", "<p>De prijzen zijn in euro. Geen btw van toepassing, artikel 293 B van de Franse algemene belastingwet (Code général des impôts).</p>" + tab([
   ["Premium Ruiter","€12,99 / maand","maandelijks, elke maand verlengd","Premium-toegang voor 1 account, AI-coach: 4 vragen per dag"],
   ["Premium Familie","€19,99 / maand","maandelijks, elke maand verlengd","Premium-toegang voor 2 aparte accounts (de houder en een uitgenodigde tweede ruiter), AI-coach: 4 vragen per dag voor elk"],
   ["Cercle Crystal","€99,99 voor 12 maanden","12 maanden, eenmalige betaling, geen automatische verlenging","Premium-toegang voor 1 account, AI-coach: 4 vragen per dag"],
   ["Duopakket","€24,99 / maand","maandelijks, elke maand verlengd","Premium + Hype AI voor 1 account, AI-coach: 20 vragen per dag, video’s inbegrepen"],
   ["Hype AI","€14,99 / maand","maandelijks, elke maand verlengd","AI-coach: tot 15 vragen per dag, voor 1 account. Geeft geen toegang tot Premium."]],
   ["Aanbieding","Prijs","Looptijd","Wat erbij zit"]) + "<p>Vragen aan de AI-coach worden per dag geteld, van middernacht tot middernacht (Parijse tijd). Ongebruikte vragen worden niet overgedragen naar de volgende dag. De vereniging mag de inhoud van de aanbiedingen aanpassen om de app te verbeteren, zonder het voor de lopende periode gekochte aanzienlijk te verminderen.</p>"),
 ("4. Bestelling en betaling", ul(["Een Hype-account is nodig: het abonnement wordt geactiveerd op het account waarmee je op het moment van betalen bent ingelogd. Voordat je betaalt, toont de app het e-mailadres van het account en vraagt ze je dat te bevestigen.","De betaling gebeurt met een kaart op de beveiligde pagina van Stripe. Hype heeft nooit toegang tot kaartnummers.","Bij maandabonnementen wordt de betaling afgeschreven bij het afsluiten en daarna elke maand op dezelfde datum, tot de opzegging.","Als een maandelijkse betaling mislukt, kan de Premium-toegang worden opgeschort tot de betaling is geregeld."])),
 ("5. Directe toegang en herroepingsrecht", "<p>De aanbiedingen geven vanaf de betaling toegang tot digitale inhoud. Voordat je betaalt, vraagt de app je te bevestigen dat je deze directe toegang wilt en dat je daarmee afstand doet van je herroepingsrecht van 14 dagen (artikel L221-28, 13° van de Franse Code de la consommation). Zonder deze bevestiging gaat de betaling niet open.</p>"),
 ("6. Looptijd, verlenging en opzegging", ul(["<b>Maandabonnementen</b> (Premium Ruiter, Premium Familie, Duopakket, Hype AI): zonder verplichting. Je kunt op elk moment opzeggen; de opzegging gaat in aan het einde van de al betaalde maand en de toegang blijft tot dan open. Een begonnen maand wordt niet terugbetaald.","<b>Cercle Crystal</b>: 12 maanden vanaf de betaling, daarna stopt de toegang vanzelf. Er wordt daarna niets meer afgeschreven.",f"<b>Zo zeg je op</b>: online, op elk moment, met de knop “Beheer mijn abonnement” in Mijn account (beveiligde pagina van Stripe, waar je ook je kaart kunt wijzigen en je facturen kunt vinden). Je kunt ook mailen naar {MAIL} vanaf het e-mailadres van je account.","Als je je Hype-account verwijdert terwijl er een abonnement loopt, denk er dan aan het op te zeggen: het verwijderen van het account stopt de afschrijving niet automatisch. Bij Premium Familie moet de houder eerst opzeggen."])),
 ("7. Regels voor Premium Familie", ul(["Wie betaalt, is de <b>houder</b>. De houder nodigt via Mijn account een tweede ruiter uit, met een link die 7 dagen geldig is.","Ieder houdt een eigen account, eigen gegevens en eigen 4 AI-vragen per dag; er wordt niets gedeeld tussen de twee accounts.","De houder kan de tweede ruiter verwijderen en de tweede ruiter kan de familie verlaten. Een vervanging kan hooguit één keer per 30 dagen, met hooguit 4 verschillende tweede ruiters per jaar.","Een familieband is niet vereist. De houder is verantwoordelijk voor de keuze van de uitgenodigde persoon.","Als het abonnement stopt (opzegging, wanbetaling), stopt de Premium-toegang voor beide accounts."])),
 ("8. Hype-mecenaat", f"<p>De mecenaatsniveaus (van €20 tot €500) zijn een vrijwillige, eenmalige steun voor de ontwikkeling van de app. Ze geven geen toegang tot Premium, zijn geen donatie aan de vereniging FEINN en geven geen recht op belastingaftrek. Ze worden niet terugbetaald, behalve bij een kennelijke fout die snel wordt gemeld aan {MAIL}.</p>"),
 ("9. Werking van de dienst", "<p>De vereniging doet haar best om Hype onafgebroken te laten werken, maar er kunnen onderbrekingen voorkomen (onderhoud, storing bij een leverancier). De antwoorden van de AI-coach zijn algemene adviezen die door kunstmatige intelligentie worden gemaakt: ze vervangen geen gediplomeerde instructeur en geen dierenarts en kunnen fouten bevatten.</p>"),
 ("10. Persoonsgegevens", f"<p>De gegevens die nodig zijn voor het account en de abonnementen worden verwerkt om de dienst te leveren. Je kunt inzage in je gegevens of verwijdering ervan vragen door te mailen naar {MAIL}.</p>"),
 ("11. Klachten en bemiddeling", f"<p>Stuur bij een klacht eerst een mail naar {MAIL}. Consumentenbemiddelaar: wordt nog aangewezen; de gegevens komen hier te staan. Tot die tijd kan elke klacht worden gestuurd naar {MAIL}. Je kunt ook gebruikmaken van het Europese platform voor onlinegeschillenbeslechting.</p>"),
 ("12. Toepasselijk recht", "<p>Op deze voorwaarden is het Franse recht van toepassing. Ze kunnen worden bijgewerkt; de toepasselijke versie is die welke op de dag van de betaling geldt.</p>"),
 ])

T["pt"] = dict(
 title="Condições Gerais de Venda", desc="Condições Gerais de Venda das assinaturas Hype Premium e do mecenato Hype.",
 sous="Assinaturas Hype Premium e mecenato Hype · versão de 15 de outubro de 2026", asso="A associação", foi="Esta é uma tradução; a versão em francês prevalece.",
 bref="<b>Em resumo.</b> As assinaturas mensais não têm fidelidade e podem ser canceladas on-line a qualquer momento. O Círculo Crystal é pago uma única vez por 12 meses, sem renovação automática. O acesso é imediato após o pagamento: ao solicitá-lo, você renuncia ao prazo de retratação de 14 dias. O mecenato é um apoio ao aplicativo, não uma doação à associação.",
 s=[
 ("1. Quem vende", f"<p>Estas condições se aplicam às compras feitas no aplicativo Hype (2hype.fr) junto à <b>{VEND}</b>, associação declarada, {ADR}, representada por sua presidente, Blandine Pronost. Contato: {MAIL}. A seguir, “a associação”.</p>"),
 ("2. Objeto", "<p>O Hype é um aplicativo para cavaleiros e amazonas: aulas e quizzes dos Galops, passaporte equestre, comunidade, acompanhamento dos cavalos e coach de inteligência artificial “Hey Baby”. Algumas funções são gratuitas; outras são reservadas aos assinantes Premium. Estas condições descrevem as ofertas pagas, seu preço, pagamento, duração e cancelamento.</p>"),
 ("3. As ofertas e seus preços", "<p>Os preços são indicados em euros. IVA não aplicável, artigo 293 B do Código Geral de Impostos francês.</p>" + tab([
   ["Premium Cavaleiro","€ 12,99 / mês","mensal, renovada a cada mês","Acesso Premium para 1 conta, coach de IA: 4 perguntas por dia"],
   ["Premium Família","€ 19,99 / mês","mensal, renovada a cada mês","Acesso Premium para 2 contas separadas (o titular e um segundo cavaleiro convidado), coach de IA: 4 perguntas por dia para cada um"],
   ["Círculo Crystal","€ 99,99 por 12 meses","12 meses, pagamento único, sem renovação automática","Acesso Premium para 1 conta, coach de IA: 4 perguntas por dia"],
   ["Pacote Duo","€ 24,99 / mês","mensal, renovada a cada mês","Acesso Premium + Hype IA para 1 conta, coach de IA: 20 perguntas por dia, vídeos incluídos"],
   ["Hype IA","€ 14,99 / mês","mensal, renovada a cada mês","Coach de IA: até 15 perguntas por dia, para 1 conta. Não dá acesso ao Premium."]],
   ["Oferta","Preço","Duração","O que inclui"]) + "<p>As perguntas ao coach de IA são contadas por dia, da meia-noite à meia-noite (horário de Paris). Uma pergunta não utilizada não é transferida para o dia seguinte. A associação pode alterar o conteúdo das ofertas para melhorar o aplicativo, sem reduzir de forma significativa o que foi comprado durante o período em curso.</p>"),
 ("4. Pedido e pagamento", ul(["É necessária uma conta Hype: a assinatura é ativada na conta conectada no momento do pagamento. Antes de pagar, o aplicativo exibe o endereço da conta em questão e pede que você o confirme.","O pagamento é feito por cartão bancário na página segura da Stripe. O Hype nunca tem acesso aos números de cartão.","Nas ofertas mensais, o pagamento é cobrado na contratação e depois a cada mês na mesma data, até o cancelamento.","Se um pagamento mensal falhar, o acesso Premium poderá ser suspenso até a regularização."])),
 ("5. Acesso imediato e direito de retratação", "<p>As ofertas dão acesso a um conteúdo digital a partir do pagamento. Antes de pagar, o aplicativo pede que você confirme que deseja esse acesso imediato e que, com isso, renuncia ao seu direito de retratação de 14 dias (artigo L221-28, 13º do Código de Defesa do Consumidor francês). Sem essa confirmação, o pagamento não é aberto.</p>"),
 ("6. Duração, renovação e cancelamento", ul(["<b>Ofertas mensais</b> (Premium Cavaleiro, Premium Família, Pacote Duo, Hype IA): sem fidelidade. Você pode cancelar a qualquer momento; o cancelamento produz efeito ao final do mês já pago, e o acesso permanece aberto até lá. Nenhum mês iniciado é reembolsado.","<b>Círculo Crystal</b>: 12 meses a partir do pagamento, depois o acesso se encerra por si só. Nada é cobrado em seguida.",f"<b>Como cancelar</b>: on-line, a qualquer momento, com o botão “Gerenciar minha assinatura” em Minha conta (página segura da Stripe, onde você também pode trocar de cartão e encontrar suas faturas). Você também pode escrever para {MAIL} a partir do endereço da sua conta.","Se você excluir sua conta Hype enquanto houver uma assinatura em andamento, lembre-se de cancelá-la: a exclusão da conta não interrompe automaticamente a cobrança. No Premium Família, o titular deve cancelar primeiro."])),
 ("7. Regras específicas do Premium Família", ul(["A pessoa que paga é o <b>titular</b>. Ela convida um segundo cavaleiro a partir de Minha conta, com um link válido por 7 dias.","Cada um mantém sua própria conta, seus dados e suas 4 perguntas de IA por dia; nada é compartilhado entre as duas contas.","O titular pode remover o segundo cavaleiro, e este pode sair da família. Uma substituição é possível no máximo uma vez a cada 30 dias, com no máximo 4 segundos cavaleiros diferentes por ano.","Nenhum parentesco é exigido. O titular é responsável pela escolha da pessoa convidada.","Se a assinatura terminar (cancelamento, inadimplência), o acesso Premium termina para as duas contas."])),
 ("8. Mecenato do Hype", f"<p>Os níveis de mecenato (de € 20 a € 500) são um apoio voluntário ao desenvolvimento do aplicativo, pago uma única vez. Eles não dão acesso ao Premium, não são uma doação à associação FEINN e não dão direito a nenhuma redução de imposto. Não são reembolsáveis, salvo erro manifesto comunicado rapidamente a {MAIL}.</p>"),
 ("9. Funcionamento do serviço", "<p>A associação faz o possível para que o Hype funcione de forma contínua, mas podem ocorrer interrupções (manutenção, falha de um prestador). As respostas do coach de IA são conselhos gerais produzidos por uma inteligência artificial: não substituem um instrutor habilitado nem um veterinário e podem conter erros.</p>"),
 ("10. Dados pessoais", f"<p>Os dados necessários para a conta e as assinaturas são tratados para fornecer o serviço. Você pode solicitar o acesso aos seus dados ou a exclusão deles escrevendo para {MAIL}.</p>"),
 ("11. Reclamações e mediação", f"<p>Para qualquer reclamação, escreva primeiro para {MAIL}. Mediador de consumo: em fase de designação; seus dados de contato serão indicados aqui. Enquanto isso, qualquer reclamação pode ser enviada para {MAIL}. Você também pode usar a plataforma europeia de resolução de litígios on-line.</p>"),
 ("12. Lei aplicável", "<p>Estas condições estão sujeitas ao direito francês. Podem ser atualizadas; a versão aplicável é a vigente no dia do pagamento.</p>"),
 ])

CSS = """:root{--noir:#05080B;--carte:#0B1418;--ivoire:#F3EEE4;--doux:#B7C2C0;--gris:#8E9893;--champ:#C9A66B;--trait:rgba(201,166,107,.32);--trait2:rgba(201,166,107,.16)}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
body{margin:0;background:var(--noir);color:var(--ivoire);font:15px/1.7 Montserrat,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;overflow-x:hidden}
a{color:var(--champ)}
.wrap{max-width:820px;margin:0 auto;padding:max(18px,env(safe-area-inset-top)) max(16px,env(safe-area-inset-right)) 48px max(16px,env(safe-area-inset-left))}
.haut{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:26px;flex-wrap:wrap}
.haut a{font-size:13px;text-decoration:none;border:1px solid var(--trait);border-radius:999px;padding:7px 14px;color:var(--ivoire)}
.sur{font-size:11px;letter-spacing:.32em;text-transform:uppercase;color:var(--champ);margin:0 0 6px}
h1{font:500 clamp(32px,8vw,46px)/1.1 "Cormorant Garamond",Georgia,serif;margin:0 0 8px}
.maj{color:var(--gris);font-size:12.5px;margin:0 0 26px}
h2{font:500 24px/1.2 "Cormorant Garamond",Georgia,serif;margin:34px 0 10px;padding-top:16px;border-top:1px solid var(--trait2)}
p,li{color:var(--doux);font-size:14.5px}
ul{padding-inline-start:20px}li{margin:4px 0}
b{color:var(--ivoire);font-weight:500}
table{width:100%;border-collapse:collapse;font-size:13.5px;margin:10px 0}
th,td{text-align:start;padding:9px 8px;border-bottom:1px solid var(--trait2);vertical-align:top}
th{color:var(--ivoire);font-weight:500}td{color:var(--doux)}
.tab{overflow-x:auto}
.encadre{background:var(--carte);border:1px solid var(--trait2);border-radius:14px;padding:14px 16px;margin:14px 0}
.langues{display:flex;flex-wrap:wrap;gap:8px 14px;justify-content:center;margin-top:30px;font-size:12.5px}
.langues a{text-decoration:none}.langues b{color:var(--ivoire)}
.fin{margin-top:18px;color:var(--gris);font-size:12.5px;text-align:center}"""

HL = {"zh": "zh-Hans", "pt": "pt-BR"}  # code de langue HTML/hreflang quand il diffère du dossier
def page(lg):
    t = T[lg]; e = html.escape
    dirr = ' dir="rtl"' if lg == "ar" else ""
    alt = "\n".join(f'<link rel="alternate" hreflang="{HL.get(l,l)}" href="https://2hype.fr/{l}/cgv/">' for l in LANGUES)
    corps = "".join(f"<h2>{e(titre)}</h2>\n{contenu}\n" for titre, contenu in t["s"])
    langues = " · ".join((f"<b>{NOMS[l]}</b>" if l == lg else f'<a href="/{l}/cgv/" lang="{HL.get(l,l)}">{NOMS[l]}</a>') for l in LANGUES)
    foi = f'<p class="maj">{e(t["foi"])}</p>' if t["foi"] else ""
    return f"""<!doctype html>
<html lang="{HL.get(lg,lg)}"{dirr}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(t["title"])} | Hype</title>
<meta name="description" content="{e(t["desc"])}">
<link rel="canonical" href="https://2hype.fr/{lg}/cgv/">
{alt}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Montserrat:wght@400;500;600&display=swap">
<style>
{CSS}
</style>
</head>
<body>
<div class="wrap">
<div class="haut"><a href="/">{"›" if lg=="ar" else "‹"} Hype</a><a href="/{lg}/association/">{e(t["asso"])}</a></div>
<p class="sur">Hype</p>
<h1>{e(t["title"])}</h1>
<p class="maj">{e(t["sous"])}</p>
{foi}
<div class="encadre"><p>{t["bref"]}</p></div>
{corps}
<nav class="langues" aria-label="Langues">{langues}</nav>
<p class="fin">Hype · {MAIL}</p>
</div>
</body>
</html>
"""
if __name__ == "__main__":
    racine = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
    for lg in LANGUES:
        assert len(T[lg]["s"]) == 12, lg
        d = os.path.join(racine, lg, "cgv"); os.makedirs(d, exist_ok=True)
        open(os.path.join(d, "index.html"), "w", encoding="utf-8").write(page(lg))
        print("écrit", lg)
