# Page publique « L'association » (FEINN Équitation et Environnement), 7 langues — d'après la maquette validée le 13/10.
import os, json, html, sys
RACINE = sys.argv[1] if len(sys.argv) > 1 else "/home/claude/hype"
DOM="https://2hype.fr"; CHEMIN="association/"
L=["fr","en","es","it","de","ja","ar","zh","nl","pt","sv","ru","pl"]
HL={"zh":"zh-Hans","pt":"pt-BR"}  # code de langue HTML/hreflang quand il diffère du dossier
NOMS={"fr":"Français","en":"English","es":"Español","it":"Italiano","de":"Deutsch","ja":"日本語","ar":"العربية","zh":"中文","nl":"Nederlands","pt":"Português","sv":"Svenska","ru":"Русский","pl":"Polski"}
LOC={"fr":"fr_FR","en":"en_GB","es":"es_ES","it":"it_IT","de":"de_DE","ja":"ja_JP","ar":"ar_AR","zh":"zh_CN","nl":"nl_NL","pt":"pt_BR","sv":"sv_SE","ru":"ru_RU","pl":"pl_PL"}
e=html.escape
# Photos : fichiers à déposer par Blandine dans images/asso/ ; tant qu'ils manquent → emplacement sobre
PHOTOS={k:f"images/asso/{k}.jpg" for k in ["hero","jeune","retraite","espaces"]}
# 14/10 : en attendant les vraies photos de FEINN, images de Hype deja dans le depot (Blandine : « le visuel est hard », cadres vides)
PHOTOS_ATTENTE={"hero":"images/fond-cavaliers-ecurie.webp","jeune":"images/team-competition-performances-hero.webp","retraite":"images/fond-recit.webp","espaces":"images/ecurie-couverture-defaut-2.webp"}
for _k in list(PHOTOS):
    if not os.path.exists(os.path.join(RACINE,PHOTOS[_k])) and os.path.exists(os.path.join(RACINE,PHOTOS_ATTENTE[_k])): PHOTOS[_k]=PHOTOS_ATTENTE[_k]
def photo(k): return os.path.exists(os.path.join(RACINE,PHOTOS[k]))
ICO={
 "cap":'<path d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Z"/><path d="M7 11.6V16c0 1.3 2.2 2.5 5 2.5s5-1.2 5-2.5v-4.4"/><path d="M21 9.5v5"/>',
 "fer":'<path d="M7 4.5C4.6 6.3 4 9 4 11.5 4 16 7.6 19.5 12 19.5s8-3.5 8-8c0-2.5-.6-5.2-3-7"/><path d="M7 4.5 8.6 8M17 4.5 15.4 8"/><circle cx="6.4" cy="12" r=".6"/><circle cx="17.6" cy="12" r=".6"/><circle cx="8.2" cy="16" r=".6"/><circle cx="15.8" cy="16" r=".6"/>',
 "coeur":'<path d="M12 19.5s-7.5-4.4-7.5-10A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7.5 2.3c0 5.6-7.5 10-7.5 10Z"/>',
 "pousse":'<path d="M12 20v-8"/><path d="M12 12c0-3.6 2.6-6.3 6.5-6.5.1 3.8-2.6 6.5-6.5 6.5Z"/><path d="M12 14.5c0-2.8-2-5-5.2-5.1-.1 3 2.1 5.1 5.2 5.1Z"/>',
 "arbre":'<path d="M12 21v-6"/><path d="M12 3c-3 0-5 2.4-5 5 0 .6.1 1.1.3 1.6A4 4 0 0 0 8.5 17h7a4 4 0 0 0 1.2-7.4c.2-.5.3-1 .3-1.6 0-2.6-2-5-5-5Z"/>',
 "maison":'<path d="M4 20h16M6 20V10l6-4 6 4v10"/><path d="M10 20v-5h4v5"/>',
 "perso":'<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/>',
 "mail":'<rect x="3.5" y="6" width="17" height="12" rx="1.5"/><path d="m4 7 8 6 8-6"/>',
 "serveur":'<rect x="4.5" y="4.5" width="15" height="6" rx="1.2"/><rect x="4.5" y="13.5" width="15" height="6" rx="1.2"/><path d="M8 7.5h.01M8 16.5h.01"/>',
 "bouclier":'<path d="M12 3.5 5 6v5.5c0 4.2 3 7.6 7 9 4-1.4 7-4.8 7-9V6l-7-2.5Z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
 "doc":'<path d="M7 3.5h7l4 4v13H7z"/><path d="M14 3.5v4h4M9.5 12h6M9.5 15h6M9.5 18h4"/>',
 "retour":'<path d="m14.5 6-6 6 6 6"/>',
 "photo":'<rect x="3.5" y="6" width="17" height="13" rx="2"/><circle cx="12" cy="12.5" r="3.3"/><path d="M9 6l1.3-2h3.4L15 6"/>',
}
def svg(k,cls="ico"): return f'<svg class="{cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICO[k]}</svg>'

T={}
T["fr"]=dict(title="L'association FEINN Équitation et Environnement | Hype",
 desc="Depuis 2020, l'association FEINN Équitation et Environnement rassemble des passionnés autour du cheval, de la transmission et du respect de la nature. Ses missions, ses projets et ses mentions légales.",
 sur="L'association", sous="Équitation et Environnement", retour="Accueil", langue="Langue", photo="Photo FEINN à venir",
 notre="Notre association",
 intro=["Depuis 2020, l'association FEINN Équitation et Environnement rassemble des passionnés autour du cheval, de la transmission et du respect de la nature.",
        "Nous œuvrons pour une équitation attentive au bien-être des chevaux et à leur environnement, à travers l'enseignement, l'accompagnement de jeunes cavaliers en compétition, l'accueil de chevaux de club à la retraite, un petit élevage et la préservation de notre site naturel.",
        "L'association édite aussi Hype, l'application des cavaliers : les abonnements Hype+ financent ses activités et ses projets."],
 missions=["Enseignement de l'équitation","Accompagnement des jeunes espoirs","Retraite des chevaux de club","Petit élevage","Environnement et préservation du site"],
 citation1="Le cheval, un lien entre les hommes et la nature",
 projets_t="Nos projets à soutenir",
 projets_intro="Ces projets nous tiennent particulièrement à cœur et font vivre les valeurs de l'association. Ils sont présentés ici pour faire connaître nos engagements.",
 projets=[("Un cheval pour un jeune espoir","Accompagner un jeune cavalier prometteur qui ne dispose pas aujourd'hui des moyens nécessaires pour acquérir un cheval de niveau professionnel. Ce projet lui permettrait de préparer son diplôme d'enseignant d'équitation (DE) et de poursuivre sa progression dans les épreuves Pro."),
          ("La retraite de nos chevaux de club","Prendre soin des chevaux qui ont accompagné des générations de cavaliers et qui profitent aujourd'hui d'une retraite paisible à l'écurie. Leur assurer une retraite sereine implique de continuer à veiller à leur alimentation, à leurs soins et à leur bien-être."),
          ("Entretenir et réhabiliter nos espaces","Réhabiliter les clôtures, les prés et les installations du site pour offrir aux chevaux un cadre de vie adapté, tout en entretenant et en préservant les espaces naturels qui nous entourent.")],
 citation2="Préserver aujourd'hui pour demain…",
 ml_t="Mentions légales",
 editeur="Éditeur", editeur_v=["Association FEINN Équitation et Environnement","Association déclarée","3 chemin des Prés Picard","91760 Itteville, France","SIREN : 898 028 980"],
 resp="Responsable de la publication", resp_v=["Blandine Pronost","Présidente de l'association"],
 contact="Contact", hebergeur="Hébergeur", heb_v=["Netlify, Inc.","101 2nd Street, Suite 575","San Francisco, CA, États-Unis","Téléphone : +1 415 691 1573"],
 donnees="Données personnelles", donnees_v="Les utilisateurs peuvent demander l'accès à leurs données personnelles ou leur suppression en contactant l'association.",
 abos="Abonnements", abos_v="Les informations relatives aux abonnements et à la gestion des paiements sont précisées dans les conditions applicables à Hype.",
 decouvrir="Découvrir Hype")
T["en"]=dict(title="The FEINN Équitation et Environnement association | Hype",
 desc="Since 2020, the FEINN Équitation et Environnement association has brought together people who share a passion for horses, for passing on knowledge and for respecting nature. Its missions, projects and legal notice.",
 sur="The association", sous="Équitation et Environnement", retour="Home", langue="Language", photo="FEINN photo coming soon",
 notre="Our association",
 intro=["Since 2020, the FEINN Équitation et Environnement association has brought together people who share a passion for horses, for passing on knowledge and for respecting nature.",
        "We work for a way of riding that cares about the horses' well-being and their environment, through teaching, supporting young riders in competition, welcoming retired riding-school horses, a small breeding programme and preserving our natural site.",
        "The association also publishes Hype, the app for riders: Hype+ subscriptions fund its activities and projects."],
 missions=["Riding lessons","Supporting young talents","Retirement for riding-school horses","Small breeding programme","Environment and care for the site"],
 citation1="The horse, a bond between people and nature",
 projets_t="Our projects to support",
 projets_intro="These projects are especially close to our hearts and bring the association's values to life. They are presented here to share our commitments.",
 projets=[("A horse for a young talent","Supporting a promising young rider who does not currently have the means to acquire a professional-level horse. This project would allow him to prepare his riding instructor diploma (DE) and keep progressing in Pro classes."),
          ("Retirement for our riding-school horses","Caring for the horses that have accompanied generations of riders and now enjoy a peaceful retirement at the stable. Giving them a serene retirement means continuing to look after their feeding, their care and their well-being."),
          ("Maintaining and restoring our grounds","Restoring the fences, fields and facilities of the site to give the horses a suitable living environment, while maintaining and preserving the natural spaces around us.")],
 citation2="Preserving today for tomorrow…",
 ml_t="Legal notice",
 editeur="Publisher", editeur_v=["FEINN Équitation et Environnement association","Registered non-profit association (French law of 1901)","3 chemin des Prés Picard","91760 Itteville, France","SIREN: 898 028 980"],
 resp="Publication director", resp_v=["Blandine Pronost","President of the association"],
 contact="Contact", hebergeur="Hosting", heb_v=["Netlify, Inc.","101 2nd Street, Suite 575","San Francisco, CA, United States","Phone: +1 415 691 1573"],
 donnees="Personal data", donnees_v="Users can ask to access or delete their personal data by contacting the association.",
 abos="Subscriptions", abos_v="Information about subscriptions and payment management is set out in the terms applicable to Hype.",
 decouvrir="Discover Hype")
T["es"]=dict(title="La asociación FEINN Équitation et Environnement | Hype",
 desc="Desde 2020, la asociación FEINN Équitation et Environnement reúne a apasionados del caballo, de la transmisión y del respeto por la naturaleza. Sus misiones, sus proyectos y su aviso legal.",
 sur="La asociación", sous="Équitation et Environnement", retour="Inicio", langue="Idioma", photo="Foto de FEINN próximamente",
 notre="Nuestra asociación",
 intro=["Desde 2020, la asociación FEINN Équitation et Environnement reúne a apasionados del caballo, de la transmisión y del respeto por la naturaleza.",
        "Trabajamos por una equitación atenta al bienestar de los caballos y a su entorno, a través de la enseñanza, el acompañamiento de jóvenes jinetes en competición, la acogida de caballos de escuela jubilados, una pequeña cría y la preservación de nuestro entorno natural.",
        "La asociación edita también Hype, la aplicación de los jinetes: las suscripciones Hype+ financian sus actividades y sus proyectos."],
 missions=["Enseñanza de la equitación","Apoyo a las jóvenes promesas","Jubilación de los caballos de escuela","Pequeña cría","Medio ambiente y cuidado del lugar"],
 citation1="El caballo, un vínculo entre las personas y la naturaleza",
 projets_t="Nuestros proyectos que apoyar",
 projets_intro="Estos proyectos nos importan especialmente y dan vida a los valores de la asociación. Se presentan aquí para dar a conocer nuestros compromisos.",
 projets=[("Un caballo para una joven promesa","Acompañar a un joven jinete prometedor que hoy no dispone de los medios necesarios para adquirir un caballo de nivel profesional. Este proyecto le permitiría preparar su título de instructor de equitación (DE) y seguir progresando en las pruebas Pro."),
          ("La jubilación de nuestros caballos de escuela","Cuidar de los caballos que han acompañado a generaciones de jinetes y que hoy disfrutan de una jubilación tranquila en la cuadra. Asegurarles una jubilación serena implica seguir velando por su alimentación, sus cuidados y su bienestar."),
          ("Mantener y rehabilitar nuestros espacios","Rehabilitar las cercas, los prados y las instalaciones para ofrecer a los caballos un entorno de vida adecuado, manteniendo y preservando los espacios naturales que nos rodean.")],
 citation2="Preservar hoy para mañana…",
 ml_t="Aviso legal",
 editeur="Editor", editeur_v=["Asociación FEINN Équitation et Environnement","Asociación declarada sin ánimo de lucro (ley francesa de 1901)","3 chemin des Prés Picard","91760 Itteville, Francia","SIREN: 898 028 980"],
 resp="Responsable de la publicación", resp_v=["Blandine Pronost","Presidenta de la asociación"],
 contact="Contacto", hebergeur="Alojamiento", heb_v=["Netlify, Inc.","101 2nd Street, Suite 575","San Francisco, CA, Estados Unidos","Teléfono: +1 415 691 1573"],
 donnees="Datos personales", donnees_v="Los usuarios pueden solicitar el acceso a sus datos personales o su supresión poniéndose en contacto con la asociación.",
 abos="Suscripciones", abos_v="La información sobre las suscripciones y la gestión de los pagos se detalla en las condiciones aplicables a Hype.",
 decouvrir="Descubrir Hype")
T["it"]=dict(title="L'associazione FEINN Équitation et Environnement | Hype",
 desc="Dal 2020 l'associazione FEINN Équitation et Environnement riunisce appassionati del cavallo, della trasmissione del sapere e del rispetto della natura. Le sue missioni, i progetti e le note legali.",
 sur="L'associazione", sous="Équitation et Environnement", retour="Home", langue="Lingua", photo="Foto FEINN in arrivo",
 notre="La nostra associazione",
 intro=["Dal 2020 l'associazione FEINN Équitation et Environnement riunisce appassionati del cavallo, della trasmissione del sapere e del rispetto della natura.",
        "Lavoriamo per un'equitazione attenta al benessere dei cavalli e al loro ambiente, attraverso l'insegnamento, l'accompagnamento di giovani cavalieri in gara, l'accoglienza di cavalli di scuola in pensione, un piccolo allevamento e la tutela del nostro sito naturale.",
        "L'associazione pubblica anche Hype, l'app dei cavalieri: gli abbonamenti Hype+ finanziano le sue attività e i suoi progetti."],
 missions=["Insegnamento dell'equitazione","Sostegno alle giovani promesse","Pensione dei cavalli di scuola","Piccolo allevamento","Ambiente e tutela del sito"],
 citation1="Il cavallo, un legame tra le persone e la natura",
 projets_t="I nostri progetti da sostenere",
 projets_intro="Questi progetti ci stanno particolarmente a cuore e danno vita ai valori dell'associazione. Sono presentati qui per far conoscere il nostro impegno.",
 projets=[("Un cavallo per una giovane promessa","Accompagnare un giovane cavaliere promettente che oggi non dispone dei mezzi necessari per acquistare un cavallo di livello professionale. Questo progetto gli permetterebbe di preparare il diploma di istruttore di equitazione (DE) e di continuare a progredire nelle prove Pro."),
          ("La pensione dei nostri cavalli di scuola","Prendersi cura dei cavalli che hanno accompagnato generazioni di cavalieri e che oggi si godono una pensione serena in scuderia. Garantire loro una pensione tranquilla significa continuare a vegliare sulla loro alimentazione, sulle loro cure e sul loro benessere."),
          ("Curare e rinnovare i nostri spazi","Rinnovare recinzioni, prati e strutture del sito per offrire ai cavalli un ambiente di vita adatto, curando e preservando gli spazi naturali che ci circondano.")],
 citation2="Preservare oggi per domani…",
 ml_t="Note legali",
 editeur="Editore", editeur_v=["Associazione FEINN Équitation et Environnement","Associazione dichiarata senza scopo di lucro (legge francese del 1901)","3 chemin des Prés Picard","91760 Itteville, Francia","SIREN: 898 028 980"],
 resp="Responsabile della pubblicazione", resp_v=["Blandine Pronost","Presidente dell'associazione"],
 contact="Contatto", hebergeur="Hosting", heb_v=["Netlify, Inc.","101 2nd Street, Suite 575","San Francisco, CA, Stati Uniti","Telefono: +1 415 691 1573"],
 donnees="Dati personali", donnees_v="Gli utenti possono chiedere l'accesso ai propri dati personali o la loro cancellazione contattando l'associazione.",
 abos="Abbonamenti", abos_v="Le informazioni sugli abbonamenti e sulla gestione dei pagamenti sono indicate nelle condizioni applicabili a Hype.",
 decouvrir="Scopri Hype")
