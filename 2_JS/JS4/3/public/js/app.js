// Este archivo inicializa la aplicación y maneja la búsqueda
const searchInput = document.getElementById('searchInput');

async function initApp() {
    try {
        const users = await fetchUsers();
        renderUsers(users);
    } catch (error) {
        showError('No se pudieron cargar los usuarios. Por favor, inténtalo de nuevo más tarde.');
    }
}

searchInput.addEventListener('input', () => {
    const filteredUsers = filterUsers(searchInput.value);
    renderUsers(filteredUsers);
});

initApp();
