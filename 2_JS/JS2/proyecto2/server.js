const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const puerto = 10001;

// Asegurar que las carpetas necesarias existen
const carpetaTxt = path.join(__dirname, 'txt');
const carpetaProcesados = path.join(__dirname, 'txt_procesados');

[carpetaTxt, carpetaProcesados].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
});

// Middleware para procesar JSON y archivos estáticos
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal para servir el analizador de datos (página de inicio)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'analisis.html'));
});

// Ruta POST para guardar el reporte procesado en /txt_procesados
app.post('/guardar-procesado', (req, res) => {
    const { nombreArchivo, contenido } = req.body;

    if (!nombreArchivo || !contenido) {
        return res.status(400).json({ mensaje: 'Faltan datos para guardar el archivo' });
    }

    const rutaArchivo = path.join(__dirname, 'txt_procesados', nombreArchivo);

    try {
        fs.writeFileSync(rutaArchivo, contenido, 'utf8');
        console.log(`Reporte procesado guardado: ${nombreArchivo}`);
        res.status(200).json({ mensaje: 'Reporte procesado guardado en el servidor' });
    } catch (error) {
        console.error('Error al guardar el reporte procesado:', error);
        res.status(500).json({ mensaje: 'Error al guardar el reporte procesado' });
    }
});

app.listen(puerto, () => {
    console.log(`Servidor iniciado en http://localhost:${puerto}`);
});
