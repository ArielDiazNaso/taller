export function sumar(a, b) {
    return a + b;
}

export function restar(a, b) {
    return a - b;
}

export function multiplicar(a, b) {
    return a * b;
}

export function dividir(a, b) {
    if (b === 0) return "Error: División por cero";
    return a / b;
}

export function obtenerResultado() {
    return {
        suma: sumar(4, 5),
        resta: restar(3, 6),
        multiplicacion: multiplicar(2, 7),
        division: dividir(20, 4)
    };
}

const res = obtenerResultado();
console.log("Suma (4+5):", res.suma);
console.log("Resta (3-6):", res.resta);
console.log("Multiplicación (2*7):", res.multiplicacion);
console.log("División (20/4):", res.division);
