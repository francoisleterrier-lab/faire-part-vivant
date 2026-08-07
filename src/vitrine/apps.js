/* ============================================================
   Catalogue partagé des « applications » du faire-part vivant.
   Ce sont les modules créés pour le mariage (cf. UNIVERS dans data.js),
   décomposés en briques réutilisables. Chaque événement déclare, dans
   evenements.js, la liste des ids qui lui correspondent (`apps`) — un
   même module peut donc apparaître dans plusieurs événements.
   `ic` renvoie à une icône de l'objet I (shared.jsx).
   ============================================================ */

export const APPS = {
  // — Le faire-part, vivant —
  site: { ic: "phone", nom: "Site-invitation privé", d: "Installable comme une app, avec son icône sur l'écran d'accueil." },
  countdown: { ic: "spark", nom: "Compte à rebours", d: "Le décompte jusqu'au grand jour, sous leurs yeux à chaque ouverture." },
  notifications: { ic: "phone", nom: "Notifications", d: "Le lieu révélé, un horaire, un petit mot : la nouvelle arrive sur leur téléphone." },
  themes: { ic: "spark", nom: "Thèmes & univers", d: "Une ambiance et des couleurs choisies pour vous ressembler." },
  bilingue: { ic: "compass", nom: "Français & anglais", d: "Chaque invité lit tout dans sa langue — détection automatique." },
  musique: { ic: "spark", nom: "Bande-son d'ambiance", d: "Une mélodie douce qui installe l'émotion dès l'ouverture." },

  // — RSVP & pilotage —
  rsvp: { ic: "rsvp", nom: "RSVP en ligne", d: "Présence, nombre d'adultes et d'enfants, régime, petit mot — en quelques secondes." },
  dashboard: { ic: "sliders", nom: "Tableau de bord", d: "Qui vient, combien à table, quels régimes : tout se met à jour en temps réel." },
  foyers: { ic: "rsvp", nom: "Comptage par foyer", d: "Des totaux toujours justes, chaque famille accueillie par son prénom." },

  // — Le jour J, orchestré —
  lieu: { ic: "compass", nom: "Lieu & itinéraire GPS", d: "Révélé quand vous le décidez, avec l'itinéraire Maps / Waze prêt à lancer." },
  timeline: { ic: "compass", nom: "Révélations à date", d: "Chaque moment se dévoile à l'heure dite — la surprise reste entière." },
  agenda: { ic: "check", nom: "Ajout à l'agenda", d: "La date file dans Google Agenda, Apple ou Outlook, en un clic." },
  planTable: { ic: "compass", nom: "Plan de table", d: "Chacun trouve sa place et ses voisins ; les places se comptent toutes seules." },
  diaporama: { ic: "camera", nom: "Diaporama live", d: "À projeter pendant la fête : les photos des invités défilent en grand écran." },

  // — Participation & souvenirs —
  album: { ic: "camera", nom: "Album collaboratif", d: "Un mur photo & vidéo qui se remplit en temps réel, capturé depuis le faire-part." },
  livreOr: { ic: "heart", nom: "Livre d'or", d: "Des messages écrits ou filmés, à revivre longtemps après la fête." },
  playlist: { ic: "spark", nom: "Playlist collaborative", d: "Vos invités suggèrent les titres ; il n'y a plus qu'à mixer." },
  defis: { ic: "camera", nom: "Défis photo", d: "De petits challenges qui font pétiller l'album et délient les timides." },
  jeux: { ic: "gift", nom: "Jeux & quiz", d: "Quiz, paris et podium : l'ambiance monte d'un cran." },

  // — Logistique des invités —
  covoiturage: { ic: "car", nom: "Covoiturage", d: "Proposer ou trouver une place, avec jours d'arrivée et de départ." },
  hebergement: { ic: "car", nom: "Où se loger", d: "Une sélection d'hébergements et les infos pratiques, réunies et claires." },

  // — Cadeaux —
  cagnotte: { ic: "gift", nom: "Cagnotte", d: "Reliez votre cagnotte (Leetchi, Lydia, PayPal, RIB…), présentée avec élégance." },
  listeCadeaux: { ic: "gift", nom: "Liste de cadeaux", d: "Chaque cadeau réservé une seule fois : zéro doublon, zéro malaise." },

  // — Pilotage & confiance —
  editeur: { ic: "sliders", nom: "Éditeur sans code", d: "Activez chaque section quand vous voulez, à votre rythme, sans rien coder." },
  diffusion: { ic: "phone", nom: "Diffusion WhatsApp / SMS", d: "Un lien à partager, par le canal de votre choix — relances comprises." },
  prive: { ic: "shield", nom: "Accès privé", d: "Jamais indexé ; chaque invité ne voit que ce qui le concerne." },
  maj: { ic: "shield", nom: "Mises à jour instantanées", d: "Vous modifiez, tout le monde voit la nouvelle version aussitôt." },
};
