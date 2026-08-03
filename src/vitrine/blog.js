/* ============================================================
   Faire-part Vivant — Journal (contenu SEO cornerstone).
   Chaque article a sa propre page/URL, métas et JSON-LD.
   Contenu honnête, informatif, orienté requêtes de recherche.

   `tldr`  : résumé « En bref » (repris en tête d'article + réponses IA).
   `maj`   : date de dernière mise à jour (fraîcheur SEO).
   ============================================================ */

export const ARTICLES = [
  {
    slug: "quand-envoyer-faire-part-mariage",
    date: "2026-08-03",
    maj: "2026-08-03",
    lecture: "6 min",
    categorie: "Organisation",
    titreSeo: "Quand envoyer les faire-part de mariage ? Le calendrier 2026 — Faire-part Vivant",
    h1: "Quand envoyer les faire-part de mariage ? Le rétroplanning complet",
    desc: "Save-the-date, faire-part, date limite de RSVP : le calendrier complet pour envoyer vos faire-part de mariage au bon moment, sans stress ni oubli.",
    chapo:
      "Trop tôt, on est oublié ; trop tard, les invités ont déjà d'autres plans. Voici le calendrier complet — save-the-date, faire-part et date limite de réponse — pour prévenir vos invités au bon moment, sans rien laisser au hasard.",
    tldr: [
      "Faire-part officiel : envoyez-le environ 3 mois avant le mariage (10 à 12 semaines).",
      "Save-the-date : 6 à 12 mois avant — jusqu'à 12-18 mois pour un mariage à l'étranger ou en haute saison.",
      "Date limite de réponse (RSVP) : fixez-la 4 à 6 semaines avant le jour J.",
      "Avec un faire-part numérique, un seul lien couvre tout : save-the-date, invitation puis rappels — sans réimpression ni frais postaux.",
    ],
    sections: [
      {
        h2: "Quand envoyer les faire-part de mariage ?",
        p: [
          "La règle simple : envoyez vos faire-part de mariage environ trois mois avant le jour J, soit dix à douze semaines. C'est le délai idéal — assez tôt pour que vos invités s'organisent (congés, trajet, hébergement), assez tard pour que la date reste bien présente à leur esprit.",
          "Ce délai vaut pour un mariage « classique », en France, avec des invités qui n'ont pas à traverser le pays. Pour les cas particuliers (haute saison, étranger, invités éloignés), on envoie plus tôt — nous y revenons plus bas.",
        ],
      },
      {
        h2: "Qu'est-ce qu'un save-the-date et quand l'envoyer ?",
        p: [
          "Le save-the-date (« réservez la date ») est un petit message envoyé bien avant le faire-part, pour que vos proches bloquent la date sans attendre l'invitation officielle. Il annonce simplement : « on se marie, ce sera ce jour-là, les détails suivront ».",
          "On l'envoie en général 6 à 12 mois avant le mariage. Il ne remplace pas le faire-part : il le précède et le prépare. Beaucoup de couples abandonnent le carton papier pour le save-the-date et envoient un simple message ou un lien numérique.",
        ],
      },
      {
        h2: "Faut-il envoyer un save-the-date ET un faire-part ?",
        p: [
          "Les deux ont des rôles différents : le save-the-date bloque la date très en amont, le faire-part apporte ensuite toutes les informations (lieu, horaires, RSVP, plan d'accès). Envoyer les deux évite les mauvaises surprises, surtout si votre mariage tombe en pleine saison ou un week-end prisé.",
          "Si votre budget ou votre temps sont comptés, c'est justement là que le numérique change tout : le même lien sert d'abord de save-the-date, puis devient le faire-part complet quand les informations sont prêtes — sans rien réimprimer.",
        ],
      },
      {
        h2: "Le rétroplanning complet d'envoi",
        p: ["Voici, échéance par échéance, quand faire quoi pour ne rien oublier :"],
        table: {
          caption: "Rétroplanning d'envoi des faire-part de mariage",
          head: ["Échéance", "Action", "Pourquoi"],
          rows: [
            ["12–18 mois avant", "Save-the-date (étranger, haute saison, invités éloignés)", "Laisser le temps de poser des congés et de réserver"],
            ["6–12 mois avant", "Save-the-date (cas général)", "Bloquer la date auprès de vos proches"],
            ["3 mois avant (10–12 sem.)", "Faire-part officiel + ouverture des RSVP", "Donner toutes les infos au bon moment"],
            ["4–6 semaines avant", "Date limite de réponse + relance", "Obtenir un comptage fiable pour le traiteur"],
            ["2–3 semaines avant", "Comptage final, plan de table, infos pratiques", "Derniers ajustements sereins"],
          ],
        },
      },
      {
        h2: "Quand fixer la date limite de réponse (RSVP) ?",
        p: [
          "Fixez la date limite de RSVP 4 à 6 semaines avant le mariage. C'est ce qui vous donne un nombre de couverts fiable à transmettre au traiteur et un plan de table réaliste.",
          "Une date limite claire, indiquée dès le faire-part, réduit énormément les relances. Et avec un RSVP en ligne, le comptage se met à jour tout seul — nous détaillons la méthode dans notre guide dédié à la gestion des RSVP.",
        ],
      },
      {
        h2: "Cas particuliers : étranger, haute saison, petit comité",
        p: ["Le calendrier de base s'adapte selon votre mariage :"],
        points: [
          "Mariage à l'étranger (destination wedding) : save-the-date 12 mois ou plus, faire-part 4 à 6 mois avant, pour laisser le temps de réserver vols et hôtels.",
          "Haute saison (juin à septembre) ou week-end prolongé : anticipez d'un à deux mois, les agendas se remplissent vite.",
          "Beaucoup d'invités venus de loin : privilégiez un save-the-date tôt et un faire-part numérique, plus rapide à diffuser.",
          "Petit comité ou mariage intime : vous pouvez raccourcir, mais gardez au moins 6 à 8 semaines pour le faire-part.",
        ],
      },
      {
        h2: "Papier ou numérique : est-ce que ça change le calendrier ?",
        p: [
          "Le calendrier reste le même, mais le numérique vous fait gagner du temps à chaque étape : pas d'impression ni d'affranchissement, un envoi instantané par WhatsApp, SMS ou e-mail, et la possibilité de mettre à jour une information après l'envoi (un horaire, un lieu révélé plus tard).",
          "C'est aussi ce qui permet d'assumer un save-the-date très en amont sans double coût : vous ouvrez simplement les sections du faire-part au fil des mois. Pour peser le pour et le contre, voyez notre comparatif papier ou digital.",
        ],
      },
      {
        h2: "Que faire si vous êtes en retard ?",
        p: [
          "Pas de panique : mieux vaut un faire-part envoyé tard qu'un invité oublié. Si vous êtes à moins de six semaines, passez au numérique — l'envoi est immédiat —, prévenez d'abord par un message personnel les invités clés, et fixez une date limite de réponse courte mais nette.",
          "L'essentiel est que chacun ait l'information à temps pour dire oui et s'organiser. Un lien partagé aujourd'hui vaut mieux qu'un carton parfait posté trop tard.",
        ],
      },
    ],
    faq: [
      ["Combien de temps avant le mariage faut-il envoyer les faire-part ?", "Environ 3 mois avant, soit 10 à 12 semaines. Pour un mariage à l'étranger ou en haute saison, envoyez plus tôt (4 à 6 mois), précédé d'un save-the-date."],
      ["Le save-the-date remplace-t-il le faire-part ?", "Non. Le save-the-date bloque la date 6 à 12 mois avant ; le faire-part, envoyé environ 3 mois avant, apporte ensuite toutes les informations et ouvre les réponses (RSVP)."],
      ["Quand envoyer les faire-part pour un mariage à l'étranger ?", "Plus tôt que pour un mariage local : un save-the-date 12 mois ou plus à l'avance, puis le faire-part 4 à 6 mois avant, pour laisser à vos invités le temps de réserver."],
      ["Peut-on envoyer les faire-part par SMS ou WhatsApp ?", "Oui, avec un faire-part numérique : vous partagez un simple lien par WhatsApp, SMS ou e-mail. C'est instantané, sans frais postaux, et vos invités peuvent répondre directement en ligne."],
    ],
  },
  {
    slug: "guide-faire-part-mariage-numerique",
    date: "2026-07-13",
    maj: "2026-08-03",
    lecture: "6 min",
    categorie: "Guide",
    titreSeo: "Faire-part de mariage numérique : le guide complet (2026) — Faire-part Vivant",
    h1: "Faire-part de mariage numérique : le guide complet 2026",
    desc: "Le guide complet du faire-part de mariage numérique : définition, avantages, prix, différence entre un faire-part digital statique et interactif, et comment bien le choisir.",
    chapo:
      "Le faire-part de mariage numérique remplace peu à peu le carton papier : plus économique, écologique et surtout vivant, il accompagne vos invités du save-the-date jusqu'aux souvenirs d'après la fête. Voici tout ce qu'il faut savoir pour bien le choisir.",
    tldr: [
      "Un faire-part de mariage numérique est une invitation en ligne partagée par un simple lien (WhatsApp, SMS, e-mail), parfois installable comme une application.",
      "Ses atouts : aucune impression ni frais postaux, des réponses (RSVP) comptées automatiquement, un geste écologique et des souvenirs partagés.",
      "Deux familles : le faire-part « statique » (image ou PDF, figé) et le faire-part « vivant » (interactif, qui évolue jusqu'après la fête).",
      "Le prix va de quelques euros pour un modèle à remplir soi-même à partir de 290 € pour une création sur mesure et accompagnée.",
    ],
    sections: [
      {
        h2: "Qu'est-ce qu'un faire-part de mariage numérique ?",
        p: [
          "Un faire-part de mariage numérique (ou faire-part digital) est une invitation en ligne que vous partagez par un simple lien — WhatsApp, SMS ou e-mail — au lieu d'un carton imprimé et posté. Vos invités l'ouvrent en un clic, sur leur téléphone comme sur leur ordinateur.",
          "Dans sa version la plus aboutie, ce n'est plus une simple carte : c'est un véritable petit site-invitation privé, à vos prénoms, que vos invités peuvent même installer sur l'écran d'accueil de leur téléphone comme une application. Il s'ouvre alors en un instant, affiche le compte à rebours, et peut même les prévenir par notification quand vous révélez une nouvelle information.",
          "Le faire-part numérique ne se limite donc pas à « annoncer » le mariage : il devient le point de rendez-vous de tous vos invités, du premier save-the-date jusqu'au partage des photos, longtemps après la fête.",
        ],
      },
      {
        h2: "Pourquoi choisir un faire-part digital ?",
        p: ["Le numérique apporte des avantages concrets, pour vous comme pour vos invités :"],
        points: [
          "Zéro impression ni frais postaux : un lien à partager, c'est tout — quel que soit le nombre d'invités.",
          "Des réponses (RSVP) recueillies et comptées automatiquement, sans relances ni tableur.",
          "Un geste écologique : pas de papier, pas d'enveloppes, pas de transport.",
          "Un contenu vivant : le lieu, le programme et les surprises se dévoilent au fil du temps.",
          "Des souvenirs qui restent : album photo des invités, livre d'or vidéo, à revivre après la fête.",
          "Des mises à jour instantanées : un horaire change ? Tout le monde voit la nouvelle version aussitôt.",
        ],
      },
      {
        h2: "Faire-part numérique statique ou faire-part « vivant » ?",
        p: [
          "Beaucoup de faire-part digitaux ne sont qu'une image ou un PDF animé : joli, mais figé. Une fois envoyé, il ne bouge plus et ne recueille rien. C'est l'équivalent numérique d'un carton — en moins cher.",
          "Un faire-part vivant, lui, est interactif : RSVP en ligne, notifications, plan de table, cagnotte, jeux, album photo collaboratif… La différence se ressent surtout après l'envoi : un faire-part vivant continue de rendre service jusqu'au jour J et bien après, là où une carte digitale statique s'arrête à l'invitation.",
          "Si votre objectif est simplement d'annoncer la date, un faire-part statique suffit. Si vous voulez organiser, rassembler et faire vivre le mariage à vos invités, c'est vers un faire-part vivant qu'il faut regarder.",
        ],
      },
      {
        h2: "Comment fonctionne un faire-part numérique, étape par étape ?",
        p: [
          "Le principe est simple, et il se déroule dans le temps plutôt qu'en une seule fois :",
        ],
        points: [
          "Vous recevez votre faire-part sous forme de lien privé, à votre image (prénoms, thème, textes).",
          "Vous le partagez quand vous voulez : d'abord un save-the-date, puis l'invitation complète.",
          "Vos invités ouvrent le lien, découvrent l'essentiel et confirment leur présence en quelques secondes.",
          "À l'approche du jour J, vous révélez le lieu, l'itinéraire, le programme — une notification les prévient.",
          "Pendant et après la fête, ils déposent leurs photos et leurs mots : tout se rassemble au même endroit.",
        ],
      },
      {
        h2: "Ce qu'un bon faire-part numérique devrait inclure",
        p: [
          "Tous les faire-part digitaux ne se valent pas. Avant de choisir, vérifiez qu'il propose au moins :",
        ],
        points: [
          "Un RSVP en ligne pensé pour les familles (adultes, enfants, régimes alimentaires).",
          "Les infos pratiques : lieu, itinéraire, horaires, hébergements.",
          "Un accès privé : le faire-part n'est jamais indexé et chaque invité ne voit que ce qui le concerne.",
          "Le multilingue (français / anglais) pour les invités venus de loin.",
          "Des souvenirs partagés : album photo et vidéo des invités.",
          "Un accompagnement humain, si vous ne voulez pas tout gérer seul(e).",
        ],
      },
      {
        h2: "Combien coûte un faire-part de mariage numérique ?",
        p: [
          "Les prix varient énormément selon le niveau de personnalisation et d'accompagnement : de quelques euros pour un modèle à remplir soi-même, à plusieurs centaines d'euros pour une création sur mesure et accompagnée.",
          "Chez Faire-part Vivant, les formules démarrent à 290 € (à partir de), avec un accompagnement humain de bout en bout et un devis personnalisé selon vos envies. À budget égal ou inférieur à un beau carton papier posté, vous obtenez une expérience qui dure bien au-delà de l'invitation.",
        ],
        table: {
          caption: "Ordres de prix indicatifs selon le type de faire-part numérique",
          head: ["Type de faire-part", "Prix indicatif", "Pour qui ?"],
          rows: [
            ["Modèle à remplir soi-même", "0 – 50 €", "Petits budgets, à l'aise avec les outils en ligne"],
            ["Création semi-personnalisée", "50 – 200 €", "Un rendu soigné sans tout gérer soi-même"],
            ["Faire-part vivant sur mesure", "À partir de 290 €", "Une expérience unique, accompagnée de A à Z"],
          ],
        },
      },
      {
        h2: "Comment créer votre faire-part numérique ?",
        p: [
          "Deux chemins s'offrent à vous. Le premier : un outil en ligne où vous remplissez un modèle vous-même — rapide et peu coûteux, mais le résultat dépend du temps que vous y passez.",
          "Le second : une création sur mesure, accompagnée. Vous échangez avec un créateur qui compose le faire-part à vos prénoms, ouvre les fonctionnalités à votre rythme et reste disponible jusqu'au jour J. C'est l'approche de Faire-part Vivant — pensée pour les couples qui veulent un rendu unique sans y passer leurs soirées.",
        ],
      },
    ],
    faq: [
      ["Un faire-part numérique remplace-t-il le save-the-date ?", "Oui : le même lien peut servir de save-the-date, puis évoluer en faire-part complet, puis en album souvenir — vous ouvrez les sections au fil du temps."],
      ["Mes invités doivent-ils installer une application ?", "Non. Ils ouvrent un simple lien. S'ils le souhaitent, ils l'ajoutent à leur écran d'accueil en un geste — mais rien à télécharger depuis un store."],
      ["Le faire-part numérique convient-il aux invités peu à l'aise avec le téléphone ?", "Oui : il s'ouvre comme une page web classique, sans compte ni installation. Un grand format lisible et un simple bouton « Je confirme » suffisent — et rien n'empêche de doubler d'un mot papier pour les proches qui y tiennent."],
      ["Peut-on l'avoir en français et en anglais ?", "Oui : le faire-part détecte la langue du téléphone et permet de basculer manuellement, idéal pour les invités venus de l'étranger."],
    ],
  },
  {
    slug: "faire-part-papier-ou-digital",
    date: "2026-07-13",
    maj: "2026-08-03",
    lecture: "4 min",
    categorie: "Comparatif",
    titreSeo: "Faire-part papier ou digital : comment choisir en 2026 ? — Faire-part Vivant",
    h1: "Faire-part papier ou digital : comment choisir ?",
    desc: "Faire-part de mariage papier ou digital ? Comparatif honnête : budget, écologie, émotion, praticité — et comment profiter du meilleur des deux mondes.",
    chapo:
      "C'est l'une des premières questions que se posent les futurs mariés : garder le charme du papier, ou passer au digital ? Voici un comparatif honnête, critère par critère, pour décider sereinement.",
    tldr: [
      "Le papier séduit par son charme tactile et le geste symbolique ; le digital gagne sur le budget, l'écologie et l'organisation.",
      "Le papier coûte souvent 250 à 600 € pour une centaine d'invités ; le digital a un coût fixe, quel que soit le nombre d'invités.",
      "Côté praticité, le digital l'emporte nettement : RSVP automatiques, comptage des couverts, mises à jour instantanées.",
      "La solution la plus élégante combine les deux : un carton papier minimaliste avec un QR code qui renvoie vers le faire-part numérique.",
    ],
    sections: [
      {
        h2: "Combien coûte un faire-part papier par rapport au digital ?",
        p: [
          "Le papier a un coût qui grimpe vite : impression, enveloppes, timbres, et souvent une réimpression pour les oublis. Comptez fréquemment 250 à 600 € pour une centaine d'invités, sans parler du temps passé à adresser et poster.",
          "Le digital supprime l'impression et l'envoi postal : le coût est fixe, quel que soit le nombre d'invités. Que vous invitiez 50 ou 300 personnes, le prix ne bouge pas.",
        ],
        table: {
          caption: "Faire-part papier vs numérique statique vs faire-part vivant",
          head: ["Critère", "Papier", "Numérique statique", "Faire-part vivant"],
          rows: [
            ["Prix indicatif", "2–5 € / invité", "Gratuit – 50 €", "À partir de 290 €"],
            ["RSVP en ligne", "Non", "Parfois", "Oui, en temps réel"],
            ["Mise à jour après envoi", "Impossible", "Limitée", "Oui, en direct"],
            ["Album & souvenirs partagés", "Non", "Non", "Oui"],
            ["Installable comme une app", "Non", "Non", "Oui (PWA)"],
            ["Accompagnement humain", "—", "Rare", "Oui, de bout en bout"],
          ],
        },
      },
      {
        h2: "Quel est l'impact écologique de chaque option ?",
        p: [
          "Un faire-part digital, c'est zéro papier, zéro enveloppe, zéro transport. Pour des mariés soucieux de leur empreinte, l'argument pèse : une centaine de cartons, ce sont des kilos de papier et autant de trajets postaux évités.",
          "Le papier peut se vouloir plus responsable (papier recyclé, encres végétales, imprimeur local), mais il reste, par nature, une production physique à acheminer.",
        ],
      },
      {
        h2: "Papier ou digital : lequel crée le plus d'émotion ?",
        p: [
          "Le papier a un charme tactile indéniable, qu'on aime recevoir dans sa boîte aux lettres et garder en souvenir. C'est un objet, et l'objet touche.",
          "Mais le digital n'est pas en reste : un faire-part vivant crée de l'émotion autrement — une invitation qui s'illumine à chaque réponse, un album qui se remplit pendant la fête, des souvenirs qu'on revit longtemps après. L'émotion ne vient plus du papier, mais de l'expérience partagée.",
        ],
      },
      {
        h2: "Quelle option est la plus pratique à gérer ?",
        p: [
          "Côté organisation, le digital gagne haut la main : RSVP automatiques, comptage des couverts par foyer, relances inutiles, mises à jour instantanées si un détail change. Vous suivez tout depuis un tableau de bord, sans tableur qui se désynchronise.",
          "Avec le papier, chaque réponse revient par un canal différent (carton-réponse, SMS, appel) et c'est à vous de tout centraliser à la main — la principale source de stress à l'approche du jour J.",
        ],
      },
      {
        h2: "Peut-on avoir le meilleur des deux mondes ?",
        p: [
          "Oui, et beaucoup de couples le font : un joli carton papier minimaliste avec un QR code, qui renvoie vers le faire-part numérique complet. On garde le geste symbolique du papier pour les proches, et toute la richesse du digital pour l'organisation.",
          "C'est souvent la solution la plus élégante — et c'est exactement ce que permet un faire-part vivant : le papier annonce, le numérique organise et fait vivre.",
        ],
      },
    ],
    faq: [
      ["Peut-on avoir un QR code sur le faire-part papier ?", "Oui : un QR code (ou un lien court) sur votre carton renvoie vers le faire-part numérique, où les invités confirment leur présence et retrouvent toutes les infos."],
      ["Le digital fait-il « moins chic » ?", "Pas du tout, si le design est soigné. Un faire-part numérique élégant et sur mesure fait une très forte impression — souvent plus mémorable qu'un carton classique."],
      ["Faut-il envoyer le digital à tout le monde, même aux grands-parents ?", "Vous pouvez : le lien s'ouvre comme une simple page web, sans installation. Pour les proches les moins connectés, rien n'empêche de doubler d'un mot papier ou d'un appel — les deux se complètent très bien."],
    ],
  },
  {
    slug: "gerer-rsvp-mariage",
    date: "2026-07-13",
    maj: "2026-08-03",
    lecture: "4 min",
    categorie: "Organisation",
    titreSeo: "RSVP de mariage : gérer les réponses sans stress — Faire-part Vivant",
    h1: "RSVP de mariage : gérer les réponses sans stress",
    desc: "Comment gérer les RSVP de votre mariage sans relances ni tableur : le RSVP en ligne, le comptage par foyer, les régimes alimentaires et les bonnes pratiques.",
    chapo:
      "Savoir précisément qui vient est l'un des casse-têtes du mariage. Voici comment gérer vos RSVP simplement, sans relances interminables ni tableur qui déborde.",
    tldr: [
      "Le RSVP (« répondez s'il vous plaît ») est la confirmation de présence : elle conditionne le traiteur, le plan de table et le nombre de couverts.",
      "Le RSVP « classique » se disperse entre SMS, appels et bouche-à-oreille — d'où relances et erreurs de comptage.",
      "Le RSVP en ligne centralise tout en temps réel : présence, adultes, enfants, régimes alimentaires, avec un comptage juste par foyer.",
      "Bonne pratique : demandez les réponses 2 à 3 mois avant, avec une date limite 4 à 6 semaines avant le jour J.",
    ],
    sections: [
      {
        h2: "Le RSVP, c'est quoi exactement ?",
        p: [
          "RSVP (« répondez s'il vous plaît ») désigne la confirmation de présence de vos invités. C'est la donnée qui conditionne le traiteur, le plan de table, le nombre de couverts… bref, presque toute la logistique du mariage.",
          "Une réponse claire, c'est bien plus qu'un « oui » ou un « non » : c'est aussi le nombre exact d'adultes et d'enfants, les éventuels régimes alimentaires, et parfois un petit mot pour les mariés.",
        ],
      },
      {
        h2: "Pourquoi le RSVP « classique » vire au casse-tête",
        p: [
          "Sur le papier, la méthode traditionnelle semble simple : un carton-réponse à renvoyer. En pratique, les réponses arrivent par tous les canaux à la fois, et c'est à vous de tout recoller :",
        ],
        points: [
          "Des réponses éparpillées entre SMS, appels, e-mails et bouche-à-oreille.",
          "Des relances gênantes à faire soi-même, une par une, à quelques semaines du jour J.",
          "Un tableur qui se désynchronise dès qu'un détail change.",
          "Des oublis sur les enfants et les régimes alimentaires, qui compliquent le traiteur.",
        ],
      },
      {
        h2: "En quoi le RSVP en ligne change la donne ?",
        p: [
          "Avec un faire-part numérique, chaque invité confirme sa présence en quelques secondes, directement depuis l'invitation. Vous suivez tout en temps réel : qui vient, combien d'adultes et d'enfants, les régimes, les petits mots.",
          "Fini les relances : les réponses arrivent toutes seules, et le total se met à jour automatiquement. Vous gardez une vue d'ensemble claire, à jour, exportable pour le traiteur en un clic.",
        ],
      },
      {
        h2: "Quelles informations demander dans un RSVP ?",
        p: [
          "Un bon formulaire de RSVP va à l'essentiel, sans oublier ce qui compte pour la logistique :",
        ],
        points: [
          "La présence (oui / non), et le nombre exact de personnes.",
          "La répartition adultes / enfants, pour le traiteur et le plan de table.",
          "Les régimes alimentaires et allergies éventuelles.",
          "Un besoin d'hébergement ou de covoiturage, si vous le proposez.",
          "Un espace libre pour un petit mot ou une précision.",
        ],
      },
      {
        h2: "Le comptage par foyer, ce détail qui change tout",
        p: [
          "Un bon RSVP compte juste : un couple compte pour deux, un accompagnant pour un de plus. Vous obtenez un nombre de couverts fiable, sans recompter à la main — et un export prêt pour le traiteur.",
          "Ce comptage par foyer évite l'erreur la plus courante : additionner des « oui » sans savoir combien de personnes se cachent derrière chacun.",
        ],
      },
      {
        h2: "Quand envoyer la demande de RSVP ?",
        p: [
          "Le bon timing évite la plupart des relances. Voici un calendrier simple qui fonctionne dans la majorité des cas :",
        ],
        table: {
          caption: "Calendrier indicatif des RSVP",
          head: ["Quand", "Quoi"],
          rows: [
            ["6 à 12 mois avant", "Save-the-date : bloquez la date auprès de vos invités."],
            ["2 à 3 mois avant", "Invitation complète + ouverture des réponses (RSVP)."],
            ["4 à 6 semaines avant", "Date limite de réponse + relance douce (idéalement automatique)."],
            ["2 à 3 semaines avant", "Comptage final transmis au traiteur et plan de table."],
          ],
        },
      },
      {
        h2: "Nos conseils pour un RSVP réussi",
        points: [
          "Fixez une date limite claire (4 à 6 semaines avant le mariage).",
          "Demandez d'emblée les régimes alimentaires et la présence d'enfants.",
          "Prévoyez une relance douce — automatique, c'est encore mieux.",
          "Gardez la main : vous pouvez ajouter un plus-un ou une famille à tout moment.",
        ],
      },
    ],
    faq: [
      ["À quel moment envoyer la demande de RSVP ?", "Idéalement 2 à 3 mois avant le mariage, avec une date limite de réponse 4 à 6 semaines avant le jour J."],
      ["Peut-on suivre les réponses en temps réel ?", "Oui : un tableau de bord vous montre en direct qui vient, combien de couverts et quels régimes, avec un export possible."],
      ["Comment relancer les invités qui n'ont pas répondu ?", "Avec un RSVP en ligne, une relance douce peut être envoyée automatiquement aux retardataires — vous n'avez plus à les contacter un par un, et cela reste courtois."],
    ],
  },
];

export const getArticle = (slug) => ARTICLES.find((a) => a.slug === slug);
