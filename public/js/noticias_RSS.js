$(document).ready(function () {
    cargarNoticias();
});

async function cargarNoticias() {
    try {
        const response = await fetch('/rss');
        const noticias = await response.json();

        const contenedorNoticias = $('#noticias');

        // Función para convertir JSON a HTML
        function convertJsonToHtml(noticias) {
            var html = '';

            // Entradas del feed
            noticias.rss.channel.item.forEach(function (item) {
                html += '<div class="noticia">';
                html += '<h2>' + item.title + '</h2>';
                html += '<p>' + item.description + '</p>';
                html += '<p><strong>Fecha de publicación:</strong> ' + item.pubDate + '</p>';
                html += '<a href="' + item.link[1]._ + '" target="_blank">Leer más</a>';
                html += '</div>';
            });

            return html;
        }

        contenedorNoticias.html(convertJsonToHtml(noticias));
    } catch (error) {
        console.error("Error al cargar las noticias", error);
    }
}