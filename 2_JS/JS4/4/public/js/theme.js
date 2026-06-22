// Este archivo maneja exclusivamente el cambio entre modo Claro y Oscuro.
// Manipula el atributo 'data-bs-theme' en la raíz del documento.

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Función para alternar entre temas claro y oscuro
function toggleTheme() {
  const currentTheme = htmlElement.getAttribute('data-bs-theme');
  if (currentTheme === 'light') {
    htmlElement.setAttribute('data-bs-theme', 'dark');
    themeToggle.innerHTML = '<span id="themeIcon">☀️</span> Modo Claro';
  } else {
    htmlElement.setAttribute('data-bs-theme', 'light');
    themeToggle.innerHTML = '<span id="themeIcon">🌙</span> Modo Oscuro';
  }
}

// Agregamos un event listener de click al botón de cambio de tema
themeToggle.addEventListener('click', toggleTheme);
