# SPA Portfolio - Implementation Plan (Vite + React)

## Task 1: Setup del proyecto Vite + React y configuraciones base
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Actualizar `package.json`: remover `next`, `@types/node`, `eslint-config-next`. Añadir `vite`, `@vitejs/plugin-react`, `@fontsource/inter`. Scripts: `dev`, `build`, `preview`, `lint`, `typecheck`
  - Crear `vite.config.ts` con plugin React, path alias `@/*` resolviendo a `./src/*`
  - Actualizar `tsconfig.json`: cambiar `baseUrl` a `.`, paths `@/*` → `src/*`, quitar plugin `next`, cambiar `jsx` a `react-jsx`, actualizar `include` a `src/**/*`
  - Crear `index.html` en raíz con `<div id="root"></div>`, inline anti-FOUC theme script en `<head>`, `<title>` + `<meta>` description
  - Asegurar `tailwind.config.ts` `content:` incluye `./index.html` y `./src/**/*.{ts,tsx,js,jsx}`; asegurar `postcss.config.cjs` correcto
  - Actualizar `app/globals.css` → mover a `src/index.css` con `@tailwind base/components/utilities` + design tokens `.dark` + component classes (glass, heading-xl/lg, paragraph, skeleton-base)
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `rule` TR-1.1: `npm install` exit code 0. Los 6 archivos clave existen: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `tailwind.config.ts`, `src/index.css`
  - `rule` TR-1.2: `index.html` contiene script anti-FOUC inline antes de `<body>`; `<html lang="es">`
  - `rubric` TR-1.3: Cohesión del design system escala 1-5; anchors 1=solo defaults tailwind, 3=tokens parciales sin glass/gradient, 5=paleta dual light/dark HSL variables, spacing container responsive, glass/gradient helpers, typography heading classes; threshold ≥4; evidencia: tailwind.config.ts + src/index.css

## Task 2: Reorganizar estructura a src/ + renombrar data layer 3NF
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - Crear árbol `src/`: mover/adaptar todo el código fuente de `components/` → `src/components/`, `hooks/` → `src/hooks/`, `lib/` → `src/lib/`, `types/` → `src/types/`
  - **Renombrar y adaptar types**: conservar `types/portfolio.ts` → `src/types/portfolio.ts` (mantener interfaces existentes que ya son 3NF-friendly)
  - **Renombrar mock data → portfolioData**: `lib/mockData.ts` → `src/data/portfolioData.ts`, exportar como tablas separadas 3NF: `export const profile = {...}`, `export const skills = [...]`, `export const experience = [...]`, `export const projects = [...]`, `export const projectTags = [...]`, mantener socials dentro de `profile.socials[]` (ya son 1:N). Añadir export helper `export const portfolioTables = { profile, skills, experience, projects, projectTags }`
  - Conservar `lib/utils.ts` → `src/lib/utils.ts` (cn, formatDate, sanitizeHtml, proficiencyToLabel, etc.)
  - Crear `src/vite-env.d.ts` con `/// <reference types="vite/client" />`
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-4
- **Test Requirements**:
  - `rule` TR-2.1: Estructura `src/` con las 7 carpetas: `components`, `data`, `hooks`, `lib`, `types`. Existen `src/data/portfolioData.ts` y `src/types/portfolio.ts`
  - `rule` TR-2.2: `portfolioData.ts` exporta `profile` (1 record) + `skills` (≥12) + `experience` (≥5) + `projects` (≥6) + `projectTags` (≥5) con IDs únicos; `experience[].relatedSkillsIds` y `projects[].tagIds` referencian PKs existentes
  - `rubric` TR-2.3: Normalización 3NF; escala 1-5; anchors 1=datos flat sin PK/FK, 3=PKs pero relaciones implícitas, 5=tablas separadas, arrays FK consistentes, sin duplicación cross-table, socials embebidas en profile (1:N propia); threshold ≥4

