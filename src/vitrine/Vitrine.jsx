import { useState, useEffect, useRef } from "react";
import couplePortrait from "../assets/couple-portrait.jpg";
import coupleGolden from "../assets/couple-golden.jpg";
import detailsAlliances from "../assets/details-alliances.jpg";
import tableDressee from "../assets/table-dressee.jpg";
import chaisesForever from "../assets/chaises-forever.jpg";
import { I, Sprig, Ornement, useReveal, Nav, Footer, Contact, Lumiere, DEMO } from "./shared.jsx";
import { BENEFICES, UNIVERS, ETAPES, FAQS } from "./data.js";

/* ============================================================
   Faire-part Vivant — Page d'accueil (vitrine).
   Vente en direct, sur mesure : CTA « Demander une démo ».
   ============================================================ */

const NAV = [
  ["fonctionnalites.html", "Fonctionnalités"],
  ["#univers", "Univers"],
  ["#demarche", "Comment ça marche"],
  ["#faq", "FAQ"],
];

const ACCENTS = [
  { id: "sauge", c: "#6f8a6b" }, { id: "or", c: "#b3924f" }, { id: "terracotta", c: "#c07a54" },
  { id: "ardoise", c: "#6f8aa0" }, { id: "rose", c: "#c78ba1" }, { id: "prune", c: "#8a6b86" },
];

const LeafRow = (p) => (
  <svg viewBox="0 0 120 20" width="90" fill="none" {...p}>
    <path d="M60 10 H16M60 10 H104" stroke="currentColor" strokeWidth="1" opacity=".6" />
    {[24, 34, 44].map((x, i) => (<g key={i}><ellipse cx={x} cy="6" rx="5" ry="2.6" fill="currentColor" opacity=".8" transform={`rotate(-28 ${x} 6)`} /><ellipse cx={x + 4} cy="14" rx="5" ry="2.6" fill="currentColor" opacity=".65" transform={`rotate(28 ${x + 4} 14)`} /></g>))}
    {[96, 86, 76].map((x, i) => (<g key={i}><ellipse cx={x} cy="6" rx="5" ry="2.6" fill="currentColor" opacity=".8" transform={`rotate(28 ${x} 6)`} /><ellipse cx={x - 4} cy="14" rx="5" ry="2.6" fill="currentColor" opacity=".65" transform={`rotate(-28 ${x - 4} 14)`} /></g>))}
    <circle cx="60" cy="10" r="2.4" fill="currentColor" opacity=".7" />
  </svg>
);

