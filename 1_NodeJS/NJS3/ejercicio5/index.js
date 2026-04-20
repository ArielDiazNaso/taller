const express = require('express');
const path = require('path');
const app = express();
const puerto = 3005;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(puerto, () => {
    console.log(`Servidor InnerHTML corriendo en http://localhost:${puerto}`);
});