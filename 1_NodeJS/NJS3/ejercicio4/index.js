const express = require('express');
const path = require('path');
const app = express();
const puerto = 3004;

// Servir la carpeta pública
app.use(express.static(path.join(__dirname, 'public')));

app.listen(puerto, () => {
    console.log(`Servidor de Atributos corriendo en http://localhost:${puerto}`);
});