T["de"]=dict(title="Der Verein FEINN Équitation et Environnement | Hype",
 desc="Seit 2020 vereint der Verein FEINN Équitation et Environnement Menschen, die das Pferd, die Weitergabe von Wissen und die Achtung der Natur verbindet. Seine Aufgaben, Projekte und das Impressum.",
 sur="Der Verein", sous="Équitation et Environnement", retour="Startseite", langue="Sprache", photo="FEINN-Foto folgt",
 notre="Unser Verein",
 intro=["Seit 2020 vereint der Verein FEINN Équitation et Environnement Menschen, die das Pferd, die Weitergabe von Wissen und die Achtung der Natur verbindet.",
        "Wir setzen uns für ein Reiten ein, das auf das Wohl der Pferde und ihre Umwelt achtet: durch Unterricht, die Begleitung junger Turnierreiter, die Aufnahme von Schulpferden im Ruhestand, eine kleine Zucht und den Schutz unseres naturnahen Geländes.",
        "Der Verein gibt auch Hype heraus, die App für Reiter: Die Hype+-Abonnements finanzieren seine Aktivitäten und Projekte."],
 missions=["Reitunterricht","Förderung junger Talente","Ruhestand für Schulpferde","Kleine Zucht","Umwelt und Pflege des Geländes"],
 citation1="Das Pferd, ein Band zwischen Mensch und Natur",
 projets_t="Unsere Projekte zum Unterstützen",
 projets_intro="Diese Projekte liegen uns besonders am Herzen und machen die Werte des Vereins lebendig. Sie werden hier vorgestellt, um unser Engagement bekannt zu machen.",
 projets=[("Ein Pferd für ein junges Talent","Einen vielversprechenden jungen Reiter begleiten, dem heute die Mittel fehlen, um ein Pferd auf Profiniveau zu erwerben. Dieses Projekt würde es ihm ermöglichen, sein Reitlehrerdiplom (DE) vorzubereiten und sich in Profi-Prüfungen weiterzuentwickeln."),
          ("Der Ruhestand unserer Schulpferde","Für die Pferde sorgen, die Generationen von Reitern begleitet haben und heute einen ruhigen Lebensabend im Stall genießen. Ihnen einen gelassenen Ruhestand zu sichern heißt, weiterhin auf ihre Fütterung, ihre Pflege und ihr Wohlbefinden zu achten."),
          ("Unser Gelände pflegen und erneuern","Zäune, Weiden und Anlagen des Geländes erneuern, um den Pferden ein passendes Lebensumfeld zu bieten, und dabei die umgebenden Naturflächen pflegen und erhalten.")],
 citation2="Heute bewahren für morgen…",
 ml_t="Impressum",
 editeur="Herausgeber", editeur_v=["Verein FEINN Équitation et Environnement","Eingetragener gemeinnütziger Verein (französisches Gesetz von 1901)","3 chemin des Prés Picard","91760 Itteville, Frankreich","SIREN: 898 028 980"],
 resp="Verantwortlich für den Inhalt", resp_v=["Blandine Pronost","Präsidentin des Vereins"],
 contact="Kontakt", hebergeur="Hosting", heb_v=["Netlify, Inc.","101 2nd Street, Suite 575","San Francisco, CA, USA","Telefon: +1 415 691 1573"],
 donnees="Personenbezogene Daten", donnees_v="Nutzer können beim Verein Auskunft über ihre personenbezogenen Daten oder deren Löschung verlangen.",
 abos="Abonnements", abos_v="Informationen zu Abonnements und zur Zahlungsabwicklung finden sich in den für Hype geltenden Bedingungen.",
 decouvrir="Hype entdecken")
T["ja"]=dict(title="FEINN Équitation et Environnement 協会 | Hype",
 desc="2020年より、FEINN Équitation et Environnement 協会は、馬と、技術の継承と、自然への敬意を大切にする人々をつないでいます。活動内容、支援プロジェクト、法的表示。",
 sur="協会について", sous="Équitation et Environnement", retour="ホーム", langue="言語", photo="FEINNの写真は準備中です",
 notre="私たちの協会",
 intro=["2020年より、FEINN Équitation et Environnement 協会は、馬と、技術の継承と、自然への敬意を大切にする人々をつないでいます。",
        "私たちは、馬の健やかさと環境を思いやる乗馬を目指しています。乗馬の指導、競技に挑む若いライダーの支援、引退した乗馬クラブの馬の受け入れ、小さな生産、そして自然豊かな土地の保全を通じて活動しています。",
        "協会はライダーのためのアプリ「Hype」も運営しています。Hype+ の購読料は、協会の活動とプロジェクトに充てられます。"],
 missions=["乗馬の指導","若い才能の支援","乗馬クラブの馬の引退生活","小さな生産","環境と土地の保全"],
 citation1="馬は、人と自然をつなぐ絆",
 projets_t="支援プロジェクト",
 projets_intro="協会の価値を形にする、私たちが特に大切にしているプロジェクトです。私たちの取り組みを知っていただくためにご紹介します。",
 projets=[("若い才能に一頭の馬を","プロレベルの馬を手に入れる資金をいまは持たない、将来有望な若いライダーを支えます。このプロジェクトにより、乗馬指導者資格（DE）の準備と、プロクラスでのさらなる成長が可能になります。"),
          ("乗馬クラブの馬たちの引退生活","何世代ものライダーとともに歩み、いま厩舎で穏やかな引退生活を送る馬たちを大切にします。穏やかな引退を保証するには、飼料、ケア、健やかさに引き続き気を配る必要があります。"),
          ("施設と土地の手入れと再生","柵、放牧地、施設を再生し、馬たちにふさわしい暮らしの場を整えるとともに、私たちを取り巻く自然を手入れし、守ります。")],
 citation2="今日を守り、明日へ…",
 ml_t="法的表示",
 editeur="運営者", editeur_v=["協会 FEINN Équitation et Environnement","非営利協会（フランス1901年法）","3 chemin des Prés Picard","91760 Itteville, France","SIREN：898 028 980"],
 resp="発行責任者", resp_v=["Blandine Pronost","協会会長"],
 contact="お問い合わせ", hebergeur="ホスティング", heb_v=["Netlify, Inc.","101 2nd Street, Suite 575","San Francisco, CA, USA","電話：+1 415 691 1573"],
 donnees="個人データ", donnees_v="利用者は、協会に連絡することで、個人データの開示または削除を求めることができます。",
 abos="サブスクリプション", abos_v="サブスクリプションと支払い管理に関する情報は、Hypeに適用される条件に定められています。",
 decouvrir="Hypeを見る")
T["ar"]=dict(title="جمعية FEINN Équitation et Environnement | Hype",
 desc="منذ عام 2020، تجمع جمعية FEINN Équitation et Environnement محبي الخيل ونقل المعرفة واحترام الطبيعة. مهامها ومشاريعها وإشعارها القانوني.",
 sur="الجمعية", sous="Équitation et Environnement", retour="الرئيسية", langue="اللغة", photo="صورة FEINN قريبًا",
 notre="جمعيتنا",
 intro=["منذ عام 2020، تجمع جمعية FEINN Équitation et Environnement محبي الخيل ونقل المعرفة واحترام الطبيعة.",
        "نعمل من أجل فروسية تراعي راحة الخيول وبيئتها، من خلال التعليم، ومرافقة الفرسان الشباب في المسابقات، واستقبال خيول النادي المتقاعدة، وتربية صغيرة، والحفاظ على موقعنا الطبيعي.",
        "وتُصدر الجمعية أيضًا تطبيق Hype، تطبيق الفرسان: وتموّل اشتراكات Hype+ أنشطتها ومشاريعها."],
 missions=["تعليم الفروسية","مرافقة المواهب الشابة","تقاعد خيول النادي","تربية صغيرة","البيئة والحفاظ على الموقع"],
 citation1="الحصان، رابط بين الإنسان والطبيعة",
 projets_t="مشاريعنا التي يمكن دعمها",
 projets_intro="هذه المشاريع عزيزة على قلوبنا وتُحيي قيم الجمعية. نعرضها هنا للتعريف بالتزاماتنا.",
 projets=[("حصان لموهبة شابة","مرافقة فارس شاب واعد لا يملك اليوم الإمكانيات اللازمة لاقتناء حصان بمستوى احترافي. سيتيح له هذا المشروع الاستعداد لشهادة مدرب الفروسية (DE) ومواصلة تقدمه في مسابقات المحترفين."),
          ("تقاعد خيول نادينا","رعاية الخيول التي رافقت أجيالًا من الفرسان وتنعم اليوم بتقاعد هادئ في الإسطبل. ويعني ضمان تقاعد هادئ لها مواصلة الاهتمام بغذائها ورعايتها وراحتها."),
          ("صيانة مساحاتنا وتأهيلها","إعادة تأهيل الأسوار والمراعي ومنشآت الموقع لتوفير بيئة عيش ملائمة للخيول، مع صيانة المساحات الطبيعية المحيطة بنا والحفاظ عليها.")],
 citation2="نحافظ اليوم من أجل الغد…",
 ml_t="الإشعار القانوني",
 editeur="الناشر", editeur_v=["جمعية FEINN Équitation et Environnement","جمعية غير ربحية مسجلة (القانون الفرنسي لعام 1901)","3 chemin des Prés Picard","91760 Itteville، فرنسا","SIREN: ‎898 028 980"],
 resp="مسؤولة النشر", resp_v=["Blandine Pronost","رئيسة الجمعية"],
 contact="التواصل", hebergeur="الاستضافة", heb_v=["Netlify, Inc.","101 2nd Street, Suite 575","San Francisco, CA، الولايات المتحدة","الهاتف: ‎+1 415 691 1573"],
 donnees="البيانات الشخصية", donnees_v="يمكن للمستخدمين طلب الاطلاع على بياناتهم الشخصية أو حذفها بالتواصل مع الجمعية.",
 abos="الاشتراكات", abos_v="المعلومات المتعلقة بالاشتراكات وإدارة المدفوعات مبيّنة في الشروط المطبقة على Hype.",
 decouvrir="اكتشف Hype")

T["zh"]=dict(title="FEINN Équitation et Environnement 协会 | Hype",
 desc="自2020年起，FEINN Équitation et Environnement 协会将热爱马、热爱传承、尊重自然的人们聚在一起。协会的使命、项目和法律声明。",
 sur="协会简介", sous="Équitation et Environnement", retour="首页", langue="语言", photo="FEINN 照片即将上线",
 notre="我们的协会",
 intro=["自2020年起，FEINN Équitation et Environnement 协会将热爱马、热爱传承、尊重自然的人们聚在一起。",
        "我们致力于推广关爱马匹福祉、顾及环境的马术，通过教学、陪伴年轻骑手参加比赛、接收退役的俱乐部马匹、小规模繁育，以及保护我们的自然场地来践行这一理念。",
        "协会也发行 Hype，这款为骑手打造的应用：Hype+ 订阅为协会的活动和项目提供资金。"],
 missions=["马术教学","陪伴年轻新秀","俱乐部马匹的退役生活","小规模繁育","环境与场地保护"],
 citation1="马，是人与自然之间的纽带",
 projets_t="期待你支持的项目",
 projets_intro="这些项目是我们格外珍视的，也体现了协会的价值观。在此介绍它们，是为了让更多人了解我们的承诺。",
 projets=[("给年轻新秀一匹马","陪伴一位有潜力的年轻骑手，他目前还没有足够的条件购买一匹职业水平的马。这个项目将让他能够准备马术教练文凭（DE），并在职业组别的比赛中继续进步。"),
          ("我们俱乐部马匹的退役生活","照顾那些陪伴了几代骑手、如今在马厩里安享平静晚年的马匹。要让它们安心退役，就要继续关注它们的饲料、护理和福祉。"),
          ("维护并修复我们的场地","修复场地的围栏、草场和设施，为马匹提供合适的生活环境，同时维护并保护我们周围的自然空间。")],
 citation2="守护今天，为了明天…",
 ml_t="法律声明",
 editeur="出版方", editeur_v=["协会 FEINN Équitation et Environnement","已申报的协会","3 chemin des Prés Picard","91760 Itteville, 法国","SIREN：898 028 980"],
 resp="出版负责人", resp_v=["Blandine Pronost","协会会长"],
 contact="联系方式", hebergeur="托管方", heb_v=["Netlify, Inc.","101 2nd Street, Suite 575","San Francisco, CA, 美国","电话：+1 415 691 1573"],
 donnees="个人数据", donnees_v="用户可以联系协会，请求查阅或删除自己的个人数据。",
 abos="订阅", abos_v="有关订阅和付款管理的信息，请见适用于 Hype 的相关条款。",
 decouvrir="了解 Hype")

