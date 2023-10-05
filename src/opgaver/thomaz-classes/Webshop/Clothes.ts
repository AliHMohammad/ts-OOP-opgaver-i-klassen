import { Product } from "./Product.js";

export class Clothes extends Product {
    private size: string;
    private color: string;

    constructor(name: string, price: number, size: string, color: string) {
        super(name, price);
        this.size = size;
        this.color = color;
    }

    getLabel(): string {
        return `${this.name} + ${this.size} + ${this.color}`;
    }
}