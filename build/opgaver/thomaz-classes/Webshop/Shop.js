export class Shop {
    _products;
    constructor() {
        this._products = [];
    }
    addProduct(product) {
        this._products.push(product);
    }
    getProducts() {
        return this._products;
    }
    getTotalPrice() {
        return this._products.reduce((acc, product) => acc + product.price, 0);
    }
    filter(type) {
        return this._products.filter((product) => product instanceof type);
    }
}
