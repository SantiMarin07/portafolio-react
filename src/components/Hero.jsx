import { Fragment } from "react";
import useFadeIn from "../hooks/useFadeIn";
import { perfil, heroStats, heroCardTags, heroCardStats } from "../data/portfolioData";

export default function Hero() {
  const cardRef = useFadeIn();

  return (
    <section className="hero" id="inicio">
      <div className="hero-bg"></div>
      <div className="grid-overlay"></div>
      <div className="hero-inner">
        <div className="hero-text">
          <div className="hero-eyebrow">
            <span className="status-dot"></span>
            Disponible para proyectos freelance · {perfil.ubicacion} 🇨🇴
          </div>
          <h1>
            <span className="line1">Desarrollador</span><br />
            <span className="line2">Android & Web</span><br />
            <span className="line3">+ IT Specialist</span>
          </h1>
          <p className="hero-desc">
            Construyo aplicaciones móviles, soluciones web y brindo soporte técnico
            profesional. Transformo ideas en productos digitales funcionales y bien diseñados.
          </p>
          <div className="hero-btns">
            <a href="#proyectos" className="btn-glow">Ver proyectos →</a>
            <a href="#contacto" className="btn-ghost">Contáctame</a>
          </div>
          <div className="hero-stats">
            {heroStats.map((stat, i) => (
              <Fragment key={stat.lbl}>
                {i > 0 && <div className="hero-stat-div"></div>}
                <div className="hero-stat">
                  <div className="num">{stat.num}</div>
                  <div className="lbl">{stat.lbl}</div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="hero-visual-wrap">
          <div className="hero-card fade-in" ref={cardRef}>
            <div className="hc-top">
              <div className="hc-avatar">{perfil.avatarEmoji}</div>
              <div className="hc-name">{perfil.nombre}</div>
              <div className="hc-role">{perfil.rolCard}</div>
              <div className="hc-tags">
                {heroCardTags.map((tag) => (
                  <span className="hc-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="hc-stats">
              {heroCardStats.map((s) => (
                <div className="hc-stat" key={s.sn}>
                  <div className="sn">{s.sn}</div>
                  <div className="sl">{s.sl}</div>
                </div>
              ))}
            </div>
            <div className="hc-bottom">
              <span className="avail-dot"></span>
              <span className="avail-txt">
                <strong>Disponible</strong> · Responde en &lt; {perfil.tiempoRespuesta}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
