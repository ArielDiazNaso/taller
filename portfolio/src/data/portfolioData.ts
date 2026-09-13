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
  title: "Desarrollador Web Full Stack & Estudiante de Sistemas",
  tagline:
    "Desarrollo aplicaciones interactivas, APIs RESTful y arquitecturas web modernas con persistencia de datos.",
  bio: "Desarrollador enfocado en el diseño y construcción de aplicaciones web frontend y backend. Especializado en JavaScript, Node.js, Express, MySQL y React. Apasionado por el código limpio, la optimización de algoritmos y el desarrollo de soluciones escalables.",
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
      url: "https://github.com/ArielDiazNaso",
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
    "Desarrollo Backend con Node.js, Express y MySQL",
    "Interfaces SPA modernas con React, TypeScript y Tailwind CSS",
    "Diseño de APIs RESTful con arquitectura MVC",
    "Bases de datos relacionales y persistencia en la nube",
  ],
};

export const skills: readonly Skill[] = [
  // Frontend
  {
    id: "skill_01",
    name: "React",
    category: SkillCategory.FRONTEND,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "atom",
    yearsOfExperience: 2,
  },
  {
    id: "skill_02",
    name: "JavaScript (ES6+)",
    category: SkillCategory.FRONTEND,
    proficiency: SKILL_PROFICIENCY.EXPERT,
    iconKey: "sparkles",
    yearsOfExperience: 3,
  },
  {
    id: "skill_03",
    name: "TypeScript",
    category: SkillCategory.FRONTEND,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "shapes",
    yearsOfExperience: 2,
  },
  {
    id: "skill_04",
    name: "HTML5 & CSS3",
    category: SkillCategory.FRONTEND,
    proficiency: SKILL_PROFICIENCY.EXPERT,
    iconKey: "palette",
    yearsOfExperience: 3,
  },
  {
    id: "skill_05",
    name: "Tailwind CSS",
    category: SkillCategory.FRONTEND,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "layout-dashboard",
    yearsOfExperience: 2,
  },
  // Backend
  {
    id: "skill_06",
    name: "Node.js",
    category: SkillCategory.BACKEND,
    proficiency: SKILL_PROFICIENCY.EXPERT,
    iconKey: "server",
    yearsOfExperience: 3,
  },
  {
    id: "skill_07",
    name: "Express.js",
    category: SkillCategory.BACKEND,
    proficiency: SKILL_PROFICIENCY.EXPERT,
    iconKey: "hexagon",
    yearsOfExperience: 3,
  },
  {
    id: "skill_08",
    name: "APIs RESTful",
    category: SkillCategory.BACKEND,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "cloud",
    yearsOfExperience: 3,
  },
  {
    id: "skill_09",
    name: "PHP",
    category: SkillCategory.BACKEND,
    proficiency: SKILL_PROFICIENCY.INTERMEDIATE,
    iconKey: "workflow",
    yearsOfExperience: 2,
  },
  {
    id: "skill_10",
    name: "C++ / POO",
    category: SkillCategory.BACKEND,
    proficiency: SKILL_PROFICIENCY.INTERMEDIATE,
    iconKey: "box",
    yearsOfExperience: 2,
  },
  // Database
  {
    id: "skill_11",
    name: "MySQL",
    category: SkillCategory.DATABASE,
    proficiency: SKILL_PROFICIENCY.EXPERT,
    iconKey: "database",
    yearsOfExperience: 3,
  },
  {
    id: "skill_12",
    name: "PostgreSQL / Supabase",
    category: SkillCategory.DATABASE,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "hard-drive",
    yearsOfExperience: 2,
  },
  {
    id: "skill_13",
    name: "Modelado Relacional",
    category: SkillCategory.DATABASE,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "leaf",
    yearsOfExperience: 2,
  },
  // Tools
  {
    id: "skill_14",
    name: "Git & GitHub",
    category: SkillCategory.TOOLS,
    proficiency: SKILL_PROFICIENCY.EXPERT,
    iconKey: "git-branch-plus",
    yearsOfExperience: 3,
  },
  {
    id: "skill_15",
    name: "Vite / Tooling",
    category: SkillCategory.TOOLS,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "git-merge",
    yearsOfExperience: 2,
  },
  {
    id: "skill_16",
    name: "Postman / Testing API",
    category: SkillCategory.TOOLS,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "workflow",
    yearsOfExperience: 2,
  },
];

