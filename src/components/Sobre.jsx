import useFadeIn from "../hooks/useFadeIn";
import { sobreMi } from "../data/portfolioData";

export default function Sobre() {
  const leftRef = useFadeIn();
  const rightRef = useFadeIn();

  return (
    <section className="sobre" id="sobre">
      <div className="container">
        <div className="sobre-grid">
          <div className="sobre-left fade-in" ref={leftRef}>
            <div className="s-tag">Sobre mí</div>
            <h2 className="s-title">Tecnología que resuelve<br />problemas reales</h2>
            {sobreMi.parrafos.map((p, i) => (
              <p className="sobre-p" key={i}>{p}</p>
            ))}
            <div className="skill-chips">
              {sobreMi.chips.map((chip) => (
                <span className="chip" key={chip}>{chip}</span>
              ))}
            </div>
          </div>
          <div className="sobre-right fade-in" ref={rightRef}>
            {sobreMi.infoCards.map((card) => (
              <div className="info-card" key={card.titulo}>
                <div className={`ic-icon ${card.color}`}>{card.icono}</div>
                <div className="ic-txt">
                  <h4>{card.titulo}</h4>
                  <p>{card.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
