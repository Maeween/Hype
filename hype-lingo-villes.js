/* hype-lingo-villes.js — Hype Lingo · Voyage 1 « Anglais »
   ==================================================================
   LES TEXTES DES DIX VILLES. Français seulement pour l'instant.

   Version 2 — réécrite après relecture. Trois changements de fond :
     · chaque lettre raconte un MOMENT VÉCU, pas une présentation ;
     · chaque ville porte UNE IMAGE MENTALE, et la lettre la renforce ;
     · chaque ville a UNE ANECDOTE dont on se souvient.

   L'idée directrice : la vidéo montre le lieu, la carte postale en garde
   le souvenir, la lettre raconte ce que Hype a ressenti en arrivant.
   Les trois doivent porter la même émotion.

   Chaque ville porte :
     lieu    la ligne sous le titre, en anglais (c'est une carte postale)
     carte   true si son image carte-<ref>.webp existe
     image   l'image mentale de la ville — repère de travail, non affiché
     lettre  le verso manuscrit de la carte postale, par langue
     volets  trois dépliants « Prolonge ton voyage »

   ⚠️ TRADUCTION : rien avant validation des dix textes français.
   Ajouter alors en/es/it/de/ja DANS `lettre` et dans chaque volet, sans
   jamais remplacer le français.

   ⚠️ FUSION : ce fichier remplace l'objet VILLES qui était en dur dans
   lingo.html. Si une autre conversation y a ajouté des traductions, les
   récupérer clé par clé — ne pas écraser.

   ⚠️ Les entrées marquées // ?? demandent vérification avant publication.
   ================================================================== */

