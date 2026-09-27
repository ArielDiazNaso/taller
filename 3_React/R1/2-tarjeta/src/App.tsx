/**
 * App.tsx
 *
 * Componente raíz de la aplicación.
 *
 * Propósito:
 *   Renderiza una única tarjeta ProfileCard centrada en pantalla
 *   con los datos de ejemplo:
 *     - firstName  : "Ariel"
 *     - lastName   : ""  (opcional, string vacío según requerimientos)
 *     - profession : "Estudiante"
 *     - avatarUrl  : Imagen pública de N'Golo Kanté (futbolista francés)
 *
 * Estructura del layout:
 *   - Un <main> centrado vertical y horizontalmente con Flexbox.
 *   - Dentro, una única instancia de <ProfileCard /> con las props exactas.
 *   - El tema (Light/Dark) se gestiona vía ThemeContext (ver main.tsx).
 */

import ProfileCard from './components/molecules/ProfileCard/ProfileCard';
import { useTheme } from './theme/ThemeContext';
import styles from './App.module.css';

/**
 * URL de una imagen de árbol (Unsplash, uso libre).
 * Se usa una URL de placeholder estable.
 * Nota: En producción, esto vendría de una API / base de datos; aquí está
 * hardcodeada solo como dato de ejemplo.
 */
const TREE_AVATAR_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYMuRhqJ2Jys0ab3WFp1Hg4D_DNfMKH7WDCgEU797lGEP6-kesOiAKqFCJe_KiBweUHhOmVInrVoA0ZHTzHWkp6GlbZhUKBT0Q_QwuZEyG&s=10';

const App = () => {
  // Hook del contexto de tema — nos permite exponer un botón de toggle.
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.app}>
      {/* ============= BOTÓN DE CAMBIO DE TEMA =============
          Posicionado de forma fija en la esquina superior derecha.
          Permite alternar entre Light y Dark mode sin recargar. */}
      <button
        type="button"
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
        title={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
      >
        {/* Icono: ☀ en dark, ☾ en light */}
        <span aria-hidden="true">{theme === 'light' ? '🌙' : '☀️'}</span>
      </button>

      {/* ============= CONTENIDO PRINCIPAL =============
          <main> con role=main implícito. Centra la tarjeta tanto
          horizontal como verticalmente ocupando todo el viewport. */}
      <main className={styles.main}>
        <ProfileCard
          firstName="Ariel diaz naso"
          lastName=""
          profession="Estudiante"
          avatarUrl={TREE_AVATAR_URL}
        />
      </main>
    </div>
  );
};

export default App;
