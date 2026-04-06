import { sumar, restar, multiplicar, dividir } from './calculos.js';

/**
 * Ejercicio 4: Operaciones Matemáticas (5+3, 8-6, 3*11, 30/5)
 * @returns {Object} Un objeto que contiene los resultados de las operaciones.
 */
export function obtenerResultadoEj4() {
    return {
        suma: {
            operacion: "5 + 3",
            resultado: sumar(5, 3)
        },
        resta: {
            operacion: "8 - 6",
            resultado: restar(8, 6)
        },
        multiplicacion: {
            operacion: "3 * 11",
            resultado: multiplicar(3, 11)
        },
        division: {
            operacion: "30 / 5",
            resultado: dividir(30, 5)
        }
    };
}

// Ejecutar automáticamente al importar si es necesario, 
// o dejar que el servidor lo llame según sea necesario.
// console.log("Ejecutando ejercicios...", obtenerResultados());

