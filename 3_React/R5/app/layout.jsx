import { Inter } from 'next/font/google';
import '../src/styles/index.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Campus Portal — Sistema de Credenciales y Usuarios',
  description: 'Portal institucional y administrativo de gestión de usuarios con acceso multi-proveedor',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
