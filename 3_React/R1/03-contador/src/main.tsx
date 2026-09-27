import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './theme/ThemeContext';
import './styles/globals.css';

/**
 * Punto de entrada de la aplicación.
 *
 * Orden de composición (de fuera hacia dentro):
 *   1. <StrictMode>     → Ayuda a detectar problemas en desarrollo
 *                          (doble render intencional en componentes).
 *   2. <ThemeProvider>  → Provee el contexto de tema (light/dark)
 *                          a TODO el árbol de componentes.
 *   3. <App>            → Nuestra app, con <Counter /> dentro.
 */
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container missing in index.html');
}

createRoot(container).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
