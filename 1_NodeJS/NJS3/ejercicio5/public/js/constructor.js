// Referencias al DOM
const panelEscenario = document.querySelector('#escenario');
const visorContador = document.querySelector('#contador-objetos');
let totalElementos = 0;

/**
 * Función central para procesar cualquier inyección
 * @param {string} plantilla - El HTML en formato string
 */
const procesarInyeccion = (plantilla) => {
    // Usamos el método insertAdjacentHTML para mejor rendimiento que +=
    panelEscenario.insertAdjacentHTML('beforeend', plantilla);
    
    totalElementos++;
    visorContador.textContent = `Objetos: ${totalElementos}`;
};

// 1. Inyectar ALERTA
const inyectarAlerta = () => {
    const alertHTML = `
        <div class="alert alert-primary alert-dismissible fade show shadow-sm" role="alert">
            <strong>¡Sistema Dinámico!</strong> Objeto mediante inyección de texto.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    procesarInyeccion(alertHTML);
};

// 2. Inyectar TARJETA DE PERFIL
const inyectarTarjeta = () => {
    const cardHTML = `
        <article class="card mb-3 shadow-sm border-0 bg-light" style="max-width: 400px;">
            <div class="row g-0">
                <div class="col-4 d-flex align-items-center justify-content-center bg-success text-white rounded-start">
                    <span class="display-6 fw-bold">A</span>
                </div>
                <div class="col-8">
                    <div class="card-body">
                        <h5 class="card-title">Perfil de Usuario</h5>
                        <p class="card-text small text-muted">Componente generado por el servidor.</p>
                    </div>
                </div>
            </div>
        </article>`;
    procesarInyeccion(cardHTML);
};

// 3. Inyectar LISTA
const inyectarLista = () => {
    const listHTML = `
        <div class="card mb-3 overflow-hidden">
            <div class="list-group list-group-flush">
                <label class="list-group-item"><input class="form-check-input me-2" type="checkbox" checked> Tarea 1: Configurar Express</label>
                <label class="list-group-item"><input class="form-check-input me-2" type="checkbox" checked> Tarea 2: Crear carpetas</label>
                <label class="list-group-item"><input class="form-check-input me-2" type="checkbox" checked> Tarea 3: Manipular innerHTML</label>
            </div>
        </div>`;
    procesarInyeccion(listHTML);
};

// 4. Inyectar VIDEO (Con el ID actualizado)
const inyectarVideo = () => {
    const videoHTML = `
        <div class="ratio ratio-16x9 mb-3 shadow-sm rounded border overflow-hidden">
            <iframe 
                src="https://www.youtube.com/embed/J_W92Cl2LRY?si=bikmmjo-o_XqTZl1" 
                title="Reproductor de Video" 
                allowfullscreen>
            </iframe>
        </div>`;
    procesarInyeccion(videoHTML);
};

// 5. Inyectar PANEL DE MÉTRICAS (En reemplazo del formulario)
const inyectarMétricas = () => {
    const métricasHTML = `
        <div class="row g-2 mb-3">
            <div class="col-6">
                <div class="p-3 border-0 bg-dark text-white rounded shadow-sm text-center">
                    <div class="small text-secondary">VISITAS</div>
                    <div class="h4 mb-0 fw-bold">1.2k</div>
                </div>
            </div>
            <div class="col-6">
                <div class="p-3 border-0 bg-primary text-white rounded shadow-sm text-center">
                    <div class="small text-white-50">VENTAS</div>
                    <div class="h4 mb-0 fw-bold">+45%</div>
                </div>
            </div>
            <div class="col-12">
                <div class="p-2 border rounded bg-white text-center">
                    <span class="badge bg-danger">LIVE</span> 
                    <small class="text-muted font-monospace">Servidor: Activo (Port 3000)</small>
                </div>
            </div>
        </div>`;
    procesarInyeccion(métricasHTML);
};

// Limpiar el panel de visualización
const limpiarPanel = () => {
    panelEscenario.textContent = "";
    totalElementos = 0;
    visorContador.textContent = "Objetos: 0";
};