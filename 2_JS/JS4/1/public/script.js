document.addEventListener('DOMContentLoaded', async () => {
    // Obtenemos el contenedor donde se mostrarán los usuarios
    const usersContainer = document.getElementById('users-container');
    // Obtenemos el elemento para mensajes de error
    const errorMessage = document.getElementById('error-message');

    try {
        // Hacemos una petición GET para obtener los usuarios desde el API
        const response = await fetch('/api/users');
        // Si la respuesta no es exitosa, lanzamos un error
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        // Convertimos la respuesta a formato JSON
        const users = await response.json();

        // Recorremos cada usuario del array
        users.forEach(user => {
            // Creamos un div para la tarjeta del usuario
            const userCard = document.createElement('div');
            // Agregamos clases de Bootstrap para el diseño responsive
            userCard.className = 'col-sm-12 col-md-6 col-lg-4';
            // Definimos el HTML interno de la tarjeta
            userCard.innerHTML = `
                        <div class="card shadow-sm h-100">
                            <div class="card-body">
                                <h5 class="card-title text-primary">${user.name}</h5>
                                <p class="card-text text-muted">${user.email}</p>
                            </div>
                        </div>
                    `;
            // Agregamos la tarjeta al contenedor
            usersContainer.appendChild(userCard);
        });
    } catch (error) {
        // Mostramos el mensaje de error
        errorMessage.textContent = error.message;
        // Quitamos la clase d-none para que el mensaje sea visible
        errorMessage.classList.remove('d-none');
    }
});