T["nl"]=dict(title="De vereniging FEINN Équitation et Environnement | Hype",
 desc="Sinds 2020 brengt de vereniging FEINN Équitation et Environnement mensen samen die van paarden houden, kennis willen doorgeven en de natuur respecteren. Haar missies, projecten en juridische vermeldingen.",
 sur="De vereniging", sous="Équitation et Environnement", retour="Home", langue="Taal", photo="FEINN-foto binnenkort",
 notre="Onze vereniging",
 intro=["Sinds 2020 brengt de vereniging FEINN Équitation et Environnement mensen samen die van paarden houden, kennis willen doorgeven en de natuur respecteren.",
        "Wij zetten ons in voor paardrijden met aandacht voor het welzijn van de paarden en hun omgeving, via lesgeven, het begeleiden van jonge ruiters in de wedstrijdsport, de opvang van gepensioneerde manegepaarden, een kleinschalige fokkerij en het behoud van ons natuurlijke terrein.",
        "De vereniging geeft ook Hype uit, de app voor ruiters: de Hype+-abonnementen financieren haar activiteiten en projecten."],
 missions=["Paardrijlessen","Begeleiding van jong talent","Pensioen voor manegepaarden","Kleinschalige fokkerij","Milieu en behoud van het terrein"],
 citation1="Het paard, een band tussen mens en natuur",
 projets_t="Onze projecten om te steunen",
 projets_intro="Deze projecten liggen ons na aan het hart en maken de waarden van de vereniging tot leven. We presenteren ze hier om onze inzet bekend te maken.",
 projets=[("Een paard voor een jong talent","Een veelbelovende jonge ruiter begeleiden die nu niet de middelen heeft om een paard op professioneel niveau te kopen. Dankzij dit project kan hij zich voorbereiden op zijn diploma rij-instructeur (DE) en verder groeien in de Pro-klassen."),
          ("Het pensioen van onze manegepaarden","Zorgen voor de paarden die generaties ruiters hebben begeleid en nu genieten van een rustig pensioen in de stal. Zorgen voor een rustig pensioen betekent blijven letten op hun voeding, hun verzorging en hun welzijn."),
          ("Ons terrein onderhouden en herstellen","De hekken, weides en voorzieningen van het terrein herstellen om de paarden een passende leefomgeving te bieden, en tegelijk de natuur om ons heen onderhouden en beschermen.")],
 citation2="Vandaag behouden voor morgen…",
 ml_t="Juridische vermeldingen",
 editeur="Uitgever", editeur_v=["Vereniging FEINN Équitation et Environnement","Aangemelde vereniging zonder winstoogmerk (Franse vereniging volgens de wet van 1901)","3 chemin des Prés Picard","91760 Itteville, Frankrijk","SIREN: 898 028 980"],
 resp="Verantwoordelijk voor de publicatie", resp_v=["Blandine Pronost","Voorzitter van de vereniging"],
 contact="Contact", hebergeur="Hosting", heb_v=["Netlify, Inc.","101 2nd Street, Suite 575","San Francisco, CA, Verenigde Staten","Telefoon: +1 415 691 1573"],
 donnees="Persoonsgegevens", donnees_v="Gebruikers kunnen via de vereniging inzage in hun persoonsgegevens of verwijdering ervan vragen.",
 abos="Abonnementen", abos_v="Informatie over abonnementen en het beheer van betalingen staat in de voorwaarden die voor Hype gelden.",
 decouvrir="Ontdek Hype")

T["pt"]=dict(title="Associação FEINN Équitation et Environnement | Hype",
 desc="Desde 2020, a associação FEINN Équitation et Environnement reúne quem ama os cavalos, quer transmitir conhecimento e respeita a natureza. Suas missões, seus projetos e as menções legais.",
 sur="A associação", sous="Équitation et Environnement", retour="Início", langue="Idioma", photo="Foto FEINN em breve",
 notre="Nossa associação",
 intro=["Desde 2020, a associação FEINN Équitation et Environnement reúne quem ama os cavalos, quer transmitir conhecimento e respeita a natureza.",
        "Atuamos por uma equitação atenta ao bem-estar dos cavalos e do meio em que vivem, por meio do ensino, do acompanhamento de jovens cavaleiros na competição, do acolhimento de cavalos de clube aposentados, de uma pequena criação e da preservação do nosso espaço natural.",
        "A associação também edita o Hype, o app para cavaleiros: as assinaturas Hype+ financiam suas atividades e seus projetos."],
 missions=["Ensino de equitação","Apoio a jovens talentos","Aposentadoria de cavalos de clube","Pequena criação","Meio ambiente e preservação do espaço"],
 citation1="O cavalo, um elo entre o ser humano e a natureza",
 projets_t="Nossos projetos para apoiar",
 projets_intro="Estes projetos são muito importantes para nós e dão vida aos valores da associação. Apresentamos aqui para dar a conhecer o nosso compromisso.",
 projets=[("Um cavalo para um jovem talento","Acompanhar um jovem cavaleiro promissor que hoje não tem condições de comprar um cavalo de nível profissional. Graças a este projeto, ele poderá se preparar para o diploma de instrutor de equitação (DE) e continuar a evoluir nas provas Pro."),
          ("A aposentadoria dos nossos cavalos de clube","Cuidar dos cavalos que acompanharam gerações de cavaleiros e hoje desfrutam de uma aposentadoria tranquila na cocheira. Garantir uma aposentadoria serena é continuar atento à alimentação, aos cuidados e ao bem-estar deles."),
          ("Manter e recuperar o nosso espaço","Recuperar as cercas, os pastos e as instalações do espaço para oferecer aos cavalos um ambiente de vida adequado, preservando e protegendo ao mesmo tempo a natureza ao nosso redor.")],
 citation2="Preservar hoje para o amanhã…",
 ml_t="Menções legais",
 editeur="Editor", editeur_v=["Associação FEINN Équitation et Environnement","Associação sem fins lucrativos regida pela lei francesa de 1901, declarada","3 chemin des Prés Picard","91760 Itteville, França","SIREN: 898 028 980"],
 resp="Responsável pela publicação", resp_v=["Blandine Pronost","Presidente da associação"],
 contact="Contato", hebergeur="Hospedagem", heb_v=["Netlify, Inc.","101 2nd Street, Suite 575","San Francisco, CA, Estados Unidos","Telefone: +1 415 691 1573"],
 donnees="Dados pessoais", donnees_v="Os usuários podem solicitar à associação o acesso aos seus dados pessoais ou a exclusão deles.",
 abos="Assinaturas", abos_v="As informações sobre assinaturas e gestão de pagamentos constam nas condições aplicáveis ao Hype.",
 decouvrir="Conheça o Hype")

T["sv"]=dict(title="Föreningen FEINN Équitation et Environnement | Hype",
 desc="Sedan 2020 samlar föreningen FEINN Équitation et Environnement alla som älskar hästar, vill förmedla kunskap och värnar om naturen. Dess uppdrag, projekt och juridisk information.",
 sur="Föreningen", sous="Équitation et Environnement", retour="Startsida", langue="Språk", photo="FEINN-foto kommer snart",
 notre="Vår förening",
 intro=["Sedan 2020 samlar föreningen FEINN Équitation et Environnement alla som älskar hästar, vill förmedla kunskap och värnar om naturen.",
        "Vi arbetar för en ridsport som tar hänsyn till hästarnas och deras miljös välbefinnande, genom undervisning, stöd till unga ryttare i tävlingssammanhang, omhändertagande av pensionerade ridskolehästar, en småskalig uppfödning och bevarandet av vår naturliga plats.",
        "Föreningen ger också ut Hype, appen för ryttare: Hype+-prenumerationerna finansierar dess verksamhet och projekt."],
 missions=["Ridundervisning","Stöd till unga talanger","Pension för ridskolehästar","Småskalig uppfödning","Miljö och bevarande av platsen"],
 citation1="Hästen, en länk mellan människan och naturen",
 projets_t="Våra projekt att stödja",
 projets_intro="Dessa projekt betyder mycket för oss och ger liv åt föreningens värderingar. Vi presenterar dem här för att visa vårt engagemang.",
 projets=[("En häst till en ung talang","Att stödja en lovande ung ryttare som i dag inte har råd att köpa en häst på professionell nivå. Tack vare det här projektet kan hen förbereda sig för ridinstruktörsexamen (DE) och fortsätta utvecklas i Pro-tävlingarna."),
          ("Pension för våra ridskolehästar","Att ta hand om hästarna som har följt generationer av ryttare och nu njuter av en lugn pension i stallet. Att garantera dem ett stilla otium är att fortsätta ge dem omsorg om foder, vård och välbefinnande."),
          ("Att underhålla och återställa vår plats","Att återställa stängsel, hagar och anläggningar på platsen för att ge hästarna en lämplig livsmiljö, samtidigt som naturen omkring oss bevaras och skyddas.")],
 citation2="Att bevara i dag för morgondagen…",
 ml_t="Juridisk information",
 editeur="Utgivare", editeur_v=["Föreningen FEINN Équitation et Environnement","Ideell förening enligt fransk lag av 1901, anmäld","3 chemin des Prés Picard","91760 Itteville, Frankrike","SIREN: 898 028 980"],
 resp="Ansvarig utgivare", resp_v=["Blandine Pronost","Föreningens ordförande"],
 contact="Kontakt", hebergeur="Webbhotell", heb_v=["Netlify, Inc.","101 2nd Street, Suite 575","San Francisco, CA, USA","Telefon: +1 415 691 1573"],
 donnees="Personuppgifter", donnees_v="Användare kan begära att föreningen ger åtkomst till deras personuppgifter eller raderar dem.",
 abos="Prenumerationer", abos_v="Information om prenumerationer och betalningshantering finns i de villkor som gäller för Hype.",
 decouvrir="Upptäck Hype")

T["ru"]=dict(title="Ассоциация FEINN Équitation et Environnement | Hype",
 desc="С 2020 года ассоциация FEINN Équitation et Environnement объединяет увлечённых людей, которым дороги лошади, передача знаний и уважение к природе. Её миссии, проекты и юридическая информация.",
 sur="Ассоциация", sous="Équitation et Environnement", retour="Главная", langue="Язык", photo="Фото FEINN скоро появится",
 notre="Наша ассоциация",
 intro=["С 2020 года ассоциация FEINN Équitation et Environnement объединяет увлечённых людей, которым дороги лошади, передача знаний и уважение к природе.",
        "Мы работаем ради верховой езды, в которой заботятся о благополучии лошадей и об окружающей их среде: преподаём, сопровождаем молодых всадников на соревнованиях, принимаем на заслуженный отдых клубных лошадей, ведём небольшое разведение и сохраняем нашу природную территорию.",
        "Ассоциация также выпускает Hype, приложение для всадников: подписки Hype+ финансируют её деятельность и проекты."],
 missions=["Обучение верховой езде","Поддержка молодых талантов","Заслуженный отдых клубных лошадей","Небольшое разведение","Окружающая среда и сохранение территории"],
 citation1="Лошадь — связь между людьми и природой",
 projets_t="Наши проекты, которые можно поддержать",
 projets_intro="Эти проекты нам особенно дороги, и в них оживают ценности ассоциации. Мы представляем их здесь, чтобы рассказать о том, ради чего работаем.",
 projets=[("Лошадь для молодого таланта","Помочь перспективному молодому всаднику, у которого сегодня нет средств на покупку лошади профессионального уровня. Благодаря этому проекту он сможет подготовиться к диплому инструктора по верховой езде (DE) и продолжить расти в стартах Pro."),
          ("Заслуженный отдых наших клубных лошадей","Заботиться о лошадях, которые сопровождали целые поколения всадников, а теперь спокойно живут на покое в конюшне. Чтобы их отдых был безмятежным, нужно и дальше следить за их кормлением, уходом и благополучием."),
          ("Содержать и приводить в порядок наши территории","Восстановить ограды, пастбища и сооружения площадки, чтобы у лошадей были подходящие условия жизни, и при этом беречь и сохранять окружающие нас природные пространства.")],
 citation2="Беречь сегодня ради завтра…",
 ml_t="Юридическая информация",
 editeur="Издатель", editeur_v=["Ассоциация FEINN Équitation et Environnement","Зарегистрированная ассоциация","3 chemin des Prés Picard","91760 Itteville, Франция","SIREN: 898 028 980"],
 resp="Ответственный за публикацию", resp_v=["Blandine Pronost","Президент ассоциации"],
 contact="Контакты", hebergeur="Хостинг-провайдер", heb_v=["Netlify, Inc.","101 2nd Street, Suite 575","San Francisco, CA, США","Телефон: +1 415 691 1573"],
 donnees="Персональные данные", donnees_v="Пользователи могут запросить у ассоциации доступ к своим персональным данным или их удаление.",
 abos="Подписки", abos_v="Информация о подписках и об управлении платежами приведена в условиях, действующих для Hype.",
 decouvrir="Узнать о Hype")

T["pl"]=dict(title="Stowarzyszenie FEINN Équitation et Environnement | Hype",
 desc="Od 2020 roku stowarzyszenie FEINN Équitation et Environnement skupia pasjonatów, którym bliskie są konie, przekazywanie wiedzy i szacunek dla natury. Jego misje, projekty i informacje prawne.",
 sur="Stowarzyszenie", sous="Équitation et Environnement", retour="Strona główna", langue="Język", photo="Zdjęcie FEINN wkrótce",
 notre="Nasze stowarzyszenie",
 intro=["Od 2020 roku stowarzyszenie FEINN Équitation et Environnement skupia pasjonatów, którym bliskie są konie, przekazywanie wiedzy i szacunek dla natury.",
        "Działamy na rzecz jazdy konnej, w której liczy się dobrostan koni i ich otoczenie: uczymy, wspieramy młodych jeźdźców w zawodach, przyjmujemy konie klubowe na zasłużoną emeryturę, prowadzimy małą hodowlę i dbamy o nasz naturalny teren.",
        "Stowarzyszenie wydaje także Hype, aplikację dla jeźdźców: subskrypcje Hype+ finansują jego działalność i projekty."],
 missions=["Nauka jazdy konnej","Wsparcie młodych talentów","Emerytura koni klubowych","Mała hodowla","Środowisko i ochrona terenu"],
 citation1="Koń jest więzią między ludźmi a naturą",
 projets_t="Nasze projekty, które możesz wesprzeć",
 projets_intro="Te projekty są nam szczególnie bliskie i wyrażają wartości stowarzyszenia. Przedstawiamy je tutaj, aby pokazać, w co się angażujemy.",
 projets=[("Koń dla młodego talentu","Wesprzeć obiecującego młodego jeźdźca, który dziś nie ma środków na zakup konia na poziomie zawodowym. Dzięki temu projektowi mógłby przygotować się do dyplomu instruktora jazdy konnej (DE) i dalej się rozwijać w konkurencjach Pro."),
          ("Emerytura naszych koni klubowych","Zadbać o konie, które towarzyszyły całym pokoleniom jeźdźców, a dziś spokojnie żyją na emeryturze w stajni. Zapewnienie im spokojnej starości oznacza, że nadal troszczymy się o ich żywienie, opiekę i dobrostan."),
          ("Utrzymanie i odnowa naszych terenów","Odnowić ogrodzenia, pastwiska i urządzenia na terenie, aby zapewnić koniom odpowiednie warunki życia, a jednocześnie dbać o otaczające nas przestrzenie naturalne i je chronić.")],
 citation2="Chronić dziś dla jutra…",
 ml_t="Informacje prawne",
 editeur="Wydawca", editeur_v=["Stowarzyszenie FEINN Équitation et Environnement","Stowarzyszenie zarejestrowane we Francji","3 chemin des Prés Picard","91760 Itteville, Francja","SIREN: 898 028 980"],
 resp="Osoba odpowiedzialna za publikację", resp_v=["Blandine Pronost","Przewodnicząca stowarzyszenia"],
 contact="Kontakt", hebergeur="Hosting", heb_v=["Netlify, Inc.","101 2nd Street, Suite 575","San Francisco, CA, USA","Telefon: +1 415 691 1573"],
 donnees="Dane osobowe", donnees_v="Użytkownicy mogą zwrócić się do stowarzyszenia o dostęp do swoich danych osobowych lub o ich usunięcie.",
 abos="Subskrypcje", abos_v="Informacje o subskrypcjach i zarządzaniu płatnościami znajdziesz w warunkach obowiązujących dla Hype.",
 decouvrir="Poznaj Hype")

# ═══ REFONTE 14/10/2026 (maquette validée par Blandine) — ÉTAPE 1 : base, menu, hero, pied de page ═══
# Nouveaux textes (7 langues). « Équitation et Environnement » reste en français partout (nom propre).
NV={}
NV["fr"]=dict(accueil="Accueil",asso="L'association",engag="Nos engagements",nprojets="Nos projets",lieu="Notre lieu",soutenir="Nous soutenir",menu="Menu",fermer="Fermer",
 accroche="Des chevaux, des cavaliers et un avenir plus durable.",hero_desc="Une association loi 1901 engagée pour l'enseignement, la solidarité, le bien-être animal et la préservation de l'environnement.",
 btn_asso="Découvrir notre association",loi1901="Association loi 1901",contacter="Nous contacter",cit_pied="Ensemble, pour des chevaux d'aujourd'hui et de demain.",logo_alt="Logo FEINN Équitation et Environnement")
