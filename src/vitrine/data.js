/* ============================================================
   Faire-part Vivant — contenu marketing (home + page Fonctionnalités)
   Positionnement : « Le faire-part qui vit ».
   Vente en direct, sur mesure, accompagnée — pas de freemium,
   pas de tarif self-service : CTA « Demander une démo ».
   ============================================================ */

export const MARQUE = "Faire-part Vivant";
export const SIGNATURE = "par François Leterrier";
export const REGION = "Sites de mariage sur-mesure · Sud-Toulousain";
export const EMAIL = "francois.leterrier@gmail.com";

export const ACCROCHE =
  "Le faire-part qui vit : un site-invitation privé, installable comme une app, qui accompagne vos invités du save-the-date jusqu'aux souvenirs d'après la fête.";

/* Les 8 univers de fonctionnalités. Titres orientés bénéfice, sans jargon. */
export const UNIVERS = [
  {
    id: "invitation",
    n: "01",
    ic: "phone",
    nom: "Le faire-part, vivant",
    titre: "Une invitation qui vit dans leur poche",
    intro:
      "Bien plus qu'un carton : un vrai petit site à vos prénoms, que vos invités gardent à portée de main jusqu'au grand jour.",
    feats: [
      { t: "Un site-invitation privé, à votre image", d: "Personnalisé à vos prénoms et à votre histoire — élégant, intime, rien qu'à vous." },
      { t: "Installable en un geste", d: "Vos invités l'ajoutent à leur écran d'accueil ; il s'ouvre comme une app et fonctionne même hors-ligne après la première visite." },
      { t: "Notifications sur leur téléphone", d: "Le lieu enfin révélé, un changement d'horaire, un petit mot des mariés… la nouvelle arrive directement chez eux." },
      { t: "Compte à rebours", d: "Le décompte jusqu'au grand jour, sous leurs yeux à chaque ouverture." },
      { t: "Thèmes & univers visuels", d: "Une ambiance et des couleurs choisies pour vous ressembler." },
      { t: "Français & anglais", d: "Vos invités venus de loin lisent tout dans leur langue — détection automatique, bascule manuelle." },
      { t: "Bande-son d'ambiance", d: "Une mélodie douce qui installe l'émotion dès l'ouverture." },
    ],
  },
  {
    id: "rsvp",
    n: "02",
    ic: "rsvp",
    nom: "RSVP & tableau de bord",
    titre: "Fini les relances : les réponses arrivent toutes seules",
    intro:
      "Vos invités confirment en quelques secondes, et vous suivez tout en un coup d'œil — sans tableur, sans stress.",
    feats: [
      { t: "Réponse en ligne, pensée pour les familles", d: "Présence, nombre d'adultes et d'enfants, régime alimentaire, petit mot — simple et rapide." },
      { t: "Tableau de bord en temps réel", d: "Qui vient, combien à table, quels régimes, quels messages : tout se met à jour tout seul. Export possible." },
      { t: "Un comptage toujours juste", d: "Un couple compte pour deux, un accompagnant pour un de plus : les totaux sont exacts, par foyer." },
      { t: "Un accueil par foyer", d: "Chaque famille est accueillie par son prénom, avec ce qui la concerne." },
      { t: "Familles & accompagnants gérés à la main", d: "Ajoutez un plus-un ou une famille en un instant, quand vous voulez." },
    ],
  },
  {
    id: "jour-j",
    n: "03",
    ic: "compass",
    nom: "Le jour J, orchestré",
    titre: "Tout pour les guider, au bon moment",
    intro:
      "Le lieu, l'itinéraire, le programme, le plan de table : vos invités savent où aller et quand, sans jamais vous appeler.",
    feats: [
      { t: "Le lieu révélé, itinéraire prêt", d: "Il se dévoile quand vous le décidez, avec l'itinéraire Google Maps / Waze prêt à lancer." },
      { t: "Une timeline qui se dévoile", d: "Chaque moment apparaît à sa date : la surprise reste entière jusqu'au bout (le contenu est masqué avant l'heure)." },
      { t: "Ajout à l'agenda en un clic", d: "La date file dans Google Agenda, Apple ou Outlook — plus d'oubli possible." },
      { t: "Plan de table interactif", d: "Vos invités choisissent leur table et découvrent leurs voisins ; les places se comptent automatiquement." },
      { t: "Diaporama live grand écran", d: "À projeter pendant la fête : les photos des invités défilent en direct, en fondus élégants." },
    ],
  },
  {
    id: "souvenirs",
    n: "04",
    ic: "camera",
    nom: "Participation & souvenirs",
    titre: "La fête continue dans leurs mains — et vous gardez tout",
    intro:
      "Vos invités deviennent acteurs : ils capturent, filment, proposent, jouent. Et tous ces souvenirs vous reviennent.",
    feats: [
      { t: "Album photo collaboratif", d: "Photo et vidéo capturées depuis le faire-part : un mur commun qui se remplit en temps réel." },
      { t: "Livre d'or vidéo", d: "Des messages filmés ou écrits pour vous, à revivre longtemps après la fête." },
      { t: "Playlist collaborative", d: "Vos invités suggèrent les titres à passer ; le DJ n'a plus qu'à mixer." },
      { t: "Défis photo", d: "De petits challenges qui font pétiller l'album et délient les timides." },
      { t: "Jeux interactifs", d: "Quiz des mariés, duel des témoins, podium à la clé : l'ambiance monte d'un cran." },
    ],
  },
  {
    id: "logistique",
    n: "05",
    ic: "car",
    nom: "Logistique des invités",
    titre: "Vous leur simplifiez la route (et la nuit)",
    intro:
      "Covoiturage et hébergements réunis au même endroit : moins de questions pour vous, plus de sérénité pour eux.",
    feats: [
      { t: "Covoiturage", d: "Proposer ou trouver une place, avec jours d'arrivée et de départ ; les réservations se suivent en direct." },
      { t: "Où se loger & infos pratiques", d: "Une sélection d'hébergements et toutes les infos utiles, rassemblées et claires." },
    ],
  },
  {
    id: "cadeaux",
    n: "06",
    ic: "gift",
    nom: "Cadeaux",
    titre: "Se faire plaisir à deux, sans fausse note",
    intro:
      "Cagnotte ou liste de cadeaux, intégrées avec élégance à votre faire-part.",
    feats: [
      { t: "Cagnotte / fonds commun", d: "Reliez votre cagnotte existante (Leetchi, Lydia, PayPal, RIB…) — présentée joliment, jamais gênante." },
      { t: "Liste de cadeaux avec réservation", d: "Chaque cadeau ne peut être réservé qu'une seule fois : zéro doublon, zéro malaise." },
    ],
  },
  {
    id: "coulisses",
    n: "07",
    ic: "sliders",
    nom: "Pour les mariés",
    titre: "Vous gardez la main, sans rien coder",
    intro:
      "Un espace simple pour ouvrir les sections à votre rythme et parler à tous vos invités quand vous le souhaitez.",
    feats: [
      { t: "Éditeur sans code", d: "Activez chaque section quand vous voulez, remplissez votre contenu, ouvrez les fonctionnalités au fil des mois." },
      { t: "Diffusion WhatsApp / SMS / e-mail", d: "Un lien à partager, et l'invitation part par le canal de votre choix." },
      { t: "Des notifications quand vous le décidez", d: "Envoyez un mot à tous vos invités quand le cœur vous en dit." },
    ],
  },
  {
    id: "confiance",
    n: "08",
    ic: "shield",
    nom: "Confiance & sérénité",
    titre: "Privé, sûr, et sans prise de tête",
    intro:
      "Votre faire-part reste intime, rapide et toujours à jour — et vous n'avez rien à gérer techniquement.",
    feats: [
      { t: "Accès privé", d: "Le faire-part n'est jamais indexé, et chaque invité ne voit que ce qui le concerne (contenu sensible masqué côté serveur)." },
      { t: "Mises à jour instantanées", d: "Vous modifiez, tout le monde voit la nouvelle version aussitôt." },
      { t: "Léger, rapide, sans app store", d: "Installable en un geste, rien à télécharger — ça s'ouvre en un instant, partout." },
    ],
  },
];

