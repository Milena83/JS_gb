const products = [
    { id: 1, title: 'Notebook', price: 20000 },
    { id: 2, title: 'Mouse', price: 1500 },
    { id: 3, title: 'Keyboard', price: 5000 },
    { id: 4, title: 'Gamepad', price: 4500 },
];

const renderProduct = (title, price, img = "http://placehold.it/200x150/a2345f") => {
    return `<div class="product-item">
              <img src="${img}">
              <h3>${title}</h3>
              <p>${price}</p>
              <button class="by-btn">Добавить в корзину</button>
            </div>`;
};

const renderProducts = (list) => {
    const productList = list.map(good => renderProduct(good.title, good.price));

    document.querySelector('.products').innerHTML = productList.join(' ');
}

renderProducts(products);