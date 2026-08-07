import { useState, useEffect, useRef } from "react";
import { I, DEMO } from "./shared.jsx";

/* ============================================================
   « Le jeu des paris » — bloc interactif de la page naissance.
   Deux jeux : deviner le prénom (liste composée par les parents,
   éditable) et parier garçon / fille. Le « jour J », la page dévoile
   la réponse et félicite les gagnants ; une cérémonie festive
   (« gender reveal ») optionnelle peut se lancer.

   Contraintes tenues :
   - SSR / pré-rendu : aucun accès navigateur au niveau module ni au
     rendu ; états initialisés par des constantes de config ;
     restauration localStorage uniquement dans un useEffect post-montage ;
     décomptes = longueurs de listes (identiques serveur ↔ client).
   - Piège prérendu `/\breveal\b/g` : aucune classe ni aucun texte
     statique ne contient « reveal » ; les classes de cérémonie sont
     .vt-jeu-gr-* (« grand dévoilement ») et le libellé « gender reveal »
     n'apparaît que côté client, après déverrouillage.
   - Accent sauge de l'événement (var(--gold)) + mode sombre + mobile + a11y.
   ============================================================ */

function normaliseJeu(jeu) {
  const j = jeu || {};
  const jeux = Array.isArray(j.jeux) && j.jeux.length ? j.jeux : ["prenom"];
  const prenoms = (j.prenoms || []).map((p) => ({ id: p.id, label: p.label, parieurs: p.parieurs || [] }));
  const parisSexe = { fille: (j.parisSexe && j.parisSexe.fille) || [], garcon: (j.parisSexe && j.parisSexe.garcon) || [] };
  return {
    jeux,
    genderReveal: !!j.genderReveal,
    prenomReel: j.prenomReel || null,
    sexeReel: j.sexeReel === "garcon" ? "garcon" : "fille",
    labels: j.labels || { fille: "Une fille", garcon: "Un garçon" },
    ceremonie: j.reveal || { fille: { titre: "C'est une FILLE", sous: "Bienvenue à toi 🤍" }, garcon: { titre: "C'est un GARÇON", sous: "Bienvenue à toi 🤍" } },
    dripAmbiance: !!j.dripAmbiance,
    prenoms,
    parisSexe,
    prenomParieurs: (id) => { const p = prenoms.find((x) => x.id === id); return p ? p.parieurs : []; },
  };
}

const KEY = "fpv-jeu-naissance";
const readJeu = () => { try { return JSON.parse(localStorage.getItem(KEY)) ?? null; } catch { return null; } };
const saveJeu = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* stockage indispo */ } };

const compteMot = (n) => (n <= 0 ? "aucun pari" : n === 1 ? "1 pari" : `${n} paris`);

/* Confettis (cœurs + rectangles), 100 % dans un effet. Gate reduced-motion.
   Couleur d'accent lue au runtime → suit le thème sauge de l'événement. */
function useConfetti(fire, sexe) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv || !fire) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const w = cv.clientWidth || 320, h = cv.clientHeight || 220;
    if (!w || !h) return;
    const ctx = cv.getContext("2d");
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    cv.width = w * DPR; cv.height = h * DPR; ctx.scale(DPR, DPR);
    const acc = getComputedStyle(cv).getPropertyValue("--gold").trim() || "#7e9b78";
    const teinte = sexe === "garcon" ? "#7ba6c4" : "#d98fa6";
    const cols = [acc, teinte, "#fff6de", "#e7c78a"];
    const P = [...Array(96)].map((_, i) => ({
      x: w / 2, y: h * 0.42, vx: (Math.random() - 0.5) * 9, vy: Math.random() * -11 - 3,
      g: 0.28, life: 1, c: cols[i % cols.length], s: 3 + Math.random() * 4, rot: Math.random() * 6.28, heart: i % 3 === 0,
    }));
    let raf; const t0 = performance.now();
    const step = (t) => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const p of P) {
        p.x += p.vx; p.y += p.vy; p.vy += p.g; p.rot += 0.1; p.life -= 0.011;
        ctx.globalAlpha = Math.max(0, p.life); ctx.fillStyle = p.c;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        if (p.heart) {
          const s = p.s; ctx.beginPath(); ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(s, -s * 0.6, s * 1.4, s * 0.4, 0, s * 1.1);
          ctx.bezierCurveTo(-s * 1.4, s * 0.4, -s, -s * 0.6, 0, s * 0.3); ctx.fill();
        } else ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 1.6);
        ctx.restore();
      }
      if (t - t0 < 2500) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [fire, sexe]);
  return ref;
}

