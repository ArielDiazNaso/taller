import { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import { tareasEjemplo } from '../data/mockTasks';

const CLAVE_ALMACEN = 'gestortareas_tareas';

const estadoInicial = {
  tareas: [],
  cargando: true,
};

const reductorTareas = (estado, accion) => {
  switch (accion.type) {
    case 'INICIALIZAR_TAREAS': {
      return {
        ...estado,
        tareas: accion.payload,
        cargando: false,
      };
    }

    case 'AGREGAR_TAREA': {
      const nuevaTarea = {
        ...accion.payload,
        id: `tarea-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
      };
      return {
        ...estado,
        tareas: [nuevaTarea, ...estado.tareas],
      };
    }

    case 'ACTUALIZAR_TAREA': {
      return {
        ...estado,
        tareas: estado.tareas.map((tarea) =>
          tarea.id === accion.payload.id
            ? { ...tarea, ...accion.payload.actualizaciones }
            : tarea
        ),
      };
    }

    case 'ELIMINAR_TAREA': {
      return {
        ...estado,
        tareas: estado.tareas.filter((tarea) => tarea.id !== accion.payload),
      };
    }

    case 'ALTERNAR_ESTADO': {
      return {
        ...estado,
        tareas: estado.tareas.map((tarea) =>
          tarea.id === accion.payload
            ? {
                ...tarea,
                status: tarea.status === 'completed' ? 'pending' : 'completed',
              }
            : tarea
        ),
      };
    }

    default:
      return estado;
  }
};

const ContextoTareas = createContext(null);

export const ProveedorTareas = ({ children }) => {
  const [estado, dispatch] = useReducer(reductorTareas, estadoInicial);

  useEffect(() => {
    const cargarTareas = () => {
      try {
        const guardado = localStorage.getItem(CLAVE_ALMACEN);
        if (guardado) {
          const tareasParseadas = JSON.parse(guardado);
          dispatch({ type: 'INICIALIZAR_TAREAS', payload: tareasParseadas });
        } else {
          dispatch({ type: 'INICIALIZAR_TAREAS', payload: tareasEjemplo });
        }
      } catch (error) {
        console.error('Error al cargar las tareas desde localStorage:', error);
        dispatch({ type: 'INICIALIZAR_TAREAS', payload: tareasEjemplo });
      }
    };

    cargarTareas();
  }, []);

  useEffect(() => {
    if (!estado.cargando) {
      try {
        localStorage.setItem(CLAVE_ALMACEN, JSON.stringify(estado.tareas));
      } catch (error) {
        console.error('Error al guardar las tareas en localStorage:', error);
      }
    }
  }, [estado.tareas, estado.cargando]);

  const agregarTarea = useCallback((datosTarea) => {
    dispatch({ type: 'AGREGAR_TAREA', payload: datosTarea });
  }, []);

  const actualizarTarea = useCallback((id, actualizaciones) => {
    dispatch({ type: 'ACTUALIZAR_TAREA', payload: { id, actualizaciones } });
  }, []);

  const eliminarTarea = useCallback((id) => {
    dispatch({ type: 'ELIMINAR_TAREA', payload: id });
  }, []);

  const alternarEstadoTarea = useCallback((id) => {
    dispatch({ type: 'ALTERNAR_ESTADO', payload: id });
  }, []);

  const obtenerTareaPorId = useCallback(
    (id) => {
      return estado.tareas.find((tarea) => tarea.id === id) || null;
    },
    [estado.tareas]
  );

  const obtenerEstadisticas = useCallback(() => {
    const total = estado.tareas.length;
    const completadas = estado.tareas.filter(
      (tarea) => tarea.status === 'completed'
    ).length;
    const pendientes = total - completadas;
    const porcentajeCompletado = total > 0 ? Math.round((completadas / total) * 100) : 0;

    return { total, completed: completadas, pending: pendientes, completionRate: porcentajeCompletado };
  }, [estado.tareas]);

  const valor = {
    tareas: estado.tareas,
    cargando: estado.cargando,
    agregarTarea,
    actualizarTarea,
    eliminarTarea,
    alternarEstadoTarea,
    obtenerTareaPorId,
    obtenerEstadisticas,
  };

  return <ContextoTareas.Provider value={valor}>{children}</ContextoTareas.Provider>;
};

export const useTareas = () => {
  const contexto = useContext(ContextoTareas);
  if (!contexto) {
    throw new Error('useTareas debe usarse dentro de un ProveedorTareas');
  }
  return contexto;
};
