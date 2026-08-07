/* Génère les pages HTML des nouveaux événements à partir des données
   (evenements.js) : title, meta, canonical, OG/Twitter, JSON-LD (WebPage,
   Service, FAQPage, BreadcrumbList). Évite d'écrire le JSON-LD à la main. */
import { EVENEMENTS } from "../src/vitrine/evenements.js";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://francoisleterrier.fr/faire-part-vivant";
const KEYS = ["anniversaire", "fiancailles", "professionnel"];

const page = (e) => {
  const file = `${e.slug}.html`;
  const url = `${BASE}/${file}`;
  const faqLd = e.faq.map((f) => ({
    "@type": "Question", name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.r },
  }));
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`, url,
      name: e.titleSeo, description: e.metaDesc,
      isPartOf: { "@id": `${BASE}/#website` },
      about: { "@id": `${url}#service` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      inLanguage: "fr-FR",
      primaryImageOfPage: { "@id": `${BASE}/#primaryimage` },
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".intro"] },
    },
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: e.serviceName, serviceType: "Faire-part numérique sur mesure",
      provider: { "@id": `${BASE}/#business` },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Sud-Toulousain" },
        { "@type": "AdministrativeArea", name: "Haute-Garonne" },
        { "@type": "State", name: "Occitanie" },
        { "@type": "Country", name: "France" },
      ],
      offers: { "@type": "AggregateOffer", priceCurrency: "EUR", lowPrice: "290", highPrice: "790", offerCount: "3" },
      url,
    },
    { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: faqLd },
    {
      "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE}/` },
        { "@type": "ListItem", position: 2, name: e.serviceName, item: url },
      ],
    },
  ];
  const ld = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2);
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#f4f0e7" />
    <title>${esc(e.titleSeo)}</title>
    <meta name="description" content="${esc(e.metaDesc)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="${url}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Faire-part Vivant · François Leterrier" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${esc(e.h1)}" />
    <meta property="og:description" content="${esc(e.metaDesc)}" />
    <meta property="og:image" content="${BASE}/og.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(e.h1)}" />
    <meta name="twitter:image" content="${BASE}/og.jpg" />

    <link rel="preload" as="font" type="font/woff2" href="fonts/cormorant-600.woff2" crossorigin />
    <link rel="preload" as="font" type="font/woff2" href="fonts/jost-400.woff2" crossorigin />
    <link rel="stylesheet" href="fonts.css" />

    <!-- Ahrefs Web Analytics (sans cookie, RGPD-friendly) -->
    <script src="https://analytics.ahrefs.com/analytics.js" data-key="70o1z25QpySuipMTMk7FMg" async></script>

    <script type="application/ld+json">
${ld}
    </script>
  </head>
  <body>
    <div id="vitrine-root"></div>
    <script type="module" src="/src/vitrine/${e.event}-main.jsx"></script>
  </body>
</html>
`;
};

for (const key of KEYS) {
  const e = EVENEMENTS[key];
  if (!e) { console.warn("gen: événement absent", key); continue; }
  writeFileSync(join(ROOT, `${e.slug}.html`), page(e), "utf8");
  console.log(`gen: ${e.slug}.html`);
}
