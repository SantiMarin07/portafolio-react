// =======================================================
// TODOS LOS DATOS DEL PORTAFOLIO VIVEN AQUÍ.
// Edita este archivo para cambiar textos, proyectos, skills, contacto, etc.
// No necesitas tocar los componentes para actualizar contenido.
// =======================================================

export const perfil = {
  nombre: "Santiago Marín",
  inicial: "SM",
  rolCorto: "Desarrollador Android & Web + IT Specialist",
  rolCard: "Full Stack Dev & IT Specialist · Cundinamarca",
  ubicacion: "Colombia",
  disponible: true,
  tiempoRespuesta: "< 24 h",
  avatarEmoji: "👨‍💻",
};

export const heroStats = [
  { num: "2+", lbl: "Años exp." },
  { num: "10+", lbl: "Proyectos" },
  { num: "3", lbl: "Servicios" },
  { num: "100%", lbl: "Compromiso" },
];

export const heroCardTags = ["Android Studio", "React.js", "MySQL", "Help Desk"];

export const heroCardStats = [
  { sn: "Java", sl: "Principal" },
  { sn: "React", sl: "Frontend" },
  { sn: "TI", sl: "Soporte" },
];

export const sobreMi = {
  parrafos: [
    "Soy técnico de mesa de ayuda con experiencia laboral real y estudiante de ingeniería en la Universidad de Cundinamarca. Me especializo en desarrollo Android con Java, aplicaciones web con React y soporte TI profesional.",
    "Busco proyectos donde pueda aportar desde el análisis hasta la entrega final, con comunicación clara y resultados concretos. Trabajo de forma remota y presencial en Colombia.",
  ],
  chips: [
    "Android Studio",
    "Java",
    "React.js",
    "MySQL",
    "Node.js",
    "HTML/CSS",
    "Redes LAN",
    "Help Desk",
    "Windows Server",
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
      icono: "📱",
      color: "green",
      titulo: "Desarrollo Android",
      texto: "Apps con Java, MySQL y APIs REST",
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
    numero: "01 · ANDROID",
    icono: "📱",
    titulo: "Apps Android",
    descripcion:
      "Aplicaciones nativas para Android con Java en Android Studio, conectadas a MySQL y APIs REST.",
    items: [
      "Apps empresariales y educativas",
      "Integración con base de datos",
      "Diseño Material Design",
      "Panel de administración web",
    ],
    precio: "Desde $150.000 COP",
  },
  {
    id: "s2",
    numero: "02 · WEB",
    icono: "🌐",
    titulo: "Desarrollo Web",
    descripcion:
      "Sitios web y sistemas de gestión modernos con React.js, backend Node.js y MySQL.",
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
      "Mesa de ayuda y soporte TI para empresas y personas, de forma remota o presencial en Cundinamarca.",
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
    id: "p1",
    headerClase: "ph-android",
    icono: "📱",
    titulo: "GestiónEquipos UC",
    subtitulo: "App Android · Java · MySQL · Universidad de Cundinamarca",
    descripcion:
      "Sistema completo de gestión de préstamos de equipos tecnológicos universitarios. Roles de admin y estudiante, inventario, devoluciones e historial.",
    tecnologias: ["Android Studio", "Java", "MySQL", "Volley", "Material Design"],
  },
  {
    id: "p2",
    headerClase: "ph-web",
    icono: "🌐",
    titulo: "Sistema Web Híbrido",
    subtitulo: "Plataforma web · React.js · MySQL · Node.js",
    descripcion:
      "Aplicación web responsive con dashboard de estadísticas, gestión de inventario, módulo de préstamos y control de devoluciones en tiempo real.",
    tecnologias: ["React.js", "MySQL", "Node.js", "REST API", "CSS3"],
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
    subtitulo: "Android · Web · Soporte TI · 2026",
    descripcion:
      "¿Tienes una idea que quieres convertir en realidad? Desde MVPs rápidos hasta sistemas completos. Cuéntame y te envío una propuesta sin costo.",
    tecnologias: ["Tu idea aquí", "Android", "Web", "IT"],
  },
];

export const habilidades = {
  desarrollo: {
    titulo: "💻 Desarrollo de Software",
    items: [
      { nombre: "Java / Android Studio", porcentaje: 80 },
      { nombre: "HTML / CSS", porcentaje: 85 },
      { nombre: "React.js", porcentaje: 70 },
      { nombre: "MySQL", porcentaje: 75 },
      { nombre: "Node.js", porcentaje: 60 },
    ],
  },
  soporte: {
    titulo: "🛠️ Soporte & Infraestructura",
    items: [
      { nombre: "Help Desk / Mesa de Ayuda", porcentaje: 90 },
      { nombre: "Windows / Linux", porcentaje: 80 },
      { nombre: "Redes LAN/WAN", porcentaje: 70 },
      { nombre: "Soporte remoto", porcentaje: 85 },
      { nombre: "Active Directory", porcentaje: 65 },
    ],
  },
};

export const contacto = {
  email: "marinsantiago696@gmail.com",
  whatsappNumero: "573209854151", // formato internacional sin "+" para el link wa.me
  whatsappDisplay: "+57 320 985 4151",
  ubicacion: "Colombia · Trabajo remoto ✓",
  freelanceEn: "Workana · Fiverr · Contacto directo",
  tiempoRespuesta: "Menos de 24 horas hábiles",
  github: "https://github.com/SantiMarin07",
  linkedin: "https://www.linkedin.com/in/santiago-marin-/",
};

export const opcionesServicioForm = [
  "📱 App Android",
  "🌐 Sitio / Sistema Web",
  "🛠️ Soporte Técnico TI",
  "🔧 Otro",
];
