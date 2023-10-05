import { Product } from "./Product.js";
export class Clothes extends Product {
    size;
    color;
    constructor(name, price, size, color) {
        super(name, price);
        this.size = size;
        this.color = color;
    }
    getLabel() {
        return `${this.name} + ${this.size} + ${this.color}`;
    }
}
