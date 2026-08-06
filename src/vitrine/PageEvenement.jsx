import { I, Ornement, useReveal, useStoredAccent, Nav, Footer, Contact, Packs, DEMO } from "./shared.jsx";
import { EVENEMENTS } from "./evenements.js";
import photoGrossesse from "../assets/naissance-grossesse.webp";
import photoEnfant from "../assets/bapteme-enfant.webp";

/* Photo d'aperçu dans le mockup, par événement. */
const PHOTOS = {
  naissance: { src: photoGrossesse, alt: "Future maman, les mains posées sur son ventre" },
  bapteme: { src: photoEnfant, alt: "Bébé en tenue de baptême" },
};

/* ============================================================
   Page événement générique — UN composant, plusieurs événements.
   Le contenu (H1, sections, révélation « qui vit », FAQ, mockup,
   frise…) vient d'un preset dans evenements.js (eventKey). Réutilise
   Nav / Packs / Contact / Footer : aucun moteur dupliqué.

   Présentation : héros à deux colonnes avec aperçu animé (mockup
   téléphone, sans photo, gradient), sections en cartes, frise
   interactive des « révélations à date », FAQ en accordéon natif
   (<details> : accessible et lisible sans JavaScript). Tout est
   sûr côté SSR (pré-rendu) : aucun accès navigateur au rendu.
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

/* Aperçu animé : mockup téléphone sans photo (gradient), réutilise
   le style .vt-phone/.vt-screen de l'accueil. */
function EventDevice({ card, photo }) {
  if (!card) return null;
  return (
    <div className="vt-phone-wrap vt-evd">
      <div className="vt-phone">
        <div className="vt-screen">
          <div className="sc-top"><span className="cpl">{card.soustitre}</span><span className="bg"><i /><i /><i /></span></div>
          <span className="sc-live">{card.live}</span>
          <div className="sc-media">
            {photo ? <img src={photo.src} width="700" height="1050" decoding="async" alt={photo.alt} /> : <div className="fallback" />}
          </div>
          <div className="sc-body">
            <p className="sc-eyebrow">{card.eyebrow}</p>
            <div className="sc-orn"><Ornement /></div>
            <h3 className="sc-couple">{card.titre}</h3>
            <p className="sc-date">{card.date}</p>
            {card.compteur && (
              <div className="vt-evd-count">
                {card.compteur.map((c, i) => (
                  <div className="vt-evd-cell" key={i}><b>{c.n}</b><span>{c.l}</span></div>
                ))}
              </div>
            )}
            {card.secret && <p className="vt-evd-secret">{I.spark()}<span>{card.secret}</span></p>}
            <span className="sc-btn">{card.cta}</span>
          </div>
        </div>
      </div>
      {card.note && <span className="vt-evd-note">{card.note}</span>}
    </div>
  );
}

/* Frise interactive des « révélations à date » (apparition échelonnée). */
function Timeline({ steps }) {
  if (!steps || !steps.length) return null;
  return (
    <ol className="vt-tl">
      {steps.map((s, i) => (
        <li className="vt-tl-item reveal" key={i} style={{ "--d": `${i * 90}ms` }}>
          <span className="vt-tl-node">{I[s.icon] ? I[s.icon]() : I.spark()}</span>
          <div className="vt-tl-card">
            <span className="vt-tl-phase">{s.phase}</span>
            <h3 className="vt-tl-titre">{s.titre}</h3>
            <p className="vt-tl-texte">{s.texte}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

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
        {/* Héros à deux colonnes : discours + aperçu animé */}
        <section className="vt-fhero vt-evt-hero" id="top">
          <div className="vt-wrap vt-evt-hero-in">
            <div className="vt-evt-hero-copy reveal">
              <span className="vt-eyebrow">{e.heroEyebrow}</span>
              <div className="vt-flourish" />
              <h1 className="vt-display" style={{ textTransform: "uppercase" }}>{e.h1}</h1>
              <p className="vt-lead intro">{e.heroLede}</p>
              <div className="vt-evt-hero-cta">
                <a className="vt-btn gold lg" href={DEMO}>{e.ctaLabel} {I.arrow()}</a>
                <a className="vt-btn ghost" href="#revelations">Voir comment ça vit</a>
              </div>
              <ul className="vt-evt-chips">
                <li>{I.check()}<span>Sans abonnement</span></li>
                <li>{I.check()}<span>Partout en France</span></li>
                <li>{I.check()}<span>Sur-mesure & accompagné</span></li>
              </ul>
            </div>
            <div className="vt-evt-hero-media reveal">
              <EventDevice card={e.heroCard} photo={PHOTOS[eventKey]} />
            </div>
          </div>
        </section>

        {/* Sections : texte lisible + points en cartes */}
        <section className="vt-section vt-evt-prose">
          <div className="vt-wrap">
            {e.sections.map((s, i) => (
              <div className={"vt-evt-block reveal" + (s.phare ? " phare" : "")} key={i}>
                <div className="vt-evt-block-head">
                  <h2>{s.h2}</h2>
                  {(s.p || []).map((par, j) => <p key={j}>{par}</p>)}
                </div>
                {s.points && (
                  <div className="vt-evt-cards">
                    {s.points.map((pt, k) => (
                      <div className="vt-evt-card2" key={k}>
                        <span className="vt-evt-card2-ic">{I.check()}</span>
                        <p>{pt}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Révélations à date : frise interactive + texte détaillé */}
        {e.revelation && (
          <section className="vt-section tint" id="revelations">
            <div className="vt-wrap">
              <div className="vt-head reveal">
                <span className="vt-eyebrow">L'effet qui vit</span>
                <div className="vt-flourish" />
                <h2 className="vt-h2">{e.revelation.h2}</h2>
                {e.revelation.p.slice(0, 1).map((par, j) => <p key={j}>{par}</p>)}
              </div>
              <Timeline steps={e.timeline} />
              {e.revelation.p.slice(1).length > 0 && (
                <div className="vt-evt-reveal-more reveal">
                  {e.revelation.p.slice(1).map((par, j) => <p key={j}>{par}</p>)}
                </div>
              )}
            </div>
          </section>
        )}

        <Packs />

        {/* FAQ en accordéon natif (<details>) : interactif, accessible, lisible sans JS */}
        {e.faq && e.faq.length > 0 && (
          <section className="vt-section" id="faq">
            <div className="vt-wrap" style={{ maxWidth: "780px" }}>
              <div className="vt-head reveal">
                <span className="vt-eyebrow">Bon à savoir</span>
                <div className="vt-flourish" />
                <h2 className="vt-h2">Questions fréquentes</h2>
              </div>
              <div className="vt-acc reveal">
                {e.faq.map((f, i) => (
                  <details className="vt-acc-item" key={i} open={i === 0}>
                    <summary className="vt-acc-q"><span>{f.q}</span><span className="vt-acc-ic">{I.plus()}</span></summary>
                    <div className="vt-acc-a"><p>{f.r}</p></div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Cross-sell autres événements */}
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
