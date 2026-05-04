/**
 * CMS Editorial Elite - Lógica de Gestión de Noticias
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referencias
    const formulario = document.getElementById('formularioNoticia');
    const muroNoticias = document.getElementById('muroNoticias');
    const notificationContainer = document.getElementById('notificationContainer');

    // Estado Global: Array de Noticias
    let noticiasGlobales = [];

    /**
     * Función Principal: Publicar Noticia
     */
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const datos = capturarDatos();
        
        if (validarNoticia(datos)) {
            try {
                // SPA Behavior: Simulación de envío vía Fetch
                const response = await fetch('/api/noticias', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datos)
                });

                const result = await response.json();

                if (result.success) {
                    // JavaScript Mastery: Uso de unshift() para agregar al inicio
                    noticiasGlobales.unshift(result.data);
                    
                    mostrarNotificacion('Noticia publicada con éxito en el muro editorial.', 'success');
                    formulario.reset();
                    renderizarMuro();
                }
            } catch (error) {
                console.error('Error al publicar:', error);
                mostrarNotificacion('Error de conexión con la central editorial.', 'error');
            }
        }
    });

    /**
     * Captura de los 8 campos obligatorios
     */
    function capturarDatos() {
        return {
            titular: document.getElementById('titular').value.trim(),
            subtitulo: document.getElementById('subtitulo').value.trim(),
            cuerpo: document.getElementById('cuerpo').value.trim(),
            categoria: document.getElementById('categoria').value,
            autor: document.getElementById('autor').value.trim(),
            imagenUrl: document.getElementById('imagenUrl').value.trim(),
            fecha: document.getElementById('fecha').value,
            prioridad: document.getElementById('prioridad').value,
            timestamp: Date.now() // Para control interno
        };
    }

    /**
     * Validación Estricta
     */
    function validarNoticia(datos) {
        let errores = [];

        if (datos.titular.length < 10) errores.push('El titular debe tener al menos 10 caracteres.');
        if (datos.cuerpo.length < 50) errores.push('El cuerpo de la noticia debe tener al menos 50 caracteres.');
        if (!datos.categoria) errores.push('Debe seleccionar una categoría.');
        if (!datos.autor) errores.push('El nombre del autor es obligatorio.');
        if (!datos.imagenUrl) errores.push('La URL de la imagen es necesaria.');
        if (!datos.fecha) errores.push('La fecha de publicación es obligatoria.');

        if (errores.length > 0) {
            mostrarNotificacion(errores.join('<br>'), 'error');
            return false;
        }

        return true;
    }

    /**
     * Renderización Dinámica del Muro
     * JavaScript Mastery: Uso de map() y filter()
     */
    function renderizarMuro() {
        // filter(): Asegurar que no haya entradas inválidas (ej: sin titular)
        const noticiasValidas = noticiasGlobales.filter(n => n.titular && n.cuerpo);

        if (noticiasValidas.length === 0) {
            muroNoticias.innerHTML = '<div class="empty-feed">Esperando nuevas crónicas...</div>';
            return;
        }

        // map(): Transformar el array de objetos en HTML dinámico
        const htmlFeed = noticiasValidas.map(noticia => `
            <article class="news-card">
                <div class="news-image" style="background-image: url('${noticia.imagenUrl}')"></div>
                <div class="news-content">
                    <div class="news-meta">
                        <span class="news-category">${noticia.categoria}</span>
                        <span class="news-priority">Prioridad: ${noticia.prioridad}</span>
                    </div>
                    <h3>${noticia.titular}</h3>
                    <p class="subtitulo">${noticia.subtitulo}</p>
                    <p class="cuerpo">${noticia.cuerpo}</p>
                </div>
                <div class="news-footer">
                    <span>Por: <strong>${noticia.autor}</strong></span>
                    <span>${noticia.fecha}</span>
                </div>
            </article>
        `).join('');

        muroNoticias.innerHTML = htmlFeed;
    }

    /**
     * Helpers de UI
     */
    function mostrarNotificacion(mensaje, tipo) {
        const clase = tipo === 'success' ? 'notification-success' : 'notification-error';
        notificationContainer.innerHTML = `<div class="notification ${clase}">${mensaje}</div>`;
        
        // Auto-limpiar notificaciones de éxito
        if (tipo === 'success') {
            setTimeout(() => {
                notificationContainer.innerHTML = '';
            }, 5000);
        }
    }
});
