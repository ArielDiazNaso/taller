// Este archivo define las rutas de la API de usuarios y obtiene datos desde una API pública.
// Exporta un enrutador Express que se puede montar en el archivo principal del servidor.

const express = require('express');
const router = express.Router();

// Ruta GET para obtener usuarios desde la API pública de JSONPlaceholder
router.get('/', async (req, res) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

module.exports = router;
