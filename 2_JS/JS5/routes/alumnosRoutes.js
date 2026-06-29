const express = require('express');
const router = express.Router();
const { obtenerAlumnos, obtenerAlumnoPorId, crearAlumno, actualizarAlumno, eliminarAlumno } = require('../controllers/alumnosController');

router.get('/', obtenerAlumnos);
router.get('/:id', obtenerAlumnoPorId);
router.post('/', crearAlumno);
router.put('/:id', actualizarAlumno);
router.delete('/:id', eliminarAlumno);

module.exports = router;