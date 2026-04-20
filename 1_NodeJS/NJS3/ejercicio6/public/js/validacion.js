/**
 * LÓGICA DE SEGURIDAD ULTRA-ESTRICTA
 * Bloquea dominios incompletos y nombres sospechosos
 */

const formulario = document.getElementById('formulario-registro');
const resultadoContenedor = document.getElementById('resultado-envio');
const datosPantalla = document.getElementById('datos-inyectados');

// --- MEDIDAS DE SEGURIDAD NUCLEARES ---

const escaparHTML = (cadena) => {
    const textoSeguro = document.createElement('div');
    textoSeguro.textContent = cadena;
    return textoSeguro.innerHTML;
};

const validarCorreoProfesional = (email) => {
    /**
     * Esta RegEx obliga a:
     * 1. Tener caracteres antes del @
     * 2. Tener un nombre de dominio (gmail, outlook)
     * 3. Tener un PUNTO despues del dominio
     * 4. Tener una extensión de 2 a 6 letras (com, ar, net, store)
     */
    const regexEstricta = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    // Verificación adicional: que no termine en un punto accidental
    if (email.endsWith('.')) return false;
    
    return regexEstricta.test(email);
};

// --- MANEJO DEL EVENTO ---

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();
    evento.stopPropagation();

    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    
    // RegEx Nombre: Solo letras, mínimo 3 caracteres (evita "A" o "A1")
    const regexNombre = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]{3,}$/;
    
    let esSeguro = true;

    // 1. VALIDACIÓN DE NOMBRE
    if (!regexNombre.test(nombreInput.value.trim())) {
        nombreInput.classList.add('is-invalid');
        esSeguro = false;
    } else {
        nombreInput.classList.remove('is-invalid');
        nombreInput.classList.add('is-valid');
    }

    // 2. VALIDACIÓN DE CORREO (LA CLAVE)
    if (!validarCorreoProfesional(correoInput.value)) {
        correoInput.classList.add('is-invalid');
        // Cambiamos el mensaje de error dinámicamente
        const feedback = correoInput.nextElementSibling;
        if (feedback) feedback.textContent = "El correo debe tener un dominio válido (ej: .com o .ar)";
        esSeguro = false;
    } else {
        correoInput.classList.remove('is-invalid');
        correoInput.classList.add('is-valid');
    }

    // 3. VALIDACIÓN FINAL
    if (esSeguro && formulario.checkValidity()) {
        mostrarResultadoSeguro();
    } else {
        formulario.classList.add('was-validated');
    }
});

function mostrarResultadoSeguro() {
    // Captura y Sanitización (XSS Protection)
    const nombre = escaparHTML(document.getElementById('nombre').value);
    const correo = escaparHTML(document.getElementById('correo').value);
    const edad = escaparHTML(document.getElementById('edad').value);
    const pais = escaparHTML(document.getElementById('pais').value);
    const genero = escaparHTML(document.querySelector('input[name="genero"]:checked').value);

    datosPantalla.innerHTML = `
        <div class="alert alert-light border-primary shadow-sm">
            <h6 class="text-primary fw-bold border-bottom pb-2">DATOS VERIFICADOS</h6>
            <div class="small">
                <strong>Nombre:</strong> ${nombre}<br>
                <strong>Email:</strong> <span class="text-success">${correo}</span><br>
                <strong>Edad:</strong> ${edad} años<br>
                <strong>País:</strong> ${pais}<br>
                <strong>Género:</strong> ${genero}
            </div>
            <div class="mt-2 pt-2 border-top text-center">
                <span class="badge bg-primary">Integridad de datos: 100%</span>
            </div>
        </div>
    `;

    resultadoContenedor.classList.remove('d-none');
}