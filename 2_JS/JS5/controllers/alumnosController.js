// Importa la conexión a la base de datos y la función de validación
const pool = require('../database/config');
const { validarAlumno } = require('../utils/validation');

// ================================
// FUNCIONES DEL CONTROLADOR
// ================================

// Obtiene todos los alumnos de la base de datos
const obtenerAlumnos = async (req, res) => {
  try {
    // Obtiene una conexión del pool
    const connection = await pool.getConnection();
    // Selecciona la base de datos
    await connection.query(`USE ${process.env.DB_NAME}`);
    // Ejecuta la consulta SELECT para obtener todos los alumnos
    const [rows] = await connection.query('SELECT * FROM alumnos');
    // Libera la conexión para que la pueda usar otro proceso
    connection.release();
    // Devuelve los alumnos como respuesta en formato JSON
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener alumnos:', error);
    res.status(500).json({ error: 'Error al obtener alumnos' });
  }
};

// Obtiene un solo alumno por su ID
const obtenerAlumnoPorId = async (req, res) => {
  try {
    // Obtiene el ID desde los parámetros de la URL
    const { id } = req.params;
    const connection = await pool.getConnection();
    await connection.query(`USE ${process.env.DB_NAME}`);
    // Consulta el alumno con el ID especificado
    const [rows] = await connection.query('SELECT * FROM alumnos WHERE id = ?', [id]);
    connection.release();
    
    // Si no se encontró ningún alumno con ese ID
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    
    // Devuelve el primer (y único) alumno encontrado
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener alumno:', error);
    res.status(500).json({ error: 'Error al obtener alumno' });
  }
};

// Crea un nuevo alumno en la base de datos
const crearAlumno = async (req, res) => {
  try {
    // Valida los datos del nuevo alumno
    const validacion = await validarAlumno(req.body);
    
    // Si la validación falla, devuelve un error
    if (!validacion.valido) {
      return res.status(400).json({ error: validacion.mensaje });
    }

    // Obtiene los datos validados
    const { nombre, apellido, edad } = validacion.datos;
    const connection = await pool.getConnection();
    await connection.query(`USE ${process.env.DB_NAME}`);
    // Inserta el nuevo alumno en la base de datos
    const [result] = await connection.query(
      'INSERT INTO alumnos (nombre, apellido, edad) VALUES (?, ?, ?)',
      [nombre, apellido, edad]
    );
    connection.release();
    
    // Devuelve el alumno creado con su nuevo ID
    res.status(201).json({
      id: result.insertId, // El ID generado automáticamente
      nombre,
      apellido,
      edad
    });
  } catch (error) {
    console.error('Error al crear alumno:', error);
    res.status(500).json({ error: 'Error al crear alumno' });
  }
};

// Actualiza los datos de un alumno existente
const actualizarAlumno = async (req, res) => {
    console.log('=== actualizarAlumno called ===');
    console.log('Request params:', req.params);
    console.log('Request body:', req.body);
    
    try {
        // Obtiene el ID del alumno a actualizar desde la URL
        const { id } = req.params;
        console.log('Validating alumno data...');
        // Valida los datos (excluye el alumno actual al verificar duplicados)
        const validacion = await validarAlumno(req.body, parseInt(id));
        console.log('Validation result:', validacion);

        if (!validacion.valido) {
            return res.status(400).json({ error: validacion.mensaje });
        }

        const { nombre, apellido, edad } = validacion.datos;
        console.log('Getting database connection...');
        const connection = await pool.getConnection();
        console.log('Using database:', process.env.DB_NAME);
        await connection.query(`USE ${process.env.DB_NAME}`);
        console.log('Executing UPDATE query...');
        // Actualiza el alumno en la base de datos
        const [result] = await connection.query(
            'UPDATE alumnos SET nombre = ?, apellido = ?, edad = ? WHERE id = ?',
            [nombre, apellido, edad, id]
        );
        console.log('UPDATE result:', result);
        connection.release();

        // Si no se modificó ninguna fila (alumno no existe)
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Alumno no encontrado' });
        }

        // Devuelve el alumno actualizado
        res.json({
            id: parseInt(id),
            nombre,
            apellido,
            edad
        });
    } catch (error) {
        console.error('Error al actualizar alumno:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: `Error al actualizar alumno: ${error.message}` });
    }
};

// Elimina un alumno de la base de datos
const eliminarAlumno = async (req, res) => {
  try {
    // Obtiene el ID del alumno a eliminar desde la URL
    const { id } = req.params;
    const connection = await pool.getConnection();
    await connection.query(`USE ${process.env.DB_NAME}`);
    // Ejecuta la consulta DELETE
    const [result] = await connection.query('DELETE FROM alumnos WHERE id = ?', [id]);
    connection.release();
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    
    // Devuelve un mensaje de éxito
    res.json({ mensaje: 'Alumno eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar alumno:', error);
    res.status(500).json({ error: 'Error al eliminar alumno' });
  }
};

// Exporta todas las funciones para que puedan ser usadas en las rutas
module.exports = {
  obtenerAlumnos,
  obtenerAlumnoPorId,
  crearAlumno,
  actualizarAlumno,
  eliminarAlumno
};