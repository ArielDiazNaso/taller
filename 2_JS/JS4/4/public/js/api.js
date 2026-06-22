// Este archivo maneja las solicitudes fetch al endpoint local /api/alumnos.

// Función asincrónica para obtener los datos de alumnos desde la API
async function fetchAlumnos() {
  try {
    const response = await fetch('/api/alumnos');
    if (!response.ok) {
      throw new Error('Error al obtener los alumnos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener los alumnos:', error);
    throw error;
  }
}
