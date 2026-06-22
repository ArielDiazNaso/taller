// Este archivo maneja la renderización dinámica del DOM de las tarjetas de usuarios.

const usersContainer = document.getElementById('usersContainer');

// Función para renderizar las tarjetas de usuarios en el DOM
function renderUsers(users) {
  usersContainer.innerHTML = '';
  users.forEach(user => {
    const userCard = document.createElement('div');
    userCard.className = 'col-md-4';
    userCard.innerHTML = `
      <div class="card h-100">
        <div class="card-header">
          <h5 class="card-title mb-0">${user.name}</h5>
          <small class="text-muted">@${user.username}</small>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <h6 class="card-subtitle text-muted mb-2">Contacto</h6>
            <ul class="list-unstyled mb-0">
              <li><strong>Email:</strong> ${user.email}</li>
              <li><strong>Teléfono:</strong> ${user.phone}</li>
              <li><strong>Sitio web:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></li>
            </ul>
          </div>
          
          <div class="accordion" id="accordion-${user.id}">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-address-${user.id}">
                  Dirección
                </button>
              </h2>
              <div id="collapse-address-${user.id}" class="accordion-collapse collapse" data-bs-parent="#accordion-${user.id}">
                <div class="accordion-body">
                  <ul class="list-unstyled mb-0">
                    <li><strong>Calle:</strong> ${user.address.street}</li>
                    <li><strong>Suite:</strong> ${user.address.suite}</li>
                    <li><strong>Ciudad:</strong> ${user.address.city}</li>
                    <li><strong>Código postal:</strong> ${user.address.zipcode}</li>
                    <li><strong>Geo:</strong> ${user.address.geo.lat}, ${user.address.geo.lng}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-company-${user.id}">
                  Empresa
                </button>
              </h2>
              <div id="collapse-company-${user.id}" class="accordion-collapse collapse" data-bs-parent="#accordion-${user.id}">
                <div class="accordion-body">
                  <ul class="list-unstyled mb-0">
                    <li><strong>Nombre:</strong> ${user.company.name}</li>
                    <li><strong>Lema:</strong> ${user.company.catchPhrase}</li>
                    <li><strong>BS:</strong> ${user.company.bs}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    `;
    usersContainer.appendChild(userCard);
  });
}

// Función para mostrar mensajes de error
function showError(message) {
  usersContainer.innerHTML = `<p class="text-danger">${message}</p>`;
}