function PhoneMock() {
  const [accent, setAccent] = useState(ACCENTS[0].c);
  return (
    <div className="vt-phone-wrap">
      <div className="vt-phone reveal">
        <div className="vt-screen" style={{ "--sc-accent": accent }}>
          <div className="sc-top"><span className="cpl">Émilie &amp; Julien</span><span className="bg"><i /><i /><i /></span></div>
          <span className="sc-live">En direct</span>
          <div className="sc-media"><img src={couplePortrait} alt="Couple de mariés au coucher du soleil" /></div>
          <div className="sc-body">
            <p className="sc-eyebrow">Nous nous marions</p>
            <div className="sc-orn"><Ornement /></div>
            <h3 className="sc-couple">Émilie<span className="a">&amp;</span>Julien</h3>
            <p className="sc-date">24 août 2026 · Toulouse</p>
            <div className="sc-leaf"><LeafRow /></div>
            <span className="sc-btn">Je confirme ma présence</span>
            <div className="sc-heart">{I.heart()}</div>
          </div>
        </div>
      </div>
      <div className="vt-swatches reveal">
        <span className="lbl">Votre couleur :</span>
        {ACCENTS.map((a) => (
          <button key={a.id} className={"vt-swatch" + (accent === a.c ? " on" : "")} style={{ background: a.c }} aria-label={a.id} onClick={() => setAccent(a.c)} />
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="vt-hero" id="top">
      <Sprig className="h-tl vt-sway" /><Sprig className="h-br vt-sway" />
      <div className="vt-wrap vt-hero-grid">
        <div className="vt-hero-copy">
          <span className="vt-eyebrow">Sites de mariage sur-mesure · Sud-Toulousain</span>
          <div className="vt-flourish" />
          <h1 className="vt-display">Le faire-part<br />qui <span className="vt-amp">vit</span>.</h1>
          <p className="vt-lead">
            Un site-invitation privé, installable comme une app, qui accompagne vos invités
            du save-the-date jusqu'aux souvenirs d'après la fête.
          </p>
          <div className="vt-hero-actions">
            <a className="vt-btn gold lg" href={DEMO}>Demander une démo {I.arrow()}</a>
            <a className="vt-btn ghost lg" href="fonctionnalites.html">Découvrir les fonctionnalités</a>
          </div>
          <p className="vt-hero-note">{I.heart()} Sur mesure · accompagné · sans app store</p>
        </div>
        <div className="vt-hero-media"><PhoneMock /></div>
      </div>
    </section>
  );
}

function Bandeau() {
  const mots = ["Privé & sécurisé", "Installable comme une app", "Français & anglais", "Accompagné, sur mesure"];
  return (
    <div className="vt-trust">
      <div className="vt-wrap vt-trust-in reveal">
        {mots.map((m) => <div className="vt-stat" key={m}><div className="l" style={{ marginTop: 0, fontSize: "0.95rem", color: "var(--forest)", fontFamily: "var(--serif)", fontStyle: "italic" }}>{m}</div></div>)}
      </div>
    </div>
  );
}

function Benefices() {
  return (
    <section className="vt-section">
      <div className="vt-wrap">
        <div className="vt-head reveal">
          <span className="vt-eyebrow">Pourquoi c'est différent</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">Bien plus qu'un carton d'invitation.</h2>
          <p>Une expérience qui commence au save-the-date et se prolonge longtemps après le dernier verre.</p>
        </div>
        <div className="vt-feats">
          {BENEFICES.map((b) => (
            <article className="vt-feat reveal" key={b.t}>
              <div className="ic">{I[b.ic]()}</div>
              <h3>{b.t}</h3>
              <p>{b.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhotoBand() {
  return (
    <section className="vt-band" style={{ backgroundImage: `url(${coupleGolden})` }}>
      <div className="vt-band-veil" />
      <div className="vt-wrap vt-band-inner reveal">
        <div className="vt-flourish on-dark" />
        <p className="vt-band-quote">« Le plus beau des faire-part,<br />c'est celui qu'on n'oublie pas. »</p>
        <p className="vt-band-sub">Une invitation à votre image — vivante, élégante, partagée.</p>
      </div>
    </section>
  );
}

function UniversApercu() {
  return (
    <section className="vt-section tint" id="univers">
      <div className="vt-wrap">
        <div className="vt-head reveal">
          <span className="vt-eyebrow">Huit univers</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">Tout ce que votre faire-part sait faire.</h2>
          <p>De l'invitation aux souvenirs, chaque univers rapproche vos invités de votre grand jour.</p>
        </div>
        <div className="vt-univers">
          {UNIVERS.map((u) => (
            <a className="vt-univ reveal" key={u.id} href={`fonctionnalites.html#${u.id}`}>
              <div className="vt-univ-top"><span className="ic">{I[u.ic]()}</span><span className="n">{u.n}</span></div>
              <h3>{u.titre}</h3>
              <p>{u.intro}</p>
              <span className="vt-univ-lk">Découvrir {I.arrow()}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const fmtEur = (n) => new Intl.NumberFormat("fr-FR").format(Math.round(n));
function CagnottePreview() {
  const ref = useRef(null);
  const [anim, setAnim] = useState(0);
  const [preset, setPreset] = useState(50);
  const objectif = 4500, collecte = 3240;
  const pct = (collecte / objectif) * 100;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf, start = null, done = false;
    const tick = (t) => { if (start == null) start = t; const p = Math.min(1, (t - start) / 1500); setAnim(1 - Math.pow(1 - p, 3)); if (p < 1) raf = requestAnimationFrame(tick); };
    if (!("IntersectionObserver" in window)) { setAnim(1); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting && !done) { done = true; raf = requestAnimationFrame(tick); io.disconnect(); } }), { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, []);
  const shownPct = pct * anim;
  return (
    <div className="vt-cagp" ref={ref}>
      <p className="vt-cagp-titre">Notre voyage de noces</p>
      <div className="vt-cagp-amt">{fmtEur(collecte * anim)} €<span> / {fmtEur(objectif)} €</span></div>
      <div className="vt-cagp-bar">
        <span className="fill" style={{ width: shownPct + "%" }}><span className="bub">{Math.round(shownPct)}%</span></span>
        {[25, 50, 75, 100].map((m) => <i key={m} className={"ms" + (shownPct >= m - 0.5 ? " on" : "")} style={{ left: m + "%" }} />)}
      </div>
      <p className="vt-cagp-sub">18 participants · plus que {fmtEur(objectif - collecte)} € 🤍</p>
      <div className="vt-cagp-presets">
        {[20, 50, 100].map((a) => (
          <button key={a} type="button" className={"chip" + (preset === a ? " on" : "")} onClick={() => setPreset(a)}>{a} €</button>
        ))}
      </div>
      <button type="button" className="vt-cagp-cta">💝 Participer — {preset} €</button>
    </div>
  );
}

function Highlights() {
  return (
    <section className="vt-section">
      <div className="vt-wrap">
        <div className="vt-split reveal">
          <div>
            <span className="vt-eyebrow">L'album vivant</span>
            <h3 style={{ marginTop: ".6rem" }}>Tous les souvenirs, au même endroit.</h3>
            <p>Vos invités capturent l'instant depuis le faire-part — photo et vidéo — et le mur commun se remplit en temps réel. Vous gardez tout.</p>
            <ul>
              <li>{I.check()} Appareil photo &amp; vidéo intégrés</li>
              <li>{I.check()} Galerie live + diaporama grand écran</li>
              <li>{I.check()} Livre d'or vidéo &amp; défis photo</li>
            </ul>
          </div>
          <div className="vt-split-media photos">
            <div className="vt-album-mock">
              {[detailsAlliances, tableDressee, couplePortrait, chaisesForever, coupleGolden, detailsAlliances, tableDressee, chaisesForever, couplePortrait].map((src, i) => (
                <i key={i} style={{ backgroundImage: `url(${src})` }} />
              ))}
            </div>
          </div>
        </div>
        <div className="vt-split rev reveal">
          <div>
            <span className="vt-eyebrow">La cagnotte</span>
            <h3 style={{ marginTop: ".6rem" }}>Un fonds commun qui prend vie.</h3>
            <p>Jauge animée, jalons, mots doux des contributeurs : la cagnotte devient un moment de partage, pas une case à cocher.</p>
            <ul>
              <li>{I.check()} Reliez votre cagnotte (Leetchi, Lydia, PayPal, RIB…)</li>
              <li>{I.check()} Ou une liste de cadeaux « à réserver »</li>
              <li>{I.check()} Mur de petits mots pour les mariés</li>
            </ul>
          </div>
          <div className="vt-split-media"><CagnottePreview /></div>
        </div>
      </div>
    </section>
  );
}

function Demarche() {
  return (
    <section className="vt-section tint" id="demarche">
      <div className="vt-wrap">
        <div className="vt-head reveal">
          <span className="vt-eyebrow">Vous n'êtes jamais seuls</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">Un faire-part créé avec vous, à la main.</h2>
          <p>Pas de formule toute faite ni de logiciel à apprivoiser : je m'occupe de tout, à vos côtés.</p>
        </div>
        <div className="vt-steps">
          {ETAPES.map((s) => (
            <div className="vt-step reveal" key={s.t}><div className="num" /><h3>{s.t}</h3><p>{s.d}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}

const QUOTES = [
  { q: "Nos invités nous ont dit que c'était le plus beau faire-part qu'ils aient jamais reçu — et l'arbre qui s'illuminait à chaque réponse, ils ont adoré.", n: "Léa & Thomas", m: "Mariés en juin 2025", av: "L" },
  { q: "Fini les relances : les réponses arrivaient toutes seules. Et le mur photo après la fête valait de l'or.", n: "Sarah & Malik", m: "Mariés en septembre 2025", av: "S" },
  { q: "François nous a tout créé sur mesure. On n'a eu qu'à profiter — nos proches ont vécu le mariage avant, pendant et après.", n: "Clara & Antoine", m: "Mariés en mai 2026", av: "C" },
];
function Temoignages() {
  return (
    <section className="vt-section">
      <div className="vt-wrap">
        <div className="vt-head reveal">
          <span className="vt-eyebrow">Ils ont dit oui</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">Des mariés conquis.</h2>
        </div>
        <div className="vt-quotes">
          {QUOTES.map((c) => (
            <figure className="vt-quote reveal" key={c.n}>
              <div className="stars">★★★★★</div>
              <blockquote><p>« {c.q} »</p></blockquote>
              <figcaption className="who"><span className="av">{c.av}</span><span><span className="nm">{c.n}</span><br /><span className="mt">{c.m}</span></span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="vt-section tint" id="faq">
      <div className="vt-wrap">
        <div className="vt-head reveal">
          <span className="vt-eyebrow">Vous vous demandez…</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2">Questions fréquentes.</h2>
        </div>
        <div className="vt-faq reveal">
          {FAQS.map(([q, a], i) => (
            <div className={"vt-faq-item" + (open === i ? " open" : "")} key={q}>
              <button className="vt-faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>{q}<span className="chev">{I.plus()}</span></button>
              <div className="vt-faq-a"><p>{a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Vitrine() {
  useReveal();
  return (
    <>
      <Nav links={NAV} />
      <main>
        <Hero />
        <Bandeau />
        <Benefices />
        <Lumiere />
        <PhotoBand />
        <UniversApercu />
        <Highlights />
        <Demarche />
        <Temoignages />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
