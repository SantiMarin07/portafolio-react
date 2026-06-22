import { contacto } from "../data/portfolioData";

export default function Footer() {
  const anio = new Date().getFullYear();
  return (
    <footer>
      <div className="footer-logo">Portafolio</div>
      {(contacto.github || contacto.linkedin) && (
        <div className="footer-social">
          {contacto.github && (
            <a href={contacto.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          )}
          {contacto.linkedin && (
            <a href={contacto.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          )}
        </div>
      )}
      <p style={{ marginTop: 6 }}>
        Hecho con dedicación en <span>Colombia</span> · {anio}
      </p>
    </footer>
  );
}
