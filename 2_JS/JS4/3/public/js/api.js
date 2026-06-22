// Este archivo maneja las solicitudes fetch al endpoint local /api/users
// y la funcionalidad de filtrado de usuarios.

let allUsers = [];

// Función asincrónica para obtener los datos de usuarios desde la API
async function fetchUsers() {
  try {
    const response = await fetch('/api/users');
    if (!response.ok) {
      throw new Error('Error al obtener los usuarios');
    }
    allUsers = await response.json();
    return allUsers;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
}

// Función para filtrar usuarios por nombre
function filterUsers(searchTerm) {
  const term = searchTerm.toLowerCase();
  return allUsers.filter(user => 
    user.name.toLowerCase().includes(term)
  );
}
