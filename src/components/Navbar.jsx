import { useEffect, useState } from "react";
import { perfil } from "../data/portfolioData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="nav-inner">
        <div className="nav-logo">
          {perfil.inicial}
          <span style={{ WebkitTextFillColor: "var(--dorado)" }}>.</span>dev
        </div>
        <ul className="nav-links">
          <li><a href="#sobre">Sobre mí</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#proyectos">Proyectos</a></li>
          <li><a href="#habilidades">Habilidades</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="nav-cta">Contrátame →</a>
      </div>
    </nav>
  );
}
