import { useState } from "react";
import useFadeIn from "../hooks/useFadeIn";
import { contacto, opcionesServicioForm } from "../data/portfolioData";

const optionStyle = { background: "#1e293b" };

export default function Contacto() {
  const headerRef = useFadeIn();
  const itemsRef = useFadeIn();
  const formRef = useFadeIn();

  const [form, setForm] = useState({ nombre: "", email: "", servicio: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mensaje = encodeURIComponent(
      `Hola, soy ${form.nombre}.\nCorreo: ${form.email}\nServicio: ${form.servicio}\n\n${form.mensaje}`
    );
    window.open(`https://wa.me/${contacto.whatsappNumero}?text=${mensaje}`, "_blank");
    setEnviado(true);
  };

  return (
    <section className="contacto" id="contacto">
      <div className="container">
        <div className="fade-in" ref={headerRef}>
          <div className="s-tag">Trabajemos juntos</div>
          <h2 className="s-title">¿Tienes un proyecto?</h2>
          <p className="s-sub">Cuéntame tu idea y te envío una propuesta sin costo. Respondo en menos de 24 horas.</p>
        </div>
        <div className="contacto-grid">
          <div className="c-items fade-in" ref={itemsRef}>
            <div className="c-item">
              <div className="c-icon">📧</div>
              <div className="c-txt"><h4>Correo electrónico</h4><p>{contacto.email}</p></div>
            </div>
            <div className="c-item">
              <div className="c-icon">📱</div>
              <div className="c-txt"><h4>WhatsApp</h4><p>{contacto.whatsappDisplay}</p></div>
            </div>
            <div className="c-item">
              <div className="c-icon">🌍</div>
              <div className="c-txt"><h4>Ubicación</h4><p>{contacto.ubicacion}</p></div>
            </div>
            <div className="c-item">
              <div className="c-icon">💼</div>
              <div className="c-txt"><h4>Freelance en</h4><p>{contacto.freelanceEn}</p></div>
            </div>
            <div className="c-item">
              <div className="c-icon">⏱️</div>
              <div className="c-txt"><h4>Tiempo de respuesta</h4><p>{contacto.tiempoRespuesta}</p></div>
            </div>
          </div>
          <form className="c-form fade-in" ref={formRef} onSubmit={handleSubmit}>
            <div className="fg">
              <label>Tu nombre</label>
              <input
                type="text"
                name="nombre"
                placeholder="¿Cómo te llamas?"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="fg">
              <label>Correo electrónico</label>
              <input
                type="email"
                name="email"
                placeholder="tu@correo.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="fg">
              <label>Tipo de servicio</label>
              <select name="servicio" value={form.servicio} onChange={handleChange} required>
                <option value="" style={optionStyle}>Selecciona un servicio...</option>
                {opcionesServicioForm.map((op) => (
                  <option key={op} style={optionStyle}>{op}</option>
                ))}
              </select>
            </div>
            <div className="fg">
              <label>Cuéntame más</label>
              <textarea
                name="mensaje"
                placeholder="Describe tu proyecto o necesidad..."
                value={form.mensaje}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn-send"
              style={enviado ? { background: "linear-gradient(135deg,#166534,#15803d)" } : undefined}
            >
              {enviado ? "✅ ¡Enviado! Te contactaré pronto" : "Enviar mensaje →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
