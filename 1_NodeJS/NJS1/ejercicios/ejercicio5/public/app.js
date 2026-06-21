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
            <table class="table table-sm table-hover mt-2 mb-0">
                <thead>
                    <tr>
                        <th>Línea</th>
                        <th>Mensaje</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Línea 1</td>
                        <td class="fw-bold">${data.ex1.linea1}</td>
                    </tr>
                    <tr>
                        <td>Línea 2</td>
                        <td class="fw-bold">${data.ex1.linea2}</td>
                    </tr>
                </tbody>
            </table>
        `;

        // Renderizar Ejercicio 2
        document.getElementById('content-ex2').innerHTML = `
            <table class="table table-sm table-hover mt-2 mb-0">
                <thead>
                    <tr>
                        <th>Operación</th>
                        <th class="text-end">Resultado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Suma (4+5)</td>
                        <td class="text-end fw-bold">${data.ex2.suma}</td>
                    </tr>
                    <tr>
                        <td>Resta (3-6)</td>
                        <td class="text-end fw-bold">${data.ex2.resta}</td>
                    </tr>
                    <tr>
                        <td>Multiplicación (2*7)</td>
                        <td class="text-end fw-bold">${data.ex2.multiplicacion}</td>
                    </tr>
                    <tr>
                        <td>División (20/4)</td>
                        <td class="text-end fw-bold">${data.ex2.division}</td>
                    </tr>
                </tbody>
            </table>
        `;

        // Renderizar Ejercicio 3
        document.getElementById('content-ex3').innerHTML = `
            <table class="table table-sm table-hover mt-2 mb-0">
                <thead>
                    <tr>
                        <th>Operación (mediante funciones)</th>
                        <th class="text-end">Resultado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Suma (4+5)</td>
                        <td class="text-end fw-bold">${data.ex3.suma}</td>
                    </tr>
                    <tr>
                        <td>Resta (3-6)</td>
                        <td class="text-end fw-bold">${data.ex3.resta}</td>
                    </tr>
                    <tr>
                        <td>Multiplicación (2*7)</td>
                        <td class="text-end fw-bold">${data.ex3.multiplicacion}</td>
                    </tr>
                    <tr>
                        <td>División (20/4)</td>
                        <td class="text-end fw-bold">${data.ex3.division}</td>
                    </tr>
                </tbody>
            </table>
        `;

        // Renderizar Ejercicio 4 (Tabla de resultados)
        const ex4Data = data.ex4;
        document.getElementById('content-ex4').innerHTML = `
            <table class="table table-sm table-hover mt-2 mb-0">
                <thead>
                    <tr>
                        <th>Operación</th>
                        <th class="text-end">Resultado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Suma (5+3)</td>
                        <td class="text-end fw-bold">${ex4Data.suma}</td>
                    </tr>
                    <tr>
                        <td>Resta (8-6)</td>
                        <td class="text-end fw-bold">${ex4Data.resta}</td>
                    </tr>
                    <tr>
                        <td>Multiplicación (3*11)</td>
                        <td class="text-end fw-bold">${ex4Data.multiplicacion}</td>
                    </tr>
                    <tr>
                        <td>División (30/5)</td>
                        <td class="text-end fw-bold">${ex4Data.division}</td>
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
document.addEventListener('DOMContentLoaded', () => {
    loadEjercicios();
    initTheme();
});

/**
 * Inicializa el tema basado en la preferencia guardada o del sistema.
 */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    
    // Recuperar tema guardado o usar 'light' por defecto
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeUI(newTheme);
    });
}

function updateThemeUI(theme) {
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    if (theme === 'dark') {
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Modo Claro';
    } else {
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Modo Oscuro';
    }
}
