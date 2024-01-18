document.addEventListener('DOMContentLoaded', function () {
    //Leemos el fichero JSON que se encuentra en la misma carpeta
    var jsonFile = 'salida.json';

    //Hacemos la función fetch, para devolver una promesa en formato JSON mediante una petición HTTP
    fetch(jsonFile)
        .then(response => response.json()) //Obtenemos la respuesta, en formato JSON
        .then(data => displayProducts(data)) //Mostramos los productos
        .catch(error => console.error('Error:', error)); //En caso de error
});

function displayProducts(products) {
    var productosContainer = document.getElementById('productos-container');

    products.forEach(function (product) {
        var productoDiv = document.createElement('div');
        productoDiv.classList.add('col');

        var card = document.createElement('div');
        card.classList.add('card', 'h-100', 'border-0', 'shadow-sm');

        var imagen = document.createElement('img');
        imagen.src = product['Imagen-src'];
        imagen.classList.add('card-img-top');
        card.appendChild(imagen);

        var cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        var nombre = document.createElement('h5');
        nombre.classList.add('card-title');
        nombre.textContent = product['Nombre'];
        cardBody.appendChild(nombre);

        var precio = document.createElement('p');
        precio.classList.add('card-text', 'fw-bold', 'text-primary');
        precio.textContent = product['Precio'];
        cardBody.appendChild(precio);

        card.appendChild(cardBody);
        productoDiv.appendChild(card);

        productosContainer.appendChild(productoDiv);
    });
}