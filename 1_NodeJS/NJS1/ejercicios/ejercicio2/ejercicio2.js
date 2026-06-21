import { fileURLToPath } from 'node:url';

export function obtenerResultado() {
    return {
        suma: 4 + 5,
        resta: 3 - 6,
        multiplicacion: 2 * 7,
        division: 20 / 4
    };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const res = obtenerResultado();
    console.log("Suma (4+5):", res.suma);
    console.log("Resta (3-6):", res.resta);
    console.log("Multiplicación (2*7):", res.multiplicacion);
    console.log("División (20/4):", res.division);
}
