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

document.addEventListener('DOMContentLoaded', loadResult);
