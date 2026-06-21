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
          <tr><th>Operación (mediante funciones)</th><th>Resultado</th></tr>
        </thead>
        <tbody>
          <tr><td>Suma (4+5)</td><td>${data.suma}</td></tr>
          <tr><td>Resta (3-6)</td><td>${data.resta}</td></tr>
          <tr><td>Multiplicación (2*7)</td><td>${data.multiplicacion}</td></tr>
          <tr><td>División (20/4)</td><td>${data.division}</td></tr>
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
