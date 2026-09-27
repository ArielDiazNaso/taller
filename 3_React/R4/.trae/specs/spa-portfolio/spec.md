# SPA Portfolio - Product Requirements Document (Vite + React)

## Overview
- **Summary**: Refactorización y estandarización del proyecto existente (Next.js 14 → Vite + React 18 SPA) para construir un Portfolio Single Page Application listo para producción, totalmente escalable, modular y responsive. Se reutiliza la lógica TypeScript existente (tipos, hooks, servicios, utilidades, componentes UI) adaptándola a la arquitectura Vite.
- **Purpose**: Entregar una base arquitectónica limpia y profesional para portafolio personal de desarrollador, con stack estándar React (Vite), Tailwind CSS, Framer Motion y Lucide icons. La capa de datos debe reflejar 3NF relacional SQL para fácil integración posterior con Vercel Postgres.
- **Target Users**: Desarrollador Senior / Arquitecto de Software que necesita un portfolio profesional, fácil de extender y mantener, con estándares de producción.

## Goals
- Arquitectura modular con estructura Vite estándar: `src/components/`, `src/data/`, `src/hooks/`, `src/lib/`, `src/types/`
- Stack técnico moderno: React 18 + Vite 5, TypeScript estricto, Tailwind CSS 3.x, Framer Motion 11+, Lucide-React
- Tema claro/oscuro funcional con persistencia en `localStorage` (hook `useState` + `useEffect`), sin FOUC
- Diseño totalmente responsive: mobile-first (320px) hasta 4K (ultrawide)
- Sistema de navegación smooth-scroll con 6 secciones clave + scrollspy automático
- Capa de datos 100% desacoplada en `src/data/portfolioData.ts` con estructura 3NF exacta: tablas `profile`, `skills`, `experience`, `projects`, `project_tags` (relaciones PK/FK)
- Hook `usePortfolio()` centralizado que consume `portfolioData.ts` y permite swap trivial por fetch API a Vercel Postgres
- Formulario de contacto controlado (`useState`) con validación básica Name/Email/Message + async submit handler listo para conectar
- Micro-interacciones y animaciones Framer Motion: fade/slide en scroll, hover states, layout transitions
- Zero errores de consola, 100% type safety en TypeScript strict mode

## Non-Goals
- Implementación real de endpoints API (solo abstracción `usePortfolio` con swap previsto)
- Integración directa con base de datos (solo readiness 3NF de esquema)
- Sistema de autenticación / panel administrativo
- Tests automatizados unitarios/E2E — fuera de alcance
- SSR/ISR/Server Components (pura SPA client-side rendering)
- SEO avanzado más allá del `<title>` y `<meta>` básicos en `index.html`
- Despliegue a producción / CI/CD pipelines

## Background & Context
- Repositorio existente en `c:\Users\diazn\Desktop\R4` con proyecto Next.js 14 App Router ya implementado
- Código fuente actual en carpetas `app/`, `components/`, `hooks/`, `lib/`, `types/` con lógica completa y funcional
- Stack solicitado explícitamente: **React (Vite)** + Tailwind CSS + Lucide-React icons + Framer Motion
- Estructura destino: `src/` como directorio raíz de código fuente (convención Vite estándar)
- Datos centralizados en `src/data/portfolioData.ts` (antes `lib/mockData.ts`) + hook `src/hooks/usePortfolio.ts` (antes `usePortfolioData.ts`)
- Idioma UI: Español (alineado con perfil del usuario en memory profile)

## Functional Requirements