NV["en"]=dict(accueil="Home",asso="The association",engag="Our commitments",nprojets="Our projects",lieu="Our grounds",soutenir="Support us",menu="Menu",fermer="Close",
 accroche="Horses, riders and a more sustainable future.",hero_desc="A non-profit association (French law of 1901) committed to teaching, solidarity, animal welfare and protecting the environment.",
 btn_asso="Discover our association",loi1901="Non-profit association (law of 1901)",contacter="Contact us",cit_pied="Together, for the horses of today and tomorrow.",logo_alt="FEINN Équitation et Environnement logo")
NV["es"]=dict(accueil="Inicio",asso="La asociación",engag="Nuestros compromisos",nprojets="Nuestros proyectos",lieu="Nuestro lugar",soutenir="Apóyanos",menu="Menú",fermer="Cerrar",
 accroche="Caballos, jinetes y un futuro más sostenible.",hero_desc="Una asociación sin ánimo de lucro (ley francesa de 1901) comprometida con la enseñanza, la solidaridad, el bienestar animal y la preservación del medio ambiente.",
 btn_asso="Descubrir nuestra asociación",loi1901="Asociación sin ánimo de lucro (ley de 1901)",contacter="Contáctanos",cit_pied="Juntos, por los caballos de hoy y de mañana.",logo_alt="Logotipo de FEINN Équitation et Environnement")
NV["it"]=dict(accueil="Home",asso="L'associazione",engag="I nostri impegni",nprojets="I nostri progetti",lieu="Il nostro luogo",soutenir="Sostienici",menu="Menu",fermer="Chiudi",
 accroche="Cavalli, cavalieri e un futuro più sostenibile.",hero_desc="Un'associazione senza scopo di lucro (legge francese del 1901) impegnata per l'insegnamento, la solidarietà, il benessere animale e la tutela dell'ambiente.",
 btn_asso="Scopri la nostra associazione",loi1901="Associazione senza scopo di lucro (legge del 1901)",contacter="Contattaci",cit_pied="Insieme, per i cavalli di oggi e di domani.",logo_alt="Logo di FEINN Équitation et Environnement")
NV["de"]=dict(accueil="Startseite",asso="Der Verein",engag="Unsere Anliegen",nprojets="Unsere Projekte",lieu="Unser Gelände",soutenir="Unterstützen",menu="Menü",fermer="Schließen",
 accroche="Pferde, Reiter und eine nachhaltigere Zukunft.",hero_desc="Ein gemeinnütziger Verein (französisches Gesetz von 1901), der sich für Unterricht, Solidarität, Tierwohl und den Schutz der Umwelt einsetzt.",
 btn_asso="Unseren Verein entdecken",loi1901="Gemeinnütziger Verein (Gesetz von 1901)",contacter="Kontakt",cit_pied="Gemeinsam für die Pferde von heute und morgen.",logo_alt="Logo von FEINN Équitation et Environnement")
NV["ja"]=dict(accueil="ホーム",asso="協会について",engag="私たちの取り組み",nprojets="プロジェクト",lieu="私たちの場所",soutenir="支援する",menu="メニュー",fermer="閉じる",
 accroche="馬と、ライダーと、より持続可能な未来のために。",hero_desc="教育、連帯、動物福祉、そして環境保全に取り組む非営利協会（フランス1901年法）です。",
 btn_asso="協会について知る",loi1901="非営利協会（1901年法）",contacter="お問い合わせ",cit_pied="今日の馬たち、そして明日の馬たちのために、ともに。",logo_alt="FEINN Équitation et Environnement のロゴ")
NV["ar"]=dict(accueil="الرئيسية",asso="الجمعية",engag="التزاماتنا",nprojets="مشاريعنا",lieu="موقعنا",soutenir="ادعمونا",menu="القائمة",fermer="إغلاق",
 accroche="خيول وفرسان ومستقبل أكثر استدامة.",hero_desc="جمعية غير ربحية (القانون الفرنسي لعام 1901) ملتزمة بالتعليم والتضامن ورفاهية الحيوان والحفاظ على البيئة.",
 btn_asso="اكتشف جمعيتنا",loi1901="جمعية غير ربحية (قانون 1901)",contacter="تواصل معنا",cit_pied="معًا، من أجل خيول اليوم والغد.",logo_alt="شعار FEINN Équitation et Environnement")
NV["zh"]=dict(accueil="首页",asso="协会简介",engag="我们的承诺",nprojets="我们的项目",lieu="我们的场地",soutenir="支持我们",menu="菜单",fermer="关闭",
 accroche="马、骑手，和更可持续的未来。",hero_desc="一个依据法国1901年法律成立的协会，致力于教学、互助、动物福利和环境保护。",
 btn_asso="了解我们的协会",loi1901="1901年法协会",contacter="联系我们",cit_pied="携手，为今天和明天的马。",logo_alt="FEINN Équitation et Environnement 标志")
NV["nl"]=dict(accueil="Home",asso="De vereniging",engag="Onze doelen",nprojets="Onze projecten",lieu="Onze locatie",soutenir="Steun ons",menu="Menu",fermer="Sluiten",
 accroche="Paarden, ruiters en een duurzamere toekomst.",hero_desc="Een Franse vereniging volgens de wet van 1901 die zich inzet voor lesgeven, solidariteit, dierenwelzijn en het behoud van het milieu.",
 btn_asso="Ontdek onze vereniging",loi1901="Franse vereniging (wet van 1901)",contacter="Neem contact op",cit_pied="Samen, voor de paarden van vandaag en morgen.",logo_alt="Logo van FEINN Équitation et Environnement")
NV["pt"]=dict(accueil="Início",asso="A associação",engag="Nossos compromissos",nprojets="Nossos projetos",lieu="Nosso espaço",soutenir="Apoie-nos",menu="Menu",fermer="Fechar",
 accroche="Cavalos, cavaleiros e um futuro mais sustentável.",hero_desc="Uma associação regida pela lei francesa de 1901, dedicada ao ensino, à solidariedade, ao bem-estar animal e à preservação do meio ambiente.",
 btn_asso="Conheça nossa associação",loi1901="Associação francesa (lei de 1901)",contacter="Fale conosco",cit_pied="Juntos, pelos cavalos de hoje e de amanhã.",logo_alt="Logotipo da FEINN Équitation et Environnement")
NV["sv"]=dict(accueil="Startsida",asso="Föreningen",engag="Våra åtaganden",nprojets="Våra projekt",lieu="Vår plats",soutenir="Stöd oss",menu="Meny",fermer="Stäng",
 accroche="Hästar, ryttare och en mer hållbar framtid.",hero_desc="En förening enligt fransk lag av 1901 som arbetar för undervisning, solidaritet, djurens välbefinnande och bevarandet av miljön.",
 btn_asso="Upptäck vår förening",loi1901="Fransk förening (lagen av 1901)",contacter="Kontakta oss",cit_pied="Tillsammans, för dagens och morgondagens hästar.",logo_alt="Logotyp för FEINN Équitation et Environnement")
NV["ru"]=dict(accueil="Главная",asso="Ассоциация",engag="Наши обязательства",nprojets="Наши проекты",lieu="Наше место",soutenir="Поддержи нас",menu="Меню",fermer="Закрыть",
 accroche="Лошади, всадники и более устойчивое будущее.",hero_desc="Ассоциация по французскому закону 1901 года, которая занимается обучением, взаимопомощью, благополучием животных и сохранением окружающей среды.",
 btn_asso="Узнать о нашей ассоциации",loi1901="Ассоциация по закону 1901 года",contacter="Свяжись с нами",cit_pied="Вместе — ради лошадей сегодняшних и завтрашних.",logo_alt="Логотип FEINN Équitation et Environnement")
NV["pl"]=dict(accueil="Strona główna",asso="Stowarzyszenie",engag="Nasze zobowiązania",nprojets="Nasze projekty",lieu="Nasze miejsce",soutenir="Wesprzyj nas",menu="Menu",fermer="Zamknij",
 accroche="Konie, jeźdźcy i bardziej zrównoważona przyszłość.",hero_desc="Stowarzyszenie według prawa francuskiego z 1901 roku, zaangażowane w nauczanie, solidarność, dobrostan zwierząt i ochronę środowiska.",
 btn_asso="Poznaj nasze stowarzyszenie",loi1901="Stowarzyszenie według prawa z 1901 roku",contacter="Skontaktuj się z nami",cit_pied="Razem, dla koni dzisiejszych i jutrzejszych.",logo_alt="Logo FEINN Équitation et Environnement")
for _l in L: T[_l].update(NV[_l])
# 14/10 (refonte) : la phrase « les abonnements Hype+ financent l'association » est retirée (inexacte : Stripe est au nom de Blandine — voir SUIVI)
for _l in L: T[_l]["intro"]=T[_l]["intro"][:2]

LOGO="images/asso/logo-feinn-embleme.png"
# Hero : photo FEINN si déposée (images/asso/hero.jpg), sinon images d'attente de Hype (paysage ordinateur / portrait téléphone)
HERO_ATTENTE_LARGE="images/histoire-continue.webp"; HERO_ATTENTE_PORTRAIT="images/mes-chevaux-fond-couchant.webp"
ICO["fleche"]='<path d="M5 12h14M13 6l6 6-6 6"/>'
ICO["chevron"]='<path d="m6 9 6 6 6-6"/>'
ICO["burger"]='<path d="M4 7h16M4 12h16M4 17h16"/>'
ICO["insta"]='<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".7"/>'
ICO["fb"]='<path d="M14.5 8H16V5.2c-.3 0-1.2-.2-2.3-.2-2.3 0-3.7 1.4-3.7 3.9V11H7.5v3H10v6.5h3V14h2.5l.4-3H13V9.2c0-.8.3-1.2 1.5-1.2Z"/>'
ICO["croix"]='<path d="M6 6l12 12M18 6 6 18"/>'

# ═══ ÉTAPE 2 (14/10) : bandeau des 5 engagements ═══
ENG={
"fr":(["Enseignement et formation","Jeunes espoirs","Retraite des chevaux","Petit élevage","Environnement"],["Enseignement","Jeunes espoirs","Retraite","Petit élevage","Environnement"],["Transmettre la passion et les savoirs équestres.","Accompagner les talents de demain.","Offrir une seconde vie à nos compagnons.","Une approche raisonnée et respectueuse.","Préserver un cadre naturel durable."]),
"en":(["Teaching and training","Young talents","Horse retirement","Small-scale breeding","Environment"],["Teaching","Young talents","Retirement","Breeding","Environment"],["Passing on our passion and equestrian know-how.","Supporting tomorrow's talents.","Giving our companions a second life.","A thoughtful, respectful approach.","Preserving a lasting natural setting."]),
"es":(["Enseñanza y formación","Jóvenes promesas","Jubilación de los caballos","Pequeña cría","Medio ambiente"],["Enseñanza","Jóvenes promesas","Jubilación","Cría","Medio ambiente"],["Transmitir la pasión y los saberes ecuestres.","Acompañar a los talentos del mañana.","Ofrecer una segunda vida a nuestros compañeros.","Un enfoque razonado y respetuoso.","Preservar un entorno natural duradero."]),
"it":(["Insegnamento e formazione","Giovani promesse","Pensione dei cavalli","Piccolo allevamento","Ambiente"],["Insegnamento","Giovani promesse","Pensione","Allevamento","Ambiente"],["Trasmettere la passione e i saperi equestri.","Accompagnare i talenti di domani.","Offrire una seconda vita ai nostri compagni.","Un approccio ragionato e rispettoso.","Preservare un ambiente naturale duraturo."]),
"de":(["Unterricht und Ausbildung","Junge Talente","Ruhestand der Pferde","Kleine Zucht","Umwelt"],["Unterricht","Junge Talente","Ruhestand","Zucht","Umwelt"],["Die Leidenschaft und das Reitwissen weitergeben.","Die Talente von morgen begleiten.","Unseren Gefährten ein zweites Leben schenken.","Ein durchdachter, respektvoller Ansatz.","Eine dauerhaft natürliche Umgebung bewahren."]),
"ja":(["指導と育成","若い才能","馬の引退生活","小さな生産","環境"],["指導","若い才能","引退生活","生産","環境"],["乗馬への情熱と技術を伝えます。","明日の才能を支えます。","仲間である馬たちに第二の人生を。","理にかなった、思いやりのある取り組み。","持続する自然環境を守ります。"]),
"ar":(["التعليم والتكوين","المواهب الشابة","تقاعد الخيول","تربية صغيرة","البيئة"],["التعليم","المواهب الشابة","التقاعد","التربية","البيئة"],["نقل الشغف والمعارف الفروسية.","مرافقة مواهب الغد.","منح رفاقنا حياة ثانية.","نهج مدروس ومحترم.","الحفاظ على بيئة طبيعية مستدامة."]),
"zh":(["教学与培训","年轻新秀","马匹退役","小规模繁育","环境"],["教学","新秀","退役","繁育","环境"],["传承对马术的热爱与知识。","陪伴未来的人才。","给我们的伙伴第二次生命。","理性而尊重的方式。","守护可持续的自然环境。"]),
"nl":(["Lesgeven en opleiding","Jong talent","Pensioen voor paarden","Kleinschalige fokkerij","Milieu"],["Lesgeven","Jong talent","Pensioen","Fokkerij","Milieu"],["De passie en kennis van het paardrijden doorgeven.","De talenten van morgen begeleiden.","Onze maatjes een tweede leven geven.","Een doordachte en respectvolle aanpak.","Een duurzame natuurlijke omgeving behouden."]),
"pt":(["Ensino e formação","Jovem talento","Aposentadoria dos cavalos","Pequena criação","Meio ambiente"],["Ensino","Jovem talento","Aposentadoria","Criação","Meio ambiente"],["Transmitir a paixão e o conhecimento da equitação.","Acompanhar os talentos de amanhã.","Dar uma segunda vida aos nossos companheiros.","Uma abordagem ponderada e respeitosa.","Preservar um ambiente natural sustentável."]),
"sv":(["Undervisning och utbildning","Ung talang","Pension för hästar","Småskalig uppfödning","Miljö"],["Undervisning","Ung talang","Pension","Uppfödning","Miljö"],["Förmedla passionen för och kunskapen om ridsport.","Stödja morgondagens talanger.","Ge våra följeslagare ett andra liv.","Ett genomtänkt och respektfullt arbetssätt.","Bevara en hållbar naturmiljö."]),
"ru":(["Обучение и подготовка","Молодые таланты","Отдых лошадей","Небольшое разведение","Окружающая среда"],["Обучение","Таланты","Отдых","Разведение","Среда"],["Передавать страсть к верховой езде и знания о ней.","Поддерживать талантов завтрашнего дня.","Подарить нашим спутникам вторую жизнь.","Разумный и бережный подход.","Сохранять устойчивую природную среду."]),
"pl":(["Nauka i szkolenie","Młode talenty","Emerytura koni","Mała hodowla","Środowisko"],["Nauka","Talenty","Emerytura","Hodowla","Środowisko"],["Przekazywać pasję i wiedzę jeździecką.","Wspierać talenty jutra.","Dać naszym towarzyszom drugie życie.","Przemyślane i pełne szacunku podejście.","Chronić trwale naturalne otoczenie."]),
}
ICO["groupe"]='<circle cx="12" cy="7.5" r="2.6"/><circle cx="5.8" cy="9.6" r="2.1"/><circle cx="18.2" cy="9.6" r="2.1"/><path d="M7.4 19c.4-3.2 2.3-5 4.6-5s4.2 1.8 4.6 5"/><path d="M2.5 18c.3-2.3 1.6-3.8 3.3-3.8 1 0 1.8.4 2.4 1.1"/><path d="M21.5 18c-.3-2.3-1.6-3.8-3.3-3.8-1 0-1.8.4-2.4 1.1"/>'
ICO["tete"]='<path d="M8 20.5c0-3 .7-5.7 2.1-7.6l-3.6 1c-1 .3-1.9-.3-2-1.2L4.2 10.8c-.1-.6.2-1.2.7-1.5L10 5.6 11.2 3l1.5 2.3c3.6.7 6.3 4 6.3 8.2v7"/><circle cx="10.3" cy="8.7" r=".55"/>'
def bandeau(lg):
    titres,courts,phrases=ENG[lg]; ic=["cap","groupe","coeur","tete","pousse"]
    li="".join(f'<li><span class="pic">{svg(i)}</span><span class="tit"><span class="long">{e(a)}</span><span class="court" aria-hidden="true">{e(c)}</span></span><span class="phr">{e(f)}</span></li>' for i,a,c,f in zip(ic,titres,courts,phrases))
    return f'<section class="engag" id="engagements" aria-labelledby="engag-t"><h2 class="vh" id="engag-t">{e(T[lg]["engag"])}</h2><ul>{li}</ul></section>'

