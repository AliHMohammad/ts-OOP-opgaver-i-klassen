import { Product } from "./Product.js";

export class Book extends Product {
    private author: string;
    private pages: number;

    constructor(name: string, price: number, author: string, pages: number) {
        super(name, price);
        this.author = author;
        this.pages = pages;
    }

    getLabel(): string {
        return `${this.name} by ${this.author} with count pages: ${this.pages}`;
    }
}