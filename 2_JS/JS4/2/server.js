const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para parsear peticiones con cuerpo JSON
app.use(express.json());

// Servimos archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta POST para manejar el envío de datos del usuario
app.post('/api/users', (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Generamos un ID único simple (usamos la marca de tiempo para propósitos de demostración)
    const uniqueId = Date.now().toString();
    
    // Enviamos una respuesta exitosa
    res.json({
      id: uniqueId,
      success: true
    });
  } catch (error) {
    // Manejamos los errores
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