window.HYPE_LINGO_VILLES = {

/* ============ 1 · NEWMARKET · L'écurie ============ */
newmarket:{
  lieu:"Suffolk · United Kingdom", carte:true,
  image:"les pur-sang traversent la ville",
  lettre:{ fr:["Ce matin, j'ai découvert Newmarket.",
               "Je me suis arrêté à un passage cavalier, et c'est la voiture devant moi qui a attendu. Une vingtaine de pur-sang sont passés dans la brume, sans un mot, et la ville dormait encore."] },
  volets:[
   {t:"La race d'ici",
    c:"Le pur-sang anglais. Trois étalons fondateurs importés au tournant du XVIII siècle, croisés avec des juments locales : toute la race en descend. Sélectionné sur une seule qualité, la vitesse tenue sur la distance."},
   {t:"Le rendez-vous",
    c:"Deux hippodromes se partagent l'année, le Rowley Mile et la July Course. Le premier tirerait son nom du cheval favori de Charles II, qui installa sa cour ici au XVII siècle pour suivre les courses — et courait lui-même."}, // ?? l'origine du nom « Rowley » est traditionnelle, à formuler prudemment
   {t:"Si tu y allais",
    c:"Va sur la lande au petit matin. Des chemins de sable traversent la ville et croisent les routes : aux passages cavaliers, les voitures s'arrêtent. Plus de deux mille chevaux y sont à l'entraînement."}
  ]},

/* ============ 2 · LAMBOURN · Le pansage ============ */
lambourn:{
  lieu:"Berkshire · United Kingdom", carte:true,
  image:"les lots montent sur les Downs",
  lettre:{ fr:["Il faisait encore nuit quand la cour s'est allumée.",
               "J'ai entendu les seaux, puis les sabots sur le pavé. Le temps que j'arrive en haut des Downs, les lots étaient déjà partis — je n'ai vu que la buée qu'ils avaient laissée derrière eux."] },
  volets:[
   {t:"La vallée",
    c:"Lambourn est le deuxième centre d'entraînement britannique après Newmarket. Un village entier qui ne vit que du cheval : entraîneurs, lads, maréchaux, vétérinaires, transporteurs. On l'appelle la vallée du cheval de course."},
   {t:"Le terrain",
    c:"Les Downs, ces collines de craie couvertes d'herbe rase, drainent vite et amortissent bien. C'est le sol qui a fait la réputation de la vallée, pas le hasard : la craie boit l'eau et l'herbe reste portante même après la pluie."},
   {t:"Si tu y allais",
    c:"Monte sur les Downs avant sept heures. On entend les lots arriver bien avant de les voir — d'abord un grondement sourd, puis la respiration des chevaux, et ils passent."}
  ]},

/* ============ 3 · CONNEMARA · Le cheval ============ */
connemara:{
  lieu:"County Galway · Ireland", carte:true,
  image:"les poneys sur la lande, face à l'Atlantique",
  lettre:{ fr:["J'ai cherché les poneys longtemps avant de les voir.",
               "Ils étaient dehors, gris comme le ciel, immobiles derrière un muret de pierres sèches. Le vent ne s'est pas arrêté une seule fois de la journée, et eux n'ont pas bougé."] },
  volets:[
   {t:"Une terre entre ciel et océan",
    c:"Le Connemara est une région où les montagnes, les tourbières, les lacs et l'Atlantique se rencontrent. La lumière y change toutes les heures, et le vent ne s'arrête jamais tout à fait."},
   {t:"Le poney des grands espaces",
    c:"Élevé pendant des générations dans un environnement exigeant, le Connemara est réputé pour son courage, son intelligence et sa sûreté de pied. Compact et bas sur pattes, il saute bien au-dessus de sa taille et porte aussi bien un enfant qui débute qu'un cavalier en compétition."},
   {t:"Le savais-tu ?",
    c:"Une vieille légende veut que certains ancêtres du Connemara soient issus de chevaux espagnols échoués sur ces côtes après le naufrage de l'Armada, en 1588. Les études sur la race ne l'appuient pas, mais l'histoire se raconte encore là-bas — et elle fait partie du paysage autant que les murets de pierre."}
  ]},

/* ============ 4 · WALSALL · Le matériel ============ */
walsall:{
  lieu:"West Midlands · United Kingdom", carte:true,
  image:"l'atelier de sellerie sous la lampe",
  lettre:{ fr:["Ce soir, j'ai poussé la porte d'un atelier.",
               "Sous la lampe, deux aiguilles avançaient en même temps le long d'une couture. Personne ne m'a parlé. Je suis resté vingt minutes à regarder, et je n'ai pas vu le temps passer."] },
  volets:[
   {t:"La ville du cuir",
    c:"Walsall est la capitale britannique de la sellerie. La ville a d'abord travaillé le métal du harnais — mors, étriers, éperons — avant que le cuir n'y prenne le dessus. Un musée du cuir raconte cette histoire, et des ateliers y travaillent encore à la main."}, // ?? chronologie métal puis cuir : formulation prudente, à confirmer
   {t:"Le point sellier",
    c:"Deux aiguilles, un seul fil, chacune passant à son tour dans le même trou. C'est ce qui rend la couture indéfaillible : si un fil casse, l'autre tient. Une machine ne sait pas le faire — c'est pour ça qu'une selle se coud encore à la main."},
   {t:"Si tu y allais",
    c:"Demande à voir une selle en cours de montage. Entre la coupe du cuir et la dernière couture, il y a des dizaines d'heures de travail que personne ne voit — et que personne ne verra jamais, puisque tout est à l'intérieur."}
  ]},

/* ============ 5 · ABERYSTWYTH · En selle ============ */
aberystwyth:{
  lieu:"Ceredigion · Wales", carte:true,
  image:"le galop dans la mer",
  lettre:{ fr:["Ce matin, j'ai galopé dans la mer.",
               "La plage était vide. Le cob est entré dans l'eau sans hésiter une seconde, et on a fini au galop dans les vagues. Le sel a séché sur mes bottes, et je souriais tout seul."] },
  volets:[
   {t:"Le Welsh pony and cob",
    c:"Un seul stud-book, quatre sections. La A, le poney de montagne, le plus petit. La B, plus fine, montée par les enfants en concours. La C, trapue, très utilisée en attelage. La D, le Welsh cob, assez grand pour porter un adulte. Le Ceredigion est son pays."},
   {t:"Le rendez-vous",
    c:"L'Aberystwyth and Ceredigion County Show, affilié à la Welsh Pony and Cob Society, décerne sa médaille au meilleur sujet de chaque section. C'est là qu'on comprend ce que veulent vraiment dire ces quatre lettres."},
   {t:"Le savais-tu ?",
    c:"La Trans Wales Trail, une traversée du pays de Galles de plusieurs jours à cheval, se termine par un galop dans la mer d'Irlande, près d'ici. Et un sentier remonte vers les monts Cambriens, là où les fermiers rassemblaient autrefois les poneys des pâtures de montagne pour emmener les visiteurs en randonnée."}
  ]},

/* ============ 6 · WINDSOR · Le dressage ============ */
windsor:{
  lieu:"Berkshire · United Kingdom", carte:true,
  image:"le cheval seul devant le château",
  lettre:{ fr:["Personne ne parlait.",
               "Le sable venait d'être ratissé, un cheval seul trottait devant les tours du château, et j'ai compris que le silence faisait partie du travail."] },
  volets:[
   {t:"Le château",
    c:"Windsor est l'un des plus anciens châteaux habités d'Europe, et la tradition équestre y va avec : écuries, attelages, et un grand parc où les chevaux travaillent depuis des siècles."},
   {t:"Le rendez-vous",
    c:"Le Royal Windsor Horse Show se tient chaque printemps dans le parc du château. C'est l'un des plus grands concours en plein air du pays, avec du saut, du dressage et de l'attelage sur plusieurs jours."},
   {t:"Le savais-tu ?",
    c:"A, K, E, H, C, M, B, F : les huit lettres qui balisent une carrière de dressage. Personne ne sait vraiment d'où vient cet ordre. Plusieurs explications circulent — dont une histoire d'écuries impériales allemandes — mais aucune n'est établie, et c'est l'un des rares mystères du monde équestre que personne n'a résolu."}
  ]},

/* ============ 7 · HICKSTEAD · L'obstacle ============ */
hickstead:{
  lieu:"West Sussex · United Kingdom", carte:true,
  image:"le Derby Bank",
  lettre:{ fr:["Je suis monté en haut du talus à pied.",
               "D'en bas, il paraissait raisonnable. D'en haut, beaucoup moins. J'ai regardé un cheval le descendre au galop, et tout le monde a retenu son souffle en même temps que moi."] },
  volets:[
   {t:"Le Derby Bank",
    c:"Une butte de gazon de 3,20 m de pente, avec une barre posée sur le plat du sommet, qu'il faut descendre au galop. C'est la plus haute butte de compétition au monde, et elle décide du Derby depuis 1961."},
   {t:"Le savais-tu ?",
    c:"Le fondateur de Hickstead a pris l'avion pour Hambourg un 31 décembre, en pleine tempête de neige, pour mesurer la butte du Derby allemand devant des officiels perplexes. Celle qu'il a bâtie au retour s'est trouvée un peu plus haute que l'originale — la neige a peut-être faussé ses mesures, ou pas."},
   {t:"L'herbe",
    c:"Hickstead saute sur gazon, pas sur sable. Le terrain porte différemment, les distances se lisent autrement, et un cheval habitué au sable doit réapprendre à s'y placer. Le parcours du Derby n'a presque pas changé depuis la première édition."}
  ]},

/* ============ 8 · BADMINTON · Le concours ============ */
badminton:{
  lieu:"Gloucestershire · United Kingdom", carte:true,
  image:"le grand obstacle de cross dans le parc",
  lettre:{ fr:["Il avait plu toute la nuit.",
               "J'ai marché le cross à pied, comme les cavaliers la veille. Les obstacles de bois sont plus hauts qu'à la télévision, la terre collait aux bottes, et la grande maison nous regardait depuis le fond de la brume."] },
  volets:[
   {t:"Le concours complet",
    c:"Trois épreuves dans le même week-end, avec le même cheval : le dressage, le cross, et le saut d'obstacles. C'est la discipline qui demande le plus de polyvalence, et Badminton est l'un des rares concours du plus haut niveau mondial."},
   {t:"Le parc",
    c:"Les épreuves se déroulent dans le parc d'une grande demeure géorgienne, siège des ducs de Beaufort. Les obstacles de cross y sont taillés dans le bois massif et portent des noms que les cavaliers connaissent par cœur — ils reviennent d'une année sur l'autre."},
   {t:"Si tu y allais",
    c:"Fais le tour du cross à pied. C'est en marchant qu'on comprend ce que la télévision ne montre pas : les dénivelés, les changements de sol, et la longueur réelle du parcours. On finit essoufflé sans avoir sauté une seule fois."}
  ]},

/* ============ 9 · KILDARE · Les urgences ============ */
kildare:{
  lieu:"County Kildare · Ireland", carte:true,
  image:"les grands haras et les pur-sang",
  lettre:{ fr:["Une lumière allumée à trois heures du matin.",
               "Le vétérinaire est arrivé vite. On a parlé bas, et j'ai appris que dans ces moments-là il faut savoir dire les choses en peu de mots : il boite, il transpire, il ne mange plus."] },
  volets:[
   {t:"Le haras national",
    c:"L'Irish National Stud se trouve à Tully, tout près de la ville, à côté des pistes du Curragh. C'est là que l'Irlande élève et présente ses pur-sang, et le domaine se visite."},
   {t:"Le savais-tu ?",
    c:"Sur le domaine du haras, on trouve un jardin japonais créé au début du XX siècle par des jardiniers venus du Japon. Un jardin japonais au milieu des paddocks irlandais : personne ne s'attend à ça en venant voir des chevaux."}, // ?? date et origine des jardiniers à confirmer
   {t:"Pourquoi ce chapitre est gratuit",
    c:"Savoir dire « il a une colique » ou « appelez le vétérinaire » dans le pays où l'on se trouve n'est pas du confort. Ce chapitre est offert dans les six langues, partout, à tout le monde."}
  ]},

/* ============ 10 · ÉDIMBOURG · Les dialogues ============ */
edimbourg:{
  lieu:"Edinburgh · Scotland", carte:true,
  image:"les pavés humides et la ville qui monte",
  lettre:{ fr:["J'ai demandé mon chemin, et je n'ai rien compris.",
               "Il a répété plus lentement, en souriant, et cette fois oui. Les pavés étaient trempés, le vent froid, la ville montait dans tous les sens — et c'est ici que j'ai vraiment appris à écouter."] },
  volets:[
   {t:"L'accent",
    c:"L'anglais d'Écosse ne s'entend pas comme celui du Sud : les voyelles sont plus courtes, le « r » se prononce franchement, et le vocabulaire a ses propres mots. Comprendre ici, c'est comprendre partout."},
   {t:"Le rendez-vous",
    c:"Le Royal Highland Show se tient chaque été à Ingliston, aux portes de la ville. C'est le grand rendez-vous agricole et équestre écossais, et l'endroit où voir les races du pays — le Highland pony et le Clydesdale, ce cheval de trait aux longs crins bas de jambe."},
   {t:"La fin du voyage",
    c:"Dix villes, cinq nations, une langue. Tu es parti d'une écurie du Suffolk et tu arrives dans une capitale — et entre les deux, tu as appris à dire ce que tu fais avec un cheval."}
  ]}
};
