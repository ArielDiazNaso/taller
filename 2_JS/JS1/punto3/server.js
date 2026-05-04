const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal para servir el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor de Registro de Miembros Exclusivos ejecutándose en http://localhost:${PORT}`);
});