/* 4 bénéfices phares pour la home. */
export const BENEFICES = [
  { ic: "phone", t: "Dans leur poche, comme une app", d: "Installable en un geste, hors-ligne, avec des notifications — vos invités l'ont toujours sur eux." },
  { ic: "rsvp", t: "Les réponses, sans les relances", d: "RSVP en ligne et tableau de bord en temps réel, avec un comptage par foyer toujours juste." },
  { ic: "camera", t: "Des souvenirs partagés", d: "Album photo & vidéo en direct, livre d'or filmé, diaporama grand écran pendant la fête." },
  { ic: "spark", t: "Une lumière par invité", d: "Un arbre de vie qui s'illumine à chaque « oui » : le faire-part prend vie avant même le jour J." },
];

/* Les 4 étapes de l'accompagnement (vente en direct). */
export const ETAPES = [
  { t: "On échange", d: "Une démo ensemble : je vous montre le produit et j'écoute votre histoire, vos envies, votre ambiance." },
  { t: "Je crée votre faire-part", d: "Je le compose sur mesure — thème, textes, sections — et je vous le remets prêt à vivre." },
  { t: "Vous ouvrez à votre rythme", d: "Save-the-date, puis le lieu, le programme, les jeux… chaque section s'ouvre quand vous le décidez." },
  { t: "Vos invités le vivent", d: "Ils répondent, s'installent l'app, partagent leurs photos — et vous gardez tous les souvenirs." },
];

