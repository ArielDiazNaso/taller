import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTareas } from '../context/TaskContext';
import EtiquetaEstado from '../components/Common/StatusBadge';

const IconoFlechaIzquierda = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const IconoCalendario = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const IconoNumeral = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
  </svg>
);

const IconoBasura = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const IconoCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const IconoReloj = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const NoEncontradaInline = () => {
  const navegar = useNavigate();
  return (
    <div className="card p-12 text-center animate-fade-in">
      <div className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-red-500 dark:text-red-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Tarea No Encontrada
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
        La tarea que buscas no existe o pudo haber sido eliminada.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button onClick={() => navegar(-1)} className="btn-secondary">
          <IconoFlechaIzquierda />
          Volver
        </button>
        <Link to="/" className="btn-primary">
          Volver a Todas las Tareas
        </Link>
      </div>
    </div>
  );
};

const formatearFechaHora = (fechaISO) => {
  const fecha = new Date(fechaISO);
  return fecha.toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const PaginaDetalleTarea = () => {
  const { id } = useParams();
  const navegar = useNavigate();
  const { obtenerTareaPorId, alternarEstadoTarea, eliminarTarea } = useTareas();
  const tarea = obtenerTareaPorId(id);

  if (!tarea) {
    return <NoEncontradaInline />;
  }

  const manejarEliminar = () => {
    eliminarTarea(tarea.id);
    navegar('/', { replace: true });
  };

  const estaCompletada = tarea.status === 'completed';

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
      >
        <IconoFlechaIzquierda />
        Volver a Todas las Tareas
      </Link>

      <div className="card p-6 sm:p-8 animate-scale-in">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <EtiquetaEstado estado={tarea.status} />
            </div>
            <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${
              estaCompletada
                ? 'text-gray-400 dark:text-gray-500 line-through'
                : 'text-gray-900 dark:text-white'
            }`}>
              {tarea.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <div className="flex items-center gap-3 text-sm">
            <span className="p-2 bg-white dark:bg-gray-800 rounded-lg text-gray-400 dark:text-gray-500">
              <IconoNumeral />
            </span>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider mb-0.5">ID de Tarea</p>
              <p className="text-gray-900 dark:text-gray-200 font-mono">{tarea.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="p-2 bg-white dark:bg-gray-800 rounded-lg text-gray-400 dark:text-gray-500">
              <IconoCalendario />
            </span>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider mb-0.5">Creada el</p>
              <p className="text-gray-900 dark:text-gray-200">{formatearFechaHora(tarea.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Descripción
          </h2>
          <div className={`text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap p-5 bg-gray-50 dark:bg-gray-700/30 rounded-xl ${
            estaCompletada ? 'text-gray-400 dark:text-gray-500 line-through' : ''
          }`}>
            {tarea.description}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => alternarEstadoTarea(tarea.id)}
            className={estaCompletada ? 'btn-secondary' : 'btn-success'}
          >
            {estaCompletada ? (
              <>
                <IconoReloj />
                Marcar como Pendiente
              </>
            ) : (
              <>
                <IconoCheck />
                Marcar como Completada
              </>
            )}
          </button>
          <button onClick={manejarEliminar} className="btn-danger">
            <IconoBasura />
            Eliminar Tarea
          </button>
          <div className="sm:ml-auto">
            <button onClick={() => navegar(-1)} className="btn-secondary">
              <IconoFlechaIzquierda />
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginaDetalleTarea;
