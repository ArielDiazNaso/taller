import { Link } from 'react-router-dom';
import EtiquetaEstado from '../Common/StatusBadge';
import { useTareas } from '../../context/TaskContext';

const IconoCalendario = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const IconoFlechaDerecha = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const formatearFecha = (fechaISO) => {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const TarjetaTarea = ({ tarea }) => {
  const { alternarEstadoTarea } = useTareas();
  const estaCompletada = tarea.status === 'completed';

  const manejarAlternar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alternarEstadoTarea(tarea.id);
  };

  return (
    <Link
      to={`/task/${tarea.id}`}
      className="card card-hover p-5 group animate-fade-in block"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <button
            onClick={manejarAlternar}
            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 ${
              estaCompletada
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 dark:border-gray-500 hover:border-primary-500 dark:hover:border-primary-400'
            }`}
            aria-label={estaCompletada ? 'Marcar como pendiente' : 'Marcar como completada'}
          >
            {estaCompletada && (
              <svg className="w-full h-full p-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <div className="min-w-0 flex-1">
            <h3
              className={`text-base font-semibold mb-1 transition-all duration-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 ${
                estaCompletada ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-gray-100'
              }`}
            >
              {tarea.title}
            </h3>
          </div>
        </div>
        <EtiquetaEstado estado={tarea.status} />
      </div>

      <p
        className={`text-sm line-clamp-2 mb-4 ml-8 ${
          estaCompletada
            ? 'text-gray-400 dark:text-gray-500 line-through'
            : 'text-gray-600 dark:text-gray-400'
        }`}
      >
        {tarea.description}
      </p>

      <div className="flex items-center justify-between ml-8 pt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
          <IconoCalendario />
          <span>{formatearFecha(tarea.createdAt)}</span>
        </div>
        <span className="flex items-center gap-1 text-xs font-medium text-primary-600 dark:text-primary-400 group-hover:gap-2 transition-all duration-200">
          Ver Detalles
          <IconoFlechaDerecha />
        </span>
      </div>
    </Link>
  );
};

export default TarjetaTarea;
