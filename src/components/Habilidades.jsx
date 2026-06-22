import useFadeIn from "../hooks/useFadeIn";
import { habilidades } from "../data/portfolioData";

function GrupoHabilidades({ grupo }) {
  const ref = useFadeIn();
  return (
    <div className="fade-in" ref={ref}>
      <h3>{grupo.titulo}</h3>
      {grupo.items.map((item) => (
        <div className="hab-item" key={item.nombre}>
          <div className="hab-head">
            <span>{item.nombre}</span>
            <span>{item.porcentaje}%</span>
          </div>
          <div className="barra-bg">
            <div className="barra-fill" data-w={item.porcentaje}></div>
          </div>
        </div>
      ))}
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
          <p className="s-sub">Tecnologías con las que trabajo de forma profesional y continua.</p>
        </div>
        <div className="hab-grid">
          <GrupoHabilidades grupo={habilidades.desarrollo} />
          <GrupoHabilidades grupo={habilidades.soporte} />
        </div>
      </div>
    </section>
  );
}
