const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const alumnosRoutes = require('./routes/alumnosRoutes');
app.use('/api/alumnos', alumnosRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`API disponible en http://localhost:${PORT}/api/alumnos`);
  console.log(`Página web disponible en http://localhost:${PORT}`);
});