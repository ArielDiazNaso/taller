// Variables de estado
let numeros = [5, 12, 8, 130, 44];
let palabras = ["sol", "estrella", "luna", "planeta"];
let usuarios = [
    { nombre: "Juan", activo: true },
    { nombre: "Ana", activo: false },
    { nombre: "Pedro", activo: true }
];

// 11.1 Quedarse solo con los números mayores a 10
function filtrarMayoresADiez() {
    return numeros.filter(n => n > 10);
}

// 11.2 Filtrar palabras que tengan más de 5 caracteres
function filtrarPalabrasLargas() {
    return palabras.filter(p => p.length > 5);
}

// 11.3 Obtener nombres de los usuarios que están activos
function filtrarUsuariosActivos() {
    return usuarios.filter(u => u.activo).map(u => u.nombre);
}

// Interacción con el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar lista inicial de usuarios
    const pListaUsuarios = document.getElementById('listaUsuarios');
    if (pListaUsuarios) {
        pListaUsuarios.textContent = JSON.stringify(usuarios, null, 2);
    }

    // Números
    document.getElementById('botonFiltrarNumeros').addEventListener('click', () => {
        const resultado = filtrarMayoresADiez();
        document.getElementById('resultadoNumeros').textContent = JSON.stringify(resultado);
    });

    // Palabras
    document.getElementById('botonFiltrarPalabras').addEventListener('click', () => {
        const resultado = filtrarPalabrasLargas();
        document.getElementById('resultadoPalabras').textContent = JSON.stringify(resultado);
    });

    // Activos
    document.getElementById('botonFiltrarActivos').addEventListener('click', () => {
        const resultado = filtrarUsuariosActivos();
        document.getElementById('resultadoActivos').textContent = JSON.stringify(resultado);
    });
});
