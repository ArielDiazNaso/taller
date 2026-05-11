const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const puerto = 10000;

// Asegurar que la carpeta 'txt' existe
const carpetaTxt = path.join(__dirname, 'txt');
if (!fs.existsSync(carpetaTxt)) {
    fs.mkdirSync(carpetaTxt);
}

// Middleware para procesar JSON y archivos estáticos
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal para servir el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta POST para guardar los datos del estudiante en un archivo .txt en el servidor
app.post('/guardar', (req, res) => {
    const { nombre, dni, notas } = req.body;

    // Formatear el contenido del archivo de texto
    let contenidoTexto = `REPORTE DE CALIFICACIONES\n`;
    contenidoTexto += `==========================\n`;
    contenidoTexto += `Estudiante: ${nombre}\n`;
    contenidoTexto += `Documento: ${dni}\n`;
    contenidoTexto += `--------------------------\n`;
    contenidoTexto += `Notas:\n`;

    notas.forEach((nota, index) => {
        contenidoTexto += `  - Nota ${index + 1}: ${nota}\n`;
    });

    contenidoTexto += `==========================\n`;
    contenidoTexto += `Fecha de guardado: ${new Date().toLocaleString()}\n`;

    // Definir la ruta del archivo usando el DNI como nombre
    const nombreArchivo = `${dni}.txt`;
    const rutaArchivo = path.join(__dirname, 'txt', nombreArchivo);

    try {
        // Guardar el archivo de forma sincrónica en la carpeta /txt
        fs.writeFileSync(rutaArchivo, contenidoTexto, 'utf8');
        console.log(`Archivo guardado con éxito: ${nombreArchivo}`);
        res.status(200).json({ mensaje: 'Datos guardados correctamente en el servidor' });
    } catch (error) {
        console.error('Error al guardar el archivo:', error);
        res.status(500).json({ mensaje: 'Error interno al guardar los datos' });
    }
});

app.listen(puerto, () => {
    console.log(`Servidor iniciado en http://localhost:${puerto}`);
});
