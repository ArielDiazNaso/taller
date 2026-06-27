const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 30000;

// Servimos archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

const PUBLIC_API_URL = 'https://jsonplaceholder.typicode.com/users';

// Definimos la ruta GET para obtener los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const response = await fetch(PUBLIC_API_URL);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// Iniciamos el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