## Task 3: Adaptar capa de abstracción — services + hook usePortfolio()
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 2
- **Description**:
  - Crear/mantener `src/lib/services.ts`: funciones `fetchPortfolioData()` y `submitContactMessage(payload)`. Sustituir imports de `@/lib/mockData` por `@/data/portfolioData`. Mantener `randomDelay` artificial. `fetchPortfolioData` debe retornar `{ success, data: { profile, skills, experience, projects, projectTags } }` ordenado
  - **Renombrar hook**: `hooks/usePortfolioData.ts` → `src/hooks/usePortfolio.ts`, export `usePortfolio()`. Mantener `{ data, loading, error, refetch }`. Marcar claramente el punto de swap por API real (`// TODO: swap fetchPortfolioData() por await fetch('/api/portfolio').then(r => r.json())`)
  - Mantener `src/hooks/useContactForm.ts` (React Hook Form + Zod schema) adaptando imports a `src/` paths. Mantener validación: name 2-80 chars, email regex, message 10-4000 chars. Mantener sanitizeHtml en payload
- **Acceptance Criteria Addressed**: AC-1, AC-4, AC-5, AC-6
- **Test Requirements**:
  - `rule` TR-3.1: `usePortfolio.ts` retorna objeto con tipos correctos; loading inicial true; tras resolver data no null. Punto de swap API documentado
  - `rule` TR-3.2: `useContactForm` retorna 3 errores al submit vacío; email inválido "a@b" falla; payload con `<script>` pasa por sanitizeHtml → sin tags
  - `rubric` TR-3.3: Decoupling UI ↔ data escala 1-5; anchors 1=components importan data directamente, 3=hook pero acoplado a mock, 5=services layer indirección, swap trivial, componentes no saben origen; threshold ≥4

## Task 4: Adaptar ThemeProvider, ThemeToggle + entry point sin FOUC
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - Mover `components/providers/ThemeProvider.tsx` → `src/components/providers/ThemeProvider.tsx`. **Remover `"use client"`** (todos componentes son client-side en Vite). Adaptar imports a `@/*`. Mantener lógica: Context + localStorage key "theme" + applyThemeClasses + prefers-color-scheme listener + AntiFoucScript helper
  - Mover `components/ui/ThemeToggle.tsx` → `src/components/ui/ThemeToggle.tsx`. Quitar `"use client"`. Adaptar import ThemeProvider path
  - Quitar `lib/theme-script.ts` y usar inline el AntiFoucScript directamente en `index.html` `<head>`
  - No es necesario `app/layout.tsx`; ese wrapping pasa a `src/main.tsx` → `<ThemeProvider>` → `<App />`
- **Acceptance Criteria Addressed**: AC-1, AC-3
- **Test Requirements**:
  - `rule` TR-4.1: Click ThemeToggle añade/quita `.dark` a `<html>` y escribe `localStorage.theme = light|dark`
  - `rule` TR-4.2: Hard reload (Ctrl+F5) con `theme=dark` → NO hay flash de tema claro; script inline en `<head>` antes de React render
  - `rubric` TR-4.3: Integración providers escala 1-5; anchors 1=provider disperso, 3=provider único pero listener sistema sin aplicar, 5=Context anidado en root, localStorage sync, OS sync, anti-FOUC inline, toggle animado; threshold ≥4

## Task 5: Adaptar átomos UI a Vite/React estándar (remover next/*, ajustar imports)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 2, Task 4
- **Description**:
  - Mover átomos a `src/components/ui/`: `Button`, `Badge`, `Card`, `Input`, `Textarea`, `Modal`, `Drawer`, `SectionTitle`, `Skeleton`, `TimelineDot`, `ThemeToggle`
  - **Remover de todos los archivos** directiva `"use client"` y `"use strict"` top-level sobrantes
  - **Button.tsx**: conservar forwardRef + variantes primary/secondary/ghost/outline/destructive. Props loading, leftIcon/rightIcon Lucide, asChild. Adaptar imports `@/lib/utils`
  - **Card/Badge/SectionTitle/Skeleton/TimelineDot**: sin cambios lógicos; ajustar imports
  - **Input.tsx + Textarea.tsx**: mantener integración React Hook Form `registration` prop; ajustar imports
  - **Modal + Drawer**: mantener Framer Motion transitions, ESC close, backdrop click, body overflow lock. Ajustar imports
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-6
- **Test Requirements**:
  - `rule` TR-5.1: 11 átomos en `src/components/ui/*` exportados en PascalCase; ninguno contiene directiva `"use client"`; imports resuelven sin `Cannot find module`
  - `rule` TR-5.2: Button loading muestra `<Loader2>` spinning y disabled click; Input renderiza `aria-invalid` y error cuando `error` prop seteado
  - `rubric` TR-5.3: Atomicidad reusabilidad escala 1-5; anchors 1=props hardcodeadas, 3=props limitadas, 5=composables forwardRef, variantes className, accesibles aria-labels, lucide icons; threshold ≥4

