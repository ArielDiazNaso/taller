const contenedor = document.getElementById('contenedor-nodos');
const monitor = document.getElementById('monitor-log');

// Datos iniciales para los nodos
const datosIniciales = [
    { texto: "Google", url: "https://www.google.com" },
    { texto: "YouTube", url: "https://www.youtube.com" },
    { texto: "GitHub", url: "https://www.github.com" },
    { texto: "Stack Overflow", url: "https://www.stackoverflow.com" },
    { texto: "Netflix", url: "https://www.netflix.com" }
];

// Datos nuevos para la modificación
const datosNuevos = [
    { texto: "Bing", url: "https://www.bing.com", color: "btn-info" },
    { texto: "Twitch", url: "https://www.twitch.tv", color: "btn-purple" },
    { texto: "GitLab", url: "https://www.gitlab.com", color: "btn-orange" },
    { texto: "MDN Web Docs", url: "https://developer.mozilla.org", color: "btn-secondary" },
    { texto: "Disney+", url: "https://www.disneyplus.com", color: "btn-primary" }
];

// Función para registrar cambios en el monitor
function registrarEnMonitor(mensaje) {
    const p = document.createElement('p');
    p.className = "mb-1 text-success";
    p.textContent = `> ${mensaje}`;
    monitor.prepend(p); // Agrega el log más reciente arriba
}

// 1. CREAR NODOS
function crearNodos() {
    if (contenedor.hasChildNodes()) {
        registrarEnMonitor("Los nodos ya existen.");
        return;
    }

    datosIniciales.forEach((dato, index) => {
        const enlace = document.createElement('a');
        enlace.href = dato.url;
        enlace.textContent = `Ir a ${dato.texto}`;
        enlace.target = "_blank";
        enlace.id = `enlace-${index}`;
        enlace.className = "btn btn-outline-dark animate-fade-in";
        
        contenedor.appendChild(enlace);
    });

    registrarEnMonitor("Se han creado 5 nodos <a> con sus atributos href iniciales.");
}

// 2. MODIFICAR ATRIBUTOS
function modificarAtributos() {
    const enlaces = contenedor.querySelectorAll('a');

    if (enlaces.length === 0) {
        registrarEnMonitor("ERROR: No hay nodos para modificar.");
        return;
    }

    enlaces.forEach((enlace, index) => {
        // Guardamos el valor viejo para mostrarlo
        const urlVieja = enlace.getAttribute('href');
        const urlNueva = datosNuevos[index].url;
        const textoNuevo = datosNuevos[index].texto;

        // Modificación de atributos
        enlace.setAttribute('href', urlNueva);
        enlace.textContent = `Ahora vas a ${textoNuevo}`;
        enlace.className = `btn ${datosNuevos[index].color || 'btn-warning'} shadow-sm`;

        // Mostrar cambio por pantalla dinámicamente
        registrarEnMonitor(`Nodo ${index + 1}: Atributo 'href' cambiado de [${urlVieja}] a [${urlNueva}]`);
    });
}

// RESETEAR
function resetear() {
    contenedor.innerHTML = "";
    monitor.innerHTML = "Esperando acciones...";
    registrarEnMonitor("Proyecto reseteado.");
}