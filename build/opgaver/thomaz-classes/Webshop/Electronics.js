import { Product } from "./Product.js";
export class Electronics extends Product {
    brand;
    model;
    constructor(name, price, brand, model) {
        super(name, price);
        this.brand = brand;
        this.model = model;
    }
    getLabel() {
        return `${this.brand} - ${this.model} : ${this.name}`;
    }
}
