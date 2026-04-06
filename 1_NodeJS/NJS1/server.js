import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Importación de los ejercicios (asegurando el uso de .js para ES Modules)
import { obtenerResultadoEj1 } from './ejercicios/ejercicio1.js';
import { obtenerResultadoEj2 } from './ejercicios/ejercicio2.js';
import { obtenerResultadoEj3 } from './ejercicios/ejercicio3.js';
import { obtenerResultadoEj4 } from './ejercicios/ejercicio4.js';

/**
 * Obtiene la ruta del directorio actual (equivalente a __dirname en CommonJS).
 */
const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * Servidor HTTP básico utilizando node:http.
 * Implementa enrutamiento manual para servir el frontend y la API JSON.
 */
const server = createServer(async (req, res) => {
    const { url, method } = req;

    console.log(`Petición recibida: ${method} ${url}`);

    // --- ENRUTAMIENTO ---

    // Ruta raíz: Sirve el archivo index.html
    if (url === '/' && method === 'GET') {
        try {
            const filePath = join(__dirname, 'index.html');
            const content = await readFile(filePath, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        } catch (error) {
            console.error('Error sirviendo index.html:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error interno del servidor');
        }
    } 
    
    // Servir archivos estáticos (CSS y JS)
    else if (url === '/style.css' && method === 'GET') {
        try {
            const filePath = join(__dirname, 'style.css');
            const content = await readFile(filePath, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(content);
        } catch (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Archivo no encontrado');
        }
    }
    else if (url === '/script.js' && method === 'GET') {
        try {
            const filePath = join(__dirname, 'script.js');
            const content = await readFile(filePath, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(content);
        } catch (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Archivo no encontrado');
        }
    }
    
    // API Endpoint: Retorna los resultados de todos los ejercicios estructurados
    else if (url === '/api/ejercicios' && method === 'GET') {
        try {
            const data = {
                ex1: obtenerResultadoEj1(),
                ex2: obtenerResultadoEj2(),
                ex3: obtenerResultadoEj3(),
                ex4: obtenerResultadoEj4()
            };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } catch (error) {
            console.error('Error en el endpoint de la API:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error al obtener los resultados' }));
        }
    } 
    
    // Ruta por defecto: 404 Not Found
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Configuración del puerto y dirección del servidor
const PORT = 3000;
const HOST = '127.0.0.1';

server.listen(PORT, HOST, () => {
    console.log(`Servidor ejecutándose en http://${HOST}:${PORT}`);
    console.log('Presiona Ctrl+C para detener el servidor.');
});

