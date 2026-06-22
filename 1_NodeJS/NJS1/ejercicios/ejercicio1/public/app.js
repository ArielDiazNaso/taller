async function loadResult() {
  const loading = document.getElementById('loading');
  const content = document.getElementById('content');
  const error = document.getElementById('error');

  try {
    const response = await fetch('/api/resultado');
    if (!response.ok) throw new Error(`Error del servidor: ${response.status}`);
    const data = await response.json();

    content.innerHTML = `
      <table>
        <thead>
          <tr><th>Línea</th><th>Mensaje</th></tr>
        </thead>
        <tbody>
          <tr><td>Línea 1</td><td>${data.linea1}</td></tr>
          <tr><td>Línea 2</td><td>${data.linea2}</td></tr>
        </tbody>
      </table>
    `;
    loading.classList.add('hidden');
  } catch (err) {
    loading.classList.add('hidden');
    error.textContent = `Error: ${err.message}`;
    error.classList.remove('hidden');
  }
}

// Función para inicializar el tema (modo claro/oscuro)
function initTheme() {
  // Obtener elementos del DOM necesarios
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');
  
  // Recuperar el tema guardado en localStorage, o usar 'light' por defecto
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  // Aplicar el tema al elemento raíz (html) usando el atributo data-theme
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Actualizar la interfaz del botón según el tema
  updateThemeUI(savedTheme);

  // Agregar evento click al botón para cambiar de tema
  themeToggle.addEventListener('click', () => {
    // Obtener el tema actual
    const currentTheme = document.documentElement.getAttribute('data-theme');
    // Determinar el nuevo tema (si es claro, pasa a oscuro y viceversa)
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Aplicar el nuevo tema al elemento raíz
    document.documentElement.setAttribute('data-theme', newTheme);
    // Guardar el nuevo tema en localStorage para recordarlo la próxima vez
    localStorage.setItem('theme', newTheme);
    // Actualizar la interfaz del botón
    updateThemeUI(newTheme);
  });
}

// Función para actualizar la UI del botón de tema
function updateThemeUI(theme) {
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');
  if (theme === 'dark') {
    // Si es modo oscuro, mostrar sol y texto "Modo Claro"
    themeIcon.textContent = '☀️';
    themeText.textContent = 'Modo Claro';
  } else {
    // Si es modo claro, mostrar luna y texto "Modo Oscuro"
    themeIcon.textContent = '🌙';
    themeText.textContent = 'Modo Oscuro';
  }
}

// Cuando el DOM esté completamente cargado, ejecutar las funciones
document.addEventListener('DOMContentLoaded', () => {
  loadResult();
  initTheme();
});
