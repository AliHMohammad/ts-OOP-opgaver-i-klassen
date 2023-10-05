import { Book } from "./Book.js";
import { Clothes } from "./Clothes.js";
import { Electronics } from "./Electronics.js";

import { Product, ProductClass } from "./interface.js";

export class Shop {
    private _products: ProductClass[];

    constructor() {
        this._products = [];
    }

    addProduct(product: ProductClass) {
        this._products.push(product);
    }

    getProducts() {
        return this._products;
    }

    getTotalPrice() {
        return this._products.reduce((acc, product) => acc + product.price, 0);
    }

    filter(type: any) {
        return this._products.filter((product) => product instanceof type);
    }
}


