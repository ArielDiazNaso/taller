// Variables de estado
let numeros = [1, 2, 3, 4, 5];
let nombres = ["juan", "maria", "pedro"];
let precios = [100, 200, 500];

// 10.1 Multiplicar todos los números por 3
function multiplicarPorTres() {
    return numeros.map(n => n * 3);
}

// 10.2 Pasar todos los nombres a mayúsculas
function convertirAMayusculas() {
    return nombres.map(nombre => nombre.toUpperCase());
}

// 10.3 Aplicar el 21% de IVA a los precios
function calcularIva() {
    return precios.map(precio => (precio * 1.21).toFixed(2));
}

// Interacción con el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Multiplicar
    document.getElementById('botonMultiplicar').addEventListener('click', () => {
        const resultado = multiplicarPorTres();
        document.getElementById('resultadoMultiplicar').textContent = JSON.stringify(resultado);
    });

    // Mayúsculas
    document.getElementById('botonMayusculas').addEventListener('click', () => {
        const resultado = convertirAMayusculas();
        document.getElementById('resultadoMayusculas').textContent = JSON.stringify(resultado);
    });

    // IVA
    document.getElementById('botonCalcularIva').addEventListener('click', () => {
        const resultado = calcularIva();
        document.getElementById('resultadoIva').textContent = JSON.stringify(resultado);
    });
});
