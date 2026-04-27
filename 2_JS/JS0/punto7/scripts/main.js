// Variables de estado
let animales = ["gato", "perro", "pájaro"];
let numeros = [10, 30, 50, 70];
let ciudades = ["Paris", "Berlin", "Tokyo"];

// 7.1 Buscar la posición del elemento "perro"
function buscarPerro() {
    return animales.indexOf("perro");
}

// 7.2 Buscar la posición del número 50
function buscarCincuenta() {
    return numeros.indexOf(50);
}

// 7.3 Verificar si "Madrid" está en la lista y devolver mensaje
function buscarMadrid() {
    const indice = ciudades.indexOf("Madrid");
    return indice !== -1 ? `Madrid está en el índice ${indice}` : "Madrid no está en el array";
}

// Agregar Madrid al array dinámicamente
function agregarMadrid() {
    if (!ciudades.includes("Madrid")) {
        ciudades.push("Madrid");
    }
    return ciudades;
}

// Interacción con el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Perro
    document.getElementById('botonBuscarPerro').addEventListener('click', () => {
        document.getElementById('resultadoPerro').textContent = buscarPerro();
    });

    // 50
    document.getElementById('botonBuscar50').addEventListener('click', () => {
        document.getElementById('resultado50').textContent = buscarCincuenta();
    });

    // Madrid
    document.getElementById('botonAgregarMadrid').addEventListener('click', () => {
        const nuevaLista = agregarMadrid();
        document.getElementById('listaCiudades').textContent = JSON.stringify(nuevaLista);
    });

    document.getElementById('botonBuscarMadrid').addEventListener('click', () => {
        document.getElementById('resultadoMadrid').textContent = buscarMadrid();
    });
});