## Task 6: Adaptar organismo Navbar (desktop + mobile drawer + scrollspy)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 4, Task 5
- **Description**:
  - Mover `components/sections/Navbar.tsx` → `src/components/sections/Navbar.tsx`. Quitar `"use client"`. Ajustar imports `@/components`, `@/lib/utils`, `@/data/portfolioData` (nombre de marca AM se puede seguir obteniendo de `profile` via prop o hook; si es import directo fallback `import { profile } from '@/data/portfolioData'`)
  - Sustituir `Next/Link` inexistente — ya usa `<a href="#hero">` nativo, por lo que Navbar links actuales son correctos; solo asegurar smooth scroll + preventDefault + scrollIntoView smooth block=start
  - Mantener LayoutGroup underline animado desktop, Drawer móvil, IntersectionObserver scrollspy (rootMargin -45%/-50%)
  - Eliminar `import { mockProfile } from '@/lib/mockData'` y reemplazar por `import { profile } from '@/data/portfolioData'`
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-7
- **Test Requirements**:
  - `rule` TR-6.1: Click 5 links nav → cada uno smooth scroll a sección; sección activa underline actualiza tras llegar
  - `rule` TR-6.2: Viewport width<768px → hamburguesa renderiza; click abre Drawer slide-in derecha sin overflow-x body
  - `rubric` TR-6.3: Polidez visual escala 1-5; anchors 1=stutter, 3=animaciones básicas, 5=glass sticky + scroll, spring underline, drawer stagger, active dot en mobile, focus ring; threshold ≥4

## Task 7: Adaptar Hero Section organismo (stagger, socials, CTAs scroll)
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 5, Task 6
- **Description**:
  - Mover `components/sections/Hero.tsx` → `src/components/sections/Hero.tsx`. Quitar `"use client"`. Ajustar imports `@/components/ui/*`, `@/lib/utils`, `@/data/portfolioData` como fallback si props no pasadas
  - **Cambios críticos**: reemplazar cualquier Next.js `Image` no existente por `<img>` estándar con `src`, `alt`, `width`, `height`, `loading="eager"` para hero avatar. Mantener SVG fallback onError con iniciales AM encodeURIComponent
  - Mantener Framer Motion container/stagger fadeInUp, blob gradients background, CTAs con onClick `handleScrollTo("projects"|"contact")`
  - Sustituir `import { mockProfile, mockSkills } from '@/lib/mockData'` → fallback a `@/data/portfolioData`
- **Acceptance Criteria Addressed**: AC-1, AC-2
- **Test Requirements**:
  - `rule` TR-7.1: Hero renderiza con nombre completo, título, tagline, 6 topSkills badges, 2 CTAs. Click "Ver proyectos" → scroll a `#projects`; Click "Contáctame" → `#contact`
  - `rubric` TR-7.2: Animación entrada escala 1-5; anchors 1=sin animar, 3=solo fade, 5=staggerChildren secuencia greeting→name→title→badges→CTAs, blob background parallax, badge pulse; threshold ≥4

