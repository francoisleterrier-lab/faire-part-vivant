import { I, useReveal, useStoredAccent, Nav, Footer, Contact, DEMO } from "./shared.jsx";
import { AVIS, SITE_PRINCIPAL, OFFRE_URL } from "./data.js";

/* ============================================================
   Page auteur (E-E-A-T) — À propos de François Leterrier.
   Renforce l'expertise, l'autorité et la confiance de tout le site :
   qui crée les faire-part, son expérience, sa zone, ses preuves.
   ============================================================ */

const NAV = [
  ["index.html", "Accueil"],
  ["fonctionnalites.html", "Fonctionnalités"],
  ["index.html#formules", "Tarifs"],
  ["blog.html", "Journal"],
];

const REPERES = [
  { t: "Créateur de faire-part numériques", d: "Je conçois chaque faire-part vivant à la main, du save-the-date jusqu'aux souvenirs d'après la fête — sur mesure, jamais depuis un modèle tout fait." },
  { t: "Community Manager & créateur de sites", d: "J'accompagne aussi des entreprises du Sud-Toulousain sur leurs sites et leurs réseaux sociaux : le même soin du détail, la même exigence de résultat." },
  { t: "Basé dans le Sud-Toulousain", d: "À Lavernose-Lacasse (31410), près de Muret et de Toulouse. Je rencontre les couples de la région et accompagne partout en France à distance." },
];

function Hero() {
  return (
    <section className="vt-fhero" id="top">
      <div className="vt-wrap reveal" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <span className="vt-eyebrow">À propos</span>
        <div className="vt-flourish" style={{ justifyContent: "center", margin: "1rem auto 1.2rem" }} />
        <h1 className="vt-display" style={{ textTransform: "uppercase" }}>François Leterrier</h1>
        <p className="vt-lead intro" style={{ margin: "1.4rem auto 2rem" }}>
          Créateur de faire-part de mariage numériques et interactifs, sur mesure et accompagnés de
          bout en bout, depuis Lavernose-Lacasse dans le Sud-Toulousain. Chaque faire-part vivant est
          conçu à la main, pour raconter votre histoire.
        </p>
        <a className="vt-btn gold lg" href={DEMO}>Demander une démo {I.arrow()}</a>
      </div>
    </section>
  );
}

function Reperes() {
  return (
    <section className="vt-section" id="reperes">
      <div className="vt-wrap">
        <div className="vt-head reveal">
          <span className="vt-eyebrow">Qui suis-je</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">Un artisan du web, au service de votre mariage</h2>
        </div>
        <div className="vt-feats">
          {REPERES.map((p) => (
            <article className="vt-feat reveal" key={p.t}>
              <div className="ic">{I.spark()}</div>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </article>
          ))}
        </div>
        <div className="reveal" style={{ maxWidth: "760px", margin: "2.4rem auto 0" }}>
          <p style={{ color: "var(--ink-soft)", lineHeight: 1.8 }}>
            J'ai créé <strong>Faire-part Vivant</strong> avec une conviction simple : un faire-part ne
            devrait pas s'arrêter à l'annonce. Il peut accompagner vos invités tout au long de l'aventure —
            recueillir leurs réponses, rassembler leurs photos, révéler vos surprises au bon moment. Je
            travaille en <strong>vente directe, sans abonnement</strong> : on échange, je vous montre le
            produit en vrai, et je vous fais une proposition claire, à votre rythme. Pour en savoir plus
            sur mon activité, rendez-vous sur <a href={SITE_PRINCIPAL}>francoisleterrier.fr</a> ou sur{" "}
            <a href={OFFRE_URL}>l'offre faire-part digital</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

function Avis() {
  const trois = AVIS.slice(0, 3);
  return (
    <section className="vt-section tint" id="avis">
      <div className="vt-wrap">
        <div className="vt-head reveal">
          <span className="vt-eyebrow">Ils m'ont fait confiance</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">Avis vérifiés</h2>
        </div>
        <div className="vt-feats">
          {trois.map((a) => (
            <article className="vt-feat reveal" key={a.nom}>
              <p style={{ fontFamily: "var(--serif)", fontStyle: "italic" }}>« {a.texte} »</p>
              <h3 style={{ marginTop: ".6rem" }}>{a.nom} <span style={{ color: "var(--gold)" }}>★★★★★</span></h3>
              <p style={{ fontSize: ".9rem", color: "var(--ink-soft)" }}>{a.pour}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function APropos() {
  useReveal();
  useStoredAccent();
  return (
    <>
      <Nav links={NAV} />
      <main>
        <Hero />
        <Reperes />
        <Avis />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
