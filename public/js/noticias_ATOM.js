$(document).ready(function () {
    cargarNoticias();
});

async function cargarNoticias() {
    try {
        const response = await fetch('/atom');
        const noticias = await response.json();

        const contenedorNoticias = $('#noticias');

        // Función para convertir JSON a HTML
        function convertJsonToHtml(noticias) {
            var html = '';

            // Entradas del feed
            noticias.feed.entry.forEach(function (entry) {
                html += '<div class="noticia">';
                html += '<h2 class="mb-3">' + entry.title + '</h2>';
                html += '<p class="mb-3">' + entry.summary + '</p>';
                html += '<p class="text-muted mb-3"><strong>Fecha de publicación:</strong> ' + entry.updated + '</p>';
                html += '<a href="' + entry.link[1].href + '" target="_blank">Leer más</a>';
                html += '</div>';
            });

            return html;
        }

        // Imprimir el HTML generado en el contenedor de noticias
        contenedorNoticias.html(convertJsonToHtml(noticias));
    } catch (error) {
        console.error("Error al cargar las noticias", error);
    }
}
