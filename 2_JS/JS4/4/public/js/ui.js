// Este archivo maneja la renderización dinámica del DOM de las tarjetas de alumnos.

const alumnosContainer = document.getElementById('alumnosContainer');

// Función para renderizar las tarjetas de alumnos en el DOM
function renderAlumnos(alumnos) {
  alumnosContainer.innerHTML = '';
  alumnos.forEach(alumno => {
    const alumnoCard = document.createElement('div');
    alumnoCard.className = 'col-md-4';
    alumnoCard.innerHTML = `
      <div class="card h-100">
        <div class="card-header">
          <h5 class="card-title mb-0">${alumno.name}</h5>
        </div>
        <div class="card-body">
          <ul class="list-unstyled mb-0">
            <li class="mb-2"><strong>Email:</strong> ${alumno.email}</li>
            <li class="mb-2"><strong>Curso:</strong> ${alumno.course}</li>
            <li>
              <strong>Estado:</strong> 
              <span class="badge ${alumno.status === 'Activo' ? 'bg-success' : 'bg-secondary'}">
                ${alumno.status}
              </span>
            </li>
          </ul>
        </div>
      </div>
    `;
    alumnosContainer.appendChild(alumnoCard);
  });
}

// Función para mostrar mensajes de error
function showError(message) {
  alumnosContainer.innerHTML = `<p class="text-danger">${message}</p>`;
}
