import { useState, useCallback } from 'react';
import styles from './Counter.module.css';

/**
 * Componente Counter (Contador)
 * ---------------------------------------------------------------
 * Un componente stateful que demuestra el uso fundamental de React:
 * el Hook `useState` para administrar estado local y cómo cada
 * actualización de estado provoca un re-renderizado del componente.
 *
 * Conceptos clave ilustrados:
 *   1. useState              → Declarar una variable de estado.
 *   2. Función actualizadora → Setter devuelto por useState.
 *   3. Forma funcional       → Actualizar estado basado en el valor previo.
 *   4. Event handlers        → Funciones que responden a clicks de botones.
 *   5. Re-render             → Al cambiar el estado, React vuelve a llamar
 *                               al componente para producir la nueva UI.
 */
const Counter = () => {
  /**
   * ===============================================================
   * 1) DECLARACIÓN DEL ESTADO CON `useState`
   * ===============================================================
   *
   * `useState(initialValue)` retorna una tupla (array de 2 elementos):
   *   [valorActual, funcionParaActualizarlo]
   *
   *    - `count`       : valor actual de la variable de estado.
   *                      En cada render, este valor es el que React
   *                      "recuerda" para este componente.
   *    - `setCount`    : función setter. Al invocarla, React agenda
   *                      una actualización de estado y RE-RENDERIZA
   *                      este componente (y sus hijos) para reflejar
   *                      el nuevo valor en la UI.
   *
   * El valor inicial `0` se usa SOLAMENTE en el MONTADO INICIAL.
   * En renders subsiguientes, `useState` ignora este valor y retorna
   * el valor actual almacenado internamente por React.
   */
  const [count, setCount] = useState<number>(0);

  /**
   * ===============================================================
   * 2) HANDLERS (MANEJADORES DE EVENTOS)
   * ===============================================================
   *
   * Cada handler se encarga de UNA ÚNICA responsabilidad (SRP):
   * actualizar el estado según la acción del usuario.
   *
   * Usamos `useCallback` para memoizar las funciones y evitar
   * re-crearlas en cada render (no es obligatorio, pero es buena
   * práctica en componentes que podrían re-renderizarse seguido).
   * ---------------------------------------------------------------
   */

  /**
   * Incrementar contador en 1.
   *
   * Usamos la FORMA FUNCIONAL del setter: `setCount(prev => prev + 1)`.
   * ¿Por qué?
   *   - Si el nuevo valor depende del valor ANTERIOR, la forma
   *     funcional garantiza que estemos trabajando con la versión
   *     más reciente del estado (incluso si hay actualizaciones
   *     agrupadas/batched por React).
   *   - Si usáramos `setCount(count + 1)`, podríamos tener valores
   *     obsoletos (stale closures) si múltiples actualizaciones
   *     ocurren en el mismo ciclo (ej: llamadas rápidas o en modo
   *     estricto).
   */
  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  /**
   * Decrementar contador en 1.
   * Misma lógica que el incremento pero con resta.
   */
  const handleDecrement = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  /**
   * Reiniciar contador a 0.
   * Como el nuevo valor NO depende del estado previo, podemos pasar
   * el valor literal directamente (no necesitamos la forma funcional).
   */
  const handleReset = useCallback(() => {
    setCount(0);
  }, []);

  /**
   * ===============================================================
   * 3) DETERMINACIÓN DE ESTILOS CONDICIONALES
   * ===============================================================
   *
   * Aplicamos una clase CSS distinta según el valor del contador
   * para dar feedback visual inmediato:
   *   - Positivo  → verde
   *   - Negativo  → naranja
   *   - Cero      → color neutro (definido por el tema)
   */
  const valueModifier =
    count > 0 ? styles.positive : count < 0 ? styles.negative : '';

  /**
   * ===============================================================
   * 4) RENDER (JSX)
   * ===============================================================
   *
   * Cada vez que `setCount` se invoca, React vuelve a ejecutar todo
   * el cuerpo de `Counter` (este archivo), re-evalúa `count` con el
   * nuevo valor y produce este JSX actualizado.
   *
   * React compara (diffing) el nuevo árbol virtual DOM contra el
   * anterior y aplica SOLO los cambios mínimos necesarios al DOM real
   * (en este caso, actualiza el texto del `<span>` que muestra count).
   *
   * Atributos de accesibilidad (a11y):
   *   - `role="region"` + `aria-label` para identificar el widget.
   *   - `aria-live="polite"` en el valor: lectores de pantalla
   *     anunciarán automáticamente los cambios del contador.
   *   - Botones con `aria-label` descriptivos.
   * -----------------------------------------------------------------
   */
  return (
    <section
      className={styles.card}
      role="region"
      aria-label="Contador interactivo"
    >
      {/* Título del card */}
      <header className={styles.header}>
        <h2 className={styles.title}>Contador</h2>
        <p className={styles.subtitle}>
          Explora cómo cambia el estado con cada click.
        </p>
      </header>

      {/* Valor del contador — accesible y con animación al cambiar */}
      <div className={styles.display} aria-live="polite">
        <span className={`${styles.value} ${valueModifier}`}>{count}</span>
      </div>

      {/* Botones de acción */}
      <div className={styles.actions}>
        <button
          type="button"
          onClick={handleDecrement}
          className={`${styles.button} ${styles.buttonDecrement}`}
          aria-label="Decrementar contador en 1"
        >
          <span aria-hidden="true">−</span>
          <span className={styles.buttonLabel}>Decrementar</span>
        </button>

        <button
          type="button"
          onClick={handleReset}
          className={`${styles.button} ${styles.buttonReset}`}
          aria-label="Reiniciar contador a cero"
        >
          <span aria-hidden="true">↺</span>
          <span className={styles.buttonLabel}>Reiniciar</span>
        </button>

        <button
          type="button"
          onClick={handleIncrement}
          className={`${styles.button} ${styles.buttonIncrement}`}
          aria-label="Incrementar contador en 1"
        >
          <span aria-hidden="true">+</span>
          <span className={styles.buttonLabel}>Incrementar</span>
        </button>
      </div>

      {/* Metadata — información educativa sobre el valor actual */}
      <footer className={styles.footer}>
        <span className={styles.hint}>
          {count === 0
            ? 'El contador está en cero.'
            : `Valor actual: ${count > 0 ? '+' : ''}${count}`}
        </span>
      </footer>
    </section>
  );
};

export default Counter;
