// Este archivo define las rutas de la API de alumnos y contiene los datos de prueba.
// Exporta un enrutador Express que se puede montar en el archivo principal del servidor.

const express = require('express');
const router = express.Router();

// Conjunto de datos de prueba de alumnos (simulando una base de datos)
const alumnos = [
  { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', course: 'JavaScript', status: 'Activo' },
  { id: 2, name: 'María Gómez', email: 'maria.gomez@example.com', course: 'React', status: 'Activo' },
  { id: 3, name: 'Carlos López', email: 'carlos.lopez@example.com', course: 'Node.js', status: 'Inactivo' },
  { id: 4, name: 'Ana Martínez', email: 'ana.martinez@example.com', course: 'Python', status: 'Activo' },
  { id: 5, name: 'Luis Rodríguez', email: 'luis.rodriguez@example.com', course: 'Java', status: 'Inactivo' },
  { id: 6, name: 'Sofía Hernández', email: 'sofia.hernandez@example.com', course: 'CSS', status: 'Activo' }
];

// Ruta GET para devolver todos los alumnos en formato JSON
router.get('/', (req, res) => {
  res.json(alumnos);
});

module.exports = router;
