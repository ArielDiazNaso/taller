import { sumar, restar, multiplicar, dividir } from './calculos.js';

export function obtenerResultado() {
    return {
        suma: sumar(5, 3),
        resta: restar(8, 6),
        multiplicacion: multiplicar(3, 11),
        division: dividir(30, 5)
    };
}

const res = obtenerResultado();
console.log("Suma (5+3):", res.suma);
console.log("Resta (8-6):", res.resta);
console.log("Multiplicación (3*11):", res.multiplicacion);
console.log("División (30/5):", res.division);
