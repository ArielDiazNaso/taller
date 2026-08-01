// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // ==============================================
    // Variables globales del juego
    // ==============================================
    let palabraObjetivo = "";          // Palabra a adivinar
    let letrasAdivinadas = new Set();  // Letras que el usuario ya ha intentado
    let vidasRestantes = 6;            // Vidas disponibles
    let intervaloTiempo = null;        // Intervalo para el contador
    let segundosTranscurridos = 0;     // Tiempo transcurrido en segundos
    let puntuacionCalculada = 0;       // Puntuación final del jugador
    let juegoActivo = false;           // Indica si el juego está en curso
    let botonesLetras = {};            // Almacena los botones del teclado por letra
    let dificultadActual = "";         // Dificultad seleccionada para la partida actual
    let resultadosFiltrados = [];      // Resultados actuales filtrados para descargar

    // ==============================================
    // Elementos del DOM
    // ==============================================
    const elementos = {
        mainMenu: document.getElementById('mainMenu'),
        playArea: document.getElementById('playArea'),
        btnIniciarJuego: document.getElementById('startGameBtn'),
        selectorDificultad: document.getElementById('difficultySelect'),
        valorTiempo: document.getElementById('timerVal'),
        valorVidas: document.getElementById('livesVal'),
        displayPalabra: document.getElementById('wordDisplay'),
        contenedorTeclado: document.getElementById('keyboardContainer'),
        displayPuntuacion: document.getElementById('currentScoreDisplay'),
        displayTiempo: document.getElementById('currentTimeStat'),
        displayPuntuacionStat: document.getElementById('currentScoreStat'),
        btnDescargarPdf: document.getElementById('downloadPdfBtn'),
        btnDescargarPdfMenu: document.getElementById('downloadPdfBtnMenu'),
        cuerpoTablaPuntuaciones: document.getElementById('leaderboardBody'),
        btnGuardarPuntuacion: document.getElementById('saveScoreBtn'),
        inputNombreJugador: document.getElementById('playerNameInput'),
        modalPuntuacion: new bootstrap.Modal(document.getElementById('scoreModal')),
        tituloModal: document.getElementById('modalTitle'),
        mensajeModal: document.getElementById('modalMessage'),
        // Elementos SVG del ahorcado
        cabeza: document.getElementById('hangmanHead'),
        cuerpo: document.getElementById('hangmanBody'),
        brazoIzquierdo: document.getElementById('hangmanLeftArm'),
        brazoDerecho: document.getElementById('hangmanRightArm'),
        piernaIzquierda: document.getElementById('hangmanLeftLeg'),
        piernaDerecha: document.getElementById('hangmanRightLeg'),
        // Botones de navegación
        backToMenuBtn: document.getElementById('backToMenuBtn'),
        backToMenuModalBtn: document.getElementById('backToMenuModalBtn'),
        // Filtros y búsqueda
        searchInput: document.getElementById('searchInput'),
        difficultyFilter: document.getElementById('difficultyFilter'),
        fechaDesde: document.getElementById('fechaDesde'),
        clearFiltersBtn: document.getElementById('clearFiltersBtn')
    };

    // Partes del ahorcado en orden de aparición
    const partesAhorcado = [
        elementos.cabeza,
        elementos.cuerpo,
        elementos.brazoIzquierdo,
        elementos.brazoDerecho,
        elementos.piernaIzquierda,
        elementos.piernaDerecha
    ];

    // ==============================================
    // Funciones de navegación
    // ==============================================

    const irAlMenuPrincipal = () => {
        juegoActivo = false;
        detenerContadorTiempo();
        elementos.playArea.classList.add('d-none');
        elementos.mainMenu.classList.remove('d-none');
        // Actualizar la tabla de puntuaciones
        obtenerTablaPuntuaciones();
    };

    const irAlAreaDeJuego = () => {
        elementos.mainMenu.classList.add('d-none');
        elementos.playArea.classList.remove('d-none');
    };

    // ==============================================
    // Funciones de inicialización
    // ==============================================

    const iniciarJuego = async () => {
        try {
            dificultadActual = elementos.selectorDificultad.value;

            const respuesta = await fetch(`/api/word?difficulty=${dificultadActual}`);
            if (!respuesta.ok) throw new Error('Error al obtener la palabra del servidor');

            const datos = await respuesta.json();
            palabraObjetivo = datos.word;

            reiniciarVariablesJuego();
            irAlAreaDeJuego();
            renderizarAhorcado();
            renderizarDisplayPalabra();
            renderizarTeclado();
            iniciarContadorTiempo();

            juegoActivo = true;
        } catch (error) {
            alert(`Error al iniciar el juego: ${error.message}`);
            console.error('Error en iniciarJuego:', error);
        }
    };

    const reiniciarVariablesJuego = () => {
        letrasAdivinadas.clear();
        vidasRestantes = 6;
        segundosTranscurridos = 0;
        puntuacionCalculada = 0;
        botonesLetras = {};

        elementos.valorTiempo.textContent = segundosTranscurridos;
        elementos.valorVidas.textContent = vidasRestantes;
        elementos.displayPuntuacion.textContent = puntuacionCalculada;
        elementos.displayTiempo.textContent = segundosTranscurridos;
        elementos.displayPuntuacionStat.textContent = puntuacionCalculada;
        elementos.inputNombreJugador.value = '';

        partesAhorcado.forEach(parte => {
            parte.classList.remove('opacity-100');
            parte.classList.add('opacity-0');
        });
    };

    // ==============================================
    // Funciones de renderizado
    // ==============================================

    const renderizarAhorcado = () => {
        const partesMostrar = 6 - vidasRestantes;

        partesAhorcado.forEach((parte, indice) => {
            if (indice < partesMostrar) {
                parte.classList.remove('opacity-0');
                parte.classList.add('opacity-100');
            } else {
                parte.classList.remove('opacity-100');
                parte.classList.add('opacity-0');
            }
        });
    };

    const renderizarDisplayPalabra = () => {
        elementos.displayPalabra.innerHTML = '';
        let palabraCompleta = true;

        [...palabraObjetivo].forEach(letra => {
            const cajaLetra = document.createElement('div');
            cajaLetra.className = 'letter-box';

            if (letrasAdivinadas.has(letra)) {
                cajaLetra.textContent = letra;
            } else {
                cajaLetra.textContent = '_';
                palabraCompleta = false;
            }

            elementos.displayPalabra.appendChild(cajaLetra);
        });

        if (palabraCompleta && juegoActivo) {
            finalizarJuego(true);
        }
    };

    const renderizarTeclado = () => {
        elementos.contenedorTeclado.innerHTML = '';
        const alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

        [...alfabeto].forEach(letra => {
            const boton = document.createElement('button');
            boton.className = 'btn btn-outline-primary fw-bold';
            boton.textContent = letra;
            boton.addEventListener('click', () => procesarIntentoLetra(letra, boton));
            botonesLetras[letra] = boton;
            elementos.contenedorTeclado.appendChild(boton);
        });
    };

    // ==============================================
    // Funciones de lógica del juego
    // ==============================================

    const procesarIntentoLetra = (letra, boton) => {
        if (!juegoActivo || letrasAdivinadas.has(letra)) return;

        letrasAdivinadas.add(letra);
        boton.disabled = true;

        if (palabraObjetivo.includes(letra)) {
            boton.classList.replace('btn-outline-primary', 'btn-success');
            renderizarDisplayPalabra();
        } else {
            boton.classList.replace('btn-outline-primary', 'btn-danger');
            vidasRestantes--;
            elementos.valorVidas.textContent = vidasRestantes;
            renderizarAhorcado();

            if (vidasRestantes <= 0) {
                finalizarJuego(false);
            }
        }
    };

    const manejarEntradaTeclado = (event) => {
        if (!juegoActivo) return;

        const tecla = event.key.toUpperCase();
        const alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

        if (alfabeto.includes(tecla) && botonesLetras[tecla]) {
            procesarIntentoLetra(tecla, botonesLetras[tecla]);
        }
    };

    const finalizarJuego = (esVictoria) => {
        juegoActivo = false;
        detenerContadorTiempo();

        document.querySelectorAll('#keyboardContainer button').forEach(boton => {
            boton.disabled = true;
        });

        if (esVictoria) {
            puntuacionCalculada = (palabraObjetivo.length * 15) + (vidasRestantes * 25) - segundosTranscurridos;
            if (puntuacionCalculada < 10) puntuacionCalculada = 10;

            elementos.tituloModal.innerHTML = '<i class="bi bi-trophy me-2"></i> ¡Victoria!';
            elementos.mensajeModal.innerHTML = `
                ¡Felicidades! Adivinaste la palabra <strong>${palabraObjetivo}</strong> en <strong>${segundosTranscurridos}</strong> segundos.
                <br>Puntuación final: <strong class="text-success">${puntuacionCalculada}</strong> puntos.
            `;
        } else {
            puntuacionCalculada = 0;

            elementos.tituloModal.innerHTML = '<i class="bi bi-emoji-frown me-2"></i> ¡Game Over!';
            elementos.mensajeModal.innerHTML = `
                Se terminaron las vidas. La palabra era <strong>${palabraObjetivo}</strong>.
                <br>Puntuación: <strong class="text-danger">0</strong> puntos.
            `;
        }

        elementos.displayPuntuacion.textContent = puntuacionCalculada;
        elementos.displayPuntuacionStat.textContent = puntuacionCalculada;

        elementos.modalPuntuacion.show();
    };

    // ==============================================
    // Funciones del contador de tiempo
    // ==============================================

    const iniciarContadorTiempo = () => {
        detenerContadorTiempo();

        intervaloTiempo = setInterval(() => {
            segundosTranscurridos++;
            elementos.valorTiempo.textContent = segundosTranscurridos;
            elementos.displayTiempo.textContent = segundosTranscurridos;
        }, 1000);
    };

    const detenerContadorTiempo = () => {
        if (intervaloTiempo) {
            clearInterval(intervaloTiempo);
            intervaloTiempo = null;
        }
    };

    // ==============================================
    // Funciones de la API
    // ==============================================

    const obtenerTablaPuntuaciones = async () => {
        try {
            const params = new URLSearchParams();
            if (elementos.searchInput.value) params.append('search', elementos.searchInput.value);
            if (elementos.difficultyFilter.value) params.append('difficulty', elementos.difficultyFilter.value);
            if (elementos.fechaDesde.value) params.append('fechaDesde', elementos.fechaDesde.value);

            const respuesta = await fetch(`/api/scores?${params.toString()}`);
            const datos = await respuesta.json();

            // Almacenar resultados filtrados para descargar
            resultadosFiltrados = datos;

            elementos.cuerpoTablaPuntuaciones.innerHTML = '';
            datos.forEach(fila => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="fw-semibold">${fila.nombre}</td>
                    <td class="text-success fw-bold">${fila.puntos}</td>
                    <td>${fila.tiempo}s</td>
                    <td class="text-warning">${fila.vidas_restantes}</td>
                    <td>${fila.longitud_palabra}</td>
                    <td>
                        <span class="badge text-bg-${fila.dificultad === 'easy' ? 'success' : fila.dificultad === 'medium' ? 'warning' : 'danger'}">
                            ${fila.dificultad}
                        </span>
                    </td>
                `;
                elementos.cuerpoTablaPuntuaciones.appendChild(tr);
            });

            // Habilitar botones de descarga si hay resultados
            if (datos.length > 0) {
                elementos.btnDescargarPdfMenu.disabled = false;
                elementos.btnDescargarPdf.disabled = false;
            } else {
                elementos.btnDescargarPdfMenu.disabled = true;
                elementos.btnDescargarPdf.disabled = true;
            }
        } catch (error) {
            console.error('Error al obtener la tabla de puntuaciones:', error);
        }
    };

    const guardarPuntuacion = async () => {
        const nombre = elementos.inputNombreJugador.value.trim() || 'Jugador Anónimo';

        try {
            const respuesta = await fetch('/api/scores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    nombre: nombre, 
                    puntos: puntuacionCalculada, 
                    tiempo: segundosTranscurridos,
                    vidas_restantes: vidasRestantes,
                    longitud_palabra: palabraObjetivo.length,
                    dificultad: dificultadActual
                })
            });

            if (respuesta.ok) {
                elementos.modalPuntuacion.hide();
                irAlMenuPrincipal();
            } else {
                alert('Error al guardar la puntuación en el servidor');
            }
        } catch (error) {
            console.error('Error al guardar la puntuación:', error);
            alert('Error al guardar la puntuación');
        }
    };

    // ==============================================
    // Funciones de exportación
    // ==============================================

    const descargarPdf = async () => {
        console.log('Descargando PDF con resultados filtrados...');

        try {
            // Usar los resultados filtrados ya cargados
            const puntuaciones = resultadosFiltrados;

            console.log('Datos de puntuaciones para PDF:', puntuaciones);

            // Mejorar la inicialización de jsPDF
            let jsPDF;
            if (window.jspdf && window.jspdf.jsPDF) {
                jsPDF = window.jspdf.jsPDF;
            } else if (window.jsPDF) {
                jsPDF = window.jsPDF;
            } else {
                throw new Error('jsPDF no está disponible');
            }
            
            const doc = new jsPDF();

            // Encabezado
            doc.setFillColor(13, 110, 253);
            doc.rect(0, 0, 210, 40, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(24);
            doc.text('El Ahorcado - Reporte Completo', 14, 26);

            doc.setTextColor(33, 37, 41);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');

            // Información del reporte
            doc.text(`Fecha de generación: ${new Date().toLocaleString('es-ES')}`, 14, 55);
            doc.text(`Total de registros: ${puntuaciones.length}`, 14, 65);

            // Mostrar filtros aplicados
            let yOffset = 72;
            if (elementos.searchInput.value) {
                doc.text(`Búsqueda: "${elementos.searchInput.value}"`, 14, yOffset);
                yOffset += 8;
            }
            if (elementos.difficultyFilter.value) {
                const diffText = elementos.difficultyFilter.value === 'easy' ? 'Fácil' : 
                                 elementos.difficultyFilter.value === 'medium' ? 'Medio' : 'Difícil';
                doc.text(`Dificultad: ${diffText}`, 14, yOffset);
                yOffset += 8;
            }
            if (elementos.fechaDesde.value) {
                doc.text(`Fecha desde: ${new Date(elementos.fechaDesde.value).toLocaleDateString('es-ES')}`, 14, yOffset);
                yOffset += 8;
            }

            // Línea separadora
            doc.setDrawColor(200, 200, 200);
            doc.line(14, yOffset, 196, yOffset);
            yOffset += 5;

            // Encabezados de la tabla
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(255, 255, 255);
            doc.setFillColor(108, 117, 125);
            doc.rect(14, yOffset, 182, 8, 'F');
            doc.text('Jugador', 16, yOffset + 6);
            doc.text('Puntos', 60, yOffset + 6);
            doc.text('Tiempo', 90, yOffset + 6);
            doc.text('Vidas', 115, yOffset + 6);
            doc.text('Long.', 135, yOffset + 6);
            doc.text('Dificultad', 155, yOffset + 6);

            // Contenido de la tabla
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(33, 37, 41);
            let yPos = yOffset + 13;

            puntuaciones.forEach((puntuacion, index) => {
                // Alternar color de fondo para filas
                if (index % 2 === 0) {
                    doc.setFillColor(248, 249, 250);
                    doc.rect(14, yPos - 5, 182, 7, 'F');
                }

                doc.text(puntuacion.nombre, 16, yPos);
                doc.text(String(puntuacion.puntos), 60, yPos);
                doc.text(`${puntuacion.tiempo}s`, 90, yPos);
                doc.text(String(puntuacion.vidas_restantes), 115, yPos);
                doc.text(String(puntuacion.longitud_palabra), 135, yPos);
                doc.text(puntuacion.dificultad, 155, yPos);

                yPos += 8;

                // Si llegamos al final de la página, agregar nueva página
                if (yPos > 280) {
                    doc.addPage();
                    // Volver a dibujar encabezados en la nueva página
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(255, 255, 255);
                    doc.setFillColor(108, 117, 125);
                    doc.rect(14, 15, 182, 8, 'F');
                    doc.text('Jugador', 16, 21);
                    doc.text('Puntos', 60, 21);
                    doc.text('Tiempo', 90, 21);
                    doc.text('Vidas', 115, 21);
                    doc.text('Long.', 135, 21);
                    doc.text('Dificultad', 155, 21);
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(33, 37, 41);
                    yPos = 28;
                }
            });

            // Pie de página
            doc.setFontSize(10);
            doc.setTextColor(120, 120, 120);
            doc.text('Reporte generado automáticamente - El Ahorcado', 14, yPos + 10);

            const nombreArchivo = `Reporte_Puntuaciones_${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(nombreArchivo);
            console.log('PDF descargado exitosamente');
        } catch (error) {
            console.error('Error al generar el PDF:', error);
            alert('Error al generar el PDF. Por favor, revisa la consola del navegador para más detalles.');
        }
    };

    // ==============================================
    // Event listeners
    // ==============================================

    elementos.btnIniciarJuego.addEventListener('click', iniciarJuego);
    elementos.btnGuardarPuntuacion.addEventListener('click', guardarPuntuacion);
    elementos.btnDescargarPdf.addEventListener('click', () => {
        console.log('Botón de descarga del juego presionado');
        descargarPdf();
    });
    elementos.btnDescargarPdfMenu.addEventListener('click', () => {
        console.log('Botón de descarga del menú presionado');
        descargarPdf();
    });
    document.addEventListener('keydown', manejarEntradaTeclado);
    elementos.backToMenuBtn.addEventListener('click', irAlMenuPrincipal);
    elementos.backToMenuModalBtn.addEventListener('click', () => {
        elementos.modalPuntuacion.hide();
        irAlMenuPrincipal();
    });

    // Función para actualizar filtros con debounce
    let debounceTimer;
    const actualizarFiltros = () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            obtenerTablaPuntuaciones();
        }, 300);
    };

    // Event listeners para los filtros
    elementos.searchInput.addEventListener('input', actualizarFiltros);
    elementos.difficultyFilter.addEventListener('change', actualizarFiltros);
    elementos.fechaDesde.addEventListener('change', actualizarFiltros);

    // Botón de limpiar filtros
    elementos.clearFiltersBtn.addEventListener('click', () => {
        elementos.searchInput.value = '';
        elementos.difficultyFilter.value = '';
        elementos.fechaDesde.value = '';
        obtenerTablaPuntuaciones();
    });

    obtenerTablaPuntuaciones();
});
