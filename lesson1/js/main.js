const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let getRequest = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject('Error');
        } else {
          resolve(xhr.responseText);
        }
      }
    };
    xhr.send();
  })
};

class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._getProducts()
      .then(data => {
        this.goods = [...data];
        this._render();
      });

  }
  _getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then(response => response.json())
      .catch(error => console.log(error));
  }

  _render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());

    }
  }
  //суммарная стоимость всех товаров
  totalCost() {
    let summ = 0;
    for (let product of this.goods) {
      summ = summ + product.price;
    }
    console.log(summ)
  }
}

class ProductItem {
  constructor(product, img = 'http://placehold.it/200x150/a2345f') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}">
              <div class="desc">
                <h3>${this.title}</h3>
                <p>${this.price} \u20bd</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>
            </div>`;
  }

}

new ProductList();

//класс корзины
class BusketList {
  constructor(container = '.busket') {
    this.container = container;
    this.allProductsInBusket = [];
    // отображение на страницу
    this._render();


  }
}

//класс элемента корзины
class BusketItem extends ProductItem {
  constructor(product, img = "http://placehold.it/200x150/a2345f", count) {
    super(product, img);
    this.count = count;
    // увеличение колчества данного товара
    this.plusCount();
    // уменьшение колчества данного товара
    this.minusCount();
    // удаление данного товара из корзины
    this.deleteItem();
  }

}
