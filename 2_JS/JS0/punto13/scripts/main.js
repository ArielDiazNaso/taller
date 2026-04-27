// Variables de estado
let numeros = [40, 100, 1, 5, 25, 10];
let palabras = ["Zapato", "Arbol", "Casa", "Bala"];
let usuarios = [
    { nombre: "Ana", edad: 30 },
    { nombre: "Juan", edad: 20 },
    { nombre: "Pedro", edad: 25 }
];

// 13.1 Ordenar números de menor a mayor
function ordenarNumeros() {
    return [...numeros].sort((a, b) => a - b);
}

// 13.2 Ordenar palabras alfabéticamente
function ordenarPalabras() {
    return [...palabras].sort();
}

// 13.3 Ordenar los usuarios según su edad
function ordenarPorEdad() {
    return [...usuarios].sort((a, b) => a.edad - b.edad);
}

// Interacción con el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar lista inicial de personas
    const pListaPersonas = document.getElementById('listaPersonas');
    if (pListaPersonas) {
        pListaPersonas.textContent = JSON.stringify(usuarios, null, 2);
    }

    // Números
    document.getElementById('botonOrdenarNumeros').addEventListener('click', () => {
        const resultado = ordenarNumeros();
        document.getElementById('resultadoNumeros').textContent = JSON.stringify(resultado);
    });

    // Palabras
    document.getElementById('botonOrdenarPalabras').addEventListener('click', () => {
        const resultado = ordenarPalabras();
        document.getElementById('resultadoPalabras').textContent = JSON.stringify(resultado);
    });

    // Edad
    document.getElementById('botonOrdenarEdad').addEventListener('click', () => {
        const resultado = ordenarPorEdad();
        document.getElementById('resultadoEdad').textContent = resultado.map(u => `${u.nombre}(${u.edad})`).join(", ");
    });
});
