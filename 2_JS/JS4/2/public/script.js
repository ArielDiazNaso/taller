// Agregamos un event listener al formulario para escuchar el evento submit
document.getElementById('userForm').addEventListener('submit', async (e) => {
    // Evitamos el comportamiento por defecto del formulario (recargar la página)
    e.preventDefault(); 

    // Obtenemos el valor del campo name
    const name = document.getElementById('name').value;
    // Obtenemos el valor del campo email
    const email = document.getElementById('email').value;

    try {
        // Enviamos una petición POST al backend con los datos del usuario
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });

        // Convertimos la respuesta a formato JSON
        const data = await response.json();

        // Si la operación fue exitosa
        if (data.success) {
            // Mostramos el ID del usuario en el span
            document.getElementById('userId').textContent = data.id;
            // Quitamos la clase d-none para mostrar el mensaje de éxito
            document.getElementById('successMessage').classList.remove('d-none');
        }
    } catch (error) {
        // Mostramos el error en la consola
        console.error('Error:', error);
    }
});