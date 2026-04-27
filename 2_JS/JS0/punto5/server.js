const express = require('express');
const path = require('path');
const app = express();
const PORT = 3005;

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.listen(PORT, () => {
    console.log('Servidor de Punto 5 corriendo en http://localhost:' + PORT);
});