# ═══ ÉTAPE 3 (14/10) : « Trois projets pour faire la différence » (section ivoire, carrousel iPhone, détail sur la page) ═══
PJ={
"fr":dict(pj_titre="Trois projets pour faire la différence",pj_voir="Découvrir ce projet",pj_tous="Découvrir tous nos projets",pj_detail="Nos projets en détail",pj_prec="Projet précédent",pj_suiv="Projet suivant",
 pj_courts=["Aider un jeune cavalier prometteur à acquérir un cheval adapté à ses ambitions sportives.","Contribuer à l'alimentation, aux soins et au bien-être des chevaux qui ont accompagné les cavaliers pendant des années.","Participer à la rénovation des clôtures, prés et installations équestres, en respectant l'environnement naturel."]),
"en":dict(pj_titre="Three projects to make a difference",pj_voir="Discover this project",pj_tous="Discover all our projects",pj_detail="Our projects in detail",pj_prec="Previous project",pj_suiv="Next project",
 pj_courts=["Helping a promising young rider acquire a horse suited to his sporting ambitions.","Contributing to the feeding, care and well-being of the horses that have carried riders for years.","Taking part in renovating fences, fields and equestrian facilities, with respect for the natural environment."]),
"es":dict(pj_titre="Tres proyectos para marcar la diferencia",pj_voir="Descubrir este proyecto",pj_tous="Descubrir todos nuestros proyectos",pj_detail="Nuestros proyectos en detalle",pj_prec="Proyecto anterior",pj_suiv="Proyecto siguiente",
 pj_courts=["Ayudar a un joven jinete prometedor a adquirir un caballo acorde con sus ambiciones deportivas.","Contribuir a la alimentación, los cuidados y el bienestar de los caballos que han acompañado a los jinetes durante años.","Participar en la renovación de cercas, prados e instalaciones ecuestres, respetando el entorno natural."]),
"it":dict(pj_titre="Tre progetti per fare la differenza",pj_voir="Scopri il progetto",pj_tous="Scopri tutti i nostri progetti",pj_detail="I nostri progetti nel dettaglio",pj_prec="Progetto precedente",pj_suiv="Progetto successivo",
 pj_courts=["Aiutare un giovane cavaliere promettente ad acquistare un cavallo adatto alle sue ambizioni sportive.","Contribuire all'alimentazione, alle cure e al benessere dei cavalli che hanno accompagnato i cavalieri per anni.","Partecipare al rinnovo di recinzioni, prati e strutture equestri, nel rispetto dell'ambiente naturale."]),
"de":dict(pj_titre="Drei Projekte, die etwas bewegen",pj_voir="Projekt entdecken",pj_tous="Alle Projekte entdecken",pj_detail="Unsere Projekte im Detail",pj_prec="Vorheriges Projekt",pj_suiv="Nächstes Projekt",
 pj_courts=["Einem vielversprechenden jungen Reiter helfen, ein Pferd zu erwerben, das zu seinen sportlichen Zielen passt.","Zur Fütterung, Pflege und zum Wohlbefinden der Pferde beitragen, die Reiter jahrelang begleitet haben.","Bei der Erneuerung von Zäunen, Weiden und Reitanlagen mithelfen, mit Rücksicht auf die Natur."]),
"ja":dict(pj_titre="違いを生む3つのプロジェクト",pj_voir="プロジェクトを見る",pj_tous="すべてのプロジェクトを見る",pj_detail="プロジェクトの詳細",pj_prec="前のプロジェクト",pj_suiv="次のプロジェクト",
 pj_courts=["将来有望な若いライダーが、競技の目標に合った馬を手に入れられるよう支援します。","長年ライダーを支えてきた馬たちの飼料、ケア、健やかさに貢献します。","自然環境に配慮しながら、柵、放牧地、乗馬施設の改修に参加します。"]),
"ar":dict(pj_titre="ثلاثة مشاريع لإحداث الفرق",pj_voir="اكتشف هذا المشروع",pj_tous="اكتشف جميع مشاريعنا",pj_detail="مشاريعنا بالتفصيل",pj_prec="المشروع السابق",pj_suiv="المشروع التالي",
 pj_courts=["مساعدة فارس شاب واعد على اقتناء حصان يناسب طموحاته الرياضية.","المساهمة في تغذية الخيول التي رافقت الفرسان لسنوات ورعايتها وراحتها.","المشاركة في تجديد الأسوار والمراعي والمنشآت الفروسية مع احترام البيئة الطبيعية."]),
"zh":dict(pj_titre="三个改变现状的项目",pj_voir="了解这个项目",pj_tous="了解我们所有的项目",pj_detail="项目详情",pj_prec="上一个项目",pj_suiv="下一个项目",
 pj_courts=["帮助一位有潜力的年轻骑手获得一匹适合他竞技目标的马。","为多年来陪伴骑手的马匹提供饲料、护理，保障它们的福祉。","参与修缮围栏、草场和马术设施，同时尊重自然环境。"]),
"nl":dict(pj_titre="Drie projecten die het verschil maken",pj_voir="Ontdek dit project",pj_tous="Ontdek al onze projecten",pj_detail="Onze projecten in detail",pj_prec="Vorig project",pj_suiv="Volgend project",
 pj_courts=["Een veelbelovende jonge ruiter helpen een paard te kopen dat past bij zijn sportieve ambities.","Bijdragen aan de voeding, de verzorging en het welzijn van de paarden die ruiters jarenlang hebben begeleid.","Meehelpen aan de renovatie van hekken, weides en rijfaciliteiten, met respect voor de natuurlijke omgeving."]),
"pt":dict(pj_titre="Três projetos que fazem a diferença",pj_voir="Conheça este projeto",pj_tous="Conheça todos os nossos projetos",pj_detail="Nossos projetos em detalhe",pj_prec="Projeto anterior",pj_suiv="Próximo projeto",
 pj_courts=["Ajudar um jovem cavaleiro promissor a adquirir um cavalo à altura de suas ambições esportivas.","Contribuir com a alimentação, os cuidados e o bem-estar dos cavalos que acompanharam cavaleiros por anos.","Participar da reforma das cercas, dos pastos e das instalações equestres, respeitando o ambiente natural."]),
"sv":dict(pj_titre="Tre projekt som gör skillnad",pj_voir="Upptäck det här projektet",pj_tous="Upptäck alla våra projekt",pj_detail="Våra projekt i detalj",pj_prec="Föregående projekt",pj_suiv="Nästa projekt",
 pj_courts=["Hjälpa en lovande ung ryttare att skaffa en häst som motsvarar hens sportsliga ambitioner.","Bidra till foder, vård och välbefinnande för hästarna som har följt ryttare i många år.","Hjälpa till med renoveringen av stängsel, hagar och ridanläggningar, med respekt för den naturliga miljön."]),
"ru":dict(pj_titre="Три проекта, которые меняют многое",pj_voir="Узнать об этом проекте",pj_tous="Узнать обо всех наших проектах",pj_detail="Наши проекты подробно",pj_prec="Предыдущий проект",pj_suiv="Следующий проект",
 pj_courts=["Помочь перспективному молодому всаднику приобрести лошадь, подходящую для его спортивных амбиций.","Помогать с кормлением, уходом и благополучием лошадей, которые годами сопровождали всадников.","Участвовать в обновлении оград, пастбищ и конноспортивных сооружений, бережно относясь к природной среде."]),
"pl":dict(pj_titre="Trzy projekty, które robią różnicę",pj_voir="Poznaj ten projekt",pj_tous="Poznaj wszystkie nasze projekty",pj_detail="Nasze projekty w szczegółach",pj_prec="Poprzedni projekt",pj_suiv="Następny projekt",
 pj_courts=["Pomóc obiecującemu młodemu jeźdźcowi zdobyć konia odpowiedniego do jego ambicji sportowych.","Wesprzeć żywienie, opiekę i dobrostan koni, które przez lata towarzyszyły jeźdźcom.","Pomóc w odnowie ogrodzeń, pastwisk i urządzeń jeździeckich, z poszanowaniem środowiska naturalnego."]),
}
for _l in L: T[_l].update(PJ[_l])
for _l,_v in {'fr': 'Réduire', 'en': 'Show less', 'es': 'Mostrar menos', 'it': 'Riduci', 'de': 'Weniger anzeigen', 'ja': '閉じる', 'ar': 'عرض أقل', 'zh': '收起', 'nl': 'Minder tonen', 'pt': 'Mostrar menos', 'sv': 'Visa mindre', 'ru': 'Свернуть', 'pl': 'Zwiń'}.items(): T[_l]['pj_reduire']=_v
ICO["fg"]='<path d="M15 6l-6 6 6 6"/>'
ICO["fd"]='<path d="M9 6l6 6-6 6"/>'
PROJ_IDS=["jeune-espoir","retraite-chevaux-club","espaces"]; PROJ_PH=["jeune","retraite","espaces"]
def section_projets(lg):
    t=T[lg]; cartes=""; details=""
    for i,(pid,k,(titre,long_),court) in enumerate(zip(PROJ_IDS,PROJ_PH,t["projets"],t["pj_courts"]),1):
        img=f'<img src="/{PHOTOS[k]}" alt="" loading="lazy">' if photo(k) else ""
        cartes+=f'<li class="pcarte"><div class="pimg">{img}<span class="num">0{i}</span></div><div class="pcorps"><h3>{e(titre)}</h3><p>{e(court)}</p><details class="plus" id="projet-{pid}"><summary class="plien"><span class="o">{e(t["pj_voir"])}</span><span class="f">{e(t["pj_reduire"])}</span> {svg("chevron")}</summary><p>{e(long_)}</p></details></div></li>'
    return f'''<section class="projets2" id="projets" aria-labelledby="pj-t"><div class="in">
<div class="pj-tete"><div><p class="sur2">{e(t["nprojets"])}</p><h2 id="pj-t">{e(t["pj_titre"])}</h2></div></div>
<div class="carrousel"><ul class="pistes" id="pistes">{cartes}</ul>
<button class="nav-c prec" type="button" aria-label="{e(t["pj_prec"])}" aria-controls="pistes">{svg("fg","ico dir")}</button><button class="nav-c suiv" type="button" aria-label="{e(t["pj_suiv"])}" aria-controls="pistes">{svg("fd","ico dir")}</button></div>
<div class="points" aria-hidden="true"><span class="on"></span><span></span><span></span></div>
</div></section>'''
def json_projets():
    d={"maj":"2026-10-14","beneficiaire":"Association FEINN Équitation et Environnement (SIREN 898 028 980)","dons_en_ligne":False,"projets":[]}
    for i,(pid,k) in enumerate(zip(PROJ_IDS,PROJ_PH)):
        d["projets"].append({"id":pid,"numero":f"0{i+1}","photo":PHOTOS[k] if photo(k) else None,"photo_definitive":os.path.exists(os.path.join(RACINE,f"images/asso/{k}.jpg")),
          "ancre":f"/{{lang}}/association/#projet-{pid}",
          "textes":{lg:{"titre":T[lg]["projets"][i][0],"court":T[lg]["pj_courts"][i],"long":T[lg]["projets"][i][1]} for lg in L}})
    return json.dumps(d,ensure_ascii=False,indent=1)

# ═══ ÉTAPE 4 (14/10) : « Notre lieu » (sans dire que l'association est propriétaire du site) ═══
LIEU={
"fr":("Un lieu de vie et de partage","Le site équestre d'Itteville, utilisé par l'association depuis 2020, accueille nos chevaux et nos cavaliers dans un cadre naturel privilégié.",["12 boxes","Une carrière","Un rond de longe","Des prés et paddocks"]),
"en":("A place to live and share","The Itteville equestrian site, used by the association since 2020, welcomes our horses and riders in a privileged natural setting.",["12 stables","An arena","A lunging ring","Fields and paddocks"]),
"es":("Un lugar de vida y de encuentro","El centro ecuestre de Itteville, utilizado por la asociación desde 2020, acoge a nuestros caballos y jinetes en un entorno natural privilegiado.",["12 boxes","Una pista","Un picadero redondo","Prados y paddocks"]),
"it":("Un luogo di vita e di condivisione","Il centro equestre di Itteville, utilizzato dall'associazione dal 2020, accoglie i nostri cavalli e cavalieri in una cornice naturale privilegiata.",["12 box","Un campo","Un tondino","Prati e paddock"]),
"de":("Ein Ort zum Leben und Teilen","Die Reitanlage in Itteville, die der Verein seit 2020 nutzt, bietet unseren Pferden und Reitern eine besonders schöne natürliche Umgebung.",["12 Boxen","Ein Reitplatz","Ein Longierzirkel","Weiden und Paddocks"]),
"ja":("暮らしと分かち合いの場所","協会が2020年から利用しているイッテヴィルの乗馬施設は、恵まれた自然の中で私たちの馬とライダーを迎えています。",["12の馬房","馬場","丸馬場","放牧地とパドック"]),
"ar":("مكان للحياة والمشاركة","يستقبل الموقع الفروسي في إيتفيل، الذي تستخدمه الجمعية منذ عام 2020، خيولنا وفرساننا في إطار طبيعي مميز.",["12 إسطبلًا","ساحة تدريب","حلبة دائرية للترويض","مراعٍ وحظائر"]),
"zh":("生活与分享之地","协会自2020年起使用的伊特维尔（Itteville）马术场地，在得天独厚的自然环境中迎接我们的马和骑手。",["12 间马房","一个室外马场","一个圆形练马场","草场和围场"]),
"nl":("Een plek om te leven en te delen","Het ruitersportterrein in Itteville, dat de vereniging sinds 2020 gebruikt, verwelkomt onze paarden en ruiters in een bevoorrechte natuurlijke omgeving.",["12 boxen","Een buitenbak","Een longeercirkel","Weides en paddocks"]),
"pt":("Um lugar para viver e compartilhar","O espaço equestre de Itteville, utilizado pela associação desde 2020, recebe nossos cavalos e cavaleiros em um cenário natural privilegiado.",["12 baias","Uma pista externa","Um picadeiro redondo","Pastos e piquetes"]),
"sv":("En plats att leva och dela på","Ridanläggningen i Itteville, som föreningen har använt sedan 2020, tar emot våra hästar och ryttare i en privilegierad naturmiljö.",["12 boxar","En utebana","En longeringsrund","Hagar och rasthagar"]),
"ru":("Место для жизни и общения","Конноспортивная площадка в Итвиле, которую ассоциация использует с 2020 года, принимает наших лошадей и всадников в чудесной природной обстановке.",["12 денников","Открытый плац","Круглый загон для работы на корде","Пастбища и левады"]),
"pl":("Miejsce do życia i spotkań","Ośrodek jeździecki w Itteville, z którego stowarzyszenie korzysta od 2020 roku, przyjmuje nasze konie i jeźdźców w wyjątkowo pięknym, naturalnym otoczeniu.",["12 boksów","Plac","Okrąg do lonżowania","Pastwiska i padoki"]),
}
ICO["carriere"]='<rect x="3" y="7" width="18" height="10" rx="1"/><path d="M3 10.5h18M3 13.5h18M7.5 7v10M16.5 7v10"/>'
ICO["rond"]='<ellipse cx="12" cy="10.5" rx="8.5" ry="4.5"/><path d="M3.5 10.5v3c0 2.5 3.8 4.5 8.5 4.5s8.5-2 8.5-4.5v-3"/>'
ICO["cloture"]='<path d="M5.5 5v14M10.5 5v14M15.5 5v14M20.5 5v14M3 9h19M3 14h19"/>'
LIEU_ATTENTE="images/fond-cavaliers-ecurie.webp"
def section_lieu(lg):
    titre,texte,atouts=LIEU[lg]; ic=["maison","carriere","rond","cloture"]
    img="images/asso/lieu.jpg" if os.path.exists(os.path.join(RACINE,"images/asso/lieu.jpg")) else LIEU_ATTENTE
    li="".join(f'<li>{svg(i)}<span>{e(a)}</span></li>' for i,a in zip(ic,atouts))
    return f'''<section class="lieu" id="lieu" aria-labelledby="lieu-t"><img class="lieu-fond" src="/{img}" alt="" loading="lazy">
<div class="in"><div class="lieu-txt"><p class="sur">{e(T[lg]["lieu"])}</p><h2 id="lieu-t">{e(titre)}</h2><p>{e(texte)}</p></div><ul class="atouts">{li}</ul></div></section>'''