## Task 8: Adaptar About + Timeline organisms (expand + alternating)
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 2, Task 3, Task 5
- **Description**:
  - Mover `About.tsx` + `Timeline.tsx` → `src/components/sections/`. Quitar `"use client"`. Ajustar imports `@/components/ui/*`, `@/lib/utils`
  - **Cambio crítico**: Reemplazar `import Image from 'next/image'` + `fill`/`sizes` por `<img>` estándar en About bio card. Usar `src` + `alt` + `className="object-cover w-full h-full"` dentro de contenedor aspect-square rounded-3xl relative overflow-hidden. SVG fallback si error
  - Timeline: mantener alternating left/right en ≥1024px y single stack móvil, expand/collapse con AnimatePresence height, TimelineDot variants work/education/achievement, achievement ribbon
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-9
- **Test Requirements**:
  - `rule` TR-8.1: Timeline renderiza items ordenados por `order` (exp 1-6); click header expande contenido bullet points + descripción; segundo click colapsa
  - `rubric` TR-8.2: Legibilidad timeline escala 1-5; anchors 1=saltos layout, 3=alineado básico, 5=alternate desktop + stack mobile, pulse dots, expand smooth, achievement ribbon; threshold ≥4

## Task 9: Adaptar Skills Matrix organism (tabs + SkillCard + proficiency bar)
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 2, Task 3, Task 5
- **Description**:
  - Mover `Skills.tsx` → `src/components/sections/Skills.tsx`. Quitar `"use client"`. Ajustar imports
  - Mantener 4 tabs SkillCategory (FRONTEND/BACKEND/DATABASE/TOOLS). Mantener iconMap Lucide para iconKey de cada skill. Mantener proficiency progress bar animada whileInView. Mantener AnimatePresence mode=wait entre tabs
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-9
- **Test Requirements**:
  - `rule` TR-9.1: 4 botones tab. Click Frontend = skills[].filter(category=frontend). Conteos aprox: 5 Frontend, 3 Backend, 3 Database, 4 Tools = 15 skills
  - `rubric` TR-9.2: Visual categorización escala 1-5; anchors 1=texto plano, 3=categorias básicas, 5=colores badge por categoría, proficiency bar 0→100% animación, tab active ring, skill card icon map; threshold ≥4

## Task 10: Adaptar Projects Showcase + modal detalle (remplazar next/image)
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 2, Task 3, Task 5
- **Description**:
  - Mover `Projects.tsx` → `src/components/sections/Projects.tsx`. Quitar `"use client"`. Ajustar imports
  - **Cambio crítico**: Reemplazar **todo** `import Image from 'next/image'` + `fill`/`sizes` por `<img className="absolute inset-0 w-full h-full object-cover transition-transform..."` estándar con `src`, `alt`, `loading="lazy"`, `decoding="async"`. Tanto tarjeta como modal screenshots
  - Mantener grid 1/2/3 cols, `featured` badge StarIcon, hover overlay Demo+Repo buttons (window.open _blank noopener noreferrer), modal detail con long description, tags, periodo calendar badges, footer links
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-9
- **Test Requirements**:
  - `rule` TR-10.1: 7 project cards renderizados; 2 featured destacados con estrella/top-absolute badge; click "Ver detalles" abre modal; cierre con X/ESC/backdrop sin errores
  - `rubric` TR-10.2: Diseño cards escala 1-5; anchors 1=blocks sin estilo, 3=cards básicas, 5=hover lift + scale image + overlay buttons, featured visual distinguible, tags coloreados, modal scroll screenshots; threshold ≥4

## Task 11: Adaptar Contact Section organism (form + info + validación)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 3, Task 5
- **Description**:
  - Mover `Contact.tsx` → `src/components/sections/Contact.tsx`. Quitar `"use client"`. Ajustar imports `@/components/ui/*`, `@/hooks/useContactForm`, `@/data/portfolioData` como fallback profile
  - Mantener estructura 2-column: izquierda datos contacto (email/phone/ubicación/social buttons con window.open noopener noreferrer), derecha form controlado por RHF register
  - Mantener loading state Button, submitError Alert, submitSuccess Check feedback. Mantener useEffect auto-clear a los 6s
