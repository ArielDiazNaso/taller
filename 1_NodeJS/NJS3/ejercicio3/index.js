const express = require('express');
const path = require('path');
const app = express();
const port = 3003;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Servidor del Ejercicio 3 activo en: http://localhost:${port}`);
});