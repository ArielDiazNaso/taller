const pool = require('../database/config');

const sanitizarString = (str) => {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
};

const validarNombre = (nombre) => {
  if (!nombre || typeof nombre !== 'string') {
    return { valido: false, mensaje: 'El nombre es obligatorio y debe ser texto' };
  }
  const nombreSanitizado = sanitizarString(nombre);
  if (nombreSanitizado.length < 2 || nombreSanitizado.length > 100) {
    return { valido: false, mensaje: 'El nombre debe tener entre 2 y 100 caracteres' };
  }
  return { valido: true, valor: nombreSanitizado };
};

const validarApellido = (apellido) => {
  if (!apellido || typeof apellido !== 'string') {
    return { valido: false, mensaje: 'El apellido es obligatorio y debe ser texto' };
  }
  const apellidoSanitizado = sanitizarString(apellido);
  if (apellidoSanitizado.length < 2 || apellidoSanitizado.length > 100) {
    return { valido: false, mensaje: 'El apellido debe tener entre 2 y 100 caracteres' };
  }
  return { valido: true, valor: apellidoSanitizado };
};

const validarEdad = (edad) => {
  const edadNum = parseInt(edad);
  if (isNaN(edadNum) || edadNum < 1 || edadNum > 120) {
    return { valido: false, mensaje: 'La edad debe ser un número entre 1 y 120' };
  }
  return { valido: true, valor: edadNum };
};

const verificarDuplicado = async (nombre, apellido, excludeId = null) => {
  try {
    const connection = await pool.getConnection();
    await connection.query(`USE ${process.env.DB_NAME}`);
    
    let query = 'SELECT id FROM alumnos WHERE nombre = ? AND apellido = ?';
    const params = [nombre, apellido];
    
    if (excludeId) {
      query += ' AND id != ?';
      params.push(excludeId);
    }
    
    const [rows] = await connection.query(query, params);
    connection.release();
    
    return rows.length > 0;
  } catch (error) {
    console.error('Error al verificar duplicado:', error);
    throw error;
  }
};

const validarAlumno = async (datos, excludeId = null) => {
  const { nombre, apellido, edad } = datos;
  
  const validacionNombre = validarNombre(nombre);
  if (!validacionNombre.valido) {
    return validacionNombre;
  }
  
  const validacionApellido = validarApellido(apellido);
  if (!validacionApellido.valido) {
    return validacionApellido;
  }
  
  const validacionEdad = validarEdad(edad);
  if (!validacionEdad.valido) {
    return validacionEdad;
  }
  
  const esDuplicado = await verificarDuplicado(
    validacionNombre.valor,
    validacionApellido.valor,
    excludeId
  );
  
  if (esDuplicado) {
    return { valido: false, mensaje: 'Ya existe un alumno con el mismo nombre y apellido' };
  }
  
  return {
    valido: true,
    datos: {
      nombre: validacionNombre.valor,
      apellido: validacionApellido.valor,
      edad: validacionEdad.valor
    }
  };
};

module.exports = {
  sanitizarString,
  validarNombre,
  validarApellido,
  validarEdad,
  verificarDuplicado,
  validarAlumno
};
