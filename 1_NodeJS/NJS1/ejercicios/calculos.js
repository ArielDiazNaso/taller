// calculos.js

export const sumar = (a, b) => {
    console.log(a + b);
    return a + b;
};

export const restar = (a, b) => {
    console.log(a - b);
    return a - b;
};

export const multiplicar = (a, b) => {
    console.log(a * b);
    return a * b;
};

export const dividir = (a, b) => {
    if (b === 0) {
        console.log("No se puede dividir por cero");
        return "Error: Div por 0";
    }
    console.log(a / b);
    return a / b;
};