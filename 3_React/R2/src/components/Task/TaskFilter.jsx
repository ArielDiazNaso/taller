const IconoBuscar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const IconoFiltro = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
  </svg>
);

const FiltroTareas = ({ busqueda, alCambiarBusqueda, filtroEstado, alCambiarEstado }) => {
  const opcionesEstado = [
    { valor: 'all', etiqueta: 'Todas' },
    { valor: 'pending', etiqueta: 'Pendientes' },
    { valor: 'completed', etiqueta: 'Completadas' },
  ];

  return (
    <div className="card p-4 mb-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
            <IconoBuscar />
          </div>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => alCambiarBusqueda(e.target.value)}
            placeholder="Buscar tareas por título o descripción..."
            className="input-field pl-10 pr-10"
          />
          {busqueda && (
            <button
              onClick={() => alCambiarBusqueda('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 mr-1">
            <IconoFiltro />
            <span className="text-sm font-medium hidden sm:inline">Estado:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg">
            {opcionesEstado.map((opcion) => {
              const estaActivo = filtroEstado === opcion.valor;
              return (
                <button
                  key={opcion.valor}
                  onClick={() => alCambiarEstado(opcion.valor)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                    estaActivo
                      ? 'bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {opcion.etiqueta}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltroTareas;
