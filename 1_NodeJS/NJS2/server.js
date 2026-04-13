/**
 * server.js
 * Servidor principal de Telefe Clima - Dashboard Meteorológico.
 * Arquitectura: Server-Side Rendering (SSR) y Manejo de Archivos Estáticos.
 */

// --- MÓDULOS NATIVOS ---
const http = require('http'); // Para crear el servidor HTTP
const fs = require('fs');     // Para interactuar con el sistema de archivos
const url = require('url');    // Para analizar las URLs de las solicitudes
const path = require('path');  // Para manejar rutas de archivos de forma segura

// --- PAQUETES NPM ---
const uc = require('upper-case'); // Para transformar texto a mayúsculas

// --- MÓDULOS PERSONALIZADOS ---
const weatherTools = require('./modules/weatherTools');
const timeModule = require('./modules/timeModule');
const uiComponents = require('./modules/uiComponents');
const uvIndex = require('./modules/uvIndex');

// Configuración del servidor
const PORT = 3000;
const HOST = '127.0.0.1';

// Datos meteorológicos de ejemplo (Mock Data)
const weatherData = {
    temp: 22,
    humidity: 65,
    pressure: 1013,
    windSpeed: 45,
    windDirection: 'Noroeste (NW)',
    uvIntensity: 9
};

/**
 * Lógica principal del servidor HTTP.
 */
const server = http.createServer((req, res) => {
    // 1. Análisis de URL (Requerimiento 3)
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const search = parsedUrl.search || 'ninguno';

    // Registro de solicitudes en la consola
    console.log(`[HOST]: ${req.headers.host} | [PATH]: ${pathname} | [QUERY]: ${search} | [METHOD]: ${req.method}`);

    // --- MANEJO DE ARCHIVOS ESTÁTICOS (CSS) ---
    // Si la ruta comienza con /assets/, servimos el archivo directamente.
    if (pathname.startsWith('/assets/')) {
        const staticFilePath = path.join(__dirname, pathname);
        
        fs.readFile(staticFilePath, (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Archivo estático no encontrado');
                return;
            }
            
            /**
             * IMPORTANTE: Content-Type: text/css
             * Es obligatorio indicar al navegador que este archivo es una hoja de estilos.
             * Sin esta cabecera, el navegador lo tratará como texto plano y no aplicará el diseño.
             */
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(content);
        });
        return; // Salimos de la función para no ejecutar el enrutamiento de páginas
    }

    // 2. Enrutamiento de Páginas (Requerimiento 2)
    let fileName = '';
    switch (pathname) {
        case '/': fileName = 'index.html'; break;
        case '/forecast': fileName = 'forecast.html'; break;
        case '/wind': fileName = 'wind.html'; break;
        case '/climate': fileName = 'climate.html'; break;
        case '/safety': fileName = 'safety.html'; break;
        case '/health': fileName = 'health.html'; break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1 style="text-align:center; margin-top:50px; font-family:sans-serif; color:#005595;">404 - Telefe Clima: Página No Encontrada</h1>');
            return;
    }

    const filePath = path.join(__dirname, 'pages', fileName);

    // 3. Sistema de Archivos y SSR (Requerimientos 2, 4 y 5)
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(`Error de lectura en ${filePath}:`, err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error Interno del Servidor Telefe Clima');
            return;
        }

        // Inyección del Navbar
        let htmlResponse = data.replace('<menu-placeholder></menu-placeholder>', uiComponents.getNavbar());
        
        // Inyección del tiempo del servidor (SSR)
        const serverTime = timeModule.getCurrentServerTime();
        htmlResponse = htmlResponse.replace(/{{SERVER_TIME}}/g, `Hora oficial: ${serverTime}`);

        // Lógica de inyección dinámica específica por página
        if (fileName === 'index.html') {
            htmlResponse = htmlResponse
                .replace('{{CURRENT_TEMP}}', `${weatherData.temp}°C`)
                .replace('{{CURRENT_HUMIDITY}}', `${weatherData.humidity}%`)
                .replace('{{WIND_DIRECTION}}', weatherData.windDirection)
                .replace('{{WIND_SPEED}}', `${weatherData.windSpeed} km/h`)
                .replace('{{CURRENT_PRESSURE}}', `${weatherData.pressure} hPa`);
        } 
        else if (fileName === 'wind.html') {
            const windChill = weatherTools.calculateWindChill(5, weatherData.windSpeed);
            const windChillFormatted = windChill.toFixed(1) + '°C';
            
            htmlResponse = htmlResponse
                .replace('{{WIND_SPEED}}', `${weatherData.windSpeed} km/h`)
                .replace('{{WIND_DIRECTION}}', weatherData.windDirection)
                .replace('{{WEATHER_RESULT}}', windChillFormatted);
            
            const alertTitle = uc.upperCase('Alerta Meteorológica: Vientos Fuertes');
            htmlResponse = htmlResponse.replace('ALERTA DE VIENTO', alertTitle);
        }
        else if (fileName === 'health.html') {
            const uvInfo = uvIndex.getUVInfo(weatherData.uvIntensity);
            const levelUpper = uc.upperCase(uvInfo.level);
            
            htmlResponse = htmlResponse
                .replace('{{UV_INTENSITY}}', weatherData.uvIntensity)
                .replace('{{UV_LEVEL}}', levelUpper)
                .replace('{{UV_ADVICE}}', uvInfo.recommendation)
                .replace(/{{UV_COLOR}}/g, uvInfo.color);
        }

        // Envío del HTML final
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlResponse);
    });
});

server.listen(PORT, HOST, () => {
    console.log(`\n==================================================`);
    console.log(`Telefe Clima - Servidor SSR Activo en http://${HOST}:${PORT}`);
    console.log(`==================================================\n`);
});
