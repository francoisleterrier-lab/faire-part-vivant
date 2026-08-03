import { I, useReveal, useStoredAccent, Nav, Footer, Contact, DEMO } from "./shared.jsx";
import { ARTICLES, getArticle } from "./blog.js";
import { OFFRE_URL, SITE_PRINCIPAL } from "./data.js";

/* Article de blog (une page/URL par article). */

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

export default function Article({ slug }) {
  useReveal();
  useStoredAccent();
  const a = getArticle(slug);
  if (!a) {
    return (
      <>
        <Nav links={NAV} />
        <main><section className="vt-section"><div className="vt-wrap" style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "var(--serif)", fontSize: "1.4rem" }}>Cet article n'existe pas (ou plus).</p>
          <p><a href="blog.html">← Retour au journal</a></p>
        </div></section></main>
        <Footer />
      </>
    );
  }
  const autres = ARTICLES.filter((x) => x.slug !== slug).slice(0, 2);
  return (
    <>
      <Nav links={NAV} />
      <main>
        <article className="vt-article">
          <div className="vt-wrap vt-article-head reveal">
            <nav className="vt-crumb"><a href="index.html">Accueil</a> <span>›</span> <a href="blog.html">Journal</a> <span>›</span> {a.h1}</nav>
            <span className="vt-eyebrow">{a.categorie} · {a.lecture} de lecture</span>
            <h1 className="vt-display">{a.h1}</h1>
            <p className="vt-article-chapo">{a.chapo}</p>
          </div>
          <div className="vt-wrap vt-article-body">
            {a.tldr && a.tldr.length > 0 && (
              <aside className="vt-tldr reveal" aria-label="En bref">
                <h2>En bref</h2>
                <ul>
                  {a.tldr.map((t, i) => <li key={i}>{I.check()}<span>{t}</span></li>)}
                </ul>
              </aside>
            )}
            {a.sections.map((s, i) => (
              <section className="reveal" key={i}>
                <h2>{s.h2}</h2>
                {(s.p || []).map((par, j) => <p key={j}>{par}</p>)}
                {s.points && (
                  <ul className="vt-article-ul">
                    {s.points.map((pt, k) => <li key={k}>{I.check()}<span>{pt}</span></li>)}
                  </ul>
                )}
                {s.table && (
                  <div className="vt-table-wrap">
                    <table className="vt-table">
                      {s.table.caption && <caption>{s.table.caption}</caption>}
                      <thead><tr>{s.table.head.map((h, k) => <th key={k} scope="col">{h}</th>)}</tr></thead>
                      <tbody>
                        {s.table.rows.map((row, r) => (
                          <tr key={r}>{row.map((cell, c) => (c === 0 ? <th key={c} scope="row">{cell}</th> : <td key={c}>{cell}</td>))}</tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
            {a.faq && (
              <section className="reveal vt-article-faq">
                <h2>Questions fréquentes</h2>
                {a.faq.map(([q, r], i) => (
                  <div key={i} className="vt-article-qa"><h3>{q}</h3><p>{r}</p></div>
                ))}
              </section>
            )}
            <section className="reveal vt-article-more">
              <h2>Pour aller plus loin</h2>
              <ul className="vt-article-ul">
                <li>{I.check()}<span><a href="fonctionnalites.html#rsvp">Le RSVP en ligne et le plan de table</a> — comment vos invités confirment leur présence.</span></li>
                <li>{I.check()}<span><a href="fonctionnalites.html#cadeaux">La cagnotte et la liste de cadeaux</a> — un fonds commun qui prend vie.</span></li>
                <li>{I.check()}<span><a href="fonctionnalites.html#souvenirs">L'album photo partagé</a> — tous les souvenirs au même endroit.</span></li>
                <li>{I.check()}<span><a href="faire-part-mariage-toulouse.html">Faire-part de mariage numérique à Toulouse</a> — pour un mariage en Occitanie.</span></li>
                <li>{I.check()}<span><a href="faire-part-mariage-muret.html">Faire-part de mariage numérique à Muret</a> — et dans le Sud-Toulousain.</span></li>
                <li>{I.check()}<span><a href={OFFRE_URL}>L'offre faire-part digital de François Leterrier</a> — tarifs et détails.</span></li>
              </ul>
            </section>
            <section className="reveal vt-article-author">
              <h2>À propos de l'auteur</h2>
              <p><strong>François Leterrier</strong> crée des faire-part de mariage numériques et interactifs, sur mesure et accompagnés de bout en bout, depuis Lavernose-Lacasse près de Toulouse. Community Manager et créateur de sites dans le Sud-Toulousain, il conçoit chaque faire-part vivant à la main, du save-the-date aux souvenirs d'après la fête. <a href={SITE_PRINCIPAL}>En savoir plus</a>.</p>
            </section>
            <div className="vt-article-cta reveal">
              <p>Envie d'un faire-part comme celui-là, créé sur mesure et accompagné ?</p>
              <a className="vt-btn gold lg" href={DEMO}>Demander une démo {I.arrow()}</a>
              <p className="vt-article-cta-sub"><a href={OFFRE_URL}>Voir l'offre et les tarifs {I.arrow()}</a></p>
            </div>
          </div>
        </article>
        {autres.length > 0 && (
          <section className="vt-section tint">
            <div className="vt-wrap">
              <div className="vt-head reveal">
                <span className="vt-eyebrow">À lire aussi</span>
                <div className="vt-flourish" />
                <h2 className="vt-h2">D'autres articles du journal</h2>
              </div>
              <div className="vt-blog-grid">
                {autres.map((x) => <Carte key={x.slug} a={x} />)}
              </div>
            </div>
          </section>
        )}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
