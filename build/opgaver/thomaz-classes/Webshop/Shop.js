export class Shop {
    products;
    constructor() {
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    getProducts() {
        return this.products;
    }
    getTotalPrice() {
        return this.products.reduce((acc, product) => acc + product.getPrice(), 0);
    }
    filter(type) {
        return this.products.filter((product) => product instanceof type);
    }
}
