import { Outlet } from 'react-router-dom';
import BarraNavegacion from './Common/Navbar';
import PieDePagina from './Common/Footer';

const DiseñoPagina = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <BarraNavegacion />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 animate-fade-in">
        <Outlet />
      </main>
      <PieDePagina />
    </div>
  );
};

export default DiseñoPagina;