# ═══ ÉTAPE 5 (14/10) : « Nous soutenir » (aucun paiement : contact par e-mail en attendant le compte Stripe de l'association) ═══
SOUT={
"fr":("Agir ensemble pour nos chevaux et notre environnement","Votre soutien permet de faire vivre nos projets et d'accompagner durablement nos actions. Les dons en ligne seront bientôt disponibles. En attendant, vous pouvez nous contacter pour en savoir plus.","Nous contacter pour soutenir un projet","Parce qu'un cheval change une vie, il mérite toute notre attention.","Soutenir un projet FEINN"),
"en":("Acting together for our horses and our environment","Your support keeps our projects alive and helps us sustain our work over time. Online donations will be available soon. In the meantime, contact us to find out more.","Contact us to support a project","Because a horse changes a life, it deserves all our attention.","Supporting a FEINN project"),
"es":("Actuar juntos por nuestros caballos y nuestro entorno","Tu apoyo da vida a nuestros proyectos y nos ayuda a mantener nuestras acciones en el tiempo. Las donaciones en línea estarán disponibles pronto. Mientras tanto, puedes contactarnos para saber más.","Contáctanos para apoyar un proyecto","Porque un caballo cambia una vida, merece toda nuestra atención.","Apoyar un proyecto de FEINN"),
"it":("Agire insieme per i nostri cavalli e il nostro ambiente","Il vostro sostegno fa vivere i nostri progetti e accompagna nel tempo le nostre azioni. Le donazioni online saranno presto disponibili. Nel frattempo, potete contattarci per saperne di più.","Contattaci per sostenere un progetto","Perché un cavallo cambia una vita, merita tutta la nostra attenzione.","Sostenere un progetto FEINN"),
"de":("Gemeinsam für unsere Pferde und unsere Umwelt","Ihre Unterstützung hält unsere Projekte lebendig und begleitet unsere Arbeit dauerhaft. Online-Spenden sind bald möglich. Bis dahin können Sie uns gerne kontaktieren, um mehr zu erfahren.","Kontaktieren Sie uns, um ein Projekt zu unterstützen","Weil ein Pferd ein Leben verändert, verdient es unsere ganze Aufmerksamkeit.","Ein FEINN-Projekt unterstützen"),
"ja":("馬たちと環境のために、ともに行動を","皆さまのご支援が、私たちのプロジェクトを支え、活動を長く続ける力になります。オンラインでの寄付はまもなく開始します。それまでは、お気軽にお問い合わせください。","プロジェクトの支援について問い合わせる","馬は人生を変えてくれる。だからこそ、心を尽くして向き合いたい。","FEINNのプロジェクト支援について"),
"ar":("معًا من أجل خيولنا وبيئتنا","دعمكم يُحيي مشاريعنا ويساعدنا على مواصلة أعمالنا على المدى الطويل. سيتوفر التبرع عبر الإنترنت قريبًا. وفي الأثناء، يمكنكم التواصل معنا لمعرفة المزيد.","تواصل معنا لدعم مشروع","لأن الحصان يغيّر حياة، فهو يستحق كل اهتمامنا.","دعم مشروع لجمعية FEINN"),
"zh":("携手为我们的马和环境行动","你的支持让我们的项目得以延续，也帮助我们长期开展各项行动。在线捐赠即将开通。在此之前，你可以联系我们了解更多。","联系我们，支持一个项目","因为一匹马可以改变一个人的生活，所以它值得我们倾注全部关注。","支持 FEINN 的一个项目"),
"nl":("Samen aan de slag voor onze paarden en onze omgeving","Jouw steun houdt onze projecten levend en helpt ons om onze acties op lange termijn voort te zetten. Online doneren is binnenkort mogelijk. Tot die tijd kun je contact met ons opnemen om meer te weten te komen.","Neem contact op om een project te steunen","Omdat een paard een leven kan veranderen, verdient het al onze aandacht.","Een FEINN-project steunen"),
"pt":("Juntos pelos nossos cavalos e pelo nosso meio ambiente","O seu apoio dá vida aos nossos projetos e nos ajuda a manter nossas ações a longo prazo. As doações online estarão disponíveis em breve. Enquanto isso, entre em contato conosco para saber mais.","Entre em contato para apoiar um projeto","Porque um cavalo pode mudar uma vida, ele merece toda a nossa atenção.","Apoiar um projeto da FEINN"),
"sv":("Tillsammans för våra hästar och vår miljö","Ditt stöd ger liv åt våra projekt och hjälper oss att driva vårt arbete långsiktigt. Donationer online blir snart möjliga. Till dess kan du kontakta oss för att veta mer.","Kontakta oss för att stödja ett projekt","Eftersom en häst kan förändra ett liv förtjänar den all vår uppmärksamhet.","Stöd ett FEINN-projekt"),
"ru":("Действуем вместе ради наших лошадей и нашей среды","Твоя поддержка помогает нашим проектам жить и позволяет нам долго продолжать нашу работу. Онлайн-пожертвования скоро станут доступны. А пока ты можешь связаться с нами, чтобы узнать больше.","Связаться с нами, чтобы поддержать проект","Потому что лошадь может изменить жизнь, она заслуживает всего нашего внимания.","Поддержать проект FEINN"),
"pl":("Działamy razem dla naszych koni i naszego środowiska","Twoje wsparcie pozwala naszym projektom żyć i pomaga nam prowadzić naszą działalność przez długi czas. Darowizny online będą wkrótce dostępne. Do tego czasu możesz się z nami skontaktować, aby dowiedzieć się więcej.","Skontaktuj się z nami, aby wesprzeć projekt","Ponieważ koń może odmienić życie, zasługuje na całą naszą uwagę.","Wesprzyj projekt FEINN"),
}
SOUT_ATTENTE="images/evenements-passes-large.webp"
def section_soutenir(lg):
    titre,texte,btn,cit,objet=SOUT[lg]
    img="images/asso/soutenir.jpg" if os.path.exists(os.path.join(RACINE,"images/asso/soutenir.jpg")) else SOUT_ATTENTE
    from urllib.parse import quote
    return f'''<section class="soutenir" id="soutenir" aria-labelledby="sout-t"><div class="sout-txt"><p class="sur2">{e(T[lg]["soutenir"])}</p><h2 id="sout-t">{e(titre)}</h2><p>{e(texte)}</p>
<div class="sout-actions"><a class="btn2" href="mailto:feinn@live.fr?subject={quote(objet)}">{e(btn)} {svg("fleche","ico dir")}</a><span class="mail">feinn@live.fr</span></div></div>
<figure class="sout-photo"><img src="/{img}" alt="" loading="lazy"><blockquote>« {e(cit)} »</blockquote></figure></section>'''

