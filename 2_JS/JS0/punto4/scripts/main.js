// Variables de estado
let numeros = [1, 2, 3, 4, 5];
let mensajes = ["Hola", "Cómo estás?", "Adiós"];
let cola = ["Cliente A", "Cliente B", "Cliente C"];

// 4.1 Eliminar el primer número del array
function eliminarPrimerNumero() {
    numeros.shift();
    return numeros;
}

// 4.2 Eliminar el primer mensaje de la lista
function eliminarPrimerMensaje() {
    mensajes.shift();
    return mensajes;
}

// 4.3 Atender al primer cliente de la cola
function atenderSiguienteCliente() {
    const cliente = cola.shift();
    return { cola, cliente };
}

// Interacción con el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Números
    document.getElementById('botonEliminarNumero').addEventListener('click', () => {
        const resultado = eliminarPrimerNumero();
        document.getElementById('resultadoNumeros').textContent = JSON.stringify(resultado);
    });

    // Mensajes
    document.getElementById('botonEliminarMensaje').addEventListener('click', () => {
        const resultado = eliminarPrimerMensaje();
        document.getElementById('resultadoMensajes').textContent = JSON.stringify(resultado);
    });

    // Cola de espera
    document.getElementById('botonAtenderSiguiente').addEventListener('click', () => {
        const resultado = atenderSiguienteCliente();
        document.getElementById('resultadoCola').textContent = JSON.stringify(resultado.cola);
        document.getElementById('atendiendoA').textContent = resultado.cliente || "No hay más clientes";
    });
});
