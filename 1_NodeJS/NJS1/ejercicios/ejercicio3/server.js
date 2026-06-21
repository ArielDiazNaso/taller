import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { obtenerResultado } from './ejercicio3.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const server = createServer(async (req, res) => {
  const { url, method } = req;

  if (url === '/' && method === 'GET') {
    try {
      const filePath = join(__dirname, 'public', 'index.html');
      const content = await readFile(filePath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    } catch (error) {
      console.error('Error sirviendo index.html:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error interno del servidor');
    }
  } else if (url === '/style.css' && method === 'GET') {
    try {
      const filePath = join(__dirname, 'public', 'style.css');
      const content = await readFile(filePath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(content);
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Archivo no encontrado');
    }
  } else if (url === '/app.js' && method === 'GET') {
    try {
      const filePath = join(__dirname, 'public', 'app.js');
      const content = await readFile(filePath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(content);
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Archivo no encontrado');
    }
  } else if (url === '/api/resultado' && method === 'GET') {
    try {
      const data = obtenerResultado();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } catch (error) {
      console.error('Error en el endpoint de la API:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Error al obtener los resultados' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

const PORT = 3003;
const HOST = '127.0.0.1';

server.listen(PORT, HOST, () => {
  console.log(`Servidor ejecutándose en http://${HOST}:${PORT}`);
  console.log('Presiona Ctrl+C para detener el servidor.');
});
