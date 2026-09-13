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
  firstName: "Alejandro",
  lastName: "Martínez Vázquez",
  title: "Senior Principal Software Architect & Lead Frontend Engineer",
  tagline:
    "Diseño sistemas escalables y construyo interfaces que convierten ideas en productos digitales de alta calidad.",
  bio: "Arquitecto de Software con más de 10 años de experiencia liderando equipos multidisciplinarios y diseñando soluciones enterprise. Especialista en ecosistemas React/Next.js, arquitecturas limpias y sistemas distribuidos. Apasionado por el clean code, la accesibilidad y la innovación tecnológica.",
  avatarUrl:
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&auto=format&fit=crop",
  email: "alejandro.martinez@portfolio.dev",
  phone: "+34 600 123 456",
  location: "Madrid, España",
  resumeUrl: "/cv-alejandro-martinez.pdf",
  socials: [
    {
      id: "social_01",
      platform: "GitHub",
      url: "https://github.com/alejandromartinez",
      iconKey: "github",
    },
    {
      id: "social_02",
      platform: "LinkedIn",
      url: "https://linkedin.com/in/alejandromartinez",
      iconKey: "linkedin",
    },
    {
      id: "social_03",
      platform: "Twitter/X",
      url: "https://x.com/alejandromdev",
      iconKey: "twitter",
    },
    {
      id: "social_04",
      platform: "Dribbble",
      url: "https://dribbble.com/alejandromartinez",
      iconKey: "dribbble",
    },
  ],
  highlights: [
    "+10 años diseñando arquitecturas enterprise",
    "Especialista en Next.js y ecosistema React 18/19",
    "Mentor técnico en programas de aceleración",
    "Speaker en conferencias internacionales de frontend",
  ],
};

export const skills: readonly Skill[] = [
  {
    id: "skill_01",
    name: "Next.js",
    category: SkillCategory.FRONTEND,
    proficiency: SKILL_PROFICIENCY.MASTER,
    iconKey: "layout-dashboard",
    yearsOfExperience: 6,
  },
  {
    id: "skill_02",
    name: "React / TypeScript",
    category: SkillCategory.FRONTEND,
    proficiency: SKILL_PROFICIENCY.MASTER,
    iconKey: "atom",
    yearsOfExperience: 10,
  },
  {
    id: "skill_03",
    name: "Tailwind CSS",
    category: SkillCategory.FRONTEND,
    proficiency: SKILL_PROFICIENCY.EXPERT,
    iconKey: "palette",
    yearsOfExperience: 5,
  },
  {
    id: "skill_04",
    name: "Framer Motion",
    category: SkillCategory.FRONTEND,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "sparkles",
    yearsOfExperience: 4,
  },
  {
    id: "skill_05",
    name: "Vue 3 / Nuxt",
    category: SkillCategory.FRONTEND,
    proficiency: SKILL_PROFICIENCY.INTERMEDIATE,
    iconKey: "shapes",
    yearsOfExperience: 3,
  },
  {
    id: "skill_06",
    name: "Node.js",
    category: SkillCategory.BACKEND,
    proficiency: SKILL_PROFICIENCY.EXPERT,
    iconKey: "server",
    yearsOfExperience: 9,
  },
  {
    id: "skill_07",
    name: "NestJS",
    category: SkillCategory.BACKEND,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "hexagon",
    yearsOfExperience: 5,
  },
  {
    id: "skill_08",
    name: "GraphQL",
    category: SkillCategory.BACKEND,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "git-branch-plus",
    yearsOfExperience: 6,
  },
  {
    id: "skill_09",
    name: "PostgreSQL",
    category: SkillCategory.DATABASE,
    proficiency: SKILL_PROFICIENCY.EXPERT,
    iconKey: "database",
    yearsOfExperience: 8,
  },
  {
    id: "skill_10",
    name: "MongoDB",
    category: SkillCategory.DATABASE,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "leaf",
    yearsOfExperience: 7,
  },
  {
    id: "skill_11",
    name: "Redis",
    category: SkillCategory.DATABASE,
    proficiency: SKILL_PROFICIENCY.INTERMEDIATE,
    iconKey: "hard-drive",
    yearsOfExperience: 4,
  },
  {
    id: "skill_12",
    name: "Docker / Kubernetes",
    category: SkillCategory.TOOLS,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "box",
    yearsOfExperience: 6,
  },
  {
    id: "skill_13",
    name: "AWS / Vercel",
    category: SkillCategory.TOOLS,
    proficiency: SKILL_PROFICIENCY.EXPERT,
    iconKey: "cloud",
    yearsOfExperience: 7,
  },
  {
    id: "skill_14",
    name: "n8n Workflows",
    category: SkillCategory.TOOLS,
    proficiency: SKILL_PROFICIENCY.ADVANCED,
    iconKey: "workflow",
    yearsOfExperience: 3,
  },
  {
    id: "skill_15",
    name: "Git / Monorepos",
    category: SkillCategory.TOOLS,
    proficiency: SKILL_PROFICIENCY.MASTER,
    iconKey: "git-merge",
    yearsOfExperience: 10,
  },
];

