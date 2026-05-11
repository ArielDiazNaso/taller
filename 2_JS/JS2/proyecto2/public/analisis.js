// Referencias al DOM
const zonaDrop = document.getElementById('zonaDrop');
const inputManual = document.getElementById('inputManual');
const seccionDashboard = document.getElementById('seccionDashboard');
const numUtilesElemento = document.getElementById('numUtiles');
const numNoUtilesElemento = document.getElementById('numNoUtiles');
const porcentajeAnalisisElemento = document.getElementById('porcentajeAnalisis');
const cuerpoResultados = document.getElementById('cuerpoResultados');
const btnExportar = document.getElementById('btnExportar');
const switchTema = document.getElementById('switchTema');
const cuerpoDocumento = document.body;

// Control de Tema (Claro/Oscuro)
switchTema.addEventListener('change', () => {
    if (switchTema.checked) {
        cuerpoDocumento.setAttribute('data-tema', 'dark');
        // También podemos usar la clase nativa de Bootstrap 5.3 para componentes internos
        cuerpoDocumento.setAttribute('data-bs-theme', 'dark');
    } else {
        cuerpoDocumento.setAttribute('data-tema', 'light');
        cuerpoDocumento.setAttribute('data-bs-theme', 'light');
    }
});

// Variables de estado
let numerosUtiles = [];
let contadorNoUtiles = 0;
let reporteTextoFinal = "";
let nombreArchivoOriginal = "";

// Configuración de Drag & Drop
zonaDrop.addEventListener('click', () => inputManual.click());

zonaDrop.addEventListener('dragover', (e) => {
    e.preventDefault();
    zonaDrop.classList.add('dragover');
});

zonaDrop.addEventListener('dragleave', () => {
    zonaDrop.classList.remove('dragover');
});

zonaDrop.addEventListener('drop', (e) => {
    e.preventDefault();
    zonaDrop.classList.remove('dragover');
    const archivo = e.dataTransfer.files[0];
    if (archivo && archivo.name.endsWith('.txt')) {
        leerArchivo(archivo);
    }
});

inputManual.addEventListener('change', (e) => {
    const archivo = e.target.files[0];
    if (archivo) leerArchivo(archivo);
});

// Constantes de validación
const LIMITE_TAMANO_MB = 2;
const LIMITE_TAMANO_BYTES = LIMITE_TAMANO_MB * 1024 * 1024;

// Lectura del archivo
function leerArchivo(archivo) {
    // Validar tamaño del archivo (Límite 2MB)
    if (archivo.size > LIMITE_TAMANO_BYTES) {
        alert(`Error: El archivo es demasiado grande. El límite es de ${LIMITE_TAMANO_MB} MB.`);
        inputManual.value = ""; // Limpiar el input
        return;
    }

    nombreArchivoOriginal = archivo.name;
    const lector = new FileReader();
    lector.onload = (e) => procesarContenido(e.target.result);
    lector.readAsText(archivo);
}

// Lógica de procesamiento
function procesarContenido(contenido) {
    const lineas = contenido.split('\n');
    numerosUtiles = [];
    contadorNoUtiles = 0;

    lineas.forEach(linea => {
        if (linea.includes(':')) {
            const partes = linea.split(':');
            const etiqueta = partes[0].trim();
            const valorTexto = partes[1].trim();
            
            // Extraer solo números y convertir a entero (0-1000)
            const valorLimpio = valorTexto.replace(/[^\d]/g, '');
            const valorEntero = parseInt(valorLimpio);

            if (!isNaN(valorEntero) && valorEntero >= 0 && valorEntero <= 1000) {
                if (filtrarSimetricos(valorEntero)) {
                    numerosUtiles.push({
                        etiqueta: etiqueta,
                        valor: valorEntero
                    });
                } else {
                    contadorNoUtiles++;
                }
            }
        }
    });

    // Ordenar ascendentemente
    numerosUtiles.sort((a, b) => a.valor - b.valor);

    actualizarUI();
}

// Filtro Simétrico: primer dígito == último dígito
function filtrarSimetricos(numero) {
    const cadena = numero.toString();
    const primerDigito = cadena.charAt(0);
    const ultimoDigito = cadena.slice(-1);
    return primerDigito === ultimoDigito;
}

// Actualización de la interfaz
function actualizarUI() {
    cuerpoResultados.innerHTML = "";
    
    numerosUtiles.forEach((item, index) => {
        const fila = `
            <tr>
                <td><span class="text-muted">#${index + 1}</span></td>
                <td>${item.etiqueta}</td>
                <td class="fw-bold text-primary">${item.valor}</td>
                <td><span class="badge bg-success">ÚTIL</span></td>
            </tr>
        `;
        cuerpoResultados.innerHTML += fila;
    });

    const totalUtiles = numerosUtiles.length;
    const totalGeneral = totalUtiles + contadorNoUtiles;
    const porcentaje = totalGeneral > 0 ? ((totalUtiles / totalGeneral) * 100).toFixed(1) : 0;

    numUtilesElemento.innerText = totalUtiles;
    numNoUtilesElemento.innerText = contadorNoUtiles;
    porcentajeAnalisisElemento.innerText = `${porcentaje}%`;

    seccionDashboard.style.display = 'block';
    
    // Preparar el reporte para exportación
    generarReporteTexto(totalUtiles, contadorNoUtiles, porcentaje);
}

function generarReporteTexto(utiles, noUtiles, porcentaje) {
    reporteTextoFinal = `REPORTE DE ANALÍTICA AVANZADA\n`;
    reporteTextoFinal += `====================================\n`;
    reporteTextoFinal += `Archivo de Origen: ${nombreArchivoOriginal}\n`;
    reporteTextoFinal += `Fecha de Análisis: ${new Date().toLocaleString()}\n`;
    reporteTextoFinal += `------------------------------------\n\n`;
    
    reporteTextoFinal += `NÚMEROS ÚTILES IDENTIFICADOS:\n`;
    numerosUtiles.forEach((item, index) => {
        reporteTextoFinal += `[${index + 1}] ${item.etiqueta}: ${item.valor}\n`;
    });

    reporteTextoFinal += `\n------------------------------------\n`;
    reporteTextoFinal += `ESTADÍSTICAS FINALES:\n`;
    reporteTextoFinal += `- Cantidad de Números Útiles: ${utiles}\n`;
    reporteTextoFinal += `- Cantidad de Números No Útiles: ${noUtiles}\n`;
    reporteTextoFinal += `- Porcentaje de Utilidad: ${porcentaje}%\n`;
    reporteTextoFinal += `====================================\n`;
}

// Exportar y Respaldar
btnExportar.addEventListener('click', async () => {
    const nombreFinal = `analisis_${nombreArchivoOriginal}`;

    // 1. Descarga Local
    const blob = new Blob([reporteTextoFinal], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombreFinal;
    a.click();
    URL.revokeObjectURL(url);

    // 2. Respaldo en Servidor (/txt_procesados)
    try {
        const respuesta = await fetch('/guardar-procesado', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombreArchivo: nombreFinal,
                contenido: reporteTextoFinal
            })
        });

        if (respuesta.ok) {
            alert('Reporte exportado y respaldado en el servidor con éxito.');
        }
    } catch (error) {
        console.error('Error al guardar en servidor:', error);
    }
});