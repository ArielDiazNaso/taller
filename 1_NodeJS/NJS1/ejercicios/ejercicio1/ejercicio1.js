import { fileURLToPath } from 'node:url';

export function obtenerResultado() {
    return {
        linea1: "Hola mundo desde Node.js",
        linea2: "Fin"
    };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const res = obtenerResultado();
    console.log(res.linea1);
    console.log(res.linea2);
}