export const experience: readonly ExperienceItem[] = [
  {
    id: "exp_01",
    title: "Senior Principal Software Architect",
    institution: "Nexus Digital Enterprises",
    type: ExperienceType.WORK,
    startDate: "2023-01-15",
    endDate: null,
    location: "Remoto",
    description:
      "Liderazgo arquitectónico end-to-end de la plataforma SaaS core con 1.2M usuarios. Diseño de sistema distribuido con DDD y CQRS.",
    bulletPoints: [
      "Reducción del 45% en costes de infraestructura tras migración a microservicios",
      "Mentoring a 6 equipos cross-functional (+40 ingenieros)",
      "Implantación de design system corporativo reutilizable en 12 productos",
    ],
    order: 1,
    relatedSkillsIds: ["skill_01", "skill_06", "skill_09", "skill_12"],
  },
  {
    id: "exp_02",
    title: "Lead Frontend Engineer",
    institution: "Stellar Fintech",
    type: ExperienceType.WORK,
    startDate: "2020-06-01",
    endDate: "2022-12-20",
    location: "Barcelona, España",
    description:
      "Jefe técnico del equipo frontend para el core banking del neobanco. Construcción de la app de cliente con Next.js y diseño atómico.",
    bulletPoints: [
      "Mejora Lighthouse de 62 → 98 (Performance, A11y, SEO)",
      "Adopción strict TypeScript 5 en +250k LOC sin regresiones",
      "Pipeline CI con pruebas visuales, reduciendo bugs UI en 78%",
    ],
    order: 2,
    relatedSkillsIds: ["skill_01", "skill_02", "skill_03", "skill_15"],
  },
  {
    id: "exp_03",
    title: "Full-Stack Senior Engineer",
    institution: "Orbital Labs S.L.",
    type: ExperienceType.WORK,
    startDate: "2017-09-10",
    endDate: "2020-05-30",
    location: "Madrid, España",
    description:
      "Desarrollo end-to-end de plataformas e-commerce B2B con stack MERN + GraphQL.",
    bulletPoints: [
      "Escalado de plataforma para 80k pedidos/día en Black Friday",
      "Despliegue de arquitectura serverless con AWS Lambda + DynamoDB",
    ],
    order: 3,
    relatedSkillsIds: ["skill_02", "skill_06", "skill_08", "skill_10"],
  },
  {
    id: "exp_04",
    title: "Máster en Ingeniería de Software",
    institution: "Universidad Politécnica de Madrid",
    type: ExperienceType.EDUCATION,
    startDate: "2015-09-15",
    endDate: "2017-07-20",
    location: "Madrid, España",
    description:
      "Especialización en Arquitecturas Distribuidas y Patrones de Diseño. Tesis sobre micro-frontends calificada con Sobresaliente.",
    bulletPoints: ["Matrícula de honor: Arquitectura de Sistemas Empresariales"],
    order: 4,
    relatedSkillsIds: [],
  },
  {
    id: "exp_05",
    title: "Grado en Ingeniería Informática",
    institution: "Universidad Complutense de Madrid",
    type: ExperienceType.EDUCATION,
    startDate: "2011-09-01",
    endDate: "2015-06-30",
    location: "Madrid, España",
    description:
      "Formación general en ingeniería de software, algoritmos, bases de datos y sistemas operativos.",
    bulletPoints: ["TFG calificado con 9.7/10"],
    order: 5,
    relatedSkillsIds: [],
  },
  {
    id: "exp_06",
    title: "Premio Tech Innovator 2024",
    institution: "Conferencia Nacional de Software",
    type: ExperienceType.ACHIEVEMENT,
    startDate: "2024-05-20",
    endDate: "2024-05-20",
    location: "Valencia, España",
    description:
      "Reconocimiento a la contribución en diseño de sistemas reactivos y buenas prácticas Open Source.",
    bulletPoints: [
      "50 nominados, 1 ganador por categoría de Arquitectura",
      "Keynote: Construyendo sistemas que escalan sin romperse",
    ],
    order: 6,
    relatedSkillsIds: [],
  },
];

