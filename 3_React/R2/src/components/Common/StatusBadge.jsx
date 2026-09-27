const EtiquetaEstado = ({ estado }) => {
  const estaCompletada = estado === 'completed';

  const clasesBase =
    'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full transition-all duration-200';

  const clasesEstado = estaCompletada
    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-green-200 dark:ring-green-800'
    : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 ring-1 ring-amber-200 dark:ring-amber-800';

  return (
    <span className={`${clasesBase} ${clasesEstado}`}>
      <span
        className={`w-2 h-2 rounded-full ${
          estaCompletada ? 'bg-green-500 dark:bg-green-400' : 'bg-amber-500 dark:bg-amber-400'
        } animate-pulse`}
      />
      {estaCompletada ? 'Completada' : 'Pendiente'}
    </span>
  );
};

export default EtiquetaEstado;
