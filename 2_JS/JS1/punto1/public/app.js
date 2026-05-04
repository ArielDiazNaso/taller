/**
 * Newsletter Premium - Lógica de Suscripción (Círculo Elite)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referencias de Elementos
    const btnStart = document.getElementById('btnStart');
    const btnBack = document.getElementById('btnBack');
    const landingView = document.getElementById('landingView');
    const formView = document.getElementById('formView');
    const successView = document.getElementById('successView');
    const subscriptionForm = document.getElementById('subscriptionForm');
    const alertContainer = document.getElementById('alertContainer');
    const successMessage = document.getElementById('successMessage');

    /**
     * Navegación SPA (Sin recarga de página)
     */
    btnStart.addEventListener('click', () => {
        landingView.classList.add('d-none');
        formView.classList.remove('d-none');
    });

    btnBack.addEventListener('click', () => {
        formView.classList.add('d-none');
        landingView.classList.remove('d-none');
        limpiarErrores();
    });

    /**
     * Evento de envío del formulario
     */
    subscriptionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validarEnvio()) {
            capturarInformacion();
        }
    });

    /**
     * Función de Validación Front-end Estricta
     */
    function validarEnvio() {
        let esValido = true;
        limpiarErrores();

        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const email = document.getElementById('email').value.trim();

        // Regex estricto para email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nombre) {
            mostrarError('nombre', 'El nombre es requerido.');
            esValido = false;
        }

        if (!apellido) {
            mostrarError('apellido', 'El apellido es requerido.');
            esValido = false;
        }

        if (!email) {
            mostrarError('email', 'El correo es requerido.');
            esValido = false;
        } else if (!regexEmail.test(email)) {
            mostrarError('email', 'Formato inválido (debe contener @ y .com).');
            esValido = false;
        }

        return esValido;
    }

    /**
     * Demostración de los 3 Métodos de Captura de Información
     */
    function capturarInformacion() {
        console.log('--- Iniciando Captura de Información (3 Métodos) ---');

        // MÉTODO A: Acceso directo al DOM (getElementById)
        const nombreA = document.getElementById('nombre').value;
        const apellidoA = document.getElementById('apellido').value;
        const emailA = document.getElementById('email').value;
        console.log('Método A (DOM Directo):', { nombreA, apellidoA, emailA });

        // MÉTODO B: Colección de elementos del formulario (elements)
        const formElements = subscriptionForm.elements;
        const nombreB = formElements['nombre'].value;
        const apellidoB = formElements['apellido'].value;
        const emailB = formElements['email'].value;
        console.log('Método B (Form Elements):', { nombreB, apellidoB, emailB });

        // MÉTODO C: API FormData
        const formData = new FormData(subscriptionForm);
        const nombreC = formData.get('nombre');
        const apellidoC = formData.get('apellido');
        const emailC = formData.get('email');
        console.log('Método C (FormData API):', { nombreC, apellidoC, emailC });

        // Enviar datos al servidor usando los datos capturados (usaremos Método C por ser el más moderno)
        enviarAlServidor({ nombre: nombreC, apellido: apellidoC, email: emailC });
    }

    /**
     * Envío de datos al Backend Express
     */
    async function enviarAlServidor(datos) {
        try {
            const response = await fetch('/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            const result = await response.json();

            if (result.success) {
                mostrarExito(result.message);
            } else {
                // Manejar errores devueltos por express-validator
                let errorHtml = '<div class="alert-box alert-error"><strong>Error en el Servidor:</strong><ul>';
                result.errors.forEach(err => {
                    errorHtml += `<li>${err.msg}</li>`;
                });
                errorHtml += '</ul></div>';
                alertContainer.innerHTML = errorHtml;
            }
        } catch (error) {
            console.error('Error en la petición:', error);
            alertContainer.innerHTML = '<div class="alert-box alert-error">Error de conexión con el servidor.</div>';
        }
    }

    /**
     * Helpers de UI
     */
    function mostrarExito(mensaje) {
        formView.classList.add('d-none');
        successView.classList.remove('d-none');
        successMessage.textContent = mensaje;
    }

    function mostrarError(id, mensaje) {
        const input = document.getElementById(id);
        const errorSpan = document.getElementById(`error-${id}`);
        input.classList.add('is-invalid');
        errorSpan.textContent = mensaje;
    }

    function limpiarErrores() {
        const inputs = subscriptionForm.querySelectorAll('input');
        const errors = subscriptionForm.querySelectorAll('.error-msg');
        alertContainer.innerHTML = '';
        inputs.forEach(i => i.classList.remove('is-invalid'));
        errors.forEach(e => e.textContent = '');
    }
});