export const projectTags: readonly ProjectTag[] = [
  { id: "tag_01", name: "Next.js", color: "bg-primary/10 text-primary" },
  { id: "tag_02", name: "TypeScript", color: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300" },
  { id: "tag_03", name: "SaaS", color: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300" },
  { id: "tag_04", name: "AI / LLM", color: "bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300" },
  { id: "tag_05", name: "Fintech", color: "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300" },
  { id: "tag_06", name: "GraphQL", color: "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300" },
  { id: "tag_07", name: "Open Source", color: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300" },
  { id: "tag_08", name: "Mobile", color: "bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300" },
];

export const projects: readonly Project[] = [
  {
    id: "proj_01",
    title: "NexusOne — Plataforma SaaS Multi-Tenant",
    shortDescription:
      "Suite empresarial de gestión de operaciones con tableros en tiempo real, automatizaciones y permisos granulares por inquilino.",
    longDescription:
      "Arquitectura SaaS multi-tenant completa diseñada bajo DDD + CQRS. Dashboard con métricas en vivo, motor de reglas low-code, integración n8n y marketplace de plugins. Frontend Next.js 14 App Router, capa de datos Postgres con row-level security.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop",
    demoUrl: "https://demo.nexusone.app",
    repoUrl: "https://github.com/alejandromartinez/nexusone",
    featured: true,
    order: 1,
    startDate: "2023-03-15",
    endDate: "2024-08-10",
    tagIds: ["tag_01", "tag_02", "tag_03"],
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
    ],
  },
  {
    id: "proj_02",
    title: "StellarPay — Neobanco Digital",
    shortDescription:
      "Aplicación de banca digital con transferencias internacionales, tarjetas virtuales, presupuestos y categorización ML de gastos.",
    longDescription:
      "Producto fintech regulado. Frontend Next.js SSR + ISR con medidas de seguridad avanzadas (Content Security Policy, 2FA WebAuthn, JWT rotatorios). Integración con proveedores de pagos y motor de categorización basado en embeddings LLM.",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=80&auto=format&fit=crop",
    demoUrl: "https://stellarpay.app",
    repoUrl: null,
    featured: true,
    order: 2,
    startDate: "2020-08-01",
    endDate: "2022-11-30",
    tagIds: ["tag_01", "tag_05", "tag_04"],
    screenshots: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200",
    ],
  },
  {
    id: "proj_03",
    title: "OrbitQL — GraphQL Gateway Open Source",
    shortDescription:
      "Federation Gateway para orquestar múltiples subgrafos GraphQL con observabilidad, rate limiting y plugins en TypeScript.",
    longDescription:
      "Proyecto Open Source (3.2k GitHub stars) mantenido activamente. Implementa Apollo Federation v4, soporta WebSockets para suscripciones y trazas OpenTelemetry. Más de 120 contribuidores externos.",
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=900&q=80&auto=format&fit=crop",
    demoUrl: "https://orbitql.dev/playground",
    repoUrl: "https://github.com/orbitql/orbitql",
    featured: false,
    order: 3,
    startDate: "2021-11-05",
    endDate: null,
    tagIds: ["tag_06", "tag_07", "tag_02"],
    screenshots: [],
  },
  {
    id: "proj_04",
    title: "MentorPath — Plataforma de Mentoring IA",
    shortDescription:
      "Sistema de matching mentors/mentorees con sesiones 1:1, retrospectiva asistida por LLM y ruta de aprendizaje personalizada.",
    longDescription:
      "PWA full-stack con Next.js + NestJS + Postgres. Sistema de matching basado en embeddings de skills, videollamadas WebRTC y panel de métricas de progreso para responsables de People.",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80&auto=format&fit=crop",
    demoUrl: "https://mentorpath.io",
    repoUrl: "https://github.com/alejandromartinez/mentorpath",
    featured: false,
    order: 4,
    startDate: "2024-01-10",
    endDate: "2024-06-20",
    tagIds: ["tag_01", "tag_04", "tag_03"],
    screenshots: [],
  },
  {
    id: "proj_05",
    title: "PocketFinance — App Finanzas Personales",
    shortDescription:
      "Aplicación móvil híbrida (React Native + Web) para control de gastos, presupuestos familiares y sincronización bancaria PSD2.",
    longDescription:
      "Producto multiplataforma con kernel compartido React Native Web. Offline-first con RxDB, analytics privacy-first y widgets iOS/Android nativos.",
    imageUrl:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=900&q=80&auto=format&fit=crop",
    demoUrl: "https://pocketfinance.app",
    repoUrl: null,
    featured: false,
    order: 5,
    startDate: "2022-03-01",
    endDate: "2023-02-15",
    tagIds: ["tag_05", "tag_08"],
    screenshots: [],
  },
  {
    id: "proj_06",
    title: "ForgeUI — Design System Atómico",
    shortDescription:
      "Librería Open Source de +80 componentes React 18/19, headless, totalmente accesible y compatible con Tailwind, CSS-in-JS y CSS Modules.",
    longDescription:
      "Design system agnóstico de framework de estilos, 100% tipado, con tests visuales en Chromatic y Storybook documentado. Última release con soporte nativo de React Server Components.",
    imageUrl:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=900&q=80&auto=format&fit=crop",
    demoUrl: "https://forgeui.dev",
    repoUrl: "https://github.com/forgeui/forgeui",
    featured: false,
    order: 6,
    startDate: "2022-09-20",
    endDate: null,
    tagIds: ["tag_02", "tag_07", "tag_01"],
    screenshots: [],
  },
  {
    id: "proj_07",
    title: "SynthLabs — Generador de Audio IA",
    shortDescription:
      "SaaS de voice cloning y síntesis de voz expresiva con fine-tuning por usuario y API REST/GRPC para empresas.",
    longDescription:
      "Plataforma end-to-end de TTS. Frontend Studio React 19, inferencia edge GPU, pipelines reproducibles DVC y billing Stripe autónomo.",
    imageUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=900&q=80&auto=format&fit=crop",
    demoUrl: "https://synthlabs.ai",
    repoUrl: null,
    featured: false,
    order: 7,
    startDate: "2024-04-01",
    endDate: null,
    tagIds: ["tag_04", "tag_03"],
    screenshots: [],
  },
];

export const portfolioTables = {
  profile,
  skills,
  experience,
  projects,
  projectTags,
} as const;

export default portfolioTables;
