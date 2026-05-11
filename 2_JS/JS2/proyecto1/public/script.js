// Elementos principales del DOM
const contenedorNotas = document.getElementById('listaNotas');
const botonAgregar = document.getElementById('botonAgregarNota');
const botonQuitar = document.getElementById('botonQuitarNota');
const botonFinalizar = document.getElementById('botonDescargar');
const inputNombre = document.getElementById('nombreEstudiante');
const inputDni = document.getElementById('dniEstudiante');
const checkModoOscuro = document.getElementById('checkModoOscuro');

// Elementos del Modal
const modalNotificacion = new bootstrap.Modal(document.getElementById('modalNotificacion'));
const cuerpoMensajeModal = document.getElementById('mensajeModal');

// Límites de la aplicación
const MIN_NOTAS = 10;
const MAX_NOTAS = 20;

/**
 * Muestra un mensaje en la ventana modal en lugar de usar alert
 * @param {string} mensaje - El texto a mostrar
 */
function mostrarAviso(mensaje) {
    cuerpoMensajeModal.textContent = mensaje;
    modalNotificacion.show();
}

/**
 * Crea un campo de entrada para una nota con validación de rango y sin decimales
 * @param {number} indice - El número correlativo de la nota
 * @returns {HTMLElement} - El elemento div con el input configurado
 */
function crearCampoNota(indice) {
    const div = document.createElement('div');
    div.className = 'col-md-6';
    div.innerHTML = `
        <div class="input-group mb-2">
            <span class="input-group-text">Nota ${indice}</span>
            <input type="number" 
                   class="form-control campo-nota" 
                   placeholder="0" 
                   min="0" 
                   max="1000" 
                   step="1">
        </div>
    `;
    return div;
}

/**
 * Carga los campos mínimos de notas al iniciar la aplicación
 */
function inicializarInterfaz() {
    for (let i = 1; i <= MIN_NOTAS; i++) {
        contenedorNotas.appendChild(crearCampoNota(i));
    }
}

/**
 * Añade una nota adicional si no se ha alcanzado el límite máximo
 */
function añadirNota() {
    const cantidadActual = contenedorNotas.children.length;
    if (cantidadActual < MAX_NOTAS) {
        contenedorNotas.appendChild(crearCampoNota(cantidadActual + 1));
    }
}

/**
 * Elimina la última nota añadida si no se ha bajado del límite mínimo
 */
function eliminarNota() {
    const cantidadActual = contenedorNotas.children.length;
    if (cantidadActual > MIN_NOTAS) {
        contenedorNotas.removeChild(contenedorNotas.lastChild);
    }
}

/**
 * Ejecuta la doble acción: descarga local y guardado en el servidor
 */
async function procesarGuardado() {
    // Recopilar datos básicos
    const nombre = inputNombre.value.trim();
    const dni = inputDni.value.trim();
    const camposNotas = document.querySelectorAll('.campo-nota');
    
    // Validación de campos básicos
    if (!nombre || !dni) {
        mostrarAviso('Por favor, complete el Nombre y el DNI del estudiante.');
        return;
    }

    // Validación de longitud de DNI
    if (dni.length > 15) {
        mostrarAviso('El DNI no puede superar los 15 caracteres.');
        return;
    }

    // Obtener los valores de las notas y validar que no estén vacías
    const listaNotas = [];
    let hayCamposVacios = false;

    for (let campo of camposNotas) {
        const valorTexto = campo.value.trim();
        if (valorTexto === "") {
            hayCamposVacios = true;
            campo.classList.add('is-invalid'); // Resaltar campo vacío
        } else {
            campo.classList.remove('is-invalid');
            // Validar que sea un número entero
            if (!/^\d+$/.test(valorTexto)) {
                mostrarAviso('Las notas deben ser números enteros (sin decimales).');
                campo.focus();
                return;
            }
            
            let valor = parseInt(valorTexto, 10);
            // Validar rango 0-1000
            if (isNaN(valor) || valor < 0 || valor > 1000) {
                mostrarAviso('Todas las notas deben estar entre 0 y 1000.');
                campo.focus();
                return;
            }
            listaNotas.push(valor);
        }
    }

    if (hayCamposVacios) {
        mostrarAviso('Por favor, complete todas las calificaciones antes de continuar.');
        return;
    }

    // 1. Acción del lado del Cliente: Descarga automática del .txt
    generarDescargaLocal(nombre, dni, listaNotas);

    // 2. Acción del lado del Servidor: Petición POST para guardar en /txt
    await guardarEnServidor(nombre, dni, listaNotas);
}

/**
 * Genera y descarga un archivo .txt en la computadora del usuario
 */
function generarDescargaLocal(nombre, dni, notas) {
    let contenido = `REPORTE DE CALIFICACIONES\n`;
    contenido += `==========================\n`;
    contenido += `Estudiante: ${nombre}\n`;
    contenido += `Documento: ${dni}\n`;
    contenido += `--------------------------\n`;
    contenido += `Notas:\n`;
    
    notas.forEach((nota, i) => {
        contenido += `  - Nota ${i + 1}: ${nota}\n`;
    });
    
    contenido += `==========================\n`;
    contenido += `Generado el: ${new Date().toLocaleString()}\n`;

    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dni}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Envía los datos al servidor para persistencia en la carpeta /txt
 */
async function guardarEnServidor(nombre, dni, notas) {
    try {
        const respuesta = await fetch('/guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, dni, notas })
        });

        if (respuesta.ok) {
            mostrarAviso('¡Éxito! El archivo se ha descargado y guardado en el servidor.');
        } else {
            console.error('Error en la respuesta del servidor');
            mostrarAviso('El archivo se descargó localmente, pero hubo un problema al guardarlo en el servidor.');
        }
    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
        mostrarAviso('Error de conexión con el servidor.');
    }
}

// Configuración de escuchadores de eventos
botonAgregar.addEventListener('click', añadirNota);
botonQuitar.addEventListener('click', eliminarNota);
botonFinalizar.addEventListener('click', procesarGuardado);

/**
 * Evento para cambiar entre modo claro y modo oscuro
 */
checkModoOscuro.addEventListener('change', () => {
    // Si el checkbox está marcado, activamos el tema oscuro
    if (checkModoOscuro.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        console.log('Modo oscuro activado');
    } else {
        // Si no, volvemos al tema claro
        document.documentElement.removeAttribute('data-theme');
        console.log('Modo claro activado');
    }
});

// Ejecución inicial
inicializarInterfaz();
