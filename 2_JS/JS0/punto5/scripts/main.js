// Variables de estado
let letras = ["A", "B", "C", "D", "E"];
let nombres = ["Ana", "Juan", "Pedro"];
let elementos = [1, 2, 3, 4, 5];

// 5.1 Eliminar dos letras a partir del índice 1
function eliminarDosDesdePos1() {
    letras.splice(1, 2);
    return letras;
}

// 5.2 Insertar un nombre en la segunda posición (índice 1)
function insertarEnPos2(nombre) {
    if (nombre.trim()) {
        nombres.splice(2, 0, nombre.trim());
    }
    return nombres;
}

// 5.3 Reemplazar dos elementos por X e Y en el índice 1
function reemplazarDosEnPos1() {
    elementos.splice(1, 2, "X", "Y");
    return elementos;
}

// Interacción con el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Eliminar
    document.getElementById('botonEliminarSplice').addEventListener('click', () => {
        const resultado = eliminarDosDesdePos1();
        document.getElementById('resultadoLetras').textContent = JSON.stringify(resultado);
    });

    // Insertar
    document.getElementById('botonInsertarSplice').addEventListener('click', () => {
        const input = document.getElementById('entradaNombre');
        const resultado = insertarEnPos2(input.value);
        document.getElementById('resultadoNombres').textContent = JSON.stringify(resultado);
        input.value = '';
    });

    // Reemplazar
    document.getElementById('botonReemplazarSplice').addEventListener('click', () => {
        const resultado = reemplazarDosEnPos1();
        document.getElementById('resultadoReemplazo').textContent = JSON.stringify(resultado);
    });
});