export default function JeuDesParis({ jeu }) {
  const cfg = normaliseJeu(jeu);
  const [phase, setPhase] = useState("paris");
  const [tab, setTab] = useState(cfg.jeux[0]);
  const [prenoms, setPrenoms] = useState(cfg.prenoms);
  const [editing, setEditing] = useState(false);
  const [voteP, setVoteP] = useState(null);
  const [voteS, setVoteS] = useState(null);
  const [drip, setDrip] = useState({});
  const [toast, setToast] = useState("");
  const [fired, setFired] = useState(false);
  const [live, setLive] = useState("");
  const [announce, setAnnounce] = useState("");

  const uidRef = useRef(1000);
  const panelRefs = useRef({});     // {prenom, sexe} → conteneur de panneau (focus révélation)
  const tabRefs = useRef({});       // {prenom, sexe} → bouton d'onglet (roving tabindex)
  const inputRefs = useRef({});     // {id} → input éditeur (focus ajout)
  const addBtnRef = useRef(null);
  const pendingFocus = useRef(null); // id d'input ou "__add__" à focaliser après maj de liste
  const prenomsRef = useRef(prenoms);
  useEffect(() => { prenomsRef.current = prenoms; });
  const canvasRef = useConfetti(fired && phase === "reveal" && tab === "sexe", cfg.sexeReel);

  const nomOK = (p) => ((p && p.label) || "").trim();

  /* Restauration APRÈS montage (jamais au rendu → SSR sûr, pas de flash).
     On assainit chaque entrée (id chaîne, label chaîne, parieurs tableau) et on
     ré-amorce le compteur d'id pour éviter toute collision de clé au prochain ajout. */
  useEffect(() => {
    const s = readJeu();
    if (!s || typeof s !== "object") return;
    let list = null;
    if (Array.isArray(s.prenoms)) {
      const clean = s.prenoms
        .filter((p) => p && typeof p.id === "string")
        .map((p) => ({ id: p.id, label: typeof p.label === "string" ? p.label : "", parieurs: Array.isArray(p.parieurs) ? p.parieurs : [] }));
      if (clean.length) {
        list = clean;
        setPrenoms(clean);
        uidRef.current = clean.reduce((m, p) => { const x = /^p(\d+)$/.exec(p.id); return x ? Math.max(m, +x[1]) : m; }, uidRef.current);
      }
    }
    const ref = list || cfg.prenoms;
    if (s.voteS === "fille" || s.voteS === "garcon") setVoteS(s.voteS);
    if (typeof s.voteP === "string" && ref.some((p) => p.id === s.voteP)) setVoteP(s.voteP);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { saveJeu({ prenoms, voteP, voteS }); }, [prenoms, voteP, voteS]);

  /* Vie ambiante optionnelle : déterministe, gated. Lit la liste courante via
     une ref → suit les éditions des parents sans réarmer l'intervalle. */
  useEffect(() => {
    if (!cfg.dripAmbiance || phase !== "paris") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let k = 0;
    const id = setInterval(() => {
      const file = prenomsRef.current.filter(nomOK);
      if (!file.length) return;
      const p = file[k % file.length]; k += 1;
      setDrip((d) => ({ ...d, [p.id]: (d[p.id] || 0) + 1 }));
      setToast(`${p.label} vient de parier`);
    }, 5200);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  /* À la révélation, on porte le focus sur le panneau ACTIF (visible), pas sur
     un nœud d'un panneau masqué (sinon le focus tombe sur <body>). */
  useEffect(() => {
    if (phase === "reveal") { const el = panelRefs.current[tab]; if (el) el.focus(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  /* Focus après ajout / retrait d'un prénom dans l'éditeur. */
  useEffect(() => {
    const t = pendingFocus.current;
    if (!t) return;
    pendingFocus.current = null;
    if (t === "__add__") { if (addBtnRef.current) addBtnRef.current.focus(); }
    else if (inputRefs.current[t]) inputRefs.current[t].focus();
  }, [prenoms]);

  const valides = prenoms.filter(nomOK);
  const canUnlock = !cfg.jeux.includes("prenom") || valides.length >= 2;

  const compteP = (p) => cfg.prenomParieurs(p.id).length + (voteP === p.id ? 1 : 0) + (drip[p.id] || 0);
  const compteS = (k) => cfg.parisSexe[k].length + (voteS === k ? 1 : 0) + (drip[k] || 0);
  const maxP = Math.max(1, ...valides.map(compteP));
  const maxS = Math.max(1, compteS("fille"), compteS("garcon"));

  const parierPrenom = (p) => {
    if (phase !== "paris") return;
    setVoteP(p.id);
    setLive(`Pari enregistré — vous misez sur ${p.label} (${compteMot(cfg.prenomParieurs(p.id).length + 1 + (drip[p.id] || 0))}).`);
  };
  const parierSexe = (k) => {
    if (phase !== "paris") return;
    setVoteS(k);
    setLive(`Pari enregistré — vous misez sur « ${cfg.labels[k]} » (${compteMot(cfg.parisSexe[k].length + 1 + (drip[k] || 0))}).`);
  };

  /* Libellé du gagnant : source unique = la liste courante (éditée), avec
     repli sur la config, pour que titre et option affichent le même prénom. */
  const gagnantLabel = (() => {
    const inList = prenoms.find((p) => p.id === cfg.prenomReel);
    if (inList && nomOK(inList)) return inList.label.trim();
    const inCfg = cfg.prenoms.find((p) => p.id === cfg.prenomReel);
    return inCfg && inCfg.label ? inCfg.label : null;
  })();

  const ouvrir = () => {
    if (!canUnlock) return;
    setPhase("reveal");
    setToast("");
    const parts = [];
    if (cfg.jeux.includes("prenom") && gagnantLabel) parts.push(`Le prénom est ${gagnantLabel}.`);
    if (cfg.jeux.includes("sexe")) parts.push(cfg.sexeReel === "garcon" ? "C'est un garçon." : "C'est une fille.");
    setAnnounce(parts.join(" ") + " Découvrez qui avait deviné juste.");
  };
  const revenir = () => { setPhase("paris"); setFired(false); setAnnounce(""); };

  /* Édition de la liste (parents). */
  const setLabel = (id, v) => setPrenoms((l) => l.map((p) => (p.id === id ? { ...p, label: v } : p)));
  const retirer = (id) => {
    const idx = prenoms.findIndex((p) => p.id === id);
    const rest = prenoms.filter((p) => p.id !== id);
    pendingFocus.current = rest.length ? ((rest[Math.max(0, idx - 1)] && rest[Math.max(0, idx - 1)].id) || "__add__") : "__add__";
    setPrenoms(rest);
  };
  useEffect(() => { if (voteP && !prenoms.some((p) => p.id === voteP)) setVoteP(null); }, [prenoms, voteP]);
  const ajouter = () => {
    const id = "p" + (uidRef.current += 1);
    pendingFocus.current = id;
    setPrenoms((l) => [...l, { id, label: "", parieurs: [] }]);
  };

  const goTab = (g) => { setTab(g); const b = tabRefs.current[g]; if (b) b.focus(); };
  const onTabKey = (e) => {
    if (cfg.jeux.length < 2) return;
    const i = cfg.jeux.indexOf(tab);
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const d = e.key === "ArrowRight" ? 1 : -1;
      goTab(cfg.jeux[(i + d + cfg.jeux.length) % cfg.jeux.length]);
    } else if (e.key === "Home") { e.preventDefault(); goTab(cfg.jeux[0]); }
    else if (e.key === "End") { e.preventDefault(); goTab(cfg.jeux[cfg.jeux.length - 1]); }
  };

  const gagnantsP = cfg.prenomReel ? cfg.prenomParieurs(cfg.prenomReel) : [];
  const gagnantsS = cfg.parisSexe[cfg.sexeReel] || [];

  const multi = cfg.jeux.length > 1;
  const panePrenom = tab === "prenom" && cfg.jeux.includes("prenom");
  const paneSexe = tab === "sexe" && cfg.jeux.includes("sexe");

  return (
    <section className="vt-section tint reveal" id="jeu" aria-labelledby="jeu-h2">
      <div className="vt-wrap" style={{ maxWidth: "760px" }}>
        <div className="vt-head">
          <span className="vt-eyebrow">Le jeu des paris</span>
          <div className="vt-flourish" />
          <h2 className="vt-h2" id="jeu-h2">Et vous, quel est votre pari&nbsp;?</h2>
          <p>Pendant toute la grossesse, vos proches parient&nbsp;: fille ou garçon, et quel prénom avez-vous choisi&nbsp;? Le jour&nbsp;J, la page dévoile la réponse — et célèbre celles et ceux qui avaient deviné juste.</p>
        </div>

        <div className="vt-jeu-card">
          <div className="vt-jeu-topline">
            <span className="vt-jeu-phase">
              <span className="dot" aria-hidden="true" />
              {phase === "paris" ? "La grossesse · les paris sont ouverts" : "Le jour J · la révélation"}
            </span>
            {phase === "paris" && <span className="vt-jeu-secret">Résultat gardé secret jusqu'au jour&nbsp;J</span>}
          </div>

          {cfg.jeux.length > 1 && (
            <div className="vt-jeu-tabs" role="tablist" aria-label="Choisir le jeu" onKeyDown={onTabKey}>
              {cfg.jeux.map((g) => (
                <button key={g} type="button" role="tab" id={`tab-${g}`} aria-controls={`pane-${g}`}
                  ref={(el) => { tabRefs.current[g] = el; }}
                  aria-selected={tab === g} tabIndex={tab === g ? 0 : -1} onClick={() => goTab(g)}>
                  {g === "prenom" ? "Devinez le prénom" : "Garçon ou fille ?"}
                </button>
              ))}
            </div>
          )}

          {/* — Jeu prénom — */}
          {cfg.jeux.includes("prenom") && (
            <div className="vt-jeu-panel" tabIndex={-1} ref={(el) => { panelRefs.current.prenom = el; }}
              {...(multi ? { role: "tabpanel", id: "pane-prenom", "aria-labelledby": "tab-prenom", hidden: !panePrenom } : {})}>
              <p className="vt-jeu-consigne">{phase === "paris" ? "Sur quel prénom pariez-vous ?" : "Le prénom choisi par les parents :"}</p>
              <div role="group" aria-label="Vos paris sur le prénom">
                {valides.map((p) => {
                  const n = compteP(p);
                  const win = phase === "reveal" && p.id === cfg.prenomReel;
                  const lose = phase === "reveal" && p.id !== cfg.prenomReel;
                  return (
                    <button key={p.id} type="button"
                      className={"vt-jeu-opt" + (voteP === p.id ? " mine" : "") + (win ? " win" : "") + (lose ? " lose" : "")}
                      aria-pressed={voteP === p.id} aria-disabled={phase === "reveal"} onClick={() => parierPrenom(p)}>
                      <span className="nom">{p.label}{win ? " ✓" : ""}</span>
                      <span className="compte">{compteMot(n)}</span>
                      <span className="vt-jeu-bar" aria-hidden="true"><span className="fill" style={{ width: `${Math.round((n / maxP) * 100)}%` }} /></span>
                    </button>
                  );
                })}
              </div>

              {phase === "paris" && (
                <>
                  <button type="button" className="vt-jeu-editlink" aria-expanded={editing} onClick={() => setEditing((v) => !v)}>
                    {I.sliders()} {editing ? "Terminé" : "Modifier la liste des prénoms"}
                  </button>
                  {editing && (
                    <div className="vt-jeu-edit">
                      <p className="vt-jeu-edit-note">C'est vous, les futurs parents, qui composez la liste. Ajoutez vos prénoms préférés&nbsp;: vos proches parieront parmi eux.</p>
                      {prenoms.map((p, i) => (
                        <div className="vt-jeu-edit-row" key={p.id}>
                          <label className="vt-sr-live" htmlFor={`pn-${p.id}`}>Prénom candidat n°{i + 1}</label>
                          <input id={`pn-${p.id}`} ref={(el) => { inputRefs.current[p.id] = el; }} value={p.label} placeholder="Ajouter un prénom…" onChange={(e) => setLabel(p.id, e.target.value)} />
                          <button type="button" className="vt-jeu-del" aria-label={`Retirer ${p.label || "ce prénom"}`} onClick={() => retirer(p.id)}>Retirer</button>
                        </div>
                      ))}
                      <div className="vt-jeu-edit-actions">
                        <button ref={addBtnRef} type="button" className="vt-jeu-editlink" onClick={ajouter}>{I.plus()} Ajouter un prénom</button>
                      </div>
                      <p className="vt-jeu-edit-note">Votre liste est enregistrée sur cet appareil.</p>
                    </div>
                  )}
                </>
              )}

              {phase === "reveal" && (
                <div className="vt-jeu-annonce">
                  <p className="titre-rev">
                    {gagnantLabel ? <>C'est <strong>{gagnantLabel}</strong>&nbsp;!</> : "Le prénom restait une surprise !"}
                  </p>
                  <p className="vt-jeu-annonce-h">Ils avaient deviné juste</p>
                  {gagnantsP.length || voteP === cfg.prenomReel ? (
                    <ul>
                      {voteP === cfg.prenomReel && cfg.prenomReel && <li className="moi">Vous 🎉</li>}
                      {gagnantsP.map((nom, i) => <li key={i}>{nom}</li>)}
                    </ul>
                  ) : <p className="vt-jeu-annonce-none">Personne n'avait deviné — la surprise était totale&nbsp;!</p>}
                  {voteP && (voteP === cfg.prenomReel
                    ? <p className="vt-jeu-annonce-you">Bravo — votre pari était le bon&nbsp;!</p>
                    : <p className="vt-jeu-annonce-you">Ce n'était pas votre pari, mais quelle belle surprise&nbsp;!</p>)}
                </div>
              )}
            </div>
          )}

          {/* — Jeu garçon / fille — */}
          {cfg.jeux.includes("sexe") && (
            <div className="vt-jeu-panel" tabIndex={-1} ref={(el) => { panelRefs.current.sexe = el; }}
              {...(multi ? { role: "tabpanel", id: "pane-sexe", "aria-labelledby": "tab-sexe", hidden: !paneSexe } : {})}>
              <p className="vt-jeu-consigne">{phase === "paris" ? "Fille ou garçon ? Faites votre pari." : "La réponse :"}</p>
              <div className="vt-jeu-sexe" role="group" aria-label="Votre pari sur le sexe">
                {["fille", "garcon"].map((k) => {
                  const n = compteS(k);
                  const win = phase === "reveal" && k === cfg.sexeReel;
                  const lose = phase === "reveal" && k !== cfg.sexeReel;
                  return (
                    <button key={k} type="button"
                      className={"vt-jeu-opt" + (voteS === k ? " mine" : "") + (win ? " win" : "") + (lose ? " lose" : "")}
                      aria-pressed={voteS === k} aria-disabled={phase === "reveal"} onClick={() => parierSexe(k)}>
                      <span className="nom">{cfg.labels[k]}{win ? " ✓" : ""}</span>
                      <span className="compte">{compteMot(n)}</span>
                      <span className="vt-jeu-bar" aria-hidden="true"><span className="fill" style={{ width: `${Math.round((n / maxS) * 100)}%` }} /></span>
                    </button>
                  );
                })}
              </div>

              {phase === "reveal" && (
                <>
                  {cfg.genderReveal ? (
                    <div className="vt-jeu-gr">
                      <canvas ref={canvasRef} className="vt-jeu-gr-canvas" aria-hidden="true" />
                      {fired ? (
                        <div>
                          <p className={"vt-jeu-gr-msg show"}>{cfg.ceremonie[cfg.sexeReel].titre}</p>
                          <p className="vt-jeu-gr-sub">{cfg.ceremonie[cfg.sexeReel].sous}</p>
                        </div>
                      ) : (
                        <button type="button" className="vt-jeu-unlock" onClick={() => setFired(true)}>
                          {I.spark()} Lancer la grande révélation
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="vt-jeu-gr-off">Module « grande révélation » désactivé — les parents peuvent l'activer à tout moment.</p>
                  )}

                  <div className="vt-jeu-annonce">
                    <p className="vt-jeu-annonce-h">Ils avaient parié juste</p>
                    {gagnantsS.length || voteS === cfg.sexeReel ? (
                      <ul>
                        {voteS === cfg.sexeReel && <li className="moi">Vous 🎉</li>}
                        {gagnantsS.map((nom, i) => <li key={i}>{nom}</li>)}
                      </ul>
                    ) : <p className="vt-jeu-annonce-none">Personne n'avait deviné — la surprise était totale&nbsp;!</p>}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Barre d'action */}
          <div className="vt-jeu-actions">
            {phase === "paris" ? (
              <>
                <button type="button" className="vt-jeu-unlock" onClick={ouvrir} disabled={!canUnlock}>
                  {I.spark()} C'est le jour J — ouvrir la révélation
                </button>
                {!canUnlock
                  ? <p className="vt-jeu-edit-note">Ajoutez au moins deux prénoms pour lancer les paris.</p>
                  : <p className="vt-jeu-hint">À réserver au moment où bébé paraît.</p>}
              </>
            ) : (
              <button type="button" className="vt-btn ghost" onClick={revenir}>Revenir aux paris</button>
            )}
          </div>

          {toast && <p className="vt-jeu-toast" aria-hidden="true">{toast}</p>}
          <p className="vt-jeu-demo">Démonstration&nbsp;: vos paris et votre liste restent sur cet appareil, rien n'est envoyé.</p>
          <noscript><p className="vt-jeu-demo">Aperçu interactif — activez le JavaScript pour parier et voir le décompte s'animer en direct.</p></noscript>

          <div className="vt-jeu-cta">
            <a className="vt-btn gold lg" href={DEMO}>Je veux ce jeu sur mon faire-part {I.arrow()}</a>
          </div>
        </div>

        {/* Régions live montées en permanence */}
        <div className="vt-sr-live" aria-live="polite">{live}</div>
        <div className="vt-sr-live" aria-live="assertive">{announce}</div>
      </div>
    </section>
  );
}
