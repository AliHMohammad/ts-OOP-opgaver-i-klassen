import { Book } from "./Book.js";
import { Clothes } from "./Clothes.js";
import { Electronics } from "./Electronics.js";

import { Product, ProductClass } from "./interface.js";

export class Shop {
    private products: ProductClass[];

    constructor() {
        this.products = [];
    }

    addProduct(product: ProductClass) {
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getTotalPrice() {
        return this.products.reduce((acc, product) => acc + product.getPrice(), 0);
    }

    filter(type: Function) {
        return this.products.filter((product) => product instanceof type);
    }
}


