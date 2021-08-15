class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._fetchProducts();
    this._render();
    this.totalCost();

  }
  _fetchProducts() {
    this.goods = [
      { id: 1, title: 'Notebook', price: 20000 },
      { id: 2, title: 'Mouse', price: 1500 },
      { id: 3, title: 'Keyboard', price: 5000 },
      { id: 4, title: 'Gamepad', price: 4500 },
    ]
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
    this.title = product.title;
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
