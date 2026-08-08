/* Génère les pages HTML « événement × ville » (longue traîne) à partir
   des données (localEvenements.js) : title, meta, canonical, OG/Twitter,
   JSON-LD (WebPage, Service à zone locale, FAQPage, BreadcrumbList qui
   niche la page sous la page événement générale). Évite d'écrire le
   JSON-LD à la main. */
import { LOCAL_EVENEMENTS } from "../src/vitrine/localEvenements.js";
import { EVENEMENTS } from "../src/vitrine/evenements.js";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://francoisleterrier.fr/faire-part-vivant";
const PUBLISHED = "2026-08-07";
const MODIFIED = "2026-08-08";
const CP = { Toulouse: "31000", Muret: "31600" };

const page = (key, L) => {
  const e = EVENEMENTS[L.event];
  const file = `${L.slug}.html`;
  const url = `${BASE}/${file}`;
  const ogImg = `${BASE}/og-${key}.jpg`;
  const eventUrl = e ? `${BASE}/${e.slug}.html` : `${BASE}/`;
  const faqLd = L.faq.map((f) => ({
    "@type": "Question", name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.r },
  }));
  const graph = [
    {
      "@type": ["ProfessionalService", "Organization"],
      "@id": `${BASE}/#business`,
      name: "Faire-part Vivant — François Leterrier",
      url: `${BASE}/`,
      image: `${BASE}/og.jpg`,
      logo: { "@type": "ImageObject", "@id": `${BASE}/#logo`, url: `${BASE}/icons/icon-512.png`, width: 512, height: 512 },
      telephone: "+33698200208",
      email: "francois.leterrier.cmw@gmail.com",
      priceRange: "290€–790€",
      areaServed: [
        { "@type": "City", name: L.ville, ...(CP[L.ville] ? { address: { "@type": "PostalAddress", postalCode: CP[L.ville], addressLocality: L.ville, addressCountry: "FR" } } : {}) },
        { "@type": "AdministrativeArea", name: "Haute-Garonne" },
        { "@type": "State", name: "Occitanie" },
        { "@type": "Country", name: "France" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`, url,
      name: L.titleSeo, description: L.metaDesc,
      isPartOf: { "@id": `${BASE}/#website` },
      about: { "@id": `${url}#service` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      inLanguage: "fr-FR",
      primaryImageOfPage: { "@id": `${url}#primaryimage` },
      datePublished: PUBLISHED,
      dateModified: MODIFIED,
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".intro", ".faq-answer"] },
    },
    {
      "@type": "ImageObject",
      "@id": `${url}#primaryimage`,
      url: ogImg, contentUrl: ogImg, width: 1200, height: 630,
      caption: L.h1,
    },
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: L.h1, serviceType: "Faire-part numérique sur mesure",
      category: "Faire-part numérique",
      description: L.metaDesc,
      inLanguage: "fr-FR",
      provider: { "@id": `${BASE}/#business` },
      brand: { "@id": `${BASE}/#business` },
      image: { "@id": `${url}#primaryimage` },
      areaServed: [
        { "@type": "City", name: L.ville, ...(CP[L.ville] ? { postalCode: CP[L.ville] } : {}) },
        { "@type": "AdministrativeArea", name: "Haute-Garonne" },
        { "@type": "AdministrativeArea", name: "Sud-Toulousain" },
        { "@type": "State", name: "Occitanie" },
        { "@type": "Country", name: "France" },
      ],
      offers: { "@type": "AggregateOffer", priceCurrency: "EUR", lowPrice: 290, highPrice: 790, offerCount: 3, availability: "https://schema.org/InStock", url },
      url,
    },
    { "@type": "FAQPage", "@id": `${url}#faq`, inLanguage: "fr-FR", isPartOf: { "@id": `${url}#webpage` }, mainEntity: faqLd },
    {
      "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE}/` },
        ...(e ? [{ "@type": "ListItem", position: 2, name: e.serviceName, item: eventUrl }] : []),
        { "@type": "ListItem", position: e ? 3 : 2, name: `${e ? e.serviceName : "Faire-part"} à ${L.ville}`, item: url },
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
    <meta name="theme-color" content="#f4f0e7" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#12201a" media="(prefers-color-scheme: dark)" />
    <title>${esc(L.titleSeo)}</title>
    <meta name="description" content="${esc(L.metaDesc)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="fr-FR" href="${url}" />
    <link rel="alternate" hreflang="x-default" href="${url}" />
    <link rel="alternate" type="text/plain" title="Carte IA (llms.txt)" href="llms.txt" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Faire-part Vivant · François Leterrier" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${esc(L.h1)}" />
    <meta property="og:description" content="${esc(L.metaDesc)}" />
    <meta property="og:image" content="${ogImg}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${esc(L.h1)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(L.h1)}" />
    <meta name="twitter:description" content="${esc(L.metaDesc)}" />
    <meta name="twitter:image" content="${ogImg}" />

    <link rel="preload" as="font" type="font/woff2" href="fonts/cormorant-600.woff2" crossorigin />
    <link rel="preload" as="font" type="font/woff2" href="fonts/jost-400.woff2" crossorigin />
    <link rel="preload" as="font" type="font/woff2" href="fonts/jost-300.woff2" crossorigin />
    <link rel="stylesheet" href="fonts.css" />

    <!-- Ahrefs Web Analytics (sans cookie, RGPD-friendly) -->
    <script src="https://analytics.ahrefs.com/analytics.js" data-key="70o1z25QpySuipMTMk7FMg" async></script>

    <script type="application/ld+json">
${ld}
    </script>
  </head>
  <body>
    <div id="vitrine-root"></div>
    <script type="module" src="/src/vitrine/${key}-main.jsx"></script>
  </body>
</html>
`;
};

for (const [key, L] of Object.entries(LOCAL_EVENEMENTS)) {
  writeFileSync(join(ROOT, `${L.slug}.html`), page(key, L), "utf8");
  console.log(`gen-local: ${L.slug}.html`);
}