/* FAQ ciblée (modèle sur devis, sans freemium). */
export const FAQS = [
  ["Faut-il télécharger une application ?", "Non, jamais. Vos invités ouvrent un simple lien. S'ils le souhaitent, ils l'ajoutent à leur écran d'accueil en un geste et il s'ouvre comme une app — mais il n'y a rien à installer depuis un store."],
  ["Le faire-part et les données de mes invités sont-ils protégés ?", "Oui. Votre faire-part est privé et jamais référencé par les moteurs de recherche. Chaque invité ne voit que ce qui le concerne, et le contenu sensible reste masqué côté serveur jusqu'au bon moment."],
  ["Et si le lieu n'est pas encore connu, ou si tout n'est pas prêt ?", "Aucun souci : vous ouvrez les sections au fil du temps. Le lieu — et d'autres surprises — se révèle à la date que vous choisissez, sans rien dévoiler avant l'heure."],
  ["Est-ce disponible en anglais ?", "Oui : français et anglais, avec détection automatique de la langue et bascule manuelle. Idéal pour les invités venus d'ailleurs."],
  ["Comment fonctionnent la cagnotte et la liste de cadeaux ?", "Vous reliez votre cagnotte existante (Leetchi, Lydia, PayPal, RIB…) et/ou proposez une liste de cadeaux où chaque présent ne peut être réservé qu'une seule fois — sans doublon."],
  ["Combien ça coûte ?", "Chaque faire-part est unique et réalisé sur mesure, avec un accompagnement humain de bout en bout. Le tarif dépend de vos envies et des fonctionnalités choisies — demandez une démo, on en parle et je vous fais une proposition claire."],
  ["Dois-je m'y connaître en informatique ?", "Pas du tout. Je vous accompagne à chaque étape et l'éditeur est sans code. Vous vous concentrez sur votre histoire ; je m'occupe du reste."],
  ["Quand le mettre en place et le partager ?", "Dès le save-the-date, et jusqu'aux souvenirs d'après la fête. On installe tout au rythme qui vous convient, sans précipitation."],
];
