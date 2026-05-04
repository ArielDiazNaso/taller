const express = require('express');
const path = require('path');
const app = express();
const PORT = 3002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Endpoint simulado para "publicar" noticia (SPA)
 */
app.post('/api/noticias', (req, res) => {
    const noticia = req.body;
    
    // Aquí se podrían hacer validaciones adicionales en el backend
    console.log(`[EDITORIAL CMS] Nueva noticia recibida: "${noticia.titular}" por ${noticia.autor}`);
    
    res.json({ 
        success: true, 
        message: 'Noticia procesada correctamente por el consejo editorial.',
        data: noticia
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`CMS Editorial Elite ejecutándose en http://localhost:${PORT}`);
});