CSS=r"""
:root{--noir:#05080B;--noir2:#070A08;--petrole:#0D1518;--ivoire:#F3EEE4;--doux:#C9CFCB;--gris:#9AA39F;--champ:#C9A66B;--trait:rgba(201,166,107,.42);--trait2:rgba(201,166,107,.18);
--serif:"Cormorant Garamond",Georgia,"Times New Roman",serif;--cinzel:Cinzel,"Cormorant Garamond",Georgia,serif;--sans:Montserrat,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%;text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;background:var(--noir);color:var(--ivoire);font:15px/1.65 var(--sans);overflow-x:hidden}
a{color:var(--champ)}a:focus-visible,summary:focus-visible,.btn:focus-visible{outline:2px solid var(--champ);outline-offset:3px}
img{max-width:100%}
.ico{width:20px;height:20px;flex:none}
[dir=rtl] .ico.dir{transform:scaleX(-1)}
/* ── EN-TÊTE ── */
.entete{position:relative;z-index:20;background:#05080B;border-bottom:1px solid rgba(201,166,107,.12)}
.entete .in{max-width:1240px;margin:0 auto;height:60px;display:flex;align-items:center;gap:14px;padding:0 max(16px,env(safe-area-inset-right)) 0 max(16px,env(safe-area-inset-left))}
.marque{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--ivoire);min-width:0}
.marque img{width:44px;height:auto;display:block}
.marque b{display:block;font:500 21px/1 var(--serif);letter-spacing:.12em}
.marque small{display:block;font:400 11.5px/1.25 var(--serif);color:var(--doux);margin-top:3px;white-space:nowrap}
.nav{display:none}
.droite{margin-inline-start:auto;display:flex;align-items:center;gap:10px}
.lng{position:relative}
.lng summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:6px;height:36px;padding:0 12px;border:1px solid var(--trait2);border-radius:999px;font:500 12.5px var(--sans);color:var(--ivoire)}
.lng summary::-webkit-details-marker{display:none}
.lng summary .ico{width:14px;height:14px;color:var(--champ)}
.lng ul{position:absolute;inset-inline-end:0;top:44px;margin:0;padding:6px;list-style:none;background:#0B1114;border:1px solid var(--trait2);border-radius:12px;min-width:150px;box-shadow:0 18px 40px rgba(0,0,0,.5)}
.lng li a,.lng li strong{display:block;padding:8px 12px;border-radius:8px;font-size:13.5px;color:var(--ivoire);text-decoration:none}
.lng li strong{color:var(--champ);font-weight:500}
.lng li a:hover{background:rgba(201,166,107,.08)}
.btn-hype{display:none;align-items:center;height:36px;padding:0 20px;border:1px solid var(--champ);border-radius:999px;color:var(--ivoire);text-decoration:none;font:500 15px var(--serif);letter-spacing:.04em}
.burger summary{list-style:none;cursor:pointer;width:42px;height:42px;display:flex;align-items:center;justify-content:center;color:var(--ivoire)}
.burger summary::-webkit-details-marker{display:none}
.burger summary .ico{width:26px;height:26px}
.burger .x{display:none}.burger[open] .x{display:block}.burger[open] .b{display:none}
.burger nav{position:absolute;left:0;right:0;top:100%;height:calc(100svh - 60px);background:#05080B;padding:18px 24px 40px;overflow-y:auto}
.burger nav a{display:flex;align-items:center;justify-content:space-between;min-height:54px;border-bottom:1px solid rgba(201,166,107,.14);color:var(--ivoire);text-decoration:none;font:500 23px var(--serif)}
.burger nav a .ico{color:var(--champ)}
.burger nav a.hype{justify-content:center;margin-top:26px;border:1px solid var(--champ);border-radius:999px;min-height:48px;font-size:19px}
@media (min-width:1024px){
 .entete{position:sticky;top:env(safe-area-inset-top);padding-top:0}
 .entete .in{height:76px;padding:0 32px}
 .marque b{font-size:25px}.marque small{font-size:12.5px}
 .marque img{width:58px}
 .nav{display:flex;align-items:center;gap:clamp(14px,1.9vw,28px);margin-inline-start:auto}
 .nav a{color:var(--ivoire);text-decoration:none;font:500 15.5px var(--serif);letter-spacing:.01em;white-space:nowrap;opacity:.92}
 .nav a:hover{color:var(--champ)}
 .droite{margin-inline-start:28px}
 .btn-hype{display:inline-flex}
 .marque small{display:none}
 .burger{display:none}
 html{scroll-padding-top:84px}
}
@media (min-width:1200px){.marque small{display:block}}
@media (min-width:1024px) and (max-width:1199px){.nav a{font-size:14.5px}.nav{gap:16px}}
/* ── HERO ── */
.hero{position:relative;overflow:hidden;min-height:0;display:flex;align-items:flex-end;background:var(--noir)}
.hero picture,.hero picture img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:68% 30%}
.hero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,8,11,.05) 0%,rgba(5,8,11,.10) 38%,rgba(5,8,11,.72) 70%,var(--noir) 100%);pointer-events:none}
.hero .txt{position:relative;z-index:2;width:100%;max-width:1240px;margin:0 auto;padding:0 16px 26px}
.sur{font:500 11px/1.4 var(--cinzel);letter-spacing:.22em;text-transform:uppercase;color:var(--ivoire);opacity:.9;margin:0 0 10px}
.feinn{font:400 clamp(50px,13.5vw,96px)/.95 var(--serif);letter-spacing:.14em;margin:0;color:var(--ivoire)}
.accroche{font:400 clamp(25px,7vw,34px)/1.2 var(--serif);margin:0;color:var(--ivoire);max-width:15em}
.filet{width:44px;height:1px;background:var(--champ);margin:16px 0 14px}
.hero-desc{display:none;margin:0 0 22px;max-width:30em;font:400 15px/1.6 var(--sans);color:var(--doux)}
.btn{display:inline-flex;align-items:center;gap:12px;min-height:46px;padding:0 22px;border:1px solid var(--champ);border-radius:999px;color:var(--ivoire);text-decoration:none;font:500 16px var(--serif);background:rgba(5,8,11,.35);letter-spacing:.02em}
.btn .ico{width:18px;height:18px;color:var(--ivoire)}
.btn:hover{background:rgba(201,166,107,.12)}
@media (min-width:640px){.hero-desc{display:block}.hero .txt{padding:0 32px 46px}}
/* 14/10 (haut de page) : sous 1024 px, la photo occupe le haut et le texte se pose dans la zone sombre en dessous — rien ne masque la tête du cheval */
@media (max-width:1023px){
 .hero{display:block}
 .hero picture{position:relative;display:block;height:300px}
 .hero picture img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:62% 22%}
 .hero::after{background:linear-gradient(180deg,rgba(5,8,11,0) 0%,rgba(5,8,11,0) 210px,rgba(5,8,11,.85) 270px,var(--noir) 300px)}
 .hero .txt{margin-top:-46px;padding:0 16px 24px}
 .accroche{max-width:17em}
}
@media (min-width:640px) and (max-width:1023px){.hero picture{height:360px}.hero picture img{object-position:70% 35%}.hero::after{background:linear-gradient(180deg,rgba(5,8,11,0) 0%,rgba(5,8,11,0) 260px,rgba(5,8,11,.85) 330px,var(--noir) 360px)}.hero .txt{padding:0 32px 30px}}

@media (min-width:1024px){
 .hero{min-height:520px;align-items:flex-end}
 .hero picture img{object-position:right 35%}
 .hero::after{background:linear-gradient(90deg,var(--noir) 0%,rgba(5,8,11,.86) 26%,rgba(5,8,11,.35) 50%,rgba(5,8,11,0) 68%),linear-gradient(180deg,rgba(5,8,11,0) 75%,var(--noir) 100%)}
 .hero .txt{padding:60px 32px 64px}
 .hero .accroche{max-width:13em;font-size:38px}
 .accroche{font-size:34px}
}
[dir=rtl] .hero picture img{transform:scaleX(-1)}
@media (min-width:1024px){[dir=rtl] .hero::after{background:linear-gradient(270deg,var(--noir) 0%,rgba(5,8,11,.86) 26%,rgba(5,8,11,.35) 50%,rgba(5,8,11,0) 68%),linear-gradient(180deg,rgba(5,8,11,0) 75%,var(--noir) 100%)}}
/* ── 5 ENGAGEMENTS ── */
.vh{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.engag{background:var(--noir2);border-top:1px solid rgba(201,166,107,.10);border-bottom:1px solid rgba(201,166,107,.10)}
.engag ul{list-style:none;margin:0 auto;max-width:1240px;padding:20px 8px 22px;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:4px}
.engag li{display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px;min-width:0}
.engag .pic{width:50px;height:50px;border-radius:50%;border:1px solid var(--trait);display:flex;align-items:center;justify-content:center;color:var(--champ)}
.engag .pic .ico{width:24px;height:24px;stroke-width:1.2}
.engag .tit{font:500 11px/1.25 var(--serif);color:var(--ivoire)}
.engag .long,.engag .phr{display:none}
@media (min-width:640px){
 .engag ul{padding:28px 24px 30px;gap:0}
 .engag li{padding:0 12px;gap:10px}
 .engag li+li{border-inline-start:1px solid rgba(201,166,107,.22)}
 .engag .pic{border:0;width:auto;height:auto}
 .engag .pic .ico{width:34px;height:34px;stroke-width:1.1}
 .engag .court{display:none}.engag .long{display:inline}
 .engag .tit{font:500 11.5px/1.35 var(--cinzel);letter-spacing:.12em;text-transform:uppercase}
 .engag .phr{display:block;font:400 13.5px/1.4 var(--serif);color:var(--doux);max-width:15em}
}
@media (min-width:1024px){.engag ul{padding:30px 32px 34px}.engag .tit{font-size:12.5px}.engag .phr{font-size:14.5px}}
:lang(ja) .engag .tit,:lang(ar) .engag .tit{letter-spacing:.02em;text-transform:none;font-family:"Hiragino Mincho ProN","Yu Mincho","Noto Naskh Arabic",Georgia,serif}
/* ── PROJETS (section ivoire) ── */
.projets2{background:var(--ivoire);color:#191D1C}
.projets2 .in{max-width:1240px;margin:0 auto;padding:30px 16px 34px}
.pj-tete{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:18px}
.sur2{font:500 11px/1.4 var(--cinzel);letter-spacing:.22em;text-transform:uppercase;color:#9A7A45;margin:0 0 6px}
.projets2 h2{font:400 clamp(27px,7vw,38px)/1.12 var(--serif);margin:0;color:#14181A;text-wrap:balance}
.pj-tous{display:none;align-items:center;gap:10px;color:#14181A;text-decoration:none;font:500 15px var(--serif);white-space:nowrap}
.pj-tous .ico{width:17px;height:17px}
.carrousel{position:relative}
.pistes{list-style:none;margin:0;padding:0 0 4px;display:flex;align-items:flex-start;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.pistes::-webkit-scrollbar{display:none}
.pcarte{flex:0 0 100%;scroll-snap-align:start;background:#FBF8F2;border-radius:6px;overflow:hidden;box-shadow:0 1px 0 rgba(20,24,26,.06),0 10px 28px rgba(20,24,26,.08);display:flex;flex-direction:column;min-width:0}
.pimg{position:relative;aspect-ratio:16/11;background:#D9D2C4;overflow:hidden}
.pimg img{width:100%;height:100%;object-fit:cover;display:block}
.pimg::after{content:"";position:absolute;inset:55% 0 0;background:linear-gradient(180deg,rgba(5,8,11,0),rgba(5,8,11,.55))}
.pimg .num{position:absolute;inset-inline-start:16px;bottom:8px;z-index:1;font:400 30px/1 var(--serif);color:#F3EEE4}
.pcorps{padding:16px 18px 18px;display:flex;flex-direction:column;gap:8px;flex:1}
.pcorps h3{font:500 22px/1.2 var(--serif);margin:0;color:#14181A}
.pcorps p{margin:0;font:400 14px/1.55 var(--sans);color:#4A504D}
.plus{margin-top:auto;padding-top:6px}
.plien{list-style:none;cursor:pointer;display:inline-flex;align-items:center;gap:8px;min-height:40px;color:#14181A;font:500 16px var(--serif);border-bottom:1px solid rgba(154,122,69,.45)}
.plien::-webkit-details-marker{display:none}
.plien .ico{width:16px;height:16px;color:#9A7A45;transition:transform .2s}
.plus .f,.plus[open] .o{display:none}.plus[open] .f{display:inline}
.plus[open] .plien .ico{transform:rotate(180deg)}
.plus p{margin:10px 0 0;font:400 14px/1.6 var(--sans);color:#3E4441}
.nav-c{position:absolute;top:calc((100vw - 32px) * 11 / 32 - 21px);display:none;width:42px;height:42px;border-radius:50%;border:0;background:rgba(251,248,242,.94);color:#14181A;box-shadow:0 4px 14px rgba(0,0,0,.25);cursor:pointer;align-items:center;justify-content:center}
.js .nav-c{display:flex}
.nav-c.prec{inset-inline-start:-6px}.nav-c.suiv{inset-inline-end:-6px}
.nav-c[disabled]{opacity:.35;cursor:default}
.points{display:flex;justify-content:center;gap:8px;margin:14px 0 0}
.points span{width:7px;height:7px;border-radius:50%;background:#CDBF9F}
.points span.on{background:#14181A}
@media (min-width:640px){.pcarte{flex-basis:calc(50% - 7px)}.nav-c{top:calc((100vw - 78px) * 11 / 64 - 21px)}.projets2 .in{padding:40px 32px 44px}}
@media (min-width:1024px){
 .projets2 .in{padding:50px 32px 56px}
 .pj-tous{display:inline-flex}
 .pistes{overflow:visible;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;align-items:stretch}
 .pcarte{flex:none}
 .js .nav-c,.points{display:none}
}
@media (prefers-reduced-motion:reduce){.pistes{scroll-behavior:auto}.plien .ico{transition:none}}
/* ── NOTRE LIEU ── */
.lieu{position:relative;background:var(--noir2);overflow:hidden}
.lieu-fond{position:absolute;inset:0 0 auto 0;width:100%;height:270px;object-fit:cover;object-position:center 40%}
.lieu::before{content:"";position:absolute;inset:0 0 auto 0;height:270px;background:linear-gradient(180deg,rgba(5,8,11,.25) 0%,rgba(5,8,11,.35) 45%,var(--noir2) 100%);z-index:1}
.lieu .in{position:relative;z-index:2;max-width:1240px;margin:0 auto;padding:0 16px}
.lieu-txt{min-height:270px;display:flex;flex-direction:column;justify-content:flex-end;padding-bottom:14px}
.lieu h2{font:400 clamp(26px,7vw,38px)/1.12 var(--serif);margin:0 0 8px;color:var(--ivoire);text-wrap:balance}
.lieu-txt p:last-child{margin:0;max-width:30em;font:400 14px/1.55 var(--sans);color:var(--doux)}
.atouts{list-style:none;margin:0;padding:12px 0 18px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;border-top:1px solid rgba(201,166,107,.16)}
.atouts li{display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px;min-width:0;font:500 12.5px/1.25 var(--serif);color:var(--ivoire)}
.atouts .ico{width:24px;height:24px;color:var(--champ);stroke-width:1.1}
@media (min-width:640px){.lieu .in{padding:0 32px}.atouts li{font-size:14.5px}.atouts .ico{width:30px;height:30px}.lieu-fond,.lieu::before{height:340px}.lieu-txt{min-height:340px}}
@media (min-width:1024px){
 .lieu{min-height:440px}
 .lieu-fond{height:100%}
 .lieu::before{height:100%;background:linear-gradient(90deg,rgba(5,8,11,.92) 0%,rgba(5,8,11,.66) 30%,rgba(5,8,11,.12) 55%,rgba(5,8,11,0) 75%)}
 .lieu .in{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:40px;min-height:440px}
 .lieu-txt{min-height:0;padding:56px 0}
 .atouts{border:1px solid rgba(201,166,107,.28);border-radius:10px;background:rgba(7,10,8,.72);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);padding:22px 8px;gap:0;align-self:end;margin-bottom:44px;width:min(520px,44vw)}
 .atouts li{padding:0 10px}
 .atouts li+li{border-inline-start:1px solid rgba(201,166,107,.22)}
}
[dir=rtl] .lieu-fond{transform:scaleX(-1)}
@media (min-width:1024px){[dir=rtl] .lieu::before{background:linear-gradient(270deg,rgba(5,8,11,.92) 0%,rgba(5,8,11,.66) 30%,rgba(5,8,11,.12) 55%,rgba(5,8,11,0) 75%)}}
/* ── NOUS SOUTENIR ── */
.soutenir{background:var(--ivoire);color:#191D1C;display:grid;grid-template-columns:minmax(0,1fr)}
.sout-txt{padding:24px 16px 22px;max-width:640px}
.soutenir h2{font:400 clamp(26px,6.8vw,34px)/1.14 var(--serif);margin:0 0 10px;color:#14181A;text-wrap:balance}
.sout-txt>p:not(.sur2){margin:0 0 16px;font:400 14px/1.55 var(--sans);color:#4A504D}
.sout-actions{display:flex;flex-wrap:wrap;align-items:center;gap:12px 18px}
.btn2{display:inline-flex;align-items:center;gap:10px;min-height:44px;padding:0 20px;border-radius:999px;background:#0F1416;color:#F3EEE4;text-decoration:none;font:500 16px var(--serif);border:1px solid #0F1416}
.btn2 .ico{width:18px;height:18px}
.btn2:hover{background:#1C2427}
.mail{font:400 14px var(--sans);color:#4A504D;user-select:all}
.sout-photo{position:relative;margin:0;min-height:150px;background:var(--noir);overflow:hidden}
.sout-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:70% 40%}
.sout-photo::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,8,11,.15),rgba(5,8,11,.65))}
.sout-photo blockquote{position:absolute;inset-inline:16px;bottom:14px;z-index:1;margin:0;font:italic 500 17px/1.35 var(--serif);color:#F3EEE4;text-align:start}
@media (min-width:640px){.sout-txt{padding:40px 32px}.sout-photo{min-height:240px}.sout-photo blockquote{font-size:19px;bottom:22px;inset-inline:24px}}
@media (min-width:1024px){
 .soutenir{grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);min-height:300px}
 .sout-txt{padding:44px 32px 44px max(32px,calc((100vw - 1240px)/2 + 32px));max-width:none;align-self:center}
 .sout-photo{min-height:0}
 .sout-photo::after{background:linear-gradient(90deg,var(--ivoire) 0%,rgba(243,238,228,.55) 14%,rgba(5,8,11,.10) 38%,rgba(5,8,11,.35) 100%),linear-gradient(0deg,rgba(5,8,11,.7) 0%,rgba(5,8,11,0) 45%)}
 [dir=rtl] .sout-photo::after{background:linear-gradient(270deg,var(--ivoire) 0%,rgba(243,238,228,.55) 14%,rgba(5,8,11,.10) 38%,rgba(5,8,11,.35) 100%)}
 .sout-photo blockquote{inset-inline:auto 36px;max-width:19em;bottom:30px;text-align:end;font-size:21px;text-shadow:0 1px 12px rgba(0,0,0,.6)}
 .sout-photo{background:linear-gradient(0deg,rgba(5,8,11,.55),rgba(5,8,11,0) 45%)}
}
/* ── L'ASSOCIATION (texte) ── */
.asso-txt{margin:0;padding:40px 0 8px}
.asso-txt h2{margin-top:0}
.asso-txt p{max-width:42em}
@media (min-width:640px){.asso-txt{padding:52px 0 8px}}
/* ── PAGE MENTIONS LÉGALES ── */
.ml-page{padding-top:28px;padding-bottom:44px}
.ml-sur{color:var(--champ)}
.ml-h1{font:400 clamp(30px,8vw,44px)/1.1 var(--serif);margin:0 0 6px;color:var(--ivoire)}
.ml-h1+.trait{width:44px;height:1px;background:var(--champ);margin:10px 0 18px}
.ml-retour{margin:28px 0 0}
/* ── CONTENU (sections actuelles, refondues aux étapes suivantes) ── */
main{max-width:1240px;margin:0 auto;padding:0 16px 20px}
h2{font:500 clamp(28px,7vw,38px)/1.1 var(--serif);margin:42px 0 6px;color:var(--ivoire)}
h2+.trait{width:44px;height:1px;background:var(--champ);margin:10px 0 18px}
.texte p{margin:0 0 14px;color:var(--doux)}
.missions{list-style:none;padding:0;margin:22px 0 0;display:flex;flex-wrap:wrap;justify-content:center;row-gap:18px;text-align:center}
.missions li{flex:0 0 33.33%;padding:0 4px;display:flex;flex-direction:column;align-items:center;gap:8px;font-size:11.5px;line-height:1.35;color:var(--doux);min-width:0}
@media (min-width:640px){.missions li{flex-basis:20%}}
.missions .cercle{width:54px;height:54px;border-radius:50%;border:1px solid var(--trait);display:flex;align-items:center;justify-content:center;color:var(--champ)}
.missions .ico{width:25px;height:25px}
.bande{position:relative;margin:26px 0 0;border-radius:16px;overflow:hidden;border:1px solid var(--trait2);min-height:180px;display:flex;align-items:center;background:var(--petrole)}
.bande blockquote{position:relative;margin:0 0 0 auto;padding:24px;max-width:70%;font:italic 500 clamp(24px,6.4vw,34px)/1.2 var(--serif);color:var(--ivoire);text-align:end}
.sep{display:flex;align-items:center;gap:10px;margin:40px 0 0;color:var(--champ)}
.sep::before,.sep::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,rgba(201,166,107,0),var(--trait),rgba(201,166,107,0))}
.sep span{width:6px;height:6px;transform:rotate(45deg);background:var(--champ);opacity:.8}
.intro2{color:var(--doux);margin:0 0 18px}
.projets{list-style:none;padding:0;margin:0;display:grid;gap:14px}
.projet{display:grid;grid-template-columns:38% 1fr;gap:16px;padding:12px;border-radius:16px;border:1px solid var(--trait2);background:var(--petrole)}
.projet .photo{border-radius:11px;overflow:hidden;aspect-ratio:3/4;min-height:150px}
.projet .photo img{width:100%;height:100%;object-fit:cover;display:block}
.projet h3{font:500 25px/1.12 var(--serif);margin:6px 0 8px;color:var(--ivoire)}
.projet .deco{display:flex;align-items:center;gap:10px;color:var(--champ);margin:0 0 10px}
.projet .deco .ico{width:22px;height:22px}
.projet p{margin:0;font-size:13.4px;line-height:1.6;color:var(--doux)}
.legal{display:grid;gap:14px;margin-top:4px}
.carte{border:1px solid var(--trait2);border-radius:16px;background:var(--petrole);padding:4px 16px}
.ligne{display:grid;grid-template-columns:24px minmax(0,.9fr) minmax(0,1.4fr);gap:12px;padding:15px 0;border-bottom:1px solid rgba(201,166,107,.12);align-items:start;font-size:13px}
.ligne:last-child{border-bottom:0}
.ligne .ico{width:21px;height:21px;color:var(--champ);margin-top:1px}
.ligne .lab{color:var(--ivoire);font-weight:500}
.ligne .val{color:var(--gris);line-height:1.55}
.ligne .val span{display:block}
.note{display:grid;grid-template-columns:24px 1fr;gap:12px;padding:16px 0;border-bottom:1px solid rgba(201,166,107,.12)}
.note:last-child{border-bottom:0}
.note .ico{width:22px;height:22px;color:var(--champ)}
.note h3{font:600 19px var(--serif);margin:0 0 3px;color:var(--ivoire)}
.note p{margin:0;font-size:12.8px;color:var(--gris)}
@media (min-width:640px){main{padding:0 32px 24px}.missions .cercle{width:64px;height:64px}.projet{grid-template-columns:34% 1fr;gap:22px;padding:14px}.legal{grid-template-columns:1fr 1fr;align-items:start}}
@media (min-width:1000px){.presentation{display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:center}.projets{grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.projet{grid-template-columns:1fr}.projet .photo{aspect-ratio:4/3;min-height:0}h2{margin-top:60px}}
/* ── PIED DE PAGE ── */
.pied{margin-top:0;background:var(--noir);border-top:1px solid rgba(201,166,107,.14)}
.pied .in{max-width:1240px;margin:0 auto;padding:34px 20px max(30px,env(safe-area-inset-bottom));display:grid;gap:26px;justify-items:center;text-align:center}
.pied .logo{display:flex;flex-direction:column;align-items:center;gap:4px;text-decoration:none;color:var(--ivoire)}
.pied .logo img{width:72px;height:auto}
.pied .logo b{font:500 24px/1 var(--serif);letter-spacing:.14em}
.pied .logo small{font:400 12.5px var(--serif);color:var(--doux)}
.pied .infos,.pied .liens{font:400 13.5px/1.75 var(--serif);color:var(--doux)}
.pied .infos span{display:block}
.pied .infos a,.pied .liens a{color:var(--doux);text-decoration:none}
.pied .liens a{display:block}
@media (max-width:1023px){
 .pied .in{grid-template-columns:1fr auto;grid-template-areas:"logo lng" "infos infos" "liens liens" "res cit";justify-items:start;text-align:start;gap:14px 16px;padding:22px max(16px,env(safe-area-inset-right)) max(20px,env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left))}
 .pied .logo{grid-area:logo;flex-direction:row;gap:10px}.pied .logo img{width:40px}.pied .logo b{font-size:18px}.pied .logo small{display:none}
 .pied .lng{grid-area:lng;justify-self:end}
 .pied .infos{grid-area:infos;font-size:12.5px;line-height:1.55}.pied .infos span{display:inline}.pied .infos span::after{content:" · "}.pied .infos span:last-of-type::after{content:""}.pied .infos a{display:block}
 .pied .liens{grid-area:liens;display:flex;flex-wrap:wrap;gap:4px 16px;font-size:13.5px;padding-top:12px;border-top:1px solid rgba(201,166,107,.14);width:100%}.pied .liens a{display:inline}
 .pied .reseaux{grid-area:res}.pied .reseaux a{width:36px;height:36px}
 .pied .cit{grid-area:cit;justify-self:end;text-align:end;font-size:13.5px;max-width:15em}
}
.pied .liens a:hover,.pied .infos a:hover{color:var(--champ)}
.reseaux{display:flex;gap:14px}.reseaux a{width:40px;height:40px;display:flex;align-items:center;justify-content:center;border:1px solid var(--trait2);border-radius:50%;color:var(--ivoire)}.reseaux a:hover{color:var(--champ)}
.pied .cit{font:italic 500 16px/1.5 var(--serif);color:var(--ivoire);max-width:17em;margin:0}
.pied .lng ul{top:auto;bottom:44px}
@media (min-width:1024px){
 .pied .in{grid-template-columns:auto auto auto auto auto 1fr;align-items:center;justify-items:start;text-align:start;gap:44px;padding:30px 48px 34px}
 .pied .logo{align-items:center}
 .pied .infos{padding-inline-start:28px;border-inline-start:1px solid rgba(201,166,107,.2)}
 .pied .cit{justify-self:end;text-align:end}
}
:lang(ja) .feinn,:lang(ar) .feinn{letter-spacing:.06em}
:lang(ja) .sur,:lang(ar) .sur{letter-spacing:.08em}
:lang(ar) body{font-family:system-ui,-apple-system,"Segoe UI",Tahoma,Arial,sans-serif}
:lang(ja) .accroche,:lang(ar) .accroche,:lang(ja) .nav a,:lang(ar) .nav a,:lang(ja) .burger nav a,:lang(ar) .burger nav a,:lang(ja) .btn,:lang(ar) .btn{font-family:"Hiragino Mincho ProN","Yu Mincho","Noto Serif JP","Noto Naskh Arabic",Georgia,serif}
"""
def slot(k,cls,t):
    if photo(k): return f'<div class="{cls} photo"><img src="/{PHOTOS[k]}" alt="" loading="lazy"></div>'
    return f'<div class="{cls} ph" role="img" aria-label="{e(t["photo"])}"></div>'

