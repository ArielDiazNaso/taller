// Este archivo inicializa la aplicación Express, configura el middleware,
// configura el servicio de archivos estáticos y monta el enrutador de alumnos.

const express = require('express');
const app = express();
const PORT = 3002;
const alumnosRouter = require('./routes/alumnos');

// Servimos archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

// Montamos el enrutador de alumnos en el endpoint '/api/alumnos'
app.use('/api/alumnos', alumnosRouter);

// Iniciamos el servidor y escuchamos en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
