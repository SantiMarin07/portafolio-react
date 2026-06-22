import useFadeIn from "../hooks/useFadeIn";
import { servicios } from "../data/portfolioData";

function ServicioCard({ servicio }) {
  const ref = useFadeIn();
  return (
    <div className={`serv-card ${servicio.id} fade-in`} ref={ref}>
      <div className="serv-num">{servicio.numero}</div>
      <div className="serv-icon">{servicio.icono}</div>
      <h3>{servicio.titulo}</h3>
      <p>{servicio.descripcion}</p>
      <ul className="serv-list">
        {servicio.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="precio">{servicio.precio}</div>
    </div>
  );
}

export default function Servicios() {
  const headerRef = useFadeIn();

  return (
    <section className="servicios" id="servicios">
      <div className="container">
        <div className="fade-in" ref={headerRef}>
          <div className="s-tag">¿Qué ofrezco?</div>
          <h2 className="s-title">Servicios profesionales</h2>
          <p className="s-sub">Soluciones adaptadas a tu presupuesto con calidad profesional. Sin letra pequeña.</p>
        </div>
        <div className="serv-grid">
          {servicios.map((servicio) => (
            <ServicioCard servicio={servicio} key={servicio.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
