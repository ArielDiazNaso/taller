/**
 * LÓGICA INTEGRADA - EJERCICIOS 2 Y 3
 * Manejo de navegación, eventos múltiples e inspección de hijos.
 */

// 1. FUNCIÓN DE NAVEGACIÓN (Punto 2)
function mostrar(id, boton) {
    // Ocultar todas las secciones con la clase 'seccion-content'
    const todasLasSecciones = document.querySelectorAll('.seccion-content');
    todasLasSecciones.forEach(s => s.classList.add('d-none'));
    
    // Mostrar solo la sección que corresponde al ID
    const seccionActiva = document.getElementById(id);
    if (seccionActiva) {
        seccionActiva.classList.remove('d-none');
    }

    // Gestionar el estado visual de los botones del menú
    const todosLosBotones = document.querySelectorAll('.list-group-item');
    todosLosBotones.forEach(b => b.classList.remove('active'));
    boton.classList.add('active');

    // Limpiar el contador del punto 3 cada vez que navegamos
    document.getElementById('resultado-conteo').textContent = "";
}

// 2. FUNCIÓN DE INSPECCIÓN DE NODOS (Punto 3)
function contarNodosHijos() {
    // Buscamos la sección que NO tiene la clase 'd-none' (la que está viendo el usuario)
    const componenteActivo = document.querySelector('.seccion-content:not(.d-none)');
    const visor = document.getElementById('resultado-conteo');

    if (componenteActivo) {
        // Obtenemos la colección de hijos directos (HTML elements)
        // .children es clave porque no cuenta nodos de texto vacíos o saltos de línea
        const hijos = componenteActivo.children;
        const cantidadTotal = hijos.length;

        // Mostramos el resultado dinámicamente en el círculo/cuadro de la UI
        visor.textContent = cantidadTotal;

        // Auditoría técnica en consola para mostrar conocimiento al profesor
        console.group(`Inspección de Nodo: ${componenteActivo.id}`);
        console.log(`Total de hijos: ${cantidadTotal}`);
        Array.from(hijos).forEach((hijo, index) => {
            console.log(`Hijo ${index + 1}: <${hijo.tagName.toLowerCase()}>`);
        });
        console.groupEnd();
    }
}

// 3. EVENTOS ADICIONALES PARA CUMPLIR EL PUNTO 2 (Diferentes tipos de eventos)

// Evento de Teclado (Componente 3)
document.addEventListener('keydown', (e) => {
    const inputAcceso = document.querySelector('#c3 input');
    // Solo si el usuario está parado en el componente de acceso
    if (document.activeElement === inputAcceso) {
        console.log(`Tecla presionada en el formulario: ${e.key}`);
    }
});

// Evento de Doble Click (Componente 4)
const listaItems = document.querySelector('#c4 ul');
if (listaItems) {
    listaItems.addEventListener('dblclick', () => {
        alert("¡Has hecho doble clic en la lista de nodos!");
    });
}