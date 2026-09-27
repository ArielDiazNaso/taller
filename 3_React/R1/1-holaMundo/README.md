# 1 · Hola Mundo (React + Vite + TypeScript)

Mini-aplicación de ejemplo que muestra un componente **"Hola, mundo!"** con soporte de **tema claro / oscuro**, diseño responsivo y transiciones suaves.

## Estructura

```
1-holaMundo/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── App.module.css
    ├── main.tsx
    ├── vite-env.d.ts
    ├── components/
    │   ├── HelloWorld/
    │   │   ├── HelloWorld.tsx
    │   │   └── HelloWorld.module.css
    │   └── ThemeToggle/
    │       ├── ThemeToggle.tsx
    │       └── ThemeToggle.module.css
    ├── styles/
    │   └── globals.css
    └── theme/
        └── ThemeContext.tsx
```

## Scripts

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run preview  # previsualizar build
```

## Cómo cambiar de tema

- Haz clic en el botón **Claro / Oscuro** de la esquina superior derecha.
- El tema elegido se guarda en `localStorage` y se mantiene entre recargas.
- Si nunca lo tocaste, se usa la preferencia del sistema (`prefers-color-scheme`).
