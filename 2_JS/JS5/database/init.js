const pool = require('./config');

async function initDatabase() {
  try {
    console.log('Inicializando base de datos...');

    const connection = await pool.getConnection();
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`Base de datos "${process.env.DB_NAME}" creada o ya existe`);

    await connection.query(`USE ${process.env.DB_NAME}`);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS alumnos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100),
        apellido VARCHAR(100),
        edad INT
      )
    `);
    console.log('Tabla "alumnos" creada o ya existe');

    connection.release();
    console.log('Inicialización completada exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  }
}

initDatabase();