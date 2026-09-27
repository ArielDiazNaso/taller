import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTareas } from '../context/TaskContext';

const IconoFlechaIzquierda = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const IconoMas = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const IconoCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconoReloj = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconoExclamacion = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0 mt-0.5">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
  </svg>
);

const PaginaCrearTarea = () => {
  const navegar = useNavigate();
  const { agregarTarea } = useTareas();

  const [datosFormulario, setDatosFormulario] = useState({
    titulo: '',
    descripcion: '',
    estado: 'pending',
  });

  const [errores, setErrores] = useState({
    titulo: '',
    descripcion: '',
  });

  const [tocado, setTocado] = useState({
    titulo: false,
    descripcion: false,
  });

  const validarCampo = (nombreCampo, valor) => {
    switch (nombreCampo) {
      case 'titulo':
        if (!valor.trim()) {
          return 'El título es obligatorio';
        }
        if (valor.trim().length < 3) {
          return 'El título debe tener al menos 3 caracteres';
        }
        if (valor.trim().length > 100) {
          return 'El título debe tener menos de 100 caracteres';
        }
        return '';
      case 'descripcion':
        if (!valor.trim()) {
          return 'La descripción es obligatoria';
        }
        if (valor.trim().length < 10) {
          return 'La descripción debe tener al menos 10 caracteres';
        }
        if (valor.trim().length > 1000) {
          return 'La descripción debe tener menos de 1000 caracteres';
        }
        return '';
      default:
        return '';
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario((anterior) => ({ ...anterior, [name]: value }));
    if (tocado[name]) {
      setErrores((anterior) => ({ ...anterior, [name]: validarCampo(name, value) }));
    }
  };

  const manejarSalida = (e) => {
    const { name, value } = e.target;
    setTocado((anterior) => ({ ...anterior, [name]: true }));
    setErrores((anterior) => ({ ...anterior, [name]: validarCampo(name, value) }));
  };

  const validarTodo = () => {
    const errorTitulo = validarCampo('titulo', datosFormulario.titulo);
    const errorDescripcion = validarCampo('descripcion', datosFormulario.descripcion);
    setErrores({ titulo: errorTitulo, descripcion: errorDescripcion });
    setTocado({ titulo: true, descripcion: true });
    return !errorTitulo && !errorDescripcion;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!validarTodo()) {
      return;
    }

    agregarTarea({
      title: datosFormulario.titulo.trim(),
      description: datosFormulario.descripcion.trim(),
      status: datosFormulario.estado,
    });

    navegar('/', { replace: true });
  };

  const claseErrorInput = (nombreCampo) =>
    tocado[nombreCampo] && errores[nombreCampo]
      ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500'
      : tocado[nombreCampo] && !errores[nombreCampo]
        ? 'border-green-500 dark:border-green-500'
        : '';

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
      >
        <IconoFlechaIzquierda />
        Volver a Todas las Tareas
      </Link>

      <div className="card p-6 sm:p-8 animate-scale-in">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Crear Nueva Tarea
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Completa los detalles a continuación para crear una nueva tarea.
          </p>
        </div>

        <form onSubmit={manejarEnvio} noValidate className="space-y-6">
          <div>
            <label
              htmlFor="titulo"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Título de la Tarea <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={datosFormulario.titulo}
              onChange={manejarCambio}
              onBlur={manejarSalida}
              placeholder="Escribe un título descriptivo para tu tarea..."
              className={`input-field ${claseErrorInput('titulo')}`}
              maxLength={100}
            />
            <div className="mt-2 min-h-[20px]">
              {tocado.titulo && errores.titulo ? (
                <p className="text-sm text-red-500 flex items-start gap-1.5">
                  <IconoExclamacion />
                  {errores.titulo}
                </p>
              ) : tocado.titulo && !errores.titulo ? (
                <p className="text-sm text-green-500 flex items-center gap-1.5">
                  <IconoCheck className="w-4 h-4" />
                  ¡Título correcto!
                </p>
              ) : (
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {datosFormulario.titulo.length}/100 caracteres
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="descripcion"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Descripción <span className="text-red-500">*</span>
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={datosFormulario.descripcion}
              onChange={manejarCambio}
              onBlur={manejarSalida}
              rows={6}
              placeholder="Proporciona información detallada sobre esta tarea, incluyendo pasos, requisitos o cualquier contexto relevante..."
              className={`input-field resize-y min-h-[140px] ${claseErrorInput('descripcion')}`}
              maxLength={1000}
            />
            <div className="mt-2 min-h-[20px]">
              {tocado.descripcion && errores.descripcion ? (
                <p className="text-sm text-red-500 flex items-start gap-1.5">
                  <IconoExclamacion />
                  {errores.descripcion}
                </p>
              ) : tocado.descripcion && !errores.descripcion ? (
                <p className="text-sm text-green-500 flex items-center gap-1.5">
                  <IconoCheck className="w-4 h-4" />
                  ¡Descripción correcta!
                </p>
              ) : (
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {datosFormulario.descripcion.length}/1000 caracteres
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="estado"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Estado Inicial
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setDatosFormulario((anterior) => ({ ...anterior, estado: 'pending' }))}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  datosFormulario.estado === 'pending'
                    ? 'border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-900/20 ring-2 ring-amber-200 dark:ring-amber-800/50'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-3 h-3 rounded-full ${datosFormulario.estado === 'pending' ? 'bg-amber-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                  <span className={`font-semibold ${datosFormulario.estado === 'pending' ? 'text-amber-700 dark:text-amber-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    Pendiente
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 ml-5">
                  <IconoReloj className="w-3.5 h-3.5" />
                  Aún necesita ser realizada
                </p>
              </button>

              <button
                type="button"
                onClick={() => setDatosFormulario((anterior) => ({ ...anterior, estado: 'completed' }))}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  datosFormulario.estado === 'completed'
                    ? 'border-green-400 dark:border-green-500 bg-green-50 dark:bg-green-900/20 ring-2 ring-green-200 dark:ring-green-800/50'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-3 h-3 rounded-full ${datosFormulario.estado === 'completed' ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                  <span className={`font-semibold ${datosFormulario.estado === 'completed' ? 'text-green-700 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    Completada
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 ml-5">
                  <IconoCheck className="w-3.5 h-3.5" />
                  Ya está terminada
                </p>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link to="/" className="btn-secondary sm:order-1">
              Cancelar
            </Link>
            <button
              type="submit"
              className="btn-primary sm:order-2 sm:ml-auto"
            >
              <IconoMas />
              Crear Tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaginaCrearTarea;
