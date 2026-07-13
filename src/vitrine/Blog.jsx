import { I, Sprig, useReveal, Nav, Footer, Contact } from "./shared.jsx";
import { ARTICLES } from "./blog.js";

/* Journal — index des articles (contenu SEO). */

const NAV = [
  ["index.html", "Accueil"],
  ["fonctionnalites.html", "Fonctionnalités"],
  ["index.html#formules", "Tarifs"],
  ["blog.html", "Journal"],
];

function Carte({ a }) {
  return (
    <a className="vt-post reveal" href={`blog-${a.slug}.html`}>
      <span className="vt-post-cat">{a.categorie} · {a.lecture}</span>
      <h2>{a.h1}</h2>
      <p>{a.desc}</p>
      <span className="vt-post-lk">Lire l'article {I.arrow()}</span>
    </a>
  );
}

export default function Blog() {
  useReveal();
  return (
    <>
      <Nav links={NAV} />
      <main>
        <section className="vt-fhero" id="top">
          <Sprig className="h-tl vt-sway" /><Sprig className="h-br vt-sway" />
          <div className="vt-wrap reveal" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <span className="vt-eyebrow">Le journal</span>
            <div className="vt-flourish" style={{ justifyContent: "center", margin: "1rem auto 1.2rem" }} />
            <h1 className="vt-display" style={{ textTransform: "uppercase" }}>Conseils & inspirations<br />pour votre faire-part</h1>
            <p className="vt-lead" style={{ margin: "1.4rem auto 0" }}>
              Guides, comparatifs et astuces pour créer un faire-part de mariage numérique qui vous ressemble.
            </p>
          </div>
        </section>
        <section className="vt-section">
          <div className="vt-wrap">
            <div className="vt-blog-grid">
              {ARTICLES.map((a) => <Carte key={a.slug} a={a} />)}
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export { Carte, NAV };
