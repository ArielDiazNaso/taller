import HelloWorld from './components/HelloWorld/HelloWorld';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.app}>
      <ThemeToggle />
      <main className={styles.main}>
        <HelloWorld />
      </main>
    </div>
  );
};

export default App;
