export class Product {
    name;
    price;
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    getTotalPrice(quantity) {
        return this.price * quantity;
    }
}
