/**
 * Ejercicio 1: Saludos y Despedidas
 * @returns {Object} Un objeto que contiene los mensajes de saludo y despedida.
 */
export function obtenerResultadoEj1() {
    return {
        saludo: "¡Hola Mundo!",
        despido: "¡Chau, hasta luego!"
    };
}

// Para compatibilidad con versiones anteriores que lo importaban como efecto secundario
console.log("Ejercicio 1 cargado.");