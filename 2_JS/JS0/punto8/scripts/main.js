// Variables de estado
let roles = ["user", "guest", "admin"];
let colores = ["rojo", "azul", "amarillo"];
let numeros = [1, 2, 3];

// 8.1 Verificar si el rol "admin" está presente
function tieneAdmin() {
    return roles.includes("admin") ? "Sí, contiene 'admin'" : "No contiene 'admin'";
}

// 8.2 Verificar si el color "verde" existe en la lista
function tieneVerde() {
    return colores.includes("verde") ? "Sí, existe 'verde'" : "No existe 'verde'";
}

// 8.3 Agregar un número solo si no se encuentra en el array
function agregarNumeroUnico(num) {
    if (!numeros.includes(num)) {
        numeros.push(num);
    }
    return numeros;
}

// Interacción con el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Admin
    document.getElementById('botonVerificarAdmin').addEventListener('click', () => {
        document.getElementById('resultadoAdmin').textContent = tieneAdmin();
    });

    // Verde
    document.getElementById('botonVerificarVerde').addEventListener('click', () => {
        document.getElementById('resultadoVerde').textContent = tieneVerde();
    });

    // Únicos
    document.getElementById('botonAgregarNumero').addEventListener('click', () => {
        const input = document.getElementById('entradaNumero');
        const valor = parseInt(input.value);
        if (!isNaN(valor)) {
            const resultado = agregarNumeroUnico(valor);
            document.getElementById('resultadoNumeros').textContent = JSON.stringify(resultado);
        }
        input.value = '';
    });
});
