import { I, Sprig, useReveal, Nav, Footer, Contact, Lumiere, Packs, DEMO } from "./shared.jsx";
import { UNIVERS } from "./data.js";

/* ============================================================
   Faire-part Vivant — Page « Fonctionnalités » (8 univers).
   ============================================================ */

const NAV = [
  ["index.html", "Accueil"],
  ["#invitation", "Le faire-part"],
  ["#formules", "Tarifs"],
  ["index.html#faq", "FAQ"],
];

function Hero() {
  return (
    <section className="vt-fhero" id="top">
      <Sprig className="h-tl vt-sway" /><Sprig className="h-br vt-sway" />
      <div className="vt-wrap reveal" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <span className="vt-eyebrow">Huit univers, une expérience</span>
        <div className="vt-flourish" style={{ justifyContent: "center", margin: "1rem auto 1.2rem" }} />
        <h1 className="vt-display" style={{ textTransform: "uppercase" }}>Tout ce que votre<br />faire-part sait faire.</h1>
        <p className="vt-lead" style={{ margin: "1.4rem auto 2rem" }}>
          De l'invitation installable aux souvenirs d'après la fête : chaque fonctionnalité est pensée
          pour rapprocher vos invités de votre grand jour — sans jargon, sans effort.
        </p>
        <a className="vt-btn gold lg" href={DEMO}>Demander une démo {I.arrow()}</a>
      </div>
    </section>
  );
}

function Univers({ u, i }) {
  return (
    <section className={"vt-uni" + (i % 2 ? " tint" : "")} id={u.id}>
      <div className="vt-wrap vt-uni-in">
        <div className="vt-uni-head reveal">
          <div className="vt-uni-badge">{I[u.ic]()}</div>
          <span className="vt-eyebrow">{u.n} · {u.nom}</span>
          <h2 className="vt-h2">{u.titre}</h2>
          <p>{u.intro}</p>
        </div>
        <div className="vt-uni-feats">
          {u.feats.map((f) => (
            <div className="vt-uni-feat reveal" key={f.t}>
              <span className="ic">{I.check()}</span>
              <div><h4>{f.t}</h4><p>{f.d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Fonctionnalites() {
  useReveal();
  return (
    <>
      <Nav links={NAV} />
      <main>
        <Hero />
        {UNIVERS.map((u, i) => <Univers key={u.id} u={u} i={i} />)}
        <Lumiere />
        <Packs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
