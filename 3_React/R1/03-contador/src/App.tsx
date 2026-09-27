/**
 * App.tsx — Componente raíz de la aplicación.
 *
 * Se encarga de:
 *   1. Renderizar el interruptor de tema (ThemeToggle) en la esquina.
 *   2. Centrar el componente Counter como contenido principal.
 *   3. Mostrar un footer pequeño con información.
 *
 * Ejemplo de USO del componente <Counter />:
 *   Simplemente se importa y se coloca en cualquier árbol JSX.
 *   <Counter /> no recibe props; su estado es interno y autónomo.
 */
import Counter from './components/Counter/Counter';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.app}>
      <ThemeToggle />

      <main className={styles.main}>
        {/* Counter es autocontenido: todo su estado vive dentro vía useState */}
        <Counter />
      </main>

      <footer className={styles.footer}>
        Contador React · useState · Vite + TypeScript
      </footer>
    </div>
  );
};

export default App;