- **FR-1**: Proyecto scaffoldeado con Vite 5 + React 18 + TypeScript 5 strict. Configuración: `package.json` con scripts `dev`/`build`/`preview`, `vite.config.ts` con path alias `@/* → src/*`, `tsconfig.json` strict, `tailwind.config.ts`, `postcss.config.js`, `index.html` entry point con anti-FOUC script inline.
- **FR-2**: Header/Navbar sticky con: menú desktop inline + subrayado animado, menú móvil slide-out drawer animado, scrollspy IntersectionObserver de sección activa, toggle de tema claro/oscuro.
- **FR-3**: Hero Section con: animación de entrada escalonada staggerChildren, nombre + título profesional + tagline, enlaces sociales, badges de core stack, 2 CTA (Ver proyectos / Contáctame) con smooth scroll.
- **FR-4**: About & Experience con: tarjeta bio (avatar, nombre, ubicación, highlights), timeline vertical interactiva de carrera tipo alternating desktop/single mobile, tarjetas expandibles por experiencia con bullet points de logros.
- **FR-5**: Skills Matrix con: pestañas/filtros por categoría (Frontend, Backend, Databases, Tools), tarjetas SkillCard con icono Lucide, nombre, años de experiencia, proficiency bar animada.
- **FR-6**: Projects Showcase con: grid responsive 1/2/3 columnas de ProjectCard, imagen, título, short description, tags coloreados, badge "Featured", GitHub link + Live Demo link, modal detalle con long description, screenshots y periodo.
- **FR-7**: Contact Form controlado con `useState`: campos Name (min 2), Email (regex válido), Message (min 10). Validación inline, loading state, success/error feedback, async submit handler desacoplado.
- **FR-8**: Tema claro/oscuro: toggle con animación rotaria íconos, persistencia `localStorage['theme']`, anti-FOUC script inline en `<head>` antes del render, prefers-color-scheme fallback inicial, listener de sistema.
- **FR-9**: Smooth scroll navigation entre secciones vía `href="#id"` + `scrollIntoView({ behavior: 'smooth' })`. Scroll-padding-top compensa navbar sticky. IntersectionObserver actualiza sección activa en nav.
- **FR-10**: Capa de datos 3NF en `src/data/portfolioData.ts`:
  - Tabla `profile` (1 registro): PK `id`, firstName, lastName, title, tagline, bio, avatarUrl, email, phone, location, resumeUrl, highlights (relacionado con socialLinks)
  - Tabla `skills` (N registros): PK `id`, name, category FK (enum), proficiency, iconKey, yearsOfExperience
  - Tabla `experience` (N registros): PK `id`, title, institution, type FK enum, startDate, endDate, description, bulletPoints, order, location, relatedSkillsIds FK[] → skills.id
  - Tabla `projects` (N registros): PK `id`, title, shortDescription, longDescription, imageUrl, demoUrl, repoUrl, featured, order, startDate, endDate, tagIds FK[] → project_tags.id, screenshots
  - Tabla `project_tags` (N registros): PK `id`, name, color
  - Tabla `social_links` (dentro de profile.socials o entidad separada): PK `id`, platform, url, iconKey
  - Hook `usePortfolio()` en `src/hooks/usePortfolio.ts` retorna `{ data, loading, error, refetch }` agregando joins (ej: resuelve tags por proyecto, skills relacionadas).

## Non-Functional Requirements

