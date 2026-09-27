import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTareas } from '../context/TaskContext';
import ListaTareas from '../components/Task/TaskList';
import FiltroTareas from '../components/Task/TaskFilter';

const IconoCheckCirculo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-500">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

const IconoReloj = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-amber-500">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
  </svg>
);

const IconoListaPuntos = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary-500">
    <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>
);

const IconoTendencia = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-purple-500">
    <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 01.968-.432l5.942 2.28a.75.75 0 01.104 1.39l-3.176 1.44-.505 1.01a.75.75 0 01-1.32.178L13 8.723l-3.47 6.407a.75.75 0 01-1.025.297l-2.696-1.95a.75.75 0 01.377-1.37l3.025.448L12.577 7l.976-1.953a.75.75 0 011.667.22zM3.75 4.5a.75.75 0 00-1.5 0V12c0 .188.026.371.076.547l1.5 5.25a.75.75 0 101.448-.413L5.32 13.5H16.5a.75.75 0 000-1.5H4.5a4.5 4.5 0 00-.75-.063V4.5z" clipRule="evenodd" />
  </svg>
);

const IconoMas = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const PaginaInicio = () => {
  const { tareas, cargando, obtenerEstadisticas } = useTareas();
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('all');

  const estadisticas = obtenerEstadisticas();

  const tareasFiltradas = useMemo(() => {
    return tareas.filter((tarea) => {
      const coincideBusqueda =
        busqueda === '' ||
        tarea.title.toLowerCase().includes(busqueda.toLowerCase()) ||
        tarea.description.toLowerCase().includes(busqueda.toLowerCase());

      const coincideEstado =
        filtroEstado === 'all' || tarea.status === filtroEstado;

      return coincideBusqueda && coincideEstado;
    });
  }, [tareas, busqueda, filtroEstado]);

  const tarjetasEstadisticas = [
    {
      etiqueta: 'Total Tareas',
      valor: estadisticas.total,
      icono: <IconoListaPuntos />,
      colorFondo: 'bg-primary-50 dark:bg-primary-900/20',
      colorBorde: 'border-primary-100 dark:border-primary-800/50',
    },
    {
      etiqueta: 'Completadas',
      valor: estadisticas.completed,
      icono: <IconoCheckCirculo />,
      colorFondo: 'bg-green-50 dark:bg-green-900/20',
      colorBorde: 'border-green-100 dark:border-green-800/50',
    },
    {
      etiqueta: 'Pendientes',
      valor: estadisticas.pending,
      icono: <IconoReloj />,
      colorFondo: 'bg-amber-50 dark:bg-amber-900/20',
      colorBorde: 'border-amber-100 dark:border-amber-800/50',
    },
    {
      etiqueta: 'Progreso',
      valor: `${estadisticas.completionRate}%`,
      icono: <IconoTendencia />,
      colorFondo: 'bg-purple-50 dark:bg-purple-900/20',
      colorBorde: 'border-purple-100 dark:border-purple-800/50',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Bienvenido a GestorTareas
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gestiona tus tareas de forma eficiente y mantente organizado.
          </p>
        </div>
        <Link to="/create" className="btn-primary sm:ml-auto whitespace-nowrap">
          <IconoMas />
          Crear Nueva Tarea
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {tarjetasEstadisticas.map((est, indice) => (
          <div
            key={est.etiqueta}
            style={{ animationDelay: `${indice * 100}ms` }}
            className={`card p-5 border ${est.colorBorde} animate-slide-up`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`p-2 rounded-lg ${est.colorFondo}`}>
                {est.icono}
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {est.valor}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {est.etiqueta}
            </p>
            {est.etiqueta === 'Progreso' && (
              <div className="mt-3 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${estadisticas.completionRate}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Tus Tareas
            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
              ({tareasFiltradas.length} encontradas)
            </span>
          </h2>
        </div>
        <FiltroTareas
          busqueda={busqueda}
          alCambiarBusqueda={setBusqueda}
          filtroEstado={filtroEstado}
          alCambiarEstado={setFiltroEstado}
        />
        <ListaTareas tareas={tareasFiltradas} cargando={cargando} />
      </div>
    </div>
  );
};

export default PaginaInicio;
