import useFadeIn from "../hooks/useFadeIn";
import { proyectos } from "../data/portfolioData";

function ProyectoCard({ proyecto }) {
  const ref = useFadeIn();
  return (
    <div className="proy-card fade-in" ref={ref}>
      <div className={`proy-header ${proyecto.headerClase}`}>
        <div className="proy-icon">{proyecto.icono}</div>
        <h3>{proyecto.titulo}</h3>
        <p>{proyecto.subtitulo}</p>
      </div>
      <div className="proy-body">
        <p className="proy-desc">{proyecto.descripcion}</p>
        <div className="tech-row">
          {proyecto.tecnologias.map((tech) => (
            <span className="t-tag" key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Proyectos() {
  const headerRef = useFadeIn();

  return (
    <section className="proyectos" id="proyectos">
      <div className="container">
        <div className="fade-in" ref={headerRef}>
          <div className="s-tag">Portafolio</div>
          <h2 className="s-title">Proyectos destacados</h2>
          <p className="s-sub">Sistemas y aplicaciones que he desarrollado desde cero.</p>
        </div>
        <div className="proy-grid">
          {proyectos.map((proyecto) => (
            <ProyectoCard proyecto={proyecto} key={proyecto.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
