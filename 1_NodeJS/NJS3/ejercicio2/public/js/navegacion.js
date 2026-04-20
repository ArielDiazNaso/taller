// FUNCIONALIDAD DE NAVEGACIÓN
function mostrarSeccion(idSeccion) {
    // 1. Ocultar todas las secciones
    const secciones = document.querySelectorAll('.seccion-clase');
    secciones.forEach(sec => sec.classList.add('d-none'));

    // 2. Quitar el 'active' de todos los botones del menú
    const botones = document.querySelectorAll('.list-group-item');
    botones.forEach(btn => btn.classList.remove('active'));

    // 3. Mostrar la sección seleccionada y activar el botón
    document.getElementById(idSeccion).classList.remove('d-none');
    event.currentTarget.classList.add('active');
}

// COMPONENTE 1: Evento CLICK
document.getElementById('boton-saludo').addEventListener('click', () => {
    document.getElementById('mensaje-saludo').textContent = "¡Hola! Has activado un evento Click.";
});

// COMPONENTE 2: Evento MOUSEOVER
const cuadro = document.getElementById('cuadro-color');
cuadro.addEventListener('mouseover', () => {
    cuadro.style.backgroundColor = '#00a650'; // Verde Telefe
    cuadro.style.color = 'white';
    cuadro.textContent = "¡Mouse adentro!";
});
cuadro.addEventListener('mouseleave', () => {
    cuadro.style.backgroundColor = 'transparent';
    cuadro.style.color = 'black';
    cuadro.textContent = "Zona de Color";
});

// COMPONENTE 3: Evento KEYDOWN
document.getElementById('input-teclado').addEventListener('keydown', (event) => {
    document.getElementById('tecla-presionada').textContent = `Tecla: ${event.key}`;
});

// COMPONENTE 4: Evento INPUT
document.getElementById('input-espejo').addEventListener('input', (event) => {
    document.getElementById('resultado-espejo').textContent = event.target.value;
});

// COMPONENTE 5: Evento SUBMIT
document.getElementById('form-prueba').addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que la página se recargue
    const nombre = document.getElementById('nombre-form').value;
    document.getElementById('resultado-form').innerHTML = `
        <div class="alert alert-success">¡Formulario enviado con éxito, ${nombre}!</div>
    `;
});