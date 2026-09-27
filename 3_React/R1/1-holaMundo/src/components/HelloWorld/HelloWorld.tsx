/*
 * Componente HelloWorld
 *
 * Muestra el mensaje "Hola, mundo!" como punto focal de la pantalla.
 * Es self-contained: su estilo vive en un CSS Module y no depende de
 * lógica externa más allá del sistema de temas global (variables CSS).
 */
import styles from './HelloWorld.module.css';

const HelloWorld = () => {
  return (
    <section className={styles.card} aria-labelledby="hello-title">
      <h1 id="hello-title" className={styles.title}>
        Hola, mundo!
      </h1>
      <div className={styles.divider} aria-hidden="true" />
      <ul className={styles.featureList}>
        <li className={styles.featureItem}>Tema claro / oscuro</li>
        <li className={styles.featureItem}>100% responsive</li>
        <li className={styles.featureItem}>Transiciones suaves</li>
      </ul>
    </section>
  );
};

export default HelloWorld;
