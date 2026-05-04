const express = require('express');
const path = require('path');
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');

const app = express();
const PORT = 30000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Ruta de Suscripción con Validación Estricta en el Backend
 */
app.post('/subscribe', [
    // Validación de campos no vacíos y formato de email estricto
    body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
    body('apellido').trim().notEmpty().withMessage('El apellido es obligatorio'),
    body('email').trim().isEmail().withMessage('Formato de correo electrónico inválido')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).withMessage('Debe ser un correo válido (ej: usuario@dominio.com)')
], (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false, 
            errors: errors.array() 
        });
    }

    const { nombre, apellido, email } = req.body;
    
    // Log de suscripción exitosa en el servidor
    console.log(`[SUSCRIPCIÓN EXITOSA] Miembro: ${nombre} ${apellido} | Email: ${email}`);

    res.json({ 
        success: true, 
        message: 'Suscripción procesada con éxito. Bienvenido al Círculo Elite.' 
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor de Suscripción Premium ejecutándose en http://localhost:${PORT}`);
});
