import {
  SkillCategory,
  SKILL_PROFICIENCY,
  ExperienceType,
  type UserProfile,
  type Skill,
  type ExperienceItem,
  type Project,
  type ProjectTag,
} from "@/types/portfolio";

export const profile: UserProfile = {
  id: "user_01",
  firstName: "Ariel",
  lastName: "Díaz Naso",
  title: "Desarrollador Web Full Stack | Node.js, Express & MySQL",
  tagline:
    "Desarrollo de aplicaciones web interactivas, APIs RESTful y arquitecturas de servidor con persistencia en bases de datos.",
  bio: "Estudiante y desarrollador web enfocado en el stack JavaScript / Node.js. Con experiencia en la construcción de servidores HTTP modulares, desarrollo de APIs REST bajo arquitectura MVC, persistencia relacional en MySQL y desarrollo de interfaces modernas en React.",
  avatarUrl:
    "https://images.unsplash.com/photo-1534972195531-a756b1140f6c?w=400&q=80&auto=format&fit=crop",
  email: "ariel.diaz.dev@gmail.com",
  phone: "+54 9 11 0000-0000",
  location: "Buenos Aires, Argentina",
  resumeUrl: "/cv-ariel-diaz.pdf",
  socials: [
    {
      id: "social_01",
      platform: "GitHub",
      url: "https://github.com/ArielDiazNaso/taller",
      iconKey: "github",
    },
    {
      id: "social_02",
      platform: "LinkedIn",
      url: "https://linkedin.com/in/arieldiaznaso",
      iconKey: "linkedin",
    },
  ],
  highlights: [
    "Servidores y APIs con Node.js, Express y persistencia en MySQL",
    "Arquitectura MVC (Controladores, Rutas y Modelos de datos)",
    "Interfaces Single Page Application con React y animaciones",
    "Persistencia de datos y consumo de APIs RESTful asíncronas",
  ],
};

export const skills: readonly Skill[] = [
  // Backend
  {
    id: "skill_01",
    name: "Node.js",
    category: SkillCategory.BACKEND,
    proficiency: SKILL_PROFICIENCY.EXPERT,
    iconKey: "server",
    yearsOfExperience: 3,
  },
  {
    id: "skill_02",
    name: "Express.js",
    category: SkillCategory.BACKEND,
    proficiency: SKILL_PROFICIENCY.EXPERT,
    iconKey: "hexagon",
    yearsOfExperience: 3,
  },
  {
    id: "skill_03",
    name: "APIs RESTful / MVC",
    category: SkillCategory.BACKEND,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "cloud",
    yearsOfExperience: 3,
  },
  {
    id: "skill_04",
    name: "HTTP / Server-Side",
    category: SkillCategory.BACKEND,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "workflow",
    yearsOfExperience: 2,
  },
  // Database
  {
    id: "skill_05",
    name: "MySQL",
    category: SkillCategory.DATABASE,
    proficiency: SKILL_PROFICIENCY.EXPERT,
    iconKey: "database",
    yearsOfExperience: 3,
  },
  {
    id: "skill_06",
    name: "PostgreSQL / Supabase",
    category: SkillCategory.DATABASE,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "hard-drive",
    yearsOfExperience: 2,
  },
  {
    id: "skill_07",
    name: "Modelado y Consultas SQL",
    category: SkillCategory.DATABASE,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "leaf",
    yearsOfExperience: 3,
  },
  // Frontend
  {
    id: "skill_08",
    name: "JavaScript (ES6+)",
    category: SkillCategory.FRONTEND,
    proficiency: SKILL_PROFICIENCY.EXPERT,
    iconKey: "sparkles",
    yearsOfExperience: 3,
  },
  {
    id: "skill_09",
    name: "React",
    category: SkillCategory.FRONTEND,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "atom",
    yearsOfExperience: 2,
  },
  {
    id: "skill_10",
    name: "TypeScript",
    category: SkillCategory.FRONTEND,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "shapes",
    yearsOfExperience: 2,
  },
  {
    id: "skill_11",
    name: "HTML5 & CSS3 / DOM",
    category: SkillCategory.FRONTEND,
    proficiency: SKILL_PROFICIENCY.EXPERT,
    iconKey: "palette",
    yearsOfExperience: 3,
  },
  {
    id: "skill_12",
    name: "Tailwind CSS",
    category: SkillCategory.FRONTEND,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "layout-dashboard",
    yearsOfExperience: 2,
  },
  // Tools
  {
    id: "skill_13",
    name: "Git & GitHub",
    category: SkillCategory.TOOLS,
    proficiency: SKILL_PROFICIENCY.EXPERT,
    iconKey: "git-branch-plus",
    yearsOfExperience: 3,
  },
  {
    id: "skill_14",
    name: "Vite",
    category: SkillCategory.TOOLS,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "git-merge",
    yearsOfExperience: 2,
  },
  {
    id: "skill_15",
    name: "Postman / Testing de APIs",
    category: SkillCategory.TOOLS,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "workflow",
    yearsOfExperience: 2,
  },
];

