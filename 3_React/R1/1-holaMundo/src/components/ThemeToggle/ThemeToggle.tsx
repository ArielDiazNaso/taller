/*
 * ThemeToggle
 *
 * Interruptor atómico para cambiar entre tema claro y oscuro.
 * Única responsabilidad: renderizar el botón y delegar el cambio real
 * al hook useTheme (Context API). Soporta teclado y accesibilidad (aria-*).
 */
import { useTheme } from '../../theme/ThemeContext';
import styles from './ThemeToggle.module.css';

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
