/* ============================================================
   Pages « longue traîne » : événement × ville.
   Contenu RÉELLEMENT différencié (contexte local, lieux, communes,
   proximité) — pas des pages « doorway » interchangeables. Chaque
   page vise une intention locale précise et renvoie vers la page
   événement générale pour le détail produit.

   Une seule source de vérité par page ; le rendu passe par
   LocalEvenement.jsx (aperçu réutilisé) et le SEO par
   gen-local-event-pages.mjs.
   ============================================================ */

export const LOCAL_EVENEMENTS = {
  "naissance-toulouse": {
    slug: "faire-part-naissance-toulouse",
    event: "naissance", // clé d'aperçu (mockup + photo) et de renvoi
    ville: "Toulouse",
    eyebrow: "Toulouse · Haute-Garonne · Occitanie",
    h1: "Faire-part de naissance numérique à Toulouse",
    titleSeo: "Faire-part de naissance numérique à Toulouse | Faire-part Vivant",
    metaDesc:
      "Faire-part de naissance numérique et vivant pour les familles de Toulouse : de « bientôt à 3 » à la révélation du prénom, avec album partagé. Créé près de chez vous, dans le Sud-Toulousain. Sur mesure, sans abonnement.",
    heroLede:
      "Un faire-part de naissance numérique pour les familles toulousaines : pendant la grossesse il annonce l'heureux événement et fait tourner le compte à rebours, puis, le jour venu, il révèle tout seul le prénom, la date, le poids et les premières photos — un lien unique à partager, sans application à installer.",
    ctaLabel: "Créons votre faire-part",
    points: [
      {
        t: "De la maternité à la famille, sans effort",
        d: "Paule de Viguier, Sarrus-Teinturiers, Ambroise-Paré, la Croix du Sud, les Cèdres… où que naisse votre bébé autour de Toulouse, la même page se met à jour toute seule : les proches reçoivent la nouvelle et les premières photos au même instant, sans que vous ayez cent messages à envoyer depuis la chambre.",
      },
      {
        t: "Un créateur du Sud-Toulousain, à côté de Toulouse",
        d: "Basé à Lavernose-Lacasse, à une trentaine de minutes du centre, je vous accompagne de vive voix : on peut se rencontrer autour d'un café pour préparer l'annonce avant le terme, puis tout se règle à distance, à votre rythme — la proximité en plus, sans contrainte de déplacement.",
      },
      {
        t: "Pensé pour des proches à Toulouse et bien au-delà",
        d: "Grands-parents en ville, cousins à Blagnac, amis montés à Paris : le faire-part vivant s'ouvre d'un lien sur n'importe quel téléphone, se garde sur l'écran d'accueil et rassemble album, messages et mots doux — pour une famille qui, à Toulouse comme ailleurs, suit la naissance en direct.",
      },
    ],
    prose:
      "Un faire-part de naissance numérique, c'est une page privée et évolutive, partagée une seule fois. Pendant la grossesse, elle fait patienter les proches avec un compte à rebours et un « bientôt à 3 » ; à la naissance, elle se métamorphose pour révéler le prénom et les premières photos, puis l'album continue de vivre. Découvrez le fonctionnement complet, les révélations à date et les tarifs sur la page dédiée.",
    zones: [
      "Toulouse", "Blagnac", "Colomiers", "Tournefeuille", "Balma", "Ramonville-Saint-Agne",
      "Cugnaux", "Portet-sur-Garonne", "Muret", "L'Union", "Saint-Orens", "Quint-Fonsegrives",
    ],
    faq: [
      {
        q: "Intervenez-vous pour une naissance à Toulouse même ?",
        r: "Oui. Je suis basé à Lavernose-Lacasse, dans le Sud-Toulousain, à une trentaine de minutes de Toulouse. On peut se rencontrer autour d'un café pour préparer votre faire-part de naissance, puis avancer à distance. Tout se fait aussi 100 % en ligne si vous préférez.",
      },
      {
        q: "Peut-on préparer l'annonce avant la naissance ?",
        r: "C'est justement l'idée. On met en place la page pendant la grossesse : elle annonce « bientôt à 3 », affiche le compte à rebours vers le terme et recueille les mots des proches. Le jour J, vous n'avez qu'à ajouter le prénom, la date et les premières photos — la page se transforme toute seule.",
      },
      {
        q: "Faut-il que mes proches téléchargent une application ?",
        r: "Non. Vos proches, à Toulouse comme partout en France, ouvrent un simple lien. Ils peuvent ensuite l'ajouter à leur écran d'accueil comme une application, mais rien à installer depuis un store, et rien n'est jamais référencé sur Google : la page reste privée.",
      },
    ],
    crossVille: { href: "faire-part-mariage-toulouse.html", label: "faire-part de mariage à Toulouse" },
  },

  "bapteme-toulouse": {
    slug: "faire-part-bapteme-toulouse",
    event: "bapteme",
    ville: "Toulouse",
    eyebrow: "Toulouse · Haute-Garonne · Occitanie",
    h1: "Faire-part de baptême numérique à Toulouse",
    titleSeo: "Faire-part de baptême numérique à Toulouse | Faire-part Vivant",
    metaDesc:
      "Faire-part de baptême numérique et vivant pour Toulouse et l'Occitanie : parrain et marraine à l'honneur, plan d'accès à l'église, RSVP et album partagé. Créé près de chez vous, sur mesure, sans abonnement.",
    heroLede:
      "Un faire-part de baptême numérique pour les familles de Toulouse : il présente l'enfant, met parrain et marraine à l'honneur, réunit le plan d'accès à l'église et à la réception, recueille les réponses des invités et garde les photos du grand jour — un lien unique, sans application à installer.",
    ctaLabel: "Créons votre faire-part",
    points: [
      {
        t: "De l'église à la réception, tout est réuni",
        d: "Saint-Sernin, la Daurade, Saint-Étienne ou l'église de votre quartier, puis une salle au bord de Garonne ou une maison de famille : la page rassemble les deux adresses, l'horaire de la cérémonie et l'itinéraire, pour des invités qui trouvent leur chemin sans un seul appel de dernière minute.",
      },
      {
        t: "Un accompagnement de proximité",
        d: "Basé à Lavernose-Lacasse, tout près de Toulouse, je crée votre faire-part de baptême avec vous : on échange, je vous montre le rendu en vrai, et l'on peut se voir pour affiner. Sur mesure à vos prénoms et à votre style, du plus sobre au plus tendre.",
      },
      {
        t: "Parrain, marraine et proches réunis autour de l'enfant",
        d: "Une section met à l'honneur le parrain et la marraine, une autre recueille les vœux et les messages. Après la cérémonie, l'album partagé rassemble les photos de toute la famille — un souvenir qui reste, bien après la journée à Toulouse.",
      },
    ],
    prose:
      "Un faire-part de baptême numérique, c'est une page privée qui présente l'enfant, met parrain et marraine à l'honneur, gère les réponses (RSVP) et centralise le plan d'accès puis l'album photo. Créé sur mesure, accompagné, et installable comme une application sur le téléphone des invités. Découvrez tout ce qu'il contient et les tarifs sur la page dédiée.",
    zones: [
      "Toulouse", "Blagnac", "Colomiers", "Tournefeuille", "Balma", "Ramonville-Saint-Agne",
      "Cugnaux", "Portet-sur-Garonne", "Muret", "L'Union", "Saint-Orens", "Quint-Fonsegrives",
    ],
    faq: [
      {
        q: "Créez-vous des faire-part de baptême pour Toulouse ?",
        r: "Oui, régulièrement. Je suis basé à Lavernose-Lacasse, dans le Sud-Toulousain, à quelques minutes de Toulouse. On peut se rencontrer pour préparer votre faire-part de baptême, ou tout faire à distance si c'est plus simple pour vous.",
      },
      {
        q: "Peut-on indiquer l'église et la salle de réception ?",
        r: "Bien sûr. La page réunit le lieu de la cérémonie (paroisse ou église de votre choix à Toulouse) et celui de la réception, avec l'horaire et un plan d'accès pour chacun. Les invités ouvrent l'itinéraire d'un geste depuis leur téléphone.",
      },
      {
        q: "Comment sont gérées les réponses des invités ?",
        r: "Chaque foyer répond en ligne en quelques secondes ; vous suivez le comptage en temps réel depuis votre tableau de bord, avec le nombre d'adultes et d'enfants. Plus de relances au téléphone : tout est réuni au même endroit, jusqu'à l'album photo partagé après le baptême.",
      },
    ],
    crossVille: { href: "faire-part-mariage-toulouse.html", label: "faire-part de mariage à Toulouse" },
  },
};
