import { useTheme } from '../../theme/ThemeContext';
import styles from './ThemeToggle.module.css';

/**
 * ThemeToggle
 * ---------------------------------------------------------------
 * Botón atómico tipo "switch" para alternar entre tema claro y oscuro.
 *
 * - Utiliza `useTheme()` (Context API) para leer el tema actual y
 *   disparar `toggleTheme` cuando el usuario hace click.
 * - Accesible: `role="switch"` + `aria-checked` para lectores de pantalla.
 * - Responsive: en móviles se oculta el texto y queda solo el track.
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={styles.toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}
      title={`Tema ${isDark ? 'oscuro' : 'claro'} activo`}
    >
      <span className={styles.track} aria-hidden="true">
        <span
          className={`${styles.thumb} ${isDark ? styles.thumbDark : ''}`}
          aria-hidden="true"
        >
          <span className={styles.icon}>{isDark ? '🌙' : '☀️'}</span>
        </span>
      </span>
      <span className={styles.label}>{isDark ? 'Oscuro' : 'Claro'}</span>
    </button>
  );
};

export default ThemeToggle;
