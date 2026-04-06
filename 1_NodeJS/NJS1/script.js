/**
 * Realiza la petición a la API y renderiza los resultados en el DOM.
 */
async function loadEjercicios() {
    const loading = document.getElementById('loading-spinner');
    const mainContent = document.getElementById('main-content');
    const errorAlert = document.getElementById('error-message');

    try {
        // Simulamos un pequeño delay para apreciar el spinner (opcional)
        // await new Promise(resolve => setTimeout(resolve, 500));

        const response = await fetch('/api/ejercicios');
        
        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        const data = await response.json();

        // Renderizar Ejercicio 1
        document.getElementById('content-ex1').innerHTML = `
            <p class="card-text"><strong>Saludo:</strong> ${data.ex1.saludo}</p>
            <p class="card-text"><strong>Despedida:</strong> ${data.ex1.despido}</p>
        `;

        // Renderizar Ejercicio 2
        document.getElementById('content-ex2').innerHTML = `
            <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Suma (4+5) <span class="badge badge-om rounded-pill">${data.ex2.suma}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Resta (3-6) <span class="badge badge-om rounded-pill">${data.ex2.resta}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Multiplicación (2*7) <span class="badge badge-om rounded-pill">${data.ex2.multiplicacion}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    División (20/4) <span class="badge badge-om rounded-pill">${data.ex2.division}</span>
                </li>
            </ul>
        `;

        // Renderizar Ejercicio 3
        document.getElementById('content-ex3').innerHTML = `
            <p class="mb-2">Resultados procesados mediante funciones internas:</p>
            <div class="d-flex flex-wrap gap-2">
                <span class="badge border text-dark">Suma: ${data.ex3.suma}</span>
                <span class="badge border text-dark">Resta: ${data.ex3.resta}</span>
                <span class="badge border text-dark">Mult: ${data.ex3.multiplicacion}</span>
                <span class="badge border text-dark">Div: ${data.ex3.division}</span>
            </div>
        `;

        // Renderizar Ejercicio 4 (Especial: Tabla de resultados)
        const ex4Data = data.ex4;
        document.getElementById('content-ex4').innerHTML = `
            <table class="table table-sm table-hover mt-2">
                <thead class="table-light">
                    <tr>
                        <th>Operación</th>
                        <th class="text-end">Resultado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${ex4Data.suma.operacion}</td>
                        <td class="text-end fw-bold">${ex4Data.suma.resultado}</td>
                    </tr>
                    <tr>
                        <td>${ex4Data.resta.operacion}</td>
                        <td class="text-end fw-bold">${ex4Data.resta.resultado}</td>
                    </tr>
                    <tr>
                        <td>${ex4Data.multiplicacion.operacion}</td>
                        <td class="text-end fw-bold">${ex4Data.multiplicacion.resultado}</td>
                    </tr>
                    <tr>
                        <td>${ex4Data.division.operacion}</td>
                        <td class="text-end fw-bold">${ex4Data.division.resultado}</td>
                    </tr>
                </tbody>
            </table>
        `;

        // Mostrar contenido y ocultar spinner
        loading.classList.add('d-none');
        mainContent.classList.remove('d-none');

    } catch (error) {
        console.error('Fetch Error:', error);
        loading.classList.add('d-none');
        errorAlert.textContent = `No se pudieron cargar los datos: ${error.message}`;
        errorAlert.classList.remove('d-none');
    }
}

// Iniciar carga al cargar el DOM
document.addEventListener('DOMContentLoaded', loadEjercicios);
