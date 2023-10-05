import { Product } from "./Product.js";
export class Book extends Product {
    author;
    pages;
    constructor(name, price, author, pages) {
        super(name, price);
        this.author = author;
        this.pages = pages;
    }
    getLabel() {
        return `${this.name} by ${this.author} with count pages: ${this.pages}`;
    }
}
