import { I, Ornement } from "./shared.jsx";
import photoGrossesse from "../assets/naissance-grossesse.webp";
import photoEnfant from "../assets/bapteme-enfant.webp";
import photoAnniv from "../assets/anniversaire-fete.webp";
import photoFiancailles from "../assets/fiancailles-couple.webp";
import photoPro from "../assets/professionnel-soiree.webp";

/* ============================================================
   Aperçu animé partagé : mockup téléphone d'un faire-part
   « vivant » (photo + compte à rebours + secret + CTA). Utilisé
   par la page événement générique ET par les pages locales
   (événement × ville), pour ne dupliquer aucun rendu.
   Sûr côté SSR : aucun accès navigateur.
   ============================================================ */

/* Photo d'aperçu dans le mockup, par événement. */
export const EVENT_PHOTOS = {
  naissance: { src: photoGrossesse, alt: "Future maman, les mains posées sur son ventre" },
  bapteme: { src: photoEnfant, alt: "Bébé en tenue de baptême" },
  anniversaire: { src: photoAnniv, alt: "Gâteau d'anniversaire et bougies allumées, ambiance chaleureuse" },
  fiancailles: { src: photoFiancailles, alt: "Couple de fiancés, bague de fiançailles à la main" },
  professionnel: { src: photoPro, alt: "Coupes de champagne levées et confettis dorés lors d'une soirée" },
};

export function EventDevice({ card, photo }) {
  if (!card) return null;
  return (
    <div className="vt-phone-wrap vt-evd">
      <div className="vt-phone">
        <div className="vt-screen">
          <div className="sc-top"><span className="cpl">{card.soustitre}</span><span className="bg"><i /><i /><i /></span></div>
          <span className="sc-live">{card.live}</span>
          <div className="sc-media">
            {photo ? <img src={photo.src} width="700" height="1050" decoding="async" fetchpriority="high" alt={photo.alt} /> : <div className="fallback" />}
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
