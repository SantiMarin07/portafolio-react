// =======================================================
// TODOS LOS DATOS DEL PORTAFOLIO VIVEN AQUÍ.
// Edita este archivo para cambiar textos, proyectos, skills, contacto, etc.
// No necesitas tocar los componentes para actualizar contenido.
// =======================================================

export const perfil = {
  nombre: "Santiago Marín",
  inicial: "SM",
  rolCorto: "Vitrinas 3D y páginas web para negocios",
  rolCard: "smdevc · Web y 3D · Bogotá",
  ubicacion: "Bogotá",
  disponible: true,
  tiempoRespuesta: "24 h",
  avatarEmoji: "👨‍💻",
};

export const hero = {
  lineas: ["Vitrinas 3D", "y páginas web", "para tu negocio"],
  descripcion:
    "Pongo tus productos en 3D para que tus clientes los giren desde el celular y te pidan por WhatsApp. También hago páginas web en React y soporte TI.",
  botonPrincipal: { texto: "Ver vitrinas 3D →", href: "/vitrinas/" },
};

export const heroStats = [
  { num: "$150k", lbl: "Vitrina 3D desde" },
  { num: "24 h", lbl: "Para responderte" },
];

export const heroCardTags = ["Three.js", "React", "Blender", "WhatsApp"];

export const heroCardStats = [
  { sn: "3D", sl: "Vitrinas" },
  { sn: "Web", sl: "React" },
  { sn: "TI", sl: "Soporte" },
];

export const sobreMi = {
  parrafos: [
    "Soy desarrollador web, trabajo como analista de mesa de ayuda y estudio ingeniería en la Universidad de Cundinamarca. Bajo la marca smdevc hago vitrinas 3D y páginas web para negocios que venden por redes y WhatsApp.",
    "Me encargo de todo: fotos y modelos 3D en Blender, la página en React o Three.js, y el link listo para compartir. Trabajo presencial en Bogotá y remoto en todo Colombia.",
  ],
  chips: [
    "React",
    "Three.js",
    "Blender",
    "JavaScript",
    "HTML/CSS",
    "Node.js",
    "MySQL",
    "Java / Android",
    "Soporte TI",
  ],
  infoCards: [
    {
      icono: "🎓",
      color: "blue",
      titulo: "Universidad de Cundinamarca",
      texto: "Ingeniería · Enfoque en software y sistemas",
    },
    {
      icono: "💼",
      color: "gold",
      titulo: "Mesa de Ayuda TI",
      texto: "Experiencia laboral real en soporte técnico",
    },
    {
      icono: "🧊",
      color: "green",
      titulo: "Vitrinas 3D · smdevc",
      texto: "Productos en 3D para vender por WhatsApp",
    },
    {
      icono: "🌐",
      color: "purple",
      titulo: "Desarrollo Web",
      texto: "React.js, HTML/CSS, Node.js, bases de datos",
    },
  ],
};

export const servicios = [
  {
    id: "s1",
    numero: "01 · 3D",
    icono: "🧊",
    titulo: "Vitrinas 3D",
    descripcion:
      "Tus productos en 3D que el cliente gira con el dedo desde el celular, con tu marca y pedidos directo a tu WhatsApp.",
    items: [
      "Productos en 3D con tu logo y colores",
      "Botón de pedido por WhatsApp",
      "Link para compartir en redes y Estados",
      "Opción con video publicitario y campaña de Meta",
    ],
    precio: "Desde $150.000 COP",
    enlace: { texto: "Ver vitrinas y paquetes", href: "/vitrinas/" },
  },
  {
    id: "s2",
    numero: "02 · WEB",
    icono: "🌐",
    titulo: "Desarrollo Web",
    descripcion:
      "Landing pages y sitios para negocios con React, publicados y listos para compartir.",
    items: [
      "Landing pages y portafolios",
      "Sistemas de gestión (CRUD)",
      "Dashboard con estadísticas",
      "Diseño responsivo",
    ],
    precio: "Desde $120.000 COP",
  },
  {
    id: "s3",
    numero: "03 · IT",
    icono: "🛠️",
    titulo: "Soporte Técnico",
    descripcion:
      "Mesa de ayuda y soporte TI para empresas y personas, de forma remota o presencial en Bogotá.",
    items: [
      "Diagnóstico y reparación de equipos",
      "Configuración de redes",
      "Soporte remoto vía TeamViewer",
      "Mantenimiento preventivo",
    ],
    precio: "Desde $40.000 COP/hora",
  },
];

