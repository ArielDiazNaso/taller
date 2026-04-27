const express = require('express');
const path = require('path');
const app = express();
const PORT = 3012;

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.listen(PORT, () => {
    console.log('Servidor de Punto 12 corriendo en http://localhost:' + PORT);
});
