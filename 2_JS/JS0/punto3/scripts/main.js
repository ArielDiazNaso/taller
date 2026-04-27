// Variables de estado
let colores = [];
let tareas = ["Lavar platos", "Estudiar"];
let usuarios = ["Yo", "El"];

// 3.1 Agregar tres colores al principio
function agregarTresColores() {
    colores.unshift("Rojo", "Verde", "Azul");
    return colores;
}

// 3.2 Agregar una tarea urgente al inicio
function agregarTareaUrgente(tarea) {
    if (tarea.trim()) {
        tareas.unshift(tarea.trim());
    }
    return tareas;
}

// 3.3 Agregar usuario conectado al inicio
function agregarUsuarioConectado(usuario) {
    if (usuario.trim()) {
        usuarios.unshift(usuario.trim());
    }
    return usuarios;
}

// Interacción con el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Colores
    document.getElementById('botonAgregarColores').addEventListener('click', () => {
        const resultado = agregarTresColores();
        document.getElementById('resultadoColores').textContent = JSON.stringify(resultado);
    });

    // Tareas
    document.getElementById('botonAgregarTarea').addEventListener('click', () => {
        const input = document.getElementById('entradaTarea');
        const resultado = agregarTareaUrgente(input.value);
        document.getElementById('resultadoTareas').textContent = JSON.stringify(resultado);
        input.value = '';
    });

    // Usuarios
    document.getElementById('botonAgregarUsuario').addEventListener('click', () => {
        const input = document.getElementById('entradaUsuario');
        const resultado = agregarUsuarioConectado(input.value);
        document.getElementById('resultadoUsuarios').textContent = JSON.stringify(resultado);
        input.value = '';
    });
});
