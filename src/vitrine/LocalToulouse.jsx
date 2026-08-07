import { I, useReveal, useStoredAccent, Nav, Footer, Contact, Packs, DEMO } from "./shared.jsx";

/* ============================================================
   Page locale — Faire-part de mariage numérique à Toulouse & Occitanie.
   Contenu réellement différencié (zone, distances, contexte local) pour
   rester utile et white-hat (pas de page satellite dupliquée).
   ============================================================ */

const NAV = [
  ["index.html", "Accueil"],
  ["fonctionnalites.html", "Fonctionnalités"],
  ["index.html#formules", "Tarifs"],
  ["blog.html", "Journal"],
];

const ZONES = [
  "Toulouse", "Muret", "Colomiers", "Blagnac", "Tournefeuille", "Cugnaux",
  "Portet-sur-Garonne", "Auterive", "Carbonne", "Cazères", "Saint-Gaudens",
  "L'Union", "Balma", "Plaisance-du-Touch",
];

const POINTS = [
  { t: "Un faire-part bilingue pour une ville internationale", d: "Toulouse, ville étudiante et aéronautique, réunit souvent des invités venus d'ailleurs. Votre faire-part vivant est en français et en anglais, avec détection automatique de la langue — chaque invité se sent chez lui." },
  { t: "Pensé pour les mariages du Sud-Toulousain", d: "Domaines viticoles, châteaux, mariages en plein air le long de la Garonne : un plan d'accès clair, la météo, le co-voiturage et les hébergements proches, tout est réuni au même endroit pour vos invités." },
  { t: "Sur place, près de chez vous", d: "Basé à Lavernose-Lacasse (31410), à ~25 km de Toulouse et ~12 km de Carbonne, je peux vous rencontrer pour construire votre projet — puis je vous accompagne à distance, à votre rythme." },
];

function Hero() {
  return (
    <section className="vt-fhero" id="top">
      <div className="vt-wrap reveal" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <span className="vt-eyebrow">Toulouse · Haute-Garonne · Occitanie</span>
        <div className="vt-flourish" style={{ justifyContent: "center", margin: "1rem auto 1.2rem" }} />
        <h1 className="vt-display" style={{ textTransform: "uppercase" }}>
          <span className="vt-h1-line">Faire-part de mariage</span>{" "}
          <span className="vt-h1-line">numérique à Toulouse</span>
        </h1>
        <p className="vt-lead intro" style={{ margin: "1.4rem auto 2rem" }}>
          Un faire-part de mariage numérique et vivant pour votre mariage à Toulouse et en Occitanie :
          site-invitation privé, installable comme une app, avec RSVP, album et cagnotte. Sur mesure,
          accompagné, et créé près de chez vous — à Lavernose-Lacasse, dans le Sud-Toulousain.
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
          <span className="vt-eyebrow">Un faire-part à votre région</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">Pourquoi un faire-part numérique pour un mariage à Toulouse&nbsp;?</h2>
          <p>Trois raisons concrètes, pensées pour les mariages de la Ville rose et du Sud-Toulousain.</p>
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
            J'interviens sur toute l'agglomération toulousaine et le Sud-Toulousain —{" "}
            {ZONES.join(", ")} — ainsi qu'en Ariège, dans le Gers et le Tarn, et partout en France à distance.
            Le tarif reste le même où que vous soyez&nbsp;: chaque faire-part est créé sur mesure.
          </p>
          <p style={{ color: "var(--ink-soft)", marginTop: "1rem" }}>
            Un autre événement à Toulouse&nbsp;? Voir aussi le{" "}
            <a href="faire-part-naissance-toulouse.html">faire-part de naissance à Toulouse</a> et le{" "}
            <a href="faire-part-bapteme-toulouse.html">faire-part de baptême à Toulouse</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function LocalToulouse() {
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
