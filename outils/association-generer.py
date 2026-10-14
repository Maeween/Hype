# Page publique « L'association » (FEINN Équitation et Environnement), 7 langues — d'après la maquette validée le 13/10.
import os, json, html, sys
RACINE = sys.argv[1] if len(sys.argv) > 1 else "/home/claude/hype"
DOM="https://2hype.fr"; CHEMIN="association/"
L=["fr","en","es","it","de","ja","ar"]
NOMS={"fr":"Français","en":"English","es":"Español","it":"Italiano","de":"Deutsch","ja":"日本語","ar":"العربية"}
LOC={"fr":"fr_FR","en":"en_GB","es":"es_ES","it":"it_IT","de":"de_DE","ja":"ja_JP","ar":"ar_AR"}
e=html.escape
# Photos : fichiers à déposer par Blandine dans images/asso/ ; tant qu'ils manquent → emplacement sobre
PHOTOS={k:f"images/asso/{k}.jpg" for k in ["hero","jeune","retraite","espaces"]}
# 14/10 : en attendant les vraies photos de FEINN, images de Hype deja dans le depot (Blandine : « le visuel est hard », cadres vides)
PHOTOS_ATTENTE={"hero":"images/fond-cavaliers-ecurie.webp","jeune":"images/team-competition-performances-hero.webp","retraite":"images/mes-chevaux-fond-couchant.webp","espaces":"images/accueil_v2_fin_de_page_v1.webp"}
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

