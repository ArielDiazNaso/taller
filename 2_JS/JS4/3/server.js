// Este archivo inicializa la aplicación Express, configura el middleware,
// configura el servicio de archivos estáticos y monta el enrutador de usuarios.

const express = require('express');
const app = express();
const PORT = 3001;
const usersRouter = require('./routes/users');

// Servimos archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

// Montamos el enrutador de usuarios en el endpoint '/api/users'
app.use('/api/users', usersRouter);

// Iniciamos el servidor y escuchamos en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