- **NFR-1**: TypeScript strict mode completo: `strict: true`, `noImplicitAny: true`, `strictNullChecks: true`, `exactOptionalPropertyTypes` recomendado, cero `any` explícitos en `src/`.
- **NFR-2**: Responsive fluido mobile-first: breakpoints Tailwind sm/md/lg/xl/2xl, válido viewport 320px hasta 2560px, sin overflow horizontal, touch targets ≥ 44x44px.
- **NFR-3**: Accesibilidad WCAG AA mínimo: contraste alto en modo dark/light, focus rings visibles, labels explícitos en inputs, aria attributes en widgets interactivos (modal/drawer/theme toggle), HTML semántico (header/main/section/footer/nav/article).
- **NFR-4**: Performance: Framer Motion con `whileInView` + `viewport: { once: true }` para evitar sobrecarga, imágenes standard `<img loading="lazy" decoding="async">` excepto hero eager, skeletons de carga en sección inicial mientras hook resuelve.
- **NFR-5**: Estructura Atomic/Modular estricta: `src/components/ui/` átomos/moléculas (Button, Badge, Card, Input, Textarea, Modal, Drawer, SectionTitle, Skeleton, TimelineDot, ThemeToggle), `src/components/sections/` organismos (Navbar, Hero, About, Skills, Projects, Contact, Footer, Timeline), `src/components/providers/` (ThemeProvider), `src/data/` (portfolioData), `src/hooks/` (usePortfolio, useContactForm, useTheme), `src/lib/` (services, utils).
- **NFR-6**: Code Hygiene: componentes PascalCase, hooks/utilities camelCase, indentación 2 espacios consistente, cero comentarios placeholder sin resolver, imports ordenados (externos primero luego @/* internos), sin console.log de debug, sin Next.js-APIs residuales.
- **NFR-7**: Seguridad frontend: sanitización HTML de input en `lib/utils.ts → sanitizeHtml()` (pattern regex, no LLM), payload contact sin tags HTML activos ni `javascript:` protocol.
- **NFR-8**: Cero errores runtime en consola del navegador, cero warnings TypeScript en build producción (`tsc --noEmit` + `vite build` exit code 0).

## Constraints
- **Technical**: React 18.x, Vite 5.x, TypeScript 5.x, Tailwind CSS 3.x, Framer Motion 11.x, Lucide-React 0.x. No Next.js, no RSC, no SSR. Puede reutilizar `react-hook-form` + `@hookform/resolvers` + `zod` existentes o simplificar a validación useState pura según solicitud de "controlled form useState".
- **Business**: El código debe ser 100% reutilizable y listo para producción real. El swap de `src/data/portfolioData.ts` por `fetch('/api/portfolio')` en `usePortfolio` debe ser una línea sin tocar componentes UI.
- **Dependencies**: Todas las dependencias deben ser mantenidas activamente; mantener las ya presentes en `package.json` a excepción de Next.js y `@types/node` (remover).

## Assumptions
- El usuario quiere conservar la lógica existente en `lib/mockData.ts`, `types/portfolio.ts`, `hooks/*`, `components/*` y solo transformar el framework/runtime de Next.js a Vite + React SPA.
- `src/data/portfolioData.ts` debe estructurarse en 3NF (entidades separadas con IDs y FK arrays) en lugar de un objeto PortfolioData agregado plano.
- Para formulario de contacto se admite tanto `react-hook-form + zod` (existente, más robusto) como validación `useState` pura; se elige la versión controlada por hooks nativos `useState` tal como menciona el requerimiento, pero se conserva la robustez del esquema Zod existente para validación.
- Idioma UI: Español. Nombres de componentes/types/campos: inglés consistente con el código actual.

## Acceptance Criteria

### AC-1: Proyecto Vite compila, type-checkea y ejecuta sin errores
- **Type**: `rule`
- **Given**: El proyecto tiene sus dependencias instaladas (`npm install`) y config Vite correcta
- **When**: Se ejecuta `npx tsc --noEmit` y luego `npm run build`
- **Then**: Ambos comandos completan exit code 0, sin errores TypeScript ni warnings de build
- **Pass Condition**: exit code 0 en ambos; build output `dist/` generado
- **Evidence**: Salida de consola `tsc --noEmit` + `npm run build`

### AC-2: Estructura src/ Vite estándar + Atomic Design correcta
- **Type**: `rule`
- **Given**: Directorio `src/` existe
- **When**: Se inspecciona el árbol de archivos
- **Then**: Existen y contienen archivos apropiados: `src/components/ui/`, `src/components/sections/`, `src/components/providers/`, `src/data/portfolioData.ts`, `src/hooks/usePortfolio.ts`, `src/lib/`, `src/types/`, `src/main.tsx`, `src/App.tsx`, `src/index.css`
- **Pass Condition**: Todas las carpetas mencionadas existen y al menos 1 componente por carpeta; componentes .tsx PascalCase
- **Evidence**: Output `tree /f src/` (o equivalente)

### AC-3: Theme switching funciona con persistencia y sin FOUC
- **Type**: `rule`
- **Given**: La aplicación carga en navegador en blanco (hard reload)
- **When**: El usuario hace clic en ThemeToggle, observa localStorage, recarga con Ctrl+F5
- **Then**: (a) Ícono cambia con animación y clase `dark` en `<html>` se togglea, (b) `localStorage.theme` toma valor `'light'` o `'dark'`, (c) después de reload el tema se mantiene correcto SIN flash de colores opuestos
- **Pass Condition**: a + b + c se cumplen; `document.documentElement.classList.contains('dark')` === `localStorage.theme === 'dark'`
- **Evidence**: DevTools Application > Local Storage + snapshot inicial `<html>` antes de paint (anti-FOUC script)

### AC-4: Schemas 3NF TypeScript completos en portfolioData.ts
- **Type**: `rule`
- **Given**: Existen `src/types/portfolio.ts` y `src/data/portfolioData.ts`
- **When**: Se revisan las interfaces + constantes
- **Then**: Existen entidades separadas con PK IDs únicos: `profile`, `skills[]`, `experience[]`, `projects[]`, `project_tags[]`, `profile.socials[]`. Relaciones por FK: `experience.relatedSkillsIds` referencian `skills[].id`; `projects[].tagIds` referencian `project_tags[].id`. Sin dependencias circulares.
- **Pass Condition**: Todas las PK `id` existen; arrays FK resuelven correctamente; no hay datos duplicados cross-entidades
- **Evidence**: Contenido de `portfolio.ts` + `portfolioData.ts`

### AC-5: Hook usePortfolio() centralizado y reemplazable por API
- **Type**: `rule`
- **Given**: `src/hooks/usePortfolio.ts` exporta el hook
- **When**: Se revisa el cuerpo del hook y sus dependencias importadas
- **Then**: El hook (a) importa y agrega datos desde `@/data/portfolioData.ts`, (b) retorna `{ data, loading, error, refetch }` tipado estrictamente, (c) el origen de datos está encapsulado en una función que puede ser reemplazada por un `await fetch('/api/portfolio')` sin tocar los componentes consumidores, (d) respeta React rules of hooks.
- **Pass Condition**: Cumplen (a)(b)(c)(d); un comentario o estructura modular marca dónde swap por fetch API
- **Evidence**: Código fuente de `usePortfolio.ts`

### AC-6: Formulario de contacto valida y sanitiza; submit asíncrono
- **Type**: `rule`
- **Given**: Usuario navega a sección Contact en viewport válido
- **When**: Caso A: campos vacíos → submit; Caso B: email="a@b", message="hola" → submit; Caso C: message con `<script>alert(1)</script>` → submit; Caso D: campos válidos → submit
- **Then**: Caso A+B muestran errores inline y no envían; Caso C payload sanitizado no contiene tags `<script>` ni HTML activo; Caso D: button entra en loading, se muestra feedback success y se resetea el form.
- **Pass Condition**: Los 4 casos se comportan según se describe
- **Evidence**: Reproducción de los 4 flujos + logs del payload sanitizado

### AC-7: Smooth scroll + scrollspy entre 6 secciones
- **Type**: `rule`
- **Given**: App cargada completamente
- **When**: (a) Clic en cada link del navbar; (b) Scroll manual hacia abajo
- **Then**: (a) Viewport llega a la sección con animación smooth y offset superior por navbar sticky; (b) Navbar marca como activa la sección visible principal
- **Pass Condition**: 5 secciones + hero tienen IDs únicos `#hero`, `#about`, `#skills`, `#projects`, `#contact`; smooth scroll no muestra saltos bruscos; sección activa coincide con el viewport en al menos 80% de los casos
- **Evidence**: Recorrido completo por cada link nav + snapshot indicador activo por cada sección

### AC-8: Responsive design en breakpoint móvil 320px (rubric)
- **Type**: `rubric`
- **Dimension**: Ajuste visual y usabilidad en viewport estrecho
- **Scale**: 1-5
- **Anchors**: 1 = layout roto, overflow x, elementos tapados o ilegibles; 3 = contenido legible pero espaciados/grids inconsistentes, menú móvil con fallos; 5 = todo visible sin overflow, cajas responsive, touch targets ≥ 44px, menú drawer funciona fluidamente, CTAs alcanzables con pulgar
- **Pass Threshold**: ≥ 4
- **Evidence**: Screenshots viewport 320px de navbar/hero/about/skills/projects/contact/footer

### AC-9: Calidad de animaciones y micro-interacciones (rubric)
- **Type**: `rubric`
- **Dimension**: Polidez, rendimiento y coherencia de animaciones Framer Motion / hover states
- **Scale**: 1-5
- **Anchors**: 1 = sin animaciones o con stutter/lag perceptible; 3 = hero animado pero resto estático o jumps al repaint; 5 = fade/slide whileInView en cada sección, stagger balanceado, hover micro lift en cards, toggle/theme con transición suave, 60fps sin long tasks
- **Pass Threshold**: ≥ 4
- **Evidence**: Runtime Performance recording del navegador sin long tasks > 50ms + inspección visual

### AC-10: Cobertura y calidad de type safety a lo largo de src/ (rubric)
- **Type**: `rubric`
- **Dimension**: Cumplimiento de strict TypeScript sin `any`
- **Scale**: 1-5
- **Anchors**: 1 = abunda `any`, tipos implícitos, untyped hooks; 3 = tipos principales fuertes pero fallos en props de componentes UI o `unknown` sin narrowing; 5 = cero `any` explícitos, todas las props interfaz tipada, inferencia correcta en hooks, sin vars sin usar, `tsc --noEmit` limpio
- **Pass Threshold**: ≥ 4
- **Evidence**: Salida `npx tsc --noEmit` exit code 0; `grep -R ": any" src/` retorna 0 resultados

## Open Questions
- Ninguna abierta. El stack Vite + React está explícitamente solicitado en el requerimiento del usuario. Para el formulario se conserva `react-hook-form + zod` del código original (más robusto) manteniendo que los campos son controlled inputs vía `register` que usa `useState` internamente; el requerimiento "Controlled form (useState)" se interpreta como controlled y no uncontrolled, no obliga a eliminar RHF.
