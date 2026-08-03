import { I, useReveal, useStoredAccent, Nav, Footer, Contact, Packs, DEMO } from "./shared.jsx";

/* ============================================================
   Page nationale — Faire-part de mariage numérique en France.
   Positionne l'offre au niveau national : 100 % à distance, partout
   en France, même qualité et même tarif où que soient les mariés.
   ============================================================ */

const NAV = [
  ["index.html", "Accueil"],
  ["fonctionnalites.html", "Fonctionnalités"],
  ["index.html#formules", "Tarifs"],
  ["blog.html", "Journal"],
];

const VILLES = [
  "Paris", "Lyon", "Marseille", "Bordeaux", "Lille", "Nantes", "Toulouse",
  "Strasbourg", "Montpellier", "Nice", "Rennes", "Grenoble", "Rouen", "Annecy",
];

const POINTS = [
  { t: "Où que vous soyez en France", d: "Tout se fait à distance : un lien suffit. Que vous vous mariiez à Paris, Lyon, Bordeaux ou dans un petit village, votre faire-part vivant vous parvient de la même façon — aucun déplacement nécessaire." },
  { t: "La même qualité, le même prix partout", d: "Chaque faire-part est créé sur mesure, et le tarif ne dépend pas de votre région. Où que vous soyez, vous bénéficiez du même accompagnement humain, de bout en bout." },
  { t: "Un accompagnement humain, à distance", d: "On échange par téléphone, e-mail ou visio. Je vous montre le produit en vrai, j'écoute votre histoire, et je vous accompagne jusqu'au jour J — la proximité, sans la contrainte géographique." },
];

function Hero() {
  return (
    <section className="vt-fhero" id="top">
      <div className="vt-wrap reveal" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <span className="vt-eyebrow">Partout en France · 100 % à distance</span>
        <div className="vt-flourish" style={{ justifyContent: "center", margin: "1rem auto 1.2rem" }} />
        <h1 className="vt-display" style={{ textTransform: "uppercase" }}>
          <span className="vt-h1-line">Faire-part de mariage</span>{" "}
          <span className="vt-h1-line">numérique en France</span>
        </h1>
        <p className="vt-lead intro" style={{ margin: "1.4rem auto 2rem" }}>
          Un faire-part de mariage numérique et vivant, créé sur mesure et accompagné de bout en bout —
          où que vous soyez en France. Site-invitation privé, installable comme une app, avec RSVP,
          album et cagnotte. Tout se fait à distance, sans aucun déplacement.
        </p>
        <a className="vt-btn gold lg" href={DEMO}>Demander un devis gratuit {I.arrow()}</a>
      </div>
    </section>
  );
}

function National() {
  return (
    <section className="vt-section" id="national">
      <div className="vt-wrap">
        <div className="vt-head reveal">
          <span className="vt-eyebrow">Un faire-part sans frontières</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">Un faire-part numérique, partout en France&nbsp;?</h2>
          <p>Le numérique abolit la distance : votre faire-part vous suit où que vous soyez.</p>
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
            J'accompagne des couples partout en France — {VILLES.join(", ")} et toutes les autres villes et
            villages — entièrement à distance. Vous êtes dans le Sud-Toulousain&nbsp;?{" "}
            <a href="faire-part-mariage-toulouse.html">Voir la page Toulouse</a> ou{" "}
            <a href="faire-part-mariage-muret.html">Muret</a>, où l'on peut aussi se rencontrer.
          </p>
        </div>
      </div>
    </section>
  );
}

function Comment() {
  const etapes = [
    "Vous demandez un devis gratuit — on échange sur votre projet, par téléphone ou visio.",
    "Je crée votre faire-part sur mesure et vous le remets prêt à vivre, où que vous soyez.",
    "Vous le partagez par un simple lien ; vos invités répondent et vivent votre mariage en ligne.",
  ];
  return (
    <section className="vt-section tint" id="comment">
      <div className="vt-wrap">
        <div className="vt-head reveal">
          <span className="vt-eyebrow">Comment ça marche à distance</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">Trois étapes, sans vous déplacer</h2>
        </div>
        <ul className="vt-article-ul reveal" style={{ maxWidth: "680px", margin: "0 auto" }}>
          {etapes.map((e, i) => <li key={i}>{I.check()}<span>{e}</span></li>)}
        </ul>
      </div>
    </section>
  );
}

export default function LocalFrance() {
  useReveal();
  useStoredAccent();
  return (
    <>
      <Nav links={NAV} />
      <main>
        <Hero />
        <National />
        <Comment />
        <Packs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
