import useFadeIn from "../hooks/useFadeIn";
import { habilidades } from "../data/portfolioData";

function GrupoHabilidades({ grupo }) {
  const ref = useFadeIn();
  return (
    <div className="fade-in" ref={ref}>
      <h3>{grupo.titulo}</h3>
      <div className="skill-chips">
        {grupo.items.map((item) => (
          <span className="chip" key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export default function Habilidades() {
  const headerRef = useFadeIn();

  return (
    <section className="habilidades" id="habilidades">
      <div className="container">
        <div className="fade-in" ref={headerRef}>
          <div className="s-tag">Conocimientos</div>
          <h2 className="s-title">Habilidades técnicas</h2>
          <p className="s-sub">Lo que uso en mis proyectos y en mi trabajo de soporte.</p>
        </div>
        <div className="hab-grid">
          <GrupoHabilidades grupo={habilidades.desarrollo} />
          <GrupoHabilidades grupo={habilidades.soporte} />
        </div>
      </div>
    </section>
  );
}
