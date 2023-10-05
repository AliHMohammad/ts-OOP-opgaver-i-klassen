import { Book } from "./Book.js";
import { Clothes } from "./Clothes.js";
import { Electronics } from "./Electronics.js";

export type ProductClass = Book | Electronics | Clothes;

export interface Product {
    name: string;
    price: number;
    author?: string;
    pages?: number;
    brand?: string;
    model?: string;
    size?: string;
    color?: string;
}