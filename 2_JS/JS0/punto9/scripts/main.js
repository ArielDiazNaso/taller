// Variables de estado
let nombres = ["Ana", "Luis", "Marta"];
let numeros = [2, 4, 6];
let usuarios = [
    { nombre: "Carlos", edad: 25 },
    { nombre: "Elena", edad: 30 }
];

// 9.1 Generar un saludo para cada nombre
function saludarATodos() {
    let saludos = [];
    nombres.forEach(nombre => saludos.push(`¡Hola, ${nombre}!`));
    return saludos.join(", ");
}

// 9.2 Calcular el doble de los números
function calcularDobles() {
    let dobles = [];
    numeros.forEach(n => dobles.push(n * 2));
    return dobles.join(", ");
}

// 9.3 Formatear información de los usuarios
function mostrarUsuarios() {
    let info = [];
    usuarios.forEach(u => info.push(`${u.nombre} tiene ${u.edad} años`));
    return info.join(" | ");
}

// Interacción con el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Saludos
    document.getElementById('botonSaludar').addEventListener('click', () => {
        document.getElementById('resultadoSaludos').textContent = saludarATodos();
    });

    // Dobles
    document.getElementById('botonCalcularDobles').addEventListener('click', () => {
        document.getElementById('resultadoDobles').textContent = calcularDobles();
    });

    // Usuarios
    document.getElementById('botonMostrarUsuarios').addEventListener('click', () => {
        document.getElementById('resultadoUsuarios').textContent = mostrarUsuarios();
    });
});
