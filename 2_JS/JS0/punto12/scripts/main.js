// Variables de estado
let numeros = [1, 2, 3, 4, 5];
let productos = [
    { nombre: "Fideos", precio: 100 },
    { nombre: "Arroz", precio: 200 },
    { nombre: "Leche", precio: 300 }
];

// 12.1 Sumar todos los números del array
function sumarTodo() {
    return numeros.reduce((acc, n) => acc + n, 0);
}

// 12.2 Multiplicar todos los números del array
function multiplicarTodo() {
    return numeros.reduce((acc, n) => acc * n, 1);
}

// 12.3 Calcular la suma total de los precios de los productos
function sumarPrecios() {
    return productos.reduce((acc, p) => acc + p.precio, 0);
}

// Interacción con el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar lista inicial de productos
    const pListaProductos = document.getElementById('listaProductos');
    if (pListaProductos) {
        pListaProductos.textContent = JSON.stringify(productos, null, 2);
    }

    // Sumar
    document.getElementById('botonSumar').addEventListener('click', () => {
        document.getElementById('resultadoSuma').textContent = sumarTodo();
    });

    // Multiplicar
    document.getElementById('botonMultiplicar').addEventListener('click', () => {
        document.getElementById('resultadoProducto').textContent = multiplicarTodo();
    });

    // Total precios
    document.getElementById('botonCalcularTotal').addEventListener('click', () => {
        document.getElementById('resultadoTotal').textContent = sumarPrecios();
    });
});
