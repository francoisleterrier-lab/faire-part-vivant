import { I, useReveal, useStoredAccent, Nav, Footer, Contact, Packs, DEMO } from "./shared.jsx";

/* ============================================================
   Page locale — Faire-part de mariage numérique à Muret & Sud-Toulousain.
   Contenu réellement différencié (proximité immédiate, communes du secteur,
   contexte local) pour rester utile et white-hat.
   ============================================================ */

const NAV = [
  ["index.html", "Accueil"],
  ["fonctionnalites.html", "Fonctionnalités"],
  ["index.html#formules", "Tarifs"],
  ["blog.html", "Journal"],
];

const ZONES = [
  "Muret", "Eaunes", "Le Fauga", "Labarthe-sur-Lèze", "Saint-Hilaire",
  "Portet-sur-Garonne", "Roquettes", "Pinsaguel", "Saubens", "Villeneuve-Tolosane",
  "Cugnaux", "Frouzins", "Carbonne", "Auterive",
];

const POINTS = [
  { t: "Un créateur juste à côté de chez vous", d: "Basé à Lavernose-Lacasse, je suis à une dizaine de minutes de Muret. On peut se rencontrer autour d'un café pour construire votre faire-part, puis avancer à distance, à votre rythme — la proximité en plus." },
  { t: "Pensé pour les mariages du Sud-Toulousain", d: "Domaines champêtres, bords de Garonne, salles des fêtes du secteur : votre faire-part vivant réunit le plan d'accès, le co-voiturage entre communes et les hébergements proches, pour des invités qui viennent souvent des villages alentour comme de Toulouse." },
  { t: "Local, mais sans limite de style", d: "Proximité ne veut pas dire déjà-vu : chaque faire-part est créé sur mesure, à vos prénoms et à votre histoire — élégant, bilingue si besoin, et installable comme une application sur le téléphone de vos invités." },
];

function Hero() {
  return (
    <section className="vt-fhero" id="top">
      <div className="vt-wrap reveal" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <span className="vt-eyebrow">Muret · Sud-Toulousain · Haute-Garonne</span>
        <div className="vt-flourish" style={{ justifyContent: "center", margin: "1rem auto 1.2rem" }} />
        <h1 className="vt-display" style={{ textTransform: "uppercase" }}>
          <span className="vt-h1-line">Faire-part de mariage</span>{" "}
          <span className="vt-h1-line">numérique à Muret</span>
        </h1>
        <p className="vt-lead intro" style={{ margin: "1.4rem auto 2rem" }}>
          Un faire-part de mariage numérique et vivant pour votre mariage à Muret et dans le Sud-Toulousain :
          site-invitation privé, installable comme une app, avec RSVP, album et cagnotte. Sur mesure,
          accompagné, et créé tout près de chez vous — à Lavernose-Lacasse, à quelques minutes de Muret.
        </p>
        <a className="vt-btn gold lg" href={DEMO}>Demander une démo {I.arrow()}</a>
      </div>
    </section>
  );
}

function Local() {
  return (
    <section className="vt-section" id="local">
      <div className="vt-wrap">
        <div className="vt-head reveal">
          <span className="vt-eyebrow">Un faire-part à votre secteur</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">Pourquoi un faire-part numérique pour un mariage à Muret&nbsp;?</h2>
          <p>Trois raisons concrètes, pensées pour les mariages de Muret et des communes du Sud-Toulousain.</p>
        </div>
        <div className="vt-feats">
          {POINTS.map((p) => (
            <article className="vt-feat reveal" key={p.t}>
              <div className="ic">{I.compass()}</div>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </article>
          ))}
        </div>
        <div className="reveal" style={{ maxWidth: "760px", margin: "2.4rem auto 0", textAlign: "center" }}>
          <p style={{ color: "var(--ink-soft)" }}>
            J'accompagne les couples de Muret et de tout le secteur —{" "}
            {ZONES.join(", ")} — ainsi que sur l'ensemble de la Haute-Garonne et du Sud-Toulousain,
            et partout en France à distance. Le tarif reste le même où que vous soyez&nbsp;: chaque
            faire-part est créé sur mesure. Vous cherchez plutôt côté ville&nbsp;?{" "}
            <a href="faire-part-mariage-toulouse.html">Voir la page faire-part de mariage à Toulouse</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function LocalMuret() {
  useReveal();
  useStoredAccent();
  return (
    <>
      <Nav links={NAV} />
      <main>
        <Hero />
        <Local />
        <Packs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
