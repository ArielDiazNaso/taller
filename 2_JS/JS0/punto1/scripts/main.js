// Variables de estado
let frutas = [];
let amigos = [];
let numeros = [10];

// 1.1 Agregar tres frutas específicas
function agregarTresFrutas() {
    frutas.push("Manzana", "Pera", "Banana");
    return frutas;
}

// 1.2 Agregar un amigo a la lista
function agregarAmigo(nombre) {
    if (nombre.trim()) {
        amigos.push(nombre.trim());
    }
    return amigos;
}

// 1.3 Agregar número si es mayor al último elemento
function agregarNumeroSiEsMayor(num) {
    const ultimoNum = numeros[numeros.length - 1];
    if (num > ultimoNum) {
        numeros.push(num);
    }
    return numeros;
}

// Interacción con el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Frutas
    document.getElementById('botonAgregarFrutas').addEventListener('click', () => {
        const resultado = agregarTresFrutas();
        document.getElementById('resultadoFrutas').textContent = JSON.stringify(resultado);
    });

    // Amigos
    document.getElementById('botonAgregarAmigo').addEventListener('click', () => {
        const input = document.getElementById('nombreAmigo');
        const resultado = agregarAmigo(input.value);
        document.getElementById('resultadoAmigos').textContent = JSON.stringify(resultado);
        input.value = '';
    });

    // Números
    document.getElementById('botonAgregarNumero').addEventListener('click', () => {
        const input = document.getElementById('entradaNumero');
        const valor = parseFloat(input.value);
        if (!isNaN(valor)) {
            const resultado = agregarNumeroSiEsMayor(valor);
            document.getElementById('resultadoNumeros').textContent = JSON.stringify(resultado);
        }
        input.value = '';
    });
});
