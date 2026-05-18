export function obtenerResultado() {
    return {
        linea1: "Hola mundo desde Node.js",
        linea2: "Fin"
    };
}

if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
    const res = obtenerResultado();
    console.log(res.linea1);
    console.log(res.linea2);
}
