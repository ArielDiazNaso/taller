import { Link, NavLink, useLocation } from 'react-router-dom';
import BotonTema from './ThemeToggle';

const IconoCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-7 h-7"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const IconoLista = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const IconoMas = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const BarraNavegacion = () => {
  const ubicacion = useLocation();

  const claseLinkNav = ({ isActive }) =>
    `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${
      isActive
        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
    }`;

  const esPaginaCrear = ubicacion.pathname === '/create';

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-1.5 bg-primary-600 text-white rounded-xl group-hover:scale-110 transition-transform duration-200">
              <IconoCheck />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              GestorTareas
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={claseLinkNav}>
              <IconoLista />
              Todas las Tareas
            </NavLink>
            {!esPaginaCrear && (
              <Link to="/create" className="btn-primary ml-2">
                <IconoMas />
                Nueva Tarea
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            <BotonTema />
            {esPaginaCrear ? null : (
              <Link
                to="/create"
                className="md:hidden p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                aria-label="Crear nueva tarea"
              >
                <IconoMas />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BarraNavegacion;
