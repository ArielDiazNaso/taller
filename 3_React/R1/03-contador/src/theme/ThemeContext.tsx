import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';

/**
 * Tema disponible: claro u oscuro.
 * Se persiste en localStorage y se detecta la preferencia del sistema operativo.
 */
export type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const STORAGE_KEY = 'counter-app-theme';

/**
 * Contexto React que permite a cualquier componente consumir o cambiar el tema actual.
 * El Provider aplica un atributo `data-theme` en el <html> para que las CSS variables
 * se activen por tema.
 */
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Determina el tema inicial siguiendo este orden de prioridad:
 *   1. Valor guardado en localStorage (si existe y es válido).
 *   2. Preferencia del sistema (`prefers-color-scheme: dark).
 *   3. Fallback: light.
 */
const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* localStorage no disponible (modo privado, etc.), continuar al fallback.
     * El error se silencia intencionalmente porque no afecta la UX.
     */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Provider que envuelve la app y hace disponible el tema a todos los componentes hijos.
 * - Mantiene el estado del tema, lo persiste y sincroniza el atributo data-theme
 *   en el elemento <html> para que se activen las CSS variables.
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  /**
   * Efecto secundario: cada vez que `theme` cambia,
   *   1. Actualiza el atributo `data-theme` en <html> -> las CSS variables toman efecto.
   *   2. Guarda la preferencia en localStorage para la próxima visita.
   */
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* Sin permisos de almacenamiento: no rompemos la app por esto.
       */
    }
  }, [theme]);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const toggleTheme = useCallback(
    () => setThemeState((prev) => (prev === 'light' ? 'dark' : 'light')),
    []
  );

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

/**
 * Hook personalizado para consumir el contexto de tema.
 * Lanza un error si se usa fuera del <ThemeProvider>.
 */
export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside a ThemeProvider');
  return ctx;
};
