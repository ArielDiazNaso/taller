// Variables de estado
let letras = ["A", "B", "C", "D"];
let numeros = [1, 2, 3, 4, 5];

// 14.1 Invertir el orden de las letras
function invertirLetras() {
    return [...letras].reverse();
}

// 14.2 Invertir el orden de los números
function invertirNumeros() {
    return [...numeros].reverse();
}

// 14.3 Invertir una cadena de texto
function invertirTexto(texto) {
    return texto.split('').reverse().join('');
}

// Interacción con el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Letras
    document.getElementById('botonInvertirLetras').addEventListener('click', () => {
        const resultado = invertirLetras();
        document.getElementById('resultadoLetras').textContent = JSON.stringify(resultado);
    });

    // Números
    document.getElementById('botonInvertirNumeros').addEventListener('click', () => {
        const resultado = invertirNumeros();
        document.getElementById('resultadoNumeros').textContent = JSON.stringify(resultado);
    });

    // Texto
    document.getElementById('botonInvertirTexto').addEventListener('click', () => {
        const input = document.getElementById('entradaTexto');
        const resultado = invertirTexto(input.value);
        document.getElementById('resultadoTexto').textContent = resultado;
    });
});