export const experience: readonly ExperienceItem[] = [
  {
    id: "exp_01",
    title: "Taller de Programación y Desarrollo de Software",
    institution: "Carrera de Sistemas / Taller",
    type: ExperienceType.WORK,
    startDate: "2023-03-01",
    endDate: null,
    location: "Buenos Aires, Argentina",
    description:
      "Desarrollo integral de proyectos prácticos con Node.js, Express, base de datos relacional MySQL y frontend interactivo.",
    bulletPoints: [
      "Implementación de APIs REST con arquitectura MVC (Controladores, Rutas y base de datos)",
      "Persistencia de datos en MySQL y gestión de reportes de texto en el servidor",
      "Construcción de aplicaciones interactivas con manejo de estados y sesiones",
    ],
    order: 1,
    relatedSkillsIds: ["skill_01", "skill_02", "skill_03", "skill_05"],
  },
  {
    id: "exp_02",
    title: "Carrera de Programación y Sistemas",
    institution: "Educación Superior",
    type: ExperienceType.EDUCATION,
    startDate: "2022-03-15",
    endDate: null,
    location: "Buenos Aires, Argentina",
    description:
      "Formación académica en algoritmia, estructuras de datos, desarrollo backend y modelado de bases de datos relacionales.",
    bulletPoints: [
      "Desarrollo de proyectos modulares en Node.js, arquitectura cliente-servidor y SQL",
      "Resolución de ejercicios prácticos de lógica, asincronía y control de flujo",
    ],
    order: 2,
    relatedSkillsIds: ["skill_01", "skill_05", "skill_07", "skill_08"],
  },
  {
    id: "exp_03",
    title: "Despliegue y Publicación de Aplicaciones Web",
    institution: "Hosting Cloud & BBDD",
    type: ExperienceType.ACHIEVEMENT,
    startDate: "2024-06-01",
    endDate: "2024-06-01",
    location: "Vercel / Supabase",
    description:
      "Puesta en producción de Single Page Applications con persistencia de base de datos en la nube y despliegue continuo.",
    bulletPoints: [
      "Integración de base de datos relacional PostgreSQL/Supabase en host web",
      "Optimización de tiempos de carga y diseño adaptado a dispositivos móviles",
    ],
    order: 3,
    relatedSkillsIds: ["skill_06", "skill_09", "skill_13"],
  },
];

