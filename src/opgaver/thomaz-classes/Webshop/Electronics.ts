import { Product } from "./Product";

export class Electronics extends Product {
    private brand: string;
    private model: string;

    constructor(name: string, price: number, brand: string, model: string) {
        super(name, price);
        this.brand = brand;
        this.model = model;
    }

    getLabel(): string {
        return `${this.brand} - ${this.model} : ${this.name}`;
    }
}