- **Acceptance Criteria Addressed**: AC-1, AC-6
- **Test Requirements**:
  - `rule` TR-11.1: Submit vacío → 3 inline errores. email="a@b" → email regex error. message="hola" (<10 chars) → min length error. Válido → loading + success + reset()
  - `rule` TR-11.2: Payload submit = `{name, email, message}` pasa por `sanitizeHtml()`; HTML tags son removidos
  - `rubric` TR-11.3: UX formulario escala 1-5; anchors 1=sin feedback, 3=solo errores visibles, 5=focus primer error, success toast/box, disabled submit durante loading, hint counter, social icons clickeables; threshold ≥4

## Task 12: Ensamblar App.tsx + main.tsx entry, Footer, skeletons loading global
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 6, Task 7, Task 8, Task 9, Task 10, Task 11
- **Description**:
  - Crear `src/main.tsx`: `import React from 'react'`, `import ReactDOM from 'react-dom/client'`, render `<React.StrictMode>` → `<ThemeProvider>` → `<App />` con root `document.getElementById('root')!`. Añadir `import '@fontsource/inter/variable.css'` ó CSS @import Google Fonts en `index.html <link>` (más eficiente que fontsource)
  - Crear `src/App.tsx`: importar `Navbar`, `Hero`, `About`, `Skills`, `Projects`, `Contact`, `Footer` de `@/components/sections/*`. Consumir `usePortfolio()` hook top-level. Manejar loading con `Suspense` fallback skeletons individuales por sección (HeroSkeleton/AboutSkeleton/SectionSkeleton). Manejar error con Retry button. Background decorative blobs
  - Mover `Footer.tsx` → `src/components/sections/Footer.tsx`. Quitar `"use client"`. Adaptar imports. Mantener 3 col layout (brand, nav links, social icons), copyright año dinámico
  - Enlazar `src/index.css` en `main.tsx`
  - Asegurar IDs secciones: `id="hero"`, `id="about"`, `id="skills"`, `id="projects"`, `id="contact"` en los organismos (ya deberían estar)
- **Acceptance Criteria Addressed**: AC-1, AC-7
- **Test Requirements**:
  - `rule` TR-12.1: `App.tsx` renderiza 6 secciones con IDs correctos + Navbar + Footer. `main.tsx` hidrata root sin runtime errors
  - `rule` TR-12.2: Durante `loading=true` cada sección muestra skeleton; al resolver data se intercambia por contenido. Error state muestra mensaje + botón refetch que re-ejecuta hook
  - `rubric` TR-12.3: Flujo general scroll escala 1-5; anchors 1=saltos bruscos navbar, 3=smooth sin offset, 5=smooth + scroll-padding + scrollspy sincronizado + skeletons sin CLS; threshold ≥4

## Task 13: Limpieza archivos obsoletos Next.js + typecheck + build final + diagnósticos
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 12
- **Description**:
  - Eliminar carpetas/archivos Next.js residuales: `app/` (todo: layout.tsx, page.tsx, not-found.tsx, globals.css antiguo), `next.config.js`, `next-env.d.ts`, `.next/`
  - Mantener `.trae/specs/` intacto
  - Ejecutar `npx tsc --noEmit` de forma repetitiva resolviendo cada error: imports desactualizados, tipos residuales Next, variables sin usar, imports sin usar, `any` sobrantes
  - Ejecutar `npm run build` (vite build) → resolver warnings de rollup/undefined globals si existieran
  - Ejecutar `GetDiagnostics` IDE para lint/type errors
  - Opcional: ejecutar `npm run dev` brevemente y comprobar consola navegador 0 errores
- **Acceptance Criteria Addressed**: AC-1, AC-10
- **Test Requirements**:
  - `rule` TR-13.1: `npx tsc --noEmit` exit code 0, 0 errores, 0 unused vars/warnings imports
  - `rule` TR-13.2: `npm run build` exit code 0; directorio `dist/` generado; 0 warnings críticos
  - `rubric` TR-13.3: Type safety final escala 1-5; anchors 1=anys residuales, 3=typos menores resueltos, 5=src/ sin `: any`, sin `!` non-null assertions innecesarios, sin unused, strict mode; threshold ≥4. Evidencia: stdout `tsc --noEmit` + `GetDiagnostics` vacío