export const proyectos = [
  {
    id: "p-vitrinas",
    headerClase: "ph-web",
    icono: "🧊",
    titulo: "Vitrinas 3D",
    subtitulo: "Página de venta en 3D · Three.js · En vivo",
    descripcion:
      "Página para vender productos en 3D: el cliente los gira desde el celular, ve la galería de fotos y pide por WhatsApp. Incluye ejemplos de cosméticos, motos y construcción.",
    tecnologias: ["Three.js", "Blender", "HTML", "CSS"],
    captura: "/vitrinas/og-vitrinas.jpg",
    enlace: { texto: "Ver demo en vivo", href: "/vitrinas/" },
  },
  {
    id: "p-garaje3d",
    headerClase: "ph-garaje",
    icono: "🏍️",
    titulo: "Garaje 3D",
    subtitulo: "Configurador 3D de motos · React · Three.js · En desarrollo",
    descripcion:
      "Visor 3D para personalizar motos en el navegador: pintura por zonas, diseños, piezas y accesorios, y revisión tipo tecnomecánica. La moto que se ve es un modelo de prueba sin marcas ni logos reales; los modelos realistas vendrán de escaneos propios.",
    tecnologias: ["React", "Three.js", "Vite", "Blender", "Node.js"],
    captura: "/proyectos/garaje-3d.png",
    enlace: { texto: "Ver código en GitHub", href: "https://github.com/SantiMarin07/garaje-3d" },
  },
  {
    id: "p1",
    headerClase: "ph-android",
    icono: "📱",
    titulo: "GestiónEquipos UC",
    subtitulo: "Web y Android · React · Java · MySQL · Universidad de Cundinamarca",
    descripcion:
      "Sistema de préstamo de equipos de la universidad, con roles de admin y estudiante, inventario, devoluciones e historial. Primero lo hice en React y luego como app Android.",
    tecnologias: ["React", "Android Studio", "Java", "MySQL"],
  },
  {
    id: "p3",
    headerClase: "ph-it",
    icono: "🛠️",
    titulo: "Soporte TI Corporativo",
    subtitulo: "Help Desk · Redes · Infraestructura",
    descripcion:
      "Experiencia profesional gestionando incidencias de TI, instalación y configuración de equipos, redes LAN y soporte a usuarios en entorno corporativo.",
    tecnologias: ["Help Desk", "Redes LAN", "Windows Server", "Active Directory"],
  },
  {
    id: "p4",
    headerClase: "ph-next",
    icono: "🚀",
    titulo: "¿Tu proyecto aquí?",
    subtitulo: "Vitrinas 3D · Web · Soporte TI",
    descripcion:
      "¿Vendes por redes o WhatsApp y quieres mostrar mejor tus productos? Cuéntame qué necesitas y te envío una propuesta sin costo.",
    tecnologias: ["Tu negocio aquí", "3D", "Web"],
  },
];

export const habilidades = {
  desarrollo: {
    titulo: "💻 Web y 3D",
    items: ["React", "JavaScript", "HTML / CSS", "Three.js", "Blender", "Node.js", "MySQL", "Java / Android Studio", "Git", "Vercel"],
  },
  soporte: {
    titulo: "🛠️ Soporte TI",
    items: ["Mesa de ayuda", "Soporte remoto", "Windows / Linux", "Redes LAN", "Active Directory"],
  },
};

export const contacto = {
  email: "marinsantiago696@gmail.com",
  whatsappNumero: "573228490294", // formato internacional sin "+" para el link wa.me
  whatsappDisplay: "+57 322 849 0294",
  ubicacion: "Colombia · Trabajo remoto ✓",
  freelanceEn: "Workana · Fiverr · Contacto directo",
  tiempoRespuesta: "Menos de 24 horas hábiles",
  github: "https://github.com/SantiMarin07",
  linkedin: "https://www.linkedin.com/in/santiago-marin-/",
};

export const opcionesServicioForm = [
  "🧊 Vitrina 3D",
  "🌐 Página web",
  "🛠️ Soporte Técnico TI",
  "🔧 Otro",
];
