import { Link } from 'react-router-dom';

const IconoInicio = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const PaginaNoEncontrada = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 animate-fade-in">
      <div className="text-center max-w-lg px-4">
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-[120px] sm:text-[160px] font-bold leading-none bg-gradient-to-b from-primary-500 via-primary-400 to-primary-200 dark:from-primary-400 dark:via-primary-500 dark:to-primary-700 bg-clip-text text-transparent">
              404
            </h1>
            <div className="absolute -top-4 -right-8 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-amber-400">
                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Página No Encontrada
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
          ¡Ups! La página que buscas no existe o fue movida.
          Vamos a regresarte al camino correcto.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="btn-primary w-full sm:w-auto">
            <IconoInicio />
            Ir al Inicio
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary w-full sm:w-auto"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginaNoEncontrada;