export const experience: readonly ExperienceItem[] = [
  {
    id: "exp_01",
    title: "Desarrollador Web & Proyectos Full Stack",
    institution: "Desarrollo Independiente / Proyectos Académicos",
    type: ExperienceType.WORK,
    startDate: "2023-03-01",
    endDate: null,
    location: "Buenos Aires, Argentina",
    description:
      "Desarrollo de sistemas web completos con persistencia en bases de datos relacionales, consumo de APIs y diseño responsive.",
    bulletPoints: [
      "Implementación de APIs REST en Node.js y Express con arquitectura MVC",
      "Persistencia de datos relacionales en MySQL y PostgreSQL",
      "Despliegue y publicación en plataformas cloud (Vercel, GitHub Pages)",
    ],
    order: 1,
    relatedSkillsIds: ["skill_01", "skill_06", "skill_07", "skill_11"],
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
      "Formación integral en algoritmos, estructuras de datos, programación orientada a objetos y desarrollo web.",
    bulletPoints: [
      "Aprobación de materias troncales: Taller de Programación, Programación I, II y III, Sistemas",
      "Desarrollo de proyectos prácticos orientados a entornos reales",
    ],
    order: 2,
    relatedSkillsIds: ["skill_02", "skill_10", "skill_11", "skill_14"],
  },
  {
    id: "exp_03",
    title: "Publicación de Sitios y Proyectos en Producción",
    institution: "Proyectos en Vivo",
    type: ExperienceType.ACHIEVEMENT,
    startDate: "2024-06-01",
    endDate: "2024-06-01",
    location: "Web",
    description:
      "Despliegue exitoso del portal institucional Nievas Karate en GitHub Pages y sistemas web en la nube.",
    bulletPoints: [
      "Despliegue con integración continua y soporte multidispositivo",
      "Arquitecturas modernas basadas en componentes y persistencia",
    ],
    order: 3,
    relatedSkillsIds: ["skill_04", "skill_14"],
  },
];

