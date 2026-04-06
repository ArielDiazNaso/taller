/**
 * Ejercicio 3: Operaciones con Funciones de Apoyo
 * @returns {Object} Un objeto que contiene los resultados de las operaciones.
 */
export function obtenerResultadoEj3() {
    const sumar = (a, b) => a + b;
    const restar = (a, b) => a - b;
    const multiplicar = (a, b) => a * b;
    const dividir = (a, b) => b === 0 ? "No se puede dividir por cero" : a / b;

    return {
        suma: sumar(4, 5),
        resta: restar(3, 6),
        multiplicacion: multiplicar(2, 7),
        division: dividir(20, 4)
    };
}

console.log("Ejercicio 3 cargado.");