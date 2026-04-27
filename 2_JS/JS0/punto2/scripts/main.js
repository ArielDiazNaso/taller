// Variables de estado
let animales = ["León", "Tigre", "Oso"];
let productos = ["Pan", "Leche", "Huevos"];
let numeros = [1, 2, 3, 4, 5];

// 2.1 Eliminar el último animal de la lista
function eliminarUltimoAnimal() {
    animales.pop();
    return animales;
}

// 2.2 Eliminar el último producto y devolver info
function eliminarUltimoProducto() {
    const eliminado = productos.pop();
    return { lista: productos, eliminado };
}

// 2.3 Vaciar el array de números usando un bucle
function vaciarArray() {
    while (numeros.length > 0) {
        numeros.pop();
    }
    return numeros;
}

// Interacción con el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Animales
    document.getElementById('botonEliminarAnimal').addEventListener('click', () => {
        const resultado = eliminarUltimoAnimal();
        document.getElementById('resultadoAnimales').textContent = JSON.stringify(resultado);
    });

    // Productos
    document.getElementById('botonEliminarProducto').addEventListener('click', () => {
        const resultado = eliminarUltimoProducto();
        document.getElementById('resultadoProductos').textContent = JSON.stringify(resultado.lista);
        document.getElementById('productoEliminado').textContent = resultado.eliminado || "Nada que eliminar";
    });

    // Vaciar
    document.getElementById('botonVaciarArray').addEventListener('click', () => {
        const resultado = vaciarArray();
        document.getElementById('resultadoVaciado').textContent = JSON.stringify(resultado);
    });
});