export const projectTags: readonly ProjectTag[] = [
  { id: "tag_node", name: "Node.js", color: "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300" },
  { id: "tag_express", name: "Express", color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" },
  { id: "tag_mysql", name: "MySQL / BBDD", color: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300" },
  { id: "tag_react", name: "React", color: "bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300" },
  { id: "tag_ts", name: "TypeScript", color: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300" },
  { id: "tag_js", name: "JavaScript", color: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300" },
  { id: "tag_php", name: "PHP", color: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300" },
  { id: "tag_cpp", name: "C++", color: "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300" },
  { id: "tag_html", name: "HTML / CSS", color: "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300" },
  { id: "tag_live", name: "Producción", color: "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300" },
];

export const projects: readonly Project[] = [
  {
    id: "proj_01",
    title: "Hangman Score App — Juego del Ahorcado con BBDD",
    shortDescription:
      "Juego interactivo del Ahorcado con backend en Express, control de turnos y persistencia de puntuaciones y ranking en base de datos MySQL.",
    longDescription:
      "Aplicación interactiva completa desarrollada para el taller. Combina un cliente web dinámico con un backend en Node.js/Express y una base de datos MySQL relacional donde se almacena el puntaje de los usuarios, estadísticas de partidas y tabla de líderes en tiempo real.",
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
      "API RESTful estructurada con arquitectura MVC para operaciones CRUD completas sobre alumnos y calificaciones con MySQL.",
    longDescription:
      "Backend modularizado con arquitectura Modelo-Vista-Controlador (MVC). Implementa endpoints REST para dar de alta, consultar, editar y eliminar registros de alumnos y notas, con conexión a base de datos MySQL, middleware de CORS y configuración por variables de entorno (.env).",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80&auto=format&fit=crop",
    demoUrl: null,
    repoUrl: "https://github.com/ArielDiazNaso/taller/tree/PDeISC/2_JS/JS5",
    featured: true,
    order: 2,
    startDate: "2024-03-10",
    endDate: "2024-05-20",
    tagIds: ["tag_node", "tag_express", "tag_mysql"],
    screenshots: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200",
    ],
  },
  {
    id: "proj_03",
    title: "Sitio Web Oficial — Nievas Karate",
    shortDescription:
      "Sitio web institucional en producción con diseño responsive para difusión de actividades, clases y contacto de dojo de karate.",
    longDescription:
      "Página web completa en producción alojada en GitHub Pages. Cuenta con diseño adaptativo para móviles, paleta estética acorde a la identidad institucional, secciones informativas de entrenamiento, galería y accesos de contacto.",
    imageUrl:
      "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=900&q=80&auto=format&fit=crop",
    demoUrl: "https://nievaskarate.github.io",
    repoUrl: "https://github.com/ArielDiazNaso/nievaskarate.github.io",
    featured: true,
    order: 3,
    startDate: "2023-08-01",
    endDate: "2023-11-15",
    tagIds: ["tag_html", "tag_js", "tag_live"],
    screenshots: [
      "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1200",
    ],
  },
  {
    id: "proj_04",
    title: "Servidor Web Modular y Enrutamiento HTTP",
    shortDescription:
      "Servidor web modularizado en Node.js con enrutador de páginas y servicio de archivos estáticos.",
    longDescription:
      "Construcción de un servidor HTTP desde los fundamentos con módulos independientes para control de rutas, manejo de respuestas HTTP y renderizado de páginas dinámicas con recursos estáticos.",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80&auto=format&fit=crop",
    demoUrl: null,
    repoUrl: "https://github.com/ArielDiazNaso/taller/tree/PDeISC/1_NodeJS/NJS2",
    featured: false,
    order: 4,
    startDate: "2024-02-15",
    endDate: "2024-03-30",
    tagIds: ["tag_node", "tag_js"],
    screenshots: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200",
    ],
  },
  {
    id: "proj_05",
    title: "Sistema de Gestión y Control Administrativo Web",
    shortDescription:
      "Aplicación web de gestión desarrollada con backend en PHP y persistencia de datos relacionales en MySQL.",
    longDescription:
      "Sistema orientado a la gestión de datos administrativos, consultas relacionales, reportes y control de registros con arquitectura en capas basada en PHP y MySQL.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop",
    demoUrl: null,
    repoUrl: "https://github.com/ArielDiazNaso/Sistemas",
    featured: false,
    order: 5,
    startDate: "2023-09-01",
    endDate: "2023-12-10",
    tagIds: ["tag_php", "tag_mysql"],
    screenshots: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
    ],
  },
  {
    id: "proj_06",
    title: "Estructuras de Datos y Algoritmos en C++",
    shortDescription:
      "Implementación de estructuras de datos lineales y dinámicas, punteros y Programación Orientada a Objetos.",
    longDescription:
      "Desarrollo de proyectos con enfoque algorítmico y de bajo nivel en C++. Aborda el diseño de clases, jerarquías de herencia, manipulación directa de memoria y estructuras dinámicas.",
    imageUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80&auto=format&fit=crop",
    demoUrl: null,
    repoUrl: "https://github.com/ArielDiazNaso/Trabajos-De-Programacion-II",
    featured: false,
    order: 6,
    startDate: "2023-03-15",
    endDate: "2023-07-10",
    tagIds: ["tag_cpp"],
    screenshots: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200",
    ],
  },
  {
    id: "proj_07",
    title: "Colección de Algoritmos y Manipulación del DOM",
    shortDescription:
      "Suite exhaustiva de ejercicios prácticos de eventos, asincronía y control de interfaces en JavaScript ES6+.",
    longDescription:
      "Batería de proyectos modulares desarrollada para la asignatura: control del ciclo de vida del DOM, gestión de eventos del usuario, validación reactiva de formularios y lógica de algoritmos.",
    imageUrl:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=900&q=80&auto=format&fit=crop",
    demoUrl: null,
    repoUrl: "https://github.com/ArielDiazNaso/taller/tree/PDeISC/2_JS",
    featured: false,
    order: 7,
    startDate: "2024-03-01",
    endDate: "2024-04-15",
    tagIds: ["tag_js", "tag_html"],
    screenshots: [
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=1200",
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