import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProveedorTareas } from './context/TaskContext';
import DiseñoPagina from './components/Layout';
import PaginaInicio from './pages/HomePage';
import PaginaDetalleTarea from './pages/TaskDetailPage';
import PaginaCrearTarea from './pages/CreateTaskPage';
import PaginaNoEncontrada from './pages/NotFoundPage';

const Aplicacion = () => {
  return (
    <BrowserRouter>
      <ProveedorTareas>
        <Routes>
          <Route path="/" element={<DiseñoPagina />}>
            <Route index element={<PaginaInicio />} />
            <Route path="task/:id" element={<PaginaDetalleTarea />} />
            <Route path="create" element={<PaginaCrearTarea />} />
            <Route path="*" element={<PaginaNoEncontrada />} />
          </Route>
        </Routes>
      </ProveedorTareas>
    </BrowserRouter>
  );
};

export default Aplicacion;
