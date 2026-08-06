import { I, useReveal, useStoredAccent, Nav, Footer, Contact, Packs, DEMO } from "./shared.jsx";
import { EVENEMENTS } from "./evenements.js";

/* ============================================================
   Page événement générique — UN composant, plusieurs événements.
   Le contenu (H1, sections, révélation « qui vit », FAQ…) vient d'un
   preset dans evenements.js (eventKey). Réutilise Nav / Packs / Contact
   / Footer : aucun moteur dupliqué.
   ============================================================ */

const NAV = [
  ["index.html", "Accueil"],
  ["fonctionnalites.html", "Fonctionnalités"],
  ["index.html#formules", "Tarifs"],
  ["blog.html", "Journal"],
];

const AUTRES = [
  { key: "mariage", nom: "Mariage", href: "index.html" },
  { key: "naissance", nom: "Naissance", href: "faire-part-naissance.html" },
  { key: "bapteme", nom: "Baptême", href: "faire-part-bapteme.html" },
];

export default function PageEvenement({ eventKey }) {
  useReveal();
  useStoredAccent();
  const e = EVENEMENTS[eventKey];
  if (!e) return null;
  const autres = AUTRES.filter((a) => a.key !== eventKey);
  return (
    <>
      <Nav links={NAV} />
      <main>
        <section className="vt-fhero" id="top">
          <div className="vt-wrap reveal" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <span className="vt-eyebrow">{e.heroEyebrow}</span>
            <div className="vt-flourish" style={{ justifyContent: "center", margin: "1rem auto 1.2rem" }} />
            <h1 className="vt-display" style={{ textTransform: "uppercase" }}>{e.h1}</h1>
            <p className="vt-lead intro" style={{ margin: "1.4rem auto 2rem" }}>{e.heroLede}</p>
            <a className="vt-btn gold lg" href={DEMO}>{e.ctaLabel} {I.arrow()}</a>
          </div>
        </section>

        <section className="vt-section">
          <div className="vt-wrap vt-article-body" style={{ maxWidth: "760px" }}>
            {e.sections.map((s, i) => (
              <section className="reveal" key={i}>
                <h2>{s.h2}</h2>
                {(s.p || []).map((par, j) => <p key={j}>{par}</p>)}
                {s.points && (
                  <ul className="vt-article-ul">
                    {s.points.map((pt, k) => <li key={k}>{I.check()}<span>{pt}</span></li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </section>

        {e.revelation && (
          <section className="vt-section tint" id="revelations">
            <div className="vt-wrap">
              <div className="vt-evt-reveal reveal">
                <span className="vt-eyebrow">L'effet qui vit</span>
                <h2 className="vt-h2">{e.revelation.h2}</h2>
                {e.revelation.p.map((par, j) => <p key={j}>{par}</p>)}
              </div>
            </div>
          </section>
        )}

        <Packs />

        {e.faq && e.faq.length > 0 && (
          <section className="vt-section" id="faq">
            <div className="vt-wrap" style={{ maxWidth: "760px" }}>
              <div className="vt-head reveal">
                <span className="vt-eyebrow">Bon à savoir</span>
                <div className="vt-flourish" />
                <h2 className="vt-h2">Questions fréquentes</h2>
              </div>
              <div className="vt-article-faq" style={{ borderTop: "none" }}>
                {e.faq.map((f, i) => (
                  <div key={i} className="vt-article-qa reveal"><h3>{f.q}</h3><p>{f.r}</p></div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="vt-section tint">
          <div className="vt-wrap">
            <div className="vt-head reveal">
              <span className="vt-eyebrow">Un faire-part pour chaque occasion</span>
              <div className="vt-flourish" />
              <h2 className="vt-h2">Le faire-part qui vit, pour tous vos événements</h2>
            </div>
            <div className="vt-evt-links reveal">
              {autres.map((a) => (
                <a key={a.key} className="vt-btn ghost" href={a.href}>Faire-part {a.nom.toLowerCase()} {I.arrow()}</a>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
