// Variables de estado
let numeros = [10, 20, 30, 40, 50];
let peliculas = ["M1", "M2", "M3", "M4", "M5"];
let letras = ["A", "B", "C", "D", "E"];

// 6.1 Obtener una copia de los primeros tres números
function copiarPrimerosTres() {
    return numeros.slice(0, 3);
}

// 6.2 Obtener películas desde el índice 2 hasta el final
function copiarPeliculasParcial() {
    return peliculas.slice(2, 5);
}

// 6.3 Obtener los últimos tres elementos de las letras
function copiarUltimosTres() {
    return letras.slice(-3);
}

// Interacción con el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Primeros 3
    document.getElementById('botonCopiarPrimeros3').addEventListener('click', () => {
        const resultado = copiarPrimerosTres();
        document.getElementById('resultadoPrimeros3').textContent = JSON.stringify(resultado);
    });

    // Películas
    document.getElementById('botonCopiarPeliculas').addEventListener('click', () => {
        const resultado = copiarPeliculasParcial();
        document.getElementById('resultadoPeliculas').textContent = JSON.stringify(resultado);
    });

    // Últimos 3
    document.getElementById('botonCopiarUltimos3').addEventListener('click', () => {
        const resultado = copiarUltimosTres();
        document.getElementById('resultadoUltimos3').textContent = JSON.stringify(resultado);
    });
});
