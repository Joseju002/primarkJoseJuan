document.addEventListener('DOMContentLoaded', function () {
    var jsonFile = 'salida.json';

    fetch(jsonFile)
        .then(response => response.json())
        .then(data => displayProducts(data))
        .catch(error => console.error('Error:', error));
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