CSS=r"""
:root{--noir:#05080B;--noir2:#070A08;--petrole:#0D1518;--ivoire:#F3EEE4;--doux:#C9CFCB;--gris:#9AA39F;--champ:#C9A66B;--trait:rgba(201,166,107,.42);--trait2:rgba(201,166,107,.18);
--serif:"Cormorant Garamond",Georgia,"Times New Roman",serif;--cinzel:Cinzel,"Cormorant Garamond",Georgia,serif;--sans:Montserrat,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%;text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:76px}
body{margin:0;background:var(--noir);color:var(--ivoire);font:15px/1.65 var(--sans);overflow-x:hidden}
a{color:var(--champ)}a:focus-visible,summary:focus-visible,.btn:focus-visible{outline:2px solid var(--champ);outline-offset:3px}
img{max-width:100%}
.ico{width:20px;height:20px;flex:none}
[dir=rtl] .ico.dir{transform:scaleX(-1)}
/* ── EN-TÊTE ── */
.entete{position:sticky;top:0;z-index:20;background:#05080B;border-bottom:1px solid rgba(201,166,107,.12)}
.entete .in{max-width:1240px;margin:0 auto;height:68px;display:flex;align-items:center;gap:18px;padding:0 16px;padding-top:env(safe-area-inset-top)}
.marque{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--ivoire);min-width:0}
.marque img{width:52px;height:auto;display:block}
.marque b{display:block;font:500 25px/1 var(--serif);letter-spacing:.12em}
.marque small{display:block;font:400 12.5px/1.25 var(--serif);color:var(--doux);margin-top:3px;white-space:nowrap}
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
.burger nav{position:fixed;left:0;right:0;top:calc(68px + env(safe-area-inset-top));bottom:0;background:#05080B;padding:18px 24px 40px;overflow-y:auto}
.burger nav a{display:flex;align-items:center;justify-content:space-between;min-height:54px;border-bottom:1px solid rgba(201,166,107,.14);color:var(--ivoire);text-decoration:none;font:500 23px var(--serif)}
.burger nav a .ico{color:var(--champ)}
.burger nav a.hype{justify-content:center;margin-top:26px;border:1px solid var(--champ);border-radius:999px;min-height:48px;font-size:19px}
@media (min-width:1024px){
 .entete .in{height:76px;padding:0 32px}
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
.hero{position:relative;overflow:hidden;min-height:clamp(520px,82svh,640px);display:flex;align-items:flex-end;background:var(--noir)}
.hero picture,.hero picture img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:68% 30%}
.hero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,8,11,.05) 0%,rgba(5,8,11,.10) 38%,rgba(5,8,11,.72) 70%,var(--noir) 100%);pointer-events:none}
.hero .txt{position:relative;z-index:2;width:100%;max-width:1240px;margin:0 auto;padding:0 20px 34px}
.sur{font:500 11px/1.4 var(--cinzel);letter-spacing:.22em;text-transform:uppercase;color:var(--ivoire);opacity:.9;margin:0 0 10px}
.feinn{font:400 clamp(58px,15vw,96px)/.95 var(--serif);letter-spacing:.14em;margin:0;color:var(--ivoire)}
.accroche{font:400 clamp(25px,6.6vw,34px)/1.18 var(--serif);margin:10px 0 0;color:var(--ivoire);max-width:15em}
.filet{width:44px;height:1px;background:var(--champ);margin:20px 0 16px}
.hero-desc{display:none;margin:0 0 22px;max-width:30em;font:400 15px/1.6 var(--sans);color:var(--doux)}
.btn{display:inline-flex;align-items:center;gap:12px;min-height:46px;padding:0 22px;border:1px solid var(--champ);border-radius:999px;color:var(--ivoire);text-decoration:none;font:500 16px var(--serif);background:rgba(5,8,11,.35);letter-spacing:.02em}
.btn .ico{width:18px;height:18px;color:var(--ivoire)}
.btn:hover{background:rgba(201,166,107,.12)}
@media (min-width:640px){.hero-desc{display:block}.hero .txt{padding:0 32px 46px}}
@media (min-width:1024px){
 .hero{min-height:560px;align-items:center}
 .hero picture img{object-position:right 35%}
 .hero::after{background:linear-gradient(90deg,var(--noir) 0%,rgba(5,8,11,.86) 26%,rgba(5,8,11,.35) 50%,rgba(5,8,11,0) 68%),linear-gradient(180deg,rgba(5,8,11,0) 75%,var(--noir) 100%)}
 .hero .txt{padding:60px 32px}
 .accroche{font-size:34px}
}
[dir=rtl] .hero picture img{transform:scaleX(-1)}
@media (min-width:1024px){[dir=rtl] .hero::after{background:linear-gradient(270deg,var(--noir) 0%,rgba(5,8,11,.86) 26%,rgba(5,8,11,.35) 50%,rgba(5,8,11,0) 68%),linear-gradient(180deg,rgba(5,8,11,0) 75%,var(--noir) 100%)}}
/* ── CONTENU (sections actuelles, refondues aux étapes suivantes) ── */
main{max-width:1120px;margin:0 auto;padding:0 20px 20px}
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
.pied{margin-top:56px;background:var(--noir);border-top:1px solid rgba(201,166,107,.14)}
.pied .in{max-width:1240px;margin:0 auto;padding:34px 20px max(30px,env(safe-area-inset-bottom));display:grid;gap:26px;justify-items:center;text-align:center}
.pied .logo{display:flex;flex-direction:column;align-items:center;gap:4px;text-decoration:none;color:var(--ivoire)}
.pied .logo img{width:72px;height:auto}
.pied .logo b{font:500 24px/1 var(--serif);letter-spacing:.14em}
.pied .logo small{font:400 12.5px var(--serif);color:var(--doux)}
.pied .infos,.pied .liens{font:400 13.5px/1.75 var(--serif);color:var(--doux)}
.pied .infos span{display:block}
.pied .infos a,.pied .liens a{color:var(--doux);text-decoration:none}
.pied .liens a{display:block}
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
    items="".join((f'<li><strong lang="{x}" aria-current="page">{NOMS[x]}</strong></li>' if x==lg else f'<li><a href="{DOM}/{x}/{CHEMIN}" hreflang="{x}" lang="{x}">{NOMS[x]}</a></li>') for x in L)
    return f'<details class="lng"{(" id="+chr(34)+ident+chr(34)) if ident else ""}><summary aria-label="{e(T[lg]["langue"])}">{lg.upper()} {svg("chevron")}</summary><ul>{items}</ul></details>'

def page(lg):
    t=T[lg]; url=f"{DOM}/{lg}/{CHEMIN}"
    alts="\n".join(f'<link rel="alternate" hreflang="{x}" href="{DOM}/{x}/{CHEMIN}">' for x in L)
    jl={"@context":"https://schema.org","@type":"NGO","name":"FEINN Équitation et Environnement","url":url,"logo":f"{DOM}/{LOGO}","email":"feinn@live.fr","foundingDate":"2020-11-19",
        "address":{"@type":"PostalAddress","streetAddress":"3 chemin des Prés Picard","postalCode":"91760","addressLocality":"Itteville","addressCountry":"FR"},
        "identifier":"SIREN 898 028 980","description":t["desc"]}
    mico=["cap","fer","coeur","pousse","arbre"]; pico=["fer","coeur","pousse"]; pph=["jeune","retraite","espaces"]
    liens=[("#haut",t["accueil"]),("#association",t["asso"]),("#engagements",t["engag"]),("#projets",t["nprojets"]),("#lieu",t["lieu"]),("#soutenir",t["soutenir"])]
    nav="".join(f'<a href="{h}">{e(x)}</a>' for h,x in liens)
    navm="".join(f'<a href="{h}">{e(x)}<span>{svg("fleche","ico dir")}</span></a>' for h,x in liens)
    vrai_hero=os.path.exists(os.path.join(RACINE,"images/asso/hero.jpg"))
    if vrai_hero:
        pic=f'<picture><img src="/images/asso/hero.jpg" alt="" fetchpriority="high"></picture>'
    else:
        pic=f'<picture><source media="(max-width:639px)" srcset="/{HERO_ATTENTE_PORTRAIT}"><img src="/{HERO_ATTENTE_LARGE}" alt="" fetchpriority="high"></picture>'
    h=f'''<header class="entete" id="haut"><div class="in">
<a class="marque" href="#haut"><img src="/{LOGO}" alt="{e(t["logo_alt"])}" width="58" height="33"><span><b>FEINN</b><small>Équitation et Environnement</small></span></a>
<nav class="nav" aria-label="{e(t["menu"])}">{nav}</nav>
<div class="droite">{selecteur(lg)}<a class="btn-hype" href="{DOM}/{lg}/">Hype</a>
<details class="burger"><summary aria-label="{e(t["menu"])}"><span class="b">{svg("burger")}</span><span class="x">{svg("croix")}</span></summary><nav aria-label="{e(t["menu"])}">{navm}<a class="hype" href="{DOM}/{lg}/">Hype</a></nav></details></div>
</div></header>
<section class="hero">{pic}
<div class="txt"><p class="sur">Équitation et Environnement</p><h1 class="feinn">FEINN</h1><p class="accroche">{e(t["accroche"])}</p><div class="filet"></div>
<p class="hero-desc">{e(t["hero_desc"])}</p><a class="btn" href="#association">{e(t["btn_asso"])} {svg("fleche","ico dir")}</a></div>
</section>
<main>
<section class="presentation" id="association"><div class="texte"><h2>{e(t["notre"])}</h2><div class="trait"></div>{"".join(f"<p>{e(p)}</p>" for p in t["intro"])}</div>
<ul class="missions" id="engagements">{"".join(f'<li><span class="cercle">{svg(i)}</span>{e(m)}</li>' for i,m in zip(mico,t["missions"]))}</ul></section>
<div class="bande"><blockquote>{e(t["citation1"])}</blockquote></div>
<div class="sep"><span></span></div>
<section id="projets"><h2>{e(t["projets_t"])}</h2><div class="trait"></div><p class="intro2">{e(t["projets_intro"])}</p>
<ul class="projets">{"".join(f'<li class="projet">{slot(k,"photo",t)}<div><h3>{e(a)}</h3><div class="deco">{svg(i)}</div><p>{e(b)}</p></div></li>' for k,i,(a,b) in zip(pph,pico,t["projets"]))}</ul></section>
<div class="bande"><blockquote>{e(t["citation2"])}</blockquote></div>
<div class="sep"><span></span></div>
<section id="mentions-legales"><h2>{e(t["ml_t"])}</h2><div class="trait"></div>
<div class="legal"><div class="carte">
<div class="ligne">{svg("maison")}<span class="lab">{e(t["editeur"])}</span><span class="val">{"".join(f"<span>{e(x)}</span>" for x in t["editeur_v"])}</span></div>
<div class="ligne">{svg("perso")}<span class="lab">{e(t["resp"])}</span><span class="val">{"".join(f"<span>{e(x)}</span>" for x in t["resp_v"])}</span></div>
<div class="ligne">{svg("mail")}<span class="lab">{e(t["contact"])}</span><span class="val"><a href="mailto:feinn@live.fr">feinn@live.fr</a></span></div>
<div class="ligne">{svg("serveur")}<span class="lab">{e(t["hebergeur"])}</span><span class="val">{"".join(f"<span>{e(x)}</span>" for x in t["heb_v"])}</span></div>
</div><div class="carte">
<div class="note" id="donnees">{svg("bouclier")}<div><h3>{e(t["donnees"])}</h3><p>{e(t["donnees_v"])} <a href="mailto:feinn@live.fr">feinn@live.fr</a></p></div></div>
<div class="note">{svg("doc")}<div><h3>{e(t["abos"])}</h3><p>{e(t["abos_v"])}</p></div></div>
</div></div></section>
</main>
<footer class="pied"><div class="in">
<a class="logo" href="#haut"><img src="/{LOGO}" alt="" width="72" height="40"><b>FEINN</b><small>Équitation et Environnement</small></a>
<div class="infos"><span>{e(t["loi1901"])}</span><span>SIREN 898 028 980</span><span>3 chemin des Prés Picard, 91760 Itteville</span><a href="mailto:feinn@live.fr">feinn@live.fr</a></div>
<div class="liens"><a href="#mentions-legales">{e(t["ml_t"])}</a><a href="#donnees">{e(t["donnees"])}</a><a href="mailto:feinn@live.fr">{e(t["contacter"])}</a><a href="{DOM}/{lg}/">Hype</a></div>
<div class="reseaux"><a href="https://www.instagram.com/team_feinn/" rel="noopener" target="_blank" aria-label="Instagram">{svg("insta")}</a><a href="https://www.facebook.com/share/1FKSP18HTk/" rel="noopener" target="_blank" aria-label="Facebook">{svg("fb")}</a></div>
{selecteur(lg,"langues")}
<p class="cit">« {e(t["cit_pied"])} »</p>
</div></footer>
<script>document.querySelectorAll('.burger nav a').forEach(function(a){{a.addEventListener('click',function(){{var d=a.closest('details');if(d)d.open=false;}});}});
document.addEventListener('click',function(ev){{document.querySelectorAll('details.lng[open]').forEach(function(d){{if(!d.contains(ev.target))d.open=false;}});}});</script>'''
    og="images/asso/hero.jpg" if vrai_hero else HERO_ATTENTE_LARGE
    return f"""<!doctype html>
<html lang="{lg}"{' dir="rtl"' if lg=="ar" else ""}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(t["title"])}</title>
<meta name="description" content="{e(t["desc"])}">
<link rel="canonical" href="{url}">
{alts}
<link rel="alternate" hreflang="x-default" href="{DOM}/fr/{CHEMIN}">
<meta name="theme-color" content="#05080B">
<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="website"><meta property="og:site_name" content="Hype"><meta property="og:locale" content="{LOC[lg]}">
<meta property="og:title" content="{e(t["title"])}"><meta property="og:description" content="{e(t["desc"])}"><meta property="og:url" content="{url}">
<meta property="og:image" content="{DOM}/{og}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
<script type="application/ld+json">{json.dumps(jl,ensure_ascii=False).replace("<","\\u003c")}</script>
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
print("ok", {k:photo(k) for k in PHOTOS})