def selecteur(lg, ident=""):
    items="".join((f'<li><strong lang="{HL.get(x,x)}" aria-current="page">{NOMS[x]}</strong></li>' if x==lg else f'<li><a href="{DOM}/{x}/{CHEMIN}" hreflang="{HL.get(x,x)}" lang="{HL.get(x,x)}">{NOMS[x]}</a></li>') for x in L)
    return f'<details class="lng"{(" id="+chr(34)+ident+chr(34)) if ident else ""}><summary aria-label="{e(T[lg]["langue"])}">{lg.upper()} {svg("chevron")}</summary><ul>{items}</ul></details>'

def page(lg, ml=False):
    t=T[lg]; url=f"{DOM}/{lg}/{CHEMIN}"+("mentions-legales/" if ml else ""); pre=f"/{lg}/{CHEMIN}" if ml else ""
    alts="\n".join(f'<link rel="alternate" hreflang="{HL.get(x,x)}" href="{DOM}/{x}/{CHEMIN}{"mentions-legales/" if ml else ""}">' for x in L)
    jl={"@context":"https://schema.org","@type":"NGO","name":"FEINN Équitation et Environnement","url":url,"logo":f"{DOM}/{LOGO}","email":"feinn@live.fr","foundingDate":"2020-11-19",
        "address":{"@type":"PostalAddress","streetAddress":"3 chemin des Prés Picard","postalCode":"91760","addressLocality":"Itteville","addressCountry":"FR"},
        "identifier":"SIREN 898 028 980","description":t["desc"]}
    mico=["cap","fer","coeur","pousse","arbre"]; pico=["fer","coeur","pousse"]; pph=["jeune","retraite","espaces"]
    liens=[("#haut",t["accueil"]),("#association",t["asso"]),("#engagements",t["engag"]),("#projets",t["nprojets"]),("#lieu",t["lieu"]),("#soutenir",t["soutenir"])]
    nav="".join(f'<a href="{pre}{h}">{e(x)}</a>' for h,x in liens)
    navm="".join(f'<a href="{pre}{h}">{e(x)}<span>{svg("fleche","ico dir")}</span></a>' for h,x in liens)
    vrai_hero=os.path.exists(os.path.join(RACINE,"images/asso/hero.jpg"))
    if vrai_hero:
        pic=f'<picture><img src="/images/asso/hero.jpg" alt="" fetchpriority="high"></picture>'
    else:
        pic=f'<picture><source media="(max-width:639px)" srcset="/{HERO_ATTENTE_PORTRAIT}"><img src="/{HERO_ATTENTE_LARGE}" alt="" fetchpriority="high"></picture>'
    corps=f'''<section class="hero">{pic}
<div class="txt"><h1 class="accroche">{e(t["accroche"])}</h1><div class="filet"></div>
<a class="btn" href="#association">{e(t["btn_asso"])} {svg("fleche","ico dir")}</a></div>
</section>
{bandeau(lg)}
{section_projets(lg)}
{section_lieu(lg)}
{section_soutenir(lg)}
<main>
<section class="presentation asso-txt" id="association"><div class="texte"><h2>{e(t["notre"])}</h2><div class="trait"></div>{"".join(f"<p>{e(p)}</p>" for p in t["intro"])}</div></section>
</main>
''' if not ml else f'''<main class="ml-page">
<p class="sur2 ml-sur">FEINN · Équitation et Environnement</p>
<section><h1 class="ml-h1">{e(t["ml_t"])}</h1><div class="trait"></div>
<div class="legal"><div class="carte">
<div class="ligne">{svg("maison")}<span class="lab">{e(t["editeur"])}</span><span class="val">{"".join(f"<span>{e(x)}</span>" for x in t["editeur_v"])}</span></div>
<div class="ligne">{svg("perso")}<span class="lab">{e(t["resp"])}</span><span class="val">{"".join(f"<span>{e(x)}</span>" for x in t["resp_v"])}</span></div>
<div class="ligne">{svg("mail")}<span class="lab">{e(t["contact"])}</span><span class="val"><a href="mailto:feinn@live.fr">feinn@live.fr</a></span></div>
<div class="ligne">{svg("serveur")}<span class="lab">{e(t["hebergeur"])}</span><span class="val">{"".join(f"<span>{e(x)}</span>" for x in t["heb_v"])}</span></div>
</div><div class="carte">
<div class="note" id="donnees">{svg("bouclier")}<div><h3>{e(t["donnees"])}</h3><p>{e(t["donnees_v"])} <a href="mailto:feinn@live.fr">feinn@live.fr</a></p></div></div>
<div class="note">{svg("doc")}<div><h3>{e(t["abos"])}</h3><p>{e(t["abos_v"])}</p></div></div>
</div></div></section>
<p class="ml-retour"><a class="btn" href="{pre}">{svg("fg","ico dir")} {e(t["asso"])}</a></p>
</main>
'''
    h=f'''<header class="entete" id="haut"><div class="in">
<a class="marque" href="{pre}#haut"><img src="/{LOGO}" alt="{e(t["logo_alt"])}" width="58" height="33"><span><b>FEINN</b><small>Équitation et Environnement</small></span></a>
<nav class="nav" aria-label="{e(t["menu"])}">{nav}</nav>
<div class="droite">{selecteur(lg)}<a class="btn-hype" href="{DOM}/{lg}/">Hype</a>
<details class="burger"><summary aria-label="{e(t["menu"])}"><span class="b">{svg("burger")}</span><span class="x">{svg("croix")}</span></summary><nav aria-label="{e(t["menu"])}">{navm}<a class="hype" href="{DOM}/{lg}/">Hype</a></nav></details></div>
</div></header>
{corps}
<span id="mentions-legales" class="vh"></span><span id="donnees" class="vh"></span>
<footer class="pied"><div class="in">
<a class="logo" href="{pre}#haut"><img src="/{LOGO}" alt="" width="72" height="40"><b>FEINN</b><small>Équitation et Environnement</small></a>
<div class="infos"><span>{e(t["loi1901"])}</span><span>SIREN 898 028 980</span><span>3 chemin des Prés Picard, 91760 Itteville</span><a href="mailto:feinn@live.fr">feinn@live.fr</a></div>
<div class="liens"><a href="/{lg}/{CHEMIN}mentions-legales/">{e(t["ml_t"])}</a><a href="/{lg}/{CHEMIN}mentions-legales/#donnees">{e(t["donnees"])}</a><a href="mailto:feinn@live.fr">{e(t["contacter"])}</a><a href="{DOM}/{lg}/">Hype</a></div>
<div class="reseaux"><a href="https://www.instagram.com/team_feinn/" rel="noopener" target="_blank" aria-label="Instagram">{svg("insta")}</a><a href="https://www.facebook.com/share/1FKSP18HTk/" rel="noopener" target="_blank" aria-label="Facebook">{svg("fb")}</a></div>
{selecteur(lg,"langues")}
<p class="cit">« {e(t["cit_pied"])} »</p>
</div></footer>
<script>document.documentElement.classList.add('js');
(function(){{var p=document.getElementById('pistes');if(!p)return;var c=p.children,pts=document.querySelectorAll('.points span'),pr=document.querySelector('.nav-c.prec'),sv=document.querySelector('.nav-c.suiv');
function idx(){{var w=c[0].getBoundingClientRect().width+14;return Math.round(Math.abs(p.scrollLeft)/w);}}
function maj(){{var i=Math.min(idx(),c.length-1);pts.forEach(function(s,k){{s.classList.toggle('on',k===i);}});if(pr)pr.disabled=i<=0;if(sv)sv.disabled=i>=c.length-1;}}
function aller(d){{var i=Math.max(0,Math.min(c.length-1,idx()+d));c[i].scrollIntoView({{behavior:'smooth',block:'nearest',inline:'start'}});}}
p.addEventListener('scroll',function(){{window.requestAnimationFrame(maj);}},{{passive:true}});if(pr)pr.addEventListener('click',function(){{aller(-1);}});if(sv)sv.addEventListener('click',function(){{aller(1);}});maj();
function ouvrir(id){{var d=document.getElementById(id);if(d&&d.tagName==='DETAILS'){{d.open=true;var li=d.closest('.pcarte');if(li)li.scrollIntoView({{block:'nearest',inline:'start'}});}}}}
if(location.hash)ouvrir(location.hash.slice(1));}})();
document.querySelectorAll('.burger nav a').forEach(function(a){{a.addEventListener('click',function(){{var d=a.closest('details');if(d)d.open=false;}});}});
document.addEventListener('click',function(ev){{document.querySelectorAll('details.lng[open]').forEach(function(d){{if(!d.contains(ev.target))d.open=false;}});}});</script>'''
    og="images/asso/hero.jpg" if vrai_hero else HERO_ATTENTE_LARGE
    return f"""<!doctype html>
<html lang="{HL.get(lg,lg)}"{' dir="rtl"' if lg=="ar" else ""}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e((t["ml_t"]+" · FEINN Équitation et Environnement") if ml else t["title"])}</title>
<meta name="description" content="{e(t["desc"])}">
<link rel="canonical" href="{url}">
{alts}
<link rel="alternate" hreflang="x-default" href="{DOM}/fr/{CHEMIN}{"mentions-legales/" if ml else ""}">
<meta name="theme-color" content="#05080B">
<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="website"><meta property="og:site_name" content="Hype"><meta property="og:locale" content="{LOC[lg]}">
<meta property="og:title" content="{e((t["ml_t"]+" · FEINN Équitation et Environnement") if ml else t["title"])}"><meta property="og:description" content="{e(t["desc"])}"><meta property="og:url" content="{url}">
<meta property="og:image" content="{DOM}/{og}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
{"" if ml else chr(60)+"script type=\"application/ld+json\">"+json.dumps(jl,ensure_ascii=False).replace("<","\\u003c")+chr(60)+"/script>"}
<style>{CSS}</style>
</head>
<body>
{h}
</body>
</html>
"""
SORTIE=sys.argv[2] if len(sys.argv)>2 else RACINE
for lg in L:
    os.makedirs(f"{SORTIE}/{lg}/{CHEMIN}",exist_ok=True)
    open(f"{SORTIE}/{lg}/{CHEMIN}index.html","w",encoding="utf-8").write(page(lg))
    os.makedirs(f"{SORTIE}/{lg}/{CHEMIN}mentions-legales",exist_ok=True)
    open(f"{SORTIE}/{lg}/{CHEMIN}mentions-legales/index.html","w",encoding="utf-8").write(page(lg,ml=True))
os.makedirs(f"{SORTIE}/data",exist_ok=True)
open(f"{SORTIE}/data/projets-feinn.json","w",encoding="utf-8").write(json_projets())
print("ok", {k:photo(k) for k in PHOTOS})