export const projectTags: readonly ProjectTag[] = [
  { id: "tag_node", name: "Node.js", color: "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300" },
  { id: "tag_express", name: "Express", color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" },
  { id: "tag_mysql", name: "MySQL / BBDD", color: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300" },
  { id: "tag_api", name: "REST API", color: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300" },
  { id: "tag_mvc", name: "MVC", color: "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300" },
  { id: "tag_js", name: "JavaScript", color: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300" },
  { id: "tag_ssr", name: "HTTP / SSR", color: "bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300" },
  { id: "tag_fs", name: "Filesystem / I/O", color: "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300" },
  { id: "tag_dom", name: "DOM / Eventos", color: "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300" },
];

export const projects: readonly Project[] = [
  {
    id: "proj_01",
    title: "Hangman Score App — Juego de Ahorcado con MySQL",
    shortDescription:
      "Juego interactivo del Ahorcado con servidor Express, control de turnos y persistencia de puntuaciones en base de datos MySQL.",
    longDescription:
      "Aplicación interactiva del taller de programación (2_JS/JS6). Implementa la lógica del juego del Ahorcado en el frontend, conectada a un servidor Express que gestiona el registro de jugadores, cálculo de puntajes y persistencia en una base de datos MySQL relacional.",
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&q=80&auto=format&fit=crop",
    demoUrl: null,
    repoUrl: "https://github.com/ArielDiazNaso/taller/tree/PDeISC/2_JS/JS6",
    featured: true,
    order: 1,
    startDate: "2024-04-01",
    endDate: "2024-06-15",
    tagIds: ["tag_node", "tag_express", "tag_mysql", "tag_js"],
    screenshots: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200",
    ],
  },
  {
    id: "proj_02",
    title: "API REST — Gestión y Calificaciones de Alumnos",
    shortDescription:
      "API RESTful estructurada bajo arquitectura MVC para operaciones CRUD completas sobre registros de alumnos con base de datos MySQL.",
    longDescription:
      "Backend desarrollado para el taller (2_JS/JS5) implementando el patrón Modelo-Vista-Controlador (MVC). Permite altas, bajas, modificaciones y consultas (CRUD) de alumnos y calificaciones con MySQL. Incluye inicializador de base de datos, enrutamiento modular y middleware CORS.",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80&auto=format&fit=crop",
    demoUrl: null,
    repoUrl: "https://github.com/ArielDiazNaso/taller/tree/PDeISC/2_JS/JS5",
    featured: true,
    order: 2,
    startDate: "2024-03-10",
    endDate: "2024-05-20",
    tagIds: ["tag_node", "tag_express", "tag_mysql", "tag_api", "tag_mvc"],
    screenshots: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200",
    ],
  },
  {
    id: "proj_03",
    title: "Telefe Clima — Dashboard Meteorológico SSR",
    shortDescription:
      "Servidor HTTP modular en Node.js con Server-Side Rendering (SSR), enrutamiento, módulos de clima/UV y servicio de assets estáticos.",
    longDescription:
      "Proyecto de servidor web meteorológico (1_NodeJS/NJS2). Desarrollado con arquitectura modular: utilidades meteorológicas, módulo de tiempo, cálculo de índice UV, renderizado dinámico en servidor y gestión de archivos estáticos (CSS y recursos visuales).",
    imageUrl:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=900&q=80&auto=format&fit=crop",
    demoUrl: null,
    repoUrl: "https://github.com/ArielDiazNaso/taller/tree/PDeISC/1_NodeJS/NJS2",
    featured: true,
    order: 3,
    startDate: "2024-02-15",
    endDate: "2024-03-30",
    tagIds: ["tag_node", "tag_ssr", "tag_js"],
    screenshots: [
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1200",
    ],
  },
  {
    id: "proj_04",
    title: "Servidor Express — Reportes de Calificaciones en Archivo",
    shortDescription:
      "Servidor Express con persistencia en el sistema de archivos del servidor, guardado estructurado en .txt por documento de estudiante.",
    longDescription:
      "Servidor desarrollado en el taller (2_JS/JS2/proyecto1). Procesa peticiones POST desde un formulario de notas y genera archivos de reporte de calificaciones formateados en el sistema de archivos (fs) del servidor identificados por DNI.",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80&auto=format&fit=crop",
    demoUrl: null,
    repoUrl: "https://github.com/ArielDiazNaso/taller/tree/PDeISC/2_JS/JS2/proyecto1",
    featured: false,
    order: 4,
    startDate: "2024-03-01",
    endDate: "2024-03-25",
    tagIds: ["tag_node", "tag_express", "tag_fs"],
    screenshots: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
    ],
  },
  {
    id: "proj_05",
    title: "Analizador y Procesador de Archivos de Texto",
    shortDescription:
      "Aplicación Express con interfaz web para el procesamiento, análisis y almacenamiento estructurado de documentos de texto.",
    longDescription:
      "Proyecto de taller (2_JS/JS2/proyecto2) para la lectura, análisis y guardado de archivos de texto procesados en directorios específicos del servidor con validación de contenido y endpoints REST.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop",
    demoUrl: null,
    repoUrl: "https://github.com/ArielDiazNaso/taller/tree/PDeISC/2_JS/JS2/proyecto2",
    featured: false,
    order: 5,
    startDate: "2024-03-15",
    endDate: "2024-04-05",
    tagIds: ["tag_node", "tag_express", "tag_fs"],
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
    ],
  },
  {
    id: "proj_06",
    title: "Proxy Express & Consumo de APIs Asíncronas",
    shortDescription:
      "Módulos de integración asíncrona con fetch y Express para consumo, transformación y reenvío de datos JSON de APIs externas.",
    longDescription:
      "Módulos prácticos de taller (2_JS/JS4). Implementan arquitectura proxy para consumir datos asíncronos mediante fetch, parseo de respuestas JSON, creación de endpoints intermedios y manejo de errores HTTP.",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80&auto=format&fit=crop",
    demoUrl: null,
    repoUrl: "https://github.com/ArielDiazNaso/taller/tree/PDeISC/2_JS/JS4",
    featured: false,
    order: 6,
    startDate: "2024-03-20",
    endDate: "2024-04-20",
    tagIds: ["tag_node", "tag_express", "tag_api", "tag_js"],
    screenshots: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200",
    ],
  },
  {
    id: "proj_07",
    title: "Laboratorio de Lógica y Manipulación del DOM",
    shortDescription:
      "Colección progresiva de más de 15 ejercicios de algoritmia, condicionales, arreglos y eventos del DOM.",
    longDescription:
      "Suite integral de ejercicios de JavaScript de taller (2_JS/JS0 a JS1). Abarca desde fundamentos de programación (puntos 1 al 14) hasta la interacción con elementos del navegador, eventos de clic y dinamismo de interfaces.",
    imageUrl:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=900&q=80&auto=format&fit=crop",
    demoUrl: null,
    repoUrl: "https://github.com/ArielDiazNaso/taller/tree/PDeISC/2_JS",
    featured: false,
    order: 7,
    startDate: "2024-02-20",
    endDate: "2024-03-15",
    tagIds: ["tag_js", "tag_dom"],
    screenshots: [
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=1200",
    ],
  },
  {
    id: "proj_08",
    title: "Fundamentos de Servidores y Módulos Node.js",
    shortDescription:
      "Prácticas de laboratorio sobre el ciclo de eventos, módulos CommonJS, lectura de archivos y servidores HTTP nativos.",
    longDescription:
      "Ejercicios formativos del taller (1_NodeJS/NJS1 y NJS3). Aborda el funcionamiento del runtime Node.js, creación de servidores HTTP sin frameworks, manejo de streams y modularización de código.",
    imageUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80&auto=format&fit=crop",
    demoUrl: null,
    repoUrl: "https://github.com/ArielDiazNaso/taller/tree/PDeISC/1_NodeJS",
    featured: false,
    order: 8,
    startDate: "2024-02-01",
    endDate: "2024-02-28",
    tagIds: ["tag_node", "tag_ssr"],
    screenshots: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200",
    ],
  },
];

export const portfolioTables = {
  profile,
  skills,
  experience,
  projects,
  projectTags,
};